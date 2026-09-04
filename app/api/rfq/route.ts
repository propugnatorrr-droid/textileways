import { NextResponse } from "next/server";
import { rfqSubmissionSchema, decorationOptionLabels } from "@/lib/validation/rfq";
import { buyerTypeLabels, companyStageLabels, shippingTermLabels } from "@/lib/validation/shared";
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
import { internalNotification, buyerConfirmation, type EmailSection } from "@/lib/email/templates";
import { getProductFamily } from "@/content/fallback/products";
import { quantityBandLabel } from "@/lib/utilities/quantity";
import { siteConfig } from "@/content/configuration/site";

/**
 * RFQ submission endpoint.
 *
 * Accepts multipart form data so attachments arrive with the payload. The JSON
 * body travels in a `payload` field and every other part is a file.
 *
 * Order of operations matters and is deliberate:
 *   1. parse the request
 *   2. run the shared spam and rate guards
 *   3. validate with Zod, which is the real trust boundary
 *   4. check for a duplicate before doing any work with side effects
 *   5. store attachments
 *   6. send email
 *
 * Email failure does not fail the submission. The buyer has a reference, the
 * inquiry is recorded server side, and a delivery problem is an operational
 * issue rather than a reason to make the buyer type everything again.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse> {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    logFailure("rfq", "malformed-request");
    return NextResponse.json({ ok: false, error: genericErrorMessage }, { status: 400 });
  }

  const rawPayload = formData.get("payload");
  if (typeof rawPayload !== "string") {
    logFailure("rfq", "missing-payload");
    return NextResponse.json({ ok: false, error: genericErrorMessage }, { status: 400 });
  }

  let parsedPayload: unknown;
  try {
    parsedPayload = JSON.parse(rawPayload);
  } catch {
    logFailure("rfq", "invalid-json");
    return NextResponse.json({ ok: false, error: genericErrorMessage }, { status: 400 });
  }

  const candidate = parsedPayload as Record<string, unknown>;

  const guardFailure = await guardSubmission({
    headers: request.headers,
    endpoint: "rfq",
    limit: rateLimits.rfq.limit,
    windowMs: rateLimits.rfq.windowMs,
    honeypotValue: typeof candidate.companyRole === "string" ? candidate.companyRole : undefined,
    formStartedAt:
      typeof candidate.formStartedAt === "number" ? candidate.formStartedAt : undefined,
    turnstileToken:
      typeof candidate.turnstileToken === "string" ? candidate.turnstileToken : undefined,
  });

  if (guardFailure) {
    logFailure("rfq", guardFailure.reason);
    return guardFailure.response;
  }

  const parsed = rfqSubmissionSchema.safeParse(parsedPayload);
  if (!parsed.success) {
    logFailure("rfq", `validation:${parsed.error.issues.length}-issues`);
    return NextResponse.json(
      {
        ok: false,
        error: "Some details need correcting before this can be submitted.",
        fieldErrors: fieldErrorsFrom(parsed.error.issues),
      },
      { status: 422 },
    );
  }

  const submission = parsed.data;

  /* Duplicate guard, so a double click or a retried request does not create two inquiries. */
  const fingerprint = fingerprintSubmission([
    submission.email,
    submission.company,
    submission.productType,
    String(submission.estimatedQuantity),
    submission.productDescription.slice(0, 200),
  ]);

  const existingReference = findDuplicate(fingerprint);
  if (existingReference) {
    return NextResponse.json({
      ok: true,
      reference: existingReference,
      duplicate: true,
      attachmentsStored: 0,
      message: "This inquiry has already been received.",
    });
  }

  const reference = generateReference("RFQ");

  /* Attachments. A storage failure is reported but does not discard the inquiry. */
  const files = formData.getAll("files").filter((entry): entry is File => entry instanceof File);

  let attachmentWarning: string | undefined;
  let storedAttachments: { originalName: string; url: string; size: number }[] = [];

  if (files.length > 0) {
    const setCheck = validateFileSet(
      files.map((file) => ({ name: file.name, type: file.type, size: file.size })),
    );

    if (!setCheck.ok) {
      logFailure("rfq", "file-validation-failed", reference);
      return NextResponse.json(
        { ok: false, error: setCheck.message ?? genericErrorMessage },
        { status: 422 },
      );
    }

    const storage = getAttachmentStorage();
    const result = await storage.store(files, reference);

    if (result.ok) {
      storedAttachments = result.stored.map((item) => ({
        originalName: item.originalName,
        url: item.url,
        size: item.size,
      }));
    } else {
      logFailure("rfq", result.reason ?? "storage-failed", reference);
      attachmentWarning = result.message;
    }
  }

  /* Email. Failures are logged, never surfaced as a submission failure. */
  const sections = buildRfqSections(submission, storedAttachments.length);
  const recipients = internalRecipients();

  if (emailConfigured() && recipients.length > 0) {
    const internal = internalNotification({
      heading: `New RFQ from ${submission.company}`,
      reference,
      sections,
      attachmentNote:
        storedAttachments.length > 0
          ? storedAttachments.map((file) => `${file.originalName}: ${file.url}`).join("\n")
          : attachmentWarning
            ? `Attachments could not be stored: ${attachmentWarning}`
            : "No attachments were submitted.",
    });

    const internalResult = await sendEmail({
      to: recipients,
      subject: `RFQ ${reference} | ${submission.company} | ${submission.productType}`,
      html: internal.html,
      text: internal.text,
      replyTo: submission.email,
    });

    if (!internalResult.sent && !internalResult.skipped) {
      logFailure("rfq", `internal-email:${internalResult.reason}`, reference);
    }

    const confirmation = buyerConfirmation({
      firstName: submission.fullName.split(" ")[0] ?? submission.fullName,
      reference,
      heading: "We have received your quote request",
      intro:
        "Thank you for the detail you provided. Our team reviews the technical and commercial requirements before quoting, which usually means we come back with questions before we come back with a price.",
      nextSteps: [
        "A member of the team reviews your product details, quantity and delivery requirements.",
        "We come back with any technical questions needed to quote accurately.",
        "You receive a quotation against a written specification, with the assumptions stated.",
      ],
      summary: [
        {
          title: "Your submission",
          fields: [
            { label: "Reference", value: reference },
            { label: "Company", value: submission.company },
            { label: "Product", value: submission.productType },
            { label: "Estimated quantity", value: String(submission.estimatedQuantity) },
            { label: "Destination", value: `${submission.destinationCity}, ${submission.destinationCountry}` },
          ],
        },
      ],
    });

    const buyerResult = await sendEmail({
      to: [submission.email],
      subject: `Your quote request ${reference} | ${siteConfig.name}`,
      html: confirmation.html,
      text: confirmation.text,
    });

    if (!buyerResult.sent && !buyerResult.skipped) {
      logFailure("rfq", `buyer-email:${buyerResult.reason}`, reference);
    }
  } else {
    /* Nothing is lost when email is unconfigured: the inquiry is recorded here. */
    console.warn(
      `[rfq] email not configured. Reference ${reference} from ${submission.company} recorded in logs only.`,
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

/* -------------------------------------------------------------------------- */

function fieldErrorsFrom(
  issues: { path: PropertyKey[]; message: string }[],
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

function buildRfqSections(
  submission: Record<string, unknown> & {
    fullName: string;
    email: string;
    phone: string;
    whatsapp: string;
    company: string;
    website: string;
    country: string;
    buyerType: keyof typeof buyerTypeLabels;
    companyStage: keyof typeof companyStageLabels;
    productFamily: string;
    productType: string;
    styleCount: number;
    estimatedQuantity: number;
    colorwayCount: number;
    sizeRange: string;
    targetMarket: string;
    productDescription: string;
    knownMaterial: string;
    composition: string;
    weight: string;
    stretchRequirement: string;
    performanceRequirement: string;
    colorRequirement: string;
    needsMaterialRecommendation: boolean;
    decoration: string[];
    decorationNotes: string;
    requiredDeliveryDate: string;
    destinationCity: string;
    destinationCountry: string;
    shippingTerm: keyof typeof shippingTermLabels;
    targetPrice: string;
    sampleRequired: string;
    supplierStatus: string;
    additionalNotes: string;
    privacyConsent: boolean;
    designReviewConsent: boolean;
    marketingConsent: boolean;
  },
  attachmentCount: number,
): EmailSection[] {
  const family = getProductFamily(submission.productFamily);
  const band = quantityBandLabel(submission.estimatedQuantity);

  const optional = (label: string, value: string): { label: string; value: string }[] =>
    value.trim().length > 0 ? [{ label, value }] : [];

  return [
    {
      title: "Buyer",
      fields: [
        { label: "Name", value: submission.fullName },
        { label: "Email", value: submission.email },
        { label: "Phone", value: submission.phone },
        ...optional("WhatsApp", submission.whatsapp),
        { label: "Company", value: submission.company },
        ...optional("Website", submission.website),
        { label: "Country", value: submission.country },
        { label: "Buyer type", value: buyerTypeLabels[submission.buyerType] },
        { label: "Company stage", value: companyStageLabels[submission.companyStage] },
      ],
    },
    {
      title: "Product",
      fields: [
        { label: "Product family", value: family?.name ?? "Not listed" },
        { label: "Product type", value: submission.productType },
        { label: "Number of styles", value: String(submission.styleCount) },
        {
          label: "Estimated quantity",
          value: band
            ? `${submission.estimatedQuantity} pieces (${band})`
            : `${submission.estimatedQuantity} pieces`,
        },
        { label: "Colourways", value: String(submission.colorwayCount) },
        { label: "Size range", value: submission.sizeRange },
        { label: "Target market", value: submission.targetMarket },
        { label: "Description", value: submission.productDescription },
      ],
    },
    {
      title: "Materials",
      fields: [
        ...optional("Known material", submission.knownMaterial),
        ...optional("Composition", submission.composition),
        ...optional("Weight", submission.weight),
        ...optional("Stretch requirement", submission.stretchRequirement),
        ...optional("Performance requirement", submission.performanceRequirement),
        ...optional("Colour requirement", submission.colorRequirement),
        {
          label: "Wants a material recommendation",
          value: submission.needsMaterialRecommendation ? "Yes" : "No",
        },
      ],
    },
    {
      title: "Customisation",
      fields: [
        {
          label: "Decoration requested",
          value:
            submission.decoration.length > 0
              ? submission.decoration
                  .map(
                    (item) =>
                      decorationOptionLabels[item as keyof typeof decorationOptionLabels] ?? item,
                  )
                  .join(", ")
              : "None specified",
        },
        ...optional("Decoration notes", submission.decorationNotes),
      ],
    },
    {
      title: "Commercial",
      fields: [
        { label: "Required delivery date", value: submission.requiredDeliveryDate },
        {
          label: "Destination",
          value: `${submission.destinationCity}, ${submission.destinationCountry}`,
        },
        { label: "Shipping term", value: shippingTermLabels[submission.shippingTerm] },
        ...optional("Target price", submission.targetPrice),
        { label: "Sample required", value: submission.sampleRequired },
        { label: "Supplier status", value: submission.supplierStatus },
        ...optional("Additional notes", submission.additionalNotes),
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
        { label: "Attachments received", value: String(attachmentCount) },
      ],
    },
  ];
}
