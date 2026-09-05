import type { Metadata } from "next";
import { Container, Section, ButtonLink, Notice, MarkerList, StatusTag } from "@/components/ui";
import { PageHeader, SplitSection, PageCta } from "@/components/sections/page-shell";
import { Media } from "@/components/content/media";
import { Reveal } from "@/components/content/reveal";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { qualityCheckpoints } from "@/content/fallback/company";
import { editorialMedia } from "@/content/fallback/media";
import { getFaqsByIds } from "@/content/fallback/faqs";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Quality",
  description:
    "How quality is controlled at Textileways: incoming material inspection, pre production review, inline checks, measurement verification, final inspection and packing audits.",
  path: "/quality",
});

const controls = [
  {
    title: "Product specification control",
    description:
      "Production runs against a written specification and an approved pre production sample, both version controlled. Without a fixed reference, an inspection is an opinion.",
  },
  {
    title: "Material inspection",
    description:
      "Incoming fabric and trims are checked against specification before cutting. A four point fabric inspection identifies faults while they still cost metres rather than garments.",
  },
  {
    title: "Sample approval",
    description:
      "Written approval of a pre production sample is what releases bulk. Nothing is released against a proto or a fit sample.",
  },
  {
    title: "Inline quality control",
    description:
      "Defined operations are checked during the run so a fault is corrected at the machine that caused it rather than across a finished lot.",
  },
  {
    title: "Measurement tolerances",
    description:
      "Every point of measure carries a tolerance agreed with you. A chart without tolerances cannot be inspected against, because no garment is made to an exact figure.",
  },
  {
    title: "Appearance checks",
    description:
      "Stitching, seam appearance, trimming, pressing and general presentation are assessed against the approved sample.",
  },
  {
    title: "Colour consistency",
    description:
      "Shade is checked against an approved physical standard under an agreed light source, and shade lots are segregated so a garment never mixes batches.",
  },
  {
    title: "Print and embroidery checks",
    description:
      "Placement, dimension, colour and adhesion are checked against the approved strike off or sew out, with wash testing where durability matters.",
  },
  {
    title: "Final random inspection",
    description:
      "Finished goods are inspected against the sampling plan and acceptance limits agreed for your order.",
  },
  {
    title: "Packing verification",
    description:
      "Cartons are audited for assortment, quantity, marking and ticketing before shipment.",
  },
  {
    title: "Third party inspection support",
    description:
      "Buyer appointed inspectors and inspection agencies are supported, with schedule time allowed for inspection and any rework arising.",
  },
  {
    title: "Testing coordination",
    description:
      "Composition, fastness, dimensional stability and restricted substance testing are coordinated with accredited laboratories. We do not issue our own test results.",
  },
  {
    title: "Corrective action",
    description:
      "A finding is recorded with its cause and the correction applied, then re inspected. A defect that is fixed without recording the cause returns on the next order.",
  },
  {
    title: "Documentation",
    description:
      "Inspection records, measurement audits and approval records are retained per order and available to you on request.",
  },
];

