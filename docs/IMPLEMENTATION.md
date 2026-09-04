# Implementation

What was built, how it is organised, and the decisions that are not obvious from
reading the code.

---

## 1. Status

| Phase | Scope | State |
| --- | --- | --- |
| 1 | Design tokens, architecture, shared UI | Complete |
| 2 | Layout, header, mega menu, mobile navigation, footer | Complete |
| 3 | Content model, typed fallback content, media system | Complete |
| 4 | Homepage, all thirteen sections | Complete |
| 5 | Hub pages and dynamic templates | Complete |
| 6 | Company, manufacturing, quality, responsibility, legal pages | Complete |
| 7 | RFQ, contact and sample forms with API routes | Complete |
| 8 | SEO, structured data, analytics, security, accessibility | Complete |
| 9 | Sanity schemas, queries and CMS adapter | Complete |
| 10 | Unit and end to end tests | Complete |
| 11 | Documentation | Complete |

Verification commands and their current results are in section 9.

---

## 2. Stack

| Concern | Choice | Note |
| --- | --- | --- |
| Framework | Next.js 16.3, App Router, Turbopack | Server Components by default |
| Language | TypeScript, strict | No `any` in application code |
| Styling | Tailwind CSS v4 | CSS first configuration in `app/globals.css` |
| Fonts | Instrument Serif, Manrope, via `next/font` | Self hosted, no external font request |
| Validation | Zod | Same schemas on client and server |
| CMS | Sanity, optional | Falls back to typed repository content |
| Email | Resend | Degrades to server logging when unconfigured |
| Storage | Vercel Blob, behind an adapter interface | Swappable without touching route handlers |
| Spam | Cloudflare Turnstile, honeypot, timing, rate limit | Four independent layers |
| Unit tests | Vitest | 132 tests |
| Browser tests | Playwright, desktop and mobile projects | 120 tests |

React Hook Form is listed in the brief. The forms use a small typed state layer
instead, and the package was removed rather than left installed and unused. The
RFQ needs per step partial validation, session draft persistence and server
returned field errors merged back into the UI, and wiring those three through a
form library added indirection without removing code. The Zod schemas, which are
the part that matters, are unchanged.

---

## 3. Structure

```text
app/
  (marketing)/          every public page
  api/                  rfq, sample-request, contact, revalidate
  layout.tsx            fonts, header, footer, consent, WhatsApp, Organization JSON LD
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.tsx
  error.tsx global-error.tsx not-found.tsx loading.tsx

components/
  navigation/   header, mega menu, mobile accordion
  layout/       footer, wordmark, cookie consent, WhatsApp actions
  sections/     homepage sections, shared page shell
  product/      products hub filtering
  forms/        field primitives, uploads, Turnstile, three forms
  content/      media, reveal, breadcrumbs, FAQ accordion, legal page
  seo/          JSON LD renderer
  ui/           buttons, headings, spec lists, notices, empty states

content/
  configuration/  site config, company facts, navigation
  fallback/       all seeded content
  types/          the content model

lib/
  cms/ email/ storage/ analytics/ validation/ security/ seo/ utilities/ hooks/

sanity/
  schemas/ queries/ lib/

tests/
  unit/ e2e/
```

---

## 4. Content integrity

This is the part of the brief with the most ways to get it wrong quietly, so the
rules are enforced in code rather than left to editorial discipline.

**One register for company facts.** `content/configuration/company-facts.ts`
holds every factual claim with a verification status. Components call
`verifiedFactValue(id)`, which returns `null` for anything not verified. A
pending fact therefore renders as nothing rather than as a placeholder. Five
facts are verified from the brief, one (the WhatsApp number) was supplied by the
business, and the rest are outstanding.

**Withheld by design.** Employee count, monthly capacity, countries served, on
time delivery and defect rate are all marked `do-not-publish` with a note saying
what would be required. `/responsibility` renders that list, which turns the
absence into a statement rather than a gap.

**Case studies cannot leak.** A record is only rendered when
`evidenceStatus === "published"`. The GROQ query filters on it, the fallback
list filters on it, `generateStaticParams` only emits published slugs, and
`dynamicParams = false` means an unpublished slug is a 404 at the routing layer.
There are no published case studies, so `/case-studies` renders the educational
project walkthrough the brief specifies instead.

**Certificates are recomputed.** `resolveCertificateStatus` derives status from
the expiry date on every render, so a stale `status` field cannot keep an expired
certificate on display. A record with no certificate number or issuing
organisation is never shown. The registry is empty because none were supplied.

**Product truth labels.** Every product family carries one of the four labels
from the brief, shown on the page with a sentence explaining what it means, and
collected on `/traceability`.

**No remote stock imagery.** Every media slot is a local record. Where no
photograph exists, `components/content/media.tsx` draws an inline woven pattern
derived deterministically from the asset path, and the caption states the shot
required. Dropping a real file into `public/images` and removing `isPlaceholder`
switches that slot to `next/image` with no other change.

A Vitest suite asserts these rules, including that no seeded copy contains an em
dash or en dash, which the brief prohibits.

---

## 5. Design system

Tokens live in `app/globals.css` under Tailwind v4's `@theme`, so they are both
CSS variables and Tailwind utilities.

- Warm paper and cotton grounds, ink text, forest as the accent, clay used
  sparingly. No pure black.
- Radii between 2px and 8px. No pill shapes anywhere, including tags, which are
  square with a hairline border.
