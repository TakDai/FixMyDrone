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
// Disposition éclatée CAD pure parfaitement répartie sur toute la surface de la page
// Architecture symétrique et aérée, centrée en (620, 505) avec zéro superposition
const DRONE_COMPONENT_CONFIGS: ComponentVisualConfig[] = [
  // 1. Châssis Carbone True-X : 768 × 670, centre (620, 505)
  {
    id: 'frame',
    image: '/images/components/frame.svg?v=6',
    x: 236,
    y: 170,
    width: 768,
    height: 670,
    labelX: 620,
    labelY: 862,
    label: 'CHÂSSIS',
  },
  // 2. Contrôleur de Vol FC : 146 × 148 à (275, 395) - Éclaté hors de la plaque centrale
  {
    id: 'fc',
    image: '/images/components/fc.svg?v=6',
    x: 275,
    y: 395,
    width: 146,
    height: 148,
    labelX: 348,
    labelY: 575,
    label: 'FC',
  },
  // 3. Variateur ESC 4-en-1 : 165 × 155 à (815, 395) - Éclaté hors de la plaque centrale
  {
    id: 'esc',
    image: '/images/components/esc.svg?v=6',
    x: 815,
    y: 395,
    width: 165,
    height: 155,
    labelX: 897,
    labelY: 578,
    label: 'ESC',
  },
  // 4. Moteur Brushless : 155 × 155 à (60, 645) - Éclaté bas-gauche
  {
    id: 'motor',
    image: '/images/components/motor.svg?v=6',
    x: 60,
    y: 645,
    width: 155,
    height: 155,
    labelX: 137,
    labelY: 830,
    label: 'MOTEUR',
  },
  // 5. Caméra FPV : 84 × 76 à (578, 60) - Éclatée au-dessus du nez
  {
    id: 'cam',
    image: '/images/components/camera.svg?v=6',
    x: 578,
    y: 60,
    width: 84,
    height: 76,
    labelX: 620,
    labelY: 153,
    label: 'CAMÉRA',
  },
  // 6. Émetteur Vidéo VTX : 95 × 145 à (60, 110) - Flanc haut-gauche
  {
    id: 'vtx',
    image: '/images/components/vtx.svg?v=6',
    x: 60,
    y: 110,
    width: 95,
    height: 145,
    labelX: 107,
    labelY: 280,
    label: 'VTX',
  },
  // 7. Module GPS : 78 × 82 à (320, 35) - Flanc avant-gauche
  {
    id: 'gps',
    image: '/images/components/gps.svg?v=6',
    x: 320,
    y: 35,
    width: 78,
    height: 82,
    labelX: 359,
    labelY: 135,
    label: 'GPS',
  },
  // 8. Récepteur RX : 70 × 122 à (840, 35) - Flanc avant-droit
  {
    id: 'rx',
    image: '/images/components/rx.svg?v=6',
    x: 840,
    y: 35,
    width: 70,
    height: 122,
    labelX: 875,
    labelY: 175,
    label: 'RX',
  },
  // 9. Antenne RX (Dipôle) : 440 × 35 à (400, 32) - Centrée au sommet avec marge haute
  {
    id: 'antenna-rx',
    image: '/images/components/antenna-rx.svg?v=6',
    x: 400,
    y: 32,
    width: 440,
    height: 35,
    labelX: 620,
    labelY: 17,
    label: 'ANTENNE',
  },
  // 10. Antenne VTX : 58 × 260 à (1050, 75) - Flanc haut-droit
  {
    id: 'antenna-vtx',
    image: '/images/components/antenna-vtx.svg?v=6',
    x: 1050,
    y: 75,
    width: 58,
    height: 260,
    labelX: 1079,
    labelY: 360,
    label: 'ANTENNE',
  },
  // 11. Condensateur : 68 × 68 à (75, 400) - Flanc mi-gauche
  {
    id: 'condo',
    image: '/images/components/condo.svg?v=6',
    x: 75,
    y: 400,
    width: 68,
    height: 68,
    labelX: 109,
    labelY: 492,
    label: 'CONDENSATEUR',
  },
  // 12. Buzzer : 50 × 80 à (740, 680) - Alvéole arrière
  {
    id: 'vifly',
    image: '/images/components/vifly.svg?v=6',
    x: 740,
    y: 680,
    width: 50,
    height: 80,
    labelX: 765,
    labelY: 785,
    label: 'BUZZER',
  },
  // 13. Batterie LiPo : 125 × 265 à (950, 530) - Flanc bas-droit
  {
    id: 'lipo',
    image: '/images/components/lipo.svg?v=6',
    x: 950,
    y: 530,
    width: 125,
    height: 265,
    labelX: 1012,
    labelY: 820,
    label: 'BATTERIE',
  },
];

