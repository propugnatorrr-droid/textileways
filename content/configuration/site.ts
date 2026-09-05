/**
 * Single source of truth for site wide configuration.
 *
 * Anything that appears in more than one place (site name, canonical URL,
 * navigation, contact channels) is declared here so it can be changed once.
 */

import { verifiedFactValue } from "./company-facts";

/*
 * Declared before `siteConfig`, because `resolveSiteUrl` runs while `siteConfig`
 * is being initialised. A `const` below that point would still be in its
 * temporal dead zone at that moment.
 */
const FALLBACK_SITE_URL = "https://www.textileways.com";

export const siteConfig = {
  name: "Textileways",
  legalNameFallback: "Textileways",
  /** Used for canonical URLs, sitemaps and absolute Open Graph image paths. */
  url: resolveSiteUrl(),
  locale: "en",
  /** Public facing one line description, reused as the default meta description. */
  description:
    "Textileways is a Pakistan based textile and apparel manufacturer producing custom apparel, uniforms, home textiles and specialist products for brands across the USA and Europe.",
  tagline: "One manufacturing partner. Every textile possibility.",
  positioning: "Startup flexibility. Enterprise manufacturing discipline.",
  commercialMessage: "Start at 50. Scale beyond 100,000.",
  /** Twitter or X handle, only rendered when the business confirms a profile. */
  twitterHandle: "",
} as const;

/** Strips a trailing slash so URL joins never produce a double slash. */
function normalizeUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

/**
 * Picks the first usable origin from a list of candidate values.
 *
 * A configured value can be absent, present but empty, or present but
 * malformed, and all three have to produce a working build rather than a crash.
 * The empty case is the common one: a platform can define a variable without
 * giving it a value, and `??` does not treat that as missing.
 *
 * Exported separately from `resolveSiteUrl` so the logic can be unit tested
 * without touching the real environment.
 */
export function pickSiteUrl(candidates: readonly (string | undefined)[]): string {
  for (const candidate of candidates) {
    const trimmed = candidate?.trim();
    if (!trimmed) continue;

    /* Vercel supplies a bare host, so add a scheme when one is missing. */
    const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

    try {
      const parsed = new URL(withScheme);
      if (parsed.hostname.length === 0) continue;
      return normalizeUrl(parsed.origin);
    } catch {
      /* Malformed value: try the next candidate rather than failing the build. */
    }
  }

  return FALLBACK_SITE_URL;
}

/**
 * Resolves the canonical origin for this deployment.
 *
 * Each variable is referenced literally rather than through a `process.env`
 * alias, because the bundler substitutes `process.env.NEXT_PUBLIC_*` at build
 * time by matching that exact expression. Reading them through a variable would
 * leave them undefined in the browser, and this origin appears inside the
 * WhatsApp links that client components render, so a server and client
 * difference would show up as a hydration mismatch.
 *
 * Only NEXT_PUBLIC_ sources are used, for the same reason. A server only value
 * such as VERCEL_URL would not survive into the browser.
 */
function resolveSiteUrl(): string {
  return pickSiteUrl([
    process.env.NEXT_PUBLIC_SITE_URL,
    /* Vercel system variables, present when system env vars are exposed. */
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
  ]);
}

/** Builds an absolute URL for canonical tags, sitemaps and structured data. */
export function absoluteUrl(path = "/"): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${suffix === "/" ? "" : suffix}`;
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  /** Analytics event name fired when the channel is used. */
  event: "email_click" | "phone_click" | "whatsapp_click";
}

/**
 * Contact channels are derived from the verified fact register, so an
 * unconfirmed phone number simply does not render anywhere on the site.
 */
export function contactChannels(): ContactChannel[] {
  const channels: ContactChannel[] = [];

  const email = verifiedFactValue("contact-email");
  if (email) {
    channels.push({
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      event: "email_click",
    });
  }

  const phone = verifiedFactValue("contact-phone");
  if (phone) {
    channels.push({
      label: "Telephone",
      value: phone,
      href: `tel:${phone.replace(/[^\d+]/g, "")}`,
      event: "phone_click",
    });
  }

  const whatsapp = verifiedFactValue("whatsapp-number");
  if (whatsapp) {
    channels.push({
      label: "WhatsApp",
      value: whatsapp,
      href: `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`,
      event: "whatsapp_click",
    });
  }

  return channels;
}

/** Social profiles. Left empty until the business confirms the accounts it owns. */
export const socialProfiles: { label: string; href: string }[] = [];
