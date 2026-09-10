import type { MediaAsset, CapabilityGroup, MaterialGroup } from "@/content/types";

/**
 * Media slots.
 *
 * No real factory or product photography has been supplied yet. Rather than
 * embedding remote stock image URLs across the codebase, every slot is declared
 * here as a placeholder with the exact shot that has to replace it. The `Media`
 * component renders a woven pattern panel for placeholders and switches to
 * `next/image` automatically once `src` points at a real file in `public/images`.
 *
 * Every entry in this file is listed in docs/CONTENT_REQUIREMENTS.md.
 */

interface PlaceholderInput {
  id: string;
  /** The photograph that has to be taken or supplied, written for the person taking it. */
  brief: string;
  width: number;
  height: number;
  /** Alt text to use once the real photograph is in place. */
  alt: string;
}

/**
 * Kept for the next media slot that needs a placeholder before a photograph
 * exists for it; every slot declared today already has one installed.
 */
function placeholder(input: PlaceholderInput): MediaAsset {
  return {
    src: `/images/${input.id}.jpg`,
    alt: input.alt,
    width: input.width,
    height: input.height,
    caption: input.brief,
    isPlaceholder: true,
  };
}

interface InstalledPhotoInput {
  id: string;
  width: number;
  height: number;
  alt: string;
  /** Short descriptive caption. Omit where the alt text already says enough. */
  caption?: string;
}

/**
 * A real, installed photograph, replacing a placeholder for the same slot.
 *
 * Generated 2026-09-07 from the batch in docs/GPT_IMAGE_2_MASTER_PROMPT.md and
 * checked against docs/IMAGE_MANIFEST.md section 4 before being placed here.
 * These are representative campaign images, not documentary photographs of
 * this specific facility, staff, machinery or output. See the disclosure on
 * `/factory` and `/about`.
 */
function photo(input: InstalledPhotoInput): MediaAsset {
  return {
    src: `/images/${input.id}.jpg`,
    alt: input.alt,
    width: input.width,
    height: input.height,
    caption: input.caption,
  };
}

/**
 * Kept for the next media slot that needs a placeholder before a photograph
 * exists for it; every slot declared today already has one installed.
 */
const LANDSCAPE = { width: 1600, height: 1000 } as const;

/* -------------------------------------------------------------------------- */
/* Factory and process                                                         */
/* -------------------------------------------------------------------------- */

export const factoryMedia = {
  hero: photo({
    id: "factory/hero",
    width: 1760,
    height: 1328,
    alt: "Wide view of a working production floor with sewing lines in depth",
    caption: "The production floor during a working shift.",
  }),
  exterior: photo({
    id: "factory/exterior",
    width: 1760,
    height: 1328,
    alt: "Exterior of a Pakistani export garment facility in daylight",
    caption: "The factory exterior and loading area.",
  }),
  productionFloor: photo({
    id: "factory/production-floor",
    width: 1760,
    height: 1328,
    alt: "Sewing lines running on the production floor, seen from a raised angle",
    caption: "Sewing lines organised into workstations and bundles.",
  }),
  cutting: photo({
    id: "factory/cutting",
    width: 1760,
    height: 1328,
    alt: "Fabric being spread and cut in the cutting room",
    caption: "Fabric spread and layered on the cutting table.",
  }),
  sewing: photo({
    id: "factory/sewing",
    width: 1360,
    height: 1712,
    alt: "An operator's hands guiding fabric through a sewing machine",
    caption: "A sewing operation, close enough to read the stitch.",
  }),
  printing: photo({
    id: "factory/printing",
    width: 1760,
    height: 1328,
    alt: "Screen printing being applied to a garment panel on a carousel",
    caption: "A screen printing carousel mid run.",
  }),
  embroidery: photo({
    id: "factory/embroidery",
    width: 1536,
    height: 1536,
    alt: "Multi head embroidery machine stitching a floral design",
    caption: "Multi head embroidery, close enough to read the stitch detail.",
  }),
  inspection: photo({
    id: "factory/inspection",
    width: 1760,
    height: 1328,
    alt: "A garment being measured against a specification on an inspection table",
    caption: "Quality inspection against a measurement chart.",
  }),
  packing: photo({
    id: "factory/packing",
    width: 1760,
    height: 1328,
    alt: "Finished garments being folded and packed into export cartons",
    caption: "Folded goods, polybags and cartons at the packing station.",
  }),
  fabricStore: photo({
    id: "factory/fabric-store",
    width: 1760,
    height: 1328,
    alt: "Rolls of fabric stored and labelled in the material warehouse",
    caption: "Fabric roll storage, organised and tagged.",
  }),
  laboratory: photo({
    id: "factory/laboratory",
    width: 1536,
    height: 1536,
    alt: "A GSM cutter testing a fabric sample on the bench",
    caption: "In house fabric testing equipment.",
  }),
  sampling: photo({
    id: "factory/sampling",
    width: 1760,
    height: 1328,
    alt: "A sample maker working with pattern pieces and a development garment",
    caption: "The sample room, with patterns and a tech pack in view.",
  }),
} as const;

