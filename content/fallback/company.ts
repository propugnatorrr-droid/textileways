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
    title: "Enterprise programmes",
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
      "Every product family states whether it is manufactured in house, through an audited partner facility, sourced against a Textileways specification, or available following technical review.",
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
    title: "Export experience into the USA and Europe",
    description:
      "Labelling conventions, sizing expectations and documentation requirements differ by market, and are confirmed with you rather than assumed.",
  },
] as const;

export const aboutNarrative = {
  intro: [
    "Textileways is a textile and apparel manufacturer based in Pakistan, with more than twenty years of manufacturing experience, serving brands and organisations primarily in the United States and Europe.",
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
        "Every product family on this site states how it is produced: in house, through an audited partner facility, developed and sourced by Textileways, or available following technical review.",
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
