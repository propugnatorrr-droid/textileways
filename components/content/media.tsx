import Image from "next/image";
import type { MediaAsset } from "@/content/types";
import { cn } from "@/lib/utilities/cn";

/**
 * Media abstraction.
 *
 * A placeholder makes no image request. It draws an art directed panel instead:
 * a pale cool surface, a very low contrast textile grid, an understated frame
 * icon, the asset category and the intended image title. That reads as a
 * reserved slot rather than blank graph paper, and it keeps the composition
 * legible while the photography is outstanding.
 *
 * Replacing a placeholder with a real photograph is a data change only. Drop
 * the file into `public/images`, remove `isPlaceholder` from the record in
 * `content/fallback/media.ts`, and this component switches to `next/image`
 * without any layout edit.
 */

interface MediaProps {
  asset: MediaAsset;
  /** Responsive sizes hint passed to next/image. */
  sizes?: string;
  className?: string;
  /** Only set on a genuine largest contentful paint image. */
  priority?: boolean;
  /** Tailwind aspect ratio class. Defaults to the asset's own ratio. */
  aspect?: string;
  /** Renders the caption below the frame. */
  showCaption?: boolean;
  /** Enables a small scale on hover, used inside links. */
  zoomOnHover?: boolean;
  /** Larger corner radius, for hero and feature media. */
  large?: boolean;
  /** Hides the placeholder's internal label, for small supporting tiles. */
  compact?: boolean;
}

/** Deterministic small integer from a string, used to vary the grid pitch. */
function hash(value: string): number {
  let total = 0;
  for (let index = 0; index < value.length; index += 1) {
    total = (total * 31 + value.charCodeAt(index)) % 100000;
  }
  return total;
}

/**
 * Derives the asset category and a readable title from the media path.
 * `products/streetwear` becomes "Products" and "Streetwear".
 */
function describe(asset: MediaAsset): { category: string; title: string } {
  const path = asset.src.replace("/images/", "").replace(/\.[a-z]+$/i, "");
  const [group, ...rest] = path.split("/");
  const leaf = rest.join(" ") || group;

  const toTitle = (value: string) =>
    value.replace(/[-_]/g, " ").replace(/^./, (character) => character.toUpperCase());

  return { category: toTitle(group), title: toTitle(leaf) };
}

/**
 * Placeholder art. Marked decorative: the information it stands in for is not
 * present yet, and announcing a pattern to a screen reader would be noise. The
 * visible label is short and factual, never an apology.
 */
function PlaceholderArt({ asset, compact }: { asset: MediaAsset; compact: boolean }) {
  const seed = hash(asset.src);
  const pitch = 32 + (seed % 3) * 12;
  const patternId = `tw-thread-${seed}`;
  const { category, title } = describe(asset);

  return (
    <div
      data-media-placeholder="true"
      data-media-art
      className="absolute inset-0 flex flex-col justify-between bg-surface"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id={patternId} width={pitch} height={pitch} patternUnits="userSpaceOnUse">
            <path
              d={`M ${pitch} 0 L 0 0 0 ${pitch}`}
              fill="none"
              stroke="#0b0f0d"
              strokeWidth="1"
              opacity="0.035"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Corner marker, a quiet reference to a crop mark. */}
      <span
        aria-hidden="true"
        className="absolute left-4 top-4 h-5 w-5 border-l border-t border-ink/12"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-ink/12"
      />

      {compact ? (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-ink/15"
        >
          <FrameGlyph />
        </span>
      ) : (
        <div className="relative flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
          <span aria-hidden="true" className="text-ink/15">
            <FrameGlyph />
          </span>
          <p className="text-label font-semibold uppercase tracking-[0.12em] text-ink-subtle">
            {category}
          </p>
          <p className="max-w-[26ch] text-small font-medium text-ink-muted">{title}</p>
          <p className="text-label uppercase tracking-[0.1em] text-ink-subtle/70">
            Photography reserved
          </p>
        </div>
      )}
    </div>
  );
}

/** Understated frame mark. Not a generic broken image icon. */
function FrameGlyph() {
  return (
    <svg width="34" height="30" viewBox="0 0 34 30" fill="none" aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="32"
        height="28"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4 22.5 12 14l6.5 6.5L23 16l7 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11.5" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Media({
  asset,
  sizes = "(min-width: 1280px) 50vw, 100vw",
  className,
  priority = false,
  aspect,
  showCaption = false,
  zoomOnHover = false,
  large = false,
  compact = false,
}: MediaProps) {
  const ratioStyle = aspect ? undefined : { aspectRatio: `${asset.width} / ${asset.height}` };

  const frame = (
    <div
      data-media-frame="true"
      className={cn(
        "tw-media",
        large && "tw-media-lg",
        aspect,
        zoomOnHover && "tw-media-zoom",
        className,
      )}
      style={ratioStyle}
    >
      {asset.isPlaceholder ? (
        <PlaceholderArt asset={asset} compact={compact} />
      ) : (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={asset.focal ? { objectPosition: asset.focal } : undefined}
        />
      )}
    </div>
  );

  if (!showCaption || !asset.caption) return frame;

  /*
   * Captions are only rendered where a page explicitly asks for them, such as
   * the factory brief list. Placeholder captions describe the shot required
   * rather than apologising for its absence.
   */
  return (
    <figure className="space-y-3">
      {frame}
      <figcaption className="text-small text-ink-subtle">
        {asset.isPlaceholder ? (
          <>
            <span className="font-semibold text-ink-muted">Shot required. </span>
            {asset.caption}
          </>
        ) : (
          <>
            {asset.caption}
            {asset.credit ? <span className="block text-ink-subtle">{asset.credit}</span> : null}
          </>
        )}
      </figcaption>
    </figure>
  );
}
