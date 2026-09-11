/**
 * Narrative content for the company, manufacturing, quality and responsibility
 * pages. Written to the content integrity rules: no invented capacity figures,
 * no invented certifications, no customer claims, and every procedural statement
 * described as configurable rather than as a verified company standard.
 */

export const productionScaleSteps = [
  {
    quantity: "50",
    unit: "pieces",
    title: "Product validation",
    description:
      "Confirm fit, fabric and decoration before committing a season. The unit cost is higher and the information is worth it.",
  },
  {
    quantity: "250",
    unit: "pieces",
    title: "First collection",
    description:
      "A small range across a few styles and colourways, enough to test which pieces actually sell.",
  },
  {
    quantity: "1,000",
    unit: "pieces",
    title: "Growing demand",
    description:
      "Repeat orders on proven styles. Fabric moves from stock qualities toward committed quantities.",
  },
  {
    quantity: "10,000",
    unit: "pieces",
    title: "Wholesale growth",
    description:
      "Retail and wholesale distribution, with packing, ticketing and delivery scheduling becoming as important as the garment.",
  },
  {
    quantity: "100,000+",
    unit: "pieces",
    title: "Large scale production",
    description:
      "Committed material planning, scheduled shipments and inspection regimes agreed in advance.",
  },
] as const;

export const howItWorksStages = [
  {
    title: "Inquiry and technical review",
    description:
      "You describe the product, the quantity and the market. We come back with the questions that have to be answered before a price means anything.",
  },
  {
    title: "Quotation",
    description:
      "A price against a written specification, with every assumption stated so you can see what would change it.",
  },
  {
    title: "Material selection",
    description:
      "Fabric options are proposed and approved on physical swatches rather than on a specification sheet.",
  },
  {
    title: "Sample development",
    description:
      "Proto and fit samples confirm construction and measurements against your chart.",
  },
  {
    title: "Sample approval",
    description:
      "A pre production sample made from bulk fabric, with final trims and packaging, is approved in writing.",
  },
  {
    title: "Production",
    description:
      "The line runs against the approved sample and the specification, with checks at defined operations.",
  },
  {
    title: "Quality control",
    description:
      "Inline checks, measurement audits and a final inspection against the standard agreed for your order.",
  },
  {
    title: "Packing and delivery",
    description:
      "Goods are packed to the agreed standard, audited, documented and shipped against the agreed Incoterm.",
  },
] as const;

export const homeCapabilityHighlights = [
  {
    title: "Product development",
    description: "Turning references and requirements into a manufacturable specification.",
    href: "/capabilities/product-design",
  },
  {
    title: "Material sourcing",
    description: "Fabric matched to end use, quantity and schedule, approved on physical swatches.",
    href: "/capabilities/material-sourcing",
  },
  {
    title: "Sampling",
    description: "Staged samples that resolve fit and construction before production is released.",
    href: "/capabilities/sample-development",
  },
  {
    title: "Manufacturing",
    description: "Cut and sew production against an approved sample, with inline checking.",
    href: "/capabilities/cut-and-sew-manufacturing",
  },
  {
    title: "Decoration",
    description: "Printing, embroidery and applied branding matched to the fabric and the artwork.",
    href: "/capabilities/screen-printing",
  },
  {
    title: "Private labelling",
    description: "Main labels, care labels and tagless branding applied under your own brand.",
    href: "/capabilities/private-labelling",
  },
  {
    title: "Quality assurance",
    description: "Checkpoints from incoming material through to the packing audit.",
    href: "/capabilities/quality-assurance",
  },
  {
    title: "International logistics",
    description: "Export documentation and freight coordination against agreed Incoterms.",
    href: "/capabilities/logistics-and-export",
  },
] as const;

