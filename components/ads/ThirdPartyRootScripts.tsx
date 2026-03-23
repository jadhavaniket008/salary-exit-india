"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  CONSENT_UPDATED_EVENT,
  readConsentFromStorage,
  type SalaryExitConsent,
} from "@/lib/consent";

/**
 * Sitewide script insertion. When consent banner is enabled, analytics/ads load only after opt-in.
 *
 * **No network calls** to Google Analytics, Plausible, or AdSense are made unless:
 * - the corresponding `NEXT_PUBLIC_*` env var is set, and
 * - consent allows it (or the banner is off, in which case analytics/ads are treated as allowed — see `lib/consent.ts`).
 *
 * Custom events are fired from `lib/analytics/client.ts` only after `window.gtag` / `window.plausible` exist.
 */
export function ThirdPartyRootScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  const consentBannerOn = process.env.NEXT_PUBLIC_ENABLE_CONSENT_BANNER === "true";

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

  const allowAnalytics = consent?.analytics ?? false;
  const allowAds = consent?.ads ?? false;
  const showGa = Boolean(gaId && allowAnalytics);
  const showPlausible = Boolean(plausibleDomain && allowAnalytics);
  const showAdsense = Boolean(adsenseClient && allowAds);

  return (
    <>
      {showGa ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId!)}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${JSON.stringify(gaId)});
            `}
          </Script>
        </>
      ) : null}

      {showPlausible ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}

      {showAdsense ? (
        <Script
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsenseClient!)}`}
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
