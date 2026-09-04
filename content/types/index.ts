/**
 * Content model shared by the fallback content in this repository and by the
 * Sanity documents defined in `sanity/schemas`. The CMS adapter in `lib/cms`
 * maps Sanity documents onto these types, so pages never care where their
 * content came from.
 */

export type VerificationStatus = "verified" | "pending" | "do-not-publish";

/**
 * Truthful capability labels. Nothing on the site may imply that every product
 * is made under one roof unless the record says so.
 */
export type CapabilityStatus =
  | "in-house"
  | "audited-partner"
  | "developed-and-sourced"
  | "after-technical-review";

export const capabilityStatusLabels: Record<CapabilityStatus, string> = {
  "in-house": "Manufactured in house",
  "audited-partner": "Manufactured through an audited partner facility",
  "developed-and-sourced": "Developed and sourced by Textileways",
  "after-technical-review": "Available following technical review",
};

export const capabilityStatusExplanations: Record<CapabilityStatus, string> = {
  "in-house":
    "Production for this category runs on equipment operated by Textileways.",
  "audited-partner":
    "Production runs at a partner facility that Textileways audits and supervises.",
  "developed-and-sourced":
    "Textileways develops the specification and sources production against it.",
  "after-technical-review":
    "Feasibility, material availability and construction are confirmed before this is offered.",
};

/** A media slot. `src` points at a local asset in `public/images`. */
export interface MediaAsset {
  src: string;
  /** An empty alt string marks the image as decorative for assistive technology. */
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
  /** Object position, used for art direction on wide crops. */
  focal?: string;
  /** True when the asset is a documented stand in awaiting real photography. */
  isPlaceholder?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SeoFields {
  title: string;
  description: string;
}

export interface SpecRow {
  label: string;
  value: string;
  /** Optional qualifier explaining that a value depends on the specification. */
  note?: string;
}

/* -------------------------------------------------------------------------- */
/* Products                                                                    */
/* -------------------------------------------------------------------------- */

export interface ProductType {
  name: string;
  description: string;
}

export interface ProductFamily {
  slug: string;
  name: string;
  /** One line summary used on cards and in navigation. */
  summary: string;
  /** Editorial introduction, two to four paragraphs. */
  introduction: string[];
  capabilityStatus: CapabilityStatus;
  hero: MediaAsset;
  gallery: MediaAsset[];
  productTypes: ProductType[];
  typicalMaterials: string[];
  weightGuidance: SpecRow[];
  constructionOptions: string[];
  decorationOptions: string[];
  labellingAndPackaging: string[];
  moqGuidance: string;
  samplingGuidance: string;
  qualityNotes: string[];
  marketNotes: string[];
  relatedCapabilities: string[];
  relatedMaterials: string[];
  relatedIndustries: string[];
  faqIds: string[];
  seo: SeoFields;
  /** Filter facets used by the products hub. */
  facets: {
    industries: string[];
    materialTypes: string[];
    decoration: string[];
    markets: string[];
  };
}

/* -------------------------------------------------------------------------- */
/* Capabilities                                                                */
/* -------------------------------------------------------------------------- */

export type CapabilityGroup =
  | "development"
  | "materials"
  | "manufacturing"
  | "decoration"
  | "finishing"
  | "assurance";

export const capabilityGroupLabels: Record<CapabilityGroup, string> = {
  development: "Design and development",
  materials: "Materials and sourcing",
  manufacturing: "Manufacturing",
  decoration: "Decoration",
  finishing: "Finishing and presentation",
  assurance: "Quality and logistics",
};

export interface ProcessStage {
  title: string;
  description: string;
}

export interface Capability {
  slug: string;
  name: string;
  group: CapabilityGroup;
  summary: string;
  introduction: string[];
  verification: VerificationStatus;
  capabilityStatus: CapabilityStatus;
  processStages: ProcessStage[];
  suitableProducts: string[];
  materialCompatibility: string[];
  techniques: string[];
  limitations: string[];
  qualityCheckpoints: string[];
  relatedMaterials: string[];
  faqIds: string[];
  seo: SeoFields;
}

/* -------------------------------------------------------------------------- */
/* Materials                                                                   */
/* -------------------------------------------------------------------------- */

export type MaterialGroup =
  | "natural-fibers"
  | "synthetic-and-performance"
  | "knitted-fabrics"
  | "woven-fabrics"
  | "recycled-and-lower-impact";

export const materialGroupLabels: Record<MaterialGroup, string> = {
  "natural-fibers": "Natural fibers",
  "synthetic-and-performance": "Synthetic and performance fibers",
  "knitted-fabrics": "Knitted fabrics",
  "woven-fabrics": "Woven fabrics",
  "recycled-and-lower-impact": "Recycled and lower impact materials",
};

export interface Material {
  slug: string;
  name: string;
  group: MaterialGroup;
  summary: string;
  introduction: string[];
  composition: string;
  gsmGuidance: string;
  handFeel: string;
  stretch: string;
  breathability: string;
  applications: string[];
  printCompatibility: string;
  embroideryCompatibility: string;
  washConsiderations: string;
  moqConsiderations: string;
  certificationOptions: string[];
  relatedProducts: string[];
  seo: SeoFields;
}

/* -------------------------------------------------------------------------- */
/* Industries and markets                                                      */
/* -------------------------------------------------------------------------- */

export interface Industry {
  slug: string;
  name: string;
  summary: string;
  introduction: string[];
  buyerPriorities: string[];
  typicalProducts: string[];
  relevantCapabilities: string[];
  complianceNotes: string[];
  faqIds: string[];
  seo: SeoFields;
}

export interface Market {
  slug: string;
  name: string;
  summary: string;
  introduction: string[];
  buyerSupport: string[];
  documentation: string[];
  regulatoryAwareness: string[];
  logisticsNotes: string[];
  faqIds: string[];
  seo: SeoFields;
}

/* -------------------------------------------------------------------------- */
/* Editorial content                                                           */
/* -------------------------------------------------------------------------- */

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  hero: MediaAsset;
  sections: ArticleSection[];
  relatedProducts: string[];
  relatedCapabilities: string[];
  relatedMaterials: string[];
  faqIds: string[];
  seo: SeoFields;
}

