import type { Metadata } from "next";
import { Container, Section, ButtonLink, Notice } from "@/components/ui";
import { PageHeader, ProseBlock, SplitSection, PageCta } from "@/components/sections/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { lksgCsddNarrative } from "@/content/fallback/company";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "LkSG Due Diligence for German Buyers",
  description:
    "How the German LkSG and the EU CSDDD affect apparel sourcing from Pakistan: who the law actually obligates, what a buyer's due diligence process asks a supplier for, and what TextileWays can support today.",
  path: "/compliance/lksg",
});

export default function LksgCompliancePage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Responsibility", path: "/responsibility" },
    { name: "LkSG and EU due diligence", path: "/compliance/lksg" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Compliance"
        title="What German LkSG due diligence means for a Pakistan based supplier"
        lede="LkSG obligates the buyer, not the manufacturer. This page sets out who the law actually applies to, what an obligated buyer's own due diligence process asks a supplier for, and what TextileWays can support today, stated plainly rather than implied."
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

      <Section size="tight">
        <Container>
          <ProseBlock paragraphs={lksgCsddNarrative.intro} />
        </Container>
      </Section>

      {lksgCsddNarrative.sections.map((section, index) => (
        <SplitSection key={section.title} eyebrow={index === 0 ? "Scope" : undefined} title={section.title}>
          <ProseBlock paragraphs={section.paragraphs} className="text-body" />
        </SplitSection>
      ))}

      <SplitSection
        eyebrow="Sources"
        title="Where these dates and figures come from"
        intro="Due diligence law is actively moving. Treat the paragraphs above as accurate as of the review dates below, not as a permanent statement, and confirm current requirements with your own legal counsel before relying on them."
        className="tw-card tw-card-interactive overflow-hidden rounded-[22px]"
      >
        <ol className="space-y-5 border-t border-line pt-6">
          {lksgCsddNarrative.sources.map((source) => (
            <li key={source.label} className="border-b border-line pb-5">
              <p className="text-[15px] font-semibold text-ink">{source.label}</p>
              <p className="mt-1 text-small text-ink-muted">{source.detail}</p>
            </li>
          ))}
        </ol>

        <Notice tone="info" title="This is not legal advice" className="mt-10 max-w-[70ch]">
          Nothing on this page is a legal opinion. Due diligence law changes, transposition
          dates move, and thresholds are set nationally as well as at EU level. Confirming what
          applies to your company remains your responsibility, working with your own legal
          counsel.
        </Notice>
      </SplitSection>

      <PageCta
        title="Sourcing for a buyer with due diligence obligations?"
        description="Tell us what your compliance team or your buyer's questionnaire actually asks for. We will tell you plainly what can be evidenced for your order today."
        location="lksg_compliance_page"
        whatsapp={{ pageLabel: "LkSG and EU due diligence", path: "/compliance/lksg" }}
        primaryLabel="Ask about supplier due diligence"
      />
    </>
  );
}
