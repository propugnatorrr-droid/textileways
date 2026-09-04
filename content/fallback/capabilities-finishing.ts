import type { Capability } from "@/content/types";

/**
 * Capability records, part two: decoration, finishing, presentation and export.
 */
export const finishingCapabilities: Capability[] = [
  {
    slug: "screen-printing",
    name: "Screen printing",
    group: "decoration",
    summary:
      "The volume method for solid colour artwork. Lowest unit cost at quantity, with a setup cost per colour.",
    introduction: [
      "Screen printing pushes ink through a mesh screen, one screen per colour. That structure explains its economics: setup cost rises with colour count and falls away across quantity, so it is the cheapest method at volume and an expensive one for a short run.",
      "It also produces the most durable and opaque result on cotton, which is why it remains the standard for tee shirt and sweatshirt graphics despite newer digital options.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Artwork separation", description: "Artwork is separated into individual colours and screens are prepared." },
      { title: "Colour matching", description: "Ink colours are mixed and approved against your reference." },
      { title: "Strike off", description: "A test print on the actual fabric is approved before bulk printing." },
      { title: "Bulk printing", description: "Bulk is printed with periodic checks against the approved strike off." },
      { title: "Curing", description: "Ink is cured to temperature, which determines wash durability." },
    ],
    suitableProducts: ["Tee shirts", "Sweatshirts and hoodies", "Tote bags", "Teamwear"],
    materialCompatibility: ["cotton", "french-terry", "brushed-fleece", "canvas", "cotton-polyester-blend"],
    techniques: ["Plastisol printing", "Water based printing", "Discharge printing", "Puff and high density effects", "Metallic and specialty inks"],
    limitations: [
      "Each colour carries a setup cost, so photographic and multi colour artwork is often better suited to a digital method.",
      "Printing on dyed polyester requires low bleed inks, and dye migration is checked on the strike off.",
      "Fine detail is limited on textured surfaces such as pique and heavy fleece.",
    ],
    qualityCheckpoints: ["Strike off approval", "Cure temperature verification", "Wash test on the approved strike off", "Placement and dimension check during production"],
    relatedMaterials: ["cotton", "french-terry", "canvas"],
    faqIds: ["decoration-options", "minimum-order"],
    seo: {
      title: "Screen printing for apparel and accessories",
      description:
        "Plastisol, water based and discharge screen printing with strike off approval, cure verification and wash testing.",
    },
  },
  {
    slug: "dtg-printing",
    name: "DTG printing",
    group: "decoration",
    summary:
      "Direct to garment inkjet printing. Suits photographic artwork and low quantities without screen setup.",
    introduction: [
      "DTG prints ink directly into the fabric of a finished garment, in the way an inkjet printer prints onto paper. There are no screens, so there is no setup cost per colour and no minimum driven by colour count.",
      "The trade off is fabric dependence and unit economics. It performs best on cotton rich fabric, needs pretreatment on dark garments, and its per piece cost does not fall away with quantity in the way screen printing does.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Artwork preparation", description: "Files are prepared at print resolution with colour profiles applied." },
      { title: "Pretreatment", description: "Dark garments are pretreated so white underbase ink holds on the surface." },
      { title: "Printing", description: "The garment is printed directly." },
      { title: "Curing", description: "Ink is cured to fix it into the fibre." },
    ],
    suitableProducts: ["Tee shirts", "Sweatshirts", "Low quantity graphic apparel"],
    materialCompatibility: ["cotton", "organic-cotton", "french-terry"],
    techniques: ["Direct to garment inkjet", "White underbase printing on dark grounds"],
    limitations: [
      "Best results are on cotton rich fabric. Polyester rich fabric is generally handled by DTF or sublimation instead.",
      "Unit cost does not reduce significantly with quantity, so screen printing is usually better above a few hundred pieces.",
      "Colour density on dark garments depends on pretreatment quality and is confirmed on the sample.",
    ],
    qualityCheckpoints: ["Colour approval against the approved sample", "Wash test", "Placement and dimension check"],
    relatedMaterials: ["cotton", "organic-cotton"],
    faqIds: ["decoration-options"],
    seo: {
      title: "DTG printing for photographic and low volume artwork",
      description:
        "Direct to garment printing on cotton rich fabric, including pretreatment, curing and honest limits against screen printing.",
    },
  },
  {
    slug: "dtf-printing",
    name: "DTF printing",
    group: "decoration",
    summary:
      "Transfer printing that works across a wide fabric range, including blends and performance fabrics.",
    introduction: [
      "DTF prints artwork onto a film which is then heat applied to the garment. Because the ink never has to bond directly with the fibre, it works across a far wider fabric range than DTG, including polyester and blended fabrics.",
      "It has become the practical answer for mixed fabric programmes, small quantities of detailed artwork, and decoration on garments that are difficult to print directly.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Artwork preparation", description: "Artwork is prepared and printed onto transfer film." },
      { title: "Adhesive application", description: "Adhesive powder is applied and cured onto the printed film." },
      { title: "Heat application", description: "The transfer is applied to the garment at controlled temperature, pressure and time." },
      { title: "Adhesion check", description: "Adhesion and wash durability are confirmed on a test piece." },
    ],
    suitableProducts: ["Sportswear", "Blended fabric apparel", "Bags and accessories", "Small quantity graphic apparel"],
    materialCompatibility: ["polyester", "cotton-polyester-blend", "cotton", "nylon", "canvas"],
    techniques: ["Direct to film transfer", "Full colour transfer printing"],
    limitations: [
      "The transfer sits on the fabric surface, so handfeel differs from a printed in method such as discharge or DTG.",
      "Large solid areas reduce breathability, which matters on performance apparel.",
      "Adhesion on coated and water repellent fabrics is confirmed by test before bulk.",
    ],
    qualityCheckpoints: ["Adhesion test", "Wash test", "Placement and dimension check"],
    relatedMaterials: ["polyester", "cotton-polyester-blend", "nylon"],
    faqIds: ["decoration-options"],
    seo: {
      title: "DTF transfer printing across mixed fabrics",
      description:
        "Direct to film printing for polyester, blends and coated fabrics, with adhesion and wash testing before bulk application.",
    },
  },
  {
    slug: "sublimation",
    name: "Sublimation",
    group: "decoration",
    summary:
      "Dye based printing that becomes part of a polyester fabric. The route to full coverage team graphics.",
    introduction: [
      "Sublimation converts dye to gas under heat so it bonds into polyester fibre rather than sitting on top of it. The result has no handfeel at all and does not crack, peel or fade in the way a surface print can.",
      "It only works on polyester rich fabric, and it cannot print white, because the process adds colour to the fabric rather than laying opaque ink over it. Those two constraints define where it is the right choice.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Artwork layout", description: "Artwork is laid out across the pattern pieces for the full garment." },
      { title: "Transfer printing", description: "The layout is printed onto transfer paper." },
      { title: "Heat pressing", description: "Panels are pressed at controlled temperature and time so the dye sublimates into the fabric." },
      { title: "Cut and sew", description: "Printed panels are cut and assembled into the finished garment." },
    ],
    suitableProducts: ["Team kit", "Cycling and running apparel", "Esports and club jerseys", "Specialist sports products"],
    materialCompatibility: ["polyester", "recycled-polyester", "elastane-blends"],
    techniques: ["Panel sublimation before assembly", "All over print layouts", "Per piece name and number personalisation"],
    limitations: [
      "Only suitable for polyester rich fabric. It does not work on cotton.",
      "White cannot be printed. Any white in the design is the base fabric showing through.",
      "Colour on the finished fabric differs from the printed transfer paper, so approval is always against a pressed sample.",
    ],
    qualityCheckpoints: ["Pressed colour sample approval", "Panel alignment check before assembly", "Seam matching check on all over designs"],
    relatedMaterials: ["polyester", "recycled-polyester", "elastane-blends"],
    faqIds: ["decoration-options", "minimum-order"],
    seo: {
      title: "Sublimation printing for teamwear and performance apparel",
      description:
        "Panel sublimation for polyester teamwear, including all over layouts, personalisation and the limits of the process.",
    },
  },
  {
    slug: "heat-transfer",
    name: "Heat transfer",
    group: "decoration",
    summary:
      "Applied vinyl and printed transfers for names, numbers and small quantity personalisation.",
    introduction: [
      "Heat transfer covers cut vinyl and printed transfer materials applied with a heat press. It is the standard method for names and numbers on teamwear, where every piece is different and no other method is economical.",
      "It is also the usual route for branding on garments that cannot be printed or embroidered, such as waterproof shells where perforating the fabric would defeat the purpose.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Material selection", description: "Transfer material is selected against the fabric and the end use." },
      { title: "Cutting or printing", description: "Vinyl is cut and weeded, or transfers are printed." },
      { title: "Application", description: "Transfers are applied at controlled temperature, pressure and time." },
      { title: "Adhesion check", description: "Adhesion and stretch behaviour are verified on a test piece." },
    ],
    suitableProducts: ["Teamwear names and numbers", "Waterproof outerwear branding", "Small quantity personalisation"],
    materialCompatibility: ["polyester", "nylon", "cotton-polyester-blend", "elastane-blends"],
    techniques: ["Cut vinyl", "Printed heat transfers", "Stretch transfer materials for performance fabric"],
    limitations: [
      "Not suitable for large solid coverage, which becomes heavy and reduces breathability.",
      "Durability depends on application accuracy and on correct laundering by the end user.",
      "Rigid transfer materials crack on high stretch fabric, so stretch grade materials are specified there.",
    ],
    qualityCheckpoints: ["Adhesion and peel test", "Wash test", "Name and number accuracy verification against the order list"],
    relatedMaterials: ["polyester", "nylon", "elastane-blends"],
    faqIds: ["decoration-options"],
    seo: {
      title: "Heat transfer and applied vinyl decoration",
      description:
        "Cut vinyl and printed transfers for names, numbers and branding on fabrics that cannot be printed or embroidered.",
    },
  },
  {
    slug: "embroidery",
    name: "Embroidery",
    group: "decoration",
    summary:
      "Stitched branding. The most durable decoration method and the standard for corporate and uniform logos.",
    introduction: [
      "Embroidery builds a logo from thread rather than applying it to the surface, which is why it outlasts every printed method and why uniform programmes rely on it.",
      "The critical step is digitising: converting artwork into a stitch file. Two digitisers given the same logo will produce different results, so the approved sew out, not the artwork, is the reference for production.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Digitising", description: "Artwork is converted into a stitch file with stitch types and directions defined." },
      { title: "Sew out", description: "A physical sew out is produced on the actual fabric and submitted for approval." },
      { title: "Thread matching", description: "Thread colours are matched and recorded against your reference." },
      { title: "Bulk embroidery", description: "Bulk runs against the approved sew out with periodic checks." },
    ],
    suitableProducts: ["Polo shirts", "Workwear and uniforms", "Caps and headwear", "Outerwear", "Streetwear"],
    materialCompatibility: ["pique", "cotton", "cotton-polyester-blend", "canvas", "denim", "brushed-fleece"],
    techniques: ["Flat embroidery", "Cap embroidery", "3D puff embroidery", "Chenille embroidery", "Metallic and specialty threads"],
    limitations: [
      "Small lettering below roughly 4 millimetres does not reproduce reliably and is redrawn or resized.",
      "Dense designs stiffen lightweight fabric and can distort it without correct backing.",
      "Gradients and photographic artwork are not suited to embroidery and are redrawn as stitch friendly artwork.",
    ],
    qualityCheckpoints: ["Sew out approval", "Thread colour verification", "Placement and dimension check", "Reverse side backing and trimming check"],
    relatedMaterials: ["pique", "canvas", "denim", "brushed-fleece"],
    faqIds: ["decoration-options", "private-label"],
    seo: {
      title: "Embroidery for uniforms, headwear and branded apparel",
      description:
        "Digitising, sew out approval and thread matching for durable stitched branding, with clear limits on small text and fine detail.",
    },
  },
  {
    slug: "applique",
    name: "Applique",
    group: "decoration",
    summary:
      "Fabric shapes stitched onto a garment. Adds texture and covers large areas without heavy stitch counts.",
    introduction: [
      "Applique attaches cut fabric shapes to a garment and secures the edges with stitching. It covers large areas far more economically than embroidery, because fabric does the filling instead of thread.",
      "It carries a distinct look associated with collegiate and heritage sportswear, and it works particularly well on heavier knitwear where the added texture reads as deliberate.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Shape preparation", description: "Applique fabric is selected and shapes are cut." },
      { title: "Positioning", description: "Shapes are positioned and fixed against the approved placement." },
      { title: "Edge stitching", description: "Edges are secured with satin stitch or a specified alternative." },
      { title: "Sample approval", description: "A physical sample is approved before bulk." },
    ],
    suitableProducts: ["Collegiate style sweatshirts", "Streetwear", "Team jackets", "Heritage sportswear"],
    materialCompatibility: ["brushed-fleece", "french-terry", "canvas", "denim"],
    techniques: ["Satin edge applique", "Layered applique", "Twill and felt applique"],
    limitations: [
      "Fine detail and small shapes are not suited to applique and are handled by embroidery instead.",
      "The applique fabric and the base fabric must be compatible for washing and shrinkage, which is confirmed by wash test.",
    ],
    qualityCheckpoints: ["Sample approval", "Placement check", "Wash test for differential shrinkage"],
    relatedMaterials: ["brushed-fleece", "french-terry", "denim"],
    faqIds: ["decoration-options"],
    seo: {
      title: "Applique decoration for knitwear and streetwear",
      description:
        "Cut fabric applique with satin edge finishing, used to cover large areas with texture rather than dense embroidery.",
    },
  },
  {
    slug: "patches-and-badges",
    name: "Patches and badges",
    group: "decoration",
    summary:
      "Separately produced badges applied to the garment. Consistent branding across mixed fabrics.",
    introduction: [
      "A patch is decorated away from the garment and then attached, which means the same badge can go onto a fleece, a shell jacket and a cap and look identical on all three.",
      "That consistency, and the ability to decorate fabrics that resist direct decoration, is the main reason uniform and outdoor programmes use patches rather than direct embroidery.",
    ],
    verification: "verified",
    capabilityStatus: "developed-and-sourced",
    processStages: [
      { title: "Patch specification", description: "Type, size, border finish and attachment method are defined." },
      { title: "Sample production", description: "A physical patch sample is produced and approved." },
      { title: "Bulk production", description: "Patches are produced against the approved sample." },
      { title: "Application", description: "Patches are attached to garments by the approved method." },
    ],
    suitableProducts: ["Workwear", "Outdoor apparel", "Caps and headwear", "Streetwear"],
    materialCompatibility: ["Applies across fabrics, including coated and water repellent shells"],
    techniques: ["Woven patches", "Embroidered patches", "Leather and synthetic leather patches", "PVC and rubber patches"],
    limitations: [
      "Attachment method affects washability, and heat activated attachment is not suitable for every fabric.",
      "Patch minimum quantities are set by the patch supplier and can exceed the garment quantity.",
    ],
    qualityCheckpoints: ["Patch sample approval", "Attachment strength check", "Placement check"],
    relatedMaterials: ["canvas", "nylon", "denim"],
    faqIds: ["decoration-options", "private-label"],
    seo: {
      title: "Woven, embroidered and leather patches",
      description:
        "Patch specification, sampling and attachment for consistent branding across mixed fabrics and technical garments.",
    },
  },
  {
    slug: "washing-and-garment-finishing",
    name: "Washing and garment finishing",
    group: "finishing",
    summary:
      "Wet processing that sets the final handfeel, appearance and dimensional stability of a garment.",
    introduction: [
      "Garment washing is not cleaning. It is a process that changes the product: softening handfeel, stabilising dimensions, creating a worn appearance or setting a specific surface effect.",
      "Because the recipe determines the finished article, it has to be locked as tightly as the fabric. A signed wash standard garment retained by both parties is what keeps a repeat order looking like the original.",
    ],
    verification: "pending",
    capabilityStatus: "after-technical-review",
    processStages: [
      { title: "Recipe development", description: "A wash recipe is developed against the target appearance and handfeel." },
      { title: "Standard approval", description: "A wash standard garment is produced and approved by both parties." },
      { title: "Bulk washing", description: "Bulk is processed against the approved standard with batch records." },
      { title: "Post wash measurement", description: "Garments are measured after washing, since dimensions change during processing." },
    ],
    suitableProducts: ["Denim", "Garment dyed apparel", "Heavyweight streetwear", "Workwear"],
    materialCompatibility: ["denim", "cotton", "french-terry", "canvas"],
    techniques: ["Enzyme wash", "Stone wash", "Garment dyeing", "Softener finishing", "Silicone wash"],
    limitations: [
      "Wash processing causes controlled shrinkage, so measurement charts are set post wash rather than pre wash.",
      "Slight variation between wash batches is inherent and is managed by an agreed tolerance against the standard.",
      "Available wash processes are confirmed on technical review.",
    ],
    qualityCheckpoints: ["Wash standard approval", "Post wash measurement audit", "Shade comparison against the standard"],
    relatedMaterials: ["denim", "cotton", "canvas"],
    faqIds: ["reorders", "lead-time"],
    seo: {
      title: "Garment washing and finishing processes",
      description:
        "Enzyme, stone and softener washes with an approved wash standard, batch records and post wash measurement control.",
    },
  },
  {
    slug: "private-labelling",
    name: "Private labelling",
    group: "finishing",
    summary:
      "Producing under your brand, with every label and mark inside the garment belonging to you.",
    introduction: [
      "Private labelling means the finished garment carries your identity throughout: main label, care and content label, size label, and any internal branding you specify.",
      "The commercial value is that the product is yours to build equity in. The obligation that comes with it is that the information on the care and content label is legally your responsibility as the brand owner, and we build the specification to match exactly what you approve.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Label specification", description: "Label types, materials, sizes and positions are defined." },
      { title: "Content confirmation", description: "Fibre content, care symbols and origin details are confirmed with you." },
      { title: "Label sampling", description: "Physical label samples are approved before bulk production." },
      { title: "Application", description: "Labels are applied at the specified positions during assembly." },
    ],
    suitableProducts: ["All manufactured apparel"],
    materialCompatibility: ["Applies across all material groups"],
    techniques: ["Woven main labels", "Printed satin and cotton labels", "Heat transfer tagless labels", "Size and care labels"],
    limitations: [
      "Legal responsibility for the accuracy of care and content information rests with the brand owner.",
      "Label suppliers set their own minimum quantities, which can exceed the garment quantity.",
      "Tagless heat transfer labels are not suitable on every fabric and are confirmed by test.",
    ],
    qualityCheckpoints: ["Label sample approval", "Content and care accuracy check against your written confirmation", "Position and orientation check"],
    relatedMaterials: ["cotton", "polyester", "cotton-polyester-blend"],
    faqIds: ["private-label", "compliance"],
    seo: {
      title: "Private label apparel manufacturing",
      description:
        "Main labels, care and content labels and tagless branding applied to your specification under your own brand.",
    },
  },
  {
    slug: "hangtags-and-barcodes",
    name: "Hangtags and barcodes",
    group: "finishing",
    summary:
      "Retail presentation and identification, prepared so goods can go straight onto a shelf or into a fulfilment system.",
    introduction: [
      "Hangtags carry brand story and price; barcodes carry identification that warehouses and retailers depend on. Getting either wrong is expensive after the fact, because correction means handling every unit again.",
      "Barcode data comes from you and is applied exactly as supplied. We verify that every code scans and that it matches the size and colour it is attached to, which is the failure that causes the most disruption downstream.",
    ],
    verification: "verified",
    capabilityStatus: "developed-and-sourced",
    processStages: [
      { title: "Artwork and data receipt", description: "Hangtag artwork and the barcode data file are received from you." },
      { title: "Proofing", description: "Physical proofs are produced and approved before bulk." },
      { title: "Production", description: "Hangtags and labels are produced against the approved proof." },
      { title: "Application and verification", description: "Tags are attached and every code is scan verified against the size and colour." },
    ],
    suitableProducts: ["Retail ready apparel", "Wholesale programmes", "Ecommerce fulfilment"],
    materialCompatibility: ["Applies across all manufactured products"],
    techniques: ["Printed hangtags", "Barcode and price ticket printing", "Ecommerce fulfilment labelling", "Retailer specific ticketing"],
    limitations: [
      "Barcode data is applied exactly as supplied. Accuracy of the underlying data remains with you.",
      "Retailer specific ticketing requirements have to be supplied in full before production.",
    ],
    qualityCheckpoints: ["Proof approval", "Scan verification of every code", "Size and colour match check"],
    relatedMaterials: [],
    faqIds: ["private-label", "compliance"],
    seo: {
      title: "Hangtags, barcodes and retail ticketing",
      description:
        "Hangtag production, barcode application and scan verification so goods arrive ready for retail or fulfilment.",
    },
  },
  {
    slug: "custom-packaging",
    name: "Custom packaging",
    group: "finishing",
    summary:
      "How the product is presented and protected, from individual polybags to retail boxes and shipping cartons.",
    introduction: [
      "Packaging decisions affect unit cost, shipping volume, damage rates and the unboxing experience. They also increasingly affect market access, because packaging regulations differ by destination.",
      "We specify packaging at three levels: the individual unit, the inner carton and the shipping carton. Each level has its own labelling requirements, and getting them consistent is what allows a warehouse to receive goods without exception handling.",
    ],
    verification: "verified",
    capabilityStatus: "developed-and-sourced",
    processStages: [
      { title: "Packaging specification", description: "Unit, inner and shipping packaging are defined with materials and dimensions." },
      { title: "Sample approval", description: "Physical packaging samples are approved before bulk." },
      { title: "Packing standard", description: "A packing standard is issued, including fold method, assortment and carton marking." },
      { title: "Packing audit", description: "Cartons are audited against the standard before shipping." },
    ],
    suitableProducts: ["All manufactured products"],
    materialCompatibility: ["Applies across all manufactured products"],
    techniques: ["Individual polybagging", "Recycled and paper based alternatives", "Retail boxes", "Assorted and solid carton packing", "Carton marking"],
    limitations: [
      "Packaging regulations differ by destination market and are confirmed with you before production.",
      "Reduced packaging options may not suit every distribution route and are assessed against your fulfilment method.",
    ],
    qualityCheckpoints: ["Packaging sample approval", "Packing audit against the standard", "Carton weight and dimension verification"],
    relatedMaterials: [],
    faqIds: ["shipping-terms", "compliance"],
    seo: {
      title: "Custom packaging for apparel programmes",
      description:
        "Unit, inner and shipping packaging specification with approved packing standards and pre shipment carton audits.",
    },
  },
  {
    slug: "laboratory-testing-coordination",
    name: "Laboratory testing coordination",
    group: "assurance",
    summary:
      "Arranging independent testing where a buyer, a market or a product category requires evidence.",
    introduction: [
      "Some claims cannot be made on the basis of inspection alone. Fibre composition, colour fastness, dimensional stability, tensile strength and restricted substance limits are established by laboratory testing.",
      "Textileways coordinates testing with accredited laboratories rather than issuing its own test results. Reports come to you from the laboratory directly, which is what makes them useful as evidence.",
    ],
    verification: "pending",
    capabilityStatus: "after-technical-review",
    processStages: [
      { title: "Requirement definition", description: "The tests required by your market, buyer or category are identified." },
      { title: "Laboratory selection", description: "An accredited laboratory is selected, or your nominated laboratory is used." },
      { title: "Sample submission", description: "Representative samples are submitted with full specification detail." },
      { title: "Report handling", description: "Reports are issued and any failure is addressed through corrective action." },
    ],
    suitableProducts: ["Children and baby apparel", "Workwear with protective requirements", "Regulated product categories"],
    materialCompatibility: ["Applies across all material groups"],
    techniques: ["Composition testing", "Colour fastness testing", "Dimensional stability testing", "Restricted substance screening", "Flammability testing where the category requires it"],
    limitations: [
      "Textileways coordinates testing and does not issue independent test results.",
      "Testing scope is defined by you or your buyer, since requirements vary by market and product category.",
      "Test costs and lead times are quoted per requirement.",
    ],
    qualityCheckpoints: ["Test report review against the specification", "Corrective action where a test does not pass"],
    relatedMaterials: ["cotton", "polyester", "elastane-blends"],
    faqIds: ["compliance", "inspection"],
    seo: {
      title: "Textile laboratory testing coordination",
      description:
        "Coordinating composition, fastness, dimensional stability and restricted substance testing with accredited laboratories.",
    },
  },
  {
    slug: "inspection",
    name: "Inspection",
    group: "assurance",
    summary:
      "Structured checking of finished goods against the approved sample and an agreed acceptance standard.",
    introduction: [
      "Inspection compares what was produced against what was approved. For it to mean anything, three things must be agreed in advance: the reference sample, the defect classification, and the sampling plan with its acceptance limits.",
      "We inspect internally and welcome buyer appointed and third party inspectors. Where an independent inspector is used, the schedule allows time both for inspection and for any rework it identifies.",
    ],
    verification: "verified",
    capabilityStatus: "in-house",
    processStages: [
      { title: "Standard agreement", description: "Reference sample, defect classification and sampling plan are agreed in writing." },
      { title: "Inline inspection", description: "Checks run during production so problems are caught at source." },
      { title: "Final random inspection", description: "Finished goods are inspected against the agreed plan." },
      { title: "Disposition", description: "The lot is accepted, or rework is defined and re inspected." },
    ],
    suitableProducts: ["All manufactured products"],
    materialCompatibility: ["Applies across all material groups"],
    techniques: ["Statistical sampling inspection", "Defect classification", "Measurement auditing", "Re inspection after rework"],
    limitations: [
      "Acceptance standards are commercial decisions agreed per order rather than a fixed company standard.",
      "Sampling inspection assesses a lot from a sample and does not constitute a hundred percent check unless that is specifically ordered.",
    ],
    qualityCheckpoints: ["Inline checks", "Final random inspection", "Re inspection after any rework"],
    relatedMaterials: [],
    faqIds: ["inspection", "aql"],
    seo: {
      title: "Apparel inspection and acceptance standards",
      description:
        "Inline and final inspection against an agreed reference sample, defect classification and sampling plan, with third party inspection supported.",
    },
  },
  {
    slug: "logistics-and-export",
    name: "Logistics and export",
    group: "assurance",
    summary:
      "Moving finished goods from the factory to your destination with the documentation the shipment needs.",
    introduction: [
      "Export is a documentation exercise as much as a transport one. A shipment with correct goods and incorrect paperwork stops at the border, and the cost of that delay usually exceeds any saving made elsewhere.",
      "We prepare shipping documentation against your confirmed order and work with your nominated forwarder where you have one. Responsibility for freight, insurance, duties and clearance follows the Incoterm agreed in the quotation, which is stated explicitly so there is no ambiguity.",
    ],
    verification: "verified",
    capabilityStatus: "developed-and-sourced",
    processStages: [
      { title: "Term confirmation", description: "The Incoterm and destination are confirmed in the quotation." },
      { title: "Booking", description: "Space is booked with your nominated forwarder or one we propose." },
      { title: "Documentation", description: "Commercial invoice, packing list and origin documentation are prepared." },
      { title: "Dispatch", description: "Goods are dispatched and documents are released per the agreed terms." },
    ],
    suitableProducts: ["All manufactured products"],
    materialCompatibility: ["Applies across all manufactured products"],
    techniques: ["Sea freight", "Air freight", "Consolidated shipments", "Buyer nominated forwarder coordination"],
    limitations: [
      "Transit times are set by carriers and ports and are outside our control.",
      "Duties, taxes and customs clearance in the destination country follow the agreed Incoterm and are usually the buyer's responsibility.",
      "Preferential origin treatment depends on the destination market and is confirmed case by case rather than assumed.",
    ],
    qualityCheckpoints: ["Document accuracy review before dispatch", "Carton count and weight verification against the packing list"],
    relatedMaterials: [],
    faqIds: ["shipping-terms", "compliance"],
    seo: {
      title: "Export logistics and shipping documentation",
      description:
        "Incoterm based quotation, forwarder coordination and accurate export documentation for shipments to the USA, UK and Europe.",
    },
  },
];
