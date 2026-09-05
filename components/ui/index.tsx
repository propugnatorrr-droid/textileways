import Link from "next/link";
import type { ComponentProps, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utilities/cn";

/* -------------------------------------------------------------------------- */
/* Layout primitives                                                           */
/* -------------------------------------------------------------------------- */

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={cn("tw-container", className)}>{children}</Tag>;
}

export function Section({
  children,
  className,
  tight = false,
  id,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  tight?: boolean;
  id?: string;
} & Omit<ComponentProps<"section">, "children" | "className" | "id">) {
  return (
    <section
      id={id}
      className={cn(tight ? "tw-section-tight" : "tw-section", className)}
      {...rest}
    >
      {children}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Typography                                                                  */
/* -------------------------------------------------------------------------- */

/** Small uppercase label sitting above a heading. */
export function Eyebrow({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <p
      className={cn(
        "text-label font-semibold uppercase tracking-[0.12em]",
        tone === "inverse" ? "text-white/72" : "text-forest",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function DisplayHeading({
  children,
  className,
  level = 1,
  size = "h1",
}: {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3;
  size?: "display-xl" | "display-l" | "h1" | "h2" | "h3";
}) {
  const Tag = `h${level}` as ElementType;
  const sizeClass = {
    "display-xl": "text-display-xl",
    "display-l": "text-display-l",
    h1: "text-h1",
    h2: "text-h2",
    h3: "text-h3",
  }[size];

  return (
    <Tag className={cn("font-sans font-semibold tracking-[-0.045em]", sizeClass, className)}>
      {children}
    </Tag>
  );
}

export function Lede({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("max-w-[58ch] text-body-l leading-relaxed text-ink-muted", className)}>
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Actions                                                                     */
/* -------------------------------------------------------------------------- */

type ButtonVariant = "primary" | "secondary" | "quiet" | "inverse";

const buttonBase =
  "inline-flex min-h-[50px] items-center justify-center gap-2 rounded-[14px] border px-6 py-3.5 text-small font-semibold tracking-[-0.01em] shadow-[0_1px_2px_rgba(11,15,13,0.05)] transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "border-forest bg-forest text-white hover:border-forest-deep hover:bg-forest-deep hover:shadow-[0_14px_30px_rgba(8,122,85,0.2)]",
  secondary:
    "border-line-strong bg-white text-ink hover:border-ink/25 hover:bg-cotton hover:shadow-[0_12px_30px_rgba(11,15,13,0.08)]",
  quiet: "border-transparent bg-transparent px-4 text-ink hover:bg-cotton",
  inverse:
    "border-white bg-white text-ink hover:border-white hover:bg-cotton hover:shadow-[0_14px_30px_rgba(0,0,0,0.14)]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">) {
  return (
    <Link href={href} className={cn(buttonBase, buttonVariants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  type = "button",
  ...rest
}: {
  children: ReactNode;
  variant?: ButtonVariant;
} & ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={cn(buttonBase, buttonVariants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Text link with a growing underline, used inside editorial content. */
export function TextLink({
  href,
  children,
  className,
  withArrow = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  withArrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "tw-underline-grow inline-flex items-center gap-1.5 font-semibold text-ink",
        className,
      )}
    >
      {children}
      {withArrow ? (
        <span aria-hidden="true" className="text-forest">
          &rarr;
        </span>
      ) : null}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Status and metadata                                                         */
/* -------------------------------------------------------------------------- */

export function StatusTag({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "forest" | "clay" | "muted";
  className?: string;
}) {
  const tones = {
    neutral: "border-line-strong bg-white text-ink-muted",
    forest: "border-forest/20 bg-forest-soft text-forest-deep",
    clay: "border-clay/25 bg-clay/10 text-clay-deep",
    muted: "border-line bg-cotton text-ink-subtle",
  }[tone];

  return (
    <span
      className={cn(
        "inline-block rounded-[10px] border px-3 py-1.5 text-label font-semibold uppercase tracking-[0.08em]",
        tones,
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Definition list used for technical specifications. */
export function SpecList({
  items,
  className,
}: {
  items: { label: string; value: string; note?: string }[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <dl className={cn("divide-y divide-line overflow-hidden rounded-[20px] border border-line bg-white", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6 sm:px-6"
        >
          <dt className="text-small font-semibold text-ink">{item.label}</dt>
          <dd className="text-small text-ink-muted">
            {item.value}
            {item.note ? (
              <span className="mt-1 block text-ink-subtle">{item.note}</span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Bulleted list with a small forest marker. */
export function MarkerList({
  items,
  className,
  columns = 1,
}: {
  items: readonly string[];
  className?: string;
  columns?: 1 | 2;
}) {
  if (items.length === 0) return null;

  return (
    <ul
      className={cn(
        "text-small text-ink-muted",
        columns === 2 ? "grid gap-x-10 gap-y-3 sm:grid-cols-2" : "space-y-3",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-forest"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty and error states                                                      */
/* -------------------------------------------------------------------------- */

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-line bg-cotton px-6 py-14 text-center",
        className,
      )}
    >
      <p className="font-sans text-h3 font-semibold tracking-[-0.032em] text-ink">{title}</p>
      <p className="mx-auto mt-3 max-w-[52ch] text-small text-ink-muted">{description}</p>
      {action ? <div className="mt-7 flex justify-center">{action}</div> : null}
    </div>
  );
}

/** Inline notice used for form errors and content integrity disclosures. */
export function Notice({
  tone = "info",
  title,
  children,
  className,
  role,
}: {
  tone?: "info" | "error" | "success";
  title?: string;
  children: ReactNode;
  className?: string;
  role?: "alert" | "status";
}) {
  const tones = {
    info: "border-blue/20 bg-blue-soft",
    error: "border-error/25 bg-error/5",
    success: "border-forest/20 bg-forest-soft",
  }[tone];

  return (
    <div role={role} className={cn("rounded-[16px] border px-5 py-4", tones, className)}>
      {title ? <p className="text-small font-semibold text-ink">{title}</p> : null}
      <div className={cn("text-small text-ink-muted", title ? "mt-1.5" : undefined)}>
        {children}
      </div>
    </div>
  );
}
