import {
  factoryMedia,
  productMedia,
  editorialMedia,
  articleMedia,
  hubMedia,
  capabilityGroupMedia,
  materialGroupMedia,
  industryMedia,
  marketBannerMedia,
} from "@/content/fallback/media";
import type { MediaAsset } from "@/content/types";

/**
 * Image manifest.
 *
 * A durable, machine readable index of every photography slot on the site,
 * built on top of the placeholder declarations in `content/fallback/media.ts`
 * rather than duplicating their data. This file adds the metadata a photo
 * shoot or an image generation batch needs that `MediaAsset` does not carry:
 * a stable numeric order, which routes render the asset, every aspect ratio
 * it has to survive, and whether the current file is a documented placeholder
 * or an installed image.
 *
 * This is the source of truth for `docs/IMAGE_MANIFEST.md` and for the batch
 * order used in `docs/GPT_IMAGE_2_MASTER_PROMPT.md`. When a new media slot is
 * added to `content/fallback/media.ts`, add a matching entry here in the same
 * pass, and a unit test asserts the two stay in step.
 */

export type ImageCategory =
  | "factory"
  | "product"
  | "editorial"
  | "article"
  | "hub"
  | "capability-group"
  | "material-group"
  | "industry"
  | "market";
export type ImageOrientation = "landscape" | "portrait" | "square";

export interface ImageManifestEntry {
  /** Stable id, matching the asset's key in content/fallback/media.ts and its /images path. */
  id: string;
  /** Sequential position in the GPT Image 2 batch manifest, "01" to "35". */
  sequence: string;
  /** Suggested flat filename for a generated batch output, before it is placed in public/images. */
  outputFilename: string;
  /** Final destination once installed. */
  publicPath: string;
  category: ImageCategory;
  /** One line description of the subject, independent of the full photo brief. */
  subject: string;
  orientation: ImageOrientation;
  /** Every Tailwind aspect ratio class this asset is rendered at somewhere on the site. */
  renderedAspects: string[];
  /** Routes and components that render this asset. */
  usedIn: string[];
  /** True where one or more identifiable people would appear in the photograph. */
  peoplePresent: boolean;
  /**
   * True for illustrative campaign photography once installed. False is never a valid
   * value here: an image is either a placeholder awaiting a photograph, or, once
   * installed, representative campaign imagery. Nothing in this manifest is
   * documentary proof of this specific facility, staff, machinery or output.
   */
  representative: true;
  /** The MediaAsset this entry describes, re-exported for convenience. */
  asset: MediaAsset;
}

function entry(
  input: Omit<ImageManifestEntry, "publicPath" | "outputFilename" | "representative" | "asset"> & {
    asset: MediaAsset;
  },
): ImageManifestEntry {
  const outputFilename = `${input.id.replace(/\//g, "-")}.jpg`;
  return {
    ...input,
    outputFilename,
    publicPath: input.asset.src,
    representative: true,
  };
}

/* -------------------------------------------------------------------------- */
/* Factory series, 01 to 12                                                   */
/* -------------------------------------------------------------------------- */

