# GPT Image 2 master prompt, batch 2: banners

Paste-ready master prompt for the second photography batch: banner images for
every page that had none. Built from the 28 media slots added to
`content/fallback/media.ts` on 2026-09-10 and indexed as entries 36 to 63 in
`content/configuration/image-manifest.ts`. This document is self-contained;
you do not need `docs/GPT_IMAGE_2_MASTER_PROMPT.md` open alongside it to use
it, though the two batches must look like they were shot on the same
assignment (see Continuity, below).

**Why this batch exists.** The original 35 images covered the factory,
process, product families, homepage and articles. Every other page on the
site (the Capabilities, Materials, Industries and Markets hubs, all 30
capability pages, all 13 material pages, all 10 industry pages and all 4
market pages) had no photograph at all, or in the case of the Markets hub and
the four market pages, reused one generic logistics photo regardless of
destination. That reads as unfinished and text heavy. This batch is the fix.

**Truthfulness.** Exactly the same rules as the first batch apply. These are
temporary representative campaign images, not documentary proof of
TextileWays' actual facility, staff, machinery, customers, certifications or
of any real institution (hospital, hotel, school, sports club) referenced by
an industry page. Nothing generated from this prompt should be captioned,
labelled or described anywhere on the site as a verified photograph of a
specific business, institution or customer relationship. All factual claims
remain governed by `content/configuration/company-facts.ts`, independent of
what any image shows.

---

## How to use this document

1. Copy everything between `BEGIN MASTER PROMPT` and `END MASTER PROMPT`
   into GPT Image 2 as one request.
2. Request all 28 outputs in one batch if the interface allows it. If the
   interface limits how many images one request can return, split at the
   section boundaries below (Hubs 36 to 38, Capability groups 39 to 44,
   Material groups 45 to 49, Industries 50 to 59, Markets 60 to 63) and
   re-paste the full "Global art direction" through "Anti-artifact" sections
   with each partial batch.
3. Save each output using the **Proposed filename** given for its number.
4. Place each file at its **Repository destination**, then in
   `content/fallback/media.ts` change that entry from `placeholder({...})` to
   `photo({...})` (drop the `brief` field, add `caption`), matching how the
   first batch was installed. Update
   `content/configuration/image-manifest.ts` if anything about the shot
   changed from what is specified here.
5. Before installing anything, run it through the rejection checklist in
   `docs/IMAGE_MANIFEST.md` section 4, plus the two extra checks in section
   6 of this document that are specific to this batch (industries and
   markets).

---

## BEGIN MASTER PROMPT

Generate a complete, coherent set of 28 independent commercial photographs
for TextileWays, a Pakistan based textile and apparel manufacturing partner
serving international brands, organisations, sourcing teams, importers,
distributors and bulk buyers, including buyers in the United States, the
European Union, the United Kingdom and Australia. This is the second batch
in an ongoing photography library; every image must look like it was shot
during the same assignment as an existing, already published set of factory,
process and product photographs; see Continuity, below.

### 1. Global art direction, shared by every image in this batch

The images must look like genuine high end industrial and product
photography commissioned from an experienced commercial photographer, shot
on a real camera during a real assignment. They must not look like CGI,
concept art, 3D render, illustration, stock photo composite or generative AI
output.

Photography style, applied to every image:

- ultra-realistic commercial documentary photography
- natural colour science, accurate white balance
- full-frame camera realism, plausible 35 mm, 50 mm and 85 mm lenses
  depending on the shot; macro detail where a swatch or fibre entry calls
  for it
- realistic perspective, no fisheye or artificial wide-angle distortion
- moderate depth of field rather than extreme fake bokeh
- restrained contrast, retained highlight and shadow detail
- natural skin texture where hands or people appear
- fine textile micro-detail: visible weave, knit structure, seams and thread
- subtle sensor grain, not a smooth denoised CGI surface
- no excessive clarity or HDR halo, no orange-and-teal grading, no neon
  glow, no synthetic cinematic fog, no dramatic lens flare or sun rays, no
  plastic looking skin, no glossy CGI machinery, no floating or impossible
  objects

