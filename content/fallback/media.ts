import type { MediaAsset } from "@/content/types";

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
    width: 1360,
    height: 1712,
    alt: "A production specialist reviewing a finished garment in a working environment",
    caption: "Reviewing a finished garment against the approved sample.",
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

/** Every declared media slot, used by the content requirements report. */
export function allMediaSlots(): MediaAsset[] {
  return [
    ...Object.values(factoryMedia),
    ...Object.values(productMedia),
    ...Object.values(editorialMedia),
    ...Object.values(articleMedia),
  ];
}

/** Media slots still awaiting a real photograph. */
export function outstandingMediaSlots(): MediaAsset[] {
  return allMediaSlots().filter((asset) => asset.isPlaceholder === true);
}