const factoryEntries: ImageManifestEntry[] = [
  entry({
    id: "factory/hero",
    sequence: "01",
    category: "factory",
    subject: "Wide overview of a working production floor",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: ["/factory (gallery, 'Overview')"],
    peoplePresent: true,
    asset: factoryMedia.hero,
  }),
  entry({
    id: "factory/exterior",
    sequence: "02",
    category: "factory",
    subject: "Factory exterior in daylight",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: ["/factory (gallery)"],
    peoplePresent: false,
    asset: factoryMedia.exterior,
  }),
  entry({
    id: "factory/production-floor",
    sequence: "03",
    category: "factory",
    subject: "Sewing lines from a raised angle",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: [
      "/factory (gallery)",
      "components/sections/home-sections.tsx (FactorySection)",
      "content/fallback/products.ts (product galleries, reused)",
    ],
    peoplePresent: true,
    asset: factoryMedia.productionFloor,
  }),
  entry({
    id: "factory/cutting",
    sequence: "04",
    category: "factory",
    subject: "Fabric spreading and cutting at a long cutting table",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: [
      "/factory (gallery)",
      "components/sections/home-sections.tsx (FactorySection)",
      "content/fallback/products.ts (product galleries, reused)",
    ],
    peoplePresent: true,
    asset: factoryMedia.cutting,
  }),
  entry({
    id: "factory/sewing",
    sequence: "05",
    category: "factory",
    subject: "Hands and machine at a sewing operation",
    orientation: "portrait",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: ["/factory (gallery)", "content/fallback/products.ts (product galleries, reused)"],
    peoplePresent: true,
    asset: factoryMedia.sewing,
  }),
  entry({
    id: "factory/printing",
    sequence: "06",
    category: "factory",
    subject: "Screen printing carousel mid run",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: ["/factory (gallery)", "content/fallback/products.ts (product galleries, reused)"],
    peoplePresent: true,
    asset: factoryMedia.printing,
  }),
  entry({
    id: "factory/embroidery",
    sequence: "07",
    category: "factory",
    subject: "Multi head embroidery machine in operation",
    orientation: "square",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: ["/factory (gallery)", "content/fallback/products.ts (product galleries, reused)"],
    peoplePresent: true,
    asset: factoryMedia.embroidery,
  }),
  entry({
    id: "factory/inspection",
    sequence: "08",
    category: "factory",
    subject: "Garment measured against a specification at an inspection table",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: [
      "/factory (gallery)",
      "components/sections/home-sections.tsx (ProductionScaleSection, QualitySection)",
      "content/fallback/products.ts (product galleries, reused)",
    ],
    peoplePresent: true,
    asset: factoryMedia.inspection,
  }),
  entry({
    id: "factory/packing",
    sequence: "09",
    category: "factory",
    subject: "Folded goods, polybags and marked export cartons at a packing station",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: ["/factory (gallery)", "content/fallback/products.ts (product galleries, reused)"],
    peoplePresent: true,
    asset: factoryMedia.packing,
  }),
  entry({
    id: "factory/fabric-store",
    sequence: "10",
    category: "factory",
    subject: "Rolls of fabric stored and labelled in the material warehouse",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: ["/factory (gallery)", "content/fallback/products.ts (product galleries, reused)"],
    peoplePresent: false,
    asset: factoryMedia.fabricStore,
  }),
  entry({
    id: "factory/laboratory",
    sequence: "11",
    category: "factory",
    subject: "In house fabric weight and dimensional testing equipment",
    orientation: "square",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: ["/factory (gallery)"],
    peoplePresent: false,
    asset: factoryMedia.laboratory,
  }),
  entry({
    id: "factory/sampling",
    sequence: "12",
    category: "factory",
    subject: "Sample room bench with patterns, a development garment and a tech pack",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: [
      "/factory (gallery)",
      "components/sections/home-sections.tsx (ProductionScaleSection)",
    ],
    peoplePresent: true,
    asset: factoryMedia.sampling,
  }),
];

/* -------------------------------------------------------------------------- */
/* Product family series, 13 to 25                                            */
/* -------------------------------------------------------------------------- */

function productEntry(
  slug: keyof typeof productMedia,
  sequence: string,
  subject: string,
): ImageManifestEntry {
  return entry({
    id: `products/${slug}`,
    sequence,
    category: "product",
    subject,
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]", "aspect-[16/11]", "aspect-[16/10]"],
    usedIn: [
      `/products/${slug}`,
      "/products (hub grid and filters)",
      "components/sections/home-sections.tsx (ProductUniverseSection)",
    ],
    peoplePresent: false,
    asset: productMedia[slug],
  });
}

const productEntries: ImageManifestEntry[] = [
  productEntry("everyday-apparel", "13", "Cotton tee shirts in three colourways"),
  productEntry("streetwear", "14", "Heavyweight hoodie showing fabric weight and print texture"),
  productEntry(
    "sportswear-and-activewear",
    "15",
    "Sublimated performance top and shorts with flatlock seams",
  ),
  productEntry(
    "outdoor-and-performance",
    "16",
    "Lightweight technical shell jacket showing seam and zip construction",
  ),
  productEntry(
    "workwear-and-uniforms",
    "17",
    "Embroidered polo shirt and work jacket uniform set",
  ),
  productEntry(
    "underwear-sleepwear-loungewear",
    "18",
    "Loungewear set in soft knitted fabric, flat laid",
  ),
  productEntry(
    "children-and-baby",
    "19",
    "Children's apparel flat laid, no child models, showing label placement",
  ),
  productEntry("swim-and-resort", "20", "Swim shorts and a resort shirt, no model shot"),
  productEntry(
    "denim-and-woven-products",
    "21",
    "Denim jeans with close detail on wash, stitching and hardware",
  ),
  productEntry(
    "modest-and-cultural-apparel",
    "22",
    "Modest apparel on a hanger or form, showing drape and finishing",
  ),
  productEntry(
    "specialist-sports-products",
    "23",
    "Specialist sports textile item such as a padded guard or kit bag",
  ),
  productEntry("home-textiles", "24", "Towels or table linen styled simply on a neutral ground"),
  productEntry(
    "textile-accessories",
    "25",
    "Canvas totes, caps and pouches grouped, showing print and stitch detail",
  ),
];