const getPillWidth = (id: string): number => {
  switch (id) {
    case 'fc':
    case 'rx': return 52;
    case 'esc':
    case 'vtx':
    case 'gps': return 58;
    case 'vifly': return 80;
    case 'cam':
    case 'motor':
    case 'frame': return 84;
    case 'antenna-rx':
    case 'antenna-vtx': return 86;
    case 'lipo': return 88;
    case 'condo': return 120;
    default: return 80;
  }
};

export function MonochromeDetailedCanvas({
  onSelectComponent,
  selectedCompId,
}: MonochromeDetailedCanvasProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);

  // Gestion responsive : occupation optimale de la hauteur de l'écran avec adaptation fluide
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile) {
        // Marges d'aération minimales garantissant 0 barre de défilement et 0 rognage
        const paddingX = 24;
        const paddingY = 20;
        const availW = window.innerWidth - paddingX;
        const availH = window.innerHeight - paddingY;

        // Utilisation maximale de la hauteur de l'écran sans restriction artificielle
        const targetScale = Math.min(availW / 1540, availH / 892);
        setScale(Math.max(0.55, targetScale));
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Rendu vectoriel CAD haute fidélité des 13 composants du drone
  const renderDroneComponents = () =>
    DRONE_COMPONENT_CONFIGS.map((comp) => {
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
    });

  return (
    <section className="flex-1 w-full flex flex-col items-center justify-center select-none bg-white">
      
      {/* ====================================================================
          AFFICHAGE RESPONSIVE CAD HAUTE PRÉCISION :
          - ÉCRANS FIXES : Échelle 1:1 CAD pure (1540px × 880px)
          - PC PORTABLES : Adaptation proportionnelle fluide selon la hauteur/largeur disponible
          - MOBILES : Système dédié compact (en attente du nouveau système mobile)
         ==================================================================== */}
      {!isMobile ? (
        <div
          style={{
            width: `${1540 * scale}px`,
            height: `${892 * scale}px`,
          }}
          className="relative flex items-center justify-center overflow-visible select-none"
        >
          <div
            style={{
              width: '1540px',
              height: '892px',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
            className="absolute top-0 left-0 bg-white overflow-visible"
          >
            {/* SVG 1540 × 892 avec marge de sécurité haute & basse */}
            <svg
              viewBox="0 0 1540 892"
              width="1540"
              height="892"
              className="w-full h-full select-none"
            >
              {/* Ligne directrice technique blueprint discrète sur desktop */}
              <line
                x1="1260"
                y1="10"
                x2="1260"
                y2="875"
                stroke="#000000"
                strokeWidth="1.2"
                strokeDasharray="4 6"
                opacity="0.18"
                className="select-none pointer-events-none"
              />

              {renderDroneComponents()}
            </svg>

            {/* STATIONS SOL À DROITE : Fixées en coordonnées exactes 1540 × 892 */}
            <div
              style={{
                position: 'absolute',
                top: '15px',
                right: '35px',
                width: '148px',
                height: '850px',
              }}
              className="flex flex-col justify-between items-center z-40 select-none"
            >
              {/* En-tête de section technique blueprint au-dessus des stations */}
              <div className="flex items-center gap-1.5 pb-1 border-b border-zinc-200 w-full justify-center select-none pointer-events-none">
                <span className="font-mono text-[8.5px] font-black uppercase tracking-widest text-zinc-400">
                  Équipements Sol
                </span>
              </div>
          
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
              Lunettes
            </span>

            {/* Au survol : palette compacte 2 colonnes (garantie zéro superposition avec le drone) */}
            {hoveredStation === 'goggle' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white border-2 border-black rounded-2xl p-2.5 shadow-2xl z-50 flex flex-col gap-1.5 w-[168px] animate-in fade-in slide-in-from-right-2 duration-150 before:absolute before:inset-y-0 before:-right-4 before:w-4 before:content-['']"
              >
                <div className="flex items-center justify-between pb-1 border-b border-zinc-200 px-0.5">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-black">
                    Lunettes
                  </span>
                  <span className="text-[8px] font-mono font-bold text-zinc-400">
                    {GOGGLE_BRANDS.length} marques
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {GOGGLE_BRANDS.map((gb, i) => (
                    <button
                      key={gb.id}
                      onClick={() => {
                        setGoggleIdx(i);
                        handleComponentClick('fatshark');
                      }}
                      className={`flex flex-col items-center justify-center h-14 p-1 rounded-xl border-2 transition-all cursor-pointer ${
                        i === goggleIdx
                          ? 'bg-zinc-100 border-black ring-1 ring-black font-bold shadow-xs scale-102'
                          : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                      }`}
                      title={gb.name}
                    >
                      <div className="w-full h-7 flex items-center justify-center">
                        <BrandLogo brandId={gb.id} width={36} height={20} />
                      </div>
                      <span className="text-[7.5px] font-mono font-black uppercase text-zinc-800 truncate w-full text-center mt-0.5">
                        {gb.brand}
                      </span>
                    </button>
                  ))}
                </div>
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
              Radio
            </span>

            {/* Au survol : palette compacte 2 colonnes (garantie zéro superposition avec le drone) */}
            {hoveredStation === 'radio' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white border-2 border-black rounded-2xl p-2.5 shadow-2xl z-50 flex flex-col gap-1.5 w-[168px] animate-in fade-in slide-in-from-right-2 duration-150 before:absolute before:inset-y-0 before:-right-4 before:w-4 before:content-['']"
              >
                <div className="flex items-center justify-between pb-1 border-b border-zinc-200 px-0.5">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-black">
                    Radios
                  </span>
                  <span className="text-[8px] font-mono font-bold text-zinc-400">
                    {RADIO_BRANDS.length} marques
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {RADIO_BRANDS.map((rb, i) => (
                    <button
                      key={rb.id}
                      onClick={() => {
                        setRadioIdx(i);
                        handleComponentClick('tango');
                      }}
                      className={`flex flex-col items-center justify-center h-14 p-1 rounded-xl border-2 transition-all cursor-pointer ${
                        i === radioIdx
                          ? 'bg-zinc-100 border-black ring-1 ring-black font-bold shadow-xs scale-102'
                          : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                      }`}
                      title={rb.name}
                    >
                      <div className="w-full h-7 flex items-center justify-center">
                        <BrandLogo brandId={rb.id} width={38} height={20} />
                      </div>
                      <span className="text-[7.5px] font-mono font-black uppercase text-zinc-800 truncate w-full text-center mt-0.5">
                        {rb.brand}
                      </span>
                    </button>
                  ))}
                </div>
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
              Config
            </span>

            {/* Au survol : palette compacte 2 colonnes (garantie zéro superposition avec le drone) */}
            {hoveredStation === 'config' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white border-2 border-black rounded-2xl p-2.5 shadow-2xl z-50 flex flex-col gap-1.5 w-[168px] animate-in fade-in slide-in-from-right-2 duration-150 before:absolute before:inset-y-0 before:-right-4 before:w-4 before:content-['']"
              >
                <div className="flex items-center justify-between pb-1 border-b border-zinc-200 px-0.5">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-black">
                    Config
                  </span>
                  <span className="text-[8px] font-mono font-bold text-zinc-400">
                    {CONFIGURATOR_BRANDS.length} options
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {CONFIGURATOR_BRANDS.map((cb, i) => (
                    <button
                      key={cb.id}
                      onClick={() => {
                        setConfigIdx(i);
                        handleComponentClick('betaflight');
                      }}
                      className={`flex flex-col items-center justify-center h-14 p-1 rounded-xl border-2 transition-all cursor-pointer ${
                        i === configIdx
                          ? 'bg-zinc-100 border-black ring-1 ring-black font-bold shadow-xs scale-102'
                          : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                      }`}
                      title={cb.name}
                    >
                      <div className="w-full h-7 flex items-center justify-center">
                        <BrandLogo brandId={cb.id} width={34} height={20} />
                      </div>
                      <span className="text-[7.5px] font-mono font-black uppercase text-zinc-800 truncate w-full text-center mt-0.5">
                        {cb.brand}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  ) : (
    <div className="relative w-full max-w-[650px] aspect-[1240/880] bg-white flex items-center justify-center overflow-visible">
      <svg
        viewBox="0 0 1240 880"
        className="w-full h-full select-none"
      >
        {renderDroneComponents()}
      </svg>
    </div>
  )}

      {/* ====================================================================
          EN BAS SUR MOBILE & TABLETTES (< 1024px) : 3 STATIONS HORIZONTALES
          TOTALEMENT DÉGAGÉES DU DRONE AVEC ZERO SUPERPOSITION
         ==================================================================== */}
      <div className="flex lg:hidden flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 mt-2 pb-2 select-none z-40 w-full max-w-lg">
        {/* STATION 1 MOBILE : LUNETTES FPV */}
        <div
          className="relative flex flex-col items-center group cursor-pointer"
          onClick={() => setHoveredStation((prev) => (prev === 'goggle' ? null : 'goggle'))}
          onMouseEnter={() => setHoveredStation('goggle')}
          onMouseLeave={() => setHoveredStation(null)}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleComponentClick('fatshark');
            }}
            className="relative w-24 h-18 sm:w-28 sm:h-20 bg-white border-2 border-black rounded-2xl flex items-center justify-center p-2.5 shadow-xs hover:shadow-md transition-all"
            title="Lunettes FPV - Cliquer pour diagnostiquer"
          >
            {GOGGLE_BRANDS.map((gb, i) => (
              <div
                key={gb.id}
                className="absolute inset-0 flex items-center justify-center p-2 transition-opacity duration-700 ease-in-out pointer-events-none"
                style={{
                  opacity: i === goggleIdx ? 1 : 0,
                }}
              >
                <BrandLogo brandId={gb.id} width={52} height={32} />
              </div>
            ))}
          </div>
          <span className="mt-1.5 px-3 py-0.5 rounded-full bg-white text-black border-[1.5px] border-black font-mono text-[9px] font-black uppercase tracking-wider shadow-2xs">
            Lunettes
          </span>

          {/* Palette mobile au clic/survol : s'ouvre vers le bas, totalement hors du drone */}
          {hoveredStation === 'goggle' && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-full mt-2 left-0 sm:left-1/2 sm:-translate-x-1/2 bg-white border-2 border-black rounded-2xl p-1.5 shadow-2xl z-50 flex flex-col gap-1 w-[160px] animate-in fade-in duration-150"
            >
              <div className="flex items-center justify-between pb-1 border-b border-zinc-200 px-0.5">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-black">
                  Lunettes
                </span>
                <span className="text-[8px] font-mono font-bold text-zinc-400">
                  {GOGGLE_BRANDS.length} marques
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {GOGGLE_BRANDS.map((gb, i) => (
                  <button
                    key={gb.id}
                    onClick={() => {
                      setGoggleIdx(i);
                      handleComponentClick('fatshark');
                      setHoveredStation(null);
                    }}
                    className={`flex flex-col items-center justify-center h-11 p-1 rounded-xl border-2 transition-all cursor-pointer ${
                      i === goggleIdx
                        ? 'bg-zinc-100 border-black ring-1 ring-black font-bold shadow-xs'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                    }`}
                    title={gb.name}
                  >
                    <div className="w-full h-5 flex items-center justify-center">
                      <BrandLogo brandId={gb.id} width={30} height={16} />
                    </div>
                    <span className="text-[7px] font-mono font-black uppercase text-zinc-800 truncate w-full text-center mt-0.5">
                      {gb.brand}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* STATION 2 MOBILE : RADIOCOMMANDE */}
        <div
          className="relative flex flex-col items-center group cursor-pointer"
          onClick={() => setHoveredStation((prev) => (prev === 'radio' ? null : 'radio'))}
          onMouseEnter={() => setHoveredStation('radio')}
          onMouseLeave={() => setHoveredStation(null)}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleComponentClick('tango');
            }}
            className="relative w-24 h-18 sm:w-28 sm:h-20 bg-white border-2 border-black rounded-2xl flex items-center justify-center p-2.5 shadow-xs hover:shadow-md transition-all"
            title="Radiocommande - Cliquer pour diagnostiquer"
          >
            {RADIO_BRANDS.map((rb, i) => (
              <div
                key={rb.id}
                className="absolute inset-0 flex items-center justify-center p-2 transition-opacity duration-700 ease-in-out pointer-events-none"
                style={{
                  opacity: i === radioIdx ? 1 : 0,
                }}
              >
                <BrandLogo brandId={rb.id} width={52} height={32} />
              </div>
            ))}
          </div>
          <span className="mt-1.5 px-3 py-0.5 rounded-full bg-white text-black border-[1.5px] border-black font-mono text-[9px] font-black uppercase tracking-wider shadow-2xs">
            Radio
          </span>

          {hoveredStation === 'radio' && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white border-2 border-black rounded-2xl p-1.5 shadow-2xl z-50 flex flex-col gap-1 w-[160px] animate-in fade-in duration-150"
            >
              <div className="flex items-center justify-between pb-1 border-b border-zinc-200 px-0.5">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-black">
                  Radios
                </span>
                <span className="text-[8px] font-mono font-bold text-zinc-400">
                  {RADIO_BRANDS.length} marques
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {RADIO_BRANDS.map((rb, i) => (
                  <button
                    key={rb.id}
                    onClick={() => {
                      setRadioIdx(i);
                      handleComponentClick('tango');
                      setHoveredStation(null);
                    }}
                    className={`flex flex-col items-center justify-center h-11 p-1 rounded-xl border-2 transition-all cursor-pointer ${
                      i === radioIdx
                        ? 'bg-zinc-100 border-black ring-1 ring-black font-bold shadow-xs'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                    }`}
                    title={rb.name}
                  >
                    <div className="w-full h-5 flex items-center justify-center">
                      <BrandLogo brandId={rb.id} width={30} height={16} />
                    </div>
                    <span className="text-[7px] font-mono font-black uppercase text-zinc-800 truncate w-full text-center mt-0.5">
                      {rb.brand}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* STATION 3 MOBILE : CONFIGURATEUR */}
        <div
          className="relative flex flex-col items-center group cursor-pointer"
          onClick={() => setHoveredStation((prev) => (prev === 'config' ? null : 'config'))}
          onMouseEnter={() => setHoveredStation('config')}
          onMouseLeave={() => setHoveredStation(null)}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleComponentClick('betaflight');
            }}
            className="relative w-24 h-18 sm:w-28 sm:h-20 bg-white border-2 border-black rounded-2xl flex items-center justify-center p-2.5 shadow-xs hover:shadow-md transition-all"
            title="Configurateur - Cliquer pour diagnostiquer"
          >
            {CONFIGURATOR_BRANDS.map((cb, i) => (
              <div
                key={cb.id}
                className="absolute inset-0 flex items-center justify-center p-2 transition-opacity duration-700 ease-in-out pointer-events-none"
                style={{
                  opacity: i === configIdx ? 1 : 0,
                }}
              >
                <BrandLogo brandId={cb.id} width={52} height={32} />
              </div>
            ))}
          </div>
          <span className="mt-1.5 px-3 py-0.5 rounded-full bg-white text-black border-[1.5px] border-black font-mono text-[9px] font-black uppercase tracking-wider shadow-2xs">
            Config
          </span>

          {hoveredStation === 'config' && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-full mt-2 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 bg-white border-2 border-black rounded-2xl p-1.5 shadow-2xl z-50 flex flex-col gap-1 w-[160px] animate-in fade-in duration-150"
            >
              <div className="flex items-center justify-between pb-1 border-b border-zinc-200 px-0.5">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-black">
                  Config
                </span>
                <span className="text-[8px] font-mono font-bold text-zinc-400">
                  {CONFIGURATOR_BRANDS.length} options
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {CONFIGURATOR_BRANDS.map((cb, i) => (
                  <button
                    key={cb.id}
                    onClick={() => {
                      setConfigIdx(i);
                      handleComponentClick('betaflight');
                      setHoveredStation(null);
                    }}
                    className={`flex flex-col items-center justify-center h-11 p-1 rounded-xl border-2 transition-all cursor-pointer ${
                      i === configIdx
                        ? 'bg-zinc-100 border-black ring-1 ring-black font-bold shadow-xs'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-black'
                    }`}
                    title={cb.name}
                  >
                    <div className="w-full h-5 flex items-center justify-center">
                      <BrandLogo brandId={cb.id} width={28} height={16} />
                    </div>
                    <span className="text-[7px] font-mono font-black uppercase text-zinc-800 truncate w-full text-center mt-0.5">
                      {cb.brand}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
