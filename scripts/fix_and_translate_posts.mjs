import fs from 'node:fs';
import path from 'node:path';

const DATA_FILE = path.resolve(process.cwd(), 'public/data/scanned-forum-posts.json');

const NOISE_TITLE_RE =
  /\b(dev call|monthly update|eu dev call|about the .* category|bump version|bump api_version|release v?\d|ci:|build_binaries_history|workflow|github actions)\b/i;

const TEMPLATE_HEADERS_RE =
  /^(?:#{1,6}\s*)?(?:describe the bug|current behavior|expected behavior|steps to reproduce|to reproduce|is your feature request related to a problem\?? please describe|describe the solution you'd like|describe alternatives you've considered|additional context|flight controller configuration|setup \/ version|what part of edgetx is.*|i have searched the existing issues|issue details|bug report|environment|hardware|software version|logs?|screenshots?)\s*:?\s*$/gim;

function cleanMarkdownAndBoilerplate(str, maxLen = 420) {
  if (!str) return '';
  let s = str
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s*[-*]\s*\[[ xX]\]\s*.*$/gm, '')
    .replace(TEMPLATE_HEADERS_RE, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`~]+/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\r/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  if (s.length > maxLen) {
    s = `${s.slice(0, maxLen).trim()}…`;
  }
  return s;
}

function stripBrandPrefix(title) {
  return (title || '').replace(/^\[[^\]]+\]\s*/, '').trim();
}

async function translateBatch(texts) {
  if (texts.length === 0) return [];
  const DELIM = '\n[[[SEP]]]\n';
  const joined = texts.join(DELIM);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=fr&dt=t&q=${encodeURIComponent(joined)}`;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      });
      if (!res.ok) {
        await new Promise((r) => setTimeout(r, 600 * (attempt + 1)));
        continue;
      }
      const data = await res.json();
      const translated = (data?.[0] || []).map((chunk) => chunk?.[0] || '').join('');
      const parts = translated.split(/\s*\[\[\[SEP\]\]\]\s*/);
      if (parts.length === texts.length) {
        return parts.map((p) => p.trim());
      }
      // Fallback: translate individually if delimiter count mismatched
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }

  // Individual fallback
  const results = [];
  for (const t of texts) {
    try {
      const urlSingle = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=fr&dt=t&q=${encodeURIComponent(t)}`;
      const res = await fetch(urlSingle);
      if (res.ok) {
        const data = await res.json();
        results.push((data?.[0] || []).map((c) => c?.[0] || '').join('').trim() || t);
      } else {
        results.push(t);
      }
    } catch {
      results.push(t);
    }
  }
  return results;
}

async function main() {
  const raw = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  console.log(`Loaded ${raw.length} posts.`);

  // 1. Filter noise & clean texts
  const cleaned = [];
  const seenTitles = new Set();

  for (const post of raw) {
    const rawTitle = stripBrandPrefix(post.titleOriginal || post.title || '');
    if (!rawTitle || rawTitle.length < 6) continue;
    if (NOISE_TITLE_RE.test(rawTitle)) continue;

    const dedupKey = `${(post.brand || '').toLowerCase()}::${rawTitle.toLowerCase()}`;
    if (seenTitles.has(dedupKey)) continue;
    seenTitles.add(dedupKey);

    const rawSummary = post.solutionSummaryOriginal || post.solutionSummary || '';
    const isGenericDiscourse =
      rawSummary.startsWith('Discussion technique (') ||
      rawSummary.startsWith('Ticket résolu sur ');

    const cleanSummaryEn = isGenericDiscourse
      ? ''
      : cleanMarkdownAndBoilerplate(rawSummary, 340);

    cleaned.push({
      ...post,
      titleOriginal: rawTitle,
      solutionSummaryOriginal: cleanSummaryEn || rawSummary,
      _cleanSummaryEn: cleanSummaryEn,
      _isGenericDiscourse: isGenericDiscourse,
    });
  }

  console.log(`After noise filter & dedup: ${cleaned.length} posts.`);

  // 2. Batch translate titles (and non-generic summaries) with concurrency
  const BATCH_SIZE = 12;
  const CONCURRENCY = 8;

  // Build tasks
  const tasks = [];
  for (let i = 0; i < cleaned.length; i += BATCH_SIZE) {
    tasks.push(cleaned.slice(i, i + BATCH_SIZE));
  }

  let doneCount = 0;
  async function processBatch(batch) {
    const titlesToTranslate = batch.map((p) => p.titleOriginal);
    const translatedTitles = await translateBatch(titlesToTranslate);

    const summaryIndices = [];
    const summariesToTranslate = [];
    batch.forEach((p, idx) => {
      if (p._cleanSummaryEn && p._cleanSummaryEn.length > 10) {
        summaryIndices.push(idx);
        summariesToTranslate.push(p._cleanSummaryEn);
      }
    });

    const translatedSummaries =
      summariesToTranslate.length > 0 ? await translateBatch(summariesToTranslate) : [];

    batch.forEach((p, idx) => {
      p.title = translatedTitles[idx] || p.titleOriginal;
      if (p._isGenericDiscourse) {
        p.solutionSummary =
          p.replies > 0
            ? `Discussion communautaire ${p.brand || 'FPV'} (${p.replies} réponses) — ouvrez le sujet ou le fil d'origine pour voir les échanges.`
            : `Sujet technique ${p.brand || 'FPV'} indexé depuis le forum officiel.`;
      } else if (!p._cleanSummaryEn) {
        p.solutionSummary = p.title;
      }
    });

    summaryIndices.forEach((batchIdx, sIdx) => {
      const p = batch[batchIdx];
      p.solutionSummary = translatedSummaries[sIdx] || p._cleanSummaryEn || p.title;
    });

    doneCount += batch.length;
    if (doneCount % 240 === 0 || doneCount === cleaned.length) {
      console.log(`Translated ${doneCount}/${cleaned.length} posts...`);
    }
  }

  for (let i = 0; i < tasks.length; i += CONCURRENCY) {
    await Promise.all(tasks.slice(i, i + CONCURRENCY).map(processBatch));
  }

  // Strip temporary fields
  const finalPosts = cleaned.map(({ _cleanSummaryEn, _isGenericDiscourse, ...rest }) => rest);

  fs.writeFileSync(DATA_FILE, JSON.stringify(finalPosts));
  console.log(`Saved ${finalPosts.length} cleaned & translated posts to ${DATA_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
