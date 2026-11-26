import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const DATA_FILE = path.resolve(process.cwd(), 'public/data/scanned-forum-posts.json');

function stripHtmlAndMarkdown(str, maxLen = 650) {
  if (!str) return '';
  let s = str
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<blockquote[\s\S]*?<\/blockquote>/gi, ' ')
    .replace(/<pre[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s*[-*]\s*\[[ xX]\]\s*.*$/gm, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`~]+/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

  if (s.length > maxLen) {
    s = `${s.slice(0, maxLen).trim()}…`;
  }
  return s;
}

async function translateBatch(texts) {
  if (texts.length === 0) return [];
  const DELIM = '\n[[[SEP]]]\n';
  const joined = texts.join(DELIM);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=fr&dt=t&q=${encodeURIComponent(joined)}`;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) {
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
        continue;
      }
      const data = await res.json();
      const translated = (data?.[0] || []).map((c) => c?.[0] || '').join('');
      const parts = translated.split(/\s*\[\[\[SEP\]\]\]\s*/);
      if (parts.length === texts.length) {
        return parts.map((p) => p.trim());
      }
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
    }
  }

  const results = [];
  for (const t of texts) {
    try {
      const u = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=fr&dt=t&q=${encodeURIComponent(t)}`;
      const res = await fetch(u);
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

async function fetchDiscourseThread(post) {
  if (!post.sourceUrl) return null;
  try {
    const res = await fetch(`${post.sourceUrl}.json`, {
      headers: { 'User-Agent': 'FixMyDroneBot/1.0' },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const stream = json?.post_stream?.posts || [];
    if (stream.length === 0) return null;

    const first = stream[0];
    const openingText = stripHtmlAndMarkdown(first.cooked || '', 750);
    const repliesRaw = stream
      .slice(1, 16)
      .filter((p) => p.post_type === 1 && !p.hidden)
      .map((p, idx) => {
        const txt = stripHtmlAndMarkdown(p.cooked || '', 550);
        if (!txt || txt.length < 8) return null;
        return {
          id: `disc-c-${p.id || idx}`,
          author: p.username || p.name || 'Pilote',
          badge: p.admin || p.moderator ? 'Modérateur Forum' : `Membre ${post.brand}`,
          textOriginal: txt,
          text: txt,
          createdAt: (p.created_at || '').slice(0, 10) || 'Forum',
          likes: p.score ? Math.max(1, Math.round(p.score)) : (p.reads ? Math.min(12, Math.floor(p.reads / 10)) : 1),
          ...(p.reply_to_user?.username ? { replyTo: p.reply_to_user.username } : {}),
          ...(p.accepted_answer ? { isAcceptedSolution: true } : {}),
        };
      })
      .filter(Boolean);

    return { openingText, comments: repliesRaw };
  } catch {
    return null;
  }
}

function fetchGitHubCommentsBatch(repoFull, issues) {
  const [owner, name] = repoFull.split('/');
  const fields = issues
    .map(
      (it, idx) =>
        `i${idx}: issue(number: ${it.number}) { comments(first: 15) { nodes { id author { login } body createdAt } } }`
    )
    .join('\n');
  const query = `query { repository(owner: "${owner}", name: "${name}") { ${fields} } }`;
  try {
    const out = execFileSync('gh', ['api', 'graphql', '-f', `query=${query}`], {
      encoding: 'utf8',
      maxBuffer: 15 * 1024 * 1024,
    });
    const parsed = JSON.parse(out);
    return parsed?.data?.repository || {};
  } catch {
    return {};
  }
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  console.log(`Loaded ${posts.length} posts to enrich with real discussion threads...`);

  // 1. Enrich Discourse posts (opening post + real replies)
  const discPosts = posts.filter((p) => p.id.startsWith('disc-'));
  console.log(`Fetching ${discPosts.length} Discourse threads...`);
  const CONC = 14;
  let discDone = 0;

  for (let i = 0; i < discPosts.length; i += CONC) {
    const chunk = discPosts.slice(i, i + CONC);
    const results = await Promise.all(chunk.map(fetchDiscourseThread));
    results.forEach((res, idx) => {
      if (!res) return;
      const p = chunk[idx];
      if (res.openingText && res.openingText.length > 15) {
        p.solutionSummaryOriginal = res.openingText;
        p._needsSummaryTranslate = true;
      }
      if (res.comments.length > 0) {
        p.comments = res.comments;
      }
    });
    discDone += chunk.length;
    if (discDone % 280 === 0 || discDone === discPosts.length) {
      console.log(`Discourse fetched: ${discDone}/${discPosts.length}`);
    }
  }

  // 2. Enrich GitHub posts with replies > 0 via GraphQL
  const ghByRepo = new Map();
  for (const p of posts) {
    if (!p.id.startsWith('gh-') || (p.replies || 0) === 0 || !p.sourceUrl) continue;
    const m = p.sourceUrl.match(/github\.com\/([^/]+\/[^/]+)\/issues\/(\d+)/);
    if (!m) continue;
    const repo = m[1];
    const number = Number(m[2]);
    if (!ghByRepo.has(repo)) ghByRepo.set(repo, []);
    ghByRepo.get(repo).push({ post: p, number });
  }

  console.log(`Fetching GitHub comment threads across ${ghByRepo.size} repos...`);
  for (const [repo, items] of ghByRepo.entries()) {
    for (let i = 0; i < items.length; i += 25) {
      const batch = items.slice(i, i + 25);
      const data = fetchGitHubCommentsBatch(repo, batch);
      batch.forEach((entry, idx) => {
        const nodes = data[`i${idx}`]?.comments?.nodes || [];
        const comments = nodes
          .map((n, cIdx) => {
            const txt = stripHtmlAndMarkdown(n.body || '', 550);
            if (!txt || txt.length < 8) return null;
            return {
              id: `gh-c-${entry.number}-${cIdx}`,
              author: n.author?.login || 'Contributeur',
              badge: `Membre ${entry.post.brand}`,
              textOriginal: txt,
              text: txt,
              createdAt: (n.createdAt || '').slice(0, 10) || 'GitHub',
              likes: cIdx === nodes.length - 1 ? 5 : 2,
              ...(cIdx === nodes.length - 1 && nodes.length >= 2 ? { isAcceptedSolution: true } : {}),
            };
          })
          .filter(Boolean);
        if (comments.length > 0) {
          entry.post.comments = comments;
        }
      });
    }
  }

  // 3. Batch-translate all new Discourse opening summaries and all comments
  const toTranslate = [];
  for (const p of posts) {
    if (p._needsSummaryTranslate && p.solutionSummaryOriginal) {
      toTranslate.push({ type: 'summary', post: p, text: p.solutionSummaryOriginal.slice(0, 500) });
    }
    if (Array.isArray(p.comments)) {
      for (const c of p.comments) {
        if (c.textOriginal && c.text === c.textOriginal) {
          toTranslate.push({ type: 'comment', comment: c, text: c.textOriginal.slice(0, 450) });
        }
      }
    }
  }

  console.log(`Translating ${toTranslate.length} opening posts & replies to French...`);
  const T_BATCH = 12;
  const T_CONC = 10;
  const tChunks = [];
  for (let i = 0; i < toTranslate.length; i += T_BATCH) {
    tChunks.push(toTranslate.slice(i, i + T_BATCH));
  }

  let tDone = 0;
  for (let i = 0; i < tChunks.length; i += T_CONC) {
    const group = tChunks.slice(i, i + T_CONC);
    await Promise.all(
      group.map(async (chunk) => {
        const translated = await translateBatch(chunk.map((item) => item.text));
        chunk.forEach((item, idx) => {
          const fr = translated[idx] || item.text;
          if (item.type === 'summary') {
            item.post.solutionSummary = fr;
            delete item.post._needsSummaryTranslate;
          } else if (item.type === 'comment') {
            item.comment.text = fr;
          }
        });
      })
    );
    tDone += group.reduce((acc, c) => acc + c.length, 0);
    if (tDone % 600 < T_BATCH * T_CONC || tDone === toTranslate.length) {
      console.log(`Translated ${tDone}/${toTranslate.length} items...`);
    }
  }

  // Clean temp flags & keep posts that have real content
  const finalPosts = posts
    .map(({ _needsSummaryTranslate, ...rest }) => rest)
    .filter((p) => p.solutionSummary && p.solutionSummary.length >= 15);

  fs.writeFileSync(DATA_FILE, JSON.stringify(finalPosts));
  const withComments = finalPosts.filter((p) => p.comments && p.comments.length > 0).length;
  console.log(`Saved ${finalPosts.length} enriched posts (${withComments} with real comment threads) to ${DATA_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
