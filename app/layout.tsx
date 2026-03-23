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
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
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
