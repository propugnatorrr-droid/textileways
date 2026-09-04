import {
  siteSettings,
  productCategory,
  capability,
  material,
  caseStudy,
  article,
  certificate,
  faq,
  teamMember,
  industry,
  market,
} from "./documents";

/**
 * Every document type, ready to register in a Sanity Studio.
 *
 * In `sanity.config.ts`:
 *
 *   import { schemaTypes } from "./sanity/schemas";
 *   export default defineConfig({ schema: { types: schemaTypes }, ... });
 */
export const schemaTypes = [
  siteSettings,
  productCategory,
  capability,
  material,
  industry,
  market,
  caseStudy,
  article,
  certificate,
  faq,
  teamMember,
];

export {
  siteSettings,
  productCategory,
  capability,
  material,
  caseStudy,
  article,
  certificate,
  faq,
  teamMember,
  industry,
  market,
};

/** Document type names, used by the revalidation webhook and by tests. */
export const documentTypeNames = schemaTypes.map((type) => type.name);
