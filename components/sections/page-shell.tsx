import Link from "next/link";
import type { ReactNode } from "react";
import {
  Container,
  DisplayHeading,
  Eyebrow,
  Lede,
  Section,
  StatusTag,
} from "@/components/ui";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { Reveal } from "@/components/content/reveal";
import { QuoteCta } from "@/components/sections/quote-cta";
import { WhatsappInlineLink } from "@/components/layout/whatsapp-button";
import type { BreadcrumbEntry } from "@/lib/seo/structured-data";
import { cn } from "@/lib/utilities/cn";

/**
 * Standard page opening: breadcrumbs, eyebrow, heading, lede and optional
 * status. Used by every interior route so page starts are consistent.
 */
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
    <Section tight className="">
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <div className="mb-10">
            <Breadcrumbs entries={breadcrumbs} />
          </div>
        ) : null}

        <div
          className={cn(
            "grid gap-10",
            aside ? "lg:grid-cols-[1.25fr_1fr] lg:gap-20" : undefined,
          )}
        >
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <DisplayHeading level={1} size={size} className="mt-6 max-w-[20ch]">
              {title}
            </DisplayHeading>

            {status ? (
              <div className="mt-7">
                <StatusTag tone={status.tone ?? "forest"}>{status.label}</StatusTag>
                {status.note ? (
                  <p className="mt-3 max-w-[58ch] text-small text-ink-subtle">{status.note}</p>
                ) : null}
              </div>
            ) : null}

            {lede ? <Lede className="mt-7">{lede}</Lede> : null}
            {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
          </div>

          {aside ? <div className="lg:pt-2">{aside}</div> : null}
        </div>
      </Container>
    </Section>
  );
}

/** Editorial prose block constrained to a comfortable reading width. */
export function ProseBlock({
  paragraphs,
  className,
}: {
  paragraphs: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("tw-prose text-body-l leading-relaxed text-ink-muted", className)}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}

/** Two column section with a sticky heading beside detailed content. */
export function SplitSection({
  eyebrow,
  title,
  intro,
  children,
  className,
  id,
  tight = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  tight?: boolean;
}) {
  return (
    <Section id={id} tight={tight} className={cn("border-b border-line", className)}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <DisplayHeading level={2} size="h3" className={eyebrow ? "mt-5" : undefined}>
              {title}
            </DisplayHeading>
            {intro ? (
              <p className="mt-4 max-w-[46ch] text-small leading-relaxed text-ink-muted">
                {intro}
              </p>
            ) : null}
          </div>
          <div>{children}</div>
        </div>
      </Container>
    </Section>
  );
}

/** Card grid of related content, used at the foot of detail pages. */
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
      <h2 className="mb-6 border-b border-line pb-3 text-label font-medium uppercase tracking-[0.09em] text-ink-subtle">
        {title}
      </h2>
      <ul className={cn("grid gap-4", columnClass)}>
        {items.map((item, index) => (
          <Reveal key={item.href + item.label} as="li" delay={(index % 4) * 55} className="tw-card tw-card-interactive overflow-hidden rounded-[22px]">
            <Link
              href={item.href}
              className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-cotton"
            >
              <span className="text-small font-semibold text-ink transition-colors duration-200 group-hover:text-forest">
                {item.label}
              </span>
              {item.description ? (
                <span className="mt-2 text-small leading-relaxed text-ink-muted">
                  {item.description}
                </span>
              ) : null}
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/** Numbered process list used on capability and process pages. */
export function ProcessList({
  stages,
}: {
  stages: readonly { title: string; description: string }[];
}) {
  return (
    <ol className="border-t border-line">
      {stages.map((stage, index) => (
        <li
          key={stage.title}
          className="grid gap-2 border-b border-line py-6 sm:grid-cols-[3rem_minmax(0,14rem)_1fr] sm:gap-6"
        >
          <span aria-hidden="true" className="font-sans text-h3 font-semibold leading-none tracking-[-0.04em] text-stone">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-small font-semibold text-ink">{stage.title}</h3>
          <p className="text-small leading-relaxed text-ink-muted">{stage.description}</p>
        </li>
      ))}
    </ol>
  );
}

/** Closing conversion band used at the end of interior pages. */
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
    <Section tight className="bg-forest text-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-20">
          <DisplayHeading level={2} size="h3" className="max-w-[22ch] text-white">
            {title}
          </DisplayHeading>
          <div>
            <p className="max-w-[52ch] text-body leading-relaxed text-white/80">
              {description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <QuoteCta location={location} productFamily={productFamily} variant="inverse">
                {primaryLabel}
              </QuoteCta>
              {whatsapp ? (
                <WhatsappInlineLink
                  context={whatsapp}
                  location={location}
                  variant="inverse"
                />
              ) : null}
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[14px] border border-white/35 px-6 text-small font-medium text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
              >
                Ask a question
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
