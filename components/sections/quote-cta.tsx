"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics/track";
import { cn } from "@/lib/utilities/cn";

/**
 * Primary quote action.
 *
 * Records where the click came from so the business can see which sections drive
 * inquiries. Only the location string is sent, never any buyer detail.
 */
export function QuoteCta({
  children = "Request a Quote",
  location,
  href = "/request-a-quote",
  variant = "primary",
  className,
  productFamily,
}: {
  children?: ReactNode;
  location: string;
  href?: string;
  variant?: "primary" | "secondary" | "inverse";
  className?: string;
  productFamily?: string;
}) {
  const styles = {
    primary: "bg-forest text-paper border-forest hover:bg-forest-deep hover:border-forest-deep",
    secondary: "bg-transparent text-ink border-line-strong hover:border-ink hover:bg-mist/50",
    inverse: "bg-cotton text-ink border-cotton hover:bg-white hover:border-white",
  }[variant];

  return (
    <Link
      href={href}
      onClick={() =>
        track("quote_cta_click", {
          cta_location: location,
          ...(productFamily ? { product_family: productFamily } : {}),
        })
      }
      className={cn(
        "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[3px] border px-6 py-3.5 text-small font-medium transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]",
        styles,
        className,
      )}
    >
      {children}
    </Link>
  );
}
