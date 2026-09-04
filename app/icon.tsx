import { ImageResponse } from "next/og";

/** Site icon, generated from the brand palette so no binary asset is required. */
export const runtime = "nodejs";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#29473c",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 300,
            lineHeight: 1,
            color: "#f5f1e8",
            fontFamily: "serif",
          }}
        >
          T
        </div>
        <div style={{ display: "flex", height: 20, width: 260, marginTop: 24 }}>
          <div style={{ flex: 3, backgroundColor: "#f5f1e8" }} />
          <div style={{ width: 12 }} />
          <div style={{ flex: 1, backgroundColor: "#a65f43" }} />
          <div style={{ width: 12 }} />
          <div style={{ flex: 2, backgroundColor: "#cbc5ba" }} />
        </div>
      </div>
    ),
    size,
  );
}
