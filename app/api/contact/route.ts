import { NextResponse } from "next/server";
import { contactSubmissionSchema, contactSubjectLabels } from "@/lib/validation/contact";
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

/** Contact endpoint. Same guard chain as the RFQ route, without attachments. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    logFailure("contact", "invalid-json");
    return NextResponse.json({ ok: false, error: genericErrorMessage }, { status: 400 });
  }

  const candidate = payload as Record<string, unknown>;

  const guardFailure = await guardSubmission({
    headers: request.headers,
    endpoint: "contact",
    limit: rateLimits.contact.limit,
    windowMs: rateLimits.contact.windowMs,
    honeypotValue: typeof candidate.companyRole === "string" ? candidate.companyRole : undefined,
    formStartedAt:
      typeof candidate.formStartedAt === "number" ? candidate.formStartedAt : undefined,
    turnstileToken:
      typeof candidate.turnstileToken === "string" ? candidate.turnstileToken : undefined,
  });

  if (guardFailure) {
    logFailure("contact", guardFailure.reason);
    return guardFailure.response;
  }

  const parsed = contactSubmissionSchema.safeParse(payload);
  if (!parsed.success) {
    logFailure("contact", `validation:${parsed.error.issues.length}-issues`);
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
    submission.subject,
    submission.message.slice(0, 200),
  ]);

  const existingReference = findDuplicate(fingerprint);
  if (existingReference) {
    return NextResponse.json({ ok: true, reference: existingReference, duplicate: true });
  }

  const reference = generateReference("MSG");
  const recipients = internalRecipients();

  if (emailConfigured() && recipients.length > 0) {
    const internal = internalNotification({
      heading: `Website message from ${submission.company}`,
      reference,
      sections: [
        {
          title: "Sender",
          fields: [
            { label: "Name", value: submission.name },
            { label: "Email", value: submission.email },
            { label: "Company", value: submission.company },
            { label: "Country", value: submission.country },
          ],
        },
        {
          title: "Message",
          fields: [
            { label: "Subject", value: contactSubjectLabels[submission.subject] },
            { label: "Message", value: submission.message },
          ],
        },
        {
          title: "Consent",
          fields: [
            { label: "Privacy consent", value: submission.privacyConsent ? "Given" : "Not given" },
            {
              label: "Marketing consent",
              value: submission.marketingConsent ? "Given" : "Not given",
            },
          ],
        },
      ],
    });

    const internalResult = await sendEmail({
      to: recipients,
      subject: `Message ${reference} | ${submission.company} | ${contactSubjectLabels[submission.subject]}`,
      html: internal.html,
      text: internal.text,
      replyTo: submission.email,
    });

    if (!internalResult.sent && !internalResult.skipped) {
      logFailure("contact", `internal-email:${internalResult.reason}`, reference);
    }

    const confirmation = buyerConfirmation({
      firstName: submission.name.split(" ")[0] ?? submission.name,
      reference,
      heading: "We have received your message",
      intro:
        "Thank you for getting in touch. Your message has reached the team and someone will reply directly.",
      nextSteps: [
        "Your message is routed to the right person for the subject you selected.",
        "We reply by email, usually with any questions needed to answer properly.",
      ],
      summary: [
        {
          title: "Your message",
          fields: [
            { label: "Reference", value: reference },
            { label: "Subject", value: contactSubjectLabels[submission.subject] },
          ],
        },
      ],
    });

    const buyerResult = await sendEmail({
      to: [submission.email],
      subject: `Your message ${reference} | ${siteConfig.name}`,
      html: confirmation.html,
      text: confirmation.text,
    });

    if (!buyerResult.sent && !buyerResult.skipped) {
      logFailure("contact", `buyer-email:${buyerResult.reason}`, reference);
    }
  } else {
    console.warn(
      `[contact] email not configured. Reference ${reference} from ${submission.company} recorded in logs only.`,
    );
  }

  recordSubmission(fingerprint, reference);

  return NextResponse.json({ ok: true, reference, duplicate: false });
}
