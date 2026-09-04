"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ProductFamily } from "@/content/types";
import { capabilityStatusLabels } from "@/content/types";
import { Media } from "@/components/content/media";
import { EmptyState, ButtonLink } from "@/components/ui";
import { cn } from "@/lib/utilities/cn";

/**
 * Products hub filtering.
 *
 * Selection lives in React state and is mirrored into the URL, so a filtered
 * view can be shared and the back button behaves as a visitor expects, while the
 * controls respond immediately. Controls are checkboxes inside grouped fieldsets
 * rather than a wall of pills, and narrow viewports use a disclosure drawer that
 * can be operated entirely from the keyboard.
 */

export interface FilterGroup {
  id: string;
  legend: string;
  options: { value: string; label: string }[];
}

export function ProductFilters({
  families,
  groups,
}: {
  families: ProductFamily[];
  groups: FilterGroup[];
}) {
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  /** Reads a selection out of a query string. */
  const parseSelection = useCallback(
    (params: URLSearchParams): Record<string, string[]> => {
      const map: Record<string, string[]> = {};
      for (const group of groups) {
        const raw = params.get(group.id);
        map[group.id] = raw ? raw.split(",").filter(Boolean) : [];
      }
      return map;
    },
    [groups],
  );

  /*
   * Selection is React state, seeded once from the query string.
   *
   * The URL is kept in step with history.replaceState rather than a router
   * navigation. A navigation round trip would make the controls wait on the
   * router before showing the change, and on a statically rendered route that
   * delay is visible. Sharing and the back button still work: the URL always
   * reflects the current selection, and popstate is handled below.
   */
  const [selected, setSelected] = useState<Record<string, string[]>>(() =>
    parseSelection(new URLSearchParams(searchParams.toString())),
  );

  /* Keep the controls in step when the visitor uses the back or forward button. */
  useEffect(() => {
    const onPopState = () => {
      setSelected(parseSelection(new URLSearchParams(window.location.search)));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [parseSelection]);

  const activeCount = Object.values(selected).reduce((total, list) => total + list.length, 0);

  /** Mirrors a selection into the address bar without a navigation. */
  const syncUrl = useCallback(
    (next: Record<string, string[]>) => {
      const params = new URLSearchParams();
      for (const group of groups) {
        const values = next[group.id] ?? [];
        if (values.length > 0) params.set(group.id, values.join(","));
      }
      const query = params.toString();
      window.history.replaceState(null, "", query ? `/products?${query}` : "/products");
    },
    [groups],
  );

  const updateFilter = useCallback(
    (groupId: string, value: string, checked: boolean) => {
      setSelected((current) => {
        const values = new Set(current[groupId] ?? []);
        if (checked) values.add(value);
        else values.delete(value);
        return { ...current, [groupId]: Array.from(values) };
      });
    },
    [],
  );

  const reset = useCallback(() => {
    setSelected(Object.fromEntries(groups.map((group) => [group.id, [] as string[]])));
  }, [groups]);

  /* One place writes the URL, whichever way the selection changed. */
  useEffect(() => {
    syncUrl(selected);
  }, [selected, syncUrl]);

  const visible = useMemo(() => {
    return families.filter((family) => {
      for (const group of groups) {
        const chosen = selected[group.id] ?? [];
        if (chosen.length === 0) continue;

        const facetValues = facetValuesFor(family, group.id);
        const matches = chosen.some((value) => facetValues.includes(value));
        if (!matches) return false;
      }
      return true;
    });
  }, [families, groups, selected]);

  const filterPanel = (
    <div className="space-y-8">
      {groups.map((group) => (
        <fieldset key={group.id}>
          <legend className="mb-3 w-full border-b border-line pb-2.5 text-label font-medium uppercase tracking-[0.09em] text-ink-subtle">
            {group.legend}
          </legend>
          <div className="space-y-2.5">
            {group.options.map((option) => {
              const checked = (selected[group.id] ?? []).includes(option.value);
              return (
                <label
                  key={option.value}
                  className="flex min-h-[28px] cursor-pointer items-start gap-3 text-small text-ink-muted"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) =>
                      updateFilter(group.id, option.value, event.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer border border-line-strong accent-[var(--color-forest)]"
                  />
                  <span className={checked ? "text-ink" : undefined}>{option.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      <button
        type="button"
        onClick={reset}
        disabled={activeCount === 0}
        className="min-h-[44px] w-full rounded-[3px] border border-line-strong px-4 text-small font-medium text-ink transition-colors duration-200 hover:border-ink disabled:cursor-not-allowed disabled:opacity-50"
      >
        Reset filters
      </button>
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-16">
      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={drawerOpen}
          aria-controls="product-filter-drawer"
          onClick={() => setDrawerOpen((open) => !open)}
          className="flex min-h-[48px] w-full items-center justify-between rounded-[3px] border border-line-strong px-5 text-small font-medium text-ink"
        >
          <span>Filter products</span>
          <span className="text-ink-subtle">
            {activeCount > 0 ? `${activeCount} active` : "None active"}
          </span>
        </button>
        <div
          id="product-filter-drawer"
          hidden={!drawerOpen}
          className="mt-6 border border-line bg-cotton/40 p-5"
        >
          {filterPanel}
        </div>
      </div>

      <aside aria-label="Product filters" className="hidden lg:block">
        <div className="lg:sticky lg:top-28">{filterPanel}</div>
      </aside>

      <div>
        <p role="status" className="mb-6 text-small text-ink-subtle">
          {visible.length === families.length
            ? `Showing all ${families.length} product families`
            : `Showing ${visible.length} of ${families.length} product families`}
        </p>

        {visible.length === 0 ? (
          <EmptyState
            title="No product families match those filters"
            description="Try removing a filter, or tell us what you need to make and we will confirm whether it is something we can produce."
            action={
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex min-h-[48px] items-center rounded-[3px] border border-forest bg-forest px-6 text-small font-medium text-paper"
                >
                  Reset filters
                </button>
                <ButtonLink href="/contact" variant="secondary">
                  Ask about a product
                </ButtonLink>
              </div>
            }
          />
        ) : (
          <ul className="grid gap-px bg-line sm:grid-cols-2">
            {visible.map((family) => (
              <li key={family.slug} className="bg-paper">
                <Link
                  href={`/products/${family.slug}`}
                  className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-cotton/60"
                >
                  <Media
                    asset={family.hero}
                    aspect="aspect-[4/3]"
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 92vw"
                    zoomOnHover
                  />
                  <h2 className="mt-6 text-body font-semibold transition-colors duration-200 group-hover:text-forest">
                    {family.name}
                  </h2>
                  <p className="mt-2.5 flex-1 text-small leading-relaxed text-ink-muted">
                    {family.summary}
                  </p>
                  <p className={cn("mt-5 text-label uppercase tracking-[0.09em] text-ink-subtle")}>
                    {capabilityStatusLabels[family.capabilityStatus]}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** Maps a filter group id onto the matching facet values on a product family. */
function facetValuesFor(family: ProductFamily, groupId: string): string[] {
  switch (groupId) {
    case "industry":
      return family.facets.industries;
    case "material":
      return family.facets.materialTypes;
    case "decoration":
      return family.facets.decoration;
    case "market":
      return family.facets.markets;
    case "status":
      return [family.capabilityStatus];
    default:
      return [];
  }
}
