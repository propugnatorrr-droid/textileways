import "server-only";

/**
 * Sanity client.
 *
 * Loaded dynamically so that `@sanity/client` is only required when a project id
 * is actually configured. That keeps the site building and running with the
 * repository's fallback content before any CMS exists, which is the state it
 * ships in.
 *
 * The read token is server only. `server-only` at the top of this file makes an
 * accidental client import a build error rather than a credential leak.
 */

export interface CmsConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
}

export function cmsConfig(): CmsConfig | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) return null;

  return {
    projectId,
    dataset,
    apiVersion: process.env.SANITY_API_VERSION ?? "2024-10-01",
    token: process.env.SANITY_API_READ_TOKEN,
  };
}

export function cmsEnabled(): boolean {
  return cmsConfig() !== null;
}

type SanityFetchClient = {
  fetch: <T>(query: string, params?: Record<string, unknown>, options?: unknown) => Promise<T>;
};

let clientPromise: Promise<SanityFetchClient | null> | null = null;

async function getClient(): Promise<SanityFetchClient | null> {
  const config = cmsConfig();
  if (!config) return null;

  if (!clientPromise) {
    clientPromise = (async () => {
      try {
        const { createClient } = await import("@sanity/client");
        return createClient({
          projectId: config.projectId,
          dataset: config.dataset,
          apiVersion: config.apiVersion,
          token: config.token,
          useCdn: !config.token,
          perspective: "published",
        }) as unknown as SanityFetchClient;
      } catch (error) {
        const reason = error instanceof Error ? error.message : "unknown";
        console.error(`[cms] client unavailable: ${reason}`);
        return null;
      }
    })();
  }

  return clientPromise;
}

export interface FetchOptions {
  /** Cache tags, so the revalidation webhook can invalidate precisely. */
  tags?: string[];
  /** Seconds before the cached response is considered stale. */
  revalidate?: number;
}

/**
 * Runs a GROQ query.
 *
 * Returns `null` rather than throwing when the CMS is not configured or the
 * request fails. Every caller in `lib/cms/content.ts` treats `null` as
 * "use the repository fallback", so a CMS outage degrades to the built in
 * content instead of taking the site down.
 */
export async function cmsFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: FetchOptions = {},
): Promise<T | null> {
  const client = await getClient();
  if (!client) return null;

  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: options.revalidate ?? 3600,
        tags: ["cms", ...(options.tags ?? [])],
      },
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown";
    console.error(`[cms] query failed, falling back to repository content: ${reason}`);
    return null;
  }
}

/** Resets the cached client. Exposed for tests. */
export function resetCmsClient(): void {
  clientPromise = null;
}
