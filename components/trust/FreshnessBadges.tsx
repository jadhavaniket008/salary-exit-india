import {
  ENGINE_FY_LABEL,
  SITE_CONTENT_LAST_UPDATED,
  TAX_RULESET_SOURCE_LABEL,
} from "@/lib/config/site-freshness";

export function FreshnessBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 text-xs ${className}`}>
      <span className="rounded-full border border-zinc-300 bg-white px-2.5 py-1 font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200">
        Content reviewed: {SITE_CONTENT_LAST_UPDATED}
      </span>
      <span className="rounded-full border border-amber-200/90 bg-amber-50/90 px-2.5 py-1 font-medium text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
        {ENGINE_FY_LABEL}
      </span>
      <span
        className="max-w-full rounded-full border border-emerald-200/90 bg-emerald-50/90 px-2.5 py-1 font-medium text-emerald-950 dark:border-emerald-900/50 dark:bg-emerald-950/35 dark:text-emerald-50"
        title="Slabs and rebate limits in code follow this Budget baseline; not a legal certificate."
      >
        Rules aligned: {TAX_RULESET_SOURCE_LABEL}
      </span>
    </div>
  );
}
