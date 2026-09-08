# GPT Image 2 master prompt

Paste-ready master prompt for generating the complete Textileways photography
library in one coherent batch. Built from the actual 35 media slots declared
in `content/fallback/media.ts` and indexed in
`content/configuration/image-manifest.ts`, not from an assumed or historical
count. If a media slot is later added, renamed or removed in that file, update
the manifest and this document together (a unit test, `tests/unit/image-manifest.test.ts`,
checks the manifest against the media declarations, but it cannot check this
document against either one, so that step is manual).

**Status: the first batch has been generated and reviewed. 27 of 35 images
passed the checklist below and are installed; 8 were rejected**, mostly for
readable fabricated label or logo text, and remain placeholders awaiting
regeneration. See `docs/IMAGE_MANIFEST.md` section 3 for exactly which and
why, and its section 5 for per-asset installed status.

**Truthfulness.** The images this prompt requests are temporary representative
campaign imagery, not documentary proof of Textileways' actual facility, staff,
machinery, customers, production capacity or certifications. `content/fallback/media.ts`
and every route that renders factory imagery carry a disclosure to that effect
once real files are installed (see `app/(marketing)/factory/page.tsx` and
`app/(marketing)/about/page.tsx`). Nothing generated from this prompt should be
captioned, labelled or described anywhere on the site as a verified photograph
of this specific business. All factual claims remain governed by
`content/configuration/company-facts.ts`, independent of what any image shows.

---

## How to use this document

1. Copy everything between the `BEGIN MASTER PROMPT` and `END MASTER PROMPT`
   markers below into GPT Image 2 as one request.
2. Request all 35 outputs in one batch if the interface allows it. If the
   interface limits how many images one request can return, split strictly at
   the numbered boundaries below (for example 01 to 12, 13 to 25, 26 to 35) and
   re-paste the full "Global art direction" and "Anti-artifact" sections with
   each partial batch, so continuity is not lost between calls.
3. Save each output using the **Proposed filename** given for its number.
4. Follow the installation steps in `docs/IMAGE_MANIFEST.md` to place each file
   at its **Repository destination** and flip its placeholder status.
5. Before installing anything, run it through the rejection checklist in
   `docs/IMAGE_MANIFEST.md` section 4.

---

## BEGIN MASTER PROMPT

Generate a complete, coherent set of 35 independent commercial photographs for
Textileways, a Pakistan based textile and apparel manufacturing partner
serving international brands, organisations, sourcing teams, importers,
distributors and bulk buyers, including buyers in the United States, the
European Union, the United Kingdom and Australia.

### 1. Global art direction, shared by every image in this batch

The images must look like genuine high end industrial and product photography
commissioned from an experienced commercial photographer, shot on a real
camera during a real assignment. They must not look like CGI, concept art,
3D render, illustration, stock photo composite or generative AI output.

Photography style, applied to every image:

- ultra-realistic commercial documentary photography
- natural colour science, accurate white balance
- full-frame camera realism, plausible 35 mm, 50 mm and 85 mm lenses depending
  on the shot
- realistic perspective, no fisheye or artificial wide-angle distortion
- moderate depth of field rather than extreme fake bokeh
- restrained contrast, retained highlight and shadow detail
- natural skin texture where people appear
- fine textile micro-detail: visible weave, knit structure, seams and thread
- subtle sensor grain, not a smooth denoised CGI surface
- no excessive clarity or HDR halo, no orange-and-teal grading, no neon glow,
  no synthetic cinematic fog, no dramatic lens flare or sun rays, no plastic
  looking skin, no glossy CGI machinery, no floating or impossible objects

Restrained product and environment palette across the whole set: white,
natural cotton, charcoal, black, forest or deep emerald, olive, navy, clay,
muted blue, with occasional controlled brighter athletic colour on a specific
garment where the product calls for it. Do not make every item green. Do not
let the palette read as neon or saturated.

### 2. Continuity specification

