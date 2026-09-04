"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  rfqStepSchemas,
  rfqStepTitles,
  rfqStepFields,
  decorationOptions,
  decorationOptionLabels,
  type RfqFormValues,
} from "@/lib/validation/rfq";
import {
  buyerTypes,
  buyerTypeLabels,
  companyStages,
  companyStageLabels,
  shippingTerms,
  shippingTermLabels,
} from "@/lib/validation/shared";
import { productFamilies } from "@/content/fallback/products";
import {
  TextField,
  TextAreaField,
  SelectField,
  CheckboxField,
  CheckboxGroup,
  RadioGroup,
  HoneypotField,
  ErrorSummary,
} from "@/components/forms/fields";
import { FileUpload, type SelectedFile } from "@/components/forms/file-upload";
import { TurnstileWidget, turnstileEnabled } from "@/components/forms/turnstile";
import { Notice, Button } from "@/components/ui";
import { track } from "@/lib/analytics/track";
import { quantityBandLabel } from "@/lib/utilities/quantity";
import { cn } from "@/lib/utilities/cn";
import { useStoredJson } from "@/lib/hooks/use-browser-storage";

/**
 * Multi step RFQ form.
 *
 * Behaviour worth noting:
 *
 * - progress is saved to sessionStorage on every change, so a browser reload,
 *   an accidental navigation or a server error does not lose a buyer's work
 * - each step validates only its own fields, so a buyer is never blocked by a
 *   field on a step they have not reached
 * - submission failures preserve every entry and allow a safe retry
 * - the honeypot, the render timestamp and Turnstile all travel with the payload
 */

const STORAGE_KEY = "textileways.rfq.draft";
const TOTAL_STEPS = rfqStepTitles.length;

const emptyValues: RfqFormValues = {
  fullName: "",
  email: "",
  phone: "",
  whatsapp: "",
  company: "",
  website: "",
  country: "",
  buyerType: "brand-owner",
  companyStage: "pre-launch",
  productFamily: "",
  productType: "",
  styleCount: 1,
  estimatedQuantity: 50,
  colorwayCount: 1,
  sizeRange: "",
  targetMarket: "",
  productDescription: "",
  knownMaterial: "",
  composition: "",
  weight: "",
  stretchRequirement: "",
  performanceRequirement: "",
  colorRequirement: "",
  needsMaterialRecommendation: false,
  decoration: [],
  decorationNotes: "",
  requiredDeliveryDate: "",
  destinationCity: "",
  destinationCountry: "",
  shippingTerm: "not-sure",
  targetPrice: "",
  sampleRequired: "not-sure",
  supplierStatus: "new-development",
  additionalNotes: "",
  attachments: [],
  privacyConsent: false as unknown as true,
  designReviewConsent: false as unknown as true,
  marketingConsent: false,
};

const fieldLabels: Record<string, string> = {
  fullName: "Full name",
  email: "Work email",
  phone: "Phone",
  company: "Company",
  country: "Country",
  buyerType: "Buyer type",
  companyStage: "Company stage",
  productFamily: "Product family",
  productType: "Product type",
  styleCount: "Number of styles",
  estimatedQuantity: "Estimated quantity",
  colorwayCount: "Number of colourways",
  sizeRange: "Size range",
  targetMarket: "Target market",
  productDescription: "Product description",
  requiredDeliveryDate: "Required delivery date",
  destinationCity: "Destination city",
  destinationCountry: "Destination country",
  shippingTerm: "Shipping term",
  sampleRequired: "Sample required",
  supplierStatus: "Supplier status",
  privacyConsent: "Privacy consent",
  designReviewConsent: "Design review consent",
};

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string; warning?: string }
  | { status: "error"; message: string };

