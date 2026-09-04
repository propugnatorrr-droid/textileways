"use client";

import { useEffect } from "react";
import { Container, DisplayHeading, Eyebrow, Lede, Button, ButtonLink, Section } from "@/components/ui";

/**
 * Route level error boundary.
 *
 * The visitor sees a calm explanation and a way forward. The underlying error is
 * logged to the server console via the digest, never rendered, so no stack trace
 * or internal detail reaches the browser.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Only the digest is logged. The message may contain internal detail.
    console.error("Route error", error.digest ?? "no digest");
  }, [error]);

  return (
    <Section>
      <Container>
        <div className="max-w-[62ch]">
          <Eyebrow>Something went wrong</Eyebrow>
          <DisplayHeading level={1} size="h1" className="mt-6">
            This page could not be displayed
          </DisplayHeading>
          <Lede className="mt-6">
            The problem has been recorded. You can try again, or continue to another part of
            the site. If you were part way through a quote request, your entries are kept in
            this browser and will be restored when you return to the form.
          </Lede>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button onClick={reset}>Try again</Button>
            <ButtonLink href="/" variant="secondary">
              Return to the homepage
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact us
            </ButtonLink>
          </div>

          {error.digest ? (
            <p className="mt-8 text-small text-ink-subtle">
              Reference for support: <span className="font-medium text-ink-muted">{error.digest}</span>
            </p>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
