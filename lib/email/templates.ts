import { siteConfig } from "@/content/configuration/site";

/**
 * Email templates.
 *
 * Plain, table free HTML with a matching text part. Every interpolated value
 * passes through `escapeHtml`, so a buyer typing markup into a form field cannot
 * inject it into the internal notification an employee opens.
 */

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface EmailField {
  label: string;
  value: string;
}

export interface EmailSection {
  title: string;
  fields: EmailField[];
}

const BASE_STYLES = {
  body: "margin:0;padding:24px;background:#f5f1e8;color:#17201d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;",
  card: "max-width:640px;margin:0 auto;background:#fcfaf5;border:1px solid #ddd8cf;padding:32px;",
  h1: "margin:0 0 8px;font-size:22px;line-height:1.25;font-weight:600;",
  reference: "margin:0 0 28px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#66716c;",
  h2: "margin:28px 0 10px;font-size:12px;letter-spacing:0.09em;text-transform:uppercase;color:#66716c;border-bottom:1px solid #ddd8cf;padding-bottom:6px;",
  label: "margin:0;font-size:13px;color:#66716c;",
  value: "margin:0 0 12px;font-size:15px;color:#17201d;white-space:pre-wrap;",
  footer: "margin:32px 0 0;padding-top:16px;border-top:1px solid #ddd8cf;font-size:13px;color:#66716c;",
};

function renderSectionsHtml(sections: EmailSection[]): string {
  return sections
    .filter((section) => section.fields.length > 0)
    .map((section) => {
      const fields = section.fields
        .map(
          (field) =>
            `<p style="${BASE_STYLES.label}">${escapeHtml(field.label)}</p>` +
            `<p style="${BASE_STYLES.value}">${escapeHtml(field.value)}</p>`,
        )
        .join("");
      return `<h2 style="${BASE_STYLES.h2}">${escapeHtml(section.title)}</h2>${fields}`;
    })
    .join("");
}

function renderSectionsText(sections: EmailSection[]): string {
  return sections
    .filter((section) => section.fields.length > 0)
    .map((section) => {
      const fields = section.fields
        .map((field) => `${field.label}: ${field.value}`)
        .join("\n");
      return `${section.title.toUpperCase()}\n${"-".repeat(section.title.length)}\n${fields}`;
    })
    .join("\n\n");
}

/** Internal notification sent to the sales team. */
export function internalNotification(input: {
  heading: string;
  reference: string;
  sections: EmailSection[];
  attachmentNote?: string;
}): { html: string; text: string } {
  const html = `<!doctype html><html lang="en"><body style="${BASE_STYLES.body}">
<div style="${BASE_STYLES.card}">
<h1 style="${BASE_STYLES.h1}">${escapeHtml(input.heading)}</h1>
<p style="${BASE_STYLES.reference}">Reference ${escapeHtml(input.reference)}</p>
${renderSectionsHtml(input.sections)}
${input.attachmentNote ? `<h2 style="${BASE_STYLES.h2}">Attachments</h2><p style="${BASE_STYLES.value}">${escapeHtml(input.attachmentNote)}</p>` : ""}
<p style="${BASE_STYLES.footer}">Sent from the ${escapeHtml(siteConfig.name)} website. Reply directly to this message to reach the sender.</p>
</div></body></html>`;

  const text = [
    input.heading,
    `Reference: ${input.reference}`,
    "",
    renderSectionsText(input.sections),
    input.attachmentNote ? `\nATTACHMENTS\n-----------\n${input.attachmentNote}` : "",
    "",
    `Sent from the ${siteConfig.name} website. Reply directly to reach the sender.`,
  ].join("\n");

  return { html, text };
}

/** Confirmation sent to the person who submitted the form. */
export function buyerConfirmation(input: {
  firstName: string;
  reference: string;
  heading: string;
  intro: string;
  nextSteps: string[];
  summary: EmailSection[];
}): { html: string; text: string } {
  const steps = input.nextSteps
    .map((step) => `<li style="margin:0 0 8px;">${escapeHtml(step)}</li>`)
    .join("");

  const html = `<!doctype html><html lang="en"><body style="${BASE_STYLES.body}">
<div style="${BASE_STYLES.card}">
<h1 style="${BASE_STYLES.h1}">${escapeHtml(input.heading)}</h1>
<p style="${BASE_STYLES.reference}">Reference ${escapeHtml(input.reference)}</p>
<p style="margin:0 0 16px;">${escapeHtml(`Hello ${input.firstName},`)}</p>
<p style="margin:0 0 20px;">${escapeHtml(input.intro)}</p>
<h2 style="${BASE_STYLES.h2}">What happens next</h2>
<ol style="margin:0 0 8px;padding-left:20px;">${steps}</ol>
${renderSectionsHtml(input.summary)}
<p style="${BASE_STYLES.footer}">Keep reference ${escapeHtml(input.reference)} for any follow up. This message confirms we received your submission; it is not a quotation or an acceptance of an order.</p>
</div></body></html>`;

  const text = [
    input.heading,
    `Reference: ${input.reference}`,
    "",
    `Hello ${input.firstName},`,
    "",
    input.intro,
    "",
    "WHAT HAPPENS NEXT",
    "-----------------",
    ...input.nextSteps.map((step, index) => `${index + 1}. ${step}`),
    "",
    renderSectionsText(input.summary),
    "",
    `Keep reference ${input.reference} for any follow up. This message confirms we received your submission; it is not a quotation or an acceptance of an order.`,
  ].join("\n");

  return { html, text };
}
