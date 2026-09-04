import { defineType, defineField, type ValidationRule } from "../lib/define";

/**
 * Sanity document schemas.
 *
 * These mirror the content model in `content/types`, so a document authored in
 * the Studio maps cleanly onto what the pages already render.
 *
 * Two conventions run through every schema:
 *
 * 1. Anything that makes a factual claim carries a verification status, and the
 *    query layer filters on it. An editor cannot publish an unverified claim by
 *    accident.
 * 2. Publication status is explicit rather than inferred from a draft, so a
 *    finished document can still be held back deliberately.
 */

const required = (Rule: ValidationRule) => Rule.required();

const seoFields = [
  defineField({
    name: "seoTitle",
    title: "SEO title",
    type: "string",
    group: "seo",
    description: "Up to about 60 characters. Falls back to the document title.",
    validation: (Rule: ValidationRule) => Rule.max(70),
  }),
  defineField({
    name: "seoDescription",
    title: "SEO description",
    type: "text",
    rows: 3,
    group: "seo",
    description: "Up to about 158 characters. Falls back to the summary.",
    validation: (Rule: ValidationRule) => Rule.max(180),
  } as never),
];

const publicationField = defineField({
  name: "publicationStatus",
  title: "Publication status",
  type: "string",
  group: "status",
  initialValue: "draft",
  options: {
    list: [
      { title: "Draft, not visible on the website", value: "draft" },
      { title: "Published", value: "published" },
      { title: "Archived", value: "archived" },
    ],
    layout: "radio",
  },
  validation: required,
});

const verificationField = defineField({
  name: "verificationStatus",
  title: "Verification status",
  type: "string",
  group: "status",
  initialValue: "pending",
  description:
    "Only verified records are presented as established fact. Pending records are described as confirmed on technical review.",
  options: {
    list: [
      { title: "Verified, evidence on file", value: "verified" },
      { title: "Pending verification", value: "pending" },
      { title: "Do not publish", value: "do-not-publish" },
    ],
    layout: "radio",
  },
  validation: required,
});

const capabilityStatusField = defineField({
  name: "capabilityStatus",
  title: "How this is produced",
  type: "string",
  group: "status",
  description:
    "Stated truthfully on the public page. Never select in house unless production genuinely runs on Textileways equipment.",
  options: {
    list: [
      { title: "Manufactured in house", value: "in-house" },
      { title: "Manufactured through an audited partner facility", value: "audited-partner" },
      { title: "Developed and sourced by Textileways", value: "developed-and-sourced" },
      { title: "Available following technical review", value: "after-technical-review" },
    ],
  },
  validation: required,
});

const standardGroups = [
  { name: "content", title: "Content", default: true },
  { name: "specification", title: "Specification" },
  { name: "relations", title: "Related content" },
  { name: "seo", title: "SEO" },
  { name: "status", title: "Status" },
];

