import type { Metadata } from "next";
import { Container, Section, ButtonLink, EmptyState, Notice, SpecList } from "@/components/ui";
import { PageHeader, SplitSection, PageCta } from "@/components/sections/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { publicCertificates, resolveCertificateStatus } from "@/content/fallback/certificates";
import { formatDate } from "@/lib/utilities/format";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
const certificates = publicCertificates();
export const metadata: Metadata = {
  ...buildMetadata({
    title:
      certificates.length > 0
        ? "Certifications"
        : "Certification requirements",
    description:
      certificates.length > 0
        ? "Current Textileways certification records, including issuing organisation, scope, facility and validity."
        : "Discuss certification, testing and documentation requirements for your textile or apparel programme before development begins.",
    path: "/certifications",
  }),
  ...(certificates.length === 0
    ? {
        robots: {
          index: false,
          follow: true,
        },
      }
    : {}),
};


const statusLabels = {
  active: "Active",
  "expiring-soon": "Expiring soon",
  expired: "Expired",
  "pending-verification": "Pending verification",
  hidden: "Hidden",
} as const;

export default function CertificationsPage() {

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
              title="Confirm your required standard before development"
              description="Certification and testing requirements vary by product, material, destination and buyer programme. Tell us which standard applies so the production route, material documentation and any third-party testing can be reviewed before sampling begins."
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <ButtonLink href="/contact">
                    Discuss a Requirement
                  </ButtonLink>
                  <ButtonLink href="/quality" variant="secondary">
                    Review Quality Control
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
        eyebrow="Plan requirements early"
        title="Certification affects the production route"
        intro="A required standard can influence material sourcing, factory selection, testing, documentation, minimum quantities and lead time. It should be identified before the first sample is developed."
        className="tw-card overflow-hidden rounded-[22px]"
      >
        <ul className="divide-y divide-line border-y border-line text-small text-ink-muted">
          <li className="py-5">
            <span className="font-semibold text-ink">Name the required standard</span>
            <p className="mt-2">
              Share the exact certification, retailer protocol or testing requirement rather
              than asking generally whether a product is compliant.
            </p>
          </li>

          <li className="py-5">
            <span className="font-semibold text-ink">Confirm the required scope</span>
            <p className="mt-2">
              Requirements can apply to a facility, production process, material supplier or
              individual order. Those are not interchangeable.
            </p>
          </li>

          <li className="py-5">
            <span className="font-semibold text-ink">Review the evidence before ordering</span>
            <p className="mt-2">
              Where documentation is required, its issuing organisation, validity, scope and
              relationship to your product should be reviewed before production is approved.
            </p>
          </li>

          <li className="py-5">
            <span className="font-semibold text-ink">Allow for testing and documentation</span>
            <p className="mt-2">
              Third-party testing, transaction certificates and buyer-specific reports can
              affect the schedule and cost. Include them in the original brief.
            </p>
          </li>
        </ul>

        <Notice tone="info" className="mt-10 max-w-[70ch]">
          Textileways does not treat one certification as proof that every product, material
          or production route is covered. Requirements are reviewed against the specific
          order.
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
