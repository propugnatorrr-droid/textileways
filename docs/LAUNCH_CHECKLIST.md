# Launch checklist

Work top to bottom. Anything marked **Blocker** should stop a launch.

Items already satisfied by the build are ticked, with a note saying how they were
verified. Everything unticked needs a person, a credential or an asset.

---

## 1. Content

| # | Item | Status | Note |
| --- | --- | --- | --- |
| 1.1 | Company facts verified | Partial. **Blocker** | Five facts verified from the brief plus the WhatsApp number. Legal name, registration number, address, sales email and telephone are outstanding. See `docs/CONTENT_REQUIREMENTS.md` section 5. |
| 1.2 | Contact details verified | Outstanding. **Blocker** | WhatsApp is live. Sales email and telephone are not published rather than being placeholders. |
| 1.3 | Certificates verified | Outstanding | Registry is empty and says so. Nothing false is published, so this is not a blocker unless a certification is being claimed commercially. |
| 1.4 | Images replaced | Outstanding | 35 placeholder slots, each with a written brief. `editorial/home-hero` matters most. |
| 1.5 | Alt text reviewed | Done | Every slot has alt text written for the intended photograph. Re-read it after real images land. |
| 1.6 | Legal pages approved | Outstanding. **Blocker** | Drafts describe what this site actually does. They are labelled as pending review on the page. A qualified adviser must approve them. |
| 1.7 | No demo case studies published | Done | None exist. Enforced by `evidenceStatus`, by `generateStaticParams` and by unit tests. |
| 1.8 | No fake testimonials | Done | None exist. Asserted by a unit test. |
| 1.9 | No unverified customer logos | Done | None are displayed anywhere. |
| 1.10 | Copy reviewed by the business | Outstanding | Read `/about`, `/why-textileways`, `/quality` and `/responsibility` in particular. Correct anything that misstates how the business actually works. |
| 1.11 | No em dashes or en dashes in public copy | Done | Asserted by a unit test across all seeded copy. |

---

## 2. Configuration

| # | Item | Status | Note |
| --- | --- | --- | --- |
| 2.1 | `NEXT_PUBLIC_SITE_URL` set for production | Outstanding. **Blocker** | Canonical URLs, the sitemap and social images depend on it. |
| 2.2 | Resend account and verified domain | Outstanding. **Blocker** | TXT and CNAME records only. Never change MX. |
| 2.3 | `RESEND_API_KEY`, `RFQ_FROM_EMAIL`, `RFQ_TO_EMAIL` set | Outstanding. **Blocker** | Without these, inquiries are logged rather than emailed. |
| 2.4 | Turnstile keys set | Outstanding | Strongly recommended before the site is publicised. |
| 2.5 | `BLOB_READ_WRITE_TOKEN` set | Outstanding | Needed for RFQ attachments. Without it, uploads are declined with an explanation. |
| 2.6 | Analytics ids set | Optional | Nothing loads until a visitor accepts. |
| 2.7 | Sanity connected | Optional | The site runs on repository content until then. |
| 2.8 | `SANITY_REVALIDATE_SECRET` set | Only with a CMS | The endpoint returns 503 without it, which is the safe default. |

---

## 3. Technical

| # | Item | Status | Note |
| --- | --- | --- | --- |
| 3.1 | Build passing | Done | `npm run build`, 103 routes generated. |
| 3.2 | Lint passing | Done | `npm run lint`, no errors, no warnings, nothing suppressed. |
| 3.3 | Type check passing | Done | `npm run typecheck` clean under strict mode. |
| 3.4 | Unit tests passing | Done | 132 tests. |
| 3.5 | Browser tests passing | Done | 120 tests across desktop and mobile projects. |
| 3.6 | Forms delivering | Outstanding. **Blocker** | Verify on the live site after 2.3. Submit the contact form and confirm both emails arrive. |
| 3.7 | Uploads working | Outstanding | Verify after 2.5 by attaching a PDF to a real RFQ and opening the link in the notification. |
| 3.8 | Spam protection working | Partial | Honeypot, timing, rate limit and validation are live and tested. Turnstile activates with 2.4. |
| 3.9 | Analytics working | Optional | Accept the banner, then confirm events arrive. |
| 3.10 | Consent working | Done | Banner only appears when an analytics id exists. Choice persists and is changeable from the footer. |
| 3.11 | Sitemap working | Done | `/sitemap.xml` built from live content. Verified in a browser test. |
| 3.12 | Robots working | Done | Previews are disallowed automatically. Verified in a browser test. |
| 3.13 | Canonicals correct | Done | Every route sets one. Verified in a browser test. Recheck after 2.1. |
| 3.14 | Redirects correct | Outstanding | Set the apex to www redirect in Vercel. If replacing an existing site, map its old URLs before switching DNS. |
| 3.15 | 404 working | Done | Custom page, correct 404 status for unknown routes and unknown slugs. Verified in browser tests. |
| 3.16 | Error logging working | Partial | Server failures log an endpoint and a reason code with no buyer data. Add an error tracking service if you want alerting. |
| 3.17 | Domain configured | Outstanding. **Blocker** | See `docs/DEPLOYMENT.md` section 8. |
| 3.18 | SSL working | Automatic | Vercel provisions the certificate once DNS resolves. |
| 3.19 | Email DNS preserved | Outstanding. **Blocker** | Record MX and TXT before the change, confirm unchanged after, and send a test email both ways. |
| 3.20 | Security headers present | Done | CSP, HSTS, frame options, referrer policy and permissions policy set in `next.config.ts`. |
| 3.21 | Dependency vulnerabilities reviewed | Done at build time | Re-run `npm audit` immediately before launch. |

