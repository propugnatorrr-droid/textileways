import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section, MarkerList, ButtonLink } from "@/components/ui";
import { PageHeader, RelatedGrid, PageCta } from "@/components/sections/page-shell";
import { Media } from "@/components/content/media";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { getArticle, articleSlugs, articlesByDate } from "@/content/fallback/articles";
import { getProductFamiliesBySlugs } from "@/content/fallback/products";
import { getCapabilitiesBySlugs } from "@/content/fallback/capabilities";
import { getMaterialsBySlugs } from "@/content/fallback/materials";
import { getFaqsByIds } from "@/content/fallback/faqs";
import { formatDate } from "@/lib/utilities/format";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";

/*
 * Only slugs returned by generateStaticParams are valid routes. Anything else is
 * a 404 at the routing layer, which returns a genuine 404 status rather than
 * rendering the not found body with a 200.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return articleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/insights/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found", robots: { index: false, follow: false } };

  return buildMetadata({
    title: article.seo.title,
    description: article.seo.description,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
  });
}

export default async function ArticlePage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  const products = getProductFamiliesBySlugs(article.relatedProducts);
  const capabilities = getCapabilitiesBySlugs(article.relatedCapabilities);
  const materials = getMaterialsBySlugs(article.relatedMaterials);
  const faqs = getFaqsByIds(article.faqIds);
  const more = articlesByDate().filter((item) => item.slug !== article.slug).slice(0, 2);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: article.title, path: `/insights/${article.slug}` },
  ];

  const faqLd = faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <>
      <JsonLd
        data={[breadcrumbSchema(breadcrumbs), articleSchema(article), ...(faqLd ? [faqLd] : [])]}
      />

      <PageHeader
        eyebrow={`${article.category} · ${article.readingMinutes} minute read`}
        title={article.title}
        lede={article.summary}
        breadcrumbs={breadcrumbs}
        size="h1"
      />

      <Section tight className="border-b border-line">
        <Container>
          <Media
            asset={article.hero}
            aspect="aspect-[21/9]"
            sizes="(min-width: 1280px) 1280px, 100vw"
            priority
          />

          <p className="mt-6 text-small text-ink-subtle">
            Published <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            {article.updatedAt ? (
              <>
                {" · Updated "}
                <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
              </>
            ) : null}
          </p>

          <article className="mt-14">
            {article.sections.map((section) => (
              <section key={section.heading} className="tw-prose mt-12 first:mt-0">
                <h2 className="font-serif text-h3">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-body-l leading-relaxed text-ink-muted">
                    {paragraph}
                  </p>
                ))}
                {section.list ? (
                  <MarkerList items={section.list} className="mt-6 text-body" />
                ) : null}
              </section>
            ))}
          </article>
        </Container>
      </Section>

      {faqs.length > 0 ? (
        <Section tight className="border-b border-line bg-cotton">
          <Container>
            <h2 className="mb-8 font-serif text-h3">Related questions</h2>
            <div className="max-w-[76ch]">
              <FaqAccordion items={faqs} />
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tight className="border-b border-line">
        <Container>
          <div className="grid gap-14 lg:grid-cols-3">
            <RelatedGrid
              title="Related products"
              columns={2}
              items={products.map((family) => ({
                href: `/products/${family.slug}`,
                label: family.name,
              }))}
            />
            <RelatedGrid
              title="Related capabilities"
              columns={2}
              items={capabilities.map((capability) => ({
                href: `/capabilities/${capability.slug}`,
                label: capability.name,
              }))}
            />
            <RelatedGrid
              title="Related materials"
              columns={2}
              items={materials.map((material) => ({
                href: `/materials/${material.slug}`,
                label: material.name,
              }))}
            />
          </div>

          {more.length > 0 ? (
            <div className="mt-16">
              <RelatedGrid
                title="More insights"
                columns={2}
                items={more.map((item) => ({
                  href: `/insights/${item.slug}`,
                  label: item.title,
                  description: item.summary,
                }))}
              />
            </div>
          ) : null}

          <div className="mt-12">
            <ButtonLink href="/insights" variant="secondary">
              All insights
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <PageCta
        title="Apply this to your own product"
        description="Send your product details and target quantity. We will tell you exactly how these considerations affect your specific project."
        location="article_detail"
      />
    </>
  );
}
