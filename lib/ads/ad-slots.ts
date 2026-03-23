/**
 * Named ad slot positions for layout and analytics-friendly markup.
 * No third-party IDs here — AdSlot renders safe placeholders until integrations are enabled.
 */

export type AdSlotPosition =
  | "below-hero"
  | "mid-content"
  | "below-result"
  | "before-footer"
  | "sidebar-desktop";

export const AD_SLOT_DATA_ATTR = "data-salaryexit-ad-slot" as const;