All 35 images must feel photographed during the same campaign, in the same
facility, under a consistent lighting approach, so that placed together on one
website they read as one coherent photography library rather than 35
unrelated stock images:

- the same general facility architecture, floor finish, wall colour and
  natural light quality recur across every factory scene
- the same restrained colour and lighting treatment applies to every product
  and editorial image
- where the same task or area could plausibly recur (for example a cutting
  table, a sewing line, a packing station), keep its physical layout and
  equipment consistent between images rather than redesigning it each time
- do not repeat the exact same worker's face across multiple images as if they
  were the same identifiable individual in different unrelated scenes, and do
  not repeat the exact same garment as if it were the exact same physical item
  in unrelated frames

### 3. Pakistani manufacturing authenticity

The environment is a credible, modern Pakistani textile and apparel factory:
clean, well managed, capable and export oriented, while physically believable
and lived in. Not a futuristic automated plant, sterile laboratory, luxury
fashion boutique, Silicon Valley office, empty warehouse fantasy, or an
impossibly enormous factory.

Include realistic combinations of: reinforced concrete or practical industrial
floors; painted masonry and metal framed production areas; broad cutting
tables; fabric rolls and fabric storage; industrial lockstitch, overlock and
coverstitch machines with realistic thread stands and thread paths; cutting
equipment; multi-head embroidery equipment; screen-printing or heat-transfer
working areas where the scene calls for it; steam pressing and finishing
equipment; inspection tables; measurement tools; shade and material
references; garment rails; folded production; polybags and export cartons;
practical task lighting and daylight; fire and safety equipment only where
naturally appropriate; uncluttered but genuinely operational workspaces. The
facility must not appear abandoned, unsafe, dirty, impossibly spotless or
artificially gigantic.

Show Pakistani workers and production professionals naturally and
respectfully wherever a person is called for. Use a realistic mix of men and
women where appropriate to the task. Clothing should be practical, modest and
consistent with a professional Pakistani industrial workplace. PPE only where
the task realistically requires it. Avoid tokenism, costume-like cultural
styling, fashion-model posing, exaggerated smiles, or groups staring at the
camera. People should normally be working: checking measurements, discussing
a physical sample, guiding fabric, operating equipment correctly, inspecting
seams, comparing colour or material references, trimming threads, checking
embroidery, packing finished production, reviewing a specification, verifying
cartons.

### 4. Human, machinery and textile realism

Hands must be anatomically correct: five fingers, plausible joints, a natural
grip on tools and fabric. Machines must have coherent working geometry: a
sewing machine's needle, presser foot, feed dog, thread path and bobbin area
must relate to each other the way a real machine's parts do. Fabric must pass
through machinery in a way that makes physical sense. Needles, presser feet,
thread paths, rollers, tables and tools must be mechanically plausible, not
decorative shapes standing in for real equipment.

Textiles must show convincing weave or knit structure, ribbing, seams,
topstitching, hems, drape, compression, folds and fabric weight appropriate to
the garment. Embroidery must show real thread build up and digitising
character, not a flat printed texture standing in for stitching. Print must
show ink or transfer texture bonded to the fabric surface, not a sticker
floating on top. Labels and tags must be present where realistic but carry no
readable invented text, no real brand name, and no logo.

### 5. Australian market relevance, without an Australian setting

The library must appeal to Australian buyers evaluating overseas suppliers
without pretending the factory is in Australia or that Textileways has any
Australian presence. Achieve this through: clean, straightforward commercial
presentation; products suited to Australian buyers, including quality tees,
heavyweight streetwear, activewear, club apparel, uniforms, hospitality
textiles, workwear, resort products and home textiles; accurate bulk
production cues; practical labelling and packing awareness; bright but neutral
natural light where the scene calls for it; practical, non-luxury, high
quality product styling; transparent manufacturing credibility. Where a
buyer-facing collaboration scene is called for elsewhere on the site, show a
credible sourcing or product professional in ordinary business casual
clothing collaborating with a Pakistani merchandiser or production specialist
over real samples, presented as a representative collaboration scene, never as
a testimonial or a claim of an actual customer relationship.

