import { Container, ButtonLink } from "@/components/ui";
import { Media } from "@/components/content/media";
import { editorialMedia } from "@/content/fallback/media";
import { verifiedFactValue } from "@/content/configuration/company-facts";
import { QuoteCta } from "@/components/sections/quote-cta";
import { WhatsappInlineLink } from "@/components/layout/whatsapp-button";

/**
 * Homepage hero.
 *
 * Composed so that the heading, supporting copy, actions and the top of the
 * media frame all sit inside a typical laptop viewport. The heading is capped
 * at two lines by explicit breaks rather than left to wrap. The MOQ and scale
 * statistics live inside the left column, directly under the actions, so they
 * render above the fold rather than in a separate full width strip below it.
 */
export function HomeHero() {
  const experience = verifiedFactValue("experience-years");

  const stats = [
    { value: "From 50", label: "Minimum order", hint: "Per style, after technical review" },
    { value: "100,000+", label: "Scaled programmes", hint: "Committed material planning" },
    {
      value: experience ? "20+ years" : "USA and EU",
      label: experience ? "Manufacturing experience" : "Primary markets",
      hint: experience ? "Pakistan based production" : "Documentation prepared per market",
    },
  ];

  return (
    <section className="bg-white pb-4 pt-8 md:pt-12 lg:pt-16">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
          <div>
            <p className="text-label font-semibold uppercase tracking-[0.12em] text-forest">
              Textile and apparel manufacturing in Pakistan
            </p>

            <h1 className="mt-5 font-sans text-display-xl font-semibold text-ink">
              Clothing manufacturer in Pakistan.
              <span className="mt-1 block text-forest">From 50 pieces to 100,000+.</span>
            </h1>

            <p className="mt-6 max-w-[54ch] text-body-l text-ink-muted">
              Custom and private label apparel, uniforms, activewear, home textiles and
              specialist products manufactured in Pakistan for international brands and
              organisations. Start from approximately 50 pieces after technical review and
              build toward larger repeat production.
            </p>


            <div className="mt-8 flex flex-wrap items-center gap-3">
              <QuoteCta location="home_hero">Request a Manufacturing Quote</QuoteCta>

              <ButtonLink href="/products" variant="secondary">
                Explore Products
              </ButtonLink>

              <WhatsappInlineLink
                context={{ pageLabel: "Homepage", path: "/" }}
                location="home_hero"
                variant="quiet"
              />
            </div>

            <dl className="mt-8 grid overflow-hidden rounded-[16px] bg-cotton sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={
                    index === 0
                      ? "px-5 py-5"
                      : "border-t border-line px-5 py-5 sm:border-l sm:border-t-0"
                  }
                >
                  <dt className="text-label font-semibold uppercase tracking-[0.09em] text-ink-subtle">
                    {stat.label}
                  </dt>
                  <dd className="tw-tnum mt-2 font-sans text-[clamp(1.35rem,1.6vw,1.7rem)] font-semibold leading-none tracking-[-0.03em] text-ink">
                    {stat.value}
                  </dd>
                  <dd className="mt-1.5 text-small text-ink-muted">{stat.hint}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <Media
              asset={editorialMedia.homeHero}
              priority
              large
              sizes="(min-width: 1024px) 46vw, calc(100vw - 40px)"
              aspect="aspect-[4/3] lg:aspect-[5/6]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
