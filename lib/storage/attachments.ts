import { safeStorageName, validateFile } from "@/lib/validation/files";

/**
 * Attachment storage adapter.
 *
 * Deliberately written against an interface rather than directly against a
 * vendor, so the storage provider can be changed without touching the route
 * handlers.
 *
 * Two implementations are provided:
 *
 * - `VercelBlobStorage`, used when BLOB_READ_WRITE_TOKEN is present. The SDK is
 *   imported dynamically so the package is only required when the feature is
 *   actually configured.
 * - `UnconfiguredStorage`, used otherwise. It accepts nothing and reports why,
 *   which lets the RFQ form run without attachments before storage is set up.
 *
 * A malware scanning hook is defined here as well. It is a no operation by
 * default rather than a fake pass: `scanned` is false so nothing downstream can
 * claim a file was scanned when it was not.
 */

export interface StoredAttachment {
  /** Original file name as supplied, kept only for display. */
  originalName: string;
  /** Generated storage path. Never derived unsanitised from user input. */
  storageKey: string;
  /** URL the file can be retrieved from, if the provider issues one. */
  url: string;
  size: number;
  contentType: string;
  scanned: boolean;
}

export interface StorageResult {
  ok: boolean;
  stored: StoredAttachment[];
  /** Message safe to show a visitor. */
  message?: string;
  /** Short code for server logs. */
  reason?: string;
}

export interface AttachmentStorage {
  readonly configured: boolean;
  store(files: File[], reference: string): Promise<StorageResult>;
}

/* -------------------------------------------------------------------------- */

class UnconfiguredStorage implements AttachmentStorage {
  readonly configured = false;

  async store(files: File[]): Promise<StorageResult> {
    if (files.length === 0) return { ok: true, stored: [] };

    return {
      ok: false,
      stored: [],
      message:
        "File uploads are not available yet. Your inquiry can still be submitted without attachments, and we will reply with an address you can send files to.",
      reason: "storage-not-configured",
    };
  }
}

/* -------------------------------------------------------------------------- */

class VercelBlobStorage implements AttachmentStorage {
  readonly configured = true;

  async store(files: File[], reference: string): Promise<StorageResult> {
    if (files.length === 0) return { ok: true, stored: [] };

    try {
      const { put } = await import("@vercel/blob");
      const stored: StoredAttachment[] = [];

      for (const [index, file] of files.entries()) {
        const check = validateFile({ name: file.name, type: file.type, size: file.size });
        if (!check.ok) {
          return {
            ok: false,
            stored,
            message: `${file.name}: ${check.message}`,
            reason: check.reason,
          };
        }

        const scan = await scanForMalware(file);
        if (!scan.clean) {
          return {
            ok: false,
            stored,
            message: `${file.name} could not be accepted.`,
            reason: "scan-rejected",
          };
        }

        const key = safeStorageName(file.name, reference, index);
        const blob = await put(key, file, {
          access: "public",
          addRandomSuffix: true,
          contentType: file.type,
        });

        stored.push({
          originalName: file.name,
          storageKey: key,
          url: blob.url,
          size: file.size,
          contentType: file.type,
          scanned: scan.scanned,
        });
      }

      return { ok: true, stored };
    } catch (error) {
      const reason = error instanceof Error ? error.name : "unknown-error";
      return {
        ok: false,
        stored: [],
        message:
          "Your files could not be uploaded. You can submit the inquiry without them and send the files by email instead.",
        reason: `upload-failed:${reason}`,
      };
    }
  }
}

/* -------------------------------------------------------------------------- */

export interface ScanResult {
  /** True only when a scanner actually ran. */
  scanned: boolean;
  /** True when the file may proceed. */
  clean: boolean;
}

/**
 * Malware scanning hook.
 *
 * No scanner is integrated. This function is the single place to add one: call
 * the service, return `{ scanned: true, clean: <result> }`, and every upload
 * path picks it up. Until then it reports honestly that no scan was performed,
 * and the file type allowlist plus the executable block list are what stand
 * between an upload and the inbox.
 */
export async function scanForMalware(file: File): Promise<ScanResult> {
  // No scanner is wired up. The file is referenced so that adding one here is a
  // change to this function alone rather than to its signature and every caller.
  void file;
  return { scanned: false, clean: true };
}

/* -------------------------------------------------------------------------- */

let instance: AttachmentStorage | null = null;

export function getAttachmentStorage(): AttachmentStorage {
  if (!instance) {
    instance = process.env.BLOB_READ_WRITE_TOKEN
      ? new VercelBlobStorage()
      : new UnconfiguredStorage();
  }
  return instance;
}

/** Resets the cached adapter. Exposed for tests. */
export function resetAttachmentStorage(): void {
  instance = null;
}
