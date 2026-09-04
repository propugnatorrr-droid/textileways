import { Container, ButtonLink } from "@/components/ui";
import { Media } from "@/components/content/media";
import { editorialMedia } from "@/content/fallback/media";
import { verifiedFactValue } from "@/content/configuration/company-facts";
import { QuoteCta } from "@/components/sections/quote-cta";
import { WhatsappInlineLink } from "@/components/layout/whatsapp-button";

/**
 * Homepage hero.
 *
 * The layout is an editorial split: type on the left, full bleed media on the
 * right, meeting a hairline rule. There is no overlay text on the image, so the
 * photograph never has to fight the copy for contrast.
 */
export function HomeHero() {
  const experience = verifiedFactValue("experience-years");

  return (
    <section className="border-b border-line">
      <Container className="!px-0 lg:!px-0">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="flex flex-col justify-center px-5 pb-14 pt-16 md:px-8 lg:py-28 lg:pl-12 lg:pr-16 xl:pl-[72px] xl:pr-20">
            <p className="flex items-center gap-3 text-label font-medium uppercase tracking-[0.09em] text-ink-subtle">
              <span aria-hidden="true" className="h-px w-6 shrink-0 bg-line-strong" />
              Textile and apparel manufacturing in Pakistan
            </p>

            <h1 className="mt-7 font-serif text-display-l font-normal">
              One manufacturing partner.
              <span className="block text-forest">Every textile possibility.</span>
            </h1>

            <p className="mt-7 max-w-[52ch] text-body-l text-ink-muted">
              Custom apparel, uniforms, home textiles and specialist products for brands
              across the USA and Europe. Start with 50 pieces and scale beyond 100,000.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <QuoteCta location="home_hero">Request a Manufacturing Quote</QuoteCta>
              <ButtonLink href="/products" variant="secondary">
                Explore Products
              </ButtonLink>
              <WhatsappInlineLink
                context={{ pageLabel: "Homepage", path: "/" }}
                location="home_hero"
              />
            </div>

            {experience ? (
              <p className="mt-10 border-t border-line pt-6 text-small text-ink-subtle">
                <span className="font-medium text-ink-muted">{experience}</span> of
                manufacturing experience, serving buyers in the USA and Europe.
              </p>
            ) : null}
          </div>

          <div className="relative border-t border-line lg:border-l lg:border-t-0">
            <Media
              asset={editorialMedia.homeHero}
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              aspect="aspect-[4/3] lg:aspect-auto lg:h-full"
              className="!rounded-none h-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
