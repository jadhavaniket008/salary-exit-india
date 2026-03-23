"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui";
import { trackShareSummary } from "@/lib/analytics/client";
import {
  buildSalaryRealityShareText,
  formatSalaryRealityShareSummaryOneLine,
  SALARY_REALITY_SHARE_BRAND,
} from "@/lib/share/salary-reality-share-summary";
import { ROUTES } from "@/lib/routes";

type Props = {
  annualCtc: number;
  inHandMonthly: number;
  monthlySavings: number;
  verdictTitle: string;
};

export function SalaryRealityShareBlock({
  annualCtc,
  inHandMonthly,
  monthlySavings,
  verdictTitle,
}: Props) {
  const [pageUrl, setPageUrl] = useState("");
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  useEffect(() => {
    setPageUrl(`${window.location.origin}${ROUTES.salaryRealityCheck}`);
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const oneLine = useMemo(
    () =>
      formatSalaryRealityShareSummaryOneLine({
        annualCtc,
        inHandMonthly,
        monthlySavings,
      }),
    [annualCtc, inHandMonthly, monthlySavings]
  );

  const fullShareText = useMemo(
    () =>
      buildSalaryRealityShareText({
        oneLine,
        verdictTitle,
        pageUrl: pageUrl || undefined,
      }),
    [oneLine, verdictTitle, pageUrl]
  );

  const copy = useCallback(async () => {
    setShareError(null);
    try {
      await navigator.clipboard.writeText(fullShareText);
      trackShareSummary("copy");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setShareError("Could not copy — select the text in the card manually.");
    }
  }, [fullShareText]);

  const share = useCallback(async () => {
    setShareError(null);
    if (!canShare) {
      await copy();
      return;
    }
    try {
      await navigator.share({
        title: `Salary Reality Check — ${SALARY_REALITY_SHARE_BRAND}`,
        text: fullShareText,
        url: pageUrl || undefined,
      });
      trackShareSummary("share_native");
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return;
      await copy();
    }
  }, [canShare, copy, fullShareText, pageUrl]);

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Share this result</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Short summary for WhatsApp, X, or email — includes a disclaimer and link back to the tool.
      </p>

      <div
        id="salary-reality-share-card"
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-violet-950 p-6 text-white shadow-lg ring-1 ring-white/10"
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/20 blur-2xl"
          aria-hidden
        />
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200/90">
          {SALARY_REALITY_SHARE_BRAND}
        </p>
        <p className="mt-1 text-xs text-slate-300">Salary Reality Check</p>
        <p className="mt-4 font-mono text-base font-semibold leading-relaxed tracking-tight text-white sm:text-lg">
          {oneLine}
        </p>
        <p className="mt-3 text-sm text-violet-100/90 line-clamp-2">{verdictTitle}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="primary" onClick={copy}>
          {copied ? "Copied" : "Copy summary"}
        </Button>
        {canShare ? (
          <Button type="button" variant="secondary" onClick={share}>
            Share
          </Button>
        ) : null}
      </div>
      {copied ? (
        <p className="text-xs text-emerald-700 dark:text-emerald-400" role="status">
          Summary copied to clipboard.
        </p>
      ) : null}
      {shareError ? <p className="text-xs text-amber-800 dark:text-amber-200">{shareError}</p> : null}
    </div>
  );
}
