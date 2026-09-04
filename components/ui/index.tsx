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

/**
 * Small uppercase label used above headings. Rendered as a plain block with a
 * leading rule rather than a pill, which the design rules prohibit.
 */
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
        "flex items-center gap-3 text-label font-medium uppercase tracking-[0.09em]",
        tone === "inverse" ? "text-cotton/75" : "text-ink-subtle",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-6 shrink-0",
          tone === "inverse" ? "bg-cotton/40" : "bg-line-strong",
        )}
      />
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
    <Tag className={cn("font-serif font-normal", sizeClass, className)}>{children}</Tag>
  );
}

export function Lede({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-body-l text-ink-muted max-w-[62ch]", className)}>{children}</p>
  );
}

/* -------------------------------------------------------------------------- */
/* Actions                                                                     */
/* -------------------------------------------------------------------------- */

type ButtonVariant = "primary" | "secondary" | "quiet" | "inverse";

const buttonBase =
  "inline-flex items-center justify-center gap-2 border text-small font-medium tracking-[0.01em] px-6 py-3.5 min-h-[48px] rounded-[3px] transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:opacity-55 disabled:cursor-not-allowed";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-forest text-paper border-forest hover:bg-forest-deep hover:border-forest-deep",
  secondary: "bg-transparent text-ink border-line-strong hover:border-ink hover:bg-mist/50",
  quiet: "bg-transparent text-ink border-transparent hover:bg-mist/60 px-4",
  inverse: "bg-cotton text-ink border-cotton hover:bg-white hover:border-white",
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
        "tw-underline-grow inline-flex items-center gap-1.5 font-medium text-ink",
        className,
      )}
    >
      {children}
      {withArrow ? (
        <span aria-hidden="true" className="text-ink-subtle">
          &rarr;
        </span>
      ) : null}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Status and metadata                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Square status marker. Deliberately not a pill: the shape system requires
 * rectangular tags with a hairline border.
 */
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
    neutral: "border-line-strong text-ink-muted bg-white",
    forest: "border-forest/35 text-forest bg-forest/5",
    clay: "border-clay/35 text-clay-deep bg-clay/5",
    muted: "border-line text-ink-subtle bg-mist/50",
  }[tone];

  return (
    <span
      className={cn(
        "inline-block border px-2.5 py-1 text-label font-medium uppercase tracking-[0.09em] rounded-[2px]",
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
    <dl className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <div key={item.label} className="grid gap-1 py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6">
          <dt className="text-small font-medium text-ink">{item.label}</dt>
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

/** Simple bulleted list with square markers, matching the editorial grid. */
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
        columns === 2 ? "grid gap-x-10 gap-y-2.5 sm:grid-cols-2" : "space-y-2.5",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 bg-clay" />
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
        "border border-line bg-cotton/50 px-6 py-14 text-center rounded-[4px]",
        className,
      )}
    >
      <p className="font-serif text-h3">{title}</p>
      <p className="mx-auto mt-3 max-w-[46ch] text-small text-ink-muted">{description}</p>
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
    info: "border-blue/30 bg-blue/5 text-ink",
    error: "border-error/40 bg-error/5 text-ink",
    success: "border-success/35 bg-success/5 text-ink",
  }[tone];

  return (
    <div
      role={role}
      className={cn("border-l-2 border-y border-r px-5 py-4 rounded-[3px]", tones, className)}
    >
      {title ? <p className="text-small font-semibold">{title}</p> : null}
      <div className={cn("text-small text-ink-muted", title ? "mt-1.5" : undefined)}>
        {children}
      </div>
    </div>
  );
}
