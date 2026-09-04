import { z } from "zod";
import {
  shortText,
  optionalShortText,
  longText,
  optionalLongText,
  emailField,
  optionalPhoneField,
  countryField,
  requiredConsent,
  optionalConsent,
} from "./shared";
import { antiSpamSchema } from "./rfq";
import { fileMetadataSchema } from "./files";
import { productSlugs } from "@/content/fallback/products";

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

export const contactSubjects = [
  "new-project",
  "existing-order",
  "materials-question",
  "certification-and-compliance",
  "partnership",
  "other",
] as const;

export const contactSubjectLabels: Record<(typeof contactSubjects)[number], string> = {
  "new-project": "A new project or product",
  "existing-order": "An existing order",
  "materials-question": "A materials or technical question",
  "certification-and-compliance": "Certification or compliance",
  partnership: "Partnership or supplier inquiry",
  other: "Something else",
};

export const contactFormSchema = z.object({
  name: shortText(80),
  email: emailField,
  company: shortText(120),
  country: countryField,
  subject: z.enum(contactSubjects, { message: "Select a subject" }),
  message: longText(20, 4000),
  privacyConsent: requiredConsent,
  marketingConsent: optionalConsent,
});

export const contactSubmissionSchema = contactFormSchema.merge(antiSpamSchema);

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

/* -------------------------------------------------------------------------- */
/* Sample request                                                              */
/* -------------------------------------------------------------------------- */

export const sampleTypes = [
  "fabric-swatches",
  "existing-stock-sample",
  "custom-development-sample",
  "not-sure",
] as const;

export const sampleTypeLabels: Record<(typeof sampleTypes)[number], string> = {
  "fabric-swatches": "Fabric swatches only",
  "existing-stock-sample": "An existing product sample",
  "custom-development-sample": "A custom development sample to my specification",
  "not-sure": "Not sure, please advise",
};

const productFamilyValues = productSlugs();

export const sampleRequestFormSchema = z.object({
  fullName: shortText(80),
  email: emailField,
  phone: optionalPhoneField,
  company: shortText(120),
  country: countryField,
  productFamily: z
    .string()
    .refine((value) => productFamilyValues.includes(value) || value === "not-listed", {
      message: "Select a product category",
    }),
  sampleType: z.enum(sampleTypes, { message: "Select the type of sample you need" }),
  hasTechPack: z.enum(["yes", "no", "partial"], {
    message: "Tell us whether you have a specification",
  }),
  materialPreference: optionalShortText(200),
  sizeRequired: shortText(80),
  colorRequired: shortText(120),
  decorationRequired: optionalLongText(1000),
  destinationCity: shortText(120),
  destinationCountry: countryField,
  requiredDate: z
    .string()
    .min(1, "Enter the date you need the sample by")
    .refine((value) => !Number.isNaN(new Date(value).getTime()), {
      message: "Enter a valid date",
    }),
  notes: optionalLongText(2000),
  attachments: z.array(fileMetadataSchema).max(10).default([]),
  privacyConsent: requiredConsent,
  designReviewConsent: requiredConsent,
  marketingConsent: optionalConsent,
});

export const sampleRequestSubmissionSchema = sampleRequestFormSchema.merge(antiSpamSchema);

export type SampleRequestFormValues = z.infer<typeof sampleRequestFormSchema>;
export type SampleRequestSubmission = z.infer<typeof sampleRequestSubmissionSchema>;
