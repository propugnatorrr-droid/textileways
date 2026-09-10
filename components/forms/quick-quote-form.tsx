"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  quickQuoteFormSchema,
  type QuickQuoteFormValues,
} from "@/lib/validation/quick-quote";
import {
  TextField,
  TextAreaField,
  SelectField,
  CheckboxField,
  HoneypotField,
  ErrorSummary,
} from "@/components/forms/fields";
import { TurnstileWidget, turnstileEnabled } from "@/components/forms/turnstile";
import { Notice, Button } from "@/components/ui";
import { track } from "@/lib/analytics/track";
import { productFamilies } from "@/content/fallback/products";

const emptyValues: Omit<QuickQuoteFormValues, "productFamily" | "estimatedQuantity"> = {
  name: "",
  email: "",
  company: "",
  notes: "",
  privacyConsent: false as unknown as true,
};

const fieldLabels: Record<string, string> = {
  name: "Name",
  email: "Work email",
  productFamily: "Product category",
  estimatedQuantity: "Estimated quantity",
  privacyConsent: "Privacy consent",
};

type State =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string };

/**
 * The light alternative to the seven step RFQ. Five fields, one screen, and a
 * reply that sets expectations honestly: this is a first read, not a
 * quotation.
 *
 * Product category and quantity are controlled by the parent readiness check
 * tool rather than owned here, so a choice made above this form and a choice
 * made inside it are always the same value instead of needing to be
 * synchronised after the fact.
 */
export function QuickQuoteForm({
  productFamily,
  onProductFamilyChange,
  estimatedQuantity,
  onEstimatedQuantityChange,
}: {
  productFamily: string;
  onProductFamilyChange: (value: string) => void;
  estimatedQuantity: string;
  onEstimatedQuantityChange: (value: string) => void;
}) {
  const [values, setValues] =
    useState<Omit<QuickQuoteFormValues, "productFamily" | "estimatedQuantity">>(emptyValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [state, setState] = useState<State>({ status: "idle" });

  const formStartedAt = useRef<number>(0);
  const successRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  const productFamilyOptions = useMemo(
    () => [
      ...productFamilies.map((family) => ({ value: family.slug, label: family.name })),
      { value: "not-listed", label: "Not listed, I will describe it in the notes" },
    ],
    [],
  );

  const setValue = useCallback(
    <K extends keyof typeof emptyValues>(key: K, value: (typeof emptyValues)[K]) => {
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

  const clearFieldError = useCallback((key: string) => {
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }, []);

  const submissionValues: QuickQuoteFormValues = useMemo(
    () => ({
      ...values,
      productFamily,
      estimatedQuantity: Number(estimatedQuantity),
    }),
    [values, productFamily, estimatedQuantity],
  );

  const submit = useCallback(async () => {
    const result = quickQuoteFormSchema.safeParse(submissionValues);
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
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
      setState({ status: "error", message: "Please complete the spam check before sending." });
      return;
    }

    setState({ status: "submitting" });

    try {
      const response = await fetch("/api/quick-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...submissionValues,
          companyRole: honeypot,
          formStartedAt: formStartedAt.current,
          turnstileToken,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        reference?: string;
        error?: string;
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
            "Your request could not be sent. Your entries have been kept, so you can try again.",
        });
        return;
      }

      track("quick_quote_submit", {
        page: "quick_quote",
        product_family: submissionValues.productFamily,
      });
      setState({ status: "success", reference: payload.reference ?? "" });
    } catch {
      setTurnstileReset((count) => count + 1);
      setTurnstileToken("");
      setState({
        status: "error",
        message:
          "We could not reach the server. Check your connection and try again. Your entries have been kept.",
      });
    }
  }, [honeypot, turnstileToken, submissionValues]);

  if (state.status === "success") {
    return (
      <div className="max-w-[60ch]">
        <h2
          ref={successRef}
          tabIndex={-1}
          className="font-sans text-h3 font-semibold tracking-[-0.032em] outline-none"
        >
          Thank you. Your request has been sent.
        </h2>
        <div className="mt-6 rounded-[20px] border border-line bg-cotton p-6">
          <p className="text-label uppercase tracking-[0.09em] text-ink-subtle">
            Your reference
          </p>
          <p className="mt-2 font-sans text-h3 font-semibold tracking-[-0.032em] text-forest">
            {state.reference}
          </p>
        </div>
        <p className="mt-6 text-small text-ink-muted">
          A confirmation has been sent to the email address you gave. This is a first read
          rather than a quotation: someone will reply with an initial view or a short list of
          clarifying questions.
        </p>
        <Link
          href="/request-a-quote"
          className="mt-8 inline-flex min-h-[48px] items-center rounded-[10px] border border-line-strong px-6 text-small font-medium text-ink transition-colors duration-150 hover:border-ink"
        >
          Ready for a full quotation instead
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
      className="relative space-y-8"
    >
      <HoneypotField value={honeypot} onChange={setHoneypot} />

      {state.status === "error" ? (
        <Notice tone="error" title="Request not sent" role="alert">
          {state.message}
        </Notice>
      ) : null}

      <ErrorSummary errors={errors} labels={fieldLabels} />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="field-name"
          label="Name"
          required
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(event) => setValue("name", event.target.value)}
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
          id="field-company"
          label="Company"
          autoComplete="organization"
          value={values.company}
          error={errors.company}
          onChange={(event) => setValue("company", event.target.value)}
        />
        <SelectField
          id="field-productFamily"
          label="Product category"
          required
          value={productFamily}
          error={errors.productFamily}
          options={productFamilyOptions}
          onChange={(event) => {
            onProductFamilyChange(event.target.value);
            clearFieldError("productFamily");
          }}
        />
        <TextField
          id="field-estimatedQuantity"
          label="Estimated quantity"
          type="number"
          min={1}
          required
          hint="Per style, roughly is fine."
          value={estimatedQuantity}
          error={errors.estimatedQuantity}
          onChange={(event) => {
            onEstimatedQuantityChange(event.target.value);
            clearFieldError("estimatedQuantity");
          }}
          className="sm:col-span-2"
        />
        <TextAreaField
          id="field-notes"
          label="Anything else useful"
          rows={4}
          className="sm:col-span-2"
          hint="A reference garment, target market or timeline, if you have one. Not required."
          value={values.notes}
          error={errors.notes}
          onChange={(event) => setValue("notes", event.target.value)}
        />
      </div>

      <div className="border-t border-line pt-8">
        <CheckboxField
          id="field-privacyConsent"
          label={
            <>
              I agree that TextileWays may use the information I have submitted to respond to
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
      </div>

      <TurnstileWidget
        action="quick-quote"
        onToken={setTurnstileToken}
        resetSignal={turnstileReset}
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={state.status === "submitting"}>
          {state.status === "submitting" ? "Sending..." : "Get a quick estimate"}
        </Button>
        <p role="status" className="text-small text-ink-subtle">
          {state.status === "submitting" ? "Sending your request" : ""}
        </p>
      </div>
    </form>
  );
}
