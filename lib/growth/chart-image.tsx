import { ImageResponse } from "next/og";
import type { ReactElement } from "react";
import {
  generateInHandSalaryModel,
  type InHandSalaryModel,
} from "@/lib/growth/in-hand-salary-model";

/**
 * Chart-image renderer for the 5 launch visual families (docs/growth/launch-assets.md).
 * Reuses the exact palette and typography already established for this launch
 * in brag-output/brag-plan.md's "Visual identity" section (Salary Green
 * #1A6B45 accent on #FAFAF8 light background, Geist Sans/Mono) — the site's
 * own brand system, not a new one invented for this pass. Satori (which
 * ImageResponse uses) only supports flexbox layout, so every chart here is
 * built from flex rows/columns with percentage-width bars, not SVG or canvas.
 */

const COLOR = {
  background: "#FAFAF8",
  surface: "#FFFFFF",
  text: "#1A1917",
  textSecondary: "#5C5B57",
  textMuted: "#9A9890",
  accent: "#1A6B45",
  accentLight: "#EBF5EF",
  border: "#E5E3DD",
} as const;

export const SOCIAL_SIZE = { width: 1200, height: 630 };
export const VERTICAL_SIZE = { width: 1080, height: 1350 };
export const CHART_IMAGE_CONTENT_TYPE = "image/png";

function formatInr(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function formatLpa(value: number): string {
  return `₹${(value / 1_00_000).toFixed(0)}L`;
}

type Bar = { label: string; value: number; valueLabel: string; highlight?: boolean };

function ChartFrame({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
  vertical,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactElement;
  footer: string;
  vertical: boolean;
}): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: vertical ? 72 : 64,
        background: COLOR.background,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: vertical ? 26 : 22,
            fontWeight: 700,
            color: COLOR.accent,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: vertical ? 44 : 38,
            fontWeight: 700,
            color: COLOR.text,
            marginTop: 14,
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: vertical ? 26 : 22,
            color: COLOR.textSecondary,
            marginTop: 14,
          }}
        >
          {subtitle}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1, marginTop: 40, marginBottom: 40 }}>
        {children}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderTop: `1px solid ${COLOR.border}`,
          paddingTop: 20,
        }}
      >
        <div style={{ display: "flex", fontSize: vertical ? 22 : 18, color: COLOR.textMuted }}>
          {footer}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: vertical ? 24 : 20,
            fontWeight: 700,
            color: COLOR.accent,
            marginTop: 6,
          }}
        >
          SalaryExit India · salaryexit.in
        </div>
      </div>
    </div>
  );
}

function BarRow({ bar, maxValue, vertical }: { bar: Bar; maxValue: number; vertical: boolean }): ReactElement {
  const pct = Math.max(2, (bar.value / maxValue) * 100);
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: vertical ? 22 : 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: vertical ? 24 : 19,
          color: COLOR.text,
          marginBottom: 6,
        }}
      >
        <div style={{ display: "flex", fontWeight: 600 }}>{bar.label}</div>
        <div style={{ display: "flex", fontWeight: 700, color: COLOR.accent }}>{bar.valueLabel}</div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: vertical ? 20 : 14,
          background: COLOR.border,
          borderRadius: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            width: `${pct}%`,
            height: "100%",
            background: bar.highlight ? COLOR.accent : "#4C8A6E",
            borderRadius: 8,
          }}
        />
      </div>
    </div>
  );
}

function BarChart({ bars, vertical }: { bars: Bar[]; vertical: boolean }): ReactElement {
  const maxValue = Math.max(...bars.map((b) => b.value));
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
      {bars.map((b) => (
        <BarRow key={b.label} bar={b} maxValue={maxValue} vertical={vertical} />
      ))}
    </div>
  );
}

/** Family 1 — ₹5-50 LPA estimated monthly in-hand (13% employer cost, statutory PF). */
function family1Bars(model: InHandSalaryModel): Bar[] {
  return model.salaryLevelRows
    .filter((r) => r.employerCostSharePct === 0.13 && r.pfScenario === "statutory-ceiling")
    .sort((a, b) => a.annualCtc - b.annualCtc)
    .map((r) => ({
      label: formatLpa(r.annualCtc),
      value: r.monthlyInHand,
      valueLabel: formatInr(r.monthlyInHand),
    }));
}

