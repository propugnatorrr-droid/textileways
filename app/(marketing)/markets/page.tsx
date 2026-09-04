import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, ButtonLink, Notice } from "@/components/ui";
import { PageHeader, PageCta } from "@/components/sections/page-shell";
import { Media } from "@/components/content/media";
import { Reveal } from "@/components/content/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { markets } from "@/content/fallback/markets";
import { editorialMedia } from "@/content/fallback/media";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Markets",
  description:
    "How Textileways supports buyers importing into the United States, the European Union and the United Kingdom, covering sizing, labelling, documentation and freight planning.",
  path: "/markets",
});

export default function MarketsPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Markets", path: "/markets" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Markets"
        title="Built around USA and European buyers"
        lede="Sizing conventions, labelling requirements and import documentation differ by destination. These pages set out what we prepare for each market, and what stays your responsibility as the brand placing a product on it."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Ask about another destination
            </ButtonLink>
          </>
        }
        aside={
          <Media
            asset={editorialMedia.logistics}
            aspect="aspect-[4/3]"
            sizes="(min-width: 1024px) 40vw, 92vw"
          />
        }
      />

      <Section>
        <Container>
          <ul className="grid gap-px bg-line lg:grid-cols-3">
            {markets.map((market, index) => (
              <Reveal key={market.slug} as="li" delay={index * 70} className="bg-paper">
                <Link
                  href={`/markets/${market.slug}`}
                  className="group flex h-full flex-col p-8 transition-colors duration-300 hover:bg-cotton/60"
                >
                  <h2 className="font-serif text-h2 transition-colors duration-200 group-hover:text-forest">
                    {market.name}
                  </h2>
                  <p className="mt-4 flex-1 text-small leading-relaxed text-ink-muted">
                    {market.summary}
                  </p>
                  <span className="mt-8 text-label uppercase tracking-[0.09em] text-ink-subtle">
                    Market guidance
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Notice tone="info" title="Other international markets" className="mt-12 max-w-[74ch]">
            We ship beyond these three markets. Documentation is prepared for the destination
            you confirm, and any requirement specific to that market is raised before
            production rather than after shipping. Tell us the destination in your inquiry.
          </Notice>

          <Notice tone="info" title="What we do not do" className="mt-6 max-w-[74ch]">
            We do not give legal or regulatory advice, and we do not guarantee that a product
            complies with the law of a destination market. Responsibility for confirming what
            your product and your market require sits with you as the brand owner or importer.
            What we do is apply exactly what you confirm, and tell you when something in a
            specification looks inconsistent with it.
          </Notice>
        </Container>
      </Section>

      <PageCta
        title="Shipping into a specific market?"
        description="Tell us the destination city and country in your inquiry. Sizing, labelling and documentation are then prepared for that market from the start."
        location="markets_hub"
        whatsapp={{ pageLabel: "Markets", path: "/markets" }}
      />
    </>
  );
}
