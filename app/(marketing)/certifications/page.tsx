import type { Metadata } from "next";
import { Container, Section, ButtonLink, EmptyState, Notice, SpecList } from "@/components/ui";
import { PageHeader, SplitSection, PageCta } from "@/components/sections/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { publicCertificates, resolveCertificateStatus } from "@/content/fallback/certificates";
import { formatDate } from "@/lib/utilities/format";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Certifications",
  description:
    "A verifiable certificate registry. Textileways publishes only active certificates with a certificate number, an issuing organisation and a verification route, rather than a wall of logos.",
  path: "/certifications",
});

const statusLabels = {
  active: "Active",
  "expiring-soon": "Expiring soon",
  expired: "Expired",
  "pending-verification": "Pending verification",
  hidden: "Hidden",
} as const;

export default function CertificationsPage() {
  const certificates = publicCertificates();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Certifications", path: "/certifications" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Certifications"
        title="A registry, not a wall of logos"
        lede="Certification logos are trivially easy to copy onto a website and almost impossible for a buyer to verify from one. This page publishes records instead: certificate number, issuing organisation, scope, facility and expiry date."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/quality" variant="secondary">
              How quality is controlled
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          {certificates.length === 0 ? (
            <EmptyState
              title="No certificates are published yet"
              description="No certificate documents, numbers or issuing organisations have been supplied for publication. Rather than displaying certification logos without records behind them, this page stays empty until real certificates exist. If a certification matters to your sourcing decision, ask for it directly and we will tell you what is genuinely held."
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <ButtonLink href="/contact">Ask about certification</ButtonLink>
                  <ButtonLink href="/responsibility" variant="secondary">
                    Our position on claims
                  </ButtonLink>
                </div>
              }
            />
          ) : (
            <ul className="space-y-10">
              {certificates.map((certificate) => {
                const status = resolveCertificateStatus(certificate);
                return (
                  <li key={certificate.id} className="rounded-[22px] border border-line p-7">
                    <h2 className="font-sans text-h3 font-semibold tracking-[-0.032em]">{certificate.name}</h2>
                    <SpecList
                      className="mt-6"
                      items={[
                        { label: "Issuing organisation", value: certificate.issuingOrganization },
                        { label: "Certificate number", value: certificate.certificateNumber },
                        { label: "Facility", value: certificate.facility },
                        { label: "Scope", value: certificate.scope },
                        { label: "Issued", value: formatDate(certificate.issuedOn) },
                        { label: "Expires", value: formatDate(certificate.expiresOn) },
                        { label: "Status", value: statusLabels[status] },
                      ]}
                    />
                    {certificate.verificationUrl ? (
                      <a
                        href={certificate.verificationUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="tw-underline-grow mt-6 inline-block text-small font-medium text-ink"
                      >
                        Verify with the issuing organisation
                      </a>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </Section>

      <SplitSection
        eyebrow="How this works"
        title="What gets published here"
        intro="The rules the registry enforces, so a lapsed certificate cannot quietly remain on display."
        className="tw-card tw-card-interactive overflow-hidden rounded-[22px]"
      >
        <ul className="divide-y divide-line border-y border-line text-small text-ink-muted">
          <li className="py-5">
            <span className="font-semibold text-ink">A certificate number is required</span>
            <p className="mt-2">
              A record with no certificate number cannot be verified by a buyer, so it is not
              displayed.
            </p>
          </li>
          <li className="py-5">
            <span className="font-semibold text-ink">Status is computed from the expiry date</span>
            <p className="mt-2">
              Status is recalculated on every page render rather than read from a stored
              field, so an expired certificate cannot appear as active because nobody updated
              the record.
            </p>
          </li>
          <li className="py-5">
            <span className="font-semibold text-ink">Scope is named explicitly</span>
            <p className="mt-2">
              A certification covers a specific facility and a specific scope. Publishing one
              without saying what it covers invites a buyer to assume it covers everything.
            </p>
          </li>
          <li className="py-5">
            <span className="font-semibold text-ink">Material claims need a chain, not a logo</span>
            <p className="mt-2">
              An organic or recycled claim on a garment label requires certified operators at
              every step and valid transaction certificates for your specific order. Where
              that chain cannot be evidenced, the claim is not made.
            </p>
          </li>
        </ul>

        <Notice tone="info" className="mt-10 max-w-[70ch]">
          If your buyer requires a specific certification, tell us at the inquiry stage. It is
          better to know at the start that a requirement cannot be met than to discover it
          after samples are approved.
        </Notice>
      </SplitSection>

      <PageCta
        title="Does your programme require certification?"
        description="Tell us which standard your buyer or market requires. We will tell you honestly what is held, what can be arranged, and what would need a different production route."
        location="certifications_page"
        whatsapp={{ pageLabel: "Certifications", path: "/certifications" }}
        primaryLabel="Ask about a standard"
      />
    </>
  );
}