/* -------------------------------------------------------------------------- */
/* Product families                                                            */
/* -------------------------------------------------------------------------- */

/** Installed product photograph. All approved shots share the same 1760x1328 frame. */
function productPhoto(slug: string, alt: string, caption?: string): MediaAsset {
  return photo({ id: `products/${slug}`, width: 1760, height: 1328, alt, caption });
}

export const productMedia = {
  "everyday-apparel": productPhoto(
    "everyday-apparel",
    "Three cotton tee shirts in white, charcoal and clay, showing neck and stitch construction",
  ),
  streetwear: productPhoto(
    "streetwear",
    "A heavyweight hoodie on a hanger, showing fabric weight and rib construction",
  ),
  "sportswear-and-activewear": productPhoto(
    "sportswear-and-activewear",
    "A sublimated performance top and shorts with flatlock seams",
  ),
  "outdoor-and-performance": productPhoto(
    "outdoor-and-performance",
    "A lightweight technical shell jacket showing seam and zip construction",
  ),
  "workwear-and-uniforms": productPhoto(
    "workwear-and-uniforms",
    "A polo shirt and work overshirt uniform set",
  ),
  "underwear-sleepwear-loungewear": productPhoto(
    "underwear-sleepwear-loungewear",
    "A loungewear set in soft knitted fabric, flat laid",
  ),
  "children-and-baby": productPhoto(
    "children-and-baby",
    "Children's rompers and a tee flat laid, with blank neck labels and snap fastenings",
  ),
  "swim-and-resort": productPhoto(
    "swim-and-resort",
    "A printed resort shirt and swim shorts, shown flat",
  ),
  "denim-and-woven-products": productPhoto(
    "denim-and-woven-products",
    "Denim jeans and a woven overshirt, showing wash and hardware detail",
  ),
  "modest-and-cultural-apparel": productPhoto(
    "modest-and-cultural-apparel",
    "A modest shirt dress on a hanger, showing drape and finishing",
  ),
  "specialist-sports-products": productPhoto(
    "specialist-sports-products",
    "A football shin guard showing panel construction",
  ),
  "home-textiles": productPhoto(
    "home-textiles",
    "A stack of terry towels in five colourways, showing weave and edge finishing",
  ),
  "textile-accessories": productPhoto(
    "textile-accessories",
    "Canvas tote bags, a cap and a pouch, grouped together",
  ),
} as const satisfies Record<string, MediaAsset>;

/* -------------------------------------------------------------------------- */
/* Editorial                                                                   */
/* -------------------------------------------------------------------------- */

