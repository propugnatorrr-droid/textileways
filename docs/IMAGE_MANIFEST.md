# Image manifest

Human readable companion to `content/configuration/image-manifest.ts` and
`docs/GPT_IMAGE_2_MASTER_PROMPT.md`. This is the checklist for installing
generated photography, not a design brief: the full scene descriptions live
in the master prompt document.

**Status as of this document: all 35 slots have an installed photograph.**
28 have passed review, including the homepage hero (id 26), which was
regenerated from a different brief and passed on the second attempt. 7
still failed the checklist in section 4 on first review (mostly readable
fabricated label or logo text) and remain installed as interim imagery
pending the owner's own photography, at the owner's explicit 2026-09-08
direction. See section 3 for exactly which 7, why each one failed, and the
improved regeneration prompts ready for a cleaner pass if one happens before
the owner's own photography is ready.

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

The 8 entries below were installed on 2026-09-08 despite failing review,
at the owner's explicit direction, as interim imagery until the owner's own
photography replaces them. **If a cleaner version of any is generated in
the meantime, improved, self-contained prompts are ready in
`docs/GPT_IMAGE_2_REGENERATION_BATCH.md`**, each with the specific fix for
why that entry failed. Use that document for this batch rather than
re-deriving prompts from the original master prompt.

Entry 26 is resolved: the owner generated a hands-only replacement following
`docs/GPT_IMAGE_2_HOMEPAGE_HERO_V2.md`, it passed review on 2026-09-08 (both
hands anatomically correct, no readable text or logos anywhere in frame, no
face or posed figure), and it is now installed as the final image, not
interim. 7 of the original 8 remain outstanding.

For any future rejection not already covered there, re-run the master
prompt for the rejected number only, pasting its individual entry from
`docs/GPT_IMAGE_2_MASTER_PROMPT.md` along with the full "Global art direction"
through "Anti-artifact" sections, so a partial re-generation still matches the
rest of the installed set. Track rejected and regenerated IDs here as they
happen:

| Sequence | ID | Status | Note |
| --- | --- | --- | --- |
| 02 | `factory/exterior` | Failed review 2026-09-07, installed as interim 2026-09-08 | Readable circular brand plaque on the building wall. Regenerate with "no signage, no plaques, no readable marks on the building" reinforced. |
| 08 | `factory/inspection` | Failed review 2026-09-07, installed as interim 2026-09-08 | Two small logo-shaped marks on the garment's chest, evoking a real outdoor-brand placement. Regenerate with an explicitly plain, unmarked garment. |
| 17 | `products/workwear-and-uniforms` | Failed review 2026-09-07, installed as interim 2026-09-08 | A clean, legible shield-crest logo appears on both garments (not the illegible placeholder shape requested). Regenerate reinforcing "no crest, no monogram, fully blank chest and sleeve." |
| 25 | `products/textile-accessories` | Failed review 2026-09-07, installed as interim 2026-09-08 | Gibberish orange stitched pseudo-text on the tote strap seam. Regenerate reinforcing "no stitched or embroidered text anywhere on the strap or body." |
| 26 | `editorial/home-hero` | Resolved 2026-09-08 | Original scene failed review 2026-09-07 (readable fabricated label text, a monogram logo on the reviewer's shirt) and was superseded entirely, not patched: the owner asked for a hands-only scene with no posed person standing in frame. `docs/GPT_IMAGE_2_HOMEPAGE_HERO_V2.md` replaced the brief, the owner generated a new candidate, it passed the full anti-artifact checklist (both hands anatomically correct, no readable text or logos anywhere, no face or posed figure, background clean), and it is now the final installed image. |
| 29 | `editorial/quality` | Failed review 2026-09-07, installed as interim 2026-09-08 | Readable fabricated brand text on the garment's neck label. Same systemic issue as 26. Regenerate with the same reinforcement. |
| 31 | `editorial/logistics` | Failed review 2026-09-07, installed as interim 2026-09-08 | Gibberish stamped text repeated across multiple carton faces (separate from the shipping labels, which rendered correctly blank/blurred). Regenerate reinforcing "no stamped or printed text on the cartons themselves." |
| 32 | `editorial/team` | Failed review 2026-09-07, installed as interim 2026-09-08 | Readable woven brand label on the garment being held, third occurrence of the neck/care-label problem. Otherwise an excellent, natural scene worth reusing as-is. Regenerate with the same label reinforcement. |

Five of the eight rejections share one root cause: GPT Image 2 tends to
render a garment's neck or care label as crisp, legible (fabricated) text
whenever a label is visible in frame, even though the master prompt already
says "no readable text on labels." For the next regeneration pass, add an
explicit line to those five entries' prompts: "the garment's neck label and
any care label are turned away from camera or folded under, showing no text
at all." Incidental real equipment branding (a "JUKI" or "Brother" nameplate
visible on a sewing machine in the background) was treated as acceptable
realism, not rejected, since it does not misrepresent Textileways itself.

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

