import type { Metadata } from "next";
import { Container, Section, ButtonLink, Notice } from "@/components/ui";
import { PageHeader, ProseBlock, SplitSection, RelatedGrid, PageCta } from "@/components/sections/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { germanyMarketNarrative } from "@/content/fallback/company";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Pakistan Clothing Manufacturer for German Brands",
  description:
    "Manufacturing support for German brands and buyers sourcing apparel from Pakistan: what is genuinely different for Germany, LkSG due diligence, German language labelling and freight into Hamburg and Bremerhaven.",
  path: "/markets/germany",
});

export default function GermanyMarketPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Markets", path: "/markets" },
    { name: "Germany", path: "/markets/germany" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Market: Germany"
        title="A Pakistan based clothing manufacturer for German brands"
        lede="Germany is part of the European Union market described on /markets/europe. This page covers only what is genuinely additional for a German buyer specifically: due diligence law, language labelling and freight into German ports."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/markets/europe" variant="secondary">
              European Union market guidance
            </ButtonLink>
          </>
        }
      />

      <Section size="tight">
        <Container>
          <ProseBlock paragraphs={germanyMarketNarrative.intro} />
        </Container>
      </Section>

      {germanyMarketNarrative.sections.map((section) => (
        <SplitSection key={section.title} title={section.title}>
          <ProseBlock paragraphs={section.paragraphs} className="text-body" />
        </SplitSection>
      ))}

      <Section size="tight">
        <Container>
          <Notice tone="info" title="What we do not do" className="max-w-[74ch]">
            We do not give legal or regulatory advice, and we do not guarantee that a product
            complies with German or EU law. Confirming what your product and your buyer require
            remains your responsibility. What we do is apply exactly what you confirm, and flag
            anything in a specification that looks inconsistent with what you have told us about
            this market.
          </Notice>

          <div className="mt-12">
            <RelatedGrid
              title="Read next"
              columns={2}
              items={[
                {
                  href: "/compliance/lksg",
                  label: "LkSG and EU due diligence",
                  description: "Who the law actually obligates, and what TextileWays can support today.",
                },
                {
                  href: "/markets/europe",
                  label: "European Union market guidance",
                  description: "Sizing, fibre labelling, restricted substances and freight for the EU.",
                },
              ]}
            />
          </div>
        </Container>
      </Section>

      <PageCta
        title="Sourcing for a German brand or retailer?"
        description="Tell us your target quantity, product and destination city in the quote request. Labelling and documentation are then prepared for Germany from the start."
        location="germany_market_page"
        whatsapp={{ pageLabel: "Markets", path: "/markets/germany", detail: "Germany" }}
      />
    </>
  );
}
