import { DiagnosticSymptomOption } from './diagnosticKnowledgeBase';
import { DynamicResolution } from './dynamicResolutions';

export interface QuestionOption {
  id: string;
  label: string;
  sub?: string;
  /** Mots-clés renforçant les pistes compatibles */
  boostTokens: string[];
  /** Mots-clés qui excluent les pistes incompatibles si présents */
  excludeTokens?: string[];
  /** Catégories compatibles (si défini, pénalise fortement les autres) */
  preferCategories?: DiagnosticSymptomOption['category'][];
  /** Indique une piste saine / pas de symptôme sur ce critère */
  isHealthy?: boolean;
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  hint: string;
  isGenerated?: boolean;
  options: QuestionOption[];
}

export const MOTOR_STATIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'when',
    question: '1. Quand est survenu le problème ?',
    hint: 'Le moment d’apparition élimine déjà plusieurs causes.',
    options: [
      {
        id: 'after-crash',
        label: '💥 Immédiatement après un crash / impact',
        sub: 'Choc sur arbre, béton, herbe ou hélice bloquée',
        boostTokens: ['crash', 'impact', 'voil', 'tordu', 'aimant', 'roulement', 'cloche'],
      },
      {
        id: 'new-build',
        label: '🛠️ Lors du premier montage / soudure',
        sub: 'Drone neuf ou moteur récemment remplacé',
        boostTokens: ['soudure', 'vis', 'longue', 'montage', 'phase', 'bips', 'esc'],
      },
      {
        id: 'in-flight',
        label: '💨 Apparu soudainement en vol',
        sub: 'Fonctionnait bien puis anomalie en l’air',
        boostTokens: ['vol', 'desync', 'coupure', 'chaud', 'brulant', 'd-term', 'roll'],
      },
      {
        id: 'power-on',
        label: '🔌 Au branchement de la batterie LiPo',
        sub: 'Anomalie dès l’alimentation au banc',
        boostTokens: ['bips', 'esc', 'broute', 'phase', 'soudure', 'mosfet'],
      },
      {
        id: 'gradual',
        label: '⏳ Dégradation progressive vol après vol',
        sub: 'Bruit ou vibrations qui augmentent avec le temps',
        boostTokens: ['roulement', 'jeu', 'crecelle', 'jello', 'usure'],
      },
    ],
  },
  {
    id: 'family',
    question: '2. Quel type de symptôme domine ?',
    hint: 'Choisissez la famille la plus proche de ce que vous constatez.',
    options: [
      {
        id: 'mecanique',
        label: '⚙️ Mécanique (bruit, jeu, frottement, cloche voilée)',
        boostTokens: ['roulement', 'cloche', 'jeu', 'aimant', 'voilee', 'tordu', 'crecelle'],
        preferCategories: ['mecanique'],
      },
      {
        id: 'electrique',
        label: '⚡ Électrique (broute, pas de bips, chauffe anormale)',
        boostTokens: ['broute', 'soudure', 'bips', 'chaud', 'brulant', 'vis', 'bobinage'],
        preferCategories: ['electrique'],
      },
      {
        id: 'vol',
        label: '🚁 Comportement en vol (desync, coupure gaz, death roll)',
        boostTokens: ['desync', 'roll', 'coupure', 'bluejay', 'demag', 'vibrations'],
        preferCategories: ['vol'],
      },
      {
        id: 'unsure',
        label: '❓ Je ne suis pas sûr / Plusieurs symptômes',
        boostTokens: [],
      },
    ],
  },
  {
    id: 'hand-spin',
    question: '3. Sans batterie, en tournant la cloche à la main, que sentez-vous ?',
    hint: 'Hélices démontées : faites tourner doucement le moteur du bout des doigts.',
    options: [
      {
        id: 'smooth',
        label: '✅ Tourne librement, fluide et silencieux',
        boostTokens: [],
        excludeTokens: ['voilee', 'axe tordu', 'aimant frotte'],
        isHealthy: true,
      },
      {
        id: 'scratch',
        label: '🪨 Frottement, point dur ou bruit de sable / crécelle',
        boostTokens: ['roulement', 'crecelle', 'aimant', 'frotte', 'sable'],
      },
      {
        id: 'play',
        label: '↕️ Jeu vertical ou latéral sur la cloche',
        boostTokens: ['jeu', 'roulement', '684zz', 'circlip'],
      },
      {
        id: 'blocked',
        label: '🛑 Cloche bloquée ou axe visiblement tordu',
        boostTokens: ['voilee', 'tordu', 'aimant', 'vis', 'bloque'],
      },
    ],
  },
  {
    id: 'visual-bell',
    question: '4. À l’inspection visuelle de la cloche et des aimants :',
    hint: 'Regardez sous la cloche avec une lampe si besoin.',
    options: [
      {
        id: 'ok',
        label: '✅ Aimants alignés, cloche intacte',
        boostTokens: [],
        isHealthy: true,
      },
      {
        id: 'magnet',
        label: '🧲 Un aimant est décollé, décalé ou fendu',
        boostTokens: ['aimant', 'decolle', 'fendu', 'araldite'],
      },
      {
        id: 'bent-bell',
        label: '🔨 La cloche est enfoncée ou voilée',
        boostTokens: ['cloche', 'voilee', 'axe', 'tordu'],
      },
      {
        id: 'circlip',
        label: '⭕ Circlip / vis sous l’axe manquant ou desserré',
        boostTokens: ['jeu', 'circlip', 'cloche', 'roulement'],
      },
    ],
  },
  {
    id: 'visual-winding',
    question: '5. En observant le bobinage cuivre à travers le stator :',
    hint: 'Vérifiez la couleur du cuivre et le passage des fils.',
    options: [
      {
        id: 'copper-ok',
        label: '✨ Cuivre propre, brillant et uniforme',
        boostTokens: [],
        isHealthy: true,
      },
      {
        id: 'burnt',
        label: '🔥 Bobinage noirci, fondu ou odeur de brûlé',
        boostTokens: ['brulant', 'chaud', 'bobinage', 'vis', 'court-circuit'],
      },
      {
        id: 'wire-cut',
        label: '✂️ Un fil de phase est coupé, effiloché ou dessoudé',
        boostTokens: ['broute', 'phase', 'soudure', 'continuite', 'twitch'],
      },
      {
        id: 'screw-touch',
        label: '🔩 Trace de frottement de vis sous les enroulements',
        boostTokens: ['vis', 'longue', 'bobinage', 'chaud', 'brulant'],
      },
    ],
  },
  {
    id: 'temp',
    question: '6. Quelle est la température du moteur après un court essai (15–30 s) ?',
    hint: 'Comparez avec les 3 autres moteurs du drone.',
    options: [
      {
        id: 'normal',
        label: '🌡️ Tiède / identique aux autres moteurs',
        boostTokens: [],
        isHealthy: true,
      },
      {
        id: 'warm',
        label: '♨️ Plus chaud que les autres mais supportable',
        boostTokens: ['chaud', 'filtres', 'pid', 'roulement'],
      },
      {
        id: 'burning',
        label: '🔥 Brûlant (impossible de garder le doigt dessus)',
        boostTokens: ['brulant', 'chaud', 'd-term', 'vis', 'filtres'],
      },
      {
        id: 'cold',
        label: '❄️ Reste complètement froid (ne tourne pas)',
        boostTokens: ['pas de bips', 'esc', 'mosfet', 'broute'],
      },
    ],
  },
  {
    id: 'beeps',
    question: '7. Au branchement de la LiPo, quels bips ESC entendez-vous sur ce moteur ?',
    hint: 'Les 3 premiers bips = alim ESC, les 2 derniers = signal Betaflight/FC.',
    options: [
      {
        id: 'all-beeps',
        label: '🔊 Tous les bips normaux (3 bips + 2 bips)',
        boostTokens: [],
        isHealthy: true,
      },
      {
        id: 'missing-2',
        label: '🔉 Il manque les 2 derniers bips (signal FC)',
        boostTokens: ['bips', 'esc', 'signal', 'fc'],
      },
      {
        id: 'no-beeps',
        label: '🔇 Aucun bip sur ce moteur',
        boostTokens: ['pas de bips', '3 bips manquants', 'esc mort', 'mosfet'],
      },
      {
        id: 'loop-beeps',
        label: '🔁 Bips en boucle ou saccades au démarrage',
        boostTokens: ['broute', 'stuttering', 'phase', 'soudure'],
      },
    ],
  },
  {
    id: 'betaflight-tab',
    question: '8. Dans Betaflight (onglet Moteurs, SANS hélices), que fait le curseur ?',
    hint: 'Testez doucement entre 1020 et 1150.',
    options: [
      {
        id: 'spins-ok',
        label: '✅ Tourne régulièrement sans à-coup',
        boostTokens: [],
        isHealthy: true,
      },
      {
        id: 'twitch',
        label: '⚡ Vibre, broute ou oscille sur place sans se lancer',
        boostTokens: ['broute', 'stuttering', 'soudure', 'phase', 'twitch'],
      },
      {
        id: 'dead',
        label: '🚫 Ne bouge pas du tout',
        boostTokens: ['pas de bips', 'esc', 'mosfet'],
      },
      {
        id: 'cuts-high',
        label: '📉 Tourne puis décroche / coupe en montant les gaz',
        boostTokens: ['desync', 'coupure', 'bluejay', 'demag'],
      },
    ],
  },
  {
    id: 'swap-test',
    question: '9. Si vous inversez ce moteur avec un autre bras sur l’ESC :',
    hint: 'Le test croisé permet de savoir si le défaut vient du moteur ou de l’ESC.',
    options: [
      {
        id: 'follows-motor',
        label: '➡️ Le problème suit le moteur sur le nouveau bras',
        boostTokens: ['bobinage', 'roulement', 'cloche', 'aimant', 'phase'],
      },
      {
        id: 'stays-arm',
        label: '🛑 Le problème reste sur le même bras (donc côté ESC/FC)',
        boostTokens: ['esc', 'mosfet', 'pas de bips', 'soudure'],
      },
      {
        id: 'not-tested',
        label: '⏭️ Pas encore testé / Pas de fer à souder sous la main',
        boostTokens: [],
      },
    ],
  },
  {
    id: 'flight-behavior',
    question: '10. Si le drone arrive à décoller, que se passe-t-il en vol ?',
    hint: 'Observez la stabilité et le retour vidéo.',
    options: [
      {
        id: 'death-roll',
        label: '🌀 Death roll / tonneau brutal dès un coup de gaz',
        boostTokens: ['desync', 'death roll', 'tonneau', 'coupure gaz', 'bluejay'],
      },
      {
        id: 'jello',
        label: '〰️ Jello vidéo, vibrations ou oscillation haute fréquence',
        boostTokens: ['jello', 'roulement', 'cloche', 'voilee', 'vibrations'],
      },
      {
        id: 'hot-flight',
        label: '🔥 Vole mais moteur brûlant / perte d’autonomie',
        boostTokens: ['chaud', 'brulant', 'd-term', 'filtres'],
      },
      {
        id: 'no-flight',
        label: '🛑 Impossible de décoller',
        boostTokens: ['broute', 'pas de bips', 'bloque'],
      },
    ],
  },
  {
    id: 'screws',
    question: '11. Concernant les vis de fixation sous le moteur :',
    hint: 'Une vis trop longue de 1 mm suffit à toucher le bobinage.',
    options: [
      {
        id: 'short-ok',
        label: '✅ Dégagement OK (au moins 1–2 mm sous le bobinage)',
        boostTokens: [],
        isHealthy: true,
      },
      {
        id: 'long-screws',
        label: '⚠️ Vis changées ou très proches des fils de cuivre',
        boostTokens: ['vis', 'longue', 'bobinage', 'brulant', 'chaud'],
      },
      {
        id: 'loose-screws',
        label: '🔧 Vis desserrées ou manquantes',
        boostTokens: ['vibrations', 'jello', 'bruit'],
      },
    ],
  },
  {
    id: 'recent-config',
    question: '12. Avez-vous récemment modifié Bluejay/BLHeli ou les PID Betaflight ?',
    hint: 'Dernière vérification logicielle.',
    options: [
      {
        id: 'yes-esc',
        label: '🎛️ Oui, flash ou réglage Bluejay / BLHeli (PWM, Startup, Demag)',
        boostTokens: ['bluejay', 'demag', 'desync', 'broute'],
      },
      {
        id: 'yes-pid',
        label: '📊 Oui, tuning PID / D-Term / Filtres Betaflight',
        boostTokens: ['d-term', 'filtres', 'chaud', 'brulant', 'pid'],
      },
      {
        id: 'no-change',
        label: '✅ Non, configuration inchangée',
        boostTokens: [],
        isHealthy: true,
      },
    ],
  },
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 2);
}

