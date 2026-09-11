import { absoluteUrl, siteConfig, socialProfiles } from "@/content/configuration/site";
import { verifiedFactValue } from "@/content/configuration/company-facts";
import type { Article, Capability, ProductFamily } from "@/content/types";

/**
 * JSON LD builders.
 *
 * Structured data is generated from the same verified fact register the visible
 * pages use, so nothing appears in machine readable markup that is not also
 * true on the page. Product schema deliberately carries no price, availability,
 * rating or review, because none of those exist for a manufacturing category.
 */

type JsonLd = Record<string, unknown>;

const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/**
 * Single Organization node covering both the corporate entity and its
 * manufacturing profile.
 *
 * A separate "#manufacturer" Organization node used to exist here, linked to
 * this one via parentOrganization. Since both nodes carried the identical
 * name ("TextileWays" as a "subsidiary" of "TextileWays"), that read as
 * self-referential to entity resolution rather than adding information.
 * Merged into one node: the manufacturing description now lives in
 * `description`, and `knowsAbout` / `areaServed` carry the capability and
 * market detail the second node used to hold. Uses the Organization type
 * rather than LocalBusiness, because no verified street address or opening
 * hours exist and LocalBusiness markup without them is misleading.
 */
export function organizationSchema(): JsonLd {
  const legalName = verifiedFactValue("legal-entity-name");
  const email = verifiedFactValue("contact-email");
  const phone = verifiedFactValue("contact-phone");
  const address = verifiedFactValue("factory-address");
  const country = verifiedFactValue("country");

  const schema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description:
      "Textile and apparel manufacturing including product development, material sourcing, sampling, cut and sew production, decoration, private labelling, quality assurance and export.",
    slogan: siteConfig.tagline,
    knowsAbout: [
      "Apparel manufacturing",
      "Textile manufacturing",
      "Cut and sew production",
      "Private label manufacturing",
      "Garment decoration",
      "Export and logistics",
    ],
    areaServed: ["US", "GB", "EU", "AU"],
  };

  if (legalName) schema.legalName = legalName;
  if (email) schema.email = email;
  if (phone) schema.telephone = phone;
  if (socialProfiles.length > 0) schema.sameAs = socialProfiles.map((p) => p.href);

  if (address || country) {
    schema.address = {
      "@type": "PostalAddress",
      ...(address ? { streetAddress: address } : {}),
      ...(country ? { addressCountry: country } : {}),
    };
  }

  return schema;
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
  };
}

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export function breadcrumbSchema(entries: BreadcrumbEntry[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

/**
 * Product schema for a manufactured category.
 * No offers, price, availability, rating or review are emitted, because a
 * manufacturing category is not a purchasable retail item.
 */
export function productFamilySchema(family: ProductFamily): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: family.name,
    description: family.summary,
    url: absoluteUrl(`/products/${family.slug}`),
    category: "Apparel and textile manufacturing",
    manufacturer: { "@id": ORGANIZATION_ID },
    material: family.typicalMaterials.join(", "),
    additionalProperty: family.weightGuidance.map((row) => ({
      "@type": "PropertyValue",
      name: row.label,
      value: row.value,
    })),
  };
}

export function serviceSchema(capability: Capability): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: capability.name,
    description: capability.summary,
    url: absoluteUrl(`/capabilities/${capability.slug}`),
    provider: { "@id": ORGANIZATION_ID },
    serviceType: capability.name,
    areaServed: ["US", "GB", "EU", "AU"],
  };
}

export function articleSchema(article: Article): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    url: absoluteUrl(`/insights/${article.slug}`),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
  };
}

/**
 * FAQ schema. Only emitted when the questions are genuinely visible on the page,
 * which is the condition search engines require.
 */
export function faqSchema(items: { question: string; answer: string }[]): JsonLd | null {
  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function imageObjectSchema(input: {
  url: string;
  caption: string;
  width: number;
  height: number;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: absoluteUrl(input.url),
    caption: input.caption,
    width: input.width,
    height: input.height,
  };
}

export function videoObjectSchema(input: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  uploadDate: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    thumbnailUrl: absoluteUrl(input.thumbnailUrl),
    contentUrl: absoluteUrl(input.contentUrl),
    uploadDate: input.uploadDate,
  };
}
