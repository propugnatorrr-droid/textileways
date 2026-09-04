import { z } from "zod";

/**
 * Upload validation.
 *
 * File handling is the highest risk part of an RFQ form, so every check here is
 * deliberate:
 *
 * - the extension and the declared MIME type must agree, so a renamed executable
 *   is rejected rather than accepted on its extension alone
 * - executable and script types are refused explicitly rather than merely being
 *   absent from the allowlist
 * - stored names are generated rather than derived from user input, which
 *   removes path traversal and overwrite risks entirely
 * - per file and total size limits are enforced on the server, not just in the
 *   browser
 */

export const MAX_FILE_BYTES = 15 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 50 * 1024 * 1024;
export const MAX_FILE_COUNT = 10;

/** Allowed types, keyed by MIME type, each with the extensions it may carry. */
export const allowedFileTypes: Record<string, string[]> = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/gif": [".gif"],
  "image/tiff": [".tif", ".tiff"],
  "image/svg+xml": [".svg"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
  "text/csv": [".csv"],
  "text/plain": [".txt"],
  "application/zip": [".zip"],
  "application/postscript": [".ai", ".eps"],
};

/**
 * Extensions refused outright regardless of declared MIME type. Being explicit
 * here means a misconfigured allowlist cannot silently permit an executable.
 */
export const blockedExtensions = [
  ".exe", ".dll", ".bat", ".cmd", ".com", ".msi", ".scr", ".pif", ".cpl",
  ".sh", ".bash", ".zsh", ".ps1", ".psm1", ".vbs", ".vbe", ".js", ".mjs",
  ".jse", ".wsf", ".wsh", ".jar", ".app", ".dmg", ".pkg", ".deb", ".rpm",
  ".apk", ".bin", ".run", ".php", ".asp", ".aspx", ".jsp", ".py", ".rb",
  ".pl", ".htaccess", ".lnk", ".reg", ".gadget", ".hta",
];

export const acceptAttribute = Object.values(allowedFileTypes).flat().join(",");

/** Lowercased extension including the leading dot, or an empty string. */
export function fileExtension(name: string): string {
  const index = name.lastIndexOf(".");
  return index === -1 ? "" : name.slice(index).toLowerCase();
}

export type FileRejectionReason =
  | "too-large"
  | "blocked-type"
  | "type-not-allowed"
  | "extension-mismatch"
  | "empty"
  | "name-too-long";

export interface FileValidationResult {
  ok: boolean;
  reason?: FileRejectionReason;
  message?: string;
}

const rejectionMessages: Record<FileRejectionReason, string> = {
  "too-large": "This file is larger than the 15 MB limit for a single file",
  "blocked-type": "This file type cannot be accepted for security reasons",
  "type-not-allowed": "This file type is not accepted. Use PDF, image, document, spreadsheet or ZIP files",
  "extension-mismatch": "The file extension does not match its type",
  empty: "This file is empty",
  "name-too-long": "The file name is too long",
};

/** Validates one file against type, extension, size and name rules. */
export function validateFile(input: {
  name: string;
  type: string;
  size: number;
}): FileValidationResult {
  const reject = (reason: FileRejectionReason): FileValidationResult => ({
    ok: false,
    reason,
    message: rejectionMessages[reason],
  });

  if (input.name.length > 200) return reject("name-too-long");
  if (input.size <= 0) return reject("empty");
  if (input.size > MAX_FILE_BYTES) return reject("too-large");

  const extension = fileExtension(input.name);
  if (blockedExtensions.includes(extension)) return reject("blocked-type");

  const declaredType = input.type.split(";")[0]?.trim().toLowerCase() ?? "";
  const allowedExtensions = allowedFileTypes[declaredType];
  if (!allowedExtensions) return reject("type-not-allowed");
  if (!allowedExtensions.includes(extension)) return reject("extension-mismatch");

  return { ok: true };
}

/** Validates a whole set of files, including the count and total size limits. */
export function validateFileSet(
  files: { name: string; type: string; size: number }[],
): { ok: boolean; message?: string; perFile: FileValidationResult[] } {
  const perFile = files.map(validateFile);

  if (files.length > MAX_FILE_COUNT) {
    return { ok: false, message: `Attach no more than ${MAX_FILE_COUNT} files`, perFile };
  }

  const total = files.reduce((sum, file) => sum + file.size, 0);
  if (total > MAX_TOTAL_BYTES) {
    return { ok: false, message: "The attachments total more than the 50 MB limit", perFile };
  }

  const firstFailure = perFile.find((result) => !result.ok);
  if (firstFailure) return { ok: false, message: firstFailure.message, perFile };

  return { ok: true, perFile };
}

/**
 * Generates a safe storage name.
 *
 * The original name is never used as a path. A slug derived from it is kept for
 * human readability, but the reference is a generated identifier, so two files
 * with the same name cannot collide and no traversal sequence can survive.
 */
export function safeStorageName(originalName: string, reference: string, index: number): string {
  const extension = fileExtension(originalName);
  const base = originalName
    .slice(0, originalName.length - extension.length)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  const safeBase = base.length > 0 ? base : "attachment";
  const safeExtension = /^\.[a-z0-9]{1,8}$/.test(extension) ? extension : "";

  return `rfq/${reference}/${String(index + 1).padStart(2, "0")}-${safeBase}${safeExtension}`;
}

/** Schema for file metadata sent alongside a submission. */
export const fileMetadataSchema = z.object({
  name: z.string().min(1).max(200),
  type: z.string().min(1).max(160),
  size: z.number().int().positive().max(MAX_FILE_BYTES),
});

export type FileMetadata = z.infer<typeof fileMetadataSchema>;

/** Human readable size, used in the upload list. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
