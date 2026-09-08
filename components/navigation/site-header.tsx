"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { primaryNavigation, type NavItem } from "@/content/configuration/navigation";
import { siteConfig } from "@/content/configuration/site";
import { cn } from "@/lib/utilities/cn";
import { track } from "@/lib/analytics/track";
import { Wordmark } from "@/components/layout/wordmark";
import { WhatsappGlyph } from "@/components/layout/whatsapp-button";
import { whatsappHref, labelForPath } from "@/lib/utilities/whatsapp";

/**
 * Site header.
 *
 * White and sticky, gaining a hairline and a soft shadow once the page scrolls.
 * Mega menus open as contained rounded panels sized to their content rather
 * than as full width dropdowns.
 *
 * Behaviour preserved from the original implementation: keyboard accessible
 * menus, Escape to close, outside click and outside focus to close, a focus
 * trap in the mobile panel, and menus that close on route change.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement | null>(null);

  /*
   * Close every menu when the route changes.
   *
   * This is the "adjusting state during render" pattern React documents for
   * deriving state from a prop change. It is preferred over an effect here
   * because it avoids rendering the open menu for one frame on the new page.
   */
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  /*
   * Solid header once the hero has scrolled past.
   *
   * The initial position is read inside requestAnimationFrame rather than in the
   * effect body. That matters when a visitor reloads part way down a page: it
   * still picks up the correct state, without forcing a layout read during the
   * commit phase.
   */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const frame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Escape closes the open mega menu or the mobile panel. */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        mobileTriggerRef.current?.focus();
        return;
      }
      if (openMenu) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, openMenu]);

  /* Clicking or focusing outside the desktop nav closes the mega menu. */
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [openMenu]);

  /* Lock body scroll and trap focus while the mobile panel is open. */
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = mobilePanelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !panel) return;
      const items = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const isActive = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname],
  );

  const onQuoteClick = useCallback((location: string) => {
    track("quote_cta_click", { cta_location: location });
  }, []);

  const solid = scrolled || openMenu !== null || mobileOpen;

  /* Prefilled with the page the visitor is currently on. */
  const whatsappLink = whatsappHref({
    pageLabel: labelForPath(pathname),
    path: pathname,
  });

  return (
    <header
      /*
       * The background stays fully opaque. A backdrop-filter here would make the
       * header a containing block for fixed position descendants, which collapses
       * the fixed mobile navigation panel to the height of the header.
       */
      className={cn(
        "sticky top-0 z-40 border-b bg-white transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        solid
          ? "border-line shadow-[0_8px_30px_rgba(11,15,13,0.055)]"
          : "border-transparent",
      )}
    >
      <div className="tw-container">
        <div className="flex h-[72px] items-center justify-between gap-6 lg:h-[76px]">
          <Link
            href="/"
            className="shrink-0"
            aria-label={`${siteConfig.name} home`}
            onClick={() => setOpenMenu(null)}
          >
            <Wordmark className="h-[26px] lg:h-[29px]" />
          </Link>

          <div ref={navRef} className="hidden flex-1 xl:flex xl:items-center xl:pl-6">
            <nav aria-label="Primary">
              <ul className="flex items-center gap-0.5">
                {primaryNavigation.map((item) => (
                  <DesktopNavItem
                    key={item.label}
                    item={item}
                    active={isActive(item.href)}
                    open={openMenu === item.label}
                    onToggle={() =>
                      setOpenMenu((current) => (current === item.label ? null : item.label))
                    }
                    onClose={() => setOpenMenu(null)}
                  />
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {whatsappLink ? (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("whatsapp_click", { cta_location: "header", page: pathname })
                }
                className="hidden h-10 w-10 items-center justify-center rounded-[10px] border border-line-strong text-forest transition-[background-color,border-color,transform] duration-150 hover:border-forest/40 hover:bg-forest-soft active:scale-[0.96] sm:inline-flex"
              >
                <span className="sr-only">Message us on WhatsApp</span>
                <WhatsappGlyph className="h-[19px] w-[19px]" />
              </a>
            ) : null}

            <Link
              href="/request-a-quote"
              onClick={() => onQuoteClick("header")}
              className="hidden min-h-10 items-center rounded-[10px] border border-forest bg-forest px-4.5 text-[15px] font-semibold text-white transition-[background-color,border-color,transform] duration-150 hover:border-forest-deep hover:bg-forest-deep active:scale-[0.97] sm:inline-flex"
            >
              Request a Quote
            </Link>

            <button
              ref={mobileTriggerRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-line-strong text-ink transition-colors duration-200 hover:bg-cotton xl:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <MobileNavigation
          panelRef={mobilePanelRef}
          onNavigate={() => setMobileOpen(false)}
          onQuoteClick={() => onQuoteClick("mobile_menu")}
          whatsappLink={whatsappLink}
          pathname={pathname}
        />
      ) : null}
    </header>
  );
}

/* -------------------------------------------------------------------------- */

