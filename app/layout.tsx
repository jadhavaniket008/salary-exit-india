import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ThirdPartyRootScripts } from "@/components/ads/ThirdPartyRootScripts";
import { ConsentBannerShell } from "@/components/privacy/ConsentBannerShell";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteOrigin } from "@/lib/seo/site-origin";
import { defaultSiteSeo } from "@/lib/site";
import { JsonLd } from "@/components/content/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: getSiteOrigin(),
  ...buildPageMetadata(defaultSiteSeo),
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
};

const ezoicEnabled = process.env.NEXT_PUBLIC_ENABLE_EZOIC === "true";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {ezoicEnabled ? (
        <head>
          {/* Ezoic CMP privacy scripts — must be first in <head> */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script data-cfasync="false" src="https://cmp.gatekeeperconsent.com/min.js" />
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script data-cfasync="false" src="https://the.gatekeeperconsent.com/cmp.min.js" />
          {/* Ezoic ad system bootstrap */}
          <script async src="//www.ezojs.com/ezoic/sa.min.js" />
          <script
            dangerouslySetInnerHTML={{
              __html:
                "window.ezstandalone=window.ezstandalone||{};ezstandalone.cmd=ezstandalone.cmd||[];",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="//ezoicanalytics.com/analytics.js" />
        </head>
      ) : null}
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={organizationJsonLd()} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <ThirdPartyRootScripts />
        <ConsentBannerShell />
        <StickyMobileCta />
      </body>
    </html>
  );
}