Restrained product and environment palette across the whole set: white,
natural cotton, charcoal, black, forest or deep emerald, olive, navy, clay,
muted blue, with occasional controlled brighter colour on a specific garment
where the product calls for it. Do not make every item green. Do not let the
palette read as neon or saturated.

### 2. Continuity with the existing library

This batch has to sit beside 35 already published images without looking
like a different shoot. Match:

- the same general facility architecture, floor finish, wall colour and
  natural light quality used in the existing factory and process photographs
  (painted masonry or concrete, practical task lighting, genuinely
  operational, not sterile or staged)
- the same restrained colour and lighting treatment used in the existing
  product and editorial images
- the same flat lay and product styling conventions already established:
  simple neutral grounds, blank labels, no invented logos, garments shown
  for their construction rather than staged as a lifestyle scene
- where a capability group image logically overlaps an existing factory
  photograph's subject (for example manufacturing, decoration, or
  assurance), make it a different angle, distance or moment, not a
  duplicate of an existing shot; the specific instruction per entry below
  says what to change

### 3. Pakistani manufacturing authenticity

Wherever a working environment is called for, it is a credible, modern
Pakistani textile and apparel factory: clean, well managed, capable and
export oriented, while physically believable and lived in. Not a futuristic
automated plant, sterile laboratory, luxury fashion boutique, Silicon Valley
office, empty warehouse fantasy, or an impossibly enormous factory.

Where a person appears, show Pakistani production professionals naturally
and respectfully. Use a realistic mix of men and women where appropriate to
the task. Clothing should be practical, modest and consistent with a
professional Pakistani industrial workplace. PPE only where the task
realistically requires it. Avoid tokenism, costume-like cultural styling,
fashion-model posing, exaggerated smiles, or groups staring at the camera.
People should be working: checking a pattern, guiding fabric, operating
equipment correctly, comparing a colour reference, sealing a carton,
reviewing a checklist.

### 4. Human, machinery and textile realism

Hands must be anatomically correct: five fingers, plausible joints, a
natural grip on tools and fabric. Machines must have coherent working
geometry: a sewing machine's needle, presser foot, feed dog, thread path and
bobbin area must relate to each other the way a real machine's parts do. A
heat press, steam iron or finishing press must close and vent the way a real
one does. Fabric must pass through or across machinery in a way that makes
physical sense.

Textiles must show convincing weave or knit structure, ribbing, seams,
topstitching, hems, drape, compression, folds and fabric weight appropriate
to the garment. Yarn cones must show a plausible wind pattern. Labels and
tags must be present where realistic but carry no readable invented text, no
real brand name, and no logo; a neck label or care label shown at all must
be blank or turned away from camera.

### 5. Products, not institutions (industry entries specifically)

Ten entries in this batch represent buyer industries: fashion brands,
streetwear brands, sports clubs, corporate uniform programmes, hospitality,
healthcare, education, construction and industrial, retail and wholesale,
and promotional products. Every one of these must be photographed as a
**product**, styled in the same factory or studio context as the rest of the
library. None of them shows the buyer's own institution. Do not generate a
hospital, a hotel lobby, a classroom, a construction site, a stadium or a
retail shopfront. Show the folded or hung garment relevant to that industry,
nothing else implies the setting.

### 6. Australian market relevance, without an Australian setting

One market entry (60 to 63) is for Australia specifically. The library must
appeal to Australian buyers evaluating overseas suppliers without pretending
the factory is in Australia or that TextileWays has any Australian
presence, office or existing customer there. Do not use, anywhere in this
batch: Australian flags; kangaroos or other native Australian wildlife; the
Sydney Opera House or any other Australian landmark; beaches as a sourcing
cliché; boomerangs; an Australian Made logo or any certification mark;
Aboriginal or Torres Strait Islander motifs; a geographically Australian
location; or any Australian office signage. The Australia entry's specific
instruction below (packing without solid wood material) is the only market
signal it should carry, because it reflects a real logistics fact
(biosecurity import requirements), not a cultural or geographic one.