/* -------------------------------------------------------------------------- */
/* Global settings                                                             */
/* -------------------------------------------------------------------------- */

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "identity", title: "Company identity", default: true },
    { name: "contact", title: "Contact" },
    { name: "navigation", title: "Navigation and footer" },
    { name: "seo", title: "Default SEO" },
    { name: "operations", title: "Operations" },
  ],
  fields: [
    defineField({ name: "companyName", type: "string", group: "identity", validation: required }),
    defineField({
      name: "legalEntityName",
      title: "Registered legal name",
      type: "string",
      group: "identity",
      description: "Used in the footer, the legal pages and Organization structured data.",
    }),
    defineField({ name: "registrationNumber", type: "string", group: "identity" }),
    defineField({ name: "tagline", type: "string", group: "identity" }),
    defineField({ name: "description", type: "text", rows: 3, group: "identity" }),
    defineField({
      name: "contactEmail",
      type: "string",
      group: "contact",
      validation: (Rule: ValidationRule) => Rule.email(),
    }),
    defineField({ name: "contactPhone", type: "string", group: "contact" }),
    defineField({
      name: "whatsappNumber",
      type: "string",
      group: "contact",
      description: "Include the country code. Drives the WhatsApp actions across the site.",
    }),
    defineField({
      name: "offices",
      title: "Offices and facilities",
      type: "array",
      group: "contact",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "addressLine", type: "text", rows: 3 },
            { name: "country", type: "string" },
            { name: "publiclyVisible", type: "boolean", initialValue: false },
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      group: "contact",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "url", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "primaryNavigation",
      type: "array",
      group: "navigation",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" },
            {
              name: "columns",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", type: "string" },
                    {
                      name: "links",
                      type: "array",
                      of: [
                        {
                          type: "object",
                          fields: [
                            { name: "label", type: "string" },
                            { name: "href", type: "string" },
                            { name: "description", type: "string" },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "footerColumns",
      type: "array",
      group: "navigation",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            {
              name: "links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", type: "string" },
                    { name: "href", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({ name: "defaultSeoTitle", type: "string", group: "seo" }),
    defineField({ name: "defaultSeoDescription", type: "text", rows: 3, group: "seo" }),
    defineField({
      name: "announcement",
      type: "object",
      group: "operations",
      fields: [
        { name: "enabled", type: "boolean", initialValue: false },
        { name: "message", type: "string" },
        { name: "href", type: "string" },
      ],
    }),
    defineField({
      name: "rfqRecipients",
      title: "RFQ notification recipients",
      type: "array",
      group: "operations",
      description:
        "Email addresses that receive new inquiries. Overrides the RFQ_TO_EMAIL environment variable when set.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "showPendingClaims",
      title: "Show claims pending verification",
      type: "boolean",
      group: "operations",
      initialValue: false,
      description:
        "Leave off in production. When off, only verified claims are presented as established fact.",
    }),
  ],
});

/* -------------------------------------------------------------------------- */
/* Product category                                                            */
/* -------------------------------------------------------------------------- */

export const productCategory = defineType({
  name: "productCategory",
  title: "Product family",
  type: "document",
  groups: standardGroups,
  fields: [
    defineField({ name: "name", type: "string", group: "content", validation: required }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: required,
    }),
    defineField({
      name: "shortDescription",
      title: "Summary",
      type: "text",
      rows: 2,
      group: "content",
      description: "One line, used on cards and in navigation.",
      validation: required,
    }),
    defineField({
      name: "introduction",
      title: "Full introduction",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
      validation: required,
    }),
    capabilityStatusField,
    defineField({ name: "heroMedia", type: "image", group: "content", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      type: "array",
      group: "content",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "productTypes",
      type: "array",
      group: "specification",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string" },
            { name: "description", type: "text", rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: "materials",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "material" }] }],
    }),
    defineField({
      name: "weightGuidance",
      title: "Typical weights",
      type: "array",
      group: "specification",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "value", type: "string" },
            { name: "note", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "constructionOptions",
      type: "array",
      group: "specification",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "decorationOptions",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "capability" }] }],
    }),
    defineField({
      name: "moqGuidance",
      title: "Minimum quantity guidance",
      type: "text",
      rows: 4,
      group: "specification",
      description:
        "Never publish a fixed minimum. State what the quantity depends on and that projects begin following technical review.",
      validation: required,
    }),
    defineField({
      name: "samplingGuidance",
      type: "text",
      rows: 4,
      group: "specification",
      validation: required,
    }),
    defineField({
      name: "labellingAndPackaging",
      type: "array",
      group: "specification",
      of: [{ type: "string" }],
    }),
    defineField({ name: "qualityNotes", type: "array", group: "specification", of: [{ type: "string" }] }),
    defineField({ name: "marketNotes", type: "array", group: "specification", of: [{ type: "string" }] }),
    defineField({
      name: "faqs",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
    defineField({
      name: "relatedCapabilities",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "capability" }] }],
    }),
    defineField({
      name: "relatedIndustries",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "industry" }] }],
    }),
    ...seoFields,
    publicationField,
  ],
  preview: {
    select: { title: "name", subtitle: "capabilityStatus", media: "heroMedia" },
  },
});

/* -------------------------------------------------------------------------- */
/* Capability                                                                  */
/* -------------------------------------------------------------------------- */

