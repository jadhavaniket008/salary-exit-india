import {
  ENGINE_FY_LABEL,
  SITE_CONTENT_LAST_UPDATED,
  TAX_RULESET_SOURCE_LABEL,
} from "@/lib/config/site-freshness";

export function FreshnessBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 text-xs ${className}`}>
      <span className="rounded-full border border-border bg-surface px-2.5 py-1 font-medium text-foreground-secondary">
        Reviewed: {SITE_CONTENT_LAST_UPDATED}
      </span>
      <span className="rounded-full border border-warning-bg bg-warning-bg px-2.5 py-1 font-medium text-warning">
        {ENGINE_FY_LABEL}
      </span>
      <span
        className="max-w-full rounded-full border border-accent-light bg-accent-light px-2.5 py-1 font-medium text-accent"
        title="Slabs and rebate limits in code follow this Budget baseline; not a legal certificate."
      >
        {TAX_RULESET_SOURCE_LABEL}
      </span>
    </div>
  );
}
