import { describe, expect, it, beforeEach } from "vitest";
import {
  generateReference,
  isValidReference,
  fingerprintSubmission,
  findDuplicate,
  recordSubmission,
  resetSubmissionCache,
} from "@/lib/security/reference";
import { consume, resetRateLimits, clientIdentifier } from "@/lib/security/rate-limit";
import {
  validateFile,
  validateFileSet,
  safeStorageName,
  fileExtension,
  formatBytes,
  MAX_FILE_BYTES,
} from "@/lib/validation/files";

describe("submission references", () => {
  it("produces the documented format", () => {
    const reference = generateReference("RFQ", new Date("2026-09-04T00:00:00Z"));
    expect(reference).toMatch(/^RFQ-2609-[A-Z0-9]{5}$/);
    expect(isValidReference(reference)).toBe(true);
  });

  it("uses the correct prefix for each submission type", () => {
    expect(generateReference("SMP")).toMatch(/^SMP-/);
    expect(generateReference("MSG")).toMatch(/^MSG-/);
  });

  it("omits visually ambiguous characters", () => {
    for (let index = 0; index < 200; index += 1) {
      const random = generateReference("RFQ").split("-")[2];
      expect(random).not.toMatch(/[ILOU01]/);
    }
  });

  it("produces distinct references across many calls", () => {
    const references = new Set(
      Array.from({ length: 500 }, () => generateReference("RFQ")),
    );
    // Collisions are possible in principle but should be rare enough to notice.
    expect(references.size).toBeGreaterThan(480);
  });

  it("rejects a malformed reference", () => {
    expect(isValidReference("RFQ-26-ABC")).toBe(false);
    expect(isValidReference("XXX-2609-ABCDE")).toBe(false);
    expect(isValidReference("")).toBe(false);
  });
});

describe("duplicate submission guard", () => {
  beforeEach(() => {
    resetSubmissionCache();
  });

  it("returns null for a submission it has not seen", () => {
    const fingerprint = fingerprintSubmission(["a@example.com", "Acme", "Tee"]);
    expect(findDuplicate(fingerprint)).toBeNull();
  });

  it("recognises the same submission within the window", () => {
    const fingerprint = fingerprintSubmission(["a@example.com", "Acme", "Tee"]);
    recordSubmission(fingerprint, "RFQ-2609-ABCDE");
    expect(findDuplicate(fingerprint)).toBe("RFQ-2609-ABCDE");
  });

  it("treats different content as a different submission", () => {
    const first = fingerprintSubmission(["a@example.com", "Acme", "Tee"]);
    const second = fingerprintSubmission(["a@example.com", "Acme", "Hoodie"]);
    recordSubmission(first, "RFQ-2609-ABCDE");
    expect(findDuplicate(second)).toBeNull();
  });

  it("expires an old submission so a genuine reorder is not blocked", () => {
    const fingerprint = fingerprintSubmission(["a@example.com", "Acme", "Tee"]);
    const longAgo = Date.now() - 60 * 60 * 1000;
    recordSubmission(fingerprint, "RFQ-2609-ABCDE", longAgo);
    expect(findDuplicate(fingerprint)).toBeNull();
  });

  it("does not store the submission content itself", () => {
    const fingerprint = fingerprintSubmission(["secret@example.com", "Confidential Ltd"]);
    expect(fingerprint).not.toContain("secret@example.com");
    expect(fingerprint).toMatch(/^[a-f0-9]{32}$/);
  });
});

