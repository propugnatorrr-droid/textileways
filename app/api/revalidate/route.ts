import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Protected revalidation endpoint for CMS webhooks.
 *
 * Two authentication modes are supported, in order of preference:
 *
 * 1. HMAC signature. When the caller sends `x-sanity-signature`, the raw body is
 *    verified against SANITY_REVALIDATE_SECRET using a constant time comparison.
 * 2. Shared secret header. When no signature is present, `x-revalidate-secret`
 *    must match the same secret exactly, again compared in constant time.
 *
 * If no secret is configured the endpoint returns 503 rather than revalidating,
 * so an unprotected deployment cannot be used to force cache invalidation.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Constant time string comparison that tolerates differing lengths. */
function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

function verifySignature(rawBody: string, signature: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const provided = signature.replace(/^sha256=/, "").trim();
  return safeEqual(expected, provided);
}

/** Maps a Sanity document type onto the tags and paths it affects. */
function targetsFor(documentType: string | undefined, slug: string | undefined) {
  const tags = new Set<string>(["cms"]);
  const paths = new Set<string>();

  switch (documentType) {
    case "productCategory":
      tags.add("products");
      paths.add("/products");
      if (slug) paths.add(`/products/${slug}`);
      paths.add("/");
      break;
    case "capability":
      tags.add("capabilities");
      paths.add("/capabilities");
      if (slug) paths.add(`/capabilities/${slug}`);
      break;
    case "material":
      tags.add("materials");
      paths.add("/materials");
      if (slug) paths.add(`/materials/${slug}`);
      break;
    case "article":
      tags.add("articles");
      paths.add("/insights");
      if (slug) paths.add(`/insights/${slug}`);
      paths.add("/");
      break;
    case "caseStudy":
      tags.add("case-studies");
      paths.add("/case-studies");
      if (slug) paths.add(`/case-studies/${slug}`);
      break;
    case "certificate":
      tags.add("certificates");
      paths.add("/certifications");
      break;
    case "faq":
      tags.add("faqs");
      paths.add("/faq");
      break;
    case "siteSettings":
      paths.add("/");
      break;
    default:
      /* Unknown type: refresh the shared tag only, never the whole site. */
      break;
  }

  return { tags: Array.from(tags), paths: Array.from(paths) };
}

export async function POST(request: Request): Promise<NextResponse> {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    console.error("[revalidate] rejected: secret not configured");
    return NextResponse.json(
      { ok: false, error: "Revalidation is not configured." },
      { status: 503 },
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-sanity-signature");
  const headerSecret = request.headers.get("x-revalidate-secret");

  const authenticated = signature
    ? verifySignature(rawBody, signature, secret)
    : Boolean(headerSecret && safeEqual(headerSecret, secret));

  if (!authenticated) {
    console.error("[revalidate] rejected: authentication failed");
    return NextResponse.json({ ok: false, error: "Not authorised." }, { status: 401 });
  }

  let body: { _type?: string; slug?: { current?: string } | string } = {};
  try {
    body = rawBody.length > 0 ? JSON.parse(rawBody) : {};
  } catch {
    console.error("[revalidate] rejected: invalid JSON body");
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }

  const slug = typeof body.slug === "string" ? body.slug : body.slug?.current;
  const { tags, paths } = targetsFor(body._type, slug);

  /* Next.js 16 requires a cacheLife profile as the second argument. */
  for (const tag of tags) revalidateTag(tag, "max");
  for (const path of paths) revalidatePath(path);

  return NextResponse.json({
    ok: true,
    revalidated: { tags, paths },
    documentType: body._type ?? null,
  });
}
