import { NextResponse } from "next/server";

/**
 * ads.txt for Google AdSense (and compatible crawlers). Required for site verification
 * when AdSense asks you to publish ads.txt — must be reachable without JavaScript.
 *
 * Line format: google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
 * @see https://support.google.com/adsense/answer/7532444
 */
export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  if (!client?.startsWith("ca-pub-")) {
    return new NextResponse(
      [
        "# AdSense publisher ID is not configured yet.",
        "# Set NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX in production.",
        "# Example format once approved:",
        "# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0",
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

  const pubId = client.replace(/^ca-/, "");
  const body = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
