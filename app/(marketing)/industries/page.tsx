import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, ButtonLink } from "@/components/ui";
import { PageHeader, PageCta } from "@/components/sections/page-shell";
import { Reveal } from "@/components/content/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { industries } from "@/content/fallback/industries";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description:
    "How Textileways supports fashion brands, streetwear labels, sports clubs, corporate uniform programmes, hospitality, healthcare, education, industrial buyers, retailers and promotional distributors.",
  path: "/industries",
});

export default function IndustriesPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Industries"
        title="Ten kinds of buyer, ten different priorities"
        lede="A streetwear label and a hospital procurement team are both buying apparel, and almost nothing else about the two projects is the same. These pages set out what each kind of buyer actually needs from a manufacturer."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/products" variant="secondary">
              Browse products
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <Reveal key={industry.slug} as="li" delay={(index % 3) * 55} className="bg-paper">
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-cotton/60"
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-clay transition-[width] duration-300 group-hover:w-14"
                  />
                  <h2 className="mt-6 font-serif text-h3 transition-colors duration-200 group-hover:text-forest">
                    {industry.name}
                  </h2>
                  <p className="mt-3 flex-1 text-small leading-relaxed text-ink-muted">
                    {industry.summary}
                  </p>
                  <span className="mt-6 text-label uppercase tracking-[0.09em] text-ink-subtle">
                    Buyer guidance
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <PageCta
        title="Your requirement will not match a template exactly."
        description="Describe the product and the organisation it is for. We will tell you which of these considerations actually apply to your project."
        location="industries_hub"
        whatsapp={{ pageLabel: "Industries", path: "/industries" }}
      />
    </>
  );
}
