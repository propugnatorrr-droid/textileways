import { Container, ButtonLink } from "@/components/ui";
import { Media } from "@/components/content/media";
import { editorialMedia } from "@/content/fallback/media";
import { verifiedFactValue } from "@/content/configuration/company-facts";
import { QuoteCta } from "@/components/sections/quote-cta";
import { WhatsappInlineLink } from "@/components/layout/whatsapp-button";

export function HomeHero() {
  const experience = verifiedFactValue("experience-years");

  const stats = [
    {
      value: "From 50",
      label: "Minimum order",
      hint: "Per style, after technical review",
    },
    {
      value: "100,000+",
      label: "Scaled programmes",
      hint: "Committed material planning",
    },
    {
      value: experience ? "20+ years" : "USA and EU",
      label: experience ? "Manufacturing experience" : "Primary markets",
      hint: experience
        ? "Pakistan-based production"
        : "Documentation prepared per market",
    },
  ];

  return (
    <section className="border-b border-line-strong bg-white">
      <Container>
        <div className="grid border-x border-line-strong lg:min-h-[720px] lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
          <div className="flex flex-col justify-center border-b border-line-strong px-6 py-16 sm:px-10 lg:border-b-0 lg:border-r lg:px-12 lg:py-20 xl:px-16">
            <div className="mb-8 flex items-center gap-4">
              <span aria-hidden="true" className="h-[2px] w-10 bg-forest" />
              <p className="text-label font-bold uppercase tracking-[0.14em] text-ink">
                Textile and apparel manufacturing · Pakistan
              </p>
            </div>

            <h1 className="max-w-[11ch] font-sans text-display-xl font-semibold text-ink">
              Made for the first run.
              <span className="block text-forest">Built for scale.</span>
            </h1>

            <p className="mt-7 max-w-[52ch] text-body-l text-ink-muted">
              Custom apparel, uniforms, sportswear, home textiles and specialist
              products manufactured for international brands and organisations.
              Begin with technical validation and scale into repeat production.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
              <QuoteCta location="home_hero">
                Request a Manufacturing Quote
              </QuoteCta>

              <ButtonLink href="/factory" variant="secondary">
                View the Factory
              </ButtonLink>

              <WhatsappInlineLink
                context={{ pageLabel: "Homepage", path: "/" }}
                location="home_hero"
                variant="quiet"
              />
            </div>
          </div>

          <div className="relative min-h-[430px] lg:min-h-0">
            <Media
              asset={editorialMedia.homeHero}
              priority
              sizes="(min-width: 1024px) 57vw, 100vw"
              aspect="absolute inset-0"
              className="h-full w-full rounded-none"
            />

            <div className="absolute bottom-0 left-0 border-t-2 border-forest bg-ink px-5 py-4 text-white sm:px-6">
              <p className="text-label font-bold uppercase tracking-[0.12em] text-white/60">
                Production scope
              </p>
              <p className="mt-1 text-small text-white">
                Development · Sourcing · Manufacturing · Quality · Export
              </p>
            </div>
          </div>
        </div>

        <dl className="grid border-x border-b border-line-strong sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={
                index === 0
                  ? "px-6 py-7 lg:px-10"
                  : "border-t border-line-strong px-6 py-7 sm:border-l sm:border-t-0 lg:px-10"
              }
            >
              <dt className="text-label font-bold uppercase tracking-[0.11em] text-ink-subtle">
                {stat.label}
              </dt>
              <dd className="tw-tnum mt-3 font-sans text-[clamp(1.8rem,2.2vw,2.5rem)] font-semibold leading-none tracking-[-0.035em] text-ink">
                {stat.value}
              </dd>
              <dd className="mt-2 text-small text-ink-muted">{stat.hint}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
