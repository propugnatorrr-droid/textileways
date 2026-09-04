"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/content/types";

/**
 * FAQ accordion.
 *
 * Built from buttons and regions rather than details elements so the open state
 * can be controlled and announced. Items are separated by a hairline rule with
 * no container box, and the toggle uses a plus and minus mark.
 */
export function FaqAccordion({
  items,
  headingLevel = 3,
}: {
  items: FaqItem[];
  headingLevel?: 2 | 3;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const baseId = useId();
  const Heading = `h${headingLevel}` as "h2" | "h3";

  if (items.length === 0) return null;

  return (
    <div className="border-t border-line">
      {items.map((item) => {
        const expanded = open === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div key={item.id} className="border-b border-line">
            <Heading>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : item.id)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span className="text-body font-medium text-ink">{item.question}</span>
                <span
                  aria-hidden="true"
                  className="relative mt-1.5 h-3 w-3 shrink-0 text-ink-subtle"
                >
                  <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                  <span
                    className={`absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-200 ${
                      expanded ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </Heading>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded}
              className="pb-6"
            >
              <p className="max-w-[70ch] text-small leading-relaxed text-ink-muted">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
