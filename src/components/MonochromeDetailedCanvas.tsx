'use client';

import React, { useState } from 'react';
import { FIGMA_COMPONENTS, FigmaComponentData } from '@/data/figmaComponents';
import { Wrench, CheckCircle2, Crosshair, ArrowUpRight, Sparkles } from 'lucide-react';

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
      
      {/* Conteneur principal du Blueprint Monochrome enrichi de couleurs pâles */}
      <div className="relative w-full max-w-[1360px] aspect-[16/10] bg-white border-[1.5px] border-dashed border-black rounded-3xl p-2 sm:p-6 flex items-center justify-center overflow-hidden shadow-sm">
        
        {/* Grille technique de fond style SEEWORLD */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #000000 0.8px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Lignes directrices de repérage CAO en filigrane */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
          <line x1="275" y1="0" x2="275" y2="600" stroke="#000000" strokeWidth="0.8" strokeDasharray="4 6" />
          <line x1="0" y1="300" x2="1000" y2="300" stroke="#000000" strokeWidth="0.8" strokeDasharray="4 6" />
          <circle cx="275" cy="300" r="160" fill="none" stroke="#000000" strokeWidth="0.6" strokeDasharray="3 5" />
          <circle cx="820" cy="350" r="130" fill="none" stroke="#000000" strokeWidth="0.6" strokeDasharray="3 5" />
        </svg>

        {/* SVG vectoriel de haute précision avec teintes pâles / pastel */}
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full select-none"
        >
          <defs>
            {/* Dégradés métalliques et textures subtiles */}
            <linearGradient id="carbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            <linearGradient id="carbonHover" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            <linearGradient id="goldPad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>

            <linearGradient id="copperCoil" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fdba74" />
            </linearGradient>

            <linearGradient id="lipoWrap" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#ffedd5" />
            </linearGradient>
          </defs>

          {/* ====================================================================
              1. CHÂSSIS CARBONE TRUE-X (FRAME) - Centré à gauche (x=275, y=300)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('frame')}
            onMouseEnter={() => setHoveredId('frame')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Bras 1 : Avant-Gauche */}
            <path
              d="M 240 260 L 95 105 C 80 90, 50 105, 50 125 C 50 145, 75 155, 90 155 L 225 285 Z"
              fill={isCurrent('frame') ? 'url(#carbonHover)' : 'url(#carbonGradient)'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            {/* Trous de vis moteur et chanfrein du bras */}
            <circle cx="70" cy="115" r="18" fill={isCurrent('frame') ? '#e2e8f0' : '#ffffff'} stroke="#000000" strokeWidth="1.5" />
            <circle cx="70" cy="115" r="6" fill="#f8fafc" stroke="#000000" strokeWidth="1" />
            <circle cx="62" cy="115" r="2.2" fill="#000000" />
            <circle cx="78" cy="115" r="2.2" fill="#000000" />
            <circle cx="70" cy="107" r="2.2" fill="#000000" />
            <circle cx="70" cy="123" r="2.2" fill="#000000" />
            <line x1="120" y1="140" x2="210" y2="250" stroke="#000000" strokeWidth="0.8" strokeDasharray="4 4" />

            {/* Bras 2 : Avant-Droit */}
            <path
              d="M 310 260 L 455 105 C 470 90, 500 105, 500 125 C 500 145, 475 155, 460 155 L 325 285 Z"
              fill={isCurrent('frame') ? 'url(#carbonHover)' : 'url(#carbonGradient)'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="480" cy="115" r="18" fill={isCurrent('frame') ? '#e2e8f0' : '#ffffff'} stroke="#000000" strokeWidth="1.5" />
            <circle cx="480" cy="115" r="6" fill="#f8fafc" stroke="#000000" strokeWidth="1" />
            <circle cx="472" cy="115" r="2.2" fill="#000000" />
            <circle cx="488" cy="115" r="2.2" fill="#000000" />
            <circle cx="480" cy="107" r="2.2" fill="#000000" />
            <circle cx="480" cy="123" r="2.2" fill="#000000" />
            <line x1="430" y1="140" x2="340" y2="250" stroke="#000000" strokeWidth="0.8" strokeDasharray="4 4" />

            {/* Bras 3 : Arrière-Gauche */}
            <path
              d="M 225 315 L 90 445 C 75 445, 50 455, 50 475 C 50 495, 80 510, 95 495 L 240 340 Z"
              fill={isCurrent('frame') ? 'url(#carbonHover)' : 'url(#carbonGradient)'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="70" cy="485" r="18" fill={isCurrent('frame') ? '#e2e8f0' : '#ffffff'} stroke="#000000" strokeWidth="1.5" />
            <circle cx="70" cy="485" r="6" fill="#f8fafc" stroke="#000000" strokeWidth="1" />
            <circle cx="62" cy="485" r="2.2" fill="#000000" />
            <circle cx="78" cy="485" r="2.2" fill="#000000" />
            <circle cx="70" cy="477" r="2.2" fill="#000000" />
            <circle cx="70" cy="493" r="2.2" fill="#000000" />
            <line x1="120" y1="460" x2="210" y2="350" stroke="#000000" strokeWidth="0.8" strokeDasharray="4 4" />

            {/* Bras 4 : Arrière-Droit */}
            <path
              d="M 325 315 L 460 445 C 475 445, 500 455, 500 475 C 500 495, 470 510, 455 495 L 310 340 Z"
              fill={isCurrent('frame') ? 'url(#carbonHover)' : 'url(#carbonGradient)'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="480" cy="485" r="18" fill={isCurrent('frame') ? '#e2e8f0' : '#ffffff'} stroke="#000000" strokeWidth="1.5" />
            <circle cx="480" cy="485" r="6" fill="#f8fafc" stroke="#000000" strokeWidth="1" />
            <circle cx="472" cy="485" r="2.2" fill="#000000" />
            <circle cx="488" cy="485" r="2.2" fill="#000000" />
            <circle cx="480" cy="477" r="2.2" fill="#000000" />
            <circle cx="480" cy="493" r="2.2" fill="#000000" />
            <line x1="430" y1="460" x2="340" y2="350" stroke="#000000" strokeWidth="0.8" strokeDasharray="4 4" />

            {/* Fuselage central (Top Plate ajourée) */}
            <rect
              x="235"
              y="170"
              width="80"
              height="260"
              rx="18"
              fill={isCurrent('frame') ? '#f1f5f9' : '#f8fafc'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '2'}
            />
            {/* Découpes esthétiques et aération */}
            <rect x="255" y="190" width="40" height="20" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <path d="M 255 245 L 275 225 L 295 245 L 275 265 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="275" cy="300" r="13" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <path d="M 267 292 L 283 308 M 267 308 L 283 292" stroke="#000000" strokeWidth="1.5" />
            <path d="M 255 355 L 275 335 L 295 355 L 275 375 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <rect x="255" y="390" width="40" height="24" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />

            {/* Entretoises alu dorées pâles */}
            <circle cx="245" cy="180" r="3.5" fill="#fef08a" stroke="#000000" strokeWidth="1" />
            <circle cx="305" cy="180" r="3.5" fill="#fef08a" stroke="#000000" strokeWidth="1" />
            <circle cx="245" cy="418" r="3.5" fill="#fef08a" stroke="#000000" strokeWidth="1" />
            <circle cx="305" cy="418" r="3.5" fill="#fef08a" stroke="#000000" strokeWidth="1" />

            {/* Badge Titre */}
            <rect x="240" y="434" width="70" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="275" y="445" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" letterSpacing="0.08em" fill="#000000">
              FRAME CARBONE
            </text>
          </g>

          {/* ====================================================================
              2. VTX MACH 3.1 - En haut à gauche du nez (x=150, y=55)
                 Teinte pâle : Bleu ciel #d8ecf8 & affichage rouge pâle
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('vtx')}
            onMouseEnter={() => setHoveredId('vtx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Boîtier VTX avec blindage RF bleu ciel pâle */}
            <rect
              x="130"
              y="30"
              width="45"
              height="65"
              rx="5"
              fill={isCurrent('vtx') ? '#bae6fd' : '#e0f2fe'}
              stroke="#000000"
              strokeWidth={isCurrent('vtx') ? '2.5' : '1.8'}
            />
            {/* Rainures de refroidissement */}
            <line x1="135" y1="36" x2="170" y2="36" stroke="#000000" strokeWidth="1" />
            {/* Connecteur MMCX doré pâle */}
            <rect x="162" y="20" width="9" height="11" rx="1.5" fill="#fef08a" stroke="#000000" strokeWidth="1.2" />
            <circle cx="166.5" cy="25" r="2" fill="#000000" />
            {/* Écran digital "8." avec fond noir & segment rouge pâle */}
            <rect x="138" y="42" width="22" height="24" rx="3" fill="#18181b" stroke="#000000" strokeWidth="1" />
            <text x="149" y="60" textAnchor="middle" fontSize="16" fontFamily="monospace" fontWeight="900" fill="#fca5a5">
              8.
            </text>
            {/* Bouton tactile de sélection de fréquence */}
            <rect x="161" y="66" width="9" height="9" rx="1.5" fill="#fef9c3" stroke="#000000" strokeWidth="1" />
            <circle cx="165.5" cy="70.5" r="2" fill="#000000" />
            {/* Rangée de pins de connexion dorés */}
            <rect x="135" y="88" width="35" height="5" rx="1" fill="#fde047" stroke="#000000" strokeWidth="1" />
            {/* Badge Titre */}
            <rect x="127" y="99" width="51" height="14" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="152.5" y="109" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              VTX MACH 3.1
            </text>
          </g>

          {/* ====================================================================
              3. MODULE GPS BLITZ M10 - Juste au-dessus du nez (x=275, y=35)
                 Teinte pâle : Céramique beige/or #fef3c7 & blindage argent
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('gps')}
            onMouseEnter={() => setHoveredId('gps')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Base PCB du GPS */}
            <rect
              x="252"
              y="20"
              width="46"
              height="46"
              rx="6"
              fill={isCurrent('gps') ? '#fde68a' : '#fef3c7'}
              stroke="#000000"
              strokeWidth={isCurrent('gps') ? '2.5' : '1.8'}
            />
            {/* Antenne patch céramique beige pâle */}
            <rect x="259" y="27" width="32" height="32" rx="3" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
            <circle cx="275" cy="43" r="3.5" fill="#fde047" stroke="#000000" strokeWidth="0.8" />
            {/* Boîtier blindé et gravure laser */}
            <rect x="264" y="30" width="22" height="8" rx="1.5" fill="#000000" />
            <text x="275" y="36.5" textAnchor="middle" fontSize="5.5" fontFamily="sans-serif" fontWeight="900" fill="#ffffff">
              BLITZ M10
            </text>
            {/* Micro LED GPS fixe (vert pâle) et fix 3D (bleu pâle) */}
            <circle cx="264" cy="54" r="1.8" fill="#86efac" />
            <circle cx="286" cy="54" r="1.8" fill="#93c5fd" />
            {/* Connecteur SH1.0 4 broches */}
            <rect x="268" y="62" width="14" height="4" fill="#000000" />
            {/* Badge Titre */}
            <rect x="252" y="69" width="46" height="13" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="275" y="79" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              GPS M10
            </text>
          </g>

          {/* ====================================================================
              4. RÉCEPTEUR FOXEER ELRS 2.4G RX - En haut à droite du nez (x=345, y=55)
                 Teinte pâle : Vert pastel / menthe #dcfce7
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('rx')}
            onMouseEnter={() => setHoveredId('rx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Circuit imprimé PCB vert menthe pâle */}
            <rect
              x="328"
              y="35"
              width="36"
              height="55"
              rx="4"
              fill={isCurrent('rx') ? '#bbf7d0' : '#dcfce7'}
              stroke="#000000"
              strokeWidth={isCurrent('rx') ? '2.5' : '1.8'}
            />
            {/* Connecteur d'antenne IPEX doré pâle */}
            <circle cx="338" cy="44" r="4.5" fill="#fef08a" stroke="#000000" strokeWidth="1.2" />
            <circle cx="338" cy="44" r="1.5" fill="#000000" />
            {/* Puce microcontrôleur ESP8285 / SX1280 */}
            <rect x="334" y="52" width="24" height="24" rx="2" fill="#18181b" />
            <circle cx="337" cy="55" r="1" fill="#ffffff" />
            <text x="346" y="66" textAnchor="middle" fontSize="6.5" fontFamily="sans-serif" fontWeight="900" fill="#ffffff">
              ELRS
            </text>
            <text x="346" y="73" textAnchor="middle" fontSize="5" fontFamily="sans-serif" fontWeight="600" fill="#93c5fd">
              2.4GHz
            </text>
            {/* 4 Pads dorés inférieurs (5V, GND, TX, RX) */}
            <rect x="331" y="85" width="5" height="4" rx="1" fill="#fde047" stroke="#000000" strokeWidth="0.8" />
            <rect x="338" y="85" width="5" height="4" rx="1" fill="#fde047" stroke="#000000" strokeWidth="0.8" />
            <rect x="345" y="85" width="5" height="4" rx="1" fill="#fde047" stroke="#000000" strokeWidth="0.8" />
            <rect x="352" y="85" width="5" height="4" rx="1" fill="#fde047" stroke="#000000" strokeWidth="0.8" />
            {/* Badge Titre */}
            <rect x="326" y="93" width="40" height="13" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="346" y="103" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              ELRS RX
            </text>
          </g>

          {/* ====================================================================
              5. CONDENSATEUR LOW ESR - Flanc gauche extrême (x=20, y=275)
                 Teinte pâle : Crème doré #fef9c3 avec bande noire négative
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('condo')}
            onMouseEnter={() => setHoveredId('condo')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Corps cylindrique condensateur aluminium */}
            <rect
              x="12"
              y="255"
              width="22"
              height="45"
              rx="4"
              fill={isCurrent('condo') ? '#fef08a' : '#fef9c3'}
              stroke="#000000"
              strokeWidth={isCurrent('condo') ? '2.5' : '1.8'}
            />
            {/* Bande noire négative latérale avec symbole "-" */}
            <rect x="12" y="255" width="7" height="45" rx="1" fill="#000000" />
            <text x="15.5" y="272" fontSize="9" fill="#ffffff" fontWeight="bold">-</text>
            <text x="15.5" y="286" fontSize="9" fill="#ffffff" fontWeight="bold">-</text>
            {/* Gravure 1000µF 35V */}
            <text x="24" y="277" fontSize="5" fontFamily="sans-serif" fontWeight="bold" fill="#000000" transform="rotate(90, 24, 277)">
              1000µF
            </text>
            {/* Deux pattes métalliques soudées vers la stack */}
            <line x1="34" y1="270" x2="58" y2="270" stroke="#000000" strokeWidth="2" />
            <line x1="34" y1="285" x2="58" y2="285" stroke="#000000" strokeWidth="2" />
            {/* Badge Titre */}
            <rect x="5" y="304" width="36" height="13" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="23" y="314" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              CONDO
            </text>
          </g>

          {/* ====================================================================
              6. CONTRÔLEUR DE VOL FC 30.5x30.5 - Flanc gauche de la frame (x=105, y=275)
                 Teinte pâle : Vert d'eau électronique #cbf3d2 & pads dorés
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('fc')}
            onMouseEnter={() => setHoveredId('fc')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Substrat PCB vert menthe clair */}
            <rect
              x="65"
              y="235"
              width="78"
              height="78"
              rx="8"
              fill={isCurrent('fc') ? '#a7f3d0' : '#cbf3d2'}
              stroke="#000000"
              strokeWidth={isCurrent('fc') ? '2.5' : '2'}
            />
            {/* Pistes cuivrées décoratives */}
            <path d="M 75 255 L 90 255 L 95 265" fill="none" stroke="#a7f3d0" strokeWidth="1.5" />
            <path d="M 130 255 L 115 255 L 110 265" fill="none" stroke="#a7f3d0" strokeWidth="1.5" />

            {/* 4 Silent-blocs / Grommets silicone doux */}
            <circle cx="75" cy="245" r="5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="133" cy="245" r="5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="75" cy="303" r="5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="133" cy="303" r="5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />

            {/* Puce STM32 centrale noire matte */}
            <rect x="88" y="258" width="32" height="32" rx="2" fill="#18181b" stroke="#000000" strokeWidth="1" />
            <circle cx="93" cy="263" r="1.5" fill="#ffffff" />
            <text x="104" y="275" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fontWeight="bold" fill="#ffffff">
              STM32
            </text>
            <text x="104" y="283" textAnchor="middle" fontSize="5.5" fontFamily="monospace" fill="#93c5fd">
              F722 RET6
            </text>

            {/* Port USB-C argenté en haut */}
            <rect x="96" y="232" width="16" height="5" rx="1.5" fill="#ffffff" stroke="#000000" strokeWidth="1" />

            {/* Pads dorés tout autour */}
            <rect x="83" y="238" width="42" height="3.5" rx="0.5" fill="url(#goldPad)" stroke="#000000" strokeWidth="0.8" />
            <rect x="83" y="306.5" width="42" height="3.5" rx="0.5" fill="url(#goldPad)" stroke="#000000" strokeWidth="0.8" />
            <rect x="68" y="253" width="3.5" height="42" rx="0.5" fill="url(#goldPad)" stroke="#000000" strokeWidth="0.8" />
            <rect x="136.5" y="253" width="3.5" height="42" rx="0.5" fill="url(#goldPad)" stroke="#000000" strokeWidth="0.8" />

            {/* Miro-LEDs de statut Betaflight (Vert & Bleu) */}
            <circle cx="124" cy="264" r="1.5" fill="#4ade80" />
            <circle cx="124" cy="269" r="1.5" fill="#60a5fa" />

            {/* Badge Titre */}
            <rect x="75" y="318" width="58" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="104" y="329" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              FC 30x30
            </text>
          </g>

          {/* ====================================================================
              7. VARIATEUR ESC 4-EN-1 55A - Flanc droit de la frame (x=415, y=275)
                 Teinte pâle : Rose/lavande pâle #fee2e2 & dissipateur
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('esc')}
            onMouseEnter={() => setHoveredId('esc')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Plaque dissipatrice aluminium rose/lavande pâle */}
            <rect
              x="368"
              y="235"
              width="78"
              height="78"
              rx="8"
              fill={isCurrent('esc') ? '#fecdd3' : '#fee2e2'}
              stroke="#000000"
              strokeWidth={isCurrent('esc') ? '2.5' : '2'}
            />
            {/* 4 Trous de montage */}
            <circle cx="376" cy="243" r="4" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
            <circle cx="438" cy="243" r="4" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
            <circle cx="376" cy="305" r="4" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
            <circle cx="438" cy="305" r="4" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />

            {/* 6 gros pads moteurs dorés latéraux avec brasures */}
            <rect x="362" y="247" width="7" height="11" rx="1.5" fill="url(#goldPad)" stroke="#000000" strokeWidth="0.9" />
            <rect x="362" y="269" width="7" height="11" rx="1.5" fill="url(#goldPad)" stroke="#000000" strokeWidth="0.9" />
            <rect x="362" y="291" width="7" height="11" rx="1.5" fill="url(#goldPad)" stroke="#000000" strokeWidth="0.9" />
            <rect x="445" y="247" width="7" height="11" rx="1.5" fill="url(#goldPad)" stroke="#000000" strokeWidth="0.9" />
            <rect x="445" y="269" width="7" height="11" rx="1.5" fill="url(#goldPad)" stroke="#000000" strokeWidth="0.9" />
            <rect x="445" y="291" width="7" height="11" rx="1.5" fill="url(#goldPad)" stroke="#000000" strokeWidth="0.9" />

            {/* 4 paires de gros MOSFETs de puissance */}
            <rect x="380" y="248" width="16" height="15" rx="1" fill="#18181b" />
            <rect x="404" y="248" width="16" height="15" rx="1" fill="#18181b" />
            <rect x="380" y="271" width="16" height="15" rx="1" fill="#18181b" />
            <rect x="404" y="271" width="16" height="15" rx="1" fill="#18181b" />

            {/* Shunt de mesure de courant (Current Sensor) */}
            <rect x="396" y="266" width="8" height="4" fill="#ffffff" stroke="#000000" strokeWidth="0.8" />

            {/* Gros pads batterie d'entrée avec repère + / - */}
            <rect x="394" y="308" width="14" height="6" rx="1.5" fill="url(#goldPad)" stroke="#000000" strokeWidth="1" />
            <text x="397" y="313" fontSize="5" fontWeight="bold" fill="#000000">+</text>
            <text x="405" y="313" fontSize="5" fontWeight="bold" fill="#000000">-</text>

            {/* Badge Titre */}
            <rect x="375" y="318" width="64" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="407" y="329" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              ESC 4-EN-1
            </text>
          </g>

          {/* ====================================================================
              8. MOTEUR BRUSHLESS 2207 - En bas à gauche sous le châssis (x=215, y=515)
                 Teinte pâle : Métal brossé champagne & cuivre rosé interne
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('motor')}
            onMouseEnter={() => setHoveredId('motor')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Arbre fileté M5 en acier chromé */}
            <rect x="210" y="475" width="8" height="32" rx="1" fill="#e2e8f0" stroke="#000000" strokeWidth="1.2" />
            <line x1="210" y1="482" x2="218" y2="482" stroke="#000000" strokeWidth="1" />
            <line x1="210" y1="488" x2="218" y2="488" stroke="#000000" strokeWidth="1" />
            <line x1="210" y1="494" x2="218" y2="494" stroke="#000000" strokeWidth="1" />
            <line x1="210" y1="500" x2="218" y2="500" stroke="#000000" strokeWidth="1" />

            {/* Cloche moteur alu avec découpes révélant le cuivre pâle des bobines */}
            <path
              d="M 185 507 L 243 507 C 248 507, 252 515, 250 532 C 248 541, 240 544, 214 544 C 188 544, 180 541, 178 532 C 176 515, 180 507, 185 507 Z"
              fill={isCurrent('motor') ? '#fed7aa' : '#f5f5f4'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Ouvertures d'aération avec bobinages de cuivre visibles */}
            <rect x="190" y="513" width="8" height="20" rx="2" fill="url(#copperCoil)" stroke="#000000" strokeWidth="1" />
            <rect x="202" y="512" width="8" height="23" rx="2" fill="url(#copperCoil)" stroke="#000000" strokeWidth="1" />
            <rect x="218" y="512" width="8" height="23" rx="2" fill="url(#copperCoil)" stroke="#000000" strokeWidth="1" />
            <rect x="230" y="513" width="8" height="20" rx="2" fill="url(#copperCoil)" stroke="#000000" strokeWidth="1" />

            {/* Base stator noire avec vis de serrage d'axe */}
            <rect x="188" y="544" width="52" height="12" rx="2" fill="#18181b" stroke="#000000" strokeWidth="1.2" />
            <circle cx="214" cy="550" r="2.5" fill="#fde047" />

            {/* Badge Titre */}
            <rect x="180" y="559" width="68" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="214" y="570" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              MOTEUR 2207
            </text>
          </g>

          {/* ====================================================================
              9. MICRO-CAMÉRA FPV - En bas au milieu sous le châssis (x=295, y=520)
                 Teinte pâle : Boîtier bleu ardoise pâle & reflet verre cyan
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('cam')}
            onMouseEnter={() => setHoveredId('cam')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Boîtier caméra profilé bleu pastel */}
            <rect
              x="278"
              y="515"
              width="34"
              height="30"
              rx="5"
              fill={isCurrent('cam') ? '#bae6fd' : '#e0f2fe'}
              stroke="#000000"
              strokeWidth="1.8"
            />
            {/* Visière optique / bague de focalisation */}
            <rect x="285" y="501" width="20" height="14" rx="3" fill="#18181b" stroke="#000000" strokeWidth="1" />
            {/* Lentille en verre multicouche avec reflet bleu cyan pâle */}
            <circle cx="295" cy="508" r="6" fill="#bae6fd" stroke="#000000" strokeWidth="1" />
            <circle cx="295" cy="508" r="3" fill="#0284c7" />
            <circle cx="293.5" cy="506.5" r="1.2" fill="#ffffff" />
            {/* Vis d'angle d'inclinaison latérale */}
            <circle cx="283" cy="530" r="2.5" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <line x1="281" y1="530" x2="285" y2="530" stroke="#000000" strokeWidth="0.8" />

            {/* Badge Titre */}
            <rect x="264" y="551" width="62" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="295" y="562" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              CAMÉRA FPV
            </text>
          </g>

          {/* ====================================================================
              10. BUZZER AUTONOME VIFLY - En bas à droite sous le bras (x=350, y=430)
                 Teinte pâle : Jaune canari pastel #fef08a & LED verte
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('vifly')}
            onMouseEnter={() => setHoveredId('vifly')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Corps du buzzer ViFly jaune pâle */}
            <rect
              x="338"
              y="410"
              width="24"
              height="35"
              rx="4"
              fill={isCurrent('vifly') ? '#fde047' : '#fef08a'}
              stroke="#000000"
              strokeWidth="1.8"
            />
            {/* Membrane piézo-électrique noire */}
            <circle cx="350" cy="423" r="8.5" fill="#18181b" stroke="#000000" strokeWidth="1" />
            <circle cx="350" cy="423" r="3.5" fill="#ffffff" />
            {/* Micro LiPo interne de secours */}
            <rect x="342" y="435" width="16" height="7" rx="1.5" fill="#ffffff" stroke="#000000" strokeWidth="0.8" />
            {/* LED stroboscopique verte pâle de repérage de nuit */}
            <circle cx="350" cy="438.5" r="1.5" fill="#86efac" />

            {/* Badge Titre */}
            <rect x="331" y="448" width="38" height="13" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="350" y="458" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              BUZZER
            </text>
          </g>

          {/* ====================================================================
              11. ANTENNE IMMORTAL-T - Horizontale en haut au centre-droit (x=410 à 790)
                 Teinte pâle : Manchons silicone corail pâle #fee2e2
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('antenna-rx')}
            onMouseEnter={() => setHoveredId('antenna-rx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Tige principale du dipôle */}
            <line x1="410" y1="28" x2="790" y2="28" stroke="#000000" strokeWidth={isCurrent('antenna-rx') ? '4.5' : '3'} strokeLinecap="round" />
            {/* Manchons de terminaison corail/rouge pastel */}
            <rect x="410" y="23" width="14" height="10" rx="3" fill="#fee2e2" stroke="#000000" strokeWidth="1.2" />
            <rect x="776" y="23" width="14" height="10" rx="3" fill="#fee2e2" stroke="#000000" strokeWidth="1.2" />
            {/* Pièce de raccord central en T moulé */}
            <path d="M 590 19 L 610 19 L 606 38 L 594 38 Z" fill="#18181b" stroke="#000000" strokeWidth="1.2" />
            {/* Câble coaxial vers le récepteur avec blindage pointillé */}
            <line x1="600" y1="38" x2="600" y2="175" stroke="#000000" strokeWidth="1.8" strokeDasharray="3 3" />
            <circle cx="600" cy="177" r="3.5" fill="#fde047" stroke="#000000" strokeWidth="1" />

            {/* Badge Titre */}
            <rect x="545" y="3" width="110" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="600" y="14" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              ANTENNE IMMORTAL-T
            </text>
          </g>

          {/* ====================================================================
              12. ANTENNE VTX LOLLIPOP - Verticale à droite (x=669, y=55 à 240)
                 Teinte pâle : Dôme protecteur vert menthe translucide #dcfce7
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('antenna-vtx')}
            onMouseEnter={() => setHoveredId('antenna-vtx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Radôme en plastique vert menthe pâle */}
            <rect x="660" y="55" width="18" height="24" rx="8" fill={isCurrent('antenna-vtx') ? '#a7f3d0' : '#dcfce7'} stroke="#000000" strokeWidth="1.5" />
            <circle cx="669" cy="67" r="4.5" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <circle cx="669" cy="67" r="2" fill="#fde047" />
            {/* Câble d'antenne semi-rigide RG402 */}
            <line x1="669" y1="79" x2="669" y2="235" stroke="#000000" strokeWidth="2.5" />
            {/* Connecteur SMA doré pâle */}
            <circle cx="669" cy="237" r="4" fill="#fef08a" stroke="#000000" strokeWidth="1.2" />

            {/* Badge Titre */}
            <rect x="632" y="36" width="74" height="14" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="669" y="46" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              ANTENNE VTX
            </text>
          </g>

          {/* ====================================================================
              13. LOGO BETAFLIGHT - Tout en haut à droite (x=885, y=55)
                 Teinte pâle : Ailes et corps en jaune ambré pastel #fef3c7
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('betaflight')}
            onMouseEnter={() => setHoveredId('betaflight')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Silhouette aérodynamique de la guêpe Betaflight */}
            <path
              d="M 855 35 Q 890 20 910 50 Q 895 72 875 75 Q 855 68 855 35 Z"
              fill={isCurrent('betaflight') ? '#fde68a' : '#fef3c7'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Rayures dynamiques */}
            <path d="M 870 38 Q 895 30 905 45" fill="none" stroke="#000000" strokeWidth="2.2" />
            <path d="M 875 52 Q 900 42 902 60" fill="none" stroke="#000000" strokeWidth="2.2" />
            {/* Dard */}
            <line x1="910" y1="50" x2="919" y2="54" stroke="#000000" strokeWidth="3" strokeLinecap="round" />

            {/* Badge Titre */}
            <rect x="850" y="80" width="70" height="14" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="885" y="90" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              BETAFLIGHT
            </text>
          </g>

          {/* ====================================================================
              14. RADIOCOMMANDE TBS TANGO II - Milieu Droite (x=805, y=240)
                 Teinte pâle : Coque studio grey #f1f5f9 & sticks bleu glace #bae6fd
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('tango')}
            onMouseEnter={() => setHoveredId('tango')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Coque ergonomique façon manette studio pale */}
            <path
              d="M 740 180 C 785 168, 850 168, 895 185 C 915 215, 905 295, 875 310 C 850 295, 825 315, 805 295 C 785 315, 760 295, 735 310 C 705 295, 695 215, 715 185 C 725 175, 732 180, 740 180 Z"
              fill={isCurrent('tango') ? '#e2e8f0' : '#f8fafc'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Grips latéraux texturés en gris doux */}
            <path d="M 703 210 C 700 240, 710 270, 725 290" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2 3" />
            <path d="M 907 210 C 910 240, 900 270, 885 290" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2 3" />

            {/* Antenne T pliable au sommet */}
            <line x1="755" y1="150" x2="855" y2="150" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="805" y1="150" x2="805" y2="172" stroke="#000000" strokeWidth="2.5" />

            {/* Écran OLED rétro-éclairé */}
            <rect x="788" y="195" width="34" height="22" rx="3" fill="#0f172a" stroke="#000000" strokeWidth="1.2" />
            <text x="805" y="209" textAnchor="middle" fontSize="7" fontFamily="monospace" fontWeight="bold" fill="#38bdf8">
              TBS T2
            </text>
            <text x="805" y="215" textAnchor="middle" fontSize="4.5" fontFamily="monospace" fill="#94a3b8">
              100Hz • 250mW
            </text>

            {/* Deux Gimbals à effet Hall avec sticks bleu glace pâle */}
            <circle cx="765" cy="235" r="16" fill="#f1f5f9" stroke="#000000" strokeWidth="1.8" />
            <circle cx="765" cy="235" r="5" fill="#bae6fd" stroke="#000000" strokeWidth="1.2" />
            <circle cx="765" cy="235" r="1.5" fill="#000000" />

            <circle cx="845" cy="235" r="16" fill="#f1f5f9" stroke="#000000" strokeWidth="1.8" />
            <circle cx="845" cy="235" r="5" fill="#bae6fd" stroke="#000000" strokeWidth="1.2" />
            <circle cx="845" cy="235" r="1.5" fill="#000000" />

            {/* Interrupteurs verticaux programmables */}
            <circle cx="738" cy="265" r="3" fill="#18181b" />
            <circle cx="738" cy="277" r="3" fill="#18181b" />
            <circle cx="738" cy="289" r="3" fill="#18181b" />

            {/* Badge Titre */}
            <rect x="765" y="321" width="80" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="805" y="332" textAnchor="middle" fontSize="8.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              TBS TANGO II
            </text>
          </g>

          {/* ====================================================================
              15. BATTERIE LIPO 6S AVEC PRISE XT60 - Entre frame et lunettes (x=562, y=390)
                 Teinte pâle : Gaine thermo vanille #fef3c7 & connecteur XT60 jaune
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('lipo')}
            onMouseEnter={() => setHoveredId('lipo')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Corps LiPo vertical avec gaine protectrice vanille pâle */}
            <rect
              x="535"
              y="360"
              width="54"
              height="115"
              rx="7"
              fill={isCurrent('lipo') ? '#fde68a' : 'url(#lipoWrap)'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Étiquette constructeur 6S 1300mAh */}
            <rect x="541" y="370" width="42" height="24" rx="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="562" y="380" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fontWeight="900" fill="#000000">
              6S 1300
            </text>
            <text x="562" y="388" textAnchor="middle" fontSize="5.5" fontFamily="sans-serif" fontWeight="700" fill="#e11d48">
              120C 22.2V
            </text>

            {/* Lignes séparatrices des 6 cellules LiPo individuelles */}
            <line x1="535" y1="400" x2="589" y2="400" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="535" y1="418" x2="589" y2="418" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="535" y1="436" x2="589" y2="436" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="535" y1="454" x2="589" y2="454" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />

            {/* Câbles en boucle en silicone souple */}
            <path d="M 552 360 C 535 325, 560 300, 565 290" fill="none" stroke="#e11d48" strokeWidth="3.5" />
            <path d="M 572 360 C 562 330, 575 305, 572 290" fill="none" stroke="#000000" strokeWidth="3.5" strokeDasharray="3 3" />

            {/* Prise jaune Amass XT60 authentique avec fiches dorées */}
            <path d="M 555 290 L 582 290 L 578 272 L 559 272 Z" fill="#fde047" stroke="#000000" strokeWidth="1.5" />
            <circle cx="564" cy="281" r="2.2" fill="#fef08a" stroke="#000000" strokeWidth="0.8" />
            <circle cx="573" cy="281" r="2.2" fill="#fef08a" stroke="#000000" strokeWidth="0.8" />

            {/* Badge Titre */}
            <rect x="522" y="482" width="80" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="562" y="493" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              LIPO 6S XT60
            </text>
          </g>

          {/* ====================================================================
              16. LUNETTES FPV FAT SHARK - En bas à droite sous la Tango (x=798, y=485)
                 Teinte pâle : Coque craie/polaire #f8fafc & verres optiques azur #bae6fd
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('fatshark')}
            onMouseEnter={() => setHoveredId('fatshark')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Coque profilée du masque en blanc polaire */}
            <path
              d="M 720 425 C 775 410, 855 410, 910 425 C 925 470, 910 535, 875 545 C 840 520, 810 560, 775 520 C 740 560, 710 520, 680 545 C 655 535, 640 470, 720 425 Z"
              fill={isCurrent('fatshark') ? '#e2e8f0' : '#f8fafc'}
              stroke="#000000"
              strokeWidth="2.2"
            />
            {/* Grille supérieure d'aération anti-buée */}
            <rect x="785" y="415" width="28" height="10" rx="3" fill="#18181b" stroke="#000000" strokeWidth="1" />
            <line x1="792" y1="416" x2="792" y2="424" stroke="#ffffff" strokeWidth="1" />
            <line x1="799" y1="416" x2="799" y2="424" stroke="#ffffff" strokeWidth="1" />
            <line x1="806" y1="416" x2="806" y2="424" stroke="#ffffff" strokeWidth="1" />

            {/* Logo officiel FAT SHARK */}
            <text x="798" y="475" textAnchor="middle" fontSize="15" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.12em" fill="#000000">
              FAT SHARK
            </text>
            <text x="798" y="487" textAnchor="middle" fontSize="6" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.2em" fill="#64748b">
              HDO OLED
            </text>

            {/* Double optique OLED grand angle avec reflet bleu azur pâle */}
            <ellipse cx="755" cy="510" rx="17" ry="11" fill="#bae6fd" stroke="#000000" strokeWidth="1.5" />
            <ellipse cx="755" cy="510" rx="9" ry="6" fill="#0284c7" />
            <circle cx="753" cy="508" r="2" fill="#ffffff" />

            <ellipse cx="840" cy="510" rx="17" ry="11" fill="#bae6fd" stroke="#000000" strokeWidth="1.5" />
            <ellipse cx="840" cy="510" rx="9" ry="6" fill="#0284c7" />
            <circle cx="838" cy="508" r="2" fill="#ffffff" />

            {/* Badge Titre */}
            <rect x="746" y="565" width="104" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="798" y="576" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              LUNETTES FAT SHARK
            </text>
          </g>

        </svg>

        {/* Infobulle technique dynamique au survol */}
        {hoveredId && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border-[1.5px] border-dashed border-black rounded-2xl p-4 shadow-2xl pointer-events-none animate-in fade-in duration-150 max-w-sm z-30">
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
        <div className="absolute bottom-3 left-4 bg-white/95 px-3 py-1.5 rounded-xl border border-black/30 text-[11px] text-zinc-600 flex items-center gap-2 pointer-events-none shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Vue éclatée enrichie • Couleurs techniques pâles • Cliquez sur un composant pour diagnostiquer</span>
        </div>

      </div>

      {/* Barre d'état sous le schéma */}
      <div className="w-full max-w-[1360px] mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 border-t-[1.5px] border-dashed border-black/30 pt-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-black uppercase tracking-wider text-[11px]">
            Palette Pastel SEEWORLD :
          </span>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#cbf3d2] border border-black/20" /> FC / Menthe</span>
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#fee2e2] border border-black/20" /> ESC / Rose</span>
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#d8ecf8] border border-black/20" /> VTX & Cam / Azur</span>
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#fef3c7] border border-black/20" /> LiPo & GPS / Ambre</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-black font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Conception vectorielle haute définition • Alignement Figma</span>
        </div>
      </div>

    </section>
  );
}
