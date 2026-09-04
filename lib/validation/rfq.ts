import { z } from "zod";
import {
  shortText,
  optionalShortText,
  longText,
  optionalLongText,
  emailField,
  phoneField,
  optionalPhoneField,
  optionalUrlField,
  countryField,
  requiredConsent,
  optionalConsent,
  honeypotField,
  formTimestampField,
  buyerTypes,
  companyStages,
  shippingTerms,
} from "./shared";
import { fileMetadataSchema } from "./files";
import { productSlugs } from "@/content/fallback/products";

/**
 * RFQ schema.
 *
 * Split into one schema per step so the client can validate a single step
 * without demanding fields the buyer has not reached yet, and merged into a
 * single schema the server uses to validate the complete submission.
 */

/* -------------------------------------------------------------------------- */
/* Step 1: Buyer                                                               */
/* -------------------------------------------------------------------------- */

export const rfqBuyerSchema = z.object({
  fullName: shortText(80),
  email: emailField,
  phone: phoneField,
  whatsapp: optionalPhoneField,
  company: shortText(120),
  website: optionalUrlField,
  country: countryField,
  buyerType: z.enum(buyerTypes, { message: "Select the option that best describes you" }),
  companyStage: z.enum(companyStages, { message: "Select your company stage" }),
});

/* -------------------------------------------------------------------------- */
/* Step 2: Product                                                             */
/* -------------------------------------------------------------------------- */

const productFamilyValues = productSlugs();

export const rfqProductSchema = z.object({
  productFamily: z
    .string()
    .refine((value) => productFamilyValues.includes(value) || value === "not-listed", {
      message: "Select a product family",
    }),
  productType: shortText(160),
  styleCount: z.coerce
    .number({ message: "Enter the number of styles" })
    .int("Enter a whole number")
    .min(1, "Enter at least one style")
    .max(500, "For more than 500 styles, please describe the programme in the notes"),
  estimatedQuantity: z.coerce
    .number({ message: "Enter an estimated quantity" })
    .int("Enter a whole number")
    .min(1, "Enter an estimated quantity")
    .max(10_000_000, "Enter a realistic quantity"),
  colorwayCount: z.coerce
    .number({ message: "Enter the number of colourways" })
    .int("Enter a whole number")
    .min(1, "Enter at least one colourway")
    .max(100, "For more than 100 colourways, please describe the programme in the notes"),
  sizeRange: shortText(160),
  targetMarket: shortText(120),
  productDescription: longText(30, 4000),
});

/* -------------------------------------------------------------------------- */
/* Step 3: Materials                                                           */
/* -------------------------------------------------------------------------- */

export const rfqMaterialsSchema = z.object({
  knownMaterial: optionalShortText(160),
  composition: optionalShortText(160),
  weight: optionalShortText(120),
  stretchRequirement: optionalShortText(200),
  performanceRequirement: optionalLongText(1000),
  colorRequirement: optionalLongText(1000),
  needsMaterialRecommendation: z.boolean().optional().default(false),
});

/* -------------------------------------------------------------------------- */
/* Step 4: Customisation                                                       */
/* -------------------------------------------------------------------------- */

export const decorationOptions = [
  "screen-printing",
  "dtg",
  "dtf",
  "sublimation",
  "embroidery",
  "applique",
  "patches",
  "wash-treatments",
  "custom-labels",
  "hangtags",
  "barcodes",
  "custom-packaging",
  "other",
] as const;

export const decorationOptionLabels: Record<(typeof decorationOptions)[number], string> = {
  "screen-printing": "Screen printing",
  dtg: "DTG printing",
  dtf: "DTF printing",
  sublimation: "Sublimation",
  embroidery: "Embroidery",
  applique: "Applique",
  patches: "Patches and badges",
  "wash-treatments": "Wash treatments",
  "custom-labels": "Custom labels",
  hangtags: "Hangtags",
  barcodes: "Barcodes",
  "custom-packaging": "Custom packaging",
  other: "Other",
};

export const rfqCustomisationSchema = z.object({
  decoration: z.array(z.enum(decorationOptions)).max(decorationOptions.length).default([]),
  decorationNotes: optionalLongText(2000),
});

