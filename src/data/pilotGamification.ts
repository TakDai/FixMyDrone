// Système de Gamification, Niveaux de Pilotes, Badges et Récompenses Partenaires
// Mutualisation des comptes pour tout l'écosystème Quad

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
  role: 'Pilote' | 'Constructeur Vérifié' | 'Modérateur' | 'Admin';
  isLoggedIn: boolean;
  fixesResolvedCount: number;
  detailedReportsCount: number;
  communityHelpfulVotes: number;
  unlockedBadges: PilotBadge[];
  historyReports: DetailedFixReport[];
  createdAt: string;
}

export interface EcosystemSiteInfo {
  id: string;
  name: string;
  domain: string;
  role: string;
  components: string[];
  status: 'Connecté (SSO)' | 'Actif';
  color: string;
}

// 1. Écosystème des 7 sites partenaires à comptes mutualisés
export const ECOSYSTEM_SITES: EcosystemSiteInfo[] = [
  {
    id: 'fixmydrone',
    name: 'FixMyDrone.fr',
    domain: 'fixmydrone.fr',
    role: 'Plateforme centrale de diagnostic IA & Forum d entraide communautaire',
    components: ['Tous composants', 'Diagnostic IA', 'Rapports d Atelier'],
    status: 'Connecté (SSO)',
    color: '#000000',
  },
  {
    id: 'multi-motors',
    name: 'Multi-Motors.fr',
    domain: 'multi-motors.fr',
    role: 'Catalogue de référence mondial des moteurs brushless FPV (13 824 réf)',
    components: ['Moteurs Brushless', 'Stators', 'Cloches', 'Roulements'],
    status: 'Connecté (SSO)',
    color: '#ef4444',
  },
  {
    id: 'bindmyquad',
    name: 'BindMyQuad.fr',
    domain: 'bindmyquad.fr',
    role: 'Plateforme dédiée aux protocoles radio, récepteurs RX et antennes',
    components: ['Radio', 'RX ExpressLRS', 'TBS Crossfire', 'Antennes RX'],
    status: 'Connecté (SSO)',
    color: '#3b82f6',
  },
  {
    id: 'camyquad',
    name: 'CamYQuad.fr',
    domain: 'camyquad.fr',
    role: 'Catalogue et comparateur vidéo HD / Analogique, VTX et optiques',
    components: ['VTX HD / O3', 'Lunettes FPV', 'Caméras', 'Antennes VTX'],
    status: 'Connecté (SSO)',
    color: '#8b5cf6',
  },
  {
    id: 'makemyframe',
    name: 'MakeMyFrame.fr',
    domain: 'makemyframe.fr',
    role: 'Base de données des châssis carbone, hélices et impressions 3D TPU',
    components: ['Châssis Carbone', 'Hélices', 'Pièces TPU'],
    status: 'Connecté (SSO)',
    color: '#10b981',
  },
  {
    id: 'makemyquad',
    name: 'MakeMyQuad.fr',
    domain: 'makemyquad.fr',
    role: 'Gestion des stacks électroniques, batteries LiPo et configuration CLI',
    components: ['Contrôleurs FC', 'Variateurs ESC', 'Batteries LiPo', 'Betaflight'],
    status: 'Connecté (SSO)',
    color: '#f59e0b',
  },
  {
    id: 'findmyquad',
    name: 'FindMyQuad.fr',
    domain: 'findmyquad.fr',
    role: 'Systèmes de localisation, buzzers autonomes et modules GPS Rescue',
    components: ['GPS Rescue', 'Buzzers Autonomes Vifly', 'Beacons'],
    status: 'Connecté (SSO)',
    color: '#06b6d4',
  },
];

