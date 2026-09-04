import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/configuration/site";
import { staticRoutes } from "@/content/configuration/navigation";
import { productSlugs } from "@/content/fallback/products";
import { capabilitySlugs } from "@/content/fallback/capabilities";
import { materialSlugs } from "@/content/fallback/materials";
import { industrySlugs } from "@/content/fallback/industries";
import { marketSlugs } from "@/content/fallback/markets";
import { articles } from "@/content/fallback/articles";
import { publishedCaseStudies } from "@/content/fallback/case-studies";

/**
 * Sitemap.
 *
 * Built from the same content the pages render, so a new product family or
 * article appears here automatically. Legal pages are excluded because they are
 * marked noindex; unpublished case studies are excluded because they have no
 * route.
 */

const excludedFromSitemap = new Set(["/privacy", "/terms", "/cookie-policy"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes
    .filter((route) => !excludedFromSitemap.has(route))
    .map((route) => ({
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: priorityFor(route),
    }));

  const productEntries: MetadataRoute.Sitemap = productSlugs().map((slug) => ({
    url: absoluteUrl(`/products/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const capabilityEntries: MetadataRoute.Sitemap = capabilitySlugs().map((slug) => ({
    url: absoluteUrl(`/capabilities/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const materialEntries: MetadataRoute.Sitemap = materialSlugs().map((slug) => ({
    url: absoluteUrl(`/materials/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const industryEntries: MetadataRoute.Sitemap = industrySlugs().map((slug) => ({
    url: absoluteUrl(`/industries/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const marketEntries: MetadataRoute.Sitemap = marketSlugs().map((slug) => ({
    url: absoluteUrl(`/markets/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/insights/${article.slug}`),
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = publishedCaseStudies().map((study) => ({
    url: absoluteUrl(`/case-studies/${study.slug}`),
    lastModified: new Date(study.publishedAt),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...productEntries,
    ...capabilityEntries,
    ...materialEntries,
    ...industryEntries,
    ...marketEntries,
    ...articleEntries,
    ...caseStudyEntries,
  ];
}

function priorityFor(route: string): number {
  if (route === "/") return 1;
  if (route === "/request-a-quote" || route === "/products") return 0.9;
  if (route === "/capabilities" || route === "/contact" || route === "/request-a-sample") {
    return 0.8;
  }
  return 0.6;
}
