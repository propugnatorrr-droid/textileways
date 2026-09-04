import { Resend } from "resend";

/**
 * Transactional email.
 *
 * Resend is the configured provider. The adapter deliberately degrades rather
 * than throwing when RESEND_API_KEY is absent: the site has to build and run
 * before the account exists, and a missing key must not turn a valid inquiry
 * into a server error the visitor sees.
 *
 * When email is not configured, submissions are still validated, still get a
 * reference, and are logged server side so nothing is silently lost. The launch
 * checklist requires this to be configured before go live.
 */

export interface EmailAttachment {
  filename: string;
  /** Public or signed URL the provider fetches at send time. */
  path: string;
}

export interface SendEmailInput {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}

export interface SendEmailResult {
  sent: boolean;
  /** True when sending was skipped because no provider is configured. */
  skipped: boolean;
  id?: string;
  /** Short code for server logs. Never surfaced to the visitor. */
  reason?: string;
}

let client: Resend | null = null;

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RFQ_FROM_EMAIL);
}

/** Internal recipients for new inquiries, comma separated in the environment. */
export function internalRecipients(): string[] {
  const raw = process.env.RFQ_TO_EMAIL ?? "";
  return raw
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const resend = getClient();
  const from = process.env.RFQ_FROM_EMAIL;

  if (!resend || !from) {
    return { sent: false, skipped: true, reason: "email-not-configured" };
  }

  if (input.to.length === 0) {
    return { sent: false, skipped: true, reason: "no-recipients" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
      ...(input.attachments && input.attachments.length > 0
        ? { attachments: input.attachments }
        : {}),
    });

    if (error) {
      return { sent: false, skipped: false, reason: error.name ?? "provider-error" };
    }

    return { sent: true, skipped: false, id: data?.id };
  } catch (error) {
    const reason = error instanceof Error ? error.name : "unknown-error";
    return { sent: false, skipped: false, reason: `request-failed:${reason}` };
  }
}
