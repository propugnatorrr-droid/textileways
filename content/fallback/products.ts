import type { ProductFamily } from "@/content/types";
import { productMedia, factoryMedia } from "./media";

/**
 * The thirteen product families.
 *
 * Each record carries a `capabilityStatus` that states truthfully how the
 * category is produced. Nothing here implies that every category runs on the
 * same equipment under one roof.
 */
export const productFamilies: ProductFamily[] = [
  {
    slug: "everyday-apparel",
    name: "Everyday apparel",
    summary:
      "Tee shirts, sweatshirts, polos and the basics that most brands launch with and reorder indefinitely.",
    introduction: [
      "Everyday apparel is where most brands start and where most of their volume eventually sits. The category looks simple, which is exactly why it punishes imprecision: a tee shirt has few enough components that any inconsistency in fabric weight, neck construction or shrinkage is immediately visible to the customer.",
      "We treat basics as a specification exercise rather than a commodity purchase. Yarn quality, fabric weight, neck tape, shoulder seam construction and post wash measurements are all recorded, approved and then held constant across reorders.",
      "This is also the category where a fifty piece validation run makes the most sense. It costs little to confirm that your fit, your fabric and your print are right before you commit to a season.",
    ],
    capabilityStatus: "in-house",
    hero: productMedia["everyday-apparel"],
    gallery: [factoryMedia.sewing, factoryMedia.inspection, factoryMedia.printing],
    productTypes: [
      { name: "Short sleeve tee shirts", description: "Single jersey in a range of weights, with taped neck and either single or twin needle finishing." },
      { name: "Long sleeve tee shirts", description: "The same body constructions with cuffed or plain hemmed sleeves." },
      { name: "Crew neck sweatshirts", description: "French terry or brushed fleece with ribbed collar, cuffs and hem." },
      { name: "Pullover and zip hoodies", description: "Lined or unlined hoods, with drawcord, eyelet and pocket options specified per style." },
      { name: "Polo shirts", description: "Pique or jersey bodies with knitted or self fabric collars and placket options." },
      { name: "Vests and tank tops", description: "Ribbed or jersey bodies with binding or self fabric finishing at neck and armhole." },
    ],
    typicalMaterials: ["cotton", "organic-cotton", "french-terry", "brushed-fleece", "pique", "cotton-polyester-blend"],
    weightGuidance: [
      { label: "Tee shirt jersey", value: "140 to 200 gsm", note: "180 gsm is the common mid market reference point." },
      { label: "Premium tee shirt jersey", value: "200 to 240 gsm", note: "Heavier jersey reads as premium and holds shape better." },
      { label: "Sweatshirt terry", value: "280 to 340 gsm" },
      { label: "Heavyweight fleece", value: "350 to 450 gsm" },
      { label: "Polo pique", value: "180 to 220 gsm" },
    ],
    constructionOptions: [
      "Set in or drop shoulder",
      "Single or twin needle hem and sleeve finishing",
      "Taped shoulder and neck for stability",
      "Ribbed or self fabric collar",
      "Side seamed or tubular body",
      "Reinforced bartacks at stress points",
    ],
    decorationOptions: ["screen-printing", "dtg-printing", "dtf-printing", "embroidery", "applique", "heat-transfer"],
    labellingAndPackaging: [
      "Woven or printed main labels",
      "Tagless heat transfer labels where the fabric allows",
      "Care and fibre content labels to your approved wording",
      "Individual polybagging or reduced packaging alternatives",
      "Hangtags and barcode ticketing for retail ready goods",
    ],
    moqGuidance:
      "MOQ depends on material availability, colour count, construction, decoration and packaging. Projects can begin from approximately 50 pieces per style following technical review. Stock fabric in standard colours supports the lowest quantities; custom dyed colours follow dye house batch minimums.",
    samplingGuidance:
      "A proto sample confirms construction, a fit sample confirms measurements against your chart, and a pre production sample in bulk fabric fixes every detail before production is released.",
    qualityNotes: [
      "Post wash measurements are recorded, since cotton jersey relaxes and shrinks after laundering.",
      "Neck stretch and recovery are checked, because a failed neckline is the most common basics complaint.",
      "Print cure temperature is verified and a wash test is run on the approved strike off.",
      "Shade lots are segregated at cutting so a single garment never combines panels from different dye batches.",
    ],
    marketNotes: [
      "Fibre content and care labelling requirements differ between the USA, the UK and the European Union, and the wording is confirmed with you before production.",
      "Size expectations differ by market. A size range intended for the USA is graded differently from one intended for continental Europe.",
    ],
    relatedCapabilities: ["cut-and-sew-manufacturing", "screen-printing", "embroidery", "private-labelling", "quality-assurance"],
    relatedMaterials: ["cotton", "organic-cotton", "french-terry", "pique"],
    relatedIndustries: ["fashion-brands", "retail-and-wholesale", "promotional-products"],
    faqIds: ["minimum-order", "sampling", "gsm-meaning", "decoration-options"],
    seo: {
      title: "Everyday apparel manufacturing",
      description:
        "Tee shirts, sweatshirts, hoodies and polo shirts manufactured to specification from approximately 50 pieces, with controlled fabric weight and post wash measurement.",
    },
    facets: {
      industries: ["fashion-brands", "retail-and-wholesale", "promotional-products", "education"],
      materialTypes: ["natural-fibers", "knitted-fabrics", "recycled-and-lower-impact"],
      decoration: ["screen-printing", "dtg-printing", "dtf-printing", "embroidery"],
      markets: ["usa", "europe", "uk"],
    },
  },
  {
    slug: "streetwear",
    name: "Streetwear",
    summary:
      "Heavyweight hoodies, oversized tees and boxy cut and sew pieces where fabric weight and finish carry the brand.",
    introduction: [
      "Streetwear is a construction category disguised as a style category. What separates a credible product from a printed blank is fabric weight, silhouette and finishing: the way a garment sits on the shoulders, whether it holds a boxy line, and whether the hem and cuff hold their shape after ten washes.",
      "That means most streetwear projects are cut and sew from the start rather than decorated blanks. The pattern is drafted for the intended drop shoulder or boxy fit, and the fabric is chosen for weight rather than for cost per piece.",
      "Garment washing is often part of the specification, because it sets the final handfeel and stabilises dimensions. When it is used, the wash standard is approved and retained so a second drop matches the first.",
    ],
    capabilityStatus: "in-house",
    hero: productMedia.streetwear,
    gallery: [factoryMedia.printing, factoryMedia.embroidery, factoryMedia.sewing],
    productTypes: [
      { name: "Heavyweight hoodies", description: "380 to 450 gsm fleece with double lined hoods and heavy ribbing." },
      { name: "Oversized tee shirts", description: "Drop shoulder patterns cut for volume rather than sized up from a standard block." },
      { name: "Boxy crew necks", description: "Wide body, short length constructions with structured ribbing." },
      { name: "Sweat shorts and joggers", description: "Terry or fleece bottoms with drawcord, elastic and pocket detailing." },
      { name: "Cut and sew jackets", description: "Coach jackets, work jackets and overshirts in canvas, twill or heavy knit." },
      { name: "Caps and headwear", description: "Structured and unstructured caps with embroidery or applied patches." },
    ],
    typicalMaterials: ["brushed-fleece", "french-terry", "cotton", "canvas", "denim"],
    weightGuidance: [
      { label: "Premium hoodie fleece", value: "380 to 450 gsm", note: "The weight most associated with premium streetwear positioning." },
      { label: "Mid weight terry", value: "300 to 360 gsm" },
      { label: "Oversized tee jersey", value: "200 to 260 gsm", note: "Lighter jersey drapes rather than holding a boxy line." },
      { label: "Jacket canvas", value: "280 to 400 gsm" },
    ],
    constructionOptions: [
      "Drop shoulder and boxy blocks drafted specifically",
      "Double lined hoods with metal or self fabric eyelets",
      "Heavy 2x2 rib at cuff and hem",
      "Garment washed or garment dyed finishing",
      "Contrast stitching and exposed seam detailing",
      "Woven or leather patch branding",
    ],
    decorationOptions: ["screen-printing", "dtf-printing", "embroidery", "applique", "patches-and-badges"],
    labellingAndPackaging: [
      "Woven main labels and neck patches",
      "Leather or synthetic leather branded patches",
      "Custom hangtags with brand story",
      "Retail ready polybagging and barcode ticketing",
      "Custom printed mailer or box packaging",
    ],
    moqGuidance:
      "MOQ depends on material availability, colour count, construction, decoration and packaging. Cut and sew streetwear can begin from approximately 50 pieces per style following technical review, though garment washing and custom fabric weights raise the practical minimum because a wash recipe is developed per style.",
    samplingGuidance:
      "Silhouette is confirmed on a proto sample before fabric is committed, since fit is the defining feature of the category. Where garment washing is specified, an approved wash standard garment is retained by both parties.",
    qualityNotes: [
      "Ribbing recovery is tested, because stretched cuffs are the most visible failure in heavyweight sweat product.",
      "Post wash measurements are recorded when garment washing is part of the specification.",
      "Print behaviour on brushed fleece is confirmed on a strike off, since the raised pile affects fine detail.",
      "Pilling resistance is checked on the sample where the garment is positioned as a multi season product.",
    ],
    marketNotes: [
      "Oversized fit expectations differ noticeably between markets, so the block is confirmed against your target customer rather than assumed.",
      "Heavier garments increase shipping weight, which materially affects landed cost on air freight.",
    ],
    relatedCapabilities: ["cut-and-sew-manufacturing", "washing-and-garment-finishing", "screen-printing", "embroidery", "patches-and-badges"],
    relatedMaterials: ["brushed-fleece", "french-terry", "canvas", "denim"],
    relatedIndustries: ["streetwear-brands", "fashion-brands", "retail-and-wholesale"],
    faqIds: ["minimum-order", "sampling", "decoration-options", "reorders"],
    seo: {
      title: "Streetwear manufacturing",
      description:
        "Heavyweight hoodies, oversized tees and cut and sew streetwear built around fabric weight, silhouette and controlled garment washing.",
    },
    facets: {
      industries: ["streetwear-brands", "fashion-brands", "retail-and-wholesale"],
      materialTypes: ["knitted-fabrics", "woven-fabrics", "natural-fibers"],
      decoration: ["screen-printing", "dtf-printing", "embroidery", "patches-and-badges"],
      markets: ["usa", "europe", "uk"],
    },
  },
  {
    slug: "sportswear-and-activewear",
    name: "Sportswear and activewear",
    summary:
      "Performance apparel and team kit where fabric behaviour, stretch and print durability decide the product.",
    introduction: [
      "Sportswear is judged in use rather than on a hanger. A training top has to move with the wearer, manage moisture, survive frequent laundering and keep its graphics intact, and those are fabric and construction properties rather than design ones.",
      "The category divides cleanly by decoration route. Sublimated product is printed before assembly, which allows full coverage graphics and per piece personalisation. Cut and sew product from dyed fabric is decorated afterwards, which suits simpler branding at higher volume.",
      "Team programmes add a specific operational requirement: names, numbers and sizes that differ on every piece. That is a data handling exercise as much as a manufacturing one, and it is where most teamwear orders go wrong.",
    ],
    capabilityStatus: "in-house",
    hero: productMedia["sportswear-and-activewear"],
    gallery: [factoryMedia.printing, factoryMedia.sewing, factoryMedia.inspection],
    productTypes: [
      { name: "Training and gym tops", description: "Performance jersey and mesh with flatlock or coverstitch seams." },
      { name: "Team jerseys", description: "Sublimated panels cut and assembled, with name and number personalisation." },
      { name: "Leggings and tights", description: "High elastane knits with gusset panels and waistband construction options." },
      { name: "Shorts", description: "Woven or knitted shorts with liner, drawcord and pocket options." },
      { name: "Tracksuits and warm ups", description: "Matched jacket and trouser sets in performance knit or woven fabric." },
      { name: "Sports bras and base layers", description: "Supportive constructions in high stretch fabric, produced cut and sew or seamless." },
    ],
    typicalMaterials: ["polyester", "recycled-polyester", "elastane-blends", "nylon"],
    weightGuidance: [
      { label: "Performance jersey", value: "130 to 180 gsm" },
      { label: "Mesh panels", value: "100 to 150 gsm" },
      { label: "Legging fabric", value: "200 to 280 gsm", note: "Heavier fabric gives opacity and compression." },
      { label: "Training fleece", value: "260 to 320 gsm" },
    ],
    constructionOptions: [
      "Flatlock seams to reduce chafing",
      "Coverstitch hemming for stretch retention",
      "Mesh ventilation panels at defined zones",
      "Elastic or bonded waistbands",
      "Raglan or set in sleeve construction",
      "Reflective detailing for low light use",
    ],
    decorationOptions: ["sublimation", "heat-transfer", "dtf-printing", "screen-printing", "embroidery"],
    labellingAndPackaging: [
      "Tagless heat transfer labels to avoid skin irritation",
      "Woven labels where the construction allows",
      "Per piece polybagging with name and size marking for team orders",
      "Team kit packed by player or by size assortment",
    ],
    moqGuidance:
      "MOQ depends on material availability, colour count, construction, decoration and packaging. Sublimated teamwear can support lower quantities because artwork is applied per piece rather than through screens. Cut and sew product from custom dyed performance fabric follows dye house minimums, which are usually higher.",
    samplingGuidance:
      "Fit is confirmed in the actual performance fabric rather than a substitute, because stretch and recovery change the fit materially. Sublimated colour is approved on a pressed sample, never on a printed transfer sheet.",
    qualityNotes: [
      "Stretch and recovery are tested, since a fabric that stretches without recovering produces a garment that bags out.",
      "Print durability is wash tested, particularly on garments laundered several times a week.",
      "Panel alignment is checked on all over sublimated designs so graphics match across seams.",
      "Name and number accuracy is verified against the order list before packing.",
    ],
    marketNotes: [
      "Team and club programmes frequently repeat annually, so retained artwork files and approved samples matter more than in seasonal categories.",
      "Sizing expectations for performance apparel differ significantly between the USA and European markets.",
    ],
    relatedCapabilities: ["sublimation", "cut-and-sew-manufacturing", "seamless-manufacturing", "heat-transfer", "quality-assurance"],
    relatedMaterials: ["polyester", "recycled-polyester", "elastane-blends"],
    relatedIndustries: ["sports-clubs-and-teams", "fashion-brands", "education", "retail-and-wholesale"],
    faqIds: ["decoration-options", "minimum-order", "sampling", "reorders"],
    seo: {
      title: "Sportswear and activewear manufacturing",
      description:
        "Performance apparel and team kit with sublimated graphics, flatlock construction, stretch recovery testing and per piece personalisation.",
    },
    facets: {
      industries: ["sports-clubs-and-teams", "education", "fashion-brands", "retail-and-wholesale"],
      materialTypes: ["synthetic-and-performance", "knitted-fabrics", "recycled-and-lower-impact"],
      decoration: ["sublimation", "heat-transfer", "dtf-printing", "embroidery"],
      markets: ["usa", "europe", "uk"],
    },
  },
  {
    slug: "outdoor-and-performance",
    name: "Outdoor and performance",
    summary:
      "Shells, mid layers and technical outerwear where construction and finishing determine whether the product works.",
    introduction: [
      "Outdoor product carries a functional promise. A jacket described as water resistant has to behave that way in rain, and the difference between resistant and waterproof is a construction decision involving seam sealing, zip selection and fabric coating.",
      "We describe these products in terms of what the construction actually delivers rather than in marketing language. Where a specification calls for taped seams or a laminated membrane, feasibility is confirmed on technical review before it is offered.",
      "Layering logic drives the category. A shell, an insulating mid layer and a base layer each solve a different problem, and specifying them as a system produces a better result than developing them separately.",
    ],
    capabilityStatus: "after-technical-review",
    hero: productMedia["outdoor-and-performance"],
    gallery: [factoryMedia.sewing, factoryMedia.inspection, factoryMedia.fabricStore],
    productTypes: [
      { name: "Windbreakers and light shells", description: "Lightweight nylon or polyester shells with water repellent finishing." },
      { name: "Insulated jackets", description: "Quilted or padded constructions with synthetic insulation." },
      { name: "Softshell jackets", description: "Bonded stretch fabric offering wind resistance with mobility." },
      { name: "Fleece mid layers", description: "Brushed or grid fleece designed for warmth to weight." },
      { name: "Technical trousers", description: "Stretch woven trousers with articulated knees and reinforced panels." },
      { name: "Base layers", description: "Close fitting moisture managing layers, cut and sew or seamless." },
    ],
    typicalMaterials: ["nylon", "polyester", "recycled-polyester", "elastane-blends"],
    weightGuidance: [
      { label: "Shell fabric", value: "40 to 90 gsm", note: "Lighter shells pack smaller but abrade faster." },
      { label: "Softshell", value: "200 to 300 gsm" },
      { label: "Grid fleece", value: "150 to 220 gsm" },
      { label: "Insulation fill", value: "40 to 150 gsm", note: "Specified separately from the shell and lining fabrics." },
    ],
    constructionOptions: [
      "Water repellent finishing on shell fabrics",
      "Taped or sealed seams where the specification requires it",
      "Water resistant zips",
      "Articulated sleeves and knees for mobility",
      "Adjustable hoods, cuffs and hems",
      "Reflective detailing",
    ],
    decorationOptions: ["heat-transfer", "patches-and-badges", "embroidery", "dtf-printing"],
    labellingAndPackaging: [
      "Heat transfer labels where stitching would perforate a waterproof layer",
      "Woven labels on non waterproof constructions",
      "Care labels stating the maintenance a water repellent finish requires",
      "Compression or standard polybagging depending on the product",
    ],
    moqGuidance:
      "MOQ depends on material availability, colour count, construction, decoration and packaging. Technical shell fabrics carry higher minimums than commodity knitwear, particularly in custom colours, and taped seam construction is confirmed on technical review before it is quoted.",
    samplingGuidance:
      "Technical performance is confirmed on the sample rather than assumed from the fabric specification. Where water resistance is claimed, the construction is tested on a made up garment.",
    qualityNotes: [
      "Seam integrity is checked, since a sealed seam that fails makes the whole garment fail.",
      "Zip function is tested across the full range of travel on every finished piece.",
      "Water repellent finish performance is confirmed on the sample and its expected service life stated honestly.",
      "Embroidery is avoided on waterproof panels because it perforates the barrier.",
    ],
    marketNotes: [
      "Performance claims are regulated differently across markets, and any claim printed on the product is agreed with you before production.",
      "European outdoor buyers commonly expect published fabric specifications, so those are recorded during development.",
    ],
    relatedCapabilities: ["cut-and-sew-manufacturing", "material-sourcing", "heat-transfer", "laboratory-testing-coordination", "inspection"],
    relatedMaterials: ["nylon", "polyester", "recycled-polyester"],
    relatedIndustries: ["fashion-brands", "retail-and-wholesale", "construction-and-industrial"],
    faqIds: ["compliance", "sampling", "minimum-order"],
    seo: {
      title: "Outdoor and technical performance apparel manufacturing",
      description:
        "Shells, insulated jackets, softshells and base layers with honest construction descriptions and feasibility confirmed on technical review.",
    },
    facets: {
      industries: ["fashion-brands", "retail-and-wholesale", "construction-and-industrial"],
      materialTypes: ["synthetic-and-performance", "recycled-and-lower-impact", "woven-fabrics"],
      decoration: ["heat-transfer", "patches-and-badges", "embroidery"],
      markets: ["usa", "europe", "uk"],
    },
  },
  {
    slug: "workwear-and-uniforms",
    name: "Workwear and uniforms",
    summary:
      "Uniform programmes judged on durability, laundering performance and consistency across repeat orders.",
    introduction: [
      "Uniform buyers have a different problem from fashion buyers. They are not buying a season, they are buying a programme that has to look identical when a new employee is issued a garment three years after the first order.",
      "That makes consistency the primary product attribute. Retained approved samples, locked fabric specifications and recorded colour standards are what allow a reorder to match, and they matter more than anything visible in a photograph.",
      "The second requirement is laundering performance. A garment that is washed commercially several times a week ages very differently from one washed at home, and the fabric decision has to reflect the actual laundering regime.",
    ],
    capabilityStatus: "in-house",
    hero: productMedia["workwear-and-uniforms"],
    gallery: [factoryMedia.embroidery, factoryMedia.inspection, factoryMedia.packing],
    productTypes: [
      { name: "Corporate polo shirts", description: "Pique or jersey polos with embroidered branding and consistent colour." },
      { name: "Corporate and hospitality shirts", description: "Poplin or twill shirts with easy care finishing." },
      { name: "Healthcare scrubs", description: "Blended fabric tops and trousers built for frequent high temperature laundering." },
      { name: "Work trousers and cargo trousers", description: "Reinforced construction with utility pockets and bartacked stress points." },
      { name: "Work jackets and fleeces", description: "Durable outer layers with branding positions defined for the programme." },
      { name: "Aprons and service wear", description: "Canvas or blended aprons for hospitality and food service." },
      { name: "High visibility garments", description: "High visibility apparel produced to your specified standard, confirmed on technical review." },
    ],
    typicalMaterials: ["cotton-polyester-blend", "pique", "poplin", "canvas", "denim"],
    weightGuidance: [
      { label: "Uniform polo pique", value: "200 to 220 gsm" },
      { label: "Shirting poplin", value: "110 to 140 gsm" },
      { label: "Scrub fabric", value: "140 to 180 gsm" },
      { label: "Work trouser twill", value: "240 to 320 gsm" },
      { label: "Apron canvas", value: "280 to 400 gsm" },
    ],
    constructionOptions: [
      "Reinforced bartacks at stress points",
      "Triple stitched main seams for heavy use",
      "Utility and tool pockets to specification",
      "Easy care and soil release finishing",
      "Fitted and relaxed blocks within one programme",
      "Extended size ranges for workplace inclusivity",
    ],
    decorationOptions: ["embroidery", "screen-printing", "heat-transfer", "patches-and-badges", "dtf-printing"],
    labellingAndPackaging: [
      "Woven labels with programme or department identification",
      "Size labels sized for quick identification in a stock room",
      "Individual polybagging with size marking",
      "Assorted or solid size carton packing for distribution",
      "Employee name labelling where the programme requires it",
    ],
    moqGuidance:
      "MOQ depends on material availability, colour count, construction, decoration and packaging. Uniform fabrics are widely stocked in standard colours, which usually supports lower quantities than fashion categories. Corporate colours outside the stock range follow dye house batch minimums.",
    samplingGuidance:
      "A wearer trial is recommended before a large programme is committed, since comfort and laundering performance only reveal themselves in use. Approved samples are retained by both parties as the reference for every reorder.",
    qualityNotes: [
      "Industrial laundering behaviour is confirmed where garments are commercially laundered.",
      "Colour consistency across reorders is controlled against a retained colour standard.",
      "Embroidery placement is checked against the programme standard so every garment matches.",
      "Seam strength is checked on garments intended for physically demanding work.",
    ],
    marketNotes: [
      "Protective and high visibility garments are subject to standards that differ by market, and any such requirement is confirmed on technical review rather than assumed.",
      "Public sector and large corporate buyers frequently require documented supplier information, which is prepared on request.",
    ],
    relatedCapabilities: ["cut-and-sew-manufacturing", "embroidery", "private-labelling", "quality-assurance", "inspection"],
    relatedMaterials: ["cotton-polyester-blend", "pique", "poplin", "canvas"],
    relatedIndustries: ["corporate-uniforms", "hospitality", "healthcare", "construction-and-industrial", "education"],
    faqIds: ["reorders", "compliance", "inspection", "minimum-order"],
    seo: {
      title: "Workwear and uniform manufacturing",
      description:
        "Uniform programmes built for consistency across reorders, with retained colour standards, laundering performance testing and durable construction.",
    },
    facets: {
      industries: ["corporate-uniforms", "hospitality", "healthcare", "construction-and-industrial", "education"],
      materialTypes: ["knitted-fabrics", "woven-fabrics", "natural-fibers"],
      decoration: ["embroidery", "screen-printing", "heat-transfer", "patches-and-badges"],
      markets: ["usa", "europe", "uk"],
    },
  },
  {
    slug: "underwear-sleepwear-loungewear",
    name: "Underwear, sleepwear and loungewear",
    summary:
      "Next to skin product where fabric handfeel, seam comfort and labelling decisions define the experience.",
    introduction: [
      "Next to skin garments are judged by touch. Fabric handfeel, seam construction and even the choice between a stitched label and a printed one determine whether a customer keeps wearing the product or quietly stops.",
      "That is why tagless labelling is standard in this category rather than optional, and why flatlock and bound seams are specified in places where a conventional overlock would be felt against the skin.",
      "Loungewear has grown into a category of its own, sitting between sleepwear and casual apparel. It uses similar fabrics with a more considered fit, and it frequently sells as a coordinated set rather than as separates.",
    ],
    capabilityStatus: "in-house",
    hero: productMedia["underwear-sleepwear-loungewear"],
    gallery: [factoryMedia.sewing, factoryMedia.fabricStore, factoryMedia.inspection],
    productTypes: [
      { name: "Tee shirt and short sets", description: "Coordinated loungewear sets in jersey or terry." },
      { name: "Pyjama sets", description: "Woven or knitted sets with piping, contrast trims and pocket options." },
      { name: "Robes", description: "Terry or woven robes with belt, loops and pocket construction." },
      { name: "Boxers and briefs", description: "Knitted underwear with elastic or covered waistbands." },
      { name: "Camisoles and slips", description: "Lightweight next to skin layers with bound or bias finishing." },
      { name: "Lounge trousers and joggers", description: "Relaxed bottoms in terry, jersey or brushed woven fabric." },
    ],
    typicalMaterials: ["cotton", "organic-cotton", "french-terry", "poplin", "elastane-blends"],
    weightGuidance: [
      { label: "Lightweight jersey", value: "120 to 160 gsm" },
      { label: "Loungewear terry", value: "240 to 320 gsm" },
      { label: "Woven pyjama fabric", value: "100 to 150 gsm" },
      { label: "Robe terry", value: "350 to 500 gsm" },
    ],
    constructionOptions: [
      "Flatlock and bound seams for skin comfort",
      "Tagless printed or heat transfer labelling",
      "Covered elastic waistbands",
      "Piping and contrast binding",
      "Coordinated set construction",
      "Side seam free tubular bodies where suitable",
    ],
    decorationOptions: ["screen-printing", "dtg-printing", "embroidery", "dtf-printing"],
    labellingAndPackaging: [
      "Tagless heat transfer labels as the category standard",
      "Printed satin labels where a stitched label is required",
      "Set packaging where items sell as a coordinated pair",
      "Gift boxed presentation for retail",
      "Care labelling appropriate to delicate fabrics",
    ],
    moqGuidance:
      "MOQ depends on material availability, colour count, construction, decoration and packaging. Sets carry an effective minimum per component, so a two piece set at 50 sets requires 50 of each piece in each size.",
    samplingGuidance:
      "Fabric handfeel is approved on a physical swatch before sampling, because it is the deciding attribute in this category and cannot be assessed from a specification sheet.",
    qualityNotes: [
      "Seam comfort is assessed on the sample by handling rather than only by measurement.",
      "Elastic recovery is tested on waistbands, since failure there ends the garment's usable life.",
      "Colour fastness to perspiration is relevant for next to skin product and can be tested on request.",
      "Set components are checked for colour match, since a set with mismatched shades is unsellable.",
    ],
    marketNotes: [
      "Sleepwear for children is subject to specific safety requirements in several markets, and those are confirmed with you before production.",
      "Size and fit expectations for underwear differ substantially between markets and are graded accordingly.",
    ],
    relatedCapabilities: ["cut-and-sew-manufacturing", "private-labelling", "custom-packaging", "seamless-manufacturing"],
    relatedMaterials: ["cotton", "organic-cotton", "french-terry", "elastane-blends"],
    relatedIndustries: ["fashion-brands", "retail-and-wholesale", "hospitality"],
    faqIds: ["minimum-order", "sampling", "private-label"],
    seo: {
      title: "Underwear, sleepwear and loungewear manufacturing",
      description:
        "Next to skin apparel with comfort led seam construction, tagless labelling and coordinated set production.",
    },
    facets: {
      industries: ["fashion-brands", "retail-and-wholesale", "hospitality"],
      materialTypes: ["natural-fibers", "knitted-fabrics", "woven-fabrics"],
      decoration: ["screen-printing", "dtg-printing", "embroidery"],
      markets: ["usa", "europe", "uk"],
    },
  },
  {
    slug: "children-and-baby",
    name: "Children and baby",
    summary:
      "Apparel for children, where safety requirements and component selection carry more weight than styling.",
    introduction: [
      "Children's apparel is the category where compliance drives construction. Drawcords, small components, fastening strength and fabric chemistry are all regulated in the markets we serve, and the rules differ between them.",
      "We build those requirements into the specification rather than treating them as a final check. Component choices are made with the applicable standard in mind, and testing is coordinated where evidence is required.",
      "Responsibility for confirming which standards apply to your product and your market remains with you as the brand owner. What we do is make sure nothing in the construction quietly contradicts what you have specified.",
    ],
    capabilityStatus: "after-technical-review",
    hero: productMedia["children-and-baby"],
    gallery: [factoryMedia.sewing, factoryMedia.inspection, factoryMedia.laboratory],
    productTypes: [
      { name: "Baby bodysuits", description: "Snap fastened bodysuits with envelope necklines for easy dressing." },
      { name: "Sleepsuits and rompers", description: "All in one garments with fastening layouts designed for changing." },
      { name: "Children's tee shirts and tops", description: "Jersey tops with neck openings sized for a child's head." },
      { name: "Children's sweatshirts and hoodies", description: "Fleece and terry outerwear with drawcord free hood constructions." },
      { name: "Children's trousers and leggings", description: "Comfort waistbands with reinforced knees where appropriate." },
      { name: "School uniform items", description: "Durable polos, sweatshirts and trousers for institutional programmes." },
    ],
    typicalMaterials: ["cotton", "organic-cotton", "cotton-polyester-blend", "french-terry"],
    weightGuidance: [
      { label: "Baby jersey", value: "160 to 200 gsm", note: "Heavier than adult jersey to survive frequent washing." },
      { label: "Children's jersey", value: "150 to 190 gsm" },
      { label: "Children's fleece", value: "260 to 320 gsm" },
    ],
    constructionOptions: [
      "Nickel free snap fasteners with pull strength testing",
      "Drawcord free hood constructions",
      "Envelope necklines on baby garments",
      "Flatlock seams to reduce irritation",
      "Reinforced knees on active wear",
      "Fold over cuffs on baby garments",
    ],
    decorationOptions: ["screen-printing", "dtg-printing", "embroidery", "applique"],
    labellingAndPackaging: [
      "Soft printed or tagless labels to avoid irritation",
      "Care labels stating the frequent laundering the category receives",
      "Age and size labelling to your market convention",
      "Packaging that avoids small detachable components",
    ],
    moqGuidance:
      "MOQ depends on material availability, colour count, construction, decoration and packaging. Children's ranges span many sizes, so the effective minimum is the per style minimum multiplied across the size range you intend to offer.",
    samplingGuidance:
      "Component safety testing is planned into the sampling schedule rather than treated as a final step, because a failed fastener test after production is expensive to correct.",
    qualityNotes: [
      "Fastener pull strength is tested on samples, since detached components are a recognised hazard.",
      "Needle detection is applied where the buyer or market requires it, confirmed on technical review.",
      "Restricted substance testing can be coordinated with an accredited laboratory.",
      "Print chemistry is selected with next to skin contact in mind.",
    ],
    marketNotes: [
      "Children's apparel safety standards differ between the USA, the UK and the European Union, and applicable requirements are confirmed with you.",
      "Age labelling conventions differ by market and are applied exactly as you specify.",
    ],
    relatedCapabilities: ["cut-and-sew-manufacturing", "laboratory-testing-coordination", "inspection", "private-labelling"],
    relatedMaterials: ["cotton", "organic-cotton", "cotton-polyester-blend"],
    relatedIndustries: ["fashion-brands", "retail-and-wholesale", "education"],
    faqIds: ["compliance", "sampling", "minimum-order"],
    seo: {
      title: "Children and baby apparel manufacturing",
      description:
        "Children's and baby apparel with safety led component selection, fastener strength testing and coordinated laboratory testing.",
    },
    facets: {
      industries: ["fashion-brands", "retail-and-wholesale", "education"],
      materialTypes: ["natural-fibers", "knitted-fabrics", "recycled-and-lower-impact"],
      decoration: ["screen-printing", "dtg-printing", "embroidery", "applique"],
      markets: ["usa", "europe", "uk"],
    },
  },
  {
    slug: "swim-and-resort",
    name: "Swim and resort",
    summary:
      "Swimwear and warm weather apparel where fabric chemistry and colour fastness are tested by real conditions.",
    introduction: [
      "Swimwear faces conditions no other apparel category meets: chlorine, salt water, ultraviolet light and repeated stretching while wet. Fabric and elastane choices that work perfectly in gym apparel can degrade quickly in a pool.",
      "Colour fastness is the visible consequence. A swim short that fades after one season damages a brand more than a construction fault would, because the customer sees it on every wear.",
      "Resort apparel sits alongside swim as a coordinated offer, usually in lightweight woven fabrics with prints developed to match the swim range.",
    ],
    capabilityStatus: "after-technical-review",
    hero: productMedia["swim-and-resort"],
    gallery: [factoryMedia.printing, factoryMedia.sewing, factoryMedia.fabricStore],
    productTypes: [
      { name: "Swim shorts", description: "Woven swim shorts with mesh liner, elastic waist and drawcord." },
      { name: "Board shorts", description: "Longer length shorts with flat waistband and fly closure." },
      { name: "Swimsuits and bikinis", description: "Knitted swim fabric constructions with lining and elastic finishing." },
      { name: "Rash guards", description: "Close fitting tops in swim knit, often with sun protective fabric." },
      { name: "Resort shirts", description: "Lightweight woven shirts, frequently printed to coordinate with swim." },
      { name: "Beach cover ups", description: "Loose woven or knitted layers for over swimwear." },
    ],
    typicalMaterials: ["polyester", "recycled-polyester", "nylon", "elastane-blends", "poplin"],
    weightGuidance: [
      { label: "Swim knit", value: "180 to 240 gsm", note: "Heavier fabric gives opacity and better recovery when wet." },
      { label: "Swim short woven", value: "80 to 140 gsm" },
      { label: "Mesh liner", value: "80 to 120 gsm" },
      { label: "Resort shirt fabric", value: "100 to 150 gsm" },
    ],
    constructionOptions: [
      "Mesh or brief style liners",
      "Elastic waistbands with drawcord",
      "Bound or elasticated leg openings",
      "Chlorine resistant elastane where the fabric supports it",
      "Bonded or flatlock seams",
      "Sun protective fabric where specified and tested",
    ],
    decorationOptions: ["sublimation", "screen-printing", "heat-transfer", "embroidery"],
    labellingAndPackaging: [
      "Care labels stating rinsing and drying instructions honestly",
      "Heat transfer labels to avoid stitching through swim fabric",
      "Hygiene liners where retail requires them",
      "Retail hanger or folded presentation",
    ],
    moqGuidance:
      "MOQ depends on material availability, colour count, construction, decoration and packaging. Custom prints on swim fabric usually set the practical minimum, since print development is per design rather than per piece.",
    samplingGuidance:
      "Colour fastness to chlorine and seawater is confirmed during sampling where the product will be used in those conditions, rather than assumed from the fabric specification.",
    qualityNotes: [
      "Elastane degradation from chlorine is a known failure mode, and care instructions must reflect it.",
      "Seam strength is tested wet, because swim fabric behaves differently when saturated.",
      "Opacity is checked when wet, particularly on light colours, since this is a common product complaint.",
      "Print durability under ultraviolet exposure is assessed on the sample.",
    ],
    marketNotes: [
      "Sun protection claims are regulated in several markets and require test evidence before they can be printed on a product.",
      "Swim sizing conventions differ significantly between the USA and Europe.",
    ],
    relatedCapabilities: ["cut-and-sew-manufacturing", "sublimation", "material-sourcing", "laboratory-testing-coordination"],
    relatedMaterials: ["polyester", "nylon", "elastane-blends", "recycled-polyester"],
    relatedIndustries: ["fashion-brands", "retail-and-wholesale", "hospitality"],
    faqIds: ["compliance", "sampling", "decoration-options"],
    seo: {
      title: "Swimwear and resort apparel manufacturing",
      description:
        "Swim shorts, swimsuits, rash guards and resort apparel with chlorine and ultraviolet fastness confirmed during sampling.",
    },
    facets: {
      industries: ["fashion-brands", "retail-and-wholesale", "hospitality"],
      materialTypes: ["synthetic-and-performance", "woven-fabrics", "recycled-and-lower-impact"],
      decoration: ["sublimation", "screen-printing", "heat-transfer"],
      markets: ["usa", "europe", "uk"],
    },
  },
  {
    slug: "denim-and-woven-products",
    name: "Denim and woven products",
    summary:
      "Jeans, shirting and woven outerwear, where wash development and pattern accuracy define the result.",
    introduction: [
      "Woven product is less forgiving than knitwear. There is no stretch to absorb a pattern inaccuracy, so a fit problem in a shirt or a pair of jeans is visible immediately and cannot be corrected at the sewing line.",
      "In denim specifically, the wash carries the product. The same base fabric produces completely different garments depending on the recipe applied afterwards, which is why an approved and retained wash standard is as important as the fabric specification.",
      "Shirting is the other half of this category, and its quality signals are precise: collar construction, placket alignment, pattern matching across seams and button attachment strength.",
    ],
    capabilityStatus: "after-technical-review",
    hero: productMedia["denim-and-woven-products"],
    gallery: [factoryMedia.cutting, factoryMedia.sewing, factoryMedia.inspection],
    productTypes: [
      { name: "Jeans", description: "Five pocket constructions in rigid or stretch denim with developed wash finishes." },
      { name: "Denim jackets", description: "Classic and modern denim outerwear with hardware and wash detailing." },
      { name: "Casual shirts", description: "Woven shirts in poplin, twill, oxford or flannel." },
      { name: "Formal shirts", description: "Structured collar and cuff constructions with easy care finishing." },
      { name: "Chinos and casual trousers", description: "Twill trousers with pocket and waistband options." },
      { name: "Overshirts and work jackets", description: "Heavier woven outer layers in twill or canvas." },
    ],
    typicalMaterials: ["denim", "poplin", "canvas", "cotton"],
    weightGuidance: [
      { label: "Light denim", value: "8 to 10 oz per square yard", note: "Suited to shirts and lighter weight jeans." },
      { label: "Standard denim", value: "11 to 14 oz per square yard" },
      { label: "Shirting poplin", value: "100 to 140 gsm" },
      { label: "Chino twill", value: "200 to 300 gsm" },
    ],
    constructionOptions: [
      "Five pocket denim construction with rivets and hardware",
      "Chain stitch hemming",
      "Collar and cuff interlining options for shirting",
      "Pattern matching across seams on checks and stripes",
      "Flat felled seams for durability",
      "Developed wash and finishing recipes",
    ],
    decorationOptions: ["embroidery", "patches-and-badges", "screen-printing", "washing-and-garment-finishing"],
    labellingAndPackaging: [
      "Leather or synthetic leather waistband patches",
      "Woven main labels and flashers",
      "Pocket flashers and size stickers for retail",
      "Hanger or folded presentation for retail",
    ],
    moqGuidance:
      "MOQ depends on material availability, colour count, construction, decoration and packaging. Denim carries higher practical minimums than knitwear because a wash recipe is developed per style, and yarn dyed shirting patterns are set at the loom rather than in finishing.",
    samplingGuidance:
      "For denim, a wash standard garment is approved and retained by both parties. For shirting, collar and cuff construction is confirmed on the sample, since these define perceived quality.",
    qualityNotes: [
      "Post wash measurements are recorded, since denim shrinks and relaxes considerably through wet processing.",
      "Hardware attachment strength is tested on rivets, buttons and studs.",
      "Pattern matching across seams is inspected on checks and stripes.",
      "Shade banding is checked across a wash lot, since wash variation is inherent and must stay within tolerance.",
    ],
    marketNotes: [
      "Denim wash preferences differ noticeably between the USA and European markets.",
      "Shirt sizing conventions differ, with neck and sleeve sizing more common in some markets than alpha sizing.",
    ],
    relatedCapabilities: ["cut-and-sew-manufacturing", "washing-and-garment-finishing", "weaving", "pattern-making", "inspection"],
    relatedMaterials: ["denim", "poplin", "canvas"],
    relatedIndustries: ["fashion-brands", "retail-and-wholesale", "corporate-uniforms"],
    faqIds: ["minimum-order", "sampling", "reorders"],
    seo: {
      title: "Denim and woven apparel manufacturing",
      description:
        "Jeans, shirting, chinos and woven outerwear with developed wash recipes, retained wash standards and pattern matched construction.",
    },
    facets: {
      industries: ["fashion-brands", "retail-and-wholesale", "corporate-uniforms"],
      materialTypes: ["woven-fabrics", "natural-fibers"],
      decoration: ["embroidery", "patches-and-badges", "screen-printing"],
      markets: ["usa", "europe", "uk"],
    },
  },
  {
    slug: "modest-and-cultural-apparel",
    name: "Modest and cultural apparel",
    summary:
      "Garments where coverage, drape and length are the specification, and fabric opacity is a functional requirement.",
    introduction: [
      "Modest apparel is defined by requirements that most size charts do not capture. Coverage, opacity, length and how a fabric drapes when it is loose rather than fitted are the attributes the customer actually judges.",
      "Opacity in particular is a functional specification rather than an aesthetic preference. A lightweight fabric that looks correct on a hanger can be unacceptable in daylight, so it is assessed under realistic lighting during sampling.",
      "The category spans a wide range of garments and cultural conventions. We work from your specification rather than assuming a regional default, and we confirm proportion decisions with you rather than interpreting them.",
    ],
    capabilityStatus: "after-technical-review",
    hero: productMedia["modest-and-cultural-apparel"],
    gallery: [factoryMedia.sewing, factoryMedia.fabricStore, factoryMedia.inspection],
    productTypes: [
      { name: "Long tunics and kurtas", description: "Extended length tops with side slits and sleeve length options." },
      { name: "Abayas and long outer layers", description: "Full length outer garments in fluid woven fabric." },
      { name: "Modest activewear", description: "Performance apparel with extended coverage and opaque fabric." },
      { name: "Maxi dresses and skirts", description: "Full length woven or knitted garments with lining where required." },
      { name: "Headscarves and hijabs", description: "Cut and finished lightweight fabric with edge finishing options." },
      { name: "Layering pieces", description: "Long sleeve underlayers designed for wear beneath other garments." },
    ],
    typicalMaterials: ["poplin", "cotton", "polyester", "elastane-blends"],
    weightGuidance: [
      { label: "Fluid woven fabric", value: "90 to 150 gsm", note: "Opacity is confirmed on the sample, since it varies with colour." },
      { label: "Tunic fabric", value: "120 to 180 gsm" },
      { label: "Modest activewear knit", value: "200 to 260 gsm" },
      { label: "Scarf fabric", value: "60 to 110 gsm" },
    ],
    constructionOptions: [
      "Extended lengths and sleeve lengths",
      "Lining for opacity where the outer fabric requires it",
      "Side slits and vents for movement",
      "Narrow rolled hems on lightweight fabrics",
      "Concealed fastenings",
      "Non slip finishes on headscarf fabrics where specified",
    ],
    decorationOptions: ["embroidery", "screen-printing", "dtf-printing", "applique"],
    labellingAndPackaging: [
      "Printed or woven labels positioned to avoid discomfort",
      "Care labelling appropriate to delicate fabrics",
      "Folded or hanger presentation depending on the garment",
      "Gift boxed presentation for premium ranges",
    ],
    moqGuidance:
      "MOQ depends on material availability, colour count, construction, decoration and packaging. Fluid woven fabrics in custom colours follow dye house minimums, which are usually higher than for stock knitwear.",
    samplingGuidance:
      "Drape and opacity are assessed on a made up sample under realistic lighting rather than judged from a fabric swatch, because both change once the fabric is cut and hangs at length.",
    qualityNotes: [
      "Opacity is verified on the finished garment under daylight conditions, since it is a functional requirement in this category.",
      "Hem finishing is inspected closely on lightweight fabrics, where a poor hem is immediately visible.",
      "Length consistency is checked across the size range, since proportion matters more here than in fitted categories.",
      "Colour fastness to rubbing is checked on darker fabrics worn against lighter layers.",
    ],
    marketNotes: [
      "Modest apparel sells across the USA, the UK, the European Union and the Middle East, with different proportion expectations in each.",
      "Garment naming and description conventions vary, and product terminology is confirmed with you.",
    ],
    relatedCapabilities: ["cut-and-sew-manufacturing", "pattern-making", "material-sourcing", "embroidery"],
    relatedMaterials: ["poplin", "cotton", "polyester"],
    relatedIndustries: ["fashion-brands", "retail-and-wholesale"],
    faqIds: ["sampling", "minimum-order", "materials-choice"],
    seo: {
      title: "Modest and cultural apparel manufacturing",
      description:
        "Modest apparel manufactured to your coverage, drape and length specification, with opacity verified on finished samples.",
    },
    facets: {
      industries: ["fashion-brands", "retail-and-wholesale"],
      materialTypes: ["woven-fabrics", "natural-fibers", "synthetic-and-performance"],
      decoration: ["embroidery", "screen-printing", "dtf-printing"],
      markets: ["usa", "europe", "uk"],
    },
  },
  {
    slug: "specialist-sports-products",
    name: "Specialist sports products",
    summary:
      "Textile based sports equipment and accessories that sit outside standard apparel construction.",
    introduction: [
      "Not everything a sports brand sells is a garment. Padded guards, kit bags, training aids and equipment covers are textile products with construction requirements that standard apparel lines are not set up for.",
      "These products carry higher tolerances and different failure modes. A seam that fails on a tee shirt is an inconvenience; a seam that fails on a loaded kit bag is a product recall conversation.",
      "Feasibility for this category is always confirmed on technical review, because each product carries its own construction requirement and no single blanket capability claim would be honest.",
    ],
    capabilityStatus: "after-technical-review",
    hero: productMedia["specialist-sports-products"],
    gallery: [factoryMedia.sewing, factoryMedia.inspection, factoryMedia.laboratory],
    productTypes: [
      { name: "Kit bags and holdalls", description: "Reinforced bags with load bearing straps and bartacked stress points." },
      { name: "Padded guards and supports", description: "Foam padded textile constructions with fastening systems." },
      { name: "Training aids", description: "Textile based training equipment such as bibs, markers and resistance accessories." },
      { name: "Equipment covers", description: "Protective covers produced to measured dimensions." },
      { name: "Team accessories", description: "Towels, wristbands and headwear coordinated with a kit programme." },
      { name: "Flags and banners", description: "Printed textile display items with reinforced edges and fixings." },
    ],
    typicalMaterials: ["polyester", "nylon", "canvas", "recycled-polyester"],
    weightGuidance: [
      { label: "Bag fabric", value: "300 to 600 denier polyester or equivalent", note: "Bag fabrics are commonly specified by denier rather than gsm." },
      { label: "Padding foam", value: "3 to 15 millimetres", note: "Specified by thickness and density rather than by weight." },
      { label: "Banner fabric", value: "110 to 200 gsm" },
    ],
    constructionOptions: [
      "Bartacked stress points on load bearing seams",
      "Webbing straps and hardware fittings",
      "Foam padding with fabric encapsulation",
      "Reinforced base panels on bags",
      "Zip and buckle closures",
      "Reinforced eyelets and edge finishing on banners",
    ],
    decorationOptions: ["screen-printing", "embroidery", "sublimation", "patches-and-badges", "heat-transfer"],
    labellingAndPackaging: [
      "Woven labels and branded webbing",
      "Load or usage information labelling where applicable",
      "Individual packaging sized to the product",
      "Bulk carton packing for team distribution",
    ],
    moqGuidance:
      "MOQ depends on material availability, construction, hardware and packaging. Products requiring custom hardware or moulded components carry higher minimums, because component suppliers set their own batch quantities.",
    samplingGuidance:
      "Function is tested on the sample under realistic loading conditions rather than assessed visually, since these products fail in use rather than on inspection.",
    qualityNotes: [
      "Load bearing seams are strength tested where the product carries weight.",
      "Hardware function is checked across full travel on every finished piece.",
      "Padding placement and thickness are verified against the specification.",
      "Sharp edges and protruding components are checked on any product used in physical contact.",
    ],
    marketNotes: [
      "Products used as protective equipment may be subject to standards that differ by market, and applicable requirements are confirmed on technical review.",
      "Where a product carries a protective claim, evidence for that claim is agreed before production.",
    ],
    relatedCapabilities: ["cut-and-sew-manufacturing", "material-sourcing", "sublimation", "inspection", "laboratory-testing-coordination"],
    relatedMaterials: ["polyester", "nylon", "canvas"],
    relatedIndustries: ["sports-clubs-and-teams", "education", "promotional-products"],
    faqIds: ["compliance", "sampling", "minimum-order"],
    seo: {
      title: "Specialist sports products and textile equipment manufacturing",
      description:
        "Kit bags, padded guards, training aids and textile sports equipment with load tested construction and feasibility confirmed on review.",
    },
    facets: {
      industries: ["sports-clubs-and-teams", "education", "promotional-products"],
      materialTypes: ["synthetic-and-performance", "woven-fabrics", "recycled-and-lower-impact"],
      decoration: ["screen-printing", "embroidery", "sublimation", "patches-and-badges"],
      markets: ["usa", "europe", "uk"],
    },
  },
  {
    slug: "home-textiles",
    name: "Home textiles",
    summary:
      "Towels, bed linen and table linen, where absorbency, dimensional stability and laundering performance matter most.",
    introduction: [
      "Home textiles are bought on tactile qualities and judged on durability. A towel is assessed by absorbency and handfeel; bed linen is assessed by how it feels after twenty washes rather than on the day it arrives.",
      "Dimensional stability is the recurring technical issue. A fitted sheet that shrinks stops fitting the mattress, and a napkin that shrinks unevenly cannot be presented on a table, so shrinkage is controlled and confirmed post wash.",
      "Hospitality buyers add a further requirement: commercial laundering at high temperature, which ages fabric far faster than domestic washing and has to be specified for from the start.",
    ],
    capabilityStatus: "audited-partner",
    hero: productMedia["home-textiles"],
    gallery: [factoryMedia.fabricStore, factoryMedia.inspection, factoryMedia.packing],
    productTypes: [
      { name: "Bath and hand towels", description: "Terry towelling in a range of weights with hemmed or dobby borders." },
      { name: "Beach towels", description: "Larger format towels, often printed or velour finished on one face." },
      { name: "Bed linen", description: "Flat sheets, fitted sheets and pillowcases in woven cotton or blends." },
      { name: "Duvet covers", description: "Covers with button or zip closures in matched fabric." },
      { name: "Table linen", description: "Tablecloths, runners and napkins with hemmed or mitred corners." },
      { name: "Cushion covers", description: "Covers with concealed zip or envelope closures." },
    ],
    typicalMaterials: ["cotton", "organic-cotton", "poplin", "canvas", "cotton-polyester-blend"],
    weightGuidance: [
      { label: "Hand towel terry", value: "400 to 500 gsm" },
      { label: "Bath towel terry", value: "500 to 650 gsm", note: "Higher weight generally means greater absorbency and slower drying." },
      { label: "Bed linen percale", value: "110 to 160 gsm" },
      { label: "Table linen", value: "150 to 250 gsm" },
    ],
    constructionOptions: [
      "Dobby borders and hemmed edges on towelling",
      "Mitred corners on table linen",
      "Elasticated fitted sheet corners with specified pocket depth",
      "Button, zip or envelope closures",
      "Piping and contrast borders",
      "Hanging loops on hand towels",
    ],
    decorationOptions: ["embroidery", "screen-printing", "sublimation", "patches-and-badges"],
    labellingAndPackaging: [
      "Woven labels with size and care information",
      "Dimension labelling, since sizing conventions differ by market",
      "Retail ready boxed or banded presentation",
      "Bulk packing for hospitality distribution",
    ],
    moqGuidance:
      "MOQ depends on material availability, colour count, construction, decoration and packaging. Towelling is produced by specialist partners with their own batch minimums, and custom border designs are set at the loom rather than in finishing.",
    samplingGuidance:
      "Absorbency and handfeel are assessed on washed samples rather than on unwashed ones, since finishing chemistry on new towelling masks its true performance until it has been laundered.",
    qualityNotes: [
      "Shrinkage is controlled and confirmed post wash, since dimensional change makes fitted products unusable.",
      "Absorbency is tested on towelling after washing rather than as delivered.",
      "Colour fastness is verified for products laundered at high temperature.",
      "Dimensions are verified against the stated size, because home textiles are bought by measurement.",
    ],
    marketNotes: [
      "Bed sizes differ substantially between the USA, the UK and continental Europe, and products are made to the destination market's dimensions.",
      "Hospitality buyers commonly require documented laundering performance, which is established during sampling.",
    ],
    relatedCapabilities: ["material-sourcing", "cut-and-sew-manufacturing", "embroidery", "quality-assurance", "logistics-and-export"],
    relatedMaterials: ["cotton", "organic-cotton", "poplin"],
    relatedIndustries: ["hospitality", "retail-and-wholesale", "healthcare"],
    faqIds: ["minimum-order", "sampling", "compliance"],
    seo: {
      title: "Home textiles manufacturing",
      description:
        "Towels, bed linen and table linen produced with controlled shrinkage, verified absorbency and market correct dimensions.",
    },
    facets: {
      industries: ["hospitality", "retail-and-wholesale", "healthcare"],
      materialTypes: ["natural-fibers", "woven-fabrics", "recycled-and-lower-impact"],
      decoration: ["embroidery", "screen-printing", "sublimation"],
      markets: ["usa", "europe", "uk"],
    },
  },
  {
    slug: "textile-accessories",
    name: "Textile accessories",
    summary:
      "Bags, caps, aprons and small textile goods that extend a brand without the size range of apparel.",
    introduction: [
      "Accessories solve a specific commercial problem: they carry a brand without requiring a size range. One tote bag serves every customer, which makes accessories the lowest risk way to test a market or extend a collection.",
      "They are also the backbone of promotional and event programmes, where quantity is high, decoration is prominent and the item has to survive being used rather than displayed.",
      "Construction quality shows in the details that get used most: strap attachment, edge finishing and closures. Those are the points inspected most closely.",
    ],
    capabilityStatus: "in-house",
    hero: productMedia["textile-accessories"],
    gallery: [factoryMedia.printing, factoryMedia.embroidery, factoryMedia.packing],
    productTypes: [
      { name: "Tote bags and shoppers", description: "Canvas or cotton totes with short or long handles and gusset options." },
      { name: "Drawstring bags", description: "Lightweight bags with corded closures and reinforced corners." },
      { name: "Caps and beanies", description: "Structured and unstructured headwear with embroidery or patch branding." },
      { name: "Aprons", description: "Bib and waist aprons with pocket, strap and adjuster options." },
      { name: "Pouches and organisers", description: "Zipped pouches, wash bags and small organisers." },
      { name: "Scarves and bandanas", description: "Printed or woven accessories with finished edges." },
    ],
    typicalMaterials: ["canvas", "cotton", "polyester", "recycled-polyester", "denim"],
    weightGuidance: [
      { label: "Tote bag canvas", value: "280 to 400 gsm", note: "Below 280 gsm a tote will not hold its shape when loaded." },
      { label: "Drawstring bag fabric", value: "180 to 250 gsm" },
      { label: "Apron canvas", value: "280 to 400 gsm" },
      { label: "Cap fabric", value: "260 to 340 gsm" },
    ],
    constructionOptions: [
      "Bartacked handle attachment on load bearing bags",
      "Gusseted or flat bag constructions",
      "Reinforced base panels",
      "Structured or unstructured cap crowns",
      "Adjustable straps with metal or plastic hardware",
      "Bound or overlocked internal seam finishing",
    ],
    decorationOptions: ["screen-printing", "embroidery", "dtf-printing", "patches-and-badges", "sublimation"],
    labellingAndPackaging: [
      "Woven labels and branded webbing",
      "Care and composition labelling",
      "Individual polybagging or reduced packaging",
      "Bulk carton packing for event and promotional distribution",
    ],
    moqGuidance:
      "MOQ depends on material availability, colour count, construction, decoration and packaging. Accessories often support lower minimums than apparel because there is no size range to cover, though custom hardware and custom dyed fabric raise the practical floor.",
    samplingGuidance:
      "Bags are sampled and then tested loaded rather than assessed empty, since strap and base construction only reveal their weaknesses under weight.",
    qualityNotes: [
      "Handle and strap attachment strength is tested on any bag intended to carry weight.",
      "Print durability is checked on canvas, where the textured surface affects ink adhesion.",
      "Cap crown shape and stitch alignment are inspected, since irregularity is immediately visible on headwear.",
      "Hardware function is checked across full travel on zips and adjusters.",
    ],
    marketNotes: [
      "Reusable bag requirements and packaging regulations differ by market and are confirmed before production.",
      "Promotional programmes frequently require fast turnaround, which is planned against fabric availability rather than promised in advance.",
    ],
    relatedCapabilities: ["cut-and-sew-manufacturing", "screen-printing", "embroidery", "custom-packaging", "patches-and-badges"],
    relatedMaterials: ["canvas", "cotton", "polyester", "denim"],
    relatedIndustries: ["promotional-products", "retail-and-wholesale", "hospitality", "corporate-uniforms"],
    faqIds: ["minimum-order", "decoration-options", "lead-time"],
    seo: {
      title: "Textile accessories manufacturing",
      description:
        "Tote bags, caps, aprons and small textile goods with load tested construction and durable decoration for retail and promotional programmes.",
    },
    facets: {
      industries: ["promotional-products", "retail-and-wholesale", "hospitality", "corporate-uniforms"],
      materialTypes: ["woven-fabrics", "natural-fibers", "recycled-and-lower-impact"],
      decoration: ["screen-printing", "embroidery", "dtf-printing", "patches-and-badges"],
      markets: ["usa", "europe", "uk"],
    },
  },
];

const productIndex = new Map(productFamilies.map((family) => [family.slug, family]));

export function getProductFamily(slug: string): ProductFamily | undefined {
  return productIndex.get(slug);
}

export function getProductFamiliesBySlugs(slugs: readonly string[]): ProductFamily[] {
  return slugs
    .map((slug) => productIndex.get(slug))
    .filter((family): family is ProductFamily => family !== undefined);
}

export function productSlugs(): string[] {
  return productFamilies.map((family) => family.slug);
}

/** Total representative product types across all families, used in hub copy. */
export function productTypeCount(): number {
  return productFamilies.reduce((total, family) => total + family.productTypes.length, 0);
}
