import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Notice } from "@/components/ui";
import { PageHeader } from "@/components/sections/page-shell";
import { ReadinessAndQuote } from "@/components/content/readiness-and-quote";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Free project readiness check",
  description:
    "Check where your product and quantity fit before requesting a full quotation, then send a quick five field estimate request instead of the complete RFQ.",
  path: "/quick-quote",
});

export default function QuickQuotePage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Free project readiness check", path: "/quick-quote" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Before the full RFQ"
        title="Free project readiness check"
        lede="Not ready to fill out a complete specification? Answer three questions to see where your project fits, then send a quick estimate request instead. No account, no email required until you choose to send something."
        breadcrumbs={breadcrumbs}
      />

      <Section>
        <Container>
          <ReadinessAndQuote />

          <Notice tone="info" className="mt-16 max-w-[74ch]">
            Already know exactly what you need? The{" "}
            <Link href="/request-a-quote" className="tw-underline-grow font-medium text-ink">
              full request a quote form
            </Link>{" "}
            collects everything in one structured pass and gets you a written quotation
            rather than an initial read.
          </Notice>
        </Container>
      </Section>
    </>
  );
}
