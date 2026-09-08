"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics/track";
import { cn } from "@/lib/utilities/cn";

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
      "border-ink bg-ink text-white hover:border-forest hover:bg-forest",
    secondary:
      "border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
    inverse:
      "border-white bg-white text-ink hover:border-forest hover:bg-forest hover:text-white",
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
        "inline-flex min-h-[50px] items-center justify-center border px-6 text-[0.8125rem] font-bold uppercase tracking-[0.075em] transition-[background-color,border-color,color] duration-150",
        styles,
        className,
      )}
    >
      {children}
    </Link>
  );
}
