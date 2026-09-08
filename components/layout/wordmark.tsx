import Image from "next/image";
import { cn } from "@/lib/utilities/cn";

/**
 * Textileways wordmark.
 *
 * The real brand asset, supplied 2026-09-08 as a single ink coloured PNG
 * (`public/brand/wordmark.png`). It is dark on transparent, so the `tone`
 * prop applies a filter to render it correctly against a dark surface (the
 * footer) rather than requiring a second file: `brightness-0 invert` turns
 * every opaque pixel white regardless of its original colour, which is a
 * simple and exact way to get a light variant from one dark source file.
 *
 * `className` controls the rendered height; width follows automatically
 * from the image's own aspect ratio, so the mark never distorts.
 */
export function Wordmark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Image
      src="/brand/wordmark.png"
      alt="Textileways"
      width={540}
      height={96}
      priority
      className={cn(
        "w-auto",
        tone === "light" && "brightness-0 invert",
        className,
      )}
    />
  );
}

/**
 * Standalone mark, no wordmark text. Used where space is too tight for the
 * full lockup, such as the favicon and app icon (`app/icon.png`,
 * `app/apple-icon.png`, both copied from `public/brand/mark.png`).
 */
export function BrandMark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Image
      src="/brand/mark.png"
      alt="Textileways"
      width={410}
      height={410}
      className={cn(
        "w-auto",
        tone === "light" && "brightness-0 invert",
        className,
      )}
    />
  );
}