/* -------------------------------------------------------------------------- */
/* Editorial series, 26 to 32                                                 */
/* -------------------------------------------------------------------------- */

const editorialEntries: ImageManifestEntry[] = [
  entry({
    id: "editorial/home-hero",
    sequence: "26",
    category: "editorial",
    subject:
      "The single most important photograph on the site: a production or merchandising specialist reviewing a finished garment or sample in a real working environment",
    orientation: "portrait",
    renderedAspects: ["aspect-[4/3]", "aspect-[5/6]"],
    usedIn: ["components/sections/home-hero.tsx (homepage hero, priority LCP image)"],
    peoplePresent: true,
    asset: editorialMedia.homeHero,
  }),
  entry({
    id: "editorial/scale",
    sequence: "27",
    category: "editorial",
    subject: "Bundled cut panels or stacked finished garments, communicating quantity",
    orientation: "landscape",
    renderedAspects: ["aspect-[16/8]"],
    usedIn: ["components/sections/home-sections.tsx (MarketsSection, market: europe)"],
    peoplePresent: false,
    asset: editorialMedia.scale,
  }),
  entry({
    id: "editorial/materials",
    sequence: "28",
    category: "editorial",
    subject: "Fabric swatch stack or hanger set, close enough to read texture",
    orientation: "square",
    renderedAspects: ["aspect-[4/3]", "aspect-[16/8]"],
    usedIn: [
      "/materials (hero aside)",
      "components/sections/home-sections.tsx (MarketsSection, market: uk)",
    ],
    peoplePresent: false,
    asset: editorialMedia.materials,
  }),
  entry({
    id: "editorial/quality",
    sequence: "29",
    category: "editorial",
    subject: "Measuring tape across a garment on an inspection table, chart visible",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]", "aspect-[16/10]"],
    usedIn: [
      "/quality (hero aside)",
      "components/sections/home-sections.tsx (QualitySection)",
    ],
    peoplePresent: true,
    asset: editorialMedia.quality,
  }),
  entry({
    id: "editorial/sustainability",
    sequence: "30",
    category: "editorial",
    subject: "Sorted fabric offcuts or segregated waste bins on the production floor",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: ["/sustainability (hero aside)"],
    peoplePresent: false,
    asset: editorialMedia.sustainability,
  }),
  entry({
    id: "editorial/logistics",
    sequence: "31",
    category: "editorial",
    subject: "Palletised and marked export cartons staged for collection",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]", "aspect-[16/8]"],
    usedIn: [
      "/markets (hero aside)",
      "components/sections/home-sections.tsx (MarketsSection, market: usa)",
    ],
    peoplePresent: false,
    asset: editorialMedia.logistics,
  }),
  entry({
    id: "editorial/team",
    sequence: "32",
    category: "editorial",
    subject: "Two or three staff reviewing a tech pack or sample together",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: ["/about (hero aside)"],
    peoplePresent: true,
    asset: editorialMedia.team,
  }),
];

/* -------------------------------------------------------------------------- */
/* Article series, 33 to 35                                                   */
/* -------------------------------------------------------------------------- */

const articleEntries: ImageManifestEntry[] = [
  entry({
    id: "insights/understanding-moq",
    sequence: "33",
    category: "article",
    subject: "Fabric rolls in the store, illustrating the material commitment behind an MOQ",
    orientation: "landscape",
    renderedAspects: ["aspect-[21/9]", "aspect-[16/10]"],
    usedIn: [
      "/insights/understanding-minimum-order-quantity (hero)",
      "/insights (hub card)",
      "components/sections/home-sections.tsx (InsightsSection)",
    ],
    peoplePresent: false,
    asset: articleMedia["understanding-moq"],
  }),
  entry({
    id: "insights/choosing-decoration",
    sequence: "34",
    category: "article",
    subject: "Print and embroidery samples laid side by side on the same fabric",
    orientation: "landscape",
    renderedAspects: ["aspect-[21/9]", "aspect-[16/10]"],
    usedIn: [
      "/insights/choosing-a-decoration-method (hero)",
      "/insights (hub card)",
      "components/sections/home-sections.tsx (InsightsSection)",
    ],
    peoplePresent: false,
    asset: articleMedia["choosing-decoration"],
  }),
  entry({
    id: "insights/tech-pack-anatomy",
    sequence: "35",
    category: "article",
    subject: "Printed tech pack pages beside the garment they describe, on a work bench",
    orientation: "landscape",
    renderedAspects: ["aspect-[21/9]", "aspect-[16/10]"],
    usedIn: [
      "/insights/anatomy-of-a-tech-pack (hero)",
      "/insights (hub card)",
      "components/sections/home-sections.tsx (InsightsSection)",
    ],
    peoplePresent: false,
    asset: articleMedia["tech-pack-anatomy"],
  }),
];

