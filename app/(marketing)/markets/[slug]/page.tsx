import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section, MarkerList, ButtonLink, Notice } from "@/components/ui";
import {
  PageHeader,
  ProseBlock,
  SplitSection,
  RelatedGrid,
  PageCta,
} from "@/components/sections/page-shell";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { ViewTracker } from "@/components/content/view-tracker";
import { getMarket, marketSlugs, markets } from "@/content/fallback/markets";
import { getFaqsByIds } from "@/content/fallback/faqs";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";

/*
 * Only slugs returned by generateStaticParams are valid routes. Anything else is
 * a 404 at the routing layer, which returns a genuine 404 status rather than
 * rendering the not found body with a 200.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return marketSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/markets/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const market = getMarket(slug);
  if (!market) return { title: "Market not found", robots: { index: false, follow: false } };

  return buildMetadata({
    title: market.seo.title,
    description: market.seo.description,
    path: `/markets/${market.slug}`,
  });
}

export default async function MarketPage(props: PageProps<"/markets/[slug]">) {
  const { slug } = await props.params;
  const market = getMarket(slug);
  if (!market) notFound();

  const faqs = getFaqsByIds(market.faqIds);
  const others = markets.filter((item) => item.slug !== market.slug);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Markets", path: "/markets" },
    { name: market.name, path: `/markets/${market.slug}` },
  ];

  const faqLd = faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), ...(faqLd ? [faqLd] : [])]} />
      <ViewTracker event="market_page_view" context={{ market: market.slug }} />

      <PageHeader
        eyebrow="Market"
        title={market.name}
        lede={market.summary}
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/markets" variant="secondary">
              All markets
            </ButtonLink>
          </>
        }
      />

      <Section tight className="">
        <Container>
          <ProseBlock paragraphs={market.introduction} />
        </Container>
      </Section>

      <SplitSection
        eyebrow="Buyer support"
        title={`What we prepare for ${market.name} buyers`}
      >
        <MarkerList items={market.buyerSupport} className="text-body" />
      </SplitSection>

      <SplitSection
        eyebrow="Documentation"
        title="Shipping documents"
        intro="The document set is confirmed against your destination and your importer's requirements before dispatch."
        className="tw-card tw-card-interactive overflow-hidden rounded-[22px]"
      >
        <MarkerList items={market.documentation} columns={2} className="text-body" />
      </SplitSection>

      <SplitSection
        eyebrow="Regulatory"
        title="What applies, and whose responsibility it is"
      >
        <MarkerList items={market.regulatoryAwareness} className="text-body" />

        <Notice tone="info" title="This is not legal advice" className="mt-10 max-w-[70ch]">
          Nothing on this page is a legal opinion or a guarantee of compliance. Requirements
          change, and they differ by product category. Confirming what applies to your product
          in this market remains your responsibility as the brand owner or importer.
        </Notice>
      </SplitSection>

      <SplitSection eyebrow="Logistics" title="Getting goods there" className="tw-card tw-card-interactive overflow-hidden rounded-[22px]">
        <MarkerList items={market.logisticsNotes} className="text-body" />
      </SplitSection>

      {faqs.length > 0 ? (
        <SplitSection eyebrow="Questions" title="Frequently asked">
          <FaqAccordion items={faqs} />
        </SplitSection>
      ) : null}

      <Section tight className="">
        <Container>
          <RelatedGrid
            title="Other markets"
            columns={2}
            items={others.map((item) => ({
              href: `/markets/${item.slug}`,
              label: item.name,
              description: item.summary,
            }))}
          />
        </Container>
      </Section>

      <PageCta
        title={`Manufacturing for the ${market.name}`}
        description="Tell us your destination city and country in the quote request. Sizing, labelling and documentation are then prepared for this market from the start."
        location="market_detail"
        whatsapp={{
          pageLabel: "Markets",
          path: `/markets/${market.slug}`,
          detail: market.name,
        }}
      />
    </>
  );
}
