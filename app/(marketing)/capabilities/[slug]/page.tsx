import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section, MarkerList, ButtonLink, Notice } from "@/components/ui";
import {
  PageHeader,
  ProseBlock,
  SplitSection,
  ProcessList,
  RelatedGrid,
  PageCta,
} from "@/components/sections/page-shell";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { ViewTracker } from "@/components/content/view-tracker";
import { getCapability, capabilitySlugs } from "@/content/fallback/capabilities";
import { getMaterialsBySlugs } from "@/content/fallback/materials";
import { productFamilies } from "@/content/fallback/products";
import { getFaqsByIds } from "@/content/fallback/faqs";
import {
  capabilityGroupLabels,
  capabilityStatusExplanations,
  capabilityStatusLabels,
} from "@/content/types";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo/structured-data";

export function generateStaticParams() {
  return capabilitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/capabilities/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const capability = getCapability(slug);
  if (!capability) {
    return { title: "Capability not found", robots: { index: false, follow: false } };
  }

  return buildMetadata({
    title: capability.seo.title,
    description: capability.seo.description,
    path: `/capabilities/${capability.slug}`,
  });
}

export default async function CapabilityPage(props: PageProps<"/capabilities/[slug]">) {
  const { slug } = await props.params;
  const capability = getCapability(slug);
  if (!capability) notFound();

  const materials = getMaterialsBySlugs(capability.relatedMaterials);
  const faqs = getFaqsByIds(capability.faqIds);

  /* Product families that list this capability as related or as a decoration option. */
  const relatedProducts = productFamilies.filter(
    (family) =>
      family.relatedCapabilities.includes(capability.slug) ||
      family.decorationOptions.includes(capability.slug),
  );

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Capabilities", path: "/capabilities" },
    { name: capability.name, path: `/capabilities/${capability.slug}` },
  ];

  const faqLd = faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          serviceSchema(capability),
          ...(faqLd ? [faqLd] : []),
        ]}
      />
      <ViewTracker event="capability_view" context={{ capability: capability.slug }} />

      <PageHeader
        eyebrow={capabilityGroupLabels[capability.group]}
        title={capability.name}
        lede={capability.summary}
        breadcrumbs={breadcrumbs}
        status={{
          label: capabilityStatusLabels[capability.capabilityStatus],
          tone: capability.capabilityStatus === "in-house" ? "forest" : "clay",
          note: capabilityStatusExplanations[capability.capabilityStatus],
        }}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/capabilities" variant="secondary">
              All capabilities
            </ButtonLink>
          </>
        }
      />

      <Section tight className="border-b border-line">
        <Container>
          <ProseBlock paragraphs={capability.introduction} />

          {capability.verification === "pending" ? (
            <Notice tone="info" title="Scope confirmed on technical review" className="mt-10 max-w-[70ch]">
              The specific equipment, partner arrangement and achievable scope for this
              capability have not yet been confirmed in writing by the business, so this page
              describes the process rather than asserting a verified in house capacity. Your
              project is assessed against actual availability before anything is quoted.
            </Notice>
          ) : null}
        </Container>
      </Section>

      <SplitSection
        eyebrow="Process"
        title="How this runs"
        intro="Each stage exists to resolve one question. Skipping a stage moves risk further down the line rather than removing it."
      >
        <ProcessList stages={capability.processStages} />
      </SplitSection>

      <SplitSection
        eyebrow="Suitability"
        title="What this suits"
        intro="Where this capability is the right choice, and the materials it is compatible with."
        className="bg-cotton"
      >
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="mb-4 text-small font-semibold text-ink">Suitable products</h3>
            <MarkerList items={capability.suitableProducts} />
          </div>
          <div>
            <h3 className="mb-4 text-small font-semibold text-ink">Material compatibility</h3>
            <MarkerList items={capability.materialCompatibility} />
          </div>
          <div>
            <h3 className="mb-4 text-small font-semibold text-ink">Available techniques</h3>
            <MarkerList items={capability.techniques} />
          </div>
          <div>
            <h3 className="mb-4 text-small font-semibold text-ink">Quality checkpoints</h3>
            <MarkerList items={capability.qualityCheckpoints} />
          </div>
        </div>
      </SplitSection>

      <SplitSection
        eyebrow="Limits"
        title="What this cannot do"
        intro="Stated plainly, because a capability described without its constraints will be misapplied to a product it does not suit."
      >
        <MarkerList items={capability.limitations} className="text-body" />
      </SplitSection>

      {materials.length > 0 ? (
        <SplitSection
          eyebrow="Materials"
          title="Compatible materials"
          intro="Composition, weight guidance and decoration behaviour for each fabric are on its own page."
        >
          <ul className="divide-y divide-line border-y border-line">
            {materials.map((material) => (
              <li key={material.slug} className="py-5">
                <Link
                  href={`/materials/${material.slug}`}
                  className="group grid gap-2 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-8"
                >
                  <span className="text-small font-semibold text-ink transition-colors duration-200 group-hover:text-forest">
                    {material.name}
                  </span>
                  <span className="text-small leading-relaxed text-ink-muted">
                    {material.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </SplitSection>
      ) : null}

      {faqs.length > 0 ? (
        <SplitSection eyebrow="Questions" title="Frequently asked">
          <FaqAccordion items={faqs} />
        </SplitSection>
      ) : null}

      {relatedProducts.length > 0 ? (
        <Section tight className="border-b border-line">
          <Container>
            <RelatedGrid
              title="Product families using this capability"
              columns={4}
              items={relatedProducts.map((family) => ({
                href: `/products/${family.slug}`,
                label: family.name,
                description: family.summary,
              }))}
            />
          </Container>
        </Section>
      ) : null}

      <PageCta
        title={`Discuss ${capability.name.toLowerCase()} for your product`}
        description="Tell us the product, the fabric and the quantity. We will confirm whether this is the right process and what it means for your minimum quantity and schedule."
        location="capability_detail"
        whatsapp={{
          pageLabel: "Capabilities",
          path: `/capabilities/${capability.slug}`,
          detail: capability.name,
        }}
      />
    </>
  );
}
