import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, ButtonLink, EmptyState } from "@/components/ui";
import { PageHeader, PageCta } from "@/components/sections/page-shell";
import { Media } from "@/components/content/media";
import { Reveal } from "@/components/content/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { articlesByDate } from "@/content/fallback/articles";
import { formatDate } from "@/lib/utilities/format";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description:
    "Practical explanations of how apparel manufacturing decisions work, covering minimum order quantities, decoration methods and what belongs in a tech pack.",
  path: "/insights",
});

export default function InsightsPage() {
  const posts = articlesByDate();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Insights"
        title="How manufacturing decisions actually work"
        lede="These are explanations rather than marketing. They are written for buyers who want to understand why a minimum quantity is what it is, or why a decoration method that looks right can be the wrong choice."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/faq" variant="secondary">
              Frequently asked questions
            </ButtonLink>
            <ButtonLink href="/manufacturing-process" variant="secondary">
              The manufacturing process
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          {posts.length === 0 ? (
            <EmptyState
              title="No articles published yet"
              description="Articles will appear here as they are published. In the meantime, the frequently asked questions cover the most common buyer queries."
              action={<ButtonLink href="/faq">Read the FAQ</ButtonLink>}
            />
          ) : (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((article, index) => (
                <Reveal key={article.slug} as="li" delay={(index % 3) * 60} className="tw-card tw-card-interactive overflow-hidden rounded-[22px]">
                  <Link
                    href={`/insights/${article.slug}`}
                    className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-cotton"
                  >
                    <Media
                      asset={article.hero}
                      aspect="aspect-[16/10]"
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw"
                      zoomOnHover
                    />
                    <p className="mt-6 text-label uppercase tracking-[0.09em] text-ink-subtle">
                      {article.category} &middot; {article.readingMinutes} minute read
                    </p>
                    <h2 className="mt-3 text-body font-semibold leading-snug transition-colors duration-200 group-hover:text-forest">
                      {article.title}
                    </h2>
                    <p className="mt-2.5 flex-1 text-small leading-relaxed text-ink-muted">
                      {article.summary}
                    </p>
                    <time dateTime={article.publishedAt} className="mt-6 text-small text-ink-subtle">
                      {formatDate(article.publishedAt)}
                    </time>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <PageCta
        title="Have a question these do not answer?"
        description="Send it with your product details. A specific question about your product gets a more useful answer than a general article can give."
        location="insights_hub"
        whatsapp={{ pageLabel: "Insights", path: "/insights" }}
        primaryLabel="Ask a question"
      />
    </>
  );
}
