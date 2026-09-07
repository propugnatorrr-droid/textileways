import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Section,
  SpecList,
  MarkerList,
  StatusTag,
  ButtonLink,
} from "@/components/ui";
import {
  PageHeader,
  ProseBlock,
  SplitSection,
  RelatedGrid,
  PageCta,
} from "@/components/sections/page-shell";
import { Media } from "@/components/content/media";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { ViewTracker } from "@/components/content/view-tracker";
import { getProductFamily, productSlugs } from "@/content/fallback/products";
import { getMaterialsBySlugs } from "@/content/fallback/materials";
import { getCapabilitiesBySlugs } from "@/content/fallback/capabilities";
import { getIndustriesBySlugs } from "@/content/fallback/industries";
import { getFaqsByIds } from "@/content/fallback/faqs";
import { capabilityStatusExplanations, capabilityStatusLabels } from "@/content/types";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, productFamilySchema } from "@/lib/seo/structured-data";

/*
 * Only slugs returned by generateStaticParams are valid routes. Anything else is
 * a 404 at the routing layer, which returns a genuine 404 status rather than
 * rendering the not found body with a 200.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return productSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const family = getProductFamily(slug);
  if (!family) return { title: "Product not found", robots: { index: false, follow: false } };

  return buildMetadata({
    title: family.seo.title,
    description: family.seo.description,
    path: `/products/${family.slug}`,
  });
}

export default async function ProductFamilyPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const family = getProductFamily(slug);
  if (!family) notFound();

  const materials = getMaterialsBySlugs(family.typicalMaterials);
  const capabilities = getCapabilitiesBySlugs(family.relatedCapabilities);
  const decoration = getCapabilitiesBySlugs(family.decorationOptions);
  const relatedIndustries = getIndustriesBySlugs(family.relatedIndustries);
  const faqs = getFaqsByIds(family.faqIds);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: family.name, path: `/products/${family.slug}` },
  ];

  const faqLd = faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          productFamilySchema(family),
          ...(faqLd ? [faqLd] : []),
        ]}
      />
      <ViewTracker event="product_category_view" context={{ product_family: family.slug }} />

      <PageHeader
        eyebrow="Product family"
        title={family.name}
        lede={family.summary}
        breadcrumbs={breadcrumbs}
        status={{
          label: capabilityStatusLabels[family.capabilityStatus],
          tone: family.capabilityStatus === "in-house" ? "forest" : "clay",
          note: capabilityStatusExplanations[family.capabilityStatus],
        }}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Quote This Product</ButtonLink>
            <ButtonLink href="/request-a-sample" variant="secondary">
              Request a Sample
            </ButtonLink>
          </>
        }
        aside={
          <Media
            asset={family.hero}
            aspect="aspect-[4/3]"
            sizes="(min-width: 1024px) 42vw, 92vw"
            priority
          />
        }
      />

      <Section size="tight">
        <Container>
          <ProseBlock paragraphs={family.introduction} />
        </Container>
      </Section>

      <SplitSection
        eyebrow="Product types"
        title="What sits inside this family"
        intro="Representative products we manufacture in this category. Anything not listed can still be assessed on technical review."
      >
        <ul className="grid gap-px overflow-hidden rounded-[18px] bg-line sm:grid-cols-2">
          {family.productTypes.map((type) => (
            <li key={type.name} className="bg-white p-5">
              <h3 className="text-small font-semibold text-ink">{type.name}</h3>
              <p className="mt-1.5 text-small leading-relaxed text-ink-muted">
                {type.description}
              </p>
            </li>
          ))}
        </ul>
      </SplitSection>

      <Section size="tight" className="bg-cotton">
        <Container>
          <h2 className="mb-8 text-label font-semibold uppercase tracking-[0.1em] text-ink-subtle">
            Gallery
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {family.gallery.map((asset) => (
              <li key={asset.src}>
                <Media
                  asset={asset}
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  showCaption
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <SplitSection
        eyebrow="Specification"
        title="Typical weights and construction"
        intro="Weight ranges are typical for this category. The finished weight of your fabric is confirmed on the approved sample rather than guaranteed to a figure."
      >
        <SpecList items={family.weightGuidance} />

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="mb-4 text-small font-semibold text-ink">Construction options</h3>
            <MarkerList items={family.constructionOptions} />
          </div>
          <div>
            <h3 className="mb-4 text-small font-semibold text-ink">
              Labelling and packaging
            </h3>
            <MarkerList items={family.labellingAndPackaging} />
          </div>
        </div>
      </SplitSection>

      <SplitSection
        eyebrow="Decoration"
        title="How this category is branded"
        intro="Decoration is matched to the fabric and the artwork rather than applied by default. Each method links to its own page with limits stated."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {decoration.map((capability) => (
            <li key={capability.slug} className="tw-card tw-card-interactive overflow-hidden rounded-[22px]">
              <Link
                href={`/capabilities/${capability.slug}`}
                className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-cotton"
              >
                <span className="text-small font-semibold text-ink transition-colors duration-200 group-hover:text-forest">
                  {capability.name}
                </span>
                <span className="mt-2 text-small leading-relaxed text-ink-muted">
                  {capability.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </SplitSection>

      <SplitSection
        eyebrow="Materials"
        title="What this category is usually made from"
        intro="Composition, weight guidance and decoration compatibility for each fabric are on its own page."
      >
        <ul className="grid gap-px overflow-hidden rounded-[18px] bg-line sm:grid-cols-2">
          {materials.map((material) => (
            <li key={material.slug} className="bg-white">
              <Link
                href={`/materials/${material.slug}`}
                className="group flex h-full flex-col p-5 transition-colors duration-200 hover:bg-cotton"
              >
                <span className="inline-flex items-start justify-between gap-3 text-small font-semibold text-ink transition-colors duration-200 group-hover:text-forest-deep">
                  {material.name}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-ink-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-forest"
                  >
                    &rarr;
                  </span>
                </span>
                <span className="mt-1.5 text-small leading-relaxed text-ink-muted">
                  {material.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </SplitSection>

      <SplitSection
        eyebrow="Ordering"
        title="Minimum quantity and sampling"
        intro="Neither figure is published as a universal number, because neither one is true across every specification."
      >
        <div className="space-y-10">
          <div className="grid gap-px overflow-hidden rounded-[18px] bg-line sm:grid-cols-2">
            <div className="bg-white p-6">
              <StatusTag tone="muted">Minimum order quantity</StatusTag>
              <p className="mt-4 text-small leading-relaxed text-ink-muted">
                {family.moqGuidance}
              </p>
            </div>
            <div className="bg-white p-6">
              <StatusTag tone="muted">Sampling</StatusTag>
              <p className="mt-4 text-small leading-relaxed text-ink-muted">
                {family.samplingGuidance}
              </p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-small font-semibold text-ink">Quality considerations</h3>
            <MarkerList items={family.qualityNotes} />
          </div>
          <div>
            <h3 className="mb-4 text-small font-semibold text-ink">
              Target market considerations
            </h3>
            <MarkerList items={family.marketNotes} />
          </div>
        </div>
      </SplitSection>

      {faqs.length > 0 ? (
        <SplitSection
          eyebrow="Questions"
          title="Frequently asked about this category"
          intro="Answers relevant to this product family. The full list covers ordering, sampling, materials, decoration, compliance and logistics."
        >
          <FaqAccordion items={faqs} />
          <Link
            href="/faq"
            className="tw-underline-grow mt-8 inline-block text-small font-medium text-ink"
          >
            All frequently asked questions
          </Link>
        </SplitSection>
      ) : null}

      <Section size="tight">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <RelatedGrid
              title="Related capabilities"
              columns={2}
              items={capabilities.map((capability) => ({
                href: `/capabilities/${capability.slug}`,
                label: capability.name,
                description: capability.summary,
              }))}
            />
            <RelatedGrid
              title="Relevant industries"
              columns={2}
              items={relatedIndustries.map((industry) => ({
                href: `/industries/${industry.slug}`,
                label: industry.name,
                description: industry.summary,
              }))}
            />
          </div>
        </Container>
      </Section>

      <PageCta
        title={`Ready to specify a ${family.name.toLowerCase()} project?`}
        description="Share your product details, target quantity and delivery requirements. We will confirm feasibility, materials and construction before quoting."
        location="product_detail"
        productFamily={family.slug}
        whatsapp={{
          pageLabel: "Products",
          path: `/products/${family.slug}`,
          detail: family.name,
        }}
      />
    </>
  );
}
