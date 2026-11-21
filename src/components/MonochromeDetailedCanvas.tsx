'use client';

import React, { useState } from 'react';
import {
  FIGMA_COMPONENTS,
  FigmaComponentData,
  GOGGLE_BRANDS,
  RADIO_BRANDS,
  CONFIGURATOR_BRANDS,
  ComponentBrandOption,
} from '@/data/figmaComponents';
import {
  CheckCircle2,
  Crosshair,
  ArrowUpRight,
  Sparkles,
  Radio,
  Glasses,
  Cpu,
} from 'lucide-react';

interface MonochromeDetailedCanvasProps {
  onSelectComponent: (comp: FigmaComponentData) => void;
  selectedCompId?: string;
}

interface ComponentVisualConfig {
  id: string;
  image: string;
  x: number;
  y: number;
  width: number;
  height: number;
  labelX: number;
  labelY: number;
  label: string;
  isGeneric?: boolean;
}

// 16 composants vectorisés fidèles à 100% positionnés selon la maquette Figma (viewBox 358 176 1562 904)
const COMPONENT_CONFIGS: ComponentVisualConfig[] = [
  // 1. Châssis Carbone True-X (node 2004-5) : 768 × 670, centre (768, 580)
  {
    id: 'frame',
    image: '/images/components/frame.svg',
    x: 384,
    y: 245,
    width: 768,
    height: 670,
    labelX: 768,
    labelY: 900,
    label: 'CHÂSSIS CARBONE TRUE-X',
  },
  // 2. Contrôleur de Vol FC (node 2004-4) : 146 × 148 à (467, 491)
  {
    id: 'fc',
    image: '/images/components/fc.svg',
    x: 467,
    y: 491,
    width: 146,
    height: 148,
    labelX: 540,
    labelY: 660,
    label: 'FC F7 30.5x30.5',
  },
  // 3. Variateur ESC 4-en-1 (node 2004-6) : 165 × 155 à (925, 510)
  {
    id: 'esc',
    image: '/images/components/esc.svg',
    x: 925,
    y: 510,
    width: 165,
    height: 155,
    labelX: 1007,
    labelY: 685,
    label: 'ESC 4-EN-1 55A',
  },
  // 4. Moteur Brushless 2207 (node 2004-7) : 143 × 159 à (542, 890)
  {
    id: 'motor',
    image: '/images/components/motor.svg',
    x: 542,
    y: 890,
    width: 143,
    height: 159,
    labelX: 613,
    labelY: 1065,
    label: 'MOTEURS 2207 1950KV',
  },
  // 5. Caméra FPV Micro (node 2004-2) : 93 × 77 à (804, 945)
  {
    id: 'cam',
    image: '/images/components/camera.svg',
    x: 804,
    y: 945,
    width: 93,
    height: 77,
    labelX: 850,
    labelY: 1040,
    label: 'CAMÉRA FPV MICRO',
  },
  // 6. Émetteur Vidéo VTX (node 2004-9) : 89 × 145 à (572, 218)
  {
    id: 'vtx',
    image: '/images/components/vtx.svg',
    x: 572,
    y: 218,
    width: 89,
    height: 145,
    labelX: 616,
    labelY: 382,
    label: 'VTX 5.8GHZ 1W',
  },
  // 7. Module GPS (node 2004-16) : 77 × 83 à (735, 186)
  {
    id: 'gps',
    image: '/images/components/gps.svg',
    x: 735,
    y: 186,
    width: 77,
    height: 83,
    labelX: 773,
    labelY: 286,
    label: 'GPS M10 & BOUSSOLE',
  },
  // 8. Récepteur RX ELRS (node 2004-8) : 64 × 114 à (856, 232)
  {
    id: 'rx',
    image: '/images/components/rx.svg',
    x: 856,
    y: 232,
    width: 64,
    height: 114,
    labelX: 888,
    labelY: 362,
    label: 'RÉCEPTEUR RX ELRS',
  },
  // 9. Antenne RX Immortal-T (Dipôle) : 639 × 38 à (945, 200)
  {
    id: 'antenna-rx',
    image: '/images/components/antenna-rx.svg',
    x: 945,
    y: 200,
    width: 639,
    height: 38,
    labelX: 1264,
    labelY: 190,
    label: 'ANTENNE IMMORTAL-T',
  },
  // 10. Antenne VTX RHCP Lollipop (node 2004-3) : 56 × 427 à (1315, 262)
  {
    id: 'antenna-vtx',
    image: '/images/components/antenna-vtx.svg',
    x: 1315,
    y: 262,
    width: 56,
    height: 427,
    labelX: 1343,
    labelY: 710,
    label: 'ANTENNE RHCP VTX',
  },
  // 11. Condensateur Low ESR (node 2004-13) : 32 × 54 à (394, 541)
  {
    id: 'condo',
    image: '/images/components/condo.svg',
    x: 394,
    y: 541,
    width: 32,
    height: 54,
    labelX: 410,
    labelY: 614,
    label: 'CONDENSATEUR LOW ESR',
  },
  // 12. Buzzer ViFly (node 2004-17) : 52 × 92 à (878, 754)
  {
    id: 'vifly',
    image: '/images/components/vifly.svg',
    x: 878,
    y: 754,
    width: 52,
    height: 92,
    labelX: 904,
    labelY: 866,
    label: 'BUZZER AUTONOME',
  },
  // 13. Configurateur & Firmware (node 2004-14) : 172 × 168 à (1627, 196)
  {
    id: 'betaflight',
    image: '/images/components/betaflight.svg',
    x: 1627,
    y: 196,
    width: 172,
    height: 168,
    labelX: 1713,
    labelY: 382,
    label: 'CONFIGURATEUR',
    isGeneric: true,
  },
  // 14. Radiocommande Multi-Marques (node 2004-12) : 404 × 354 à (1432, 386)
  {
    id: 'tango',
    image: '/images/components/tango.svg',
    x: 1432,
    y: 386,
    width: 404,
    height: 354,
    labelX: 1634,
    labelY: 755,
    label: 'RADIOCOMMANDE',
    isGeneric: true,
  },
  // 15. Batterie LiPo 6S (node 2004-10) : 192 × 437 à (1141, 588)
  {
    id: 'lipo',
    image: '/images/components/lipo.svg',
    x: 1141,
    y: 588,
    width: 192,
    height: 437,
    labelX: 1237,
    labelY: 1042,
    label: 'BATTERIE LIPO 6S XT60',
  },
  // 16. Lunettes FPV Multi-Systèmes (node 2004-11) : 503 × 224 à (1401, 766)
  {
    id: 'fatshark',
    image: '/images/components/fatshark.svg',
    x: 1401,
    y: 766,
    width: 503,
    height: 224,
    labelX: 1652,
    labelY: 1010,
    label: 'LUNETTES FPV',
    isGeneric: true,
  },
];