### 7. Strict anti-AI-artifact section

Reject and avoid, across every image in the batch:

- malformed or extra fingers, fused hands, hands with an implausible number
  of digits or joints
- machines or presses with impossible or non-functional geometry
- duplicated garments repeated in a way that reveals a tiling artifact
- warped, melting or physically impossible tools, furniture or equipment
- garbled, misspelled or nonsensical text anywhere in frame, on any surface,
  label, swing tag, document or clipboard page
- any real brand name, logo, trademark, sports club crest, school crest or
  recognisable corporate identity
- any watermark, stock photo agency mark, caption, timestamp or embedded
  border
- a montage, contact sheet, collage, grid of multiple scenes, or diptych
  presented as a single output
- glossy CGI surfaces, floating objects, or shadows that do not match the
  stated light source
- plastic or waxy skin texture, uncanny symmetrical faces, or a fashion
  editorial pose where a working pose was requested

### 8. Allowed natural imperfection

Do not over-correct into sterile perfection. Allow: minor fabric movement;
small variation between stacked garments rather than perfect machine-made
uniformity; believable wear on a working surface; ordinary variation in
skin tone, height and build between different people in different images;
realistic surface reflections rather than a polished CGI mirror finish; a
workspace or desk that looks used rather than staged for a single shot.

---

## Output manifest

28 independent images, numbered 36 to 63, grouped into five series: hub
banners (36 to 38), capability group banners (39 to 44), material group
banners (45 to 49), industry banners (50 to 59) and market banners (60 to
63). Every entry gives the exact scene, the destination in the repository,
the orientation and target size, the crop-safe zone, and what must and must
not appear. Generate every numbered entry as its own full image. Do not skip
a number and do not merge two numbers into one frame.

For every entry, in addition to the global direction above:

- **Orientation and size.** Use the closest GPT Image 2 supported size to
  the target given. Prefer at minimum landscape 2560 × 1707 or square 2048 ×
  2048, so the file supports the largest real rendered size on the site and
  can be cropped non-destructively afterward rather than upscaled.
- **Crop-safe zone.** Every image on this site renders through responsive
  `object-fit: cover` crops (see the rendered aspect list per entry). Keep
  the stated focal subject inside the safe zone described, with genuine
  negative space beyond it. Nothing essential should sit within roughly 10
  percent of any edge.
- **Format.** Deliver the highest quality format the interface supports:
  high quality JPEG with restrained compression if selectable, otherwise
  PNG or WebP. Do not upscale a lower resolution output to reach the target
  size; regenerate at a larger size instead.

### Hub banners (36 to 38)

Rendered at `aspect-[4/3]` as the page header image on each hub.

**36: Products hub**
Proposed filename: `hubs-products.jpg` · Repository destination:
`public/images/hubs/products.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a wide shot grouping finished pieces from several different product
families on the same neutral ground: for example a folded hoodie, a polo
shirt, a stacked terry towel and a canvas tote, styled simply so the range
reads at a glance. No one family should dominate the frame. Crop-safe zone:
keep every grouped item within the centre 70 percent of the frame, generous
even margin on all sides.
Must include: at least four visually distinct product types, neutral
ground, soft even studio-style light consistent with the rest of the
library.
Must not include: any readable brand name or logo, any single item scaled
to dominate the others, a lifestyle or model shot.

**37: Capabilities hub**
Proposed filename: `hubs-capabilities.jpg` · Repository destination:
`public/images/hubs/capabilities.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a wide production floor composition where two or three distinct
processes are visible in one frame at once, for example a cutting table in
the foreground with sewing lines organised behind it, one or two workers
genuinely mid-task. Crop-safe zone: keep the layered depth centred, nothing
critical in the outer 10 percent.
Must include: at least two distinct visible processes, natural and task
lighting mixed, at least one person mid-task.
Must not include: any readable signage, an impossibly vast hall.