export interface ScoredCandidate {
  symptom: DiagnosticSymptomOption;
  score: number;
  matchReasons: string[];
  eliminated: boolean;
}

export interface QuestionAnswerRecord {
  questionId: string;
  questionLabel: string;
  optionId: string;
  optionLabel: string;
  boostTokens: string[];
  excludeTokens?: string[];
  preferCategories?: DiagnosticSymptomOption['category'][];
  isHealthy?: boolean;
}

/**
 * Filtre et classe les symptômes en temps réel au fil des réponses.
 * Si l'utilisateur accumule des réponses contradictoires ou toutes "saines" alors qu'il y a un problème,
 * ou exclut toutes les pistes connues, la liste des résultats actifs peut tomber à 0 !
 */
export function evaluateCandidatesLive(
  symptoms: DiagnosticSymptomOption[],
  answers: QuestionAnswerRecord[],
  promptText: string
): ScoredCandidate[] {
  const promptTokens = tokenize(promptText);
  const allBoosts = Array.from(
    new Set([...promptTokens, ...answers.flatMap((a) => a.boostTokens).flatMap(tokenize)])
  );
  const allExcludes = Array.from(
    new Set(answers.flatMap((a) => a.excludeTokens || []).flatMap(tokenize))
  );
  const preferredCats = answers.flatMap((a) => a.preferCategories || []);
  const healthyCount = answers.filter((a) => a.isHealthy).length;

  return symptoms.map((symptom) => {
    const corpus = tokenize(
      `${symptom.title} ${symptom.description} ${symptom.likelyCause} ${symptom.aiDiagnostic.rootCause} ${symptom.matchingForumQuery.join(' ')}`
    );

    let score = 10;
    let eliminated = false;
    const matchReasons: string[] = [];

    // Exclusion stricte si un critère contradictoire a été coché
    const excludedHit = allExcludes.find((ex) => corpus.some((c) => c.includes(ex)));
    if (excludedHit) {
      eliminated = true;
    }

    // Si l'utilisateur a choisi une catégorie précise (et pas "all"), éliminer les catégories incompatibles
    if (preferredCats.length > 0 && !preferredCats.includes(symptom.category)) {
      eliminated = true;
    }

    // Correspondances positives
    if (allBoosts.length > 0) {
      const hits = allBoosts.filter((t) => corpus.some((c) => c.includes(t) || t.includes(c)));
      if (hits.length > 0) {
        score += hits.length * 15;
        matchReasons.push(`Indices : ${Array.from(new Set(hits)).slice(0, 3).join(', ')}`);
      } else if (answers.length >= 3) {
        // Après plusieurs questions sans aucun indice correspondant, on considère la piste écartée
        score -= 15;
      }
    }

    // Si l'utilisateur répond "tout est normal/sain" sur >= 5 contrôles, aucune panne standard ne correspond
    if (healthyCount >= 5 && allBoosts.length === 0) {
      eliminated = true;
    }

    if (score <= 0) {
      eliminated = true;
    }

    return {
      symptom,
      score,
      matchReasons,
      eliminated,
    };
  }).sort((a, b) => b.score - a.score);
}

