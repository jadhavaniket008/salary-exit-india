/**
 * Client-side consent preferences for analytics and ads.
 * When `NEXT_PUBLIC_ENABLE_CONSENT_BANNER` is false, callers should treat non-essential as allowed (legacy).
 */

export const SALARYEXIT_CONSENT_STORAGE_KEY = "salaryexit_consent_v1";

export type SalaryExitConsent = {
  necessary: true;
  analytics: boolean;
  ads: boolean;
  updatedAt: string;
};

export function parseConsentJson(raw: string | null): SalaryExitConsent | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as SalaryExitConsent;
    if (v && v.necessary === true && typeof v.analytics === "boolean" && typeof v.ads === "boolean") {
      return v;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function readConsentFromStorage(): SalaryExitConsent | null {
  if (typeof window === "undefined") return null;
  return parseConsentJson(localStorage.getItem(SALARYEXIT_CONSENT_STORAGE_KEY));
}

export const CONSENT_UPDATED_EVENT = "salaryexit-consent-updated";

export function dispatchConsentUpdated(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT));
}
