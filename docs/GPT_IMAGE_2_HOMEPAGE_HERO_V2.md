# Homepage hero, second direction

Replaces the "person reviewing a garment" brief for image 26 in
`docs/GPT_IMAGE_2_MASTER_PROMPT.md` and its regeneration attempt in
`docs/GPT_IMAGE_2_REGENERATION_BATCH.md`. The owner's direction: no posed
person standing in frame. This document supersedes both for that one slot;
the other 34 images and their prompts are unaffected.

**Why this direction.** A close, hands-only craft shot keeps the human
presence that makes manufacturing photography feel real (a posed,
identifiable person standing and facing the room reads as generic stock
photography) while removing the exact problem the owner flagged. It is also
the register used by premium manufacturing and craft brands generally: the
work, not a model.

**Repository destination:** `public/images/editorial/home-hero.jpg`
**Filename to save the result as:** `editorial-home-hero.jpg`

---

## Paste-ready prompt

Absolutely no readable text, wordmark, monogram, crest, emblem, logo, or
brand mark anywhere in the frame, on any garment, label, tag, or surface,
even a stylised, illegible-looking, or partially obscured one. If any
garment label is visible at all, it must be completely blank or turned away
from camera.

Generate a genuine high-end commercial/documentary photograph (not CGI, not
illustration, not a stock composite, not visibly AI-generated) inside a
credible, modern Pakistani textile and apparel factory. Ultra-realistic
photography style: natural colour science, restrained contrast, retained
highlight and shadow detail, fine textile micro-detail, subtle sensor
grain, no HDR halo, no neon glow, no lens flare, no plastic-looking
surfaces.

Orientation: portrait, target 2048 × 2560 (this image is rendered at
`aspect-[4/3]` on mobile and the taller `aspect-[5/6]` on desktop, so
generate genuinely portrait or near-square, not wide landscape, so both
crops keep the subject safe).

Scene: a close, intimate shot of a pair of hands mid-task on a finished or
near-finished garment, in a real working environment with a softly blurred
factory background (sewing lines, cutting tables, or fabric rolls, out of
sharp focus behind the subject). No face, no posed person standing in
frame; the hands and the garment are the entire subject. Choose one
specific, physically coherent action rather than a generic gesture:

- guiding a seam under a sewing machine's presser foot, needle mid-stitch,
  thread visibly under tension, or
- smoothing a finished seam flat by hand on an inspection table, checking
  it against the light, or
- holding open the collar or cuff of a folded garment to show construction
  quality, fingers spread naturally, or
- trimming a loose thread with small scissors, blade well clear of the
  fabric and the other hand.

Pick whichever of these reads most naturally as a genuine, unposed moment
of skilled work; do not combine more than one action in the frame.

Lighting: soft, directional natural or task light from one side, the kind
a documentary photographer would find already in the room rather than
studio lighting brought in. Strong enough to show fabric texture and
stitch detail clearly, not flat or shadowless.

Palette: the garment and surrounding materials should sit within white,
natural cotton, charcoal, black, forest or deep emerald, olive, navy, or
clay, consistent with the rest of the photography library. The background
factory environment should read as the same facility as the other
installed images: painted masonry or concrete, practical task lighting,
genuinely operational, not sterile or staged.

Hands must be anatomically correct: five fingers each, plausible joints,
a natural and physically sensible grip on the tool and fabric. If a
sewing machine appears, its needle, presser foot, feed dog and thread
path must relate to each other the way a real machine's parts do, and the
fabric must pass through it in a way that makes physical sense.

Crop-safe zone: keep the hands and the garment they are working on within
the centre 60 percent of the frame both horizontally and vertically, with
genuine negative space above and below (for the taller 5:6 desktop crop)
and at the sides (for the 4:3 mobile crop). Nothing essential within
roughly 10 percent of any edge.

Must include: a pair of hands performing one coherent, physically correct
action on a real garment; visible fabric weave or knit texture; a softly
out-of-focus real factory environment behind.

Must not include: any face or posed standing figure; any readable text,
label, logo, monogram, or brand mark anywhere, including on the garment;
a montage, contact sheet, collage, or grid; a watermark or embedded
caption; an Australian flag, landmark, kangaroo, or Australian Made mark;
any real brand name or trademark.

---

## Batch-completeness checklist for this single image

- [ ] one photograph, not a montage, contact sheet, collage, or grid
- [ ] no face or posed standing person anywhere in frame
- [ ] hands are anatomically correct (five fingers, plausible joints)
- [ ] any machine shown has coherent, physically sensible geometry
- [ ] no readable text, logo, or brand mark anywhere, including on the
      garment's label if one is visible
- [ ] the subject survives both a 4:3 crop and a taller 5:6 crop without
      losing the hands or the garment
- [ ] no Australian flag, landmark, kangaroo, or Australian Made mark

Run the result through this checklist and the full rejection checklist in
`docs/IMAGE_MANIFEST.md` section 4 before installing. On install, follow
`docs/IMAGE_MANIFEST.md` section 2; the destination and dimensions in
`content/fallback/media.ts` (`editorialMedia.homeHero`) do not need to
change, only the file itself.
