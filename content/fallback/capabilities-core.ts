import type { Capability } from "@/content/types";

/**
 * Capability records, part one: development, materials and manufacturing.
 *
 * `verification` is set to "pending" wherever a capability depends on equipment
 * or partner arrangements the business has not yet confirmed in writing. Pending
 * capabilities are still described, because a buyer is entitled to know what can
 * be discussed, but the page states plainly that scope is confirmed on review.
 */
export const coreCapabilities: Capability[] = [
  {
    slug: "product-design",
    name: "Product design",
    group: "development",
    summary:
      "Turning a commercial idea into a manufacturable garment, before any money is committed to fabric.",
    introduction: [
      "Most failed first orders are design problems rather than factory problems. A silhouette that photographs well can be impossible to grade across a size range, or can require a fabric that no mill will run at your quantity.",
      "Design work at this stage is about resolving those conflicts on paper. We work from your references, your target market and your price position, and return construction options with the consequences of each one stated openly.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Brief review", description: "References, target market, price position and quantity are reviewed together." },
      { title: "Construction options", description: "Two or three viable constructions are proposed with their cost and minimum quantity implications." },
      { title: "Specification draft", description: "The chosen direction is written down as a specification that sampling can work from." },
      { title: "Sign off", description: "You approve the specification in writing before sampling starts." },
    ],
    suitableProducts: ["Apparel", "Uniforms", "Accessories", "Home textiles"],
    materialCompatibility: ["Applies across all material groups"],
    techniques: ["Reference analysis", "Construction feasibility review", "Cost driven design decisions", "Size range planning"],
    limitations: [
      "Design work does not replace brand and market research, which stays with you.",
      "Original artwork and print design are quoted separately where they are required.",
    ],
    qualityCheckpoints: ["Specification completeness check before sampling is released"],
    relatedMaterials: ["cotton", "french-terry", "polyester"],
    faqIds: ["tech-pack", "materials-choice"],
    seo: {
      title: "Apparel product design and development",
      description:
        "Product design that resolves construction, material and cost conflicts before sampling starts, so a first order is manufacturable.",
    },
  },
  {
    slug: "tech-pack-development",
    name: "Tech pack development",
    group: "development",
    summary:
      "The written record that makes a garment repeatable. Without it, a reorder is a new development project.",
    introduction: [
      "A tech pack is the document that lets a different person, on a different line, in a different month, make the same garment. It records measurements and tolerances, fabric and trim, construction details, stitch types, labelling, artwork placement and packing.",
      "If you have one, we work to it. If you do not, we build one during sampling and you keep it. Either way, the approved tech pack becomes the reference against which production is inspected, which is what makes a dispute resolvable rather than a matter of opinion.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Measurement chart", description: "Points of measure and tolerances are agreed for every size in the range." },
      { title: "Bill of materials", description: "Fabric, thread, trims, labels and packaging are listed with specifications." },
      { title: "Construction detail", description: "Seam types, stitch density, finishing and topstitching are recorded." },
      { title: "Artwork placement", description: "Print and embroidery positions are dimensioned from fixed reference points." },
      { title: "Version control", description: "Each revision is numbered and dated so approvals reference a known version." },
    ],
    suitableProducts: ["All manufactured categories"],
    materialCompatibility: ["Applies across all material groups"],
    techniques: ["Points of measure definition", "Tolerance setting", "Bill of materials build", "Revision control"],
    limitations: [
      "A tech pack records decisions; it does not make them. Open points have to be closed before sampling.",
      "Measurement charts supplied without tolerances are returned for completion rather than assumed.",
    ],
    qualityCheckpoints: ["Tech pack completeness review", "Version match check before every production run"],
    relatedMaterials: ["cotton", "cotton-polyester-blend"],
    faqIds: ["tech-pack", "reorders"],
    seo: {
      title: "Tech pack development for apparel production",
      description:
        "Measurement charts, tolerances, bills of material and construction detail recorded so that production and reorders stay consistent.",
    },
  },
  {
    slug: "material-sourcing",
    name: "Material sourcing",
    group: "materials",
    summary:
      "Finding fabric that meets the specification, is available at your quantity and holds a stable price.",
    introduction: [
      "Sourcing is the point where a specification meets reality. A fabric can be perfect and still be wrong, because the mill will not run it below several thousand metres, or because the colour is only held in a quality that does not suit the garment.",
      "We source against three constraints at once: the technical requirement, your quantity, and the schedule. Where those constraints conflict, we present the trade off rather than choosing silently on your behalf.",
    ],
    verification: "verified",
    capabilityStatus: "developed-and-sourced",
    processStages: [
      { title: "Requirement definition", description: "End use, handfeel, weight, performance and price position are established." },
      { title: "Option search", description: "Candidate qualities are identified against availability at your quantity." },
      { title: "Swatch approval", description: "Physical swatches are sent for approval before any commitment." },
      { title: "Commercial confirmation", description: "Price, minimum quantity and lead time are confirmed against the approved swatch." },
    ],
    suitableProducts: ["All manufactured categories"],
    materialCompatibility: ["Applies across all material groups"],
    techniques: ["Specification led search", "Swatch based approval", "Availability and minimum quantity checking", "Alternative quality proposals"],
    limitations: [
      "Fabric prices move with raw material and energy markets, so quotations carry a validity period.",
      "Certified fabrics are held in fewer qualities and colours, which usually raises minimum quantities.",
    ],
    qualityCheckpoints: ["Swatch against specification", "Incoming fabric inspection before cutting"],
    relatedMaterials: ["cotton", "polyester", "organic-cotton", "recycled-polyester"],
    faqIds: ["materials-choice", "minimum-order", "gsm-meaning"],
    seo: {
      title: "Textile material sourcing for apparel programmes",
      description:
        "Sourcing fabric against specification, quantity and schedule, with swatch approval before any commercial commitment.",
    },
  },
  {
    slug: "yarn-sourcing",
    name: "Yarn sourcing",
    group: "materials",
    summary:
      "Specifying yarn where fabric is knitted for a project rather than bought from stock.",
    introduction: [
      "When fabric is knitted specifically for a programme, the yarn decision comes first. Yarn count, spinning method and fibre quality determine surface appearance, pilling behaviour, print result and how the garment ages.",
      "Yarn led development gives a brand real control over the finished product, and it raises the minimum quantity considerably. It suits repeat programmes rather than a first validation run.",
    ],
    verification: "pending",
    capabilityStatus: "after-technical-review",
    processStages: [
      { title: "Yarn specification", description: "Count, spinning method, fibre and any blend ratio are defined." },
      { title: "Supplier confirmation", description: "Availability and minimum quantity are confirmed with the spinner." },
      { title: "Knit trial", description: "A trial length is knitted and assessed before bulk commitment." },
      { title: "Bulk release", description: "Yarn is released for bulk against the approved trial." },
    ],
    suitableProducts: ["Knitwear", "Jersey apparel", "Seamless product"],
    materialCompatibility: ["cotton", "organic-cotton", "polyester", "elastane-blends"],
    techniques: ["Yarn count specification", "Combed and carded selection", "Blend ratio definition", "Trial knitting"],
    limitations: [
      "Yarn led development sets a materially higher minimum quantity than buying stock fabric.",
      "Scope for specific yarn types is confirmed on technical review rather than assumed.",
    ],
    qualityCheckpoints: ["Yarn certificate check on receipt", "Knit trial assessment before bulk"],
    relatedMaterials: ["cotton", "organic-cotton", "elastane-blends"],
    faqIds: ["minimum-order", "materials-choice"],
    seo: {
      title: "Yarn sourcing and specification for knitted programmes",
      description:
        "Yarn count, spinning method and blend specification for programmes where fabric is knitted to order rather than bought from stock.",
    },
  },
  {
    slug: "knitting",
    name: "Knitting",
    group: "manufacturing",
    summary:
      "Producing jersey, terry, fleece, pique and rib to a defined weight and structure.",
    introduction: [
      "Knitting is where fabric weight, stretch and surface are actually decided. The same yarn produces very different fabric depending on machine gauge, structure and tension, which is why a nominal gsm figure on its own does not describe a fabric.",
      "For most projects, fabric is knitted to the approved specification and then dyed and finished before cutting. The knit trial is the first physical checkpoint at which the specification becomes something you can hold.",
    ],
    verification: "pending",
    capabilityStatus: "after-technical-review",
    processStages: [
      { title: "Structure selection", description: "Single jersey, pique, terry, fleece or rib is selected against the end use." },
      { title: "Machine setup", description: "Gauge and tension are set for the target weight and width." },
      { title: "Trial length", description: "A short length is knitted and checked for weight, width and appearance." },
      { title: "Bulk knitting", description: "Bulk is knitted against the approved trial with in process checks." },
    ],
    suitableProducts: ["Tee shirts", "Sweatshirts and hoodies", "Polo shirts", "Performance apparel"],
    materialCompatibility: ["cotton", "polyester", "cotton-polyester-blend", "elastane-blends", "french-terry", "brushed-fleece", "pique"],
    techniques: ["Single jersey", "Pique", "French terry", "Brushed fleece", "Rib and interlock"],
    limitations: [
      "Finished weight varies within a tolerance and is confirmed on the approved sample rather than guaranteed to a single figure.",
      "Available machine gauges and structures are confirmed on technical review.",
    ],
    qualityCheckpoints: ["Weight and width check on the knit trial", "In process fabric inspection", "Four point fabric inspection before cutting"],
    relatedMaterials: ["french-terry", "brushed-fleece", "pique", "cotton"],
    faqIds: ["gsm-meaning", "minimum-order"],
    seo: {
      title: "Knitting for jersey, terry, fleece and pique fabrics",
      description:
        "Knit structures, machine gauge, weight tolerance and trial approval for fabrics knitted to an apparel specification.",
    },
  },
  {
    slug: "weaving",
    name: "Weaving",
    group: "manufacturing",
    summary:
      "Producing shirting, twill, denim and canvas where the structure is set at the loom.",
    introduction: [
      "Woven fabric behaves differently from knitted fabric at every stage. It does not stretch on its own, it frays, and its pattern is fixed at the loom rather than applied later, which changes both minimum quantities and lead times.",
      "Yarn dyed patterns such as stripes and checks are the clearest example: the colour arrangement is built into the warp, so a pattern change is a new weaving run rather than a finishing decision.",
    ],
    verification: "pending",
    capabilityStatus: "after-technical-review",
    processStages: [
      { title: "Construction definition", description: "Weave, yarn count, ends and picks are specified for the target hand and weight." },
      { title: "Warp preparation", description: "The warp is prepared, including colour arrangement for yarn dyed patterns." },
      { title: "Weaving", description: "Fabric is woven with in process checks for defects and width." },
      { title: "Inspection", description: "Greige fabric is inspected before finishing." },
    ],
    suitableProducts: ["Shirting", "Denim", "Workwear", "Canvas accessories", "Home textiles"],
    materialCompatibility: ["poplin", "denim", "canvas", "cotton"],
    techniques: ["Plain weave", "Twill", "Yarn dyed patterns", "Canvas and duck constructions"],
    limitations: [
      "Yarn dyed patterns carry materially higher minimum quantities than piece dyed fabric.",
      "Available loom widths and constructions are confirmed on technical review.",
    ],
    qualityCheckpoints: ["Greige inspection", "Four point inspection after finishing"],
    relatedMaterials: ["poplin", "denim", "canvas"],
    faqIds: ["minimum-order", "gsm-meaning"],
    seo: {
      title: "Weaving for shirting, denim, twill and canvas",
      description:
        "Woven fabric construction, yarn dyed patterning and inspection stages for shirting, denim, workwear and canvas programmes.",
    },
  },
  {
    slug: "dyeing",
    name: "Dyeing",
    group: "manufacturing",
    summary:
      "Applying colour to fabric or garments to an approved standard, with batch consistency controlled by testing.",
    introduction: [
      "Dyeing is where colour promises are either kept or broken. A shade that looks correct on a screen can be impossible to hit on a given fibre, and the same recipe can read differently on cotton and on polyester within one garment.",
      "Colour is therefore approved against a physical standard under agreed lighting, not against an image. Fastness testing then confirms the colour will survive washing, light and rubbing before bulk production is released.",
    ],
    verification: "pending",
    capabilityStatus: "after-technical-review",
    processStages: [
      { title: "Standard receipt", description: "A physical colour standard or reference is received or agreed." },
      { title: "Laboratory dip", description: "Laboratory dips are produced and submitted for approval." },
      { title: "Approval", description: "You approve a dip under the agreed lighting condition." },
      { title: "Bulk dyeing", description: "Bulk is dyed against the approved dip with batch records retained." },
      { title: "Fastness testing", description: "Wash, light and rub fastness are checked before release." },
    ],
    suitableProducts: ["Knitted apparel", "Woven apparel", "Home textiles"],
    materialCompatibility: ["cotton", "polyester", "cotton-polyester-blend", "canvas"],
    techniques: ["Piece dyeing", "Garment dyeing", "Reactive dyeing on cellulosics", "Disperse dyeing on polyester"],
    limitations: [
      "Slight batch to batch shade variation is inherent to dyeing and is managed by tolerance, not eliminated.",
      "Custom colours follow dye house batch minimums, which are set by the dye house rather than by us.",
      "Specific dye classes and fastness levels are confirmed on technical review.",
    ],
    qualityCheckpoints: ["Laboratory dip approval", "Batch shade check against the approved standard", "Fastness testing before release"],
    relatedMaterials: ["cotton", "polyester", "cotton-polyester-blend"],
    faqIds: ["minimum-order", "lead-time"],
    seo: {
      title: "Fabric and garment dyeing with colour approval control",
      description:
        "Laboratory dips, physical colour standards, batch shade control and fastness testing for dyed apparel and home textiles.",
    },
  },
  {
    slug: "custom-color-development",
    name: "Custom colour development",
    group: "materials",
    summary:
      "Matching a brand colour across different fibres so a collection reads as one palette.",
    introduction: [
      "A brand colour is easy to define and hard to reproduce. Cotton, polyester and nylon take dye differently, so hitting one reference across a mixed collection requires separate recipes that are judged together rather than individually.",
      "Metamerism is the specific risk: two fabrics that match under one light source and diverge under another. Approving colour under an agreed lighting condition is what prevents that surfacing after delivery.",
    ],
    verification: "pending",
    capabilityStatus: "after-technical-review",
    processStages: [
      { title: "Reference agreement", description: "A physical colour reference and a lighting condition are agreed." },
      { title: "Recipe development", description: "Recipes are developed per fibre in the collection." },
      { title: "Cross fibre assessment", description: "Dips are assessed together under the agreed light source." },
      { title: "Standard issue", description: "An approved standard is retained by both parties for future orders." },
    ],
    suitableProducts: ["Multi fabric collections", "Teamwear", "Uniform programmes"],
    materialCompatibility: ["cotton", "polyester", "nylon", "cotton-polyester-blend"],
    techniques: ["Cross fibre matching", "Metamerism assessment", "Retained colour standards"],
    limitations: [
      "An exact match across different fibres is not always physically achievable, and a commercial tolerance is agreed where it is not.",
      "Colour development adds time to the schedule and should be started before sampling.",
    ],
    qualityCheckpoints: ["Dip approval under agreed lighting", "Retained standard comparison on every reorder"],
    relatedMaterials: ["cotton", "polyester", "nylon"],
    faqIds: ["lead-time", "reorders"],
    seo: {
      title: "Custom colour development across fibres",
      description:
        "Matching brand colour across cotton, polyester and nylon with lighting controlled approval and retained colour standards.",
    },
  },
  {
    slug: "pattern-making",
    name: "Pattern making",
    group: "development",
    summary:
      "Translating a design and a measurement chart into the pattern pieces a garment is cut from.",
    introduction: [
      "The pattern is where fit is actually decided. It has to account for the fabric it will be cut in, because the same pattern produces a different garment in rigid poplin and in stretch jersey.",
      "Patterns are built to your measurement chart with agreed tolerances, then corrected against fit samples. The approved pattern is retained so a repeat order starts from a known reference rather than from a redraft.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Chart review", description: "Points of measure and tolerances are reviewed for completeness." },
      { title: "Base pattern", description: "A base pattern is drafted for the nominated fabric type." },
      { title: "Fit correction", description: "The pattern is corrected against fit sample comments." },
      { title: "Pattern lock", description: "The approved pattern is retained and version controlled." },
    ],
    suitableProducts: ["All cut and sew apparel"],
    materialCompatibility: ["Applies across all material groups"],
    techniques: ["Digital pattern drafting", "Fabric specific allowance", "Fit correction cycles", "Pattern archiving"],
    limitations: [
      "A pattern is fabric specific. Changing fabric type after approval usually requires a pattern correction.",
      "Fit comments have to be given against a measured sample rather than a general impression.",
    ],
    qualityCheckpoints: ["Measurement audit of the fit sample against the chart"],
    relatedMaterials: ["cotton", "poplin", "elastane-blends"],
    faqIds: ["sampling", "tech-pack"],
    seo: {
      title: "Apparel pattern making and fit correction",
      description:
        "Fabric specific pattern drafting, fit correction against measured samples, and version controlled pattern archiving.",
    },
  },
  {
    slug: "grading",
    name: "Grading",
    group: "development",
    summary:
      "Scaling an approved pattern across a size range so every size fits the body it is meant for.",
    introduction: [
      "Grading is not simple scaling. Body proportions do not change uniformly across a size range, so a garment graded by a flat percentage fits the sample size well and everything else poorly.",
      "Grade rules are set per point of measure and reviewed against the target market, because size expectations differ between the USA, the United Kingdom and continental Europe.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Range definition", description: "The size range and the base size are confirmed." },
      { title: "Grade rules", description: "Increments are set per point of measure rather than applied uniformly." },
      { title: "Extreme size check", description: "The smallest and largest sizes are checked, since errors show there first." },
      { title: "Graded chart issue", description: "A full graded measurement chart is issued for approval." },
    ],
    suitableProducts: ["All sized apparel"],
    materialCompatibility: ["Applies across all material groups"],
    techniques: ["Point of measure grading", "Market specific size range planning", "Extreme size verification"],
    limitations: [
      "Grade rules do not compensate for a base pattern that does not fit; the base size is corrected first.",
      "Size labelling conventions differ by market and are confirmed with you rather than assumed.",
    ],
    qualityCheckpoints: ["Graded chart review", "Measurement audit across sizes during inline inspection"],
    relatedMaterials: ["cotton", "cotton-polyester-blend"],
    faqIds: ["sampling", "compliance"],
    seo: {
      title: "Size grading for apparel size ranges",
      description:
        "Grade rules set per point of measure, market aware size ranges, and verification at the extremes of the range.",
    },
  },
  {
    slug: "sample-development",
    name: "Sample development",
    group: "development",
    summary:
      "The staged process that converts a specification into a physical garment both parties agree on.",
    introduction: [
      "Sampling is the cheapest place to be wrong. A construction problem found on a proto sample costs a few days; the same problem found in bulk costs a production run.",
      "Samples run in stages, each with a specific question to answer. Skipping a stage does not save time overall, it moves risk into production, which is where corrections are most expensive.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Proto sample", description: "Confirms construction and overall direction, often in substitute fabric." },
      { title: "Fit sample", description: "Confirms measurements against the chart in the correct fabric." },
      { title: "Revised sample", description: "Produced where fit or construction comments require it." },
      { title: "Pre production sample", description: "Made from bulk fabric with final trims, labels and packaging." },
      { title: "Approval", description: "Written approval of the pre production sample releases production." },
    ],
    suitableProducts: ["All manufactured categories"],
    materialCompatibility: ["Applies across all material groups"],
    techniques: ["Staged sampling", "Measured fit assessment", "Bulk fabric pre production samples", "Retained approved samples"],
    limitations: [
      "Sample charges and courier costs are quoted before work starts.",
      "Production is not released against a proto or fit sample; only an approved pre production sample releases bulk.",
    ],
    qualityCheckpoints: ["Measurement audit at each sample stage", "Pre production sample sign off"],
    relatedMaterials: ["cotton", "french-terry", "polyester"],
    faqIds: ["sampling", "lead-time", "tech-pack"],
    seo: {
      title: "Apparel sample development and approval stages",
      description:
        "Proto, fit and pre production sampling with measured assessment and written approval before bulk production is released.",
    },
  },
  {
    slug: "cutting",
    name: "Cutting",
    group: "manufacturing",
    summary:
      "Converting approved fabric into accurately cut panels, with fabric utilisation controlled at the marker.",
    introduction: [
      "Cutting determines both accuracy and cost. The marker, which is the layout of pattern pieces across the fabric width, decides how much fabric a garment consumes, and small utilisation gains matter across a large order.",
      "Accuracy matters more. Panels cut outside tolerance cannot be corrected at the sewing line, so the first cut panels of every lay are measured before the lay is released.",
    ],
    verification: "pending",
    capabilityStatus: "after-technical-review",
    processStages: [
      { title: "Marker planning", description: "Pattern pieces are laid out for utilisation, grain and any directional fabric." },
      { title: "Fabric relaxation", description: "Knitted fabric is relaxed before spreading to prevent post cut shrinkage." },
      { title: "Spreading", description: "Fabric is spread in plies with tension and alignment controlled." },
      { title: "Cutting", description: "Panels are cut and bundled by size and shade lot." },
      { title: "Panel audit", description: "Cut panels are measured against the pattern before release to sewing." },
    ],
    suitableProducts: ["All cut and sew apparel"],
    materialCompatibility: ["Applies to knitted and woven fabrics"],
    techniques: ["Marker planning", "Fabric relaxation", "Shade lot bundling", "Cut panel measurement"],
    limitations: [
      "Directional and patterned fabrics consume more material, which is reflected in the quotation.",
      "Available cutting capacity and methods are confirmed on technical review.",
    ],
    qualityCheckpoints: ["Cut panel measurement audit", "Shade lot segregation check"],
    relatedMaterials: ["cotton", "french-terry", "denim", "poplin"],
    faqIds: ["lead-time"],
    seo: {
      title: "Fabric cutting, marker planning and panel accuracy",
      description:
        "Marker planning, fabric relaxation, shade lot control and cut panel measurement before garments reach the sewing line.",
    },
  },
  {
    slug: "cut-and-sew-manufacturing",
    name: "Cut and sew manufacturing",
    group: "manufacturing",
    summary:
      "The core assembly capability. Panels become garments against an approved sample and a written specification.",
    introduction: [
      "Cut and sew is how the large majority of apparel is made, and it is where specification discipline earns its value. The line works against the approved pre production sample and the tech pack, not against a photograph.",
      "Consistency comes from inline checking rather than from final inspection alone. Problems caught at the operation that caused them are corrected in minutes; the same problems found at final inspection are corrected by reworking a whole lot.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Line setup", description: "Operations are sequenced and machines set against the approved sample." },
      { title: "Pilot run", description: "A small run confirms the line produces to specification before full output." },
      { title: "Bulk sewing", description: "Production runs with inline checks at defined operations." },
      { title: "Measurement audit", description: "Garments are measured against the chart during production." },
      { title: "Finishing handover", description: "Completed garments pass to trimming, pressing and final inspection." },
    ],
    suitableProducts: ["Apparel", "Uniforms", "Home textiles", "Accessories"],
    materialCompatibility: ["Applies across all material groups"],
    techniques: ["Overlock and coverstitch assembly", "Lockstitch construction", "Bartacking and reinforcement", "Twin needle finishing"],
    limitations: [
      "Construction methods are set at pre production approval; changes after that require re approval.",
      "Very small quantities carry a higher unit cost because line setup is amortised over fewer pieces.",
    ],
    qualityCheckpoints: ["Pilot run approval", "Inline operation checks", "Measurement audit", "End of line inspection"],
    relatedMaterials: ["cotton", "french-terry", "cotton-polyester-blend", "poplin"],
    faqIds: ["minimum-order", "quantity-scale", "lead-time"],
    seo: {
      title: "Cut and sew apparel manufacturing",
      description:
        "Line setup, pilot runs, inline checking and measurement audits for apparel assembled against an approved pre production sample.",
    },
  },
  {
    slug: "seamless-manufacturing",
    name: "Seamless manufacturing",
    group: "manufacturing",
    summary:
      "Knitting a garment body in one piece, removing side seams for comfort against the skin.",
    introduction: [
      "Seamless construction knits the body of a garment as a tube, so there are no side seams to rub. It suits base layers, activewear and shapewear where comfort against the skin is the point of the product.",
      "It is a different manufacturing route rather than a variation on cut and sew. Machine capability sets what shapes and zone structures are possible, and minimum quantities are usually higher.",
    ],
    verification: "pending",
    capabilityStatus: "after-technical-review",
    processStages: [
      { title: "Feasibility review", description: "The design is assessed against seamless machine capability." },
      { title: "Programme development", description: "The knitting programme, including zone structures, is developed." },
      { title: "Trial garments", description: "Trial pieces are produced and assessed for fit and compression." },
      { title: "Bulk knitting and finishing", description: "Bulk is knitted, then finished, dyed and trimmed as required." },
    ],
    suitableProducts: ["Base layers", "Activewear", "Shapewear", "Sports underwear"],
    materialCompatibility: ["elastane-blends", "polyester", "nylon"],
    techniques: ["Circular seamless knitting", "Zoned compression", "Integrated ventilation structures"],
    limitations: [
      "Design freedom is constrained by machine capability far more than in cut and sew.",
      "Minimum quantities are typically higher than for equivalent cut and sew product.",
      "Availability of seamless capacity is confirmed on technical review.",
    ],
    qualityCheckpoints: ["Trial garment fit and compression assessment", "Dimensional check after finishing"],
    relatedMaterials: ["elastane-blends", "nylon", "polyester"],
    faqIds: ["minimum-order", "sampling"],
    seo: {
      title: "Seamless knitted garment manufacturing",
      description:
        "Circular seamless knitting for base layers and activewear, with zoned structures, trial assessment and honest limits on design freedom.",
    },
  },
  {
    slug: "quality-assurance",
    name: "Quality assurance",
    group: "assurance",
    summary:
      "The system of checkpoints that catches problems at the stage that caused them.",
    introduction: [
      "Quality assurance is not a final inspection. By the time a garment reaches final inspection, every decision that determines its quality has already been made, and the only remaining options are acceptance or rework.",
      "The checkpoints described here run from incoming material through to packing. Each one exists to catch a specific class of problem at the point where correction is still cheap.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Incoming material inspection", description: "Fabric and trims are checked against specification before cutting." },
      { title: "Pre production review", description: "The approved sample, tech pack and materials are reviewed together before the line starts." },
      { title: "Inline inspection", description: "Defined operations are checked during production." },
      { title: "Measurement verification", description: "Garments are measured against the chart and its tolerances." },
      { title: "Final inspection", description: "Finished goods are inspected against the agreed sampling standard." },
      { title: "Packing audit", description: "Cartons are checked for assortment, labelling and quantity before shipping." },
    ],
    suitableProducts: ["All manufactured categories"],
    materialCompatibility: ["Applies across all material groups"],
    techniques: ["Statistical sampling inspection", "Measurement auditing", "Defect classification", "Corrective action recording"],
    limitations: [
      "Inspection standards and acceptance limits are agreed per order in writing rather than assumed.",
      "Inspection confirms conformity to the approved sample; it cannot correct a specification that was wrong.",
    ],
    qualityCheckpoints: ["All stages listed above are recorded and available on request"],
    relatedMaterials: ["cotton", "polyester", "cotton-polyester-blend"],
    faqIds: ["aql", "inspection", "reorders"],
    seo: {
      title: "Quality assurance across apparel production",
      description:
        "Incoming inspection, pre production review, inline checks, measurement verification, final inspection and packing audits.",
    },
  },
];