/**
 * Génère dynamiquement une question discriminante si toutes les questions statiques ont été posées
 * et qu'il reste encore >= 2 résultats candidats (ou de nouvelles résolutions futures).
 */
export function generateDynamicFollowUpQuestion(
  remainingCandidates: ScoredCandidate[],
  dynamicResolutions: DynamicResolution[],
  askedIds: string[],
  stepNumber: number
): DiagnosticQuestion | null {
  if (remainingCandidates.length < 2) return null;

  const topA = remainingCandidates[0].symptom;
  const topB = remainingCandidates[1].symptom;

  const tokensA = new Set(
    tokenize(`${topA.title} ${topA.likelyCause} ${topA.matchingForumQuery.join(' ')}`)
  );
  const tokensB = new Set(
    tokenize(`${topB.title} ${topB.likelyCause} ${topB.matchingForumQuery.join(' ')}`)
  );

  const uniqueA = Array.from(tokensA).filter((t) => !tokensB.has(t) && t.length >= 4).slice(0, 3);
  const uniqueB = Array.from(tokensB).filter((t) => !tokensA.has(t) && t.length >= 4).slice(0, 3);

  const qId = `dyn-q-${stepNumber}-${topA.id}-${topB.id}`;
  if (askedIds.includes(qId)) return null;

  const extraCommunityHint =
    dynamicResolutions.length > 0
      ? ` (Inclut ${dynamicResolutions.length} retours communauté)`
      : '';

  return {
    id: qId,
    isGenerated: true,
    question: `${stepNumber}. Pour départager les 2 pistes restantes${extraCommunityHint} :`,
    hint: 'Question générée automatiquement par simulation pour affiner les derniers résultats.',
    options: [
      {
        id: `${qId}-a`,
        label: `Cela correspond plutôt à : ${topA.title}`,
        sub: topA.description,
        boostTokens: uniqueA.length > 0 ? uniqueA : tokenize(topA.title),
        excludeTokens: uniqueB.slice(0, 1),
      },
      {
        id: `${qId}-b`,
        label: `Cela correspond plutôt à : ${topB.title}`,
        sub: topB.description,
        boostTokens: uniqueB.length > 0 ? uniqueB : tokenize(topB.title),
        excludeTokens: uniqueA.slice(0, 1),
      },
      {
        id: `${qId}-neither`,
        label: 'Aucune de ces deux pistes ne correspond à mon cas',
        sub: 'Arrêter et demander à l’IA ou poster sur le forum',
        boostTokens: [],
        excludeTokens: [...uniqueA.slice(0, 2), ...uniqueB.slice(0, 2)],
      },
    ],
  };
}