function DesktopNavItem({
  item,
  active,
  open,
  onToggle,
  onClose,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const panelId = useId();

  if (!item.columns) {
    return (
      <li>
        <Link
          href={item.href}
          className={cn(
            "inline-flex min-h-[38px] items-center rounded-[10px] px-3 text-[15px] font-semibold tracking-[-0.006em] transition-colors duration-200",
            active ? "text-forest-deep" : "text-ink hover:bg-cotton",
          )}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="static">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          "inline-flex min-h-[38px] items-center gap-1.5 rounded-[10px] px-3 text-[15px] font-semibold tracking-[-0.006em] transition-colors duration-200",
          active || open ? "text-forest-deep" : "text-ink hover:bg-cotton",
        )}
      >
        {item.label}
        <ChevronIcon open={open} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className={cn(
          "absolute left-1/2 top-full -translate-x-1/2 pt-2.5",
          /* Width follows content. A single column menu stays narrow. */
          item.columns.length >= 3
            ? "w-[min(calc(100vw-32px),1180px)]"
            : item.columns.length === 2
              ? "w-[min(calc(100vw-32px),760px)]"
              : "w-[min(calc(100vw-32px),420px)]",
        )}
      >
        <div className="overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_24px_70px_rgba(11,15,13,0.13)]">
          <span aria-hidden="true" className="block h-[3px] bg-forest" />
          <div className="p-6 lg:p-7">
          {item.intro ? (
            <p className="mb-6 max-w-[70ch] text-small text-ink-subtle">{item.intro}</p>
          ) : null}
          <div
            className={cn(
              "grid gap-x-8 gap-y-7",
              item.columns.length >= 4
                ? "lg:grid-cols-4"
                : item.columns.length === 3
                  ? "lg:grid-cols-3"
                  : item.columns.length === 2
                    ? "sm:grid-cols-2"
                    : "grid-cols-1",
            )}
          >
            {item.columns.map((column) => (
              <div key={column.title}>
                <p className="mb-3 px-3 text-label font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                  {column.title}
                </p>
                <ul className="-mx-3 space-y-0.5">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group block rounded-[10px] px-3 py-2 text-[15px] font-semibold tracking-[-0.006em] text-ink transition-colors duration-200 hover:bg-cotton hover:text-forest-deep"
                      >
                        {link.label}
                        {link.description ? (
                          <span className="mt-0.5 block text-[13.5px] font-normal leading-snug text-ink-subtle">
                            {link.description}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </li>
  );
}

/* -------------------------------------------------------------------------- */

function MobileNavigation({
  panelRef,
  onNavigate,
  onQuoteClick,
  whatsappLink,
  pathname,
}: {
  panelRef: React.RefObject<HTMLDivElement | null>;
  onNavigate: () => void;
  onQuoteClick: () => void;
  whatsappLink: string | null;
  pathname: string;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      id="mobile-navigation"
      ref={panelRef}
      className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-line bg-white xl:hidden"
    >
      <nav aria-label="Primary mobile" className="tw-container py-6">
        <ul className="divide-y divide-line">
          {primaryNavigation.map((item) => {
            const open = expanded === item.label;

            if (!item.columns) {
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="flex min-h-[52px] items-center text-body font-semibold text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setExpanded(open ? null : item.label)}
                  className="flex min-h-[52px] w-full items-center justify-between gap-4 text-left text-body font-semibold text-ink"
                >
                  {item.label}
                  <PlusIcon open={open} />
                </button>

                <div hidden={!open} className="pb-5">
                  {item.columns.map((column) => (
                    <div key={column.title} className="mt-4 first:mt-0">
                      <p className="mb-2 text-label font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                        {column.title}
                      </p>
                      <ul className="-mx-3 space-y-0.5">
                        {column.links.map((link) => (
                          <li key={link.href + link.label}>
                            <Link
                              href={link.href}
                              onClick={onNavigate}
                              className="flex min-h-[48px] items-center rounded-[10px] px-3 text-[15px] text-ink-muted transition-colors duration-200 hover:bg-cotton hover:text-forest-deep"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-7 space-y-3">
          <Link
            href="/request-a-quote"
            onClick={() => {
              onQuoteClick();
              onNavigate();
            }}
            className="flex min-h-[52px] w-full items-center justify-center rounded-[14px] border border-forest bg-forest px-6 text-small font-semibold text-white shadow-[0_8px_24px_rgba(8,122,85,0.16)]"
          >
            Request a Quote
          </Link>
          {whatsappLink ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                track("whatsapp_click", { cta_location: "mobile_menu", page: pathname });
                onNavigate();
              }}
              className="flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-[14px] border border-line-strong px-6 text-small font-semibold text-ink"
            >
              <WhatsappGlyph className="h-[18px] w-[18px] shrink-0 text-forest" />
              Message us on WhatsApp
            </a>
          ) : null}
          <Link
            href="/request-a-sample"
            onClick={onNavigate}
            className="flex min-h-[52px] w-full items-center justify-center rounded-[14px] border border-line-strong px-6 text-small font-semibold text-ink"
          >
            Request a Sample
          </Link>
        </div>
      </nav>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Icons, all decorative                                                       */
/* -------------------------------------------------------------------------- */

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className={cn("transition-transform duration-200", open ? "rotate-180" : undefined)}
    >
      <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
    </svg>
  );
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M0 7h14" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M7 0v14"
        stroke="currentColor"
        strokeWidth="1.3"
        className={cn("origin-center transition-transform duration-200", open ? "scale-y-0" : undefined)}
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" width="18" height="14" viewBox="0 0 18 14" fill="none">
      <path
        d="M0 1h18"
        stroke="currentColor"
        strokeWidth="1.4"
        className={cn(
          "origin-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          open ? "translate-y-[6px] rotate-45" : undefined,
        )}
      />
      <path
        d="M0 7h18"
        stroke="currentColor"
        strokeWidth="1.4"
        className={cn("transition-opacity duration-200", open ? "opacity-0" : undefined)}
      />
      <path
        d="M0 13h18"
        stroke="currentColor"
        strokeWidth="1.4"
        className={cn(
          "origin-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          open ? "-translate-y-[6px] -rotate-45" : undefined,
        )}
      />
    </svg>
  );
}
