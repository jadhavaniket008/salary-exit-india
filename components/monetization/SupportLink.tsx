"use client";

import { trackSupportClick } from "@/lib/analytics/client";

/**
 * Footer "support" link — a direct UPI deep link, not a third-party platform.
 * Buy Me a Coffee / Ko-fi do not pay out to India (not on Stripe Connect's
 * supported-country list), so this avoids that entirely: tapping the link
 * opens the visitor's own UPI app (GPay/PhonePe/Paytm/etc.) with the payee
 * pre-filled and lets them choose an amount. Renders nothing until a UPI ID
 * is configured.
 */
export function SupportLink() {
  const upiId = process.env.NEXT_PUBLIC_UPI_ID?.trim();
  if (!upiId) return null;

  const payeeName = process.env.NEXT_PUBLIC_UPI_PAYEE_NAME?.trim() || "SalaryExit India";
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&cu=INR&tn=${encodeURIComponent("Support SalaryExit India")}`;

  return (
    <div className="space-y-1">
      <a
        href={upiUrl}
        rel="nofollow"
        onClick={() => trackSupportClick()}
        className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">☕</span>
        Support via UPI
      </a>
      <p className="text-xs text-foreground-muted">
        On desktop? Pay directly to <span className="font-mono">{upiId}</span>
      </p>
    </div>
  );
}
