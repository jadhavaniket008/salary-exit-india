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
      "# NEXT_PUBLIC_ADSENSE_CLIENT_ID not set or invalid (expected ca-pub-…).\n",
      {
        status: 404,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
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