export const capability = defineType({
  name: "capability",
  title: "Capability",
  type: "document",
  groups: standardGroups,
  fields: [
    defineField({ name: "name", type: "string", group: "content", validation: required }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: required,
    }),
    defineField({
      name: "group",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Design and development", value: "development" },
          { title: "Materials and sourcing", value: "materials" },
          { title: "Manufacturing", value: "manufacturing" },
          { title: "Decoration", value: "decoration" },
          { title: "Finishing and presentation", value: "finishing" },
          { title: "Quality and logistics", value: "assurance" },
        ],
      },
      validation: required,
    }),
    defineField({ name: "summary", type: "text", rows: 2, group: "content", validation: required }),
    defineField({
      name: "fullContent",
      title: "Introduction",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "processStages",
      type: "array",
      group: "specification",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "description", type: "text", rows: 2 },
          ],
        },
      ],
    }),
    defineField({ name: "suitableProducts", type: "array", group: "specification", of: [{ type: "string" }] }),
    defineField({ name: "techniques", type: "array", group: "specification", of: [{ type: "string" }] }),
    defineField({
      name: "limitations",
      title: "Technical limitations",
      type: "array",
      group: "specification",
      description:
        "Required. A capability described without its limits will be misapplied to a product it does not suit.",
      of: [{ type: "string" }],
      validation: required,
    }),
    defineField({ name: "qualityChecks", type: "array", group: "specification", of: [{ type: "string" }] }),
    defineField({
      name: "media",
      type: "array",
      group: "content",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "materials",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "material" }] }],
    }),
    defineField({
      name: "faqs",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
    capabilityStatusField,
    verificationField,
    ...seoFields,
    publicationField,
  ],
  preview: { select: { title: "name", subtitle: "group" } },
});

/* -------------------------------------------------------------------------- */
/* Material                                                                    */
/* -------------------------------------------------------------------------- */

export const material = defineType({
  name: "material",
  title: "Material",
  type: "document",
  groups: standardGroups,
  fields: [
    defineField({ name: "name", type: "string", group: "content", validation: required }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: required,
    }),
    defineField({
      name: "materialGroup",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Natural fibers", value: "natural-fibers" },
          { title: "Synthetic and performance fibers", value: "synthetic-and-performance" },
          { title: "Knitted fabrics", value: "knitted-fabrics" },
          { title: "Woven fabrics", value: "woven-fabrics" },
          { title: "Recycled and lower impact materials", value: "recycled-and-lower-impact" },
        ],
      },
      validation: required,
    }),
    defineField({ name: "summary", type: "text", rows: 2, group: "content", validation: required }),
    defineField({ name: "introduction", type: "array", group: "content", of: [{ type: "block" }] }),
    defineField({ name: "composition", type: "string", group: "specification" }),
    defineField({
      name: "gsmGuidance",
      title: "Typical weight range",
      type: "string",
      group: "specification",
      description:
        "Always a range. The finished weight of a specific fabric is confirmed on the approved sample.",
    }),
    defineField({ name: "handFeel", type: "string", group: "specification" }),
    defineField({ name: "stretch", type: "string", group: "specification" }),
    defineField({ name: "breathability", type: "string", group: "specification" }),
    defineField({ name: "applications", type: "array", group: "specification", of: [{ type: "string" }] }),
    defineField({ name: "printCompatibility", type: "text", rows: 2, group: "specification" }),
    defineField({ name: "embroideryCompatibility", type: "text", rows: 2, group: "specification" }),
    defineField({ name: "washConsiderations", type: "text", rows: 2, group: "specification" }),
    defineField({ name: "moqConsiderations", type: "text", rows: 2, group: "specification" }),
    defineField({
      name: "certificationOptions",
      type: "array",
      group: "specification",
      description:
        "An option, not a certification held. A published claim requires a certified chain and current transaction certificates.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "relatedProducts",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "productCategory" }] }],
    }),
    verificationField,
    ...seoFields,
    publicationField,
  ],
  preview: { select: { title: "name", subtitle: "materialGroup" } },
});

