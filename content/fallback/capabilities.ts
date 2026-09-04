import type { Capability, CapabilityGroup } from "@/content/types";
import { coreCapabilities } from "./capabilities-core";
import { finishingCapabilities } from "./capabilities-finishing";

/** All thirty capability records, ordered as they appear on the capabilities hub. */
export const capabilities: Capability[] = [...coreCapabilities, ...finishingCapabilities];

const capabilityIndex = new Map(capabilities.map((item) => [item.slug, item]));

export function getCapability(slug: string): Capability | undefined {
  return capabilityIndex.get(slug);
}

export function getCapabilitiesBySlugs(slugs: readonly string[]): Capability[] {
  return slugs
    .map((slug) => capabilityIndex.get(slug))
    .filter((item): item is Capability => item !== undefined);
}

export function capabilitySlugs(): string[] {
  return capabilities.map((item) => item.slug);
}

/** Capabilities bucketed by group, preserving declaration order within each group. */
export function capabilitiesByGroup(): { group: CapabilityGroup; items: Capability[] }[] {
  const order: CapabilityGroup[] = [
    "development",
    "materials",
    "manufacturing",
    "decoration",
    "finishing",
    "assurance",
  ];

  return order
    .map((group) => ({
      group,
      items: capabilities.filter((item) => item.group === group),
    }))
    .filter((bucket) => bucket.items.length > 0);
}
