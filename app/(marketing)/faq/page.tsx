import type { Metadata } from "next";
import { Container, Section, ButtonLink } from "@/components/ui";
import { PageHeader, PageCta } from "@/components/sections/page-shell";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqs, faqCategories } from "@/content/fallback/faqs";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Frequently asked questions",
  description:
    "Answers on minimum order quantities, sampling, lead times, materials, decoration methods, private labelling, compliance, inspection and shipping terms, without commercial promises.",
  path: "/faq",
});

export default function FaqPage() {
  const categories = faqCategories();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Frequently asked questions", path: "/faq" },
  ];

  const faqLd = faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), ...(faqLd ? [faqLd] : [])]} />

      <PageHeader
        eyebrow="Frequently asked questions"
        title="Answers without commercial promises"
        lede="None of these answers states a fixed price, a fixed lead time or a guarantee. Where a figure depends on the specification, the answer says so, because a number given before the technical questions are settled is a guess."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Ask something else
            </ButtonLink>
          </>
        }
        aside={
          <nav aria-label="Question categories" className="border border-line bg-cotton/50 p-6">
            <p className="text-label uppercase tracking-[0.09em] text-ink-subtle">
              {faqs.length} questions in {categories.length} categories
            </p>
            <ul className="mt-5 space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <a
                    href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="tw-underline-grow text-small text-ink-muted"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      <Section>
        <Container>
          <div className="max-w-[80ch] space-y-16">
            {categories.map((category) => (
              <section key={category} id={category.toLowerCase().replace(/\s+/g, "-")}>
                <h2 className="mb-6 font-serif text-h3">{category}</h2>
                <FaqAccordion items={faqs.filter((faq) => faq.category === category)} />
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <PageCta
        title="Your question is probably more specific than these"
        description="Send it with your product details and target quantity. A specific question about your product gets a far more useful answer than a general one can."
        location="faq_page"
        whatsapp={{ pageLabel: "Frequently asked questions", path: "/faq" }}
        primaryLabel="Ask about your product"
      />
    </>
  );
}
