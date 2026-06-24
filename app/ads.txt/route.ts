import { NextResponse } from "next/server";

/**
 * ads.txt — required by AdSense, Ezoic, and all programmatic ad networks.
 * Must be reachable at the root domain without JavaScript.
 *
 * AdSense line format:  google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
 * Ezoic line format:    ezoic.com, XXXXXXX, DIRECT, (provided in Ezoic dashboard → Settings → ads.txt)
 *
 * Env vars:
 *   NEXT_PUBLIC_ADSENSE_CLIENT_ID  — ca-pub-XXXXXXXXXXXXXXXX
 *   EZOIC_PUBLISHER_ID             — numeric ID shown in Ezoic dashboard (e.g. 123456)
 */
export function GET() {
  const lines: string[] = [];

  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  if (adsenseClient?.startsWith("ca-pub-")) {
    const pubId = adsenseClient.replace(/^ca-/, "");
    lines.push(`google.com, ${pubId}, DIRECT, f08c47fec0942fa0`);
  }

  // Ezoic requires two lines — one DIRECT and one RESELLER for Google via Ezoic.
  // Get your exact lines from: Ezoic dashboard → Settings → ads.txt Manager.
  // The EZOIC_PUBLISHER_ID is the numeric ID in your Ezoic account (not prefixed).
  const ezoicId = process.env.EZOIC_PUBLISHER_ID?.trim();
  if (ezoicId) {
    lines.push(`ezoic.com, ${ezoicId}, DIRECT, 31710`);
    // Ezoic also resells Google inventory — this line is required by Ezoic for compliance.
    if (adsenseClient?.startsWith("ca-pub-")) {
      const pubId = adsenseClient.replace(/^ca-/, "");
      lines.push(`google.com, ${pubId}, RESELLER, f08c47fec0942fa0`);
    }
  }

  if (lines.length === 0) {
    return new NextResponse(
      [
        "# No ad networks configured yet.",
        "# Set NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX for AdSense.",
        "# Set EZOIC_PUBLISHER_ID=XXXXXXX for Ezoic (numeric ID from Ezoic dashboard).",
        "",
      ].join("\n"),
      {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=300, s-maxage=300",
        },
      }
    );
  }

  return new NextResponse(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