**38: Industries hub**
Proposed filename: `hubs-industries.jpg` · Repository destination:
`public/images/hubs/industries.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a flat lay grouping several different garment types that represent
different buyer industries side by side: for example a uniform polo shirt,
a piece of high visibility workwear, and a plain scrub top, all with blank
labelling, on a neutral studio ground. Crop-safe zone: keep every grouped
item within the centre 70 percent of the frame.
Must include: at least three visually distinct garment types representing
different use cases, all blank labelled.
Must not include: any real institution, uniform crest, hospital or school
setting, any readable brand or logo.

### Capability group banners (39 to 44)

Rendered at `aspect-[4/3]` as the page header image, shared across every
capability page in that group. See `content/types/index.ts` for the group
each of the 30 capabilities belongs to.

**39: Development and design group**
Proposed filename: `capability-groups-development.jpg` · Repository
destination: `public/images/capability-groups/development.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a design and pattern development bench: pattern paper, a tracing
wheel, a curved pattern ruler and a measuring tape, arranged as genuine
working tools, hands optionally visible marking a pattern piece. No
finished garment in frame; this is the stage before one exists. Crop-safe
zone: keep the bench and tools centred, even margin on all sides.
Must include: pattern paper, at least two pattern-making tools, a
believable work surface.
Must not include: a finished garment, any digital screen with readable
content, any sewing machine.

**40: Materials and sourcing group**
Proposed filename: `capability-groups-materials.jpg` · Repository
destination: `public/images/capability-groups/materials.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: several yarn cones in two or three different colours grouped beside
two or three rolled fabric samples on a desk, representing sourcing and
specification rather than a finished textile. Distinct from any swatch
comparison shot elsewhere in the library: this one includes yarn, not only
folded fabric. Crop-safe zone: keep the grouped yarn and fabric centred.
Must include: visible yarn cones, rolled fabric, a desk or bench surface.
Must not include: a finished garment, any brand name on the yarn cone
labels.

**41: Manufacturing group**
Proposed filename: `capability-groups-manufacturing.jpg` · Repository
destination: `public/images/capability-groups/manufacturing.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a close, mid distance view of a single sewing station in use, fabric
visibly feeding under the presser foot, thread under tension, other
machines softly out of focus behind it. Tighter and more intimate than a
wide production floor shot. Crop-safe zone: keep the machine and the
fabric's path through it centred, hands (if shown) inside the safe zone.
Must include: one sewing machine in genuine use, visible thread path,
fabric under the needle.
Must not include: an empty, unattended machine, a wide untethered factory
view.

**42: Decoration group**
Proposed filename: `capability-groups-decoration.jpg` · Repository
destination: `public/images/capability-groups/decoration.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a heat press mid cycle, applying a transfer or print to a garment
panel, a wisp of steam or heat haze visible, hands positioning the fabric
just before or after the press closes. A decoration process distinct from
any existing screen printing carousel or embroidery machine photograph
already in the library. Crop-safe zone: keep the press and the garment
centred, hands inside the safe zone if shown.
Must include: a heat press or equivalent decoration equipment, a garment
panel, believable heat or steam cue.
Must not include: any readable design, logo or text being applied to the
garment; any real brand name on the press itself.

**43: Finishing group**
Proposed filename: `capability-groups-finishing.jpg` · Repository
destination: `public/images/capability-groups/finishing.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a finished garment on a steam press or finishing dummy, mid press,
steam visibly rising, hands smoothing the fabric. The first finishing or
pressing photograph in the library; make it read as a distinct stage from
both sewing and inspection. Crop-safe zone: keep the press and garment
centred.
Must include: visible steam or heat cue, a garment under active finishing,
believable press equipment.
Must not include: a folded, already-packed garment; an inspection
measuring tape (that belongs to the assurance entry, not this one).

