import type { Metadata } from "next";
import { Container, Section, ButtonLink, SpecList, Notice } from "@/components/ui";
import { PageHeader, ProseBlock, SplitSection, PageCta } from "@/components/sections/page-shell";
import { Media } from "@/components/content/media";
import { Reveal } from "@/components/content/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { aboutNarrative } from "@/content/fallback/company";
import { publicFacts, outstandingFacts } from "@/content/configuration/company-facts";
import { editorialMedia } from "@/content/fallback/media";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "About Textileways",
  description:
    "Textileways is a Pakistan based textile and apparel manufacturer with more than 20 years of experience, producing for brands and organisations across the USA and Europe.",
  path: "/about",
});

export default function AboutPage() {
  const facts = publicFacts();
  const outstanding = outstandingFacts().length;

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
        lede="Textileways exists to close the gap between manufacturers who only take large orders and those who can only handle small ones."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/why-textileways" variant="secondary">
              Why Textileways
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

      <Section tight className="">
        <Container>
          <ProseBlock paragraphs={aboutNarrative.intro} />
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
        title="What we can state as fact"
        intro="Everything published about the business is held in one register with a verification status. Anything unconfirmed is absent rather than estimated."
        className="tw-card tw-card-interactive overflow-hidden rounded-[22px]"
      >
        <SpecList items={facts.map((fact) => ({ label: fact.label, value: fact.value }))} />

        <Notice tone="info" title="What is deliberately missing" className="mt-10 max-w-[70ch]">
          <p>
            {outstanding} further items, including production capacity, employee numbers,
            delivery performance and defect rates, are recorded in the register as unverified
            and are therefore not published anywhere on this site.
          </p>
          <p className="mt-3">
            A capacity figure without a measurement method and a reporting period is not
            information, and buyers making sourcing decisions deserve better than a number
            that cannot be checked.
          </p>
        </Notice>
      </SplitSection>

      <PageCta
        title="Start with a conversation rather than a commitment"
        description="Tell us what you want to make, roughly how many, and where it is going. We will tell you honestly whether it is something we should be quoting for."
        location="about_page"
        whatsapp={{ pageLabel: "About", path: "/about" }}
      />
    </>
  );
}