- Fluid type with `clamp()` on the scale from the brief.
- Section rhythm 80px mobile, 112px tablet, 144px desktop.
- Motion is limited to reveals, underline growth, menu transitions and a small
  image scale on hover, all disabled under `prefers-reduced-motion`.

Three design taste skills were installed into the repository partway through the
build. Their craft guidance was adopted: macro whitespace, custom easing curves,
`IntersectionObserver` reveals, GPU safe animation, no emoji, no lorem, no AI
copywriting clichés. Where they conflicted with the brief they were overruled,
because the brief is the specification: no pill shaped CTAs, no glassmorphism, no
`rounded-[2rem]` cards, no mesh gradients, no dark theme.

---

## 6. Notable decisions

**The header is opaque.** It was briefly translucent with a `backdrop-blur`. A
`backdrop-filter` makes an element the containing block for fixed position
descendants, which collapsed the fixed mobile navigation panel to the height of
the header and made the mobile menu unusable. The blur is gone, which also
satisfies the no glassmorphism rule.

**The mega menu appears at 1280px, not 1024px.** Seven navigation items plus two
actions overflow a 1024px viewport by 86px. Between 1024px and 1279px the mobile
accordion is used instead. A responsive test asserts zero horizontal overflow at
eight widths from 360px to 1920px.

**Filter selection is React state mirrored to the URL.** Reading it back from the
router made every checkbox wait on a navigation before showing the change, which
is visible on a statically rendered route. The URL is kept in step with
`history.replaceState`, and `popstate` is handled, so sharing and the back button
both work.

**`dynamicParams = false` on every dynamic route.** Without it an unknown slug
rendered the not found body with a 200 status. Now it is a genuine 404.

**Storage state is read with `useSyncExternalStore`.** Reading `localStorage` or
`sessionStorage` inside an effect causes an extra render and trips the React
Compiler lint rules. `lib/hooks/use-browser-storage.ts` uses the API React
provides for external stores, which renders the server snapshot during hydration
and then switches, with no mismatch. The consent banner does not flash on repeat
visits as a result.

**Email failure does not fail a submission.** The buyer has a reference and the
inquiry is recorded server side. A delivery problem is an operational issue, not
a reason to make someone retype a seven step form.

---

## 7. Forms and security

The RFQ is seven steps with per step validation, a session draft that survives a
reload, and server returned field errors merged back into the UI. Consent is
never restored from a draft: it has to be given again each time.

Every public endpoint runs the same guard chain in `lib/security/submission-guard.ts`
before any work with side effects:

1. Rate limit per client and endpoint.
2. Honeypot field, hidden from sight, from assistive technology and from the tab
   order.
3. Minimum completion time, from a timestamp set on mount.
4. Turnstile, when configured.
5. Zod validation, which is the real trust boundary.
6. Duplicate fingerprint check, so a double click does not create two inquiries.

Uploads are validated on both the extension and the declared MIME type, so a
renamed executable is rejected rather than accepted on its extension. Executable
and script extensions are refused explicitly rather than merely being absent from
the allowlist. Storage names are generated, never derived from user input, which
removes path traversal and overwrite risk. A malware scanning hook exists and
reports honestly that no scan ran, rather than a fake pass.

Rejections return a generic message. Telling an automated client which check it
failed helps it get past the next one.

---

## 8. WhatsApp

Added during the build at the owner's request, with the number supplied and
recorded as a verified fact.

Every WhatsApp link is built by `lib/utilities/whatsapp.ts`, so the number lives
in one place and every message opens with the same structure: the site name, the
page label, an optional product or capability name, and the URL. A floating
action appears on every page after a short delay, expanded once with a short
explanation and collapsible for the session. Inline actions sit in the hero, the
footer, the contact page and every page level call to action.

Only the location and page path reach analytics. Nothing about the visitor does.

---

## 9. Verification

```bash
npm run verify
```

Runs lint, type check, unit tests and a production build in sequence. Browser
tests are separate because they need a built server:

```bash
npm run build
npm run test:e2e
```

Latest results:

| Command | Result |
| --- | --- |
| `npm run lint` | Clean, no errors, no warnings |
| `npm run typecheck` | Clean |
| `npm run test` | 132 passed |
| `npm run build` | 103 routes generated |
| `npm run test:e2e` | 120 passed, 8 skipped by project |

The eight skips are the project specific guards: desktop only tests skipped on
the mobile project and the reverse.

Nothing is suppressed to make these pass. There are no disabled lint rules and no
TypeScript escape hatches in application code.

---

## 10. What is not built

Stated plainly rather than left to be discovered.

- **No CMS content exists.** The schemas, queries and adapter are complete and
  the site reads through them, but no Sanity project is connected.
- **No Sanity Studio is embedded.** Schemas use a local `defineType` helper with
  the same shape as Sanity's. Moving to a Studio is an install and an import
  change, documented in `docs/DEPLOYMENT.md`.
- **No malware scanner.** The hook exists; no service is wired to it.
- **No CRM integration.** `HUBSPOT_ACCESS_TOKEN` is reserved and unread.
- **No newsletter.** There is no email marketing integration, so there is no
  signup form. An inert form would be worse than none.
- **Rate limiting is per instance.** In memory and reset on restart. Adequate for
  the common case; swap `consume` in `lib/security/rate-limit.ts` for a Redis
  backed implementation if a hard cross instance guarantee is needed.
- **Legal pages are drafts.** Written to describe what this site actually does,
  and labelled on the page as pending legal review.