export const editorialMedia = {
  homeHero: photo({
    id: "editorial/home-hero",
    width: 768,
    height: 1024,
    alt: "A pair of hands holding open the finished cuff of a garment to show the stitch construction, with a softly blurred factory floor behind",
    caption: "Checking the stitch construction on a finished cuff.",
  }),
  scale: photo({
    id: "editorial/scale",
    width: 1760,
    height: 1328,
    alt: "Bundled, colour sorted cut fabric panels stacked before assembly",
    caption: "Bundled cut panels, staged before assembly.",
  }),
  materials: photo({
    id: "editorial/materials",
    width: 1536,
    height: 1536,
    alt: "A hand comparing folded fabric swatches in a coordinated colour range",
    caption: "Fabric swatches, shown close enough to read the texture.",
  }),
  quality: photo({
    id: "editorial/quality",
    width: 1760,
    height: 1328,
    alt: "A garment being measured during quality control",
    caption: "Measured against the chart before it moves on.",
  }),
  sustainability: photo({
    id: "editorial/sustainability",
    width: 1760,
    height: 1328,
    alt: "Fabric offcuts sorted by colour into labelled bins on the production floor",
    caption: "Offcuts sorted by colour, ready for reuse.",
  }),
  logistics: photo({
    id: "editorial/logistics",
    width: 1760,
    height: 1328,
    alt: "Palletised export cartons staged for collection at a loading area",
    caption: "Staged for collection.",
  }),
  team: photo({
    id: "editorial/team",
    width: 1760,
    height: 1328,
    alt: "Merchandising, production and quality staff reviewing a sample together",
    caption: "Reviewing a sample against the specification.",
  }),
} as const;

export const articleMedia = {
  "understanding-moq": photo({
    id: "insights/understanding-moq",
    width: 2048,
    height: 1152,
    alt: "Five upright fabric rolls in a row at the material store",
    caption: "Fabric committed to a production run.",
  }),
  "choosing-decoration": photo({
    id: "insights/choosing-decoration",
    width: 2048,
    height: 1152,
    alt: "The same design printed and embroidered on matching swatches, side by side",
    caption: "Print and embroidery compared on the same fabric.",
  }),
  "tech-pack-anatomy": photo({
    id: "insights/tech-pack-anatomy",
    width: 2048,
    height: 1152,
    alt: "An open tech pack with flat sketches and swatches beside the finished garment",
    caption: "A tech pack open beside the garment it describes.",
  }),
} as const;

/* -------------------------------------------------------------------------- */
/* Hub banners                                                                 */
/*                                                                             */
/* Added 2026-09-10. The three hub pages that had no header image at all:    */
/* Products, Capabilities and Industries. Materials and Markets already had  */
/* one (`editorialMedia.materials`, `editorialMedia.logistics`).             */
/* -------------------------------------------------------------------------- */

export const hubMedia = {
  products: photo({
    id: "hubs/products",
    width: 1760,
    height: 1328,
    alt: "An assortment of finished products from different product families grouped on a neutral surface",
    caption: "A range of finished product families shown together.",
  }),
  capabilities: photo({
    id: "hubs/capabilities",
    width: 1760,
    height: 1328,
    alt: "A wide view of a production floor where several distinct manufacturing processes are visible in one frame",
    caption: "Multiple manufacturing processes visible on the production floor.",
  }),
  industries: photo({
    id: "hubs/industries",
    width: 1760,
    height: 1328,
    alt: "Folded garments from several different use cases grouped together, including a uniform polo, workwear and a plain scrub top",
    caption: "Products representing several buyer industries, shown together.",
  }),
} as const;

/* -------------------------------------------------------------------------- */
/* Capability group banners                                                    */
/*                                                                             */
/* Added 2026-09-10. The 30 capability detail pages had no image at all. One  */
/* image per capability group is shared across every capability in that      */
/* group, matching how `capabilityGroupLabels` already organises them.       */
/* -------------------------------------------------------------------------- */

