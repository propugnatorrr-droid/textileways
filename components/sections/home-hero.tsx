import { Container, ButtonLink } from "@/components/ui";
import { Media } from "@/components/content/media";
import { editorialMedia } from "@/content/fallback/media";
import { verifiedFactValue } from "@/content/configuration/company-facts";
import { QuoteCta } from "@/components/sections/quote-cta";
import { WhatsappInlineLink } from "@/components/layout/whatsapp-button";

/**
 * Homepage hero.
 *
 * Centred type over a single wide image, with a stat bar that sits inside the
 * image on desktop and drops below it on smaller screens. The experience figure
 * comes from the verified fact register, so it disappears rather than becoming a
 * placeholder if the business ever withdraws it.
 */
export function HomeHero() {
  const experience = verifiedFactValue("experience-years");

  return (
    <section className="overflow-hidden bg-white pb-20 pt-10 md:pb-28 md:pt-16 lg:pb-32 lg:pt-20">
      <Container>
        <div className="mx-auto max-w-[1180px] text-center">
          <p className="text-label font-semibold uppercase tracking-[0.14em] text-forest">
            Textile and apparel manufacturing in Pakistan
          </p>

          <h1 className="mx-auto mt-7 max-w-[12ch] font-sans text-display-xl font-semibold tracking-[-0.065em] text-ink">
            Made for your first launch.
            <span className="block text-forest">Built for your largest.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-[680px] text-body-l text-ink-muted">
            Custom apparel, uniforms, sportswear, home textiles and specialist products
            for buyers across the USA and Europe. Start at 50 pieces and scale beyond
            100,000.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <QuoteCta location="home_hero">Start a Manufacturing Project</QuoteCta>

            <ButtonLink href="/products" variant="secondary">
              Explore Products
            </ButtonLink>

            <WhatsappInlineLink
              context={{ pageLabel: "Homepage", path: "/" }}
              location="home_hero"
            />
          </div>
        </div>

        <div className="relative mt-14 md:mt-[72px]">
          <Media
            asset={editorialMedia.homeHero}
            priority
            sizes="(min-width: 1440px) 1312px, calc(100vw - 40px)"
            aspect="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/8]"
            className="rounded-[28px] md:rounded-[36px]"
          />

          <div className="relative mx-3 -mt-6 grid overflow-hidden rounded-[22px] border border-black/[0.06] bg-white shadow-[0_24px_70px_rgba(11,15,13,0.13)] sm:mx-8 sm:grid-cols-3 lg:absolute lg:bottom-8 lg:left-8 lg:right-8 lg:mt-0">
            <div className="p-5 sm:p-6">
              <p className="text-label font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                Flexible entry
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-ink">
                From 50 pieces
              </p>
            </div>

            <div className="border-t border-line p-5 sm:border-l sm:border-t-0 sm:p-6">
              <p className="text-label font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                Scalable production
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-ink">
                100,000 plus
              </p>
            </div>

            <div className="border-t border-line p-5 sm:border-l sm:border-t-0 sm:p-6">
              <p className="text-label font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                Manufacturing experience
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-ink">
                {experience ?? "20 plus years"}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
