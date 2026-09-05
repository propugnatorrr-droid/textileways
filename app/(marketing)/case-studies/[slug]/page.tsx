import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section, MarkerList, ButtonLink, StatusTag } from "@/components/ui";
import { PageHeader, SplitSection, PageCta } from "@/components/sections/page-shell";
import { Media } from "@/components/content/media";
import { JsonLd } from "@/components/seo/json-ld";
import { ViewTracker } from "@/components/content/view-tracker";
import {
  getPublishedCaseStudy,
  publishedCaseStudySlugs,
} from "@/content/fallback/case-studies";
import { getProductFamiliesBySlugs } from "@/content/fallback/products";
import { getMaterialsBySlugs } from "@/content/fallback/materials";
import { RelatedGrid } from "@/components/sections/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

/**
 * Only case studies with published evidence generate a route.
 *
 * Records awaiting customer permission are unreachable even by guessing a URL:
 * they are excluded from `generateStaticParams`, and `dynamicParams = false`
 * means any slug outside that list is a 404 at the routing layer with a genuine
 * 404 status.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/case-studies/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getPublishedCaseStudy(slug);
  if (!study) {
    return { title: "Case study not found", robots: { index: false, follow: false } };
  }

  return buildMetadata({
    title: study.seo.title,
    description: study.seo.description,
    path: `/case-studies/${study.slug}`,
    type: "article",
    publishedTime: study.publishedAt,
  });
}

export default async function CaseStudyPage(props: PageProps<"/case-studies/[slug]">) {
  const { slug } = await props.params;
  const study = getPublishedCaseStudy(slug);
  if (!study) notFound();

  const products = getProductFamiliesBySlugs(study.products);
  const materials = getMaterialsBySlugs(study.materials);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Case studies", path: "/case-studies" },
    { name: study.title, path: `/case-studies/${study.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <ViewTracker event="case_study_view" context={{ industry: study.industry }} />

      <PageHeader
        eyebrow="Case study"
        title={study.title}
        lede={`${study.industry} · ${study.market} · ${study.quantity}`}
        breadcrumbs={breadcrumbs}
        status={
          study.clientVisible
            ? { label: study.clientName, tone: "neutral" }
            : {
                label: "Client name withheld",
                tone: "muted",
                note: "The customer has permitted this project to be described but not to be named.",
              }
        }
        actions={<ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>}
        aside={<Media asset={study.hero} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 40vw, 92vw" priority />}
      />

      <SplitSection eyebrow="Challenge" title="What the buyer needed">
        <MarkerList items={study.challenge} className="text-body" />
      </SplitSection>

      <SplitSection eyebrow="Solution" title="What was produced" className="tw-card tw-card-interactive overflow-hidden rounded-[22px]">
        <MarkerList items={study.solution} className="text-body" />
      </SplitSection>

      <SplitSection eyebrow="Process" title="How the project ran">
        <MarkerList items={study.process} className="text-body" />
      </SplitSection>

      <SplitSection
        eyebrow="Results"
        title="Outcome"
        intro="Every figure quoted here is evidenced and published with the customer's permission."
        className="tw-card tw-card-interactive overflow-hidden rounded-[22px]"
      >
        <MarkerList items={study.results} className="text-body" />

        {study.testimonial ? (
          <figure className="mt-12 border-l-2 border-forest pl-6">
            <blockquote className="font-sans text-h3 font-semibold leading-snug tracking-[-0.032em] text-ink">
              {study.testimonial.quote}
            </blockquote>
            <figcaption className="mt-4 text-small text-ink-subtle">
              {study.testimonial.attribution}
            </figcaption>
          </figure>
        ) : null}

        <div className="mt-10">
          <StatusTag tone="forest">Published with customer permission</StatusTag>
        </div>
      </SplitSection>

      <Section tight className="">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <RelatedGrid
              title="Products in this project"
              columns={2}
              items={products.map((family) => ({
                href: `/products/${family.slug}`,
                label: family.name,
              }))}
            />
            <RelatedGrid
              title="Materials used"
              columns={2}
              items={materials.map((material) => ({
                href: `/materials/${material.slug}`,
                label: material.name,
              }))}
            />
          </div>
        </Container>
      </Section>

      <PageCta
        title="Start a project like this"
        description="Share your product details, target quantity and delivery requirements. We will review the technical and commercial requirements before quoting."
        location="case_study_detail"
      />
    </>
  );
}
