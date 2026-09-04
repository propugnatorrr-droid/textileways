import { randomUUID, createHash } from "node:crypto";

/**
 * Human readable submission references.
 *
 * Format: PREFIX-YYMM-XXXXX, for example RFQ-2609-7K4QD.
 *
 * The date segment lets staff sort inquiries at a glance, and the random segment
 * uses an alphabet with the visually ambiguous characters removed, so a
 * reference read aloud on a call or copied from an email is not misheard.
 */

/** Crockford style alphabet: no I, L, O, U, or digits 0 and 1. */
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ";
const RANDOM_LENGTH = 5;

export type ReferencePrefix = "RFQ" | "SMP" | "MSG";

export function generateReference(
  prefix: ReferencePrefix,
  now: Date = new Date(),
): string {
  const year = String(now.getUTCFullYear()).slice(-2);
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");

  const bytes = randomUUID().replace(/-/g, "");
  let random = "";
  for (let index = 0; index < RANDOM_LENGTH; index += 1) {
    const chunk = Number.parseInt(bytes.slice(index * 2, index * 2 + 2), 16);
    random += ALPHABET[chunk % ALPHABET.length];
  }

  return `${prefix}-${year}${month}-${random}`;
}

/** True when a string has the shape this module produces. */
export function isValidReference(value: string): boolean {
  return new RegExp(`^(RFQ|SMP|MSG)-\\d{4}-[${ALPHABET}]{${RANDOM_LENGTH}}$`).test(value);
}

/**
 * Duplicate submission guard.
 *
 * A short lived fingerprint of the submitting client and the essential content
 * of the submission. Resubmitting the same content within the window, which is
 * what a double click or a retried request produces, is recognised and the
 * original reference is returned instead of creating a second inquiry.
 *
 * Only a hash is stored, never the submission content itself.
 */
const recentSubmissions = new Map<string, { reference: string; at: number }>();
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_TRACKED = 2000;

export function fingerprintSubmission(parts: readonly string[]): string {
  return createHash("sha256").update(parts.join("|")).digest("hex").slice(0, 32);
}

/**
 * Returns the reference of a matching recent submission, or null when this is a
 * new one. Call `recordSubmission` once the submission has been accepted.
 */
export function findDuplicate(fingerprint: string, now: number = Date.now()): string | null {
  const existing = recentSubmissions.get(fingerprint);
  if (!existing) return null;
  if (now - existing.at > DUPLICATE_WINDOW_MS) {
    recentSubmissions.delete(fingerprint);
    return null;
  }
  return existing.reference;
}

export function recordSubmission(
  fingerprint: string,
  reference: string,
  now: number = Date.now(),
): void {
  if (recentSubmissions.size > MAX_TRACKED) {
    for (const [key, value] of recentSubmissions) {
      if (now - value.at > DUPLICATE_WINDOW_MS) recentSubmissions.delete(key);
    }
    if (recentSubmissions.size > MAX_TRACKED) recentSubmissions.clear();
  }
  recentSubmissions.set(fingerprint, { reference, at: now });
}

/** Clears the duplicate cache. Exposed for tests. */
export function resetSubmissionCache(): void {
  recentSubmissions.clear();
}
