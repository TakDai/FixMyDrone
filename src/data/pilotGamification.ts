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
  orderId?: string;
  orderNumber?: number;
  orderName?: string;
  orderRoman?: string;
}

export interface MajorPrestigeOrder {
  id: string;
  orderNumber: number;
  romanNumeral: string;
  name: string;
  startLevel: number;
  endLevel: number;
  themeColor: string;
  badgeBg: string;
  icon: string;
  description: string;
  grandPerk: string;
}

export const PRESTIGE_ORDERS: MajorPrestigeOrder[] = [
  {
    id: 'order-1',
    orderNumber: 1,
    romanNumeral: 'I',
    name: 'Apprentis du Fer & Dépannage Initial',
    startLevel: 1,
    endLevel: 25,
    themeColor: 'text-neutral-700',
    badgeBg: 'bg-neutral-100 text-neutral-800 border-neutral-300',
    icon: '🛠️',
    description: 'Premières soudures, tests de continuité multimètre et familiarisation avec Betaflight.',
    grandPerk: 'Code -5% Multi-Motors.fr & BindMyQuad.fr + Accès complet aux fiches de pannes IA',
  },
  {
    id: 'order-2',
    orderNumber: 2,
    romanNumeral: 'II',
    name: 'Artisans Builders & Monteurs 5 Pouces',
    startLevel: 26,
    endLevel: 75,
    themeColor: 'text-blue-600',
    badgeBg: 'bg-blue-50 text-blue-800 border-blue-300',
    icon: '🔩',
    description: 'Montages complets, gestion du Smoke Stopper, flash des firmwares ESC Bluejay et AM32.',
    grandPerk: 'Code -8% + Frais de port offerts dès 4 moteurs + Droit de vote sur les pannes résolues',
  },
  {
    id: 'order-3',
    orderNumber: 3,
    romanNumeral: 'III',
    name: 'Experts Électroniques & Maîtres Soudeurs',
    startLevel: 76,
    endLevel: 150,
    themeColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    icon: '🔥',
    description: 'Micro-soudures sur pads CMS arrachés, remplacement de MOSFETs ESC et débug de bus SPI.',
    grandPerk: 'Code -10% VIP Permanent multi-boutiques + Mention "Expert Résolution" sur le forum',
  },
  {
    id: 'order-4',
    orderNumber: 4,
    romanNumeral: 'IV',
    name: 'Alchimistes du Vol & Dompteurs Blackbox',
    startLevel: 151,
    endLevel: 250,
    themeColor: 'text-purple-600',
    badgeBg: 'bg-purple-50 text-purple-800 border-purple-300',
    icon: '📊',
    description: 'Analyse spectrale FFT, accordage PID poussé, filtres RPM dynamiques et suppression du jello.',
    grandPerk: 'Code -12% Multi-Motors.fr + Buzzer autonome Vifly Finder offert dès 35€',
  },
  {
    id: 'order-5',
    orderNumber: 5,
    romanNumeral: 'V',
    name: 'Maîtres des Ondes RF & Long-Range',
    startLevel: 251,
    endLevel: 350,
    themeColor: 'text-cyan-600',
    badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-300',
    icon: '📡',
    description: 'Maîtrise d ExpressLRS Gemini, Crossfire 868MHz, diagrammes de rayonnement et liaisons 20km+.',
    grandPerk: 'Code -10% BindMyQuad + Accès prioritaire aux bulletins de séries et firmwares beta',
  },
  {
    id: 'order-6',
    orderNumber: 6,
    romanNumeral: 'VI',
    name: 'Visionnaires Haute Définition & Optique',
    startLevel: 351,
    endLevel: 450,
    themeColor: 'text-indigo-600',
    badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-300',
    icon: '🕶️',
    description: 'Optimisation des flux DJI O3, Walksnail Avatar HD et HDZero avec réglages thermiques d usine.',
    grandPerk: 'Code -10% CammyQuad Lunettes & VTX + Canal direct d échange avec les fabricants',
  },
  {
    id: 'order-7',
    orderNumber: 7,
    romanNumeral: 'VII',
    name: 'Seigneurs du Bando & Crash-Proof Builders',
    startLevel: 451,
    endLevel: 550,
    themeColor: 'text-orange-600',
    badgeBg: 'bg-orange-50 text-orange-800 border-orange-300',
    icon: '🧱',
    description: 'Conception de quads blindés ultra-résistants aux impacts de béton et réparations extrêmes.',
    grandPerk: 'Certification officielle "Atelier Agréé FixMyDrone" + Médaille physique d étain personnalisée',
  },
  {
    id: 'order-8',
    orderNumber: 8,
    romanNumeral: 'VIII',
    name: 'Grands Professeurs d Atelier & Mentors FPV',
    startLevel: 551,
    endLevel: 650,
    themeColor: 'text-amber-600',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-300',
    icon: '🎓',
    description: 'Transmission du savoir, formation des nouveaux arrivants et homologation des guides d atelier.',
    grandPerk: 'Pouvoir de modération et d homologation officielle sur tous les tutoriels de l écosystème',
  },
  {
    id: 'order-9',
    orderNumber: 9,
    romanNumeral: 'IX',
    name: 'Concepteurs CAD & Ingénieurs Aérodynamiques',
    startLevel: 651,
    endLevel: 750,
    themeColor: 'text-teal-600',
    badgeBg: 'bg-teal-50 text-teal-800 border-teal-300',
    icon: '📐',
    description: 'Conception de frames carbone sur-mesure (T700/Toray), pièces TPU optimisées et flux CFD.',
    grandPerk: 'Code -15% MakeMyFrame Carbone & TPU + Découpe de prototypes offerts à l atelier',
  },
  {
    id: 'order-10',
    orderNumber: 10,
    romanNumeral: 'X',
    name: 'Seigneurs de la Télémétrie Aéronautique',
    startLevel: 751,
    endLevel: 850,
    themeColor: 'text-sky-600',
    badgeBg: 'bg-sky-50 text-sky-800 border-sky-300',
    icon: '🛰️',
    description: 'Navigation inertielle autonome, fusion de capteurs GNSS multi-constellations et baromètres.',
    grandPerk: 'Dotation trimestrielle de capteurs et GPS Rescue neufs par FindMyQuad.fr',
  },
  {
    id: 'order-11',
    orderNumber: 11,
    romanNumeral: 'XI',
    name: 'Sommités Mondiales du Pilotage & R&D Drone',
    startLevel: 851,
    endLevel: 950,
    themeColor: 'text-fuchsia-600',
    badgeBg: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-300',
    icon: '👑',
    description: 'Reconnaissance planétaire, conseil technique auprès des écuries de course et juré international.',
    grandPerk: 'Statut Ambassadeur Mondial + Prototypes constructeurs envoyés avant toute annonce publique',
  },
  {
    id: 'order-12',
    orderNumber: 12,
    romanNumeral: 'XII',
    name: 'Titans Mythiques & Démiurges Célestes',
    startLevel: 951,
    endLevel: 1000,
    themeColor: 'text-red-600',
    badgeBg: 'bg-gradient-to-r from-red-500 to-amber-500 text-white border-red-600 shadow-sm',
    icon: '⚡',
    description: 'Le sommet ultime de l ingénierie et du pilotage FPV. Maîtrise absolue du vol et des composants.',
    grandPerk: 'Inscription éternelle au Panthéon Mondial FixMyDrone + Cadre titane personnalisé gravé au laser',
  },
];

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
  xp: number; // XP Total cumulé de l'écosystème
  level: number; // Niveau Général Global (1 à 1000)
  levelTitle: string; // Titre du Niveau Général
  role: 'Pilote' | 'Constructeur Vérifié' | 'Modérateur' | 'Admin';
  isLoggedIn: boolean;
  fixesResolvedCount: number;
  detailedReportsCount: number;
  communityHelpfulVotes: number;
  reviewsCount?: number; // Nombre d'avis postés (ex: Multi-Motors)
  siteXp?: Record<string, number>; // XP par site
  activityMetrics?: {
    reviewsCount: number;
    fixesCount: number;
    communityVotesCount: number;
    tuningPresetsCount: number;
  };
  unlockedBadges: PilotBadge[];
  historyReports: DetailedFixReport[];
  createdAt: string;
}