export const qualityCheckpoints = [
  {
    title: "Material inspection",
    description:
      "Incoming fabric and trims are checked against the specification before anything is cut. Fabric faults found here cost metres; found later they cost garments.",
  },
  {
    title: "Pre production review",
    description:
      "The approved sample, the specification and the actual materials are reviewed together before the line starts, so discrepancies surface before output does.",
  },
  {
    title: "Cutting inspection",
    description:
      "Cut panels are measured against the pattern and shade lots are segregated, so a single garment never combines panels from different dye batches.",
  },
  {
    title: "Inline inspection",
    description:
      "Defined operations are checked during production. A problem caught at the operation that caused it is corrected in minutes rather than by reworking a lot.",
  },
  {
    title: "Measurement verification",
    description:
      "Garments are measured against the chart and its tolerances during the run, not only at the end.",
  },
  {
    title: "Finishing inspection",
    description:
      "Trimming, pressing, decoration placement and label positioning are checked after assembly is complete.",
  },
  {
    title: "Final random inspection",
    description:
      "Finished goods are inspected against the sampling plan and acceptance limits agreed for your order.",
  },
  {
    title: "Packing audit",
    description:
      "Cartons are checked for assortment, quantity, marking and ticketing before shipment, because a mispacked carton costs more to fix than it costs to prevent.",
  },
] as const;

