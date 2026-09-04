import type { Certificate } from "@/content/types";

/**
 * Certificate registry.
 *
 * Deliberately empty. No certificate documents, numbers or issuing bodies have
 * been supplied, and publishing a certification claim without a verifiable
 * record would be a false statement about the business.
 *
 * To publish a certificate, add a record here (or in Sanity) with a real
 * certificate number and issuing organisation, set `status` to "active" and
 * `publiclyVisible` to true. `publicCertificates()` is the only function the
 * pages use, so nothing unverified can reach the page by accident.
 */
export const certificates: Certificate[] = [];

/** Days before expiry at which a certificate is reported as expiring soon. */
const EXPIRING_SOON_DAYS = 60;

/**
 * Recomputes status from the expiry date so an expired certificate can never be
 * displayed as active because someone forgot to update the record.
 */
export function resolveCertificateStatus(
  certificate: Certificate,
  now: Date = new Date(),
): Certificate["status"] {
  if (certificate.status === "hidden" || certificate.status === "pending-verification") {
    return certificate.status;
  }

  const expiry = new Date(certificate.expiresOn);
  if (Number.isNaN(expiry.getTime())) return "pending-verification";

  const msRemaining = expiry.getTime() - now.getTime();
  if (msRemaining <= 0) return "expired";
  if (msRemaining <= EXPIRING_SOON_DAYS * 24 * 60 * 60 * 1000) return "expiring-soon";
  return "active";
}

/**
 * Certificates safe to render publicly: marked visible, carrying a certificate
 * number and an issuing organisation, and not expired.
 */
export function publicCertificates(now: Date = new Date()): Certificate[] {
  return certificates.filter((certificate) => {
    if (!certificate.publiclyVisible) return false;
    if (certificate.certificateNumber.trim().length === 0) return false;
    if (certificate.issuingOrganization.trim().length === 0) return false;
    const status = resolveCertificateStatus(certificate, now);
    return status === "active" || status === "expiring-soon";
  });
}
