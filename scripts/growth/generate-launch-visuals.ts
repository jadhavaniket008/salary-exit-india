/**
 * Renders the 5 launch visual families (docs/growth/launch-assets.md) at both
 * 1200x630 (social) and 1080x1350 (vertical) into public/growth-assets/.
 * Usage: npx tsx scripts/growth/generate-launch-visuals.ts
 */

import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { buildChartImageResponse, CHART_FAMILIES } from "@/lib/growth/chart-image";

async function main(): Promise<void> {
  const outDir = path.resolve(process.cwd(), "public", "growth-assets", "required-ctc-report-2026");
  mkdirSync(outDir, { recursive: true });

  for (const family of CHART_FAMILIES) {
    for (const vertical of [false, true]) {
      const suffix = vertical ? "1080x1350" : "1200x630";
      const response = buildChartImageResponse(family.id, vertical);
      const buffer = Buffer.from(await response.arrayBuffer());
      const filePath = path.join(outDir, `${family.id}-${suffix}.png`);
      writeFileSync(filePath, buffer);
      console.log(`Wrote ${filePath} (${buffer.length} bytes)`);
    }
  }
}

main();
