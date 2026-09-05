import Image from "next/image";
import type { MediaAsset } from "@/content/types";
import { cn } from "@/lib/utilities/cn";

/**
 * Media abstraction.
 *
 * When an asset is marked as a placeholder, no image request is made at all.
 * Instead a restrained cool grey panel is drawn with a faint thread grid, varied
 * deterministically from the asset path so different slots are not identical.
 * This keeps the site free of remote stock imagery while every media slot still
 * reads as a considered surface rather than a broken image.
 *
 * Once a real photograph is dropped into `public/images` and `isPlaceholder` is
 * removed from the record, the same component renders it through `next/image`
 * with no other change required.
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
  /** Renders the caption below the image. */
  showCaption?: boolean;
  /** Enables a small scale on hover, used inside links. */
  zoomOnHover?: boolean;
}

/** Deterministic small integer from a string, used to vary the placeholder. */
function hash(value: string): number {
  let total = 0;
  for (let index = 0; index < value.length; index += 1) {
    total = (total * 31 + value.charCodeAt(index)) % 100000;
  }
  return total;
}

/**
 * Placeholder panel.
 *
 * A cool grey field with a faint thread grid, marked decorative because the
 * information it stands in for is not present yet and announcing a pattern to a
 * screen reader would be noise.
 */
function PlaceholderPanel({ asset, className }: { asset: MediaAsset; className?: string }) {
  const seed = hash(asset.src);
  const cell = 26 + (seed % 4) * 10;
  const rotation = seed % 2 === 0 ? 0 : 90;
  const gradientId = `ph-grad-${seed}`;
  const patternId = `ph-grid-${seed}`;

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      data-media-placeholder="true"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 400 300"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8faf9" />
            <stop offset="100%" stopColor="#edf3f0" />
          </linearGradient>
          <pattern
            id={patternId}
            width={cell}
            height={cell}
            patternUnits="userSpaceOnUse"
            patternTransform={`rotate(${rotation})`}
          >
            <path
              d={`M 0 0 L 0 ${cell} M 0 0 L ${cell} 0`}
              stroke="#0b0f0d"
              strokeWidth="1"
              opacity="0.05"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#${gradientId})`} />
        <rect width="400" height="300" fill={`url(#${patternId})`} />
      </svg>
    </div>
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
}: MediaProps) {
  const ratioStyle = aspect ? undefined : { aspectRatio: `${asset.width} / ${asset.height}` };

  const frame = (
    <div
      data-media-frame="true"
      className={cn(
        "relative overflow-hidden rounded-[24px] bg-cotton shadow-[0_1px_2px_rgba(11,15,13,0.04),0_20px_60px_rgba(11,15,13,0.08)]",
        aspect,
        zoomOnHover ? "tw-media-zoom" : undefined,
        className,
      )}
      style={ratioStyle}
    >
      {asset.isPlaceholder ? (
        <PlaceholderPanel asset={asset} />
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

  return (
    <figure className="space-y-3">
      {frame}
      <figcaption className="text-small text-ink-subtle">
        {asset.isPlaceholder ? (
          <>
            <span className="font-semibold text-ink-muted">Photography required. </span>
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
