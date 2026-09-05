import type { Metadata } from "next";
import { Container, Section, ButtonLink, Notice } from "@/components/ui";
import { PageHeader, PageCta } from "@/components/sections/page-shell";
import { Reveal } from "@/components/content/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { manufacturingProcessStages, howItWorksStages } from "@/content/fallback/company";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Manufacturing process",
  description:
    "The full 21 stage manufacturing process from product brief to reorder, with buyer responsibilities, our responsibilities, required documents, decision points and possible delays at each stage.",
  path: "/manufacturing-process",
});

export default function ManufacturingProcessPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Manufacturing process", path: "/manufacturing-process" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Manufacturing process"
        title="Twenty one stages, with both sides of each one"
        lede="Most process diagrams show only what the factory does. This one shows what you have to do as well, because the stages that delay projects are almost always the ones waiting on a decision from the buyer."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/quality" variant="secondary">
              How quality is controlled
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-[20px] border border-line bg-cotton p-6">
            <p className="text-label uppercase tracking-[0.09em] text-ink-subtle">
              The short version
            </p>
            <ol className="mt-5 space-y-2.5 text-small text-ink-muted">
              {howItWorksStages.map((stage, index) => (
                <li key={stage.title} className="flex gap-3">
                  <span aria-hidden="true" className="w-5 shrink-0 text-stone">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{stage.title}</span>
                </li>
              ))}
            </ol>
          </div>
        }
      />

      <Section tight className="">
        <Container>
          <Notice tone="info" title="On timelines" className="max-w-[74ch]">
            No fixed timeline is published for these stages. Duration depends on fabric
            availability, dyeing, decoration method, quantity, the number of sample rounds and
            the destination. An indicative schedule is issued with the quotation and dates are
            confirmed once the pre production sample is approved.
          </Notice>
        </Container>
      </Section>

      <Section>
        <Container>
          <ol className="space-y-px bg-line">
            {manufacturingProcessStages.map((stage, index) => (
              <Reveal
                key={stage.number}
                as="li"
                delay={(index % 4) * 40}
                className="tw-card rounded-[24px] p-6 lg:p-8"
              >
                <div className="grid gap-6 lg:grid-cols-[4rem_minmax(0,18rem)_1fr] lg:gap-10">
                  <span
                    aria-hidden="true"
                    className="font-sans text-h2 font-semibold leading-none tracking-[-0.045em] text-stone"
                  >
                    {String(stage.number).padStart(2, "0")}
                  </span>

                  <div>
                    <h2 className="font-sans text-h3 font-semibold tracking-[-0.032em]">{stage.title}</h2>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-label uppercase tracking-[0.09em] text-ink-subtle">
                        Your responsibility
                      </h3>
                      <p className="mt-2.5 text-small leading-relaxed text-ink-muted">
                        {stage.buyerResponsibility}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-label uppercase tracking-[0.09em] text-ink-subtle">
                        Our responsibility
                      </h3>
                      <p className="mt-2.5 text-small leading-relaxed text-ink-muted">
                        {stage.textilewaysResponsibility}
                      </p>
                    </div>

                    {stage.documents.length > 0 ? (
                      <div>
                        <h3 className="text-label uppercase tracking-[0.09em] text-ink-subtle">
                          Documents
                        </h3>
                        <ul className="mt-2.5 space-y-1.5 text-small text-ink-muted">
                          {stage.documents.map((doc) => (
                            <li key={doc} className="flex gap-2.5">
                              <span aria-hidden="true" className="mt-[0.62em] h-1 w-1 shrink-0 bg-stone" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {stage.decisionPoints.length > 0 ? (
                      <div>
                        <h3 className="text-label uppercase tracking-[0.09em] text-ink-subtle">
                          Decision points
                        </h3>
                        <ul className="mt-2.5 space-y-1.5 text-small text-ink-muted">
                          {stage.decisionPoints.map((point) => (
                            <li key={point} className="flex gap-2.5">
                              <span aria-hidden="true" className="mt-[0.62em] h-1 w-1 shrink-0 bg-stone" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {stage.possibleDelays.length > 0 ? (
                      <div>
                        <h3 className="text-label uppercase tracking-[0.09em] text-ink-subtle">
                          Possible delays
                        </h3>
                        <ul className="mt-2.5 space-y-1.5 text-small text-ink-muted">
                          {stage.possibleDelays.map((delay) => (
                            <li key={delay} className="flex gap-2.5">
                              <span aria-hidden="true" className="mt-[0.62em] h-1 w-1 shrink-0 bg-clay" />
                              <span>{delay}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {stage.approvals.length > 0 ? (
                      <div>
                        <h3 className="text-label uppercase tracking-[0.09em] text-ink-subtle">
                          Approvals required
                        </h3>
                        <ul className="mt-2.5 space-y-1.5 text-small text-ink-muted">
                          {stage.approvals.map((approval) => (
                            <li key={approval} className="flex gap-2.5">
                              <span aria-hidden="true" className="mt-[0.62em] h-1 w-1 shrink-0 bg-forest" />
                              <span>{approval}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <PageCta
        title="Ready to start at stage one?"
        description="A product description, references, a target quantity and a market are enough to begin. Everything else is developed with you from there."
        location="process_page"
        whatsapp={{ pageLabel: "Manufacturing process", path: "/manufacturing-process" }}
      />
    </>
  );
}