describe("rate limiting", () => {
  beforeEach(() => {
    resetRateLimits();
  });

  it("allows requests up to the limit", () => {
    for (let index = 0; index < 3; index += 1) {
      expect(consume("test", 3, 60_000).allowed).toBe(true);
    }
  });

  it("blocks the request after the limit is reached", () => {
    for (let index = 0; index < 3; index += 1) consume("test", 3, 60_000);
    const result = consume("test", 3, 60_000);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("tracks each client separately", () => {
    consume("client-a", 1, 60_000);
    expect(consume("client-a", 1, 60_000).allowed).toBe(false);
    expect(consume("client-b", 1, 60_000).allowed).toBe(true);
  });

  it("resets after the window elapses", () => {
    const start = 1_000_000;
    consume("test", 1, 1_000, start);
    expect(consume("test", 1, 1_000, start + 500).allowed).toBe(false);
    expect(consume("test", 1, 1_000, start + 1_500).allowed).toBe(true);
  });

  it("reads the client address from proxy headers", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.7, 70.41.3.18" });
    expect(clientIdentifier(headers)).toBe("203.0.113.7");
  });

  it("falls back when no address header is present", () => {
    expect(clientIdentifier(new Headers())).toBe("unknown");
  });
});

describe("file validation", () => {
  const pdf = { name: "techpack.pdf", type: "application/pdf", size: 1024 };

  it("accepts an allowed type with a matching extension", () => {
    expect(validateFile(pdf).ok).toBe(true);
  });

  it("rejects an executable outright", () => {
    const result = validateFile({ name: "payload.exe", type: "application/pdf", size: 1024 });
    expect(result.ok).toBe(false);
    expect(result.reason).toBe("blocked-type");
  });

  it("rejects a script renamed to look like a document", () => {
    const result = validateFile({ name: "invoice.js", type: "text/plain", size: 512 });
    expect(result.ok).toBe(false);
    expect(result.reason).toBe("blocked-type");
  });

  it("rejects a mismatch between the declared type and the extension", () => {
    const result = validateFile({ name: "artwork.png", type: "application/pdf", size: 2048 });
    expect(result.ok).toBe(false);
    expect(result.reason).toBe("extension-mismatch");
  });

  it("rejects a type outside the allowlist", () => {
    const result = validateFile({ name: "video.mp4", type: "video/mp4", size: 2048 });
    expect(result.ok).toBe(false);
    expect(result.reason).toBe("type-not-allowed");
  });

  it("rejects an empty file", () => {
    expect(validateFile({ ...pdf, size: 0 }).reason).toBe("empty");
  });

  it("rejects a file over the single file limit", () => {
    expect(validateFile({ ...pdf, size: MAX_FILE_BYTES + 1 }).reason).toBe("too-large");
  });

  it("rejects an absurdly long file name", () => {
    expect(validateFile({ ...pdf, name: `${"a".repeat(250)}.pdf` }).reason).toBe("name-too-long");
  });

  it("rejects a set that exceeds the total size limit", () => {
    const large = Array.from({ length: 5 }, (_, index) => ({
      name: `file-${index}.pdf`,
      type: "application/pdf",
      size: 14 * 1024 * 1024,
    }));
    const result = validateFileSet(large);
    expect(result.ok).toBe(false);
    expect(result.message).toContain("50 MB");
  });

  it("rejects a set with too many files", () => {
    const many = Array.from({ length: 11 }, (_, index) => ({
      name: `file-${index}.pdf`,
      type: "application/pdf",
      size: 1024,
    }));
    expect(validateFileSet(many).ok).toBe(false);
  });

  it("accepts a reasonable set", () => {
    expect(validateFileSet([pdf, { ...pdf, name: "chart.pdf" }]).ok).toBe(true);
  });
});

describe("safe storage names", () => {
  it("namespaces by reference and index", () => {
    const key = safeStorageName("Tech Pack v2.pdf", "RFQ-2609-ABCDE", 0);
    expect(key).toBe("rfq/RFQ-2609-ABCDE/01-tech-pack-v2.pdf");
  });

  it("neutralises path traversal in the original name", () => {
    const key = safeStorageName("../../etc/passwd.pdf", "RFQ-2609-ABCDE", 0);
    expect(key).not.toContain("..");
    expect(key).toBe("rfq/RFQ-2609-ABCDE/01-etc-passwd.pdf");
  });

  it("handles a name that is entirely unsafe characters", () => {
    const key = safeStorageName("###.pdf", "RFQ-2609-ABCDE", 2);
    expect(key).toBe("rfq/RFQ-2609-ABCDE/03-attachment.pdf");
  });

  it("keeps two identically named files apart", () => {
    const first = safeStorageName("artwork.png", "RFQ-2609-ABCDE", 0);
    const second = safeStorageName("artwork.png", "RFQ-2609-ABCDE", 1);
    expect(first).not.toBe(second);
  });
});

describe("file helpers", () => {
  it("extracts a lowercased extension", () => {
    expect(fileExtension("Design.PNG")).toBe(".png");
    expect(fileExtension("noextension")).toBe("");
  });

  it("formats sizes readably", () => {
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(2048)).toBe("2 KB");
    expect(formatBytes(5 * 1024 * 1024)).toBe("5.0 MB");
  });
});