/**
 * Case studies carry an explicit evidence status. Only "published" records may
 * be rendered publicly, and the fallback content in this repository contains
 * none, because no customer permission has been recorded.
 */
export type CaseStudyEvidenceStatus =
  | "published"
  | "awaiting-client-permission"
  | "internal-demo";

export interface CaseStudy {
  slug: string;
  title: string;
  clientName: string;
  clientVisible: boolean;
  industry: string;
  market: string;
  challenge: string[];
  solution: string[];
  process: string[];
  products: string[];
  materials: string[];
  quantity: string;
  results: string[];
  testimonial?: { quote: string; attribution: string };
  hero: MediaAsset;
  evidenceStatus: CaseStudyEvidenceStatus;
  publishedAt: string;
  seo: SeoFields;
}

/* -------------------------------------------------------------------------- */
/* Certificates                                                                */
/* -------------------------------------------------------------------------- */

export type CertificateStatus =
  | "active"
  | "expiring-soon"
  | "expired"
  | "pending-verification"
  | "hidden";

export interface Certificate {
  id: string;
  name: string;
  issuingOrganization: string;
  certificateNumber: string;
  facility: string;
  scope: string;
  issuedOn: string;
  expiresOn: string;
  verificationUrl?: string;
  documentPath?: string;
  status: CertificateStatus;
  publiclyVisible: boolean;
}

/* -------------------------------------------------------------------------- */
/* Team                                                                        */
/* -------------------------------------------------------------------------- */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  biography: string;
  photo?: MediaAsset;
  linkedIn?: string;
  publiclyVisible: boolean;
}