| Seq | ID | Status | Orientation | Rendered aspects | People | Used in |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | `factory/hero` | ✅ Installed | Landscape | 4:3 | Yes | `/factory` |
| 02 | `factory/exterior` | ⚠️ Installed, interim | Landscape | 4:3 | No | `/factory` |
| 03 | `factory/production-floor` | ✅ Installed | Landscape | 4:3 | Yes | `/factory`, homepage, product galleries |
| 04 | `factory/cutting` | ✅ Installed | Landscape | 4:3 | Yes | `/factory`, homepage, product galleries |
| 05 | `factory/sewing` | ✅ Installed | Portrait | 4:3 | Yes | `/factory`, product galleries |
| 06 | `factory/printing` | ✅ Installed | Landscape | 4:3 | Yes | `/factory`, product galleries |
| 07 | `factory/embroidery` | ✅ Installed | Square | 4:3 | Yes | `/factory`, product galleries |
| 08 | `factory/inspection` | ⚠️ Installed, interim | Landscape | 4:3 | Yes | `/factory`, homepage, product galleries |
| 09 | `factory/packing` | ✅ Installed | Landscape | 4:3 | Yes | `/factory`, product galleries |
| 10 | `factory/fabric-store` | ✅ Installed | Landscape | 4:3 | No | `/factory`, product galleries |
| 11 | `factory/laboratory` | ✅ Installed | Square | 4:3 | No | `/factory` |
| 12 | `factory/sampling` | ✅ Installed | Landscape | 4:3 | Yes | `/factory`, homepage |

### Product family series

| Seq | ID | Status | Orientation | Rendered aspects | People | Used in |
| --- | --- | --- | --- | --- | --- | --- |
| 13 | `products/everyday-apparel` | ✅ Installed | Landscape | 4:3, 16:11, 16:10 | No | `/products/everyday-apparel`, hub, homepage |
| 14 | `products/streetwear` | ✅ Installed | Landscape | 4:3, 16:11, 16:10 | No | `/products/streetwear`, hub, homepage |
| 15 | `products/sportswear-and-activewear` | ✅ Installed | Landscape | 4:3, 16:11, 16:10 | No | `/products/sportswear-and-activewear`, hub, homepage |
| 16 | `products/outdoor-and-performance` | ✅ Installed | Landscape | 4:3, 16:11, 16:10 | No | `/products/outdoor-and-performance`, hub, homepage |
| 17 | `products/workwear-and-uniforms` | ⚠️ Installed, interim | Landscape | 4:3, 16:11, 16:10 | No | `/products/workwear-and-uniforms`, hub, homepage |
| 18 | `products/underwear-sleepwear-loungewear` | ✅ Installed | Landscape | 4:3, 16:11, 16:10 | No | `/products/underwear-sleepwear-loungewear`, hub, homepage |
| 19 | `products/children-and-baby` | ✅ Installed | Landscape | 4:3, 16:11, 16:10 | No | `/products/children-and-baby`, hub, homepage |
| 20 | `products/swim-and-resort` | ✅ Installed | Landscape | 4:3, 16:11, 16:10 | No | `/products/swim-and-resort`, hub, homepage |
| 21 | `products/denim-and-woven-products` | ✅ Installed | Landscape | 4:3, 16:11, 16:10 | No | `/products/denim-and-woven-products`, hub, homepage |
| 22 | `products/modest-and-cultural-apparel` | ✅ Installed | Landscape | 4:3, 16:11, 16:10 | No | `/products/modest-and-cultural-apparel`, hub, homepage |
| 23 | `products/specialist-sports-products` | ✅ Installed | Landscape | 4:3, 16:11, 16:10 | No | `/products/specialist-sports-products`, hub, homepage |
| 24 | `products/home-textiles` | ✅ Installed | Landscape | 4:3, 16:11, 16:10 | No | `/products/home-textiles`, hub, homepage |
| 25 | `products/textile-accessories` | ⚠️ Installed, interim | Landscape | 4:3, 16:11, 16:10 | No | `/products/textile-accessories`, hub, homepage |

### Editorial series

| Seq | ID | Status | Orientation | Rendered aspects | People | Used in |
| --- | --- | --- | --- | --- | --- | --- |
| 26 | `editorial/home-hero` | ✅ Installed | Portrait | 4:3, 5:6 | No (hands only) | Homepage hero, priority LCP image |
| 27 | `editorial/scale` | ✅ Installed | Landscape | 16:8 | No | Homepage markets teaser (Europe) |
| 28 | `editorial/materials` | ✅ Installed | Square | 4:3, 16:8 | No | `/materials`, homepage markets teaser (UK) |
| 29 | `editorial/quality` | ⚠️ Installed, interim | Landscape | 4:3, 16:10 | Yes | `/quality`, homepage quality section |
| 30 | `editorial/sustainability` | ✅ Installed | Landscape | 4:3 | No | `/sustainability` |
| 31 | `editorial/logistics` | ⚠️ Installed, interim | Landscape | 4:3, 16:8 | No | `/markets`, homepage markets teaser (USA) |
| 32 | `editorial/team` | ⚠️ Installed, interim | Landscape | 4:3 | Yes | `/about` |

### Article series

| Seq | ID | Status | Orientation | Rendered aspects | People | Used in |
| --- | --- | --- | --- | --- | --- | --- |
| 33 | `insights/understanding-moq` | ✅ Installed | Landscape | 21:9, 16:10 | No | `/insights/understanding-minimum-order-quantity`, hub, homepage |
| 34 | `insights/choosing-decoration` | ✅ Installed | Landscape | 21:9, 16:10 | No | `/insights/choosing-a-decoration-method`, hub, homepage |
| 35 | `insights/tech-pack-anatomy` | ✅ Installed | Landscape | 21:9, 16:10 | No | `/insights/anatomy-of-a-tech-pack`, hub, homepage |

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
