"use client";

import Link from "next/link";

type BannerConfig = {
  label: string;
  message: string;
  cta: string;
  href: string;
  urgency: "high" | "medium";
};

function getSeasonalBanner(): BannerConfig | null {
  const month = new Date().getMonth() + 1; // 1-indexed

  if (month >= 4 && month <= 7) {
    return {
      label: "ITR Season",
      message: "FY 2025-26 income tax return due July 31, 2026 — verify your regime choice before filing.",
      cta: "Compare old vs new regime →",
      href: "/old-vs-new-tax-regime-calculator",
      urgency: "high",
    };
  }

  if (month >= 10 && month <= 11) {
    return {
      label: "Appraisal Season",
      message: "Got a hike? Know what your revised CTC actually means in-hand before accepting.",
      cta: "Calculate new in-hand →",
      href: "/calculators/ctc-to-in-hand",
      urgency: "medium",
    };
  }

  if (month >= 1 && month <= 3) {
    return {
      label: "Tax Planning",
      message: "March 31 deadline: declare your tax regime with your employer before the financial year ends.",
      cta: "Compare regimes now →",
      href: "/old-vs-new-tax-regime-calculator",
      urgency: "medium",
    };
  }

  return null;
}

export function SeasonalBanner() {
  const banner = getSeasonalBanner();
  if (!banner) return null;

  const isHigh = banner.urgency === "high";

  return (
    <div
      className={
        isHigh
          ? "border-b border-amber-300/60 bg-amber-50 dark:border-amber-700/40 dark:bg-amber-950/30"
          : "border-b border-[var(--border)] bg-[var(--surface-subtle)]"
      }
      role="banner"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-4 py-2.5 text-sm sm:flex-nowrap">
        <span
          className={
            isHigh
              ? "shrink-0 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white"
              : "shrink-0 rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white"
          }
        >
          {banner.label}
        </span>
        <span
          className={
            isHigh
              ? "text-amber-900 dark:text-amber-100"
              : "text-[var(--foreground-secondary)]"
          }
        >
          {banner.message}
        </span>
        <Link
          href={banner.href}
          className={
            isHigh
              ? "ml-auto shrink-0 font-semibold text-amber-700 underline-offset-2 hover:underline dark:text-amber-300"
              : "ml-auto shrink-0 font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
          }
        >
          {banner.cta}
        </Link>
      </div>
    </div>
  );
}
