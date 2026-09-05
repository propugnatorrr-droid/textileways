"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  sampleRequestFormSchema,
  sampleTypes,
  sampleTypeLabels,
  type SampleRequestFormValues,
} from "@/lib/validation/contact";
import { productFamilies } from "@/content/fallback/products";
import {
  TextField,
  TextAreaField,
  SelectField,
  CheckboxField,
  RadioGroup,
  HoneypotField,
  ErrorSummary,
} from "@/components/forms/fields";
import { FileUpload, type SelectedFile } from "@/components/forms/file-upload";
import { TurnstileWidget, turnstileEnabled } from "@/components/forms/turnstile";
import { Notice, Button } from "@/components/ui";
import { track } from "@/lib/analytics/track";

/**
 * Sample request form.
 *
 * Reuses the same field primitives, upload control, Turnstile widget and error
 * handling as the RFQ form, as the brief requires.
 */

const emptyValues: SampleRequestFormValues = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  productFamily: "",
  sampleType: "fabric-swatches",
  hasTechPack: "no",
  materialPreference: "",
  sizeRequired: "",
  colorRequired: "",
  decorationRequired: "",
  destinationCity: "",
  destinationCountry: "",
  requiredDate: "",
  notes: "",
  attachments: [],
  privacyConsent: false as unknown as true,
  designReviewConsent: false as unknown as true,
  marketingConsent: false,
};

const fieldLabels: Record<string, string> = {
  fullName: "Full name",
  email: "Work email",
  company: "Company",
  country: "Country",
  productFamily: "Product category",
  sampleType: "Sample type",
  hasTechPack: "Existing tech pack",
  sizeRequired: "Size required",
  colorRequired: "Colour required",
  destinationCity: "Destination city",
  destinationCountry: "Destination country",
  requiredDate: "Required date",
  privacyConsent: "Privacy consent",
  designReviewConsent: "Design review consent",
};

type State =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string; warning?: string }
  | { status: "error"; message: string };

