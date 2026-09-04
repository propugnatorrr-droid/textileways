/**
 * Quantity banding.
 *
 * Used by the RFQ form to route inquiries and by analytics to report interest
 * without transmitting the exact figure a buyer typed.
 */

export const quantityBands = [
  "validation",
  "small",
  "growth",
  "wholesale",
  "enterprise",
] as const;

export type QuantityBand = (typeof quantityBands)[number];

export interface QuantityBandDetail {
  id: QuantityBand;
  label: string;
  /** Inclusive lower bound in pieces. */
  min: number;
  /** Inclusive upper bound in pieces, or null when unbounded. */
  max: number | null;
}

export const quantityBandDetails: Record<QuantityBand, QuantityBandDetail> = {
  validation: { id: "validation", label: "50 to 249 pieces", min: 50, max: 249 },
  small: { id: "small", label: "250 to 999 pieces", min: 250, max: 999 },
  growth: { id: "growth", label: "1,000 to 9,999 pieces", min: 1000, max: 9999 },
  wholesale: {
    id: "wholesale",
    label: "10,000 to 99,999 pieces",
    min: 10000,
    max: 99999,
  },
  enterprise: {
    id: "enterprise",
    label: "100,000 pieces and above",
    min: 100000,
    max: null,
  },
};

/**
 * Classifies a piece count into a band.
 * Quantities below the smallest band are reported as "validation" because the
 * business still reviews them, and anything non finite is treated as unknown.
 */
export function classifyQuantity(pieces: number): QuantityBand | null {
  if (!Number.isFinite(pieces) || pieces <= 0) return null;
  if (pieces < 250) return "validation";
  if (pieces < 1000) return "small";
  if (pieces < 10000) return "growth";
  if (pieces < 100000) return "wholesale";
  return "enterprise";
}

/** Human readable band label, safe to send to analytics. */
export function quantityBandLabel(pieces: number): string | null {
  const band = classifyQuantity(pieces);
  return band ? quantityBandDetails[band].label : null;
}
