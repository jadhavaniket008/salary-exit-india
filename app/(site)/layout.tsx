import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ThirdPartyRootScripts } from "@/components/ads/ThirdPartyRootScripts";
import { ConsentBannerShell } from "@/components/privacy/ConsentBannerShell";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { SeasonalBanner } from "@/components/ui/SeasonalBanner";

/**
 * Shared site chrome (header, footer, analytics, consent banner, sticky CTA)
 * for every normal page. Deliberately NOT applied to /embed/* — those routes
 * live outside this group so they render only the minimal true-root layout
 * (app/layout.tsx). Next.js layouts compose additively and can't be
 * conditionally skipped from within a shared component, so route-group
 * separation is the correct tool here rather than a pathname check inside
 * SiteHeader/SiteFooter/ConsentBannerShell.
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent-solid focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <SeasonalBanner />
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
      <SiteFooter />
      <ThirdPartyRootScripts />
      <ConsentBannerShell />
      <StickyMobileCta />
    </>
  );
}
