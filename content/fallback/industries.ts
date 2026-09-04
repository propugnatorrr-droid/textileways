import type { Industry } from "@/content/types";

/** The ten buyer industries used for navigation, filtering and landing pages. */
export const industries: Industry[] = [
  {
    slug: "fashion-brands",
    name: "Fashion brands",
    summary:
      "Independent and growing labels that need a manufacturer able to sample quickly and then scale without a supplier change.",
    introduction: [
      "Fashion brands rarely fail because of one bad order. They fail because they outgrow a supplier who could handle 200 pieces and cannot handle 5,000, and then lose a season rebuilding fit, fabric and colour with someone new.",
      "The practical answer is to start with a manufacturer whose range covers both. A first drop can be produced at validation quantity, and the same approved pattern, fabric specification and colour standard carry forward when volume increases.",
    ],
    buyerPriorities: [
      "Sampling that resolves fit before money is committed to fabric",
      "Honest minimum quantities rather than optimistic figures",
      "Fabric consistency between the first order and the reorder",
      "Decoration quality that matches the brand's price position",
      "A supplier that stays viable as volume grows",
    ],
    typicalProducts: ["everyday-apparel", "streetwear", "denim-and-woven-products", "underwear-sleepwear-loungewear", "swim-and-resort"],
    relevantCapabilities: ["sample-development", "pattern-making", "cut-and-sew-manufacturing", "private-labelling", "screen-printing"],
    complianceNotes: [
      "Fibre content and care labelling requirements differ between the USA, the UK and the European Union.",
      "Brand ownership of artwork and specifications is recorded before development begins.",
    ],
    faqIds: ["minimum-order", "sampling", "quantity-scale", "existing-supplier"],
    seo: {
      title: "Manufacturing for fashion brands",
      description:
        "Apparel manufacturing for independent and growing fashion labels, from validation runs through to scaled production on the same specification.",
    },
  },
  {
    slug: "streetwear-brands",
    name: "Streetwear brands",
    summary:
      "Labels whose product credibility rests on fabric weight, silhouette and finishing rather than on print alone.",
    introduction: [
      "Streetwear buyers can tell a cut and sew garment from a decorated blank immediately. Fabric weight, shoulder position and the way a hem sits are the signals, and none of them can be added at the print stage.",
      "Drop based selling also changes the operational requirement. Quantities per drop are often modest, timing is fixed, and a repeat of a successful piece has to match the original exactly, which makes retained samples and wash standards essential rather than optional.",
    ],
    buyerPriorities: [
      "Heavyweight fabric options with genuine weight rather than nominal figures",
      "Cut and sew construction with drop shoulder and boxy blocks drafted properly",
      "Print and embroidery quality that survives wear",
      "Garment washing with a retained standard for repeats",
      "Manageable quantities per drop",
    ],
    typicalProducts: ["streetwear", "everyday-apparel", "denim-and-woven-products", "textile-accessories"],
    relevantCapabilities: ["cut-and-sew-manufacturing", "washing-and-garment-finishing", "screen-printing", "embroidery", "patches-and-badges"],
    complianceNotes: [
      "Artwork clearance for third party content remains the brand's responsibility.",
      "Care labelling has to reflect any garment washing applied during production.",
    ],
    faqIds: ["minimum-order", "reorders", "decoration-options", "sampling"],
    seo: {
      title: "Manufacturing for streetwear brands",
      description:
        "Cut and sew streetwear production with heavyweight fabrics, drafted oversized blocks, garment washing and retained wash standards for repeats.",
    },
  },
  {
    slug: "sports-clubs-and-teams",
    name: "Sports clubs and teams",
    summary:
      "Clubs and organisations ordering kit with per player personalisation and a programme that repeats each season.",
    introduction: [
      "Team kit is an operational problem before it is a manufacturing one. A single order can contain a hundred different name and number combinations across several sizes and three garment types, and a mistake on any one of them is visible on the pitch.",
      "Sublimation solves the design side by allowing full coverage graphics at practical quantities. Data handling solves the rest: an order list that is verified against the finished goods before packing.",
    ],
    buyerPriorities: [
      "Accurate per player names, numbers and sizes",
      "Full colour graphics that survive frequent washing",
      "Quantities that suit a club rather than a retail brand",
      "Repeatable artwork for the following season",
      "Coordinated accessories alongside the main kit",
    ],
    typicalProducts: ["sportswear-and-activewear", "specialist-sports-products", "textile-accessories", "everyday-apparel"],
    relevantCapabilities: ["sublimation", "heat-transfer", "cut-and-sew-manufacturing", "embroidery", "inspection"],
    complianceNotes: [
      "League and governing body rules on kit design and sponsor placement remain the club's responsibility to confirm.",
      "Player names and numbers are handled as order data and used only to fulfil the order.",
    ],
    faqIds: ["decoration-options", "minimum-order", "reorders"],
    seo: {
      title: "Manufacturing for sports clubs and teams",
      description:
        "Sublimated team kit with per player personalisation, verified order data and repeatable artwork for seasonal reorders.",
    },
  },
  {
    slug: "corporate-uniforms",
    name: "Corporate uniforms",
    summary:
      "Organisations issuing branded apparel to staff, where consistency across years matters more than seasonal change.",
    introduction: [
      "A corporate uniform programme is a long term commitment. A garment issued to a new employee three years after launch has to match the one issued on day one, in colour, fit and branding.",
      "That is achieved with retained approved samples, a locked fabric specification and a recorded colour standard. Without those, each reorder becomes a fresh negotiation about whether the shade is close enough.",
    ],
    buyerPriorities: [
      "Colour consistency across reorders measured against a retained standard",
      "Embroidery placement identical on every garment",
      "Size ranges that include every employee",
      "Durability through the actual laundering regime",
      "Predictable reordering without redevelopment",
    ],
    typicalProducts: ["workwear-and-uniforms", "everyday-apparel", "textile-accessories", "outdoor-and-performance"],
    relevantCapabilities: ["embroidery", "cut-and-sew-manufacturing", "custom-color-development", "private-labelling", "quality-assurance"],
    complianceNotes: [
      "Corporate brand colour standards are recorded and matched against a physical reference under agreed lighting.",
      "Where a uniform includes protective elements, the applicable standard is confirmed on technical review.",
    ],
    faqIds: ["reorders", "minimum-order", "compliance"],
    seo: {
      title: "Corporate uniform manufacturing",
      description:
        "Uniform programmes with retained colour standards, consistent embroidery placement and inclusive size ranges built for repeat ordering.",
    },
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    summary:
      "Hotels, restaurants and venues needing staff uniforms and linen that survive commercial laundering.",
    introduction: [
      "Hospitality textiles face a laundering regime that domestic products are not designed for: high temperature washing, industrial drying and frequent cycles. Fabric selected for handfeel alone will not survive it.",
      "The category also spans two very different product groups. Staff uniforms have to look presentable at the end of a shift, and linen has to hold its dimensions and colour through hundreds of commercial washes.",
    ],
    buyerPriorities: [
      "Fabrics selected for commercial laundering rather than domestic washing",
      "Front of house presentation maintained through a full shift",
      "Coordinated uniforms across departments",
      "Linen dimensions that stay correct after repeated washing",
      "Predictable replacement ordering",
    ],
    typicalProducts: ["workwear-and-uniforms", "home-textiles", "textile-accessories", "underwear-sleepwear-loungewear"],
    relevantCapabilities: ["cut-and-sew-manufacturing", "embroidery", "material-sourcing", "quality-assurance", "logistics-and-export"],
    complianceNotes: [
      "Food service environments may impose requirements on fabric and component choice, which are confirmed with you.",
      "Commercial laundering performance is established during sampling rather than assumed.",
    ],
    faqIds: ["reorders", "compliance", "minimum-order"],
    seo: {
      title: "Hospitality uniform and linen manufacturing",
      description:
        "Staff uniforms and hospitality linen specified for commercial laundering, with dimensional stability confirmed during sampling.",
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    summary:
      "Clinical and care settings where garments are laundered at high temperature and worn for long shifts.",
    introduction: [
      "Healthcare apparel has a narrow specification window. It has to withstand high temperature laundering, remain comfortable through a twelve hour shift, and hold its shape and colour long enough to justify the cost per wear.",
      "Because requirements vary considerably between institutions and jurisdictions, we work to your written specification rather than offering a general healthcare standard.",
    ],
    buyerPriorities: [
      "Fabrics that tolerate high temperature laundering",
      "Comfort across long shifts",
      "Colour coding across roles and departments",
      "Functional pocket layouts",
      "Consistent replacement supply",
    ],
    typicalProducts: ["workwear-and-uniforms", "home-textiles", "everyday-apparel"],
    relevantCapabilities: ["cut-and-sew-manufacturing", "material-sourcing", "laboratory-testing-coordination", "quality-assurance"],
    complianceNotes: [
      "Requirements for healthcare textiles differ by jurisdiction and institution, and are confirmed with you before production.",
      "Any antimicrobial or barrier claim requires test evidence and is not made without it.",
    ],
    faqIds: ["compliance", "reorders", "inspection"],
    seo: {
      title: "Healthcare apparel manufacturing",
      description:
        "Scrubs and healthcare uniforms specified for high temperature laundering, long shift comfort and consistent replacement supply.",
    },
  },
  {
    slug: "education",
    name: "Education",
    summary:
      "Schools, universities and student organisations ordering uniform, leavers and club apparel.",
    introduction: [
      "Education buyers order to a calendar. Uniform stock has to be in place before term, leavers apparel has to arrive before students leave, and a missed date cannot be recovered later.",
      "The category also mixes institutional requirements with personalisation. A school uniform programme needs consistency across years, while leavers hoodies need individual names on every piece.",
    ],
    buyerPriorities: [
      "Delivery aligned to the academic calendar",
      "Durability through heavy use and frequent washing",
      "Consistent colour across annual reorders",
      "Individual personalisation on leavers and club apparel",
      "Full size ranges from young children to adults",
    ],
    typicalProducts: ["workwear-and-uniforms", "everyday-apparel", "children-and-baby", "sportswear-and-activewear", "textile-accessories"],
    relevantCapabilities: ["embroidery", "heat-transfer", "cut-and-sew-manufacturing", "screen-printing", "custom-color-development"],
    complianceNotes: [
      "Children's apparel safety requirements apply to younger age ranges and are confirmed on technical review.",
      "Institutional branding usage is confirmed with the institution before production.",
    ],
    faqIds: ["lead-time", "reorders", "compliance"],
    seo: {
      title: "Education and school uniform manufacturing",
      description:
        "School uniform, leavers and club apparel produced to the academic calendar with consistent colour and individual personalisation.",
    },
  },
  {
    slug: "construction-and-industrial",
    name: "Construction and industrial",
    summary:
      "Working environments where garment durability and visibility requirements are functional rather than cosmetic.",
    introduction: [
      "Industrial workwear is judged on how long it lasts in an abrasive environment and whether it meets whatever safety requirement applies on the site.",
      "Protective and high visibility requirements are governed by standards that differ by market and by application. We produce to the standard you specify and confirm feasibility on technical review rather than making a blanket claim.",
    ],
    buyerPriorities: [
      "Durability in abrasive working environments",
      "Compliance with the specified visibility or protective standard",
      "Practical pocket and tool storage layouts",
      "Comfort across a full working day",
      "Consistent supply for replacement garments",
    ],
    typicalProducts: ["workwear-and-uniforms", "outdoor-and-performance", "textile-accessories", "denim-and-woven-products"],
    relevantCapabilities: ["cut-and-sew-manufacturing", "material-sourcing", "laboratory-testing-coordination", "inspection", "embroidery"],
    complianceNotes: [
      "High visibility and protective clothing standards differ by market and application, and the applicable standard is confirmed on technical review.",
      "Where a protective claim is made, supporting test evidence is agreed before production.",
    ],
    faqIds: ["compliance", "inspection", "reorders"],
    seo: {
      title: "Industrial workwear manufacturing",
      description:
        "Durable industrial and construction workwear produced to your specified visibility or protective standard, confirmed on technical review.",
    },
  },
  {
    slug: "retail-and-wholesale",
    name: "Retail and wholesale",
    summary:
      "Retailers and distributors buying at volume, where packing accuracy and delivery reliability drive the relationship.",
    introduction: [
      "Retail and wholesale buyers judge a supplier on things that never appear in a product photograph: whether cartons are packed to the agreed assortment, whether barcodes scan, and whether the shipment arrives when it was scheduled.",
      "A carton with a mispacked assortment costs the retailer more in handling than the goods are worth, which is why packing audits and scan verification are treated as part of the product rather than as administration.",
    ],
    buyerPriorities: [
      "Retail ready packing and accurate ticketing",
      "Barcode accuracy verified before shipping",
      "Carton assortments packed exactly as ordered",
      "Consistent quality across large volumes",
      "Delivery scheduling that holds",
    ],
    typicalProducts: ["everyday-apparel", "streetwear", "home-textiles", "denim-and-woven-products", "textile-accessories"],
    relevantCapabilities: ["cut-and-sew-manufacturing", "hangtags-and-barcodes", "custom-packaging", "inspection", "logistics-and-export"],
    complianceNotes: [
      "Retailer specific packing and ticketing requirements are supplied in full before production begins.",
      "Labelling requirements for the destination market are confirmed with you.",
    ],
    faqIds: ["shipping-terms", "inspection", "quantity-scale"],
    seo: {
      title: "Manufacturing for retail and wholesale buyers",
      description:
        "Volume apparel production with retail ready packing, verified barcode ticketing and accurate carton assortments.",
    },
  },
  {
    slug: "promotional-products",
    name: "Promotional products",
    summary:
      "Agencies and distributors supplying branded apparel and accessories for events, campaigns and staff programmes.",
    introduction: [
      "Promotional buyers work to fixed dates and mixed briefs. An order might combine tee shirts, caps and tote bags for one campaign, all needing the same logo to look identical across three different fabrics.",
      "Decoration consistency across product types is the recurring technical challenge, and it is usually solved by choosing the decoration method per fabric rather than applying one method to everything.",
    ],
    buyerPriorities: [
      "Logo consistency across different products and fabrics",
      "Delivery aligned to a fixed event date",
      "Quantities that suit a campaign rather than a retail season",
      "Mixed product orders handled as one project",
      "Reliable ticketing and packing for distribution",
    ],
    typicalProducts: ["textile-accessories", "everyday-apparel", "workwear-and-uniforms", "specialist-sports-products"],
    relevantCapabilities: ["screen-printing", "embroidery", "dtf-printing", "patches-and-badges", "custom-packaging"],
    complianceNotes: [
      "Rights to use third party logos and artwork remain the responsibility of the ordering party.",
      "Where promotional goods are distributed publicly, applicable labelling requirements still apply.",
    ],
    faqIds: ["lead-time", "decoration-options", "minimum-order"],
    seo: {
      title: "Promotional apparel and accessories manufacturing",
      description:
        "Branded apparel and accessories for campaigns and events, with decoration matched per fabric for consistent logo reproduction.",
    },
  },
];

const industryIndex = new Map(industries.map((industry) => [industry.slug, industry]));

export function getIndustry(slug: string): Industry | undefined {
  return industryIndex.get(slug);
}

export function getIndustriesBySlugs(slugs: readonly string[]): Industry[] {
  return slugs
    .map((slug) => industryIndex.get(slug))
    .filter((industry): industry is Industry => industry !== undefined);
}

export function industrySlugs(): string[] {
  return industries.map((industry) => industry.slug);
}
