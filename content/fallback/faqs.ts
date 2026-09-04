import type { FaqItem } from "@/content/types";

/**
 * Buyer questions answered without commercial promises.
 *
 * Nothing here states a fixed price, a fixed lead time or a guarantee. Where a
 * figure depends on the specification, the answer says so explicitly.
 */
export const faqs: FaqItem[] = [
  {
    id: "minimum-order",
    category: "Ordering",
    question: "What is the minimum order quantity?",
    answer:
      "Minimum order quantity depends on material availability, colour count, construction, decoration and packaging. Projects can begin from approximately 50 pieces per style following technical review. Where a fabric has to be knitted or dyed specifically for a project, the practical minimum is set by the mill rather than by us, and we tell you that before you commit.",
  },
  {
    id: "quantity-scale",
    category: "Ordering",
    question: "Can the same supplier handle both a 50 piece test and a 100,000 piece programme?",
    answer:
      "Yes. That is the reason Textileways exists in its current form. A validation run and an enterprise programme use the same specification discipline, the same approved sample and the same inspection points. The difference is material procurement, line planning and shipping method, not the standard applied to the product.",
  },
  {
    id: "lead-time",
    category: "Ordering",
    question: "How long does production take?",
    answer:
      "Lead time is quoted per project rather than published as a single figure. It is driven by fabric availability, dyeing, decoration method, quantity, the number of sample rounds and the destination. We give you an indicative schedule with the quotation and confirm dates once the pre production sample is approved.",
  },
  {
    id: "sampling",
    category: "Sampling",
    question: "How does sampling work?",
    answer:
      "Sampling normally runs in stages: a proto sample to confirm construction, a fit sample against your measurement chart, and a pre production sample that fixes fabric, colour, decoration, labelling and packaging. Each stage needs written approval before the next one starts. Sample charges and courier costs are quoted before work begins.",
  },
  {
    id: "tech-pack",
    category: "Sampling",
    question: "Do I need a tech pack before contacting you?",
    answer:
      "No. A tech pack makes quoting faster and more accurate, but a clear description, reference garments, target quantity and target market are enough to start. Where you do not have a specification, we can develop one with you and confirm it in writing before sampling.",
  },
  {
    id: "materials-choice",
    category: "Materials",
    question: "Can you recommend a fabric if I do not know what I need?",
    answer:
      "Yes. Tell us the end use, the target market, the handfeel you are aiming for, any performance requirement and your target price position. We propose fabric options with composition and weight ranges, and confirm the specific quality against a physical swatch before sampling.",
  },
  {
    id: "gsm-meaning",
    category: "Materials",
    question: "Why do you quote a GSM range rather than one figure?",
    answer:
      "GSM describes fabric weight in grams per square metre. The same nominal fabric can finish at different weights depending on yarn count, knit or weave structure, dyeing and finishing. We publish typical ranges for guidance and confirm the actual finished weight for your approved quality on the sample.",
  },
  {
    id: "decoration-options",
    category: "Decoration",
    question: "Which decoration methods should I choose?",
    answer:
      "It depends on the fabric, the artwork and the quantity. Screen printing suits solid colour artwork at volume. DTG and DTF suit detailed or low volume artwork. Sublimation works on polyester rich fabrics. Embroidery suits logos and durable branding. We confirm the method against your artwork and fabric during technical review rather than applying one method to everything.",
  },
  {
    id: "private-label",
    category: "Branding",
    question: "Can you produce under my own brand?",
    answer:
      "Yes. Private label production covers your main label, care and content labels, size labels, hangtags, barcodes and packaging. You supply the brand assets and the legally required care and fibre content information for your market, and we apply them to the approved specification.",
  },
  {
    id: "compliance",
    category: "Compliance",
    question: "Do you handle labelling requirements for the USA and Europe?",
    answer:
      "We build labelling into the specification and apply exactly what you approve, including fibre content, care symbols, country of origin and identification details. Responsibility for confirming what your market and your product category legally require stays with you as the brand owner. We flag anything that looks inconsistent before production.",
  },
  {
    id: "inspection",
    category: "Quality",
    question: "Can I send a third party inspector?",
    answer:
      "Yes. Third party inspection and buyer appointed quality agents are welcome. Tell us the inspection standard and the sampling plan you intend to apply so that the schedule allows time for inspection and, if needed, for rework before shipping.",
  },
  {
    id: "aql",
    category: "Quality",
    question: "What is AQL and does it apply to my order?",
    answer:
      "AQL is a statistical sampling method used to decide whether to accept or reject a production lot based on an inspected sample rather than every unit. The inspection level and acceptance limits are commercial decisions that vary by buyer and product. We agree the standard for your order in writing rather than assuming one.",
  },
  {
    id: "shipping-terms",
    category: "Logistics",
    question: "Which shipping terms do you work with?",
    answer:
      "We quote against recognised Incoterms so that responsibility for freight, insurance, duties and customs clearance is unambiguous. Tell us your preferred term and destination and the quotation is prepared on that basis. Where you have a nominated forwarder, we work with them.",
  },
  {
    id: "artwork-confidentiality",
    category: "Working together",
    question: "How is my design treated?",
    answer:
      "Files you submit are used to quote, sample and produce your order. They are shared internally and with the partners working on your project only to the extent needed to do that. A non disclosure agreement can be signed before you share a specification, and we recommend it for original product development.",
  },
  {
    id: "reorders",
    category: "Working together",
    question: "How do reorders work?",
    answer:
      "An approved pre production sample and the signed specification become the reference for repeat orders. Reorders are checked against that reference rather than reinterpreted, which is what keeps a second run consistent with the first. Where a fabric or trim has changed availability, we tell you before production instead of substituting quietly.",
  },
  {
    id: "existing-supplier",
    category: "Working together",
    question: "We already have a manufacturer. Why would we talk to you?",
    answer:
      "Most brands contact us for one of three reasons: their current supplier cannot go low enough for a new product test, cannot go high enough as volume grows, or cannot cover a category outside its core. You do not have to move an existing programme to start a conversation about a single new style.",
  },
];

const faqIndex = new Map(faqs.map((faq) => [faq.id, faq]));

/** Resolves FAQ ids to items, silently dropping ids that no longer exist. */
export function getFaqsByIds(ids: readonly string[]): FaqItem[] {
  return ids
    .map((id) => faqIndex.get(id))
    .filter((faq): faq is FaqItem => faq !== undefined);
}

/** FAQ categories in the order they should appear on the FAQ page. */
export function faqCategories(): string[] {
  return Array.from(new Set(faqs.map((faq) => faq.category)));
}
