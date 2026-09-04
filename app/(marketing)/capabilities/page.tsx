import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, ButtonLink, StatusTag } from "@/components/ui";
import { PageHeader, PageCta } from "@/components/sections/page-shell";
import { Reveal } from "@/components/content/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { capabilities, capabilitiesByGroup } from "@/content/fallback/capabilities";
import { capabilityGroupLabels } from "@/content/types";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Capabilities",
  description:
    "Thirty manufacturing capabilities across development, materials, production, decoration, finishing and quality assurance, each with its process, limits and quality checkpoints stated.",
  path: "/capabilities",
});

export default function CapabilitiesPage() {
  const groups = capabilitiesByGroup();
  const pendingCount = capabilities.filter((item) => item.verification === "pending").length;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Capabilities", path: "/capabilities" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Capabilities"
        title="Thirty capabilities, with their limits stated"
        lede="Every capability page describes the process, the products and materials it suits, the techniques available and, importantly, what it cannot do. A capability list without limits is a sales document rather than a technical one."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/manufacturing-process" variant="secondary">
              See the full process
            </ButtonLink>
          </>
        }
        aside={
          <div className="border border-line bg-cotton/50 p-6">
            <p className="text-label uppercase tracking-[0.09em] text-ink-subtle">
              Verification status
            </p>
            <p className="mt-4 text-small leading-relaxed text-ink-muted">
              {pendingCount} of these {capabilities.length} capabilities are marked as pending
              verification. That means the capability is genuinely offered and discussed, but
              the exact equipment, partner arrangement or scope has not yet been confirmed in
              writing by the business, so it is presented as confirmed on technical review
              rather than as an established fact.
            </p>
            <p className="mt-4 text-small leading-relaxed text-ink-muted">
              Nothing on these pages claims equipment or certification that has not been
              evidenced.
            </p>
          </div>
        }
      />

      {groups.map((group) => (
        <Section key={group.group} tight className="border-b border-line">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="font-serif text-h3">{capabilityGroupLabels[group.group]}</h2>
                <p className="mt-3 text-small text-ink-subtle">
                  {group.items.length} capabilities
                </p>
              </div>

              <ul className="grid gap-px bg-line sm:grid-cols-2">
                {group.items.map((capability, index) => (
                  <Reveal
                    key={capability.slug}
                    as="li"
                    delay={(index % 2) * 55}
                    className="bg-paper"
                  >
                    <Link
                      href={`/capabilities/${capability.slug}`}
                      className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-cotton/60"
                    >
                      <h3 className="text-body font-semibold transition-colors duration-200 group-hover:text-forest">
                        {capability.name}
                      </h3>
                      <p className="mt-2.5 flex-1 text-small leading-relaxed text-ink-muted">
                        {capability.summary}
                      </p>
                      {capability.verification === "pending" ? (
                        <span className="mt-5 self-start">
                          <StatusTag tone="clay">Confirmed on review</StatusTag>
                        </span>
                      ) : null}
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      ))}

      <PageCta
        title="Not sure which capabilities your product needs?"
        description="Describe the product and we will tell you which processes it requires, which are straightforward and which need feasibility confirmed first."
        location="capabilities_hub"
        whatsapp={{ pageLabel: "Capabilities", path: "/capabilities" }}
      />
    </>
  );
}