Do not use, anywhere in this batch: Australian flags; kangaroos or other
native Australian wildlife; the Sydney Opera House or any other Australian
landmark; beaches as a sourcing cliché; boomerangs; an Australian Made logo or
any certification mark; Aboriginal or Torres Strait Islander motifs; a
geographically Australian factory exterior; or any Australian office signage.

### 6. Strict anti-AI-artifact section

Reject and avoid, across every image in the batch:

- malformed or extra fingers, fused hands, hands with an implausible number of
  digits or joints
- machines with impossible or non-functional geometry, needles that do not
  meet the fabric, presser feet floating above or through the material
- duplicated workers who are clearly the same generated figure repeated in one
  frame
- duplicated or impossibly identical garments repeated in a way that reveals
  a tiling artifact
- warped, melting or physically impossible architecture, furniture or
  equipment
- garbled, misspelled or nonsensical text anywhere in frame, on any surface,
  label, screen, signage or document
- any real brand name, logo, trademark or recognisable corporate identity
- any watermark, stock photo agency mark, caption, timestamp or embedded
  border
- a montage, contact sheet, collage, grid of multiple scenes, or diptych
  presented as a single output
- glossy CGI machine surfaces, floating tools, or shadows that do not match
  the stated light source
- plastic or waxy skin texture, uncanny symmetrical faces, or a fashion
  editorial pose where a working pose was requested

### 7. Allowed natural imperfection

Do not over-correct into sterile perfection. Allow: minor fabric movement;
small variation between stacked garments rather than perfect machine-made
uniformity; believable wear on a working table surface; ordinary variation in
skin tone, height and build between different workers in different images;
realistic floor and surface reflections rather than a polished CGI mirror
finish; a workspace that looks used rather than staged for a single shot.

---

## Output manifest

35 independent images, numbered 01 to 35, grouped into four series: factory
(01 to 12), product families (13 to 25), editorial (26 to 32) and article
(33 to 35). Every entry below gives the exact scene, the destination in the
repository, the orientation and target size, the crop-safe zone every
downstream layout requires, and the objects that must and must not appear.
Generate every numbered entry as its own full image. Do not skip a number and
do not merge two numbers into one frame.

For every entry, in addition to the global direction above:

- **Orientation and size.** Use the closest GPT Image 2 supported size to the
  target given. Prefer at minimum landscape 2560 × 1707, portrait 2048 × 2560,
  or square 2048 × 2048, so the file supports the largest real rendered size on
  the site and can be cropped non-destructively afterward rather than
  upscaled.
- **Crop-safe zone.** The site renders every image at more than one aspect
  ratio through responsive `object-fit: cover` crops (see the rendered aspect
  list per entry). Keep the stated focal subject, and every face and hand in
  frame, inside the safe zone described, with genuine negative space beyond
  it. Nothing essential should sit within roughly 10 percent of any edge.
- **Format.** Deliver the highest quality format the interface supports for a
  photographic image: high quality JPEG with restrained compression if JPEG
  quality is selectable, otherwise PNG or WebP. Do not upscale a lower
  resolution output to reach the target size; regenerate at a larger size
  instead.

### Factory series

**01: Factory overview**
Proposed filename: `factory-hero.jpg` · Repository destination: `public/images/factory/hero.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[4/3]`).
Scene: a wide, elevated view of a working production floor during a normal
shift, several sewing lines visible in depth, natural daylight mixed with task
lighting, two or three workers visible at a believable working distance (not
posed for camera). Crop-safe zone: keep the main depth of the production floor
centered horizontally with even margin left and right; avoid a critical detail
sitting in the extreme top 10 percent (ceiling structure can be cropped there)
or extreme bottom 10 percent.
Must include: multiple sewing workstations in depth, visible thread paths,
natural and task lighting mixed, at least one worker mid-task.
Must not include: any Textileways signage, any readable brand name, an
impossibly vast or futuristic hall.

