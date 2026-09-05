import type { Metadata } from "next";
import { Container, Section, ButtonLink, MarkerList, StatusTag } from "@/components/ui";
import { PageHeader, ProseBlock, SplitSection, PageCta } from "@/components/sections/page-shell";
import { Reveal } from "@/components/content/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { traceabilityNarrative } from "@/content/fallback/company";
import { productFamilies } from "@/content/fallback/products";
import { capabilityStatusLabels } from "@/content/types";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Traceability",
  description:
    "How Textileways records material origin, component suppliers, certification chains and production records, and how every product family discloses where it is made.",
  path: "/traceability",
});

export default function TraceabilityPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Traceability", path: "/traceability" },
  ];

  /* Group families by how they are produced, so disclosure is visible at a glance. */
  const byStatus = productFamilies.reduce<Record<string, string[]>>((groups, family) => {
    const key = family.capabilityStatus;
    groups[key] = [...(groups[key] ?? []), family.name];
    return groups;
  }, {});

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Traceability"
        title="Being able to answer where did this come from"
        lede="For a garment, that question applies to the fabric, the trims, the decoration and the facility that assembled it. Recording the answer during development is the only way it stays accurate."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/responsibility" variant="secondary">
              Our position on claims
            </ButtonLink>
          </>
        }
      />

      <Section tight className="">
        <Container>
          <ProseBlock paragraphs={traceabilityNarrative.intro} />
        </Container>
      </Section>

      <SplitSection
        eyebrow="Levels"
        title="Five levels of record"
        intro="Each level answers a different question a buyer might ask, and each one is maintained per order rather than assembled on request."
      >
        <ol className="border-t border-line">
          {traceabilityNarrative.levels.map((level, index) => (
            <li
              key={level.title}
              className="grid gap-2 border-b border-line py-6 sm:grid-cols-[3rem_minmax(0,14rem)_1fr] sm:gap-6"
            >
              <span aria-hidden="true" className="font-sans text-h3 font-semibold leading-none tracking-[-0.04em] text-stone">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-small font-semibold text-ink">{level.title}</h2>
              <p className="text-small leading-relaxed text-ink-muted">{level.description}</p>
            </li>
          ))}
        </ol>
      </SplitSection>

      <SplitSection
        eyebrow="Disclosure"
        title="How every product family is produced"
        intro="Published on each product page and collected here. Nothing on this site implies that every category runs under one roof."
        className="tw-card tw-card-interactive overflow-hidden rounded-[22px]"
      >
        <div className="space-y-10">
          {Object.entries(byStatus).map(([status, names], index) => (
            <Reveal key={status} delay={index * 60}>
              <StatusTag tone={status === "in-house" ? "forest" : "clay"}>
                {capabilityStatusLabels[status as keyof typeof capabilityStatusLabels]}
              </StatusTag>
              <MarkerList items={names} columns={2} className="mt-5" />
            </Reveal>
          ))}
        </div>
      </SplitSection>

      <SplitSection
        eyebrow="Limits"
        title="What traceability here does not mean"
        intro="Stated so the word is not read as claiming more than it does."
      >
        <MarkerList
          className="text-body"
          items={[
            "It does not mean a blockchain ledger or a public database. It means order records that can be produced when you ask for them.",
            "It does not extend to fibre origin at farm level unless the material carries a certification that provides it.",
            "It does not constitute an audited chain of custody. Where a certified claim is required, transaction certificates are the evidence rather than our own records.",
            "It does not apply retrospectively to orders placed before a record was requested, though standard production records are retained regardless.",
          ]}
        />
      </SplitSection>

      <PageCta
        title="Need supply chain information for a buyer?"
        description="Tell us what your buyer or your due diligence process requires. We will tell you what can be evidenced for your order and what would need a different material route."
        location="traceability_page"
        whatsapp={{ pageLabel: "Traceability", path: "/traceability" }}
        primaryLabel="Ask about supply chain records"
      />
    </>
  );
}
