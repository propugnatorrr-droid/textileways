# Content requirements

Everything the website needs from the business before launch.

The site is fully built and functional without any of this. Each item below is
either rendering a documented placeholder, or is deliberately absent because
publishing an unverified version would be a false statement.

**Status key**

| Status | Meaning |
| --- | --- |
| Outstanding | Needed before launch |
| Optional | Improves the site, not a blocker |
| Withheld | Deliberately not published until measured and verified |

---

## 1. Brand and legal

| Item | Description | Format | Owner | Verification | Status | Pages affected |
| --- | --- | --- | --- | --- | --- | --- |
| Logo files | Primary logo, plus a horizontal lockup if one exists. A typographic wordmark is currently drawn in `components/layout/wordmark.tsx`. | SVG preferred, or PNG at 4x | Business | No | Outstanding | Header, footer, social image, icon |
| Favicon source | Only needed if the generated mark is not wanted. Currently generated from the palette. | SVG or 512x512 PNG | Business | No | Optional | Browser tab, manifest |
| Brand colour references | Any exact brand colours. The current palette follows the brief. | Hex values | Business | No | Optional | Site wide |
| Registered legal company name | Required for the footer copyright, the legal pages and Organization structured data. | Text | Business | Yes | Outstanding | Footer, `/privacy`, `/terms`, structured data |
| Company registration number | For the terms page and buyer due diligence. | Text | Business | Yes | Outstanding | `/terms` |
| Governing law and jurisdiction | Needed to complete the terms page. | Text, from a legal adviser | Legal adviser | Yes | Outstanding | `/terms` |
| Data protection contact | A named contact and email for privacy requests. | Name and email | Business | Yes | Outstanding | `/privacy` |
| Data retention periods | How long inquiry correspondence and files are kept. | Text | Business | Yes | Outstanding | `/privacy` |

---

## 2. Contact details

| Item | Description | Format | Owner | Verification | Status | Pages affected |
| --- | --- | --- | --- | --- | --- | --- |
| WhatsApp number | Supplied and live: +92 336 260 5238 | Text | Business | Verified 2026-09-04 | Complete | Site wide floating action, header, footer, contact |
| Sales email address | Shown in the footer and contact page, and used as the RFQ reply address. | Email | Business | Yes | Outstanding | Footer, `/contact`, structured data |
| Sales telephone number | With country code. Left unpublished rather than publishing an unmonitored line. | Text | Business | Yes | Outstanding | Footer, `/contact` |
| Factory address | Required before any address or map is published. If the business prefers not to disclose the site, say so and it stays absent. | Text | Business | Yes | Outstanding | Footer, `/factory`, structured data |
| Social profiles | Only accounts the business actually owns and maintains. | URLs | Business | Yes | Optional | Footer, structured data |
| RFQ notification recipients | Who receives new inquiries. Set as `RFQ_TO_EMAIL`. | Emails | Business | Yes | Outstanding | RFQ, contact and sample notifications |

Until the email and telephone are supplied, the footer and contact page explain
that inquiries are delivered through the forms and WhatsApp, rather than showing
a placeholder.

---

## 3. Certifications

| Item | Description | Format | Owner | Verification | Status | Pages affected |
| --- | --- | --- | --- | --- | --- | --- |
| Certificate records | Name, issuing organisation, certificate number, facility, scope, issue date, expiry date, verification URL. | Text plus PDF | Business | Yes | Outstanding | `/certifications` |
| Certificate documents | The certificates themselves. | PDF | Business | Yes | Outstanding | `/certifications` |
| Social compliance audit reports | Only if the business wants audit status published. | PDF | Business | Yes | Optional | `/responsibility` |

`/certifications` currently states plainly that no certificates are published,
and explains what a publishable record requires. The registry enforces those
rules: a record with no number or issuer is never displayed, and status is
recomputed from the expiry date on every render.

---

## 4. Photography

35 media slots are declared. Each renders a woven pattern panel with the brief
for the shot printed beneath it, so nothing looks broken and nobody has to guess
what is needed.

**How to supply.** Save as `public/images/<id>.jpg`, then remove
`isPlaceholder: true` from that entry in `content/fallback/media.ts`. The slot
switches to `next/image` automatically. Alt text is already written; adjust it if
the photograph differs from the brief.

**General direction.** Real working environments, natural light where possible,
warm and slightly desaturated. Not a studio model shoot. Written consent is
required from anyone identifiable.

