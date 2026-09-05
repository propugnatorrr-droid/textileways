import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, ButtonLink, MarkerList } from "@/components/ui";
import { PageHeader, SplitSection, PageCta } from "@/components/sections/page-shell";
import { Reveal } from "@/components/content/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { responsibilityPrinciples } from "@/content/fallback/company";
import { outstandingFacts } from "@/content/configuration/company-facts";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Responsibility",
  description:
    "What Textileways publishes about itself, what it withholds and why. Worker wellbeing, audit support, honest disclosure of where products are made, and no unevidenced claims.",
  path: "/responsibility",
});

const relatedPages = [
  { label: "Sustainability", href: "/sustainability", description: "Materials, waste, packaging and resource use." },
  { label: "Traceability", href: "/traceability", description: "Where materials and production come from." },
  { label: "Certifications", href: "/certifications", description: "A verifiable certificate registry." },
  { label: "Quality", href: "/quality", description: "Checkpoints from incoming material to packing." },
  { label: "The factory", href: "/factory", description: "The working environment itself." },
];

export default function ResponsibilityPage() {
  const withheld = outstandingFacts().filter((fact) => fact.status === "do-not-publish");

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Responsibility", path: "/responsibility" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Responsibility"
        title="What we publish, and what we deliberately do not"
        lede="Responsibility in this industry is usually presented as a list of achievements. This page is the opposite: an account of what we can evidence, what we cannot, and how we handle the difference."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/sustainability" variant="secondary">
              Sustainability
            </ButtonLink>
            <ButtonLink href="/traceability" variant="secondary">
              Traceability
            </ButtonLink>
          </>
        }
      />

      <SplitSection
        eyebrow="Principles"
        title="Four rules this website follows"
        intro="Applied to every page, including the ones where following them makes the site look less impressive."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {responsibilityPrinciples.map((principle, index) => (
            <Reveal key={principle.title} as="li" delay={(index % 2) * 55} className="tw-card tw-card-interactive rounded-[22px] p-7">
              <span aria-hidden="true" className="block h-px w-8 bg-clay" />
              <h2 className="mt-6 text-body font-semibold text-ink">{principle.title}</h2>
              <p className="mt-3 text-small leading-relaxed text-ink-muted">
                {principle.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </SplitSection>

      <SplitSection
        eyebrow="Withheld"
        title="Figures a competitor would probably publish"
        intro="These are all held in the company fact register with a status of do not publish. They stay unpublished until they are measured with a stated method and a reporting period."
        className="tw-card tw-card-interactive overflow-hidden rounded-[22px]"
      >
        <ul className="divide-y divide-line">
          {withheld.map((fact) => (
            <li key={fact.id} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-8">
              <h3 className="text-small font-semibold text-ink">{fact.label}</h3>
              <p className="text-small leading-relaxed text-ink-muted">{fact.note}</p>
            </li>
          ))}
        </ul>
      </SplitSection>

      <SplitSection
        eyebrow="People"
        title="Worker wellbeing and audits"
        intro="A legitimate buyer question that deserves a direct answer rather than a photograph of smiling staff."
      >
        <div className="tw-prose text-body leading-relaxed text-ink-muted">
          <p>
            Textileways holds no social compliance certification that has been supplied for
            publication, so none is claimed anywhere on this site. That is a statement about
            what has been evidenced to us for the website, not a statement that conditions are
            unacceptable.
          </p>
          <p>
            What we can say is that buyer audits are supported rather than resisted, and that
            the information an audit requires is provided when one is arranged. If working
            conditions form part of your sourcing decision, an audit gives you a real answer
            where a website cannot.
          </p>
        </div>

        <h3 className="mb-4 mt-10 text-small font-semibold text-ink">What we support</h3>
        <MarkerList
          items={[
            "Buyer appointed social compliance audits at the production facility",
            "Third party quality inspection during and after production",
            "Factory visits by buyers and their representatives, with notice",
            "Documentation requests for buyer due diligence processes",
            "Disclosure of whether a product runs in house or through a partner facility",
          ]}
        />
      </SplitSection>

      <Section tight className="bg-cotton">
        <Container>
          <h2 className="mb-8 border-b border-line pb-3 text-label font-medium uppercase tracking-[0.09em] text-ink-subtle">
            Related pages
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPages.map((page, index) => (
              <Reveal key={page.href} as="li" delay={(index % 3) * 55} className="tw-card tw-card-interactive overflow-hidden rounded-[22px]">
                <Link
                  href={page.href}
                  className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-white"
                >
                  <span className="text-body font-semibold text-ink transition-colors duration-200 group-hover:text-forest">
                    {page.label}
                  </span>
                  <span className="mt-2 text-small leading-relaxed text-ink-muted">
                    {page.description}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <PageCta
        title="Ask us the difficult questions"
        description="If something on this site matters to your sourcing decision and is not evidenced here, ask. A direct answer, including where the answer is that we do not know yet, is more useful than a page of claims."
        location="responsibility_page"
        whatsapp={{ pageLabel: "Responsibility", path: "/responsibility" }}
        primaryLabel="Ask a question"
      />
    </>
  );
}
