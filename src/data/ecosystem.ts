export interface EcosystemSisterSite {
  id: string;
  name: string;
  domain: string;
  tagline: string;
  badge: string;
  color: string;
  components: string[];
  role: string;
  catalogCount: string;
}

export const ECOSYSTEM_SITES: Record<string, EcosystemSisterSite> = {
  'multi-motors': {
    id: 'multi-motors',
    name: 'Multi-Motors.fr',
    domain: 'https://multi-motors.fr',
    tagline: 'Le plus grand catalogue & banc de test mondial pour moteurs brushless FPV',
    badge: 'CATALOGUE MOTEURS',
    color: 'from-amber-500 to-orange-600',
    components: ['motors', 'motor'],
    role: 'Base de données moteurs (13 824+ références répertoriées, KV, poids, poussée & dimensions)',
    catalogCount: '13 824+ moteurs répertoriés'
  },
  'bindmyquad': {
    id: 'bindmyquad',
    name: 'BindMyQuad.fr',
    domain: 'https://bindmyquad.fr',
    tagline: 'Liaisons radio, récepteurs ELRS/Crossfire & antennes de contrôle',
    badge: 'CATALOGUE RADIO & RX',
    color: 'from-blue-500 to-indigo-600',
    components: ['radio', 'tango', 'rx', 'antenna-rx'],
    role: 'Base de données protocoles RF, firmwares EdgeTX/ELRS & compatibilité émetteurs/récepteurs',
    catalogCount: '480+ radios, récepteurs & antennes'
  },
  'makemyframe': {
    id: 'makemyframe',
    name: 'MakeMyFrame.fr',
    domain: 'https://makemyframe.fr',
    tagline: 'Châssis carbone, géométries True-X/Deadcat, pièces TPU & hélices',
    badge: 'CATALOGUE FRAME & CARBONE',
    color: 'from-zinc-700 to-neutral-900',
    components: ['frame'],
    role: 'Catalogue géométries True-X/Deadcat, carbone T700, fichiers STL & hélices',
    catalogCount: '620+ châssis & spares'
  },
  'findmyquad': {
    id: 'findmyquad',
    name: 'FindMyQuad.fr',
    domain: 'https://findmyquad.fr',
    tagline: 'Systèmes de localisation, buzzers autonomes & balises GPS Rescue',
    badge: 'CATALOGUE SÉCURITÉ & GPS',
    color: 'from-emerald-500 to-teal-600',
    components: ['gps', 'vifly'],
    role: 'Catalogue modules GPS M10/M8, buzzers LiPo autonomes & sécurité anti-perte',
    catalogCount: '190+ balises GPS & buzzers'
  },
  'camyquad': {
    id: 'camyquad',
    name: 'CamYQuad.fr',
    domain: 'https://camyquad.fr',
    tagline: 'Transmission vidéo HD & analogique, caméras, VTX et masques FPV',
    badge: 'CATALOGUE VIDÉO HD/ANALOGIQUE',
    color: 'from-rose-500 to-red-600',
    components: ['vtx', 'cam', 'antenna-vtx', 'goggle'],
    role: 'Catalogue DJI O3/O4, Walksnail, HDZero, VTX analogiques 5.8GHz & capteurs caméra',
    catalogCount: '510+ VTX, caméras & lunettes'
  },
  'makemyquad': {
    id: 'makemyquad',
    name: 'MakeMyQuad.fr',
    domain: 'https://makemyquad.fr',
    tagline: 'Stacks électroniques, ESC 4-en-1, contrôleurs FC, LiPo & configuration',
    badge: 'CATALOGUE STACKS & ÉLECTRONIQUE',
    color: 'from-purple-500 to-indigo-700',
    components: ['fc', 'esc', 'lipo', 'configurator', 'betaflight'],
    role: 'Catalogue stacks F405/F722/H7, ampérages ESC, batteries haute décharge & firmwares',
    catalogCount: '840+ stacks, ESC & batteries'
  }
};

export function getSisterSiteForComponent(compId: string): EcosystemSisterSite | undefined {
  const normalized = compId.toLowerCase();
  return Object.values(ECOSYSTEM_SITES).find(site =>
    site.components.some(c => c.toLowerCase() === normalized)
  );
}