/** Family 2 — required CTC for target monthly in-hand (point estimate). */
function family2Bars(model: InHandSalaryModel): Bar[] {
  return model.requiredCtcRows.map((r) => ({
    label: `${formatInr(r.targetMonthlyInHand)}/mo`,
    value: r.requiredAnnualCtcPoint,
    valueLabel: formatLpa(r.requiredAnnualCtcPoint),
  }));
}

/** Family 3 — capped PF vs full-Basic PF, across a spread of CTC levels at 13% employer cost. */
function family3Bars(model: InHandSalaryModel): Bar[] {
  const levels = [10_00_000, 15_00_000, 20_00_000, 25_00_000, 30_00_000];
  const bars: Bar[] = [];
  for (const ctc of levels) {
    const row = model.pfComparisonRows.find((r) => r.annualCtc === ctc && r.employerCostSharePct === 0.13);
    if (!row) continue;
    bars.push({
      label: `${formatLpa(ctc)} · capped`,
      value: row.cappedPfMonthlyInHand,
      valueLabel: formatInr(row.cappedPfMonthlyInHand),
      highlight: true,
    });
    bars.push({
      label: `${formatLpa(ctc)} · full-Basic`,
      value: row.fullBasicPfMonthlyInHand,
      valueLabel: formatInr(row.fullBasicPfMonthlyInHand),
    });
  }
  return bars;
}

/** Family 4 — same ₹20L CTC under 8%/13%/18% employer-cost scenarios. */
function family4Bars(model: InHandSalaryModel): Bar[] {
  return model.salaryLevelRows
    .filter((r) => r.annualCtc === 20_00_000 && r.pfScenario === "statutory-ceiling")
    .sort((a, b) => a.employerCostSharePct - b.employerCostSharePct)
    .map((r) => ({
      label: `${Math.round(r.employerCostSharePct * 100)}% employer cost`,
      value: r.monthlyInHand,
      valueLabel: formatInr(r.monthlyInHand),
      highlight: r.employerCostSharePct === 0.13,
    }));
}

/** Family 5 — CTC -> employer costs -> gross -> deductions -> monthly in-hand, for the ₹18L worked example. */
function family5Segments(model: InHandSalaryModel): { label: string; value: number; color: string }[] {
  const row = model.salaryLevelRows.find(
    (r) => r.annualCtc === 18_00_000 && r.employerCostSharePct === 0.13 && r.pfScenario === "statutory-ceiling"
  );
  if (!row) return [];
  const employerCosts = row.annualCtc - row.annualGross;
  const monthlyGross = row.annualGross / 12;
  const monthlyEmployerCosts = employerCosts / 12;
  const monthlyDeductions = monthlyGross - row.monthlyInHand;
  return [
    { label: "Employer costs", value: monthlyEmployerCosts, color: "#B8B6AE" },
    { label: "PF + tax deductions", value: monthlyDeductions, color: "#8FA893" },
    { label: "Monthly in-hand", value: row.monthlyInHand, color: "#1A6B45" },
  ];
}