export function RfqForm() {
  const searchParams = useSearchParams();

  /*
   * A saved draft is read through useSyncExternalStore rather than in an effect.
   * React renders the server snapshot (null) during server rendering and
   * hydration, then switches to the stored value, so there is no hydration
   * mismatch and no extra render caused by a setState inside an effect.
   */
  const draft = useStoredJson<Partial<RfqFormValues>>("session", STORAGE_KEY);

  /*
   * A product family can be preselected with ?product=<slug>. Read during render,
   * because the value is identical on the server and the client.
   */
  const preselectedFamily = (() => {
    const requested = searchParams.get("product");
    return requested && productFamilies.some((family) => family.slug === requested)
      ? requested
      : null;
  })();

  /* Fields the visitor has edited in this session, layered over the draft below. */
  const [edits, setEdits] = useState<Partial<RfqFormValues>>({});
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" });
  const [draftDismissed, setDraftDismissed] = useState(false);

  const storedDraft = draftDismissed ? null : draft.value;

  /*
   * Consent is deliberately never restored from a draft. It has to be given
   * again, deliberately, on the final step of every submission.
   */
  const values: RfqFormValues = useMemo(
    () => ({
      ...emptyValues,
      ...(storedDraft ?? {}),
      ...(preselectedFamily && !edits.productFamily
        ? { productFamily: preselectedFamily }
        : {}),
      ...edits,
      privacyConsent: (edits.privacyConsent ?? false) as true,
      designReviewConsent: (edits.designReviewConsent ?? false) as true,
    }),
    [storedDraft, preselectedFamily, edits],
  );

  const restored = storedDraft !== null;

  /*
   * Timestamp for the minimum completion time check. Set on mount rather than
   * during render, because Date.now() is impure.
   */
  const formStartedAt = useRef<number>(0);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const startTracked = useRef(false);

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  /*
   * Persist the draft on every edit.
   *
   * Writing here rather than in an effect keeps the write next to the change
   * that caused it. Consent and attachments are excluded: consent must be given
   * again each time, and File objects cannot be serialised.
   */
  const setValue = useCallback(
    <K extends keyof RfqFormValues>(key: K, value: RfqFormValues[K]) => {
      const nextEdits = { ...edits, [key]: value };
      setEdits(nextEdits);

      /* The write happens outside the state updater so it runs exactly once. */
      const {
        privacyConsent: _privacy,
        designReviewConsent: _design,
        attachments: _attachments,
        ...persistable
      } = { ...emptyValues, ...(draft.value ?? {}), ...nextEdits };
      void _privacy;
      void _design;
      void _attachments;
      draft.write(persistable);

      setErrors((current) => {
        if (!current[key as string]) return current;
        const next = { ...current };
        delete next[key as string];
        return next;
      });

      if (!startTracked.current) {
        startTracked.current = true;
        track("rfq_start", { page: "request-a-quote" });
      }
    },
    [draft, edits],
  );

  const validateStep = useCallback(
    (index: number): boolean => {
      const schema = rfqStepSchemas[index];
      const fields = rfqStepFields[index];
      const subset = Object.fromEntries(
        fields.map((field) => [field, values[field]]),
      ) as Record<string, unknown>;

      const result = schema.safeParse(subset);
      if (result.success) {
        setErrors({});
        return true;
      }

      const stepErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!stepErrors[key]) stepErrors[key] = issue.message;
      }
      setErrors(stepErrors);
      return false;
    },
    [values],
  );

  const goToStep = useCallback((index: number) => {
    setStep(index);
    /* Move focus to the step heading so screen reader users know the view changed. */
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }, []);

  const next = useCallback(() => {
    if (!validateStep(step)) {
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLElement>("[data-error-summary]")?.focus();
      });
      return;
    }
    track("rfq_step_complete", { step: step + 1, step_name: rfqStepTitles[step] });
    goToStep(Math.min(step + 1, TOTAL_STEPS - 1));
  }, [goToStep, step, validateStep]);

  const back = useCallback(() => {
    setErrors({});
    goToStep(Math.max(step - 1, 0));
  }, [goToStep, step]);

  const submit = useCallback(async () => {
    if (!validateStep(TOTAL_STEPS - 1)) {
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLElement>("[data-error-summary]")?.focus();
      });
      return;
    }

    if (turnstileEnabled() && turnstileToken.length === 0) {
      setSubmission({
        status: "error",
        message: "Please complete the spam check before submitting.",
      });
      return;
    }

    setSubmission({ status: "submitting" });

    const payload = {
      ...values,
      attachments: files.map((item) => ({
        name: item.file.name,
        type: item.file.type,
        size: item.file.size,
      })),
      companyRole: honeypot,
      formStartedAt: formStartedAt.current,
      turnstileToken,
    };

    const body = new FormData();
    body.append("payload", JSON.stringify(payload));
    for (const item of files) body.append("files", item.file);

    try {
      const response = await fetch("/api/rfq", { method: "POST", body });
      const result = (await response.json()) as {
        ok: boolean;
        reference?: string;
        error?: string;
        warning?: string;
        fieldErrors?: Record<string, string>;
      };

      if (!response.ok || !result.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors);
        setTurnstileReset((count) => count + 1);
        setTurnstileToken("");
        setSubmission({
          status: "error",
          message:
            result.error ??
            "Your request could not be submitted. Your entries have been kept, so you can try again.",
        });
        return;
      }

      track("rfq_submit", {
        product_family: values.productFamily,
        quantity_band: quantityBandLabel(values.estimatedQuantity) ?? "unknown",
        buyer_market: values.targetMarket,
      });

      draft.clear();
      setDraftDismissed(true);

      setSubmission({
        status: "success",
        reference: result.reference ?? "",
        warning: result.warning,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setTurnstileReset((count) => count + 1);
      setTurnstileToken("");
      setSubmission({
        status: "error",
        message:
          "We could not reach the server. Check your connection and try again. Your entries have been kept.",
      });
    }
  }, [draft, files, honeypot, turnstileToken, validateStep, values]);

  const productFamilyOptions = useMemo(
    () => [
      ...productFamilies.map((family) => ({ value: family.slug, label: family.name })),
      { value: "not-listed", label: "Not listed, I will describe it" },
    ],
    [],
  );

  if (submission.status === "success") {
    return <RfqSuccess reference={submission.reference} warning={submission.warning} />;
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-16">
      <StepNavigation current={step} onSelect={goToStep} />

      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-serif text-h3 outline-none"
        >
          Step {step + 1} of {TOTAL_STEPS}: {rfqStepTitles[step]}
        </h2>

        {restored && step === 0 ? (
          <Notice tone="info" className="mt-6">
            Your previous entries have been restored. Consent has been cleared and needs to be
            given again on the final step.
          </Notice>
        ) : null}

        {submission.status === "error" ? (
          <Notice tone="error" title="Submission failed" role="alert" className="mt-6">
            {submission.message}
          </Notice>
        ) : null}

        <div className="mt-8">
          <ErrorSummary errors={errors} labels={fieldLabels} />
        </div>

        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            if (step === TOTAL_STEPS - 1) void submit();
            else next();
          }}
          className="relative mt-8 space-y-8"
        >
          <HoneypotField value={honeypot} onChange={setHoneypot} />

          {step === 0 ? (
            <BuyerStep values={values} errors={errors} setValue={setValue} />
          ) : null}
          {step === 1 ? (
            <ProductStep
              values={values}
              errors={errors}
              setValue={setValue}
              options={productFamilyOptions}
            />
          ) : null}
          {step === 2 ? (
            <MaterialsStep values={values} errors={errors} setValue={setValue} />
          ) : null}
          {step === 3 ? (
            <CustomisationStep values={values} errors={errors} setValue={setValue} />
          ) : null}
          {step === 4 ? (
            <CommercialStep values={values} errors={errors} setValue={setValue} />
          ) : null}
          {step === 5 ? <AttachmentsStep files={files} setFiles={setFiles} /> : null}
          {step === 6 ? (
            <ReviewStep
              values={values}
              errors={errors}
              setValue={setValue}
              fileCount={files.length}
              onEdit={goToStep}
              turnstileReset={turnstileReset}
              onToken={setTurnstileToken}
            />
          ) : null}

          <div className="flex flex-wrap items-center gap-3 border-t border-line pt-8">
            {step > 0 ? (
              <Button type="button" variant="secondary" onClick={back}>
                Back
              </Button>
            ) : null}

            {step < TOTAL_STEPS - 1 ? (
              <Button type="submit">Continue</Button>
            ) : (
              <Button type="submit" disabled={submission.status === "submitting"}>
                {submission.status === "submitting" ? "Submitting..." : "Submit quote request"}
              </Button>
            )}

            <p className="text-small text-ink-subtle" role="status">
              {submission.status === "submitting"
                ? "Sending your request"
                : `Step ${step + 1} of ${TOTAL_STEPS}`}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function StepNavigation({
  current,
  onSelect,
}: {
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav aria-label="Quote request steps" className="lg:sticky lg:top-28 lg:self-start">
      <ol className="divide-y divide-line border-y border-line">
        {rfqStepTitles.map((title, index) => {
          const isCurrent = index === current;
          const isComplete = index < current;

          return (
            <li key={title}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                disabled={index > current}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex min-h-[52px] w-full items-center gap-4 text-left text-small transition-colors duration-200",
                  isCurrent ? "font-semibold text-forest" : "text-ink-muted",
                  index > current ? "cursor-not-allowed opacity-45" : "hover:text-forest",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center border text-label",
                    isCurrent
                      ? "border-forest bg-forest text-paper"
                      : isComplete
                        ? "border-forest text-forest"
                        : "border-line-strong text-ink-subtle",
                  )}
                >
                  {index + 1}
                </span>
                {title}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */

interface StepProps {
  values: RfqFormValues;
  errors: Record<string, string>;
  setValue: <K extends keyof RfqFormValues>(key: K, value: RfqFormValues[K]) => void;
}

function BuyerStep({ values, errors, setValue }: StepProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <TextField
        id="field-fullName"
        label="Full name"
        required
        autoComplete="name"
        value={values.fullName}
        error={errors.fullName}
        onChange={(event) => setValue("fullName", event.target.value)}
      />
      <TextField
        id="field-email"
        label="Work email"
        type="email"
        required
        autoComplete="email"
        value={values.email}
        error={errors.email}
        onChange={(event) => setValue("email", event.target.value)}
      />
      <TextField
        id="field-phone"
        label="Phone"
        type="tel"
        required
        autoComplete="tel"
        hint="Include the country code."
        value={values.phone}
        error={errors.phone}
        onChange={(event) => setValue("phone", event.target.value)}
      />
      <TextField
        id="field-whatsapp"
        label="WhatsApp"
        type="tel"
        value={values.whatsapp}
        error={errors.whatsapp}
        onChange={(event) => setValue("whatsapp", event.target.value)}
      />
      <TextField
        id="field-company"
        label="Company"
        required
        autoComplete="organization"
        value={values.company}
        error={errors.company}
        onChange={(event) => setValue("company", event.target.value)}
      />
      <TextField
        id="field-website"
        label="Website"
        value={values.website}
        error={errors.website}
        onChange={(event) => setValue("website", event.target.value)}
      />
      <TextField
        id="field-country"
        label="Country"
        required
        autoComplete="country-name"
        value={values.country}
        error={errors.country}
        onChange={(event) => setValue("country", event.target.value)}
      />
      <SelectField
        id="field-buyerType"
        label="Buyer type"
        required
        value={values.buyerType}
        error={errors.buyerType}
        options={buyerTypes.map((value) => ({ value, label: buyerTypeLabels[value] }))}
        onChange={(event) =>
          setValue("buyerType", event.target.value as RfqFormValues["buyerType"])
        }
      />
      <SelectField
        id="field-companyStage"
        label="Company stage"
        required
        className="sm:col-span-2"
        value={values.companyStage}
        error={errors.companyStage}
        options={companyStages.map((value) => ({ value, label: companyStageLabels[value] }))}
        onChange={(event) =>
          setValue("companyStage", event.target.value as RfqFormValues["companyStage"])
        }
      />
    </div>
  );
}

function ProductStep({
  values,
  errors,
  setValue,
  options,
}: StepProps & { options: { value: string; label: string }[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <SelectField
        id="field-productFamily"
        label="Product family"
        required
        className="sm:col-span-2"
        value={values.productFamily}
        error={errors.productFamily}
        options={options}
        onChange={(event) => setValue("productFamily", event.target.value)}
      />
      <TextField
        id="field-productType"
        label="Product type"
        required
        hint="For example heavyweight hoodie, corporate polo shirt, sublimated team jersey."
        className="sm:col-span-2"
        value={values.productType}
        error={errors.productType}
        onChange={(event) => setValue("productType", event.target.value)}
      />
      <TextField
        id="field-styleCount"
        label="Number of styles"
        type="number"
        min={1}
        required
        value={values.styleCount}
        error={errors.styleCount}
        onChange={(event) => setValue("styleCount", Number(event.target.value))}
      />
      <TextField
        id="field-estimatedQuantity"
        label="Estimated total quantity"
        type="number"
        min={1}
        required
        hint="Pieces across all styles and sizes. An estimate is fine."
        value={values.estimatedQuantity}
        error={errors.estimatedQuantity}
        onChange={(event) => setValue("estimatedQuantity", Number(event.target.value))}
      />
      <TextField
        id="field-colorwayCount"
        label="Number of colourways"
        type="number"
        min={1}
        required
        value={values.colorwayCount}
        error={errors.colorwayCount}
        onChange={(event) => setValue("colorwayCount", Number(event.target.value))}
      />
      <TextField
        id="field-sizeRange"
        label="Size range"
        required
        hint="For example XS to XXL, or a numeric range."
        value={values.sizeRange}
        error={errors.sizeRange}
        onChange={(event) => setValue("sizeRange", event.target.value)}
      />
      <TextField
        id="field-targetMarket"
        label="Target market"
        required
        className="sm:col-span-2"
        hint="Where the finished product will be sold or used."
        value={values.targetMarket}
        error={errors.targetMarket}
        onChange={(event) => setValue("targetMarket", event.target.value)}
      />
      <TextAreaField
        id="field-productDescription"
        label="Product description"
        required
        className="sm:col-span-2"
        hint="Describe the product, its end use and any reference garments. The more detail here, the fewer questions we have to come back with."
        value={values.productDescription}
        error={errors.productDescription}
        onChange={(event) => setValue("productDescription", event.target.value)}
      />
    </div>
  );
}

function MaterialsStep({ values, errors, setValue }: StepProps) {
  return (
    <div className="space-y-8">
      <Notice tone="info">
        Every field on this step is optional. If you do not know the fabric yet, tick the box
        at the bottom and we will propose options against your end use and price position.
      </Notice>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="field-knownMaterial"
          label="Known material"
          hint="For example french terry, pique, poplin."
          value={values.knownMaterial}
          error={errors.knownMaterial}
          onChange={(event) => setValue("knownMaterial", event.target.value)}
        />
        <TextField
          id="field-composition"
          label="Composition"
          hint="For example 100 percent cotton, or 95 cotton 5 elastane."
          value={values.composition}
          error={errors.composition}
          onChange={(event) => setValue("composition", event.target.value)}
        />
        <TextField
          id="field-weight"
          label="Weight"
          hint="In gsm, or ounces per square yard for denim."
          value={values.weight}
          error={errors.weight}
          onChange={(event) => setValue("weight", event.target.value)}
        />
        <TextField
          id="field-stretchRequirement"
          label="Stretch requirement"
          value={values.stretchRequirement}
          error={errors.stretchRequirement}
          onChange={(event) => setValue("stretchRequirement", event.target.value)}
        />
        <TextAreaField
          id="field-performanceRequirement"
          label="Performance requirements"
          rows={4}
          hint="Moisture management, water resistance, durability, flame retardancy and similar."
          value={values.performanceRequirement}
          error={errors.performanceRequirement}
          onChange={(event) => setValue("performanceRequirement", event.target.value)}
        />
        <TextAreaField
          id="field-colorRequirement"
          label="Colour requirements"
          rows={4}
          hint="Pantone references, an existing garment to match, or a general direction."
          value={values.colorRequirement}
          error={errors.colorRequirement}
          onChange={(event) => setValue("colorRequirement", event.target.value)}
        />
      </div>

      <CheckboxField
        id="field-needsMaterialRecommendation"
        label="I would like a material recommendation"
        checked={values.needsMaterialRecommendation}
        onChange={(event) => setValue("needsMaterialRecommendation", event.target.checked)}
      />
    </div>
  );
}

function CustomisationStep({ values, errors, setValue }: StepProps) {
  return (
    <div className="space-y-8">
      <CheckboxGroup
        legend="Decoration and finishing required"
        hint="Select everything that might apply. We confirm the right method against your fabric and artwork during technical review."
        error={errors.decoration}
        columns={3}
        options={decorationOptions.map((value) => ({
          value,
          label: decorationOptionLabels[value],
        }))}
        values={values.decoration}
        onToggle={(value, checked) =>
          setValue(
            "decoration",
            checked
              ? [...values.decoration, value as (typeof decorationOptions)[number]]
              : values.decoration.filter((item) => item !== value),
          )
        }
      />

      <TextAreaField
        id="field-decorationNotes"
        label="Decoration notes"
        rows={5}
        hint="Artwork description, placement, number of colours, or anything specific about branding."
        value={values.decorationNotes}
        error={errors.decorationNotes}
        onChange={(event) => setValue("decorationNotes", event.target.value)}
      />
    </div>
  );
}

function CommercialStep({ values, errors, setValue }: StepProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <TextField
        id="field-requiredDeliveryDate"
        label="Required delivery date"
        type="date"
        required
        value={values.requiredDeliveryDate}
        error={errors.requiredDeliveryDate}
        onChange={(event) => setValue("requiredDeliveryDate", event.target.value)}
      />
      <SelectField
        id="field-shippingTerm"
        label="Preferred shipping term"
        required
        value={values.shippingTerm}
        error={errors.shippingTerm}
        options={shippingTerms.map((value) => ({ value, label: shippingTermLabels[value] }))}
        onChange={(event) =>
          setValue("shippingTerm", event.target.value as RfqFormValues["shippingTerm"])
        }
      />
      <TextField
        id="field-destinationCity"
        label="Destination city"
        required
        value={values.destinationCity}
        error={errors.destinationCity}
        onChange={(event) => setValue("destinationCity", event.target.value)}
      />
      <TextField
        id="field-destinationCountry"
        label="Destination country"
        required
        value={values.destinationCountry}
        error={errors.destinationCountry}
        onChange={(event) => setValue("destinationCountry", event.target.value)}
      />
      <TextField
        id="field-targetPrice"
        label="Target price"
        hint="Per piece, with the currency. This helps us propose the right construction."
        value={values.targetPrice}
        error={errors.targetPrice}
        onChange={(event) => setValue("targetPrice", event.target.value)}
      />

      <div className="sm:col-span-2">
        <RadioGroup
          legend="Do you need a sample before production?"
          name="sampleRequired"
          error={errors.sampleRequired}
          value={values.sampleRequired}
          onChange={(value) =>
            setValue("sampleRequired", value as RfqFormValues["sampleRequired"])
          }
          options={[
            { value: "yes", label: "Yes, I need a sample approved first" },
            { value: "no", label: "No, produce against the specification" },
            { value: "not-sure", label: "Not sure, please advise" },
          ]}
        />
      </div>

      <div className="sm:col-span-2">
        <RadioGroup
          legend="Is this an existing product or a new development?"
          name="supplierStatus"
          error={errors.supplierStatus}
          value={values.supplierStatus}
          onChange={(value) =>
            setValue("supplierStatus", value as RfqFormValues["supplierStatus"])
          }
          options={[
            { value: "existing-supplier", label: "Existing product, currently made elsewhere" },
            { value: "new-development", label: "New development" },
            { value: "both", label: "A mix of both" },
          ]}
        />
      </div>

      <TextAreaField
        id="field-additionalNotes"
        label="Additional notes"
        className="sm:col-span-2"
        rows={5}
        value={values.additionalNotes}
        error={errors.additionalNotes}
        onChange={(event) => setValue("additionalNotes", event.target.value)}
      />
    </div>
  );
}

function AttachmentsStep({
  files,
  setFiles,
}: {
  files: SelectedFile[];
  setFiles: (files: SelectedFile[]) => void;
}) {
  return (
    <div className="space-y-8">
      <Notice tone="info">
        Attachments are optional but they speed everything up. Tech packs, measurement charts,
        reference images, artwork and packaging references are all useful. Files are used only
        to quote, sample and produce your order.
      </Notice>

      <FileUpload files={files} onChange={setFiles} label="Tech packs, artwork and references" />
    </div>
  );
}

function ReviewStep({
  values,
  errors,
  setValue,
  fileCount,
  onEdit,
  turnstileReset,
  onToken,
}: StepProps & {
  fileCount: number;
  onEdit: (index: number) => void;
  turnstileReset: number;
  onToken: (token: string) => void;
}) {
  const summary: { step: number; title: string; rows: { label: string; value: string }[] }[] = [
    {
      step: 0,
      title: "Buyer",
      rows: [
        { label: "Name", value: values.fullName },
        { label: "Email", value: values.email },
        { label: "Company", value: values.company },
        { label: "Country", value: values.country },
      ],
    },
    {
      step: 1,
      title: "Product",
      rows: [
        {
          label: "Product family",
          value:
            productFamilies.find((family) => family.slug === values.productFamily)?.name ??
            "Not listed",
        },
        { label: "Product type", value: values.productType },
        {
          label: "Quantity",
          value: `${values.estimatedQuantity} pieces across ${values.styleCount} ${
            values.styleCount === 1 ? "style" : "styles"
          }`,
        },
        { label: "Size range", value: values.sizeRange },
      ],
    },
    {
      step: 3,
      title: "Customisation",
      rows: [
        {
          label: "Decoration",
          value:
            values.decoration.length > 0
              ? values.decoration.map((item) => decorationOptionLabels[item]).join(", ")
              : "None selected",
        },
      ],
    },
    {
      step: 4,
      title: "Commercial",
      rows: [
        { label: "Required by", value: values.requiredDeliveryDate },
        {
          label: "Destination",
          value: `${values.destinationCity}, ${values.destinationCountry}`,
        },
        { label: "Shipping term", value: shippingTermLabels[values.shippingTerm] },
      ],
    },
    {
      step: 5,
      title: "Attachments",
      rows: [
        { label: "Files attached", value: fileCount === 0 ? "None" : String(fileCount) },
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-8">
        {summary.map((section) => (
          <div key={section.title}>
            <div className="flex items-center justify-between gap-4 border-b border-line pb-2.5">
              <h3 className="text-label font-medium uppercase tracking-[0.09em] text-ink-subtle">
                {section.title}
              </h3>
              <button
                type="button"
                onClick={() => onEdit(section.step)}
                className="tw-underline-grow text-small font-medium text-ink"
              >
                Edit
                <span className="sr-only"> {section.title}</span>
              </button>
            </div>
            <dl className="mt-4 space-y-2.5">
              {section.rows.map((row) => (
                <div key={row.label} className="grid gap-1 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-6">
                  <dt className="text-small text-ink-subtle">{row.label}</dt>
                  <dd className="text-small text-ink-muted">{row.value || "Not provided"}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="space-y-5 border-t border-line pt-8">
        <CheckboxField
          id="field-privacyConsent"
          label={
            <>
              I agree that Textileways may use the information I have submitted to respond to
              this inquiry, as described in the{" "}
              <Link href="/privacy" className="tw-underline-grow font-medium text-ink">
                privacy policy
              </Link>
              .
            </>
          }
          checked={values.privacyConsent as unknown as boolean}
          error={errors.privacyConsent}
          onChange={(event) =>
            setValue("privacyConsent", event.target.checked as unknown as true)
          }
        />

        <CheckboxField
          id="field-designReviewConsent"
          label="I understand that designs and files I submit will be reviewed internally, and shared with the partners working on my project, only to the extent needed to prepare a quotation and produce my order."
          checked={values.designReviewConsent as unknown as boolean}
          error={errors.designReviewConsent}
          onChange={(event) =>
            setValue("designReviewConsent", event.target.checked as unknown as true)
          }
        />

        <CheckboxField
          id="field-marketingConsent"
          label="Optional: send me occasional manufacturing insights by email. You can unsubscribe at any time."
          checked={values.marketingConsent ?? false}
          onChange={(event) => setValue("marketingConsent", event.target.checked)}
        />
      </div>

      <TurnstileWidget action="rfq" onToken={onToken} resetSignal={turnstileReset} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function RfqSuccess({ reference, warning }: { reference: string; warning?: string }) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="max-w-[68ch]">
      <p className="flex items-center gap-3 text-label font-medium uppercase tracking-[0.09em] text-ink-subtle">
        <span aria-hidden="true" className="h-px w-6 shrink-0 bg-line-strong" />
        Request received
      </p>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 font-serif text-h2 outline-none"
      >
        Thank you. Your quote request has been received.
      </h2>

      <div className="mt-8 border border-line bg-cotton/50 p-6">
        <p className="text-label uppercase tracking-[0.09em] text-ink-subtle">
          Your reference
        </p>
        <p className="mt-2 font-serif text-h3 text-forest">{reference}</p>
        <p className="mt-3 text-small text-ink-muted">
          Keep this reference for any follow up. A confirmation has been sent to the email
          address you provided.
        </p>
      </div>

      {warning ? (
        <Notice tone="info" title="One thing to note" className="mt-6">
          {warning}
        </Notice>
      ) : null}

      <h3 className="mt-12 text-body font-semibold text-ink">What happens next</h3>
      <ol className="mt-4 space-y-3 text-small text-ink-muted">
        <li className="flex gap-3">
          <span aria-hidden="true" className="w-5 shrink-0 text-stone">01</span>
          <span>
            A member of the team reviews your product details, quantity and delivery
            requirements.
          </span>
        </li>
        <li className="flex gap-3">
          <span aria-hidden="true" className="w-5 shrink-0 text-stone">02</span>
          <span>
            We come back with any technical questions needed to quote accurately. Expect
            questions before a price, because a price given before the questions are answered
            is a guess.
          </span>
        </li>
        <li className="flex gap-3">
          <span aria-hidden="true" className="w-5 shrink-0 text-stone">03</span>
          <span>
            You receive a quotation against a written specification, with every assumption
            stated so you can see what would change it.
          </span>
        </li>
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/products"
          className="inline-flex min-h-[48px] items-center rounded-[3px] border border-line-strong px-6 text-small font-medium text-ink transition-colors duration-200 hover:border-ink"
        >
          Browse product families
        </Link>
        <Link
          href="/manufacturing-process"
          className="inline-flex min-h-[48px] items-center rounded-[3px] border border-line-strong px-6 text-small font-medium text-ink transition-colors duration-200 hover:border-ink"
        >
          See what happens next in detail
        </Link>
      </div>
    </div>
  );
}