export const capabilityGroupMedia = {
  development: photo({
    id: "capability-groups/development",
    width: 1760,
    height: 1328,
    alt: "Pattern paper, a tracing wheel and measuring tools laid out on a design bench",
    caption: "Pattern development tools on a design bench.",
  }),
  materials: photo({
    id: "capability-groups/materials",
    width: 1760,
    height: 1328,
    alt: "Yarn cones and rolled fabric samples grouped together at a sourcing desk",
    caption: "Yarn and fabric samples at a sourcing desk.",
  }),
  manufacturing: photo({
    id: "capability-groups/manufacturing",
    width: 1760,
    height: 1328,
    alt: "A close, mid distance view of a single sewing station with fabric feeding through the machine",
    caption: "A sewing station in use.",
  }),
  decoration: photo({
    id: "capability-groups/decoration",
    width: 1760,
    height: 1328,
    alt: "A heat press applying a transfer to a folded garment panel, steam visible",
    caption: "A heat press applying a transfer to a garment panel.",
  }),
  finishing: photo({
    id: "capability-groups/finishing",
    width: 1760,
    height: 1328,
    alt: "A finished garment being steam pressed on a finishing station",
    caption: "A garment being steam pressed during finishing.",
  }),
  assurance: photo({
    id: "capability-groups/assurance",
    width: 1760,
    height: 1328,
    alt: "A quality checklist on a clipboard beside a sealed export carton",
    caption: "A quality checklist beside a sealed export carton.",
  }),
} as const satisfies Record<CapabilityGroup, MediaAsset>;

/* -------------------------------------------------------------------------- */
/* Material group banners                                                      */
/*                                                                             */
/* Added 2026-09-10. The 14 material detail pages had no image at all. One    */
/* image per material group, matching `materialGroupLabels`.                  */
/* -------------------------------------------------------------------------- */

export const materialGroupMedia = {
  "natural-fibers": photo({
    id: "material-groups/natural-fibers",
    width: 1536,
    height: 1536,
    alt: "Raw cotton fibre and a cotton yarn cone shown close, natural fibre texture visible",
    caption: "Raw cotton fibre beside a cotton yarn cone.",
  }),
  "synthetic-and-performance": photo({
    id: "material-groups/synthetic-and-performance",
    width: 1536,
    height: 1536,
    alt: "A performance knit fabric being stretched by hand to show its recovery",
    caption: "A technical knit fabric stretched by hand to show recovery.",
  }),
  "knitted-fabrics": photo({
    id: "material-groups/knitted-fabrics",
    width: 1536,
    height: 1536,
    alt: "Close detail of a knitted fabric structure showing interlocking loops",
    caption: "Close detail of a knitted fabric's loop structure.",
  }),
  "woven-fabrics": photo({
    id: "material-groups/woven-fabrics",
    width: 1536,
    height: 1536,
    alt: "Close detail of a woven fabric's grain and selvedge edge",
    caption: "Close detail of a woven fabric's selvedge edge.",
  }),
  "recycled-and-lower-impact": photo({
    id: "material-groups/recycled-and-lower-impact",
    width: 1536,
    height: 1536,
    alt: "Sorted fabric scraps and a recycled fibre swatch grouped together for reuse",
    caption: "Sorted fabric offcuts beside a recycled-fibre swatch.",
  }),
} as const satisfies Record<MaterialGroup, MediaAsset>;

/* -------------------------------------------------------------------------- */
/* Industry banners                                                            */
/*                                                                             */
/* Added 2026-09-10. The industries hub and all ten detail pages had no image */
/* at all. Each shows the relevant product type, not the buyer's own         */
/* institution: Textileways photographs products, not hospitals, hotels or   */
/* classrooms it has no connection to.                                       */
/* -------------------------------------------------------------------------- */

