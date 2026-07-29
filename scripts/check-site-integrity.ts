/**
 * Post-build site-integrity check. Run after `next build`.
 *
 * Guards against the specific, real regressions found during the July 2026
 * audit cycle so a future Budget update or shared-component refactor can't
 * silently reintroduce them: stale FY labels, the "gross CTC" contradiction,
 * a wrong Section 87A threshold, noindexed pages leaking into the sitemap,
 * and calculator pages missing the trust surfaces (methodology link,
 * report-error link) added this cycle.
 *
 * Not a replacement for the calculator-logic unit tests in tests/ — this
 * checks rendered *content*, which is where drift actually happened.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  getAllSalaryEnoughSlugs,
  STRONG_PERFORMER_SALARY_ENOUGH_SLUGS,
} from "../lib/content/salary-enough-pages.config";
import sitemap from "../app/sitemap";
import { salaryEnoughPath } from "../lib/routes/landing-routes";
import { CALCULATOR_REGISTRY } from "../lib/calculator-registry";

const APP_DIR = join(process.cwd(), ".next/server/app");
const failures: string[] = [];

function fail(context: string, message: string): void {
  failures.push(`${context}: ${message}`);
}

function walkHtmlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...walkHtmlFiles(full));
    } else if (entry.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Snippets that are correctly dated historical/filing-year references, not
 * "current calculation year" claims — matching these is not a bug.
 */
const FY_ALLOWLIST_SUBSTRINGS = [
  "what actually changed in FY 2024-25",
  "default from FY 2024-25 onwards",
  "FY 2025-26 income tax return due",
  "individuals. From FY 2024-25, the new regime is",
  "new tax regime (FY 2025-26 and FY 2026-27)",
];

let htmlFiles: string[];
try {
  htmlFiles = walkHtmlFiles(APP_DIR);
} catch {
  console.error(`Could not read ${APP_DIR} — run "npm run build" first.`);
  process.exit(1);
}

if (htmlFiles.length === 0) {
  console.error(`No generated HTML found under ${APP_DIR} — run "npm run build" first.`);
  process.exit(1);
}

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const relative = file.replace(APP_DIR, "") || "/";

  for (const match of html.matchAll(/.{0,60}FY 202[45]-2[56].{0,45}/g)) {
    const snippet = match[0];
    const isAllowed = FY_ALLOWLIST_SUBSTRINGS.some((allowed) => snippet.includes(allowed));
    if (!isAllowed) {
      fail(relative, `possible stale FY reference: "${snippet.trim()}"`);
    }
  }

  if (html.includes("gross CTC")) {
    fail(relative, `contains "gross CTC" — CTC and gross are different figures, never combine the terms`);
  }

  if (/₹7 lakh \(old regime\)/.test(html)) {
    fail(relative, `old-regime Section 87A threshold shown as ₹7 lakh — should be ₹5 lakh`);
  }
}

// Sitemap must expose only the currently-indexed salary-enough pages, never
// the noindexed 23 — this was the core AdSense-exposure fix this cycle.
const sitemapEntries = sitemap();
const sitemapUrls = new Set(sitemapEntries.map((e) => e.url));
for (const slug of getAllSalaryEnoughSlugs()) {
  const path = salaryEnoughPath(slug);
  const inSitemap = [...sitemapUrls].some((url) => url.endsWith(path));
  const shouldBeIndexed = STRONG_PERFORMER_SALARY_ENOUGH_SLUGS.has(slug);
  if (inSitemap !== shouldBeIndexed) {
    fail(
      "sitemap",
      `${slug}: in sitemap = ${inSitemap}, expected ${shouldBeIndexed} (STRONG_PERFORMER_SALARY_ENOUGH_SLUGS)`
    );
  }
}

// Every calculator page must keep its trust surfaces — methodology link and
// the "Report a calculation error" link added this cycle.
for (const def of Object.values(CALCULATOR_REGISTRY)) {
  const file = join(APP_DIR, `${def.path === "/" ? "index" : def.path.slice(1)}.html`);
  let html: string;
  try {
    html = readFileSync(file, "utf8");
  } catch {
    fail(def.path, "no generated HTML found for this calculator — check the route builds");
    continue;
  }
  if (!html.includes("Report a calculation error")) {
    fail(def.path, `missing "Report a calculation error" link`);
  }
  if (!/Methodology/i.test(html)) {
    fail(def.path, `missing methodology link`);
  }
}

if (failures.length > 0) {
  console.error(`\nSite integrity check FAILED — ${failures.length} issue(s):\n`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error("");
  process.exit(1);
}

console.log(`Site integrity check passed — ${htmlFiles.length} pages, ${Object.keys(CALCULATOR_REGISTRY).length} calculators, ${getAllSalaryEnoughSlugs().length} salary-enough pages checked.`);