export const manufacturingProcessStages = [
  {
    number: 1,
    title: "Product brief",
    buyerResponsibility: "Describe the product, end use, target market, quantity and any target price.",
    textilewaysResponsibility: "Read the brief and identify what is missing before quoting.",
    documents: ["Product description", "Reference images or garments"],
    decisionPoints: ["Whether the project is technically feasible at the stated quantity"],
    possibleDelays: ["Incomplete briefs requiring several rounds of clarification"],
    approvals: [],
  },
  {
    number: 2,
    title: "Non disclosure agreement",
    buyerResponsibility: "Provide your own agreement or request ours before sharing original designs.",
    textilewaysResponsibility: "Sign and return the agreement before original specifications are shared.",
    documents: ["Signed non disclosure agreement"],
    decisionPoints: ["Whether the project involves original design requiring protection"],
    possibleDelays: ["Legal review on either side"],
    approvals: ["Signed agreement before original artwork is exchanged"],
  },
  {
    number: 3,
    title: "Technical review",
    buyerResponsibility: "Answer construction and material questions, including where you are unsure.",
    textilewaysResponsibility: "Assess feasibility, identify constraints and propose construction options.",
    documents: ["Technical query list", "Construction options"],
    decisionPoints: ["Construction route", "Whether the target quantity is achievable"],
    possibleDelays: ["Fabric availability checks with mills"],
    approvals: [],
  },
  {
    number: 4,
    title: "Specification development",
    buyerResponsibility: "Supply a tech pack, or work with us to build one.",
    textilewaysResponsibility: "Produce or complete the specification, including measurements and tolerances.",
    documents: ["Tech pack", "Measurement chart with tolerances", "Bill of materials"],
    decisionPoints: ["Size range", "Tolerances", "Trim and label selection"],
    possibleDelays: ["Incomplete measurement charts"],
    approvals: ["Written approval of the specification before sampling"],
  },
  {
    number: 5,
    title: "Costing",
    buyerResponsibility: "Confirm quantity, colourway split and packaging requirements.",
    textilewaysResponsibility: "Quote against the specification with assumptions stated explicitly.",
    documents: ["Quotation with stated assumptions and validity period"],
    decisionPoints: ["Whether to proceed, adjust specification, or adjust quantity"],
    possibleDelays: ["Raw material price movement requiring requote"],
    approvals: ["Written acceptance of the quotation"],
  },
  {
    number: 6,
    title: "Material selection",
    buyerResponsibility: "Approve fabric and trims on physical swatches.",
    textilewaysResponsibility: "Source options, send swatches and confirm availability at your quantity.",
    documents: ["Swatch cards", "Colour references"],
    decisionPoints: ["Final fabric quality", "Colour standards"],
    possibleDelays: ["Swatch courier transit", "Fabric out of stock in the chosen colour"],
    approvals: ["Written swatch and colour approval"],
  },
  {
    number: 7,
    title: "Prototype or sample",
    buyerResponsibility: "Confirm the sampling schedule and pay any agreed sample charges.",
    textilewaysResponsibility: "Produce the proto sample and document how it was made.",
    documents: ["Proto sample", "Sample measurement report"],
    decisionPoints: ["Whether the construction direction is correct"],
    possibleDelays: ["Substitute fabric availability for proto stage"],
    approvals: [],
  },
  {
    number: 8,
    title: "Fit and construction feedback",
    buyerResponsibility: "Measure the sample and give written comments against specific points of measure.",
    textilewaysResponsibility: "Interpret comments, correct the pattern and confirm what will change.",
    documents: ["Written fit comments", "Revised measurement chart"],
    decisionPoints: ["Whether a further sample round is required"],
    possibleDelays: ["Verbal or imprecise feedback requiring clarification"],
    approvals: [],
  },
  {
    number: 9,
    title: "Revised sample",
    buyerResponsibility: "Review the revised sample against the previous comments.",
    textilewaysResponsibility: "Produce the corrected sample and record what changed.",
    documents: ["Revised sample", "Change record"],
    decisionPoints: ["Whether fit is approved or a further round is needed"],
    possibleDelays: ["Multiple correction rounds"],
    approvals: ["Fit approval in writing"],
  },
  {
    number: 10,
    title: "Pre production approval",
    buyerResponsibility: "Review and approve the pre production sample, including labels and packaging.",
    textilewaysResponsibility: "Produce a sample in bulk fabric with final trims and packaging.",
    documents: ["Pre production sample", "Approval record"],
    decisionPoints: ["Release to production"],
    possibleDelays: ["Bulk fabric not yet received"],
    approvals: ["Written pre production approval releases production"],
  },
  {
    number: 11,
    title: "Material procurement",
    buyerResponsibility: "Confirm the order and any agreed payment terms.",
    textilewaysResponsibility: "Procure fabric and trims and inspect them on receipt.",
    documents: ["Purchase confirmations", "Incoming inspection records"],
    decisionPoints: ["Action if a material fails incoming inspection"],
    possibleDelays: ["Mill lead times", "Dye batch scheduling"],
    approvals: [],
  },
  {
    number: 12,
    title: "Cutting",
    buyerResponsibility: "None at this stage.",
    textilewaysResponsibility: "Relax fabric, plan the marker, spread, cut and audit cut panels.",
    documents: ["Cutting records", "Panel measurement audit"],
    decisionPoints: ["Action if panels fall outside tolerance"],
    possibleDelays: ["Fabric faults reducing usable yield"],
    approvals: [],
  },
  {
    number: 13,
    title: "Manufacturing",
    buyerResponsibility: "Remain available for questions during the run.",
    textilewaysResponsibility: "Run a pilot, then bulk production against the approved sample.",
    documents: ["Production records", "Inline inspection records"],
    decisionPoints: ["Action on any deviation found during the run"],
    possibleDelays: ["Capacity conflicts", "Component shortages"],
    approvals: [],
  },
  {
    number: 14,
    title: "Decoration",
    buyerResponsibility: "Approve strike offs and sew outs before bulk decoration.",
    textilewaysResponsibility: "Produce strike offs, confirm placement and apply decoration to bulk.",
    documents: ["Strike off or sew out approval", "Placement records"],
    decisionPoints: ["Decoration method confirmation against the actual fabric"],
    possibleDelays: ["Artwork revisions after production has started"],
    approvals: ["Written strike off or sew out approval"],
  },
  {
    number: 15,
    title: "Inline quality control",
    buyerResponsibility: "Confirm the inspection standard for the order.",
    textilewaysResponsibility: "Check defined operations during the run and record results.",
    documents: ["Inline inspection records"],
    decisionPoints: ["Whether to stop the line for correction"],
    possibleDelays: ["Rework arising from an inline finding"],
    approvals: [],
  },
  {
    number: 16,
    title: "Finishing",
    buyerResponsibility: "None at this stage unless garment washing requires a standard check.",
    textilewaysResponsibility: "Trim, press, apply any wash process and complete finishing.",
    documents: ["Finishing records", "Post wash measurement records"],
    decisionPoints: ["Wash standard comparison where applicable"],
    possibleDelays: ["Wash batch scheduling"],
    approvals: [],
  },
  {
    number: 17,
    title: "Final inspection",
    buyerResponsibility: "Appoint a third party inspector if you intend to use one.",
    textilewaysResponsibility: "Inspect finished goods against the agreed sampling plan.",
    documents: ["Final inspection report"],
    decisionPoints: ["Accept the lot or define rework"],
    possibleDelays: ["Rework and re inspection", "Inspector scheduling"],
    approvals: ["Inspection acceptance before packing"],
  },
  {
    number: 18,
    title: "Packing",
    buyerResponsibility: "Confirm packing standard, assortment and carton marking.",
    textilewaysResponsibility: "Pack to the standard and audit cartons before dispatch.",
    documents: ["Packing list", "Packing audit record"],
    decisionPoints: ["Assortment or solid size carton packing"],
    possibleDelays: ["Late packaging material delivery"],
    approvals: [],
  },
  {
    number: 19,
    title: "Export documentation",
    buyerResponsibility: "Supply consignee details and any documentation your import requires.",
    textilewaysResponsibility: "Prepare commercial invoice, packing list and origin documentation.",
    documents: ["Commercial invoice", "Packing list", "Certificate of origin where required"],
    decisionPoints: ["Document set required by the destination"],
    possibleDelays: ["Missing consignee or importer details"],
    approvals: ["Document review before dispatch"],
  },
  {
    number: 20,
    title: "Delivery",
    buyerResponsibility: "Handle clearance and duties per the agreed Incoterm.",
    textilewaysResponsibility: "Dispatch goods and release documents per the agreed terms.",
    documents: ["Bill of lading or air waybill"],
    decisionPoints: ["Freight mode against the delivery date"],
    possibleDelays: ["Port congestion", "Carrier schedule changes"],
    approvals: [],
  },
  {
    number: 21,
    title: "Reorder and scaling",
    buyerResponsibility: "Place reorders against the recorded specification version.",
    textilewaysResponsibility: "Produce against the retained approved sample and flag any material change.",
    documents: ["Retained approved sample", "Specification version record"],
    decisionPoints: ["Whether quantity changes require a different material route"],
    possibleDelays: ["Fabric or trim discontinuation requiring re approval"],
    approvals: ["Re approval where a material or component has changed"],
  },
] as const;

