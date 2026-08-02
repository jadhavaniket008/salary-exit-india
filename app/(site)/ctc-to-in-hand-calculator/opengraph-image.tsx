import { ImageResponse } from "next/og";
import { computeCtcToInHand, CTC_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/ctc-to-inhand";
import { formatInr } from "@/lib/format-inr";
import { DEFAULT_TAX_SETTINGS } from "@/lib/config";

export const alt = "CTC to in-hand salary calculator — SalaryExit India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const result = computeCtcToInHand(CTC_WORKED_EXAMPLE_INPUT);
  const fy = DEFAULT_TAX_SETTINGS.financialYear;

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
            CTC to In-Hand Salary Calculator
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#A8A69F", marginTop: 12 }}>
            {fy.label} · New regime · Worked example
          </div>
        </div>

        <div style={{ display: "flex", gap: 32 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: 32,
              borderRadius: 20,
              background: "#1C1B19",
              border: "1px solid #2E2D2A",
            }}
          >
            <div style={{ display: "flex", fontSize: 22, color: "#A8A69F" }}>Annual gross</div>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 700, marginTop: 8 }}>
              {formatInr(CTC_WORKED_EXAMPLE_INPUT.annualGrossSalary)}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: 32,
              borderRadius: 20,
              background: "#0D2419",
              border: "1px solid #29A05E",
            }}
          >
            <div style={{ display: "flex", fontSize: 22, color: "#29A05E" }}>Estimated in-hand / month</div>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 700, marginTop: 8 }}>
              {formatInr(result.inHandMonthly, { decimals: true })}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 20, color: "#6B6966" }}>
          Free · Transparent assumptions · salaryexit.in
        </div>
      </div>
    ),
    { ...size }
  );
}
