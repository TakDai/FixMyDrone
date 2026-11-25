import { FORUM_POSTS } from './forumPosts';
import { DiagnosticSymptomOption } from './diagnosticKnowledgeBase';

export interface DynamicResolution {
  id: string;
  componentId: string;
  brand?: string;
  model?: string;
  issue: string;
  fix: string;
  keywords: string[];
  author: string;
  createdAt: string;
  source: 'community-fix' | 'forum';
}

const STORAGE_KEY = 'fixmydrone_dynamic_resolutions_v1';

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 2);
}

export function loadStoredCommunityFixes(): DynamicResolution[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveDynamicResolution(
  entry: Omit<DynamicResolution, 'id' | 'createdAt' | 'source' | 'keywords'> & { keywords?: string[] }
): DynamicResolution {
  const autoKeywords = Array.from(
    new Set([
      ...tokenize(entry.issue),
      ...tokenize(entry.fix),
      ...(entry.brand ? tokenize(entry.brand) : []),
      ...(entry.model ? tokenize(entry.model) : []),
      ...(entry.keywords || []),
    ])
  );

  const created: DynamicResolution = {
    ...entry,
    id: `fix-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    keywords: autoKeywords,
    createdAt: new Date().toISOString(),
    source: 'community-fix',
  };

  if (typeof window !== 'undefined') {
    const existing = loadStoredCommunityFixes();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([created, ...existing]));
  }
  return created;
}

export function getDynamicResolutionsForComponent(componentId: string): DynamicResolution[] {
  const normalizedId = componentId === 'motor' ? 'motors' : componentId;
  const stored = loadStoredCommunityFixes().filter(
    (r) => r.componentId === normalizedId || r.componentId === componentId
  );

  const forumMatches: DynamicResolution[] = FORUM_POSTS.filter((p) => {
    const pCat = p.category === 'motor' ? 'motors' : p.category;
    return pCat === normalizedId && Boolean(p.solutionSummary);
  }).map((p) => {
    const summary = p.solutionSummary || '';
    return {
      id: `forum-${p.id}`,
      componentId: normalizedId,
      brand: p.brand,
      model: p.model,
      issue: p.title,
      fix: summary,
      keywords: Array.from(
        new Set([...tokenize(p.title), ...tokenize(summary), ...p.tags.flatMap(tokenize)])
      ),
      author: p.author.callsign || p.author.name,
      createdAt: p.createdAt,
      source: 'forum',
    };
  });

  return [...stored, ...forumMatches];
}

export interface DiagnosticQueryContext {
  promptText: string;
  circumstanceId: string;
  behaviorFamily: string; // 'all' | 'mecanique' | 'electrique' | 'vol' | 'signal' | 'logiciel' | 'alimentation'
  selectedObservations: string[];
  guidedTokens?: string[];
  brand?: string;
  model?: string;
}

export interface RankedSymptom {
  symptom: DiagnosticSymptomOption;
  score: number;
  matchReasons: string[];
}

export function rankSymptomsDynamically(
  symptoms: DiagnosticSymptomOption[],
  ctx: DiagnosticQueryContext
): RankedSymptom[] {
  const promptTokens = tokenize(ctx.promptText);
  const guidedTokens = (ctx.guidedTokens || []).flatMap(tokenize);
  const allQueryTokens = Array.from(new Set([...promptTokens, ...guidedTokens]));

  return symptoms
    .map((symptom) => {
      let score = 0;
      const matchReasons: string[] = [];

      // 1. Correspondance par famille / catégorie de comportement
      if (ctx.behaviorFamily && ctx.behaviorFamily !== 'all') {
        if (symptom.category === ctx.behaviorFamily) {
          score += 35;
          matchReasons.push(`Type : ${symptom.category}`);
        } else {
          score -= 10;
        }
      }

      // 2. Correspondance par circonstance (quand est survenu le problème)
      if (ctx.circumstanceId) {
        const hay = `${symptom.title} ${symptom.description} ${symptom.likelyCause}`.toLowerCase();
        if (ctx.circumstanceId === 'after-crash' && /crash|choc|impact|voil|tordu|aimant|roulement/.test(hay)) {
          score += 20;
          matchReasons.push('Compatible après crash');
        } else if (ctx.circumstanceId === 'new-build' && /soudure|vis|montage|neuf|phase|sens|calibr/.test(hay)) {
          score += 20;
          matchReasons.push('Compatible premier montage');
        } else if (ctx.circumstanceId === 'in-flight' && /vol|desync|chaud|coupure|vibr|throttle/.test(hay)) {
          score += 20;
          matchReasons.push('Compatible en vol');
        } else if (ctx.circumstanceId === 'power-on' && /bip|aliment|lipo|court-circuit|demarr|boot/.test(hay)) {
          score += 20;
          matchReasons.push('Compatible au branchement');
        } else if (ctx.circumstanceId === 'gradual' && /usure|roulement|jeu|progress|poussi|vibr/.test(hay)) {
          score += 20;
          matchReasons.push('Compatible usure progressive');
        }
      }

      // 3. Correspondance par prompt libre & réponses enchaînées
      if (allQueryTokens.length > 0) {
        const symptomCorpus = tokenize(
          `${symptom.title} ${symptom.description} ${symptom.likelyCause} ${symptom.aiDiagnostic.rootCause} ${symptom.matchingForumQuery.join(' ')}`
        );
        const hits = allQueryTokens.filter((t) =>
          symptomCorpus.some((c) => c.includes(t) || t.includes(c))
        );
        if (hits.length > 0) {
          score += Math.min(70, hits.length * 16);
          matchReasons.push(`Indices : ${Array.from(new Set(hits)).slice(0, 3).join(', ')}`);
        }
      }

      // 4. Bonus léger pour les observations cochées
      if (ctx.selectedObservations.length > 0) {
        score += Math.min(15, ctx.selectedObservations.length * 5);
      }

      // Bonus de fréquence de base
      score += Math.round(symptom.rarityIndex / 2);

      return { symptom, score, matchReasons };
    })
    .sort((a, b) => b.score - a.score);
}

export interface RankedDynamicResolution {
  resolution: DynamicResolution;
  score: number;
}

export function rankDynamicResolutions(
  resolutions: DynamicResolution[],
  ctx: DiagnosticQueryContext
): RankedDynamicResolution[] {
  const promptTokens = tokenize(ctx.promptText);
  const brandTokens = ctx.brand ? tokenize(ctx.brand) : [];
  const modelTokens = ctx.model ? tokenize(ctx.model) : [];

  return resolutions
    .map((res) => {
      let score = res.source === 'community-fix' ? 25 : 10;
      const corpus = tokenize(`${res.issue} ${res.fix} ${res.brand || ''} ${res.model || ''} ${res.keywords.join(' ')}`);

      if (brandTokens.length > 0 && brandTokens.some((b) => corpus.includes(b))) {
        score += 25;
      }
      if (modelTokens.length > 0 && modelTokens.some((m) => corpus.includes(m))) {
        score += 25;
      }
      if (promptTokens.length > 0) {
        const hits = promptTokens.filter((t) => corpus.some((c) => c.includes(t) || t.includes(c)));
        score += hits.length * 15;
      }
      return { resolution: res, score };
    })
    .sort((a, b) => b.score - a.score);
}
