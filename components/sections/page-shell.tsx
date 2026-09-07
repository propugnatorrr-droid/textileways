import Link from "next/link";
import type { ReactNode } from "react";
import {
  Container,
  DisplayHeading,
  Eyebrow,
  Lede,
  Section,
  Panel,
  StatusTag,
} from "@/components/ui";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { Reveal } from "@/components/content/reveal";
import { QuoteCta } from "@/components/sections/quote-cta";
import { WhatsappInlineLink } from "@/components/layout/whatsapp-button";
import type { BreadcrumbEntry } from "@/lib/seo/structured-data";
import { cn } from "@/lib/utilities/cn";

/**
 * Shared interior page system.
 *
 * Every public route builds from these pieces, so a change here reaches the
 * whole site rather than one template. They use the same tokens and surfaces as
 * the homepage, which is what keeps interior pages at the same visual quality.
 */

/* -------------------------------------------------------------------------- */
/* Page hero                                                                   */
/* -------------------------------------------------------------------------- */

export function PageHeader({
  eyebrow,
  title,
  lede,
  breadcrumbs,
  status,
  actions,
  aside,
  size = "h1",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  breadcrumbs?: BreadcrumbEntry[];
  status?: { label: string; tone?: "neutral" | "forest" | "clay" | "muted"; note?: string };
  actions?: ReactNode;
  aside?: ReactNode;
  size?: "display-l" | "h1" | "h2";
}) {
  return (
    <Section size="tight" className="bg-white pt-6 md:pt-8">
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <div className="mb-8">
            <Breadcrumbs entries={breadcrumbs} />
          </div>
        ) : null}

        <div
          className={cn(
            "grid gap-10",
            aside
              ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-16"
              : undefined,
          )}
        >
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <DisplayHeading level={1} size={size} className="mt-4 max-w-[18ch]">
              {title}
            </DisplayHeading>

            {lede ? <Lede className="mt-6">{lede}</Lede> : null}

            {status ? (
              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
                <StatusTag tone={status.tone ?? "forest"}>{status.label}</StatusTag>
                {status.note ? (
                  <span className="max-w-[52ch] text-small text-ink-subtle">{status.note}</span>
                ) : null}
              </div>
            ) : null}

            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>

          {aside ? <div>{aside}</div> : null}
        </div>
      </Container>
    </Section>
  );
}

/** Compact aside used beside a page hero for supporting notes. */
export function HeaderAside({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[20px] bg-cotton p-6 sm:p-8">
      <p className="text-label font-semibold uppercase tracking-[0.1em] text-ink-subtle">
        {title}
      </p>
      <div className="mt-5 space-y-3 text-small text-ink-muted">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Long form content                                                           */
/* -------------------------------------------------------------------------- */

export function ProseBlock({
  paragraphs,
  className,
}: {
  paragraphs: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("tw-prose", className)}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Split section                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Heading on the left, content on the right. The heading column is wide enough
 * that a long title does not wrap into a narrow ribbon, and the content column
 * takes the rest of the width so nothing is stranded on a wide screen.
 */
export function SplitSection({
  eyebrow,
  title,
  intro,
  children,
  className,
  id,
  tight = false,
  tone = "default",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  tight?: boolean;
  tone?: "default" | "panel";
}) {
  const body = (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <DisplayHeading level={2} size="h3" className={cn("max-w-[18ch]", eyebrow && "mt-4")}>
          {title}
        </DisplayHeading>
        {intro ? <p className="mt-4 max-w-[46ch] text-small text-ink-muted">{intro}</p> : null}
      </div>
      <div>{children}</div>
    </div>
  );

  return (
    <Section id={id} size={tight ? "tight" : "default"} className={cn("bg-white", className)}>
      <Container>{tone === "panel" ? <Panel>{body}</Panel> : body}</Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Related content                                                             */
/* -------------------------------------------------------------------------- */

export function RelatedGrid({
  title,
  items,
  columns = 3,
}: {
  title: string;
  items: { href: string; label: string; description?: string }[];
  columns?: 2 | 3 | 4;
}) {
  if (items.length === 0) return null;

  const columnClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div>
      <h2 className="text-label font-semibold uppercase tracking-[0.1em] text-ink-subtle">
        {title}
      </h2>
      <ul className={cn("mt-6 grid gap-4", columnClass)}>
        {items.map((item, index) => (
          <Reveal key={item.href + item.label} as="li" delay={(index % 4) * 55} className="h-full">
            <Link
              href={item.href}
              className="tw-card tw-card-interactive group flex h-full flex-col p-5"
            >
              <span className="inline-flex items-start justify-between gap-3 text-small font-semibold text-ink transition-colors duration-200 group-hover:text-forest-deep">
                {item.label}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-ink-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-forest"
                >
                  &rarr;
                </span>
              </span>
              {item.description ? (
                <span className="mt-2 text-small text-ink-muted">{item.description}</span>
              ) : null}
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Process track                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Numbered stages joined by a rule down the left. Reads as a sequence rather
 * than a stack of identical cards.
 */
export function ProcessList({
  stages,
}: {
  stages: readonly { title: string; description: string }[];
}) {
  return (
    <ol className="relative">
      <span aria-hidden="true" className="absolute bottom-6 left-[15px] top-6 w-px bg-line" />
      {stages.map((stage, index) => (
        <li key={stage.title} className="relative flex gap-5 py-5 first:pt-0 last:pb-0">
          <span
            aria-hidden="true"
            className="tw-tnum relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-soft text-label font-semibold text-forest-deep"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="pt-1">
            <h3 className="text-body font-semibold text-ink">{stage.title}</h3>
            <p className="mt-1.5 max-w-[62ch] text-small text-ink-muted">{stage.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* -------------------------------------------------------------------------- */
/* Closing call to action                                                      */
/* -------------------------------------------------------------------------- */

export function PageCta({
  title,
  description,
  location,
  primaryLabel = "Request a Quote",
  productFamily,
  whatsapp,
}: {
  title: string;
  description: string;
  location: string;
  primaryLabel?: string;
  productFamily?: string;
  /** Context for the WhatsApp action, so the prefilled message names this page. */
  whatsapp?: { pageLabel: string; path: string; detail?: string };
}) {
  return (
    <Section size="large" className="bg-white">
      <Container>
        <Panel tone="ink">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <DisplayHeading level={2} size="h3" className="max-w-[20ch] text-white">
              {title}
            </DisplayHeading>

            <div>
              <p className="max-w-[52ch] text-body text-white/75">{description}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <QuoteCta location={location} productFamily={productFamily} variant="inverse">
                  {primaryLabel}
                </QuoteCta>

                {whatsapp ? (
                  <WhatsappInlineLink
                    context={whatsapp}
                    location={location}
                    variant="inverse-outline"
                  />
                ) : null}

                <Link
                  href="/contact"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] border border-white/30 px-6 text-small font-semibold text-white transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10"
                >
                  Ask a question
                </Link>
              </div>
            </div>
          </div>
        </Panel>
      </Container>
    </Section>
  );
}