**02: Factory exterior**
Proposed filename: `factory-exterior.jpg` · Repository destination: `public/images/factory/exterior.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[4/3]`).
Scene: the exterior of a believable medium sized Pakistani export garment
facility in daylight, practical loading area, restrained architecture, one or
two legitimate covered loading points or delivery vehicles if the composition
allows. Crop-safe zone: building and loading area centered, generous sky and
ground margin so a 4:3 crop from a wider source never clips the entrance.
Must include: a plausible single or low-rise industrial building, a loading or
entrance area, daylight.
Must not include: any readable "Textileways" or other brand signage, a mega
campus scale that reads as impossible, crowds posed for the camera, an
Australian or non-Pakistani architectural style.

**03: Production floor, sewing lines**
Proposed filename: `factory-production-floor.jpg` · Repository destination: `public/images/factory/production-floor.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[4/3]`).
Scene: sewing lines photographed from a raised angle, showing line
organisation and workstation layout, several operators at their machines,
garment bundles staged between stations. Crop-safe zone: keep the organised
line structure centered, avoid placing a critical face in the outer 10
percent on any side.
Must include: multiple organised sewing workstations, visible bundle system,
natural posture at machines.
Must not include: empty or abandoned-looking stations, chaotic disorganised
piles reading as unsafe.

**04: Cutting room**
Proposed filename: `factory-cutting.jpg` · Repository destination: `public/images/factory/cutting.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[4/3]`).
Scene: a long cutting table with fabric spread and layered correctly, a
worker guiding a cutting tool or reviewing the marker layout, fabric layers
physically correct in thickness and drape. Crop-safe zone: table runs through
the centre of frame with margin above and below; keep hands well clear of the
frame edge.
Must include: spread and layered fabric, a cutting tool or shears, correct
hand position away from any blade edge.
Must not include: fingers unsafely close to a moving blade, a marker with
readable invented text.

**05: Sewing operator detail**
Proposed filename: `factory-sewing.jpg` · Repository destination: `public/images/factory/sewing.jpg`
Orientation: portrait, target 2048 × 2560 (rendered at `aspect-[4/3]`).
Scene: a close, portrait-oriented shot of hands and machine at a single
sewing operation, fabric feeding through correctly, focus sharp on the
needle and fabric interaction. Crop-safe zone: hands and needle area centred
in the middle third of the frame vertically, generous machine body visible
above and below for a square or landscape crop to still read correctly.
Must include: anatomically correct hands, a coherent thread path, fabric
under the presser foot.
Must not include: a face staring at the camera, any readable label text.

**06: Screen printing**
Proposed filename: `factory-printing.jpg` · Repository destination: `public/images/factory/printing.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[4/3]`).
Scene: a screen printing carousel mid run, one printed panel visible with
believable ink texture, an operator working the station. Show one production
stage clearly rather than several incompatible printing technologies in the
same frame. Crop-safe zone: carousel and printed panel centred, margin on all
sides.
Must include: a coherent screen printing carousel or flatbed setup, visible
ink on fabric, one operator.
Must not include: readable invented logos or text in the print, five
different printing technologies combined in one impossible machine.

**07: Embroidery**
Proposed filename: `factory-embroidery.jpg` · Repository destination: `public/images/factory/embroidery.jpg`
Orientation: square, target 2048 × 2048 (rendered at `aspect-[4/3]`).
Scene: a multi head embroidery machine in operation, correctly hooped fabric,
coherent thread cones and paths, fine thread detail readable at close range.
Crop-safe zone: hoop and needle area centred within the middle 70 percent of
the frame both axes.
Must include: correctly hooped fabric, multiple thread cones with plausible
paths, visible stitch build up.
Must not include: a legible invented logo being stitched, tangled or
physically impossible thread paths.

**08: Quality inspection**
Proposed filename: `factory-inspection.jpg` · Repository destination: `public/images/factory/inspection.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[4/3]`).
Scene: a quality professional measuring a finished garment against a
specification sheet or measurement chart on an inspection table under neutral
light, tape measure in correct use. Crop-safe zone: garment and hands centred,
document kept legible-blur only, not sharp readable text.
Must include: a tape measure in correct use, a garment on the table, a
document present but not sharply readable.
Must not include: any readable invented measurement data, pass or fail stamp,
or certificate.

