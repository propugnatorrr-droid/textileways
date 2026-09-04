# Deployment

Target platform: Vercel. The site builds and runs with no environment variables
set, so it can be deployed first and configured afterwards.

---

## 1. Before you start

You will need:

- A GitHub, GitLab or Bitbucket repository containing this project
- A Vercel account
- Access to the DNS for `textileways.com`
- The email account details, if email is currently on cPanel

> **The most important rule on this page.** Pointing the website at Vercel does
> not require changing MX records. Email and website use different record types.
> See section 9.

---

## 2. Create the Vercel project

1. Push this repository to your git provider.
2. In Vercel, choose **Add New** then **Project**, and import the repository.
3. Vercel detects Next.js. The defaults are correct:
   - Framework preset: Next.js
   - Build command: `next build`
   - Output directory: `.next`
   - Install command: `npm install`
   - Node version: 20 or later
4. Deploy. The first build succeeds with no environment variables, using the
   repository's fallback content.

Once connected, every push to the default branch deploys to production and every
other branch and pull request gets its own preview URL.

---

## 3. Environment variables

Set these in **Settings** then **Environment Variables**. `.env.example` in the
repository root documents each one.

Add each variable to Production, Preview and Development unless noted.

### 3.1 Required before launch

| Variable | Value | Environments |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.textileways.com` | Production |
| `NEXT_PUBLIC_SITE_URL` | The Vercel preview URL, or leave unset | Preview |
| `RESEND_API_KEY` | From Resend | All |
| `RFQ_FROM_EMAIL` | `Textileways <inquiries@textileways.com>` | All |
| `RFQ_TO_EMAIL` | Who receives inquiries, comma separated for several | All |

### 3.2 Strongly recommended

| Variable | Value | Environments |
| --- | --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | From Cloudflare Turnstile | All |
| `TURNSTILE_SECRET_KEY` | From Cloudflare Turnstile | All |
| `BLOB_READ_WRITE_TOKEN` | Added automatically when you create a Blob store | All |

### 3.3 Optional

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | Connect a CMS |
| `SANITY_API_READ_TOKEN` | Read drafts or a private dataset |
| `SANITY_REVALIDATE_SECRET` | Protect the revalidation webhook |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID` | Analytics, loaded only after consent |
| `HUBSPOT_ACCESS_TOKEN` | Reserved, not yet read by anything |

Changing an environment variable does not rebuild the site. Redeploy from the
**Deployments** tab afterwards.

---

## 4. Email with Resend

