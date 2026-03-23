"use client";

import { useId, useMemo, useState } from "react";
import { Button, Card, FormField, Input } from "@/components/ui";
import { OfferInHandBars } from "@/components/charts/OfferInHandBars";
import { ResultReveal } from "@/components/motion/ResultReveal";
import {
  AssumptionsBlock,
  CalculatorPageLayout,
  CollapsibleBreakdown,
  FaqSection,
  FormActions,
  RequiredInputsCallout,
  ValidationSummary,
  WorkedExample,
} from "@/components/calculators";
import { trackOfferCompareSubmit } from "@/lib/analytics/client";
import { compareOffers } from "@/lib/calculators/offer-comparison";
import { formatInr } from "@/lib/format-inr";
import { sanitizeNumber } from "@/lib/validation/sanitize";
import { assertNonNegative } from "@/lib/validation/validators";
import type { OfferComparisonOutput } from "@/types/offer";

type Row = {
  id: string;
  label: string;
  ctc: string;
  inHand: string;
  tax: string;
};

function emptyOffer(): Row {
  return { id: crypto.randomUUID(), label: "", ctc: "", inHand: "", tax: "" };
}

export function OfferComparisonCalculatorClient() {
  const baseId = useId();
  const [rows, setRows] = useState<Row[]>([emptyOffer(), emptyOffer()]);

  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<OfferComparisonOutput | null>(null);
  const [showResult, setShowResult] = useState(false);

  const assumptionBullets = useMemo(
    () => [
      "Ranking uses the monthly in-hand and annual CTC values you enter — it does not recompute tax inside this screen.",
      "For fair comparison, compute each offer’s in-hand using the same CTC→in-hand methodology.",
      "Optional annual tax can be used for notes/ranking context if you keep it consistent across offers.",
    ],
    []
  );

  function reset() {
    setRows([emptyOffer(), emptyOffer()]);
    setErrors([]);
    setResult(null);
    setShowResult(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: string[] = [];

    const offers: {
      label: string;
      annualCtc: number;
      estimatedInHandMonthly: number;
      estimatedTotalTaxAnnual?: number;
    }[] = [];

    rows.forEach((r, idx) => {
      if (
        r.label.trim() === "" &&
        r.ctc.trim() === "" &&
        r.inHand.trim() === "" &&
        r.tax.trim() === ""
      ) {
        return;
      }
      const label = r.label.trim() === "" ? `Offer ${idx + 1}` : r.label.trim();

      const ctc = sanitizeNumber(r.ctc);
      if (!ctc.ok) nextErrors.push(`${label}: CTC ${ctc.error}`);
      else {
        const nn = assertNonNegative(`${label} CTC`, ctc.value);
        if (nn) nextErrors.push(nn);
      }

      const ih = sanitizeNumber(r.inHand);
      if (!ih.ok) nextErrors.push(`${label}: In-hand ${ih.error}`);
      else {
        const nn = assertNonNegative(`${label} in-hand`, ih.value);
        if (nn) nextErrors.push(nn);
      }

      const tx =
        r.tax.trim() === "" ? { ok: true as const, value: undefined as number | undefined } : sanitizeNumber(r.tax);
      if (!tx.ok) nextErrors.push(`${label}: Tax ${tx.error}`);
      else if (tx.value !== undefined) {
        const nn = assertNonNegative(`${label} tax`, tx.value);
        if (nn) nextErrors.push(nn);
      }

      if (ctc.ok && ih.ok && tx.ok) {
        offers.push({
          label,
          annualCtc: ctc.value,
          estimatedInHandMonthly: ih.value,
          estimatedTotalTaxAnnual: tx.value,
        });
      }
    });

    if (offers.length < 2) {
      nextErrors.push("Enter at least two offers with CTC and estimated monthly in-hand.");
    }

    setErrors(nextErrors);
    if (nextErrors.length > 0) {
      setResult(null);
      setShowResult(false);
      return;
    }

    const out = compareOffers({ offers });
    setResult(out);
    setShowResult(true);
    trackOfferCompareSubmit();
  }

  function updateRow(id: string, patch: Partial<Row>) {
    setRows(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  return (
    <CalculatorPageLayout
      slug="offerComparison"
      title="Offer comparison calculator"
      intro="Compare offers using annual CTC and your estimated monthly in-hand (from the CTC→in-hand tool or payslip assumptions). This page ranks what you enter — it does not invent in-hand from CTC automatically."
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        In-hand must be estimated <strong>consistently</strong> across offers — the accuracy card explains ranking
        limits.
      </p>

      <RequiredInputsCallout
        items={[
          "At least two offers",
          "Each: label, annual CTC (₹), estimated monthly in-hand (₹)",
          "Optional: estimated annual tax (₹) if you want to track it consistently",
        ]}
      />

      <Card className="space-y-6">
        <form className="space-y-6" onSubmit={onSubmit} noValidate>
          {rows.map((row, idx) => (
            <div
              key={row.id}
              className="space-y-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Offer {idx + 1}
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={rows.length <= 2}
                  onClick={() => setRows(rows.filter((r) => r.id !== row.id))}
                >
                  Remove
                </Button>
              </div>

              <FormField label="Label" id={`${baseId}-label-${row.id}`}>
                <Input
                  id={`${baseId}-label-${row.id}`}
                  value={row.label}
                  onChange={(e) => updateRow(row.id, { label: e.target.value })}
                  placeholder={`e.g. Company ${String.fromCharCode(65 + idx)}`}
                />
              </FormField>

              <div className="grid gap-4 sm:grid-cols-3">
                <FormField label="Annual CTC (₹)" id={`${baseId}-ctc-${row.id}`}>
                  <Input
                    id={`${baseId}-ctc-${row.id}`}
                    inputMode="decimal"
                    value={row.ctc}
                    onChange={(e) => updateRow(row.id, { ctc: e.target.value })}
                  />
                </FormField>
                <FormField
                  label="Est. monthly in-hand (₹)"
                  id={`${baseId}-ih-${row.id}`}
                  hint="Use the same method for each offer."
                >
                  <Input
                    id={`${baseId}-ih-${row.id}`}
                    inputMode="decimal"
                    value={row.inHand}
                    onChange={(e) => updateRow(row.id, { inHand: e.target.value })}
                  />
                </FormField>
                <FormField
                  label="Est. annual tax (₹, optional)"
                  id={`${baseId}-tax-${row.id}`}
                >
                  <Input
                    id={`${baseId}-tax-${row.id}`}
                    inputMode="decimal"
                    value={row.tax}
                    onChange={(e) => updateRow(row.id, { tax: e.target.value })}
                    placeholder="Optional"
                  />
                </FormField>
              </div>
            </div>
          ))}

          <Button type="button" variant="secondary" onClick={() => setRows([...rows, emptyOffer()])}>
            Add offer
          </Button>

          <ValidationSummary messages={errors} />
          <FormActions onReset={reset} />
        </form>
      </Card>

      <section aria-live="polite" className="space-y-4">
        {!showResult || !result ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white/50 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-400">
            Enter at least two comparable offers. The ranking is only as good as your in-hand estimates.
          </div>
        ) : (
          <ResultReveal show={showResult && !!result}>
            <OfferInHandBars
              rows={result.rows.map((r) => ({
                label: r.label,
                inHandMonthly: r.estimatedInHandMonthly,
                rank: r.rankByInHand,
              }))}
            />
            <CollapsibleBreakdown defaultOpen title="Comparison table">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
                    <th className="py-2 pr-4 font-medium">Offer</th>
                    <th className="py-2 pr-4 font-medium">CTC</th>
                    <th className="py-2 pr-4 font-medium">In-hand / mo</th>
                    <th className="py-2 pr-4 font-medium">Rank (in-hand)</th>
                    <th className="py-2 pr-4 font-medium">Rank (CTC)</th>
                    <th className="py-2 font-medium">Tax (optional)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((r, idx) => (
                    <tr
                      key={`${r.label}-${idx}`}
                      className="border-b border-zinc-100 dark:border-zinc-900"
                    >
                      <td className="py-2 pr-4 font-medium text-zinc-900 dark:text-zinc-100">
                        {r.label}
                      </td>
                      <td className="py-2 pr-4 tabular-nums">{formatInr(r.annualCtc)}</td>
                      <td className="py-2 pr-4 tabular-nums">{formatInr(r.estimatedInHandMonthly)}</td>
                      <td className="py-2 pr-4">{r.rankByInHand}</td>
                      <td className="py-2 pr-4">{r.rankByCtc}</td>
                      <td className="py-2 tabular-nums">
                        {r.estimatedTotalTaxAnnual !== undefined
                          ? formatInr(r.estimatedTotalTaxAnnual)
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
              Best by in-hand (based on your inputs):{" "}
              <strong>{result.bestByInHand || "—"}</strong>. Best by CTC:{" "}
              <strong>{result.bestByCtc || "—"}</strong>.
            </p>
            <ul className="mt-3 list-inside list-disc text-sm text-amber-900 dark:text-amber-100/90">
              {result.warnings.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </CollapsibleBreakdown>
          </ResultReveal>
        )}
      </section>

      <AssumptionsBlock bullets={assumptionBullets} />

      <WorkedExample>
        <p>
          Offer A: CTC ₹18L, in-hand ₹1,05,000/mo. Offer B: CTC ₹20L, in-hand ₹1,02,000/mo. This tool ranks by
          the numbers you believe are comparable — not by automatically recomputing tax.
        </p>
      </WorkedExample>

      <FaqSection
        items={[
          {
            question: "Can SalaryExit compute in-hand for me?",
            answer:
              "Use the CTC→in-hand calculator for each offer with consistent assumptions, then paste results here.",
          },
        ]}
      />
    </CalculatorPageLayout>
  );
}
