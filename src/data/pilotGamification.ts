// Système de Gamification, Niveaux de Pilotes, Badges et Récompenses Partenaires

export interface PilotBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'resolution' | 'expertise' | 'community' | 'rare';
  unlockedAt?: string;
}

export interface PartnerReward {
  id: string;
  partnerName: string;
  partnerDomain: string;
  discountLabel: string;
  promoCode: string;
  minLevelRequired: number;
  description: string;
  isUnlocked: boolean;
}

export interface PilotLevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  colorClass: string;
  badgeBg: string;
  perks: string[];
}

export interface DetailedFixReport {
  id: string;
  componentCategory: string;
  componentName: string;
  modelExact?: string;
  serialNumber?: string;
  exactRootCause: string;
  perceivedDifficulty: number; // 1 à 10
  timeSpentMinutes: number;
  toolsUsed: string[];
  keyAdvice: string;
  replacedPart?: string;
  createdAt: string;
  xpEarned: number;
}

export interface PilotProfile {
  id: string;
  callsign: string;
  email: string;
  avatar: string;
  xp: number;
  level: number;
  levelTitle: string;
  fixesResolvedCount: number;
  detailedReportsCount: number;
  communityHelpfulVotes: number;
  unlockedBadges: PilotBadge[];
  historyReports: DetailedFixReport[];
}

// 1. Échelles de niveaux de pilotes (Gamification progressive)
export const PILOT_LEVELS: PilotLevelInfo[] = [
  {
    level: 1,
    title: 'Rookie Pilote',
    minXp: 0,
    maxXp: 149,
    colorClass: 'text-neutral-600',
    badgeBg: 'bg-neutral-100 text-neutral-800 border-neutral-300',
    perks: ['Accès au diagnostic IA', 'Consultation des 3 138 moteurs Multi-Motors'],
  },
  {
    level: 2,
    title: 'Padawan du Fer',
    minXp: 150,
    maxXp: 399,
    colorClass: 'text-blue-600',
    badgeBg: 'bg-blue-50 text-blue-800 border-blue-300',
    perks: ['Badge "Padawan" visible sur le forum', 'Code -5% Multi-Motors & BindMyQuad'],
  },
  {
    level: 3,
    title: 'Tech Builder Certifié',
    minXp: 400,
    maxXp: 899,
    colorClass: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    perks: ['Badge "Tech Builder" certifié', 'Code -8% + Frais de port offerts sur les shops partenaires'],
  },
  {
    level: 4,
    title: 'Docteur FPV / Maître Soudeur',
    minXp: 900,
    maxXp: 1799,
    colorClass: 'text-purple-600',
    badgeBg: 'bg-purple-50 text-purple-800 border-purple-300',
    perks: ['Mention "Expert Résolution" sur vos réponses', 'Accès prioritaire aux Giveaways mensuels de matos FPV'],
  },
  {
    level: 5,
    title: 'Grand Expert Hardware',
    minXp: 1800,
    maxXp: 3499,
    colorClass: 'text-amber-600',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-300',
    perks: ['Statut Modérateur Technique', 'Code VIP -10% permanent sur l ensemble de l écosystème'],
  },
  {
    level: 6,
    title: 'Légende de l Atelier FPV',
    minXp: 3500,
    maxXp: 99999,
    colorClass: 'text-rose-600',
    badgeBg: 'bg-rose-50 text-rose-800 border-rose-300',
    perks: ['Place permanente au Hall of Fame', 'Testeur VIP prototypes & moteurs avant sortie'],
  },
];

// 2. Badges de distinction
export const ALL_PILOT_BADGES: PilotBadge[] = [
  {
    id: 'first-fix',
    name: 'Sauveur de Quad',
    description: 'A résolu et validé sa première panne sur la plateforme.',
    icon: '🩺',
    category: 'resolution',
  },
  {
    id: 'detailed-master',
    name: 'Rapporteur d Élite',
    description: 'A soumis un Rapport d Atelier ultra-détaillé pour aider la commu.',
    icon: '📝',
    category: 'expertise',
  },
  {
    id: 'motor-doctor',
    name: 'Docteur Multi-Motors',
    description: 'A identifié et dépanné un moteur avec sa référence exacte du catalogue.',
    icon: '⚙️',
    category: 'expertise',
  },
  {
    id: 'rare-hunter',
    name: 'Chasseur d Exotique',
    description: 'A résolu une panne classée rare ou très rare (Indice 1 à 3/10).',
    icon: '💎',
    category: 'rare',
  },
  {
    id: 'community-hero',
    name: 'Héros du Forum',
    description: 'A reçu plus de 5 votes utiles de pilotes dépannés grâce à ses conseils.',
    icon: '🤝',
    category: 'community',
  },
  {
    id: 'solder-guru',
    name: 'Maître de l Étain',
    description: 'A résolu des pannes de soudure froide et de continuité électrique.',
    icon: '🔥',
    category: 'expertise',
  },
];

