import type { Metadata } from "next";
import { Container, Section, MarkerList } from "@/components/ui";
import { PageHeader, ProseBlock, SplitSection } from "@/components/sections/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { findingAManufacturerGuide } from "@/content/fallback/company";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "How to Find and Vet a Clothing Manufacturer in Pakistan",
  description:
    "A vendor neutral buyer's guide: how to confirm a supplier is a real factory, get a usable sample, set MOQ and lead time in writing, and avoid common sourcing mistakes when finding a clothing manufacturer in Pakistan.",
  path: "/resources/finding-a-clothing-manufacturer-in-pakistan",
});

export default function FindingAManufacturerGuidePage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    {
      name: "Finding a clothing manufacturer in Pakistan",
      path: "/resources/finding-a-clothing-manufacturer-in-pakistan",
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Buyer's guide"
        title="How to find and vet a clothing manufacturer in Pakistan"
        lede="This is a general sourcing guide, not a directory or a pitch. It describes how to evaluate any manufacturer you are considering, in Pakistan or elsewhere, and the same questions apply to evaluating the publisher of this page."
        breadcrumbs={breadcrumbs}
      />

      <Section size="tight">
        <Container>
          <ProseBlock paragraphs={findingAManufacturerGuide.intro} />
        </Container>
      </Section>

      {findingAManufacturerGuide.sections.map((section) => (
        <SplitSection key={section.title} title={section.title}>
          <ProseBlock paragraphs={section.paragraphs} className="text-body" />
        </SplitSection>
      ))}

      <SplitSection
        eyebrow="Checklist"
        title="Questions to ask before you commit"
        intro="Worth writing down and sending to a supplier directly. A clear, specific answer to each one tells you more than any brochure."
        className="tw-card tw-card-interactive overflow-hidden rounded-[22px]"
      >
        <MarkerList items={findingAManufacturerGuide.checklist} className="text-body" />
      </SplitSection>

      <SplitSection eyebrow="Channels" title="Where buyers actually find manufacturers">
        <MarkerList items={findingAManufacturerGuide.whereToLook} className="text-body" />
      </SplitSection>

      <Section size="tight">
        <Container>
          <p className="max-w-[70ch] text-small text-ink-subtle">
            This guide is published by TextileWays, a Pakistan based manufacturer, and is kept
            deliberately general: it is not written to steer you toward any one supplier,
            including us. If you apply the questions above to us as well as to anyone else you
            are evaluating, it has done its job.
          </p>
        </Container>
      </Section>
    </>
  );
}
