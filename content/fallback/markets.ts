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
    withArticle: "the United States",
    summary:
      "Support for USA based brands, retailers and organisations importing apparel and textile products.",
    introduction: [
      "United States projects typically use alpha sizing, domestic labelling conventions and delivery plans built around the selected freight method from Pakistan.",
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
    withArticle: "the European Union",
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
    withArticle: "the United Kingdom",
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
  {
    slug: "australia",
    name: "Australia",
    withArticle: "Australia",
    summary:
      "Pakistan based manufacturing for Australian brands, retailers, importers and organisations, working to the sizing, labelling and packaging specification you confirm.",
    introduction: [
      "Textileways manufactures in Pakistan. We are not an Australian company and do not operate an office or facility in Australia. What we offer Australian buyers is the same specification discipline described throughout this site, applied to a destination you confirm rather than assumed from experience with other markets.",
      "Australian buyers typically source at a wider range of quantities than large European retail programmes, from a first validation run through to repeat wholesale orders, which suits our lower minimum quantities as much as it suits an established importer scaling an existing range.",
      "Sizing, care labelling and country of origin wording are confirmed with you before cutting starts. We apply exactly what you specify rather than assuming an Australian standard on your behalf.",
    ],
    buyerSupport: [
      "Production built to the sizing specification you confirm, rather than an assumed Australian standard",
      "Care and content labelling applied exactly as you provide the wording",
      "Country of origin marking applied accurately to what was actually manufactured and where",
      "Carton, pallet and packaging specifications built to your confirmed requirements",
      "Quotations against recognised Incoterms for Australian destinations",
    ],
    documentation: [
      "Commercial invoice",
      "Packing list with carton dimensions and weights",
      "Certificate of origin where required",
      "Bill of lading or air waybill",
      "Test reports where your buyer or product category requires them",
    ],
    regulatoryAwareness: [
      "Product safety, labelling and children's nightwear flammability requirements are applied exactly as you specify them. We do not certify compliance with Australian consumer law, and confirming which requirements apply to your product remains your responsibility as the importer or brand owner.",
      "Country of origin claims such as \"Made in\" wording are applied accurately to reflect Pakistan as the country of manufacture. We do not apply an Australian Made mark or any claim implying local production.",
      "Where a shipment includes solid wood packaging materials, such as pallets or dunnage, Australian biosecurity requirements for treatment and certification are the importer's responsibility to confirm and arrange.",
      "We are not aware of a preferential trade arrangement between Pakistan and Australia and do not assume one applies. Duty and tariff treatment should be confirmed with your customs broker.",
    ],
    logisticsNotes: [
      "Ocean freight to Australian east and west coast ports is the standard route for volume shipments, with transit times that should be planned into the production schedule.",
      "Air freight is available for smaller quantities or fixed dates, at materially higher cost.",
      "Customs clearance, duties and biosecurity inspection in Australia are the importer's responsibility and follow the agreed Incoterm.",
    ],
    faqIds: ["compliance", "shipping-terms", "lead-time", "minimum-order"],
    seo: {
      title: "Apparel manufacturing for Australian buyers",
      description:
        "Pakistan based manufacturing support for Australian brands and importers, covering specification, labelling, packaging and freight planning.",
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