export interface SimulationSummary {
  totalScenarios: number;
  resolutionPostsCount: number;
  synthesizedQuestionsCount: number;
  averageDepth: number;
  simulatedAt: string;
}

const STOP_WORDS = new Set([
  'pour', 'avec', 'dans', 'sans', 'apres', 'avant', 'sous', 'entre', 'vers',
  'etre', 'avoir', 'faire', 'plus', 'moins', 'tres', 'bien', 'tout', 'tous',
  'cette', 'cela', 'sont', 'mais', 'donc', 'alors', 'quand', 'quel', 'quelle',
  'moteur', 'moteurs', 'drone', 'quad', 'fpv', 'veille', 'rcgroups', 'wearefpv',
]);

/**
 * Synthétise des questions candidates à partir des posts/résolutions dynamiques
 * et mesure le pouvoir discriminant (simulation d'arbre de décision).
 */
export function synthesizeQuestionsFromResolutions(
  dynamicResolutions: DynamicResolution[],
  alreadyAskedIds: string[]
): DiagnosticQuestion[] {
  if (dynamicResolutions.length === 0) return [];

  // Compter la fréquence des mots-clés dans les résolutions dynamiques (surtout les nouveaux posts)
  const docFreq = new Map<string, { count: number; sampleIssue: string }>();
  for (const res of dynamicResolutions) {
    const uniq = new Set(tokenize(`${res.issue} ${res.fix} ${res.keywords.join(' ')}`));
    for (const tok of uniq) {
      if (tok.length < 4 || STOP_WORDS.has(tok)) continue;
      const cur = docFreq.get(tok) || { count: 0, sampleIssue: res.issue };
      cur.count += 1;
      docFreq.set(tok, cur);
    }
  }

  // Garder les termes qui divisent bien les cas (présents dans 1 à N-1 résolutions)
  const candidates = Array.from(docFreq.entries())
    .filter(([, info]) => info.count >= 1 && info.count <= Math.max(1, dynamicResolutions.length - 1))
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  return candidates
    .map(([keyword, info], idx) => {
      const qId = `sim-post-q-${keyword}`;
      if (alreadyAskedIds.includes(qId)) return null;
      return {
        id: qId,
        isGenerated: true,
        question: `Question simulée #${idx + 1} : Observez-vous un indice lié à « ${keyword} » ?`,
        hint: `Générée par simulation à partir des retours communauté (ex : ${info.sampleIssue.slice(0, 60)}...)`,
        options: [
          {
            id: `${qId}-yes`,
            label: `Oui, « ${keyword} » correspond à mon symptôme`,
            boostTokens: [keyword],
          },
          {
            id: `${qId}-no`,
            label: `Non, pas de lien avec « ${keyword} »`,
            boostTokens: [],
            excludeTokens: [keyword],
          },
        ],
      } as DiagnosticQuestion;
    })
    .filter((q): q is DiagnosticQuestion => q !== null);
}