**09: Packing and dispatch**
Proposed filename: `factory-packing.jpg` · Repository destination: `public/images/factory/packing.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[4/3]`).
Scene: folded garments being counted, polybagged and packed into export
cartons, a worker at the station, cartons partially sealed or staged nearby.
Crop-safe zone: packing station centred, carton labels present but not
sharply legible.
Must include: folded garments, polybags, export cartons, a worker at the
station.
Must not include: readable barcode data, a real shipping carrier's logo,
invented address text.

**10: Fabric store**
Proposed filename: `factory-fabric-store.jpg` · Repository destination: `public/images/factory/fabric-store.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[4/3]`).
Scene: rolls of fabric stored and organised in a material warehouse, visible
labelling on rolls without readable invented text, aisles of varied but
consistent colour rolls. Crop-safe zone: roll racking centred with margin top
and bottom for signage or ceiling to be cropped safely.
Must include: multiple fabric rolls, visible but unreadable roll tags,
organised storage.
Must not include: an impossibly vast warehouse, readable invented supplier
names on rolls.

**11: Testing equipment**
Proposed filename: `factory-laboratory.jpg` · Repository destination: `public/images/factory/laboratory.jpg`
Orientation: square, target 2048 × 2048 (rendered at `aspect-[4/3]`).
Scene: in house testing equipment such as a GSM cutter, a precision scale or a
shrinkage template, with a fabric sample being tested, no person required but
a hand may be present adjusting the equipment. Crop-safe zone: equipment
centred within the middle 70 percent of the frame.
Must include: a specific, coherent piece of testing equipment, a fabric
sample.
Must not include: an invented certificate, a readable pass or fail readout
with fabricated numbers, laboratory branding.

**12: Sample room**
Proposed filename: `factory-sampling.jpg` · Repository destination: `public/images/factory/sampling.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[4/3]`).
Scene: a sample room bench with pattern pieces, a partially assembled
development garment, and a tech pack open nearby, a merchandiser or sample
maker working at the bench. Crop-safe zone: bench centred, tech pack present
but not sharply readable.
Must include: pattern pieces, a development garment, a tech pack or
specification sheet present.
Must not include: readable invented technical data on the tech pack pages.

### Product family series

Every product entry: two to five coordinated, unbranded products, or one hero
product with useful construction detail, photographed against a controlled
surface consistent with the campaign's overall styling (sample-room bench,
garment rail, cutting table or neutral studio surface, varied between entries
but consistent in lighting and colour treatment with the rest of the batch).
No readable text, no fake labels, no logos. Enough negative space on all sides
for the responsive crops listed. Orientation: landscape, target 2560 × 1707
for every entry in this series unless noted. Rendered aspects across the site:
`aspect-[4/3]`, `aspect-[16/11]`, `aspect-[16/10]`; keep the product group
centred with roughly even margin on every side so all three crops stay safe.

**13: Everyday apparel**
Proposed filename: `products-everyday-apparel.jpg` · Repository destination: `public/images/products/everyday-apparel.jpg`
Scene: premium cotton tee shirts in three colourways on hangers or flat laid,
visible neck and shoulder seam construction and stitch quality.
Must not include: any visible brand mark or graphic print carrying readable
text.

**14: Streetwear**
Proposed filename: `products-streetwear.jpg` · Repository destination: `public/images/products/streetwear.jpg`
Scene: a heavyweight hoodie or boxy tee on a hanger or form, lit to show
fabric weight, rib construction at cuffs and hem, and print or embroidery
texture without readable content.

**15: Sportswear and activewear**
Proposed filename: `products-sportswear-and-activewear.jpg` · Repository destination: `public/images/products/sportswear-and-activewear.jpg`
Scene: a technical training top and shorts showing sublimated graphic panels
(abstract or geometric, no readable text or real team branding) and flatlock
seam construction.

