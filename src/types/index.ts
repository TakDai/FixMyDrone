export type ComponentCategory =
  | 'frame'
  | 'motors'
  | 'motor'
  | 'esc-stack'
  | 'esc'
  | 'flight-controller'
  | 'fc'
  | 'vtx-camera'
  | 'vtx'
  | 'cam'
  | 'receiver-rx'
  | 'rx'
  | 'propellers'
  | 'battery-lipo'
  | 'lipo'
  | 'gps-rescue'
  | 'gps'
  | 'antennas'
  | 'antenna-rx'
  | 'antenna-vtx'
  | 'radio-goggles'
  | 'radio'
  | 'goggle'
  | 'configurator'
  | 'betaflight';

export interface ComponentIssue {
  id: string;
  title: string;
  symptoms: string[];
  cause: string;
  solution: string;
  difficulty: 'Facile' | 'Moyen' | 'Expert';
  successRate: number; // ex: 94%
}

export interface DroneComponentInfo {
  id: ComponentCategory;
  name: string;
  slug: string;
  frenchTitle: string;
  tagline: string;
  description: string;
  roleInDrone: string;
  badge: string;
  color: string;
  accentBg: string;
  iconName: string;
  // Position pour le schéma interactif
  diagramCoords: {
    x: number; // %
    y: number; // %
  };
  totalIssues: number;
  totalFixes: number;
  activePilots: number;
  keyIssues: ComponentIssue[];
  popularBrands: string[];
  sampleProducts: string[];
}

export interface ProductCatalogItem {
  id: string;
  name: string;
  brand: string;
  category: ComponentCategory;
  categoryName: string;
  specs: Record<string, string>;
  rating: number; // 4.8 / 5
  reviewCount: number;
  reportedIssuesCount: number;
  verifiedFixesCount: number;
  status: 'Recommandé' | 'Fiable' | 'Attention Firmware' | 'Fragile';
  popularFor: string;
  commonBugs: string[];
  latestFix?: {
    issue: string;
    fix: string;
    author: string;
    date: string;
  };
}

export interface CommunityPost {
  id: string;
  title: string;
  category: ComponentCategory;
  categoryName: string;
  productName?: string;
  brand?: string;
  model?: string;
  author: {
    name: string;
    callsign: string;
    avatar: string;
    badge: 'Pro Builder' | 'Expert Betaflight' | 'Racer' | 'Rookie' | 'Soudeur Fou';
  };
  createdAt: string;
  views: number;
  replies: number;
  isResolved: boolean;
  resolvedWithAI?: boolean;
  rarityIndex?: number; // 1 à 10 : 1 = panne très très rare / exotique, 10 = panne très fréquente / classique
  rarityLabel?: string;
  solutionSummary?: string;
  tags: string[];
}

export interface PilotUser {
  id: string;
  callsign: string;
  email: string;
  avatar: string;
  role: 'Pilote' | 'Modérateur' | 'Constructeur Vérifié' | 'Admin';
  badge: string;
  dronesCount: number;
  reputation: number;
  fixesShared: number;
}
