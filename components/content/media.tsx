import Image from "next/image";
import type { MediaAsset } from "@/content/types";
import { cn } from "@/lib/utilities/cn";

/**
 * Media abstraction.
 *
 * When an asset is marked as a placeholder, no image request is made at all.
 * Instead a woven pattern panel is drawn inline, built from the brand palette
 * and derived deterministically from the asset path so that different slots do
 * not all look identical. This keeps the site free of remote stock imagery while
 * still giving every media slot a considered visual treatment.
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

/** Deterministic small integer from a string, used to vary the weave pattern. */
function hash(value: string): number {
  let total = 0;
  for (let index = 0; index < value.length; index += 1) {
    total = (total * 31 + value.charCodeAt(index)) % 100000;
  }
  return total;
}

const weaveGrounds = [
  { ground: "var(--color-cotton)", warp: "var(--color-stone)", weft: "var(--color-mist)" },
  { ground: "var(--color-mist)", warp: "var(--color-stone)", weft: "var(--color-paper)" },
  { ground: "#e9e5db", warp: "var(--color-blue)", weft: "var(--color-cotton)" },
  { ground: "var(--color-cotton)", warp: "var(--color-clay)", weft: "var(--color-paper)" },
] as const;

/**
 * Placeholder panel drawn as an inline SVG weave. Marked decorative, because the
 * information it stands in for is not present yet and announcing a pattern to a
 * screen reader would be noise.
 */
function WeavePanel({ asset, className }: { asset: MediaAsset; className?: string }) {
  const seed = hash(asset.src);
  const palette = weaveGrounds[seed % weaveGrounds.length];
  const cell = 12 + (seed % 5) * 4;
  const stroke = 1 + (seed % 2);
  const rotation = seed % 2 === 0 ? 0 : 90;
  const patternId = `weave-${seed}`;

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden bg-cotton", className)}
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
          <pattern
            id={patternId}
            width={cell}
            height={cell}
            patternUnits="userSpaceOnUse"
            patternTransform={`rotate(${rotation})`}
          >
            <rect width={cell} height={cell} fill={palette.ground} />
            <rect width={cell / 2} height={cell} fill={palette.weft} opacity="0.55" />
            <rect width={cell} height={stroke} y={cell / 2} fill={palette.warp} opacity="0.4" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#${patternId})`} />
        <rect width="400" height="300" fill="var(--color-paper)" opacity="0.35" />
      </svg>
      <span
        aria-hidden="true"
        className="absolute inset-0 border border-line"
      />
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
  const ratioStyle = aspect
    ? undefined
    : { aspectRatio: `${asset.width} / ${asset.height}` };

  const frame = (
    <div
      className={cn(
        "relative overflow-hidden bg-mist rounded-[3px]",
        aspect,
        zoomOnHover ? "tw-media-zoom" : undefined,
        className,
      )}
      style={ratioStyle}
    >
      {asset.isPlaceholder ? (
        <WeavePanel asset={asset} />
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
            <span className="font-medium text-ink-muted">Photography required. </span>
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
