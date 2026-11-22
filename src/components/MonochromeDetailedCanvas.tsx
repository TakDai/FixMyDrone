'use client';

import React, { useState, useEffect } from 'react';
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
  // 1. Châssis Carbone True-X : 768 × 670, centre (720, 515)
  {
    id: 'frame',
    image: '/images/components/frame.svg?v=5',
    x: 336,
    y: 180,
    width: 768,
    height: 670,
    labelX: 720,
    labelY: 865,
    label: 'CHÂSSIS CARBONE TRUE-X',
  },
  // 2. Contrôleur de Vol FC : 146 × 148 à (420, 410)
  {
    id: 'fc',
    image: '/images/components/fc.svg?v=3',
    x: 420,
    y: 410,
    width: 146,
    height: 148,
    labelX: 493,
    labelY: 580,
    label: 'FC F7 30.5x30.5',
  },
  // 3. Variateur ESC 4-en-1 : 165 × 155 à (855, 405)
  {
    id: 'esc',
    image: '/images/components/esc.svg?v=3',
    x: 855,
    y: 405,
    width: 165,
    height: 155,
    labelX: 937,
    labelY: 580,
    label: 'ESC 4-EN-1 55A',
  },
  // 4. Moteur Brushless 2207 : 150 × 150 à (310, 730)
  {
    id: 'motor',
    image: '/images/components/motor.svg?v=3',
    x: 310,
    y: 730,
    width: 150,
    height: 150,
    labelX: 385,
    labelY: 900,
    label: 'MOTEUR BRUSHLESS 2207',
  },
  // 5. Caméra FPV Micro : 90 × 112 à (675, 120)
  {
    id: 'cam',
    image: '/images/components/camera.svg?v=3',
    x: 675,
    y: 120,
    width: 90,
    height: 112,
    labelX: 720,
    labelY: 250,
    label: 'CAMÉRA FPV MICRO',
  },
  // 6. Émetteur Vidéo VTX : 90 × 145 à (180, 180)
  {
    id: 'vtx',
    image: '/images/components/vtx.svg?v=3',
    x: 180,
    y: 180,
    width: 90,
    height: 145,
    labelX: 225,
    labelY: 345,
    label: 'VTX 5.8GHZ 1W',
  },
  // 7. Module GPS : 78 × 83 à (421, 80)
  {
    id: 'gps',
    image: '/images/components/gps.svg?v=3',
    x: 421,
    y: 80,
    width: 78,
    height: 83,
    labelX: 460,
    labelY: 185,
    label: 'GPS M10 & BOUSSOLE',
  },
  // 8. Récepteur RX ELRS : 70 × 125 à (945, 80)
  {
    id: 'rx',
    image: '/images/components/rx.svg?v=3',
    x: 945,
    y: 80,
    width: 70,
    height: 125,
    labelX: 980,
    labelY: 225,
    label: 'RÉCEPTEUR RX ELRS',
  },
  // 9. Antenne RX Immortal-T (Dipôle) : 440 × 100 à (500, 10)
  {
    id: 'antenna-rx',
    image: '/images/components/antenna-rx.svg?v=3',
    x: 500,
    y: 10,
    width: 440,
    height: 100,
    labelX: 720,
    labelY: 25,
    label: 'ANTENNE IMMORTAL-T',
  },
  // 10. Antenne VTX RHCP Lollipop : 55 × 275 à (1140, 140)
  {
    id: 'antenna-vtx',
    image: '/images/components/antenna-vtx.svg?v=5',
    x: 1140,
    y: 140,
    width: 55,
    height: 275,
    labelX: 1167,
    labelY: 435,
    label: 'ANTENNE RHCP VTX',
  },
  // 11. Condensateur Low ESR : 55 × 55 à (140, 480)
  {
    id: 'condo',
    image: '/images/components/condo.svg?v=3',
    x: 140,
    y: 480,
    width: 55,
    height: 55,
    labelX: 167,
    labelY: 555,
    label: 'CONDENSATEUR LOW ESR',
  },
  // 12. Buzzer ViFly : 55 × 95 à (692.5, 850)
  {
    id: 'vifly',
    image: '/images/components/vifly.svg?v=3',
    x: 692.5,
    y: 850,
    width: 55,
    height: 95,
    labelX: 720,
    labelY: 965,
    label: 'BUZZER AUTONOME',
  },
  // 13. Batterie LiPo 6S : 140 × 320 à (1020, 620)
  {
    id: 'lipo',
    image: '/images/components/lipo.svg?v=3',
    x: 1020,
    y: 620,
    width: 140,
    height: 320,
    labelX: 1090,
    labelY: 960,
    label: 'BATTERIE LIPO 6S XT60',
  },
];

