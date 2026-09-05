import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section, MarkerList, ButtonLink } from "@/components/ui";
import {
  PageHeader,
  ProseBlock,
  SplitSection,
  RelatedGrid,
  PageCta,
} from "@/components/sections/page-shell";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { getIndustry, industrySlugs } from "@/content/fallback/industries";
import { getProductFamiliesBySlugs } from "@/content/fallback/products";
import { getCapabilitiesBySlugs } from "@/content/fallback/capabilities";
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
  return industrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/industries/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const industry = getIndustry(slug);
  if (!industry) {
    return { title: "Industry not found", robots: { index: false, follow: false } };
  }

  return buildMetadata({
    title: industry.seo.title,
    description: industry.seo.description,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage(props: PageProps<"/industries/[slug]">) {
  const { slug } = await props.params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const products = getProductFamiliesBySlugs(industry.typicalProducts);
  const capabilities = getCapabilitiesBySlugs(industry.relevantCapabilities);
  const faqs = getFaqsByIds(industry.faqIds);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.name, path: `/industries/${industry.slug}` },
  ];

  const faqLd = faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), ...(faqLd ? [faqLd] : [])]} />

      <PageHeader
        eyebrow="Industry"
        title={industry.name}
        lede={industry.summary}
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/industries" variant="secondary">
              All industries
            </ButtonLink>
          </>
        }
      />

      <Section tight className="">
        <Container>
          <ProseBlock paragraphs={industry.introduction} />
        </Container>
      </Section>

      <SplitSection
        eyebrow="Priorities"
        title="What matters to this buyer"
        intro="Drawn from what buyers in this sector actually ask about, rather than from what is easiest to promise."
      >
        <MarkerList items={industry.buyerPriorities} className="text-body" />
      </SplitSection>

      <SplitSection
        eyebrow="Compliance"
        title="Requirements to confirm"
        intro="Regulatory responsibility for a product sits with the organisation placing it on the market. These are the points we raise before production."
        className="tw-card tw-card-interactive overflow-hidden rounded-[22px]"
      >
        <MarkerList items={industry.complianceNotes} className="text-body" />
      </SplitSection>

      {faqs.length > 0 ? (
        <SplitSection eyebrow="Questions" title="Frequently asked">
          <FaqAccordion items={faqs} />
        </SplitSection>
      ) : null}

      <Section tight className="">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <RelatedGrid
              title="Typical products"
              columns={2}
              items={products.map((family) => ({
                href: `/products/${family.slug}`,
                label: family.name,
                description: family.summary,
              }))}
            />
            <RelatedGrid
              title="Relevant capabilities"
              columns={2}
              items={capabilities.map((capability) => ({
                href: `/capabilities/${capability.slug}`,
                label: capability.name,
                description: capability.summary,
              }))}
            />
          </div>
        </Container>
      </Section>

      <PageCta
        title={`Manufacturing for ${industry.name.toLowerCase()}`}
        description="Describe your requirement, the quantity and the timeline. We will confirm feasibility and tell you which requirements need to be settled before quoting."
        location="industry_detail"
        whatsapp={{
          pageLabel: "Industries",
          path: `/industries/${industry.slug}`,
          detail: industry.name,
        }}
      />
    </>
  );
}
