/**
 * Analytics abstraction.
 *
 * Every tracking call in the application goes through `track`. Nothing calls a
 * vendor global directly, so swapping or removing a provider is a change in this
 * one file.
 *
 * Two rules are enforced here rather than left to callers:
 *
 * 1. Personal data never leaves the application. Payload keys are restricted to
 *    an allowlist and values are sanitised, so an email address, a message body
 *    or a file name cannot be sent even if a caller passes one by mistake.
 * 2. Missing provider ids are not an error. When no analytics id is configured,
 *    `track` is a no operation and the site behaves normally.
 */

export type AnalyticsEvent =
  | "quote_cta_click"
  | "product_category_view"
  | "capability_view"
  | "rfq_start"
  | "rfq_step_complete"
  | "rfq_submit"
  | "sample_request_submit"
  | "contact_submit"
  | "file_upload_failure"
  | "download_click"
  | "whatsapp_click"
  | "email_click"
  | "phone_click"
  | "case_study_view"
  | "market_page_view";

/**
 * Context keys permitted on an analytics payload.
 *
 * This list is the privacy boundary. Adding a key here is a deliberate decision
 * that the value is non identifying.
 */
export const allowedContextKeys = [
  "page",
  "product_family",
  "capability",
  "material",
  "industry",
  "market",
  "quantity_band",
  "buyer_market",
  "cta_location",
  "step",
  "step_name",
  "reason",
  "file_type",
  "document",
] as const;

export type AnalyticsContextKey = (typeof allowedContextKeys)[number];
export type AnalyticsContext = Partial<Record<AnalyticsContextKey, string | number>>;

const allowedKeySet = new Set<string>(allowedContextKeys);

/** Values that look like personal data are dropped rather than truncated. */
const EMAIL_PATTERN = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const LONG_DIGIT_RUN = /\d{7,}/;
const MAX_VALUE_LENGTH = 64;

/**
 * Removes keys outside the allowlist and any value that looks identifying.
 * Exported so the behaviour can be unit tested directly.
 */
export function sanitizeContext(context: AnalyticsContext | undefined): Record<string, string | number> {
  if (!context) return {};

  const clean: Record<string, string | number> = {};

  for (const [key, rawValue] of Object.entries(context)) {
    if (!allowedKeySet.has(key)) continue;
    if (rawValue === undefined || rawValue === null) continue;

    if (typeof rawValue === "number") {
      if (Number.isFinite(rawValue)) clean[key] = rawValue;
      continue;
    }

    const value = String(rawValue).trim();
    if (value.length === 0) continue;
    if (value.length > MAX_VALUE_LENGTH) continue;
    if (EMAIL_PATTERN.test(value)) continue;
    if (LONG_DIGIT_RUN.test(value)) continue;

    clean[key] = value;
  }

  return clean;
}

interface GtagWindow extends Window {
  gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  clarity?: (command: string, ...args: unknown[]) => void;
}

/** True when at least one analytics provider is configured. */
export function analyticsEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_CLARITY_ID);
}

/**
 * Records an analytics event. Safe to call from anywhere: it does nothing on the
 * server, does nothing when no provider is configured, and never throws.
 */
export function track(event: AnalyticsEvent, context?: AnalyticsContext): void {
  if (typeof window === "undefined") return;

  const payload = sanitizeContext(context);

  try {
    const scope = window as GtagWindow;

    if (process.env.NEXT_PUBLIC_GA_ID && typeof scope.gtag === "function") {
      scope.gtag("event", event, payload);
    }

    if (process.env.NEXT_PUBLIC_CLARITY_ID && typeof scope.clarity === "function") {
      scope.clarity("event", event);
    }
  } catch {
    // Analytics must never break a page. Failures are swallowed by design.
  }
}