export const sustainabilityApproach = [
  {
    title: "Material choices",
    description:
      "Recycled and organic material options are available where a certified supply chain can be evidenced. Where it cannot, we say so rather than allowing an unsupported claim onto a label.",
    status: "Approach described. No measured outcomes are published because none have been independently verified.",
  },
  {
    title: "Waste handling",
    description:
      "Cutting waste is segregated at source. Marker planning is used to improve fabric utilisation, which reduces waste before it is created rather than managing it afterwards.",
    status: "Approach described. Waste reduction percentages require a measurement method and reporting period before publication.",
  },
  {
    title: "Packaging reduction",
    description:
      "Reduced and paper based packaging alternatives are offered where the distribution route supports them. Packaging is specified per programme rather than applied by default.",
    status: "Options available. Uptake is a buyer decision made per programme.",
  },
  {
    title: "Water and energy",
    description:
      "Wet processing is the most resource intensive stage of textile production. Where a specification allows a lower impact finishing route, it is proposed alongside the conventional one.",
    status: "Approach described. Consumption figures are not published because none have been measured and verified.",
  },
  {
    title: "Worker wellbeing",
    description:
      "Working conditions and treatment of staff are a legitimate buyer question. We support buyer audits and provide the information an audit requires.",
    status: "Audit support available. No social compliance certification is claimed because none has been supplied for publication.",
  },
  {
    title: "Ethical sourcing",
    description:
      "Where production runs through a partner facility, that is stated on the relevant product pages rather than obscured. Buyers are told where their product is made.",
    status: "Disclosure policy in effect across all product pages.",
  },
  {
    title: "Traceability",
    description:
      "Material origin and processing steps are recorded during development, so a buyer asking where a fabric came from receives an answer from records rather than an estimate.",
    status: "Records maintained per project and available on request.",
  },
  {
    title: "Improvement targets",
    description:
      "Targets are only meaningful with a baseline, a method and a reporting period. None are published here because no baseline has been independently established.",
    status: "Not published. Publishing a target without a baseline would be a claim without evidence.",
  },
] as const;

