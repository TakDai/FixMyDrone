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
    labelY: 890,
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
  // 3. Variateur ESC 4-en-1 : 165 × 155 à (890, 490)
  {
    id: 'esc',
    image: '/images/components/esc.svg?v=3',
    x: 890,
    y: 490,
    width: 165,
    height: 155,
    labelX: 972,
    labelY: 665,
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
    labelY: 1048,
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
  // 7. Module GPS : 78 × 83 à (651, 115)
  {
    id: 'gps',
    image: '/images/components/gps.svg?v=3',
    x: 651,
    y: 115,
    width: 78,
    height: 83,
    labelX: 690,
    labelY: 215,
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
  // 9. Antenne RX Immortal-T (Dipôle) : 440 × 110 à (470, 45)
  {
    id: 'antenna-rx',
    image: '/images/components/antenna-rx.svg?v=3',
    x: 470,
    y: 45,
    width: 440,
    height: 110,
    labelX: 690,
    labelY: 42,
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
  // 12. Buzzer ViFly : 55 × 95 à (825, 760)
  {
    id: 'vifly',
    image: '/images/components/vifly.svg?v=3',
    x: 825,
    y: 760,
    width: 55,
    height: 95,
    labelX: 852,
    labelY: 885,
    label: 'BUZZER AUTONOME',
  },
  // 13. Batterie LiPo 6S : 140 × 320 à (1025, 690)
  {
    id: 'lipo',
    image: '/images/components/lipo.svg?v=3',
    x: 1025,
    y: 690,
    width: 140,
    height: 320,
    labelX: 1095,
    labelY: 1030,
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
            const pillW = comp.id === 'condo' || comp.id === 'vifly' ? 144 : 176;

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
            À DROITE : LES 3 BOUTONS D'ÉQUIPEMENTS EXTERNES STYLE MULTI-MOTORS.FR
            (Survol : grille pure des marques avec le vrai logo officiel)
           ==================================================================== */}
        <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3.5 z-40 w-60 sm:w-64">
          
          <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest px-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-black" />
            <span>Périphériques & Écosystème</span>
          </div>

          {/* -------------------------------------------------------------
              BOUTON 1 : LUNETTES FPV (Grille des vrais logos au survol)
             ------------------------------------------------------------- */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredButton('goggles')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div
              onClick={() => handleComponentClick('fatshark')}
              className={`p-3 rounded-2xl border-[1.5px] transition-all cursor-pointer shadow-md backdrop-blur-md ${
                selectedCompId === 'fatshark' || hoveredButton === 'goggles'
                  ? 'bg-black text-white border-black scale-[1.02]'
                  : 'bg-white hover:bg-zinc-50 text-zinc-900 border-black/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Glasses className="w-4 h-4 text-black" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    Lunettes FPV
                  </span>
                </div>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-black text-white">
                  {GOGGLE_BRANDS.length}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-zinc-100 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-white border border-zinc-200 flex items-center justify-center p-0.5">
                    <BrandLogo brandId={selectedGoggleBrand} size={20} />
                  </div>
                  <div className="text-xs font-bold leading-tight">
                    {currentGoggle.brand}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </div>
            </div>

            {/* GRILLE PURE DES MARQUES AVEC LEUR VRAI LOGO OFFICIEL */}
            {hoveredButton === 'goggles' && (
              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-white border-[1.5px] border-black rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-right-2 duration-150">
                <div className="grid grid-cols-3 gap-2 w-72">
                  {GOGGLE_BRANDS.map((gb) => {
                    const isSelected = selectedGoggleBrand === gb.id;
                    return (
                      <button
                        key={gb.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGoggleBrand(gb.id);
                          onSelectComponent(getComp('fatshark'));
                          setHoveredButton(null);
                        }}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-zinc-100 border-2 border-black shadow-sm ring-2 ring-black'
                            : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black shadow-2xs hover:scale-105'
                        }`}
                        title={gb.name}
                      >
                        <div className="w-12 h-12 flex items-center justify-center p-1">
                          <BrandLogo brandId={gb.id} size={38} />
                        </div>
                        <span className="text-[10px] font-bold font-mono text-zinc-900 mt-1 text-center truncate w-full">
                          {gb.brand}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* -------------------------------------------------------------
              BOUTON 2 : RADIOCOMMANDE (Grille des vrais logos au survol)
             ------------------------------------------------------------- */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredButton('radio')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div
              onClick={() => handleComponentClick('tango')}
              className={`p-3 rounded-2xl border-[1.5px] transition-all cursor-pointer shadow-md backdrop-blur-md ${
                selectedCompId === 'tango' || hoveredButton === 'radio'
                  ? 'bg-black text-white border-black scale-[1.02]'
                  : 'bg-white hover:bg-zinc-50 text-zinc-900 border-black/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-black" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    Radiocommande
                  </span>
                </div>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-black text-white">
                  {RADIO_BRANDS.length}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-zinc-100 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-white border border-zinc-200 flex items-center justify-center p-0.5">
                    <BrandLogo brandId={selectedRadioBrand} size={20} />
                  </div>
                  <div className="text-xs font-bold leading-tight">
                    {currentRadio.brand}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </div>
            </div>

            {/* GRILLE PURE DES MARQUES AVEC LEUR VRAI LOGO OFFICIEL */}
            {hoveredButton === 'radio' && (
              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-white border-[1.5px] border-black rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-right-2 duration-150">
                <div className="grid grid-cols-2 gap-2 w-56">
                  {RADIO_BRANDS.map((rb) => {
                    const isSelected = selectedRadioBrand === rb.id;
                    return (
                      <button
                        key={rb.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRadioBrand(rb.id);
                          onSelectComponent(getComp('tango'));
                          setHoveredButton(null);
                        }}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-zinc-100 border-2 border-black shadow-sm ring-2 ring-black'
                            : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black shadow-2xs hover:scale-105'
                        }`}
                        title={rb.name}
                      >
                        <div className="w-12 h-12 flex items-center justify-center p-1">
                          <BrandLogo brandId={rb.id} size={38} />
                        </div>
                        <span className="text-[10px] font-bold font-mono text-zinc-900 mt-1 text-center truncate w-full">
                          {rb.brand}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* -------------------------------------------------------------
              BOUTON 3 : CONFIGURATEUR / FIRMWARE (Grille des vrais logos au survol)
             ------------------------------------------------------------- */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredButton('config')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div
              onClick={() => handleComponentClick('betaflight')}
              className={`p-3 rounded-2xl border-[1.5px] transition-all cursor-pointer shadow-md backdrop-blur-md ${
                selectedCompId === 'betaflight' || hoveredButton === 'config'
                  ? 'bg-black text-white border-black scale-[1.02]'
                  : 'bg-white hover:bg-zinc-50 text-zinc-900 border-black/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-black" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    Firmware / Config
                  </span>
                </div>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-black text-white">
                  {CONFIGURATOR_BRANDS.length}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-zinc-100 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-white border border-zinc-200 flex items-center justify-center p-0.5">
                    <BrandLogo brandId={selectedConfigBrand} size={20} />
                  </div>
                  <div className="text-xs font-bold leading-tight">
                    {currentConfig.brand}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </div>
            </div>

            {/* GRILLE PURE DES MARQUES AVEC LEUR VRAI LOGO OFFICIEL */}
            {hoveredButton === 'config' && (
              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-white border-[1.5px] border-black rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-right-2 duration-150">
                <div className="grid grid-cols-3 gap-2 w-72">
                  {CONFIGURATOR_BRANDS.map((cb) => {
                    const isSelected = selectedConfigBrand === cb.id;
                    return (
                      <button
                        key={cb.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedConfigBrand(cb.id);
                          onSelectComponent(getComp('betaflight'));
                          setHoveredButton(null);
                        }}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-zinc-100 border-2 border-black shadow-sm ring-2 ring-black'
                            : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black shadow-2xs hover:scale-105'
                        }`}
                        title={cb.name}
                      >
                        <div className="w-12 h-12 flex items-center justify-center p-1">
                          <BrandLogo brandId={cb.id} size={38} />
                        </div>
                        <span className="text-[10px] font-bold font-mono text-zinc-900 mt-1 text-center truncate w-full">
                          {cb.brand}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Infobulle technique dynamique au survol des composants du drone */}
        {hoveredId && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-black rounded-xl p-4 shadow-2xl pointer-events-none animate-in fade-in duration-150 max-w-sm z-30">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase">
              <span className="flex items-center gap-1.5 text-black font-bold">
                <Crosshair className="w-3.5 h-3.5 text-black" />
                {getComp(hoveredId).category}
              </span>
              <span className="text-white bg-black px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                {getComp(hoveredId).commonIssues.length} pannes
              </span>
            </div>
            <h4 className="text-base font-bold text-black mt-2">
              {getComp(hoveredId).name}
            </h4>
            <p className="text-xs text-zinc-600 italic mt-1 leading-snug">
              {getComp(hoveredId).role}
            </p>
            <div className="mt-3 pt-2.5 border-t border-zinc-200 flex items-center justify-between text-[11px] text-black font-semibold">
              <span className="text-zinc-600">Cliquer pour ouvrir le diagnostic</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </div>
          </div>
        )}

      </div>

      {/* Barre d'état sous le schéma */}
      <div className="w-full max-w-[1780px] mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 border-t border-zinc-200 pt-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-black uppercase tracking-wider text-[11px]">
            Équipements actifs :
          </span>
          <span className="italic text-[11px]">
            Lunettes : <b className="text-black">{currentGoggle.name}</b> • Radio : <b className="text-black">{currentRadio.name}</b> • Firmware : <b className="text-black">{currentConfig.name}</b>
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-black font-semibold">
          <span className="flex items-center gap-1.5 text-zinc-700">
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
