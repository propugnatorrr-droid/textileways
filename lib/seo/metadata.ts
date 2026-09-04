import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/content/configuration/site";
import { truncate } from "@/lib/utilities/format";

/**
 * Metadata helpers.
 *
 * Every route builds its metadata through `buildMetadata` so canonical URLs,
 * Open Graph tags and Twitter tags are consistent and never forgotten.
 */

export interface PageMetadataInput {
  title: string;
  description: string;
  /** Route path beginning with a slash. */
  path: string;
  /** Set on legal and utility routes that should not be indexed. */
  noIndex?: boolean;
  /** Overrides the default social image. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
  image = "/opengraph-image",
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const cleanDescription = truncate(description, 158);
  const fullTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;

  return {
    title,
    description: cleanDescription,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    openGraph: {
      type,
      url: canonical,
      title: fullTitle,
      description: cleanDescription,
      siteName: siteConfig.name,
      locale: "en_GB",
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: fullTitle }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: cleanDescription,
      images: [absoluteUrl(image)],
      ...(siteConfig.twitterHandle ? { site: siteConfig.twitterHandle } : {}),
    },
  };
}

/** Metadata for a route that does not exist, used by the not found page. */
export const notFoundMetadata: Metadata = {
  title: "Page not found",
  description: "The page you requested could not be found.",
  robots: { index: false, follow: false },
};