export const responsibilityPrinciples = [
  {
    title: "We do not publish what we cannot evidence",
    description:
      "Capacity figures, employee numbers, delivery performance and defect rates are all absent from this website, because none of them has been measured and verified for publication. A number without a method behind it is not information.",
  },
  {
    title: "We say where a product is made",
    description:
      "Every product family states whether it is manufactured in house, through an audited partner facility, sourced against a TextileWays specification, or available following technical review.",
  },
  {
    title: "We separate approach from outcome",
    description:
      "Describing how we handle waste is a statement about process. Claiming a percentage reduction is a statement about outcome, and it requires evidence. This site publishes the first and withholds the second.",
  },
  {
    title: "We support buyer audits",
    description:
      "Buyers are entitled to verify what they are told. Third party inspection, buyer appointed quality agents and social compliance audits are supported rather than resisted.",
  },
] as const;

export const whyTextilewaysReasons = [
  {
    title: "One partner across the growth curve",
    description:
      "The reason most brands change manufacturer is not dissatisfaction. It is that they outgrew one, or shrank below one. Covering both ends of the range removes a supplier change from your growth plan.",
  },
  {
    title: "Category breadth under one relationship",
    description:
      "Apparel, uniforms, home textiles and accessories can be developed through the same relationship. Where a category runs through a partner facility, that is stated openly on the product page.",
  },
  {
    title: "Specification discipline at every quantity",
    description:
      "A fifty piece order goes through the same specification, approval and inspection structure as a fifty thousand piece order. The scale changes; the discipline does not.",
  },
  {
    title: "Honest constraints",
    description:
      "Minimum quantities, lead times and technical limits are stated as they actually are. A supplier who agrees to everything at the inquiry stage disagrees with you later, at a worse moment.",
  },
  {
    title: "Buyer facing documentation",
    description:
      "Specifications, measurement charts, inspection records and export documentation are maintained as part of the job rather than assembled on request.",
  },
  {
    title: "Export experience into major international markets",
    description:
      "Labelling conventions, sizing expectations and documentation requirements differ by market, and are confirmed with you rather than assumed.",
  },
] as const;

export const aboutNarrative = {
  intro: [
    "TextileWays is a textile and apparel manufacturer based in Pakistan, with more than twenty years of manufacturing experience, serving brands and organisations primarily in the United States and Europe.",
    "The business exists to solve a specific problem: the gap between manufacturers who will only take large orders and those who can only handle small ones. A brand that starts at fifty pieces and grows to a hundred thousand normally has to change supplier at least twice on the way, losing fit, fabric consistency and colour standards each time.",
    "We are built to cover that whole range with the same specification discipline at each end of it.",
  ],
  approach: [
    {
      title: "Specification before production",
      description:
        "Nothing goes into production without a written specification and an approved pre production sample. That is what makes an order inspectable and a reorder repeatable.",
    },
    {
      title: "Questions before quotations",
      description:
        "A price given before the technical questions are answered is a guess. We ask first, which is slower at the inquiry stage and faster everywhere after it.",
    },
    {
      title: "Constraints stated openly",
      description:
        "Where a minimum quantity is set by a mill, or a lead time by a dye house, we say so. Buyers make better decisions when they know which constraints are ours and which are not.",
    },
    {
      title: "Records kept as standard",
      description:
        "Approved samples, colour standards, wash standards and specification versions are retained. They are the reason a second order matches the first.",
    },
  ],
} as const;

export const factoryNarrative = {
  intro: [
    "This page is built to show the working environment your product would be made in, rather than a set of stock photographs of an anonymous factory.",
    "The photography slots below are prepared and documented. Until the business supplies real images of its own facility, this page shows what will appear rather than substituting images of somewhere else, because a photograph of a different factory would be a false representation.",
  ],
  equipmentNote:
    "A verified equipment list, including machine types and counts, has not yet been supplied and is recorded as outstanding in the project content requirements. It will be published here once confirmed, rather than estimated.",
} as const;

