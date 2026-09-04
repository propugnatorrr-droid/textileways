"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  contactFormSchema,
  contactSubjects,
  contactSubjectLabels,
  type ContactFormValues,
} from "@/lib/validation/contact";
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

const emptyValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  country: "",
  subject: "new-project",
  message: "",
  privacyConsent: false as unknown as true,
  marketingConsent: false,
};

const fieldLabels: Record<string, string> = {
  name: "Name",
  email: "Work email",
  company: "Company",
  country: "Country",
  subject: "Subject",
  message: "Message",
  privacyConsent: "Privacy consent",
};

type State =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string };

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [state, setState] = useState<State>({ status: "idle" });

  /*
   * Timestamp for the minimum completion time check.
   *
   * Set in an effect rather than during render, because Date.now() is impure and
   * a render is not guaranteed to happen exactly once. Zero until mount, and the
   * server treats a zero timestamp as a failed check, so it cannot be bypassed.
   */
  const formStartedAt = useRef<number>(0);
  const successRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  const setValue = useCallback(
    <K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) => {
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
    const result = contactFormSchema.safeParse(values);
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
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
            "Your message could not be sent. Your entries have been kept, so you can try again.",
        });
        return;
      }

      track("contact_submit", { page: "contact" });
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
  }, [honeypot, turnstileToken, values]);

  if (state.status === "success") {
    return (
      <div className="max-w-[60ch]">
        <h2 ref={successRef} tabIndex={-1} className="font-serif text-h3 outline-none">
          Thank you. Your message has been sent.
        </h2>
        <div className="mt-6 border border-line bg-cotton/50 p-6">
          <p className="text-label uppercase tracking-[0.09em] text-ink-subtle">
            Your reference
          </p>
          <p className="mt-2 font-serif text-h3 text-forest">{state.reference}</p>
        </div>
        <p className="mt-6 text-small text-ink-muted">
          A confirmation has been sent to the email address you gave. Someone will reply
          directly, usually with any questions needed to answer properly.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-[48px] items-center rounded-[3px] border border-line-strong px-6 text-small font-medium text-ink transition-colors duration-200 hover:border-ink"
        >
          Return to the homepage
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
        <Notice tone="error" title="Message not sent" role="alert">
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
          autoComplete="country-name"
          value={values.country}
          error={errors.country}
          onChange={(event) => setValue("country", event.target.value)}
        />
        <SelectField
          id="field-subject"
          label="Subject"
          required
          className="sm:col-span-2"
          value={values.subject}
          error={errors.subject}
          options={contactSubjects.map((value) => ({
            value,
            label: contactSubjectLabels[value],
          }))}
          onChange={(event) =>
            setValue("subject", event.target.value as ContactFormValues["subject"])
          }
        />
        <TextAreaField
          id="field-message"
          label="Message"
          required
          rows={7}
          className="sm:col-span-2"
          hint="Include the product, quantity and market if your question is about a project. A specific question gets a far more useful answer."
          value={values.message}
          error={errors.message}
          onChange={(event) => setValue("message", event.target.value)}
        />
      </div>

      <div className="space-y-5 border-t border-line pt-8">
        <CheckboxField
          id="field-privacyConsent"
          label={
            <>
              I agree that Textileways may use the information I have submitted to respond to
              this message, as described in the{" "}
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
          id="field-marketingConsent"
          label="Optional: send me occasional manufacturing insights by email. You can unsubscribe at any time."
          checked={values.marketingConsent ?? false}
          onChange={(event) => setValue("marketingConsent", event.target.checked)}
        />
      </div>

      <TurnstileWidget action="contact" onToken={setTurnstileToken} resetSignal={turnstileReset} />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={state.status === "submitting"}>
          {state.status === "submitting" ? "Sending..." : "Send message"}
        </Button>
        <p role="status" className="text-small text-ink-subtle">
          {state.status === "submitting" ? "Sending your message" : ""}
        </p>
      </div>
    </form>
  );
}
