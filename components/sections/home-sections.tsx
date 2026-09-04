import Link from "next/link";
import {
  Container,
  DisplayHeading,
  Eyebrow,
  Lede,
  Section,
  ButtonLink,
  StatusTag,
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
import { factoryMedia } from "@/content/fallback/media";
import { capabilityStatusLabels } from "@/content/types";
import { formatDate } from "@/lib/utilities/format";
import { siteConfig } from "@/content/configuration/site";

/* -------------------------------------------------------------------------- */
/* Production scale                                                            */
/* -------------------------------------------------------------------------- */

export function ProductionScaleSection() {
  return (
    <Section className="border-b border-line">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Production scale</Eyebrow>
            <DisplayHeading level={2} size="h2" className="mt-6">
              Start at 50. Scale beyond 100,000.
            </DisplayHeading>
            <Lede className="mt-6">
              The same specification discipline applies at every quantity. What changes is
              material planning, line scheduling and how goods are shipped.
            </Lede>
          </Reveal>

          <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
            {productionScaleSteps.map((step, index) => (
              <Reveal
                key={step.title}
                as="li"
                delay={index * 70}
                className="flex flex-col bg-paper p-6 lg:p-5 xl:p-6"
              >
                <p className="font-serif text-h3 text-forest">{step.quantity}</p>
                <p className="mt-0.5 text-label uppercase tracking-[0.09em] text-ink-subtle">
                  {step.unit}
                </p>
                <p className="mt-5 text-small font-semibold text-ink">{step.title}</p>
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

  return (
    <Section className="border-b border-line">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Product universe</Eyebrow>
            <DisplayHeading level={2} size="h2" className="mt-6 max-w-[16ch]">
              Thirteen product families
            </DisplayHeading>
          </div>
          <Lede className="md:max-w-[42ch] md:text-right">
            Each family states how it is produced, what it is typically made from, and where
            its minimum quantity really comes from.
          </Lede>
        </div>

        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="bg-paper sm:col-span-2 lg:row-span-2">
            <ProductCard family={lead} featured />
          </Reveal>
          {rest.map((family, index) => (
            <Reveal key={family.slug} delay={(index % 3) * 60} className="bg-paper">
              <ProductCard family={family} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/products" variant="secondary">
            View all product families
          </ButtonLink>
          <ButtonLink href="/industries" variant="secondary">
            Browse by industry
          </ButtonLink>
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
      className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-cotton/60 lg:p-8"
    >
      <Media
        asset={family.hero}
        aspect={featured ? "aspect-[16/10]" : "aspect-[4/3]"}
        sizes={featured ? "(min-width: 1024px) 42vw, 100vw" : "(min-width: 1024px) 22vw, 50vw"}
        zoomOnHover
      />
      <div className="mt-6 flex flex-1 flex-col">
        <h3
          className={
            featured
              ? "font-serif text-h3 transition-colors duration-200 group-hover:text-forest"
              : "text-body font-semibold transition-colors duration-200 group-hover:text-forest"
          }
        >
          {family.name}
        </h3>
        <p className="mt-2.5 flex-1 text-small leading-relaxed text-ink-muted">
          {family.summary}
        </p>
        <p className="mt-5 text-label uppercase tracking-[0.09em] text-ink-subtle">
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
    <Section className="border-b border-line bg-forest text-cotton">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow tone="inverse">Positioning</Eyebrow>
            <DisplayHeading level={2} size="h2" className="mt-6 text-cotton">
              Startup flexibility. Enterprise manufacturing discipline.
            </DisplayHeading>
          </Reveal>

          <Reveal delay={120} className="space-y-5 text-body-l leading-relaxed text-cotton/80">
            <p>
              Most brands change manufacturer at least twice on the way from a first sample to
              a serious production programme. Not because anyone did poor work, but because
              the supplier who could handle 200 pieces could not handle 20,000, and the one
              who could handle 20,000 would not quote for 200.
            </p>
            <p>
              Every one of those changes costs a season. Fit has to be re established, fabric
              re sourced, colour re matched, and the specification rebuilt from a garment
              rather than from a document.
            </p>
            <p className="text-cotton">
              You should not have to replace your manufacturer every time you grow.
            </p>
            <div className="pt-4">
              <QuoteCta location="home_positioning" variant="inverse">
                Start a conversation
              </QuoteCta>
            </div>
          </Reveal>
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
    <Section className="border-b border-line">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <DisplayHeading level={2} size="h2" className="mt-6">
              Eight stages from inquiry to delivery
            </DisplayHeading>
            <Lede className="mt-6">
              Each stage has a decision attached to it. Nothing moves forward until the
              previous stage is approved in writing.
            </Lede>
            <ButtonLink href="/manufacturing-process" variant="secondary" className="mt-8">
              See the full 21 stage process
            </ButtonLink>
          </Reveal>

          <ol className="border-t border-line">
            {howItWorksStages.map((stage, index) => (
              <Reveal
                key={stage.title}
                as="li"
                delay={index * 45}
                className="grid gap-2 border-b border-line py-6 sm:grid-cols-[3rem_minmax(0,15rem)_1fr] sm:gap-6 sm:py-7"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-h3 leading-none text-stone"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-body font-semibold text-ink">{stage.title}</h3>
                <p className="text-small leading-relaxed text-ink-muted">
                  {stage.description}
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
/* Capabilities                                                                */
/* -------------------------------------------------------------------------- */

export function CapabilitiesSection() {
  return (
    <Section className="border-b border-line bg-cotton">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Capabilities</Eyebrow>
            <DisplayHeading level={2} size="h2" className="mt-6 max-w-[18ch]">
              Everything a product needs, in one place
            </DisplayHeading>
          </div>
          <ButtonLink href="/capabilities" variant="secondary">
            All 30 capabilities
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {homeCapabilityHighlights.map((item, index) => (
            <Reveal key={item.title} delay={(index % 4) * 60} className="bg-cotton">
              <Link
                href={item.href}
                className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-paper"
              >
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-clay transition-[width] duration-300 group-hover:w-14"
                />
                <h3 className="mt-6 text-body font-semibold transition-colors duration-200 group-hover:text-forest">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-small leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Factory evidence                                                            */
/* -------------------------------------------------------------------------- */

const factoryGallery = [
  { asset: factoryMedia.exterior, label: "Factory exterior" },
  { asset: factoryMedia.productionFloor, label: "Production floor" },
  { asset: factoryMedia.cutting, label: "Cutting" },
  { asset: factoryMedia.sewing, label: "Sewing" },
  { asset: factoryMedia.printing, label: "Printing" },
  { asset: factoryMedia.embroidery, label: "Embroidery" },
  { asset: factoryMedia.inspection, label: "Inspection" },
  { asset: factoryMedia.packing, label: "Packing" },
];

export function FactorySection() {
  const awaitingPhotography = factoryGallery.some((item) => item.asset.isPlaceholder);

  return (
    <Section className="border-b border-line">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>The factory</Eyebrow>
            <DisplayHeading level={2} size="h2" className="mt-6 max-w-[18ch]">
              Where your product would be made
            </DisplayHeading>
          </div>
          <ButtonLink href="/factory" variant="secondary">
            About the facility
          </ButtonLink>
        </div>

        {awaitingPhotography ? (
          <p className="mt-8 max-w-[68ch] border-l-2 border-clay bg-cotton/60 px-5 py-4 text-small text-ink-muted">
            These eight slots are reserved for photography of the Textileways facility. Until
            the business supplies its own images, patterned panels stand in rather than
            photographs of somewhere else, because a picture of another factory would
            misrepresent the business.
          </p>
        ) : null}

        <ul className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {factoryGallery.map((item, index) => (
            <Reveal key={item.label} as="li" delay={(index % 4) * 55} className="bg-paper p-4">
              <Media
                asset={item.asset}
                aspect="aspect-[4/3]"
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
              />
              <p className="mt-3 text-label uppercase tracking-[0.09em] text-ink-subtle">
                {item.label}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Quality                                                                     */
/* -------------------------------------------------------------------------- */

export function QualitySection() {
  return (
    <Section className="border-b border-line bg-cotton">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Quality</Eyebrow>
            <DisplayHeading level={2} size="h2" className="mt-6">
              Eight checkpoints, not one final inspection
            </DisplayHeading>
            <Lede className="mt-6">
              By the time a garment reaches final inspection, every decision that determines
              its quality has already been made. These checkpoints exist to catch problems at
              the stage that caused them.
            </Lede>
            <div className="mt-8">
              <StatusTag tone="muted">Configurable per order</StatusTag>
              <p className="mt-3 max-w-[46ch] text-small text-ink-subtle">
                Inspection standards and acceptance limits are agreed in writing for each
                order rather than published as a fixed company standard.
              </p>
            </div>
            <ButtonLink href="/quality" variant="secondary" className="mt-8">
              How quality is controlled
            </ButtonLink>
          </Reveal>

          <ol className="grid gap-px bg-line sm:grid-cols-2">
            {qualityCheckpoints.map((checkpoint, index) => (
              <Reveal key={checkpoint.title} as="li" delay={(index % 2) * 60} className="bg-cotton p-6">
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
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Markets                                                                     */
/* -------------------------------------------------------------------------- */

export function MarketsSection() {
  return (
    <Section className="border-b border-line">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Markets</Eyebrow>
            <DisplayHeading level={2} size="h2" className="mt-6 max-w-[18ch]">
              Built around USA and European buyers
            </DisplayHeading>
          </div>
          <Lede className="md:max-w-[40ch] md:text-right">
            Sizing conventions, labelling requirements and documentation differ by
            destination. They are confirmed with you rather than assumed.
          </Lede>
        </div>

        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {markets.map((market, index) => (
            <Reveal key={market.slug} delay={index * 70} className="bg-paper">
              <Link
                href={`/markets/${market.slug}`}
                className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-cotton/60"
              >
                <h3 className="font-serif text-h3 transition-colors duration-200 group-hover:text-forest">
                  {market.name}
                </h3>
                <p className="mt-3 flex-1 text-small leading-relaxed text-ink-muted">
                  {market.summary}
                </p>
                <span className="mt-6 text-label uppercase tracking-[0.09em] text-ink-subtle">
                  Market guidance
                </span>
              </Link>
            </Reveal>
          ))}

          <Reveal delay={210} className="bg-paper">
            <div className="flex h-full flex-col p-7">
              <h3 className="font-serif text-h3 text-ink-muted">Other markets</h3>
              <p className="mt-3 flex-1 text-small leading-relaxed text-ink-muted">
                We ship beyond these three markets. Tell us the destination in your inquiry
                and the documentation is prepared for it.
              </p>
              <Link
                href="/contact"
                className="tw-underline-grow mt-6 self-start text-small font-medium text-ink"
              >
                Ask about a destination
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Project process, shown in place of fabricated case studies                   */
/* -------------------------------------------------------------------------- */

export function ProjectProcessSection() {
  return (
    <Section className="border-b border-line bg-cotton">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,28rem)_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Project process</Eyebrow>
            <DisplayHeading level={2} size="h2" className="mt-6">
              No case studies, because none are evidenced yet
            </DisplayHeading>
            <Lede className="mt-6">
              We do not publish customer stories without written permission from the customer
              and evidence for every figure quoted. Until then, this is what a project
              actually looks like from a buyer&apos;s side.
            </Lede>
            <ButtonLink href="/case-studies" variant="secondary" className="mt-8">
              Read the full project walkthrough
            </ButtonLink>
          </Reveal>

          <Reveal delay={120}>
            <MarkerList
              className="text-body"
              items={[
                "You send a description, references, a target quantity and a market.",
                "We reply with technical questions rather than an immediate price.",
                "A quotation is issued against a written specification with assumptions stated.",
                "Samples run in stages, each answering one specific question.",
                "A pre production sample in bulk fabric is approved in writing.",
                "Production runs against that sample with inline and final inspection.",
                "Goods ship with documentation prepared for the destination market.",
              ]}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Responsibility                                                              */
/* -------------------------------------------------------------------------- */

const responsibilityLinks = [
  { label: "Sustainability", href: "/sustainability", description: "Approach described without invented metrics." },
  { label: "Social responsibility", href: "/responsibility", description: "What we publish, what we withhold and why." },
  { label: "Certifications", href: "/certifications", description: "A verifiable registry rather than a wall of logos." },
  { label: "Traceability", href: "/traceability", description: "Where materials and production actually come from." },
  { label: "Quality", href: "/quality", description: "Checkpoints from incoming material to packing." },
];

export function ResponsibilitySection() {
  return (
    <Section className="border-b border-line">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Responsibility</Eyebrow>
            <DisplayHeading level={2} size="h2" className="mt-6">
              Claims we can evidence, and nothing else
            </DisplayHeading>
            <Lede className="mt-6">
              There are no capacity figures, employee counts or delivery percentages on this
              website, because none of them has been measured and verified for publication.
            </Lede>
          </Reveal>

          <ul className="divide-y divide-line border-y border-line">
            {responsibilityLinks.map((item, index) => (
              <Reveal key={item.href} as="li" delay={index * 55}>
                <Link
                  href={item.href}
                  className="group flex flex-col gap-1.5 py-6 transition-colors duration-200 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span className="text-body font-semibold text-ink transition-colors duration-200 group-hover:text-forest sm:w-56 sm:shrink-0">
                    {item.label}
                  </span>
                  <span className="text-small text-ink-muted">{item.description}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
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
    <Section className="border-b border-line">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Insights</Eyebrow>
            <DisplayHeading level={2} size="h2" className="mt-6 max-w-[18ch]">
              How manufacturing decisions actually work
            </DisplayHeading>
          </div>
          <ButtonLink href="/insights" variant="secondary">
            All insights
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-px bg-line md:grid-cols-3">
          {latest.map((article, index) => (
            <Reveal key={article.slug} delay={index * 70} className="bg-paper">
              <Link
                href={`/insights/${article.slug}`}
                className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-cotton/60"
              >
                <Media
                  asset={article.hero}
                  aspect="aspect-[16/10]"
                  sizes="(min-width: 768px) 30vw, 92vw"
                  zoomOnHover
                />
                <p className="mt-6 text-label uppercase tracking-[0.09em] text-ink-subtle">
                  {article.category} &middot; {article.readingMinutes} minute read
                </p>
                <h3 className="mt-3 text-body font-semibold leading-snug transition-colors duration-200 group-hover:text-forest">
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
    <Section className="bg-forest text-cotton">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-20">
          <Reveal>
            <Eyebrow tone="inverse">{siteConfig.commercialMessage}</Eyebrow>
            <DisplayHeading level={2} size="h2" className="mt-6 text-cotton">
              From your first sample to your largest production run.
            </DisplayHeading>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-[52ch] text-body-l leading-relaxed text-cotton/80">
              Share your product details, target quantity and delivery requirements. Our team
              will review the technical and commercial requirements.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <QuoteCta location="home_final_cta" variant="inverse">
                Start Your RFQ
              </QuoteCta>
              <WhatsappInlineLink
                context={{ pageLabel: "Homepage", path: "/" }}
                location="home_final_cta"
                variant="inverse"
              />
              <Link
                href="/request-a-sample"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[3px] border border-cotton/40 px-6 text-small font-medium text-cotton transition-colors duration-200 hover:border-cotton hover:bg-cotton/10"
              >
                Request a Sample
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