export const traceabilityNarrative = {
  intro: [
    "Traceability means being able to answer a simple question: where did this come from. For a garment, that question applies to the fabric, the trims, the decoration and the facility that assembled it.",
    "We record that information during development rather than reconstructing it afterwards, which is the only way the answer stays accurate.",
  ],
  levels: [
    {
      title: "Facility disclosure",
      description:
        "Every product family on this site states how it is produced: in house, through an audited partner facility, developed and sourced by TextileWays, or available following technical review.",
    },
    {
      title: "Material origin",
      description:
        "Fabric supplier, quality reference and batch information are recorded per order and available to you on request.",
    },
    {
      title: "Component records",
      description:
        "Trims, labels and packaging components are recorded in the bill of materials with their suppliers.",
    },
    {
      title: "Certification chains",
      description:
        "Where a material carries an organic or recycled claim, the transaction certificates supporting that claim are the evidence. Without them, the claim is not made.",
    },
    {
      title: "Production records",
      description:
        "Cutting, production and inspection records are retained per order, and are what allow a question about a specific shipment to be answered later.",
    },
  ],
} as const;

/**
 * Added 2026-09-10 for /compliance/lksg. Legal status facts here are sourced
 * and dated in the page's own Sources section, not restated as evergreen
 * truths in this file, since transposition and threshold questions are
 * actively moving. What TextileWays itself can and cannot currently support
 * is drawn only from verified facts: no certification body is listed here
 * because content/fallback/certificates.ts is empty and every credential in
 * brand/entity.yml is status: unpublishable.
 */
export const lksgCsddNarrative = {
  intro: [
    "Two separate laws get discussed under this heading, on two different timelines. The German Supply Chain Due Diligence Act, LkSG, has been in force since 1 January 2023 and has applied to large employers since 1 January 2024. The EU Corporate Sustainability Due Diligence Directive, CSDDD, is a later, EU wide law with a longer runway: its Omnibus I amendment was published in the Official Journal on 26 February 2026 and entered into force on 18 March 2026, and no company is yet required to comply with it.",
    "Neither law obligates TextileWays directly. Both obligate the buyer, the company placing goods on the German or EU market, above a size threshold. What they change for a supplier is indirect: an obligated buyer has to run due diligence on its own supply chain, and a manufacturer that cannot support that process becomes a harder company to keep buying from, whatever the manufacturer's own legal exposure is.",
  ],
  sections: [
    {
      title: "Who the law actually obligates",
      paragraphs: [
        "LkSG applies to companies with their registered office, principal place of business, or administrative headquarters in Germany that employ at least 1,000 people. The threshold was 3,000 employees through 2023 and dropped to 1,000 from 1 January 2024.",
        "The amended CSDDD applies to companies with more than 5,000 employees and more than 1.5 billion euros in worldwide turnover, a scope the Omnibus I amendment narrowed down from roughly 13,000 companies under the original directive to roughly 6,000. Member States must transpose it into national law by 26 July 2028, and in scope companies must comply from 26 July 2029, with the Article 16 reporting obligation applying only from financial years starting on or after 1 January 2030.",
        "Germany has said it intends to eventually replace LkSG with a national law implementing CSDDD, but as of this page's last review, the final text and whether it will align exactly to the CSDDD's higher employee and turnover threshold had not been confirmed. Until a replacement law is passed, LkSG's existing 1,000 employee threshold is what is actually in force.",
        "A buyer below both thresholds is not legally obligated by either law, though a parent company, an investor or a voluntary code of conduct can still ask a supplier for the same kind of information.",
      ],
    },
    {
      title: "What a buyer in scope will actually ask for",
      paragraphs: [
        "In practice, an obligated buyer's own risk analysis usually reaches into its supply chain as a set of concrete requests to a manufacturer, not a certificate to produce once and forget: a supplier declaration or code of conduct acknowledgement, visibility into who actually makes the product and where, cooperation with a human rights and environmental risk questionnaire, and a way to raise and track a corrective action if the buyer's own review finds something.",
        "None of this requires a manufacturer to hold a specific certification. It requires the manufacturer to be able to answer questions accurately and to cooperate with the buyer's process, which is a different, more basic bar than passing a named audit scheme.",
      ],
    },
    {
      title: "What TextileWays can support today, stated honestly",
      paragraphs: [
        "TextileWays does not currently hold a verified third party social or environmental compliance certification. No certification is published on this site because none has been supplied and confirmed; see /certifications for the current, empty registry and why it stays that way until evidence exists.",
        "What is genuinely in place: material origin and specification records are maintained per order from development onward, not assembled after the fact, described in full on /traceability. That is the kind of record a buyer's own risk analysis process typically needs from a supplier, independent of whether a named certification scheme is also involved.",
        "If your due diligence process requires a specific audit, such as BSCI, Sedex SMETA or a similar scheme, say so when you request a quote. We will tell you plainly whether that can be arranged for your order, rather than implying it is already in place.",
      ],
    },
  ],
  sources: [
    {
      label: "Council of the EU, press release on the Omnibus I Directive",
      detail: "Published 24 February 2026, confirming Council approval of the CSDDD and CSRD amendments.",
    },
    {
      label: "Official Journal of the European Union, Omnibus I Directive",
      detail: "Published 26 February 2026; entered into force 18 March 2026.",
    },
    {
      label: "Regulatory and legal commentary on the Omnibus I text",
      detail: "Reviewed November 2025 to February 2026 sources confirming the 5,000 employee and 1.5 billion euro turnover CSDDD scope threshold, the 26 July 2028 transposition deadline, the 26 July 2029 application date, and the 1 January 2030 start for Article 16 reporting.",
    },
    {
      label: "Regulatory commentary on LkSG's current scope",
      detail: "Reviewed as of November 2025, confirming the 1,000 employee threshold in force since 1 January 2024 and that Germany's intended CSDDD implementing law, including its exact threshold, was not yet finalised.",
    },
  ],
} as const;

