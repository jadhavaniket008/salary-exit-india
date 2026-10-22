# Graph Report - lib/content  (2026-05-26)

## Corpus Check
- Corpus is ~18,610 words - fits in a single context window. You may not need a graph.

## Summary
- 30 nodes · 21 edges · 2 communities detected
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 3|Community 3]]

## God Nodes (most connected - your core abstractions)
1. `KEY()` - 2 edges
2. `getGuideClusterLinks()` - 2 edges
3. `guideArticleMetadata()` - 2 edges
4. `guideArticlePath()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `guideArticleMetadata()` --calls--> `guideArticlePath()`  [INFERRED]
  C:\Personal data\Aniket\Personal_Code\adsense-app\lib\content\guide-metadata.ts → C:\Personal data\Aniket\Personal_Code\adsense-app\lib\content\guides-registry.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.33
Nodes (2): guideArticleMetadata(), guideArticlePath()

### Community 3 - "Community 3"
Cohesion: 1.0
Nodes (2): getGuideClusterLinks(), KEY()

## Knowledge Gaps
- **Thin community `Community 0`** (6 nodes): `guideArticleMetadata()`, `guide-metadata.ts`, `getGuideArticleByHubSegment()`, `guideArticlePath()`, `listArticlesForHub()`, `guides-registry.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 3`** (3 nodes): `getGuideClusterLinks()`, `KEY()`, `guide-cluster-links.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Not enough signal to generate questions. This usually means the corpus has no AMBIGUOUS edges, no bridge nodes, no INFERRED relationships, and all communities are tightly cohesive. Add more files or run with --mode deep to extract richer edges._