### 4.1 Factory, 12 shots

| Id | Shot required | Minimum resolution |
| --- | --- | --- |
| `factory/hero` | Wide shot of the production floor during a working shift. Natural light preferred. No faces in close focus without written consent. | 2000x1125 |
| `factory/exterior` | Building exterior in daylight, showing scale and entrance. Signage visible if the site is to be identified. | 1600x1000 |
| `factory/production-floor` | Sewing lines from a raised angle, showing line organisation and workstation layout. | 1600x1000 |
| `factory/cutting` | Cutting room with fabric spread on the table. Include the marker layout if legible. | 1600x1000 |
| `factory/sewing` | Close shot of hands and machine at a sewing operation. Consent required if the operator is identifiable. | 1000x1300 portrait |
| `factory/printing` | Screen printing carousel mid run, with a printed panel visible. | 1600x1000 |
| `factory/embroidery` | Multi head embroidery machine in operation, close enough to read stitch detail. | 1200x1200 square |
| `factory/inspection` | Inspection table with a garment, measuring tape and the measurement chart in frame. | 1600x1000 |
| `factory/packing` | Packing station showing folded goods, polybags and marked shipping cartons. | 1600x1000 |
| `factory/fabric-store` | Fabric roll storage showing organisation and labelling of incoming material. | 1600x1000 |
| `factory/laboratory` | In house testing equipment such as a GSM cutter, scale or shrinkage template. | 1200x1200 square |
| `factory/sampling` | Sample room bench with patterns, a partially assembled garment and a tech pack in view. | 1600x1000 |

### 4.2 Products, 13 shots

All 1600x1000 landscape.

| Id | Shot required |
| --- | --- |
| `products/everyday-apparel` | Finished tee shirts in three colourways, flat lay or hanger, showing stitch and neck construction. |
| `products/streetwear` | Heavyweight hoodie on a hanger or form, lit to show fabric weight and print texture. |
| `products/sportswear-and-activewear` | Performance top and shorts, showing sublimated graphics and flatlock seams. |
| `products/outdoor-and-performance` | Technical shell jacket showing seams, zips and any taped construction. |
| `products/workwear-and-uniforms` | Uniform set including an embroidered polo shirt and a work jacket. |
| `products/underwear-sleepwear-loungewear` | Loungewear set flat laid, showing fabric drape and soft trims. |
| `products/children-and-baby` | Children's garments flat laid. No child models. Show snap fastenings and label placement. |
| `products/swim-and-resort` | Swim shorts and a resort shirt, showing print and trim detail. No model shot. |
| `products/denim-and-woven-products` | Denim jeans with close detail on the wash, stitching and hardware. |
| `products/modest-and-cultural-apparel` | Modest apparel on a hanger or form, showing drape, length and finishing. |
| `products/specialist-sports-products` | A specialist sports textile item such as a padded guard, kit bag or training aid. |
| `products/home-textiles` | Towels or table linen, styled simply on a neutral ground. |
| `products/textile-accessories` | Canvas totes, caps and pouches grouped, showing print and stitch detail. |

### 4.3 Editorial, 7 shots

| Id | Shot required | Minimum resolution |
| --- | --- | --- |
| `editorial/home-hero` | **The single most important photograph on the site.** Fabric or a garment in a real working environment, shot horizontally with room for text on the left. | 2000x1125 |
| `editorial/scale` | Bundled cut panels or stacked finished garments, communicating quantity without a graphic. | 1600x1000 |
| `editorial/materials` | Fabric swatch stack or hanger set, close enough to read texture. | 1200x1200 |
| `editorial/quality` | Measuring tape across a garment on an inspection table, with the chart visible. | 1600x1000 |
| `editorial/sustainability` | Sorted fabric offcuts or segregated waste bins on the production floor. | 1600x1000 |
| `editorial/logistics` | Palletised and marked export cartons staged for collection. | 1600x1000 |
| `editorial/team` | Two or three staff reviewing a tech pack or sample together. Written consent required. | 1600x1000 |

### 4.4 Insights, 3 shots

All 1600x1000.

| Id | Shot required |
| --- | --- |
| `insights/understanding-moq` | Fabric rolls in the store, illustrating the material commitment behind a minimum order quantity. |
| `insights/choosing-decoration` | Print and embroidery samples laid side by side on the same fabric for comparison. |
| `insights/tech-pack-anatomy` | Printed tech pack pages beside the garment they describe, on a work bench. |

