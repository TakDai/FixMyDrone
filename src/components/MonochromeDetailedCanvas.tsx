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
  // 1. Châssis Carbone True-X : 768 × 670, centre (640, 580)
  {
    id: 'frame',
    image: '/images/components/frame.svg?v=5',
    x: 256,
    y: 245,
    width: 768,
    height: 670,
    labelX: 640,
    labelY: 860,
    label: 'CHÂSSIS CARBONE TRUE-X',
  },
  // 2. Contrôleur de Vol FC : 146 × 148 à (290, 490)
  {
    id: 'fc',
    image: '/images/components/fc.svg?v=3',
    x: 290,
    y: 490,
    width: 146,
    height: 148,
    labelX: 363,
    labelY: 660,
    label: 'FC F7 30.5x30.5',
  },
  // 3. Variateur ESC 4-en-1 : 165 × 155 à (840, 490)
  {
    id: 'esc',
    image: '/images/components/esc.svg?v=3',
    x: 840,
    y: 490,
    width: 165,
    height: 155,
    labelX: 922,
    labelY: 460,
    label: 'ESC 4-EN-1 55A',
  },
  // 4. Moteur Brushless 2207 (Style Multi-Motors.fr Vectorisé) : 150 × 150 à (370, 890)
  {
    id: 'motor',
    image: '/images/components/motor.svg?v=3',
    x: 370,
    y: 890,
    width: 150,
    height: 150,
    labelX: 445,
    labelY: 1060,
    label: 'MOTEUR BRUSHLESS 2207',
  },
  // 5. Caméra FPV Micro : 90 × 112 à (595, 920)
  {
    id: 'cam',
    image: '/images/components/camera.svg?v=3',
    x: 595,
    y: 920,
    width: 90,
    height: 112,
    labelX: 640,
    labelY: 1050,
    label: 'CAMÉRA FPV MICRO',
  },
  // 6. Émetteur Vidéo VTX : 90 × 145 à (290, 130)
  {
    id: 'vtx',
    image: '/images/components/vtx.svg?v=3',
    x: 290,
    y: 130,
    width: 90,
    height: 145,
    labelX: 335,
    labelY: 295,
    label: 'VTX 5.8GHZ 1W',
  },
  // 7. Module GPS : 78 × 83 à (601, 125)
  {
    id: 'gps',
    image: '/images/components/gps.svg?v=3',
    x: 601,
    y: 125,
    width: 78,
    height: 83,
    labelX: 640,
    labelY: 225,
    label: 'GPS M10 & BOUSSOLE',
  },
  // 8. Récepteur RX ELRS : 70 × 125 à (870, 130)
  {
    id: 'rx',
    image: '/images/components/rx.svg?v=3',
    x: 870,
    y: 130,
    width: 70,
    height: 125,
    labelX: 905,
    labelY: 275,
    label: 'RÉCEPTEUR RX ELRS',
  },
  // 9. Antenne RX Immortal-T (Dipôle) : 440 × 110 à (420, 40)
  {
    id: 'antenna-rx',
    image: '/images/components/antenna-rx.svg?v=3',
    x: 420,
    y: 40,
    width: 440,
    height: 110,
    labelX: 640,
    labelY: 34,
    label: 'ANTENNE IMMORTAL-T',
  },
  // 10. Antenne VTX RHCP Lollipop : 55 × 275 à (1010, 70)
  {
    id: 'antenna-vtx',
    image: '/images/components/antenna-vtx.svg?v=5',
    x: 1010,
    y: 70,
    width: 55,
    height: 275,
    labelX: 1035,
    labelY: 360,
    label: 'ANTENNE RHCP VTX',
  },
  // 11. Condensateur Low ESR : 55 × 55 à (135, 535)
  {
    id: 'condo',
    image: '/images/components/condo.svg?v=3',
    x: 135,
    y: 535,
    width: 55,
    height: 55,
    labelX: 162,
    labelY: 610,
    label: 'CONDENSATEUR LOW ESR',
  },
  // 12. Buzzer ViFly : 55 × 95 à (795, 770)
  {
    id: 'vifly',
    image: '/images/components/vifly.svg?v=3',
    x: 795,
    y: 770,
    width: 55,
    height: 95,
    labelX: 822,
    labelY: 890,
    label: 'BUZZER AUTONOME',
  },
  // 13. Batterie LiPo 6S : 140 × 320 à (960, 715)
  {
    id: 'lipo',
    image: '/images/components/lipo.svg?v=3',
    x: 960,
    y: 715,
    width: 140,
    height: 320,
    labelX: 1030,
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
      <div className="relative w-full max-w-[1780px] aspect-[1860/1040] bg-white flex items-center justify-center overflow-visible">

        {/* SVG Vectoriel Haute Fidélité du Drone (les 13 composants embarqués) */}
        <svg
          viewBox="40 20 1860 1060"
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
        <div className="absolute right-2 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3.5 sm:gap-4 z-40 w-[360px] sm:w-[400px] lg:w-[430px] select-none">
          
          <div className="flex items-center justify-between px-1">
            <div className="text-xs sm:text-sm font-mono font-black text-black uppercase tracking-wider flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-black ring-4 ring-black/10 animate-pulse" />
              <span>Écosystème Pilote</span>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black text-white shadow-xs">
              14 Marques
            </span>
          </div>

          {/* -------------------------------------------------------------
              BLOC 1 : LUNETTES FPV (5 Marques avec logo en évidence)
             ------------------------------------------------------------- */}
          <div className="bg-white border-2 border-black rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5 text-black">
                <Glasses className="w-5 h-5 text-black" />
                <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider">
                  Lunettes FPV
                </span>
              </div>
              <button
                onClick={() => handleComponentClick('fatshark')}
                className="text-xs font-mono font-bold text-zinc-500 hover:text-black flex items-center gap-1 transition-colors group cursor-pointer"
                title="Diagnostiquer"
              >
                <span>Diagnostic</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Marque active en grand */}
            <div
              onClick={() => handleComponentClick('fatshark')}
              className="flex items-center gap-3.5 p-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl cursor-pointer border-2 border-zinc-200 hover:border-black transition-all mb-3.5"
            >
              <div className="w-20 h-14 bg-white border-2 border-zinc-200 rounded-xl flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                <BrandLogo brandId={selectedGoggleBrand} width={64} height={42} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm sm:text-base font-black text-black truncate leading-tight">
                  {currentGoggle.name}
                </div>
                <div className="text-xs text-zinc-500 font-mono font-bold truncate mt-0.5">
                  {currentGoggle.brand} • <span className="text-emerald-600 font-black">Actif</span>
                </div>
              </div>
            </div>

            {/* Grille des 5 logos en évidence */}
            <div className="grid grid-cols-5 gap-2">
              {GOGGLE_BRANDS.map((gb) => {
                const isSelected = selectedGoggleBrand === gb.id;
                return (
                  <button
                    key={gb.id}
                    onClick={() => {
                      setSelectedGoggleBrand(gb.id);
                    }}
                    className={`flex flex-col items-center justify-center h-14 px-1 rounded-xl transition-all cursor-pointer border-2 ${
                      isSelected
                        ? 'bg-zinc-100 border-black ring-2 ring-black scale-105 shadow-xs'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                    }`}
                    title={gb.name}
                  >
                    <div className="w-full h-8 flex items-center justify-center">
                      <BrandLogo brandId={gb.id} width={48} height={28} />
                    </div>
                    <span className="text-[9px] font-mono font-black uppercase text-zinc-700 tracking-tight leading-none mt-0.5 truncate w-full text-center">
                      {gb.brand}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------------------
              BLOC 2 : RADIOCOMMANDE (4 Marques avec logo en évidence)
             ------------------------------------------------------------- */}
          <div className="bg-white border-2 border-black rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5 text-black">
                <Radio className="w-5 h-5 text-black" />
                <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider">
                  Radiocommande
                </span>
              </div>
              <button
                onClick={() => handleComponentClick('tango')}
                className="text-xs font-mono font-bold text-zinc-500 hover:text-black flex items-center gap-1 transition-colors group cursor-pointer"
                title="Diagnostiquer"
              >
                <span>Diagnostic</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Marque active en grand */}
            <div
              onClick={() => handleComponentClick('tango')}
              className="flex items-center gap-3.5 p-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl cursor-pointer border-2 border-zinc-200 hover:border-black transition-all mb-3.5"
            >
              <div className="w-20 h-14 bg-white border-2 border-zinc-200 rounded-xl flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                <BrandLogo brandId={selectedRadioBrand} width={64} height={42} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm sm:text-base font-black text-black truncate leading-tight">
                  {currentRadio.name}
                </div>
                <div className="text-xs text-zinc-500 font-mono font-bold truncate mt-0.5">
                  {currentRadio.brand} • <span className="text-emerald-600 font-black">Actif</span>
                </div>
              </div>
            </div>

            {/* Grille des 4 logos en évidence */}
            <div className="grid grid-cols-4 gap-2">
              {RADIO_BRANDS.map((rb) => {
                const isSelected = selectedRadioBrand === rb.id;
                return (
                  <button
                    key={rb.id}
                    onClick={() => {
                      setSelectedRadioBrand(rb.id);
                    }}
                    className={`flex flex-col items-center justify-center h-14 px-1 rounded-xl transition-all cursor-pointer border-2 ${
                      isSelected
                        ? 'bg-zinc-100 border-black ring-2 ring-black scale-105 shadow-xs'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                    }`}
                    title={rb.name}
                  >
                    <div className="w-full h-8 flex items-center justify-center">
                      <BrandLogo brandId={rb.id} width={52} height={28} />
                    </div>
                    <span className="text-[9px] font-mono font-black uppercase text-zinc-700 tracking-tight leading-none mt-0.5 truncate w-full text-center">
                      {rb.brand}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------------------
              BLOC 3 : CONFIGURATEUR / FIRMWARE (5 Marques avec logo en évidence)
             ------------------------------------------------------------- */}
          <div className="bg-white border-2 border-black rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5 text-black">
                <Cpu className="w-5 h-5 text-black" />
                <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider">
                  Configurateur
                </span>
              </div>
              <button
                onClick={() => handleComponentClick('betaflight')}
                className="text-xs font-mono font-bold text-zinc-500 hover:text-black flex items-center gap-1 transition-colors group cursor-pointer"
                title="Diagnostiquer"
              >
                <span>Diagnostic</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Marque active en grand */}
            <div
              onClick={() => handleComponentClick('betaflight')}
              className="flex items-center gap-3.5 p-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl cursor-pointer border-2 border-zinc-200 hover:border-black transition-all mb-3.5"
            >
              <div className="w-20 h-14 bg-white border-2 border-zinc-200 rounded-xl flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                <BrandLogo brandId={selectedConfigBrand} width={64} height={42} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm sm:text-base font-black text-black truncate leading-tight">
                  {currentConfig.name}
                </div>
                <div className="text-xs text-zinc-500 font-mono font-bold truncate mt-0.5">
                  {currentConfig.brand} • <span className="text-emerald-600 font-black">Actif</span>
                </div>
              </div>
            </div>

            {/* Grille des 5 logos en évidence */}
            <div className="grid grid-cols-5 gap-2">
              {CONFIGURATOR_BRANDS.map((cb) => {
                const isSelected = selectedConfigBrand === cb.id;
                return (
                  <button
                    key={cb.id}
                    onClick={() => {
                      setSelectedConfigBrand(cb.id);
                    }}
                    className={`flex flex-col items-center justify-center h-14 px-1 rounded-xl transition-all cursor-pointer border-2 ${
                      isSelected
                        ? 'bg-zinc-100 border-black ring-2 ring-black scale-105 shadow-xs'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                    }`}
                    title={cb.name}
                  >
                    <div className="w-full h-8 flex items-center justify-center">
                      <BrandLogo brandId={cb.id} width={48} height={28} />
                    </div>
                    <span className="text-[9px] font-mono font-black uppercase text-zinc-700 tracking-tight leading-none mt-0.5 truncate w-full text-center">
                      {cb.brand}
                    </span>
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
