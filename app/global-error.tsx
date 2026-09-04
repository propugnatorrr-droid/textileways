"use client";

/**
 * Global error boundary. Rendered when the root layout itself fails, so it has
 * to supply its own html and body elements and cannot rely on shared styling.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcfaf5",
          color: "#17201d",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "44rem" }}>
          <p
            style={{
              fontSize: "0.78rem",
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: "#66716c",
              margin: 0,
            }}
          >
            Application error
          </p>
          <h1 style={{ fontSize: "2.25rem", lineHeight: 1.1, margin: "1.25rem 0 0" }}>
            The site could not be loaded
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "#4c5854", marginTop: "1rem" }}>
            This is a fault on our side rather than anything you did. Please try again. If it
            keeps happening, contact us and quote the reference below.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.75rem",
              minHeight: "48px",
              padding: "0 1.5rem",
              backgroundColor: "#29473c",
              color: "#fcfaf5",
              border: "1px solid #29473c",
              borderRadius: "3px",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          {error.digest ? (
            <p style={{ fontSize: "0.875rem", color: "#66716c", marginTop: "1.5rem" }}>
              Reference for support: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
