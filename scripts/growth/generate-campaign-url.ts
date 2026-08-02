#!/usr/bin/env -S npx tsx
/**
 * CLI for building a validated campaign URL. Prints the result — writes
 * nothing to disk or to campaign-ledger.csv (append that manually after
 * reviewing the printed URL).
 *
 * Usage:
 *   npx tsx scripts/growth/generate-campaign-url.ts \
 *     --url /ctc-to-in-hand-calculator \
 *     --source reddit --medium community \
 *     --campaign required-ctc-report-2026 \
 *     --content personalfinanceindia-native-table
 */

import { buildCampaignUrl } from "@/lib/growth/campaign-url";

function getArg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  if (idx === -1 || idx === process.argv.length - 1) return undefined;
  return process.argv[idx + 1];
}

function main(): void {
  const destinationUrl = getArg("--url");
  const utmSource = getArg("--source");
  const utmMedium = getArg("--medium");
  const utmCampaign = getArg("--campaign");
  const utmContent = getArg("--content");
  const utmId = getArg("--id");

  if (!destinationUrl || !utmSource || !utmMedium || !utmCampaign || !utmContent) {
    console.error(
      "Usage: --url <path> --source <utm_source> --medium <utm_medium> --campaign <utm_campaign> --content <utm_content> [--id <utm_id>]"
    );
    process.exitCode = 1;
    return;
  }

  const result = buildCampaignUrl({
    destinationUrl,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmId,
  });

  if (!result.ok) {
    console.error("Invalid campaign URL:");
    result.errors.forEach((e) => console.error(`  - ${e}`));
    process.exitCode = 1;
    return;
  }

  console.log(result.url);
}

main();