**44: Quality and logistics (assurance) group**
Proposed filename: `capability-groups-assurance.jpg` · Repository
destination: `public/images/capability-groups/assurance.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a quality inspection clipboard or checklist resting beside a sealed,
labelled export carton, connecting the quality and logistics side of this
group in one frame. Distinct from the existing inspection table photograph
already in the library: this one shows the paperwork and the carton, not a
garment being measured. Crop-safe zone: keep the clipboard and carton
centred, even margin on all sides.
Must include: a checklist or clipboard with illegible or blank marks only,
a sealed export carton with blank or non-specific labelling.
Must not include: any readable text on the checklist or carton label, any
real courier or freight forwarder branding, any destination country name.

### Material group banners (45 to 49)

Rendered at `aspect-[4/3]` as the page header image, shared across every
material page in that group, and at a small square crop in the Materials
hub grid. See `content/types/index.ts` for the group each of the 13
materials belongs to.

**45: Natural fibers group**
Proposed filename: `material-groups-natural-fibers.jpg` · Repository
destination: `public/images/material-groups/natural-fibers.jpg`
Orientation: square, target 2048 × 2048.
Scene: raw cotton fibre, loose or in a small boll, positioned next to a
plain, undyed cotton yarn cone, photographed close enough to see the fibre
texture clearly. A natural, unprocessed material story. Crop-safe zone:
keep the cotton and yarn cone within the centre 70 percent of the frame.
Must include: visibly fibrous raw cotton texture, a plain yarn cone.
Must not include: any dyed or brightly coloured fibre, any brand marking on
the cone.

**46: Synthetic and performance fibers group**
Proposed filename: `material-groups-synthetic-and-performance.jpg` ·
Repository destination:
`public/images/material-groups/synthetic-and-performance.jpg`
Orientation: square, target 2048 × 2048.
Scene: a technical knit fabric swatch being gently stretched by hand,
showing the weave opening and the fabric's recovery, a genuinely
informative way to photograph a performance property rather than a static
flat swatch. Crop-safe zone: keep the stretched fabric and the hand within
the centre 70 percent of the frame.
Must include: visible stretch and recovery in the fabric, a hand shown
mid-stretch with anatomically correct fingers.
Must not include: any logo or readable text woven into the fabric.

**47: Knitted fabrics group**
Proposed filename: `material-groups-knitted-fabrics.jpg` · Repository
destination: `public/images/material-groups/knitted-fabrics.jpg`
Orientation: square, target 2048 × 2048.
Scene: a macro, close in shot of a knitted fabric's structure, the
interlocking loop construction clearly visible and in sharp focus. Texture
and construction are the subject, not colour or garment shape. Crop-safe
zone: the knit structure should fill the frame edge to edge, no need for
margin since this is a texture macro.
Must include: clearly resolved interlocking loop structure, believable
fibre sheen.
Must not include: any garment silhouette, seam or label in frame.

**48: Woven fabrics group**
Proposed filename: `material-groups-woven-fabrics.jpg` · Repository
destination: `public/images/material-groups/woven-fabrics.jpg`
Orientation: square, target 2048 × 2048.
Scene: a macro, close in shot of a woven fabric, the selvedge edge and the
warp and weft grain both visible and in sharp focus. Texture and
construction are the subject. Crop-safe zone: the woven structure and
selvedge edge should fill most of the frame.
Must include: a visible selvedge edge, clearly resolved warp and weft
grain.
Must not include: any garment silhouette, seam or label in frame.

**49: Recycled and lower impact materials group**
Proposed filename: `material-groups-recycled-and-lower-impact.jpg` ·
Repository destination:
`public/images/material-groups/recycled-and-lower-impact.jpg`
Orientation: square, target 2048 × 2048.
Scene: sorted fabric offcuts or scraps grouped beside a swatch of fabric
made with recycled fibre content, visually connecting waste reduction with
the material itself. Crop-safe zone: keep the grouped scraps and swatch
within the centre 70 percent of the frame.
Must include: visibly sorted, varied fabric scraps, a distinct swatch
beside them.
Must not include: any sustainability certification mark, badge, seal or
percentage figure of any kind, since none is verified; any brand name.

### Industry banners (50 to 59)

Rendered at `aspect-[4/3]` as the page header image and at a small crop in
the Industries hub grid. Every entry photographs the relevant **product**,
never the buyer's institution: see section 5 above before generating any of
these ten.

**50: Fashion brands**
Proposed filename: `industries-fashion-brands.jpg` · Repository
destination: `public/images/industries/fashion-brands.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a small capsule collection, three or four folded pieces, styled with
editorial care on a neutral ground, blank neck labels. Crop-safe zone: keep
the capsule grouped within the centre 70 percent of the frame.
Must include: at least three distinct folded pieces, considered styling.
Must not include: any readable label, any runway or retail setting.

