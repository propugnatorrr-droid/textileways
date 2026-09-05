import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, ButtonLink, Notice, MarkerList } from "@/components/ui";
import { PageHeader, PageCta } from "@/components/sections/page-shell";
import { Media } from "@/components/content/media";
import { Reveal } from "@/components/content/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { publishedCaseStudies, projectProcessNarrative } from "@/content/fallback/case-studies";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Case studies",
  description:
    "How a manufacturing project runs from the buyer's side, stage by stage. We do not publish customer stories without written permission and evidence for every figure quoted.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const studies = publishedCaseStudies();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Case studies", path: "/case-studies" },
  ];

  /* Published, evidenced case studies take precedence when any exist. */
  if (studies.length > 0) {
    return (
      <>
        <JsonLd data={breadcrumbSchema(breadcrumbs)} />
        <PageHeader
          eyebrow="Case studies"
          title="Projects we can talk about"
          lede="Every case study below is published with the customer's written permission and with evidence for the figures it quotes."
          breadcrumbs={breadcrumbs}
        />
        <Section>
          <Container>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {studies.map((study, index) => (
                <Reveal key={study.slug} as="li" delay={(index % 3) * 60} className="tw-card tw-card-interactive overflow-hidden rounded-[22px]">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-cotton"
                  >
                    <Media asset={study.hero} aspect="aspect-[16/10]" sizes="(min-width: 1024px) 30vw, 92vw" zoomOnHover />
                    <p className="mt-6 text-label uppercase tracking-[0.09em] text-ink-subtle">
                      {study.industry} &middot; {study.market}
                    </p>
                    <h2 className="mt-3 text-body font-semibold transition-colors duration-200 group-hover:text-forest">
                      {study.title}
                    </h2>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
        <PageCta
          title="Start your own project"
          description="Share your product details, target quantity and delivery requirements."
          location="case_studies_hub"
        />
      </>
    );
  }

  /* No evidenced case studies exist, so the educational walkthrough is shown instead. */
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow={projectProcessNarrative.eyebrow}
        title={projectProcessNarrative.heading}
        lede={projectProcessNarrative.intro}
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/manufacturing-process" variant="secondary">
              The full 21 stage process
            </ButtonLink>
          </>
        }
        aside={
          <Notice tone="info" title="Why this page has no customer stories">
            <p>
              A case study is only useful if it is true. Publishing one requires the
              customer&apos;s written permission to be named, and evidence for every quantity,
              timescale and result quoted.
            </p>
            <p className="mt-3">
              Neither has been recorded yet, so this page describes how a project actually
              runs instead. The content model and page template for real case studies are
              already built, and one can be published without a code change.
            </p>
          </Notice>
        }
      />

      <Section>
        <Container>
          <ol className="grid gap-4 lg:grid-cols-2">
            {projectProcessNarrative.phases.map((phase, index) => (
              <Reveal key={phase.title} as="li" delay={(index % 2) * 60} className="bg-white p-7 lg:p-9">
                <p className="text-label uppercase tracking-[0.09em] text-stone">
                  Stage {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-4 font-sans text-h3 font-semibold tracking-[-0.032em]">{phase.title}</h2>
                <p className="mt-4 text-small leading-relaxed text-ink-muted">
                  {phase.buyerView}
                </p>
                <h3 className="mt-7 text-label uppercase tracking-[0.09em] text-ink-subtle">
                  What helps most
                </h3>
                <MarkerList items={phase.whatHelps} className="mt-4" />
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <PageCta
        title="Start a project of your own"
        description="Share your product details, target quantity and delivery requirements. Our team will review the technical and commercial requirements before quoting."
        location="case_studies_process"
        whatsapp={{ pageLabel: "Case studies", path: "/case-studies" }}
      />
    </>
  );
}
