import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/content/configuration/site";

/**
 * Robots configuration.
 *
 * Preview deployments are disallowed entirely, so a Vercel preview URL cannot be
 * indexed and compete with production. Vercel sets VERCEL_ENV to "preview" for
 * those builds.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "development";

  if (process.env.VERCEL_ENV && !isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