export interface SiteSpecialtyConfig {
  id: string;
  name: string;
  domain: string;
  icon: string;
  discipline: string;
  actionMetricLabel: string;
  description: string;
  accentColor: string;
  badgeBg: string;
  milestoneTitles: Record<number, string>;
  generateTitle: (level: number) => string;
}

export interface SpecialtyLevelInfo {
  siteId: string;
  siteName: string;
  level: number;
  title: string;
  discipline: string;
  minXp: number;
  maxXp: number;
  progressPercent: number;
  currentXp: number;
  actionsDone: number;
  actionMetricLabel: string;
}

// 7 Arbres de Spécialités d'Atelier (1 par site partenaire de l'écosystème FPV)
export const SITE_SPECIALTIES: Record<string, SiteSpecialtyConfig> = {
  'multi-motors': {
    id: 'multi-motors',
    name: 'Multi-Motors.fr',
    domain: 'multi-motors.fr',
    icon: '⚙️',
    discipline: 'Avis, Bancs d Essai & Moteurs Brushless',
    actionMetricLabel: 'Avis & Tests Moteurs déposés',
    description: 'Bancs de poussée dyno, avis sur les cloches, roulements et courbes de puissance.',
    accentColor: 'text-amber-500',
    badgeBg: 'bg-amber-50 text-amber-900 border-amber-300',
    milestoneTitles: {
      1: 'Apprenti Testeur de Stator',
      2: 'Observateur de Roulements',
      3: 'Critique d Atelier Dyno',
      5: 'Chroniqueur de Moteurs 5 Pouces',
      10: 'Étalonneur KV & Courbes de Gaz',
      25: 'Expert Bobinage & Aimants N52SH',
      50: 'Docteur des Cloches Titane',
      100: 'Maître des Bancs de Poussée Multi-Motors',
      250: 'Architecte Rendement Brushless',
      500: 'Doyen des Bancs d Essai Mondiaux',
      750: 'Sommité Suprême du Moteur FPV',
      1000: 'Grand Maître Éternel des Moteurs Brushless',
    },
    generateTitle: (lvl: number) => {
      if (lvl >= 1000) return 'Grand Maître Éternel des Moteurs Brushless';
      if (lvl >= 750) return `Sommité du Moteur Brushless (Échelon ${lvl - 749})`;
      if (lvl >= 500) return `Doyen des Bancs d Essai (Échelon ${lvl - 499})`;
      if (lvl >= 250) return `Architecte Rendement Moteur (Échelon ${lvl - 249})`;
      if (lvl >= 100) return `Maître des Bancs de Poussée (Échelon ${lvl - 99})`;
      if (lvl >= 50) return `Docteur des Cloches Titane (Rang ${Math.floor((lvl - 50) / 5) + 1})`;
      if (lvl >= 25) return `Expert Bobinage & Aimants (Rang ${Math.floor((lvl - 25) / 3) + 1})`;
      if (lvl >= 10) return `Étalonneur KV & Thrust (Rang ${lvl - 9})`;
      if (lvl >= 5) return `Chroniqueur Moteurs 5" (Rang ${lvl - 4})`;
      if (lvl >= 3) return 'Critique d Atelier Dyno';
      if (lvl >= 2) return 'Observateur de Roulements';
      return 'Apprenti Testeur de Stator';
    },
  },
  'fixmydrone': {
    id: 'fixmydrone',
    name: 'FixMyDrone.fr',
    domain: 'fixmydrone.fr',
    icon: '🩺',
    discipline: 'Résolutions de Pannes & Diagnostics IA',
    actionMetricLabel: 'Pannes Diagnostiquées & Résolues',
    description: 'Protocoles de dépannage, guides d atelier validés et fiches de réparation.',
    accentColor: 'text-red-600',
    badgeBg: 'bg-red-50 text-red-900 border-red-300',
    milestoneTitles: {
      1: 'Apprenti Dépanneur',
      2: 'Urgentiste de Bando',
      3: 'Chirurgien de l Étain',
      5: 'Sauveur de Pads Arrachement',
      10: 'Expert Continuité Multimètre',
      25: 'Spécialiste Micro-Soudures CMS',
      50: 'Docteur Chef d Atelier FPV',
      100: 'Grand Résolveur Homologué',
      250: 'Grand Médecin Chef des Circuits',
      500: 'Chirurgien de l Extrême FPV',
      750: 'Sommité Mondiale du Diagnostic Drone',
      1000: 'Démiurge du Fer & Résolveur Suprême',
    },
    generateTitle: (lvl: number) => {
      if (lvl >= 1000) return 'Démiurge du Fer & Résolveur Suprême';
      if (lvl >= 750) return `Sommité Mondiale du Diagnostic (Échelon ${lvl - 749})`;
      if (lvl >= 500) return `Chirurgien de l Extrême FPV (Échelon ${lvl - 499})`;
      if (lvl >= 250) return `Grand Médecin Chef des Circuits (Échelon ${lvl - 249})`;
      if (lvl >= 100) return `Grand Résolveur Homologué (Échelon ${lvl - 99})`;
      if (lvl >= 50) return `Docteur Chef d Atelier FPV (Rang ${Math.floor((lvl - 50) / 5) + 1})`;
      if (lvl >= 25) return `Spécialiste Micro-Soudures CMS (Rang ${Math.floor((lvl - 25) / 3) + 1})`;
      if (lvl >= 10) return `Expert Continuité Multimètre (Rang ${lvl - 9})`;
      if (lvl >= 5) return `Sauveur de Pads Arrachement (Rang ${lvl - 4})`;
      if (lvl >= 3) return 'Chirurgien de l Étain';
      if (lvl >= 2) return 'Urgentiste de Bando';
      return 'Apprenti Dépanneur';
    },
  },
  'bindmyquad': {
    id: 'bindmyquad',
    name: 'BindMyQuad.fr',
    domain: 'bindmyquad.fr',
    icon: '📡',
    discipline: 'Protocoles Radio, Télémétrie & RX',
    actionMetricLabel: 'Liaisons RF & RX configurés',
    description: 'Paramétrage ExpressLRS, TBS Crossfire, antennes dipôles et liaisons longue distance.',
    accentColor: 'text-blue-600',
    badgeBg: 'bg-blue-50 text-blue-900 border-blue-300',
    milestoneTitles: {
      1: 'Apprenti Binder',
      2: 'Opérateur Hertzien 2.4GHz',
      3: 'Architecte Packet Rate 500Hz',
      5: 'Dompteur ExpressLRS Gemini',
      10: 'Maître des Antennes Dipôles Immortal-T',
      25: 'Spécialiste Long-Range 868MHz',
      50: 'Ingénieur Liaison Télémétrique',
      100: 'Commandant des Fréquences Radio',
      250: 'Grand Amiral du Long-Range',
      500: 'Architecte RF Zéro Failsafe',
      750: 'Doyen des Ondes Hertziennes FPV',
      1000: 'Maître Cosmique des Ondes Radio',
    },
    generateTitle: (lvl: number) => {
      if (lvl >= 1000) return 'Maître Cosmique des Ondes Radio';
      if (lvl >= 750) return `Doyen des Ondes Hertziennes (Échelon ${lvl - 749})`;
      if (lvl >= 500) return `Architecte RF Zéro Failsafe (Échelon ${lvl - 499})`;
      if (lvl >= 250) return `Grand Amiral du Long-Range (Échelon ${lvl - 249})`;
      if (lvl >= 100) return `Commandant des Fréquences (Échelon ${lvl - 99})`;
      if (lvl >= 50) return `Ingénieur Liaison Télémétrique (Rang ${Math.floor((lvl - 50) / 5) + 1})`;
      if (lvl >= 25) return `Spécialiste Long-Range 868MHz (Rang ${Math.floor((lvl - 25) / 3) + 1})`;
      if (lvl >= 10) return `Maître des Antennes Dipôles (Rang ${lvl - 9})`;
      if (lvl >= 5) return `Dompteur ExpressLRS Gemini (Rang ${lvl - 4})`;
      if (lvl >= 3) return 'Architecte Packet Rate 500Hz';
      if (lvl >= 2) return 'Opérateur Hertzien 2.4GHz';
      return 'Apprenti Binder';
    },
  },
  'cammyquad': {
    id: 'cammyquad',
    name: 'CammyQuad.fr',
    domain: 'cammyquad.fr',
    icon: '🕶️',
    discipline: 'Vidéo HD, Masques, VTX & Optique',
    actionMetricLabel: 'Systèmes Vidéo & Caméras réglés',
    description: 'Transmission numérique DJI O3/O4, Walksnail, HDZero et caméras Starlight.',
    accentColor: 'text-purple-600',
    badgeBg: 'bg-purple-50 text-purple-900 border-purple-300',
    milestoneTitles: {
      1: 'Cadreur Analogique 5.8GHz',
      2: 'Étalonneur Numérique 1080p',
      3: 'Opticien Starlight 1200TVL',
      5: 'Spécialiste Flux DJI O3 / Walksnail',
      10: 'Dompteur de Latence Zéro HDZero',
      25: 'Directeur Photo Haute Définition',
      50: 'Ingénieur Refroidissement VTX 2W',
      100: 'Maître des Écrans Micro-OLED',
      250: 'Grand Visionnaire de l Immersion',
      500: 'Architecte Optique Plein Champ',
      750: 'Sommité Mondiale de la Vidéo FPV',
      1000: 'Démiurge de la Vision Céleste',
    },
    generateTitle: (lvl: number) => {
      if (lvl >= 1000) return 'Démiurge de la Vision Céleste';
      if (lvl >= 750) return `Sommité de la Vidéo FPV (Échelon ${lvl - 749})`;
      if (lvl >= 500) return `Architecte Optique Plein Champ (Échelon ${lvl - 499})`;
      if (lvl >= 250) return `Grand Visionnaire de l Immersion (Échelon ${lvl - 249})`;
      if (lvl >= 100) return `Maître des Écrans Micro-OLED (Échelon ${lvl - 99})`;
      if (lvl >= 50) return `Ingénieur Refroidissement VTX (Rang ${Math.floor((lvl - 50) / 5) + 1})`;
      if (lvl >= 25) return `Directeur Photo HD (Rang ${Math.floor((lvl - 25) / 3) + 1})`;
      if (lvl >= 10) return `Dompteur Latence Zéro HDZero (Rang ${lvl - 9})`;
      if (lvl >= 5) return `Spécialiste Flux Numérique (Rang ${lvl - 4})`;
      if (lvl >= 3) return 'Opticien Starlight 1200TVL';
      if (lvl >= 2) return 'Étalonneur Numérique 1080p';
      return 'Cadreur Analogique 5.8GHz';
    },
  },
  'makemyframe': {
    id: 'makemyframe',
    name: 'MakeMyFrame.fr',
    domain: 'makemyframe.fr',
    icon: '🧱',
    discipline: 'Châssis Carbone, TPU & Crash-Resistance',
    actionMetricLabel: 'Châssis & Impressions 3D assemblés',
    description: 'Résistance carbone Toray T700, géométrie Deadcat et protections TPU anti-choc.',
    accentColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    milestoneTitles: {
      1: 'Monteur de Bras Carbone',
      2: 'Imprimeur TPU 95A',
      3: 'Ajusteur Géométrie True-X / DeadCat',
      5: 'Forgeron Carbone Toray T700',
      10: 'Concepteur Crash-Proof Bando',
      25: 'Modeleur Pièces Aérodynamiques',
      50: 'Maître Découpeur CNC & Chanfrein',
      100: 'Architecte Structurel Bando Master',
      250: 'Concepteur de Châssis de Course',
      500: 'Titan Indestructible du Carbone',
      750: 'Doyen Mondial des Matériaux Composites',
      1000: 'Créateur Suprême des Châssis FPV',
    },
    generateTitle: (lvl: number) => {
      if (lvl >= 1000) return 'Créateur Suprême des Châssis FPV';
      if (lvl >= 750) return `Doyen des Matériaux Composites (Échelon ${lvl - 749})`;
      if (lvl >= 500) return `Titan Indestructible du Carbone (Échelon ${lvl - 499})`;
      if (lvl >= 250) return `Concepteur Châssis de Course (Échelon ${lvl - 249})`;
      if (lvl >= 100) return `Architecte Structurel Bando (Échelon ${lvl - 99})`;
      if (lvl >= 50) return `Maître Découpeur CNC (Rang ${Math.floor((lvl - 50) / 5) + 1})`;
      if (lvl >= 25) return `Modeleur Pièces Aéro (Rang ${Math.floor((lvl - 25) / 3) + 1})`;
      if (lvl >= 10) return `Concepteur Crash-Proof (Rang ${lvl - 9})`;
      if (lvl >= 5) return `Forgeron Carbone Toray T700 (Rang ${lvl - 4})`;
      if (lvl >= 3) return 'Ajusteur Géométrie True-X / DeadCat';
      if (lvl >= 2) return 'Imprimeur TPU 95A';
      return 'Monteur de Bras Carbone';
    },
  },
  'makemyquad': {
    id: 'makemyquad',
    name: 'MakeMyQuad.fr',
    domain: 'makemyquad.fr',
    icon: '💻',
    discipline: 'Stacks FC/ESC, Betaflight CLI & Tuning PID',
    actionMetricLabel: 'Stacks réglées & Presets CLI partagés',
    description: 'Configuration Betaflight, filtres RPM dynamiques, flash AM32 et analyse Blackbox.',
    accentColor: 'text-orange-600',
    badgeBg: 'bg-orange-50 text-orange-900 border-orange-300',
    milestoneTitles: {
      1: 'Câbleur Propre en Alvéole',
      2: 'Flasheur de Firmwares ESC AM32',
      3: 'Sorcier du CLI Betaflight',
      5: 'Dompteur de Filtres RPM Bidirectionnels',
      10: 'Accordeur PID Master',
      25: 'Analyste Spectrogramme Blackbox',
      50: 'Optimiseur DMA & Timers MCU',
      100: 'Grand Alchimiste du Vol',
      250: 'Maître des Trajectoires Millimétrées',
      500: 'Oracle du Contrôle de Vol FPV',
      750: 'Sommité Mondiale de la Dynamique de Vol',
      1000: 'Architecte Quantique du Vol FPV',
    },
    generateTitle: (lvl: number) => {
      if (lvl >= 1000) return 'Architecte Quantique du Vol FPV';
      if (lvl >= 750) return `Sommité de la Dynamique de Vol (Échelon ${lvl - 749})`;
      if (lvl >= 500) return `Oracle du Contrôle de Vol (Échelon ${lvl - 499})`;
      if (lvl >= 250) return `Maître des Trajectoires (Échelon ${lvl - 249})`;
      if (lvl >= 100) return `Grand Alchimiste du Vol (Échelon ${lvl - 99})`;
      if (lvl >= 50) return `Optimiseur DMA & Timers MCU (Rang ${Math.floor((lvl - 50) / 5) + 1})`;
      if (lvl >= 25) return `Analyste Spectrogramme Blackbox (Rang ${Math.floor((lvl - 25) / 3) + 1})`;
      if (lvl >= 10) return `Accordeur PID Master (Rang ${lvl - 9})`;
      if (lvl >= 5) return `Dompteur Filtres RPM (Rang ${lvl - 4})`;
      if (lvl >= 3) return 'Sorcier du CLI Betaflight';
      if (lvl >= 2) return 'Flasheur de Firmwares ESC AM32';
      return 'Câbleur Propre en Alvéole';
    },
  },
  'findmyquad': {
    id: 'findmyquad',
    name: 'FindMyQuad.fr',
    domain: 'findmyquad.fr',
    icon: '🛰️',
    discipline: 'GPS Rescue, Sécurité & Buzzers Autonomes',
    actionMetricLabel: 'Sauvetages GPS & Failsafes paramétrés',
    description: 'Sauvetage automatique GPS Rescue, balises autonomes Vifly et repérage de crash.',
    accentColor: 'text-cyan-600',
    badgeBg: 'bg-cyan-50 text-cyan-900 border-cyan-300',
    milestoneTitles: {
      1: 'Pisteur de Bando',
      2: 'Vigie des Failsafes',
      3: 'Installateur Buzzer LiPo Autonome',
      5: 'Navigateur GNSS M10 Multi-Constellations',
      10: 'Calibreur Barométrique & Compas',
      25: 'Sauveur de Quads Perdus',
      50: 'Commandant des RTH Automatiques',
      100: 'Gardien des Vols Longue Distance',
      250: 'Grand Guide des Cieux Inexplorés',
      500: 'Sentinelle Infaillible du Sauvetage',
      750: 'Doyen de la Sécurité Aérienne FPV',
      1000: 'Sentinelle Éternelle de l Espace Aérien',
    },
    generateTitle: (lvl: number) => {
      if (lvl >= 1000) return 'Sentinelle Éternelle de l Espace Aérien';
      if (lvl >= 750) return `Doyen de la Sécurité Aérienne (Échelon ${lvl - 749})`;
      if (lvl >= 500) return `Sentinelle Infaillible du Sauvetage (Échelon ${lvl - 499})`;
      if (lvl >= 250) return `Grand Guide des Cieux Inexplorés (Échelon ${lvl - 249})`;
      if (lvl >= 100) return `Gardien des Vols Longue Distance (Échelon ${lvl - 99})`;
      if (lvl >= 50) return `Commandant des RTH Automatiques (Rang ${Math.floor((lvl - 50) / 5) + 1})`;
      if (lvl >= 25) return `Sauveur de Quads Perdus (Rang ${Math.floor((lvl - 25) / 3) + 1})`;
      if (lvl >= 10) return `Calibreur Barométrique & Compas (Rang ${lvl - 9})`;
      if (lvl >= 5) return `Navigateur GNSS M10 (Rang ${lvl - 4})`;
      if (lvl >= 3) return 'Installateur Buzzer LiPo Autonome';
      if (lvl >= 2) return 'Vigie des Failsafes';
      return 'Pisteur de Bando';
    },
  },
};

