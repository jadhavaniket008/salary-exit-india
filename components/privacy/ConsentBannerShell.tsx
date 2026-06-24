"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  dispatchConsentUpdated,
  readConsentFromStorage,
  SALARYEXIT_CONSENT_STORAGE_KEY,
  type SalaryExitConsent,
} from "@/lib/consent";
import { ROUTES } from "@/lib/routes";

/**
 * Consent UI: stores preferences in localStorage and fires CONSENT_UPDATED_EVENT for ThirdPartyRootScripts.
 * Enable with NEXT_PUBLIC_ENABLE_CONSENT_BANNER=true.
 */
export function ConsentBannerShell() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENABLE_CONSENT_BANNER !== "true") return;
    const existing = readConsentFromStorage();
    if (!existing) setVisible(true);
  }, []);

  function saveAll(consent: SalaryExitConsent) {
    localStorage.setItem(SALARYEXIT_CONSENT_STORAGE_KEY, JSON.stringify(consent));
    dispatchConsentUpdated();
    setVisible(false);
  }

  function acceptAll() {
    saveAll({
      necessary: true,
      analytics: true,
      ads: true,
      updatedAt: new Date().toISOString(),
    });
  }

  function rejectNonEssential() {
    saveAll({
      necessary: true,
      analytics: false,
      ads: false,
      updatedAt: new Date().toISOString(),
    });
  }

  if (process.env.NEXT_PUBLIC_ENABLE_CONSENT_BANNER !== "true") {
    return null;
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-title"
          className="fixed bottom-0 left-0 right-0 z-[60] border-t border-border bg-surface/95 p-4 text-sm shadow-lg backdrop-blur"
          initial={{ y: 48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 48, opacity: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2 text-foreground-secondary">
              <p id="consent-title" className="font-semibold text-foreground">
                Cookies & privacy choices
              </p>
              <p>
                We use <strong>strictly necessary</strong> storage to remember this choice. If you opt in, analytics
                and/or ads scripts may load per your deployment settings. See{" "}
                <Link href={ROUTES.privacyPolicy} className="font-medium underline">
                  privacy policy
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface-subtle"
                onClick={rejectNonEssential}
              >
                Reject non-essential
              </button>
              <button
                type="button"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                onClick={acceptAll}
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
