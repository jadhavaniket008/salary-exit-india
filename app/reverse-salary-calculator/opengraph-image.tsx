import { ImageResponse } from "next/og";
import { computeRequiredCtcForInHand } from "@/lib/calculators/reverse-salary";
import { DEFAULT_BASIC_DA_SHARE_OF_GROSS } from "@/lib/config/salary-reality-heuristics";
import { DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE } from "@/lib/config/professional-tax";
import { formatInr } from "@/lib/format-inr";

export const alt = "Reverse salary calculator — required CTC for your target in-hand | SalaryExit India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TARGET_IN_HAND = 1_00_000;

export default async function Image() {
  const result = computeRequiredCtcForInHand({
    desiredMonthlyInHand: TARGET_IN_HAND,
    regime: "new",
    professionalTaxAnnual: DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE,
    basicDaShareOfGross: DEFAULT_BASIC_DA_SHARE_OF_GROSS,
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#111110",
          color: "#EDECEA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#29A05E" }}>
            SalaryExit India
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, marginTop: 24 }}>
            What CTC do I need for {formatInr(TARGET_IN_HAND)}/month in-hand?
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#A8A69F", marginTop: 12 }}>
            Reverse salary calculator · works backwards from your target
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 32,
            borderRadius: 20,
            background: "#0D2419",
            border: "1px solid #29A05E",
          }}
        >
          <div style={{ display: "flex", fontSize: 22, color: "#29A05E" }}>Required annual CTC — range</div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, marginTop: 8 }}>
            {formatInr(result.requiredAnnualCtcLow)} – {formatInr(result.requiredAnnualCtcHigh)}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 20, color: "#6B6966" }}>
          A range, not false precision · salaryexit.in
        </div>
      </div>
    ),
    { ...size }
  );
}
