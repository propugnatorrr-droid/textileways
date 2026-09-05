import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, ButtonLink, EmptyState } from "@/components/ui";
import { PageHeader, PageCta } from "@/components/sections/page-shell";
import { Media } from "@/components/content/media";
import { Reveal } from "@/components/content/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { materials } from "@/content/fallback/materials";
import { materialGroupLabels, type MaterialGroup } from "@/content/types";
import { editorialMedia } from "@/content/fallback/media";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import { cn } from "@/lib/utilities/cn";

export const metadata: Metadata = buildMetadata({
  title: "Materials",
  description:
    "Fabric reference for apparel and textile manufacturing: composition, typical weight ranges, stretch, breathability, decoration compatibility and minimum quantity considerations.",
  path: "/materials",
});

const groupOrder = Object.keys(materialGroupLabels) as MaterialGroup[];

function isMaterialGroup(value: string | undefined): value is MaterialGroup {
  return value !== undefined && groupOrder.includes(value as MaterialGroup);
}

export default async function MaterialsPage(props: PageProps<"/materials">) {
  const search = await props.searchParams;
  const rawGroup = Array.isArray(search.group) ? search.group[0] : search.group;
  const activeGroup = isMaterialGroup(rawGroup) ? rawGroup : null;

  const visible = activeGroup
    ? materials.filter((material) => material.group === activeGroup)
    : materials;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Materials", path: "/materials" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Materials"
        title="Fabric reference for buyers"
        lede="Values here are typical ranges and general behaviour, not guaranteed properties of a specific fabric. The same nominal quality can finish differently depending on yarn, structure and finishing, which is why anything you rely on is confirmed against an approved physical swatch."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-sample">Request a Sample</ButtonLink>
            <ButtonLink href="/products" variant="secondary">
              Browse products
            </ButtonLink>
          </>
        }
        aside={
          <Media
            asset={editorialMedia.materials}
            aspect="aspect-[4/3]"
            sizes="(min-width: 1024px) 40vw, 92vw"
          />
        }
      />

      <Section>
        <Container>
          <nav aria-label="Material groups" className="mb-12">
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link
                  href="/materials"
                  aria-current={activeGroup === null ? "page" : undefined}
                  className={cn(
                    "flex min-h-[46px] items-center rounded-[14px] border px-5 text-small font-semibold transition-colors duration-200",
                    activeGroup === null
                      ? "border-forest bg-forest text-white"
                      : "border-line-strong bg-white text-ink-muted hover:border-ink/25 hover:bg-cotton",
                  )}
                >
                  All materials
                </Link>
              </li>
              {groupOrder.map((group) => (
                <li key={group}>
                  <Link
                    href={`/materials?group=${group}`}
                    aria-current={activeGroup === group ? "page" : undefined}
                    className={cn(
                      "flex min-h-[46px] items-center rounded-[14px] border px-5 text-small font-semibold transition-colors duration-200",
                      activeGroup === group
                        ? "border-forest bg-forest text-white"
                        : "border-line-strong bg-white text-ink-muted hover:border-ink/25 hover:bg-cotton",
                    )}
                  >
                    {materialGroupLabels[group]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p role="status" className="mb-8 text-small text-ink-subtle">
            {activeGroup
              ? `Showing ${visible.length} of ${materials.length} materials in ${materialGroupLabels[activeGroup].toLowerCase()}`
              : `Showing all ${materials.length} materials`}
          </p>

          {visible.length === 0 ? (
            <EmptyState
              title="No materials in this group yet"
              description="Choose another group, or tell us what performance you need and we will propose fabric options against it."
              action={
                <ButtonLink href="/materials" variant="secondary">
                  View all materials
                </ButtonLink>
              }
            />
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((material, index) => (
                <Reveal
                  key={material.slug}
                  as="li"
                  delay={(index % 3) * 55}
                  className="tw-card tw-card-interactive overflow-hidden rounded-[22px]"
                >
                  <Link
                    href={`/materials/${material.slug}`}
                    className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-cotton"
                  >
                    <p className="text-label uppercase tracking-[0.09em] text-ink-subtle">
                      {materialGroupLabels[material.group]}
                    </p>
                    <h2 className="mt-3 font-sans text-h3 font-semibold tracking-[-0.032em] transition-colors duration-200 group-hover:text-forest">
                      {material.name}
                    </h2>
                    <p className="mt-3 flex-1 text-small leading-relaxed text-ink-muted">
                      {material.summary}
                    </p>
                    <p className="mt-5 text-small text-ink-subtle">{material.gsmGuidance.split(".")[0]}.</p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <PageCta
        title="Not sure which fabric is right?"
        description="Tell us the end use, the target market, the handfeel you want and your price position. We propose options with composition and weight ranges, then confirm on a physical swatch."
        location="materials_hub"
        whatsapp={{ pageLabel: "Materials", path: "/materials" }}
        primaryLabel="Ask for a material recommendation"
      />
    </>
  );
}