/* -------------------------------------------------------------------------- */
/* Step 5: Commercial                                                          */
/* -------------------------------------------------------------------------- */

export const rfqCommercialSchema = z.object({
  requiredDeliveryDate: z
    .string()
    .min(1, "Enter a required delivery date")
    .refine((value) => !Number.isNaN(new Date(value).getTime()), {
      message: "Enter a valid date",
    }),
  destinationCity: shortText(120),
  destinationCountry: countryField,
  shippingTerm: z.enum(shippingTerms, { message: "Select a shipping term" }),
  targetPrice: optionalShortText(80),
  sampleRequired: z.enum(["yes", "no", "not-sure"], {
    message: "Tell us whether you need a sample",
  }),
  supplierStatus: z.enum(["existing-supplier", "new-development", "both"], {
    message: "Select the option that applies",
  }),
  additionalNotes: optionalLongText(4000),
});

/* -------------------------------------------------------------------------- */
/* Step 6: Attachments                                                         */
/* -------------------------------------------------------------------------- */

export const rfqAttachmentsSchema = z.object({
  attachments: z.array(fileMetadataSchema).max(10).default([]),
});

/* -------------------------------------------------------------------------- */
/* Step 7: Consent                                                             */
/* -------------------------------------------------------------------------- */

export const rfqConsentSchema = z.object({
  privacyConsent: requiredConsent,
  designReviewConsent: requiredConsent,
  marketingConsent: optionalConsent,
});

/* -------------------------------------------------------------------------- */
/* Anti spam, applied server side only                                         */
/* -------------------------------------------------------------------------- */

export const antiSpamSchema = z.object({
  /** Hidden field. Any value indicates an automated submission. */
  companyRole: honeypotField,
  /** Milliseconds since epoch when the form was rendered. */
  formStartedAt: formTimestampField,
  /** Cloudflare Turnstile response, verified server side. */
  turnstileToken: z.string().max(4096).optional().default(""),
});

/* -------------------------------------------------------------------------- */
/* Composed schemas                                                            */
/* -------------------------------------------------------------------------- */

/** Client facing schema covering every visible field across all steps. */
export const rfqFormSchema = rfqBuyerSchema
  .merge(rfqProductSchema)
  .merge(rfqMaterialsSchema)
  .merge(rfqCustomisationSchema)
  .merge(rfqCommercialSchema)
  .merge(rfqAttachmentsSchema)
  .merge(rfqConsentSchema);

/** Server schema, which additionally requires the anti spam fields. */
export const rfqSubmissionSchema = rfqFormSchema.merge(antiSpamSchema);

export type RfqFormValues = z.infer<typeof rfqFormSchema>;
export type RfqSubmission = z.infer<typeof rfqSubmissionSchema>;

/** Per step schemas in order, used to validate a step before advancing. */
export const rfqStepSchemas = [
  rfqBuyerSchema,
  rfqProductSchema,
  rfqMaterialsSchema,
  rfqCustomisationSchema,
  rfqCommercialSchema,
  rfqAttachmentsSchema,
  rfqConsentSchema,
] as const;

export const rfqStepFields: readonly (readonly (keyof RfqFormValues)[])[] = [
  ["fullName", "email", "phone", "whatsapp", "company", "website", "country", "buyerType", "companyStage"],
  [
    "productFamily",
    "productType",
    "styleCount",
    "estimatedQuantity",
    "colorwayCount",
    "sizeRange",
    "targetMarket",
    "productDescription",
  ],
  [
    "knownMaterial",
    "composition",
    "weight",
    "stretchRequirement",
    "performanceRequirement",
    "colorRequirement",
    "needsMaterialRecommendation",
  ],
  ["decoration", "decorationNotes"],
  [
    "requiredDeliveryDate",
    "destinationCity",
    "destinationCountry",
    "shippingTerm",
    "targetPrice",
    "sampleRequired",
    "supplierStatus",
    "additionalNotes",
  ],
  ["attachments"],
  ["privacyConsent", "designReviewConsent", "marketingConsent"],
];

export const rfqStepTitles = [
  "Buyer",
  "Product",
  "Materials",
  "Customisation",
  "Commercial",
  "Attachments",
  "Review",
] as const;
