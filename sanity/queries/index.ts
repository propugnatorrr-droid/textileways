/**
 * GROQ queries.
 *
 * Two rules are enforced in the queries themselves rather than left to the
 * calling code, so a mistake in a page cannot leak unpublished content:
 *
 * 1. Every list and detail query filters on `publicationStatus == "published"`.
 * 2. Case studies additionally require `evidenceStatus == "published"`, and the
 *    client name is only projected when written permission is recorded.
 */

const PUBLISHED = `publicationStatus == "published"`;

const SEO_PROJECTION = `
  "seo": {
    "title": coalesce(seoTitle, name, title),
    "description": coalesce(seoDescription, shortDescription, summary)
  }
`;

const IMAGE_PROJECTION = `{
  "src": asset->url,
  "alt": coalesce(alt, ""),
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "focal": select(defined(hotspot) => "" + (hotspot.x * 100) + "% " + (hotspot.y * 100) + "%", null),
  caption,
  credit
}`;

/* -------------------------------------------------------------------------- */
/* Site settings                                                               */
/* -------------------------------------------------------------------------- */

export const siteSettingsQuery = `
*[_type == "siteSettings"][0]{
  companyName,
  legalEntityName,
  registrationNumber,
  tagline,
  description,
  contactEmail,
  contactPhone,
  whatsappNumber,
  offices[]{ label, addressLine, country, publiclyVisible },
  socialLinks[]{ label, url },
  primaryNavigation,
  footerColumns,
  defaultSeoTitle,
  defaultSeoDescription,
  announcement,
  rfqRecipients,
  showPendingClaims
}`;

/* -------------------------------------------------------------------------- */
/* Products                                                                    */
/* -------------------------------------------------------------------------- */

export const productListQuery = `
*[_type == "productCategory" && ${PUBLISHED}] | order(name asc){
  name,
  "slug": slug.current,
  "summary": shortDescription,
  capabilityStatus,
  "hero": heroMedia${IMAGE_PROJECTION},
  ${SEO_PROJECTION}
}`;

export const productSlugsQuery = `
*[_type == "productCategory" && ${PUBLISHED} && defined(slug.current)][].slug.current`;

export const productBySlugQuery = `
*[_type == "productCategory" && ${PUBLISHED} && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  "summary": shortDescription,
  "introduction": introduction[].children[].text,
  capabilityStatus,
  "hero": heroMedia${IMAGE_PROJECTION},
  "gallery": gallery[]${IMAGE_PROJECTION},
  productTypes[]{ name, description },
  "typicalMaterials": materials[]->slug.current,
  "weightGuidance": weightGuidance[]{ label, value, note },
  constructionOptions,
  "decorationOptions": decorationOptions[]->slug.current,
  labellingAndPackaging,
  moqGuidance,
  samplingGuidance,
  qualityNotes,
  marketNotes,
  "relatedCapabilities": relatedCapabilities[]->slug.current,
  "relatedIndustries": relatedIndustries[]->slug.current,
  "faqIds": faqs[]->_id,
  ${SEO_PROJECTION}
}`;

/* -------------------------------------------------------------------------- */
/* Capabilities                                                                */
/* -------------------------------------------------------------------------- */

export const capabilityListQuery = `
*[_type == "capability" && ${PUBLISHED}] | order(group asc, name asc){
  name,
  "slug": slug.current,
  group,
  summary,
  capabilityStatus,
  verificationStatus,
  ${SEO_PROJECTION}
}`;

export const capabilitySlugsQuery = `
*[_type == "capability" && ${PUBLISHED} && defined(slug.current)][].slug.current`;

export const capabilityBySlugQuery = `
*[_type == "capability" && ${PUBLISHED} && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  group,
  summary,
  "introduction": fullContent[].children[].text,
  capabilityStatus,
  "verification": verificationStatus,
  "processStages": processStages[]{ title, description },
  suitableProducts,
  techniques,
  limitations,
  "qualityCheckpoints": qualityChecks,
  "relatedMaterials": materials[]->slug.current,
  "faqIds": faqs[]->_id,
  ${SEO_PROJECTION}
}`;

/* -------------------------------------------------------------------------- */
/* Materials                                                                   */
/* -------------------------------------------------------------------------- */

export const materialListQuery = `
*[_type == "material" && ${PUBLISHED}] | order(name asc){
  name,
  "slug": slug.current,
  "group": materialGroup,
  summary,
  gsmGuidance,
  ${SEO_PROJECTION}
}`;

export const materialSlugsQuery = `
*[_type == "material" && ${PUBLISHED} && defined(slug.current)][].slug.current`;

export const materialBySlugQuery = `
*[_type == "material" && ${PUBLISHED} && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  "group": materialGroup,
  summary,
  "introduction": introduction[].children[].text,
  composition,
  gsmGuidance,
  handFeel,
  stretch,
  breathability,
  applications,
  printCompatibility,
  embroideryCompatibility,
  washConsiderations,
  moqConsiderations,
  certificationOptions,
  "relatedProducts": relatedProducts[]->slug.current,
  ${SEO_PROJECTION}
}`;

