import Link from "next/link";
import { Container, DisplayHeading, Eyebrow, Lede, Section, ButtonLink, StatusTag } from "@/components/ui";
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

/* -------------------------------------------------------------------------- */
/* Shared section header                                                       */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  eyebrow,
  title,
  lede,
  action,
  tone = "default",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  action?: React.ReactNode;
  tone?: "default" | "inverse";
}) {
  return (
    <div className="tw-section-header">
      <div>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <DisplayHeading
          level={2}
          size="h2"
          className={tone === "inverse" ? "mt-5 max-w-[16ch] text-white" : "mt-5 max-w-[16ch] text-ink"}
        >
          {title}
        </DisplayHeading>
      </div>
      {lede || action ? (
        <div className="flex flex-col items-start gap-6">
          {lede ? (
            <p
              className={
                tone === "inverse"
                  ? "max-w-[52ch] text-body-l leading-relaxed text-white/75"
                  : "max-w-[52ch] text-body-l leading-relaxed text-ink-muted"
              }
            >
              {lede}
            </p>
          ) : null}
          {action}
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Production scale                                                            */
/* -------------------------------------------------------------------------- */

export function ProductionScaleSection() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="tw-surface p-6 sm:p-10 lg:p-14">
          <SectionHeader
            eyebrow="Production scale"
            title="Start at 50. Scale beyond 100,000."
            lede="The same specification discipline applies at every quantity. What changes is material planning, line scheduling and how goods are shipped."
          />

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {productionScaleSteps.map((step, index) => (
              <Reveal
                key={step.title}
                as="li"
                delay={index * 70}
                className="tw-card tw-card-interactive flex flex-col rounded-[22px] p-6"
              >
                <p className="font-sans text-[2rem] font-semibold leading-none tracking-[-0.05em] text-forest">
                  {step.quantity}
                </p>
                <p className="mt-2 text-label font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                  {step.unit}
                </p>
                <p className="mt-6 text-small font-semibold text-ink">{step.title}</p>
                <p className="mt-2 text-small leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Product universe                                                            */
/* -------------------------------------------------------------------------- */

export function ProductUniverseSection() {
  const [lead, ...rest] = productFamilies;
  const featured = rest.slice(0, 8);

  return (
    <Section className="bg-white">
      <Container>
        <SectionHeader
          eyebrow="Product universe"
          title="Thirteen product families"
          lede="Each family states how it is produced, what it is typically made from, and where its minimum quantity really comes from."
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="sm:col-span-2">
            <ProductCard family={lead} featured />
          </Reveal>
          {featured.map((family, index) => (
            <Reveal key={family.slug} delay={(index % 3) * 60}>
              <ProductCard family={family} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ProductCard({
  family,
  featured = false,
}: {
  family: (typeof productFamilies)[number];
  featured?: boolean;
}) {
  return (
    <Link
      href={`/products/${family.slug}`}
      className="tw-card tw-card-interactive group flex h-full flex-col overflow-hidden rounded-[26px] p-3"
    >
      <Media
        asset={family.hero}
        aspect={featured ? "aspect-[16/9]" : "aspect-[4/3]"}
        sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 50vw"}
        className="rounded-[18px] shadow-none"
        zoomOnHover
      />
      <div className="flex flex-1 flex-col p-4 pt-5 sm:p-5 sm:pt-6">
        <h3
          className={
            featured
              ? "font-sans text-h3 font-semibold tracking-[-0.032em] text-ink transition-colors duration-200 group-hover:text-forest-deep"
              : "text-lg font-semibold tracking-[-0.03em] text-ink transition-colors duration-200 group-hover:text-forest-deep"
          }
        >
          {family.name}
        </h3>
        <p className="mt-2.5 flex-1 text-small leading-relaxed text-ink-muted">
          {family.summary}
        </p>
        <p className="mt-5 text-label font-semibold uppercase tracking-[0.09em] text-ink-subtle">
          {capabilityStatusLabels[family.capabilityStatus]}
        </p>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Positioning                                                                 */
/* -------------------------------------------------------------------------- */

export function PositioningSection() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="overflow-hidden rounded-[32px] bg-ink px-6 py-14 text-white sm:px-10 lg:px-16 lg:py-20">
          <Eyebrow tone="inverse">Positioning</Eyebrow>
          <DisplayHeading level={2} size="h2" className="mt-5 max-w-[20ch] text-white">
            Startup flexibility. Enterprise manufacturing discipline.
          </DisplayHeading>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7 lg:p-9">
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-white/60">
                Startup flexibility
              </p>
              <p className="mt-5 font-sans text-[2.75rem] font-semibold leading-none tracking-[-0.05em] text-white">
                50 pieces
              </p>
              <p className="mt-5 text-body leading-relaxed text-white/75">
                A validation run costs a few days and answers the questions a
                specification cannot: whether the fit is right, whether the fabric feels
                the way you expected, and whether anyone buys it.
              </p>
            </Reveal>

            <Reveal delay={120} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7 lg:p-9">
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-white/60">
                Enterprise discipline
              </p>
              <p className="mt-5 font-sans text-[2.75rem] font-semibold leading-none tracking-[-0.05em] text-white">
                100,000 plus
              </p>
              <p className="mt-5 text-body leading-relaxed text-white/75">
                Committed material planning, scheduled shipments and inspection regimes
                agreed in advance, against the same approved sample the first fifty
                pieces were made from.
              </p>
            </Reveal>
          </div>

          <p className="mt-12 max-w-[62ch] text-body-l leading-relaxed text-white/80">
            You should not have to replace your manufacturer every time you grow. Every
            supplier change costs a season in re establishing fit, fabric and colour.
          </p>

          <div className="mt-9">
            <QuoteCta location="home_positioning" variant="inverse">
              Start a conversation
            </QuoteCta>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Capabilities                                                                */
/* -------------------------------------------------------------------------- */

export function CapabilitiesSection() {
  const highlights = homeCapabilityHighlights.slice(0, 6);

  return (
    <Section className="bg-white">
      <Container>
        <div className="overflow-hidden rounded-[32px] bg-forest px-6 py-14 text-white sm:px-10 lg:px-16 lg:py-20">
          <SectionHeader
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

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Media
              asset={factoryMedia.sampling}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="rounded-[24px] shadow-none"
            />

            <ol className="divide-y divide-white/10">
              {highlights.map((item, index) => (
                <Reveal key={item.title} as="li" delay={index * 55}>
                  <Link
                    href={item.href}
                    className="group flex items-start gap-5 py-5 transition-opacity duration-200 hover:opacity-90"
                  >
                    <span
                      aria-hidden="true"
                      className="w-8 shrink-0 pt-0.5 text-small font-semibold tabular-nums text-white/45"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="block text-body font-semibold text-white">
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-small leading-relaxed text-white/70">
                        {item.description}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 pt-1 text-white/45 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Factory                                                                     */
/* -------------------------------------------------------------------------- */

export function FactorySection() {
  const awaitingPhotography = factoryMedia.productionFloor.isPlaceholder === true;

  return (
    <Section className="bg-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>The factory</Eyebrow>
            <DisplayHeading level={2} size="h2" className="mt-5 max-w-[14ch]">
              Where your product would be made
            </DisplayHeading>
            <Lede className="mt-6">
              Buyers are entitled to see the environment their product comes from. Every
              product family also states whether it is made in house or through an
              audited partner facility.
            </Lede>

            {awaitingPhotography ? (
              <p className="mt-7 max-w-[54ch] rounded-[16px] border border-line bg-cotton px-5 py-4 text-small leading-relaxed text-ink-muted">
                These slots are reserved for photography of the Textileways facility.
                Until the business supplies its own images, neutral panels stand in
                rather than photographs of somewhere else, because a picture of another
                factory would misrepresent the business.
              </p>
            ) : null}

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/factory" variant="secondary">
                About the facility
              </ButtonLink>
              <ButtonLink href="/quality" variant="quiet">
                How quality is controlled
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-4">
            <Reveal>
              <Media
                asset={factoryMedia.productionFloor}
                aspect="aspect-[16/9]"
                sizes="(min-width: 1024px) 58vw, 92vw"
                className="rounded-[28px]"
              />
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              <Reveal delay={90}>
                <Media
                  asset={factoryMedia.cutting}
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 1024px) 29vw, 46vw"
                  className="rounded-[22px]"
                />
              </Reveal>
              <Reveal delay={160}>
                <Media
                  asset={factoryMedia.inspection}
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 1024px) 29vw, 46vw"
                  className="rounded-[22px]"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* How it works                                                                */
/* -------------------------------------------------------------------------- */

export function HowItWorksSection() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeader
          eyebrow="How it works"
          title="Eight stages from inquiry to delivery"
          lede="Each stage has a decision attached to it. Nothing moves forward until the previous stage is approved in writing."
          action={
            <ButtonLink href="/manufacturing-process" variant="secondary">
              See the full 21 stage process
            </ButtonLink>
          }
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksStages.map((stage, index) => (
            <Reveal
              key={stage.title}
              as="li"
              delay={(index % 4) * 60}
              className="flex flex-col rounded-[22px] border border-line bg-cotton p-6 transition-colors duration-300 hover:bg-surface-strong"
            >
              <span
                aria-hidden="true"
                className="font-sans text-[2.5rem] font-semibold leading-none tracking-[-0.05em] text-stone"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-body font-semibold text-ink">{stage.title}</h3>
              <p className="mt-2.5 text-small leading-relaxed text-ink-muted">
                {stage.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Quality                                                                     */
/* -------------------------------------------------------------------------- */

export function QualitySection() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="tw-surface p-6 sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start lg:gap-16">
            <div>
              <Eyebrow>Quality</Eyebrow>
              <DisplayHeading level={2} size="h2" className="mt-5 max-w-[16ch]">
                Eight checkpoints, not one final inspection
              </DisplayHeading>
              <Lede className="mt-6">
                By the time a garment reaches final inspection, every decision that
                determines its quality has already been made. These checkpoints exist to
                catch problems at the stage that caused them.
              </Lede>

              <div className="mt-8">
                <StatusTag tone="muted">Configurable per order</StatusTag>
                <p className="mt-3 max-w-[48ch] text-small text-ink-subtle">
                  Inspection standards and acceptance limits are agreed in writing for
                  each order rather than published as a fixed company standard.
                </p>
              </div>

              <div className="mt-9">
                <Media
                  asset={editorialMedia.quality}
                  aspect="aspect-[16/10]"
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="rounded-[24px]"
                />
              </div>

              <div className="mt-9">
                <ButtonLink href="/quality" variant="secondary">
                  How quality is controlled
                </ButtonLink>
              </div>
            </div>

            <ol className="grid gap-3">
              {qualityCheckpoints.map((checkpoint, index) => (
                <Reveal
                  key={checkpoint.title}
                  as="li"
                  delay={index * 45}
                  className="flex gap-4 rounded-[18px] border border-line bg-white p-5"
                >
                  <CheckMark />
                  <div>
                    <h3 className="text-small font-semibold text-ink">{checkpoint.title}</h3>
                    <p className="mt-1.5 text-small leading-relaxed text-ink-muted">
                      {checkpoint.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Minimal check mark, drawn inline so no icon library is required. */
function CheckMark() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-soft"
    >
      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
        <path
          d="M1 5.2 4.2 8.4 11 1.6"
          stroke="#087a55"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Markets                                                                     */
/* -------------------------------------------------------------------------- */

const marketMedia = {
  usa: editorialMedia.logistics,
  europe: editorialMedia.scale,
  uk: editorialMedia.materials,
} as const;

export function MarketsSection() {
  const featured = markets.filter((market) => market.slug === "usa" || market.slug === "europe");

  return (
    <Section className="bg-white">
      <Container>
        <SectionHeader
          eyebrow="Markets"
          title="Built around USA and European buyers"
          lede="Sizing conventions, labelling requirements and documentation differ by destination. They are confirmed with you rather than assumed."
          action={
            <ButtonLink href="/markets" variant="secondary">
              All markets
            </ButtonLink>
          }
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {featured.map((market, index) => (
            <Reveal key={market.slug} delay={index * 90}>
              <Link
                href={`/markets/${market.slug}`}
                className="tw-card tw-card-interactive group flex h-full flex-col overflow-hidden rounded-[28px] p-3"
              >
                <Media
                  asset={marketMedia[market.slug as keyof typeof marketMedia]}
                  aspect="aspect-[16/9]"
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="rounded-[20px] shadow-none"
                  zoomOnHover
                />
                <div className="flex flex-1 flex-col p-5 pt-6 sm:p-7">
                  <h3 className="font-sans text-h3 font-semibold tracking-[-0.032em] text-ink transition-colors duration-200 group-hover:text-forest-deep">
                    {market.name}
                  </h3>
                  <p className="mt-3 text-small leading-relaxed text-ink-muted">
                    {market.summary}
                  </p>
                  <ul className="mt-6 grid gap-2.5">
                    {market.buyerSupport.slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-3 text-small text-ink-muted">
                        <CheckMark />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-7 text-label font-semibold uppercase tracking-[0.09em] text-forest">
                    Market guidance
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

/* -------------------------------------------------------------------------- */
/* Project process, retained for other routes                                  */
/* -------------------------------------------------------------------------- */

/**
 * Not rendered on the homepage. Kept because the case studies route and future
 * work may use it, and because removing it would lose the educational content
 * that stands in for fabricated customer stories.
 */
export function ProjectProcessSection() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="tw-surface p-6 sm:p-10 lg:p-14">
          <SectionHeader
            eyebrow="Project process"
            title="No case studies, because none are evidenced yet"
            lede="We do not publish customer stories without written permission from the customer and evidence for every figure quoted."
            action={
              <ButtonLink href="/case-studies" variant="secondary">
                Read the full project walkthrough
              </ButtonLink>
            }
          />
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Responsibility, retained for other routes                                   */
/* -------------------------------------------------------------------------- */

const responsibilityLinks = [
  { label: "Sustainability", href: "/sustainability", description: "Approach described without invented metrics." },
  { label: "Social responsibility", href: "/responsibility", description: "What we publish, what we withhold and why." },
  { label: "Certifications", href: "/certifications", description: "A verifiable registry rather than a wall of logos." },
  { label: "Traceability", href: "/traceability", description: "Where materials and production actually come from." },
  { label: "Quality", href: "/quality", description: "Checkpoints from incoming material to packing." },
];

/** Not rendered on the homepage. Retained for other routes and future work. */
export function ResponsibilitySection() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeader
          eyebrow="Responsibility"
          title="Claims we can evidence, and nothing else"
          lede="There are no capacity figures, employee counts or delivery percentages on this website, because none of them has been measured and verified for publication."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {responsibilityLinks.map((item, index) => (
            <Reveal key={item.href} as="li" delay={(index % 3) * 55}>
              <Link
                href={item.href}
                className="tw-card tw-card-interactive flex h-full flex-col rounded-[22px] p-6"
              >
                <span className="text-body font-semibold text-ink">{item.label}</span>
                <span className="mt-2 text-small leading-relaxed text-ink-muted">
                  {item.description}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Insights                                                                    */
/* -------------------------------------------------------------------------- */

export function InsightsSection() {
  const latest = articlesByDate().slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <Section className="bg-white">
      <Container>
        <SectionHeader
          eyebrow="Insights"
          title="How manufacturing decisions actually work"
          lede="Explanations rather than marketing, written for buyers who want to understand why a minimum quantity is what it is."
          action={
            <ButtonLink href="/insights" variant="secondary">
              All insights
            </ButtonLink>
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {latest.map((article, index) => (
            <Reveal key={article.slug} delay={index * 80}>
              <Link
                href={`/insights/${article.slug}`}
                className="tw-card tw-card-interactive group flex h-full flex-col overflow-hidden rounded-[24px] p-3"
              >
                <Media
                  asset={article.hero}
                  aspect="aspect-[16/10]"
                  sizes="(min-width: 768px) 30vw, 92vw"
                  className="rounded-[18px] shadow-none"
                  zoomOnHover
                />
                <div className="flex flex-1 flex-col p-4 pt-5 sm:p-5">
                  <p className="text-label font-semibold uppercase tracking-[0.09em] text-ink-subtle">
                    {article.category} &middot; {article.readingMinutes} minute read
                  </p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.03em] text-ink transition-colors duration-200 group-hover:text-forest-deep">
                    {article.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-small leading-relaxed text-ink-muted">
                    {article.summary}
                  </p>
                  <time
                    dateTime={article.publishedAt}
                    className="mt-6 text-small text-ink-subtle"
                  >
                    {formatDate(article.publishedAt)}
                  </time>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Final call to action                                                        */
/* -------------------------------------------------------------------------- */

export function FinalCtaSection() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="overflow-hidden rounded-[32px] bg-forest px-6 py-16 text-white sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-[900px] text-center">
            <Eyebrow tone="inverse" className="justify-center">
              Start at 50. Scale beyond 100,000.
            </Eyebrow>

            <DisplayHeading level={2} size="h2" className="mx-auto mt-6 max-w-[18ch] text-white">
              Bring us the idea. Leave with a production plan.
            </DisplayHeading>

            <p className="mx-auto mt-7 max-w-[58ch] text-body-l leading-relaxed text-white/80">
              Share your product details, target quantity and delivery requirements. Our
              team will review the technical and commercial requirements.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <QuoteCta location="home_final_cta" variant="inverse">
                Request a Manufacturing Quote
              </QuoteCta>

              <WhatsappInlineLink
                context={{ pageLabel: "Homepage", path: "/" }}
                location="home_final_cta"
                variant="inverse"
              >
                Talk to Our Team
              </WhatsappInlineLink>

              <Link
                href="/request-a-sample"
                className="inline-flex min-h-[50px] items-center justify-center rounded-[14px] border border-white/35 px-6 text-small font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
              >
                Request a Sample
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
