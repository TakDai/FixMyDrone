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
  // 1. Châssis Carbone True-X : 768 × 670, centre (690, 580)
  {
    id: 'frame',
    image: '/images/components/frame.svg?v=5',
    x: 306,
    y: 245,
    width: 768,
    height: 670,
    labelX: 690,
    labelY: 860,
    label: 'CHÂSSIS CARBONE TRUE-X',
  },
  // 2. Contrôleur de Vol FC : 146 × 148 à (340, 490)
  {
    id: 'fc',
    image: '/images/components/fc.svg?v=3',
    x: 340,
    y: 490,
    width: 146,
    height: 148,
    labelX: 413,
    labelY: 660,
    label: 'FC F7 30.5x30.5',
  },
  // 3. Variateur ESC 4-en-1 : 165 × 155 à (890, 490) - Label placé au-dessus (y: 460) pour dégager la LiPo
  {
    id: 'esc',
    image: '/images/components/esc.svg?v=3',
    x: 890,
    y: 490,
    width: 165,
    height: 155,
    labelX: 972,
    labelY: 460,
    label: 'ESC 4-EN-1 55A',
  },
  // 4. Moteur Brushless 2207 (Style Multi-Motors.fr Vectorisé) : 150 × 150 à (420, 890)
  {
    id: 'motor',
    image: '/images/components/motor.svg?v=3',
    x: 420,
    y: 890,
    width: 150,
    height: 150,
    labelX: 495,
    labelY: 1060,
    label: 'MOTEUR BRUSHLESS 2207',
  },
  // 5. Caméra FPV Micro : 90 × 112 à (645, 920)
  {
    id: 'cam',
    image: '/images/components/camera.svg?v=3',
    x: 645,
    y: 920,
    width: 90,
    height: 112,
    labelX: 690,
    labelY: 1050,
    label: 'CAMÉRA FPV MICRO',
  },
  // 6. Émetteur Vidéo VTX : 90 × 145 à (340, 130)
  {
    id: 'vtx',
    image: '/images/components/vtx.svg?v=3',
    x: 340,
    y: 130,
    width: 90,
    height: 145,
    labelX: 385,
    labelY: 295,
    label: 'VTX 5.8GHZ 1W',
  },
  // 7. Module GPS : 78 × 83 à (651, 125)
  {
    id: 'gps',
    image: '/images/components/gps.svg?v=3',
    x: 651,
    y: 125,
    width: 78,
    height: 83,
    labelX: 690,
    labelY: 225,
    label: 'GPS M10 & BOUSSOLE',
  },
  // 8. Récepteur RX ELRS : 70 × 125 à (920, 130)
  {
    id: 'rx',
    image: '/images/components/rx.svg?v=3',
    x: 920,
    y: 130,
    width: 70,
    height: 125,
    labelX: 955,
    labelY: 275,
    label: 'RÉCEPTEUR RX ELRS',
  },
  // 9. Antenne RX Immortal-T (Dipôle) : 440 × 110 à (470, 40)
  {
    id: 'antenna-rx',
    image: '/images/components/antenna-rx.svg?v=3',
    x: 470,
    y: 40,
    width: 440,
    height: 110,
    labelX: 690,
    labelY: 34,
    label: 'ANTENNE IMMORTAL-T',
  },
  // 10. Antenne VTX RHCP Lollipop : 55 × 275 à (1090, 70)
  {
    id: 'antenna-vtx',
    image: '/images/components/antenna-vtx.svg?v=5',
    x: 1090,
    y: 70,
    width: 55,
    height: 275,
    labelX: 1117,
    labelY: 360,
    label: 'ANTENNE RHCP VTX',
  },
  // 11. Condensateur Low ESR : 55 × 55 à (185, 535)
  {
    id: 'condo',
    image: '/images/components/condo.svg?v=3',
    x: 185,
    y: 535,
    width: 55,
    height: 55,
    labelX: 212,
    labelY: 610,
    label: 'CONDENSATEUR LOW ESR',
  },
  // 12. Buzzer ViFly : 55 × 95 à (845, 770) - Décalé pour 40px de marge avec la caméra
  {
    id: 'vifly',
    image: '/images/components/vifly.svg?v=3',
    x: 845,
    y: 770,
    width: 55,
    height: 95,
    labelX: 872,
    labelY: 890,
    label: 'BUZZER AUTONOME',
  },
  // 13. Batterie LiPo 6S : 140 × 320 à (1025, 715) - Décalée à y: 715 pour 70px de marge sous l'ESC
  {
    id: 'lipo',
    image: '/images/components/lipo.svg?v=3',
    x: 1025,
    y: 715,
    width: 140,
    height: 320,
    labelX: 1095,
    labelY: 1055,
    label: 'BATTERIE LIPO 6S XT60',
  },
];

