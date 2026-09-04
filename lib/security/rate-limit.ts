/**
 * Server side rate limiting.
 *
 * An in memory fixed window counter. This is deliberately simple and its limits
 * are stated honestly rather than overstated:
 *
 * - it is per instance, so a serverless deployment running several instances
 *   allows proportionally more requests than the nominal limit
 * - it resets when an instance restarts
 *
 * It is nonetheless worth having, because it stops the common case of a single
 * client submitting a form repeatedly, and it costs nothing to run. For a hard
 * guarantee across instances, swap `consume` for a Redis or Upstash backed
 * implementation; the rest of the application only uses this interface.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Prevents unbounded growth if a deployment stays warm for a long time. */
const MAX_TRACKED_KEYS = 10_000;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Seconds until the window resets, for the Retry-After header. */
  retryAfterSeconds: number;
}

export function consume(
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now(),
): RateLimitResult {
  if (buckets.size > MAX_TRACKED_KEYS) {
    for (const [existingKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(existingKey);
    }
    if (buckets.size > MAX_TRACKED_KEYS) buckets.clear();
  }

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, retryAfterSeconds };
}

/** Clears all buckets. Exposed for tests rather than for application code. */
export function resetRateLimits(): void {
  buckets.clear();
}

/**
 * Derives a client identifier from proxy headers.
 *
 * The leftmost entry in `x-forwarded-for` is the client address as reported by
 * the edge. It is spoofable in principle, which is why rate limiting is one
 * layer among several rather than the only defence.
 */
export function clientIdentifier(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip") ?? "unknown";
}

/** Limits applied to each public endpoint. */
export const rateLimits = {
  rfq: { limit: 5, windowMs: 60 * 60 * 1000 },
  sample: { limit: 5, windowMs: 60 * 60 * 1000 },
  contact: { limit: 8, windowMs: 60 * 60 * 1000 },
  upload: { limit: 40, windowMs: 60 * 60 * 1000 },
} as const;
