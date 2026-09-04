import { describe, expect, it } from "vitest";
import {
  companyFacts,
  publicFacts,
  outstandingFacts,
  verifiedFactValue,
  isFactPublishable,
} from "@/content/configuration/company-facts";
import { productFamilies, productSlugs } from "@/content/fallback/products";
import { capabilities, capabilitySlugs, capabilitiesByGroup } from "@/content/fallback/capabilities";
import { materials, materialSlugs } from "@/content/fallback/materials";
import { industries, industrySlugs } from "@/content/fallback/industries";
import { markets, marketSlugs } from "@/content/fallback/markets";
import { articles } from "@/content/fallback/articles";
import { faqs, getFaqsByIds } from "@/content/fallback/faqs";
import { caseStudies, publishedCaseStudies } from "@/content/fallback/case-studies";
import { certificates, publicCertificates, resolveCertificateStatus } from "@/content/fallback/certificates";
import { staticRoutes } from "@/content/configuration/navigation";
import { outstandingMediaSlots, allMediaSlots } from "@/content/fallback/media";
import { classifyQuantity, quantityBandLabel } from "@/lib/utilities/quantity";
import { slugify, isValidSlug } from "@/lib/utilities/slug";
import { truncate, formatDate, formatQuantity } from "@/lib/utilities/format";
import { absoluteUrl } from "@/content/configuration/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { sanitizeContext } from "@/lib/analytics/track";
import { whatsappMessage, labelForPath, whatsappNumber } from "@/lib/utilities/whatsapp";

describe("content integrity: verification status filtering", () => {
  it("never publishes a fact that is not verified", () => {
    for (const fact of publicFacts()) {
      expect(fact.status).toBe("verified");
      expect(fact.value.trim().length).toBeGreaterThan(0);
    }
  });

  it("returns null for a fact marked do not publish", () => {
    expect(verifiedFactValue("employee-count")).toBeNull();
    expect(verifiedFactValue("monthly-capacity")).toBeNull();
    expect(verifiedFactValue("on-time-delivery")).toBeNull();
    expect(verifiedFactValue("defect-rate")).toBeNull();
    expect(verifiedFactValue("countries-served")).toBeNull();
  });

  it("returns null for a pending fact with no value", () => {
    expect(verifiedFactValue("legal-entity-name")).toBeNull();
    expect(verifiedFactValue("factory-address")).toBeNull();
  });

  it("publishes the facts confirmed in the brief", () => {
    expect(verifiedFactValue("country")).toBe("Pakistan");
    expect(verifiedFactValue("experience-years")).toBe("More than 20 years");
    expect(verifiedFactValue("moq-minimum")).toBe("From approximately 50 pieces");
    expect(verifiedFactValue("capacity-ceiling")).toBe("Beyond 100,000 pieces");
    expect(verifiedFactValue("primary-markets")).toBe("United States and Europe");
  });

  it("reports the WhatsApp number supplied by the business", () => {
    expect(isFactPublishable("whatsapp-number")).toBe(true);
    expect(whatsappNumber()).toBe("923362605238");
  });

  it("keeps every unverified fact in the outstanding list", () => {
    const outstandingIds = outstandingFacts().map((fact) => fact.id);
    const unverified = companyFacts
      .filter((fact) => fact.status !== "verified" || fact.value.trim().length === 0)
      .map((fact) => fact.id);
    expect(outstandingIds).toEqual(unverified);
  });
});

describe("content integrity: no fabricated evidence", () => {
  it("publishes no case studies, because none are evidenced", () => {
    expect(publishedCaseStudies()).toHaveLength(0);
  });

  it("would still filter unevidenced records if any existed", () => {
    const unevidenced = caseStudies.filter((study) => study.evidenceStatus !== "published");
    for (const study of unevidenced) {
      expect(publishedCaseStudies()).not.toContain(study);
    }
  });

  it("publishes no certificates, because none have been supplied", () => {
    expect(certificates).toHaveLength(0);
    expect(publicCertificates()).toHaveLength(0);
  });

  it("recomputes an expired certificate as expired regardless of its stored status", () => {
    const expired = {
      id: "test",
      name: "Test standard",
      issuingOrganization: "Test body",
      certificateNumber: "TB-1234",
      facility: "Test facility",
      scope: "Test scope",
      issuedOn: "2020-01-01",
      expiresOn: "2021-01-01",
      status: "active" as const,
      publiclyVisible: true,
    };
    expect(resolveCertificateStatus(expired)).toBe("expired");
  });

  it("flags a certificate nearing expiry", () => {
    const soon = new Date();
    soon.setDate(soon.getDate() + 20);
    const expiring = {
      id: "test",
      name: "Test standard",
      issuingOrganization: "Test body",
      certificateNumber: "TB-1234",
      facility: "Test facility",
      scope: "Test scope",
      issuedOn: "2024-01-01",
      expiresOn: soon.toISOString().slice(0, 10),
      status: "active" as const,
      publiclyVisible: true,
    };
    expect(resolveCertificateStatus(expiring)).toBe("expiring-soon");
  });

  it("carries no testimonials in the fallback content", () => {
    for (const study of caseStudies) {
      expect(study.testimonial).toBeUndefined();
    }
  });
});

