import { ImageResponse } from "next/og";
import type { ReactElement } from "react";

/**
 * Shared Open Graph / Twitter card image generator for SalaryExit India.
 *
 * Next.js requires a real `opengraph-image.tsx` file *per route segment* to get a
 * route-specific social image — there is no single sitewide fallback file
 * convention for arbitrary nested segments. To avoid re-implementing the
 * Satori/`ImageResponse` layout in every route, every `opengraph-image.tsx` in
 * this app should be a thin wrapper that calls {@link buildOgImageResponse}
 * with route-specific text, e.g.:
 *
 * ```tsx
 * import { buildOgImageResponse, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/seo/og-image";
 *
 * export const alt = "HRA exemption calculator — SalaryExit India";
 * export const size = OG_IMAGE_SIZE;
 * export const contentType = OG_IMAGE_CONTENT_TYPE;
 *
 * export default async function Image() {
 *   return buildOgImageResponse({
 *     category: "Calculator",
 *     title: "HRA Exemption Calculator",
 *     subtitle: "Section 10(13A) · least-of-three formula",
 *   });
 * }
 * ```
 *
 * Do not use this for the two existing hand-built calculator images
 * (app/ctc-to-in-hand-calculator/opengraph-image.tsx,
 * app/reverse-salary-calculator/opengraph-image.tsx) — those render real
 * engine output for a worked example and are intentionally bespoke.
 *
 * Colors below are hardcoded (not read from CSS custom properties) because
 * Satori renders server-side outside a browser/CSS cascade — `var(--foo)`
 * never resolves inside `ImageResponse`. Values are copied from the
 * dark-mode token block in app/globals.css so this matches the site's actual
 * dark, restrained design system and the two hand-built images that already
 * exist.
 */

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_SIZE = { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT };
export const OG_IMAGE_CONTENT_TYPE = "image/png";

/** Copied from the `@media (prefers-color-scheme: dark)` token block in app/globals.css. */
const OG_COLOR = {
  background: "#111110",
  foreground: "#EDECEA",
  foregroundSecondary: "#A8A69F",
  foregroundMuted: "#6B6966",
  accent: "#29A05E",
  border: "#2E2D2A",
} as const;

const DEFAULT_FOOTER = "Free · Transparent assumptions · salaryexit.in";

export interface OgImageContentProps {
  /**
   * Small eyebrow above the headline, e.g. "Calculator", "Guide", "Salary guides".
   * Omit for surfaces (like the homepage) where the brand line alone is enough.
   */
  category?: string;
  /**
   * Main headline. This is read at small link-preview thumbnail sizes, so keep
   * it short and specific rather than reusing a long SEO `<title>` verbatim —
   * font size shrinks automatically for longer strings, but a concise, purpose-
   * written headline reads better than a shrunk long one.
   */
  title: string;
  /** Optional supporting line under the headline. Keep to one short sentence. */
  subtitle?: string;
  /** Footer strapline. Defaults to a generic, calculation-free tagline. */
  footer?: string;
}

/**
 * Picks a title font size that keeps longer headlines from overflowing the
 * 1200×630 canvas. Mirrors the 44px used by the two hand-built OG images for
 * short titles, and steps down for longer ones instead of letting them clip.
 */
function titleFontSize(title: string): number {
  if (title.length > 65) return 34;
  if (title.length > 46) return 40;
  return 46;
}

/**
 * Builds the shared branded OG/Twitter card layout as a plain JSX element.
 * No hooks, no client state, no `next/image` — this tree is rendered by
 * Satori inside `ImageResponse`, not by React DOM.
 */
export function renderOgImageContent({
  category,
  title,
  subtitle,
  footer = DEFAULT_FOOTER,
}: OgImageContentProps): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: OG_COLOR.background,
        color: OG_COLOR.foreground,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: OG_COLOR.accent }}>
          SalaryExit India
        </div>
        {category ? (
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              color: OG_COLOR.foregroundSecondary,
              marginTop: 32,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {category}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            fontSize: titleFontSize(title),
            fontWeight: 700,
            marginTop: category ? 14 : 32,
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: OG_COLOR.foregroundSecondary,
              marginTop: 22,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 20,
          color: OG_COLOR.foregroundMuted,
          borderTop: `1px solid ${OG_COLOR.border}`,
          paddingTop: 24,
        }}
      >
        {footer}
      </div>
    </div>
  );
}

/**
 * Convenience wrapper: builds the branded layout and wraps it in `ImageResponse`
 * at the standard 1200×630 OG size. Route `opengraph-image.tsx` files call this
 * directly from their default export — see the file header comment for the
 * canonical thin-wrapper shape.
 */
export function buildOgImageResponse(props: OgImageContentProps): ImageResponse {
  return new ImageResponse(renderOgImageContent(props), { ...OG_IMAGE_SIZE });
}