1. Create an account at [resend.com](https://resend.com).
2. **Domains** then **Add Domain**, and enter `textileways.com`.
3. Resend shows DNS records to add. They are **TXT and CNAME records only**:
   - A `TXT` record for DKIM
   - A `TXT` record for SPF, or an addition to an existing SPF record
   - Optionally a `CNAME` for click and open tracking
4. Add them at your DNS provider. **Do not touch MX records.**
5. Wait for Resend to show the domain as verified. This usually takes minutes.
6. Create an API key under **API Keys** and set it as `RESEND_API_KEY`.
7. Set `RFQ_FROM_EMAIL` to an address on the verified domain.
8. Set `RFQ_TO_EMAIL` to the internal recipients.

### If you already have an SPF record

You will have one TXT record starting `v=spf1`. Do not add a second. Merge
Resend's include into the existing record instead:

```text
v=spf1 include:_spf.your-existing-host.com include:amazonses.com ~all
```

Two SPF records cause both to fail.

### Verifying delivery

After deploying with these set, submit the contact form on the live site. You
should receive the internal notification, and the address you entered should
receive a confirmation. If neither arrives, check the Resend logs first: they
report rejections that are invisible from the website.

---

## 5. Attachment storage

1. In Vercel, open **Storage** then **Create Database** and choose **Blob**.
2. Connect it to this project. Vercel sets `BLOB_READ_WRITE_TOKEN` for you.
3. Redeploy.

Without this, the RFQ form declines attachments with an explanation and the
inquiry can still be submitted. With it, files are validated, given generated
storage names and linked in the internal notification email.

To use different storage, implement the `AttachmentStorage` interface in
`lib/storage/attachments.ts`. No route handler changes are required.

---

## 6. Spam protection with Turnstile

1. Go to the Cloudflare dashboard, then **Turnstile**.
2. Add a widget. Set the domain to `textileways.com`, and add
   `*.vercel.app` if you want it active on previews.
3. Widget mode: **Managed**.
4. Copy the site key to `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the secret key to
   `TURNSTILE_SECRET_KEY`.
5. Redeploy.

Behaviour is deliberate: with no secret set, verification is skipped and the fact
is logged, so forms work before Turnstile exists. Once the secret is set, a valid
token becomes mandatory. The honeypot, timing check, rate limit and Zod
validation apply either way.

---

## 7. Sanity CMS, optional

The site runs on typed fallback content in `content/fallback`. Connect Sanity
when the business wants to edit content without a deploy.

### 7.1 Create the project

```bash
npm create sanity@latest -- --project-plan free
```

Create it in a separate directory or a `studio/` subdirectory. Note the project
id and dataset name.

### 7.2 Register the schemas

The schemas in `sanity/schemas` are already in Sanity's format. They import
`defineType` and `defineField` from a local helper so this website does not carry
the Studio dependency.

1. In the Studio project, install dependencies as normal.
2. Copy `sanity/schemas/documents.ts` and `sanity/schemas/index.ts` across.
3. Change the import at the top of `documents.ts` from:
   ```ts
   import { defineType, defineField, type ValidationRule } from "../lib/define";
   ```
   to:
   ```ts
   import { defineType, defineField } from "sanity";
   ```
   and remove the `ValidationRule` type annotations, which Sanity supplies.
4. Register them in `sanity.config.ts`:
   ```ts
   import { schemaTypes } from "./schemas";
   export default defineConfig({ schema: { types: schemaTypes } });
   ```

### 7.3 Connect the website

Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`, then
redeploy. The content layer in `lib/cms/content.ts` prefers CMS content and falls
back to the repository content per collection, so you can migrate one document
type at a time.

Add `SANITY_API_READ_TOKEN` only if the dataset is private.

### 7.4 Revalidation webhook

1. Generate a secret: `openssl rand -hex 32`
2. Set it as `SANITY_REVALIDATE_SECRET` in Vercel and redeploy.
3. In Sanity, go to **API** then **Webhooks** and create one:
   - URL: `https://www.textileways.com/api/revalidate`
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - HTTP method: POST
   - Secret: the value from step 1
   - Projection: `{_type, slug}`

The endpoint accepts either an HMAC signature in `x-sanity-signature` or the
shared secret in `x-revalidate-secret`, both compared in constant time. Without a
configured secret it returns 503 rather than revalidating, so an unprotected
deployment cannot be used to force cache invalidation.

---

## 8. Custom domain

1. In Vercel, open **Settings** then **Domains**.
2. Add `textileways.com` and `www.textileways.com`.
3. Choose which is canonical. This site is configured for `www`, so set
   `textileways.com` to redirect to `www.textileways.com`.
4. Vercel shows the DNS records to add. See section 9.
5. Vercel provisions the TLS certificate automatically once DNS resolves.
6. Confirm `NEXT_PUBLIC_SITE_URL` matches the canonical domain exactly.

---

## 9. DNS, and keeping cPanel email working

**Read this before changing any DNS record.**

A domain's DNS holds different record types for different services. Website
traffic uses `A` and `CNAME` records. Email routing uses `MX` records. They are
independent.

Pointing the website at Vercel means changing `A` and `CNAME` records only. If
you also delete or replace the `MX` records, email stops working immediately.

### Records to change

| Type | Name | Value | Purpose |
| --- | --- | --- | --- |
| `A` | `@` | `76.76.21.21` | Apex domain to Vercel |
| `CNAME` | `www` | `cname.vercel-dns.com` | Subdomain to Vercel |

Use the exact values Vercel shows you; the ones above are its documented
defaults and can change.

### Records to leave alone

| Type | Name | Why |
| --- | --- | --- |
| `MX` | `@` | Routes incoming email. Changing this breaks email. |
| `TXT` | `@` (SPF) | Authorises senders. Merge, do not replace. |
| `TXT` | `_dmarc` | DMARC policy. |
| `TXT` or `CNAME` | DKIM selectors | Signs outgoing email. |
| `A` or `CNAME` | `mail`, `webmail`, `cpanel` | Mail client and control panel access. |

### Before and after

Record the current DNS zone before making changes:

```bash
dig textileways.com MX +short
dig textileways.com TXT +short
dig www.textileways.com CNAME +short
```

Save the output. After the change, run the MX and TXT queries again and confirm
they are unchanged. Then send a test email to and from an address on the domain.

If the DNS is currently hosted at cPanel and you move it to another provider,
you must copy every existing record across, not just the website ones. This is
the single most common way email is lost during a website migration.

---

## 10. Previews and production

- Every branch and pull request gets a preview URL automatically.
- Previews are disallowed in `robots.txt`: `app/robots.ts` returns a blanket
  disallow when `VERCEL_ENV` is set to anything other than `production`, so a
  preview cannot be indexed or compete with the live site.
- Merging to the default branch deploys to production.
- Set `NEXT_PUBLIC_SITE_URL` per environment so canonical URLs are correct.

---

## 11. Rollback

1. Open **Deployments** in the Vercel dashboard.
2. Find the last known good deployment.
3. Choose the menu next to it, then **Promote to Production**.

This is instant and does not rebuild. It restores the code, not the environment
variables or CMS content, so if the problem was a variable change or a published
document, fix that too.

---

## 12. Monitoring

Recommended, in order of value:

1. **Vercel runtime logs.** Server side failures are logged with an endpoint and
   a short reason code, and never with buyer data. Filter for `[rfq]`,
   `[contact]`, `[sample]`, `[revalidate]` and `[cms]`.
2. **Resend logs.** The authoritative record of whether email was delivered.
3. **Vercel Analytics or Speed Insights.** Real user Core Web Vitals.
4. **Uptime check.** Any external service polling `https://www.textileways.com/`.
5. **Error tracking.** If you add Sentry or similar, the route error boundary in
   `app/error.tsx` already surfaces a digest reference to the visitor, which
   makes support requests traceable.

---

## 13. Post deploy verification

Run through this after the first production deploy, and after any DNS change.

```bash
# Correct canonical host and a 200
curl -sI https://www.textileways.com | head -3

# Apex redirects to www
curl -sI https://textileways.com | grep -i location

# Robots and sitemap
curl -s https://www.textileways.com/robots.txt
curl -s https://www.textileways.com/sitemap.xml | head -20

# A real page, and a genuine 404
curl -s -o /dev/null -w "%{http_code}\n" https://www.textileways.com/products/streetwear
curl -s -o /dev/null -w "%{http_code}\n" https://www.textileways.com/products/not-real

# Security headers
curl -sI https://www.textileways.com | grep -iE "content-security-policy|x-frame-options|strict-transport"

# Email untouched
dig textileways.com MX +short
```

Then, in a browser:

1. Submit the contact form and confirm both emails arrive.
2. Complete the RFQ form with an attachment and confirm the file link works.
3. Open the site on a phone and check the menu, the forms and the WhatsApp
   action.
4. Paste the homepage URL into a social composer and check the preview image.
5. Run the homepage and a product page through the Rich Results Test.
