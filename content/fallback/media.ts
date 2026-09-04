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

const LANDSCAPE = { width: 1600, height: 1000 } as const;
const PORTRAIT = { width: 1000, height: 1300 } as const;
const SQUARE = { width: 1200, height: 1200 } as const;
const WIDE = { width: 2000, height: 1125 } as const;

/* -------------------------------------------------------------------------- */
/* Factory and process                                                         */
/* -------------------------------------------------------------------------- */

export const factoryMedia = {
  hero: placeholder({
    id: "factory/hero",
    ...WIDE,
    alt: "Production floor at the Textileways manufacturing facility",
    brief:
      "Wide shot of the production floor during a working shift. Natural light preferred. No faces in close focus unless written consent has been obtained.",
  }),
  exterior: placeholder({
    id: "factory/exterior",
    ...LANDSCAPE,
    alt: "Exterior of the Textileways manufacturing facility",
    brief: "Building exterior in daylight, showing scale and entrance. Signage visible if the business wants the site identified.",
  }),
  productionFloor: placeholder({
    id: "factory/production-floor",
    ...LANDSCAPE,
    alt: "Sewing lines running on the production floor",
    brief: "Sewing lines from a raised angle, showing line organisation and workstation layout.",
  }),
  cutting: placeholder({
    id: "factory/cutting",
    ...LANDSCAPE,
    alt: "Fabric being spread and cut in the cutting room",
    brief: "Cutting room with fabric spread on the table. Include the marker layout if legible.",
  }),
  sewing: placeholder({
    id: "factory/sewing",
    ...PORTRAIT,
    alt: "An operator assembling a garment at a sewing machine",
    brief: "Close shot of hands and machine at a sewing operation. Consent required if the operator is identifiable.",
  }),
  printing: placeholder({
    id: "factory/printing",
    ...LANDSCAPE,
    alt: "Screen printing being applied to garment panels",
    brief: "Screen printing carousel mid run, with a printed panel visible.",
  }),
  embroidery: placeholder({
    id: "factory/embroidery",
    ...SQUARE,
    alt: "Multi head embroidery machine stitching a logo",
    brief: "Multi head embroidery machine in operation, close enough to read the stitch detail.",
  }),
  inspection: placeholder({
    id: "factory/inspection",
    ...LANDSCAPE,
    alt: "Finished garments being inspected against a measurement chart",
    brief: "Inspection table with a garment, measuring tape and the measurement chart in frame.",
  }),
  packing: placeholder({
    id: "factory/packing",
    ...LANDSCAPE,
    alt: "Finished garments being folded and packed into cartons",
    brief: "Packing station showing folded goods, polybags and marked shipping cartons.",
  }),
  fabricStore: placeholder({
    id: "factory/fabric-store",
    ...LANDSCAPE,
    alt: "Rolls of fabric stored in the material warehouse",
    brief: "Fabric roll storage showing organisation and labelling of incoming material.",
  }),
  laboratory: placeholder({
    id: "factory/laboratory",
    ...SQUARE,
    alt: "Fabric weight and dimensional testing equipment",
    brief: "In house testing equipment such as a GSM cutter, scale or shrinkage template.",
  }),
  sampling: placeholder({
    id: "factory/sampling",
    ...LANDSCAPE,
    alt: "Sample room with pattern pieces and development garments",
    brief: "Sample room bench with patterns, a partially assembled garment and a tech pack in view.",
  }),
} as const;

/* -------------------------------------------------------------------------- */
/* Product families                                                            */
/* -------------------------------------------------------------------------- */

function productShot(slug: string, alt: string, brief: string, ratio = LANDSCAPE): MediaAsset {
  return placeholder({ id: `products/${slug}`, ...ratio, alt, brief });
}