/**
 * Simule quelle question (statique ou générée depuis les posts) sépare le mieux
 * les candidats restants (score de gain d'information).
 */
export function simulateBestNextQuestion(
  remainingCandidates: ScoredCandidate[],
  dynamicResolutions: DynamicResolution[],
  askedIds: string[],
  stepNumber: number
): DiagnosticQuestion | null {
  const pool: DiagnosticQuestion[] = [
    ...MOTOR_STATIC_QUESTIONS.filter((q) => !askedIds.includes(q.id)),
    ...synthesizeQuestionsFromResolutions(dynamicResolutions, askedIds),
  ];

  // Toujours garder la question 'when' en tout premier pour une UX logique
  if (!askedIds.includes('when')) {
    const whenQ = MOTOR_STATIC_QUESTIONS.find((q) => q.id === 'when');
    if (whenQ) return whenQ;
  }

  let bestQ: DiagnosticQuestion | null = null;
  let bestScore = -1;

  for (const q of pool) {
    // Simuler chaque option sur remainingCandidates
    const branchSizes: number[] = [];
    for (const opt of q.options) {
      const optTokens = tokenize(opt.boostTokens.join(' '));
      let matches = 0;
      for (const cand of remainingCandidates) {
        const corpus = tokenize(
          `${cand.symptom.title} ${cand.symptom.description} ${cand.symptom.likelyCause} ${cand.symptom.matchingForumQuery.join(' ')}`
        );
        const catOk =
          !opt.preferCategories || opt.preferCategories.includes(cand.symptom.category);
        const tokOk =
          optTokens.length === 0 ||
          optTokens.some((t) => corpus.some((c) => c.includes(t) || t.includes(c)));
        if (catOk && tokOk) matches++;
      }
      branchSizes.push(matches);
    }

    // Score de séparation : plus les tailles de branches diffèrent (ni tout 100%, ni tout 0%), meilleur est le split
    const nonZero = branchSizes.filter((s) => s > 0 && s < remainingCandidates.length).length;
    const spread = Math.max(...branchSizes) - Math.min(...branchSizes);
    const splitScore = nonZero * 10 + spread + (q.isGenerated ? 2 : 0);

    if (splitScore > bestScore) {
      bestScore = splitScore;
      bestQ = q;
    }
  }

  if (bestQ) {
    return {
      ...bestQ,
      question: bestQ.question.replace(/^\d+\.\s*/, `${stepNumber}. `),
    };
  }

  return generateDynamicFollowUpQuestion(
    remainingCandidates,
    dynamicResolutions,
    askedIds,
    stepNumber
  );
}