/**
 * Calcule le niveau et les informations pour une spécialité donnée (site de l'écosystème)
 */
export function getSpecialtyLevelInfo(siteId: string, siteXp: number, actionsCount: number = 0): SpecialtyLevelInfo {
  const specialty = SITE_SPECIALTIES[siteId] || SITE_SPECIALTIES['fixmydrone'];
  
  // Échelle de niveau pour cette spécialité (courbe équilibrée)
  let lvl = 1;
  let minXp = 0;
  let maxXp = 99;

  // Progression : chaque palier demande un peu plus d'XP
  while (lvl < 1000) {
    const step = Math.round(75 + Math.pow(lvl, 1.25) * 20);
    maxXp = minXp + step - 1;
    if (siteXp <= maxXp) break;
    minXp = maxXp + 1;
    lvl++;
  }

  const range = Math.max(1, maxXp - minXp);
  const progressPercent = Math.min(100, Math.max(5, ((siteXp - minXp) / range) * 100));

  const title = specialty.milestoneTitles[lvl] || specialty.generateTitle(lvl);

  return {
    siteId: specialty.id,
    siteName: specialty.name,
    level: lvl,
    title,
    discipline: specialty.discipline,
    minXp,
    maxXp,
    progressPercent,
    currentXp: siteXp,
    actionsDone: actionsCount,
    actionMetricLabel: specialty.actionMetricLabel,
  };
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
    id: 'cammyquad',
    name: 'CammyQuad.fr',
    domain: 'cammyquad.fr',
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

// 2. Générateur des 1000 Niveaux de Pilotes & Paliers de Prestige FPV
function generateAll1000Levels(): PilotLevelInfo[] {
  const levels: PilotLevelInfo[] = [];

  // Paliers signatures et historiques des 10 premiers niveaux
  const base10MinXp = [0, 150, 400, 900, 1800, 3500, 6000, 10000, 17000, 30000];
  const base10MaxXp = [149, 399, 899, 1799, 3499, 5999, 9999, 16999, 29999, 44999];
  const base10Titles = [
    'Rookie Pilote',
    'Padawan du Fer',
    'Tech Builder Certifié',
    'Docteur FPV / Maître Soudeur',
    'Grand Expert Hardware',
    'Accordeur PID & Maître Blackbox',
    'Ingénieur Course & Bando',
    'Maître d Atelier Émérite',
    'Sommité Mondiale FPV',
    'Légende Vivante FPV',
  ];

  const signatureMilestones: Record<number, string> = {
    25: 'Grand Prévôt des Apprentis',
    50: 'Maître Artisan 5 Pouces',
    75: 'Doyen des Artisans Builders',
    100: 'Grand Maître Soudeur Suprême',
    150: 'Souverain des Circuits & ESCs',
    200: 'Grand Alchimiste des Filtres RPM',
    250: 'Maître Absolu de la Blackbox',
    300: 'Commandant des Fréquences 868MHz',
    350: 'Grand Amiral du Long-Range',
    400: 'Visionnaire Suprême Vidéo HD',
    450: 'Maître Optique & Latence Zéro',
    500: 'Gladiateur Mythique des Bandos',
    550: 'Seigneur Crash-Proof Invaincu',
    600: 'Grand Recteur d Atelier FPV',
    650: 'Patriarche des Formateurs Pilotes',
    700: 'Grand Architecte Carbone Toray',
    750: 'Maître Concepteur CAD Suprême',
    800: 'Grand Oracle GNSS & Rescue',
    850: 'Navigateur Inertiel Stellaire',
    900: 'Sommité Planétaire Absolue',
    950: 'Doyen Suprême de la R&D FPV',
    990: 'Titan Céleste de l Éther',
    999: 'Archange du Fer & du Carbone',
    1000: 'Dieu Vivant du FPV & Légende Éternelle des Cieux',
  };

  const rankAdjectives = [
    'Initié',
    'Praticien',
    'Spécialiste',
    'Expert',
    'Maître',
    'Commandant',
    'Grand Expert',
    'Souverain',
    'Virtuose',
    'Émérite',
  ];

  let currentMinXp = 0;

  for (let lvl = 1; lvl <= 1000; lvl++) {
    // 1. Ordre de prestige correspondant
    const order =
      PRESTIGE_ORDERS.find((o) => lvl >= o.startLevel && lvl <= o.endLevel) ||
      PRESTIGE_ORDERS[PRESTIGE_ORDERS.length - 1];

    // 2. Calcul d'XP
    let minXp = 0;
    let maxXp = 0;

    if (lvl <= 10) {
      minXp = base10MinXp[lvl - 1];
      maxXp = base10MaxXp[lvl - 1];
      currentMinXp = maxXp + 1;
    } else {
      minXp = currentMinXp;
      if (lvl === 1000) {
        maxXp = 999999999;
      } else {
        const step = Math.round(1500 + Math.pow(lvl - 10, 1.35) * 45);
        maxXp = minXp + step - 1;
        currentMinXp = maxXp + 1;
      }
    }

    // 3. Titre du niveau
    let title = '';
    if (lvl <= 10) {
      title = base10Titles[lvl - 1];
    } else if (signatureMilestones[lvl]) {
      title = signatureMilestones[lvl];
    } else {
      const adjIdx = (lvl - order.startLevel) % rankAdjectives.length;
      const stepIdx = Math.floor((lvl - order.startLevel) / rankAdjectives.length) + 1;
      const adj = rankAdjectives[adjIdx];

      // Thème court de l'ordre
      const domainShort =
        order.orderNumber === 1
          ? 'du Fer'
          : order.orderNumber === 2
          ? 'du Montage 5"'
          : order.orderNumber === 3
          ? 'de la Micro-Soudure'
          : order.orderNumber === 4
          ? 'de l Accordage PID'
          : order.orderNumber === 5
          ? 'des Liaisons RF'
          : order.orderNumber === 6
          ? 'du Flux HD'
          : order.orderNumber === 7
          ? 'du Bando'
          : order.orderNumber === 8
          ? 'd Atelier'
          : order.orderNumber === 9
          ? 'du Carbone CAD'
          : order.orderNumber === 10
          ? 'du GNSS Rescue'
          : order.orderNumber === 11
          ? 'Mondial Drone'
          : 'des Titans FPV';

      title = `${adj} ${domainShort} (Échelon ${stepIdx})`;
    }

    // 4. Avantages & Perks spécifiques
    const perks: string[] = [
      order.grandPerk,
      `Multiplicateur XP Atelier x${(1 + (lvl - 1) * 0.005).toFixed(2)} sur les rapports`,
      `Distinction publique : Membre officiel Ordre ${order.romanNumeral} (Niv. ${lvl}/1000)`,
    ];

    if (lvl % 50 === 0) {
      perks.push(`Cadeau d atelier débloqué : Box partenaire de composants palier ${lvl}`);
    }

    levels.push({
      level: lvl,
      title,
      minXp,
      maxXp,
      colorClass: order.themeColor,
      badgeBg: order.badgeBg,
      perks,
      orderId: order.id,
      orderNumber: order.orderNumber,
      orderName: order.name,
      orderRoman: order.romanNumeral,
    });
  }

  return levels;
}

export const PILOT_LEVELS: PilotLevelInfo[] = generateAll1000Levels();

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
    id: 'rew-cammyquad-7',
    partnerName: 'CammyQuad.fr',
    partnerDomain: 'cammyquad.fr',
    discountLabel: '-7% sur les VTX, caméras & antennes',
    promoCode: 'CAMMYHD7',
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
    partnerDomain: 'makemyquad.fr / cammyquad.fr',
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
  xp: 150,
  level: 2,
  levelTitle: 'Padawan du Fer',
  role: 'Pilote',
  isLoggedIn: false,
  fixesResolvedCount: 1,
  detailedReportsCount: 0,
  communityHelpfulVotes: 3,
  reviewsCount: 2,
  siteXp: {
    'fixmydrone': 80,
    'multi-motors': 40,
    'bindmyquad': 15,
    'cammyquad': 15,
    'makemyframe': 0,
    'makemyquad': 0,
    'findmyquad': 0,
  },
  activityMetrics: {
    reviewsCount: 2,
    fixesCount: 1,
    communityVotesCount: 3,
    tuningPresetsCount: 0,
  },
  unlockedBadges: [ALL_PILOT_BADGES[0]],
  historyReports: [],
  createdAt: 'Novembre 2026',
};