// 2. Échelles de niveaux de pilotes (Gamification progressive avec paliers)
export const PILOT_LEVELS: PilotLevelInfo[] = [
  {
    level: 1,
    title: 'Rookie Pilote',
    minXp: 0,
    maxXp: 149,
    colorClass: 'text-neutral-600',
    badgeBg: 'bg-neutral-100 text-neutral-800 border-neutral-300',
    perks: [
      'Accès au diagnostic IA et forum d entraide',
      'Consultation des 3 138 moteurs Multi-Motors',
      'Compte unifié actif sur les 7 sites partenaires',
    ],
  },
  {
    level: 2,
    title: 'Padawan du Fer',
    minXp: 150,
    maxXp: 399,
    colorClass: 'text-blue-600',
    badgeBg: 'bg-blue-50 text-blue-800 border-blue-300',
    perks: [
      'Badge "Padawan" visible sur le forum',
      'Code -5% Multi-Motors.fr (Code FIXMYDRONE5)',
      'Code -5% BindMyQuad (Code BINDRESCUE5)',
    ],
  },
  {
    level: 3,
    title: 'Tech Builder Certifié',
    minXp: 400,
    maxXp: 899,
    colorClass: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    perks: [
      'Badge "Tech Builder" certifié sur votre profil',
      'Code -8% + Frais de port offerts dès 4 moteurs (Code TECHBUILDER8)',
      'Dépôt de tutoriels et fiches d atelier en tête de forum',
    ],
  },
  {
    level: 4,
    title: 'Docteur FPV / Maître Soudeur',
    minXp: 900,
    maxXp: 1799,
    colorClass: 'text-purple-600',
    badgeBg: 'bg-purple-50 text-purple-800 border-purple-300',
    perks: [
      'Mention "Expert Résolution" sur vos réponses',
      'Code -10% VIP Permanent sur l ensemble de l écosystème (Code FPVDOCTOR10)',
      'Accès prioritaire aux Giveaways mensuels de matos FPV',
    ],
  },
  {
    level: 5,
    title: 'Grand Expert Hardware',
    minXp: 1800,
    maxXp: 3499,
    colorClass: 'text-amber-600',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-300',
    perks: [
      'Statut Modérateur Technique sur le forum',
      'Accès direct aux fiches constructeurs et réclamations de lot',
      'Invitation annuelle aux rencontres d ateliers FPV',
    ],
  },
  {
    level: 6,
    title: 'Légende de l Atelier FPV',
    minXp: 3500,
    maxXp: 99999,
    colorClass: 'text-rose-600',
    badgeBg: 'bg-rose-50 text-rose-800 border-rose-300',
    perks: [
      'Place permanente au Hall of Fame FixMyDrone',
      'Testeur VIP de prototypes avant mise sur le marché',
      'Badge ornemental gravé sur toutes vos interventions',
    ],
  },
];

// 3. Badges de distinction
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

// 4. Récompenses & Codes Promos Partenaires Déblocables
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

// 5. Profil par défaut initialisé
export const DEFAULT_PILOT_PROFILE: PilotProfile = {
  id: 'pilot-current-user',
  callsign: 'ROOKIE_PILOTE',
  email: 'pilote@fixmydrone.fr',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
  xp: 120,
  level: 1,
  levelTitle: 'Rookie Pilote',
  role: 'Pilote',
  isLoggedIn: false,
  fixesResolvedCount: 1,
  detailedReportsCount: 0,
  communityHelpfulVotes: 3,
  unlockedBadges: [ALL_PILOT_BADGES[0]],
  historyReports: [],
  createdAt: 'Novembre 2026',
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

const STORAGE_KEY = 'fpv_ecosystem_account_v1';

/**
 * Récupère le profil pilote mutualisé (SSO Écosystème)
 */
export function loadPilotProfile(): PilotProfile {
  if (typeof window === 'undefined') return DEFAULT_PILOT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('fixmydrone_pilot_profile_v1');
    if (!raw) return DEFAULT_PILOT_PROFILE;
    const parsed = JSON.parse(raw);
    const lvl = getLevelFromXp(parsed.xp || 0);
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
 * Sauvegarde le profil pilote mutualisé (SSO Écosystème)
 */
export function savePilotProfile(profile: PilotProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    localStorage.setItem('fixmydrone_pilot_profile_v1', JSON.stringify(profile));
    window.dispatchEvent(new Event('fpv_ecosystem_account_updated'));
  } catch (e) {
    // ignore
  }
}

/**
 * Connexion pilote mutualisée
 */
export function loginPilot(email: string, callsign?: string): PilotProfile {
  const current = loadPilotProfile();
  const updated: PilotProfile = {
    ...current,
    email: email.trim(),
    callsign: callsign?.trim() || current.callsign || email.split('@')[0].toUpperCase(),
    isLoggedIn: true,
  };
  savePilotProfile(updated);
  return updated;
}

/**
 * Inscription pilote mutualisée
 */
export function registerPilot(callsign: string, email: string): PilotProfile {
  const updated: PilotProfile = {
    ...DEFAULT_PILOT_PROFILE,
    id: `pilot-${Date.now()}`,
    callsign: callsign.trim().toUpperCase(),
    email: email.trim(),
    isLoggedIn: true,
    xp: 150, // Passe immédiatement niveau 2 (Padawan du Fer) !
    level: 2,
    levelTitle: 'Padawan du Fer',
    createdAt: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
  };
  savePilotProfile(updated);
  return updated;
}

/**
 * Déconnexion pilote mutualisée
 */
export function logoutPilot(): PilotProfile {
  const current = loadPilotProfile();
  const updated: PilotProfile = {
    ...current,
    isLoggedIn: false,
  };
  savePilotProfile(updated);
  return updated;
}