/**
 * Exécute une simulation complète sur tous les symptômes + tous les posts/résolutions
 * (relancée automatiquement à chaque nouveau post).
 */
export function runFullTreeSimulation(
  symptoms: DiagnosticSymptomOption[],
  dynamicResolutions: DynamicResolution[]
): SimulationSummary {
  const synthesized = synthesizeQuestionsFromResolutions(dynamicResolutions, []);
  const totalScenarios = symptoms.length + dynamicResolutions.length;

  // Simuler un chemin moyen par symptôme
  let totalDepth = 0;
  for (const sym of symptoms) {
    let remaining: ScoredCandidate[] = symptoms.map((s) => ({
      symptom: s,
      score: 10,
      matchReasons: [],
      eliminated: false,
    }));
    const asked: string[] = [];
    let depth = 0;

    while (remaining.length > 1 && depth < 8) {
      const nextQ = simulateBestNextQuestion(remaining, dynamicResolutions, asked, depth + 1);
      if (!nextQ) break;
      asked.push(nextQ.id);
      depth++;

      // Choisir l'option simulée la plus proche du symptôme cible `sym`
      const symCorpus = tokenize(
        `${sym.title} ${sym.description} ${sym.likelyCause} ${sym.matchingForumQuery.join(' ')}`
      );
      let chosenOpt = nextQ.options[0];
      let bestHits = -1;
      for (const opt of nextQ.options) {
        const hits = tokenize(opt.boostTokens.join(' ')).filter((t) =>
          symCorpus.some((c) => c.includes(t) || t.includes(c))
        ).length;
        if (hits > bestHits) {
          bestHits = hits;
          chosenOpt = opt;
        }
      }

      const simEval = evaluateCandidatesLive(
        remaining.map((r) => r.symptom),
        [
          {
            questionId: nextQ.id,
            questionLabel: nextQ.question,
            optionId: chosenOpt.id,
            optionLabel: chosenOpt.label,
            boostTokens: chosenOpt.boostTokens,
            excludeTokens: chosenOpt.excludeTokens,
            preferCategories: chosenOpt.preferCategories,
            isHealthy: chosenOpt.isHealthy,
          },
        ],
        ''
      ).filter((c) => !c.eliminated);

      if (simEval.length === 0 || simEval.length === remaining.length) break;
      remaining = simEval;
    }

    totalDepth += Math.max(1, depth);
  }

  return {
    totalScenarios,
    resolutionPostsCount: dynamicResolutions.length,
    synthesizedQuestionsCount: synthesized.length,
    averageDepth: symptoms.length > 0 ? Number((totalDepth / symptoms.length).toFixed(1)) : 0,
    simulatedAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
}

