"use client";

import { useMemo, useState } from "react";
import type { SalaryLevelRow } from "@/lib/growth/in-hand-salary-model";

type Props = {
  rows: SalaryLevelRow[];
  employerCostShareScenarios: readonly number[];
};

function formatInr(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function formatLpa(value: number): string {
  return `₹${(value / 1_00_000).toFixed(0)}L`;
}

/**
 * Server-renders the full table on first paint (no whileInView/opacity-0 — same
 * invisible-until-JS bug class fixed elsewhere on this site); filter buttons are
 * a client-side progressive enhancement over data already present in the HTML.
 */
export function InHandModelTable({ rows, employerCostShareScenarios }: Props) {
  const [employerCostShare, setEmployerCostShare] = useState<number>(0.13);
  const [pfScenario, setPfScenario] = useState<"statutory-ceiling" | "full-basic">(
    "statutory-ceiling"
  );

  const filtered = useMemo(
    () =>
      rows
        .filter((r) => r.employerCostSharePct === employerCostShare && r.pfScenario === pfScenario)
        .sort((a, b) => a.annualCtc - b.annualCtc),
    [rows, employerCostShare, pfScenario]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="font-medium text-foreground">Employer-cost share:</span>
        <div className="flex gap-1.5" role="group" aria-label="Employer-cost share of CTC">
          {employerCostShareScenarios.map((share) => (
            <button
              key={share}
              type="button"
              onClick={() => setEmployerCostShare(share)}
              aria-pressed={employerCostShare === share}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                employerCostShare === share
                  ? "border-accent-solid bg-accent-solid text-white"
                  : "border-border bg-surface text-foreground-secondary hover:bg-surface-subtle"
              }`}
            >
              {Math.round(share * 100)}%
            </button>
          ))}
        </div>
        <span className="ml-2 font-medium text-foreground">PF basis:</span>
        <div className="flex gap-1.5" role="group" aria-label="PF wage basis">
          {(
            [
              { id: "statutory-ceiling" as const, label: "Statutory ceiling" },
              { id: "full-basic" as const, label: "Full Basic+DA" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setPfScenario(opt.id)}
              aria-pressed={pfScenario === opt.id}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                pfScenario === opt.id
                  ? "border-accent-solid bg-accent-solid text-white"
                  : "border-border bg-surface text-foreground-secondary hover:bg-surface-subtle"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-subtle text-left text-xs uppercase tracking-wide text-foreground-muted">
              <th scope="col" className="px-4 py-3 font-medium">
                Annual CTC
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Annual gross
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Employee PF (annual)
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Monthly in-hand
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                In-hand as % of CTC
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const barPct = Math.min(100, row.inHandAsPctOfCtc * 100);
              return (
                <tr key={row.annualCtc} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-3 font-medium text-foreground">{formatLpa(row.annualCtc)}</td>
                  <td className="px-4 py-3 text-foreground-secondary">{formatInr(row.annualGross)}</td>
                  <td className="px-4 py-3 text-foreground-secondary">
                    {formatInr(row.employeePfAnnual)}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground tabular-nums">
                    {formatInr(row.monthlyInHand)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-border/40">
                        <div
                          className="h-full rounded-full bg-accent-solid"
                          style={{ width: `${barPct}%` }}
                        />
                      </div>
                      <span className="tabular-nums text-foreground-secondary">
                        {(row.inHandAsPctOfCtc * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
