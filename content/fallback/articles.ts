import type { Article } from "@/content/types";
import { articleMedia } from "./media";

/**
 * Educational articles.
 *
 * These explain how manufacturing decisions work rather than promoting the
 * company. They contain no customer stories, no performance statistics and no
 * claims about Textileways that are not already in the verified fact register.
 */
export const articles: Article[] = [
  {
    slug: "understanding-minimum-order-quantity",
    title: "What actually sets a minimum order quantity",
    summary:
      "MOQ is rarely a policy decision. It is the sum of several separate minimums that sit upstream of the factory, and understanding them tells you where a number can move.",
    category: "Sourcing",
    publishedAt: "2026-02-10",
    readingMinutes: 7,
    hero: articleMedia["understanding-moq"],
    sections: [
      {
        heading: "The number is not one number",
        paragraphs: [
          "When a manufacturer quotes a minimum order quantity, buyers usually hear it as a commercial preference. In practice it is an aggregate: several independent minimums stacked on top of each other, most of which are set by suppliers further up the chain rather than by the factory itself.",
          "Separating them is useful, because some are firm and some are negotiable, and knowing which is which tells you where a quantity can realistically move.",
        ],
      },
      {
        heading: "The four minimums that make up an MOQ",
        paragraphs: [
          "Almost every quoted minimum breaks down into the following components. Each one is set by a different party.",
        ],
        list: [
          "Fabric minimum. A mill will not knit or weave below a certain length, and a dye house will not dye below a certain batch size. This is usually the largest single constraint and it is not set by the factory.",
          "Trim and component minimum. Woven labels, hangtags, zips and hardware all carry their own batch minimums from their own suppliers. It is common for a label supplier's minimum to exceed the garment quantity.",
          "Decoration setup. Screen printing requires a screen per colour. Embroidery requires a digitised file and an approved sew out. Those costs are fixed regardless of quantity, so they fall per piece as volume rises.",
          "Production line efficiency. A sewing line has a setup cost in time. Below a certain quantity, the setup dominates the run, which is why very small orders carry a higher unit cost rather than being refused.",
        ],
      },
      {
        heading: "Why stock fabric changes the answer",
        paragraphs: [
          "The single largest lever on a minimum quantity is whether the fabric already exists. Stock fabric in a standard colour removes the mill and dye house minimums entirely, which is why a 50 piece order in a stock quality is realistic while the same order in a custom colour is not.",
          "This is also why the same factory can honestly quote very different minimums for two garments that look almost identical. One uses fabric that is on the shelf, the other requires a dye batch.",
        ],
      },
      {
        heading: "How to ask for a lower quantity",
        paragraphs: [
          "If a quoted minimum is higher than you want, the productive question is not whether it can be reduced but which component is driving it. Once you know that, the options become concrete.",
        ],
        list: [
          "Accept a stock fabric colour instead of a custom shade, which removes the dye batch minimum.",
          "Reduce the number of colourways rather than the total quantity, since each colourway carries its own fabric minimum.",
          "Use a decoration method with no setup cost, such as DTF or DTG, for a first run.",
          "Use stock labels for a validation order and move to custom woven labels at volume.",
          "Split the size range, offering fewer sizes on a first drop.",
        ],
      },
      {
        heading: "What a validation order is actually for",
        paragraphs: [
          "A small first order is not a smaller version of a production order. Its purpose is to answer questions that cannot be answered on paper: whether the fit is right, whether the fabric feels the way you expected, whether the print survives washing and whether customers buy it.",
          "Accepting a higher unit cost for that information is usually rational. The alternative is finding the same answers after committing to a full production run.",
        ],
      },
    ],
    relatedProducts: ["everyday-apparel", "streetwear"],
    relatedCapabilities: ["material-sourcing", "sample-development", "cut-and-sew-manufacturing"],
    relatedMaterials: ["cotton", "french-terry"],
    faqIds: ["minimum-order", "quantity-scale", "sampling"],
    seo: {
      title: "What actually sets a minimum order quantity",
      description:
        "MOQ is an aggregate of fabric, trim, decoration and line setup minimums. Understanding which component drives the number tells you where it can move.",
    },
  },
  {
    slug: "choosing-a-decoration-method",
    title: "Choosing between screen printing, DTG, DTF, sublimation and embroidery",
    summary:
      "Each decoration method has a fabric it suits, a quantity where it makes economic sense, and a failure mode. Choosing well means matching all three rather than picking a favourite.",
    category: "Production",
    publishedAt: "2026-03-04",
    readingMinutes: 9,
    hero: articleMedia["choosing-decoration"],
    sections: [
      {
        heading: "Three questions, not one",
        paragraphs: [
          "Decoration decisions go wrong when they are made on appearance alone. A method that looks right in a sample can be the wrong choice because of the fabric it will run on, or because the quantity makes it uneconomic.",
          "Three questions settle it in almost every case: what fabric is it going on, how many pieces are there, and what does the artwork actually contain.",
        ],
      },
      {
        heading: "Screen printing",
        paragraphs: [
          "Screen printing pushes ink through a mesh, one screen per colour. Setup cost therefore rises with colour count and is spread across the run, which makes it the cheapest method at volume and an expensive one for fifty pieces.",
          "It produces the most opaque and durable result on cotton, which is why it remains the default for tee shirt and sweatshirt graphics. It is the wrong choice for photographic artwork, and it loses fine detail on textured surfaces such as pique and heavy fleece.",
        ],
        list: [
          "Best for: solid colour artwork on cotton at volume",
          "Economics: setup per colour, low unit cost at quantity",
          "Watch for: dye migration on dark polyester, detail loss on textured fabric",
        ],
      },
      {
        heading: "DTG printing",
        paragraphs: [
          "DTG prints ink directly into a finished garment, the way an inkjet printer prints onto paper. There are no screens, so colour count costs nothing and a single piece is viable.",
          "It works best on cotton rich fabric and requires pretreatment on dark garments. Its unit cost does not fall much with quantity, so above a few hundred pieces screen printing usually wins on cost.",
        ],
        list: [
          "Best for: photographic or multi colour artwork at low quantity on cotton",
          "Economics: no setup, flat unit cost regardless of volume",
          "Watch for: limited performance on polyester rich fabric",
        ],
      },
      {
        heading: "DTF printing",
        paragraphs: [
          "DTF prints artwork onto a film that is then heat applied. Because the ink never has to bond directly with the fibre, it works across a much wider fabric range than DTG, including polyester, blends and coated fabrics.",
          "The trade off is that the print sits on the surface rather than in the fabric, so handfeel differs and large solid areas reduce breathability. For mixed fabric programmes it is often the only method that gives one consistent result across every item.",
        ],
        list: [
          "Best for: mixed fabric programmes and detailed artwork at low to mid quantity",
          "Economics: no setup, flat unit cost",
          "Watch for: surface handfeel, breathability on large solid coverage",
        ],
      },
      {
        heading: "Sublimation",
        paragraphs: [
          "Sublimation turns dye into gas under heat so it bonds into polyester fibre. The result has no handfeel and cannot crack or peel, because there is nothing sitting on the surface to crack.",
          "It has two hard constraints. It only works on polyester rich fabric, and it cannot print white, since it adds colour rather than laying down opaque ink. Any white in a design is the base fabric showing through.",
        ],
        list: [
          "Best for: full coverage graphics and per piece personalisation on polyester",
          "Economics: viable at low quantity, since artwork is applied per piece",
          "Watch for: no white printing, no use on cotton",
        ],
      },
      {
        heading: "Embroidery",
        paragraphs: [
          "Embroidery builds a logo from thread. It outlasts every printed method, which is why uniform programmes rely on it almost exclusively.",
          "Its limits are dimensional. Lettering below roughly four millimetres does not reproduce reliably, gradients cannot be stitched, and dense designs stiffen lightweight fabric. Artwork that works in print frequently has to be redrawn for embroidery.",
        ],
        list: [
          "Best for: logos and durable branding on uniforms, polos and headwear",
          "Economics: digitising is a one time cost, unit cost driven by stitch count",
          "Watch for: small text, gradients, distortion on lightweight fabric",
        ],
      },
      {
        heading: "Mixing methods in one programme",
        paragraphs: [
          "Most real programmes end up using more than one method. A campaign covering tee shirts, caps and tote bags might use screen printing on cotton tees, embroidery on caps and DTF on a blended jacket, all reproducing the same logo.",
          "That is the correct approach rather than a compromise. Matching the method to each fabric produces a more consistent visual result than forcing one method across every item.",
        ],
      },
    ],
    relatedProducts: ["everyday-apparel", "sportswear-and-activewear", "textile-accessories"],
    relatedCapabilities: ["screen-printing", "dtg-printing", "dtf-printing", "sublimation", "embroidery"],
    relatedMaterials: ["cotton", "polyester", "cotton-polyester-blend"],
    faqIds: ["decoration-options", "minimum-order"],
    seo: {
      title: "Choosing between screen printing, DTG, DTF, sublimation and embroidery",
      description:
        "How fabric, quantity and artwork determine which decoration method to use, with the economics and failure modes of each one.",
    },
  },
  {
    slug: "anatomy-of-a-tech-pack",
    title: "The anatomy of a tech pack, and why reorders depend on it",
    summary:
      "A tech pack is the document that makes a garment repeatable. Here is what belongs in one, and what goes wrong when a section is left open.",
    category: "Development",
    publishedAt: "2026-04-22",
    readingMinutes: 8,
    hero: articleMedia["tech-pack-anatomy"],
    sections: [
      {
        heading: "What a tech pack is for",
        paragraphs: [
          "A tech pack exists to let a different person, on a different line, in a different month, make the same garment. Everything in it serves that purpose, and anything that does not is decoration.",
          "The test is simple: if the specification were handed to a factory that had never spoken to you, could they produce the garment you intended. Where the answer is no, the gap is the part that will be interpreted differently in production.",
        ],
      },
      {
        heading: "The measurement chart and its tolerances",
        paragraphs: [
          "A measurement chart lists points of measure and the target value for each size. A chart without tolerances is incomplete, because no garment is produced to an exact figure and the tolerance is what defines acceptance.",
          "Tolerances vary by point of measure. A chest measurement typically carries a wider tolerance than a collar, because a small collar variance is visible and a small chest variance is not. Setting one blanket tolerance across every point produces disputes later.",
        ],
      },
      {
        heading: "The bill of materials",
        paragraphs: [
          "The bill of materials lists everything the garment is made from: fabric, thread, elastic, zips, buttons, labels, hangtags and packaging. Each line needs enough specification to be sourced without a follow up question.",
          "Fabric is the line that most often gets under specified. Cotton jersey 180 gsm is not a specification. Combed ring spun cotton, single jersey, 180 gsm finished weight, with a named colour reference, is.",
        ],
      },
      {
        heading: "Construction detail",
        paragraphs: [
          "Construction detail records how the garment is assembled: seam types, stitch density, hem finishing, topstitching and reinforcement. These decisions change both appearance and cost.",
          "This is also where durability is decided. Whether a hem is single or twin needle stitched, whether stress points are bartacked, and whether the shoulder is taped are choices that determine how long the garment lasts.",
        ],
      },
      {
        heading: "Artwork and label placement",
        paragraphs: [
          "Placement has to be dimensioned from a fixed reference point rather than described. Fifty millimetres below the collar seam is a specification; centred on the chest is an interpretation.",
          "Placement also needs to be defined per size. A print positioned identically on a small and an extra large will look wrong on one of them, so placement usually scales across the range.",
        ],
      },
      {
        heading: "Version control",
        paragraphs: [
          "Every revision should carry a number and a date, and every approval should reference the version it approves. Without that, a factory can be working from a superseded file while the buyer believes a change was made.",
          "This becomes critical at reorder. A repeat order placed against version three when production ran on version five produces a garment that differs from the one in the shop, and nobody can establish why.",
        ],
      },
      {
        heading: "What happens without one",
        paragraphs: [
          "A first order can be produced without a tech pack. The approved sample carries the information instead, and for a single run that often works.",
          "The cost arrives at the second order. Without a written specification, a reorder is a fresh development project: the sample is measured again, fabric is identified again, and construction is inferred rather than read. That is slower, more expensive and less accurate than the first run, which is the opposite of what a reorder should be.",
        ],
      },
    ],
    relatedProducts: ["everyday-apparel", "workwear-and-uniforms"],
    relatedCapabilities: ["tech-pack-development", "pattern-making", "grading", "sample-development"],
    relatedMaterials: ["cotton", "cotton-polyester-blend"],
    faqIds: ["tech-pack", "sampling", "reorders"],
    seo: {
      title: "The anatomy of a tech pack, and why reorders depend on it",
      description:
        "What belongs in an apparel tech pack, from measurement tolerances to version control, and what goes wrong when a section is left open.",
    },
  },
];

const articleIndex = new Map(articles.map((article) => [article.slug, article]));

export function getArticle(slug: string): Article | undefined {
  return articleIndex.get(slug);
}

export function articleSlugs(): string[] {
  return articles.map((article) => article.slug);
}

/** Articles sorted newest first, used by the insights hub and the homepage. */
export function articlesByDate(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