/**
 * Added 2026-09-10 for /markets/germany. Deliberately not modelled as a fifth
 * entry in `markets` (content/fallback/markets.ts): Germany is an EU member
 * state already covered by /markets/europe, and giving it the identical
 * five field template used for the USA, EU, UK and Australia pages, with
 * only the country name changed, is exactly the doorway pattern the site
 * owner flagged. This page instead states its relationship to /markets/europe
 * explicitly and covers only what is genuinely additional for a German buyer:
 * LkSG (see /compliance/lksg for the full explanation) and Germany specific
 * language and logistics detail. It is deliberately shorter than the other
 * four market pages, not a parallel copy of them.
 */
export const germanyMarketNarrative = {
  intro: [
    "Germany is a European Union member state, so everything on /markets/europe, sizing conventions, fibre composition labelling, restricted substance testing coordination, applies in full to a German buyer. This page does not repeat that content. It covers what is genuinely additional for Germany specifically.",
    "The one requirement that is actually different, not just relabelled, is due diligence law. LkSG has applied to large German employers since 1 January 2024, ahead of the EU wide CSDDD, which does not apply to any company yet. A German buyer above the employee threshold may already be asking suppliers questions that a buyer elsewhere in the EU is not yet obligated to ask.",
  ],
  sections: [
    {
      title: "Due diligence: read this if your buyer has 1,000 or more employees",
      paragraphs: [
        "LkSG obligates the buyer, not TextileWays. If your company is in scope, your own risk analysis process is likely to ask a supplier for a declaration or code of conduct acknowledgement, visibility into who actually makes the product and where, and cooperation with a risk questionnaire and any corrective action process.",
        "The full explanation, current thresholds with dated sources, and what TextileWays can support today, stated honestly rather than implied, is on /compliance/lksg. Read that page before your first inquiry if your company is in scope.",
      ],
    },
    {
      title: "Language and logistics specifics for Germany",
      paragraphs: [
        "EU textile labelling law lets each member state require its own official language on the fibre content label. For goods sold in Germany, that means German language wording, prepared to the exact text you confirm rather than a generic translation.",
        "Hamburg and Bremerhaven are the primary container ports for ocean freight into Germany, and transit times through them are planned into the production schedule alongside the sea or air freight decision described on /markets/europe.",
      ],
    },
  ],
} as const;

/**
 * Added 2026-09-10 for /resources/finding-a-clothing-manufacturer-in-pakistan.
 * A deliberately vendor neutral buyer's guide: general sourcing due diligence
 * practice that applies to evaluating any manufacturer, not specific to or
 * promoting TextileWays. The page built from this content carries no
 * "Request a Quote" call to action and no related-products cross linking,
 * only a small, honest disclosure that TextileWays publishes it.
 */
