import type { DiagnosticSymptomOption } from './diagnosticKnowledgeBase';
import type { DynamicResolution } from './dynamicResolutions';

export interface QuestionOption {
  id: string;
  label: string;
  sub?: string;
  /** Mots-clés renforçant les pistes compatibles (surtout résolutions communauté) */
  boostTokens: string[];
  /** Mots-clés d'exclusion (utilisés uniquement si pas de matrice explicite) */
  excludeTokens?: string[];
  /** IDs de symptômes explicitement compatibles avec cette réponse */
  compatibleWith?: string[];
  /** IDs de symptômes explicitement éliminés par cette réponse */
  incompatibleWith?: string[];
  /** Indique une piste saine / pas de symptôme sur ce critère */
  isHealthy?: boolean;
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  hint: string;
  isGenerated?: boolean;
  /** Condition d'affichage contextuelle selon les réponses précédentes */
  showIf?: (answers: QuestionAnswerRecord[], promptText: string) => boolean;
  /** Si le prompt de l'utilisateur contient déjà cette info, on saute cette question */
  skipIfPromptMatches?: RegExp;
  options: QuestionOption[];
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
  compatibleWith?: string[];
  incompatibleWith?: string[];
  isHealthy?: boolean;
}

const ALL_MOTOR_IDS = [
  'mot-stuttering',
  'mot-desync',
  'mot-overheating',
  'mot-bearing-noise',
  'mot-bent-bell',
  'mot-magnet-shift',
];

function picked(answers: QuestionAnswerRecord[], qId: string, optId?: string): boolean {
  return answers.some((a) => a.questionId === qId && (!optId || a.optionId === optId));
}