const getPillWidth = (id: string): number => {
  switch (id) {
    case 'vtx': return 138;
    case 'vifly': return 142;
    case 'cam': return 152;
    case 'fc': return 152;
    case 'rx': return 150;
    case 'gps': return 154;
    case 'antenna-vtx': return 154;
    case 'antenna-rx': return 158;
    case 'condo': return 162;
    case 'esc': return 164;
    case 'frame': return 164;
    case 'motor': return 168;
    case 'lipo': return 172;
    default: return 156;
  }
};

export function MonochromeDetailedCanvas({
  onSelectComponent,
  selectedCompId,
}: MonochromeDetailedCanvasProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Index actifs pour l'animation de fondu enchaîné sans survol
  const [goggleIdx, setGoggleIdx] = useState(0);
  const [radioIdx, setRadioIdx] = useState(0);
  const [configIdx, setConfigIdx] = useState(0);
  const [hoveredStation, setHoveredStation] = useState<'goggle' | 'radio' | 'config' | null>(null);

  // Changement en fondu automatique sans survol (décalé pour un rendu fluide et vivant)
  useEffect(() => {
    const goggleTimer = setInterval(() => {
      setGoggleIdx((prev) => (hoveredStation === 'goggle' ? prev : (prev + 1) % GOGGLE_BRANDS.length));
    }, 2800);

    let radioTimer: NodeJS.Timeout;
    const radioTimeout = setTimeout(() => {
      radioTimer = setInterval(() => {
        setRadioIdx((prev) => (hoveredStation === 'radio' ? prev : (prev + 1) % RADIO_BRANDS.length));
      }, 2800);
    }, 900);

    let configTimer: NodeJS.Timeout;
    const configTimeout = setTimeout(() => {
      configTimer = setInterval(() => {
        setConfigIdx((prev) => (hoveredStation === 'config' ? prev : (prev + 1) % CONFIGURATOR_BRANDS.length));
      }, 2800);
    }, 1800);

    return () => {
      clearInterval(goggleTimer);
      clearTimeout(radioTimeout);
      clearInterval(radioTimer);
      clearTimeout(configTimeout);
      clearInterval(configTimer);
    };
  }, [hoveredStation]);

  const currentGoggle = GOGGLE_BRANDS[goggleIdx] || GOGGLE_BRANDS[0];
  const currentRadio = RADIO_BRANDS[radioIdx] || RADIO_BRANDS[0];
  const currentConfig = CONFIGURATOR_BRANDS[configIdx] || CONFIGURATOR_BRANDS[0];

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
      <div className="relative w-full max-w-[1780px] aspect-[1680/980] bg-white flex items-center justify-center overflow-visible">

        {/* SVG Vectoriel Haute Fidélité du Drone (les 13 composants embarqués) */}
        <svg
          viewBox="0 0 1680 980"
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

                {/* Étiquette technique Haute Précision : Noire sur Blanc, Typographie Suisse / CAD Ultra-Design */}
                <g
                  className="transition-all duration-150"
                  style={{
                    filter: isSelected
                      ? 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.22))'
                      : isHov
                      ? 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.14))'
                      : 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.08))',
                    transform: active ? 'scale(1.03)' : 'scale(1)',
                    transformOrigin: `${comp.labelX}px ${comp.labelY}px`,
                  }}
                >
                  <rect
                    x={comp.labelX - pillW / 2}
                    y={comp.labelY - 13}
                    width={pillW}
                    height="26"
                    rx="13"
                    fill="#ffffff"
                    stroke="#000000"
                    strokeWidth={isSelected ? '2.5' : isHov ? '2' : '1.5'}
                    className="transition-all duration-150"
                  />
                  <text
                    x={comp.labelX}
                    y={comp.labelY + 3.5}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif"
                    fontWeight="800"
                    letterSpacing="0.05em"
                    fill="#000000"
                    className="select-none pointer-events-none"
                  >
                    {comp.label}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* ====================================================================
            À DROITE : JUSTE LE LOGO (MINIMALISTE & DESIGN CAD)
            FONDU ENCHAÎNÉ SANS SURVOL • AFFICHAGE DES AUTRES MARQUES AU SURVOL
           ==================================================================== */}
        <div className="absolute right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-7 sm:gap-9 z-40 select-none">
          
          {/* STATION 1 : LUNETTES FPV */}
          <div
            className="relative flex flex-col items-center group cursor-pointer"
            onMouseEnter={() => setHoveredStation('goggle')}
            onMouseLeave={() => setHoveredStation(null)}
          >
            {/* Bouton épuré contenant JUSTE LE LOGO avec fondu enchaîné */}
            <div
              onClick={() => {
                handleComponentClick('fatshark');
              }}
              className="relative w-28 h-20 sm:w-32 sm:h-22 bg-white border-2 border-black rounded-2xl flex items-center justify-center p-3 shadow-xs hover:shadow-md hover:scale-105 transition-all"
              title="Lunettes FPV - Cliquer pour diagnostiquer"
            >
              {GOGGLE_BRANDS.map((gb, i) => (
                <div
                  key={gb.id}
                  className="absolute inset-0 flex items-center justify-center p-2.5 transition-opacity duration-700 ease-in-out pointer-events-none"
                  style={{
                    opacity: i === goggleIdx ? 1 : 0,
                  }}
                >
                  <BrandLogo brandId={gb.id} width={64} height={40} />
                </div>
              ))}
            </div>

            {/* Étiquette capsule noir sur blanc haute précision */}
            <span className="mt-2 px-3.5 py-0.5 rounded-full bg-white text-black border-[1.5px] border-black font-mono text-[9.5px] font-black uppercase tracking-wider shadow-2xs group-hover:scale-105 transition-transform">
              Lunettes FPV
            </span>

            {/* Au survol : affiche les autres marques (dock horizontal ultra-design vers la gauche) */}
            {hoveredStation === 'goggle' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white border-2 border-black rounded-2xl p-2 shadow-2xl z-50 flex items-center gap-1.5 animate-in fade-in slide-in-from-right-3 duration-150 before:absolute before:inset-y-0 before:-right-4 before:w-4 before:content-['']"
              >
                <span className="text-[9px] font-mono font-bold uppercase text-zinc-400 pl-1 pr-2.5 border-r border-zinc-200 whitespace-nowrap shrink-0">
                  Marques :
                </span>
                {GOGGLE_BRANDS.map((gb, i) => (
                  <button
                    key={gb.id}
                    onClick={() => {
                      setGoggleIdx(i);
                      handleComponentClick('fatshark');
                    }}
                    className={`flex flex-col items-center justify-center w-14 h-14 p-1 rounded-xl border-2 transition-all cursor-pointer ${
                      i === goggleIdx
                        ? 'bg-zinc-100 border-black ring-2 ring-black font-bold shadow-xs scale-105'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                    }`}
                    title={gb.name}
                  >
                    <div className="w-full h-8 flex items-center justify-center">
                      <BrandLogo brandId={gb.id} width={38} height={22} />
                    </div>
                    <span className="text-[8px] font-mono font-black uppercase text-zinc-800 truncate w-full text-center mt-0.5">
                      {gb.brand}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* STATION 2 : RADIOCOMMANDE */}
          <div
            className="relative flex flex-col items-center group cursor-pointer"
            onMouseEnter={() => setHoveredStation('radio')}
            onMouseLeave={() => setHoveredStation(null)}
          >
            {/* Bouton épuré contenant JUSTE LE LOGO avec fondu enchaîné */}
            <div
              onClick={() => {
                handleComponentClick('tango');
              }}
              className="relative w-28 h-20 sm:w-32 sm:h-22 bg-white border-2 border-black rounded-2xl flex items-center justify-center p-3 shadow-xs hover:shadow-md hover:scale-105 transition-all"
              title="Radiocommande - Cliquer pour diagnostiquer"
            >
              {RADIO_BRANDS.map((rb, i) => (
                <div
                  key={rb.id}
                  className="absolute inset-0 flex items-center justify-center p-2.5 transition-opacity duration-700 ease-in-out pointer-events-none"
                  style={{
                    opacity: i === radioIdx ? 1 : 0,
                  }}
                >
                  <BrandLogo brandId={rb.id} width={64} height={40} />
                </div>
              ))}
            </div>

            {/* Étiquette capsule noir sur blanc haute précision */}
            <span className="mt-2 px-3.5 py-0.5 rounded-full bg-white text-black border-[1.5px] border-black font-mono text-[9.5px] font-black uppercase tracking-wider shadow-2xs group-hover:scale-105 transition-transform">
              Radiocommande
            </span>

            {/* Au survol : affiche les autres marques (dock horizontal ultra-design vers la gauche) */}
            {hoveredStation === 'radio' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white border-2 border-black rounded-2xl p-2 shadow-2xl z-50 flex items-center gap-1.5 animate-in fade-in slide-in-from-right-3 duration-150 before:absolute before:inset-y-0 before:-right-4 before:w-4 before:content-['']"
              >
                <span className="text-[9px] font-mono font-bold uppercase text-zinc-400 pl-1 pr-2.5 border-r border-zinc-200 whitespace-nowrap shrink-0">
                  Marques :
                </span>
                {RADIO_BRANDS.map((rb, i) => (
                  <button
                    key={rb.id}
                    onClick={() => {
                      setRadioIdx(i);
                      handleComponentClick('tango');
                    }}
                    className={`flex flex-col items-center justify-center w-14 h-14 p-1 rounded-xl border-2 transition-all cursor-pointer ${
                      i === radioIdx
                        ? 'bg-zinc-100 border-black ring-2 ring-black font-bold shadow-xs scale-105'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                    }`}
                    title={rb.name}
                  >
                    <div className="w-full h-8 flex items-center justify-center">
                      <BrandLogo brandId={rb.id} width={42} height={22} />
                    </div>
                    <span className="text-[8px] font-mono font-black uppercase text-zinc-800 truncate w-full text-center mt-0.5">
                      {rb.brand}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* STATION 3 : CONFIGURATEUR */}
          <div
            className="relative flex flex-col items-center group cursor-pointer"
            onMouseEnter={() => setHoveredStation('config')}
            onMouseLeave={() => setHoveredStation(null)}
          >
            {/* Bouton épuré contenant JUSTE LE LOGO avec fondu enchaîné */}
            <div
              onClick={() => {
                handleComponentClick('betaflight');
              }}
              className="relative w-28 h-20 sm:w-32 sm:h-22 bg-white border-2 border-black rounded-2xl flex items-center justify-center p-3 shadow-xs hover:shadow-md hover:scale-105 transition-all"
              title="Configurateur - Cliquer pour diagnostiquer"
            >
              {CONFIGURATOR_BRANDS.map((cb, i) => (
                <div
                  key={cb.id}
                  className="absolute inset-0 flex items-center justify-center p-2.5 transition-opacity duration-700 ease-in-out pointer-events-none"
                  style={{
                    opacity: i === configIdx ? 1 : 0,
                  }}
                >
                  <BrandLogo brandId={cb.id} width={64} height={40} />
                </div>
              ))}
            </div>

            {/* Étiquette capsule noir sur blanc haute précision */}
            <span className="mt-2 px-3.5 py-0.5 rounded-full bg-white text-black border-[1.5px] border-black font-mono text-[9.5px] font-black uppercase tracking-wider shadow-2xs group-hover:scale-105 transition-transform">
              Configurateur
            </span>

            {/* Au survol : affiche les autres marques (dock horizontal ultra-design vers la gauche) */}
            {hoveredStation === 'config' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white border-2 border-black rounded-2xl p-2 shadow-2xl z-50 flex items-center gap-1.5 animate-in fade-in slide-in-from-right-3 duration-150 before:absolute before:inset-y-0 before:-right-4 before:w-4 before:content-['']"
              >
                <span className="text-[9px] font-mono font-bold uppercase text-zinc-400 pl-1 pr-2.5 border-r border-zinc-200 whitespace-nowrap shrink-0">
                  Marques :
                </span>
                {CONFIGURATOR_BRANDS.map((cb, i) => (
                  <button
                    key={cb.id}
                    onClick={() => {
                      setConfigIdx(i);
                      handleComponentClick('betaflight');
                    }}
                    className={`flex flex-col items-center justify-center w-14 h-14 p-1 rounded-xl border-2 transition-all cursor-pointer ${
                      i === configIdx
                        ? 'bg-zinc-100 border-black ring-2 ring-black font-bold shadow-xs scale-105'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                    }`}
                    title={cb.name}
                  >
                    <div className="w-full h-8 flex items-center justify-center">
                      <BrandLogo brandId={cb.id} width={38} height={22} />
                    </div>
                    <span className="text-[8px] font-mono font-black uppercase text-zinc-800 truncate w-full text-center mt-0.5">
                      {cb.brand}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
