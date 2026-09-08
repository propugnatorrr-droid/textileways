import { z } from "zod";
import { shortText, optionalShortText, optionalLongText, emailField, requiredConsent } from "./shared";
import { antiSpamSchema } from "./rfq";
import { productSlugs } from "@/content/fallback/products";

/**
 * Quick quote.
 *
 * A deliberately light alternative to the full RFQ: five fields rather than
 * seven steps, for a buyer who wants a starting response before committing to a
 * full specification. It routes to the same team through the same email
 * pipeline as every other form, tagged with its own reference prefix (EST) so
 * staff can see at a glance that the detail behind it is still thin.
 */

const productFamilyValues = productSlugs();

export const quickQuoteFormSchema = z.object({
  name: shortText(80),
  email: emailField,
  company: optionalShortText(120),
  productFamily: z
    .string()
    .refine((value) => productFamilyValues.includes(value) || value === "not-listed", {
      message: "Select a product category",
    }),
  estimatedQuantity: z.coerce
    .number({ message: "Enter an estimated quantity" })
    .int("Enter a whole number")
    .min(1, "Enter an estimated quantity")
    .max(10_000_000, "Enter a realistic quantity"),
  notes: optionalLongText(1000),
  privacyConsent: requiredConsent,
});

export const quickQuoteSubmissionSchema = quickQuoteFormSchema.merge(antiSpamSchema);

export type QuickQuoteFormValues = z.infer<typeof quickQuoteFormSchema>;
export type QuickQuoteSubmission = z.infer<typeof quickQuoteSubmissionSchema>;
