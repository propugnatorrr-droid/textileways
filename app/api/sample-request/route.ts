import { NextResponse } from "next/server";
import {
  sampleRequestSubmissionSchema,
  sampleTypeLabels,
} from "@/lib/validation/contact";
import { validateFileSet } from "@/lib/validation/files";
import { guardSubmission, logFailure, genericErrorMessage } from "@/lib/security/submission-guard";
import { rateLimits } from "@/lib/security/rate-limit";
import {
  generateReference,
  fingerprintSubmission,
  findDuplicate,
  recordSubmission,
} from "@/lib/security/reference";
import { getAttachmentStorage } from "@/lib/storage/attachments";
import { sendEmail, internalRecipients, emailConfigured } from "@/lib/email/send";
import { internalNotification, buyerConfirmation } from "@/lib/email/templates";
import { getProductFamily } from "@/content/fallback/products";
import { siteConfig } from "@/content/configuration/site";

/**
 * Sample request endpoint.
 *
 * Reuses the same guard chain, validation approach, storage adapter and email
 * infrastructure as the RFQ route, as the brief requires.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse> {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    logFailure("sample", "malformed-request");
    return NextResponse.json({ ok: false, error: genericErrorMessage }, { status: 400 });
  }

  const rawPayload = formData.get("payload");
  if (typeof rawPayload !== "string") {
    logFailure("sample", "missing-payload");
    return NextResponse.json({ ok: false, error: genericErrorMessage }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawPayload);
  } catch {
    logFailure("sample", "invalid-json");
    return NextResponse.json({ ok: false, error: genericErrorMessage }, { status: 400 });
  }

  const candidate = payload as Record<string, unknown>;

  const guardFailure = await guardSubmission({
    headers: request.headers,
    endpoint: "sample",
    limit: rateLimits.sample.limit,
    windowMs: rateLimits.sample.windowMs,
    honeypotValue: typeof candidate.companyRole === "string" ? candidate.companyRole : undefined,
    formStartedAt:
      typeof candidate.formStartedAt === "number" ? candidate.formStartedAt : undefined,
    turnstileToken:
      typeof candidate.turnstileToken === "string" ? candidate.turnstileToken : undefined,
  });

  if (guardFailure) {
    logFailure("sample", guardFailure.reason);
    return guardFailure.response;
  }

  const parsed = sampleRequestSubmissionSchema.safeParse(payload);
  if (!parsed.success) {
    logFailure("sample", `validation:${parsed.error.issues.length}-issues`);
    return NextResponse.json(
      {
        ok: false,
        error: "Some details need correcting before this can be submitted.",
        fieldErrors: Object.fromEntries(
          parsed.error.issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message]),
        ),
      },
      { status: 422 },
    );
  }

  const submission = parsed.data;

  const fingerprint = fingerprintSubmission([
    submission.email,
    submission.company,
    submission.productFamily,
    submission.sampleType,
    submission.sizeRequired,
  ]);

  const existingReference = findDuplicate(fingerprint);
  if (existingReference) {
    return NextResponse.json({
      ok: true,
      reference: existingReference,
      duplicate: true,
      attachmentsStored: 0,
    });
  }

  const reference = generateReference("SMP");

  const files = formData.getAll("files").filter((entry): entry is File => entry instanceof File);
  let attachmentWarning: string | undefined;
  let storedAttachments: { originalName: string; url: string }[] = [];

  if (files.length > 0) {
    const setCheck = validateFileSet(
      files.map((file) => ({ name: file.name, type: file.type, size: file.size })),
    );

    if (!setCheck.ok) {
      logFailure("sample", "file-validation-failed", reference);
      return NextResponse.json(
        { ok: false, error: setCheck.message ?? genericErrorMessage },
        { status: 422 },
      );
    }

    const result = await getAttachmentStorage().store(files, reference);
    if (result.ok) {
      storedAttachments = result.stored.map((item) => ({
        originalName: item.originalName,
        url: item.url,
      }));
    } else {
      logFailure("sample", result.reason ?? "storage-failed", reference);
      attachmentWarning = result.message;
    }
  }

  const family = getProductFamily(submission.productFamily);
  const recipients = internalRecipients();

  if (emailConfigured() && recipients.length > 0) {
    const optional = (label: string, value: string) =>
      value.trim().length > 0 ? [{ label, value }] : [];

    const internal = internalNotification({
      heading: `Sample request from ${submission.company}`,
      reference,
      sections: [
        {
          title: "Buyer",
          fields: [
            { label: "Name", value: submission.fullName },
            { label: "Email", value: submission.email },
            ...optional("Phone", submission.phone),
            { label: "Company", value: submission.company },
            { label: "Country", value: submission.country },
          ],
        },
        {
          title: "Sample",
          fields: [
            { label: "Product category", value: family?.name ?? "Not listed" },
            { label: "Sample type", value: sampleTypeLabels[submission.sampleType] },
            { label: "Has a tech pack", value: submission.hasTechPack },
            ...optional("Material preference", submission.materialPreference),
            { label: "Size required", value: submission.sizeRequired },
            { label: "Colour required", value: submission.colorRequired },
            ...optional("Decoration required", submission.decorationRequired),
            ...optional("Notes", submission.notes),
          ],
        },
        {
          title: "Delivery",
          fields: [
            {
              label: "Destination",
              value: `${submission.destinationCity}, ${submission.destinationCountry}`,
            },
            { label: "Required by", value: submission.requiredDate },
          ],
        },
        {
          title: "Consent",
          fields: [
            { label: "Privacy consent", value: submission.privacyConsent ? "Given" : "Not given" },
            {
              label: "Design review consent",
              value: submission.designReviewConsent ? "Given" : "Not given",
            },
            {
              label: "Marketing consent",
              value: submission.marketingConsent ? "Given" : "Not given",
            },
          ],
        },
      ],
      attachmentNote:
        storedAttachments.length > 0
          ? storedAttachments.map((file) => `${file.originalName}: ${file.url}`).join("\n")
          : attachmentWarning
            ? `Attachments could not be stored: ${attachmentWarning}`
            : "No attachments were submitted.",
    });

    const internalResult = await sendEmail({
      to: recipients,
      subject: `Sample ${reference} | ${submission.company} | ${family?.name ?? "Not listed"}`,
      html: internal.html,
      text: internal.text,
      replyTo: submission.email,
    });

    if (!internalResult.sent && !internalResult.skipped) {
      logFailure("sample", `internal-email:${internalResult.reason}`, reference);
    }

    const confirmation = buyerConfirmation({
      firstName: submission.fullName.split(" ")[0] ?? submission.fullName,
      reference,
      heading: "We have received your sample request",
      intro:
        "Thank you for the detail you provided. Sample charges and courier costs are always quoted before any work begins, so nothing is produced or charged without your confirmation.",
      nextSteps: [
        "We review what you need and confirm whether it is a swatch, a stock sample or a custom development sample.",
        "You receive a quotation for the sample and courier cost.",
        "Once you confirm, the sample is produced and shipped to your destination.",
      ],
      summary: [
        {
          title: "Your request",
          fields: [
            { label: "Reference", value: reference },
            { label: "Product category", value: family?.name ?? "Not listed" },
            { label: "Sample type", value: sampleTypeLabels[submission.sampleType] },
            {
              label: "Destination",
              value: `${submission.destinationCity}, ${submission.destinationCountry}`,
            },
          ],
        },
      ],
    });

    const buyerResult = await sendEmail({
      to: [submission.email],
      subject: `Your sample request ${reference} | ${siteConfig.name}`,
      html: confirmation.html,
      text: confirmation.text,
    });

    if (!buyerResult.sent && !buyerResult.skipped) {
      logFailure("sample", `buyer-email:${buyerResult.reason}`, reference);
    }
  } else {
    console.warn(
      `[sample] email not configured. Reference ${reference} from ${submission.company} recorded in logs only.`,
    );
  }

  recordSubmission(fingerprint, reference);

  return NextResponse.json({
    ok: true,
    reference,
    duplicate: false,
    attachmentsStored: storedAttachments.length,
    ...(attachmentWarning ? { warning: attachmentWarning } : {}),
  });
}