/* -------------------------------------------------------------------------- */
/* Industries and markets                                                      */
/* -------------------------------------------------------------------------- */

export const industryListQuery = `
*[_type == "industry" && ${PUBLISHED}] | order(name asc){
  name,
  "slug": slug.current,
  summary,
  ${SEO_PROJECTION}
}`;

export const industryBySlugQuery = `
*[_type == "industry" && ${PUBLISHED} && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  summary,
  "introduction": introduction[].children[].text,
  buyerPriorities,
  complianceNotes,
  "typicalProducts": typicalProducts[]->slug.current,
  "relevantCapabilities": relevantCapabilities[]->slug.current,
  "faqIds": faqs[]->_id,
  ${SEO_PROJECTION}
}`;

export const marketListQuery = `
*[_type == "market" && ${PUBLISHED}] | order(name asc){
  name,
  "slug": slug.current,
  summary,
  ${SEO_PROJECTION}
}`;

export const marketBySlugQuery = `
*[_type == "market" && ${PUBLISHED} && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  summary,
  "introduction": introduction[].children[].text,
  buyerSupport,
  documentation,
  regulatoryAwareness,
  logisticsNotes,
  "faqIds": faqs[]->_id,
  ${SEO_PROJECTION}
}`;

/* -------------------------------------------------------------------------- */
/* Articles                                                                    */
/* -------------------------------------------------------------------------- */

export const articleListQuery = `
*[_type == "article" && ${PUBLISHED}] | order(publishedAt desc){
  title,
  "slug": slug.current,
  summary,
  category,
  publishedAt,
  updatedAt,
  "hero": mainImage${IMAGE_PROJECTION},
  ${SEO_PROJECTION}
}`;

export const articleBySlugQuery = `
*[_type == "article" && ${PUBLISHED} && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  summary,
  category,
  publishedAt,
  updatedAt,
  "hero": mainImage${IMAGE_PROJECTION},
  body,
  "relatedProducts": relatedProducts[]->slug.current,
  "relatedCapabilities": relatedCapabilities[]->slug.current,
  "relatedMaterials": relatedMaterials[]->slug.current,
  "faqIds": faqs[]->_id,
  ${SEO_PROJECTION}
}`;

/* -------------------------------------------------------------------------- */
/* Case studies                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Only evidenced, permitted case studies are returned, and the client name is
 * projected as null unless written permission is on file. The safety catch lives
 * in the query, so no page can render an unevidenced customer story.
 */
export const caseStudyListQuery = `
*[_type == "caseStudy" && ${PUBLISHED} && evidenceStatus == "published"] | order(publishedAt desc){
  title,
  "slug": slug.current,
  "clientName": select(clientVisibilityPermission == true => clientName, null),
  "clientVisible": clientVisibilityPermission == true,
  "industry": industry->name,
  market,
  quantity,
  publishedAt,
  "hero": heroMedia${IMAGE_PROJECTION},
  ${SEO_PROJECTION}
}`;

export const caseStudyBySlugQuery = `
*[_type == "caseStudy" && ${PUBLISHED} && evidenceStatus == "published" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  "clientName": select(clientVisibilityPermission == true => clientName, null),
  "clientVisible": clientVisibilityPermission == true,
  "industry": industry->name,
  market,
  challenge,
  solution,
  process,
  "products": products[]->slug.current,
  "materials": materials[]->slug.current,
  quantity,
  results,
  testimonial{ quote, attribution },
  "hero": heroMedia${IMAGE_PROJECTION},
  evidenceStatus,
  publishedAt,
  ${SEO_PROJECTION}
}`;

/* -------------------------------------------------------------------------- */
/* Certificates and FAQs                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Certificates must carry an issuer and a number, be marked visible, and not be
 * expired. The status is still recomputed from the expiry date in application
 * code, so a stale `status` field cannot promote an expired certificate.
 */
export const publicCertificatesQuery = `
*[_type == "certificate"
  && publiclyVisible == true
  && defined(certificateNumber)
  && defined(issuingOrganization)
  && status in ["active", "expiring-soon"]
] | order(expiryDate asc){
  "id": _id,
  name,
  issuingOrganization,
  certificateNumber,
  facility,
  scope,
  "issuedOn": issueDate,
  "expiresOn": expiryDate,
  verificationUrl,
  "documentPath": document.asset->url,
  status,
  publiclyVisible
}`;

export const faqListQuery = `
*[_type == "faq" && ${PUBLISHED}]{
  "id": _id,
  question,
  answer,
  category
}`;

export const faqsByIdsQuery = `
*[_type == "faq" && ${PUBLISHED} && _id in $ids]{
  "id": _id,
  question,
  answer,
  category
}`;

export const teamMembersQuery = `
*[_type == "teamMember" && publiclyVisible == true] | order(name asc){
  "id": _id,
  name,
  role,
  biography,
  "photo": photograph${IMAGE_PROJECTION},
  linkedIn,
  publiclyVisible
}`;
