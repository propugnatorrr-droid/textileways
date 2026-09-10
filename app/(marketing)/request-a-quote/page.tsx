import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Container, Section, Notice, MarkerList } from "@/components/ui";
import { PageHeader, HeaderAside, SplitSection, ProcessList } from "@/components/sections/page-shell";
import { RfqForm } from "@/components/forms/rfq-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Request a quote",
  description:
    "Request a manufacturing quotation from TextileWays. Share your product details, materials, decoration, quantity and delivery requirements in a structured seven step form.",
  path: "/request-a-quote",
});

export default function RequestAQuotePage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Request a quote", path: "/request-a-quote" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Request a quote"
        title="Tell us what you need to make"
        lede="Share what you know in seven short steps. Only the first two are required to begin, and your progress is saved in this browser so you can return without starting again."
        breadcrumbs={breadcrumbs}
        actions={
          <Link
            href="/quick-quote"
            className="tw-underline-grow text-small font-semibold text-forest"
          >
            Not ready for the full form? Get a free readiness check instead
          </Link>
        }
        aside={
          <HeaderAside title="What to expect">
            <p>
              We review the product, construction, material, quantity and destination before
              quoting so the price is tied to a clear specification.
            </p>
            <p>
              Projects can begin from approximately 50 pieces per style following technical
              review. Practical minimums depend on the fabric, colourways, construction,
              decoration and packaging.
            </p>
            <p>
              Files you submit are used only to quote, sample and produce your order. A non
              disclosure agreement can be signed before you share original designs.
            </p>
          </HeaderAside>
        }
      />

      <SplitSection
        eyebrow="Before you start"
        title="What helps us quote faster"
        intro="None of this is required to start. Anything you do not have yet is confirmed with you during technical review instead."
        tight
      >
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-label font-semibold uppercase tracking-[0.09em] text-ink-subtle">
              Useful to have ready
            </p>
            <MarkerList
              className="mt-5"
              items={[
                "A product reference, sketch or existing garment",
                "Estimated quantity and number of styles or colourways",
                "Target market and delivery destination",
                "A target delivery date, even an approximate one",
                "Material or performance requirements, if known",
                "Artwork or a tech pack, if you have one",
              ]}
            />
          </div>
          <div>
            <p className="text-label font-semibold uppercase tracking-[0.09em] text-ink-subtle">
              What happens after you submit
            </p>
            <div className="mt-5">
              <ProcessList
                stages={[
                  {
                    title: "Technical review",
                    description: "We check the specification against material and construction feasibility.",
                  },
                  {
                    title: "Clarifying questions",
                    description: "Anything unclear or missing is confirmed with you before a price is quoted.",
                  },
                  {
                    title: "Sampling recommendation",
                    description: "We propose the sample stage that suits your product and quantity.",
                  },
                  {
                    title: "Written quotation",
                    description: "A price against the agreed specification, with every assumption stated.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </SplitSection>

      <Section>
        <Container>
          <Suspense
            fallback={
              <p role="status" className="text-small text-ink-subtle">
                Loading the quote request form
              </p>
            }
          >
            <RfqForm />
          </Suspense>

          <Notice tone="info" className="mt-16 max-w-[74ch]">
            Prefer to send a specification by email instead? Use the contact form and describe
            what you need. The structured form simply reduces the number of follow up
            questions.
          </Notice>
        </Container>
      </Section>
    </>
  );
}