export function SampleRequestForm() {
  const searchParams = useSearchParams();

  /*
   * A product family can be preselected with ?product=<slug>, for example from a
   * product page. It is read during render rather than applied in an effect,
   * because the value is available identically on the server and the client.
   */
  const preselectedFamily = (() => {
    const requested = searchParams.get("product");
    return requested && productFamilies.some((family) => family.slug === requested)
      ? requested
      : "";
  })();

  const [values, setValues] = useState<SampleRequestFormValues>(() => ({
    ...emptyValues,
    productFamily: preselectedFamily,
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [state, setState] = useState<State>({ status: "idle" });

  /* See the note in the contact form: Date.now() is impure, so it is set on mount. */
  const formStartedAt = useRef<number>(0);
  const successRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  const setValue = useCallback(
    <K extends keyof SampleRequestFormValues>(key: K, value: SampleRequestFormValues[K]) => {
      setValues((current) => ({ ...current, [key]: value }));
      setErrors((current) => {
        if (!current[key as string]) return current;
        const next = { ...current };
        delete next[key as string];
        return next;
      });
    },
    [],
  );

  const submit = useCallback(async () => {
    const parsed = sampleRequestFormSchema.safeParse({
      ...values,
      attachments: files.map((item) => ({
        name: item.file.name,
        type: item.file.type,
        size: item.file.size,
      })),
    });

    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLElement>("[data-error-summary]")?.focus();
      });
      return;
    }

    if (turnstileEnabled() && turnstileToken.length === 0) {
      setState({ status: "error", message: "Please complete the spam check before submitting." });
      return;
    }

    setState({ status: "submitting" });

    const body = new FormData();
    body.append(
      "payload",
      JSON.stringify({
        ...values,
        attachments: files.map((item) => ({
          name: item.file.name,
          type: item.file.type,
          size: item.file.size,
        })),
        companyRole: honeypot,
        formStartedAt: formStartedAt.current,
        turnstileToken,
      }),
    );
    for (const item of files) body.append("files", item.file);

    try {
      const response = await fetch("/api/sample-request", { method: "POST", body });
      const payload = (await response.json()) as {
        ok: boolean;
        reference?: string;
        error?: string;
        warning?: string;
        fieldErrors?: Record<string, string>;
      };

      if (!response.ok || !payload.ok) {
        if (payload.fieldErrors) setErrors(payload.fieldErrors);
        setTurnstileReset((count) => count + 1);
        setTurnstileToken("");
        setState({
          status: "error",
          message:
            payload.error ??
            "Your request could not be submitted. Your entries have been kept, so you can try again.",
        });
        return;
      }

      track("sample_request_submit", { product_family: values.productFamily });
      setState({
        status: "success",
        reference: payload.reference ?? "",
        warning: payload.warning,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setTurnstileReset((count) => count + 1);
      setTurnstileToken("");
      setState({
        status: "error",
        message:
          "We could not reach the server. Check your connection and try again. Your entries have been kept.",
      });
    }
  }, [files, honeypot, turnstileToken, values]);

  if (state.status === "success") {
    return (
      <div className="max-w-[62ch]">
        <h2 ref={successRef} tabIndex={-1} className="font-sans text-h3 font-semibold tracking-[-0.032em] outline-none">
          Thank you. Your sample request has been received.
        </h2>
        <div className="mt-6 rounded-[20px] border border-line bg-cotton p-6">
          <p className="text-label uppercase tracking-[0.09em] text-ink-subtle">
            Your reference
          </p>
          <p className="mt-2 font-sans text-h3 font-semibold tracking-[-0.032em] text-forest">{state.reference}</p>
        </div>
        {state.warning ? (
          <Notice tone="info" title="One thing to note" className="mt-6">
            {state.warning}
          </Notice>
        ) : null}
        <p className="mt-6 text-small text-ink-muted">
          Sample charges and courier costs are always quoted before any work begins, so nothing
          is produced or charged without your confirmation.
        </p>
        <Link
          href="/materials"
          className="mt-8 inline-flex min-h-[48px] items-center rounded-[14px] border border-line-strong px-6 text-small font-medium text-ink transition-colors duration-200 hover:border-ink"
        >
          Browse materials while you wait
        </Link>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
      className="relative space-y-10"
    >
      <HoneypotField value={honeypot} onChange={setHoneypot} />

      {state.status === "error" ? (
        <Notice tone="error" title="Request not submitted" role="alert">
          {state.message}
        </Notice>
      ) : null}

      <ErrorSummary errors={errors} labels={fieldLabels} />

      <fieldset className="space-y-6">
        <legend className="mb-2 border-b border-line pb-2.5 text-label font-medium uppercase tracking-[0.09em] text-ink-subtle">
          Your details
        </legend>
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
            autoComplete="tel"
            value={values.phone}
            error={errors.phone}
            onChange={(event) => setValue("phone", event.target.value)}
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
            id="field-country"
            label="Country"
            required
            className="sm:col-span-2"
            autoComplete="country-name"
            value={values.country}
            error={errors.country}
            onChange={(event) => setValue("country", event.target.value)}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-2 border-b border-line pb-2.5 text-label font-medium uppercase tracking-[0.09em] text-ink-subtle">
          What you need
        </legend>

        <div className="grid gap-6 sm:grid-cols-2">
          <SelectField
            id="field-productFamily"
            label="Product category"
            required
            value={values.productFamily}
            error={errors.productFamily}
            options={[
              ...productFamilies.map((family) => ({ value: family.slug, label: family.name })),
              { value: "not-listed", label: "Not listed, I will describe it" },
            ]}
            onChange={(event) => setValue("productFamily", event.target.value)}
          />
          <SelectField
            id="field-sampleType"
            label="Sample type"
            required
            value={values.sampleType}
            error={errors.sampleType}
            options={sampleTypes.map((value) => ({ value, label: sampleTypeLabels[value] }))}
            onChange={(event) =>
              setValue("sampleType", event.target.value as SampleRequestFormValues["sampleType"])
            }
          />
          <TextField
            id="field-materialPreference"
            label="Material preference"
            value={values.materialPreference}
            error={errors.materialPreference}
            onChange={(event) => setValue("materialPreference", event.target.value)}
          />
          <TextField
            id="field-sizeRequired"
            label="Size required"
            required
            value={values.sizeRequired}
            error={errors.sizeRequired}
            onChange={(event) => setValue("sizeRequired", event.target.value)}
          />
          <TextField
            id="field-colorRequired"
            label="Colour required"
            required
            className="sm:col-span-2"
            value={values.colorRequired}
            error={errors.colorRequired}
            onChange={(event) => setValue("colorRequired", event.target.value)}
          />
          <TextAreaField
            id="field-decorationRequired"
            label="Decoration required"
            rows={4}
            className="sm:col-span-2"
            hint="Printing, embroidery, labels or packaging you want to see on the sample."
            value={values.decorationRequired}
            error={errors.decorationRequired}
            onChange={(event) => setValue("decorationRequired", event.target.value)}
          />
        </div>

        <RadioGroup
          legend="Do you have an existing tech pack or specification?"
          name="hasTechPack"
          error={errors.hasTechPack}
          value={values.hasTechPack}
          onChange={(value) =>
            setValue("hasTechPack", value as SampleRequestFormValues["hasTechPack"])
          }
          options={[
            { value: "yes", label: "Yes, a complete tech pack" },
            { value: "partial", label: "Partly, some measurements or references" },
            { value: "no", label: "No, I need help building one" },
          ]}
        />
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-2 border-b border-line pb-2.5 text-label font-medium uppercase tracking-[0.09em] text-ink-subtle">
          Delivery
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
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
            id="field-requiredDate"
            label="Required by"
            type="date"
            required
            value={values.requiredDate}
            error={errors.requiredDate}
            onChange={(event) => setValue("requiredDate", event.target.value)}
          />
          <TextAreaField
            id="field-notes"
            label="Notes"
            rows={4}
            className="sm:col-span-2"
            value={values.notes}
            error={errors.notes}
            onChange={(event) => setValue("notes", event.target.value)}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-6 w-full border-b border-line pb-2.5 text-label font-medium uppercase tracking-[0.09em] text-ink-subtle">
          Attachments
        </legend>
        <FileUpload files={files} onChange={setFiles} label="Tech packs, artwork and references" />
      </fieldset>

      <div className="space-y-5 border-t border-line pt-8">
        <CheckboxField
          id="field-privacyConsent"
          label={
            <>
              I agree that Textileways may use the information I have submitted to respond to
              this request, as described in the{" "}
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
          label="I understand that designs and files I submit will be reviewed internally, and shared with the partners working on my project, only to the extent needed to produce the sample."
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

      <TurnstileWidget action="sample" onToken={setTurnstileToken} resetSignal={turnstileReset} />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={state.status === "submitting"}>
          {state.status === "submitting" ? "Submitting..." : "Submit sample request"}
        </Button>
        <p role="status" className="text-small text-ink-subtle">
          {state.status === "submitting" ? "Sending your request" : ""}
        </p>
      </div>
    </form>
  );
}
