import { ENGINE_FY_LABEL, SITE_CONTENT_LAST_UPDATED } from "@/lib/config/site-freshness";

export function FreshnessBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 text-xs ${className}`}>
      <span className="rounded-full border border-zinc-300 bg-white px-2.5 py-1 font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200">
        Last updated: {SITE_CONTENT_LAST_UPDATED}
      </span>
      <span className="rounded-full border border-amber-200/90 bg-amber-50/90 px-2.5 py-1 font-medium text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
        {ENGINE_FY_LABEL}
      </span>
    </div>
  );
}
