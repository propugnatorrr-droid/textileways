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
  title: "Sustainability",
  description:
    "Textileways publishes its approach to materials, waste, packaging, water and energy without invented metrics. Measurable claims require a value, a method, a period and evidence.",
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
        title="Approach published. Numbers withheld."
        lede="Most textile sustainability pages consist of percentages nobody can trace back to a measurement. This page describes what we actually do, and says clearly where a figure would be required before a claim could be made."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/traceability" variant="secondary">
              Traceability
            </ButtonLink>
            <ButtonLink href="/certifications" variant="secondary">
              Certificate registry
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

      <Section tight className="border-b border-line">
        <Container>
          <Notice tone="info" title="Why there are no percentages on this page" className="max-w-[74ch]">
            <p>
              No baseline has been independently established for water use, energy use, waste
              or emissions at this facility. Publishing a reduction figure without a baseline
              and a method would be a claim we could not defend if a buyer asked how it was
              calculated.
            </p>
            <p className="mt-3">
              Buyers with a serious material policy generally prefer a supplier who says what
              is not measured over one who publishes a number that dissolves under a single
              question.
            </p>
          </Notice>
        </Container>
      </Section>

      <SplitSection
        eyebrow="Approach"
        title="Eight areas, described honestly"
        intro="Each area states what we do and, separately, what would be required before an outcome could be claimed."
      >
        <ul className="grid gap-px bg-line sm:grid-cols-2">
          {sustainabilityApproach.map((item, index) => (
            <Reveal key={item.title} as="li" delay={(index % 2) * 55} className="bg-paper p-7">
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
        eyebrow="Standard of proof"
        title="What a measurable claim requires"
        intro="This is the test any environmental figure has to pass before it appears anywhere on this site."
        className="bg-cotton"
      >
        <ol className="divide-y divide-line border-y border-line">
          {claimRequirements.map((requirement, index) => (
            <li key={requirement.label} className="grid gap-2 py-5 sm:grid-cols-[3rem_minmax(0,10rem)_1fr] sm:gap-6">
              <span aria-hidden="true" className="font-serif text-h3 leading-none text-stone">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-small font-semibold text-ink">{requirement.label}</h3>
              <p className="text-small leading-relaxed text-ink-muted">{requirement.detail}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <StatusTag tone="muted">No figures currently meet this test</StatusTag>
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