/* -------------------------------------------------------------------------- */
/* Case study                                                                  */
/* -------------------------------------------------------------------------- */

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  groups: standardGroups,
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: required }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: required,
    }),
    defineField({ name: "clientName", type: "string", group: "content" }),
    defineField({
      name: "clientVisibilityPermission",
      title: "Written permission to name the client",
      type: "boolean",
      group: "status",
      initialValue: false,
      description:
        "Only tick this when written permission is on file. The client name is hidden on the public page unless this is true.",
    }),
    defineField({ name: "industry", type: "reference", group: "relations", to: [{ type: "industry" }] }),
    defineField({ name: "market", type: "string", group: "relations" }),
    defineField({ name: "challenge", type: "array", group: "content", of: [{ type: "string" }] }),
    defineField({ name: "solution", type: "array", group: "content", of: [{ type: "string" }] }),
    defineField({ name: "process", type: "array", group: "content", of: [{ type: "string" }] }),
    defineField({
      name: "products",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "productCategory" }] }],
    }),
    defineField({
      name: "materials",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "material" }] }],
    }),
    defineField({ name: "quantity", type: "string", group: "specification" }),
    defineField({
      name: "results",
      type: "array",
      group: "content",
      description: "Every figure quoted here must be evidenced. Do not estimate.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "testimonial",
      type: "object",
      group: "content",
      fields: [
        { name: "quote", type: "text", rows: 3 },
        { name: "attribution", type: "string" },
      ],
    }),
    defineField({ name: "heroMedia", type: "image", group: "content", options: { hotspot: true } }),
    defineField({
      name: "evidenceStatus",
      type: "string",
      group: "status",
      initialValue: "internal-demo",
      description:
        "Only records set to published are rendered publicly. This is the safety catch that prevents an unevidenced customer story reaching the site.",
      options: {
        list: [
          { title: "Published, permission and evidence on file", value: "published" },
          { title: "Awaiting client permission", value: "awaiting-client-permission" },
          { title: "Internal demo, never publish", value: "internal-demo" },
        ],
        layout: "radio",
      },
      validation: required,
    }),
    defineField({ name: "publishedAt", type: "datetime", group: "status" }),
    ...seoFields,
    publicationField,
  ],
  preview: { select: { title: "title", subtitle: "evidenceStatus", media: "heroMedia" } },
});

/* -------------------------------------------------------------------------- */
/* Article                                                                     */
/* -------------------------------------------------------------------------- */

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  groups: standardGroups,
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: required }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: required,
    }),
    defineField({ name: "summary", type: "text", rows: 3, group: "content", validation: required }),
    defineField({ name: "body", type: "array", group: "content", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "category", type: "string", group: "content" }),
    defineField({ name: "author", type: "reference", group: "content", to: [{ type: "teamMember" }] }),
    defineField({ name: "mainImage", type: "image", group: "content", options: { hotspot: true } }),
    defineField({
      name: "relatedProducts",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "productCategory" }] }],
    }),
    defineField({
      name: "relatedCapabilities",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "capability" }] }],
    }),
    defineField({
      name: "relatedMaterials",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "material" }] }],
    }),
    defineField({
      name: "faqs",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
    defineField({ name: "publishedAt", type: "datetime", group: "status", validation: required }),
    defineField({ name: "updatedAt", type: "datetime", group: "status" }),
    ...seoFields,
    publicationField,
  ],
  preview: { select: { title: "title", subtitle: "category", media: "mainImage" } },
});

/* -------------------------------------------------------------------------- */
/* Certificate                                                                 */
/* -------------------------------------------------------------------------- */