function WaterfallChart({
  segments,
  totalLabel,
  totalValue,
  vertical,
}: {
  segments: { label: string; value: number; color: string }[];
  totalLabel: string;
  totalValue: number;
  vertical: boolean;
}): ReactElement {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
      <div style={{ display: "flex", fontSize: vertical ? 26 : 21, color: COLOR.textSecondary, marginBottom: 16 }}>
        {totalLabel}: <span style={{ fontWeight: 700, color: COLOR.text, marginLeft: 8 }}>{formatInr(totalValue)}/month</span>
      </div>
      <div style={{ display: "flex", width: "100%", height: vertical ? 64 : 44, borderRadius: 10, overflow: "hidden" }}>
        {segments.map((s) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              width: `${(s.value / totalValue) * 100}%`,
              height: "100%",
              background: s.color,
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 28 }}>
        {segments.map((s) => (
          <div
            key={s.label}
            style={{ display: "flex", alignItems: "center", marginBottom: 14, fontSize: vertical ? 24 : 19 }}
          >
            <div style={{ display: "flex", width: 18, height: 18, borderRadius: 4, background: s.color, marginRight: 12 }} />
            <div style={{ display: "flex", color: COLOR.text, fontWeight: 600 }}>{s.label}</div>
            <div style={{ display: "flex", color: COLOR.accent, fontWeight: 700, marginLeft: "auto" }}>
              {formatInr(s.value)}/mo
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export type ChartFamilyId = "in-hand-by-ctc" | "required-ctc" | "pf-comparison" | "employer-cost-scenarios" | "waterfall";

export const CHART_FAMILIES: { id: ChartFamilyId; eyebrow: string; title: string; subtitle: string; footer: string }[] = [
  {
    id: "in-hand-by-ctc",
    eyebrow: "In-Hand Salary Model 2026",
    title: "₹5L–₹50L CTC: estimated monthly in-hand",
    subtitle: "New regime · 13% employer-cost structure · statutory-ceiling PF",
    footer: "Modelled from SalaryExit's FY 2026-27 tax/PF engine — not a survey.",
  },
  {
    id: "required-ctc",
    eyebrow: "In-Hand Salary Model 2026",
    title: "Required CTC for a target monthly in-hand",
    subtitle: "Point estimate at a typical 10% employer-cost structure",
    footer: "Actual required CTC ranges ±depending on employer-cost structure — see full report for low/high.",
  },
  {
    id: "pf-comparison",
    eyebrow: "In-Hand Salary Model 2026",
    title: "Capped PF vs. full-Basic PF: the real cash trade-off",
    subtitle: "Same CTC, same 13% employer-cost structure — different PF wage basis",
    footer: "Full-Basic PF means lower monthly cash, larger retirement corpus.",
  },
  {
    id: "employer-cost-scenarios",
    eyebrow: "In-Hand Salary Model 2026",
    title: "₹20L CTC: three employer-cost structures",
    subtitle: "Identical CTC, different in-hand — purely from PF/gratuity/insurance share",
    footer: "8% and 18% represent lean vs. heavy employer-cost structures.",
  },
  {
    id: "waterfall",
    eyebrow: "In-Hand Salary Model 2026",
    title: "₹18L CTC: where the money actually goes",
    subtitle: "Employer costs, deductions, and what lands in your account — monthly",
    footer: "Same worked example used throughout SalaryExit's calculators.",
  },
];

function buildChartElement(id: ChartFamilyId, model: InHandSalaryModel, vertical: boolean): ReactElement {
  const meta = CHART_FAMILIES.find((f) => f.id === id)!;
  let body: ReactElement;
  if (id === "in-hand-by-ctc") {
    body = <BarChart bars={family1Bars(model)} vertical={vertical} />;
  } else if (id === "required-ctc") {
    body = <BarChart bars={family2Bars(model)} vertical={vertical} />;
  } else if (id === "pf-comparison") {
    body = <BarChart bars={family3Bars(model)} vertical={vertical} />;
  } else if (id === "employer-cost-scenarios") {
    body = <BarChart bars={family4Bars(model)} vertical={vertical} />;
  } else {
    const segments = family5Segments(model);
    const total = segments.reduce((sum, s) => sum + s.value, 0);
    body = <WaterfallChart segments={segments} totalLabel="Total monthly value" totalValue={total} vertical={vertical} />;
  }

  return (
    <ChartFrame
      eyebrow={meta.eyebrow}
      title={meta.title}
      subtitle={meta.subtitle}
      footer={meta.footer}
      vertical={vertical}
    >
      {body}
    </ChartFrame>
  );
}

export function buildChartImageResponse(id: ChartFamilyId, vertical: boolean): ImageResponse {
  const model = generateInHandSalaryModel("2026-07-31T00:00:00.000Z");
  const size = vertical ? VERTICAL_SIZE : SOCIAL_SIZE;
  return new ImageResponse(buildChartElement(id, model, vertical), { ...size });
}
