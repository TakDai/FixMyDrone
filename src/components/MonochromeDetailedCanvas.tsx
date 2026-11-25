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

interface MonochromeDetailedCanvasProps {
  onSelectComponent: (comp: FigmaComponentData) => void;
  selectedCompId?: string;
}

// Seuls les composants disposant d'un site catalogue actif sont débloqués
const ENABLED_COMPONENT_IDS = new Set<string>(['motor']);

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
  // 1. Châssis Carbone True-X : 768 × 644, centre (620, 529)
  {
    id: 'frame',
    image: '/images/components/frame.svg?v=6',
    x: 236,
    y: 206,
    width: 768,
    height: 644,
    labelX: 620,
    labelY: 868,
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
  // 5. Caméra FPV : 84 × 74 à (578, 102) - Dégagée avec espace franc au-dessus et en-dessous
  {
    id: 'cam',
    image: '/images/components/camera.svg?v=6',
    x: 578,
    y: 102,
    width: 84,
    height: 74,
    labelX: 620,
    labelY: 188,
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
  // 9. Antenne RX (Immortal-T complète) : 360 × 83 à (440, 24) - Avec brins dipôles, câble coaxial et connecteur U.FL
  {
    id: 'antenna-rx',
    image: '/images/components/antenna-rx.svg?v=9',
    x: 440,
    y: 24,
    width: 360,
    height: 83,
    labelX: 620,
    labelY: 16,
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
  // 13. Batterie LiPo : 125 × 265 à (965, 540) - Flanc bas-droit dégagé
  {
    id: 'lipo',
    image: '/images/components/lipo.svg?v=7',
    x: 965,
    y: 540,
    width: 125,
    height: 265,
    labelX: 1027,
    labelY: 825,
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
        const paddingY = 68;
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
    if (!ENABLED_COMPONENT_IDS.has(id)) return;
    const comp = getComp(id);
    onSelectComponent(comp);
  };

  // Rendu vectoriel CAD haute fidélité des 13 composants du drone
  const renderDroneComponents = () =>
    DRONE_COMPONENT_CONFIGS.map((comp) => {
      const isEnabled = ENABLED_COMPONENT_IDS.has(comp.id);
      const isSelected = isEnabled && selectedCompId === comp.id;
      const isHov = isEnabled && hoveredId === comp.id;
      const active = isSelected || isHov;
      const pillW = getPillWidth(comp.id);

      return (
        <g
          key={comp.id}
          id={`comp-${comp.id}`}
          onClick={isEnabled ? () => handleComponentClick(comp.id) : undefined}
          onMouseEnter={isEnabled ? () => setHoveredId(comp.id) : undefined}
          onMouseLeave={isEnabled ? () => setHoveredId(null) : undefined}
          className={`${isEnabled ? 'cursor-pointer' : 'cursor-not-allowed'} transition-all duration-200`}
          style={{ opacity: isEnabled ? 1 : 0.32 }}
        >
          {!isEnabled && <title>{comp.label} — Catalogue bientôt disponible</title>}
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
              stroke={isEnabled ? '#000000' : '#71717a'}
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
              fill={isEnabled ? '#000000' : '#71717a'}
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
            {/* SVG 1540 × 892 unifié pour l'ensemble du système */}
            <svg
              viewBox="0 0 1540 892"
              width="1540"
              height="892"
              className="w-full h-full select-none"
            >
              {renderDroneComponents()}
            </svg>

            {/* ÉQUIPEMENTS DE VOL & ATELIER : BLOQUÉS EN ATTENTE DES SITES CATALOGUES */}
            <div
              style={{
                position: 'absolute',
                top: '70px',
                right: '65px',
                width: '140px',
                height: '750px',
              }}
              className="flex flex-col justify-around items-center z-40 select-none opacity-35 cursor-not-allowed"
              title="Catalogue bientôt disponible"
            >
          
          {/* STATION 1 : LUNETTES FPV */}
          <div className="relative flex flex-col items-center pointer-events-none">
            <div className="relative w-32 h-18 flex items-center justify-center">
              {GOGGLE_BRANDS.map((gb, i) => (
                <div
                  key={gb.id}
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out pointer-events-none"
                  style={{ opacity: i === goggleIdx ? 1 : 0 }}
                >
                  <BrandLogo brandId={gb.id} width={76} height={44} />
                </div>
              ))}
            </div>
            <span className="mt-2 px-3.5 py-1 rounded-full bg-white text-zinc-500 border-[1.5px] border-zinc-400 font-mono text-[9.5px] font-black uppercase tracking-[0.05em]">
              Lunettes
            </span>
          </div>

          {/* STATION 2 : RADIOCOMMANDE */}
          <div className="relative flex flex-col items-center pointer-events-none">
            <div className="relative w-32 h-18 flex items-center justify-center">
              {RADIO_BRANDS.map((rb, i) => (
                <div
                  key={rb.id}
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out pointer-events-none"
                  style={{ opacity: i === radioIdx ? 1 : 0 }}
                >
                  <BrandLogo brandId={rb.id} width={80} height={44} />
                </div>
              ))}
            </div>
            <span className="mt-2 px-3.5 py-1 rounded-full bg-white text-zinc-500 border-[1.5px] border-zinc-400 font-mono text-[9.5px] font-black uppercase tracking-[0.05em]">
              Radio
            </span>
          </div>

          {/* STATION 3 : CONFIGURATEUR */}
          <div className="relative flex flex-col items-center pointer-events-none">
            <div className="relative w-32 h-18 flex items-center justify-center">
              {CONFIGURATOR_BRANDS.map((cb, i) => (
                <div
                  key={cb.id}
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out pointer-events-none"
                  style={{ opacity: i === configIdx ? 1 : 0 }}
                >
                  <BrandLogo brandId={cb.id} width={68} height={44} />
                </div>
              ))}
            </div>
            <span className="mt-2 px-3.5 py-1 rounded-full bg-white text-zinc-500 border-[1.5px] border-zinc-400 font-mono text-[9.5px] font-black uppercase tracking-[0.05em]">
              Config
            </span>
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
      <div
        className="flex lg:hidden flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 mt-2 pb-2 select-none z-40 w-full max-w-lg opacity-35 cursor-not-allowed"
        title="Catalogue bientôt disponible"
      >
        {/* STATION 1 MOBILE : LUNETTES FPV */}
        <div className="relative flex flex-col items-center pointer-events-none">
          <div className="relative w-16 h-7 flex items-center justify-center">
            {GOGGLE_BRANDS.map((gb, i) => (
              <div
                key={gb.id}
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out pointer-events-none"
                style={{ opacity: i === goggleIdx ? 1 : 0 }}
              >
                <BrandLogo brandId={gb.id} width={44} height={22} />
              </div>
            ))}
          </div>
          <span className="mt-1 px-3 py-0.5 rounded-full bg-white text-zinc-500 border-[1.5px] border-zinc-400 font-mono text-[9px] font-black uppercase tracking-wider">
            Lunettes
          </span>
        </div>

        {/* STATION 2 MOBILE : RADIOCOMMANDE */}
        <div className="relative flex flex-col items-center pointer-events-none">
          <div className="relative w-16 h-7 flex items-center justify-center">
            {RADIO_BRANDS.map((rb, i) => (
              <div
                key={rb.id}
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out pointer-events-none"
                style={{ opacity: i === radioIdx ? 1 : 0 }}
              >
                <BrandLogo brandId={rb.id} width={46} height={22} />
              </div>
            ))}
          </div>
          <span className="mt-1 px-3 py-0.5 rounded-full bg-white text-zinc-500 border-[1.5px] border-zinc-400 font-mono text-[9px] font-black uppercase tracking-wider">
            Radio
          </span>
        </div>

        {/* STATION 3 MOBILE : CONFIGURATEUR */}
        <div className="relative flex flex-col items-center pointer-events-none">
          <div className="relative w-16 h-7 flex items-center justify-center">
            {CONFIGURATOR_BRANDS.map((cb, i) => (
              <div
                key={cb.id}
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out pointer-events-none"
                style={{ opacity: i === configIdx ? 1 : 0 }}
              >
                <BrandLogo brandId={cb.id} width={42} height={22} />
              </div>
            ))}
          </div>
          <span className="mt-1 px-3 py-0.5 rounded-full bg-white text-zinc-500 border-[1.5px] border-zinc-400 font-mono text-[9px] font-black uppercase tracking-wider">
            Config
          </span>
        </div>
      </div>
    </section>
  );
}
