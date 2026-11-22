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
  Radio,
  Glasses,
  Cpu,
  ChevronRight,
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
                {/* Zone réactive cliquable invisible : aucun encadré au survol */}
                <rect
                  x={comp.x - 6}
                  y={comp.y - 6}
                  width={comp.width + 12}
                  height={comp.height + 12}
                  fill="transparent"
                  stroke="none"
                  pointerEvents="all"
                />

                {/* VECTEUR AUTHENTIQUE : Surbrillance du contour de l'objet au survol & sélection */}
                <image
                  href={comp.image}
                  x={comp.x}
                  y={comp.y}
                  width={comp.width}
                  height={comp.height}
                  preserveAspectRatio="xMidYMid meet"
                  className="select-none pointer-events-none transition-all duration-150"
                  style={{
                    filter: isSelected
                      ? 'drop-shadow(0 0 3px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 7px rgba(0, 0, 0, 0.45))'
                      : isHov
                      ? 'drop-shadow(0 0 2.5px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 5px rgba(0, 0, 0, 0.35))'
                      : 'none',
                  }}
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
            À DROITE : VRAIS BOUTONS AVEC LOGO (LUNETTES, RADIO, CONFIGURATEUR)
            STYLE ÉPURÉ MONOCHROME SANS SURCHARGE DE CARTES
           ==================================================================== */}
        <div className="absolute right-2 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-40 w-[360px] sm:w-[400px] lg:w-[430px] select-none">
          
          <div className="flex items-center justify-between px-1">
            <div className="text-xs sm:text-sm font-mono font-black text-black uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black" />
              <span>Écosystème Pilote</span>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-0.5 rounded-full bg-black text-white shadow-2xs">
              14 Marques
            </span>
          </div>

          {/* -------------------------------------------------------------
              GROUPE 1 : BOUTONS LUNETTES FPV (5 Marques avec logo)
             ------------------------------------------------------------- */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-2">
                <Glasses className="w-4 h-4 text-black" />
                <span className="text-xs font-mono font-black uppercase tracking-wider text-black">
                  Lunettes FPV
                </span>
                <span className="text-[11px] font-mono font-bold text-zinc-400">
                  • {currentGoggle.name}
                </span>
              </div>
              <button
                onClick={() => handleComponentClick('fatshark')}
                className="text-[11px] font-mono font-bold text-zinc-600 hover:text-black flex items-center gap-0.5 cursor-pointer transition-colors"
                title="Diagnostiquer les lunettes"
              >
                <span>Diagnostic</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Vrais boutons avec logo */}
            <div className="grid grid-cols-5 gap-2">
              {GOGGLE_BRANDS.map((gb) => {
                const isSelected = selectedGoggleBrand === gb.id;
                return (
                  <button
                    key={gb.id}
                    onClick={() => {
                      if (isSelected) {
                        handleComponentClick('fatshark');
                      } else {
                        setSelectedGoggleBrand(gb.id);
                      }
                    }}
                    className={`relative flex flex-col items-center justify-center h-20 px-1 rounded-2xl transition-all cursor-pointer border-2 group ${
                      isSelected
                        ? 'bg-zinc-100 border-black ring-2 ring-black shadow-sm scale-[1.03]'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black hover:shadow-xs active:scale-95'
                    }`}
                    title={`${gb.brand} - ${gb.name} (Cliquer pour sélectionner / diagnostiquer)`}
                  >
                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 rounded-full bg-black text-white text-[7px] font-mono font-black tracking-wider shadow-2xs">
                        ACTIF
                      </span>
                    )}
                    <div className="w-full h-10 flex items-center justify-center transition-transform group-hover:scale-105">
                      <BrandLogo brandId={gb.id} width={54} height={34} />
                    </div>
                    <span className="text-[9px] font-mono font-black uppercase text-zinc-800 tracking-tight leading-none mt-1 truncate max-w-full text-center">
                      {gb.brand}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------------------
              GROUPE 2 : BOUTONS RADIOCOMMANDE (4 Marques avec logo)
             ------------------------------------------------------------- */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-black" />
                <span className="text-xs font-mono font-black uppercase tracking-wider text-black">
                  Radiocommande
                </span>
                <span className="text-[11px] font-mono font-bold text-zinc-400">
                  • {currentRadio.name}
                </span>
              </div>
              <button
                onClick={() => handleComponentClick('tango')}
                className="text-[11px] font-mono font-bold text-zinc-600 hover:text-black flex items-center gap-0.5 cursor-pointer transition-colors"
                title="Diagnostiquer la radio"
              >
                <span>Diagnostic</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Vrais boutons avec logo */}
            <div className="grid grid-cols-4 gap-2">
              {RADIO_BRANDS.map((rb) => {
                const isSelected = selectedRadioBrand === rb.id;
                return (
                  <button
                    key={rb.id}
                    onClick={() => {
                      if (isSelected) {
                        handleComponentClick('tango');
                      } else {
                        setSelectedRadioBrand(rb.id);
                      }
                    }}
                    className={`relative flex flex-col items-center justify-center h-20 px-1 rounded-2xl transition-all cursor-pointer border-2 group ${
                      isSelected
                        ? 'bg-zinc-100 border-black ring-2 ring-black shadow-sm scale-[1.03]'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black hover:shadow-xs active:scale-95'
                    }`}
                    title={`${rb.brand} - ${rb.name} (Cliquer pour sélectionner / diagnostiquer)`}
                  >
                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 rounded-full bg-black text-white text-[7px] font-mono font-black tracking-wider shadow-2xs">
                        ACTIF
                      </span>
                    )}
                    <div className="w-full h-10 flex items-center justify-center transition-transform group-hover:scale-105">
                      <BrandLogo brandId={rb.id} width={58} height={34} />
                    </div>
                    <span className="text-[9px] font-mono font-black uppercase text-zinc-800 tracking-tight leading-none mt-1 truncate max-w-full text-center">
                      {rb.brand}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------------------
              GROUPE 3 : BOUTONS CONFIGURATEUR (5 Marques avec logo)
             ------------------------------------------------------------- */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-black" />
                <span className="text-xs font-mono font-black uppercase tracking-wider text-black">
                  Configurateur
                </span>
                <span className="text-[11px] font-mono font-bold text-zinc-400">
                  • {currentConfig.name}
                </span>
              </div>
              <button
                onClick={() => handleComponentClick('betaflight')}
                className="text-[11px] font-mono font-bold text-zinc-600 hover:text-black flex items-center gap-0.5 cursor-pointer transition-colors"
                title="Diagnostiquer le firmware"
              >
                <span>Diagnostic</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Vrais boutons avec logo */}
            <div className="grid grid-cols-5 gap-2">
              {CONFIGURATOR_BRANDS.map((cb) => {
                const isSelected = selectedConfigBrand === cb.id;
                return (
                  <button
                    key={cb.id}
                    onClick={() => {
                      if (isSelected) {
                        handleComponentClick('betaflight');
                      } else {
                        setSelectedConfigBrand(cb.id);
                      }
                    }}
                    className={`relative flex flex-col items-center justify-center h-20 px-1 rounded-2xl transition-all cursor-pointer border-2 group ${
                      isSelected
                        ? 'bg-zinc-100 border-black ring-2 ring-black shadow-sm scale-[1.03]'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black hover:shadow-xs active:scale-95'
                    }`}
                    title={`${cb.brand} - ${cb.name} (Cliquer pour sélectionner / diagnostiquer)`}
                  >
                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 rounded-full bg-black text-white text-[7px] font-mono font-black tracking-wider shadow-2xs">
                        ACTIF
                      </span>
                    )}
                    <div className="w-full h-10 flex items-center justify-center transition-transform group-hover:scale-105">
                      <BrandLogo brandId={cb.id} width={54} height={34} />
                    </div>
                    <span className="text-[9px] font-mono font-black uppercase text-zinc-800 tracking-tight leading-none mt-1 truncate max-w-full text-center">
                      {cb.brand}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
