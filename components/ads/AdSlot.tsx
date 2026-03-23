import type { AdSlotPosition } from "@/lib/ads/ad-slots";
import { AD_SLOT_DATA_ATTR } from "@/lib/ads/ad-slots";

type Props = {
  position: AdSlotPosition;
  /** Accessible label for screen readers */
  label?: string;
  className?: string;
  /** When false, renders nothing (clean layout when ads disabled globally) */
  enabled?: boolean;
};

const positionClasses: Record<AdSlotPosition, string> = {
  "below-hero": "my-6 min-h-[100px]",
  "mid-content": "my-8 min-h-[120px]",
  "below-result": "my-8 min-h-[120px]",
  "before-footer": "my-10 min-h-[100px]",
  "sidebar-desktop":
    "hidden min-h-[240px] lg:sticky lg:top-24 lg:block lg:min-h-[300px] lg:w-full",
};

/**
 * Safe ad slot: dashed placeholder until a publisher integrates AdSense or another network.
 * Set NEXT_PUBLIC_ENABLE_AD_SLOTS=false to hide all slots without breaking layout (optional).
 */
export function AdSlot({
  position,
  label = "Advertisement",
  className = "",
  enabled,
}: Props) {
  const globallyOn = process.env.NEXT_PUBLIC_ENABLE_AD_SLOTS !== "false";
  const show = enabled !== false && globallyOn;

  if (!show) {
    return null;
  }

  return (
    <aside
      {...{ [AD_SLOT_DATA_ATTR]: position }}
      aria-label={label}
      className={`rounded-2xl border border-dashed border-zinc-300/90 bg-zinc-50/90 text-center text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400 ${positionClasses[position]} ${className}`}
    >
      <div className="flex h-full min-h-inherit flex-col items-center justify-center px-4 py-6">
        <span className="font-medium text-zinc-600 dark:text-zinc-300">{label}</span>
        <span className="mt-1 max-w-sm text-[11px] leading-snug text-zinc-500 dark:text-zinc-500">
          Slot: <code className="rounded bg-zinc-200/80 px-1 py-0.5 text-[10px] dark:bg-zinc-800">{position}</code>
          . Configure ad integrations in production; no scripts load until you add them.
        </span>
      </div>
    </aside>
  );
}
