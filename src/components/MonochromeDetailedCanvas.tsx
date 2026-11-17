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
      
      {/* Conteneur principal du Blueprint Haute Fidélité Réaliste FPV */}
      <div className="relative w-full max-w-[1360px] aspect-[16/10] bg-[#fafafa] border-[1.5px] border-dashed border-black rounded-3xl p-2 sm:p-6 flex items-center justify-center overflow-hidden shadow-sm">
        
        {/* Grille technique d'atelier FPV style SEEWORLD */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #71717a 0.8px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Lignes directrices de repérage CAO */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
          <line x1="275" y1="0" x2="275" y2="600" stroke="#71717a" strokeWidth="0.8" strokeDasharray="4 6" />
          <line x1="0" y1="300" x2="1000" y2="300" stroke="#71717a" strokeWidth="0.8" strokeDasharray="4 6" />
          <circle cx="275" cy="300" r="160" fill="none" stroke="#71717a" strokeWidth="0.6" strokeDasharray="3 5" />
          <circle cx="820" cy="350" r="130" fill="none" stroke="#71717a" strokeWidth="0.6" strokeDasharray="3 5" />
        </svg>

        {/* SVG vectoriel de haute précision avec rendu réaliste des composants FPV */}
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full select-none"
        >
          <defs>
            {/* Fibre de carbone 3K T700 sergé véritable */}
            <pattern id="carbonWeave" width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="#18181b" />
              <rect width="3" height="3" fill="#27272a" />
              <rect x="3" y="3" width="3" height="3" fill="#27272a" />
              <path d="M 0 3 L 3 0 M 3 6 L 6 3" stroke="#3f3f46" strokeWidth="0.5" />
            </pattern>

            <pattern id="carbonWeaveHover" width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="#27272a" />
              <rect width="3" height="3" fill="#3f3f46" />
              <rect x="3" y="3" width="3" height="3" fill="#3f3f46" />
              <path d="M 0 3 L 3 0 M 3 6 L 6 3" stroke="#52525b" strokeWidth="0.6" />
            </pattern>

            {/* Sangle élastique des lunettes Fat Shark */}
            <pattern id="strapPattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="#09090b" />
              <line x1="0" y1="5" x2="10" y2="5" stroke="#27272a" strokeWidth="1" strokeDasharray="2 2" />
            </pattern>

            {/* Or véritable ENIG pour les pads de soudure */}
            <linearGradient id="goldPadReal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="30%" stopColor="#eab308" />
              <stop offset="70%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>

            {/* Cuivre émaillé authentique des bobinages stator */}
            <linearGradient id="copperCoilReal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="25%" stopColor="#ea580c" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="75%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>

            {/* Titane / cloche moteur alu anodisé brossé */}
            <linearGradient id="titaniumBell" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="35%" stopColor="#1e293b" />
              <stop offset="70%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Aluminium argenté poli (arbres, entretoises, vis) */}
            <linearGradient id="aluminumReal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            {/* Plastique connecteur Amass XT60 jaune authentique */}
            <linearGradient id="xt60Yellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            {/* Verre optique de lentille avec traitement multicouche antireflet */}
            <radialGradient id="lensGlass" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="30%" stopColor="#0284c7" />
              <stop offset="65%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Gaine LiPo Tattu R-Line 6S noire/argent */}
            <linearGradient id="lipoWrapReal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="30%" stopColor="#334155" />
              <stop offset="70%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Coque composite blanche Fat Shark HDO */}
            <linearGradient id="goggleShell" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#f1f5f9" />
              <stop offset="85%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            {/* Céramique de l'antenne patch GPS */}
            <linearGradient id="gpsCeramic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2d9cc" />
              <stop offset="50%" stopColor="#d5c7b3" />
              <stop offset="100%" stopColor="#bfae97" />
            </linearGradient>

            {/* Ombre portée réaliste */}
            <filter id="realisticShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* ====================================================================
              1. CHÂSSIS CARBONE TRUE-X (FRAME) - Centré à gauche (x=275, y=300)
                 Fibre de carbone 3K T700 sergé avec chanfreins et entretoises laiton
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('frame')}
            onMouseEnter={() => setHoveredId('frame')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('frame') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Bras 1 : Avant-Gauche */}
            <path
              d="M 240 260 L 95 105 C 80 90, 50 105, 50 125 C 50 145, 75 155, 90 155 L 225 285 Z"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="70" cy="115" r="18" fill="none" stroke="#52525b" strokeWidth="1.2" />
            <circle cx="70" cy="115" r="6" fill="#09090b" stroke="#71717a" strokeWidth="1" />
            <circle cx="62" cy="115" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="78" cy="115" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="70" cy="107" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="70" cy="123" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />

            {/* Bras 2 : Avant-Droit */}
            <path
              d="M 310 260 L 455 105 C 470 90, 500 105, 500 125 C 500 145, 475 155, 460 155 L 325 285 Z"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="480" cy="115" r="18" fill="none" stroke="#52525b" strokeWidth="1.2" />
            <circle cx="480" cy="115" r="6" fill="#09090b" stroke="#71717a" strokeWidth="1" />
            <circle cx="472" cy="115" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="488" cy="115" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="480" cy="107" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="480" cy="123" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />

            {/* Bras 3 : Arrière-Gauche */}
            <path
              d="M 225 315 L 90 445 C 75 445, 50 455, 50 475 C 50 495, 80 510, 95 495 L 240 340 Z"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="70" cy="485" r="18" fill="none" stroke="#52525b" strokeWidth="1.2" />
            <circle cx="70" cy="485" r="6" fill="#09090b" stroke="#71717a" strokeWidth="1" />
            <circle cx="62" cy="485" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="78" cy="485" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="70" cy="477" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="70" cy="493" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />

            {/* Bras 4 : Arrière-Droit */}
            <path
              d="M 325 315 L 460 445 C 475 445, 500 455, 500 475 C 500 495, 470 510, 455 495 L 310 340 Z"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="480" cy="485" r="18" fill="none" stroke="#52525b" strokeWidth="1.2" />
            <circle cx="480" cy="485" r="6" fill="#09090b" stroke="#71717a" strokeWidth="1" />
            <circle cx="472" cy="485" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="488" cy="485" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="480" cy="477" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="480" cy="493" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />

            {/* Top Plate Carbone */}
            <rect
              x="235"
              y="170"
              width="80"
              height="260"
              rx="18"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '2.5' : '2'}
            />
            {/* Découpes de passage de sangles LiPo et aérations */}
            <rect x="255" y="190" width="40" height="20" rx="5" fill="#fafafa" stroke="#3f3f46" strokeWidth="1.2" />
            <path d="M 255 245 L 275 225 L 295 245 L 275 265 Z" fill="#fafafa" stroke="#3f3f46" strokeWidth="1.2" />
            <circle cx="275" cy="300" r="13" fill="#fafafa" stroke="#3f3f46" strokeWidth="1.2" />
            <path d="M 267 292 L 283 308 M 267 308 L 283 292" stroke="#71717a" strokeWidth="1.5" />
            <path d="M 255 355 L 275 335 L 295 355 L 275 375 Z" fill="#fafafa" stroke="#3f3f46" strokeWidth="1.2" />
            <rect x="255" y="390" width="40" height="24" rx="5" fill="#fafafa" stroke="#3f3f46" strokeWidth="1.2" />

            {/* Entretoises alu anodisées or véritable */}
            <circle cx="245" cy="180" r="4" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />
            <circle cx="305" cy="180" r="4" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />
            <circle cx="245" cy="418" r="4" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />
            <circle cx="305" cy="418" r="4" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />

            {/* Badge Titre */}
            <rect x="236" y="434" width="78" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="275" y="445" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" letterSpacing="0.08em" fill="#000000">
              FRAME CARBONE 3K
            </text>
          </g>

          {/* ====================================================================
              2. VTX MACH 3.1 - En haut à gauche du nez (x=150, y=55)
                 Alu anodisé titane, connecteur MMCX or et afficheur digital LED rouge
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('vtx')}
            onMouseEnter={() => setHoveredId('vtx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('vtx') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="130"
              y="30"
              width="45"
              height="65"
              rx="5"
              fill={isCurrent('vtx') ? '#334155' : '#1e293b'}
              stroke="#09090b"
              strokeWidth={isCurrent('vtx') ? '2.5' : '1.8'}
            />
            {/* Ailettes de refroidissement CNC */}
            <line x1="135" y1="36" x2="170" y2="36" stroke="#475569" strokeWidth="1.2" />
            <line x1="135" y1="40" x2="170" y2="40" stroke="#475569" strokeWidth="1.2" />
            {/* Connecteur MMCX laiton doré */}
            <rect x="162" y="20" width="9" height="11" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />
            <circle cx="166.5" cy="25" r="2.2" fill="#09090b" />
            {/* Afficheur digital LED 7 segments rouge vif */}
            <rect x="138" y="45" width="22" height="23" rx="3" fill="#09090b" stroke="#27272a" strokeWidth="1" />
            <text x="149" y="62" textAnchor="middle" fontSize="16" fontFamily="monospace" fontWeight="900" fill="#ef4444" style={{ filter: 'drop-shadow(0 0 2px #ef4444)' }}>
              8.
            </text>
            {/* Bouton poussoir tactile */}
            <rect x="161" y="68" width="9" height="9" rx="1.5" fill="#f8fafc" stroke="#09090b" strokeWidth="1" />
            <circle cx="165.5" cy="72.5" r="2" fill="#ca8a04" />
            {/* Broches dorées JST */}
            <rect x="135" y="88" width="35" height="5" rx="1" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            {/* Badge Titre */}
            <rect x="127" y="99" width="51" height="14" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="152.5" y="109" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              VTX MACH 3.1
            </text>
          </g>

          {/* ====================================================================
              3. MODULE GPS BLITZ M10 - Juste au-dessus du nez (x=275, y=35)
                 Céramique mate tan/beige véritable, blindage et micro LEDs
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('gps')}
            onMouseEnter={() => setHoveredId('gps')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('gps') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="252"
              y="20"
              width="46"
              height="46"
              rx="6"
              fill={isCurrent('gps') ? '#27272a' : '#18181b'}
              stroke="#09090b"
              strokeWidth={isCurrent('gps') ? '2.5' : '1.8'}
            />
            {/* Antenne patch céramique beige */}
            <rect x="259" y="27" width="32" height="32" rx="3" fill="url(#gpsCeramic)" stroke="#78716c" strokeWidth="1" />
            <circle cx="275" cy="43" r="3.2" fill="url(#aluminumReal)" stroke="#44403c" strokeWidth="0.8" />
            {/* Blindage métallique avec gravure laser */}
            <rect x="264" y="30" width="22" height="8" rx="1.5" fill="#292524" />
            <text x="275" y="36.5" textAnchor="middle" fontSize="5.5" fontFamily="sans-serif" fontWeight="900" fill="#f5f5f4">
              BLITZ M10
            </text>
            {/* Micro LEDs de statut (Fix 3D / Power) */}
            <circle cx="264" cy="54" r="1.8" fill="#22c55e" style={{ filter: 'drop-shadow(0 0 1.5px #22c55e)' }} />
            <circle cx="286" cy="54" r="1.8" fill="#3b82f6" style={{ filter: 'drop-shadow(0 0 1.5px #3b82f6)' }} />
            {/* Connecteur SH1.0 */}
            <rect x="268" y="62" width="14" height="4" rx="0.5" fill="#e2e8f0" stroke="#09090b" strokeWidth="0.8" />
            {/* Badge Titre */}
            <rect x="252" y="69" width="46" height="13" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="275" y="79" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              GPS M10
            </text>
          </g>

          {/* ====================================================================
              4. RÉCEPTEUR FOXEER ELRS 2.4G RX - En haut à droite du nez (x=345, y=55)
                 PCB noir matte, puce RF SX1280 avec marquages réels et IPEX doré
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('rx')}
            onMouseEnter={() => setHoveredId('rx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('rx') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="328"
              y="35"
              width="36"
              height="55"
              rx="4"
              fill={isCurrent('rx') ? '#27272a' : '#18181b'}
              stroke="#09090b"
              strokeWidth={isCurrent('rx') ? '2.5' : '1.8'}
            />
            {/* Connecteur d'antenne IPEX doré */}
            <circle cx="338" cy="44" r="4.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />
            <circle cx="338" cy="44" r="1.8" fill="#09090b" />
            {/* Puce SX1280 RF */}
            <rect x="334" y="52" width="24" height="24" rx="2" fill="#09090b" stroke="#27272a" strokeWidth="0.8" />
            <circle cx="337" cy="55" r="1" fill="#e2e8f0" />
            <text x="346" y="64" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fontWeight="900" fill="#ffffff">
              SX1280
            </text>
            <text x="346" y="71" textAnchor="middle" fontSize="5" fontFamily="sans-serif" fontWeight="700" fill="#38bdf8">
              ELRS 2.4G
            </text>
            {/* 4 Pads dorés ENIG */}
            <rect x="331" y="85" width="5" height="4" rx="0.8" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            <rect x="338" y="85" width="5" height="4" rx="0.8" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            <rect x="345" y="85" width="5" height="4" rx="0.8" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            <rect x="352" y="85" width="5" height="4" rx="0.8" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            {/* Badge Titre */}
            <rect x="326" y="93" width="40" height="13" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="346" y="103" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              ELRS RX
            </text>
          </g>

          {/* ====================================================================
              5. CONDENSATEUR LOW ESR - Flanc gauche extrême (x=20, y=275)
                 Véritable condensateur Rubycon 35V noir à bande dorée négative
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('condo')}
            onMouseEnter={() => setHoveredId('condo')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('condo') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="12"
              y="255"
              width="22"
              height="45"
              rx="4"
              fill={isCurrent('condo') ? '#27272a' : '#18181b'}
              stroke="#09090b"
              strokeWidth={isCurrent('condo') ? '2.5' : '1.8'}
            />
            {/* Bande dorée négative authentique */}
            <rect x="12" y="255" width="7" height="45" rx="1" fill="url(#goldPadReal)" />
            <text x="15.5" y="271" fontSize="9" fill="#09090b" fontWeight="900">-</text>
            <text x="15.5" y="285" fontSize="9" fill="#09090b" fontWeight="900">-</text>
            <text x="15.5" y="297" fontSize="9" fill="#09090b" fontWeight="900">-</text>
            <text x="24" y="277" fontSize="5" fontFamily="sans-serif" fontWeight="900" fill="#facc15" transform="rotate(90, 24, 277)">
              1000µF 35V
            </text>
            {/* Pattes étamées vers l'alimentation */}
            <line x1="34" y1="270" x2="58" y2="270" stroke="url(#aluminumReal)" strokeWidth="2.2" />
            <line x1="34" y1="285" x2="58" y2="285" stroke="url(#aluminumReal)" strokeWidth="2.2" />
            {/* Badge Titre */}
            <rect x="5" y="304" width="36" height="13" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="23" y="314" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              CONDO
            </text>
          </g>

          {/* ====================================================================
              6. CONTRÔLEUR DE VOL FC 30.5x30.5 - Flanc gauche de la frame (x=105, y=275)
                 PCB noir mat, pads or ENIG, silent-blocs silicone jaune et MCU STM32
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('fc')}
            onMouseEnter={() => setHoveredId('fc')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('fc') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="65"
              y="235"
              width="78"
              height="78"
              rx="8"
              fill={isCurrent('fc') ? '#1e293b' : '#0f172a'}
              stroke="#09090b"
              strokeWidth={isCurrent('fc') ? '2.5' : '2'}
            />
            {/* Pistes de circuit imprimé */}
            <path d="M 75 255 L 90 255 L 95 265" fill="none" stroke="#334155" strokeWidth="1.5" />
            <path d="M 130 255 L 115 255 L 110 265" fill="none" stroke="#334155" strokeWidth="1.5" />

            {/* 4 Silent-blocs silicone jaune M3 */}
            <circle cx="75" cy="245" r="5" fill="#facc15" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="133" cy="245" r="5" fill="#facc15" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="75" cy="303" r="5" fill="#facc15" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="133" cy="303" r="5" fill="#facc15" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="75" cy="245" r="2.2" fill="#09090b" />
            <circle cx="133" cy="245" r="2.2" fill="#09090b" />
            <circle cx="75" cy="303" r="2.2" fill="#09090b" />
            <circle cx="133" cy="303" r="2.2" fill="#09090b" />

            {/* Puce STM32F722 centrale */}
            <rect x="88" y="258" width="32" height="32" rx="2" fill="#09090b" stroke="#334155" strokeWidth="1" />
            <circle cx="93" cy="263" r="1.2" fill="#ffffff" />
            <text x="104" y="275" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fontWeight="bold" fill="#ffffff">
              STM32
            </text>
            <text x="104" y="283" textAnchor="middle" fontSize="5.5" fontFamily="monospace" fill="#38bdf8">
              F722 RET6
            </text>

            {/* Port USB-C acier inoxydable */}
            <rect x="96" y="232" width="16" height="5" rx="1.5" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="1" />

            {/* Pads dorés ENIG tout autour */}
            <rect x="83" y="238" width="42" height="3.5" rx="0.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            <rect x="83" y="306.5" width="42" height="3.5" rx="0.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            <rect x="68" y="253" width="3.5" height="42" rx="0.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            <rect x="136.5" y="253" width="3.5" height="42" rx="0.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />

            {/* LEDs de statut Betaflight */}
            <circle cx="124" cy="264" r="1.8" fill="#22c55e" style={{ filter: 'drop-shadow(0 0 2px #22c55e)' }} />
            <circle cx="124" cy="270" r="1.8" fill="#3b82f6" style={{ filter: 'drop-shadow(0 0 2px #3b82f6)' }} />

            {/* Badge Titre */}
            <rect x="75" y="318" width="58" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="104" y="329" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              FC 30x30
            </text>
          </g>

          {/* ====================================================================
              7. VARIATEUR ESC 4-EN-1 55A - Flanc droit de la frame (x=415, y=275)
                 Alu noir mat dissipateur, gros MOSFETs de puissance et bornes dorées
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('esc')}
            onMouseEnter={() => setHoveredId('esc')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('esc') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="368"
              y="235"
              width="78"
              height="78"
              rx="8"
              fill={isCurrent('esc') ? '#27272a' : '#18181b'}
              stroke="#09090b"
              strokeWidth={isCurrent('esc') ? '2.5' : '2'}
            />
            <circle cx="376" cy="243" r="4" fill="#facc15" stroke="#09090b" strokeWidth="1.2" />
            <circle cx="438" cy="243" r="4" fill="#facc15" stroke="#09090b" strokeWidth="1.2" />
            <circle cx="376" cy="305" r="4" fill="#facc15" stroke="#09090b" strokeWidth="1.2" />
            <circle cx="438" cy="305" r="4" fill="#facc15" stroke="#09090b" strokeWidth="1.2" />

            {/* 6 gros pads moteurs latéraux crénelés dorés ENIG */}
            <rect x="362" y="247" width="7" height="11" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.9" />
            <rect x="362" y="269" width="7" height="11" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.9" />
            <rect x="362" y="291" width="7" height="11" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.9" />
            <rect x="445" y="247" width="7" height="11" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.9" />
            <rect x="445" y="269" width="7" height="11" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.9" />
            <rect x="445" y="291" width="7" height="11" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.9" />

            {/* Puces MOSFETs de puissance */}
            <rect x="380" y="248" width="16" height="15" rx="1" fill="#09090b" stroke="#3f3f46" strokeWidth="0.8" />
            <rect x="404" y="248" width="16" height="15" rx="1" fill="#09090b" stroke="#3f3f46" strokeWidth="0.8" />
            <rect x="380" y="271" width="16" height="15" rx="1" fill="#09090b" stroke="#3f3f46" strokeWidth="0.8" />
            <rect x="404" y="271" width="16" height="15" rx="1" fill="#09090b" stroke="#3f3f46" strokeWidth="0.8" />

            {/* Shunt de mesure de courant */}
            <rect x="396" y="266" width="8" height="4" fill="#ffffff" stroke="#09090b" strokeWidth="0.8" />

            {/* Gros plots d'alimentation batterie */}
            <rect x="394" y="308" width="14" height="6" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />
            <text x="397" y="313" fontSize="5" fontWeight="900" fill="#09090b">+</text>
            <text x="405" y="313" fontSize="5" fontWeight="900" fill="#09090b">-</text>

            {/* Badge Titre */}
            <rect x="375" y="318" width="64" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="407" y="329" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              ESC 4-EN-1
            </text>
          </g>

          {/* ====================================================================
              8. MOTEUR BRUSHLESS 2207 - En bas à gauche sous le châssis (x=215, y=515)
                 Arbre titane avec écrou Nyloc, cloche usinée et bobines de cuivre émaillé
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('motor')}
            onMouseEnter={() => setHoveredId('motor')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('motor') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Arbre fileté M5 titane */}
            <rect x="210" y="475" width="8" height="32" rx="1" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="1.2" />
            <line x1="210" y1="482" x2="218" y2="482" stroke="#475569" strokeWidth="1" />
            <line x1="210" y1="488" x2="218" y2="488" stroke="#475569" strokeWidth="1" />
            <line x1="210" y1="494" x2="218" y2="494" stroke="#475569" strokeWidth="1" />
            <line x1="210" y1="500" x2="218" y2="500" stroke="#475569" strokeWidth="1" />

            {/* Vrai écrou Nyloc M5 anodisé noir/argent au sommet */}
            <path d="M 207 470 L 221 470 L 223 477 L 205 477 Z" fill="#1e293b" stroke="#09090b" strokeWidth="1" />

            {/* Cloche moteur alu avec découpes révélant le cuivre véritable des bobines */}
            <path
              d="M 185 507 L 243 507 C 248 507, 252 515, 250 532 C 248 541, 240 544, 214 544 C 188 544, 180 541, 178 532 C 176 515, 180 507, 185 507 Z"
              fill={isCurrent('motor') ? '#334155' : 'url(#titaniumBell)'}
              stroke="#09090b"
              strokeWidth="2"
            />
            {/* Ouvertures d'aération avec bobinages de cuivre émaillé véritable */}
            <rect x="190" y="513" width="8" height="20" rx="2" fill="url(#copperCoilReal)" stroke="#7c2d12" strokeWidth="1" />
            <rect x="202" y="512" width="8" height="23" rx="2" fill="url(#copperCoilReal)" stroke="#7c2d12" strokeWidth="1" />
            <rect x="218" y="512" width="8" height="23" rx="2" fill="url(#copperCoilReal)" stroke="#7c2d12" strokeWidth="1" />
            <rect x="230" y="513" width="8" height="20" rx="2" fill="url(#copperCoilReal)" stroke="#7c2d12" strokeWidth="1" />

            {/* Base stator noire avec vis de serrage d'axe dorée */}
            <rect x="188" y="544" width="52" height="12" rx="2" fill="#09090b" stroke="#334155" strokeWidth="1.2" />
            <circle cx="214" cy="550" r="2.8" fill="url(#goldPadReal)" />

            {/* 3 câbles moteurs en silicone sortant de la base */}
            <path d="M 198 556 L 195 568" stroke="#18181b" strokeWidth="2" />
            <path d="M 214 556 L 214 568" stroke="#0284c7" strokeWidth="2" />
            <path d="M 230 556 L 233 568" stroke="#dc2626" strokeWidth="2" />

            {/* Badge Titre */}
            <rect x="180" y="567" width="68" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="214" y="578" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              MOTEUR 2207
            </text>
          </g>

          {/* ====================================================================
              9. MICRO-CAMÉRA FPV - En bas au milieu sous le châssis (x=295, y=520)
                 Format micro 19x19mm alu rouge Foxeer Predator et lentille en verre traitée
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('cam')}
            onMouseEnter={() => setHoveredId('cam')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('cam') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Boîtier caméra en alliage rouge anodisé Foxeer Predator */}
            <rect
              x="278"
              y="515"
              width="34"
              height="30"
              rx="5"
              fill={isCurrent('cam') ? '#ef4444' : '#dc2626'}
              stroke="#09090b"
              strokeWidth="1.8"
            />
            {/* Bague de filetage d'objectif M12 avec moletage */}
            <rect x="285" y="501" width="20" height="14" rx="3" fill="#09090b" stroke="#334155" strokeWidth="1" />
            <line x1="287" y1="504" x2="303" y2="504" stroke="#475569" strokeWidth="1" />
            {/* Lentille en verre multicouche avec reflet antireflet cyan/bleu nuit réaliste */}
            <circle cx="295" cy="508" r="6.5" fill="url(#lensGlass)" stroke="#09090b" strokeWidth="1" />
            <circle cx="293.5" cy="506.5" r="1.8" fill="#ffffff" opacity="0.8" />
            {/* Vis d'angle latérale en acier */}
            <circle cx="283" cy="530" r="2.5" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="1" />
            <line x1="281" y1="530" x2="285" y2="530" stroke="#09090b" strokeWidth="0.8" />

            {/* Badge Titre */}
            <rect x="264" y="551" width="62" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="295" y="562" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              CAMÉRA FPV
            </text>
          </g>

          {/* ====================================================================
              10. BUZZER AUTONOME VIFLY - En bas à droite sous le bras (x=350, y=430)
                 Boîtier jaune sécurité ViFly Finder 2, micro LiPo et LED stroboscopique
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('vifly')}
            onMouseEnter={() => setHoveredId('vifly')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('vifly') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="338"
              y="410"
              width="24"
              height="35"
              rx="4"
              fill={isCurrent('vifly') ? '#fde047' : '#eab308'}
              stroke="#09090b"
              strokeWidth="1.8"
            />
            {/* Transducteur acoustique piézo */}
            <circle cx="350" cy="423" r="8.5" fill="#09090b" stroke="#27272a" strokeWidth="1" />
            <circle cx="350" cy="423" r="3.5" fill="#f8fafc" />
            {/* Mini LiPo 1S de secours */}
            <rect x="342" y="435" width="16" height="7" rx="1.5" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.8" />
            {/* LED stroboscopique blanche */}
            <circle cx="350" cy="438.5" r="1.8" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 2px #ffffff)' }} />

            {/* Badge Titre */}
            <rect x="331" y="448" width="38" height="13" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="350" y="458" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              BUZZER
            </text>
          </g>

          {/* ====================================================================
              11. ANTENNE IMMORTAL-T - Horizontale en haut au centre-droit (x=410 à 790)
                 Dipôle souple TBS Crossfire avec embouts silicone rouge
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('antenna-rx')}
            onMouseEnter={() => setHoveredId('antenna-rx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('antenna-rx') ? 'url(#realisticShadow)' : undefined}
          >
            <line x1="410" y1="28" x2="790" y2="28" stroke="#09090b" strokeWidth={isCurrent('antenna-rx') ? '4.5' : '3.5'} strokeLinecap="round" />
            <rect x="410" y="23" width="14" height="10" rx="3" fill="#dc2626" stroke="#09090b" strokeWidth="1.2" />
            <rect x="776" y="23" width="14" height="10" rx="3" fill="#dc2626" stroke="#09090b" strokeWidth="1.2" />
            {/* Raccord central surmoulé en T noir */}
            <path d="M 590 19 L 610 19 L 606 38 L 594 38 Z" fill="#09090b" stroke="#27272a" strokeWidth="1.2" />
            {/* Câble coaxial vers le récepteur */}
            <line x1="600" y1="38" x2="600" y2="175" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="600" cy="177" r="3.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />

            {/* Badge Titre */}
            <rect x="545" y="3" width="110" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="600" y="14" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              ANTENNE IMMORTAL-T
            </text>
          </g>

          {/* ====================================================================
              12. ANTENNE VTX LOLLIPOP - Verticale à droite (x=669, y=55 à 240)
                 Dôme cerise rouge Foxeer Lollipop, tige RG402 et connecteur SMA laiton doré
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('antenna-vtx')}
            onMouseEnter={() => setHoveredId('antenna-vtx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('antenna-vtx') ? 'url(#realisticShadow)' : undefined}
          >
            <rect x="660" y="55" width="18" height="24" rx="8" fill={isCurrent('antenna-vtx') ? '#ef4444' : '#dc2626'} stroke="#7f1d1d" strokeWidth="1.5" />
            <circle cx="669" cy="67" r="4.5" fill="#f8fafc" stroke="#09090b" strokeWidth="1" />
            <circle cx="669" cy="67" r="2" fill="url(#goldPadReal)" />
            {/* Câble coaxial semi-rigide RG402 */}
            <line x1="669" y1="79" x2="669" y2="235" stroke="#09090b" strokeWidth="3" />
            {/* Écrou SMA laiton doré */}
            <circle cx="669" cy="237" r="4.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1.2" />

            {/* Badge Titre */}
            <rect x="632" y="36" width="74" height="14" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="669" y="46" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              ANTENNE VTX
            </text>
          </g>

          {/* ====================================================================
              13. LOGO BETAFLIGHT - Tout en haut à droite (x=885, y=55)
                 Guêpe jaune or et rayures noires aérodynamiques
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('betaflight')}
            onMouseEnter={() => setHoveredId('betaflight')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('betaflight') ? 'url(#realisticShadow)' : undefined}
          >
            <path
              d="M 855 35 Q 890 20 910 50 Q 895 72 875 75 Q 855 68 855 35 Z"
              fill={isCurrent('betaflight') ? '#fde047' : '#eab308'}
              stroke="#09090b"
              strokeWidth="2"
            />
            <path d="M 870 38 Q 895 30 905 45" fill="none" stroke="#09090b" strokeWidth="2.5" />
            <path d="M 875 52 Q 900 42 902 60" fill="none" stroke="#09090b" strokeWidth="2.5" />
            <line x1="910" y1="50" x2="919" y2="54" stroke="#09090b" strokeWidth="3.2" strokeLinecap="round" />

            {/* Badge Titre */}
            <rect x="850" y="80" width="70" height="14" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="885" y="90" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              BETAFLIGHT
            </text>
          </g>

          {/* ====================================================================
              14. RADIOCOMMANDE TBS TANGO II - Milieu Droite (x=805, y=240)
                 Silhouette gamepad ergonomique, gimbals Hall avec spikes alu, écran OLED télémétrie
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('tango')}
            onMouseEnter={() => setHoveredId('tango')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('tango') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Boîtier soft-touch noir graphite */}
            <path
              d="M 740 180 C 785 168, 850 168, 895 185 C 915 215, 905 295, 875 310 C 850 295, 825 315, 805 295 C 785 315, 760 295, 735 310 C 705 295, 695 215, 715 185 C 725 175, 732 180, 740 180 Z"
              fill={isCurrent('tango') ? '#27272a' : '#18181b'}
              stroke="#09090b"
              strokeWidth="2.2"
            />
            {/* Grips latéraux caoutchouc */}
            <path d="M 703 210 C 700 240, 710 270, 725 290" fill="none" stroke="#3f3f46" strokeWidth="2.5" strokeDasharray="2 3" />
            <path d="M 907 210 C 910 240, 900 270, 885 290" fill="none" stroke="#3f3f46" strokeWidth="2.5" strokeDasharray="2 3" />

            {/* Antenne T pliable Crossfire */}
            <line x1="755" y1="150" x2="855" y2="150" stroke="#09090b" strokeWidth="4" strokeLinecap="round" />
            <line x1="805" y1="150" x2="805" y2="172" stroke="#09090b" strokeWidth="3" />

            {/* Écran OLED rétro-éclairé noir profond avec télémétrie cyan */}
            <rect x="788" y="195" width="34" height="22" rx="3" fill="#020617" stroke="#334155" strokeWidth="1.2" />
            <text x="805" y="209" textAnchor="middle" fontSize="7" fontFamily="monospace" fontWeight="bold" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 1.5px #38bdf8)' }}>
              TBS T2
            </text>
            <text x="805" y="215" textAnchor="middle" fontSize="4.5" fontFamily="monospace" fill="#94a3b8">
              100Hz • 250mW
            </text>

            {/* Deux Gimbals Hall avec sticks moletés alu rouge */}
            <circle cx="765" cy="235" r="16" fill="#09090b" stroke="#334155" strokeWidth="1.8" />
            <circle cx="765" cy="235" r="5" fill="#dc2626" stroke="#09090b" strokeWidth="1.2" />
            <circle cx="765" cy="235" r="1.5" fill="#ffffff" />

            <circle cx="845" cy="235" r="16" fill="#09090b" stroke="#334155" strokeWidth="1.8" />
            <circle cx="845" cy="235" r="5" fill="#dc2626" stroke="#09090b" strokeWidth="1.2" />
            <circle cx="845" cy="235" r="1.5" fill="#ffffff" />

            {/* Interrupteurs alu */}
            <circle cx="738" cy="265" r="3" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="738" cy="277" r="3" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="738" cy="289" r="3" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.8" />

            {/* Anneau central d'attache tour de cou */}
            <circle cx="805" cy="285" r="3.5" fill="none" stroke="url(#aluminumReal)" strokeWidth="1.2" />

            {/* Badge Titre */}
            <rect x="765" y="321" width="80" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="805" y="332" textAnchor="middle" fontSize="8.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              TBS TANGO II
            </text>
          </g>

          {/* ====================================================================
              15. BATTERIE LIPO 6S AVEC PRISE XT60 - Entre frame et lunettes (x=562, y=390)
                 Pack 6S 1300mAh, prise d'équilibrage JST-XH 7 pins, 12AWG et prise Amass XT60 authentique
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('lipo')}
            onMouseEnter={() => setHoveredId('lipo')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('lipo') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Corps LiPo vertical avec gaine thermo noire mate pro */}
            <rect
              x="535"
              y="360"
              width="54"
              height="115"
              rx="7"
              fill={isCurrent('lipo') ? '#334155' : 'url(#lipoWrapReal)'}
              stroke="#09090b"
              strokeWidth="2"
            />
            {/* Étiquette constructeur authentique 6S 1300mAh 120C */}
            <rect x="541" y="370" width="42" height="24" rx="2" fill="#09090b" stroke="#eab308" strokeWidth="1" />
            <text x="562" y="380" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fontWeight="900" fill="#ffffff">
              6S 1300
            </text>
            <text x="562" y="388" textAnchor="middle" fontSize="5.5" fontFamily="sans-serif" fontWeight="900" fill="#facc15">
              120C 22.2V
            </text>

            {/* Lignes séparatrices des 6 cellules LiPo empilées */}
            <line x1="535" y1="400" x2="589" y2="400" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="535" y1="418" x2="589" y2="418" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="535" y1="436" x2="589" y2="436" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="535" y1="454" x2="589" y2="454" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />

            {/* Prise d'équilibrage JST-XH 7 broches blanche avec nappe multicolore */}
            <rect x="585" y="365" width="10" height="15" rx="1.5" fill="#f8fafc" stroke="#09090b" strokeWidth="0.8" />
            <line x1="586" y1="368" x2="594" y2="368" stroke="#ef4444" strokeWidth="0.6" />
            <line x1="586" y1="371" x2="594" y2="371" stroke="#3b82f6" strokeWidth="0.6" />
            <line x1="586" y1="374" x2="594" y2="374" stroke="#eab308" strokeWidth="0.6" />
            <line x1="586" y1="377" x2="594" y2="377" stroke="#09090b" strokeWidth="0.6" />

            {/* Câbles en boucle en silicone souple haute puissance 12AWG (Rouge + et Noir -) */}
            <path d="M 552 360 C 535 325, 560 300, 565 290" fill="none" stroke="#dc2626" strokeWidth="4" />
            <path d="M 572 360 C 562 330, 575 305, 572 290" fill="none" stroke="#09090b" strokeWidth="4" strokeDasharray="3 3" />

            {/* Prise authentique Amass XT60 jaune vif avec fiches en laiton doré */}
            <path d="M 555 290 L 582 290 L 578 272 L 559 272 Z" fill="url(#xt60Yellow)" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="564" cy="281" r="2.4" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="573" cy="281" r="2.4" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />

            {/* Badge Titre */}
            <rect x="522" y="482" width="80" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="562" y="493" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              LIPO 6S XT60
            </text>
          </g>

          {/* ====================================================================
              16. VRAIES LUNETTES FPV FAT SHARK - En bas à droite sous la Tango (x=805, y=490)
                 Véritable masque FPV avec visière profilée, baie récepteur RapidFIRE avec antenne Pagoda
                 & Patch, ventilateur anti-buée central, sangle réglable et curseurs IPD
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('fatshark')}
            onMouseEnter={() => setHoveredId('fatshark')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('fatshark') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Sangle élastique latérale gauche avec motif technique */}
            <path
              d="M 685 470 L 715 475 L 715 500 L 685 495 Z"
              fill="url(#strapPattern)"
              stroke="#09090b"
              strokeWidth="1.5"
            />
            {/* Boucle de serrage gauche */}
            <rect x="682" y="468" width="5" height="30" rx="1" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.8" />

            {/* Sangle élastique latérale droite avec inscription FAT SHARK */}
            <path
              d="M 895 475 L 930 470 L 930 495 L 895 500 Z"
              fill="url(#strapPattern)"
              stroke="#09090b"
              strokeWidth="1.5"
            />
            <rect x="925" y="468" width="5" height="30" rx="1" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.8" />

            {/* Mousse faciale velours noire (Face foam) visible derrière la coque */}
            <rect
              x="705"
              y="445"
              width="200"
              height="80"
              rx="18"
              fill="#18181b"
              stroke="#09090b"
              strokeWidth="2"
            />

            {/* COQUE PRINCIPALE DU MASQUE FPV (Fat Shark HDO / Dominator) */}
            <rect
              x="712"
              y="442"
              width="186"
              height="74"
              rx="14"
              fill={isCurrent('fatshark') ? '#f1f5f9' : 'url(#goggleShell)'}
              stroke="#09090b"
              strokeWidth="2.2"
            />

            {/* Échancrure centrale inférieure pour le nez du pilote */}
            <path
              d="M 788 516 C 795 506, 815 506, 822 516 Z"
              fill="#18181b"
              stroke="#09090b"
              strokeWidth="1.5"
            />

            {/* Dôme supérieur ventilateur anti-buée (Fan cowl) avec lamelles d'aération */}
            <rect x="785" y="432" width="40" height="13" rx="4" fill="#09090b" stroke="#334155" strokeWidth="1.2" />
            <line x1="792" y1="434" x2="792" y2="443" stroke="#f8fafc" strokeWidth="1" />
            <line x1="798" y1="434" x2="798" y2="443" stroke="#f8fafc" strokeWidth="1" />
            <line x1="805" y1="434" x2="805" y2="443" stroke="#f8fafc" strokeWidth="1" />
            <line x1="812" y1="434" x2="812" y2="443" stroke="#f8fafc" strokeWidth="1" />
            <line x1="818" y1="434" x2="818" y2="443" stroke="#f8fafc" strokeWidth="1" />

            {/* Boutons sur la tranche supérieure (Bouton DVR, Joystick de menu, Jack alimentation) */}
            <circle cx="750" cy="440" r="3" fill="#09090b" stroke="url(#aluminumReal)" strokeWidth="0.8" />
            <circle cx="765" cy="439" r="2.5" fill="#ef4444" style={{ filter: 'drop-shadow(0 0 1px #ef4444)' }} />
            <circle cx="845" cy="439" r="3" fill="#09090b" stroke="url(#aluminumReal)" strokeWidth="0.8" />
            <rect x="855" y="437" width="8" height="4" rx="1" fill="#09090b" />

            {/* BAIE RÉCEPTEUR GAUCHE : Module RapidFIRE avec écran OLED et antenne */}
            <rect
              x="718"
              y="450"
              width="38"
              height="58"
              rx="6"
              fill="#1e293b"
              stroke="#09090b"
              strokeWidth="1.5"
            />
            {/* Petit écran OLED du récepteur RapidFIRE */}
            <rect x="723" y="456" width="28" height="15" rx="2" fill="#020617" stroke="#334155" strokeWidth="0.8" />
            <text x="737" y="466" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fontWeight="bold" fill="#38bdf8">
              R4 5760
            </text>
            <circle cx="737" cy="482" r="3" fill="#09090b" stroke="url(#aluminumReal)" strokeWidth="0.8" />
            {/* Connecteur SMA doré femelle au sommet de la baie */}
            <rect x="731" y="443" width="12" height="7" rx="1" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            {/* Antenne omnidirectionnelle Pagoda / Mushroom au-dessus */}
            <line x1="737" y1="443" x2="737" y2="415" stroke="#09090b" strokeWidth="2.5" />
            <circle cx="737" cy="413" r="7" fill="#dc2626" stroke="#09090b" strokeWidth="1.2" />
            <circle cx="737" cy="413" r="3" fill="#fde047" />

            {/* BAIE RÉCEPTEUR DROITE : Trappe secondaire avec antenne patch directionnelle */}
            <rect
              x="854"
              y="450"
              width="38"
              height="58"
              rx="6"
              fill="#1e293b"
              stroke="#09090b"
              strokeWidth="1.5"
            />
            <rect x="860" y="456" width="26" height="24" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
            {/* Logo de polarisation RHCP */}
            <circle cx="873" cy="468" r="6" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
            {/* Connecteur SMA doré */}
            <rect x="867" y="443" width="12" height="7" rx="1" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            {/* Antenne Patch carrée directionnelle (Menace Invader / ImmersionRC) */}
            <line x1="873" y1="443" x2="873" y2="423" stroke="#09090b" strokeWidth="2.5" />
            <rect x="861" y="405" width="24" height="20" rx="3" fill="#18181b" stroke="#dc2626" strokeWidth="1.5" />
            <circle cx="873" cy="415" r="4" fill="#dc2626" />

            {/* VISIÈRE CENTRALE AVEC MARQUAGE OFFICIEL FAT SHARK */}
            <text x="805" y="475" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.1em" fill="#09090b">
              FAT SHARK
            </text>
            <text x="805" y="487" textAnchor="middle" fontSize="6.5" fontFamily="sans-serif" fontWeight="800" letterSpacing="0.2em" fill="#2563eb">
              HDO2 OLED
            </text>
            <text x="805" y="496" textAnchor="middle" fontSize="5" fontFamily="sans-serif" fontWeight="600" fill="#64748b">
              1280x960 • 46° FOV
            </text>

            {/* Deux curseurs de réglage IPD (Interpupillary Distance 59-69mm) sous la coque */}
            <rect x="760" y="516" width="14" height="4" rx="1" fill="#09090b" stroke="url(#aluminumReal)" strokeWidth="0.6" />
            <rect x="836" y="516" width="14" height="4" rx="1" fill="#09090b" stroke="url(#aluminumReal)" strokeWidth="0.6" />

            {/* Badge Titre */}
            <rect x="753" y="540" width="104" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="805" y="551" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
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
        <div className="absolute bottom-3 left-4 bg-white/95 px-3 py-1.5 rounded-xl border border-black/30 text-[11px] text-zinc-700 flex items-center gap-2 pointer-events-none shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Matériel FPV 100% réaliste • Lunettes HDO2 avec récepteur RapidFIRE & antennes, carbone 3K, LiPo XT60</span>
        </div>

      </div>

      {/* Barre d'état sous le schéma */}
      <div className="w-full max-w-[1360px] mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 border-t-[1.5px] border-dashed border-black/30 pt-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-black uppercase tracking-wider text-[11px]">
            Matériaux & Composants Réels :
          </span>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#18181b] border border-zinc-400" /> Carbone 3K & PCB Pro</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ea580c] border border-orange-700" /> Cuivre Émaillé Stator</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#eab308] border border-yellow-700" /> Or ENIG & Prise XT60</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#f8fafc] border border-zinc-400" /> Lunettes Fat Shark & Antennes</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#dc2626] border border-red-700" /> Caméra & TBS Immortal-T</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-black font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Fidélité FPV Réaliste • Déploiement automatique direct OVH</span>
        </div>
      </div>

    </section>
  );
}
