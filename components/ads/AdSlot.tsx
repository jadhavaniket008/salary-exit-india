"use client";

import { useEffect, useId, useMemo, useState } from "react";
import type { AdSlotPosition } from "@/lib/ads/ad-slots";
import { AD_SLOT_DATA_ATTR } from "@/lib/ads/ad-slots";
import {
  CONSENT_UPDATED_EVENT,
  readConsentFromStorage,
  type SalaryExitConsent,
} from "@/lib/consent";

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

function adsenseSlotIdForPosition(position: AdSlotPosition): string | undefined {
  const fallback = process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT?.trim();
  const perPosition: Record<AdSlotPosition, string | undefined> = {
    "below-hero": process.env.NEXT_PUBLIC_ADSENSE_SLOT_BELOW_HERO?.trim(),
    "mid-content": process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID_CONTENT?.trim(),
    "below-result": process.env.NEXT_PUBLIC_ADSENSE_SLOT_BELOW_RESULT?.trim(),
    "before-footer": process.env.NEXT_PUBLIC_ADSENSE_SLOT_BEFORE_FOOTER?.trim(),
    "sidebar-desktop": process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR_DESKTOP?.trim(),
  };

  return perPosition[position] || fallback || undefined;
}

/**
 * Ad slot:
 * - When AdSense env vars + consent allow ads, renders a standard AdSense display unit (`ins.adsbygoogle`).
 * - Otherwise renders a safe dashed placeholder (or nothing when slots are globally disabled).
 */
export function AdSlot({
  position,
  label = "Advertisement",
  className = "",
  enabled,
}: Props) {
  const globallyOn = process.env.NEXT_PUBLIC_ENABLE_AD_SLOTS !== "false";
  const show = enabled !== false && globallyOn;

  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  const adsenseSlot = adsenseSlotIdForPosition(position);
  const consentBannerOn = process.env.NEXT_PUBLIC_ENABLE_CONSENT_BANNER === "true";

  const reactId = useId();
  const insDomId = useMemo(() => `salaryexit-ad-${position}-${reactId.replace(/:/g, "")}`, [position, reactId]);

  const [consent, setConsent] = useState<SalaryExitConsent | null>(null);

  useEffect(() => {
    function refresh() {
      if (!consentBannerOn) {
        setConsent({ necessary: true, analytics: true, ads: true, updatedAt: new Date().toISOString() });
        return;
      }
      setConsent(readConsentFromStorage());
    }
    refresh();
    window.addEventListener(CONSENT_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, refresh);
  }, [consentBannerOn]);

  const allowAds = consent?.ads ?? false;
  const canRenderAdsense = Boolean(adsenseClient && adsenseSlot && allowAds);

  useEffect(() => {
    if (!show || !canRenderAdsense) return;
    const el = document.getElementById(insDomId);
    if (!el) return;
    if (el.getAttribute("data-ad-pushed") === "true") return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      el.setAttribute("data-ad-pushed", "true");
    } catch {
      /* ignore */
    }
  }, [show, canRenderAdsense, insDomId]);

  if (!show) {
    return null;
  }

  if (canRenderAdsense) {
    return (
      <aside
        {...{ [AD_SLOT_DATA_ATTR]: position }}
        aria-label={label}
        className={`mx-auto w-full max-w-5xl ${positionClasses[position]} ${className}`}
      >
        <ins
          id={insDomId}
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={adsenseClient}
          data-ad-slot={adsenseSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </aside>
    );
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
          .{" "}
          {adsenseClient && !adsenseSlot
            ? "Set NEXT_PUBLIC_ADSENSE_SLOT_* env vars in Vercel to render live AdSense units."
            : consentBannerOn && !allowAds
              ? "Accept ads in the consent banner to load AdSense."
              : "Enable AdSense slots + client ID in production to replace this placeholder."}
        </span>
      </div>
    </aside>
  );
}
