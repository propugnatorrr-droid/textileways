import Link from "next/link";
import type { BreadcrumbEntry } from "@/lib/seo/structured-data";

/** Visible breadcrumb trail. Pairs with BreadcrumbList structured data. */
export function Breadcrumbs({ entries }: { entries: BreadcrumbEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-small">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-subtle">
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1;
          return (
            <li key={entry.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-ink-muted">
                  {entry.name}
                </span>
              ) : (
                <>
                  <Link
                    href={entry.path}
                    className="transition-colors duration-200 hover:text-forest"
                  >
                    {entry.name}
                  </Link>
                  <span aria-hidden="true" className="text-stone">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