**51: Streetwear brands**
Proposed filename: `industries-streetwear-brands.jpg` · Repository
destination: `public/images/industries/streetwear-brands.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a heavyweight hoodie and an oversized tee stacked together, blank
chest and back panels, boxy streetwear proportions visible in the fold.
Crop-safe zone: keep the stack centred.
Must include: visible heavyweight fabric folds, boxy silhouette cues.
Must not include: any readable graphic, logo or text.

**52: Sports clubs and teams**
Proposed filename: `industries-sports-clubs-and-teams.jpg` · Repository
destination: `public/images/industries/sports-clubs-and-teams.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a matching jersey and shorts set from one team kit, folded together,
number and sponsor placement areas left blank, no real club colours or
crest. Crop-safe zone: keep the folded set centred.
Must include: a visibly matching kit set, blank number placement area.
Must not include: any real club crest, sponsor logo, league branding or
recognisable team colourway.

**53: Corporate uniforms**
Proposed filename: `industries-corporate-uniforms.jpg` · Repository
destination: `public/images/industries/corporate-uniforms.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a corporate polo shirt and a button shirt folded together, blank
chest area where an embroidered logo would sit, neutral corporate
colourway. Crop-safe zone: keep the folded pair centred.
Must include: two distinct corporate garment types, blank chest area.
Must not include: any readable embroidery or logo, any office setting.

**54: Hospitality**
Proposed filename: `industries-hospitality.jpg` · Repository destination:
`public/images/industries/hospitality.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: stacked hotel style towels in two sizes beside a folded hospitality
apron or front of house shirt, no real hotel branding. Crop-safe zone: keep
the grouping centred.
Must include: at least two towel sizes stacked, one folded apparel piece.
Must not include: any hotel name, logo, or hotel interior setting.

**55: Healthcare**
Proposed filename: `industries-healthcare.jpg` · Repository destination:
`public/images/industries/healthcare.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a folded scrub top and trousers set in a neutral clinical colour,
blank chest pocket, no real hospital branding or clinical setting in frame.
Crop-safe zone: keep the folded set centred.
Must include: a matching scrub top and trousers, blank pocket.
Must not include: any hospital signage, medical equipment, or clinical
environment in the background.

**56: Education**
Proposed filename: `industries-education.jpg` · Repository destination:
`public/images/industries/education.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a school style polo shirt and sweatshirt folded together, blank
chest crest area, no real school name or setting in frame. Crop-safe zone:
keep the folded pair centred.
Must include: two distinct school-style garment types, blank crest area.
Must not include: any real school crest, motto or classroom setting.

**57: Construction and industrial**
Proposed filename: `industries-construction-and-industrial.jpg` ·
Repository destination:
`public/images/industries/construction-and-industrial.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a high visibility workwear vest or jacket, folded or on a hanger,
reflective tape construction clearly visible, no construction site in
frame. Crop-safe zone: keep the garment centred.
Must include: clearly visible reflective tape and high visibility fabric.
Must not include: any construction site, machinery, or real safety
certification mark.

**58: Retail and wholesale**
Proposed filename: `industries-retail-and-wholesale.jpg` · Repository
destination: `public/images/industries/retail-and-wholesale.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a stack of several different folded garment types with blank swing
tags attached, representing an assortment ready for distribution rather
than any one product. Crop-safe zone: keep the stack centred.
Must include: at least three visually distinct garment types, visible
blank swing tags.
Must not include: any readable price, barcode or brand name on the tags;
any retail shopfront setting.