/* -------------------------------------------------------------------------- *
 * Batch 2, added 2026-09-10: hub, capability group, material group, industry
 * and market banners, 36 to 63. See docs/GPT_IMAGE_2_BATCH_2_MASTER_PROMPT.md
 * for the paste-ready generation prompt covering this whole batch.
 * -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Hub banners, 36 to 38                                                       */
/* -------------------------------------------------------------------------- */

const hubEntries: ImageManifestEntry[] = [
  entry({
    id: "hubs/products",
    sequence: "36",
    category: "hub",
    subject: "Finished pieces from several different product families grouped together",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: ["/products (hero aside)"],
    peoplePresent: false,
    asset: hubMedia.products,
  }),
  entry({
    id: "hubs/capabilities",
    sequence: "37",
    category: "hub",
    subject: "Two or three distinct manufacturing processes visible in one wide frame",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: ["/capabilities (hero aside)"],
    peoplePresent: true,
    asset: hubMedia.capabilities,
  }),
  entry({
    id: "hubs/industries",
    sequence: "38",
    category: "hub",
    subject: "Garments representing several different buyer industries, grouped as a flat lay",
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: ["/industries (hero aside)"],
    peoplePresent: false,
    asset: hubMedia.industries,
  }),
];

/* -------------------------------------------------------------------------- */
/* Capability group banners, 39 to 44                                         */
/* -------------------------------------------------------------------------- */

function capabilityGroupEntry(
  group: keyof typeof capabilityGroupMedia,
  sequence: string,
  subject: string,
  peoplePresent: boolean,
): ImageManifestEntry {
  return entry({
    id: `capability-groups/${group}`,
    sequence,
    category: "capability-group",
    subject,
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: [
      `/capabilities/[slug] (hero aside, every capability in the "${group}" group)`,
      "/capabilities (hub, group section sticky column)",
    ],
    peoplePresent,
    asset: capabilityGroupMedia[group],
  });
}

const capabilityGroupEntries: ImageManifestEntry[] = [
  capabilityGroupEntry(
    "development",
    "39",
    "Pattern paper, tracing wheel and measuring tools on a design bench",
    true,
  ),
  capabilityGroupEntry(
    "materials",
    "40",
    "Yarn cones grouped beside rolled fabric samples at a sourcing desk",
    true,
  ),
  capabilityGroupEntry(
    "manufacturing",
    "41",
    "Close, mid distance view of a single sewing station in use",
    true,
  ),
  capabilityGroupEntry(
    "decoration",
    "42",
    "A heat press applying a transfer to a garment panel, steam visible",
    true,
  ),
  capabilityGroupEntry(
    "finishing",
    "43",
    "A finished garment being steam pressed on a finishing station",
    true,
  ),
  capabilityGroupEntry(
    "assurance",
    "44",
    "A quality checklist on a clipboard beside a sealed export carton",
    false,
  ),
];

/* -------------------------------------------------------------------------- */
/* Material group banners, 45 to 49                                           */
/* -------------------------------------------------------------------------- */

function materialGroupEntry(
  group: keyof typeof materialGroupMedia,
  sequence: string,
  subject: string,
): ImageManifestEntry {
  return entry({
    id: `material-groups/${group}`,
    sequence,
    category: "material-group",
    subject,
    orientation: "square",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: [
      `/materials/[slug] (hero aside, every material in the "${group}" group)`,
      "/materials (hub grid card thumbnail)",
    ],
    peoplePresent: false,
    asset: materialGroupMedia[group],
  });
}

