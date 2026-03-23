import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { GuideArticleMeta } from "@/lib/content/guides-registry";
import { guideArticlePath } from "@/lib/content/guides-registry";

export function guideArticleMetadata(meta: GuideArticleMeta): Metadata {
  return buildPageMetadata(
    {
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
    },
    { canonicalPath: guideArticlePath(meta) }
  );
}