export const productMedia = {
  "everyday-apparel": productShot(
    "everyday-apparel",
    "Cotton tee shirts produced for an everyday apparel programme",
    "Flat lay or hanger shot of finished tee shirts in three colourways, showing stitch and neck construction.",
  ),
  streetwear: productShot(
    "streetwear",
    "Heavyweight hoodie produced for a streetwear brand",
    "Heavyweight hoodie on a hanger or form, lit to show fabric weight and print texture.",
  ),
  "sportswear-and-activewear": productShot(
    "sportswear-and-activewear",
    "Sublimated performance top and shorts",
    "Performance top and shorts, showing sublimated graphics and flatlock seams.",
  ),
  "outdoor-and-performance": productShot(
    "outdoor-and-performance",
    "Lightweight technical shell jacket",
    "Technical shell jacket showing seams, zips and any taped construction.",
  ),
  "workwear-and-uniforms": productShot(
    "workwear-and-uniforms",
    "Corporate polo shirts and workwear with embroidered branding",
    "Uniform set including a polo shirt with embroidered logo and a work jacket.",
  ),
  "underwear-sleepwear-loungewear": productShot(
    "underwear-sleepwear-loungewear",
    "Loungewear set in soft knitted fabric",
    "Loungewear set flat laid, showing fabric drape and soft trims.",
  ),
  "children-and-baby": productShot(
    "children-and-baby",
    "Children's apparel produced to a safety conscious specification",
    "Children's garments flat laid. No child models. Show snap fastenings and label placement.",
  ),
  "swim-and-resort": productShot(
    "swim-and-resort",
    "Swim shorts and resort shirt",
    "Swim shorts and a resort shirt, showing print and trim detail. No model shot.",
  ),
  "denim-and-woven-products": productShot(
    "denim-and-woven-products",
    "Denim jeans showing wash and hardware detail",
    "Denim jeans with close detail on the wash, stitching and hardware.",
  ),
  "modest-and-cultural-apparel": productShot(
    "modest-and-cultural-apparel",
    "Modest apparel produced in lightweight woven fabric",
    "Modest apparel on a hanger or form, showing drape, length and finishing.",
  ),
  "specialist-sports-products": productShot(
    "specialist-sports-products",
    "Specialist sports equipment produced from technical textiles",
    "Specialist sports textile item such as a padded guard, kit bag or training aid.",
  ),
  "home-textiles": productShot(
    "home-textiles",
    "Towels and home textile products",
    "Home textile grouping such as towels or table linen, styled simply on a neutral ground.",
  ),
  "textile-accessories": productShot(
    "textile-accessories",
    "Canvas tote bags and textile accessories",
    "Canvas totes, caps and pouches grouped together, showing print and stitch detail.",
  ),
} as const satisfies Record<string, MediaAsset>;

/* -------------------------------------------------------------------------- */
/* Editorial                                                                   */
/* -------------------------------------------------------------------------- */

export const editorialMedia = {
  homeHero: placeholder({
    id: "editorial/home-hero",
    ...WIDE,
    alt: "Fabric being inspected on the production floor at Textileways",
    brief:
      "The single most important photograph on the site. Fabric or a garment in a real working environment, shot horizontally with room for text on the left. Not a studio model shot.",
  }),
  scale: placeholder({
    id: "editorial/scale",
    ...LANDSCAPE,
    alt: "Bundled cut panels staged before assembly",
    brief: "Bundled cut panels or stacked finished garments, communicating quantity without a graphic.",
  }),
  materials: placeholder({
    id: "editorial/materials",
    ...SQUARE,
    alt: "Fabric swatches arranged for material selection",
    brief: "Fabric swatch stack or hanger set, shot close enough to read texture.",
  }),
  quality: placeholder({
    id: "editorial/quality",
    ...LANDSCAPE,
    alt: "A garment being measured during quality control",
    brief: "Measuring tape across a garment on an inspection table, with the chart visible.",
  }),
  sustainability: placeholder({
    id: "editorial/sustainability",
    ...LANDSCAPE,
    alt: "Fabric offcuts collected and sorted for reuse",
    brief: "Sorted fabric offcuts or segregated waste bins on the production floor.",
  }),
  logistics: placeholder({
    id: "editorial/logistics",
    ...LANDSCAPE,
    alt: "Marked export cartons staged for shipment",
    brief: "Palletised and marked export cartons staged for collection.",
  }),
  team: placeholder({
    id: "editorial/team",
    ...LANDSCAPE,
    alt: "Production and merchandising staff reviewing a specification",
    brief: "Two or three staff reviewing a tech pack or sample together. Written consent required.",
  }),
} as const;

export const articleMedia = {
  "understanding-moq": placeholder({
    id: "insights/understanding-moq",
    ...LANDSCAPE,
    alt: "Fabric rolls staged for a production run",
    brief: "Fabric rolls in the store, illustrating the material commitment behind a minimum order quantity.",
  }),
  "choosing-decoration": placeholder({
    id: "insights/choosing-decoration",
    ...LANDSCAPE,
    alt: "Printed and embroidered samples compared side by side",
    brief: "Print and embroidery samples laid side by side on the same fabric for comparison.",
  }),
  "tech-pack-anatomy": placeholder({
    id: "insights/tech-pack-anatomy",
    ...LANDSCAPE,
    alt: "A tech pack open beside a development sample",
    brief: "Printed tech pack pages beside the garment they describe, on a work bench.",
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
