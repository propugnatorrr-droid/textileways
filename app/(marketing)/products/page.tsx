import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Section, ButtonLink } from "@/components/ui";
import { PageHeader, PageCta } from "@/components/sections/page-shell";
import { ProductFilters, type FilterGroup } from "@/components/product/product-filters";
import { JsonLd } from "@/components/seo/json-ld";
import { productFamilies, productTypeCount } from "@/content/fallback/products";
import { industries } from "@/content/fallback/industries";
import { materialGroupLabels, capabilityStatusLabels } from "@/content/types";
import { markets } from "@/content/fallback/markets";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Product families",
  description:
    "Thirteen textile and apparel product families manufactured by Textileways, each with construction options, indicative weight ranges and a truthful statement of how it is produced.",
  path: "/products",
});

const filterGroups: FilterGroup[] = [
  {
    id: "industry",
    legend: "Buyer industry",
    options: industries.map((industry) => ({ value: industry.slug, label: industry.name })),
  },
  {
    id: "material",
    legend: "Material type",
    options: Object.entries(materialGroupLabels).map(([value, label]) => ({ value, label })),
  },
  {
    id: "decoration",
    legend: "Decoration method",
    options: [
      { value: "screen-printing", label: "Screen printing" },
      { value: "dtg-printing", label: "DTG printing" },
      { value: "dtf-printing", label: "DTF printing" },
      { value: "sublimation", label: "Sublimation" },
      { value: "heat-transfer", label: "Heat transfer" },
      { value: "embroidery", label: "Embroidery" },
      { value: "applique", label: "Applique" },
      { value: "patches-and-badges", label: "Patches and badges" },
    ],
  },
  {
    id: "market",
    legend: "Intended market",
    options: markets.map((market) => ({ value: market.slug, label: market.name })),
  },
  {
    id: "status",
    legend: "Capability status",
    options: Object.entries(capabilityStatusLabels).map(([value, label]) => ({ value, label })),
  },
];

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />

      <PageHeader
        eyebrow="Products"
        title="Thirteen product families"
        lede={`Every family below states how it is produced, what it is typically made from and where its minimum quantity really comes from. Across them sit ${productTypeCount()} representative product types.`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ]}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/capabilities" variant="secondary">
              View capabilities
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-[20px] border border-line bg-cotton p-6">
            <p className="text-label uppercase tracking-[0.09em] text-ink-subtle">
              How to read these pages
            </p>
            <ul className="mt-4 space-y-3 text-small leading-relaxed text-ink-muted">
              <li>
                Each family carries a capability status stating whether it is produced in
                house, through an audited partner facility, sourced against our
                specification, or offered following technical review.
              </li>
              <li>
                Weight ranges are typical rather than guaranteed. Finished weight is
                confirmed on the approved sample.
              </li>
              <li>
                No prices or universal lead times are published, because neither is true
                across every specification.
              </li>
            </ul>
          </div>
        }
      />

      <Section>
        <Container>
          <Suspense
            fallback={
              <p role="status" className="text-small text-ink-subtle">
                Loading product filters
              </p>
            }
          >
            <ProductFilters families={productFamilies} groups={filterGroups} />
          </Suspense>
        </Container>
      </Section>

      <PageCta
        title="Tell us what you need to make."
        description="Share your product details, target quantity and delivery requirements. Our team will review the technical and commercial requirements before quoting."
        location="products_hub"
        whatsapp={{ pageLabel: "Products", path: "/products" }}
      />
    </>
  );
}
