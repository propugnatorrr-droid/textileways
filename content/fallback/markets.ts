import type { Market } from "@/content/types";

/**
 * Market pages.
 *
 * These describe how Textileways supports buyers in each market. They do not
 * make blanket legal guarantees, and they state clearly that regulatory
 * responsibility for a product sits with the brand placing it on the market.
 */
export const markets: Market[] = [
  {
    slug: "usa",
    name: "United States",
    summary:
      "Support for USA based brands, retailers and organisations importing apparel and textile products.",
    introduction: [
      "The United States is one of our two primary markets. Buyers here typically work to alpha sizing, expect labelling that follows domestic conventions, and plan around the lead time that ocean freight from Pakistan requires.",
      "Practically, that means three things get confirmed early on any USA project: the size range and how it is graded, the exact wording that appears on the care and content label, and whether the schedule is built around sea or air freight.",
      "We prepare export documentation for shipments to the United States and work with your nominated customs broker or forwarder. Classification, duty and clearance follow the Incoterm agreed in the quotation.",
    ],
    buyerSupport: [
      "Size ranges graded for USA sizing conventions",
      "Labelling prepared to the wording you confirm for the domestic market",
      "Quotations against recognised Incoterms so responsibility is unambiguous",
      "Coordination with your nominated customs broker or forwarder",
      "Sea and air freight options assessed against your delivery date",
    ],
    documentation: [
      "Commercial invoice",
      "Packing list with carton dimensions and weights",
      "Certificate of origin where required",
      "Bill of lading or air waybill",
      "Test reports where your buyer or product category requires them",
    ],
    regulatoryAwareness: [
      "Fibre content, care instructions and country of origin identification are applied exactly as you confirm them.",
      "Children's product requirements are stricter than those for adult apparel, and applicable testing is coordinated where you specify it.",
      "Responsibility for confirming which federal and state requirements apply to your product remains with you as the brand placing it on the market.",
      "We flag anything in a specification that appears inconsistent with what you have told us about your market.",
    ],
    logisticsNotes: [
      "Ocean freight is the standard route and the schedule should be planned around it rather than around air freight timings.",
      "Air freight is available where a date cannot move, at materially higher cost.",
      "West and East coast ports have different transit times, which affects the production schedule.",
    ],
    faqIds: ["shipping-terms", "compliance", "lead-time", "quantity-scale"],
    seo: {
      title: "Apparel manufacturing for USA buyers",
      description:
        "Manufacturing support for United States brands and retailers, covering sizing, labelling, export documentation and freight planning.",
    },
  },
  {
    slug: "europe",
    name: "European Union",
    summary:
      "Support for brands, retailers and organisations importing into European Union member states.",
    introduction: [
      "European Union buyers generally place more weight on documentation than buyers in other markets. Fibre composition labelling, restricted substance expectations and supply chain transparency are asked about early, and often before a first sample is discussed.",
      "We prepare for that by recording specifications and material origins during development rather than assembling them afterwards. When a buyer asks what is in a garment and where it came from, the answer already exists.",
      "Sizing is the other early decision. European size conventions differ from those used in the USA and the United Kingdom, so the size range is confirmed and graded for the destination market.",
    ],
    buyerSupport: [
      "Size ranges graded for European sizing conventions",
      "Fibre composition labelling prepared in the languages you specify",
      "Material origin and specification records maintained through development",
      "Coordination of restricted substance testing with accredited laboratories on request",
      "Quotations against recognised Incoterms for European destinations",
    ],
    documentation: [
      "Commercial invoice",
      "Packing list with carton dimensions and weights",
      "Certificate of origin where required",
      "Bill of lading or air waybill",
      "Material composition records",
      "Test reports where your buyer or product category requires them",
    ],
    regulatoryAwareness: [
      "Fibre composition labelling is required across the European Union and is applied exactly as you confirm it.",
      "Restricted substance requirements apply to textile products, and testing is coordinated with accredited laboratories where you specify it.",
      "Responsibility for confirming which European Union and member state requirements apply to your product remains with you as the importer or brand owner.",
      "Language requirements for labelling differ between member states and are applied as you instruct.",
    ],
    logisticsNotes: [
      "Ocean freight to northern European ports is the standard route for volume shipments.",
      "Consolidated shipping is available for smaller quantities.",
      "Customs clearance and import duties follow the agreed Incoterm and are normally handled by the importer.",
    ],
    faqIds: ["compliance", "shipping-terms", "lead-time"],
    seo: {
      title: "Apparel manufacturing for European Union buyers",
      description:
        "Manufacturing support for European Union importers, covering composition labelling, material records, testing coordination and freight planning.",
    },
  },
  {
    slug: "uk",
    name: "United Kingdom",
    summary:
      "Support for United Kingdom brands, retailers and organisations importing apparel and textile products.",
    introduction: [
      "The United Kingdom operates its own import and labelling framework separately from the European Union. Buyers importing into Great Britain and buyers importing into Northern Ireland do not necessarily face identical requirements, and that distinction matters when documentation is prepared.",
      "United Kingdom buyers are frequently ordering at smaller quantities than large European retail programmes, which suits our lower minimum quantities and makes the market a natural fit for brands running a first validation order.",
      "Sizing follows United Kingdom conventions, which differ from both USA and continental European sizing, so the size range is confirmed before grading.",
    ],
    buyerSupport: [
      "Size ranges graded for United Kingdom sizing conventions",
      "Labelling prepared to the wording you confirm for the domestic market",
      "Lower minimum quantities suited to independent brands",
      "Quotations against recognised Incoterms for United Kingdom destinations",
      "Coordination with your nominated customs agent or forwarder",
    ],
    documentation: [
      "Commercial invoice",
      "Packing list with carton dimensions and weights",
      "Certificate of origin where required",
      "Bill of lading or air waybill",
      "Test reports where your buyer or product category requires them",
    ],
    regulatoryAwareness: [
      "Fibre composition labelling requirements apply to textile products placed on the United Kingdom market and are applied exactly as you confirm them.",
      "Requirements for Great Britain and Northern Ireland can differ, and the applicable route is confirmed with you.",
      "Responsibility for confirming which United Kingdom requirements apply to your product remains with you as the importer or brand owner.",
      "Children's product requirements are stricter than those for adult apparel, and testing is coordinated where you specify it.",
    ],
    logisticsNotes: [
      "Ocean freight to United Kingdom ports is the standard route for volume shipments.",
      "Air freight suits smaller quantities and fixed dates at higher cost per piece.",
      "Import duties and clearance follow the agreed Incoterm and are normally handled by the importer.",
    ],
    faqIds: ["compliance", "shipping-terms", "minimum-order"],
    seo: {
      title: "Apparel manufacturing for United Kingdom buyers",
      description:
        "Manufacturing support for United Kingdom brands and retailers, covering sizing, labelling, documentation and lower minimum quantities.",
    },
  },
];

const marketIndex = new Map(markets.map((market) => [market.slug, market]));

export function getMarket(slug: string): Market | undefined {
  return marketIndex.get(slug);
}

export function marketSlugs(): string[] {
  return markets.map((market) => market.slug);
}
