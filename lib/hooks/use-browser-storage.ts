"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Reading browser storage during render, safely.
 *
 * `useSyncExternalStore` is the API React provides for exactly this: it renders
 * the server snapshot during server rendering and hydration, then switches to
 * the client snapshot. That avoids both a hydration mismatch and the extra
 * render pass that a read-in-an-effect would cause.
 *
 * Snapshots are cached per key so the hook returns a referentially stable value
 * between renders, which `useSyncExternalStore` requires.
 */

type StorageKind = "local" | "session";

interface CacheEntry {
  raw: string | null;
  parsed: unknown;
}

const cache = new Map<string, CacheEntry>();
const listeners = new Set<() => void>();

function storageFor(kind: StorageKind): Storage | null {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    /* Private browsing or a blocked storage policy. */
    return null;
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  /* Another tab writing to localStorage fires a storage event. */
  const onStorage = () => {
    cache.clear();
    for (const notify of listeners) notify();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Notifies subscribers after a local write, so every consumer stays in step. */
function notifyAll(): void {
  for (const listener of listeners) listener();
}

function readSnapshot<T>(kind: StorageKind, key: string, parse: (raw: string) => T | null): T | null {
  const cacheKey = `${kind}:${key}`;
  const storage = storageFor(kind);
  const raw = storage ? storage.getItem(key) : null;

  const cached = cache.get(cacheKey);
  if (cached && cached.raw === raw) return cached.parsed as T | null;

  let parsed: T | null = null;
  if (raw !== null) {
    try {
      parsed = parse(raw);
    } catch {
      parsed = null;
    }
  }

  cache.set(cacheKey, { raw, parsed });
  return parsed;
}

/**
 * Reads a JSON value from browser storage.
 * Returns `null` on the server, during hydration, when the key is absent, or
 * when the stored value cannot be parsed.
 */
export function useStoredJson<T>(kind: StorageKind, key: string): {
  value: T | null;
  write: (value: T) => void;
  clear: () => void;
} {
  const getSnapshot = useCallback(
    () => readSnapshot<T>(kind, key, (raw) => JSON.parse(raw) as T),
    [kind, key],
  );

  /* Server and hydration snapshot: never read storage, so markup always matches. */
  const getServerSnapshot = useCallback(() => null, []);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const write = useCallback(
    (next: T) => {
      const storage = storageFor(kind);
      if (!storage) return;
      try {
        storage.setItem(key, JSON.stringify(next));
        cache.delete(`${kind}:${key}`);
        notifyAll();
      } catch {
        /* Quota exceeded or storage blocked. The feature degrades quietly. */
      }
    },
    [kind, key],
  );

  const clear = useCallback(() => {
    const storage = storageFor(kind);
    if (!storage) return;
    try {
      storage.removeItem(key);
      cache.delete(`${kind}:${key}`);
      notifyAll();
    } catch {
      /* Nothing to do. */
    }
  }, [kind, key]);

  return useMemo(() => ({ value, write, clear }), [value, write, clear]);
}

/** Reads a plain string from browser storage under the same guarantees. */
export function useStoredString(
  kind: StorageKind,
  key: string,
): { value: string | null; write: (value: string) => void; clear: () => void } {
  const getSnapshot = useCallback(() => readSnapshot<string>(kind, key, (raw) => raw), [kind, key]);
  const getServerSnapshot = useCallback(() => null, []);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const write = useCallback(
    (next: string) => {
      const storage = storageFor(kind);
      if (!storage) return;
      try {
        storage.setItem(key, next);
        cache.delete(`${kind}:${key}`);
        notifyAll();
      } catch {
        /* Storage unavailable. */
      }
    },
    [kind, key],
  );

  const clear = useCallback(() => {
    const storage = storageFor(kind);
    if (!storage) return;
    try {
      storage.removeItem(key);
      cache.delete(`${kind}:${key}`);
      notifyAll();
    } catch {
      /* Storage unavailable. */
    }
  }, [kind, key]);

  return useMemo(() => ({ value, write, clear }), [value, write, clear]);
}

/**
 * True once the component has rendered on the client.
 * Implemented with `useSyncExternalStore` so it costs no extra render and needs
 * no state update inside an effect.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
