import type { Metadata } from "next";
import { LegalPage } from "@/components/content/legal-page";
import { cookiePolicy } from "@/content/fallback/legal";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Cookie policy",
  description:
    "How Textileways uses cookies and browser storage, what is stored without consent and what analytics only runs after you accept.",
  path: "/cookie-policy",
  /* Excluded from the sitemap, so it is marked noindex to match. */
  noIndex: true,
});

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie policy"
      lede="What this site stores in your browser, what only happens with consent, and how to change your choice."
      path="/cookie-policy"
      updated={cookiePolicy.updated}
      sections={cookiePolicy.sections}
    />
  );
}
