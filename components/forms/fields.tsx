"use client";

import { useId, type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utilities/cn";

/**
 * Form field primitives.
 *
 * Every control is explicitly labelled, describes its own error through
 * `aria-describedby`, and sets `aria-invalid` so assistive technology announces
 * the state rather than relying on colour. Inputs are rectangular, as the shape
 * system requires.
 */

const controlClasses =
  "w-full min-h-[48px] border border-line-strong bg-white px-4 py-3 text-body text-ink rounded-[2px] transition-colors duration-200 placeholder:text-ink-subtle/70 focus-visible:border-forest disabled:cursor-not-allowed disabled:bg-mist/40";

const errorClasses = "border-error focus-visible:border-error";

function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-small font-medium text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-clay">
            *
          </span>
        ) : (
          <span className="ml-2 text-ink-subtle font-normal">Optional</span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-small text-ink-subtle">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-small text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string): string | undefined {
  const parts = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : undefined;
}

/* -------------------------------------------------------------------------- */

export function TextField({
  label,
  hint,
  error,
  required,
  className,
  ...rest
}: {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className">) {
  const generatedId = useId();
  const id = rest.id ?? generatedId;

  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <input
        {...rest}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlClasses, error && errorClasses)}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  hint,
  error,
  required,
  className,
  rows = 5,
  ...rest
}: {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">) {
  const generatedId = useId();
  const id = rest.id ?? generatedId;

  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <textarea
        {...rest}
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlClasses, "min-h-[8rem] leading-relaxed", error && errorClasses)}
      />
    </FieldShell>
  );
}

export function SelectField({
  label,
  hint,
  error,
  required,
  className,
  options,
  placeholder = "Select an option",
  ...rest
}: {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "children">) {
  const generatedId = useId();
  const id = rest.id ?? generatedId;

  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <select
        {...rest}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlClasses, "appearance-none bg-white pr-10", error && errorClasses)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M1 3l4 4 4-4' stroke='%234c5854' stroke-width='1.3'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 16px center",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function CheckboxField({
  label,
  hint,
  error,
  className,
  ...rest
}: {
  label: ReactNode;
  hint?: string;
  error?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type">) {
  const generatedId = useId();
  const id = rest.id ?? generatedId;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-start gap-3">
        <input
          {...rest}
          type="checkbox"
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className="mt-1 h-[18px] w-[18px] shrink-0 cursor-pointer border border-line-strong accent-[var(--color-forest)]"
        />
        <label htmlFor={id} className="cursor-pointer text-small leading-relaxed text-ink-muted">
          {label}
        </label>
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="pl-[30px] text-small text-ink-subtle">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="pl-[30px] text-small text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Grouped checkboxes inside a fieldset, used for decoration selection. */
export function CheckboxGroup({
  legend,
  hint,
  error,
  options,
  values,
  onToggle,
  columns = 2,
}: {
  legend: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
  values: string[];
  onToggle: (value: string, checked: boolean) => void;
  columns?: 1 | 2 | 3;
}) {
  const id = useId();
  const columnClass = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" }[columns];

  return (
    <fieldset aria-describedby={describedBy(id, hint, error)}>
      <legend className="text-small font-medium text-ink">{legend}</legend>
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-small text-ink-subtle">
          {hint}
        </p>
      ) : null}
      <div className={cn("mt-4 grid gap-x-8 gap-y-3", columnClass)}>
        {options.map((option) => {
          const checked = values.includes(option.value);
          return (
            <label
              key={option.value}
              className="flex min-h-[28px] cursor-pointer items-start gap-3 text-small text-ink-muted"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onToggle(option.value, event.target.checked)}
                className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer border border-line-strong accent-[var(--color-forest)]"
              />
              <span className={checked ? "text-ink" : undefined}>{option.label}</span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-3 text-small text-error" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

/** Radio group used where the choice set is short and mutually exclusive. */
export function RadioGroup({
  legend,
  hint,
  error,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  hint?: string;
  error?: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();

  return (
    <fieldset aria-describedby={describedBy(id, hint, error)}>
      <legend className="text-small font-medium text-ink">{legend}</legend>
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-small text-ink-subtle">
          {hint}
        </p>
      ) : null}
      <div className="mt-4 space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex min-h-[28px] cursor-pointer items-start gap-3 text-small text-ink-muted"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-[var(--color-forest)]"
            />
            <span className={value === option.value ? "text-ink" : undefined}>{option.label}</span>
          </label>
        ))}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-3 text-small text-error" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

/**
 * Honeypot field.
 *
 * Hidden from sight and from assistive technology, and removed from the tab
 * order, so no real visitor can reach it. Automated form fillers that read the
 * DOM will fill it, which is exactly the signal we want.
 */
export function HoneypotField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor="company-role-field">Do not fill this field</label>
      <input
        id="company-role-field"
        name="companyRole"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

/** Summary of every error on a long form, linking to each field. */
export function ErrorSummary({
  errors,
  labels,
}: {
  errors: Record<string, string | undefined>;
  labels: Record<string, string>;
}) {
  const entries = Object.entries(errors).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string" && entry[1].length > 0,
  );

  if (entries.length === 0) return null;

  return (
    <div
      role="alert"
      tabIndex={-1}
      className="border-l-2 border-error border-y border-r border-error/40 bg-error/5 px-5 py-4 rounded-[3px]"
      data-error-summary
    >
      <p className="text-small font-semibold text-ink">
        {entries.length === 1
          ? "There is one problem to fix"
          : `There are ${entries.length} problems to fix`}
      </p>
      <ul className="mt-3 space-y-1.5">
        {entries.map(([field, message]) => (
          <li key={field}>
            <a
              href={`#field-${field}`}
              className="tw-underline-grow text-small text-ink-muted"
            >
              {labels[field] ?? field}: {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
