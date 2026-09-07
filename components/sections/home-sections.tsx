import Link from "next/link";
import {
  Container,
  DisplayHeading,
  Eyebrow,
  Lede,
  Section,
  SectionHeading,
  Panel,
  ButtonLink,
  StatusTag,
  CheckMark,
  Footnote,
  MarkerList,
} from "@/components/ui";
import { Media } from "@/components/content/media";
import { Reveal } from "@/components/content/reveal";
import { QuoteCta } from "@/components/sections/quote-cta";
import { WhatsappInlineLink } from "@/components/layout/whatsapp-button";
import { productFamilies } from "@/content/fallback/products";
import { articlesByDate } from "@/content/fallback/articles";
import { markets } from "@/content/fallback/markets";
import {
  productionScaleSteps,
  howItWorksStages,
  homeCapabilityHighlights,
  qualityCheckpoints,
} from "@/content/fallback/company";
import { factoryMedia, editorialMedia } from "@/content/fallback/media";
import { capabilityStatusLabels } from "@/content/types";
import { formatDate } from "@/lib/utilities/format";

/* ==========================================================================
   Production scale

   A horizontal progression on desktop and a vertical one on mobile, drawn on a
   single tinted field with a connecting rule. Not five floating cards.
   ========================================================================== */

export function ProductionScaleSection() {
  return (
    <Section size="tight" className="bg-white">
      <Container>
        <Panel>
          <SectionHeading
            eyebrow="Production scale"
            title="Start at 50. Scale beyond 100,000."
            lede="The same specification discipline applies at every quantity. What changes is material planning, line scheduling and how goods are shipped."
          />

          <ol className="relative mt-12 grid gap-8 lg:mt-14 lg:grid-cols-5 lg:gap-6">
            {/* Connecting rule, desktop only. */}
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-[7px] hidden h-px bg-line-strong lg:block"
            />

            {productionScaleSteps.map((step, index) => (
              <Reveal
                key={step.title}
                as="li"
                delay={index * 70}
                className="relative flex gap-5 lg:block"
              >
                <span
                  aria-hidden="true"
                  className={
                    "relative z-10 mt-1 block h-[15px] w-[15px] shrink-0 rounded-full border-[3px] border-cotton lg:mt-0 " +
                    (index === productionScaleSteps.length - 1 ? "bg-forest" : "bg-stone")
                  }
                />
                <div className="lg:mt-6">
                  <p
                    className={
                      "tw-tnum font-sans text-[clamp(1.7rem,2.1vw,2.35rem)] font-semibold leading-none tracking-[-0.035em] " +
                      (index === productionScaleSteps.length - 1 ? "text-forest" : "text-ink")
                    }
                  >
                    {step.quantity}
                  </p>
                  <p className="mt-2 text-label font-semibold uppercase tracking-[0.09em] text-ink-subtle">
                    {step.unit}
                  </p>
                  <p className="mt-4 text-small font-semibold text-ink">{step.title}</p>
                  <p className="mt-1.5 max-w-[34ch] text-small text-ink-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Panel>
      </Container>
    </Section>
  );
}

/* ==========================================================================
   Product universe

   One large featured family beside a two column stack, then a wider row of
   supporting tiles. Deliberately not a uniform card grid.
   ========================================================================== */

export function ProductUniverseSection() {
  const [lead, ...rest] = productFamilies;
  const stacked = rest.slice(0, 2);
  const row = rest.slice(2, 6);

  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Product universe"
          title="Thirteen product families"
          lede="Every family states how it is produced, what it is typically made from, and where its minimum quantity really comes from."
          action={
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/products" variant="secondary">
                View all product families
              </ButtonLink>
              <ButtonLink href="/industries" variant="quiet">
                Browse by industry
              </ButtonLink>
            </div>
          }
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <Reveal className="h-full">
            <ProductTile family={lead} scale="lead" />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {stacked.map((family, index) => (
              <Reveal key={family.slug} delay={(index + 1) * 70} className="h-full">
                <ProductTile family={family} scale="stacked" />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {row.map((family, index) => (
            <Reveal key={family.slug} delay={(index % 4) * 60} className="h-full">
              <ProductTile family={family} scale="row" />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ProductTile({
  family,
  scale,
}: {
  family: (typeof productFamilies)[number];
  scale: "lead" | "stacked" | "row";
}) {
  const aspect = {
    lead: "aspect-[16/11]",
    stacked: "aspect-[16/10]",
    row: "aspect-[4/3]",
  }[scale];

  const sizes = {
    lead: "(min-width: 1024px) 52vw, 100vw",
    stacked: "(min-width: 1024px) 34vw, (min-width: 640px) 46vw, 100vw",
    row: "(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 100vw",
  }[scale];

  return (
    <Link
      href={`/products/${family.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_18px_50px_rgba(11,15,13,0.09)]"
    >
      <Media
        asset={family.hero}
        aspect={aspect}
        sizes={sizes}
        compact={scale === "row"}
        className="rounded-none"
        zoomOnHover
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3
          className={
            scale === "lead"
              ? "font-sans text-h3 font-semibold text-ink transition-colors duration-200 group-hover:text-forest-deep"
              : "text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink transition-colors duration-200 group-hover:text-forest-deep"
          }
        >
          {family.name}
        </h3>
        <p className="mt-2 flex-1 text-small text-ink-muted">
          {scale === "row" ? truncate(family.summary, 88) : family.summary}
        </p>
        <p className="mt-5 text-label font-semibold uppercase tracking-[0.08em] text-ink-subtle">
          {capabilityStatusLabels[family.capabilityStatus]}
        </p>
      </div>
    </Link>
  );
}

/** Trims a summary on a word boundary so the shortest tiles stay balanced. */
function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  const cut = value.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}...`;
}

/* ==========================================================================
   Positioning

   A typographic comparison rather than two bordered cards. The two quantities
   sit either side of a connecting scale.
   ========================================================================== */

export function PositioningSection() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="mx-auto max-w-[900px] text-center">
          <Eyebrow>Positioning</Eyebrow>
          <DisplayHeading level={2} size="h2" className="mx-auto mt-4 max-w-[20ch]">
            Sampling flexibility. Production discipline.
          </DisplayHeading>
        </div>

        <div className="mt-12 grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-10">
          <Reveal className="text-center md:text-right">
            <p className="tw-tnum font-sans text-[clamp(2.75rem,5.5vw,4.5rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
              50
            </p>
            <p className="mt-3 text-label font-semibold uppercase tracking-[0.1em] text-ink-subtle">
              Pieces, first validation run
            </p>
            <p className="mt-4 text-small text-ink-muted md:ml-auto md:max-w-[38ch]">
              Confirm fit, fabric and decoration before committing a season. The unit cost
              is higher and the information is worth it.
            </p>
          </Reveal>

          {/* Connecting scale. Horizontal on desktop, vertical on mobile. */}
          <div
            aria-hidden="true"
            className="mx-auto flex h-16 w-px items-center justify-center bg-gradient-to-b from-stone/20 via-forest to-forest/25 md:h-px md:w-32 md:bg-gradient-to-r lg:w-44"
          />

          <Reveal delay={120} className="text-center md:text-left">
            <p className="tw-tnum font-sans text-[clamp(2.75rem,5.5vw,4.5rem)] font-semibold leading-none tracking-[-0.04em] text-forest">
              100,000+
            </p>
            <p className="mt-3 text-label font-semibold uppercase tracking-[0.1em] text-ink-subtle">
              Pieces, scaled production run
            </p>
            <p className="mt-4 text-small text-ink-muted md:max-w-[38ch]">
              Committed material planning, scheduled shipments and inspection regimes
              agreed in advance, against the same approved sample.
            </p>
          </Reveal>
        </div>

        <p className="mx-auto mt-12 max-w-[62ch] text-center text-body-l text-ink-muted">
          You should not have to replace your manufacturer every time you grow. Every
          supplier change costs a season in re establishing fit, fabric and colour.
        </p>

        <div className="mt-8 flex justify-center">
          <QuoteCta location="home_positioning">Start a conversation</QuoteCta>
        </div>
      </Container>
    </Section>
  );
}

/* ==========================================================================
   Capabilities

   A near black panel rather than a full emerald field, with emerald reserved
   for the numerals and the action.
   ========================================================================== */

export function CapabilitiesSection() {
  const highlights = homeCapabilityHighlights.slice(0, 6);

  return (
    <Section size="large" className="bg-white">
      <Container>
        <Panel tone="ink">
          <SectionHeading
            tone="inverse"
            eyebrow="Capabilities"
            title="Everything a product needs, in one place"
            lede="Thirty capabilities across development, materials, manufacturing, decoration, finishing and assurance. Each page states what the process cannot do as well as what it can."
            action={
              <ButtonLink href="/capabilities" variant="inverse">
                All 30 capabilities
              </ButtonLink>
            }
          />

          <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <Media
              asset={factoryMedia.sampling}
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 34vw, 100vw"
              large
              className="bg-white/[0.04]"
            />

            <ol className="grid gap-1">
              {highlights.map((item, index) => (
                <Reveal key={item.title} as="li" delay={index * 50}>
                  <Link
                    href={item.href}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 rounded-[16px] px-4 py-4 transition-colors duration-200 hover:bg-white/[0.06]"
                  >
                    <span
                      aria-hidden="true"
                      className="tw-tnum pt-0.5 text-small font-semibold text-forest"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-body font-semibold text-white">
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-small text-white/65">
                        {item.description}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="pt-1 text-white/35 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white/70"
                    >
                      &rarr;
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ol>
          </div>
        </Panel>
      </Container>
    </Section>
  );
}

/* ==========================================================================
   Factory

   Asymmetric media composition. One dominant frame with two offset supporting
   frames, and the disclosure reduced to a single quiet line.
   ========================================================================== */

export function FactorySection() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>The factory</Eyebrow>
            <DisplayHeading level={2} size="h2" className="mt-4 max-w-[14ch]">
              Where your product would be made
            </DisplayHeading>
            <Lede className="mt-6">
              Buyers are entitled to see the environment their product comes from. Every
              product family also states whether it is made in house or through an audited
              partner facility.
            </Lede>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/factory" variant="secondary">
                About the facility
              </ButtonLink>
              <ButtonLink href="/quality" variant="quiet">
                How quality is controlled
              </ButtonLink>
            </div>

            <Footnote className="mt-8">
              Facility photography is reserved and not yet published. Placeholder frames
              are shown in its place.
            </Footnote>
          </div>

          <div className="grid gap-4">
            <Reveal>
              <Media
                asset={factoryMedia.productionFloor}
                aspect="aspect-[16/10]"
                sizes="(min-width: 1024px) 54vw, 100vw"
                large
              />
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              <Reveal delay={90} className="sm:pt-6">
                <Media
                  asset={factoryMedia.cutting}
                  aspect="aspect-square"
                  sizes="(min-width: 1024px) 27vw, 46vw"
                  compact
                />
              </Reveal>
              <Reveal delay={160}>
                <Media
                  asset={factoryMedia.inspection}
                  aspect="aspect-square"
                  sizes="(min-width: 1024px) 27vw, 46vw"
                  compact
                />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ==========================================================================
   How it works

   A stepped track in two rows of four, with a rule joining the numerals.
   ========================================================================== */

export function HowItWorksSection() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Eight stages from inquiry to delivery"
          lede="Each stage has a decision attached to it. Nothing moves forward until the previous stage is approved in writing."
          action={
            <ButtonLink href="/manufacturing-process" variant="secondary">
              See the full 21 stage process
            </ButtonLink>
          }
        />

        <ol className="mt-12 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksStages.map((stage, index) => (
            <Reveal key={stage.title} as="li" delay={(index % 4) * 55}>
              <div className="flex items-center gap-3">
                <span className="tw-tnum text-small font-semibold text-forest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
              </div>
              <h3 className="mt-4 text-body font-semibold text-ink">{stage.title}</h3>
              <p className="mt-2 text-small text-ink-muted">{stage.description}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ==========================================================================
   Quality

   Media and heading on one side, a structured checkpoint system on the other.
   ========================================================================== */

export function QualitySection() {
  return (
    <Section size="large" className="bg-white">
      <Container>
        <Panel>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <Eyebrow>Quality</Eyebrow>
              <DisplayHeading level={2} size="h2" className="mt-4 max-w-[15ch]">
                Eight checkpoints, not one final inspection
              </DisplayHeading>
              <Lede className="mt-6">
                By the time a garment reaches final inspection, every decision that
                determines its quality has already been made. These checkpoints catch
                problems at the stage that caused them.
              </Lede>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <StatusTag tone="forest">Configurable per order</StatusTag>
                <span className="text-small text-ink-subtle">
                  Standards agreed in writing, not published as fixed
                </span>
              </div>

              <Media
                asset={editorialMedia.quality}
                aspect="aspect-[16/10]"
                sizes="(min-width: 1024px) 42vw, 100vw"
                large
                className="mt-9"
              />

              <ButtonLink href="/quality" variant="secondary" className="mt-8">
                How quality is controlled
              </ButtonLink>
            </div>

            <ol className="grid gap-px overflow-hidden rounded-[18px] bg-line">
              {qualityCheckpoints.map((checkpoint, index) => (
                <Reveal
                  key={checkpoint.title}
                  as="li"
                  delay={index * 40}
                  className="flex gap-4 bg-white p-5"
                >
                  <span className="tw-tnum pt-0.5 text-small font-semibold text-ink-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-small font-semibold text-ink">{checkpoint.title}</h3>
                    <p className="mt-1.5 text-small text-ink-muted">
                      {checkpoint.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Panel>
      </Container>
    </Section>
  );
}

/* ==========================================================================
   Markets
   ========================================================================== */

const marketMedia = {
  usa: editorialMedia.logistics,
  europe: editorialMedia.scale,
  uk: editorialMedia.materials,
  australia: factoryMedia.packing,
} as const;

export function MarketsSection() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Markets"
          title="Prepared for your destination market"
          lede="Sizing, labelling, packing and documentation requirements differ by destination. We build the requirements you confirm into the specification before production begins."
          action={
            <ButtonLink href="/markets" variant="secondary">
              View all market guidance
            </ButtonLink>
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {markets.map((market, index) => (
            <Reveal key={market.slug} delay={(index % 2) * 80} className="h-full">
              <Link
                href={`/markets/${market.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-white transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_18px_50px_rgba(11,15,13,0.09)]"
              >
                <Media
                  asset={marketMedia[market.slug as keyof typeof marketMedia]}
                  aspect="aspect-[16/8]"
                  sizes="(min-width: 768px) 46vw, 100vw"
                  compact
                  className="rounded-none"
                  zoomOnHover
                />

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="font-sans text-h3 font-semibold text-ink transition-colors duration-200 group-hover:text-forest-deep">
                    {market.name}
                  </h3>

                  <p className="mt-3 text-small leading-relaxed text-ink-muted">
                    {market.summary}
                  </p>

                  <ul className="mt-6 grid flex-1 gap-3">
                    {market.buyerSupport.slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-3 text-small text-ink-muted">
                        <CheckMark />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-7 inline-flex items-center gap-1.5 text-small font-semibold text-forest">
                    View market guidance
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}


/* ==========================================================================
   Insights
   ========================================================================== */

export function InsightsSection() {
  const latest = articlesByDate().slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Insights"
          title="How manufacturing decisions actually work"
          lede="Explanations rather than marketing, written for buyers who want to understand why a minimum quantity is what it is."
          action={
            <ButtonLink href="/insights" variant="secondary">
              All insights
            </ButtonLink>
          }
        />

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {latest.map((article, index) => (
            <Reveal key={article.slug} delay={index * 80} className="h-full">
              <Link href={`/insights/${article.slug}`} className="group flex h-full flex-col">
                <Media
                  asset={article.hero}
                  aspect="aspect-[16/10]"
                  sizes="(min-width: 768px) 30vw, 100vw"
                  compact
                  zoomOnHover
                />
                <p className="mt-5 flex items-center gap-2 text-label font-semibold uppercase tracking-[0.09em] text-ink-subtle">
                  <span className="text-forest">{article.category}</span>
                  <span aria-hidden="true">/</span>
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                </p>
                <h3 className="mt-3 text-[1.15rem] font-semibold leading-snug tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-forest-deep">
                  {article.title}
                </h3>
                <p className="mt-2.5 flex-1 text-small text-ink-muted">{article.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-small font-semibold text-forest">
                  Read
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ==========================================================================
   Final call to action
   ========================================================================== */

export function FinalCtaSection() {
  return (
    <Section size="large" className="bg-white">
      <Container>
        <Panel tone="forest" className="relative overflow-hidden text-center">
          <Eyebrow tone="inverse">Start at 50. Scale beyond 100,000.</Eyebrow>

          <DisplayHeading
            level={2}
            size="h2"
            className="mx-auto mt-5 max-w-[18ch] text-white"
          >
            Bring us the idea. Leave with a production plan.
          </DisplayHeading>

          <p className="mx-auto mt-6 max-w-[54ch] text-body-l text-white/80">
            Share your product details, target quantity and delivery requirements. Our team
            reviews the technical and commercial requirements before quoting.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <QuoteCta location="home_final_cta" variant="inverse">
              Request a Manufacturing Quote
            </QuoteCta>

            <WhatsappInlineLink
              context={{ pageLabel: "Homepage", path: "/" }}
              location="home_final_cta"
              variant="inverse-outline"
            >
              Talk to Our Team
            </WhatsappInlineLink>

            <ButtonLink href="/request-a-sample" variant="inverse-outline">
              Request a Sample
            </ButtonLink>
          </div>
        </Panel>
      </Container>
    </Section>
  );
}

/* ==========================================================================
   Retained for other routes

   Neither of these renders on the homepage. They are kept because the case
   studies route and future work use them, and because the project process
   content is what stands in for fabricated customer stories.
   ========================================================================== */

export function ProjectProcessSection() {
  return (
    <Section className="bg-white">
      <Container>
        <Panel>
          <SectionHeading
            eyebrow="Project process"
            title="No case studies, because none are evidenced yet"
            lede="We do not publish customer stories without written permission from the customer and evidence for every figure quoted."
            action={
              <ButtonLink href="/case-studies" variant="secondary">
                Read the full project walkthrough
              </ButtonLink>
            }
          />
        </Panel>
      </Container>
    </Section>
  );
}

const responsibilityLinks = [
  {
    label: "Sustainability",
    href: "/sustainability",
    description: "Approach described without invented metrics.",
  },
  {
    label: "Social responsibility",
    href: "/responsibility",
    description: "What we publish, what we withhold and why.",
  },
  {
    label: "Certifications",
    href: "/certifications",
    description: "A verifiable registry rather than a wall of logos.",
  },
  {
    label: "Traceability",
    href: "/traceability",
    description: "Where materials and production actually come from.",
  },
  {
    label: "Quality",
    href: "/quality",
    description: "Checkpoints from incoming material to packing.",
  },
];

export function ResponsibilitySection() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Responsibility"
          title="Claims we can evidence, and nothing else"
          lede="There are no capacity figures, employee counts or delivery percentages on this website, because none of them has been measured and verified for publication."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {responsibilityLinks.map((item, index) => (
            <Reveal key={item.href} as="li" delay={(index % 3) * 55} className="h-full">
              <Link
                href={item.href}
                className="tw-card tw-card-interactive group flex h-full flex-col p-6"
              >
                <span className="text-body font-semibold text-ink transition-colors duration-200 group-hover:text-forest-deep">
                  {item.label}
                </span>
                <span className="mt-2 text-small text-ink-muted">{item.description}</span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <MarkerList
          className="mt-10"
          items={["Every product family states how it is produced."]}
        />
      </Container>
    </Section>
  );
}
