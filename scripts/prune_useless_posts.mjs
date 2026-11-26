import fs from 'node:fs';
import path from 'node:path';

const DATA_FILE = path.resolve(process.cwd(), 'public/data/scanned-forum-posts.json');

const USELESS_TITLE_RE =
  /\b(dev call|monthly update|eu dev call|about the .* category|bump version|bump api_version|release v?\d|ci:|build_binaries|workflow|github actions|refactor|cleanup|clean up|typo|readme|cmake|docker|clang|unit test|add target|new target|board definition|board request|has zero callers|introduce names|deprecate|changelog|retire |update readme|remove unused|fix typo|german translation|french translation|spanish translation|chinese translation|crowdin|q&a|dev call|weekly update|survey|poll|welcome to|guidelines|merch|sticker)\b/i;

const USELESS_TAG_RE =
  /^(duplicate|invalid|wontfix|won't fix|chore|cleanup|documentation|docs|stale|inactive|closing.*|ci|build|refactoring|enhancement request|target request)$/i;

function normalizeTitleKey(str) {
  return (str || '')
    .toLowerCase()
    .replace(/#\d+/g, '')
    .replace(/\b(v?\d+\.\d+(?:\.\d+)?)\b/g, '')
    .replace(/[^a-z0-9àâäéèêëïîôöùûüç]+/gi, ' ')
    .trim();
}

function normalizeTag(t) {
  if (typeof t === 'string') return t.trim();
  if (t && typeof t === 'object') return String(t.name || t.slug || t.id || '').trim();
  return '';
}

function main() {
  const raw = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  console.log(`Loaded ${raw.length} posts.`);

  const seenExact = new Set();
  const seenPrefix = new Set();
  const seenUrls = new Set();
  const kept = [];

  let removedNoise = 0;
  let removedDup = 0;
  let removedLowValue = 0;

  for (const post of raw) {
    const titleEn = (post.titleOriginal || post.title || '').trim();
    const titleFr = (post.title || '').trim();

    // 1. Normalize tags to clean strings
    const cleanTags = Array.from(
      new Set((post.tags || []).map(normalizeTag).filter(Boolean))
    );

    // 2. Remove useless / dev-only / meta titles or tags
    if (USELESS_TITLE_RE.test(titleEn) || USELESS_TITLE_RE.test(titleFr)) {
      removedNoise++;
      continue;
    }
    if (cleanTags.some((t) => USELESS_TAG_RE.test(t))) {
      removedNoise++;
      continue;
    }

    // 3. Remove empty or [code]-only summaries, or 0-reply GitHub issues with no real body
    const sumFr = (post.solutionSummary || '').trim();
    const sumEn = (post.solutionSummaryOriginal || '').trim();
    if (sumFr === '[code]' || sumEn === '[code]' || sumFr.length < 15) {
      removedLowValue++;
      continue;
    }
    if (
      post.id.startsWith('gh-') &&
      (post.replies || 0) === 0 &&
      cleanTags.some((t) => /feature request|enhancement/i.test(t))
    ) {
      removedLowValue++;
      continue;
    }

    // 4. Deduplicate by sourceUrl, normalized full title, and normalized 55-char prefix per brand
    if (post.sourceUrl && seenUrls.has(post.sourceUrl)) {
      removedDup++;
      continue;
    }
    const keyEn = normalizeTitleKey(titleEn);
    const keyFr = normalizeTitleKey(titleFr);
    const prefixKey = `${(post.brand || '').toLowerCase()}::${keyEn.slice(0, 55)}`;

    if (!keyEn || seenExact.has(keyEn) || (keyFr && seenExact.has(keyFr)) || seenPrefix.has(prefixKey)) {
      removedDup++;
      continue;
    }

    if (post.sourceUrl) seenUrls.add(post.sourceUrl);
    seenExact.add(keyEn);
    if (keyFr) seenExact.add(keyFr);
    seenPrefix.add(prefixKey);

    kept.push({
      ...post,
      tags: cleanTags,
    });
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(kept));
  console.log(
    `Pruned: ${removedNoise} noise/dev, ${removedLowValue} low-value, ${removedDup} duplicates. Kept: ${kept.length} posts.`
  );
}

main();
