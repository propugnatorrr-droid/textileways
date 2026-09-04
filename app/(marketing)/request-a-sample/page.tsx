import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Section, Notice } from "@/components/ui";
import { PageHeader } from "@/components/sections/page-shell";
import { SampleRequestForm } from "@/components/forms/sample-request-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Request a sample",
  description:
    "Request fabric swatches, a stock sample or a custom development sample from Textileways. Sample charges and courier costs are always quoted before any work begins.",
  path: "/request-a-sample",
});

export default function RequestASamplePage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Request a sample", path: "/request-a-sample" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Request a sample"
        title="Judge it by hand, not by specification"
        lede="Fabric handfeel is the one thing a specification sheet cannot communicate. A swatch or a physical sample settles in seconds what an email thread cannot settle at all."
        breadcrumbs={breadcrumbs}
        aside={
          <div className="border border-line bg-cotton/50 p-6">
            <p className="text-label uppercase tracking-[0.09em] text-ink-subtle">
              Three kinds of sample
            </p>
            <dl className="mt-5 space-y-4 text-small leading-relaxed text-ink-muted">
              <div>
                <dt className="font-semibold text-ink">Fabric swatches</dt>
                <dd className="mt-1">
                  The fastest and cheapest way to confirm handfeel, weight and colour before
                  any garment is made.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">An existing product sample</dt>
                <dd className="mt-1">
                  A finished garment in a similar construction, so you can assess stitching,
                  finishing and fit.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">A custom development sample</dt>
                <dd className="mt-1">
                  Made to your specification. This takes longer and costs more, and it answers
                  every question at once.
                </dd>
              </div>
            </dl>
          </div>
        }
      />

      <Section>
        <Container>
          <Notice tone="info" title="On sample charges" className="mb-12 max-w-[74ch]">
            Sample charges and courier costs are quoted before any work begins, so nothing is
            produced or charged without your written confirmation. We do not publish a fixed
            sample price, because it depends on the construction, the fabric and whether the
            fabric already exists.
          </Notice>

          <div className="max-w-[80ch]">
            <Suspense
              fallback={
                <p role="status" className="text-small text-ink-subtle">
                  Loading the sample request form
                </p>
              }
            >
              <SampleRequestForm />
            </Suspense>
          </div>
        </Container>
      </Section>
    </>
  );
}
