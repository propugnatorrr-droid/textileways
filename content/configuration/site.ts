/**
 * Single source of truth for site wide configuration.
 *
 * Anything that appears in more than one place (site name, canonical URL,
 * navigation, contact channels) is declared here so it can be changed once.
 */

import { verifiedFactValue } from "./company-facts";

export const siteConfig = {
  name: "Textileways",
  legalNameFallback: "Textileways",
  /** Used for canonical URLs, sitemaps and absolute Open Graph image paths. */
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.textileways.com"),
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