**16: Outdoor and performance**
Proposed filename: `products-outdoor-and-performance.jpg` · Repository destination: `public/images/products/outdoor-and-performance.jpg`
Scene: a lightweight technical shell jacket showing seam taping, zips and
storm flap construction. Avoid implying a specific certified performance
rating.

**17: Workwear and uniforms**
Proposed filename: `products-workwear-and-uniforms.jpg` · Repository destination: `public/images/products/workwear-and-uniforms.jpg`
Scene: a coordinated uniform set, a polo shirt with an embroidered but
illegible placeholder logo shape and a work overshirt, styled together. Do not
imply certified protective performance.

**18: Underwear, sleepwear and loungewear**
Proposed filename: `products-underwear-sleepwear-loungewear.jpg` · Repository destination: `public/images/products/underwear-sleepwear-loungewear.jpg`
Scene: a tasteful, non-sexualised loungewear set flat laid, focused on seams,
elastic waistband construction and soft fabric drape.

**19: Children and baby**
Proposed filename: `products-children-and-baby.jpg` · Repository destination: `public/images/products/children-and-baby.jpg`
Scene: unbranded children's basics flat laid, no child models, showing snap
fastenings and label placement. Avoid small decorative parts that could read
as an unsafe choking hazard.

**20: Swim and resort**
Proposed filename: `products-swim-and-resort.jpg` · Repository destination: `public/images/products/swim-and-resort.jpg`
Scene: swim shorts and a resort shirt shown as flat lay or on a form, showing
print and trim detail. No model shot, no sexualised styling.

**21: Denim and woven products**
Proposed filename: `products-denim-and-woven-products.jpg` · Repository destination: `public/images/products/denim-and-woven-products.jpg`
Scene: denim jeans with close detail on wash variation, stitching and
hardware (rivets, buttons), styled with a woven overshirt.

**22: Modest and cultural apparel**
Proposed filename: `products-modest-and-cultural-apparel.jpg` · Repository destination: `public/images/products/modest-and-cultural-apparel.jpg`
Scene: contemporary modest garments on a hanger or form, respectful styling,
quality drape and detailed finishing, no costume stereotyping.

**23: Specialist sports products**
Proposed filename: `products-specialist-sports-products.jpg` · Repository destination: `public/images/products/specialist-sports-products.jpg`
Scene: a specialist sports textile item such as a padded guard, kit bag or
training aid, shown with construction detail visible. Do not invent a
technical performance claim.

**24: Home textiles**
Proposed filename: `products-home-textiles.jpg` · Repository destination: `public/images/products/home-textiles.jpg`
Scene: coordinated towels or table linen styled simply on a neutral ground,
visible weave structure and edge finishing.

**25: Textile accessories**
Proposed filename: `products-textile-accessories.jpg` · Repository destination: `public/images/products/textile-accessories.jpg`
Scene: a controlled grouping of caps, canvas totes and pouches, showing print
and stitch detail, styled together rather than as miscellaneous clutter.

### Editorial series

**26: Homepage hero (the most important image in the batch)**
Proposed filename: `editorial-home-hero.jpg` · Repository destination: `public/images/editorial/home-hero.jpg`
Orientation: portrait, target 2048 × 2560 (rendered at `aspect-[4/3]` on
mobile and the taller `aspect-[5/6]` on desktop: generate genuinely portrait
or near-square, not wide landscape, so both crops keep the subject safe).
Scene: a Pakistani production or merchandising specialist reviewing a
finished garment or physical sample, in an active factory or sample room, not
looking directly at the camera. This should be the single strongest, most
premium image in the library. Crop-safe zone: keep the person's face, hands
and the garment they are holding within the centre 60 percent of the frame
both horizontally and vertically, with clear negative space above the head
and below the hands so both the 4:3 and 5:6 crops keep everything essential
in frame.
Must include: one person, a physical garment or sample in hand, a real
working environment visible but slightly softer focus behind the subject.
Must not include: the person facing and staring at the camera, any readable
text, any logo.

