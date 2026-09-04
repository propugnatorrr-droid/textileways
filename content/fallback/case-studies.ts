import type { CaseStudy } from "@/content/types";

/**
 * Case studies.
 *
 * This list is intentionally empty of published records.
 *
 * No customer has given written permission to be named, and no project results
 * have been evidenced, so publishing a case study here would mean fabricating a
 * customer story. The content model, the page template and the query layer are
 * complete and tested, so a real case study can be published by adding a record
 * with `evidenceStatus: "published"` here, or from Sanity, with no code change.
 *
 * Until then, /case-studies renders an educational project process page instead,
 * exactly as the brief requires.
 */
export const caseStudies: CaseStudy[] = [];

/** Only records with published evidence are ever rendered publicly. */
export function publishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((study) => study.evidenceStatus === "published");
}

export function getPublishedCaseStudy(slug: string): CaseStudy | undefined {
  return publishedCaseStudies().find((study) => study.slug === slug);
}

export function publishedCaseStudySlugs(): string[] {
  return publishedCaseStudies().map((study) => study.slug);
}

/**
 * The educational replacement shown while no evidenced case study exists.
 * This describes how a project runs. It is not a customer story and it names
 * no client, no quantity achieved and no result.
 */
export const projectProcessNarrative = {
  eyebrow: "How a project runs",
  heading: "What a manufacturing project looks like from the buyer's side",
  intro:
    "We do not publish customer case studies without written permission from the customer and evidence for every figure quoted. Until a customer agrees to that, this page describes how a project actually runs instead, which is more useful to a buyer deciding whether to start one.",
  phases: [
    {
      title: "Before you contact us",
      buyerView:
        "You have a product idea, a reference garment or an existing style that needs a new supplier. You may not have a tech pack, and that is normal at this stage.",
      whatHelps: [
        "A clear description of the product and its end use",
        "Reference garments or images, including what you like and dislike about them",
        "A target quantity, even an approximate one",
        "Your target market and rough price position",
      ],
    },
    {
      title: "Technical review",
      buyerView:
        "We read what you sent and come back with questions rather than a price. The questions are the useful part: they surface the decisions that have not been made yet.",
      whatHelps: [
        "Answering fabric and construction questions honestly, including where you are unsure",
        "Telling us your delivery date early, since it constrains everything else",
        "Saying if a target price has to be met, so options are proposed against it",
      ],
    },
    {
      title: "Quotation",
      buyerView:
        "You receive a price against a written specification, with the assumptions stated. If an assumption is wrong, the price changes, which is why they are listed rather than hidden.",
      whatHelps: [
        "Reading the assumptions rather than only the number",
        "Confirming quantity and colourway split, since both affect the price",
        "Raising anything that looks different from what you expected",
      ],
    },
    {
      title: "Sampling",
      buyerView:
        "You receive physical samples in stages and comment on each one. This is where a project is genuinely won or lost, and where changes are still inexpensive.",
      whatHelps: [
        "Measuring the sample rather than judging it by eye",
        "Giving comments in writing against specific points of measure",
        "Wearing or testing the sample in the conditions the product will face",
      ],
    },
    {
      title: "Pre production approval",
      buyerView:
        "You approve a sample made from bulk fabric with final trims, labels and packaging. That approval releases production, and it is the reference everything is inspected against.",
      whatHelps: [
        "Checking labels and packaging as carefully as the garment itself",
        "Confirming the approval in writing",
        "Keeping your own copy of the approved sample",
      ],
    },
    {
      title: "Production and inspection",
      buyerView:
        "Production runs against the approved sample with checks during the run. You receive inspection information, and you can appoint your own inspector.",
      whatHelps: [
        "Agreeing the inspection standard before production starts",
        "Allowing schedule time for inspection and any rework it identifies",
        "Confirming packing and carton marking requirements early",
      ],
    },
    {
      title: "Delivery and reorder",
      buyerView:
        "Goods ship against the agreed Incoterm with the documentation the shipment needs. The approved sample and specification become the reference for the next order.",
      whatHelps: [
        "Confirming the destination and shipping term before production completes",
        "Telling us about any market feedback so the specification can be improved",
        "Placing reorders against the recorded version rather than a new brief",
      ],
    },
  ],
} as const;
