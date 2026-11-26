import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const OUT_FILE = path.resolve(process.cwd(), 'public/data/scanned-forum-posts.json');

const GITHUB_REPOS = [
  { repo: 'betaflight/betaflight', category: 'fc', categoryName: 'Contrôleur de Vol (FC)', brand: 'Betaflight', pages: 12 },
  { repo: 'betaflight/betaflight-configurator', category: 'configurator', categoryName: 'Configurateur (BF/EdgeTX)', brand: 'Betaflight', pages: 8 },
  { repo: 'ExpressLRS/ExpressLRS', category: 'rx', categoryName: 'Récepteur Radio (RX)', brand: 'ExpressLRS', pages: 10 },
  { repo: 'EdgeTX/edgetx', category: 'radio', categoryName: 'Radiocommande & Émetteur TX', brand: 'EdgeTX', pages: 8 },
  { repo: 'bird-sanctuary/bluejay', category: 'esc', categoryName: 'ESC & Stack', brand: 'Bluejay', pages: 5 },
  { repo: 'am32-firmware/AM32', category: 'esc', categoryName: 'ESC & Stack', brand: 'AM32', pages: 5 },
  { repo: 'iNavFlight/inav', category: 'gps', categoryName: 'GPS & Compas', brand: 'iNav', pages: 8 },
];

function inferCategory(text, fallbackCat, fallbackName) {
  const t = text.toLowerCase();
  if (/\b(motor|motors|desync|stutter|bell|bearing|kv|stator|prop|props)\b/.test(t)) {
    return { category: 'motors', categoryName: 'Moteurs Brushless' };
  }
  if (/\b(esc|blheli|bluejay|am32|dshot|mosfet|beeps|demag)\b/.test(t)) {
    return { category: 'esc', categoryName: 'ESC & Stack' };
  }
  if (/\b(elrs|expresslrs|crsf|rx|receiver|bind|failsafe|telemetry)\b/.test(t)) {
    return { category: 'rx', categoryName: 'Récepteur Radio (RX)' };
  }
  if (/\b(vtx|osd|dji|o3|o4|walksnail|hdzero|msp|displayport|video)\b/.test(t)) {
    return { category: 'vtx', categoryName: 'Émetteur Vidéo (VTX)' };
  }
  if (/\b(gps|compass|mag|magnetometer|rescue|rth|baro|satellites)\b/.test(t)) {
    return { category: 'gps', categoryName: 'GPS & Compas' };
  }
  if (/\b(edgetx|radiomaster|gimbal|tx16s|pocket|boxer|switch)\b/.test(t)) {
    return { category: 'radio', categoryName: 'Radiocommande & Émetteur TX' };
  }
  if (/\b(lipo|battery|volt|voltage|bec|5v|xt60|smoke)\b/.test(t)) {
    return { category: 'lipo', categoryName: 'LiPo & Alimentation' };
  }
  return { category: fallbackCat, categoryName: fallbackName };
}

function cleanText(str, maxLen = 420) {
  if (!str) return '';
  const cleaned = str
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/```[\s\S]*?```/g, '[code]')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return cleaned.length > maxLen ? `${cleaned.slice(0, maxLen).trim()}…` : cleaned;
}

function ghApiJson(endpoint) {
  const out = execFileSync('gh', ['api', endpoint], {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });
  return JSON.parse(out);
}

