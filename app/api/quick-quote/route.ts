import { NextResponse } from "next/server";
import { quickQuoteSubmissionSchema } from "@/lib/validation/quick-quote";
import { guardSubmission, logFailure, genericErrorMessage } from "@/lib/security/submission-guard";
import { rateLimits } from "@/lib/security/rate-limit";
import {
  generateReference,
  fingerprintSubmission,
  findDuplicate,
  recordSubmission,
} from "@/lib/security/reference";
import { sendEmail, internalRecipients, emailConfigured } from "@/lib/email/send";
import { internalNotification, buyerConfirmation } from "@/lib/email/templates";
import { siteConfig } from "@/content/configuration/site";
import { getProductFamily } from "@/content/fallback/products";
import { quantityBandLabel } from "@/lib/utilities/quantity";

/**
 * Quick quote endpoint. Same guard chain as every other public form, without
 * attachments. Kept as its own route rather than folded into the contact or
 * RFQ endpoint so its own reference prefix (EST) stays a reliable signal to
 * staff that the detail behind it is thinner than a full RFQ.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    logFailure("quick-quote", "invalid-json");
    return NextResponse.json({ ok: false, error: genericErrorMessage }, { status: 400 });
  }

  const candidate = payload as Record<string, unknown>;

  const guardFailure = await guardSubmission({
    headers: request.headers,
    endpoint: "quick-quote",
    limit: rateLimits.quickQuote.limit,
    windowMs: rateLimits.quickQuote.windowMs,
    honeypotValue: typeof candidate.companyRole === "string" ? candidate.companyRole : undefined,
    formStartedAt:
      typeof candidate.formStartedAt === "number" ? candidate.formStartedAt : undefined,
    turnstileToken:
      typeof candidate.turnstileToken === "string" ? candidate.turnstileToken : undefined,
  });

  if (guardFailure) {
    logFailure("quick-quote", guardFailure.reason);
    return guardFailure.response;
  }

  const parsed = quickQuoteSubmissionSchema.safeParse(payload);
  if (!parsed.success) {
    logFailure("quick-quote", `validation:${parsed.error.issues.length}-issues`);
    return NextResponse.json(
      {
        ok: false,
        error: "Some details need correcting before this can be sent.",
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
    submission.productFamily,
    String(submission.estimatedQuantity),
  ]);

  const existingReference = findDuplicate(fingerprint);
  if (existingReference) {
    return NextResponse.json({ ok: true, reference: existingReference, duplicate: true });
  }

  const reference = generateReference("EST");
  const recipients = internalRecipients();
  const family = getProductFamily(submission.productFamily);
  const familyLabel = family?.name ?? "Not listed";
  const band = quantityBandLabel(submission.estimatedQuantity);

  if (emailConfigured() && recipients.length > 0) {
    const internal = internalNotification({
      heading: `Quick estimate from ${submission.company || submission.name}`,
      reference,
      sections: [
        {
          title: "Buyer",
          fields: [
            { label: "Name", value: submission.name },
            { label: "Email", value: submission.email },
            ...(submission.company ? [{ label: "Company", value: submission.company }] : []),
          ],
        },
        {
          title: "Project",
          fields: [
            { label: "Product category", value: familyLabel },
            {
              label: "Estimated quantity",
              value: band
                ? `${submission.estimatedQuantity.toLocaleString()} (${band})`
                : String(submission.estimatedQuantity),
            },
            ...(submission.notes ? [{ label: "Notes", value: submission.notes }] : []),
          ],
        },
      ],
    });

    const internalResult = await sendEmail({
      to: recipients,
      subject: `Quick estimate ${reference} | ${submission.name} | ${familyLabel}`,
      html: internal.html,
      text: internal.text,
      replyTo: submission.email,
    });

    if (!internalResult.sent && !internalResult.skipped) {
      logFailure("quick-quote", `internal-email:${internalResult.reason}`, reference);
    }

    const confirmation = buyerConfirmation({
      firstName: submission.name.split(" ")[0] ?? submission.name,
      reference,
      heading: "We have received your quick estimate request",
      intro:
        "Thank you for the details. This is a lighter first pass than a full quotation, so someone will reply with an initial read on fit and next steps, then ask for anything more they need.",
      nextSteps: [
        "Your product category and quantity are checked against what we can realistically support.",
        "You will hear back by email, usually with either an initial view or a short list of clarifying questions.",
        "If you are ready to move to a full quotation at any point, the request a quote form covers everything in one pass.",
      ],
      summary: [
        {
          title: "Your request",
          fields: [
            { label: "Reference", value: reference },
            { label: "Product category", value: familyLabel },
            {
              label: "Estimated quantity",
              value: band
                ? `${submission.estimatedQuantity.toLocaleString()} (${band})`
                : String(submission.estimatedQuantity),
            },
          ],
        },
      ],
    });

    const buyerResult = await sendEmail({
      to: [submission.email],
      subject: `Your quick estimate ${reference} | ${siteConfig.name}`,
      html: confirmation.html,
      text: confirmation.text,
    });

    if (!buyerResult.sent && !buyerResult.skipped) {
      logFailure("quick-quote", `buyer-email:${buyerResult.reason}`, reference);
    }
  } else {
    console.warn(
      `[quick-quote] email not configured. Reference ${reference} from ${submission.name} recorded in logs only.`,
    );
  }

  recordSubmission(fingerprint, reference);

  return NextResponse.json({ ok: true, reference, duplicate: false });
}
