# Image manifest

Human readable companion to `content/configuration/image-manifest.ts` and
`docs/GPT_IMAGE_2_MASTER_PROMPT.md`. This is the checklist for installing
generated photography, not a design brief: the full scene descriptions live
in the master prompt document.

**Status as of this document: 35 of 35 slots are placeholders. No image
generation has run and no files have been installed.** Every route referenced
below currently renders the woven-pattern placeholder art from
`components/content/media.tsx`, not a photograph.

## 1. What "representative" means here

Once a real file is installed at one of the paths below, it becomes
representative campaign imagery: a photograph illustrating the process,
product or environment described, generated or commissioned for this
website. It is not a documentary photograph of this specific Textileways
facility, staff, machinery, production run, customer or certificate unless
the business separately supplies and confirms real source photography that
proves those specific details. `app/(marketing)/factory/page.tsx` and
`app/(marketing)/about/page.tsx` carry a standing disclosure to this effect so
it does not need repeating on every image card.

## 2. Installation process, once files exist

For each generated file:

1. Run it through the rejection checklist in section 4 below.
2. Save it at the exact **Repository destination** path from the table in
   section 5, replacing nothing until the file is approved.
3. In `content/fallback/media.ts`, remove `isPlaceholder: true` from that
   asset's entry (or delete the line entirely, since it is `undefined` by
   default and `Media` only renders placeholder art when it is `true`). Update
   `width` and `height` on that entry to the file's actual dimensions if they
   differ from the placeholder's stated target.
4. Leave `alt`, `src` and `caption` as they are unless the actual photograph
   shows something materially different from the brief; `src` already points
   at the correct path and does not need to change.
5. Run `npm run test`. `tests/unit/image-manifest.test.ts` and
   `tests/unit/content.test.ts` will still pass, since neither test asserts
   that a slot must remain a placeholder, only that the manifest and the
   media declarations stay in step.
6. Run `npm run build` and visually check the page listed in **Used in**
   at the viewports in `docs/LAUNCH_CHECKLIST.md`, confirming the crop-safe
   zone held at every rendered aspect ratio.
7. Once every slot due for a given page is installed, consider whether the
   placeholder-specific copy on that page (for example the factory page's
   "reserved slot" language) should be revisited. Leave the representative
   imagery disclosure in place regardless.

Do not install a file that fails the checklist in section 4. Regenerate it
instead, keeping its numbered scene description unchanged.

## 3. Regeneration notes

If only some images from a batch are approved, re-run the master prompt for
the rejected numbers only, pasting their individual entries from
`docs/GPT_IMAGE_2_MASTER_PROMPT.md` along with the full "Global art direction"
through "Anti-artifact" sections, so a partial re-generation still matches the
rest of the installed set. Track rejected and regenerated IDs here as they
happen:

| Sequence | ID | Status | Note |
| --- | --- | --- | --- |
| n/a | n/a | n/a | No images generated yet; nothing to record. |

## 4. Rejection checklist

Reject and regenerate any image that shows:

- malformed or extra fingers, or an implausible hand
- machinery with impossible or non-functional geometry
- a duplicated worker or a duplicated garment that reveals a tiling artifact
- garbled, misspelled or nonsensical text anywhere in frame
- a real brand name, logo or trademark
- a watermark, caption, timestamp or embedded border
- a montage, contact sheet, collage or grid presented as one image
- an implausible Pakistani environment (wrong architecture, impossible scale,
  the wrong kind of facility)
- content that cannot survive the rendered aspect ratios listed in section 5
  without cropping out the focal subject
- an Australian flag, landmark, kangaroo, Australian Made mark or anything
  implying an Australian facility or office

## 5. Full asset checklist

Sequence order matches the GPT Image 2 batch in
`docs/GPT_IMAGE_2_MASTER_PROMPT.md`. "Used in" is abbreviated; see
`content/configuration/image-manifest.ts` for the complete route list per
asset.

### Factory series

| Seq | ID | Repository destination | Orientation | Rendered aspects | People | Used in |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | `factory/hero` | `public/images/factory/hero.jpg` | Landscape | 4:3 | Yes | `/factory` |
| 02 | `factory/exterior` | `public/images/factory/exterior.jpg` | Landscape | 4:3 | No | `/factory` |
| 03 | `factory/production-floor` | `public/images/factory/production-floor.jpg` | Landscape | 4:3 | Yes | `/factory`, homepage, product galleries |
| 04 | `factory/cutting` | `public/images/factory/cutting.jpg` | Landscape | 4:3 | Yes | `/factory`, homepage, product galleries |
| 05 | `factory/sewing` | `public/images/factory/sewing.jpg` | Portrait | 4:3 | Yes | `/factory`, product galleries |
| 06 | `factory/printing` | `public/images/factory/printing.jpg` | Landscape | 4:3 | Yes | `/factory`, product galleries |
| 07 | `factory/embroidery` | `public/images/factory/embroidery.jpg` | Square | 4:3 | Yes | `/factory`, product galleries |
| 08 | `factory/inspection` | `public/images/factory/inspection.jpg` | Landscape | 4:3 | Yes | `/factory`, homepage, product galleries |
| 09 | `factory/packing` | `public/images/factory/packing.jpg` | Landscape | 4:3 | Yes | `/factory`, product galleries |
| 10 | `factory/fabric-store` | `public/images/factory/fabric-store.jpg` | Landscape | 4:3 | No | `/factory`, product galleries |
| 11 | `factory/laboratory` | `public/images/factory/laboratory.jpg` | Square | 4:3 | No | `/factory` |
| 12 | `factory/sampling` | `public/images/factory/sampling.jpg` | Landscape | 4:3 | Yes | `/factory`, homepage |

### Product family series

