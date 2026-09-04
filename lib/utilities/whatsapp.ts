import { verifiedFactValue } from "@/content/configuration/company-facts";
import { siteConfig } from "@/content/configuration/site";

/**
 * WhatsApp deep links.
 *
 * Every WhatsApp action on the site is built here, so the number lives in one
 * place (the verified fact register) and every message opens with the same
 * structure: who the sender is contacting, and which page they came from.
 *
 * The prefilled text is a convenience for the sender, not a tracking mechanism.
 * It contains the site name and a human readable page label, and nothing about
 * the visitor.
 */

/** Digits only, as wa.me requires. Returns null when no number is verified. */
export function whatsappNumber(): string | null {
  const raw = verifiedFactValue("whatsapp-number");
  if (!raw) return null;
  const digits = raw.replace(/[^\d]/g, "");
  return digits.length >= 8 ? digits : null;
}

/** Display form of the number, for showing next to the action. */
export function whatsappDisplayNumber(): string | null {
  return verifiedFactValue("whatsapp-number");
}

export function whatsappEnabled(): boolean {
  return whatsappNumber() !== null;
}

export interface WhatsappContext {
  /** Human readable page name, for example "Streetwear" or "Request a quote". */
  pageLabel: string;
  /** Route path the visitor is on. */
  path: string;
  /** Optional extra line, for example the product family being viewed. */
  detail?: string;
}

const MAX_MESSAGE_LENGTH = 400;

/**
 * Builds the prefilled opening message.
 *
 * Kept short deliberately: a long prefilled message reads as automated and
 * people delete it rather than sending it.
 */
export function whatsappMessage(context: WhatsappContext): string {
  const lines = [
    `Hello ${siteConfig.name}, I have an enquiry.`,
    "",
    `Page: ${context.pageLabel}`,
  ];

  if (context.detail) lines.push(`About: ${context.detail}`);

  lines.push(`Link: ${siteConfig.url}${context.path === "/" ? "" : context.path}`);
  lines.push("", "My question:");

  return lines.join("\n").slice(0, MAX_MESSAGE_LENGTH);
}

/** Full wa.me link with the prefilled message, or null when unconfigured. */
export function whatsappHref(context: WhatsappContext): string | null {
  const number = whatsappNumber();
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(whatsappMessage(context))}`;
}

/**
 * Turns a route path into a readable page label.
 *
 * Used by the floating action, which only knows the pathname. Slugs are
 * de-hyphenated and a few well known routes get a friendlier name.
 */
const routeLabels: Record<string, string> = {
  "/": "Homepage",
  "/about": "About",
  "/why-textileways": "Why Textileways",
  "/factory": "The factory",
  "/quality": "Quality",
  "/certifications": "Certifications",
  "/sustainability": "Sustainability",
  "/responsibility": "Responsibility",
  "/traceability": "Traceability",
  "/manufacturing-process": "Manufacturing process",
  "/markets": "Markets",
  "/industries": "Industries",
  "/products": "Products",
  "/capabilities": "Capabilities",
  "/materials": "Materials",
  "/case-studies": "Case studies",
  "/insights": "Insights",
  "/faq": "Frequently asked questions",
  "/contact": "Contact",
  "/request-a-quote": "Request a quote",
  "/request-a-sample": "Request a sample",
  "/privacy": "Privacy policy",
  "/terms": "Terms of use",
  "/cookie-policy": "Cookie policy",
};

function titleCase(slug: string): string {
  const words = slug.replace(/-/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function labelForPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const known = routeLabels[clean];
  if (known) return known;

  const segments = clean.split("/").filter(Boolean);
  if (segments.length === 0) return "Homepage";

  const section = routeLabels[`/${segments[0]}`] ?? titleCase(segments[0]);
  if (segments.length === 1) return section;

  return `${section}: ${titleCase(segments[segments.length - 1])}`;
}
