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
import { BrandLogo } from '@/components/BrandLogos';
import {
  CheckCircle2,
  Crosshair,
  ArrowUpRight,
  Sparkles,
  Radio,
  Glasses,
  Cpu,
  ChevronRight,
  Flame,
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
}

// 13 composants vectorisés fidèles du drone sur le blueprint (moteur dérivé de multi-motors.fr)
const DRONE_COMPONENT_CONFIGS: ComponentVisualConfig[] = [
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
  // 4. Moteur Brushless 2207 (Logo Multi-Motors.fr Vectorisé) : 145 × 158 à (542, 890)
  {
    id: 'motor',
    image: '/images/components/motor.svg',
    x: 542,
    y: 890,
    width: 145,
    height: 158,
    labelX: 613,
    labelY: 1065,
    label: 'MOTEUR BRUSHLESS (MULTI-MOTORS)',
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
  // 9. Antenne RX Immortal-T (Dipôle) : 440 × 26 à (945, 200)
  {
    id: 'antenna-rx',
    image: '/images/components/antenna-rx.svg',
    x: 945,
    y: 200,
    width: 440,
    height: 26,
    labelX: 1165,
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
  // 13. Batterie LiPo 6S (node 2004-10) : 192 × 437 à (1141, 588)
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
];

export function MonochromeDetailedCanvas({
  onSelectComponent,
  selectedCompId,
}: MonochromeDetailedCanvasProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Marques sélectionnées pour les 3 éléments génériques externes
  const [selectedGoggleBrand, setSelectedGoggleBrand] = useState<string>('fatshark');
  const [selectedRadioBrand, setSelectedRadioBrand] = useState<string>('tbs');
  const [selectedConfigBrand, setSelectedConfigBrand] = useState<string>('betaflight');

  // Menus de marques ouverts au survol des 3 boutons de droite
  const [hoveredButton, setHoveredButton] = useState<'goggles' | 'radio' | 'config' | null>(null);

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

  return (
    <section className="flex-1 w-full flex flex-col items-center justify-center p-1 sm:p-4 select-none bg-white">
      
      {/* Conteneur principal style Multi-Motors : fond papier pur, bordure pointillée, typo technique */}
      <div className="relative w-full max-w-[1562px] aspect-[1562/904] bg-[#ffffff] border-[1.5px] border-dashed border-black/75 rounded-3xl p-2 sm:p-4 flex items-center justify-center overflow-visible shadow-xs">
        
        {/* Grille technique d'atelier FPV style SEEWORLD & Multi-Motors */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 rounded-3xl overflow-hidden"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #71717a 0.8px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Lignes directrices CAO d'alignement centrées sur le châssis */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25 rounded-3xl" viewBox="340 160 1562 904">
          <line x1="768" y1="160" x2="768" y2="1080" stroke="#71717a" strokeWidth="1" strokeDasharray="6 8" />
          <line x1="340" y1="580" x2="1900" y2="580" stroke="#71717a" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="768" cy="580" r="335" fill="none" stroke="#71717a" strokeWidth="0.8" strokeDasharray="4 6" />
        </svg>

        {/* SVG Vectoriel Haute Fidélité du Drone (les 13 composants embarqués) */}
        <svg
          viewBox="340 160 1562 904"
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

            {/* Surbrillance au survol rouge corail style Multi-Motors */}
            <filter id="hoverGlow" x="-12%" y="-12%" width="124%" height="124%">
              <feDropShadow dx="0" dy="2" stdDeviation="7" floodColor="#ff5757" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* ====================================================================
              LIGNES DE CÂBLAGE & REPÉRAGE TECHNIQUE DU BLUEPRINT
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
          </g>

          {/* ====================================================================
              13 COMPOSANTS DU DRONE VECTORISÉS (Moteur Multi-Motors.fr)
             ==================================================================== */}
          {DRONE_COMPONENT_CONFIGS.map((comp) => {
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
                {/* Zone réactive cliquable */}
                <rect
                  x={comp.x - 6}
                  y={comp.y - 6}
                  width={comp.width + 12}
                  height={comp.height + 12}
                  rx="10"
                  fill={active ? 'rgba(255, 87, 87, 0.06)' : 'transparent'}
                  stroke={isSelected ? '#2563eb' : isHov ? '#ff5757' : 'transparent'}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  strokeDasharray={isHov && !isSelected ? '4 4' : undefined}
                  className="transition-colors duration-150"
                />

                {/* VECTEUR AUTHENTIQUE (Moteur Multi-Motors ou Tracé Figma) */}
                <image
                  href={comp.image}
                  x={comp.x}
                  y={comp.y}
                  width={comp.width}
                  height={comp.height}
                  preserveAspectRatio="xMidYMid meet"
                  className="select-none pointer-events-none"
                />

                {/* Étiquette technique style Multi-Motors (pill noir / blanc à contour précis) */}
                <g className={`transition-opacity duration-150 ${active ? 'opacity-100' : 'opacity-85'}`}>
                  <rect
                    x={comp.labelX - 90}
                    y={comp.labelY - 14}
                    width="180"
                    height="24"
                    rx="6"
                    fill={active ? '#ff5757' : '#000000'}
                    stroke={active ? '#000000' : '#000000'}
                    strokeWidth="1.2"
                  />
                  <text
                    x={comp.labelX}
                    y={comp.labelY + 2}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    letterSpacing="0.04em"
                    fill="#ffffff"
                  >
                    {comp.label}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* ====================================================================
            À DROITE : LES 3 BOUTONS D'ÉQUIPEMENTS EXTERNES STYLE MULTI-MOTORS.FR
            (Quand on les survole, affiche les marques avec leur logo)
           ==================================================================== */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3.5 z-40 w-72 sm:w-80">
          
          <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest px-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff5757]" />
            <span>Périphériques & Écosystème</span>
          </div>

          {/* -------------------------------------------------------------
              BOUTON 1 : LUNETTES FPV (Survol -> Marques + Logos)
             ------------------------------------------------------------- */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredButton('goggles')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div
              onClick={() => handleComponentClick('fatshark')}
              className={`p-3.5 rounded-2xl border-[1.5px] transition-all cursor-pointer shadow-md backdrop-blur-md ${
                selectedCompId === 'fatshark' || hoveredButton === 'goggles'
                  ? 'bg-black text-white border-black scale-[1.02]'
                  : 'bg-white hover:bg-zinc-50 text-zinc-900 border-black/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Glasses className={`w-4 h-4 ${hoveredButton === 'goggles' ? 'text-[#ff5757]' : 'text-zinc-700'}`} />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    Lunettes FPV
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ff5757] text-white">
                  {GOGGLE_BRANDS.length} MARQUES
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-dashed border-zinc-300/40 pt-2">
                <div className="flex items-center gap-2">
                  <BrandLogo brandId={selectedGoggleBrand} size={22} />
                  <div>
                    <div className="text-xs font-bold leading-tight">
                      {currentGoggle.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      {currentGoggle.badge}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </div>
            </div>

            {/* Menu dépliant à gauche avec les marques et leurs logos officiels */}
            {hoveredButton === 'goggles' && (
              <div className="absolute right-full top-0 mr-3 w-80 bg-white border-[1.5px] border-black rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-right-2 duration-150">
                <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2.5 px-1 flex items-center justify-between">
                  <span>Choisir un Système Vidéo :</span>
                  <span className="text-[#ff5757] font-bold">1 clic pour activer</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {GOGGLE_BRANDS.map((gb) => (
                    <button
                      key={gb.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGoggleBrand(gb.id);
                        onSelectComponent(getComp('fatshark'));
                        setHoveredButton(null);
                      }}
                      className={`flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer border ${
                        selectedGoggleBrand === gb.id
                          ? 'bg-black text-white border-black shadow-xs'
                          : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-900 border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1 bg-white rounded-lg border border-zinc-200 shadow-2xs">
                          <BrandLogo brandId={gb.id} size={24} />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight">{gb.name}</div>
                          <div className="text-[10px] font-mono text-zinc-500">{gb.brand}</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        selectedGoggleBrand === gb.id ? 'bg-[#ff5757] text-white' : 'bg-zinc-200 text-zinc-700'
                      }`}>
                        {gb.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* -------------------------------------------------------------
              BOUTON 2 : RADIOCOMMANDE (Survol -> Marques + Logos)
             ------------------------------------------------------------- */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredButton('radio')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div
              onClick={() => handleComponentClick('tango')}
              className={`p-3.5 rounded-2xl border-[1.5px] transition-all cursor-pointer shadow-md backdrop-blur-md ${
                selectedCompId === 'tango' || hoveredButton === 'radio'
                  ? 'bg-black text-white border-black scale-[1.02]'
                  : 'bg-white hover:bg-zinc-50 text-zinc-900 border-black/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className={`w-4 h-4 ${hoveredButton === 'radio' ? 'text-[#ff5757]' : 'text-zinc-700'}`} />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    Radiocommande
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ff5757] text-white">
                  {RADIO_BRANDS.length} MARQUES
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-dashed border-zinc-300/40 pt-2">
                <div className="flex items-center gap-2">
                  <BrandLogo brandId={selectedRadioBrand} size={22} />
                  <div>
                    <div className="text-xs font-bold leading-tight">
                      {currentRadio.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      {currentRadio.badge}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </div>
            </div>

            {/* Menu dépliant à gauche avec les marques et leurs logos officiels */}
            {hoveredButton === 'radio' && (
              <div className="absolute right-full top-0 mr-3 w-80 bg-white border-[1.5px] border-black rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-right-2 duration-150">
                <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2.5 px-1 flex items-center justify-between">
                  <span>Choisir une Radiocommande :</span>
                  <span className="text-[#ff5757] font-bold">1 clic pour activer</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {RADIO_BRANDS.map((rb) => (
                    <button
                      key={rb.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRadioBrand(rb.id);
                        onSelectComponent(getComp('tango'));
                        setHoveredButton(null);
                      }}
                      className={`flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer border ${
                        selectedRadioBrand === rb.id
                          ? 'bg-black text-white border-black shadow-xs'
                          : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-900 border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1 bg-white rounded-lg border border-zinc-200 shadow-2xs">
                          <BrandLogo brandId={rb.id} size={24} />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight">{rb.name}</div>
                          <div className="text-[10px] font-mono text-zinc-500">{rb.brand}</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        selectedRadioBrand === rb.id ? 'bg-[#ff5757] text-white' : 'bg-zinc-200 text-zinc-700'
                      }`}>
                        {rb.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* -------------------------------------------------------------
              BOUTON 3 : CONFIGURATEUR / FIRMWARE (Survol -> Marques + Logos)
             ------------------------------------------------------------- */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredButton('config')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div
              onClick={() => handleComponentClick('betaflight')}
              className={`p-3.5 rounded-2xl border-[1.5px] transition-all cursor-pointer shadow-md backdrop-blur-md ${
                selectedCompId === 'betaflight' || hoveredButton === 'config'
                  ? 'bg-black text-white border-black scale-[1.02]'
                  : 'bg-white hover:bg-zinc-50 text-zinc-900 border-black/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className={`w-4 h-4 ${hoveredButton === 'config' ? 'text-[#ff5757]' : 'text-zinc-700'}`} />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    Firmware / Config
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ff5757] text-white">
                  {CONFIGURATOR_BRANDS.length} FIRMWARES
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-dashed border-zinc-300/40 pt-2">
                <div className="flex items-center gap-2">
                  <BrandLogo brandId={selectedConfigBrand} size={22} />
                  <div>
                    <div className="text-xs font-bold leading-tight">
                      {currentConfig.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      {currentConfig.badge}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </div>
            </div>

            {/* Menu dépliant à gauche avec les firmwares et leurs logos officiels */}
            {hoveredButton === 'config' && (
              <div className="absolute right-full top-0 mr-3 w-80 bg-white border-[1.5px] border-black rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-right-2 duration-150">
                <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2.5 px-1 flex items-center justify-between">
                  <span>Choisir un Firmware de Vol :</span>
                  <span className="text-[#ff5757] font-bold">1 clic pour activer</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {CONFIGURATOR_BRANDS.map((cb) => (
                    <button
                      key={cb.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedConfigBrand(cb.id);
                        onSelectComponent(getComp('betaflight'));
                        setHoveredButton(null);
                      }}
                      className={`flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer border ${
                        selectedConfigBrand === cb.id
                          ? 'bg-black text-white border-black shadow-xs'
                          : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-900 border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1 bg-white rounded-lg border border-zinc-200 shadow-2xs">
                          <BrandLogo brandId={cb.id} size={24} />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight">{cb.name}</div>
                          <div className="text-[10px] font-mono text-zinc-500">{cb.brand}</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        selectedConfigBrand === cb.id ? 'bg-[#ff5757] text-white' : 'bg-zinc-200 text-zinc-700'
                      }`}>
                        {cb.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Infobulle technique dynamique au survol des composants du drone */}
        {hoveredId && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border-[1.5px] border-dashed border-black rounded-2xl p-4 shadow-2xl pointer-events-none animate-in fade-in duration-150 max-w-sm z-30">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase">
              <span className="flex items-center gap-1.5 text-black font-bold">
                <Crosshair className="w-3.5 h-3.5 text-black" />
                {getComp(hoveredId).category}
              </span>
              <span className="text-white bg-[#ff5757] px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                {getComp(hoveredId).commonIssues.length} pannes
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

        {/* Repère d'atelier discret en bas à gauche style Multi-Motors */}
        <div className="absolute bottom-3 left-4 bg-white/95 px-3 py-1.5 rounded-xl border border-black/30 text-[11px] text-zinc-700 flex items-center gap-2 pointer-events-none shadow-xs">
          <Flame className="w-3.5 h-3.5 text-[#ff5757]" />
          <span>Style technique Multi-Motors.fr • Moteur vectoriel • Périphériques avec logos à droite</span>
        </div>

      </div>

      {/* Barre d'état sous le schéma */}
      <div className="w-full max-w-[1562px] mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 border-t-[1.5px] border-dashed border-black/30 pt-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-black uppercase tracking-wider text-[11px]">
            Équipements actifs :
          </span>
          <span className="italic text-[11px]">
            Lunettes : <b className="text-black">{currentGoggle.name}</b> • Radio : <b className="text-black">{currentRadio.name}</b> • Firmware : <b className="text-black">{currentConfig.name}</b>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-black font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5757]" />
          <span>Moteur Multi-Motors vectorisé • 14 Marques avec logos intégrés</span>
        </div>
      </div>
    </section>
  );
}