**59: Promotional products**
Proposed filename: `industries-promotional-products.jpg` · Repository
destination: `public/images/industries/promotional-products.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a grouped flat lay of small promotional textile items, a cap, a
canvas tote and a small pouch, blank branding areas on each, styled
together as a set. Crop-safe zone: keep the grouped items within the
centre 70 percent of the frame.
Must include: at least three distinct small promotional item types, blank
branding areas.
Must not include: any readable logo, slogan or brand name on any item.

### Market banners (60 to 63)

Rendered at `aspect-[4/3]` on the market detail page and `aspect-[16/9]` in
the Markets hub grid card. Each is differentiated by a genuinely different
export or documentation detail, never by a flag, landmark or anything
implying an office or existing customer base in that market. Read section 6
above before generating 63.

**60: USA**
Proposed filename: `markets-usa.jpg` · Repository destination:
`public/images/markets/usa.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: export cartons stacked and being shrink wrapped onto a pallet, ready
for freight collection. Crop-safe zone: keep the pallet and cartons centred,
even margin on all sides.
Must include: visibly stacked cartons, pallet wrap in progress or freshly
applied.
Must not include: any visible country name, flag, or destination text on
any carton label; any courier or freight forwarder brand name.

**61: Europe**
Proposed filename: `markets-europe.jpg` · Repository destination:
`public/images/markets/europe.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a folded garment with its sewn in care label held open and checked
by hand, a carton visible beside it ready to receive the garment. A detail
relevant to labelling requirements rather than a generic packing shot.
Crop-safe zone: keep the garment and the hand checking the label centred.
Must include: a visibly blank care label being held open, a hand with
anatomically correct fingers.
Must not include: any readable text on the label, any EU symbol, flag or
country name.

**62: UK**
Proposed filename: `markets-uk.jpg` · Repository destination:
`public/images/markets/uk.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a clipboard holding export or customs paperwork, resting on top of a
sealed, labelled carton, emphasising documentation over the physical
product. Crop-safe zone: keep the clipboard and carton centred.
Must include: a clipboard with illegible or blank marks only, a sealed
carton beneath it.
Must not include: any readable text on the paperwork, any flag, landmark or
country name.

**63: Australia**
Proposed filename: `markets-australia.jpg` · Repository destination:
`public/images/markets/australia.jpg`
Orientation: landscape, target 2560 × 1920.
Scene: a garment being packed into an export carton using cardboard
dividers and synthetic packing material. Deliberately no solid wood
packaging material of any kind anywhere in frame (no wooden pallet, no
wooden crate, no wood shavings), reflecting real biosecurity import
requirements for this market. Crop-safe zone: keep the carton and the
garment being packed centred.
Must include: cardboard or synthetic packing material only, a garment
mid-pack.
Must not include: any wood packaging material of any kind; any Australian
flag, landmark, kangaroo, native wildlife, Australian Made mark, or
anything implying an Australian office, facility or existing customer,
per section 6.

---

## Batch-completeness checklist

- [ ] 28 independent image files, one per numbered entry above, not a
      montage, contact sheet, collage or grid
- [ ] every hand shown is anatomically correct: five fingers, plausible
      joints
- [ ] every machine or press shown has coherent, physically sensible
      geometry
- [ ] no readable text, logo, brand mark, crest or certification badge
      anywhere, including on any label, swing tag, clipboard or carton
- [ ] every industry entry (50 to 59) shows the product only, no real
      institution, uniform crest, hospital, hotel, school or construction
      site in the background
- [ ] the Australia entry (63) contains no wood packaging material anywhere
      in frame
- [ ] no image contains an Australian flag, landmark, kangaroo or
      Australian Made mark
- [ ] the count of independent output files equals 28, matching the number
      of manifest entries in this document

Return every numbered scene as a separate, full-resolution image file in
manifest order. Do not combine scenes into a collage, contact sheet, grid,
diptych or montage. Preserve the exact image IDs and filenames in the
response metadata or accompanying file list. Confirm that the number of
independent output files matches the number of manifest entries.

## END MASTER PROMPT