export function MonochromeDetailedCanvas({
  onSelectComponent,
  selectedCompId,
}: MonochromeDetailedCanvasProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Marques sélectionnées pour les 3 éléments génériques
  const [selectedGoggleBrand, setSelectedGoggleBrand] = useState<string>('fatshark');
  const [selectedRadioBrand, setSelectedRadioBrand] = useState<string>('tbs');
  const [selectedConfigBrand, setSelectedConfigBrand] = useState<string>('betaflight');

  // Affichage des menus au survol
  const [hoverGoggleMenu, setHoverGoggleMenu] = useState(false);
  const [hoverRadioMenu, setHoverRadioMenu] = useState(false);
  const [hoverConfigMenu, setHoverConfigMenu] = useState(false);

  const currentGoggle = GOGGLE_BRANDS.find((b) => b.id === selectedGoggleBrand) || GOGGLE_BRANDS[0];
  const currentRadio = RADIO_BRANDS.find((b) => b.id === selectedRadioBrand) || RADIO_BRANDS[0];
  const currentConfig = CONFIGURATOR_BRANDS.find((b) => b.id === selectedConfigBrand) || CONFIGURATOR_BRANDS[0];

  const getComp = (id: string): FigmaComponentData => {
    const base = FIGMA_COMPONENTS.find((c) => c.id === id) || FIGMA_COMPONENTS[0];

    if (id === 'fatshark' && currentGoggle) {
      return {
        ...base,
        name: currentGoggle.name,
        model: currentGoggle.model,
        description: currentGoggle.description,
        specifications: currentGoggle.specifications,
        commonIssues: currentGoggle.commonIssues,
      };
    }
    if (id === 'tango' && currentRadio) {
      return {
        ...base,
        name: currentRadio.name,
        model: currentRadio.model,
        description: currentRadio.description,
        specifications: currentRadio.specifications,
        commonIssues: currentRadio.commonIssues,
      };
    }
    if (id === 'betaflight' && currentConfig) {
      return {
        ...base,
        name: currentConfig.name,
        model: currentConfig.model,
        description: currentConfig.description,
        specifications: currentConfig.specifications,
        commonIssues: currentConfig.commonIssues,
      };
    }
    return base;
  };

  const handleComponentClick = (id: string) => {
    const comp = getComp(id);
    onSelectComponent(comp);
  };

  const isCurrent = (id: string) => selectedCompId === id || hoveredId === id;

  // Détection visibilité menu marque (survol de l'objet, clic dessus, ou survol du menu)
  const isGoggleMenuVisible = hoverGoggleMenu || hoveredId === 'fatshark' || selectedCompId === 'fatshark';
  const isRadioMenuVisible = hoverRadioMenu || hoveredId === 'tango' || selectedCompId === 'tango';
  const isConfigMenuVisible = hoverConfigMenu || hoveredId === 'betaflight' || selectedCompId === 'betaflight';

  return (
    <section className="flex-1 w-full flex flex-col items-center justify-center p-1 sm:p-4 select-none bg-white">
      {/* Conteneur principal - Proportions 1562:904 conformes à la maquette Figma Home */}
      <div className="relative w-full max-w-[1562px] aspect-[1562/904] bg-[#fafafa] border-[1.5px] border-dashed border-black rounded-3xl p-2 sm:p-4 flex items-center justify-center overflow-hidden shadow-xs">
        
        {/* Grille technique d'atelier FPV style SEEWORLD */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #71717a 0.8px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Lignes directrices CAO d'alignement */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" viewBox="358 176 1562 904">
          <line x1="768" y1="176" x2="768" y2="1080" stroke="#71717a" strokeWidth="1" strokeDasharray="6 8" />
          <line x1="358" y1="580" x2="1920" y2="580" stroke="#71717a" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="768" cy="580" r="335" fill="none" stroke="#71717a" strokeWidth="0.8" strokeDasharray="4 6" />
          <circle cx="1634" cy="563" r="210" fill="none" stroke="#71717a" strokeWidth="0.8" strokeDasharray="4 6" />
        </svg>

        {/* SVG Vectoriel Haute Fidélité */}
        <svg
          viewBox="358 176 1562 904"
          className="w-full h-full select-none"
        >
          <defs>
            {/* Ombre portée réaliste */}
            <filter id="realisticShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.28" />
            </filter>

            {/* Surbrillance bleue de sélection */}
            <filter id="selectGlow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#2563eb" floodOpacity="0.7" />
            </filter>

            {/* Surbrillance dorée au survol */}
            <filter id="hoverGlow" x="-12%" y="-12%" width="124%" height="124%">
              <feDropShadow dx="0" dy="2" stdDeviation="7" floodColor="#000000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* ====================================================================
              LIGNES DE REPÉRAGE CAO & CÂBLAGE ÉLECTRIQUE DU BLUEPRINT
             ==================================================================== */}
          <g className="pointer-events-none opacity-40">
            {/* Ligne Standoffs Frame -> FC -> ESC */}
            <line x1="540" y1="565" x2="768" y2="580" stroke="#52525b" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="1007" y1="587" x2="768" y2="580" stroke="#52525b" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Ligne Moteurs vers Châssis */}
            <line x1="613" y1="890" x2="485" y2="815" stroke="#52525b" strokeWidth="1.5" strokeDasharray="4 4" />
            
            {/* Ligne Caméra vers avant du châssis */}
            <line x1="850" y1="945" x2="768" y2="680" stroke="#52525b" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Ligne VTX vers Stack */}
            <line x1="616" y1="363" x2="768" y2="480" stroke="#52525b" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Ligne GPS vers Châssis arrière */}
            <line x1="773" y1="269" x2="768" y2="380" stroke="#52525b" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Ligne RX vers Stack */}
            <line x1="888" y1="346" x2="768" y2="480" stroke="#52525b" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Câble d'antenne VTX vers VTX */}
            <line x1="1315" y1="475" x2="661" y2="290" stroke="#71717a" strokeWidth="1.2" strokeDasharray="3 3" />

            {/* Câble d'alimentation Condensateur vers ESC */}
            <line x1="426" y1="568" x2="925" y2="587" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Câble ViFly Buzzer vers FC */}
            <line x1="878" y1="800" x2="613" y2="565" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Câble LiPo XT60 vers ESC */}
            <line x1="1141" y1="806" x2="1090" y2="587" stroke="#eab308" strokeWidth="2" strokeDasharray="5 5" />

            {/* Liaison Onde Radio 2.4GHz / ELRS vers RX */}
            <path d="M 1432 563 Q 1160 400 920 289" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 6" />

            {/* Liaison Vidéo 5.8GHz vers Lunettes */}
            <path d="M 1401 878 Q 1358 700 1343 475" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 6" />

            {/* Liaison USB-C Configurateur vers FC */}
            <path d="M 1627 280 Q 1100 240 613 540" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="6 6" />
          </g>

          {/* ====================================================================
              16 COMPOSANTS VECTORISÉS AUTHENTIQUES (100% SVG FIDÈLE FIGMA)
             ==================================================================== */}
          {COMPONENT_CONFIGS.map((comp) => {
            const isSelected = selectedCompId === comp.id;
            const isHov = hoveredId === comp.id;
            const active = isSelected || isHov;

            return (
              <g
                key={comp.id}
                id={`comp-${comp.id}`}
                onClick={() => handleComponentClick(comp.id)}
                onMouseEnter={() => setHoveredId(comp.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer transition-all duration-200"
                filter={isSelected ? 'url(#selectGlow)' : isHov ? 'url(#hoverGlow)' : 'url(#realisticShadow)'}
              >
                {/* Zone réactive cliquable avec bordure de repérage CAO */}
                <rect
                  x={comp.x - 6}
                  y={comp.y - 6}
                  width={comp.width + 12}
                  height={comp.height + 12}
                  rx="10"
                  fill={active ? 'rgba(59, 130, 246, 0.05)' : 'transparent'}
                  stroke={isSelected ? '#2563eb' : isHov ? '#000000' : 'transparent'}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  strokeDasharray={isHov && !isSelected ? '4 4' : undefined}
                  className="transition-colors duration-150"
                />

                {/* VECTEUR AUTHENTIQUE ISSU DE LA VECTORISATION DE L'IMAGE FIGMA */}
                <image
                  href={comp.image}
                  x={comp.x}
                  y={comp.y}
                  width={comp.width}
                  height={comp.height}
                  preserveAspectRatio="xMidYMid meet"
                  className="select-none pointer-events-none"
                />

                {/* BADGE SPÉCIFIQUE POUR LES COMPOSANTS GÉNÉRIQUES MULTI-MARQUES */}
                {comp.id === 'fatshark' && (
                  <g className="pointer-events-none">
                    <rect
                      x={comp.x + comp.width / 2 - 110}
                      y={comp.y + comp.height + 12}
                      width="220"
                      height="26"
                      rx="6"
                      fill="#000000"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text
                      x={comp.x + comp.width / 2}
                      y={comp.y + comp.height + 29}
                      textAnchor="middle"
                      fontSize="11"
                      fontFamily="sans-serif"
                      fontWeight="900"
                      fill="#ffffff"
                      letterSpacing="0.05em"
                    >
                      {currentGoggle.badge}
                    </text>
                  </g>
                )}

                {comp.id === 'tango' && (
                  <g className="pointer-events-none">
                    <rect
                      x={comp.x + comp.width / 2 - 95}
                      y={comp.y + comp.height + 12}
                      width="190"
                      height="26"
                      rx="6"
                      fill="#000000"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text
                      x={comp.x + comp.width / 2}
                      y={comp.y + comp.height + 29}
                      textAnchor="middle"
                      fontSize="11"
                      fontFamily="sans-serif"
                      fontWeight="900"
                      fill="#ffffff"
                      letterSpacing="0.05em"
                    >
                      {currentRadio.badge}
                    </text>
                  </g>
                )}

                {comp.id === 'betaflight' && (
                  <g className="pointer-events-none">
                    <rect
                      x={comp.x + comp.width / 2 - 90}
                      y={comp.y + comp.height + 12}
                      width="180"
                      height="26"
                      rx="6"
                      fill="#000000"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text
                      x={comp.x + comp.width / 2}
                      y={comp.y + comp.height + 29}
                      textAnchor="middle"
                      fontSize="11"
                      fontFamily="sans-serif"
                      fontWeight="900"
                      fill="#ffffff"
                      letterSpacing="0.05em"
                    >
                      {currentConfig.badge}
                    </text>
                  </g>
                )}

                {/* Étiquette technique de désignation pour les composants du drone */}
                {!comp.isGeneric && (
                  <g className={`transition-opacity duration-150 ${active ? 'opacity-100' : 'opacity-85'}`}>
                    <rect
                      x={comp.labelX - 85}
                      y={comp.labelY - 14}
                      width="170"
                      height="22"
                      rx="5"
                      fill={active ? '#000000' : '#ffffff'}
                      stroke="#000000"
                      strokeWidth={active ? '2' : '1.2'}
                    />
                    <text
                      x={comp.labelX}
                      y={comp.labelY + 1}
                      textAnchor="middle"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                      letterSpacing="0.04em"
                      fill={active ? '#ffffff' : '#000000'}
                    >
                      {comp.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* ====================================================================
            BARRES DE SÉLECTION FLOTTANTES MULTI-MARQUES (GÉNÉRIQUES)
           ==================================================================== */}

        {/* 1. Sélecteur de Marque : LUNETTES FPV (Positionné sur les lunettes) */}
        <div
          onMouseEnter={() => setHoverGoggleMenu(true)}
          onMouseLeave={() => setHoverGoggleMenu(false)}
          className={`absolute bottom-5 right-6 bg-white/95 backdrop-blur-md border-[1.5px] border-black rounded-2xl p-3 shadow-2xl transition-all duration-200 z-40 ${
            isGoggleMenuVisible ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2 px-1">
            <span className="flex items-center gap-1.5 text-black">
              <Glasses className="w-3.5 h-3.5 text-black" />
              <span>Système Vidéo FPV :</span>
            </span>
            <span className="text-zinc-600 font-bold bg-zinc-100 px-1.5 py-0.5 rounded text-[9px]">
              {GOGGLE_BRANDS.length} Marques
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 max-w-[380px]">
            {GOGGLE_BRANDS.map((gb) => (
              <button
                key={gb.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedGoggleBrand(gb.id);
                  onSelectComponent(getComp('fatshark'));
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  selectedGoggleBrand === gb.id
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300'
                }`}
              >
                {gb.brand}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Sélecteur de Marque : RADIOCOMMANDE (Positionné sur la radiocommande) */}
        <div
          onMouseEnter={() => setHoverRadioMenu(true)}
          onMouseLeave={() => setHoverRadioMenu(false)}
          className={`absolute top-84 right-6 bg-white/95 backdrop-blur-md border-[1.5px] border-black rounded-2xl p-3 shadow-2xl transition-all duration-200 z-40 ${
            isRadioMenuVisible ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2 px-1">
            <span className="flex items-center gap-1.5 text-black">
              <Radio className="w-3.5 h-3.5 text-black" />
              <span>Radiocommande & Protocole :</span>
            </span>
            <span className="text-zinc-600 font-bold bg-zinc-100 px-1.5 py-0.5 rounded text-[9px]">
              {RADIO_BRANDS.length} Marques
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 max-w-[380px]">
            {RADIO_BRANDS.map((rb) => (
              <button
                key={rb.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRadioBrand(rb.id);
                  onSelectComponent(getComp('tango'));
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  selectedRadioBrand === rb.id
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300'
                }`}
              >
                {rb.brand}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Sélecteur de Firmware : CONFIGURATEUR (En haut à droite) */}
        <div
          onMouseEnter={() => setHoverConfigMenu(true)}
          onMouseLeave={() => setHoverConfigMenu(false)}
          className={`absolute top-5 right-6 bg-white/95 backdrop-blur-md border-[1.5px] border-black rounded-2xl p-3 shadow-2xl transition-all duration-200 z-40 ${
            isConfigMenuVisible ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2 px-1">
            <span className="flex items-center gap-1.5 text-black">
              <Cpu className="w-3.5 h-3.5 text-black" />
              <span>Firmware & Configurateur :</span>
            </span>
            <span className="text-zinc-600 font-bold bg-zinc-100 px-1.5 py-0.5 rounded text-[9px]">
              {CONFIGURATOR_BRANDS.length} Firmwares
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 max-w-[380px]">
            {CONFIGURATOR_BRANDS.map((cb) => (
              <button
                key={cb.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedConfigBrand(cb.id);
                  onSelectComponent(getComp('betaflight'));
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  selectedConfigBrand === cb.id
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300'
                }`}
              >
                {cb.brand}
              </button>
            ))}
          </div>
        </div>

        {/* Infobulle technique dynamique au survol */}
        {hoveredId && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border-[1.5px] border-dashed border-black rounded-2xl p-4 shadow-2xl pointer-events-none animate-in fade-in duration-150 max-w-sm z-30">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase">
              <span className="flex items-center gap-1.5 text-black font-bold">
                <Crosshair className="w-3.5 h-3.5 text-black" />
                {getComp(hoveredId).category}
              </span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                {getComp(hoveredId).commonIssues.length} pannes répertoriées
              </span>
            </div>
            <h4 className="text-base font-bold text-black mt-2">
              {getComp(hoveredId).name}
            </h4>
            <p className="text-xs text-zinc-600 italic mt-1 leading-snug">
              {getComp(hoveredId).role}
            </p>
            <div className="mt-3 pt-2.5 border-t border-dashed border-zinc-300 flex items-center justify-between text-[11px] text-black font-semibold">
              <span className="text-zinc-600">Cliquer pour ouvrir le diagnostic</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </div>
          </div>
        )}

        {/* Repère d'atelier discret en bas à gauche */}
        <div className="absolute bottom-3 left-4 bg-white/95 px-3 py-1.5 rounded-xl border border-black/30 text-[11px] text-zinc-700 flex items-center gap-2 pointer-events-none shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Vecteurs SVG fidèles 1:1 • Écosystèmes multi-marques configurables</span>
        </div>

      </div>

      {/* Barre d'état sous le schéma */}
      <div className="w-full max-w-[1562px] mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 border-t-[1.5px] border-dashed border-black/30 pt-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-black uppercase tracking-wider text-[11px]">
            Sélection Actuelle :
          </span>
          <span className="italic text-[11px]">
            Lunettes : <b className="text-black">{currentGoggle.name}</b> • Radio : <b className="text-black">{currentRadio.name}</b> • Firmware : <b className="text-black">{currentConfig.name}</b>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-black font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>16 Composants Vectorisés • Base de diagnostics synchronisée</span>
        </div>
      </div>
    </section>
  );
}
