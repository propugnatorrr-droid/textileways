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
    primary:
      "border-forest bg-forest text-white shadow-[0_1px_2px_rgba(11,15,13,0.06)] hover:border-forest-deep hover:bg-forest-deep hover:shadow-[0_12px_28px_rgba(8,122,85,0.24)]",
    secondary:
      "border-line-strong bg-white text-ink hover:border-ink/30 hover:bg-cotton",
    inverse:
      "border-white bg-white text-ink hover:bg-cotton hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)]",
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
        "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[14px] border px-6 text-small font-semibold transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:translate-y-0",
        styles,
        className,
      )}
    >
      {children}
    </Link>
  );
}