/**
 * Ajoute de l'XP sur un site spécifique (ex: reviews sur Multi-Motors)
 * et synchronise automatiquement le Niveau Général Global
 */
export function addActivityXp(
  siteId: string,
  activityType: 'review' | 'fix' | 'community' | 'tuning' | 'vote' | 'action',
  amount: number
): PilotProfile {
  const current = loadPilotProfile();
  const currentSiteXp = current.siteXp || {
    fixmydrone: 0,
    'multi-motors': 0,
    bindmyquad: 0,
    cammyquad: 0,
    makemyframe: 0,
    makemyquad: 0,
    findmyquad: 0,
  };

  const updatedSiteXp = {
    ...currentSiteXp,
    [siteId]: (currentSiteXp[siteId] || 0) + amount,
  };

  const metrics = current.activityMetrics || {
    reviewsCount: 0,
    fixesCount: 0,
    communityVotesCount: 0,
    tuningPresetsCount: 0,
  };

  if (activityType === 'review') metrics.reviewsCount = (metrics.reviewsCount || 0) + 1;
  if (activityType === 'fix') metrics.fixesCount = (metrics.fixesCount || 0) + 1;
  if (activityType === 'community' || activityType === 'vote') metrics.communityVotesCount = (metrics.communityVotesCount || 0) + 1;
  if (activityType === 'tuning') metrics.tuningPresetsCount = (metrics.tuningPresetsCount || 0) + 1;

  // Calcul du nouvel XP Général total rassemblant tous les sites
  const totalXp = Object.values(updatedSiteXp).reduce((sum, val) => sum + val, 0);
  const generalLvl = getLevelFromXp(totalXp);

  const updated: PilotProfile = {
    ...current,
    xp: totalXp,
    level: generalLvl.level,
    levelTitle: generalLvl.title,
    siteXp: updatedSiteXp,
    activityMetrics: metrics,
    reviewsCount: metrics.reviewsCount,
    fixesResolvedCount: metrics.fixesCount,
    communityHelpfulVotes: metrics.communityVotesCount,
  };

  savePilotProfile(updated);
  return updated;
}

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
 * Génère le lien d'accès SSO vers un site partenaire de l'écosystème
 */