export const certificate = defineType({
  name: "certificate",
  title: "Certificate",
  type: "document",
  groups: [
    { name: "content", title: "Certificate", default: true },
    { name: "status", title: "Status" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "content", validation: required }),
    defineField({
      name: "issuingOrganization",
      type: "string",
      group: "content",
      description: "Required. A certificate with no issuer cannot be verified and is not displayed.",
      validation: required,
    }),
    defineField({
      name: "certificateNumber",
      type: "string",
      group: "content",
      description: "Required. A certificate with no number cannot be verified and is not displayed.",
      validation: required,
    }),
    defineField({
      name: "facility",
      type: "string",
      group: "content",
      description: "The specific facility the certificate covers.",
      validation: required,
    }),
    defineField({
      name: "scope",
      type: "text",
      rows: 3,
      group: "content",
      description: "What the certificate actually covers. Publishing without a scope invites a buyer to assume it covers everything.",
      validation: required,
    }),
    defineField({ name: "issueDate", type: "date", group: "content", validation: required }),
    defineField({ name: "expiryDate", type: "date", group: "content", validation: required }),
    defineField({ name: "verificationUrl", type: "url", group: "content" }),
    defineField({ name: "document", type: "file", group: "content" }),
    defineField({
      name: "status",
      type: "string",
      group: "status",
      initialValue: "pending-verification",
      description:
        "Status is recomputed from the expiry date when the page renders, so an expired certificate can never display as active.",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Expiring soon", value: "expiring-soon" },
          { title: "Expired", value: "expired" },
          { title: "Pending verification", value: "pending-verification" },
          { title: "Hidden", value: "hidden" },
        ],
      },
      validation: required,
    }),
    defineField({
      name: "publiclyVisible",
      type: "boolean",
      group: "status",
      initialValue: false,
    }),
  ],
  preview: { select: { title: "name", subtitle: "issuingOrganization" } },
});

/* -------------------------------------------------------------------------- */
/* FAQ, team, industry and market                                              */
/* -------------------------------------------------------------------------- */

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: required }),
    defineField({ name: "answer", type: "text", rows: 6, validation: required }),
    defineField({ name: "category", type: "string", validation: required }),
    defineField({
      name: "relatedPages",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            { type: "productCategory" },
            { type: "capability" },
            { type: "material" },
            { type: "industry" },
            { type: "market" },
          ],
        },
      ],
    }),
    publicationField,
  ],
  preview: { select: { title: "question", subtitle: "category" } },
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: required }),
    defineField({ name: "role", type: "string", validation: required }),
    defineField({ name: "biography", type: "text", rows: 4 }),
    defineField({ name: "photograph", type: "image", options: { hotspot: true } }),
    defineField({ name: "linkedIn", type: "url" }),
    defineField({
      name: "publiclyVisible",
      type: "boolean",
      initialValue: false,
      description: "Requires the individual's consent before their photograph and details are published.",
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photograph" } },
});

export const industry = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  groups: standardGroups,
  fields: [
    defineField({ name: "name", type: "string", group: "content", validation: required }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: required,
    }),
    defineField({ name: "summary", type: "text", rows: 2, group: "content", validation: required }),
    defineField({ name: "introduction", type: "array", group: "content", of: [{ type: "block" }] }),
    defineField({ name: "buyerPriorities", type: "array", group: "specification", of: [{ type: "string" }] }),
    defineField({
      name: "complianceNotes",
      type: "array",
      group: "specification",
      description:
        "Never state that a product complies. State what has to be confirmed and whose responsibility it is.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "typicalProducts",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "productCategory" }] }],
    }),
    defineField({
      name: "relevantCapabilities",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "capability" }] }],
    }),
    defineField({
      name: "faqs",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
    ...seoFields,
    publicationField,
  ],
  preview: { select: { title: "name" } },
});

export const market = defineType({
  name: "market",
  title: "Market",
  type: "document",
  groups: standardGroups,
  fields: [
    defineField({ name: "name", type: "string", group: "content", validation: required }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: required,
    }),
    defineField({ name: "summary", type: "text", rows: 2, group: "content", validation: required }),
    defineField({ name: "introduction", type: "array", group: "content", of: [{ type: "block" }] }),
    defineField({ name: "buyerSupport", type: "array", group: "specification", of: [{ type: "string" }] }),
    defineField({ name: "documentation", type: "array", group: "specification", of: [{ type: "string" }] }),
    defineField({
      name: "regulatoryAwareness",
      type: "array",
      group: "specification",
      description:
        "Awareness, never a guarantee of compliance. Responsibility remains with the brand placing the product on the market.",
      of: [{ type: "string" }],
    }),
    defineField({ name: "logisticsNotes", type: "array", group: "specification", of: [{ type: "string" }] }),
    defineField({
      name: "faqs",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
    ...seoFields,
    publicationField,
  ],
  preview: { select: { title: "name" } },
});
