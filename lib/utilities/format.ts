/** Formats an ISO date for display, falling back to the raw value if unparsable. */
export function formatDate(iso: string, locale = "en-GB"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Formats a piece count with thousands separators. */
export function formatQuantity(value: number, locale = "en-GB"): string {
  return new Intl.NumberFormat(locale).format(value);
}

/** Truncates text on a word boundary, used for meta descriptions. */
export function truncate(value: string, max = 158): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}...`;
}
