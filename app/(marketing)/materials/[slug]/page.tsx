import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section, SpecList, MarkerList, ButtonLink, Notice } from "@/components/ui";
import {
  PageHeader,
  ProseBlock,
  SplitSection,
  RelatedGrid,
  PageCta,
} from "@/components/sections/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { getMaterial, materialSlugs, materials } from "@/content/fallback/materials";
import { getProductFamiliesBySlugs } from "@/content/fallback/products";
import { materialGroupLabels } from "@/content/types";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

/*
 * Only slugs returned by generateStaticParams are valid routes. Anything else is
 * a 404 at the routing layer, which returns a genuine 404 status rather than
 * rendering the not found body with a 200.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return materialSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/materials/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const material = getMaterial(slug);
  if (!material) {
    return { title: "Material not found", robots: { index: false, follow: false } };
  }

  return buildMetadata({
    title: material.seo.title,
    description: material.seo.description,
    path: `/materials/${material.slug}`,
  });
}

export default async function MaterialPage(props: PageProps<"/materials/[slug]">) {
  const { slug } = await props.params;
  const material = getMaterial(slug);
  if (!material) notFound();

  const relatedProducts = getProductFamiliesBySlugs(material.relatedProducts);
  const siblings = materials
    .filter((item) => item.group === material.group && item.slug !== material.slug)
    .slice(0, 4);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Materials", path: "/materials" },
    { name: material.name, path: `/materials/${material.slug}` },
  ];

  const properties = [
    { label: "Composition", value: material.composition },
    {
      label: "Typical weight",
      value: material.gsmGuidance,
      note: "Weight ranges are typical. Finished weight is confirmed on the approved sample.",
    },
    { label: "Hand feel", value: material.handFeel },
    { label: "Stretch", value: material.stretch },
    { label: "Breathability", value: material.breathability },
    { label: "Print compatibility", value: material.printCompatibility },
    { label: "Embroidery compatibility", value: material.embroideryCompatibility },
    { label: "Wash considerations", value: material.washConsiderations },
    { label: "Minimum quantity", value: material.moqConsiderations },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow={materialGroupLabels[material.group]}
        title={material.name}
        lede={material.summary}
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-sample">Request a Sample</ButtonLink>
            <ButtonLink href="/materials" variant="secondary">
              All materials
            </ButtonLink>
          </>
        }
      />

      <Section tight className="">
        <Container>
          <ProseBlock paragraphs={material.introduction} />
        </Container>
      </Section>

      <SplitSection
        eyebrow="Properties"
        title="Typical characteristics"
        intro="These describe how the material generally behaves. They are not universal facts, because the specific yarn, structure and finishing change every one of them."
      >
        <SpecList items={properties} />

        <Notice tone="info" className="mt-10 max-w-[70ch]">
          Values on this page depend on the specific fabric quality selected for your order.
          Anything you intend to rely on commercially is confirmed against an approved
          physical swatch and, where required, by laboratory testing.
        </Notice>
      </SplitSection>

      <SplitSection
        eyebrow="Applications"
        title="Where this material is used"
        className="tw-card tw-card-interactive overflow-hidden rounded-[22px]"
      >
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="mb-4 text-small font-semibold text-ink">Typical applications</h3>
            <MarkerList items={material.applications} />
          </div>
          <div>
            <h3 className="mb-4 text-small font-semibold text-ink">
              Available certifications
            </h3>
            {material.certificationOptions.length > 0 ? (
              <>
                <MarkerList items={material.certificationOptions} />
                <p className="mt-5 max-w-[52ch] text-small text-ink-subtle">
                  A certification option is not a certification held. Any claim on a finished
                  garment requires a certified supply chain and current transaction
                  certificates for your specific order.
                </p>
              </>
            ) : (
              <p className="text-small text-ink-subtle">
                No certification options are recorded for this material.
              </p>
            )}
          </div>
        </div>
      </SplitSection>

      <Section tight className="">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <RelatedGrid
              title="Related product families"
              columns={2}
              items={relatedProducts.map((family) => ({
                href: `/products/${family.slug}`,
                label: family.name,
                description: family.summary,
              }))}
            />
            <RelatedGrid
              title={`More ${materialGroupLabels[material.group].toLowerCase()}`}
              columns={2}
              items={siblings.map((item) => ({
                href: `/materials/${item.slug}`,
                label: item.name,
                description: item.summary,
              }))}
            />
          </div>
        </Container>
      </Section>

      <PageCta
        title={`Considering ${material.name.toLowerCase()} for a project?`}
        description="Tell us the product and the quantity. We confirm availability at your volume, send physical swatches, and state the minimum quantity the fabric actually sets."
        location="material_detail"
        primaryLabel="Request a Quote"
        whatsapp={{
          pageLabel: "Materials",
          path: `/materials/${material.slug}`,
          detail: material.name,
        }}
      />
    </>
  );
}