export const findingAManufacturerGuide = {
  intro: [
    "Pakistan is one of a handful of countries with a full, vertically capable textile and apparel export base: cotton growing and spinning, knitting and weaving, dyeing and finishing, cut and sew manufacturing, and established export logistics, concentrated mainly around Karachi, Lahore, Faisalabad and Sialkot. That base includes both genuine factories and businesses that present themselves as factories while actually subcontracting or trading. The due diligence questions below apply whichever country you are sourcing from, and they apply equally to evaluating this website's own publisher.",
  ],
  sections: [
    {
      title: "Confirm you are talking to a factory, not a trading company",
      paragraphs: [
        "A trading company can be a legitimate part of how you source, but you should know which one you are dealing with. Ask directly which stages of production happen on the supplier's own premises, and ask for a live video call showing the actual production floor, not stock photography or a company profile PDF. A real manufacturer answers specific questions about machine types and line capacity without hesitation, because that information is operational reality, not a trade secret.",
        "A registered business name and a professional website do not confirm manufacturing capability by themselves. Neither does a claim of ISO or social compliance certification: ask for the certificate number and the issuing body, and verify it independently against the certification body's own registry rather than accepting a logo on a page.",
      ],
    },
    {
      title: "Get a sample before you commit to a bulk order",
      paragraphs: [
        "A pre production sample matched exactly to your specification, not a similar stock item, is the single most reliable signal of whether a supplier can actually produce what you have asked for. Expect to pay for the sample and its courier cost; a supplier offering a bulk order with no sample step, or offering a free sample with no clear production timeline, is a signal to slow down rather than a favour.",
        "Compare the returned sample against your original specification line by line: fabric, construction, measurements, and any decoration. A supplier who explains a deviation and proposes a fix is behaving normally. A supplier who is defensive about a deviation, or who ships the bulk order without addressing it, is not.",
      ],
    },
    {
      title: "Get minimum order quantity and lead time in writing",
      paragraphs: [
        "MOQ and lead time should be quoted against your actual specification, not as a single number that applies to every product regardless of material, colour count, or decoration method. A number that never changes no matter what you ask for is usually a marketing figure rather than an operational one.",
        "Ask what the lead time is measured from: sample approval, deposit receipt, or purchase order date all produce different real delivery dates for the same stated number of days. Get that starting point confirmed in writing alongside the number itself.",
      ],
    },
    {
      title: "Understand normal payment terms before you are asked for money",
      paragraphs: [
        "A deposit against the purchase order, with the balance due before or against shipping documents, is standard practice across most apparel manufacturing regions, Pakistan included. The exact split is negotiable and varies by supplier and order size. A request for full payment upfront, with no deposit and balance structure at all, is unusual enough to ask about directly before proceeding.",
        "For a first order with a new supplier, consider whether an escrow service, a trade assurance mechanism, or a smaller validation quantity reduces your risk while you build a payment history with them, rather than accepting whatever terms are offered on the first quotation.",
      ],
    },
  ],
  checklist: [
    "Which stages of production happen on your own premises, and which are subcontracted?",
    "Can I see your production floor on a live video call this week?",
    "What is the certificate number and issuing body for any certification you hold?",
    "What does your MOQ and lead time depend on, and what changes them?",
    "What is your lead time measured from: deposit, sample approval, or purchase order?",
    "What is your standard deposit and balance payment structure?",
    "What happens if the bulk shipment does not match the approved sample?",
    "Who is my point of contact during production, and how do delays get communicated?",
  ],
  whereToLook: [
    "Established B2B sourcing platforms and industry directories, cross checked against the supplier's own claims rather than taken as verification by themselves.",
    "Trade shows and buying missions, where you can meet a supplier and, often, see samples in person before any commitment.",
    "Referrals from other buyers in your product category, who can describe their own experience with lead time accuracy and how issues were actually handled.",
    "Independent sourcing agents, useful for a first time buyer unfamiliar with a country's manufacturing landscape, for a fee or commission you should have quoted upfront.",
    "Direct outreach to manufacturers whose product range and stated capability genuinely match your product, rather than a mass inquiry sent to every result on a page.",
  ],
} as const;
