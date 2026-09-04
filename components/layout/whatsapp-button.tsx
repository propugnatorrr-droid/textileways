"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics/track";
import {
  whatsappHref,
  whatsappDisplayNumber,
  labelForPath,
  type WhatsappContext,
} from "@/lib/utilities/whatsapp";
import { cn } from "@/lib/utilities/cn";

/**
 * Floating WhatsApp action.
 *
 * Design decisions, all within the project's shape and motion rules:
 *
 * - a square cornered panel with a hairline border, not a circular pill
 * - it opens as a small labelled card on first sight so the visitor understands
 *   what it is, then collapses to a compact action once they have seen it
 * - the label is dismissible, and the dismissal is remembered for the session
 * - it sits above the footer rather than over it, and it moves out of the way of
 *   the cookie banner when that is showing
 * - the prefilled message names the page the visitor is on, so the first thing
 *   the sales team sees is the context of the enquiry
 */

const DISMISS_KEY = "textileways.whatsapp.collapsed";

export function WhatsappFloatingButton() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<number | null>(null);

  /* Reveal after a short delay so it never competes with the hero on arrival. */
  useEffect(() => {
    const collapsed = readCollapsed();
    timerRef.current = window.setTimeout(() => {
      setMounted(true);
      if (!collapsed) setExpanded(true);
    }, 1400);

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const collapse = useCallback(() => {
    setExpanded(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* Storage may be unavailable. The button still works. */
    }
  }, []);

  const context: WhatsappContext = {
    pageLabel: labelForPath(pathname),
    path: pathname,
  };

  const href = whatsappHref(context);
  const display = whatsappDisplayNumber();
  if (!href) return null;

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:bottom-7 sm:right-7",
        mounted ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      {expanded ? (
        <div className="flex max-w-[17rem] items-start gap-3 rounded-[4px] border border-line bg-paper px-4 py-3 shadow-[0_14px_36px_-28px_rgba(23,32,29,0.55)]">
          <p className="text-small leading-snug text-ink-muted">
            <span className="block font-semibold text-ink">Questions about a project?</span>
            Message us on WhatsApp. We reply during Pakistan business hours.
          </p>
          <button
            type="button"
            onClick={collapse}
            aria-label="Hide the WhatsApp message"
            className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] text-ink-subtle transition-colors duration-200 hover:bg-mist hover:text-ink"
          >
            <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
        </div>
      ) : null}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          track("whatsapp_click", { cta_location: "floating_button", page: pathname })
        }
        className="group inline-flex min-h-[52px] items-center gap-3 rounded-[4px] border border-forest bg-forest pl-4 pr-5 text-paper shadow-[0_14px_36px_-24px_rgba(29,51,43,0.85)] transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-forest-deep"
      >
        <WhatsappGlyph className="h-[22px] w-[22px] shrink-0" />
        <span className="flex flex-col leading-tight">
          <span className="text-small font-medium">WhatsApp us</span>
          {display ? (
            <span className="text-label text-cotton/70">{display}</span>
          ) : null}
        </span>
      </a>
    </div>
  );
}

function readCollapsed(): boolean {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Inline WhatsApp action, used inside page content rather than floating.
 * Server rendered pages pass their own context so the prefilled message can
 * name the product family or capability the visitor is looking at.
 */
export function WhatsappInlineLink({
  context,
  location,
  children = "Ask on WhatsApp",
  variant = "secondary",
  className,
}: {
  context: WhatsappContext;
  location: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "inverse";
  className?: string;
}) {
  const href = whatsappHref(context);
  if (!href) return null;

  const styles = {
    primary: "bg-forest text-paper border-forest hover:bg-forest-deep",
    secondary: "bg-transparent text-ink border-line-strong hover:border-ink hover:bg-mist/50",
    inverse: "bg-transparent text-cotton border-cotton/40 hover:border-cotton hover:bg-cotton/10",
  }[variant];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { cta_location: location, page: context.path })}
      className={cn(
        "inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-[3px] border px-6 py-3.5 text-small font-medium transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]",
        styles,
        className,
      )}
    >
      <WhatsappGlyph className="h-[18px] w-[18px] shrink-0" />
      {children}
    </a>
  );
}

/** WhatsApp mark, drawn inline so no icon library is required. */
export function WhatsappGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}
