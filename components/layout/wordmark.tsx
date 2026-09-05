import { cn } from "@/lib/utilities/cn";

/**
 * Textileways wordmark.
 *
 * A typographic mark rather than a logo file, because no brand asset has been
 * supplied. Replacing it with the real logo is a change to this component alone.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-sans font-extrabold uppercase leading-none tracking-[-0.06em]",
        className,
      )}
    >
      Textile
      <span className="text-forest">ways</span>
    </span>
  );
}
