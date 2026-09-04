import { cn } from "@/lib/utilities/cn";

/**
 * Textileways wordmark.
 *
 * No brand logo files have been supplied. Rather than leaving a broken image or
 * inventing a logo mark, this renders a typographic wordmark using the site's
 * own display serif with a woven rule beneath it. Replacing it with the real
 * logo is a single component change and is listed in the content requirements.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col justify-center", className)}>
      <span className="font-serif text-[1.35em] leading-none tracking-[-0.02em]">
        Textileways
      </span>
      <span aria-hidden="true" className="mt-[0.22em] flex h-[2px] w-full gap-[2px]">
        <span className="h-full flex-[3] bg-forest" />
        <span className="h-full flex-1 bg-clay" />
        <span className="h-full flex-[2] bg-stone" />
      </span>
    </span>
  );
}