export const MOTOR_STATIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'primary-symptom',
    question: '1. Quel est le symptôme principal que vous constatez ?',
    hint: 'Cette première réponse oriente immédiatement vers la bonne branche (électrique, mécanique ou vol).',
    skipIfPromptMatches: /\b(broute|saccade|stuttering|desync|tonneau|death roll|brulant|brûlant|chauffe|roulement|crecelle|crécelle|cloche voil|aimant)\b/i,
    options: [
      {
        id: 'stuttering',
        label: '⚡ Ne tourne pas, broute ou tremble au démarrage',
        sub: 'Saccades au ralenti, pas de bips ou refus de se lancer',
        boostTokens: ['broute', 'stuttering', 'soudure', 'phase', 'bips', 'twitch'],
        compatibleWith: ['mot-stuttering'],
        incompatibleWith: ['mot-bearing-noise', 'mot-bent-bell', 'mot-overheating'],
      },
      {
        id: 'noise-play',
        label: '⚙️ Bruit mécanique, frottement, jeu ou cloche abîmée',
        sub: 'Bruit de crécelle/sable, cloche voilée ou axe tordu',
        boostTokens: ['roulement', 'cloche', 'jeu', 'aimant', 'voilee', 'tordu', 'crecelle'],
        compatibleWith: ['mot-bearing-noise', 'mot-bent-bell', 'mot-magnet-shift'],
        incompatibleWith: ['mot-desync', 'mot-overheating'],
      },
      {
        id: 'flight-cut',
        label: '🚁 Coupure brutale, desync ou death roll en vol',
        sub: 'Le quad décroche lors d’un coup de gaz ou d’une figure',
        boostTokens: ['desync', 'death roll', 'tonneau', 'coupure', 'bluejay', 'demag'],
        compatibleWith: ['mot-desync', 'mot-magnet-shift'],
        incompatibleWith: ['mot-bearing-noise'],
      },
      {
        id: 'overheat',
        label: '🔥 Moteur anormalement chaud ou brûlant',
        sub: 'Cloche intouchable après 30s–1min de vol',
        boostTokens: ['chaud', 'brulant', 'd-term', 'filtres', 'vis', 'bobinage'],
        compatibleWith: ['mot-overheating', 'mot-bearing-noise'],
        incompatibleWith: ['mot-stuttering'],
      },
      {
        id: 'unsure',
        label: '❓ Plusieurs symptômes / Je ne suis pas sûr',
        sub: 'Poser les contrôles étape par étape',
        boostTokens: [],
      },
    ],
  },
  {
    id: 'when',
    question: '2. Quand est survenu le problème ?',
    hint: 'Le moment d’apparition élimine déjà plusieurs causes.',
    skipIfPromptMatches: /\b(crash|impact|montage|neuf|soudure|branchement|progressiv)\b/i,
    options: [
      {
        id: 'after-crash',
        label: '💥 Immédiatement après un crash / impact',
        sub: 'Choc sur arbre, béton, herbe ou hélice bloquée',
        boostTokens: ['crash', 'impact', 'voilee', 'tordu', 'aimant', 'roulement'],
        compatibleWith: ['mot-bent-bell', 'mot-bearing-noise', 'mot-magnet-shift', 'mot-stuttering'],
      },
      {
        id: 'new-build',
        label: '🛠️ Lors du premier montage / soudure',
        sub: 'Drone neuf ou moteur récemment remplacé',
        boostTokens: ['soudure', 'vis', 'longue', 'montage', 'phase', 'bips'],
        compatibleWith: ['mot-stuttering', 'mot-overheating', 'mot-desync'],
        incompatibleWith: ['mot-bearing-noise', 'mot-bent-bell'],
      },
      {
        id: 'in-flight',
        label: '💨 Apparu soudainement en vol',
        sub: 'Fonctionnait bien puis anomalie en l’air',
        boostTokens: ['vol', 'desync', 'coupure', 'chaud', 'brulant', 'd-term'],
        compatibleWith: ['mot-desync', 'mot-overheating', 'mot-magnet-shift'],
      },
      {
        id: 'power-on',
        label: '🔌 Au branchement de la batterie LiPo',
        sub: 'Anomalie dès l’alimentation au banc',
        boostTokens: ['bips', 'esc', 'broute', 'phase', 'soudure'],
        compatibleWith: ['mot-stuttering'],
        incompatibleWith: ['mot-overheating', 'mot-desync', 'mot-bearing-noise'],
      },
      {
        id: 'gradual',
        label: '⏳ Dégradation progressive vol après vol',
        sub: 'Bruit ou vibrations qui augmentent avec le temps',
        boostTokens: ['roulement', 'jeu', 'crecelle', 'jello'],
        compatibleWith: ['mot-bearing-noise', 'mot-overheating'],
        incompatibleWith: ['mot-bent-bell'],
      },
    ],
  },
  {
    id: 'hand-spin',
    question: '3. Batterie débranchée (hélices retirées), en tournant la cloche à la main :',
    hint: 'Faites tourner doucement la cloche du bout des doigts et sentez s’il y a une résistance.',
    showIf: (answers) =>
      !picked(answers, 'primary-symptom', 'stuttering') && !picked(answers, 'when', 'power-on'),
    options: [
      {
        id: 'smooth',
        label: '✅ Tourne librement, fluide et silencieux',
        boostTokens: [],
        incompatibleWith: ['mot-bearing-noise', 'mot-bent-bell'],
        isHealthy: true,
      },
      {
        id: 'scratch',
        label: '🪨 Frottement, point dur ou bruit de sable / crécelle',
        boostTokens: ['roulement', 'crecelle', '684zz', 'jello'],
        compatibleWith: ['mot-bearing-noise', 'mot-magnet-shift'],
        incompatibleWith: ['mot-desync', 'mot-overheating', 'mot-stuttering'],
      },
      {
        id: 'play',
        label: '↕️ Jeu vertical ou latéral sur la cloche',
        boostTokens: ['jeu', 'roulement', '684zz', 'circlip'],
        compatibleWith: ['mot-bearing-noise'],
        incompatibleWith: ['mot-desync', 'mot-overheating', 'mot-stuttering', 'mot-bent-bell'],
      },
      {
        id: 'blocked',
        label: '🛑 Cloche bloquée, voilée ou axe tordu',
        boostTokens: ['voilee', 'tordu', 'aimant', 'frotte'],
        compatibleWith: ['mot-bent-bell', 'mot-magnet-shift'],
        incompatibleWith: ['mot-desync', 'mot-overheating'],
      },
    ],
  },
  {
    id: 'visual-bell',
    question: '4. En inspectant la cloche et les aimants sous la lumière :',
    hint: 'Regardez le bord de la cloche et l’alignement des aimants néodyme.',
    showIf: (answers) =>
      picked(answers, 'primary-symptom', 'noise-play') ||
      picked(answers, 'when', 'after-crash') ||
      picked(answers, 'hand-spin', 'scratch') ||
      picked(answers, 'hand-spin', 'blocked') ||
      picked(answers, 'hand-spin', 'play'),
    options: [
      {
        id: 'ok',
        label: '✅ Aimants bien alignés, cloche parfaitement ronde',
        boostTokens: [],
        incompatibleWith: ['mot-bent-bell', 'mot-magnet-shift'],
        isHealthy: true,
      },
      {
        id: 'magnet',
        label: '🧲 Un aimant est décollé, décalé ou fendu',
        boostTokens: ['aimant', 'decolle', 'fendu', 'araldite'],
        compatibleWith: ['mot-magnet-shift'],
        incompatibleWith: ['mot-bearing-noise', 'mot-bent-bell', 'mot-overheating', 'mot-stuttering', 'mot-desync'],
      },
      {
        id: 'bent-bell',
        label: '🔨 La cloche est enfoncée, voilée ou frotte le stator',
        boostTokens: ['cloche', 'voilee', 'axe', 'tordu', 'frotte'],
        compatibleWith: ['mot-bent-bell'],
        incompatibleWith: ['mot-magnet-shift', 'mot-bearing-noise', 'mot-overheating', 'mot-stuttering', 'mot-desync'],
      },
      {
        id: 'circlip',
        label: '⭕ Circlip / vis sous l’axe desserré ou roulement marqué',
        boostTokens: ['jeu', 'roulement', '684zz', 'circlip'],
        compatibleWith: ['mot-bearing-noise'],
        incompatibleWith: ['mot-bent-bell', 'mot-desync', 'mot-stuttering'],
      },
    ],
  },
  {
    id: 'beeps',
    question: '5. Au branchement de la LiPo, quels bips ESC entendez-vous sur ce moteur ?',
    hint: 'Les 3 premiers bips = alimentation ESC, les 2 derniers = signal de la FC.',
    showIf: (answers) =>
      !picked(answers, 'hand-spin', 'scratch') &&
      !picked(answers, 'hand-spin', 'play') &&
      !picked(answers, 'hand-spin', 'blocked') &&
      !picked(answers, 'primary-symptom', 'noise-play'),
    options: [
      {
        id: 'all-beeps',
        label: '🔊 Tous les bips normaux (3 bips + 2 bips)',
        boostTokens: [],
        isHealthy: true,
      },
      {
        id: 'missing-2',
        label: '🔉 Il manque les 2 derniers bips (pas de signal FC)',
        boostTokens: ['bips', 'esc', 'signal', 'soudure'],
        compatibleWith: ['mot-stuttering'],
        incompatibleWith: ['mot-bearing-noise', 'mot-bent-bell', 'mot-overheating'],
      },
      {
        id: 'no-beeps',
        label: '🔇 Aucun bip sur ce moteur',
        boostTokens: ['soudure', 'phase', 'esc', 'bobinage'],
        compatibleWith: ['mot-stuttering'],
        incompatibleWith: ['mot-bearing-noise', 'mot-bent-bell', 'mot-overheating', 'mot-desync'],
      },
      {
        id: 'loop-beeps',
        label: '🔁 Bips en boucle ou saccades au démarrage',
        boostTokens: ['broute', 'stuttering', 'phase', 'soudure'],
        compatibleWith: ['mot-stuttering', 'mot-desync'],
        incompatibleWith: ['mot-bearing-noise', 'mot-bent-bell'],
      },
    ],
  },
  {
    id: 'visual-winding',
    question: '6. En observant le bobinage en cuivre et les fils du moteur :',
    hint: 'Vérifiez la couleur du cuivre et l’état des 3 fils de phase.',
    showIf: (answers) =>
      picked(answers, 'primary-symptom', 'stuttering') ||
      picked(answers, 'primary-symptom', 'overheat') ||
      picked(answers, 'when', 'new-build') ||
      picked(answers, 'beeps', 'no-beeps') ||
      picked(answers, 'beeps', 'loop-beeps'),
    options: [
      {
        id: 'copper-ok',
        label: '✨ Cuivre propre, brillant et fils intacts',
        boostTokens: [],
        isHealthy: true,
      },
      {
        id: 'burnt',
        label: '🔥 Bobinage noirci, fondu ou odeur de brûlé',
        boostTokens: ['brulant', 'chaud', 'bobinage'],
        compatibleWith: ['mot-overheating', 'mot-stuttering'],
        incompatibleWith: ['mot-bearing-noise', 'mot-bent-bell'],
      },
      {
        id: 'wire-cut',
        label: '✂️ Un fil de phase est coupé, effiloché ou dessoudé',
        boostTokens: ['broute', 'phase', 'soudure', 'stuttering'],
        compatibleWith: ['mot-stuttering'],
        incompatibleWith: ['mot-bearing-noise', 'mot-bent-bell', 'mot-overheating', 'mot-desync'],
      },
      {
        id: 'screw-touch',
        label: '🔩 Trace de frottement de vis sous les enroulements',
        boostTokens: ['vis', 'longue', 'bobinage', 'chaud', 'brulant'],
        compatibleWith: ['mot-overheating', 'mot-stuttering'],
        incompatibleWith: ['mot-desync', 'mot-bearing-noise'],
      },
    ],
  },
  {
    id: 'temp',
    question: '7. Quelle est la température du moteur après un court essai (15–30 s) ?',
    hint: 'Comparez avec les 3 autres moteurs du drone.',
    skipIfPromptMatches: /\b(chaud|brulant|brûlant|chauffe|temperature|température)\b/i,
    showIf: (answers) =>
      !picked(answers, 'hand-spin', 'blocked') &&
      !picked(answers, 'beeps', 'no-beeps') &&
      (picked(answers, 'primary-symptom', 'overheat') ||
        picked(answers, 'primary-symptom', 'flight-cut') ||
        picked(answers, 'primary-symptom', 'unsure') ||
        picked(answers, 'when', 'in-flight') ||
        picked(answers, 'when', 'gradual')),
    options: [
      {
        id: 'normal',
        label: '🌡️ Tiède / identique aux autres moteurs',
        boostTokens: [],
        incompatibleWith: ['mot-overheating'],
        isHealthy: true,
      },
      {
        id: 'warm',
        label: '♨️ Plus chaud que les autres mais supportable',
        boostTokens: ['chaud', 'filtres', 'pid', 'roulement'],
        compatibleWith: ['mot-overheating', 'mot-bearing-noise'],
      },
      {
        id: 'burning',
        label: '🔥 Brûlant (impossible de garder le doigt dessus)',
        boostTokens: ['brulant', 'chaud', 'd-term', 'vis', 'filtres'],
        compatibleWith: ['mot-overheating'],
        incompatibleWith: ['mot-stuttering', 'mot-desync'],
      },
      {
        id: 'cold',
        label: '❄️ Reste complètement froid (ne tourne pas)',
        boostTokens: ['broute', 'stuttering', 'soudure'],
        compatibleWith: ['mot-stuttering'],
        incompatibleWith: ['mot-overheating', 'mot-desync'],
      },
    ],
  },
  {
    id: 'screws',
    question: '8. Vérification des vis de fixation sous le moteur :',
    hint: 'Une vis trop longue de 1 mm suffit à toucher le bobinage et faire chauffer le moteur.',
    showIf: (answers) =>
      picked(answers, 'primary-symptom', 'overheat') ||
      picked(answers, 'when', 'new-build') ||
      picked(answers, 'temp', 'burning') ||
      picked(answers, 'temp', 'warm'),
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
        compatibleWith: ['mot-overheating', 'mot-stuttering'],
        incompatibleWith: ['mot-desync', 'mot-bearing-noise'],
      },
      {
        id: 'loose-screws',
        label: '🔧 Vis desserrées ou manquantes',
        boostTokens: ['vibrations', 'jello', 'roulement'],
        compatibleWith: ['mot-bearing-noise', 'mot-overheating'],
      },
    ],
  },
  {
    id: 'recent-config',
    question: '9. Avez-vous modifié des réglages logiciels récemment ?',
    hint: 'Firmware ESC (Bluejay / BLHeli) ou réglages Betaflight (PID / filtres).',
    showIf: (answers) =>
      !picked(answers, 'when', 'after-crash') &&
      !picked(answers, 'hand-spin', 'blocked') &&
      !picked(answers, 'hand-spin', 'scratch') &&
      (picked(answers, 'primary-symptom', 'flight-cut') ||
        picked(answers, 'primary-symptom', 'overheat') ||
        picked(answers, 'when', 'in-flight') ||
        picked(answers, 'temp', 'burning')),
    options: [
      {
        id: 'yes-esc',
        label: '🎛️ Oui, flash ou réglage Bluejay / BLHeli (PWM, Startup, Demag)',
        boostTokens: ['bluejay', 'demag', 'desync', 'broute'],
        compatibleWith: ['mot-desync', 'mot-stuttering'],
        incompatibleWith: ['mot-bearing-noise', 'mot-bent-bell', 'mot-overheating'],
      },
      {
        id: 'yes-pid',
        label: '📊 Oui, tuning PID / D-Term / Filtres Betaflight',
        boostTokens: ['d-term', 'filtres', 'chaud', 'brulant'],
        compatibleWith: ['mot-overheating'],
        incompatibleWith: ['mot-bearing-noise', 'mot-bent-bell', 'mot-stuttering', 'mot-desync'],
      },
      {
        id: 'no-change',
        label: '✅ Non, configuration inchangée',
        boostTokens: [],
        isHealthy: true,
      },
    ],
  },
  {
    id: 'flight-behavior',
    question: '10. Que se passe-t-il en vol ou lors d’un coup de gaz ?',
    hint: 'Observez la stabilité du quad et le comportement lors des accélérations.',
    showIf: (answers) =>
      picked(answers, 'primary-symptom', 'flight-cut') ||
      picked(answers, 'primary-symptom', 'unsure') ||
      picked(answers, 'when', 'in-flight'),
    options: [
      {
        id: 'death-roll',
        label: '🌀 Death roll / tonneau brutal dès un coup de gaz',
        boostTokens: ['desync', 'death roll', 'tonneau', 'coupure gaz', 'bluejay'],
        compatibleWith: ['mot-desync'],
        incompatibleWith: ['mot-bearing-noise', 'mot-overheating'],
      },
      {
        id: 'jello',
        label: '〰️ Jello vidéo, vibrations ou bruit métallique à haut régime',
        boostTokens: ['jello', 'roulement', 'cloche', 'voilee', 'aimant'],
        compatibleWith: ['mot-bearing-noise', 'mot-bent-bell', 'mot-magnet-shift'],
      },
      {
        id: 'hot-flight',
        label: '🔥 Vole normalement mais moteur brûlant / autonomie réduite',
        boostTokens: ['chaud', 'brulant', 'd-term', 'filtres'],
        compatibleWith: ['mot-overheating'],
        incompatibleWith: ['mot-desync', 'mot-stuttering'],
      },
    ],
  },
  {
    id: 'esc-model',
    question: '11. Quel ESC ou firmware utilisez-vous ? (la cause peut être en amont)',
    hint: 'Chaque famille d’ESC a ses faiblesses connues (MOSFETs, Demag Bluejay, condensateur).',
    showIf: (answers) =>
      !picked(answers, 'hand-spin', 'blocked') &&
      !picked(answers, 'hand-spin', 'scratch') &&
      (picked(answers, 'primary-symptom', 'stuttering') ||
        picked(answers, 'primary-symptom', 'flight-cut') ||
        picked(answers, 'beeps', 'no-beeps') ||
        picked(answers, 'beeps', 'missing-2') ||
        picked(answers, 'beeps', 'loop-beeps') ||
        picked(answers, 'temp', 'burning')),
    options: [
      {
        id: 'speedybee-bluejay',
        label: '🐝 SpeedyBee / BLHeli_S flashé Bluejay (48kHz / 96kHz)',
        sub: 'Sensible au Startup Power et Demag Compensation sur gros stators',
        boostTokens: ['bluejay', 'demag', 'desync', 'esc', 'speedybee'],
        compatibleWith: ['mot-desync', 'mot-stuttering', 'esc-no-3-beeps'],
      },
      {
        id: 'tmotor-blheli32',
        label: '⚡ T-Motor / Holybro / Foxeer (BLHeli_32 ou AM32)',
        sub: 'Vérifier condensateur Low-ESR, timing 22° et MOSFETs',
        boostTokens: ['esc', 'mosfet', 'desync', 'condensateur'],
        compatibleWith: ['mot-desync', 'esc-no-3-beeps', 'mot-stuttering'],
      },
      {
        id: 'aio-whoop',
        label: '🪶 Carte AIO Whoop / Toothpick (1S–2S)',
        sub: 'MOSFETs fins sensibles aux blocages d’hélice et prises PH2.0/BT2.0',
        boostTokens: ['esc', 'mosfet', 'broute', 'soudure'],
        compatibleWith: ['mot-stuttering', 'esc-no-3-beeps'],
      },
      {
        id: 'esc-unknown',
        label: '❓ Autre ESC / Je ne connais pas le modèle exact',
        boostTokens: ['esc'],
      },
    ],
  },
  {
    id: 'trace-source',
    question: '12. Remonter à la source : avez-vous isolé le moteur de son bras sur l’ESC ?',
    hint: 'En inversant 2 moteurs (ou en testant la continuité des 3 phases), on sait tout de suite où ça bloque.',
    showIf: (answers) =>
      !picked(answers, 'hand-spin', 'blocked') &&
      !picked(answers, 'hand-spin', 'scratch') &&
      (picked(answers, 'primary-symptom', 'stuttering') ||
        picked(answers, 'beeps', 'no-beeps') ||
        picked(answers, 'beeps', 'missing-2') ||
        picked(answers, 'beeps', 'loop-beeps') ||
        picked(answers, 'esc-model')),
    options: [
      {
        id: 'follows-motor',
        label: '➡️ Le problème suit le moteur sur un autre bras (Source = Moteur)',
        sub: 'Le canal de l’ESC fonctionne bien avec un autre moteur',
        boostTokens: ['bobinage', 'phase', 'soudure', 'stuttering'],
        compatibleWith: ['mot-stuttering', 'mot-magnet-shift'],
        incompatibleWith: ['esc-no-3-beeps'],
      },
      {
        id: 'stays-arm',
        label: '🔌 Le problème reste sur le même bras (Source = ESC / FC)',
        sub: 'Un autre moteur ne tourne pas non plus sur ce bras',
        boostTokens: ['esc', 'mosfet', 'bips', 'nappe', 'fc'],
        compatibleWith: ['esc-no-3-beeps', 'mot-stuttering'],
        incompatibleWith: ['mot-bearing-noise', 'mot-bent-bell', 'mot-magnet-shift', 'mot-overheating'],
      },
      {
        id: 'continuity-ok',
        label: '📟 Continuité OK entre les 3 fils du moteur au multimètre',
        sub: 'Bobinage sain → la coupure vient de la soudure, de l’ESC ou du signal FC',
        boostTokens: ['esc', 'soudure', 'signal', 'bips'],
        compatibleWith: ['esc-no-3-beeps', 'mot-stuttering'],
      },
      {
        id: 'not-tested',
        label: '⏭️ Pas encore testé / Pas de fer à souder sous la main',
        boostTokens: [],
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

/**
 * Évalue les symptômes en temps réel grâce à la matrice explicite
 * (`compatibleWith` / `incompatibleWith`) + indices du prompt.
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
  const healthyCount = answers.filter((a) => a.isHealthy).length;
  const hasUpstreamEscClue =
    picked(answers, 'beeps', 'no-beeps') ||
    picked(answers, 'beeps', 'missing-2') ||
    picked(answers, 'beeps', 'loop-beeps') ||
    picked(answers, 'trace-source', 'stays-arm') ||
    picked(answers, 'trace-source', 'continuity-ok') ||
    picked(answers, 'esc-model') ||
    promptTokens.some((t) => ['esc', 'mosfet', 'bips', 'bluejay', 'blheli'].includes(t));

  return symptoms
    .map((symptom) => {
      const corpus = tokenize(
        `${symptom.title} ${symptom.description} ${symptom.likelyCause} ${symptom.aiDiagnostic.rootCause} ${symptom.matchingForumQuery.join(' ')}`
      );

      let score = 20;
      let eliminated = false;
      const matchReasons: string[] = [];

      if (symptom.id.startsWith('esc-') && !hasUpstreamEscClue) {
        eliminated = true;
      }

      // 1. Matrice explicite par ID de symptôme (aucun faux positif de sous-chaîne)
      for (const ans of answers) {
        if (ans.incompatibleWith?.includes(symptom.id)) {
          eliminated = true;
        }
        if (ans.compatibleWith && ans.compatibleWith.length > 0) {
          if (ans.compatibleWith.includes(symptom.id)) {
            score += 35;
          } else {
            score -= 10;
          }
        }
      }

      // 2. Correspondances sémantiques (prompt libre + mots-clés)
      if (allBoosts.length > 0) {
        const hits = allBoosts.filter((t) => corpus.some((c) => c === t || (t.length >= 4 && c.includes(t))));
        if (hits.length > 0) {
          score += hits.length * 10;
          matchReasons.push(`Indices : ${Array.from(new Set(hits)).slice(0, 3).join(', ')}`);
        }
      }

      // 3. Fallback excludeTokens uniquement pour les questions générées dynamiquement
      const dynamicExcludes = answers
        .filter((a) => a.questionId.startsWith('dyn-') || a.questionId.startsWith('sim-'))
        .flatMap((a) => a.excludeTokens || [])
        .flatMap(tokenize);
      if (dynamicExcludes.some((ex) => corpus.includes(ex))) {
        eliminated = true;
      }

      // 4. Si l'utilisateur répond "tout est sain" sur >= 4 contrôles sans aucun indice positif
      if (healthyCount >= 4 && !answers.some((a) => a.compatibleWith?.includes(symptom.id))) {
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
    })
    .sort((a, b) => b.score - a.score);
}

export interface RootCauseChainAnalysis {
  blockedStage: 'lipo' | 'esc' | 'soudure' | 'moteur' | 'fc';
  blockedLabel: string;
  summary: string;
  confidence: number;
}

/**
 * Analyse la chaîne complète LiPo -> ESC -> Soudures -> Moteur <- FC
 * pour indiquer où le signal ou la puissance bloque ("remonter à la source").
 */
export function analyzeRootCauseChain(
  answers: QuestionAnswerRecord[],
  promptText: string,
  escLabel?: string
): RootCauseChainAnalysis {
  const txt = promptText.toLowerCase();

  if (
    picked(answers, 'trace-source', 'stays-arm') ||
    picked(answers, 'beeps', 'no-beeps') ||
    /\b(mosfet|3 bips manquants|esc mort)\b/i.test(txt)
  ) {
    return {
      blockedStage: 'esc',
      blockedLabel: escLabel ? `ESC (${escLabel})` : 'ESC 4-en-1 / Étage MOSFET',
      summary:
        'En remontant à la source, le défaut ne dépend pas uniquement du moteur : l’alimentation triphasée ou un MOSFET de l’ESC est bloqué.',
      confidence: 88,
    };
  }

  if (
    picked(answers, 'beeps', 'missing-2') ||
    picked(answers, 'recent-config', 'yes-pid') ||
    picked(answers, 'temp', 'burning') ||
    /\b(d-term|pid|signal fc|2 derniers bips)\b/i.test(txt)
  ) {
    return {
      blockedStage: 'fc',
      blockedLabel: 'FC / Signal DShot & Tuning PID',
      summary:
        'La source probable provient du signal de commande ou du filtrage PID/D-Term envoyé par la Flight Controller vers l’ESC.',
      confidence: 84,
    };
  }

  if (
    picked(answers, 'visual-winding', 'wire-cut') ||
    picked(answers, 'beeps', 'loop-beeps') ||
    picked(answers, 'trace-source', 'continuity-ok') ||
    /\b(soudure|phase|fil coupe|broute)\b/i.test(txt)
  ) {
    return {
      blockedStage: 'soudure',
      blockedLabel: 'Liaison ESC ↔ Moteur (Soudures / 3 Phases)',
      summary:
        'Le courant sort de l’ESC mais une des 3 phases est interrompue entre le pad ESC et l’entrée du stator.',
      confidence: 86,
    };
  }

  return {
    blockedStage: 'moteur',
    blockedLabel: 'Moteur Brushless (Cloche, Roulements ou Bobinage)',
    summary:
      'L’alimentation et le signal arrivent correctement en amont : le blocage est localisé dans le moteur lui-même.',
    confidence: 90,
  };
}

/**
 * Vérifie si le diagnostic a déjà convergé clairement (évite de poser des questions inutiles).
 */
export function hasConverged(remainingCandidates: ScoredCandidate[], answersCount: number): boolean {
  if (remainingCandidates.length <= 1) return true;
  if (answersCount >= 2) {
    const gap = remainingCandidates[0].score - remainingCandidates[1].score;
    if (gap >= 40) return true;
  }
  return false;
}

/**
 * Génère une question ciblée pour départager les 2 dernières pistes si nécessaire.
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

  const qId = `dyn-q-${stepNumber}-${topA.id}-${topB.id}`;
  if (askedIds.includes(qId)) return null;

  const extraCommunityHint =
    dynamicResolutions.length > 0
      ? ` (${dynamicResolutions.length} retours communauté indexés)`
      : '';

  return {
    id: qId,
    isGenerated: true,
    question: `${stepNumber}. Pour départager les 2 dernières pistes${extraCommunityHint} :`,
    hint: 'Choisissez la description qui correspond le mieux à votre situation.',
    options: [
      {
        id: `${qId}-a`,
        label: topA.title,
        sub: topA.description,
        boostTokens: tokenize(topA.title),
        compatibleWith: [topA.id],
        incompatibleWith: [topB.id],
      },
      {
        id: `${qId}-b`,
        label: topB.title,
        sub: topB.description,
        boostTokens: tokenize(topB.title),
        compatibleWith: [topB.id],
        incompatibleWith: [topA.id],
      },
      {
        id: `${qId}-neither`,
        label: 'Aucune de ces deux pistes ne correspond à mon cas',
        sub: 'Voir l’aide IA ou créer un post sur le forum',
        boostTokens: [],
        incompatibleWith: [topA.id, topB.id],
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

export function synthesizeQuestionsFromResolutions(
  dynamicResolutions: DynamicResolution[],
  alreadyAskedIds: string[]
): DiagnosticQuestion[] {
  if (dynamicResolutions.length === 0) return [];

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

  const candidates = Array.from(docFreq.entries())
    .filter(([, info]) => info.count >= 1 && info.count <= Math.max(1, dynamicResolutions.length - 1))
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 4);

  return candidates
    .map(([keyword, info], idx) => {
      const qId = `sim-post-q-${keyword}`;
      if (alreadyAskedIds.includes(qId)) return null;
      return {
        id: qId,
        isGenerated: true,
        question: `Question communauté #${idx + 1} : Votre souci concerne-t-il « ${keyword} » ?`,
        hint: `Issu des retours pilotes (ex : ${info.sampleIssue.slice(0, 60)}...)`,
        options: [
          {
            id: `${qId}-yes`,
            label: `Oui, c’est lié à « ${keyword} »`,
            boostTokens: [keyword],
          },
          {
            id: `${qId}-no`,
            label: `Non, aucun rapport avec « ${keyword} »`,
            boostTokens: [],
            excludeTokens: [keyword],
          },
        ],
      } as DiagnosticQuestion;
    })
    .filter((q): q is DiagnosticQuestion => q !== null);
}

/**
 * Sélectionne la prochaine question la plus discriminante selon le contexte,
 * en respectant `showIf` et `skipIfPromptMatches`, et en arrêtant dès convergence.
 */
export function simulateBestNextQuestion(
  remainingCandidates: ScoredCandidate[],
  dynamicResolutions: DynamicResolution[],
  askedIds: string[],
  stepNumber: number,
  answers: QuestionAnswerRecord[] = [],
  promptText: string = ''
): DiagnosticQuestion | null {
  if (remainingCandidates.length <= 1) return null;

  const eligibleStatic = MOTOR_STATIC_QUESTIONS.filter((q) => {
    if (askedIds.includes(q.id)) return false;
    if (q.skipIfPromptMatches && promptText.trim() && q.skipIfPromptMatches.test(promptText)) {
      return false;
    }
    if (q.showIf && !q.showIf(answers, promptText)) {
      return false;
    }
    return true;
  });

  // Toujours poser primary-symptom en premier si éligible et aucune réponse encore donnée
  if (answers.length === 0) {
    const firstQ = eligibleStatic.find((q) => q.id === 'primary-symptom') || eligibleStatic[0];
    if (firstQ) {
      return {
        ...firstQ,
        question: firstQ.question.replace(/^\d+\.\s*/, `${stepNumber}. `),
      };
    }
  }

  const remainingIds = new Set(remainingCandidates.map((c) => c.symptom.id));
  let bestQ: DiagnosticQuestion | null = null;
  let bestScore = -Infinity;

  for (const q of eligibleStatic) {
    let usefulBranches = 0;
    let balancedGain = 0;

    for (const opt of q.options) {
      if (opt.isHealthy || opt.id === 'unsure' || opt.id === 'not-tested') continue;

      let matches = 0;
      for (const id of remainingIds) {
        if (opt.incompatibleWith?.includes(id)) continue;
        if (opt.compatibleWith && opt.compatibleWith.length > 0) {
          if (opt.compatibleWith.includes(id)) matches++;
        } else {
          matches++;
        }
      }

      if (matches > 0 && matches < remainingCandidates.length) {
        usefulBranches++;
        balancedGain += Math.min(matches, remainingCandidates.length - matches);
      }
    }

    if (usefulBranches === 0) continue;

    const score = usefulBranches * 15 + balancedGain * 8;
    if (score > bestScore) {
      bestScore = score;
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

export function runFullTreeSimulation(
  symptoms: DiagnosticSymptomOption[],
  dynamicResolutions: DynamicResolution[]
): SimulationSummary {
  const synthesized = synthesizeQuestionsFromResolutions(dynamicResolutions, []);
  const totalScenarios = symptoms.length + dynamicResolutions.length;

  let totalDepth = 0;
  for (const sym of symptoms) {
    let remaining: ScoredCandidate[] = symptoms.map((s) => ({
      symptom: s,
      score: 20,
      matchReasons: [],
      eliminated: false,
    }));
    const asked: string[] = [];
    const answers: QuestionAnswerRecord[] = [];
    let depth = 0;

    while (remaining.length > 1 && depth < 6) {
      const nextQ = simulateBestNextQuestion(remaining, dynamicResolutions, asked, depth + 1, answers);
      if (!nextQ) break;
      asked.push(nextQ.id);
      depth++;

      const chosenOpt =
        nextQ.options.find((o) => o.compatibleWith?.includes(sym.id)) ||
        nextQ.options.find((o) => !o.incompatibleWith?.includes(sym.id) && o.isHealthy) ||
        nextQ.options[0];

      answers.push({
        questionId: nextQ.id,
        questionLabel: nextQ.question,
        optionId: chosenOpt.id,
        optionLabel: chosenOpt.label,
        boostTokens: chosenOpt.boostTokens,
        excludeTokens: chosenOpt.excludeTokens,
        compatibleWith: chosenOpt.compatibleWith,
        incompatibleWith: chosenOpt.incompatibleWith,
        isHealthy: chosenOpt.isHealthy,
      });

      const simEval = evaluateCandidatesLive(symptoms, answers, '').filter((c) => !c.eliminated);
      if (simEval.length === 0) break;
      remaining = simEval;
      if (hasConverged(remaining, answers.length)) break;
    }

    totalDepth += Math.max(1, depth);
  }

  return {
    totalScenarios,
    resolutionPostsCount: dynamicResolutions.length,
    synthesizedQuestionsCount: synthesized.length,
    averageDepth: symptoms.length > 0 ? Number((totalDepth / symptoms.length).toFixed(1)) : 0,
    simulatedAt: new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  };
}