async function fetchDiscourseTopics(baseUrl, label, pages = 6) {
  const collected = [];
  for (let page = 0; page < pages; page++) {
    try {
      const res = await fetch(`${baseUrl}/latest.json?page=${page}`, {
        headers: { 'User-Agent': 'FixMyDroneBot/1.0' },
      });
      if (!res.ok) break;
      const json = await res.json();
      const topics = json?.topic_list?.topics || [];
      if (topics.length === 0) break;

      for (const t of topics) {
        if (!t.title || t.pinned) continue;
        const catInfo = inferCategory(t.title, 'fc', 'Contrôleur de Vol (FC)');
        collected.push({
          id: `disc-${label}-${t.id}`,
          title: `[${label}] ${t.title}`,
          category: catInfo.category,
          categoryName: catInfo.categoryName,
          productName: label,
          brand: label,
          model: t.tags?.[0] || 'Drone / ArduPilot / PX4',
          author: {
            name: t.last_poster_username || 'Pilote',
            callsign: t.last_poster_username || 'Pilote_FPV',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
            badge: 'Pro Builder',
          },
          createdAt: t.created_at ? t.created_at.slice(0, 10) : 'Forum',
          views: t.views || 50,
          replies: Math.max(0, (t.posts_count || 1) - 1),
          isResolved: Boolean(t.has_accepted_answer || (t.posts_count || 0) >= 3),
          resolvedWithAI: true,
          rarityIndex: t.posts_count >= 10 ? 8 : 6,
          rarityLabel: t.has_accepted_answer ? 'Résolu communauté' : 'Discussion technique',
          solutionSummary:
            t.excerpt
              ? cleanText(t.excerpt, 360)
              : `Discussion technique (${t.posts_count || 1} messages) indexée depuis ${label}.`,
          tags: [label, ...(t.tags || []).slice(0, 4)],
          sourceUrl: `${baseUrl}/t/${t.slug}/${t.id}`,
          comments: [],
        });
      }
    } catch {
      break;
    }
  }
  return collected;
}

async function main() {
  const allPosts = [];

  // 1. GitHub FPV Repositories (closed issues & resolutions)
  for (const cfg of GITHUB_REPOS) {
    console.log(`Scanning GitHub ${cfg.repo}...`);
    for (let page = 1; page <= cfg.pages; page++) {
      try {
        const items = ghApiJson(
          `repos/${cfg.repo}/issues?state=closed&per_page=100&page=${page}`
        );
        if (!Array.isArray(items) || items.length === 0) break;

        for (const it of items) {
          if (it.pull_request) continue; // only real issues
          const catInfo = inferCategory(
            `${it.title} ${it.body || ''}`,
            cfg.category,
            cfg.categoryName
          );
          const bodySnippet = cleanText(it.body, 380);
          const labels = (it.labels || []).map((l) => l.name).slice(0, 4);

          allPosts.push({
            id: `gh-${cfg.brand.toLowerCase()}-${it.number}`,
            title: `[${cfg.brand}] ${it.title}`,
            category: catInfo.category,
            categoryName: catInfo.categoryName,
            productName: cfg.brand,
            brand: cfg.brand,
            model: labels[0] || cfg.repo.split('/')[1],
            author: {
              name: it.user?.login || 'Pilot',
              callsign: it.user?.login || 'Pilot_FPV',
              avatar: it.user?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
              badge: 'Expert Betaflight',
            },
            createdAt: it.closed_at ? it.closed_at.slice(0, 10) : (it.created_at || '').slice(0, 10),
            views: 120 + (it.comments || 0) * 35,
            replies: it.comments || 0,
            isResolved: true,
            resolvedWithAI: true,
            rarityIndex: it.comments >= 8 ? 8 : it.comments >= 3 ? 6 : 4,
            rarityLabel: `Issue résolue (${it.comments || 0} rép.)`,
            solutionSummary: bodySnippet || `Ticket résolu sur ${cfg.repo} (#${it.number}).`,
            tags: [cfg.brand, ...labels],
            sourceUrl: it.html_url,
            comments: [],
          });
        }
      } catch (err) {
        console.warn(`Error on ${cfg.repo} page ${page}:`, err.message);
        break;
      }
    }
  }

  // 2. Discourse Drone Forums (ArduPilot & PX4)
  console.log('Scanning Discourse ArduPilot...');
  const arduPosts = await fetchDiscourseTopics('https://discuss.ardupilot.org', 'ArduPilot', 25);
  allPosts.push(...arduPosts);

  console.log('Scanning Discourse PX4...');
  const px4Posts = await fetchDiscourseTopics('https://discuss.px4.io', 'PX4', 15);
  allPosts.push(...px4Posts);

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(allPosts));
  console.log(`Saved ${allPosts.length} scanned FPV/drone posts to ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
