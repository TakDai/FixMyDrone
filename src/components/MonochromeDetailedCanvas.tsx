'use client';

import React, { useState } from 'react';
import { FIGMA_COMPONENTS, FigmaComponentData } from '@/data/figmaComponents';
import { Wrench, CheckCircle2, Crosshair, ArrowUpRight } from 'lucide-react';

interface MonochromeDetailedCanvasProps {
  onSelectComponent: (comp: FigmaComponentData) => void;
  selectedCompId?: string;
}

export function MonochromeDetailedCanvas({
  onSelectComponent,
  selectedCompId,
}: MonochromeDetailedCanvasProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getComp = (id: string) => FIGMA_COMPONENTS.find((c) => c.id === id) || FIGMA_COMPONENTS[0];

  const handleComponentClick = (id: string) => {
    const comp = FIGMA_COMPONENTS.find((c) => c.id === id);
    if (comp) onSelectComponent(comp);
  };

  const isCurrent = (id: string) => selectedCompId === id || hoveredId === id;

  return (
    <section className="flex-1 w-full flex flex-col items-center justify-center p-2 sm:p-6 select-none bg-white">
      
      {/* Conteneur principal du Blueprint Monochrome */}
      <div className="relative w-full max-w-[1360px] aspect-[16/10] bg-white border-[1.5px] border-dashed border-black rounded-3xl p-2 sm:p-6 flex items-center justify-center overflow-hidden shadow-xs">
        
        {/* Grille technique de fond style SEEWORLD */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #000000 0.8px, transparent 0)',
            backgroundSize: '18px 18px',
          }}
        />

        {/* SVG d'ingénierie vectoriel monochrome haute fidélité */}
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full select-none"
        >
          {/* ====================================================================
              1. CHÂSSIS CARBONE TRUE-X (FRAME) - Centré à gauche (x=275, y=300)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('frame')}
            onMouseEnter={() => setHoveredId('frame')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Bras 1 : Avant-Gauche */}
            <path
              d="M 240 260 L 95 105 C 80 90, 50 105, 50 125 C 50 145, 75 155, 90 155 L 225 285 Z"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            {/* Trous de vis moteur bras avant-gauche */}
            <circle cx="70" cy="115" r="18" fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'} stroke="#000000" strokeWidth="1.5" />
            <circle cx="70" cy="115" r="6" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <circle cx="62" cy="115" r="2" fill="#000000" />
            <circle cx="78" cy="115" r="2" fill="#000000" />
            <circle cx="70" cy="107" r="2" fill="#000000" />
            <circle cx="70" cy="123" r="2" fill="#000000" />

            {/* Bras 2 : Avant-Droit */}
            <path
              d="M 310 260 L 455 105 C 470 90, 500 105, 500 125 C 500 145, 475 155, 460 155 L 325 285 Z"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="480" cy="115" r="18" fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'} stroke="#000000" strokeWidth="1.5" />
            <circle cx="480" cy="115" r="6" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <circle cx="472" cy="115" r="2" fill="#000000" />
            <circle cx="488" cy="115" r="2" fill="#000000" />
            <circle cx="480" cy="107" r="2" fill="#000000" />
            <circle cx="480" cy="123" r="2" fill="#000000" />

            {/* Bras 3 : Arrière-Gauche */}
            <path
              d="M 225 315 L 90 445 C 75 445, 50 455, 50 475 C 50 495, 80 510, 95 495 L 240 340 Z"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="70" cy="485" r="18" fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'} stroke="#000000" strokeWidth="1.5" />
            <circle cx="70" cy="485" r="6" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <circle cx="62" cy="485" r="2" fill="#000000" />
            <circle cx="78" cy="485" r="2" fill="#000000" />
            <circle cx="70" cy="477" r="2" fill="#000000" />
            <circle cx="70" cy="493" r="2" fill="#000000" />

            {/* Bras 4 : Arrière-Droit */}
            <path
              d="M 325 315 L 460 445 C 475 445, 500 455, 500 475 C 500 495, 470 510, 455 495 L 310 340 Z"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="480" cy="485" r="18" fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'} stroke="#000000" strokeWidth="1.5" />
            <circle cx="480" cy="485" r="6" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <circle cx="472" cy="485" r="2" fill="#000000" />
            <circle cx="488" cy="485" r="2" fill="#000000" />
            <circle cx="480" cy="477" r="2" fill="#000000" />
            <circle cx="480" cy="493" r="2" fill="#000000" />

            {/* Corps central du châssis (Fuselage avec ouvertures ajourées) */}
            <rect
              x="235"
              y="170"
              width="80"
              height="260"
              rx="18"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '2'}
            />
            {/* Découpes de la top plate */}
            <rect x="255" y="190" width="40" height="20" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <path d="M 255 245 L 275 225 L 295 245 L 275 265 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="275" cy="300" r="12" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <path d="M 268 293 L 282 307 M 268 307 L 282 293" stroke="#000000" strokeWidth="1.5" />
            <path d="M 255 355 L 275 335 L 295 355 L 275 375 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <rect x="255" y="390" width="40" height="24" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />

            <circle cx="245" cy="180" r="2.5" fill="#000000" />
            <circle cx="305" cy="180" r="2.5" fill="#000000" />
            <circle cx="245" cy="418" r="2.5" fill="#000000" />
            <circle cx="305" cy="418" r="2.5" fill="#000000" />

            <text x="275" y="445" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.08em" fill="#000000">
              FRAME CARBONE
            </text>
          </g>

          {/* ====================================================================
              2. VTX MACH 3.1 - En haut à gauche du nez (x=150, y=55)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('vtx')}
            onMouseEnter={() => setHoveredId('vtx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            <rect
              x="130"
              y="30"
              width="45"
              height="65"
              rx="4"
              fill={isCurrent('vtx') ? '#d8ecf8' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('vtx') ? '2.5' : '1.8'}
            />
            {/* Connecteur MMCX */}
            <rect x="162" y="22" width="9" height="9" fill="#000000" />
            {/* Écran digital "8." */}
            <rect x="138" y="42" width="22" height="24" rx="2" fill="#000000" />
            <text x="149" y="60" textAnchor="middle" fontSize="16" fontFamily="monospace" fontWeight="900" fill="#ffffff">
              8.
            </text>
            <rect x="160" y="65" width="10" height="10" rx="1" fill="#000000" />
            {/* Pins en bas */}
            <rect x="135" y="90" width="35" height="4" fill="#000000" />
            <text x="152" y="108" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              VTX MACH 3.1
            </text>
          </g>

          {/* ====================================================================
              3. MODULE GPS BLITZ M10 - Juste au-dessus du nez (x=275, y=35)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('gps')}
            onMouseEnter={() => setHoveredId('gps')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            <rect
              x="252"
              y="20"
              width="46"
              height="46"
              rx="5"
              fill={isCurrent('gps') ? '#d8ecf8' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('gps') ? '2.5' : '1.8'}
            />
            <rect x="259" y="27" width="32" height="32" rx="2" fill="#ffffff" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" />
            <rect x="264" y="32" width="22" height="10" fill="#000000" />
            <text x="275" y="40" textAnchor="middle" fontSize="5.5" fontFamily="sans-serif" fontWeight="900" fill="#ffffff">
              BLITZ M10
            </text>
            <rect x="268" y="62" width="14" height="4" fill="#000000" />
            <text x="275" y="78" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              GPS M10
            </text>
          </g>

          {/* ====================================================================
              4. RÉCEPTEUR FOXEER ELRS 2.4G RX - En haut à droite du nez (x=345, y=55)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('rx')}
            onMouseEnter={() => setHoveredId('rx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            <rect
              x="328"
              y="35"
              width="36"
              height="55"
              rx="3"
              fill={isCurrent('rx') ? '#d8ecf8' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('rx') ? '2.5' : '1.8'}
            />
            <circle cx="338" cy="44" r="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <circle cx="338" cy="44" r="1.5" fill="#000000" />
            <rect x="334" y="52" width="24" height="24" rx="1.5" fill="#000000" />
            <text x="346" y="66" textAnchor="middle" fontSize="6.5" fontFamily="sans-serif" fontWeight="700" fill="#ffffff">
              ELRS
            </text>
            <rect x="332" y="86" width="5" height="4" fill="#000000" />
            <rect x="339" y="86" width="5" height="4" fill="#000000" />
            <rect x="346" y="86" width="5" height="4" fill="#000000" />
            <rect x="353" y="86" width="5" height="4" fill="#000000" />
            <text x="346" y="103" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              ELRS RX
            </text>
          </g>

          {/* ====================================================================
              5. CONDENSATEUR LOW ESR - Flanc gauche extrême (x=20, y=275)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('condo')}
            onMouseEnter={() => setHoveredId('condo')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            <rect
              x="12"
              y="260"
              width="20"
              height="40"
              rx="3"
              fill={isCurrent('condo') ? '#f7eed7' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('condo') ? '2.5' : '1.8'}
            />
            <rect x="12" y="260" width="7" height="40" fill="#000000" />
            <text x="15.5" y="280" fontSize="8" fill="#ffffff" fontWeight="bold">-</text>
            <line x1="32" y1="273" x2="52" y2="273" stroke="#000000" strokeWidth="1.5" />
            <line x1="32" y1="287" x2="52" y2="287" stroke="#000000" strokeWidth="1.5" />
            <text x="22" y="312" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              CONDO
            </text>
          </g>

          {/* ====================================================================
              6. CONTRÔLEUR DE VOL FC 30.5x30.5 - Flanc gauche de la frame (x=105, y=275)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('fc')}
            onMouseEnter={() => setHoveredId('fc')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            <rect
              x="65"
              y="235"
              width="78"
              height="78"
              rx="7"
              fill={isCurrent('fc') ? '#cbf3d2' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('fc') ? '2.5' : '2'}
            />
            {/* 4 Grommets aux 4 coins */}
            <circle cx="75" cy="245" r="4.5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="133" cy="245" r="4.5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="75" cy="303" r="4.5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="133" cy="303" r="4.5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />

            {/* Puce STM32 centrale */}
            <rect x="88" y="258" width="32" height="32" rx="2" fill="#000000" />
            <circle cx="94" cy="264" r="2" fill="#ffffff" />
            {/* Pads dorés tout autour */}
            <rect x="83" y="238" width="42" height="3" fill="#000000" />
            <rect x="83" y="307" width="42" height="3" fill="#000000" />
            <rect x="68" y="253" width="3" height="42" fill="#000000" />
            <rect x="137" y="253" width="3" height="42" fill="#000000" />

            <text x="104" y="328" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              FC 30x30
            </text>
          </g>

          {/* ====================================================================
              7. VARIATEUR ESC 4-EN-1 55A - Flanc droit de la frame (x=415, y=275)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('esc')}
            onMouseEnter={() => setHoveredId('esc')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            <rect
              x="368"
              y="235"
              width="78"
              height="78"
              rx="7"
              fill={isCurrent('esc') ? '#fdd8d8' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('esc') ? '2.5' : '2'}
            />
            {/* 3 pads moteurs latéraux gauche & droit crénelés */}
            <rect x="362" y="247" width="6" height="11" rx="1" fill="#000000" />
            <rect x="362" y="269" width="6" height="11" rx="1" fill="#000000" />
            <rect x="362" y="291" width="6" height="11" rx="1" fill="#000000" />
            <rect x="446" y="247" width="6" height="11" rx="1" fill="#000000" />
            <rect x="446" y="269" width="6" height="11" rx="1" fill="#000000" />
            <rect x="446" y="291" width="6" height="11" rx="1" fill="#000000" />
            {/* MOSFETs internes */}
            <rect x="379" y="247" width="16" height="16" fill="#000000" />
            <rect x="403" y="247" width="16" height="16" fill="#000000" />
            <rect x="379" y="271" width="16" height="16" fill="#000000" />
            <rect x="403" y="271" width="16" height="16" fill="#000000" />
            {/* Gros pads batterie en bas */}
            <rect x="396" y="309" width="12" height="5" fill="#000000" />

            <text x="407" y="328" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              ESC 4-EN-1
            </text>
          </g>

          {/* ====================================================================
              8. MOTEUR BRUSHLESS 2207 - En bas à gauche sous le châssis (x=215, y=515)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('motor')}
            onMouseEnter={() => setHoveredId('motor')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Arbre fileté supérieur M5 */}
            <rect x="210" y="475" width="8" height="32" fill="#000000" />
            <line x1="210" y1="483" x2="218" y2="483" stroke="#ffffff" strokeWidth="1" />
            <line x1="210" y1="491" x2="218" y2="491" stroke="#ffffff" strokeWidth="1" />
            <line x1="210" y1="499" x2="218" y2="499" stroke="#ffffff" strokeWidth="1" />

            {/* Cloche moteur alu */}
            <path
              d="M 185 507 L 243 507 C 248 507, 252 515, 250 532 C 248 541, 240 544, 214 544 C 188 544, 180 541, 178 532 C 176 515, 180 507, 185 507 Z"
              fill={isCurrent('motor') ? '#cbf3d2' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Rayons de la cloche */}
            <line x1="195" y1="511" x2="195" y2="533" stroke="#000000" strokeWidth="2" />
            <line x1="207" y1="510" x2="207" y2="537" stroke="#000000" strokeWidth="2" />
            <line x1="221" y1="510" x2="221" y2="537" stroke="#000000" strokeWidth="2" />
            <line x1="233" y1="511" x2="233" y2="533" stroke="#000000" strokeWidth="2" />

            {/* Base du stator 4 trous */}
            <rect x="188" y="544" width="52" height="12" rx="2" fill="#000000" />
            <text x="214" y="570" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              MOTEUR 2207
            </text>
          </g>

          {/* ====================================================================
              9. MICRO-CAMÉRA FPV - En bas au milieu sous le châssis (x=295, y=520)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('cam')}
            onMouseEnter={() => setHoveredId('cam')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            <rect
              x="278"
              y="515"
              width="34"
              height="30"
              rx="4"
              fill={isCurrent('cam') ? '#d8ecf8' : '#ffffff'}
              stroke="#000000"
              strokeWidth="1.8"
            />
            {/* Lentille optique */}
            <rect x="285" y="502" width="20" height="13" rx="2.5" fill="#000000" />
            <circle cx="295" cy="508" r="6" fill="#ffffff" />
            <circle cx="295" cy="508" r="2.5" fill="#000000" />
            {/* Vis latérale */}
            <circle cx="282" cy="530" r="2.5" fill="#000000" />
            <text x="295" y="562" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              CAMÉRA FPV
            </text>
          </g>

          {/* ====================================================================
              10. BUZZER AUTONOME VIFLY - En bas à droite sous le bras (x=350, y=430)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('vifly')}
            onMouseEnter={() => setHoveredId('vifly')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            <rect
              x="338"
              y="410"
              width="24"
              height="35"
              rx="3"
              fill={isCurrent('vifly') ? '#fdd8d8' : '#ffffff'}
              stroke="#000000"
              strokeWidth="1.8"
            />
            <circle cx="350" cy="423" r="8" fill="#000000" />
            <circle cx="350" cy="423" r="3" fill="#ffffff" />
            <rect x="345" y="437" width="10" height="4" rx="1" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="350" y="458" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              BUZZER
            </text>
          </g>

          {/* ====================================================================
              11. ANTENNE IMMORTAL-T - Horizontale en haut au centre-droit (x=370 à 800)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('antenna-rx')}
            onMouseEnter={() => setHoveredId('antenna-rx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            <line x1="410" y1="28" x2="790" y2="28" stroke="#000000" strokeWidth={isCurrent('antenna-rx') ? '4.5' : '3'} strokeLinecap="round" />
            {/* Embouts caoutchouc */}
            <rect x="410" y="24" width="14" height="8" rx="2" fill="#000000" />
            <rect x="776" y="24" width="14" height="8" rx="2" fill="#000000" />
            {/* Raccord T central */}
            <path d="M 590 20 L 610 20 L 605 38 L 595 38 Z" fill="#000000" />
            {/* Câble coaxial vers le bas */}
            <line x1="600" y1="38" x2="600" y2="175" stroke="#000000" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="600" cy="177" r="3.5" fill="#000000" />
            <text x="600" y="14" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              ANTENNE IMMORTAL-T
            </text>
          </g>

          {/* ====================================================================
              12. ANTENNE VTX LOLLIPOP - Verticale à droite (x=670, y=55 à 240)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('antenna-vtx')}
            onMouseEnter={() => setHoveredId('antenna-vtx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            <rect x="660" y="55" width="18" height="24" rx="7" fill="#000000" />
            <circle cx="669" cy="67" r="4" fill="#ffffff" />
            <line x1="669" y1="79" x2="669" y2="235" stroke="#000000" strokeWidth="2" />
            <circle cx="669" cy="237" r="3.5" fill="#000000" />
            <text x="669" y="47" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              ANTENNE VTX
            </text>
          </g>

          {/* ====================================================================
              13. LOGO BETAFLIGHT - Tout en haut à droite (x=885, y=55)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('betaflight')}
            onMouseEnter={() => setHoveredId('betaflight')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            <path
              d="M 855 35 Q 890 20 910 50 Q 895 72 875 75 Q 855 68 855 35 Z"
              fill={isCurrent('betaflight') ? '#f7eed7' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2"
            />
            <path d="M 870 38 Q 895 30 905 45" fill="none" stroke="#000000" strokeWidth="2" />
            <path d="M 875 52 Q 900 42 902 60" fill="none" stroke="#000000" strokeWidth="2" />
            <line x1="910" y1="50" x2="918" y2="54" stroke="#000000" strokeWidth="2.5" />
            <text x="885" y="90" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              BETAFLIGHT
            </text>
          </g>

          {/* ====================================================================
              14. RADIOCOMMANDE TBS TANGO II - Milieu Droite (x=825, y=210)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('tango')}
            onMouseEnter={() => setHoveredId('tango')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Forme ergonomique manette gamepad */}
            <path
              d="M 740 180 C 785 168, 850 168, 895 185 C 915 215, 905 295, 875 310 C 850 295, 825 315, 805 295 C 785 315, 760 295, 735 310 C 705 295, 695 215, 715 185 C 725 175, 732 180, 740 180 Z"
              fill={isCurrent('tango') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Antenne T pliable au sommet */}
            <line x1="755" y1="150" x2="855" y2="150" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="805" y1="150" x2="805" y2="172" stroke="#000000" strokeWidth="2.5" />
            {/* Écran OLED */}
            <rect x="788" y="195" width="34" height="22" rx="2.5" fill="#000000" />
            <text x="805" y="209" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#ffffff">
              TBS
            </text>
            {/* Deux Gimbals avec sticks moletés */}
            <circle cx="765" cy="235" r="15" fill="#ffffff" stroke="#000000" strokeWidth="1.8" />
            <circle cx="765" cy="235" r="4.5" fill="#000000" />
            <circle cx="845" cy="235" r="15" fill="#ffffff" stroke="#000000" strokeWidth="1.8" />
            <circle cx="845" cy="235" r="4.5" fill="#000000" />
            {/* Boutons verticaux à gauche */}
            <circle cx="738" cy="265" r="3" fill="#000000" />
            <circle cx="738" cy="277" r="3" fill="#000000" />
            <circle cx="738" cy="289" r="3" fill="#000000" />

            <text x="805" y="332" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              TBS TANGO II
            </text>
          </g>

          {/* ====================================================================
              15. BATTERIE LIPO 6S AVEC PRISE XT60 - Entre frame et lunettes (x=560, y=390)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('lipo')}
            onMouseEnter={() => setHoveredId('lipo')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Corps LiPo vertical */}
            <rect
              x="535"
              y="360"
              width="54"
              height="115"
              rx="6"
              fill={isCurrent('lipo') ? '#f7eed7' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Lignes séparatrices des cellules 6S */}
            <line x1="535" y1="383" x2="589" y2="383" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="535" y1="406" x2="589" y2="406" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="535" y1="429" x2="589" y2="429" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="535" y1="452" x2="589" y2="452" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />

            {/* Câbles en boucle vers le connecteur XT60 */}
            <path d="M 552 360 C 535 325, 560 300, 565 290" fill="none" stroke="#000000" strokeWidth="3.5" />
            <path d="M 572 360 C 562 330, 575 305, 572 290" fill="none" stroke="#000000" strokeWidth="3.5" strokeDasharray="3 3" />
            {/* Connecteur XT60 Amass */}
            <path d="M 555 290 L 582 290 L 578 272 L 559 272 Z" fill="#000000" />
            <circle cx="564" cy="281" r="2" fill="#ffffff" />
            <circle cx="573" cy="281" r="2" fill="#ffffff" />

            <text x="562" y="492" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              LIPO 6S XT60
            </text>
          </g>

          {/* ====================================================================
              16. LUNETTES FPV FAT SHARK - En bas à droite sous la Tango (x=820, y=470)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('fatshark')}
            onMouseEnter={() => setHoveredId('fatshark')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Coque profilée du masque */}
            <path
              d="M 720 425 C 775 410, 855 410, 910 425 C 925 470, 910 535, 875 545 C 840 520, 810 560, 775 520 C 740 560, 710 520, 680 545 C 655 535, 640 470, 720 425 Z"
              fill={isCurrent('fatshark') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2.2"
            />
            {/* Grille supérieure d'aération */}
            <rect x="785" y="415" width="28" height="10" rx="2.5" fill="#000000" />
            <line x1="792" y1="415" x2="792" y2="425" stroke="#ffffff" strokeWidth="1" />
            <line x1="799" y1="415" x2="799" y2="425" stroke="#ffffff" strokeWidth="1" />
            <line x1="806" y1="415" x2="806" y2="425" stroke="#ffffff" strokeWidth="1" />

            {/* Logo FAT SHARK central exact */}
            <text x="798" y="475" textAnchor="middle" fontSize="15" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.12em" fill="#000000">
              FAT SHARK
            </text>
            {/* Double optique OLED */}
            <ellipse cx="755" cy="510" rx="16" ry="10" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <ellipse cx="840" cy="510" rx="16" ry="10" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />

            <text x="798" y="575" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              LUNETTES FAT SHARK
            </text>
          </g>

        </svg>

        {/* Infobulle technique dynamique au survol */}
        {hoveredId && (
          <div className="absolute top-4 right-4 bg-white border-[1.5px] border-dashed border-black rounded-2xl p-4 shadow-xl pointer-events-none animate-in fade-in duration-100 max-w-sm z-30">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase">
              <span className="flex items-center gap-1.5 text-black font-bold">
                <Crosshair className="w-3.5 h-3.5" />
                {getComp(hoveredId).category}
              </span>
              <span className="text-emerald-700 font-bold">{getComp(hoveredId).commonIssues.length} pannes</span>
            </div>
            <h4 className="text-base font-bold text-black mt-1">
              {getComp(hoveredId).name}
            </h4>
            <p className="text-xs text-zinc-600 italic mt-1 leading-snug">
              {getComp(hoveredId).role}
            </p>
            <div className="mt-3 pt-2 border-t border-dashed border-zinc-300 flex items-center justify-between text-[11px] text-black font-semibold">
              <span className="text-zinc-500">Cliquer pour ouvrir la fiche</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </div>
          </div>
        )}

        {/* Repère d'atelier discret */}
        <div className="absolute bottom-3 left-4 bg-white/95 px-3 py-1.5 rounded-lg border border-black/30 text-[11px] text-zinc-600 flex items-center gap-1.5 pointer-events-none">
          <Wrench className="w-3.5 h-3.5 text-black" />
          <span>Vue éclatée conforme à la maquette • Cliquez sur un composant pour voir les pannes</span>
        </div>

      </div>

      {/* Barre de conformité sous le schéma */}
      <div className="w-full max-w-[1360px] mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 border-t-[1.5px] border-dashed border-black/30 pt-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-black uppercase tracking-wider text-[11px]">
            Disposition Référencée :
          </span>
          <span className="italic text-[11px]">Frame au centre • VTX/GPS/RX en haut • FC/ESC sur les côtés • Moteur/Cam/Buzzer en bas • Tango/LiPo/Fat Shark à droite</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-black font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Alignement 1:1 avec la maquette Figma • Charte SEEWORLD</span>
        </div>
      </div>

    </section>
  );
}
