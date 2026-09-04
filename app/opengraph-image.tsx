import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/configuration/site";

/**
 * Default social sharing image.
 *
 * Generated rather than shipped as a file, so it stays in step with the brand
 * palette and never becomes a stale asset. It uses the same warm paper ground,
 * ink text and forest accent as the site, with a woven rule drawn from the
 * wordmark.
 */

export const runtime = "nodejs";
export const alt = `${siteConfig.name} | ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fcfaf5",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: 20,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#66716c",
            }}
          >
            <div style={{ width: 40, height: 1, backgroundColor: "#c6c0b5" }} />
            Textile and apparel manufacturing
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 44,
              fontSize: 82,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "#17201d",
              maxWidth: 940,
            }}
          >
            One manufacturing partner. Every textile possibility.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 32,
              color: "#4c5854",
            }}
          >
            Start at 50. Scale beyond 100,000.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid #ddd8cf",
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 40, color: "#17201d" }}>Textileways</div>
            <div style={{ display: "flex", marginTop: 10, height: 4, width: 200 }}>
              <div style={{ flex: 3, backgroundColor: "#29473c" }} />
              <div style={{ width: 4 }} />
              <div style={{ flex: 1, backgroundColor: "#a65f43" }} />
              <div style={{ width: 4 }} />
              <div style={{ flex: 2, backgroundColor: "#cbc5ba" }} />
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 24, color: "#66716c" }}>
            Manufacturing for the USA and Europe
          </div>
        </div>
      </div>
    ),
    size,
  );
}
