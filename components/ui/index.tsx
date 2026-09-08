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

/**
 * Vertical rhythm. Three sizes rather than one, so ordinary sections sit close
 * together and only a genuine change of subject gets the large gap.
 */
export function Section({
  children,
  className,
  size = "default",
  id,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  size?: "tight" | "default" | "large";
  id?: string;
} & Omit<ComponentProps<"section">, "children" | "className" | "id">) {
  const rhythm = {
    tight: "tw-section-tight",
    default: "tw-section",
    large: "tw-section-lg",
  }[size];

  return (
    <section id={id} className={cn(rhythm, className)} {...rest}>
      {children}
    </section>
  );
}

/** Flat tinted field used to group content without nesting bordered cards. */
export function Panel({
  children,
  className,
  tone = "cotton",
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  tone?: "cotton" | "ink" | "forest";
  padded?: boolean;
}) {
  const tones = {
    cotton: "tw-panel",
    ink: "tw-panel-ink",
    forest: "tw-panel-ink bg-forest",
  }[tone];

  return <div className={cn(tones, padded && "tw-panel-pad", className)}>{children}</div>;
}

/* -------------------------------------------------------------------------- */
/* Typography                                                                  */
/* -------------------------------------------------------------------------- */

/** Small uppercase label above a heading. */
export function Eyebrow({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "inverse" | "muted";
}) {
  const tones = {
    default: "text-forest",
    inverse: "text-white/70",
    muted: "text-ink-subtle",
  }[tone];

  return (
    <p className={cn("text-label font-semibold uppercase tracking-[0.1em]", tones, className)}>
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

  return <Tag className={cn("font-sans font-semibold text-ink", sizeClass, className)}>{children}</Tag>;
}

export function Lede({
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
        "max-w-[62ch] text-body-l",
        tone === "inverse" ? "text-white/75" : "text-ink-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Section heading block. Fills the container rather than stranding a narrow
 * column on the left of a wide screen.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  action,
  tone = "default",
  level = 2,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  action?: ReactNode;
  tone?: "default" | "inverse";
  level?: 2 | 3;
  className?: string;
}) {
  return (
    <div className={cn("tw-section-header", className)}>
      <div>
        {eyebrow ? <Eyebrow tone={tone === "inverse" ? "inverse" : "default"}>{eyebrow}</Eyebrow> : null}
        <DisplayHeading
          level={level}
          size="h2"
          className={cn("max-w-[20ch]", eyebrow && "mt-4", tone === "inverse" && "text-white")}
        >
          {title}
        </DisplayHeading>
      </div>

      {lede || action ? (
        <div className="flex flex-col items-start gap-6 md:pb-1.5">
          {lede ? (
            <p
              className={cn(
                "max-w-[56ch] text-body-l",
                tone === "inverse" ? "text-white/75" : "text-ink-muted",
              )}
            >
              {lede}
            </p>
          ) : null}
          {action}
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Actions                                                                     */
/* -------------------------------------------------------------------------- */

export type ButtonVariant = "primary" | "secondary" | "quiet" | "inverse" | "inverse-outline";

/**
 * Deliberately no hover lift or glow shadow. A button is a control, not a
 * floating card: the only hover feedback is a firm colour change, and the
 * only motion is a slight press down on activation, like a physical switch.
 */
export const buttonBase =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] border px-6 text-small font-semibold transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "border-forest bg-forest text-white shadow-[0_1px_2px_rgba(11,15,13,0.06)] hover:border-forest-deep hover:bg-forest-deep",
  secondary:
    "border-line-strong bg-white text-ink hover:border-ink/30 hover:bg-cotton",
  quiet: "border-transparent bg-transparent px-4 text-ink hover:bg-cotton",
  inverse: "border-white bg-white text-ink hover:bg-cotton",
  "inverse-outline":
    "border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/10",
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
    <button type={type} className={cn(buttonBase, buttonVariants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

/** Text link with a growing underline. */
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
        "group tw-underline-grow inline-flex items-center gap-1.5 font-semibold text-ink",
        className,
      )}
    >
      {children}
      {withArrow ? (
        <span
          aria-hidden="true"
          className="text-forest transition-transform duration-200 group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      ) : null}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Status and data                                                             */
/* -------------------------------------------------------------------------- */

export function StatusTag({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "forest" | "clay" | "muted" | "inverse";
  className?: string;
}) {
  const tones = {
    neutral: "border-line-strong bg-white text-ink-muted",
    forest: "border-forest/20 bg-forest-soft text-forest-deep",
    clay: "border-clay/25 bg-clay/8 text-clay-deep",
    muted: "border-line bg-cotton text-ink-subtle",
    inverse: "border-white/20 bg-white/10 text-white/85",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[9px] border px-2.5 py-1 text-label font-semibold uppercase tracking-[0.08em]",
        tones,
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Specification rows. A quiet zebra field rather than a hairline under every
 * row, which keeps dense technical data readable without looking like a table
 * of rules.
 */
export function SpecList({
  items,
  className,
}: {
  items: { label: string; value: string; note?: string }[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <dl className={cn("overflow-hidden rounded-[18px] border border-line", className)}>
      {items.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            "grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8 sm:px-6",
            index % 2 === 1 ? "bg-cotton" : "bg-white",
          )}
        >
          <dt className="text-small font-semibold text-ink">{item.label}</dt>
          <dd className="text-small text-ink-muted">
            {item.value}
            {item.note ? <span className="mt-1 block text-ink-subtle">{item.note}</span> : null}
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
  tone = "default",
}: {
  items: readonly string[];
  className?: string;
  columns?: 1 | 2;
  tone?: "default" | "inverse";
}) {
  if (items.length === 0) return null;

  return (
    <ul
      className={cn(
        "text-small",
        tone === "inverse" ? "text-white/75" : "text-ink-muted",
        columns === 2 ? "grid gap-x-10 gap-y-3 sm:grid-cols-2" : "space-y-3",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className={cn(
              "mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full",
              tone === "inverse" ? "bg-white/45" : "bg-forest",
            )}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Check mark used for assurance and support lists. */
export function CheckMark({ tone = "default" }: { tone?: "default" | "inverse" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
        tone === "inverse" ? "bg-white/15" : "bg-forest-soft",
      )}
    >
      <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
        <path
          d="M1 5.2 4.2 8.4 11 1.6"
          stroke={tone === "inverse" ? "#ffffff" : "#087a55"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Large figure with a label, used for scale and summary statistics. */
export function Stat({
  value,
  label,
  hint,
  tone = "default",
  className,
}: {
  value: string;
  label: string;
  hint?: string;
  tone?: "default" | "inverse";
  className?: string;
}) {
  return (
    <div className={className}>
      <p
        className={cn(
          "tw-tnum font-sans text-[clamp(1.9rem,2.4vw,2.6rem)] font-semibold leading-none tracking-[-0.03em]",
          tone === "inverse" ? "text-white" : "text-ink",
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-2.5 text-label font-semibold uppercase tracking-[0.09em]",
          tone === "inverse" ? "text-white/55" : "text-ink-subtle",
        )}
      >
        {label}
      </p>
      {hint ? (
        <p
          className={cn(
            "mt-2 text-small",
            tone === "inverse" ? "text-white/65" : "text-ink-muted",
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty and message states                                                    */
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
    <div className={cn("rounded-[20px] bg-cotton px-6 py-16 text-center", className)}>
      <p className="font-sans text-h3 font-semibold text-ink">{title}</p>
      <p className="mx-auto mt-3 max-w-[52ch] text-small text-ink-muted">{description}</p>
      {action ? <div className="mt-8 flex justify-center">{action}</div> : null}
    </div>
  );
}

/** Inline notice for form errors and content integrity disclosures. */
export function Notice({
  tone = "info",
  title,
  children,
  className,
  role,
}: {
  tone?: "info" | "error" | "success" | "quiet";
  title?: string;
  children: ReactNode;
  className?: string;
  role?: "alert" | "status";
}) {
  const tones = {
    info: "bg-blue-soft",
    error: "border border-error/25 bg-error/5",
    success: "bg-forest-soft",
    quiet: "bg-cotton",
  }[tone];

  return (
    <div role={role} className={cn("rounded-[16px] px-5 py-4", tones, className)}>
      {title ? <p className="text-small font-semibold text-ink">{title}</p> : null}
      <div className={cn("text-small text-ink-muted", title ? "mt-1.5" : undefined)}>
        {children}
      </div>
    </div>
  );
}

/**
 * Small print used for truthful disclosure that should stay available without
 * becoming a prominent apology in the middle of the page.
 */
export function Footnote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("max-w-[64ch] text-small text-ink-subtle", className)}>{children}</p>
  );
}