### 4.5 Video, optional

| Item | Description | Format | Owner | Status |
| --- | --- | --- | --- | --- |
| Factory walkthrough | 30 to 60 seconds, no audio required, for the factory page. A poster frame is required alongside it. | MP4, 1080p, under 8 MB | Business | Optional |

---

## 5. Business facts

Managed in `content/configuration/company-facts.ts`. Editing one line publishes
or withholds a claim across the whole site.

### 5.1 Verified and published

| Fact | Value | Source |
| --- | --- | --- |
| Country of manufacture | Pakistan | Client brief |
| Years of experience | More than 20 years | Client brief |
| Indicative minimum quantity | From approximately 50 pieces | Client brief |
| Indicative upper scale | Beyond 100,000 pieces | Client brief |
| Primary markets | United States and Europe | Client brief |
| WhatsApp number | +92 336 260 5238 | Business owner, 2026-09-04 |

### 5.2 Outstanding

| Fact | Why it is needed | Status |
| --- | --- | --- |
| Registered legal company name | Legal pages, footer, structured data | Outstanding |
| Company registration number | Terms page, buyer due diligence | Outstanding |
| Factory address | Footer, factory page, structured data | Outstanding |
| Sales email address | Footer, contact page, RFQ reply address | Outstanding |
| Sales telephone number | Footer, contact page | Outstanding |
| Machine list and counts | Factory page equipment section | Outstanding |

### 5.3 Withheld until measured

Each of these needs a value, a unit, a reporting period, a scope and a method
before it can be published. `/responsibility` says so publicly.

| Fact | What would be required |
| --- | --- |
| Number of employees | A confirmed figure and the date it applies to |
| Monthly production capacity | A figure, a unit, a product type and a reporting period |
| Number of countries served | An export record supporting the count |
| On time delivery rate | A measurement method and a reporting period |
| Defect rate | An inspection standard, a sample plan and a reporting period |

---

## 6. Market and customer evidence

| Item | Description | Owner | Verification | Status | Pages affected |
| --- | --- | --- | --- | --- | --- |
| Export market history | Which markets have actually been shipped to, and roughly since when. | Business | Yes | Outstanding | `/about`, `/markets` |
| Partner facility information | Which categories run through partners, and what auditing is in place. | Business | Yes | Outstanding | `/traceability`, product pages |
| Customer permissions | Written permission before any customer is named. | Business and customer | Yes | Outstanding | `/case-studies` |
| Case study evidence | Quantities, timescales and results, with records behind each figure. | Business | Yes | Outstanding | `/case-studies` |
| Customer logos | Only with written permission. None are displayed. | Business and customer | Yes | Optional | Not currently used |
| Testimonials | Only with written permission and attribution. None are displayed. | Business and customer | Yes | Optional | `/case-studies` |
| Team members | Name, role, biography, photograph, consent to publish. | Business | Yes | Optional | `/about` |

---

## 7. Configuration

These are secrets rather than content. Setting them is covered in
`docs/DEPLOYMENT.md`.

| Item | Variable | Required before launch |
| --- | --- | --- |
| Canonical site URL | `NEXT_PUBLIC_SITE_URL` | Yes |
| Resend API key | `RESEND_API_KEY` | Yes |
| Sending address | `RFQ_FROM_EMAIL` | Yes |
| Inquiry recipients | `RFQ_TO_EMAIL` | Yes |
| Turnstile keys | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Strongly recommended |
| Blob storage token | `BLOB_READ_WRITE_TOKEN` | Yes, if RFQ attachments are wanted |
| Sanity project | `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | No |
| Revalidation secret | `SANITY_REVALIDATE_SECRET` | Only with a CMS |
| Analytics ids | `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID` | No |

---

## 8. Priority order

If the business supplies items in this order, the site becomes launchable in the
fewest steps.

1. Sales email address and RFQ recipients, so inquiries reach a person.
2. Resend API key and a verified sending domain, so email is delivered.
3. `editorial/home-hero`, the single highest impact photograph.
4. Registered legal company name, so the footer and legal pages are correct.
5. Turnstile keys, so the forms are protected in public.
6. The 12 factory photographs, which is what turns credibility from a claim into
   evidence.
7. Blob storage token, so buyers can attach tech packs.
8. Everything else.