| Seq | ID | Repository destination | Orientation | Rendered aspects | People | Used in |
| --- | --- | --- | --- | --- | --- | --- |
| 13 | `products/everyday-apparel` | `public/images/products/everyday-apparel.jpg` | Landscape | 4:3, 16:11, 16:10 | No | `/products/everyday-apparel`, hub, homepage |
| 14 | `products/streetwear` | `public/images/products/streetwear.jpg` | Landscape | 4:3, 16:11, 16:10 | No | `/products/streetwear`, hub, homepage |
| 15 | `products/sportswear-and-activewear` | `public/images/products/sportswear-and-activewear.jpg` | Landscape | 4:3, 16:11, 16:10 | No | `/products/sportswear-and-activewear`, hub, homepage |
| 16 | `products/outdoor-and-performance` | `public/images/products/outdoor-and-performance.jpg` | Landscape | 4:3, 16:11, 16:10 | No | `/products/outdoor-and-performance`, hub, homepage |
| 17 | `products/workwear-and-uniforms` | `public/images/products/workwear-and-uniforms.jpg` | Landscape | 4:3, 16:11, 16:10 | No | `/products/workwear-and-uniforms`, hub, homepage |
| 18 | `products/underwear-sleepwear-loungewear` | `public/images/products/underwear-sleepwear-loungewear.jpg` | Landscape | 4:3, 16:11, 16:10 | No | `/products/underwear-sleepwear-loungewear`, hub, homepage |
| 19 | `products/children-and-baby` | `public/images/products/children-and-baby.jpg` | Landscape | 4:3, 16:11, 16:10 | No | `/products/children-and-baby`, hub, homepage |
| 20 | `products/swim-and-resort` | `public/images/products/swim-and-resort.jpg` | Landscape | 4:3, 16:11, 16:10 | No | `/products/swim-and-resort`, hub, homepage |
| 21 | `products/denim-and-woven-products` | `public/images/products/denim-and-woven-products.jpg` | Landscape | 4:3, 16:11, 16:10 | No | `/products/denim-and-woven-products`, hub, homepage |
| 22 | `products/modest-and-cultural-apparel` | `public/images/products/modest-and-cultural-apparel.jpg` | Landscape | 4:3, 16:11, 16:10 | No | `/products/modest-and-cultural-apparel`, hub, homepage |
| 23 | `products/specialist-sports-products` | `public/images/products/specialist-sports-products.jpg` | Landscape | 4:3, 16:11, 16:10 | No | `/products/specialist-sports-products`, hub, homepage |
| 24 | `products/home-textiles` | `public/images/products/home-textiles.jpg` | Landscape | 4:3, 16:11, 16:10 | No | `/products/home-textiles`, hub, homepage |
| 25 | `products/textile-accessories` | `public/images/products/textile-accessories.jpg` | Landscape | 4:3, 16:11, 16:10 | No | `/products/textile-accessories`, hub, homepage |

### Editorial series

| Seq | ID | Repository destination | Orientation | Rendered aspects | People | Used in |
| --- | --- | --- | --- | --- | --- | --- |
| 26 | `editorial/home-hero` | `public/images/editorial/home-hero.jpg` | Portrait | 4:3, 5:6 | Yes | Homepage hero, priority LCP image |
| 27 | `editorial/scale` | `public/images/editorial/scale.jpg` | Landscape | 16:8 | No | Homepage markets teaser (Europe) |
| 28 | `editorial/materials` | `public/images/editorial/materials.jpg` | Square | 4:3, 16:8 | No | `/materials`, homepage markets teaser (UK) |
| 29 | `editorial/quality` | `public/images/editorial/quality.jpg` | Landscape | 4:3, 16:10 | Yes | `/quality`, homepage quality section |
| 30 | `editorial/sustainability` | `public/images/editorial/sustainability.jpg` | Landscape | 4:3 | No | `/sustainability` |
| 31 | `editorial/logistics` | `public/images/editorial/logistics.jpg` | Landscape | 4:3, 16:8 | No | `/markets`, homepage markets teaser (USA) |
| 32 | `editorial/team` | `public/images/editorial/team.jpg` | Landscape | 4:3 | Yes | `/about` |

### Article series

| Seq | ID | Repository destination | Orientation | Rendered aspects | People | Used in |
| --- | --- | --- | --- | --- | --- | --- |
| 33 | `insights/understanding-moq` | `public/images/insights/understanding-moq.jpg` | Landscape | 21:9, 16:10 | No | `/insights/understanding-minimum-order-quantity`, hub, homepage |
| 34 | `insights/choosing-decoration` | `public/images/insights/choosing-decoration.jpg` | Landscape | 21:9, 16:10 | No | `/insights/choosing-a-decoration-method`, hub, homepage |
| 35 | `insights/tech-pack-anatomy` | `public/images/insights/tech-pack-anatomy.jpg` | Landscape | 21:9, 16:10 | No | `/insights/anatomy-of-a-tech-pack`, hub, homepage |

## 6. Alt text

Alt text for every asset is declared once, in `content/fallback/media.ts`, and
does not need to be duplicated here: see the `alt` field on each entry. It
carries through automatically to `content/configuration/image-manifest.ts`
and to every `<Image>` the `Media` component renders. `tests/unit/image-manifest.test.ts`
asserts every manifest entry has a non-empty alt value.

## 7. Not in this manifest

An "Australia sourcing collaboration" scene was drafted during planning and
is documented, with its full scene brief, in the "Deliberately not included
in this batch" section of `docs/GPT_IMAGE_2_MASTER_PROMPT.md`. It is not one
of the 35 slots above because none of the three original market pages carry a
dedicated photograph today, and giving only the newest market a unique image
would unbalance the four otherwise equally weighted market pages. Revisit
this only if imagery is added to all four market pages at once.
