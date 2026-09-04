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
 * Behaviour required by the brief:
 * - paper coloured over the hero, solid once the page scrolls
 * - keyboard accessible mega menus that close on Escape and on outside click
 * - mobile menu that traps focus and becomes an accordion
 * - no pill shaped navigation elements
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
       * The background is solid rather than translucent with a blur.
       *
       * Two reasons: the design rules prohibit glassmorphism, and a
       * backdrop-filter on this element would make the header a containing block
       * for fixed position descendants, which collapses the fixed mobile
       * navigation panel to the height of the header.
       */
      className={cn(
        "sticky top-0 z-40 border-b bg-paper transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
        solid ? "border-line" : "border-transparent",
      )}
    >
      <div className="tw-container">
        <div className="flex h-[68px] items-center justify-between gap-4 lg:h-[80px]">
          <Link
            href="/"
            className="shrink-0"
            aria-label={`${siteConfig.name} home`}
            onClick={() => setOpenMenu(null)}
          >
            <Wordmark className="h-[26px] w-auto text-ink lg:h-[30px]" />
          </Link>

          <div ref={navRef} className="hidden xl:flex xl:items-center xl:gap-1">
            <nav aria-label="Primary">
              <ul className="flex items-center gap-1">
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
                className="hidden h-11 w-11 items-center justify-center rounded-[3px] border border-line-strong text-forest transition-colors duration-200 hover:border-forest hover:bg-forest/5 sm:inline-flex"
              >
                <span className="sr-only">Message us on WhatsApp</span>
                <WhatsappGlyph className="h-[19px] w-[19px]" />
              </a>
            ) : null}

            <Link
              href="/request-a-quote"
              onClick={() => onQuoteClick("header")}
              className="hidden rounded-[3px] border border-forest bg-forest px-5 py-2.5 text-small font-medium text-paper transition-colors duration-200 hover:bg-forest-deep sm:inline-flex"
            >
              Request a Quote
            </Link>

            <button
              ref={mobileTriggerRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[3px] border border-line-strong text-ink xl:hidden"
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
            "inline-flex items-center rounded-[3px] px-3 py-2 text-small font-medium transition-colors duration-200",
            active ? "text-forest" : "text-ink hover:text-forest",
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
          "inline-flex items-center gap-1.5 rounded-[3px] px-3 py-2 text-small font-medium transition-colors duration-200",
          active || open ? "text-forest" : "text-ink hover:text-forest",
        )}
      >
        {item.label}
        <ChevronIcon open={open} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-y border-line bg-paper shadow-[0_18px_40px_-32px_rgba(23,32,29,0.5)]"
      >
        <div className="tw-container py-10">
          {item.intro ? (
            <p className="mb-8 max-w-[58ch] text-small text-ink-subtle">{item.intro}</p>
          ) : null}
          <div
            className={cn(
              "grid gap-x-10 gap-y-8",
              item.columns.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
            )}
          >
            {item.columns.map((column) => (
              <div key={column.title}>
                <p className="mb-4 border-b border-line pb-2.5 text-label font-medium uppercase tracking-[0.09em] text-ink-subtle">
                  {column.title}
                </p>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group block text-small font-medium text-ink transition-colors duration-200 hover:text-forest"
                      >
                        {link.label}
                        {link.description ? (
                          <span className="mt-0.5 block text-small font-normal leading-snug text-ink-subtle">
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
      className="fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto border-t border-line bg-paper xl:hidden"
    >
      <nav aria-label="Primary mobile" className="tw-container py-6">
        <ul className="divide-y divide-line border-y border-line">
          {primaryNavigation.map((item) => {
            const open = expanded === item.label;

            if (!item.columns) {
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="flex min-h-[52px] items-center text-body font-medium text-ink"
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
                  className="flex min-h-[52px] w-full items-center justify-between gap-4 text-left text-body font-medium text-ink"
                >
                  {item.label}
                  <PlusIcon open={open} />
                </button>

                <div hidden={!open} className="pb-5">
                  {item.columns.map((column) => (
                    <div key={column.title} className="mt-4 first:mt-0">
                      <p className="mb-2.5 text-label font-medium uppercase tracking-[0.09em] text-ink-subtle">
                        {column.title}
                      </p>
                      <ul className="space-y-1">
                        {column.links.map((link) => (
                          <li key={link.href + link.label}>
                            <Link
                              href={link.href}
                              onClick={onNavigate}
                              className="flex min-h-[44px] items-center text-small text-ink-muted"
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
            className="flex min-h-[52px] w-full items-center justify-center rounded-[3px] border border-forest bg-forest px-6 text-small font-medium text-paper"
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
              className="flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-[3px] border border-line-strong px-6 text-small font-medium text-ink"
            >
              <WhatsappGlyph className="h-[18px] w-[18px] shrink-0 text-forest" />
              Message us on WhatsApp
            </a>
          ) : null}
          <Link
            href="/request-a-sample"
            onClick={onNavigate}
            className="flex min-h-[52px] w-full items-center justify-center rounded-[3px] border border-line-strong px-6 text-small font-medium text-ink"
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
