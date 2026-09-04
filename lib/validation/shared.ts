import { z } from "zod";

/**
 * Shared validation primitives.
 *
 * The same schemas run on the client for immediate feedback and on the server as
 * the actual trust boundary. Client side validation is a convenience; the server
 * never assumes a payload has already been checked.
 */

/** Strips control characters that have no place in a text field. */
function stripControlCharacters(value: string): string {
  return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "");
}

/** Collapses whitespace and removes control characters. */
export function sanitizeText(value: string): string {
  return stripControlCharacters(value).replace(/\s+/g, " ").trim();
}

/** Preserves line breaks for multi line fields while still removing control characters. */
export function sanitizeMultiline(value: string): string {
  return stripControlCharacters(value)
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export const shortText = (max = 120) =>
  z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(1, "This field is required").max(max, `Use ${max} characters or fewer`));

export const optionalShortText = (max = 120) =>
  z
    .string()
    .optional()
    .transform((value) => (value ? sanitizeText(value) : ""))
    .pipe(z.string().max(max, `Use ${max} characters or fewer`));

export const longText = (min = 1, max = 4000) =>
  z
    .string()
    .transform(sanitizeMultiline)
    .pipe(
      z
        .string()
        .min(min, min > 1 ? `Please give at least ${min} characters` : "This field is required")
        .max(max, `Use ${max} characters or fewer`),
    );

export const optionalLongText = (max = 4000) =>
  z
    .string()
    .optional()
    .transform((value) => (value ? sanitizeMultiline(value) : ""))
    .pipe(z.string().max(max, `Use ${max} characters or fewer`));

export const emailField = z
  .string()
  .transform((value) => sanitizeText(value).toLowerCase())
  .pipe(z.string().min(1, "A work email address is required").email("Enter a valid email address").max(254));

/**
 * Phone numbers vary too much internationally to validate strictly. This accepts
 * digits and the punctuation used in real numbers, and rejects anything else.
 */
export const phoneField = z
  .string()
  .transform(sanitizeText)
  .pipe(
    z
      .string()
      .min(6, "Enter a contact number including the country code")
      .max(32, "Use 32 characters or fewer")
      .regex(/^[+()\-.\s\d]+$/, "Use digits, spaces and the characters plus, minus, dot and brackets only"),
  );

export const optionalPhoneField = z
  .string()
  .optional()
  .transform((value) => (value ? sanitizeText(value) : ""))
  .pipe(
    z
      .string()
      .max(32, "Use 32 characters or fewer")
      .regex(/^$|^[+()\-.\s\d]+$/, "Use digits, spaces and the characters plus, minus, dot and brackets only"),
  );

/** Accepts a URL with or without a scheme and normalises it to https. */
export const optionalUrlField = z
  .string()
  .optional()
  .transform((value) => {
    const clean = value ? sanitizeText(value) : "";
    if (clean.length === 0) return "";
    return /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;
  })
  .pipe(
    z
      .string()
      .max(256)
      .refine((value) => value === "" || /^https:\/\/[^\s/$.?#].[^\s]*$/i.test(value) || /^http:\/\/[^\s/$.?#].[^\s]*$/i.test(value), {
        message: "Enter a valid website address",
      }),
  );

/** Consent must be explicitly true, so an unchecked box fails validation. */
export const requiredConsent = z.literal(true, {
  message: "Please confirm this to continue",
});

export const optionalConsent = z.boolean().optional().default(false);

/**
 * Honeypot field.
 *
 * A hidden input that a human never sees and never fills. Any value at all means
 * the submission came from an automated form filler.
 */
export const honeypotField = z
  .string()
  .optional()
  .refine((value) => !value || value.trim().length === 0, {
    message: "Submission rejected",
  });

/**
 * Minimum completion time.
 *
 * The client records when the form was rendered. A submission completed in under
 * a couple of seconds was not typed by a person.
 */
export const MIN_COMPLETION_MS = 2500;

export const formTimestampField = z
  .union([z.number(), z.string()])
  .transform((value) => (typeof value === "string" ? Number.parseInt(value, 10) : value))
  .pipe(z.number().int().positive("Submission rejected"));

/** True when the elapsed time between render and submit is plausible for a person. */
export function completedTooQuickly(startedAt: number, now: number = Date.now()): boolean {
  const elapsed = now - startedAt;
  // A negative elapsed time means a tampered timestamp, which is also rejected.
  return elapsed < MIN_COMPLETION_MS;
}

export const countryField = shortText(80);

/** ISO country list is not enforced, because buyers write territory names freely. */
export const buyerTypes = [
  "brand-owner",
  "retailer-or-wholesaler",
  "distributor-or-agent",
  "club-or-organisation",
  "corporate-buyer",
  "promotional-distributor",
  "other",
] as const;

export const buyerTypeLabels: Record<(typeof buyerTypes)[number], string> = {
  "brand-owner": "Brand owner",
  "retailer-or-wholesaler": "Retailer or wholesaler",
  "distributor-or-agent": "Distributor or agent",
  "club-or-organisation": "Club or organisation",
  "corporate-buyer": "Corporate buyer",
  "promotional-distributor": "Promotional products distributor",
  other: "Other",
};

export const companyStages = [
  "pre-launch",
  "launched-under-1-year",
  "established-1-5-years",
  "established-5-plus-years",
  "enterprise",
] as const;

export const companyStageLabels: Record<(typeof companyStages)[number], string> = {
  "pre-launch": "Pre launch, developing a first product",
  "launched-under-1-year": "Launched within the last year",
  "established-1-5-years": "Established, one to five years trading",
  "established-5-plus-years": "Established, more than five years trading",
  enterprise: "Enterprise or large organisation",
};

export const shippingTerms = [
  "exw",
  "fob",
  "cif",
  "cfr",
  "dap",
  "ddp",
  "not-sure",
] as const;

export const shippingTermLabels: Record<(typeof shippingTerms)[number], string> = {
  exw: "EXW, ex works",
  fob: "FOB, free on board",
  cif: "CIF, cost insurance and freight",
  cfr: "CFR, cost and freight",
  dap: "DAP, delivered at place",
  ddp: "DDP, delivered duty paid",
  "not-sure": "Not sure, please advise",
};
