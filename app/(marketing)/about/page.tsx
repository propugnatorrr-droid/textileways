import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, ButtonLink, SpecList } from "@/components/ui";
import { PageHeader, ProseBlock, SplitSection, PageCta } from "@/components/sections/page-shell";
import { Media } from "@/components/content/media";
import { Reveal } from "@/components/content/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { aboutNarrative } from "@/content/fallback/company";
import { publicFacts } from "@/content/configuration/company-facts";
import { editorialMedia } from "@/content/fallback/media";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "About TextileWays",
  description:
    "TextileWays is a Pakistan based textile and apparel manufacturer with more than 20 years of experience, producing for brands and organisations across international markets including the USA, Europe, the UK and Australia.",
  path: "/about",
});

export default function AboutPage() {
  const facts = publicFacts();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="About"
        title="One manufacturing partner. Every textile possibility."
        lede="TextileWays exists to close the gap between manufacturers who only take large orders and those who can only handle small ones."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/why-textileways" variant="secondary">
              Why TextileWays
            </ButtonLink>
          </>
        }
        aside={
          <Media
            asset={editorialMedia.team}
            aspect="aspect-[4/3]"
            sizes="(min-width: 1024px) 40vw, 92vw"
          />
        }
      />

      <Section size="tight">
        <Container>
          <ProseBlock paragraphs={aboutNarrative.intro} />
          <p className="mt-8 max-w-[70ch] text-small text-ink-subtle">
            Selected imagery on this site is representative while verified facility
            photography is being prepared. See{" "}
            <Link href="/factory" className="tw-underline-grow text-ink-muted">
              the factory page
            </Link>{" "}
            for what that means and what is still outstanding.
          </p>
        </Container>
      </Section>

      <SplitSection
        eyebrow="Approach"
        title="How we work"
        intro="Four habits that decide whether a manufacturing relationship works over years rather than for a single order."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {aboutNarrative.approach.map((item, index) => (
            <Reveal key={item.title} as="li" delay={(index % 2) * 60} className="tw-card tw-card-interactive rounded-[22px] p-7">
              <h3 className="text-body font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-small leading-relaxed text-ink-muted">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </SplitSection>

      <SplitSection
        eyebrow="Company facts"
        title="A manufacturing partner built for different stages of growth"
        intro="The essentials buyers need when deciding whether a supplier fits their product, quantity and destination."
        className="tw-card overflow-hidden rounded-[22px]"
      >
        <SpecList
          items={facts.map((fact) => ({
            label: fact.label,
            value: fact.value,
          }))}
        />

        <div className="mt-10 max-w-[70ch] rounded-[20px] border border-line bg-cotton p-6 sm:p-7">
          <h3 className="text-body font-semibold text-ink">
            Preparing a supplier review?
          </h3>
          <p className="mt-3 text-small leading-relaxed text-ink-muted">
            Tell us which company, facility, production, testing or documentation details
            your sourcing process requires. Available information can be reviewed in the
            context of your proposed product and production route.
          </p>
          <ButtonLink href="/contact" variant="secondary" className="mt-6">
            Request Company Information
          </ButtonLink>
        </div>
      </SplitSection>


      <PageCta
        title="See whether TextileWays fits your next product"
        description="Share the product, estimated quantity and destination. We will review the requirements and explain the most practical route into sampling and production."
        location="about_page"
        whatsapp={{ pageLabel: "About", path: "/about" }}
      />
    </>
  );
}
