"use client";

import { useMemo, useRef, useState } from "react";
import { SelectField, TextField } from "@/components/forms/fields";
import { QuickQuoteForm } from "@/components/forms/quick-quote-form";
import { ButtonLink } from "@/components/ui";
import { productFamilies } from "@/content/fallback/products";
import { productionScaleSteps } from "@/content/fallback/company";
import { classifyQuantity, quantityBandDetails, type QuantityBand } from "@/lib/utilities/quantity";

/**
 * Free, no-email project readiness check, paired with the quick quote form.
 *
 * This is the site's lead magnet: a complete, useful answer to a narrow
 * question ("does my order fit, and what do I need ready") given away before
 * anyone is asked for contact details. Everything it shows is drawn from
 * content already published elsewhere (production scale steps, the tech pack
 * FAQ) rather than any figure invented for this tool, so it cannot say
 * anything the rest of the site does not already say.
 *
 * Selecting a product and quantity here also prefills the quick quote form
 * below it, so nothing has to be typed twice.
 */

const bandToStepIndex: Record<QuantityBand, number> = {
  validation: 0,
  small: 1,
  growth: 2,
  wholesale: 3,
  enterprise: 4,
};

const techPackOptions = [
  { value: "yes", label: "Yes, a complete tech pack" },
  { value: "partial", label: "Partial, some measurements or artwork" },
  { value: "no", label: "No, not yet" },
];

export function ReadinessAndQuote() {
  const [productFamily, setProductFamily] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [techPack, setTechPack] = useState("");
  const quoteFormRef = useRef<HTMLDivElement | null>(null);

  const productFamilyOptions = useMemo(
    () => [
      ...productFamilies.map((family) => ({ value: family.slug, label: family.name })),
      { value: "not-listed", label: "Not listed, I will describe it" },
    ],
    [],
  );

  const quantity = Number(quantityInput);
  const band = Number.isFinite(quantity) && quantity > 0 ? classifyQuantity(quantity) : null;
  const stage = band ? productionScaleSteps[bandToStepIndex[band]] : null;
  const family = productFamily ? productFamilies.find((f) => f.slug === productFamily) : undefined;

  const showResult = Boolean(band && (productFamily || quantityInput));

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-6">
      <div className="tw-panel tw-panel-pad">
        <p className="text-label font-semibold uppercase tracking-[0.09em] text-ink-subtle">
          Check your fit
        </p>
        <h2 className="mt-3 font-sans text-h3 font-semibold tracking-[-0.032em] text-ink">
          Three questions, an honest answer
        </h2>

        <div className="mt-8 grid gap-6">
          <SelectField
            id="readiness-product"
            label="Product category"
            value={productFamily}
            options={productFamilyOptions}
            onChange={(event) => setProductFamily(event.target.value)}
          />
          <TextField
            id="readiness-quantity"
            label="Estimated quantity"
            type="number"
            min={1}
            hint="Per style, roughly is fine."
            value={quantityInput}
            onChange={(event) => setQuantityInput(event.target.value)}
          />
          <SelectField
            id="readiness-techpack"
            label="Do you have a tech pack or specification?"
            value={techPack}
            options={techPackOptions}
            onChange={(event) => setTechPack(event.target.value)}
          />
        </div>
      </div>

      <div className="tw-panel tw-panel-pad bg-cotton">
        {showResult && stage ? (
          <div>
            <p className="text-label font-semibold uppercase tracking-[0.09em] text-ink-subtle">
              What this looks like
            </p>
            <p className="mt-3 font-sans text-h3 font-semibold tracking-[-0.032em] text-forest">
              {quantityBandDetails[band!].label}
            </p>
            <p className="mt-1 text-small font-semibold text-ink">{stage.title}</p>
            <p className="mt-2 text-small leading-relaxed text-ink-muted">{stage.description}</p>

            {family ? (
              <p className="mt-4 text-small leading-relaxed text-ink-muted">
                For {family.name.toLowerCase()}, this is checked against material availability,
                construction and decoration during technical review before anything is quoted.
              </p>
            ) : null}

            <div className="mt-6 border-t border-line pt-6">
              <p className="text-small font-semibold text-ink">Before you request a quote</p>
              <p className="mt-2 text-small leading-relaxed text-ink-muted">
                {techPack === "yes"
                  ? "A tech pack makes quoting faster and more accurate. Attach it when you send the details below."
                  : techPack === "partial"
                    ? "Partial specifications are enough to start. We confirm the rest with you during technical review."
                    : "A tech pack is not required to start. A clear description and a reference garment are enough, and our team can help develop a specification with you."}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={
                  productFamily && productFamily !== "not-listed"
                    ? `/request-a-quote?product=${productFamily}`
                    : "/request-a-quote"
                }
                variant="secondary"
              >
                Skip ahead to a full quote
              </ButtonLink>
              <button
                type="button"
                onClick={() => quoteFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="inline-flex min-h-[52px] items-center justify-center rounded-[10px] border border-forest bg-forest px-6 text-small font-semibold text-white transition-colors duration-150 hover:border-forest-deep hover:bg-forest-deep active:scale-[0.98]"
              >
                Get a quick estimate below
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-center">
            <p className="text-small leading-relaxed text-ink-muted">
              Select a product category and an estimated quantity to see what stage your
              project falls into and what to have ready, before you share any contact details.
            </p>
          </div>
        )}
      </div>

      <div ref={quoteFormRef} className="lg:col-span-2 lg:mt-4">
        <div className="max-w-[70ch] border-t border-line pt-10">
          <h2 className="font-sans text-h3 font-semibold tracking-[-0.032em] text-ink">
            Get a quick estimate
          </h2>
          <p className="mt-3 max-w-[58ch] text-small leading-relaxed text-ink-muted">
            Five fields instead of a full specification. Someone replies with an initial read
            on fit, not a final price, and you can move to a full quotation whenever you are
            ready.
          </p>
          <div className="mt-8">
            <QuickQuoteForm
              productFamily={productFamily}
              onProductFamilyChange={setProductFamily}
              estimatedQuantity={quantityInput}
              onEstimatedQuantityChange={setQuantityInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