export default function QualityPage() {
  const faqs = getFaqsByIds(["aql", "inspection", "reorders", "compliance"]);
  const faqLd = faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Quality", path: "/quality" },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), ...(faqLd ? [faqLd] : [])]} />

      <PageHeader
        eyebrow="Quality"
        title="Catch it at the stage that caused it"
        lede="By the time a garment reaches final inspection, every decision that determines its quality has already been made. The only options left are acceptance or rework, and both are expensive."
        breadcrumbs={breadcrumbs}
        status={{
          label: "Configurable per order",
          tone: "muted",
          note: "Inspection standards and acceptance limits are commercial decisions agreed in writing for each order. This page describes the procedures available rather than asserting a fixed company standard.",
        }}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/manufacturing-process" variant="secondary">
              The full process
            </ButtonLink>
          </>
        }
        aside={
          <Media
            asset={editorialMedia.quality}
            aspect="aspect-[4/3]"
            sizes="(min-width: 1024px) 40vw, 92vw"
          />
        }
      />

      <Section tight className="">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-[18ch] font-sans text-h2 font-semibold tracking-[-0.045em]">Eight production checkpoints</h2>
            <p className="max-w-[42ch] text-small text-ink-subtle">
              Each one exists to catch a specific class of problem while correction is still
              cheap.
            </p>
          </div>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {qualityCheckpoints.map((checkpoint, index) => (
              <Reveal key={checkpoint.title} as="li" delay={(index % 4) * 55} className="tw-card tw-card-interactive rounded-[22px] p-6">
                <p className="text-label uppercase tracking-[0.09em] text-stone">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-small font-semibold text-ink">{checkpoint.title}</h3>
                <p className="mt-2 text-small leading-relaxed text-ink-muted">
                  {checkpoint.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <SplitSection
        eyebrow="Controls"
        title="What is actually controlled"
        intro="Fourteen controls that run across a project. Each is a procedure rather than a promise, and each is agreed for your order."
        className="tw-card tw-card-interactive overflow-hidden rounded-[22px]"
      >
        <ul className="divide-y divide-line">
          {controls.map((control) => (
            <li key={control.title} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,17rem)_1fr] sm:gap-8">
              <h3 className="text-small font-semibold text-ink">{control.title}</h3>
              <p className="text-small leading-relaxed text-ink-muted">{control.description}</p>
            </li>
          ))}
        </ul>
      </SplitSection>

      <SplitSection
        eyebrow="Acceptance sampling"
        title="What AQL is, and what it is not"
        intro="Explained because buyers are frequently asked to agree to a standard they have not had explained to them."
      >
        <div className="tw-prose text-body leading-relaxed text-ink-muted">
          <p>
            AQL, or acceptable quality limit, is a statistical sampling method. Rather than
            checking every unit in a lot, an inspector checks a sample drawn from it and uses
            the number of defects found to decide whether to accept or reject the whole lot.
          </p>
          <p>
            Three things have to be agreed before it means anything: the inspection level,
            which sets how large the sample is; the acceptance limits, usually stated
            separately for critical, major and minor defects; and the defect classification
            itself, which decides what counts as which.
          </p>
          <p>
            Those are commercial decisions rather than technical constants. Different buyers
            in different categories reasonably apply different limits, which is why this site
            does not publish one as a company standard.
          </p>
        </div>

        <div className="mt-10">
          <StatusTag tone="muted">Agreed per order</StatusTag>
        </div>

        <h3 className="mt-10 mb-4 text-small font-semibold text-ink">
          What sampling inspection does not do
        </h3>
        <MarkerList
          items={[
            "It does not guarantee that every unit in the lot is free of defects.",
            "It does not replace a hundred percent inspection where you have specifically ordered one.",
            "It does not compensate for a specification that was wrong or incomplete.",
            "It does not apply retrospectively to a standard that was never agreed in writing.",
          ]}
        />

        <Notice tone="info" className="mt-10 max-w-[70ch]">
          If you have an inspection standard your business already uses, send it with your
          inquiry. Working to your standard is simpler than negotiating a new one, and it
          removes ambiguity before production rather than after it.
        </Notice>
      </SplitSection>

      {faqs.length > 0 ? (
        <SplitSection eyebrow="Questions" title="Frequently asked" className="tw-card tw-card-interactive overflow-hidden rounded-[22px]">
          <FaqAccordion items={faqs} />
        </SplitSection>
      ) : null}

      <PageCta
        title="Send us your quality requirements"
        description="Tell us the inspection standard, the sampling plan and any testing your buyer requires. It is far easier to build them into the schedule than to add them afterwards."
        location="quality_page"
        whatsapp={{ pageLabel: "Quality", path: "/quality" }}
      />
    </>
  );
}
