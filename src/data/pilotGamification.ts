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

// 2. Échelles de 10 niveaux de pilotes (Paliers FPV progressifs & prestige atelier)
export const PILOT_LEVELS: PilotLevelInfo[] = [
  {
    level: 1,
    title: 'Rookie Pilote',
    minXp: 0,
    maxXp: 149,
    colorClass: 'text-neutral-600',
    badgeBg: 'bg-neutral-100 text-neutral-800 border-neutral-300',
    perks: [
      'Accès au diagnostic IA et fiches de dépannage',
      'Consultation des 13 824 moteurs Multi-Motors',
      'Compte SSO mutualisé actif sur les 7 sites partenaires',
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
      'Badge "Padawan" visible sur le forum communautaire',
      'Code -5% Multi-Motors.fr (Code : FIXMYDRONE5)',
      'Code -5% BindMyQuad récepteurs & radio (Code : BINDRESCUE5)',
      'Droit de vote utile (+10 XP) sur les pannes résolues',
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
      'Code -8% + Frais de port offerts dès 4 moteurs (Code : TECHBUILDER8)',
      'Code -7% CamYQuad VTX & Caméras (Code : CAMYHD7)',
      'Publication de tutoriels et fiches d atelier en tête de forum',
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
      'Mention "Expert Résolution" sur vos interventions',
      'Code -10% VIP Permanent multi-boutiques (Code : FPVDOCTOR10)',
      'Code -8% MakeMyQuad Stacks & LiPos (Code : MAKEMYSTACK8)',
      'Accès aux analyses avancées de télémétrie Blackbox',
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
      'Accès direct aux fiches constructeurs & bulletins de séries',
      'Code -10% MakeMyFrame Carbone & TPU (Code : FRAMEPRO10)',
      'Validation officielle des solutions signalées par la communauté',
    ],
  },
  {
    level: 6,
    title: 'Accordeur PID & Maître Blackbox',
    minXp: 3500,
    maxXp: 5999,
    colorClass: 'text-orange-600',
    badgeBg: 'bg-orange-50 text-orange-800 border-orange-300',
    perks: [
      'Badge "PID Master" ornemental et distinctif',
      'Code -12% Multi-Motors.fr (Code : MULTIVIP12)',
      'Accès anticipé aux calculateurs de filtres RPM dynamiques',
      'Buzzer Vifly autonome offert dès 35€ d achat (Code : BUZZERFREE)',
    ],
  },
  {
    level: 7,
    title: 'Ingénieur Course & Bando',
    minXp: 6000,
    maxXp: 9999,
    colorClass: 'text-cyan-600',
    badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-300',
    perks: [
      'Accès prioritaire aux Giveaways mensuels de pièces neuves',
      'Canal direct d échange avec les fabricants (SpeedyBee, T-Motor)',
      'Code -10% CamYQuad Lunettes & VTX (Code : CAMYPRO10)',
      'Testeur privilégié de firmwares beta (Betaflight / EdgeTX)',
    ],
  },
  {
    level: 8,
    title: 'Maître d Atelier Émérite',
    minXp: 10000,
    maxXp: 16999,
    colorClass: 'text-indigo-600',
    badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-300',
    perks: [
      'Certification officielle "Atelier Agréé FixMyDrone"',
      'Attribution de la médaille d étain virtuelle gravée',
      'Pouvoir d homologation des guides d atelier communautaires',
      'Invitation VIP aux rencontres annuelles des builders FPV',
    ],
  },
  {
    level: 9,
    title: 'Sommité Mondiale FPV',
    minXp: 17000,
    maxXp: 29999,
    colorClass: 'text-fuchsia-600',
    badgeBg: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-300',
    perks: [
      'Droit de vote sur le référencement des nouvelles marques',
      'Dotation trimestrielle de pièces d essai par nos partenaires',
      'Participation au jury des meilleurs builds de l année',
      'Accès illimité à vie à tous les services pro de l écosystème',
    ],
  },
  {
    level: 10,
    title: 'Légende Vivante FPV',
    minXp: 30000,
    maxXp: 99999,
    colorClass: 'text-red-600',
    badgeBg: 'bg-gradient-to-r from-red-50 to-amber-50 text-red-900 border-red-400',
    perks: [
      'Inscription éternelle au Hall of Fame mondial FixMyDrone',
      'Prototypes d usine envoyés avant commercialisation publique',
      'Statut Administrateur d Honneur sur l ensemble de l écosystème',
      'Cadre physique personnalisé gravé au laser offert à l atelier',
    ],
  },
];