export const industryMedia = {
  "fashion-brands": photo({
    id: "industries/fashion-brands",
    width: 1760,
    height: 1328,
    alt: "A small capsule of folded apparel with blank neck labels, styled as a brand collection",
    caption: "A small capsule collection, folded and styled together.",
  }),
  "streetwear-brands": photo({
    id: "industries/streetwear-brands",
    width: 1760,
    height: 1328,
    alt: "A stacked heavyweight hoodie and tee, blank chest area, styled with streetwear proportions",
    caption: "A heavyweight hoodie and tee stacked together.",
  }),
  "sports-clubs-and-teams": photo({
    id: "industries/sports-clubs-and-teams",
    width: 1760,
    height: 1328,
    alt: "A matching team jersey set folded together, blank number and sponsor areas",
    caption: "A matching jersey and shorts set, folded together.",
  }),
  "corporate-uniforms": photo({
    id: "industries/corporate-uniforms",
    width: 1760,
    height: 1328,
    alt: "A folded corporate polo shirt and shirt set, blank chest embroidery area",
    caption: "A corporate polo and shirt set, folded together.",
  }),
  hospitality: photo({
    id: "industries/hospitality",
    width: 1760,
    height: 1328,
    alt: "Folded hotel style towels stacked with a hospitality apron",
    caption: "Hotel style towels stacked with a hospitality apron.",
  }),
  healthcare: photo({
    id: "industries/healthcare",
    width: 1760,
    height: 1328,
    alt: "A folded medical scrub top and trousers in a neutral colour, blank pocket",
    caption: "A folded scrub top and trousers set.",
  }),
  education: photo({
    id: "industries/education",
    width: 1760,
    height: 1328,
    alt: "A folded school style polo shirt and sweatshirt, blank crest area",
    caption: "A school style polo shirt and sweatshirt, folded together.",
  }),
  "construction-and-industrial": photo({
    id: "industries/construction-and-industrial",
    width: 1760,
    height: 1328,
    alt: "A folded high visibility workwear vest showing reflective tape construction",
    caption: "A high visibility workwear vest.",
  }),
  "retail-and-wholesale": photo({
    id: "industries/retail-and-wholesale",
    width: 1760,
    height: 1328,
    alt: "A stack of mixed folded garments with blank swing tags, ready for distribution",
    caption: "A stack of folded garments with blank swing tags.",
  }),
  "promotional-products": photo({
    id: "industries/promotional-products",
    width: 1760,
    height: 1328,
    alt: "A grouped flat lay of a cap, a tote bag and a small pouch, blank branding areas",
    caption: "A cap, tote and pouch, grouped together.",
  }),
} as const satisfies Record<string, MediaAsset>;

/* -------------------------------------------------------------------------- */
/* Market banners                                                              */
/*                                                                             */
/* Added 2026-09-10. The markets hub reused one generic logistics photograph  */
/* for every market, and the four market detail pages had no image at all.   */
/* Each market gets its own image now, differentiated by a genuinely         */
/* different export or documentation detail rather than a flag, a landmark   */
/* or anything implying an office or existing customer base in that market.  */
/* -------------------------------------------------------------------------- */

export const marketBannerMedia = {
  usa: photo({
    id: "markets/usa",
    width: 1760,
    height: 1328,
    alt: "Export cartons being wrapped on a pallet ahead of ocean freight collection",
    caption: "Export cartons being wrapped for ocean freight collection.",
  }),
  europe: photo({
    id: "markets/europe",
    width: 1760,
    height: 1328,
    alt: "A folded garment with a close view of its care label being checked before packing",
    caption: "A care label being checked before packing.",
  }),
  uk: photo({
    id: "markets/uk",
    width: 1760,
    height: 1328,
    alt: "Export documentation on a clipboard resting on a sealed carton",
    caption: "Export documentation resting on a sealed carton.",
  }),
  australia: photo({
    id: "markets/australia",
    width: 1760,
    height: 1328,
    alt: "A garment being packed into a carton using cardboard and synthetic packing materials, no wood in view",
    caption: "A garment packed using cardboard and synthetic packing materials.",
  }),
} as const satisfies Record<string, MediaAsset>;

/** Every declared media slot, used by the content requirements report. */
export function allMediaSlots(): MediaAsset[] {
  return [
    ...Object.values(factoryMedia),
    ...Object.values(productMedia),
    ...Object.values(editorialMedia),
    ...Object.values(articleMedia),
    ...Object.values(hubMedia),
    ...Object.values(capabilityGroupMedia),
    ...Object.values(materialGroupMedia),
    ...Object.values(industryMedia),
    ...Object.values(marketBannerMedia),
  ];
}

/** Media slots still awaiting a real photograph. */
export function outstandingMediaSlots(): MediaAsset[] {
  return allMediaSlots().filter((asset) => asset.isPlaceholder === true);
}