const materialGroupEntries: ImageManifestEntry[] = [
  materialGroupEntry("natural-fibers", "45", "Raw cotton fibre beside a plain cotton yarn cone"),
  materialGroupEntry(
    "synthetic-and-performance",
    "46",
    "A technical knit swatch being stretched by hand to show recovery",
  ),
  materialGroupEntry(
    "knitted-fabrics",
    "47",
    "Macro detail of a knitted fabric's interlocking loop structure",
  ),
  materialGroupEntry(
    "woven-fabrics",
    "48",
    "Macro detail of a woven fabric's grain and selvedge edge",
  ),
  materialGroupEntry(
    "recycled-and-lower-impact",
    "49",
    "Sorted fabric offcuts beside a swatch made with recycled fibre content",
  ),
];

/* -------------------------------------------------------------------------- */
/* Industry banners, 50 to 59                                                 */
/* -------------------------------------------------------------------------- */

function industryEntry(
  slug: keyof typeof industryMedia,
  sequence: string,
  subject: string,
): ImageManifestEntry {
  return entry({
    id: `industries/${slug}`,
    sequence,
    category: "industry",
    subject,
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]"],
    usedIn: [`/industries/${slug} (hero aside)`, "/industries (hub grid)"],
    peoplePresent: false,
    asset: industryMedia[slug],
  });
}

const industryEntries: ImageManifestEntry[] = [
  industryEntry("fashion-brands", "50", "A small capsule of folded apparel, blank neck labels"),
  industryEntry(
    "streetwear-brands",
    "51",
    "A stacked heavyweight hoodie and tee, blank chest area",
  ),
  industryEntry(
    "sports-clubs-and-teams",
    "52",
    "A matching team jersey set folded together, blank number area",
  ),
  industryEntry(
    "corporate-uniforms",
    "53",
    "A folded corporate polo and shirt set, blank embroidery area",
  ),
  industryEntry("hospitality", "54", "Folded hotel style towels stacked with a hospitality apron"),
  industryEntry(
    "healthcare",
    "55",
    "A folded medical scrub top and trousers, neutral colour, blank pocket",
  ),
  industryEntry(
    "education",
    "56",
    "A folded school style polo and sweatshirt, blank crest area",
  ),
  industryEntry(
    "construction-and-industrial",
    "57",
    "A folded high visibility workwear vest, reflective tape visible",
  ),
  industryEntry(
    "retail-and-wholesale",
    "58",
    "A stack of mixed folded garments with blank swing tags",
  ),
  industryEntry(
    "promotional-products",
    "59",
    "A grouped flat lay of a cap, a tote bag and a small pouch",
  ),
];

/* -------------------------------------------------------------------------- */
/* Market banners, 60 to 63                                                   */
/* -------------------------------------------------------------------------- */

function marketEntry(
  slug: keyof typeof marketBannerMedia,
  sequence: string,
  subject: string,
): ImageManifestEntry {
  return entry({
    id: `markets/${slug}`,
    sequence,
    category: "market",
    subject,
    orientation: "landscape",
    renderedAspects: ["aspect-[4/3]", "aspect-[16/9]"],
    usedIn: [`/markets/${slug} (hero aside)`, "/markets (hub grid card)"],
    peoplePresent: false,
    asset: marketBannerMedia[slug],
  });
}

const marketEntries: ImageManifestEntry[] = [
  marketEntry("usa", "60", "Export cartons being wrapped onto a pallet for ocean freight"),
  marketEntry(
    "europe",
    "61",
    "A garment's care label held open and checked before packing",
  ),
  marketEntry("uk", "62", "Export documentation on a clipboard resting on a sealed carton"),
  marketEntry(
    "australia",
    "63",
    "A garment packed with cardboard and synthetic material, no wood packaging visible",
  ),
];

/** Every image slot on the site, in GPT Image 2 batch order. */
export const imageManifest: ImageManifestEntry[] = [
  ...factoryEntries,
  ...productEntries,
  ...editorialEntries,
  ...articleEntries,
  ...hubEntries,
  ...capabilityGroupEntries,
  ...materialGroupEntries,
  ...industryEntries,
  ...marketEntries,
];

export function getManifestEntry(id: string): ImageManifestEntry | undefined {
  return imageManifest.find((item) => item.id === id);
}

/** Entries whose file has not been installed yet. Mirrors `outstandingMediaSlots`. */
export function outstandingManifestEntries(): ImageManifestEntry[] {
  return imageManifest.filter((item) => item.asset.isPlaceholder === true);
}