// 3. Badges de distinction (12 badges variés et prestigieux)
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
  {
    id: 'rf-longrange',
    name: 'Spécialiste RF & Long-Range',
    description: 'A dépanné des liaisons ExpressLRS, Crossfire ou configurations d antennes.',
    icon: '📡',
    category: 'expertise',
  },
  {
    id: 'hd-visionary',
    name: 'Visionnaire HD',
    description: 'Expertise prouvée sur les systèmes vidéo DJI O3, Walksnail ou HDZero.',
    icon: '🕶️',
    category: 'expertise',
  },
  {
    id: 'cli-wizard',
    name: 'Sorcier du CLI',
    description: 'A résolu des conflits DMA, problèmes DFU ou configurations Betaflight poussées.',
    icon: '💻',
    category: 'expertise',
  },
  {
    id: 'workshop-veteran',
    name: 'Vétéran de l Atelier',
    description: 'A franchi le cap des 10 réparations validées et adoptées par la commu.',
    icon: '🚁',
    category: 'resolution',
  },
  {
    id: 'ecosystem-pilot',
    name: 'Pilote de l Écosystème',
    description: 'Compte mutualisé SSO actif et synchronisé sur les sites du réseau FPV.',
    icon: '🌐',
    category: 'community',
  },
  {
    id: 'hall-of-fame',
    name: 'Légende FPV',
    description: 'A accumulé plus de 3 500 points d XP d atelier et d entraide.',
    icon: '🏆',
    category: 'rare',
  },
];