export function getEcosystemPartnerUrl(siteDomain: string, currentPilot?: PilotProfile | null): string {
  const base = `https://${siteDomain}`;
  if (!currentPilot || !currentPilot.isLoggedIn || !currentPilot.email) {
    return base;
  }
  const ssoParams = new URLSearchParams({
    sso_source: 'fixmydrone.fr',
    sso_email: currentPilot.email,
    sso_name: currentPilot.callsign || '',
    sso_level: String(currentPilot.level || 1),
  });
  return `${base}/?${ssoParams.toString()}`;
}

/**
 * Vérifie et applique un jeton ou payload SSO reçu dans l'URL depuis Multi-Motors ou un autre site partenaire
 * Exemple : ?sso_email=pilote@fpv.fr&sso_name=AlexFPV
 */
export function checkAndApplyUrlSso(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    const ssoEmail = params.get('sso_email') || params.get('email');
    const ssoName = params.get('sso_name') || params.get('name') || params.get('sso_callsign');
    const ssoRole = params.get('sso_role') || params.get('role');

    if (ssoEmail && ssoEmail.includes('@')) {
      const normEmail = ssoEmail.toLowerCase().trim();
      const callsign = (ssoName || normEmail.split('@')[0]).trim().toUpperCase();
      
      const db = getAllRegisteredUsers();
      const existing = db[normEmail];
      
      const profile: PilotProfile = existing ? {
        ...existing.profile,
        callsign: callsign || existing.profile.callsign,
        isLoggedIn: true,
      } : {
        ...DEFAULT_PILOT_PROFILE,
        id: `pilot-${Date.now()}`,
        callsign,
        email: normEmail,
        isLoggedIn: true,
        xp: 150,
        level: 2,
        levelTitle: 'Padawan du Fer',
        role: ssoRole === 'admin' ? 'Admin' : ssoRole === 'moderator' ? 'Modérateur' : 'Pilote',
        createdAt: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
      };

      savePilotProfile(profile);

      // Nettoyer les paramètres de l'URL sans recharger la page
      const cleanUrl = window.location.pathname + (window.location.hash || '');
      window.history.replaceState({}, document.title, cleanUrl);
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

/**
 * Récupère le profil pilote mutualisé (SSO Écosystème)
 */
export function loadPilotProfile(): PilotProfile {
  if (typeof window === 'undefined') return DEFAULT_PILOT_PROFILE;
  try {
    // Vérification prioritaire si un SSO arrive via l'URL
    checkAndApplyUrlSso();

    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('fixmydrone_pilot_profile_v1');
    if (!raw) return DEFAULT_PILOT_PROFILE;
    const parsed = JSON.parse(raw);
    const lvl = getLevelFromXp(parsed.xp || 0);
    const siteXp = parsed.siteXp || {
      fixmydrone: Math.round((parsed.xp || 150) * 0.55),
      'multi-motors': Math.round((parsed.xp || 150) * 0.25),
      bindmyquad: Math.round((parsed.xp || 150) * 0.10),
      cammyquad: Math.round((parsed.xp || 150) * 0.10),
      makemyframe: 0,
      makemyquad: 0,
      findmyquad: 0,
    };
    const activityMetrics = parsed.activityMetrics || {
      reviewsCount: parsed.reviewsCount || 2,
      fixesCount: parsed.fixesResolvedCount || 1,
      communityVotesCount: parsed.communityHelpfulVotes || 3,
      tuningPresetsCount: 0,
    };
    return {
      ...parsed,
      siteXp,
      activityMetrics,
      reviewsCount: activityMetrics.reviewsCount,
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
