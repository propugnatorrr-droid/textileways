import "server-only";

import { cmsFetch, cmsEnabled } from "./client";
import {
  productListQuery,
  productBySlugQuery,
  productSlugsQuery,
  capabilityListQuery,
  capabilityBySlugQuery,
  capabilitySlugsQuery,
  materialListQuery,
  materialBySlugQuery,
  materialSlugsQuery,
  industryListQuery,
  industryBySlugQuery,
  marketListQuery,
  marketBySlugQuery,
  articleListQuery,
  articleBySlugQuery,
  caseStudyListQuery,
  caseStudyBySlugQuery,
  publicCertificatesQuery,
  faqListQuery,
} from "@/sanity/queries";

import type {
  Article,
  Capability,
  CaseStudy,
  Certificate,
  FaqItem,
  Industry,
  Material,
  Market,
  ProductFamily,
} from "@/content/types";

import { productFamilies, getProductFamily, productSlugs } from "@/content/fallback/products";
import { capabilities, getCapability, capabilitySlugs } from "@/content/fallback/capabilities";
import { materials, getMaterial, materialSlugs } from "@/content/fallback/materials";
import { industries, getIndustry } from "@/content/fallback/industries";
import { markets, getMarket } from "@/content/fallback/markets";
import { getArticle, articlesByDate } from "@/content/fallback/articles";
import { publishedCaseStudies, getPublishedCaseStudy } from "@/content/fallback/case-studies";
import { publicCertificates } from "@/content/fallback/certificates";
import { faqs } from "@/content/fallback/faqs";

/**
 * Content access layer.
 *
 * Every page reads through these functions rather than importing the fallback
 * content directly. Each one tries the CMS first and falls back to the typed
 * content in this repository when the CMS is not configured, returns nothing, or
 * fails.
 *
 * That means three things at once:
 *
 * - the site is fully functional today with no CMS connected
 * - connecting Sanity later requires no page changes
 * - a CMS outage degrades to the built in content rather than an error page
 */

/** Returns the CMS result when it has content, otherwise the fallback. */
function preferCms<T>(cmsResult: T[] | null, fallback: T[]): T[] {
  if (cmsResult && cmsResult.length > 0) return cmsResult;
  return fallback;
}

function preferCmsItem<T>(cmsResult: T | null, fallback: T | undefined): T | undefined {
  return cmsResult ?? fallback;
}

/* -------------------------------------------------------------------------- */
/* Products                                                                    */
/* -------------------------------------------------------------------------- */

export async function getProductFamilies(): Promise<ProductFamily[]> {
  const result = await cmsFetch<ProductFamily[]>(productListQuery, {}, { tags: ["products"] });
  return preferCms(result, productFamilies);
}

export async function getProductFamilyBySlug(slug: string): Promise<ProductFamily | undefined> {
  const result = await cmsFetch<ProductFamily>(
    productBySlugQuery,
    { slug },
    { tags: ["products", `product:${slug}`] },
  );
  return preferCmsItem(result, getProductFamily(slug));
}

export async function getProductSlugs(): Promise<string[]> {
  const result = await cmsFetch<string[]>(productSlugsQuery, {}, { tags: ["products"] });
  return preferCms(result, productSlugs());
}

/* -------------------------------------------------------------------------- */
/* Capabilities                                                                */
/* -------------------------------------------------------------------------- */

export async function getCapabilities(): Promise<Capability[]> {
  const result = await cmsFetch<Capability[]>(capabilityListQuery, {}, { tags: ["capabilities"] });
  return preferCms(result, capabilities);
}

export async function getCapabilityBySlug(slug: string): Promise<Capability | undefined> {
  const result = await cmsFetch<Capability>(
    capabilityBySlugQuery,
    { slug },
    { tags: ["capabilities", `capability:${slug}`] },
  );
  return preferCmsItem(result, getCapability(slug));
}

export async function getCapabilitySlugs(): Promise<string[]> {
  const result = await cmsFetch<string[]>(capabilitySlugsQuery, {}, { tags: ["capabilities"] });
  return preferCms(result, capabilitySlugs());
}

