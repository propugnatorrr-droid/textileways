import type { Material } from "@/content/types";

/**
 * Material reference entries.
 *
 * Values are written as typical ranges and general behaviour, never as
 * guaranteed properties of a specific fabric. Any figure a buyer will rely on
 * has to be confirmed against an approved physical swatch.
 */
export const materials: Material[] = [
  {
    slug: "cotton",
    name: "Cotton",
    group: "natural-fibers",
    summary:
      "The default fibre for everyday apparel. Comfortable, printable and available in a wide range of qualities.",
    introduction: [
      "Cotton covers an enormous range of qualities, from open ended yarn used in value tee shirts to combed ring spun and long staple yarns used in premium product. The word on its own tells you very little, which is why a specification should name the yarn type, the yarn count and the finished fabric weight rather than simply saying cotton.",
      "For most brands, cotton is the right starting point for tee shirts, hoodies, shirting and basic uniform items. It takes water based and plastisol printing well, embroiders predictably and is understood by buyers in every market we serve.",
    ],
    composition: "100 percent cotton, or cotton rich blends with elastane or polyester.",
    gsmGuidance:
      "Typically 120 to 220 gsm for jersey, 240 to 400 gsm for fleece and terry, and 100 to 200 gsm for woven shirting. The finished weight is confirmed on the approved sample.",
    handFeel:
      "Soft and dry. Combed and ring spun yarns give a smoother surface and less surface hair than carded open ended yarns.",
    stretch:
      "No mechanical stretch on its own. Elastane is added, usually between 3 and 8 percent, where recovery is required.",
    breathability: "High. Absorbs moisture rather than wicking it away from the skin.",
    applications: [
      "Tee shirts and long sleeve tops",
      "Hoodies and sweatshirts",
      "Shirting and casual woven tops",
      "Uniform polo shirts",
      "Children and baby apparel",
    ],
    printCompatibility:
      "Suits screen printing, DTG and DTF. Does not accept sublimation, which needs polyester rich fabric.",
    embroideryCompatibility:
      "Good. Stable enough for dense logos with appropriate backing. Lightweight jersey needs a cut away backing to avoid distortion.",
    washConsiderations:
      "Shrinkage has to be controlled through finishing and confirmed on the sample. Darker shades need wash testing for colour transfer before bulk production.",
    moqConsiderations:
      "Stock qualities in common colours support lower quantities. Custom dyed colours are set by the dye house batch size rather than by us.",
    certificationOptions: [
      "Organic cotton certification, subject to a certified supply chain and valid transaction certificates",
      "Fibre content and country of origin declarations for labelling",
    ],
    relatedProducts: ["everyday-apparel", "streetwear", "workwear-and-uniforms", "children-and-baby"],
    seo: {
      title: "Cotton fabric for apparel manufacturing",
      description:
        "Typical cotton qualities, weight ranges, decoration compatibility and sampling considerations for apparel manufactured by Textileways.",
    },
  },
  {
    slug: "organic-cotton",
    name: "Organic cotton",
    group: "recycled-and-lower-impact",
    summary:
      "Cotton grown to an organic standard. Only meaningful when the certification chain is intact and documented.",
    introduction: [
      "Organic cotton behaves much like conventional cotton in production. The difference that matters commercially is documentation: an organic claim on a garment label is only defensible when every step from fibre to finished product is held by certified operators and supported by transaction certificates.",
      "We treat organic cotton as a documented supply chain decision rather than a marketing choice. If the certification chain cannot be evidenced for your order, we say so rather than allowing an unsupported claim onto your label.",
    ],
    composition: "100 percent organic cotton, or blends where the organic content is stated as a percentage.",
    gsmGuidance:
      "Comparable to conventional cotton at the same construction. Typically 140 to 220 gsm jersey and 280 to 400 gsm fleece.",
    handFeel: "Similar to conventional cotton of equivalent yarn quality.",
    stretch: "No inherent stretch. Elastane blends are available where recovery is required.",
    breathability: "High, as with conventional cotton.",
    applications: [
      "Tee shirts for brands making a documented material claim",
      "Baby and children apparel",
      "Premium everyday basics",
    ],
    printCompatibility:
      "As conventional cotton. Where a low impact claim is being made, print chemistry should be selected to match the claim.",
    embroideryCompatibility: "Good, with the same backing considerations as conventional cotton.",
    washConsiderations: "As conventional cotton. Shrinkage confirmed on the approved sample.",
    moqConsiderations:
      "Certified fabric is usually held in fewer colours and qualities than conventional stock, so practical minimums are often higher.",
    certificationOptions: [
      "Recognised organic textile standards, subject to a valid certified chain and current transaction certificates",
    ],
    relatedProducts: ["everyday-apparel", "children-and-baby"],
    seo: {
      title: "Organic cotton for certified apparel programmes",
      description:
        "How organic cotton is specified, documented and sampled, and what certification evidence a defensible organic claim requires.",
    },
  },
  {
    slug: "polyester",
    name: "Polyester",
    group: "synthetic-and-performance",
    summary:
      "The base fibre for performance apparel. Holds colour, dries quickly and accepts sublimation printing.",
    introduction: [
      "Polyester is the working fibre of sportswear, teamwear and much technical outerwear. It holds dimensional stability, resists creasing, dries far faster than cotton and is the only common fibre that accepts sublimation printing, which is what makes all over team graphics possible.",
      "Quality varies widely with yarn type and finishing. Microfibre, textured and recycled yarns behave differently, and moisture management is a finishing decision rather than an automatic property of the fibre.",
    ],
    composition:
      "100 percent polyester, or blends with elastane, cotton or viscose depending on the requirement.",
    gsmGuidance:
      "Typically 100 to 180 gsm for performance jersey and mesh, and 180 to 300 gsm for heavier training and outerwear fabrics.",
    handFeel:
      "Ranges from crisp and technical to soft and brushed depending on yarn and finish. Peached and brushed finishes soften the surface considerably.",
    stretch:
      "Mechanical stretch from knit structure. Elastane between 5 and 20 percent is added where four way stretch and recovery are required.",
    breathability:
      "Depends on construction. Open knits and mesh breathe well. Moisture wicking is a finish that has to be specified, not assumed.",
    applications: [
      "Sportswear and training apparel",
      "Team kit and sublimated uniforms",
      "Outdoor and technical layers",
      "High visibility and industrial workwear shells",
    ],
    printCompatibility:
      "Suits sublimation and DTF. Screen printing needs low bleed inks on dyed polyester to prevent dye migration. DTG is not suitable without pretreatment and is generally avoided.",
    embroideryCompatibility:
      "Good on stable constructions. Lightweight performance knits need careful backing and reduced stitch density to avoid puckering.",
    washConsiderations:
      "Colour is generally stable. Dye migration into prints should be checked on the sample, particularly on dark grounds.",
    moqConsiderations:
      "Sublimated product can support lower minimums because artwork is applied per piece. Custom dyed polyester follows dye house batch minimums.",
    certificationOptions: [
      "Recycled content standards where recycled polyester is used and documented",
      "Restricted substance testing coordinated with an accredited laboratory on request",
    ],
    relatedProducts: ["sportswear-and-activewear", "outdoor-and-performance", "swim-and-resort", "specialist-sports-products"],
    seo: {
      title: "Polyester fabric for performance apparel",
      description:
        "Polyester weight ranges, stretch, breathability and decoration compatibility for sportswear, teamwear and technical apparel.",
    },
  },
  {
    slug: "recycled-polyester",
    name: "Recycled polyester",
    group: "recycled-and-lower-impact",
    summary:
      "Polyester produced from recycled feedstock. Performs comparably to virgin polyester when the quality is specified properly.",
    introduction: [
      "Recycled polyester is widely available and performs close to virgin polyester in most apparel applications. The commercial questions are consistency of supply, colour consistency between batches and whether the recycled content can be evidenced for the specific fabric used in your order.",
      "As with organic cotton, we treat the recycled claim as a documentation matter. A percentage on a hangtag needs a certified chain behind it.",
    ],
    composition:
      "Recycled polyester, commonly stated as a percentage of total fibre content, often blended with elastane.",
    gsmGuidance: "Comparable to virgin polyester at equivalent construction, typically 100 to 300 gsm.",
    handFeel: "Comparable to virgin polyester of the same yarn type and finish.",
    stretch: "As virgin polyester. Elastane added where recovery is required.",
    breathability: "As virgin polyester, determined by knit structure and finish.",
    applications: [
      "Sportswear for brands with a material policy",
      "Outdoor layers",
      "Bags and accessories",
    ],
    printCompatibility: "As virgin polyester. Sublimation and DTF are the usual routes.",
    embroideryCompatibility: "As virgin polyester.",
    washConsiderations:
      "Batch to batch colour consistency should be confirmed where a programme repeats over time.",
    moqConsiderations:
      "Certified recycled fabric is held in fewer qualities and colours, so minimums are usually higher than for conventional polyester.",
    certificationOptions: [
      "Recycled content standards, subject to a valid certified chain and current transaction certificates",
    ],
    relatedProducts: ["sportswear-and-activewear", "outdoor-and-performance", "textile-accessories"],
    seo: {
      title: "Recycled polyester for lower impact apparel",
      description:
        "Recycled polyester performance, weight ranges and the certification evidence required before a recycled content claim can be published.",
    },
  },
  {
    slug: "cotton-polyester-blend",
    name: "Cotton polyester blend",
    group: "knitted-fabrics",
    summary:
      "The workhorse blend for uniforms and heavy use apparel. Balances comfort against durability and shrinkage control.",
    introduction: [
      "Blending cotton with polyester trades some of the comfort of pure cotton for better dimensional stability, faster drying, lower shrinkage and longer service life. That trade is usually correct for uniforms, workwear and any garment that is laundered frequently.",
      "Common ratios run from 60 cotton 40 polyester through to 50 50 and 35 cotton 65 polyester. The ratio changes handfeel, print behaviour and price, so it should be a deliberate decision rather than a default.",
    ],
    composition:
      "Cotton and polyester in stated ratios, sometimes with a small elastane content for comfort stretch.",
    gsmGuidance:
      "Typically 150 to 220 gsm for pique and jersey, and 260 to 340 gsm for fleece used in uniform programmes.",
    handFeel: "Smoother and more stable than pure cotton. Higher polyester content feels drier and crisper.",
    stretch: "Limited without elastane. Two to five percent elastane gives comfort stretch for fitted uniform shapes.",
    breathability: "Moderate. Lower than pure cotton, higher than pure polyester at equivalent weight.",
    applications: [
      "Corporate and hospitality polo shirts",
      "Healthcare scrubs",
      "School uniform items",
      "Industrial workwear",
    ],
    printCompatibility:
      "Suits screen printing with low bleed inks, and DTF. DTG results are less consistent than on pure cotton.",
    embroideryCompatibility: "Very good. Stable base for dense corporate logos.",
    washConsiderations:
      "Lower shrinkage than pure cotton and better colour retention through industrial laundering. Confirm behaviour on the sample when the end user launders at high temperature.",
    moqConsiderations:
      "Widely stocked in standard uniform colours, which supports lower quantities than custom dyed fabric.",
    certificationOptions: [
      "Restricted substance testing coordinated on request",
      "Fibre content declarations for labelling",
    ],
    relatedProducts: ["workwear-and-uniforms", "everyday-apparel"],
    seo: {
      title: "Cotton polyester blends for uniforms and workwear",
      description:
        "Blend ratios, weight ranges, laundering behaviour and decoration compatibility for cotton polyester uniform fabrics.",
    },
  },
  {
    slug: "french-terry",
    name: "French terry",
    group: "knitted-fabrics",
    summary:
      "Looped back knit used for sweatshirts and mid weight streetwear. Structured without the bulk of brushed fleece.",
    introduction: [
      "French terry has a smooth face and an unbrushed looped back. It gives a sweatshirt structure and drape without the warmth and surface fuzz of brushed fleece, which is why it dominates mid weight streetwear and transitional layers.",
      "Weight is the main specification decision. Light terry drapes and suits fashion silhouettes, heavy terry holds a boxy shape and suits premium streetwear where the garment is expected to stand away from the body.",
    ],
    composition:
      "Commonly 100 percent cotton or cotton rich blends with polyester, sometimes with a small elastane content.",
    gsmGuidance:
      "Typically 240 to 400 gsm. Below 260 gsm the fabric drapes; above 340 gsm it holds structure.",
    handFeel: "Smooth face, textured looped reverse. Heavier weights feel dense and substantial.",
    stretch: "Moderate width stretch from the knit structure. Limited recovery without elastane.",
    breathability: "Good for a mid weight knit. More breathable than brushed fleece at the same weight.",
    applications: [
      "Crew neck sweatshirts",
      "Hoodies",
      "Sweat shorts and joggers",
      "Premium streetwear sets",
    ],
    printCompatibility:
      "Suits screen printing, DTF and puff or high density print effects. DTG works on cotton rich qualities.",
    embroideryCompatibility:
      "Very good, including chenille and applique work, provided backing suits the garment weight.",
    washConsiderations:
      "Heavier terry can relax in length after washing. Garment washing is often specified to stabilise the fabric and set the intended handfeel.",
    moqConsiderations:
      "Stock qualities support lower quantities. Custom weights and custom dyed colours raise the practical minimum.",
    certificationOptions: ["Organic or recycled content options subject to a certified supply chain"],
    relatedProducts: ["streetwear", "everyday-apparel", "underwear-sleepwear-loungewear"],
    seo: {
      title: "French terry fabric for sweatshirts and streetwear",
      description:
        "French terry weight ranges, structure, decoration compatibility and garment wash considerations for streetwear manufacturing.",
    },
  },
  {
    slug: "brushed-fleece",
    name: "Brushed fleece",
    group: "knitted-fabrics",
    summary:
      "Terry with a brushed reverse. Warmer and softer than french terry, with a fuller, heavier hand.",
    introduction: [
      "Brushed fleece is looped back knit with the reverse mechanically brushed to raise a soft pile. It traps air, which makes it warmer than french terry at the same nominal weight, and it is the standard choice for winter hoodies and heavier sweat product.",
      "The brushing process itself affects the finished weight and the surface, so two fabrics quoted at the same gsm can feel noticeably different. This is one of the cases where a physical swatch matters more than the number on the specification.",
    ],
    composition: "Cotton, cotton polyester blends, or polyester rich constructions for performance fleece.",
    gsmGuidance: "Typically 280 to 450 gsm. Premium heavyweight hoodies commonly sit between 380 and 450 gsm.",
    handFeel: "Soft brushed reverse with a smooth face. Substantial and warm.",
    stretch: "Moderate width stretch. Ribbed trims are used at cuffs and hem to control recovery.",
    breathability: "Lower than french terry. Designed to retain warmth.",
    applications: [
      "Winter hoodies and zip through jackets",
      "Heavyweight streetwear",
      "Loungewear sets",
      "School and club leisurewear",
    ],
    printCompatibility:
      "Screen printing and DTF work well. The raised pile needs consideration for fine detail, and a smoothing screen or heat setting step is often specified.",
    embroideryCompatibility:
      "Very good. The pile can swallow fine detail, so stitch density and a topping are specified for small lettering.",
    washConsiderations:
      "Pilling resistance varies with yarn quality and should be checked on the sample where the garment is expected to last several seasons.",
    moqConsiderations:
      "Widely stocked in core colours. Custom weights and colours follow mill and dye house minimums.",
    certificationOptions: ["Organic or recycled content options subject to a certified supply chain"],
    relatedProducts: ["streetwear", "everyday-apparel", "underwear-sleepwear-loungewear"],
    seo: {
      title: "Brushed fleece for hoodies and heavyweight knitwear",
      description:
        "Brushed fleece weights, warmth, pile behaviour and decoration considerations for hoodies and heavyweight sweat product.",
    },
  },
  {
    slug: "pique",
    name: "Pique",
    group: "knitted-fabrics",
    summary:
      "Textured knit used for polo shirts. Holds shape through repeated laundering, which is why uniforms rely on it.",
    introduction: [
      "Pique is a knit with a raised, textured surface produced by the knit structure rather than by finishing. The texture gives the fabric body, helps it resist creasing and keeps a polo collar looking presentable after laundering.",
      "It is the default polo shirt fabric across corporate, hospitality, education and sports uniform programmes for exactly that reason. Fibre choice then determines whether the emphasis is comfort, durability or moisture management.",
    ],
    composition:
      "Cotton, cotton polyester blends, or polyester for performance polos. Elastane added for fitted shapes.",
    gsmGuidance: "Typically 170 to 240 gsm. Uniform programmes commonly specify 200 to 220 gsm.",
    handFeel: "Textured and dry with visible surface structure. More substantial than plain jersey.",
    stretch: "Limited without elastane. Two to five percent elastane is common for fitted uniform polos.",
    breathability: "Good. The textured structure creates air channels across the surface.",
    applications: [
      "Corporate and hospitality polo shirts",
      "School polo shirts",
      "Golf and club polos",
      "Retail branded polos",
    ],
    printCompatibility:
      "Screen printing on the textured surface loses fine detail. Embroidery or a woven badge is usually preferred for logos on pique.",
    embroideryCompatibility: "Excellent. The standard decoration method for pique polo shirts.",
    washConsiderations:
      "Collar and placket stability through industrial laundering should be confirmed where garments are laundered commercially.",
    moqConsiderations: "Widely stocked in uniform colours, which supports lower quantities.",
    certificationOptions: ["Restricted substance testing coordinated on request"],
    relatedProducts: ["workwear-and-uniforms", "everyday-apparel"],
    seo: {
      title: "Pique fabric for polo shirts and uniforms",
      description:
        "Pique construction, weight ranges, laundering stability and the decoration methods that suit a textured polo surface.",
    },
  },
  {
    slug: "denim",
    name: "Denim",
    group: "woven-fabrics",
    summary:
      "Twill woven cotton. Character comes from the weave, the yarn and the wash rather than from the base fabric alone.",
    introduction: [
      "Denim is a warp faced cotton twill. Its appearance is defined as much by finishing as by the greige fabric: the same base can read as raw and rigid or soft and faded depending entirely on the wash recipe applied afterwards.",
      "Because of that, a denim specification has to lock the wash as tightly as it locks the fabric. A wash standard garment, approved and retained by both parties, is the reference that keeps a repeat order looking like the first one.",
    ],
    composition:
      "100 percent cotton, or cotton with one to three percent elastane for comfort stretch. Polyester is sometimes added for recovery.",
    gsmGuidance:
      "Commonly expressed in ounces per square yard. Typically 8 to 10 oz for shirts and light jeans, 11 to 14 oz for standard jeans, and above 14 oz for heavyweight product.",
    handFeel: "Rigid when raw, softening progressively with washing and wear.",
    stretch: "None when pure cotton. Elastane content gives comfort stretch and recovery in fitted shapes.",
    breathability: "Good for a heavy woven cotton, decreasing as weight increases.",
    applications: [
      "Jeans and denim shorts",
      "Denim jackets and overshirts",
      "Denim shirting",
      "Workwear in heavier weights",
    ],
    printCompatibility:
      "Screen printing and DTF are possible but uncommon on heavy indigo. Most branding is achieved through patches, embroidery and hardware.",
    embroideryCompatibility: "Very good, including chain stitch detailing on lighter weights.",
    washConsiderations:
      "The wash recipe determines the final appearance, shade and handfeel. A signed wash standard should be retained by both parties for every repeat order.",
    moqConsiderations:
      "Wash recipes are developed per style, which raises the practical minimum compared with undyed knitwear.",
    certificationOptions: ["Restricted substance testing coordinated on request"],
    relatedProducts: ["denim-and-woven-products", "workwear-and-uniforms"],
    seo: {
      title: "Denim fabric and wash development",
      description:
        "Denim weights, stretch options, wash development and the approval discipline that keeps repeat denim orders consistent.",
    },
  },
  {
    slug: "poplin",
    name: "Poplin",
    group: "woven-fabrics",
    summary:
      "Fine plain weave shirting. Smooth, crisp and the default for formal and corporate shirts.",
    introduction: [
      "Poplin is a tightly woven plain weave with a smooth surface and a crisp hand. It presses cleanly, which is why it dominates formal shirting and corporate uniform shirts.",
      "Yarn count drives the quality perception. Higher counts produce a finer, lighter and smoother fabric at higher cost; lower counts are more robust and better suited to heavy laundering.",
    ],
    composition:
      "Cotton, cotton polyester blends for easy care shirting, sometimes with a small elastane content.",
    gsmGuidance: "Typically 100 to 140 gsm for shirting weight poplin.",
    handFeel: "Smooth, crisp and flat. Little surface texture.",
    stretch: "None without elastane. One to three percent elastane is used for fitted shirts.",
    breathability: "Good in pure cotton. Reduced as polyester content rises.",
    applications: [
      "Corporate and hospitality shirts",
      "Formal shirting",
      "Lightweight shirt dresses and blouses",
      "Modest apparel outer layers",
    ],
    printCompatibility:
      "Suits screen printing and DTF on cotton rich qualities. Fine detail reproduces well on the flat surface.",
    embroideryCompatibility:
      "Good with appropriate backing. Lightweight poplin needs care to avoid puckering around dense logos.",
    washConsiderations:
      "Easy care and wrinkle resistant finishes are available and should be specified where the end user expects minimal ironing.",
    moqConsiderations:
      "Stock shirting colours support lower quantities. Yarn dyed patterns such as stripes and checks carry higher minimums because the pattern is set at the loom.",
    certificationOptions: ["Restricted substance testing coordinated on request"],
    relatedProducts: ["denim-and-woven-products", "workwear-and-uniforms", "modest-and-cultural-apparel"],
    seo: {
      title: "Poplin shirting fabric for corporate and formal shirts",
      description:
        "Poplin weight ranges, yarn count considerations, easy care finishes and decoration compatibility for shirting programmes.",
    },
  },
  {
    slug: "canvas",
    name: "Cotton canvas",
    group: "woven-fabrics",
    summary:
      "Heavy plain weave cotton. Structural, hard wearing and the base for bags, aprons and durable workwear.",
    introduction: [
      "Canvas is a heavy, densely woven cotton with high tear and abrasion resistance. It holds a shape rather than draping, which makes it the right base for structured accessories and for garments that have to survive an industrial environment.",
      "Weight and finish do most of the work. Waxed, coated and water repellent finishes are available where the end use requires them, and each one changes how the fabric can be printed and sewn.",
    ],
    composition: "100 percent cotton, or cotton polyester blends for improved dimensional stability.",
    gsmGuidance: "Typically 250 to 500 gsm depending on end use. Tote bags commonly sit between 280 and 400 gsm.",
    handFeel: "Firm, dense and structural. Softens with use rather than with drape.",
    stretch: "None.",
    breathability: "Low relative to lighter cotton fabrics, further reduced by coatings.",
    applications: [
      "Tote bags and shoppers",
      "Aprons",
      "Work jackets and utility trousers",
      "Structured accessories and pouches",
    ],
    printCompatibility:
      "Screen printing is the usual method and reproduces well on the flat surface. DTF is available for detailed artwork.",
    embroideryCompatibility: "Very good. The weight supports dense stitching without distortion.",
    washConsiderations:
      "Shrinkage on first wash is significant unless the fabric is preshrunk. This should be confirmed on the sample when the item is expected to be laundered.",
    moqConsiderations:
      "Natural and core colours are widely stocked. Custom dyed canvas follows dye house minimums.",
    certificationOptions: ["Organic cotton canvas subject to a certified supply chain"],
    relatedProducts: ["textile-accessories", "workwear-and-uniforms", "home-textiles"],
    seo: {
      title: "Cotton canvas for bags, aprons and durable workwear",
      description:
        "Canvas weight ranges, finishes, shrinkage behaviour and decoration compatibility for accessories and hard wearing garments.",
    },
  },
  {
    slug: "elastane-blends",
    name: "Elastane blends",
    group: "synthetic-and-performance",
    summary:
      "Small elastane content added to a base fibre to provide stretch and recovery. The percentage changes the garment considerably.",
    introduction: [
      "Elastane is almost never used alone. It is blended in small percentages with cotton, polyester or nylon to add stretch and, more importantly, recovery: the ability to return to shape rather than bagging out at the knee or elbow.",
      "The percentage is a design decision. Two to three percent gives comfort stretch in shirting and uniform polos. Twelve to twenty percent gives the compression and four way stretch expected in performance and swim product.",
    ],
    composition:
      "Elastane blended with cotton, polyester or nylon. Percentage stated in the specification and on the care label.",
    gsmGuidance:
      "Determined by the base fabric rather than by the elastane content. Performance knits commonly sit between 180 and 280 gsm.",
    handFeel: "Determined by the base fibre. Higher elastane content feels firmer and more compressive.",
    stretch:
      "Two to five percent gives comfort stretch. Eight to twelve percent gives four way stretch. Above twelve percent gives compression.",
    breathability: "Determined by the base fibre and knit structure.",
    applications: [
      "Leggings and performance base layers",
      "Swimwear",
      "Fitted uniform shirts and polos",
      "Seamless and compression product",
    ],
    printCompatibility:
      "Prints must stretch with the fabric. Sublimation on polyester elastane is the most reliable route; rigid plastisol prints crack on high stretch fabric and are avoided.",
    embroideryCompatibility:
      "Limited. Embroidery restricts stretch locally and can distort the fabric. Heat applied branding is usually preferred on high stretch garments.",
    washConsiderations:
      "Elastane degrades with high heat and with chlorine. Care instructions have to reflect that, particularly for swimwear.",
    moqConsiderations:
      "Performance fabrics are held in fewer colours than basic knitwear, so custom colours often set the minimum.",
    certificationOptions: [
      "Restricted substance testing coordinated on request",
      "Recycled content options where a recycled base fibre is used and documented",
    ],
    relatedProducts: ["sportswear-and-activewear", "swim-and-resort", "underwear-sleepwear-loungewear"],
    seo: {
      title: "Elastane blends for stretch and performance apparel",
      description:
        "How elastane percentage changes stretch, recovery and decoration options across performance, swim and fitted uniform apparel.",
    },
  },
  {
    slug: "nylon",
    name: "Nylon",
    group: "synthetic-and-performance",
    summary:
      "Strong, abrasion resistant synthetic used for outerwear shells, swimwear and technical accessories.",
    introduction: [
      "Nylon offers higher tensile and abrasion resistance than polyester at comparable weight, which makes it the usual choice for outerwear shells, pack fabrics and swimwear where durability matters more than cost.",
      "It takes coatings and laminates well, so water repellent and waterproof constructions are normally built on a nylon base. Those finishes have a service life and should be described accurately rather than sold as permanent.",
    ],
    composition: "Nylon, commonly blended with elastane for swim and stretch woven applications.",
    gsmGuidance: "Typically 40 to 120 gsm for shell fabrics and linings, and 150 to 220 gsm for swim knits.",
    handFeel: "Smooth and slick, often with a slight sheen. Lighter constructions can feel papery.",
    stretch: "None alone in woven form. Elastane blends provide four way stretch in swim and technical knits.",
    breathability:
      "Low in coated constructions. Breathable membranes and laminates are specified where moisture vapour transfer is required.",
    applications: [
      "Lightweight outerwear shells and windbreakers",
      "Swimwear",
      "Bags and technical accessories",
      "Linings",
    ],
    printCompatibility:
      "Sublimation works on some nylon qualities but is less predictable than on polyester. Heat transfer and DTF are the usual routes, with adhesion tested on the sample.",
    embroideryCompatibility:
      "Possible but it perforates coated and waterproof fabrics. Where waterproofing matters, heat applied branding is specified instead.",
    washConsiderations:
      "Water repellent finishes lose effectiveness over time and can often be revived with heat. Care instructions should say so honestly.",
    moqConsiderations:
      "Technical shell fabrics carry higher minimums than commodity knitwear, particularly in custom colours.",
    certificationOptions: [
      "Restricted substance testing coordinated on request",
      "Recycled nylon options subject to a certified supply chain",
    ],
    relatedProducts: ["outdoor-and-performance", "swim-and-resort", "textile-accessories"],
    seo: {
      title: "Nylon fabric for outerwear, swim and technical accessories",
      description:
        "Nylon weight ranges, coatings, stretch options and the decoration methods that suit coated and technical fabrics.",
    },
  },
];

const materialIndex = new Map(materials.map((material) => [material.slug, material]));

export function getMaterial(slug: string): Material | undefined {
  return materialIndex.get(slug);
}

export function getMaterialsBySlugs(slugs: readonly string[]): Material[] {
  return slugs
    .map((slug) => materialIndex.get(slug))
    .filter((material): material is Material => material !== undefined);
}

export function materialSlugs(): string[] {
  return materials.map((material) => material.slug);
}
