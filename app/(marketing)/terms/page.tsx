import type { Metadata } from "next";
import { LegalPage } from "@/components/content/legal-page";
import { termsOfUse } from "@/content/fallback/legal";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms of use",
  description:
    "Terms of use for the Textileways website, covering indicative values, quotations, compliance responsibility and intellectual property.",
  path: "/terms",
  /* Excluded from the sitemap, so it is marked noindex to match. */
  noIndex: true,
});

export default function TermsOfUsePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of use"
      lede="The terms governing use of this website, and what is and is not an offer to supply."
      path="/terms"
      updated={termsOfUse.updated}
      sections={termsOfUse.sections}
    />
  );
}