// 4. Récompenses & Codes Promos Partenaires Déblocables (Écosystème FPV)
export const PARTNER_REWARDS: PartnerReward[] = [
  {
    id: 'rew-multimotors-5',
    partnerName: 'Multi-Motors.fr',
    partnerDomain: 'multi-motors.fr',
    discountLabel: '-5% sur votre commande de moteurs',
    promoCode: 'FIXMYDRONE5',
    minLevelRequired: 2,
    description: 'Valable sur plus de 13 824 références de moteurs FPV.',
    isUnlocked: false,
  },
  {
    id: 'rew-bindmyquad-5',
    partnerName: 'BindMyQuad.fr',
    partnerDomain: 'bindmyquad.fr',
    discountLabel: '-5% sur les récepteurs & antennes RX',
    promoCode: 'BINDRESCUE5',
    minLevelRequired: 2,
    description: 'Valable sur RadioMaster, BETAFPV, TBS Crossfire et ELRS.',
    isUnlocked: false,
  },
  {
    id: 'rew-camyquad-7',
    partnerName: 'CamYQuad.fr',
    partnerDomain: 'camyquad.fr',
    discountLabel: '-7% sur les VTX, caméras & antennes',
    promoCode: 'CAMYHD7',
    minLevelRequired: 3,
    description: 'Valable sur DJI O3, Walksnail Avatar, Caddx et Foxeer.',
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
    id: 'rew-makemyquad-8',
    partnerName: 'MakeMyQuad.fr',
    partnerDomain: 'makemyquad.fr',
    discountLabel: '-8% sur les stacks FC/ESC & LiPos',
    promoCode: 'MAKEMYSTACK8',
    minLevelRequired: 4,
    description: 'Valable sur SpeedyBee, T-Motor, CNHL et Tattu.',
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
  {
    id: 'rew-makemyframe-10',
    partnerName: 'MakeMyFrame.fr',
    partnerDomain: 'makemyframe.fr',
    discountLabel: '-10% sur les châssis carbone & pièces TPU',
    promoCode: 'FRAMEPRO10',
    minLevelRequired: 5,
    description: 'Valable sur ImpulseRC, GEPRC et impressions 3D TPU haute résistance.',
    isUnlocked: false,
  },
  {
    id: 'rew-multimotors-12',
    partnerName: 'Multi-Motors.fr',
    partnerDomain: 'multi-motors.fr',
    discountLabel: '-12% VIP sur toute la boutique',
    promoCode: 'MULTIVIP12',
    minLevelRequired: 6,
    description: 'Remise maximale accordée aux maîtres d atelier et accordeurs PID.',
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
const USERS_DB_KEY = 'fpv_ecosystem_users_db_v1';

export interface StoredUserAccount {
  email: string;
  password?: string;
  profile: PilotProfile;
}

export function getAllRegisteredUsers(): Record<string, StoredUserAccount> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveUserToDirectory(account: StoredUserAccount): void {
  if (typeof window === 'undefined') return;
  try {
    const db = getAllRegisteredUsers();
    db[account.email.toLowerCase().trim()] = account;
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
  } catch {
    // ignore
  }
}

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
    
    // Met également à jour dans l'annuaire si l'email existe
    if (profile.email) {
      const db = getAllRegisteredUsers();
      const normEmail = profile.email.toLowerCase().trim();
      const existing = db[normEmail];
      if (existing) {
        existing.profile = profile;
        saveUserToDirectory(existing);
      } else {
        saveUserToDirectory({ email: normEmail, profile });
      }
    }

    window.dispatchEvent(new Event('fpv_ecosystem_account_updated'));
  } catch (e) {
    // ignore
  }
}

export interface AuthResult {
  success: boolean;
  user?: PilotProfile;
  error?: string;
}

/**
 * Connexion pilote mutualisée avec vérification de l'annuaire
 */
export function loginPilot(email: string, password?: string): AuthResult {
  const normEmail = email.toLowerCase().trim();
  const db = getAllRegisteredUsers();
  const existing = db[normEmail];

  if (existing) {
    if (password && existing.password && existing.password !== password) {
      return { success: false, error: 'Mot de passe incorrect pour cette adresse email.' };
    }
    const profile: PilotProfile = {
      ...existing.profile,
      isLoggedIn: true,
    };
    savePilotProfile(profile);
    existing.profile = profile;
    saveUserToDirectory(existing);
    return { success: true, user: profile };
  }

  // Première connexion avec cet email : initialisation automatique avec le pseudo déduit
  const callsign = normEmail.split('@')[0].toUpperCase();
  const newProfile: PilotProfile = {
    ...DEFAULT_PILOT_PROFILE,
    id: `pilot-${Date.now()}`,
    callsign,
    email: normEmail,
    isLoggedIn: true,
    xp: 150,
    level: 2,
    levelTitle: 'Padawan du Fer',
    createdAt: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
  };
  savePilotProfile(newProfile);
  saveUserToDirectory({ email: normEmail, password, profile: newProfile });
  return { success: true, user: newProfile };
}

/**
 * Inscription pilote mutualisée
 */
export function registerPilot(callsign: string, email: string, password?: string): AuthResult {
  const normEmail = email.toLowerCase().trim();
  const db = getAllRegisteredUsers();

  if (db[normEmail]) {
    // Compte existant : mise à jour et connexion
    const updated: PilotProfile = {
      ...db[normEmail].profile,
      callsign: callsign.trim().toUpperCase() || db[normEmail].profile.callsign,
      isLoggedIn: true,
    };
    savePilotProfile(updated);
    db[normEmail].profile = updated;
    if (password) db[normEmail].password = password;
    saveUserToDirectory(db[normEmail]);
    return { success: true, user: updated };
  }

  const newProfile: PilotProfile = {
    ...DEFAULT_PILOT_PROFILE,
    id: `pilot-${Date.now()}`,
    callsign: callsign.trim().toUpperCase(),
    email: normEmail,
    isLoggedIn: true,
    xp: 150, // Bonus d'inscription de 150 XP direct au niveau 2 !
    level: 2,
    levelTitle: 'Padawan du Fer',
    createdAt: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
  };
  savePilotProfile(newProfile);
  saveUserToDirectory({ email: normEmail, password, profile: newProfile });
  return { success: true, user: newProfile };
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
