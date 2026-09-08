"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics/track";
import { cn } from "@/lib/utilities/cn";
import { buttonBase, buttonVariants } from "@/components/ui";

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
  return (
    <Link
      href={href}
      onClick={() =>
        track("quote_cta_click", {
          cta_location: location,
          ...(productFamily ? { product_family: productFamily } : {}),
        })
      }
      className={cn(buttonBase, buttonVariants[variant], className)}
    >
      {children}
    </Link>
  );
}