// 3. Récompenses & Codes Promos Partenaires Déblocables
export const PARTNER_REWARDS: PartnerReward[] = [
  {
    id: 'rew-multimotors-5',
    partnerName: 'Multi-Motors.fr',
    partnerDomain: 'multi-motors.fr',
    discountLabel: '-5% sur votre commande de moteurs',
    promoCode: 'FIXMYDRONE5',
    minLevelRequired: 2,
    description: 'Valable sur plus de 13 800 références de moteurs FPV.',
    isUnlocked: false,
  },
  {
    id: 'rew-bindmyquad-5',
    partnerName: 'BindMyQuad',
    partnerDomain: 'bindmyquad.fr',
    discountLabel: '-5% sur les récepteurs & antennes RX',
    promoCode: 'BINDRESCUE5',
    minLevelRequired: 2,
    description: 'Valable sur RadioMaster, BETAFPV, TBS Crossfire et ELRS.',
    isUnlocked: false,
  },
  {
    id: 'rew-multimotors-8',
    partnerName: 'Multi-Motors.fr',
    partnerDomain: 'multi-motors.fr',
    discountLabel: '-8% + Port Offert dès 4 moteurs',
    promoCode: 'TECHBUILDER8',
    minLevelRequired: 3,
    description: 'Réservé aux pilotes certifiés niveau 3 Tech Builder.',
    isUnlocked: false,
  },
  {
    id: 'rew-ecosystem-vip-10',
    partnerName: 'Écosystème FPV Partenaires',
    partnerDomain: 'makemyquad.fr / camyquad.fr',
    discountLabel: '-10% VIP Permanent',
    promoCode: 'FPVDOCTOR10',
    minLevelRequired: 4,
    description: 'Accès VIP sur l ensemble des shops de l écosystème quad.',
    isUnlocked: false,
  },
];

// 4. Profil par défaut initialisé
export const DEFAULT_PILOT_PROFILE: PilotProfile = {
  id: 'pilot-current-user',
  callsign: 'ROOKIE_PILOTE',
  email: 'pilote@fixmydrone.fr',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
  xp: 120, // Niveau 1 presque niveau 2
  level: 1,
  levelTitle: 'Rookie Pilote',
  fixesResolvedCount: 1,
  detailedReportsCount: 0,
  communityHelpfulVotes: 3,
  unlockedBadges: [ALL_PILOT_BADGES[0]], // Sauveur de Quad débloqué
  historyReports: [],
};

/**
 * Calcule le niveau et les métriques de progression à partir des points d'XP
 */
export function getLevelFromXp(xp: number): PilotLevelInfo {
  for (let i = PILOT_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= PILOT_LEVELS[i].minXp) {
      return PILOT_LEVELS[i];
    }
  }
  return PILOT_LEVELS[0];
}

/**
 * Récupère le profil pilote sauvegardé dans le stockage local du navigateur
 */
export function loadPilotProfile(): PilotProfile {
  if (typeof window === 'undefined') return DEFAULT_PILOT_PROFILE;
  try {
    const raw = localStorage.getItem('fixmydrone_pilot_profile_v1');
    if (!raw) return DEFAULT_PILOT_PROFILE;
    const parsed = JSON.parse(raw);
    const lvl = getLevelFromXp(parsed.xp);
    return {
      ...parsed,
      level: lvl.level,
      levelTitle: lvl.title,
    };
  } catch (e) {
    return DEFAULT_PILOT_PROFILE;
  }
}

/**
 * Sauvegarde le profil pilote dans le stockage local
 */
export function savePilotProfile(profile: PilotProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('fixmydrone_pilot_profile_v1', JSON.stringify(profile));
  } catch (e) {
    // ignore
  }
}
