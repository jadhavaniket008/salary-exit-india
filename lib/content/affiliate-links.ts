// Replace every URL that contains "REPLACE" with your actual referral URL before enabling.
// Set NEXT_PUBLIC_ENABLE_AFFILIATE_LINKS=true in Vercel once all URLs are live.

export type AffiliateContext = "investing" | "tax-filing";

export interface AffiliateLink {
  name: string;
  tagline: string;
  cta: string;
  url: string;
  badge?: string;
}

export const AFFILIATE_LINKS: Record<AffiliateContext, AffiliateLink[]> = {
  investing: [
    {
      name: "Zerodha",
      tagline: "₹0 brokerage on equity delivery. India's most trusted broker — used by 1.3 crore investors.",
      cta: "Open free account",
      // Get referral link: zerodha.com → log in → refer a friend
      url: "https://zerodha.com/open-account?c=REPLACE_YOUR_CODE",
      badge: "Free account",
    },
    {
      name: "Groww",
      tagline: "Mutual funds, stocks and FD in one place — simple app, good for first-time investors.",
      cta: "Start investing",
      // Get referral link: groww.in app → Profile → Refer & Earn
      url: "https://groww.in/open-free-demat-account?ref=REPLACE_YOUR_CODE",
    },
    {
      name: "Ditto by Zerodha",
      tagline: "Free, unbiased advice on term life and health insurance. No hard selling.",
      cta: "Free advisor call",
      // Get referral link: joinditto.in → login → Refer a friend
      url: "https://joinditto.in/?ref=REPLACE_YOUR_CODE",
      badge: "Free consultation",
    },
  ],
  "tax-filing": [
    {
      name: "ClearTax",
      tagline: "File your ITR online in minutes — pre-filled from Form 26AS and AIS data.",
      cta: "File ITR free",
      // Get affiliate link: cleartax.in → Partner with us → Affiliate program
      url: "https://cleartax.in/s/itr-filing?utm_source=salaryexit&utm_medium=affiliate",
    },
    {
      name: "Quicko",
      tagline: "Smart ITR filing for salaried employees — handles both old and new regime in one step.",
      cta: "Try free plan",
      // Get referral link: quicko.com → Refer & Earn (in the app)
      url: "https://quicko.com/?ref=REPLACE_YOUR_CODE",
    },
  ],
};
