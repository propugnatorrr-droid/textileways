/**
 * Renders JSON LD.
 *
 * The payload is serialised with `JSON.stringify` and the closing script
 * sequence is escaped, which prevents content from breaking out of the script
 * element even if a CMS field later contains markup.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\u003c");

  return (
    <script
      type="application/ld+json"
      // The value is JSON produced above, not user supplied markup.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
