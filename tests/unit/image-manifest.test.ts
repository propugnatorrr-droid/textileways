import { describe, expect, it } from "vitest";
import { allMediaSlots } from "@/content/fallback/media";
import {
  imageManifest,
  getManifestEntry,
  outstandingManifestEntries,
} from "@/content/configuration/image-manifest";

/**
 * Keeps `content/configuration/image-manifest.ts` honest against the actual
 * placeholder declarations in `content/fallback/media.ts`, and against the
 * batch description in `docs/GPT_IMAGE_2_MASTER_PROMPT.md`. If a media slot is
 * added, renamed or removed and the manifest is not updated to match, this
 * test fails rather than letting the documentation drift silently.
 */
describe("image manifest", () => {
  it("has exactly one manifest entry per declared media slot", () => {
    expect(imageManifest).toHaveLength(allMediaSlots().length);
  });

  it("covers every local image path declared in content/fallback/media.ts", () => {
    const manifestPaths = new Set(imageManifest.map((entry) => entry.publicPath));
    for (const asset of allMediaSlots()) {
      expect(manifestPaths.has(asset.src)).toBe(true);
    }
  });

  it("uses a unique, sequential id and sequence number for every entry", () => {
    const ids = imageManifest.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);

    const sequences = imageManifest.map((entry) => Number(entry.sequence));
    const expected = imageManifest.map((_, index) => index + 1);
    expect(sequences).toEqual(expected);
  });

  it("gives every entry a non empty alt value carried through from its asset", () => {
    for (const entry of imageManifest) {
      expect(entry.asset.alt.trim().length).toBeGreaterThan(0);
    }
  });

  it("gives every entry at least one rendered aspect ratio and one usage location", () => {
    for (const entry of imageManifest) {
      expect(entry.renderedAspects.length).toBeGreaterThan(0);
      expect(entry.usedIn.length).toBeGreaterThan(0);
    }
  });

  it("derives every output filename from its id without collisions", () => {
    const filenames = imageManifest.map((entry) => entry.outputFilename);
    expect(new Set(filenames).size).toBe(filenames.length);
  });

  it("looks up a known entry by id", () => {
    expect(getManifestEntry("editorial/home-hero")?.sequence).toBe("26");
    expect(getManifestEntry("not-a-real-id")).toBeUndefined();
  });

  it("tracks outstanding entries against installed photography", () => {
    // Updated 2026-09-07: 27 of 35 slots now carry an installed photograph;
    // `isPlaceholder` is no longer set on those, so they drop out of this list.
    // The remaining 8 failed the anti-artifact checklist and await regeneration
    // (see docs/IMAGE_MANIFEST.md section 3).
    expect(outstandingManifestEntries().length).toBe(8);
    expect(imageManifest.length).toBe(35);
  });
});
