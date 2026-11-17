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

        {/* Lignes directrices de repérage CAO alignées sur la frame Figma (Centre X=415, Y=320) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
          <line x1="415" y1="0" x2="415" y2="620" stroke="#71717a" strokeWidth="0.8" strokeDasharray="4 6" />
          <line x1="0" y1="320" x2="1000" y2="320" stroke="#71717a" strokeWidth="0.8" strokeDasharray="4 6" />
          <circle cx="415" cy="320" r="170" fill="none" stroke="#71717a" strokeWidth="0.6" strokeDasharray="3 5" />
          <circle cx="840" cy="370" r="140" fill="none" stroke="#71717a" strokeWidth="0.6" strokeDasharray="3 5" />
        </svg>

        {/* SVG vectoriel de haute précision - Échelle et disposition 1:1 avec le Figma */}
        <svg
          viewBox="0 0 1000 620"
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

            {/* Aluminium argenté poli */}
            <linearGradient id="aluminumReal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            {/* Plastique connecteur Amass XT60 jaune */}
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
              1. CHÂSSIS CARBONE TRUE-X (FRAME) - Centré exactement selon Figma (x=415, y=320)
                 Fibre de carbone 3K T700, 4 bras symétriques, chanfreins CNC
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('frame')}
            onMouseEnter={() => setHoveredId('frame')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('frame') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Bras 1 : Avant-Gauche (x=400..260, y=260..195) */}
            <path
              d="M 395 260 L 285 185 C 275 175, 245 190, 245 210 C 245 225, 270 235, 285 235 L 385 285 Z"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="260" cy="195" r="18" fill="none" stroke="#52525b" strokeWidth="1.2" />
            <circle cx="260" cy="195" r="6" fill="#09090b" stroke="#71717a" strokeWidth="1" />
            <circle cx="252" cy="195" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="268" cy="195" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="260" cy="187" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="260" cy="203" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />

            {/* Bras 2 : Avant-Droit (x=430..570, y=260..195) */}
            <path
              d="M 435 260 L 545 185 C 555 175, 585 190, 585 210 C 585 225, 560 235, 545 235 L 445 285 Z"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="570" cy="195" r="18" fill="none" stroke="#52525b" strokeWidth="1.2" />
            <circle cx="570" cy="195" r="6" fill="#09090b" stroke="#71717a" strokeWidth="1" />
            <circle cx="562" cy="195" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="578" cy="195" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="570" cy="187" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="570" cy="203" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />

            {/* Bras 3 : Arrière-Gauche (x=385..260, y=360..445) */}
            <path
              d="M 385 355 L 285 435 C 270 435, 245 445, 245 465 C 245 485, 275 500, 285 485 L 395 380 Z"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="260" cy="445" r="18" fill="none" stroke="#52525b" strokeWidth="1.2" />
            <circle cx="260" cy="445" r="6" fill="#09090b" stroke="#71717a" strokeWidth="1" />
            <circle cx="252" cy="445" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="268" cy="445" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="260" cy="437" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="260" cy="453" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />

            {/* Bras 4 : Arrière-Droit (x=445..570, y=360..445) */}
            <path
              d="M 445 355 L 545 435 C 560 435, 585 445, 585 465 C 585 485, 555 500, 545 485 L 435 380 Z"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="570" cy="445" r="18" fill="none" stroke="#52525b" strokeWidth="1.2" />
            <circle cx="570" cy="445" r="6" fill="#09090b" stroke="#71717a" strokeWidth="1" />
            <circle cx="562" cy="445" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="578" cy="445" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="570" cy="437" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="570" cy="453" r="2.2" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.5" />

            {/* Fuselage / Top Plate Carbone (x=385..445, y=175..455) */}
            <rect
              x="385"
              y="175"
              width="60"
              height="280"
              rx="16"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '2.5' : '2'}
            />
            {/* Découpes de passage de sangles LiPo et aérations CNC */}
            <rect x="398" y="195" width="34" height="18" rx="4" fill="#fafafa" stroke="#3f3f46" strokeWidth="1.2" />
            <path d="M 400 245 L 415 225 L 430 245 L 415 265 Z" fill="#fafafa" stroke="#3f3f46" strokeWidth="1.2" />
            <circle cx="415" cy="300" r="12" fill="#fafafa" stroke="#3f3f46" strokeWidth="1.2" />
            <path d="M 408 293 L 422 307 M 408 307 L 422 293" stroke="#71717a" strokeWidth="1.5" />
            <path d="M 400 355 L 415 335 L 430 355 L 415 375 Z" fill="#fafafa" stroke="#3f3f46" strokeWidth="1.2" />
            <rect x="398" y="390" width="34" height="22" rx="4" fill="#fafafa" stroke="#3f3f46" strokeWidth="1.2" />

            {/* Entretoises alu CNC dorées (Standoffs) */}
            <circle cx="395" cy="185" r="3.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />
            <circle cx="435" cy="185" r="3.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />
            <circle cx="395" cy="445" r="3.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />
            <circle cx="435" cy="445" r="3.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />

            {/* Badge Titre */}
            <rect x="376" y="462" width="78" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="415" y="473" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" letterSpacing="0.08em" fill="#000000">
              FRAME CARBONE 3K
            </text>
          </g>

          {/* ====================================================================
              2. VTX MACH 3.1 - En haut à gauche du nez (x=305..350, y=70..140)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('vtx')}
            onMouseEnter={() => setHoveredId('vtx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('vtx') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="305"
              y="70"
              width="45"
              height="65"
              rx="5"
              fill={isCurrent('vtx') ? '#334155' : '#1e293b'}
              stroke="#09090b"
              strokeWidth={isCurrent('vtx') ? '2.5' : '1.8'}
            />
            <line x1="310" y1="76" x2="345" y2="76" stroke="#475569" strokeWidth="1.2" />
            <line x1="310" y1="80" x2="345" y2="80" stroke="#475569" strokeWidth="1.2" />
            {/* Connecteur MMCX laiton doré */}
            <rect x="337" y="60" width="9" height="11" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />
            <circle cx="341.5" cy="65" r="2.2" fill="#09090b" />
            {/* Afficheur digital LED 7 segments rouge vif */}
            <rect x="313" y="85" width="22" height="23" rx="3" fill="#09090b" stroke="#27272a" strokeWidth="1" />
            <text x="324" y="102" textAnchor="middle" fontSize="16" fontFamily="monospace" fontWeight="900" fill="#ef4444" style={{ filter: 'drop-shadow(0 0 2px #ef4444)' }}>
              8.
            </text>
            <rect x="336" y="108" width="9" height="9" rx="1.5" fill="#f8fafc" stroke="#09090b" strokeWidth="1" />
            <circle cx="340.5" cy="112.5" r="2" fill="#ca8a04" />
            <rect x="310" y="128" width="35" height="5" rx="1" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            {/* Badge Titre */}
            <rect x="302" y="139" width="51" height="14" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="327.5" y="149" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              VTX MACH 3.1
            </text>
          </g>

          {/* ====================================================================
              3. MODULE GPS BLITZ M10 - Juste au-dessus du nez (x=392..438, y=65..115)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('gps')}
            onMouseEnter={() => setHoveredId('gps')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('gps') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="392"
              y="65"
              width="46"
              height="46"
              rx="6"
              fill={isCurrent('gps') ? '#27272a' : '#18181b'}
              stroke="#09090b"
              strokeWidth={isCurrent('gps') ? '2.5' : '1.8'}
            />
            {/* Antenne patch céramique beige */}
            <rect x="399" y="72" width="32" height="32" rx="3" fill="url(#gpsCeramic)" stroke="#78716c" strokeWidth="1" />
            <circle cx="415" cy="88" r="3.2" fill="url(#aluminumReal)" stroke="#44403c" strokeWidth="0.8" />
            {/* Blindage métallique avec gravure laser */}
            <rect x="404" y="75" width="22" height="8" rx="1.5" fill="#292524" />
            <text x="415" y="81.5" textAnchor="middle" fontSize="5.5" fontFamily="sans-serif" fontWeight="900" fill="#f5f5f4">
              BLITZ M10
            </text>
            <circle cx="404" cy="99" r="1.8" fill="#22c55e" style={{ filter: 'drop-shadow(0 0 1.5px #22c55e)' }} />
            <circle cx="426" cy="99" r="1.8" fill="#3b82f6" style={{ filter: 'drop-shadow(0 0 1.5px #3b82f6)' }} />
            <rect x="408" y="107" width="14" height="4" rx="0.5" fill="#e2e8f0" stroke="#09090b" strokeWidth="0.8" />
            {/* Badge Titre */}
            <rect x="392" y="115" width="46" height="13" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="415" y="125" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              GPS M10
            </text>
          </g>

          {/* ====================================================================
              4. RÉCEPTEUR FOXEER ELRS 2.4G RX - En haut à droite du nez (x=480..520, y=75..135)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('rx')}
            onMouseEnter={() => setHoveredId('rx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('rx') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="480"
              y="75"
              width="36"
              height="55"
              rx="4"
              fill={isCurrent('rx') ? '#27272a' : '#18181b'}
              stroke="#09090b"
              strokeWidth={isCurrent('rx') ? '2.5' : '1.8'}
            />
            {/* Connecteur d'antenne IPEX doré */}
            <circle cx="490" cy="84" r="4.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />
            <circle cx="490" cy="84" r="1.8" fill="#09090b" />
            {/* Puce SX1280 RF */}
            <rect x="486" y="92" width="24" height="24" rx="2" fill="#09090b" stroke="#27272a" strokeWidth="0.8" />
            <circle cx="489" cy="95" r="1" fill="#e2e8f0" />
            <text x="498" y="104" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fontWeight="900" fill="#ffffff">
              SX1280
            </text>
            <text x="498" y="111" textAnchor="middle" fontSize="5" fontFamily="sans-serif" fontWeight="700" fill="#38bdf8">
              ELRS 2.4G
            </text>
            <rect x="483" y="125" width="5" height="4" rx="0.8" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            <rect x="490" y="125" width="5" height="4" rx="0.8" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            <rect x="497" y="125" width="5" height="4" rx="0.8" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            <rect x="504" y="125" width="5" height="4" rx="0.8" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            {/* Badge Titre */}
            <rect x="478" y="133" width="40" height="13" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="498" y="143" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              ELRS RX
            </text>
          </g>

          {/* ====================================================================
              5. CONDENSATEUR LOW ESR - Flanc gauche extrême (x=210..235, y=295..345)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('condo')}
            onMouseEnter={() => setHoveredId('condo')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('condo') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="210"
              y="295"
              width="22"
              height="45"
              rx="4"
              fill={isCurrent('condo') ? '#27272a' : '#18181b'}
              stroke="#09090b"
              strokeWidth={isCurrent('condo') ? '2.5' : '1.8'}
            />
            {/* Bande dorée négative authentique */}
            <rect x="210" y="295" width="7" height="45" rx="1" fill="url(#goldPadReal)" />
            <text x="213.5" y="311" fontSize="9" fill="#09090b" fontWeight="900">-</text>
            <text x="213.5" y="325" fontSize="9" fill="#09090b" fontWeight="900">-</text>
            <text x="213.5" y="337" fontSize="9" fill="#09090b" fontWeight="900">-</text>
            <text x="222" y="317" fontSize="5" fontFamily="sans-serif" fontWeight="900" fill="#facc15" transform="rotate(90, 222, 317)">
              1000µF 35V
            </text>
            <line x1="232" y1="310" x2="265" y2="310" stroke="url(#aluminumReal)" strokeWidth="2" />
            <line x1="232" y1="325" x2="265" y2="325" stroke="url(#aluminumReal)" strokeWidth="2" />
            {/* Badge Titre */}
            <rect x="203" y="344" width="36" height="13" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="221" y="354" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              CONDO
            </text>
          </g>

          {/* ====================================================================
              6. CONTRÔLEUR DE VOL FC 30.5x30.5 - Dans le creux des bras gauches (x=270..350, y=275..355)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('fc')}
            onMouseEnter={() => setHoveredId('fc')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('fc') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="270"
              y="275"
              width="80"
              height="80"
              rx="8"
              fill={isCurrent('fc') ? '#1e293b' : '#0f172a'}
              stroke="#09090b"
              strokeWidth={isCurrent('fc') ? '2.5' : '2'}
            />
            {/* Pistes de circuit imprimé */}
            <path d="M 280 295 L 295 295 L 300 305" fill="none" stroke="#334155" strokeWidth="1.5" />
            <path d="M 340 295 L 325 295 L 320 305" fill="none" stroke="#334155" strokeWidth="1.5" />

            {/* 4 Silent-blocs silicone jaune M3 */}
            <circle cx="280" cy="285" r="5" fill="#facc15" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="340" cy="285" r="5" fill="#facc15" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="280" cy="345" r="5" fill="#facc15" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="340" cy="345" r="5" fill="#facc15" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="280" cy="285" r="2.2" fill="#09090b" />
            <circle cx="340" cy="285" r="2.2" fill="#09090b" />
            <circle cx="280" cy="345" r="2.2" fill="#09090b" />
            <circle cx="340" cy="345" r="2.2" fill="#09090b" />

            {/* Puce STM32F722 centrale */}
            <rect x="294" y="299" width="32" height="32" rx="2" fill="#09090b" stroke="#334155" strokeWidth="1" />
            <circle cx="299" cy="304" r="1.2" fill="#ffffff" />
            <text x="310" y="316" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fontWeight="bold" fill="#ffffff">
              STM32
            </text>
            <text x="310" y="324" textAnchor="middle" fontSize="5.5" fontFamily="monospace" fill="#38bdf8">
              F722 RET6
            </text>

            <rect x="302" y="272" width="16" height="5" rx="1.5" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="1" />

            {/* Pads dorés ENIG tout autour */}
            <rect x="288" y="278" width="44" height="3.5" rx="0.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            <rect x="288" y="348.5" width="44" height="3.5" rx="0.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            <rect x="273" y="293" width="3.5" height="44" rx="0.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            <rect x="343.5" y="293" width="3.5" height="44" rx="0.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />

            <circle cx="330" cy="304" r="1.8" fill="#22c55e" style={{ filter: 'drop-shadow(0 0 2px #22c55e)' }} />
            <circle cx="330" cy="310" r="1.8" fill="#3b82f6" style={{ filter: 'drop-shadow(0 0 2px #3b82f6)' }} />

            {/* Badge Titre */}
            <rect x="281" y="360" width="58" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="310" y="371" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              FC 30x30
            </text>
          </g>

          {/* ====================================================================
              7. VARIATEUR ESC 4-EN-1 55A - Dans le creux des bras droits (x=480..560, y=275..355)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('esc')}
            onMouseEnter={() => setHoveredId('esc')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('esc') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="480"
              y="275"
              width="80"
              height="80"
              rx="8"
              fill={isCurrent('esc') ? '#27272a' : '#18181b'}
              stroke="#09090b"
              strokeWidth={isCurrent('esc') ? '2.5' : '2'}
            />
            <circle cx="488" cy="283" r="4" fill="#facc15" stroke="#09090b" strokeWidth="1.2" />
            <circle cx="552" cy="283" r="4" fill="#facc15" stroke="#09090b" strokeWidth="1.2" />
            <circle cx="488" cy="347" r="4" fill="#facc15" stroke="#09090b" strokeWidth="1.2" />
            <circle cx="552" cy="347" r="4" fill="#facc15" stroke="#09090b" strokeWidth="1.2" />

            {/* 6 gros pads moteurs latéraux crénelés dorés ENIG */}
            <rect x="474" y="287" width="7" height="11" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.9" />
            <rect x="474" y="309" width="7" height="11" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.9" />
            <rect x="474" y="331" width="7" height="11" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.9" />
            <rect x="559" y="287" width="7" height="11" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.9" />
            <rect x="559" y="309" width="7" height="11" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.9" />
            <rect x="559" y="331" width="7" height="11" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.9" />

            {/* Puces MOSFETs de puissance */}
            <rect x="492" y="288" width="16" height="15" rx="1" fill="#09090b" stroke="#3f3f46" strokeWidth="0.8" />
            <rect x="516" y="288" width="16" height="15" rx="1" fill="#09090b" stroke="#3f3f46" strokeWidth="0.8" />
            <rect x="492" y="311" width="16" height="15" rx="1" fill="#09090b" stroke="#3f3f46" strokeWidth="0.8" />
            <rect x="516" y="311" width="16" height="15" rx="1" fill="#09090b" stroke="#3f3f46" strokeWidth="0.8" />

            <rect x="508" y="306" width="8" height="4" fill="#ffffff" stroke="#09090b" strokeWidth="0.8" />

            <rect x="506" y="348" width="14" height="6" rx="1.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />
            <text x="509" y="353" fontSize="5" fontWeight="900" fill="#09090b">+</text>
            <text x="517" y="353" fontSize="5" fontWeight="900" fill="#09090b">-</text>

            {/* Badge Titre */}
            <rect x="488" y="360" width="64" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="520" y="371" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              ESC 4-EN-1
            </text>
          </g>

          {/* ====================================================================
              8. MOTEUR BRUSHLESS 2207 - Sous le bras arrière-gauche (x=300..370, y=475..555)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('motor')}
            onMouseEnter={() => setHoveredId('motor')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('motor') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Arbre fileté M5 titane avec écrou Nyloc au sommet */}
            <rect x="331" y="475" width="8" height="30" rx="1" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="1.2" />
            <line x1="331" y1="482" x2="339" y2="482" stroke="#475569" strokeWidth="1" />
            <line x1="331" y1="488" x2="339" y2="488" stroke="#475569" strokeWidth="1" />
            <line x1="331" y1="494" x2="339" y2="494" stroke="#475569" strokeWidth="1" />
            <path d="M 328 470 L 342 470 L 344 477 L 326 477 Z" fill="#1e293b" stroke="#09090b" strokeWidth="1" />

            {/* Cloche moteur alu avec découpes révélant le cuivre véritable des bobines */}
            <path
              d="M 306 505 L 364 505 C 369 505, 373 513, 371 530 C 369 539, 361 542, 335 542 C 309 542, 301 539, 299 530 C 297 513, 301 505, 306 505 Z"
              fill={isCurrent('motor') ? '#334155' : 'url(#titaniumBell)'}
              stroke="#09090b"
              strokeWidth="2"
            />
            {/* Bobinages de cuivre émaillé véritable */}
            <rect x="311" y="511" width="8" height="20" rx="2" fill="url(#copperCoilReal)" stroke="#7c2d12" strokeWidth="1" />
            <rect x="323" y="510" width="8" height="23" rx="2" fill="url(#copperCoilReal)" stroke="#7c2d12" strokeWidth="1" />
            <rect x="339" y="510" width="8" height="23" rx="2" fill="url(#copperCoilReal)" stroke="#7c2d12" strokeWidth="1" />
            <rect x="351" y="511" width="8" height="20" rx="2" fill="url(#copperCoilReal)" stroke="#7c2d12" strokeWidth="1" />

            {/* Base stator */}
            <rect x="309" y="542" width="52" height="12" rx="2" fill="#09090b" stroke="#334155" strokeWidth="1.2" />
            <circle cx="335" cy="548" r="2.8" fill="url(#goldPadReal)" />

            {/* Badge Titre */}
            <rect x="301" y="560" width="68" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="335" y="571" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              MOTEUR 2207
            </text>
          </g>

          {/* ====================================================================
              9. MICRO-CAMÉRA FPV - Directement sous la queue du châssis (x=422..468, y=485..545)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('cam')}
            onMouseEnter={() => setHoveredId('cam')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('cam') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Boîtier caméra alu noir/magnésium avec étrier de fixation */}
            <rect
              x="422"
              y="505"
              width="36"
              height="30"
              rx="4"
              fill={isCurrent('cam') ? '#334155' : '#1e293b'}
              stroke="#09090b"
              strokeWidth="1.8"
            />
            {/* Objectif optique fileté M12 */}
            <rect x="430" y="491" width="20" height="15" rx="3" fill="#09090b" stroke="#334155" strokeWidth="1" />
            <line x1="432" y1="495" x2="448" y2="495" stroke="#475569" strokeWidth="1" />
            <circle cx="440" cy="498" r="6.5" fill="url(#lensGlass)" stroke="#09090b" strokeWidth="1" />
            <circle cx="438.5" cy="496.5" r="1.8" fill="#ffffff" opacity="0.8" />
            <circle cx="427" cy="520" r="2.5" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="1" />

            {/* Badge Titre */}
            <rect x="409" y="542" width="62" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="440" y="553" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              CAMÉRA FPV
            </text>
          </g>

          {/* ====================================================================
              10. BUZZER AUTONOME VIFLY - En bas à droite sous le fuselage (x=495..530, y=435..485)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('vifly')}
            onMouseEnter={() => setHoveredId('vifly')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('vifly') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="498"
              y="435"
              width="24"
              height="35"
              rx="4"
              fill={isCurrent('vifly') ? '#fde047' : '#eab308'}
              stroke="#09090b"
              strokeWidth="1.8"
            />
            <circle cx="510" cy="448" r="8.5" fill="#09090b" stroke="#27272a" strokeWidth="1" />
            <circle cx="510" cy="448" r="3.5" fill="#f8fafc" />
            <rect x="502" y="460" width="16" height="7" rx="1.5" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="510" cy="463.5" r="1.8" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 2px #ffffff)' }} />

            {/* Badge Titre */}
            <rect x="491" y="473" width="38" height="13" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="510" y="483" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              BUZZER
            </text>
          </g>

          {/* ====================================================================
              11. ANTENNE IMMORTAL-T - Horizontale en haut au centre-droit (x=525..820, y=90)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('antenna-rx')}
            onMouseEnter={() => setHoveredId('antenna-rx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('antenna-rx') ? 'url(#realisticShadow)' : undefined}
          >
            <line x1="525" y1="90" x2="820" y2="90" stroke="#09090b" strokeWidth={isCurrent('antenna-rx') ? '4.5' : '3.5'} strokeLinecap="round" />
            <rect x="525" y="85" width="14" height="10" rx="3" fill="#dc2626" stroke="#09090b" strokeWidth="1.2" />
            <rect x="806" y="85" width="14" height="10" rx="3" fill="#dc2626" stroke="#09090b" strokeWidth="1.2" />
            <path d="M 662 81 L 682 81 L 678 100 L 666 100 Z" fill="#09090b" stroke="#27272a" strokeWidth="1.2" />
            {/* Câble coaxial descendant */}
            <line x1="672" y1="100" x2="672" y2="240" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="672" cy="242" r="3.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1" />

            {/* Badge Titre */}
            <rect x="617" y="65" width="110" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="672" y="76" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              ANTENNE IMMORTAL-T
            </text>
          </g>

          {/* ====================================================================
              12. ANTENNE VTX LOLLIPOP - Verticale à droite (x=705, y=115..265)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('antenna-vtx')}
            onMouseEnter={() => setHoveredId('antenna-vtx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('antenna-vtx') ? 'url(#realisticShadow)' : undefined}
          >
            <rect x="696" y="115" width="18" height="24" rx="8" fill={isCurrent('antenna-vtx') ? '#334155' : '#18181b'} stroke="#09090b" strokeWidth="1.5" />
            <circle cx="705" cy="127" r="4.5" fill="#f8fafc" stroke="#09090b" strokeWidth="1" />
            <circle cx="705" cy="127" r="2" fill="url(#goldPadReal)" />
            <line x1="705" y1="139" x2="705" y2="260" stroke="#09090b" strokeWidth="3" />
            <circle cx="705" cy="262" r="4.5" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="1.2" />

            {/* Badge Titre */}
            <rect x="668" y="268" width="74" height="14" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="705" y="278" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              ANTENNE VTX
            </text>
          </g>

          {/* ====================================================================
              13. LOGO BETAFLIGHT - Tout en haut à droite (x=835..915, y=75..145)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('betaflight')}
            onMouseEnter={() => setHoveredId('betaflight')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('betaflight') ? 'url(#realisticShadow)' : undefined}
          >
            <path
              d="M 845 80 Q 880 65 900 95 Q 885 117 865 120 Q 845 113 845 80 Z"
              fill={isCurrent('betaflight') ? '#fde047' : '#eab308'}
              stroke="#09090b"
              strokeWidth="2"
            />
            <path d="M 860 83 Q 885 75 895 90" fill="none" stroke="#09090b" strokeWidth="2.5" />
            <path d="M 865 97 Q 890 87 892 105" fill="none" stroke="#09090b" strokeWidth="2.5" />
            <line x1="900" y1="95" x2="909" y2="99" stroke="#09090b" strokeWidth="3.2" strokeLinecap="round" />

            {/* Badge Titre */}
            <rect x="840" y="125" width="70" height="14" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="875" y="135" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              BETAFLIGHT
            </text>
          </g>

          {/* ====================================================================
              14. RADIOCOMMANDE TBS TANGO II - Milieu Droite (x=745..935, y=200..365)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('tango')}
            onMouseEnter={() => setHoveredId('tango')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('tango') ? 'url(#realisticShadow)' : undefined}
          >
            <path
              d="M 775 220 C 820 208, 885 208, 930 225 C 950 255, 940 335, 910 350 C 885 335, 860 355, 840 335 C 820 355, 795 335, 770 350 C 740 335, 730 255, 750 225 C 760 215, 767 220, 775 220 Z"
              fill={isCurrent('tango') ? '#27272a' : '#18181b'}
              stroke="#09090b"
              strokeWidth="2.2"
            />
            <path d="M 738 250 C 735 280, 745 310, 760 330" fill="none" stroke="#3f3f46" strokeWidth="2.5" strokeDasharray="2 3" />
            <path d="M 942 250 C 945 280, 935 310, 920 330" fill="none" stroke="#3f3f46" strokeWidth="2.5" strokeDasharray="2 3" />

            <line x1="790" y1="190" x2="890" y2="190" stroke="#09090b" strokeWidth="4" strokeLinecap="round" />
            <line x1="840" y1="190" x2="840" y2="212" stroke="#09090b" strokeWidth="3" />

            {/* Écran OLED */}
            <rect x="823" y="235" width="34" height="22" rx="3" fill="#020617" stroke="#334155" strokeWidth="1.2" />
            <text x="840" y="249" textAnchor="middle" fontSize="7" fontFamily="monospace" fontWeight="bold" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 1.5px #38bdf8)' }}>
              TBS T2
            </text>
            <text x="840" y="255" textAnchor="middle" fontSize="4.5" fontFamily="monospace" fill="#94a3b8">
              100Hz • 250mW
            </text>

            {/* Gimbals */}
            <circle cx="800" cy="275" r="16" fill="#09090b" stroke="#334155" strokeWidth="1.8" />
            <circle cx="800" cy="275" r="5" fill="#dc2626" stroke="#09090b" strokeWidth="1.2" />
            <circle cx="800" cy="275" r="1.5" fill="#ffffff" />

            <circle cx="880" cy="275" r="16" fill="#09090b" stroke="#334155" strokeWidth="1.8" />
            <circle cx="880" cy="275" r="5" fill="#dc2626" stroke="#09090b" strokeWidth="1.2" />
            <circle cx="880" cy="275" r="1.5" fill="#ffffff" />

            <circle cx="773" cy="305" r="3" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="773" cy="317" r="3" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="773" cy="329" r="3" fill="url(#aluminumReal)" stroke="#09090b" strokeWidth="0.8" />

            <circle cx="840" cy="325" r="3.5" fill="none" stroke="url(#aluminumReal)" strokeWidth="1.2" />

            {/* Badge Titre */}
            <rect x="800" y="361" width="80" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="840" y="372" textAnchor="middle" fontSize="8.5" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              TBS TANGO II
            </text>
          </g>

          {/* ====================================================================
              15. BATTERIE LIPO 6S AVEC PRISE XT60 - Entre frame et Tango/Fat Shark (x=615..675, y=345..495)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('lipo')}
            onMouseEnter={() => setHoveredId('lipo')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('lipo') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="615"
              y="345"
              width="54"
              height="115"
              rx="7"
              fill={isCurrent('lipo') ? '#334155' : 'url(#lipoWrapReal)'}
              stroke="#09090b"
              strokeWidth="2"
            />
            {/* Étiquette Tattu R-Line */}
            <rect x="621" y="355" width="42" height="24" rx="2" fill="#09090b" stroke="#eab308" strokeWidth="1" />
            <text x="642" y="365" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fontWeight="900" fill="#ffffff">
              6S 1300
            </text>
            <text x="642" y="373" textAnchor="middle" fontSize="5.5" fontFamily="sans-serif" fontWeight="900" fill="#facc15">
              120C 22.2V
            </text>

            <line x1="615" y1="385" x2="669" y2="385" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="615" y1="403" x2="669" y2="403" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="615" y1="421" x2="669" y2="421" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="615" y1="439" x2="669" y2="439" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />

            {/* Prise d'équilibrage JST-XH 7 pins */}
            <rect x="665" y="350" width="10" height="15" rx="1.5" fill="#f8fafc" stroke="#09090b" strokeWidth="0.8" />
            <line x1="666" y1="353" x2="674" y2="353" stroke="#ef4444" strokeWidth="0.6" />
            <line x1="666" y1="356" x2="674" y2="356" stroke="#3b82f6" strokeWidth="0.6" />
            <line x1="666" y1="359" x2="674" y2="359" stroke="#eab308" strokeWidth="0.6" />

            {/* Câbles en boucle 12AWG vers prise XT60 */}
            <path d="M 632 345 C 615 310, 640 285, 645 275" fill="none" stroke="#dc2626" strokeWidth="4" />
            <path d="M 652 345 C 642 315, 655 290, 652 275" fill="none" stroke="#09090b" strokeWidth="4" strokeDasharray="3 3" />

            {/* Prise Amass XT60 jaune */}
            <path d="M 635 275 L 662 275 L 658 257 L 639 257 Z" fill="url(#xt60Yellow)" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="644" cy="266" r="2.4" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="653" cy="266" r="2.4" fill="url(#goldPadReal)" stroke="#09090b" strokeWidth="0.8" />

            {/* Badge Titre */}
            <rect x="602" y="467" width="80" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="642" y="478" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
              LIPO 6S XT60
            </text>
          </g>

          {/* ====================================================================
              16. LUNETTES FPV FAT SHARK - En bas à droite sous la Tango (x=735..945, y=415..545)
                 Fidélité 100% à la maquette Figma : Coque blanche satinée, découpe de nez
                 en arche inversée, lobes de joues, module ventilateur supérieur et baies
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('fatshark')}
            onMouseEnter={() => setHoveredId('fatshark')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={isCurrent('fatshark') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Oculaire gauche peeking sous le lobe */}
            <path
              d="M 770 505 C 775 524, 805 524, 815 508 Z"
              fill="#18181b"
              stroke="#09090b"
              strokeWidth="1.2"
            />
            {/* Oculaire droit peeking sous le lobe */}
            <path
              d="M 855 508 C 865 524, 895 524, 900 505 Z"
              fill="#18181b"
              stroke="#09090b"
              strokeWidth="1.2"
            />

            {/* Capot supérieur sombre (Upper faceplate housing) */}
            <path
              d="M 750 442 C 785 435, 885 435, 920 442 L 922 455 L 748 455 Z"
              fill="#1e293b"
              stroke="#09090b"
              strokeWidth="1.5"
            />
            <rect x="745" y="437" width="8" height="15" rx="1.5" fill="#0f172a" stroke="#09090b" strokeWidth="1" />

            {/* Module ventilateur anti-buée central avec 7 lamelles verticales */}
            <rect x="815" y="428" width="40" height="18" rx="3.5" fill="#0f172a" stroke="#09090b" strokeWidth="1.2" />
            <rect x="819" y="431" width="32" height="12" rx="1.5" fill="#18181b" />
            <line x1="823" y1="433" x2="823" y2="441" stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1="827" y1="433" x2="827" y2="441" stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1="831" y1="433" x2="831" y2="441" stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1="835" y1="433" x2="835" y2="441" stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1="839" y1="433" x2="839" y2="441" stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1="843" y1="433" x2="843" y2="441" stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1="847" y1="433" x2="847" y2="441" stroke="#cbd5e1" strokeWidth="1.2" />

            {/* Boutons et joystick sur la tranche supérieure */}
            <circle cx="792" cy="442" r="2.5" fill="#09090b" stroke="#64748b" strokeWidth="0.8" />
            <circle cx="803" cy="443" r="2" fill="#ef4444" />
            <circle cx="878" cy="442" r="2.5" fill="#09090b" stroke="#64748b" strokeWidth="0.8" />

            <text x="882" y="436" fontSize="4.5" fontFamily="sans-serif" fontWeight="900" fill="#475569" letterSpacing="0.08em">
              FAT SHARK
            </text>

            {/* COQUE BLANCHE DU MASQUE VISIÈRE (Silhouette exacte avec arche de nez) */}
            <path
              d="M 748 450 
                 C 775 448, 895 448, 922 450 
                 C 938 452, 938 495, 920 502
                 C 908 506, 880 514, 856 514
                 C 848 514, 846 492, 835 492
                 C 824 492, 822 514, 814 514
                 C 790 514, 762 506, 750 502
                 C 732 495, 732 452, 748 450 Z"
              fill={isCurrent('fatshark') ? '#f1f5f9' : 'url(#goggleShell)'}
              stroke="#09090b"
              strokeWidth="2"
            />

            {/* Ligne de jointure horizontale (Split Seam) traversante sous le logo */}
            <path
              d="M 756 480 C 795 480, 875 480, 914 480"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="1.2"
            />

            {/* Baie Récepteur Gauche */}
            <path
              d="M 746 458 C 750 458, 772 458, 774 458 C 776 458, 776 478, 776 480 L 774 498 C 770 500, 756 500, 750 496"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.2"
            />

            {/* Baie Récepteur Droite avec bague circulaire subtile */}
            <path
              d="M 924 458 C 920 458, 898 458, 896 458 C 894 458, 894 478, 894 480 L 896 498 C 900 500, 914 500, 920 496"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.2"
            />
            <circle cx="905" cy="469" r="4.5" fill="none" stroke="#cbd5e1" strokeWidth="1" />

            {/* LOGO OFFICIEL FAT SHARK EN FAÇADE */}
            <text x="835" y="474" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.1em" fill="#18181b">
              FAT SHARK
            </text>
            <text x="835" y="487" textAnchor="middle" fontSize="6" fontFamily="sans-serif" fontWeight="800" letterSpacing="0.22em" fill="#2563eb">
              HDO2 OLED
            </text>

            {/* Curseurs de réglage IPD */}
            <rect x="792" y="513" width="10" height="3" rx="1" fill="#09090b" stroke="#cbd5e1" strokeWidth="0.5" />
            <rect x="868" y="513" width="10" height="3" rx="1" fill="#09090b" stroke="#cbd5e1" strokeWidth="0.5" />

            {/* Badge Titre */}
            <rect x="783" y="534" width="104" height="15" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="835" y="545" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="800" fill="#000000">
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
          <span>Disposition & Échelle 1:1 Figma • Châssis centré, composants vectorisés réalistes</span>
        </div>

      </div>

      {/* Barre d'état sous le schéma */}
      <div className="w-full max-w-[1360px] mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 border-t-[1.5px] border-dashed border-black/30 pt-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-black uppercase tracking-wider text-[11px]">
            Disposition Conforme Figma :
          </span>
          <span className="italic text-[11px]">Châssis centré (X=415) • FC & ESC dans les bras • VTX/GPS/RX en ligne haute • Tango/LiPo/Fat Shark à droite</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-black font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Alignement Figma 100% • Déploiement automatique direct OVH</span>
        </div>
      </div>

    </section>
  );
}