---

## 4. Quality

| # | Item | Status | Note |
| --- | --- | --- | --- |
| 4.1 | Mobile tested | Done | Playwright mobile project plus overflow assertions at 360, 390, 430, 768, 1024, 1280, 1440 and 1920. |
| 4.2 | No horizontal overflow | Done | Asserted at all eight widths. |
| 4.3 | Keyboard tested | Done | Skip link, focus outlines, mega menu Escape and outside click, mobile focus trap, keyboard operable filters. |
| 4.4 | Accessibility reviewed | Partial | Semantic markup, labelled controls, error summaries, reduced motion support and announced status messages are built and partly asserted. Run an automated audit against the live site and, ideally, a screen reader pass. |
| 4.5 | Colour contrast checked | Done by design | Palette chosen for AA on paper and cotton grounds. Recheck if brand colours replace it. |
| 4.6 | Performance reviewed | Outstanding | Run Lighthouse against production. Static generation, `next/font`, `next/image` and small client bundles are in place; real numbers need real images. |
| 4.7 | Browser testing complete | Partial | Chromium desktop and mobile are automated. Check Safari and Firefox manually. |
| 4.8 | Social previews checked | Outstanding | Generated Open Graph image is in place. Paste the live URL into LinkedIn and WhatsApp after 2.1. |
| 4.9 | Structured data validated | Partial | Types and absence of false Product fields are asserted in a browser test. Run the live URLs through the Rich Results Test. |
| 4.10 | No broken links | Done for internal links | Every internal reference resolves, asserted by unit tests. Recheck after any CMS content is added. |
| 4.11 | No console errors | Done | Asserted on the homepage in a browser test. |

---

## 5. WhatsApp

| # | Item | Status | Note |
| --- | --- | --- | --- |
| 5.1 | Number correct and monitored | Done, needs confirmation | +92 336 260 5238. Confirm the account is actively watched during business hours. |
| 5.2 | Prefilled message reviewed | Done | Opens with the site name, the page, an optional product name and the URL. Verified in a browser test. |
| 5.3 | Business hours stated | Done | The floating card says replies come during Pakistan business hours. Change the wording if that is wrong. |
| 5.4 | WhatsApp Business profile complete | Outstanding | Set the business name, description and hours in the WhatsApp Business app so the profile matches the site. |

---

## 6. Minimum to launch

The shortest path from here to a site that can receive real inquiries:

1. Supply the sales email address and RFQ recipients. *(1.2)*
2. Create the Resend account, verify the domain with TXT and CNAME records only,
   set the three email variables. *(2.2, 2.3)*
3. Set `NEXT_PUBLIC_SITE_URL`. *(2.1)*
4. Supply the registered legal company name. *(1.1)*
5. Have the legal pages reviewed. *(1.6)*
6. Record the DNS zone, point the website records at Vercel, confirm MX is
   unchanged, send a test email. *(3.17, 3.19)*
7. Submit the contact form on the live site and confirm both emails arrive.
   *(3.6)*

Everything else improves the site. These seven make it real.

---

## 7. Immediately after launch

1. Submit a real RFQ end to end and confirm the reference, both emails and any
   attachment link.
2. Watch the Vercel runtime logs for the first day for anything logged with a
   `[rfq]`, `[contact]` or `[sample]` prefix.
3. Submit the sitemap in Google Search Console.
4. Check that the WhatsApp number is receiving messages and that the prefilled
   text reads sensibly on a real phone.
5. Set a reminder to replace the placeholder photography. It is the single
   largest remaining gap between this site and a fully credible one.
