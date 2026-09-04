# Textileways

Production website for Textileways, a Pakistan based textile and apparel
manufacturer serving buyers in the USA and Europe.

> One manufacturing partner. Every textile possibility.
> Start at 50. Scale beyond 100,000.

---

## Getting started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000` with no configuration. It uses the typed
fallback content in `content/fallback`, so there is nothing to set up before you
can see every page.

To configure email, storage, spam protection or a CMS, copy `.env.example` to
`.env.local` and fill in what you need. Each variable documents what happens when
it is absent.

---

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, strict |
| `npm run test` | Unit tests, Vitest |
| `npm run test:e2e` | Browser tests, Playwright, needs a build first |
| `npm run verify` | Lint, type check, unit tests and build in sequence |

Before the first `npm run test:e2e`:

```bash
npm run test:e2e:install
```

---

## Where things are

| Path | Contents |
| --- | --- |
| `app/(marketing)` | Every public page |
| `app/api` | RFQ, sample request, contact and revalidation endpoints |
| `components` | UI, layout, navigation, sections, forms, content |
| `content/configuration` | Site config, company facts, navigation |
| `content/fallback` | All seeded content, used when no CMS is connected |
| `content/types` | The content model shared by the fallback and the CMS |
| `lib` | Validation, security, email, storage, analytics, SEO, CMS |
| `sanity` | Document schemas and GROQ queries |
| `tests` | Unit and browser tests |
| `docs` | Implementation, content requirements, launch checklist, deployment |

---

## Editing content

**Company facts.** `content/configuration/company-facts.ts` is the single
register of everything the site states about the business. Each entry has a
verification status, and anything not `verified` renders as nothing rather than
as a placeholder. This is the file to edit when the business confirms its legal
name, address, email or telephone number.

**Product families, capabilities, materials and the rest.** The files in
`content/fallback` are typed, so an editor gets an error at build time rather
than a broken page. Adding a product family means adding one entry; navigation,
the sitemap, filters and related content all pick it up.

**Photography.** Every media slot is declared in `content/fallback/media.ts` with
the shot it needs. Save the image as `public/images/<id>.jpg`, remove
`isPlaceholder: true`, and it switches to an optimised image automatically. Until
then a woven pattern panel renders with the brief printed beneath it.

---

## Content integrity

This site is built so that unverified claims cannot reach a page by accident.

- Facts render only when marked verified.
- Case studies render only with recorded customer permission and evidence.
- Certificates render only with a number, an issuer and an unexpired date, with
  status recomputed on every render.
- Every product family states truthfully whether it is made in house, through an
  audited partner, sourced to specification, or offered after technical review.
- No production capacity, employee count, delivery percentage or defect rate is
  published, and `/responsibility` explains why.

These rules are covered by unit tests, including one asserting that no seeded
copy contains an em dash or en dash.

---

## Documentation

| Document | Read it when |
| --- | --- |
| [docs/IMPLEMENTATION.md](docs/IMPLEMENTATION.md) | You want to understand how the site is built and why |
| [docs/CONTENT_REQUIREMENTS.md](docs/CONTENT_REQUIREMENTS.md) | You are gathering assets and facts from the business |
| [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) | You are preparing to go live |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | You are deploying, or changing DNS |

If you are changing DNS, read section 9 of the deployment guide first. Pointing
the website at Vercel does not require changing MX records, and changing them
would break email.
