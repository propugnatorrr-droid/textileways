import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/configuration/site";

/**
 * Default social sharing image.
 *
 * Generated rather than shipped as a file, so the copy stays in step with
 * the site. Uses the current cotton and forest palette (matching
 * `app/globals.css`) and the real wordmark, embedded as a base64 data URI
 * since `next/og`'s renderer cannot resolve a relative `/brand/...` path.
 */

export const runtime = "nodejs";
export const alt = `${siteConfig.name} | ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const wordmarkDataUrl = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/brand/wordmark.png"),
).toString("base64")}`;

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
          backgroundColor: "#f5f7f6",
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
              color: "#7a847f",
            }}
          >
            <div style={{ width: 40, height: 1, backgroundColor: "rgba(11,15,13,0.16)" }} />
            Textile and apparel manufacturing
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 44,
              fontSize: 82,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "#0b0f0d",
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
              color: "#56605b",
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
            borderTop: "1px solid rgba(11,15,13,0.09)",
            paddingTop: 32,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders with satori, not next/image */}
          <img src={wordmarkDataUrl} alt="TextileWays" width={220} height={39} />

          <div style={{ display: "flex", fontSize: 24, color: "#7a847f" }}>
            Pakistan based manufacturing for international buyers
          </div>
        </div>
      </div>
    ),
    size,
  );
}
