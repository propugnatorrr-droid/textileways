"use client";

import { useCallback, useId, useRef, useState } from "react";
import {
  acceptAttribute,
  formatBytes,
  validateFile,
  MAX_FILE_COUNT,
  MAX_TOTAL_BYTES,
  MAX_FILE_BYTES,
} from "@/lib/validation/files";
import { track } from "@/lib/analytics/track";
import { cn } from "@/lib/utilities/cn";

/**
 * Attachment control.
 *
 * Client side checks mirror the server rules so a buyer gets immediate feedback,
 * but they are a convenience only: every file is validated again on the server.
 *
 * The control is a labelled button plus a visible list, not a drag target alone,
 * so it is fully usable from the keyboard. Drag and drop is layered on top for
 * pointer users rather than being the only way in.
 */

export interface SelectedFile {
  id: string;
  file: File;
}

export function FileUpload({
  files,
  onChange,
  label = "Attach files",
  hint,
}: {
  files: SelectedFile[];
  onChange: (files: SelectedFile[]) => void;
  label?: string;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const id = useId();

  const totalBytes = files.reduce((sum, item) => sum + item.file.size, 0);

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming || incoming.length === 0) return;

      const accepted: SelectedFile[] = [];
      const problems: string[] = [];
      let runningTotal = totalBytes;

      for (const file of Array.from(incoming)) {
        if (files.length + accepted.length >= MAX_FILE_COUNT) {
          problems.push(`Only ${MAX_FILE_COUNT} files can be attached.`);
          break;
        }

        const duplicate = files.some(
          (existing) => existing.file.name === file.name && existing.file.size === file.size,
        );
        if (duplicate) {
          problems.push(`${file.name} has already been attached.`);
          continue;
        }

        const check = validateFile({ name: file.name, type: file.type, size: file.size });
        if (!check.ok) {
          problems.push(`${file.name}: ${check.message}`);
          track("file_upload_failure", { reason: check.reason ?? "invalid" });
          continue;
        }

        if (runningTotal + file.size > MAX_TOTAL_BYTES) {
          problems.push(`${file.name} would exceed the ${formatBytes(MAX_TOTAL_BYTES)} total limit.`);
          track("file_upload_failure", { reason: "total-size" });
          continue;
        }

        runningTotal += file.size;
        accepted.push({ id: `${file.name}-${file.size}-${Date.now()}-${accepted.length}`, file });
      }

      setErrors(problems);
      if (accepted.length > 0) onChange([...files, ...accepted]);
    },
    [files, onChange, totalBytes],
  );

  const removeFile = useCallback(
    (id: string) => {
      onChange(files.filter((item) => item.id !== id));
      setErrors([]);
    },
    [files, onChange],
  );

  return (
    <div className="space-y-4">
      <div>
        <p className="text-small font-medium text-ink">{label}</p>
        <p id={`${id}-hint`} className="mt-2 text-small text-ink-subtle">
          {hint ??
            `PDF, images, documents, spreadsheets and ZIP archives. Up to ${MAX_FILE_COUNT} files, ${formatBytes(MAX_FILE_BYTES)} each and ${formatBytes(MAX_TOTAL_BYTES)} in total.`}
        </p>
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          addFiles(event.dataTransfer.files);
        }}
        className={cn(
          "border border-dashed px-6 py-8 text-center transition-colors duration-200 rounded-[3px]",
          dragging ? "border-forest bg-forest/5" : "border-line-strong bg-cotton/40",
        )}
      >
        <input
          ref={inputRef}
          id={`${id}-input`}
          type="file"
          multiple
          accept={acceptAttribute}
          aria-describedby={`${id}-hint`}
          onChange={(event) => {
            addFiles(event.target.files);
            /* Reset so selecting the same file again still fires a change event. */
            event.target.value = "";
          }}
          className="sr-only"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex min-h-[48px] items-center rounded-[3px] border border-line-strong bg-white px-6 text-small font-medium text-ink transition-colors duration-200 hover:border-ink"
        >
          Choose files
        </button>
        <p className="mt-3 text-small text-ink-subtle">or drop them here</p>
      </div>

      {errors.length > 0 ? (
        <ul role="alert" className="space-y-1.5">
          {errors.map((message) => (
            <li key={message} className="text-small text-error">
              {message}
            </li>
          ))}
        </ul>
      ) : null}

      {files.length > 0 ? (
        <div>
          <p role="status" className="mb-3 text-small text-ink-subtle">
            {files.length} {files.length === 1 ? "file" : "files"} attached,{" "}
            {formatBytes(totalBytes)} in total
          </p>
          <ul className="divide-y divide-line border-y border-line">
            {files.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-small font-medium text-ink">
                    {item.file.name}
                  </span>
                  <span className="text-small text-ink-subtle">
                    {formatBytes(item.file.size)}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(item.id)}
                  className="min-h-[40px] shrink-0 rounded-[3px] border border-line-strong px-3 text-small text-ink-muted transition-colors duration-200 hover:border-error hover:text-error"
                >
                  Remove
                  <span className="sr-only"> {item.file.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
