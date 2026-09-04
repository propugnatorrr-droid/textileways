/**
 * Centralized register of factual claims about Textileways.
 *
 * Every statement the website makes about the company lives here so the owner
 * can review it in one place. Nothing is invented: entries the business has not
 * yet confirmed carry a status of "pending" or "do-not-publish" and are filtered
 * out of public rendering by `publicFacts()`.
 *
 * To publish a pending fact: confirm the value with the business, replace the
 * placeholder value, set status to "verified", and record the date and source.
 */

export type VerificationStatus = "verified" | "pending" | "do-not-publish";

export interface CompanyFact {
  /** Stable key used by components to look a fact up. */
  id: string;
  /** Short human label, used in the verification report. */
  label: string;
  /** The publishable value. Empty string when nothing is confirmed yet. */
  value: string;
  status: VerificationStatus;
  /** Who or what confirmed the value. */
  source?: string;
  /** ISO date the value was last confirmed. */
  verifiedOn?: string;
  /** Guidance for the person who has to supply or confirm the value. */
  note?: string;
}

export const companyFacts = [
  {
    id: "country",
    label: "Country of manufacture",
    value: "Pakistan",
    status: "verified",
    source: "Client brief",
  },
  {
    id: "experience-years",
    label: "Years of manufacturing experience",
    value: "More than 20 years",
    status: "verified",
    source: "Client brief",
  },
  {
    id: "moq-minimum",
    label: "Indicative minimum order quantity",
    value: "From approximately 50 pieces",
    status: "verified",
    source: "Client brief",
    note: "Always presented as subject to technical review, never as a guarantee.",
  },
  {
    id: "capacity-ceiling",
    label: "Indicative upper production scale",
    value: "Beyond 100,000 pieces",
    status: "verified",
    source: "Client brief",
  },
  {
    id: "primary-markets",
    label: "Primary export markets",
    value: "United States and Europe",
    status: "verified",
    source: "Client brief",
  },
  {
    id: "legal-entity-name",
    label: "Registered legal company name",
    value: "",
    status: "pending",
    note: "Required for the legal pages, the footer and Organization structured data.",
  },
  {
    id: "registration-number",
    label: "Company registration number",
    value: "",
    status: "pending",
    note: "Required for the terms page and buyer due diligence requests.",
  },
  {
    id: "factory-address",
    label: "Factory address",
    value: "",
    status: "pending",
    note: "Required before any address or map is published. Do not publish a city alone if the business prefers not to disclose the site.",
  },
  {
    id: "contact-email",
    label: "Sales email address",
    value: "",
    status: "pending",
    note: "Shown in the footer and contact page, and used as the RFQ reply-to address.",
  },
  {
    id: "contact-phone",
    label: "Sales telephone number",
    value: "",
    status: "pending",
    note: "Include the country code. Leave pending rather than publishing an unmonitored line.",
  },
  {
    id: "whatsapp-number",
    label: "WhatsApp business number",
    value: "+92 336 260 5238",
    status: "verified",
    source: "Supplied by the business owner",
    verifiedOn: "2026-09-04",
    note: "Primary inquiry channel. Drives the floating WhatsApp action on every page.",
  },
  {
    id: "employee-count",
    label: "Number of employees",
    value: "",
    status: "do-not-publish",
    note: "Do not publish until the business confirms a figure and the date it applies to.",
  },
  {
    id: "monthly-capacity",
    label: "Monthly production capacity",
    value: "",
    status: "do-not-publish",
    note: "Requires a figure, a unit, a product type and a reporting period before it can be published.",
  },
  {
    id: "countries-served",
    label: "Number of countries served",
    value: "",
    status: "do-not-publish",
    note: "Do not publish a count without an export record to support it.",
  },
  {
    id: "on-time-delivery",
    label: "On time delivery rate",
    value: "",
    status: "do-not-publish",
    note: "Performance percentages require a measurement method and a reporting period.",
  },
  {
    id: "defect-rate",
    label: "Defect rate",
    value: "",
    status: "do-not-publish",
    note: "Requires an inspection standard, sample plan and reporting period.",
  },
  {
    id: "machine-count",
    label: "Machine list and counts",
    value: "",
    status: "pending",
    note: "Needed for the factory page equipment section.",
  },
] as const satisfies readonly CompanyFact[];

export type CompanyFactId = (typeof companyFacts)[number]["id"];

const factIndex = new Map<string, CompanyFact>(
  companyFacts.map((fact) => [fact.id, fact]),
);

/** Look a fact up by id. Returns undefined when the id is unknown. */
export function getFact(id: CompanyFactId): CompanyFact | undefined {
  return factIndex.get(id);
}

/**
 * Returns a fact's value only when it is verified and non empty.
 * Components should treat `null` as "render nothing", never as "render a guess".
 */
export function verifiedFactValue(id: CompanyFactId): string | null {
  const fact = factIndex.get(id);
  if (!fact || fact.status !== "verified") return null;
  const value = fact.value.trim();
  return value.length > 0 ? value : null;
}

/** True when the fact is verified and has a value, so a section can be shown. */
export function isFactPublishable(id: CompanyFactId): boolean {
  return verifiedFactValue(id) !== null;
}

/** All publishable facts, for rendering summary blocks. */
export function publicFacts(): CompanyFact[] {
  return companyFacts.filter(
    (fact) => fact.status === "verified" && fact.value.trim().length > 0,
  );
}

/** Everything still awaiting the business, used by the content requirements report. */
export function outstandingFacts(): CompanyFact[] {
  return companyFacts.filter(
    (fact) => fact.status !== "verified" || fact.value.trim().length === 0,
  );
}
