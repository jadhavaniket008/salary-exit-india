import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Simple favicon — replace with branded asset when ready. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          background: "#18181b",
          color: "#fafafa",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        SE
      </div>
    ),
    { ...size }
  );
}