/* -------------------------------------------------------------------------- */
/* Materials                                                                   */
/* -------------------------------------------------------------------------- */

export async function getMaterials(): Promise<Material[]> {
  const result = await cmsFetch<Material[]>(materialListQuery, {}, { tags: ["materials"] });
  return preferCms(result, materials);
}

export async function getMaterialBySlug(slug: string): Promise<Material | undefined> {
  const result = await cmsFetch<Material>(
    materialBySlugQuery,
    { slug },
    { tags: ["materials", `material:${slug}`] },
  );
  return preferCmsItem(result, getMaterial(slug));
}

export async function getMaterialSlugs(): Promise<string[]> {
  const result = await cmsFetch<string[]>(materialSlugsQuery, {}, { tags: ["materials"] });
  return preferCms(result, materialSlugs());
}

/* -------------------------------------------------------------------------- */
/* Industries and markets                                                      */
/* -------------------------------------------------------------------------- */

export async function getIndustries(): Promise<Industry[]> {
  const result = await cmsFetch<Industry[]>(industryListQuery, {}, { tags: ["industries"] });
  return preferCms(result, industries);
}

export async function getIndustryBySlug(slug: string): Promise<Industry | undefined> {
  const result = await cmsFetch<Industry>(
    industryBySlugQuery,
    { slug },
    { tags: ["industries", `industry:${slug}`] },
  );
  return preferCmsItem(result, getIndustry(slug));
}

export async function getMarkets(): Promise<Market[]> {
  const result = await cmsFetch<Market[]>(marketListQuery, {}, { tags: ["markets"] });
  return preferCms(result, markets);
}

export async function getMarketBySlug(slug: string): Promise<Market | undefined> {
  const result = await cmsFetch<Market>(
    marketBySlugQuery,
    { slug },
    { tags: ["markets", `market:${slug}`] },
  );
  return preferCmsItem(result, getMarket(slug));
}

/* -------------------------------------------------------------------------- */
/* Articles                                                                    */
/* -------------------------------------------------------------------------- */

export async function getArticles(): Promise<Article[]> {
  const result = await cmsFetch<Article[]>(articleListQuery, {}, { tags: ["articles"] });
  return preferCms(result, articlesByDate());
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const result = await cmsFetch<Article>(
    articleBySlugQuery,
    { slug },
    { tags: ["articles", `article:${slug}`] },
  );
  return preferCmsItem(result, getArticle(slug));
}

export async function getArticleSlugs(): Promise<string[]> {
  const list = await getArticles();
  return list.map((article) => article.slug);
}

/* -------------------------------------------------------------------------- */
/* Case studies                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Only evidenced case studies are ever returned. The GROQ query filters on
 * `evidenceStatus == "published"` and the fallback list filters on the same
 * field, so both sources apply the identical rule.
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const result = await cmsFetch<CaseStudy[]>(caseStudyListQuery, {}, { tags: ["case-studies"] });
  if (result === null) return publishedCaseStudies();
  return result.filter((study) => study.evidenceStatus === "published");
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  const result = await cmsFetch<CaseStudy>(
    caseStudyBySlugQuery,
    { slug },
    { tags: ["case-studies", `case-study:${slug}`] },
  );
  if (result && result.evidenceStatus === "published") return result;
  return getPublishedCaseStudy(slug);
}

/* -------------------------------------------------------------------------- */
/* Certificates and FAQs                                                       */
/* -------------------------------------------------------------------------- */

export async function getCertificates(): Promise<Certificate[]> {
  const result = await cmsFetch<Certificate[]>(
    publicCertificatesQuery,
    {},
    { tags: ["certificates"] },
  );
  if (result === null) return publicCertificates();
  /* The expiry check is reapplied here so a stale status field cannot promote one. */
  return result.filter((certificate) => new Date(certificate.expiresOn).getTime() > Date.now());
}

export async function getFaqs(): Promise<FaqItem[]> {
  const result = await cmsFetch<FaqItem[]>(faqListQuery, {}, { tags: ["faqs"] });
  return preferCms(result, faqs);
}

/** True when a CMS is configured. Used by the deployment documentation check. */
export function isCmsConnected(): boolean {
  return cmsEnabled();
}