**27: Scale, bundled production**
Proposed filename: `editorial-scale.jpg` · Repository destination: `public/images/editorial/scale.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at the wide
`aspect-[16/8]`).
Scene: bundled cut fabric panels staged before assembly, or stacked finished
garments, communicating production quantity without any graphic, chart or
number overlay. Crop-safe zone: the bundled stack centred in the middle band
of the frame, since this asset is cropped to a short wide strip.
Must include: a visibly substantial but believable stack or bundle of cut
panels or finished garments.
Must not include: an invented quantity displayed as text, an impossibly
enormous pile.

**28: Materials**
Proposed filename: `editorial-materials.jpg` · Repository destination: `public/images/editorial/materials.jpg`
Orientation: square, target 2048 × 2048 (rendered at `aspect-[4/3]` and the
wider `aspect-[16/8]`).
Scene: a fabric swatch stack or hanger set, shot close enough to read texture,
a hand optionally shown comparing two swatches. Crop-safe zone: swatches
occupy the centre band of the frame with even margin above and below, since
this asset is cropped to a short wide strip elsewhere on the site.
Must include: varied but coordinated fabric swatches, visible weave or knit
structure.
Must not include: a floating, impossible rainbow arrangement of swatches.

**29: Craft or process detail**
Proposed filename: `editorial-quality.jpg` · Repository destination: `public/images/editorial/quality.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[4/3]` and the
wider `aspect-[16/10]`).
Scene: a measuring tape across a garment on an inspection table, the
measurement chart visible but not sharply readable, a quality professional's
hands in frame. Crop-safe zone: garment and hands centred in the middle band
of the frame, generous margin top and bottom.
Must include: a tape measure in use, a garment, a chart or document present.
Must not include: readable invented measurement values.

**30: Sustainability**
Proposed filename: `editorial-sustainability.jpg` · Repository destination: `public/images/editorial/sustainability.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[4/3]`).
Scene: sorted fabric offcuts or segregated waste bins on the production floor,
communicating organised waste handling without a graphic overlay or invented
statistic. Crop-safe zone: sorted material centred, even margin on all sides.
Must include: visibly sorted or segregated material.
Must not include: any invented percentage, statistic or certification mark.

**31: Logistics and export**
Proposed filename: `editorial-logistics.jpg` · Repository destination: `public/images/editorial/logistics.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[4/3]` and the
wider `aspect-[16/8]`).
Scene: palletised and marked export cartons staged for collection at a
loading area. Crop-safe zone: cartons centred in the middle band, since this
asset is also cropped to a short wide strip elsewhere.
Must include: stacked, marked export cartons, a loading or staging area.
Must not include: a real shipping carrier's logo, a readable customs
document, an invented port or company name.

**32: Team, reviewing a specification**
Proposed filename: `editorial-team.jpg` · Repository destination: `public/images/editorial/team.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[4/3]`).
Scene: two or three Pakistani merchandising, production and quality
professionals in a natural working discussion over a tech pack or sample in a
factory meeting or sample room, not lined up facing the camera. Crop-safe
zone: the group centred with even margin, no face closer than 10 percent to
any edge.
Must include: two or three people genuinely engaged with a physical
document or sample.
Must not include: a corporate stock-photo handshake pose, a lineup facing the
camera, a boardroom that reads as a generic office rather than a
manufacturing business.

### Article series

Each article image supports both a very short, wide banner crop and a
standard thumbnail crop, so keep the subject in the vertical centre third of
the frame with nothing essential in the top or bottom 20 percent.

**33: Understanding minimum order quantity**
Proposed filename: `insights-understanding-moq.jpg` · Repository destination: `public/images/insights/understanding-moq.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[21/9]` and
`aspect-[16/10]`).
Scene: fabric rolls staged in the material store, illustrating the material
commitment behind committing to a production run.

**34: Choosing a decoration method**
Proposed filename: `insights-choosing-decoration.jpg` · Repository destination: `public/images/insights/choosing-decoration.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[21/9]` and
`aspect-[16/10]`).
Scene: print and embroidery samples laid side by side on the same fabric type
for direct comparison, no readable logos in either sample.

**35: Anatomy of a tech pack**
Proposed filename: `insights-tech-pack-anatomy.jpg` · Repository destination: `public/images/insights/tech-pack-anatomy.jpg`
Orientation: landscape, target 2560 × 1707 (rendered at `aspect-[21/9]` and
`aspect-[16/10]`).
Scene: printed tech pack pages open beside the development garment they
describe, on a work bench, pages visible but not sharply readable.

---

## Deliberately not included in this batch

**Australia sourcing collaboration** (an international buyer reviewing
samples with a Pakistani merchandiser) was drafted as a possible 36th image
during planning, but is not part of this manifest. None of the three existing
market pages (`/markets/usa`, `/markets/europe`, `/markets/uk`) carry a
dedicated market-specific photograph today, and `/markets/australia` follows
the same page template. Adding a unique image only for Australia would give
that market disproportionate visual weight relative to the other three,
which the brief this document was written against explicitly rules out. If a
future redesign adds imagery to the market pages, add it for all four markets
at once and extend this manifest accordingly, rather than starting with
Australia alone.

## Negative instructions, restated for the whole batch

Do not generate: fake certificates, audit documents or test reports; fake
customer or retailer logos; fake testimonials, purchase orders or shipping
documents with readable details; invented factory signage or addresses;
invented machine counts or employee counts; invented output or sustainability
figures; any certification logo; any identifiable real person; anything
implying Australian ownership, an Australian office, or existing Australian
clients; an Australian Made logo or kangaroo mark; any real brand name or
trademark anywhere in the batch.

## Final batch-completeness checklist

Before returning the batch, confirm:

- [ ] 35 independent image files are returned, one per numbered entry above
- [ ] every file is a single photograph, not a montage, contact sheet,
      collage, diptych or grid
- [ ] every proposed filename or an equivalent per-image identifier is
      preserved in the response metadata or accompanying file list, in the
      same order as this manifest
- [ ] no image contains a real brand name, logo, watermark, caption or
      embedded border
- [ ] no image contains an Australian flag, landmark, kangaroo or Australian
      Made mark
- [ ] the count of independent output files equals 35, matching the number of
      manifest entries in this document

Return every numbered scene as a separate, full-resolution image file in
manifest order. Do not combine scenes into a collage, contact sheet, grid,
diptych or montage. Preserve the exact image IDs and filenames in the response
metadata or accompanying file list. Confirm that the number of independent
output files matches the number of manifest entries.

## END MASTER PROMPT

---

## Reference images

The owner supplied these reference images for broad visual context only:

- https://www.genspark.ai/api/files/s/QeVpppmb
- https://www.genspark.ai/api/files/s/LG5OAljy
- https://www.genspark.ai/api/files/s/enKtvDDV
- https://www.genspark.ai/api/files/s/j2BSZvba
- https://www.genspark.ai/api/files/s/K48Qi0v8
- https://www.genspark.ai/api/files/s/DDmLM5WS
- https://www.genspark.ai/api/files/s/m0cuB3zr
- https://www.genspark.ai/api/files/s/ryuv1f3b

They were not fetched or inspected while writing this document (this session
had no tool access to external URLs at the time of writing). Before running
the batch, view them and use them for mood, lighting and composition
reference only. Do not clone their exact compositions, any identifiable
person, any logo, any specific product design, or any specific facility's
identity.

## Batch size note

The official GPT Image documentation confirms the Image API supports quality,
size and format options, and can return multiple images per request using
`n`. Setting `n` alone does not assign a different subject to each output:
the numbered manifest above is what has to drive subject assignment, whether
that means one request with 35 numbered scene instructions, or 35 separate
single-image requests each carrying its own numbered entry plus the shared
Global art direction, Continuity, Authenticity and Anti-artifact sections.