describe("seed content completeness", () => {
  it("has the thirteen required product families", () => {
    expect(productFamilies).toHaveLength(13);
  });

  it("has the thirty required capabilities", () => {
    expect(capabilities).toHaveLength(30);
  });

  it("has at least twelve materials", () => {
    expect(materials.length).toBeGreaterThanOrEqual(12);
  });

  it("has the ten required industries", () => {
    expect(industries).toHaveLength(10);
  });

  it("has the three required markets", () => {
    expect(markets.map((market) => market.slug)).toEqual(["usa", "europe", "uk"]);
  });

  it("has at least ten FAQs", () => {
    expect(faqs.length).toBeGreaterThanOrEqual(10);
  });

  it("has at least three articles", () => {
    expect(articles.length).toBeGreaterThanOrEqual(3);
  });

  it("provides at least twelve representative product types", () => {
    const total = productFamilies.reduce((sum, family) => sum + family.productTypes.length, 0);
    expect(total).toBeGreaterThanOrEqual(12);
  });
});

describe("content consistency", () => {
  it("uses unique slugs within every collection", () => {
    for (const slugs of [productSlugs(), capabilitySlugs(), materialSlugs(), industrySlugs(), marketSlugs()]) {
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("uses well formed slugs everywhere", () => {
    for (const slug of [...productSlugs(), ...capabilitySlugs(), ...materialSlugs()]) {
      expect(isValidSlug(slug)).toBe(true);
    }
  });

  it("references only materials that exist", () => {
    const known = new Set(materialSlugs());
    for (const family of productFamilies) {
      for (const slug of family.typicalMaterials) expect(known.has(slug)).toBe(true);
      for (const slug of family.relatedMaterials) expect(known.has(slug)).toBe(true);
    }
  });

  it("references only capabilities that exist", () => {
    const known = new Set(capabilitySlugs());
    for (const family of productFamilies) {
      for (const slug of family.relatedCapabilities) expect(known.has(slug)).toBe(true);
      for (const slug of family.decorationOptions) expect(known.has(slug)).toBe(true);
    }
  });

  it("references only industries that exist", () => {
    const known = new Set(industrySlugs());
    for (const family of productFamilies) {
      for (const slug of family.relatedIndustries) expect(known.has(slug)).toBe(true);
    }
  });

  it("references only FAQ ids that exist", () => {
    const sources = [
      ...productFamilies.map((item) => item.faqIds),
      ...capabilities.map((item) => item.faqIds),
      ...industries.map((item) => item.faqIds),
      ...markets.map((item) => item.faqIds),
      ...articles.map((item) => item.faqIds),
    ];
    for (const ids of sources) {
      expect(getFaqsByIds(ids)).toHaveLength(ids.length);
    }
  });

  it("gives every product family a truthful capability status", () => {
    const allowed = new Set([
      "in-house",
      "audited-partner",
      "developed-and-sourced",
      "after-technical-review",
    ]);
    for (const family of productFamilies) {
      expect(allowed.has(family.capabilityStatus)).toBe(true);
    }
  });

  it("states minimum quantity as conditional on every product family", () => {
    for (const family of productFamilies) {
      expect(family.moqGuidance.toLowerCase()).toContain("depends on");
    }
  });

  it("states limitations on every capability", () => {
    for (const capability of capabilities) {
      expect(capability.limitations.length).toBeGreaterThan(0);
    }
  });

  it("buckets every capability into a group", () => {
    const grouped = capabilitiesByGroup().reduce(
      (total, bucket) => total + bucket.items.length,
      0,
    );
    expect(grouped).toBe(capabilities.length);
  });

  it("gives every page an SEO title and description", () => {
    const records = [
      ...productFamilies,
      ...capabilities,
      ...materials,
      ...industries,
      ...markets,
      ...articles,
    ];
    for (const record of records) {
      expect(record.seo.title.length).toBeGreaterThan(5);
      expect(record.seo.description.length).toBeGreaterThan(30);
    }
  });
});

describe("public copy rules", () => {
  /** The brief forbids em dashes and en dashes in public website copy. */
  const DASHES = /[—–]/;

  it("uses no em dashes or en dashes in seeded copy", () => {
    const strings: string[] = [];

    for (const family of productFamilies) {
      strings.push(family.summary, family.moqGuidance, family.samplingGuidance, ...family.introduction);
    }
    for (const capability of capabilities) {
      strings.push(capability.summary, ...capability.introduction, ...capability.limitations);
    }
    for (const material of materials) {
      strings.push(material.summary, ...material.introduction);
    }
    for (const faq of faqs) strings.push(faq.question, faq.answer);
    for (const article of articles) {
      strings.push(article.title, article.summary);
      for (const section of article.sections) strings.push(...section.paragraphs);
    }

    const offenders = strings.filter((value) => DASHES.test(value));
    expect(offenders).toEqual([]);
  });

  it("avoids unsupported superiority claims", () => {
    const banned = /\b(world class|best quality|number one|market leader|unbeatable)\b/i;
    const strings = [
      ...productFamilies.flatMap((family) => [family.summary, ...family.introduction]),
      ...capabilities.flatMap((capability) => [capability.summary, ...capability.introduction]),
    ];
    expect(strings.filter((value) => banned.test(value))).toEqual([]);
  });

  it("publishes no fixed price or guaranteed lead time in product copy", () => {
    const banned = /\b(guaranteed delivery|fixed price|price per piece is)\b/i;
    for (const family of productFamilies) {
      expect(banned.test(family.moqGuidance)).toBe(false);
      expect(banned.test(family.samplingGuidance)).toBe(false);
    }
  });
});

describe("media slots", () => {
  it("declares every media slot as a documented placeholder while photography is outstanding", () => {
    expect(outstandingMediaSlots().length).toBe(allMediaSlots().length);
  });

  it("gives every media slot alt text and dimensions", () => {
    for (const asset of allMediaSlots()) {
      expect(asset.alt.length).toBeGreaterThan(0);
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
    }
  });

  it("embeds no remote image URLs", () => {
    for (const asset of allMediaSlots()) {
      expect(asset.src.startsWith("/images/")).toBe(true);
    }
  });

  it("writes a photography brief for every outstanding slot", () => {
    for (const asset of outstandingMediaSlots()) {
      expect(asset.caption && asset.caption.length).toBeGreaterThan(20);
    }
  });
});

describe("quantity classification", () => {
  it("bands quantities as documented", () => {
    expect(classifyQuantity(50)).toBe("validation");
    expect(classifyQuantity(249)).toBe("validation");
    expect(classifyQuantity(250)).toBe("small");
    expect(classifyQuantity(999)).toBe("small");
    expect(classifyQuantity(1_000)).toBe("growth");
    expect(classifyQuantity(9_999)).toBe("growth");
    expect(classifyQuantity(10_000)).toBe("wholesale");
    expect(classifyQuantity(99_999)).toBe("wholesale");
    expect(classifyQuantity(100_000)).toBe("enterprise");
    expect(classifyQuantity(1_000_000)).toBe("enterprise");
  });

  it("treats a below minimum quantity as a validation run rather than rejecting it", () => {
    expect(classifyQuantity(10)).toBe("validation");
  });

  it("returns null for a nonsensical quantity", () => {
    expect(classifyQuantity(0)).toBeNull();
    expect(classifyQuantity(-5)).toBeNull();
    expect(classifyQuantity(Number.NaN)).toBeNull();
    expect(classifyQuantity(Number.POSITIVE_INFINITY)).toBeNull();
  });

  it("produces a readable band label", () => {
    expect(quantityBandLabel(500)).toBe("250 to 999 pieces");
    expect(quantityBandLabel(0)).toBeNull();
  });
});

describe("url and formatting helpers", () => {
  it("builds absolute URLs without a double slash", () => {
    expect(absoluteUrl("/products")).toMatch(/^https?:\/\/[^/]+\/products$/);
    expect(absoluteUrl("/")).not.toMatch(/\/$/);
  });

  it("slugifies text safely", () => {
    expect(slugify("Cut and Sew Manufacturing")).toBe("cut-and-sew-manufacturing");
    expect(slugify("  Mixed --- Punctuation!  ")).toBe("mixed-punctuation");
  });

  it("rejects a crafted slug", () => {
    expect(isValidSlug("../../etc/passwd")).toBe(false);
    expect(isValidSlug("Not A Slug")).toBe(false);
    expect(isValidSlug("valid-slug-1")).toBe(true);
  });

  it("truncates on a word boundary", () => {
    const long = "The quick brown fox jumps over the lazy dog repeatedly and without pause";
    const result = truncate(long, 30);
    expect(result.length).toBeLessThanOrEqual(30);
    expect(result.endsWith("...")).toBe(true);
  });

  it("leaves short text alone", () => {
    expect(truncate("Short", 30)).toBe("Short");
  });

  it("formats dates and quantities", () => {
    expect(formatDate("2026-02-10")).toBe("10 February 2026");
    expect(formatQuantity(100000)).toBe("100,000");
  });

  it("returns the raw value for an unparsable date", () => {
    expect(formatDate("not a date")).toBe("not a date");
  });
});

describe("metadata helper", () => {
  const metadata = buildMetadata({
    title: "Streetwear manufacturing",
    description: "Heavyweight hoodies and cut and sew streetwear.",
    path: "/products/streetwear",
  });

  it("sets a canonical URL", () => {
    expect(metadata.alternates?.canonical).toContain("/products/streetwear");
  });

  it("sets Open Graph and Twitter metadata", () => {
    expect(metadata.openGraph?.title).toContain("Streetwear manufacturing");
    expect(metadata.twitter).toBeDefined();
  });

  it("marks legal pages as noindex when requested", () => {
    const legal = buildMetadata({
      title: "Privacy",
      description: "Privacy policy",
      path: "/privacy",
      noIndex: true,
    });
    expect(legal.robots).toEqual({ index: false, follow: false });
  });
});

describe("analytics sanitisation", () => {
  it("drops keys outside the allowlist", () => {
    const result = sanitizeContext({
      page: "/products",
      // @ts-expect-error deliberately passing a key that is not allowed
      email: "buyer@example.com",
    });
    expect(result).toEqual({ page: "/products" });
  });

  it("drops a value that looks like an email address", () => {
    const result = sanitizeContext({ market: "buyer@example.com" });
    expect(result.market).toBeUndefined();
  });

  it("drops a value containing a long run of digits", () => {
    const result = sanitizeContext({ market: "+92 3362605238" });
    expect(result.market).toBeUndefined();
  });

  it("keeps safe values", () => {
    const result = sanitizeContext({
      product_family: "streetwear",
      quantity_band: "250 to 999 pieces",
      cta_location: "home_hero",
      step: 3,
    });
    expect(result).toEqual({
      product_family: "streetwear",
      quantity_band: "250 to 999 pieces",
      cta_location: "home_hero",
      step: 3,
    });
  });

  it("drops empty and overlong values", () => {
    expect(sanitizeContext({ page: "" })).toEqual({});
    expect(sanitizeContext({ page: "x".repeat(200) })).toEqual({});
  });

  it("returns an empty object when given nothing", () => {
    expect(sanitizeContext(undefined)).toEqual({});
  });
});

describe("WhatsApp deep links", () => {
  it("names the site and the page in the prefilled message", () => {
    const message = whatsappMessage({ pageLabel: "Streetwear", path: "/products/streetwear" });
    expect(message).toContain("Textileways");
    expect(message).toContain("Page: Streetwear");
    expect(message).toContain("/products/streetwear");
  });

  it("includes an optional detail line when supplied", () => {
    const message = whatsappMessage({
      pageLabel: "Products",
      path: "/products/streetwear",
      detail: "Streetwear",
    });
    expect(message).toContain("About: Streetwear");
  });

  it("keeps the message short enough to be readable", () => {
    const message = whatsappMessage({ pageLabel: "Homepage", path: "/" });
    expect(message.length).toBeLessThanOrEqual(400);
  });

  it("labels known routes", () => {
    expect(labelForPath("/")).toBe("Homepage");
    expect(labelForPath("/request-a-quote")).toBe("Request a quote");
    expect(labelForPath("/products")).toBe("Products");
  });

  it("labels dynamic routes with their section and slug", () => {
    expect(labelForPath("/products/streetwear")).toBe("Products: Streetwear");
    expect(labelForPath("/capabilities/screen-printing")).toBe("Capabilities: Screen printing");
  });

  it("handles a trailing slash", () => {
    expect(labelForPath("/products/")).toBe("Products");
  });
});

describe("route coverage", () => {
  it("declares every required core route", () => {
    const required = [
      "/",
      "/about",
      "/why-textileways",
      "/factory",
      "/quality",
      "/certifications",
      "/sustainability",
      "/responsibility",
      "/traceability",
      "/manufacturing-process",
      "/faq",
      "/contact",
      "/request-a-quote",
      "/request-a-sample",
      "/privacy",
      "/terms",
      "/cookie-policy",
      "/products",
      "/capabilities",
      "/materials",
      "/industries",
      "/markets",
      "/case-studies",
      "/insights",
    ];
    for (const route of required) {
      expect(staticRoutes).toContain(route);
    }
  });
});
