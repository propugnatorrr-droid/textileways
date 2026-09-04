"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utilities/cn";

/**
 * Scroll reveal.
 *
 * The revealed state is written straight to the element's `data-revealed`
 * attribute rather than held in React state. That is deliberate: the reveal is
 * purely presentational, the DOM is the external system being synchronised, and
 * driving it directly avoids a render pass for every element that scrolls into
 * view on a long page.
 *
 * Uses IntersectionObserver rather than a scroll listener, animates only
 * `opacity` and `transform`, and disconnects after the first reveal. When the
 * visitor prefers reduced motion, or when IntersectionObserver is unavailable,
 * the element is revealed immediately and no transition runs.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => {
      node.dataset.revealed = "true";
    };

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("tw-reveal", className)}
      data-revealed="false"
      style={delay > 0 ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