const getPillWidth = (id: string): number => {
  switch (id) {
    case 'vifly': return 134;
    case 'vtx': return 136;
    case 'esc': return 142;
    case 'condo': return 144;
    case 'rx': return 144;
    case 'cam': return 146;
    case 'fc': return 148;
    case 'gps': return 150;
    case 'antenna-vtx': return 150;
    case 'antenna-rx': return 154;
    case 'frame': return 164;
    case 'motor': return 168;
    case 'lipo': return 168;
    default: return 156;
  }
};

export function MonochromeDetailedCanvas({
  onSelectComponent,
  selectedCompId,
}: MonochromeDetailedCanvasProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Marques sélectionnées pour les 3 éléments génériques externes
  const [selectedGoggleBrand, setSelectedGoggleBrand] = useState<string>('fatshark');
  const [selectedRadioBrand, setSelectedRadioBrand] = useState<string>('tbs');
  const [selectedConfigBrand, setSelectedConfigBrand] = useState<string>('betaflight');

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

  const hoveredComp = hoveredId ? getComp(hoveredId) : null;

  return (
    <section className="flex-1 w-full flex flex-col items-center justify-center select-none bg-white">
      
      {/* Conteneur principal plein écran style pur : fond blanc pur sans bordure ni pointillés */}
      <div className="relative w-full max-w-[1780px] aspect-[1560/960] bg-white flex items-center justify-center overflow-visible">

        {/* SVG Vectoriel Haute Fidélité du Drone (les 13 composants embarqués) */}
        <svg
          viewBox="100 20 1560 1060"
          className="w-full h-full select-none"
        >
          {/* ====================================================================
              13 COMPOSANTS DU DRONE VECTORISÉS (STYLE MULTI-MOTORS PUR SANS OMBRE)
             ==================================================================== */}
          {DRONE_COMPONENT_CONFIGS.map((comp) => {
            const isSelected = selectedCompId === comp.id;
            const isHov = hoveredId === comp.id;
            const active = isSelected || isHov;
            const pillW = getPillWidth(comp.id);

            return (
              <g
                key={comp.id}
                id={`comp-${comp.id}`}
                onClick={() => handleComponentClick(comp.id)}
                onMouseEnter={() => setHoveredId(comp.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer transition-all duration-200"
              >
                {/* Zone réactive cliquable (Zero ombres / pur trait Multi-Motors) */}
                <rect
                  x={comp.x - 6}
                  y={comp.y - 6}
                  width={comp.width + 12}
                  height={comp.height + 12}
                  rx="10"
                  fill={isSelected ? 'rgba(0, 0, 0, 0.06)' : isHov ? 'rgba(0, 0, 0, 0.03)' : 'transparent'}
                  stroke={isSelected ? '#000000' : isHov ? '#000000' : 'transparent'}
                  strokeWidth={isSelected ? '3' : '1.5'}
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
                    x={comp.labelX - pillW / 2}
                    y={comp.labelY - 14}
                    width={pillW}
                    height="24"
                    rx="6"
                    fill={isSelected ? '#000000' : isHov ? '#27272a' : '#000000'}
                    stroke="#000000"
                    strokeWidth="1.2"
                  />
                  <text
                    x={comp.labelX}
                    y={comp.labelY + 2}
                    textAnchor="middle"
                    fontSize="9"
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
            À DROITE : SÉLECTION ÉCOSYSTÈME PILOTE (LUNETTES, RADIO, CONFIGURATEUR)
            LOGOS EN ÉVIDENCE & AUCUNE SUPERPOSITION SUR LE SCHÉMA
           ==================================================================== */}
        <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3.5 z-40 w-72 sm:w-80 select-none">
          
          <div className="flex items-center justify-between px-1">
            <div className="text-[11px] font-mono font-bold text-black uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black" />
              <span>Écosystème Pilote</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black text-white">
              14 Marques
            </span>
          </div>

          {/* -------------------------------------------------------------
              BLOC 1 : LUNETTES FPV (5 Marques avec logo en évidence)
             ------------------------------------------------------------- */}
          <div className="bg-white border-[1.5px] border-black rounded-2xl p-3 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-black">
                <Glasses className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Lunettes FPV
                </span>
              </div>
              <button
                onClick={() => handleComponentClick('fatshark')}
                className="text-[10px] font-mono font-bold text-zinc-500 hover:text-black flex items-center gap-0.5"
                title="Diagnostiquer"
              >
                <span>Diagnostic</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Marque active en grand */}
            <div
              onClick={() => handleComponentClick('fatshark')}
              className="flex items-center gap-2.5 p-2 bg-zinc-50 hover:bg-zinc-100 rounded-xl cursor-pointer border border-zinc-200 transition-colors mb-2.5"
            >
              <div className="w-14 h-11 bg-white border border-zinc-200 rounded-lg flex items-center justify-center p-1 shrink-0">
                <BrandLogo brandId={selectedGoggleBrand} width={48} height={32} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-black truncate">
                  {currentGoggle.name}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono truncate">
                  {currentGoggle.brand} • Actif
                </div>
              </div>
            </div>

            {/* Grille des 5 logos en évidence */}
            <div className="grid grid-cols-5 gap-1.5">
              {GOGGLE_BRANDS.map((gb) => {
                const isSelected = selectedGoggleBrand === gb.id;
                return (
                  <button
                    key={gb.id}
                    onClick={() => {
                      setSelectedGoggleBrand(gb.id);
                    }}
                    className={`flex flex-col items-center justify-center h-10 px-0.5 rounded-lg transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-zinc-100 border-2 border-black shadow-xs ring-1 ring-black scale-105'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                    }`}
                    title={gb.name}
                  >
                    <div className="w-full h-7 flex items-center justify-center">
                      <BrandLogo brandId={gb.id} width={38} height={24} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------------------
              BLOC 2 : RADIOCOMMANDE (4 Marques avec logo en évidence)
             ------------------------------------------------------------- */}
          <div className="bg-white border-[1.5px] border-black rounded-2xl p-3 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-black">
                <Radio className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Radiocommande
                </span>
              </div>
              <button
                onClick={() => handleComponentClick('tango')}
                className="text-[10px] font-mono font-bold text-zinc-500 hover:text-black flex items-center gap-0.5"
                title="Diagnostiquer"
              >
                <span>Diagnostic</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Marque active en grand */}
            <div
              onClick={() => handleComponentClick('tango')}
              className="flex items-center gap-2.5 p-2 bg-zinc-50 hover:bg-zinc-100 rounded-xl cursor-pointer border border-zinc-200 transition-colors mb-2.5"
            >
              <div className="w-14 h-11 bg-white border border-zinc-200 rounded-lg flex items-center justify-center p-1 shrink-0">
                <BrandLogo brandId={selectedRadioBrand} width={48} height={32} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-black truncate">
                  {currentRadio.name}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono truncate">
                  {currentRadio.brand} • Actif
                </div>
              </div>
            </div>

            {/* Grille des 4 logos en évidence */}
            <div className="grid grid-cols-4 gap-1.5">
              {RADIO_BRANDS.map((rb) => {
                const isSelected = selectedRadioBrand === rb.id;
                return (
                  <button
                    key={rb.id}
                    onClick={() => {
                      setSelectedRadioBrand(rb.id);
                    }}
                    className={`flex flex-col items-center justify-center h-10 px-0.5 rounded-lg transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-zinc-100 border-2 border-black shadow-xs ring-1 ring-black scale-105'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                    }`}
                    title={rb.name}
                  >
                    <div className="w-full h-7 flex items-center justify-center">
                      <BrandLogo brandId={rb.id} width={42} height={24} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------------------
              BLOC 3 : CONFIGURATEUR / FIRMWARE (5 Marques avec logo en évidence)
             ------------------------------------------------------------- */}
          <div className="bg-white border-[1.5px] border-black rounded-2xl p-3 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-black">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Configurateur
                </span>
              </div>
              <button
                onClick={() => handleComponentClick('betaflight')}
                className="text-[10px] font-mono font-bold text-zinc-500 hover:text-black flex items-center gap-0.5"
                title="Diagnostiquer"
              >
                <span>Diagnostic</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Marque active en grand */}
            <div
              onClick={() => handleComponentClick('betaflight')}
              className="flex items-center gap-2.5 p-2 bg-zinc-50 hover:bg-zinc-100 rounded-xl cursor-pointer border border-zinc-200 transition-colors mb-2.5"
            >
              <div className="w-14 h-11 bg-white border border-zinc-200 rounded-lg flex items-center justify-center p-1 shrink-0">
                <BrandLogo brandId={selectedConfigBrand} width={48} height={32} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-black truncate">
                  {currentConfig.name}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono truncate">
                  {currentConfig.brand} • Actif
                </div>
              </div>
            </div>

            {/* Grille des 5 logos en évidence */}
            <div className="grid grid-cols-5 gap-1.5">
              {CONFIGURATOR_BRANDS.map((cb) => {
                const isSelected = selectedConfigBrand === cb.id;
                return (
                  <button
                    key={cb.id}
                    onClick={() => {
                      setSelectedConfigBrand(cb.id);
                    }}
                    className={`flex flex-col items-center justify-center h-10 px-0.5 rounded-lg transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-zinc-100 border-2 border-black shadow-xs ring-1 ring-black scale-105'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                    }`}
                    title={cb.name}
                  >
                    <div className="w-full h-7 flex items-center justify-center">
                      <BrandLogo brandId={cb.id} width={38} height={24} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Barre d'état technique interactive : readout au survol & équipements actifs */}
      <div className="w-full max-w-[1780px] mt-4 flex items-center justify-between gap-3 text-xs text-zinc-600 border-t border-zinc-200 pt-3">
        {hoveredComp ? (
          <div className="flex items-center gap-3 min-w-0 animate-in fade-in duration-150">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black text-white font-mono text-[11px] font-bold shrink-0">
              <Crosshair className="w-3.5 h-3.5" />
              {hoveredComp.category}
            </span>
            <span className="font-bold text-black text-sm shrink-0">
              {hoveredComp.name}
            </span>
            <span className="text-zinc-500 text-xs hidden lg:inline truncate max-w-md xl:max-w-lg">
              — {hoveredComp.role}
            </span>
            <span className="text-zinc-400 text-xs hidden sm:inline">•</span>
            <span className="text-xs font-semibold text-zinc-700 hidden sm:inline shrink-0">
              {hoveredComp.commonIssues.length} pannes
            </span>
            <span className="text-[11px] font-bold text-black bg-zinc-100 hover:bg-zinc-200 px-2.5 py-0.5 rounded border border-zinc-300 ml-1 flex items-center gap-1 shrink-0">
              <span>Diagnostic</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-bold text-black uppercase tracking-wider text-[11px] shrink-0">
              Équipements actifs :
            </span>
            <span className="italic text-[11px] truncate">
              Lunettes : <b className="text-black">{currentGoggle.name}</b> • Radio : <b className="text-black">{currentRadio.name}</b> • Firmware : <b className="text-black">{currentConfig.name}</b>
            </span>
          </div>
        )}

        <div className="flex items-center gap-4 text-[11px] text-black font-semibold shrink-0">
          <span className="flex items-center gap-1.5 text-zinc-700 hidden sm:flex">
            <Flame className="w-3.5 h-3.5 text-black" />
            Style Multi-Motors.fr • 100% Vectoriel CAD
          </span>
          <span className="flex items-center gap-1.5 text-black">
            <CheckCircle2 className="w-3.5 h-3.5 text-black" />
            14 Vrais Logos Officiels
          </span>
        </div>
      </div>
    </section>
  );
}
