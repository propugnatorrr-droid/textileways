import type { Metadata } from "next";
import { Container, Section, ButtonLink, Notice, StatusTag } from "@/components/ui";
import { PageHeader, SplitSection, PageCta } from "@/components/sections/page-shell";
import { Media } from "@/components/content/media";
import { Reveal } from "@/components/content/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { sustainabilityApproach } from "@/content/fallback/company";
import { editorialMedia } from "@/content/fallback/media";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Responsible material and production choices",
  description:
    "Explore material sourcing, packaging, sampling and shipping choices that can be reviewed for a Textileways production programme.",
  path: "/sustainability",
});


const claimRequirements = [
  { label: "Value", detail: "The number itself, stated precisely rather than approximately." },
  { label: "Unit", detail: "What the number measures, so it can be compared with anything else." },
  { label: "Reporting period", detail: "The dates the figure covers. A figure without a period is meaningless." },
  { label: "Scope", detail: "Which facility, product or process the figure applies to." },
  { label: "Method", detail: "How it was measured, so the same method can be repeated." },
  { label: "Evidence", detail: "The record that supports it, available to a buyer who asks." },
  { label: "Verification", detail: "Who checked it, and whether they were independent." },
];

export default function SustainabilityPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Sustainability", path: "/sustainability" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Sustainability"
        title="Better decisions begin with the specification"
        lede="Material, packaging, sampling and shipping choices are reviewed at order level, where their cost, availability, documentation and practical impact can be understood."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/traceability" variant="secondary">
              Traceability
            </ButtonLink>
            <ButtonLink href="/materials" variant="secondary">
              Explore Materials
            </ButtonLink>
          </>
        }
        aside={
          <Media
            asset={editorialMedia.sustainability}
            aspect="aspect-[4/3]"
            sizes="(min-width: 1024px) 40vw, 92vw"
          />
        }
      />

      <Section size="tight">
        <Container>
          <Notice
            tone="info"
            title="Bring your material or sourcing policy into the brief"
            className="max-w-[74ch]"
          >
            <p>
              If your programme has requirements for fibre origin, recycled content,
              packaging, testing or documentation, share them before material sourcing
              begins.
            </p>
            <p className="mt-3">
              Options can then be assessed against availability, minimum quantity, production
              route, evidence requirements, cost and delivery timing.
            </p>
          </Notice>
        </Container>
      </Section>

      <SplitSection
        eyebrow="Order-level decisions"
        title="Eight areas to review before production"
        intro="Each area explains the available production choices and the evidence required before a measurable environmental claim can be made."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {sustainabilityApproach.map((item, index) => (
            <Reveal key={item.title} as="li" delay={(index % 2) * 55} className="tw-card tw-card-interactive rounded-[22px] p-7">
              <h3 className="text-body font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-small leading-relaxed text-ink-muted">
                {item.description}
              </p>
              <p className="mt-5 border-t border-line pt-4 text-small text-ink-subtle">
                {item.status}
              </p>
            </Reveal>
          ))}
        </ul>
      </SplitSection>

      <SplitSection
        eyebrow="Evidence"
        title="What a measurable claim should include"
        intro="A useful environmental figure needs enough context to be reviewed, compared and repeated."
        className="tw-card tw-card-interactive overflow-hidden rounded-[22px]"
      >
        <ol className="divide-y divide-line">
          {claimRequirements.map((requirement, index) => (
            <li key={requirement.label} className="grid gap-2 py-5 sm:grid-cols-[3rem_minmax(0,10rem)_1fr] sm:gap-6">
              <span aria-hidden="true" className="font-sans text-h3 font-semibold leading-none tracking-[-0.04em] text-stone">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-small font-semibold text-ink">{requirement.label}</h3>
              <p className="text-small leading-relaxed text-ink-muted">{requirement.detail}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <StatusTag tone="muted">
            Order-specific evidence is reviewed before a claim is approved
          </StatusTag>
        </div>
      </SplitSection>

      <SplitSection
        eyebrow="What you can do"
        title="Lower impact options available now"
        intro="These are choices you can make on your order today. They are options rather than outcomes, and we do not claim otherwise."
      >
        <ul className="divide-y divide-line border-y border-line text-small text-ink-muted">
          <li className="py-5">
            <span className="font-semibold text-ink">Certified organic or recycled materials</span>
            <p className="mt-2">
              Available where a certified supply chain can be evidenced for your specific
              order, with transaction certificates supplied. Usually raises the minimum
              quantity, because certified fabric is held in fewer qualities and colours.
            </p>
          </li>
          <li className="py-5">
            <span className="font-semibold text-ink">Reduced or paper based packaging</span>
            <p className="mt-2">
              Specified per programme rather than applied by default, because not every
              distribution route supports it without damage in transit.
            </p>
          </li>
          <li className="py-5">
            <span className="font-semibold text-ink">Fewer sample rounds</span>
            <p className="mt-2">
              A complete specification at the start reduces the number of physical samples
              shipped internationally. This is the least discussed and most immediate
              reduction available on most projects.
            </p>
          </li>
          <li className="py-5">
            <span className="font-semibold text-ink">Consolidated shipping</span>
            <p className="mt-2">
              Combining orders into fewer shipments reduces freight impact and usually cost.
              It requires planning at the order stage rather than at dispatch.
            </p>
          </li>
        </ul>
      </SplitSection>

      <PageCta
        title="Have a materials policy we need to meet?"
        description="Send it with your inquiry. We will tell you which parts can be evidenced for your order and which cannot, before you commit to anything."
        location="sustainability_page"
        whatsapp={{ pageLabel: "Sustainability", path: "/sustainability" }}
        primaryLabel="Discuss a materials policy"
      />
    </>
  );
}
