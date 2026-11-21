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
import {
  CheckCircle2,
  Crosshair,
  ArrowUpRight,
  Sparkles,
  Sliders,
  Radio,
  Glasses,
  Cpu,
} from 'lucide-react';

interface MonochromeDetailedCanvasProps {
  onSelectComponent: (comp: FigmaComponentData) => void;
  selectedCompId?: string;
}

export function MonochromeDetailedCanvas({
  onSelectComponent,
  selectedCompId,
}: MonochromeDetailedCanvasProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // États des marques sélectionnées pour les 3 éléments génériques
  const [selectedGoggleBrand, setSelectedGoggleBrand] = useState<string>('fatshark');
  const [selectedRadioBrand, setSelectedRadioBrand] = useState<string>('tbs');
  const [selectedConfigBrand, setSelectedConfigBrand] = useState<string>('betaflight');

  // Menus déroulants de sélection au survol
  const [showGoggleMenu, setShowGoggleMenu] = useState(false);
  const [showRadioMenu, setShowRadioMenu] = useState(false);
  const [showConfigMenu, setShowConfigMenu] = useState(false);

  const currentGoggle = GOGGLE_BRANDS.find((b) => b.id === selectedGoggleBrand) || GOGGLE_BRANDS[0];
  const currentRadio = RADIO_BRANDS.find((b) => b.id === selectedRadioBrand) || RADIO_BRANDS[0];
  const currentConfig = CONFIGURATOR_BRANDS.find((b) => b.id === selectedConfigBrand) || CONFIGURATOR_BRANDS[0];

  const getComp = (id: string): FigmaComponentData => {
    const base = FIGMA_COMPONENTS.find((c) => c.id === id) || FIGMA_COMPONENTS[0];
    
    // Si c'est l'un des composants génériques, on injecte les données de la marque sélectionnée
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
    <section className="flex-1 w-full flex flex-col items-center justify-center p-1 sm:p-4 select-none bg-white">
      
      {/* Conteneur principal - Proportions 1562:904 conformes à la maquette Figma Home */}
      <div className="relative w-full max-w-[1562px] aspect-[1562/904] bg-[#fafafa] border-[1.5px] border-dashed border-black rounded-3xl p-2 sm:p-4 flex items-center justify-center overflow-hidden shadow-xs">
        
        {/* Grille technique d'atelier FPV style SEEWORLD */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #71717a 0.8px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Lignes directrices de repérage CAO alignées sur le centre du châssis Figma (X=768, Y=580) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="358 176 1562 904">
          <line x1="768" y1="176" x2="768" y2="1080" stroke="#71717a" strokeWidth="1" strokeDasharray="6 8" />
          <line x1="358" y1="580" x2="1920" y2="580" stroke="#71717a" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="768" cy="580" r="335" fill="none" stroke="#71717a" strokeWidth="0.8" strokeDasharray="4 6" />
          <circle cx="1634" cy="563" r="210" fill="none" stroke="#71717a" strokeWidth="0.8" strokeDasharray="4 6" />
        </svg>

        {/* SVG Vectoriel Haute Précision - 100% Vectoriel Pur Fidèle aux composants réels */}
        <svg
          viewBox="358 176 1562 904"
          className="w-full h-full select-none"
        >
          <defs>
            {/* Fibre de carbone 3K T700 sergé véritable */}
            <pattern id="carbonWeave" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#18181b" />
              <rect width="4" height="4" fill="#27272a" />
              <rect x="4" y="4" width="4" height="4" fill="#27272a" />
              <path d="M 0 4 L 4 0 M 4 8 L 8 4" stroke="#3f3f46" strokeWidth="0.6" />
            </pattern>

            <pattern id="carbonWeaveHover" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#27272a" />
              <rect width="4" height="4" fill="#3f3f46" />
              <rect x="4" y="4" width="4" height="4" fill="#3f3f46" />
              <path d="M 0 4 L 4 0 M 4 8 L 8 4" stroke="#52525b" strokeWidth="0.8" />
            </pattern>

            {/* Or ENIG véritable pour les pads de soudure */}
            <linearGradient id="goldPad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#eab308" />
              <stop offset="70%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>

            {/* Cuivre émaillé des bobinages stator moteur */}
            <linearGradient id="copperCoil" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="25%" stopColor="#ea580c" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="75%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>

            {/* Titane / cloche moteur alu brossé */}
            <linearGradient id="titaniumBell" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="35%" stopColor="#1e293b" />
              <stop offset="70%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Aluminium usiné */}
            <linearGradient id="aluminum" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            {/* Connecteur Amass XT60 jaune */}
            <linearGradient id="xt60Yellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            {/* Verre optique de lentille caméra avec traitement multicouche */}
            <radialGradient id="lensGlass" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="30%" stopColor="#0284c7" />
              <stop offset="65%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Gaine LiPo 6S argentée */}
            <linearGradient id="lipoWrap" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="30%" stopColor="#334155" />
              <stop offset="70%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Céramique de l'antenne patch GPS */}
            <linearGradient id="gpsCeramic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2d9cc" />
              <stop offset="50%" stopColor="#d5c7b3" />
              <stop offset="100%" stopColor="#bfae97" />
            </linearGradient>

            {/* Ombre portée subtile */}
            <filter id="realisticShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.25" />
            </filter>

            {/* Surbrillance bleue de sélection */}
            <filter id="selectGlow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#3b82f6" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* ====================================================================
              1. CHÂSSIS CARBONE TRUE-X (Frames, node-id=2004-5)
                 Taille : 768 × 670, Position : (384, 245) à (1152, 915), Centre : (768, 580)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('frame')}
            onMouseEnter={() => setHoveredId('frame')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'frame' ? 'url(#selectGlow)' : isCurrent('frame') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Bras 1 : Avant-Gauche (vers pad moteur à x=445, y=335) */}
            <path
              d="M 730 480 L 485 305 C 465 285, 405 315, 405 355 C 405 385, 455 405, 485 405 L 710 530 Z"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '3.5' : '2.5'}
            />
            <circle cx="445" cy="335" r="32" fill="none" stroke="#52525b" strokeWidth="2" />
            <circle cx="445" cy="335" r="11" fill="#09090b" stroke="#71717a" strokeWidth="1.5" />
            <circle cx="430" cy="335" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="460" cy="335" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="445" cy="320" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="445" cy="350" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />

            {/* Bras 2 : Avant-Droit (vers pad moteur à x=1091, y=335) */}
            <path
              d="M 806 480 L 1051 305 C 1071 285, 1131 315, 1131 355 C 1131 385, 1081 405, 1051 405 L 826 530 Z"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '3.5' : '2.5'}
            />
            <circle cx="1091" cy="335" r="32" fill="none" stroke="#52525b" strokeWidth="2" />
            <circle cx="1091" cy="335" r="11" fill="#09090b" stroke="#71717a" strokeWidth="1.5" />
            <circle cx="1076" cy="335" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="1106" cy="335" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="1091" cy="320" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="1091" cy="350" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />

            {/* Bras 3 : Arrière-Gauche (vers pad moteur à x=445, y=825) */}
            <path
              d="M 710 630 L 485 755 C 455 755, 405 775, 405 815 C 405 855, 465 885, 485 855 L 730 680 Z"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '3.5' : '2.5'}
            />
            <circle cx="445" cy="825" r="32" fill="none" stroke="#52525b" strokeWidth="2" />
            <circle cx="445" cy="825" r="11" fill="#09090b" stroke="#71717a" strokeWidth="1.5" />
            <circle cx="430" cy="825" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="460" cy="825" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="445" cy="810" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="445" cy="840" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />

            {/* Bras 4 : Arrière-Droit (vers pad moteur à x=1091, y=825) */}
            <path
              d="M 826 630 L 1051 755 C 1081 755, 1131 775, 1131 815 C 1131 855, 1071 885, 1051 855 L 806 680 Z"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '3.5' : '2.5'}
            />
            <circle cx="1091" cy="825" r="32" fill="none" stroke="#52525b" strokeWidth="2" />
            <circle cx="1091" cy="825" r="11" fill="#09090b" stroke="#71717a" strokeWidth="1.5" />
            <circle cx="1076" cy="825" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="1106" cy="825" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="1091" cy="810" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />
            <circle cx="1091" cy="840" r="4.5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="0.8" />

            {/* Fuselage / Top Plate Carbone (x=718..818, y=340..820) */}
            <rect
              x="718"
              y="340"
              width="100"
              height="480"
              rx="24"
              fill={isCurrent('frame') ? 'url(#carbonWeaveHover)' : 'url(#carbonWeave)'}
              stroke="#09090b"
              strokeWidth={isCurrent('frame') ? '3.5' : '2.5'}
            />
            {/* Découpes CNC conformes au modèle iFlight / Nazgul de Figma */}
            <rect x="738" y="375" width="60" height="30" rx="6" fill="#fafafa" stroke="#3f3f46" strokeWidth="2" />
            <path d="M 740 460 L 768 425 L 796 460 L 768 495 Z" fill="#fafafa" stroke="#3f3f46" strokeWidth="2" />
            <circle cx="768" cy="580" r="22" fill="#fafafa" stroke="#3f3f46" strokeWidth="2" />
            <path d="M 755 567 L 781 593 M 755 593 L 781 567" stroke="#71717a" strokeWidth="2.5" />
            <path d="M 740 700 L 768 665 L 796 700 L 768 735 Z" fill="#fafafa" stroke="#3f3f46" strokeWidth="2" />
            <rect x="738" y="750" width="60" height="38" rx="6" fill="#fafafa" stroke="#3f3f46" strokeWidth="2" />

            {/* Entretoises alu CNC dorées (Standoffs) */}
            <circle cx="734" cy="358" r="6" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="802" cy="358" r="6" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="734" cy="802" r="6" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="802" cy="802" r="6" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.5" />

            {/* Badge Titre au survol */}
            {isCurrent('frame') && (
              <g>
                <rect x="696" y="830" width="144" height="24" rx="6" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                <text x="768" y="846" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.05em" fill="#000000">
                  CHÂSSIS CARBONE TRUE-X
                </text>
              </g>
            )}
          </g>

          {/* ====================================================================
              2. MOTEUR BRUSHLESS 2207 (Motor, node-id=2004-7)
                 Taille : 143 × 159, Position : (542, 890) à (685, 1049)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('motor')}
            onMouseEnter={() => setHoveredId('motor')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'motor' ? 'url(#selectGlow)' : isCurrent('motor') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Arbre fileté M5 titane avec rainures de filetage */}
            <rect x="607" y="890" width="14" height="52" rx="2" fill="url(#aluminum)" stroke="#09090b" strokeWidth="1.5" />
            {[898, 906, 914, 922, 930].map((ly) => (
              <line key={ly} x1="607" y1={ly} x2="621" y2={ly} stroke="#475569" strokeWidth="1.5" />
            ))}
            <path d="M 602 885 L 626 885 L 629 895 L 599 895 Z" fill="#1e293b" stroke="#09090b" strokeWidth="1.5" />

            {/* Cloche moteur alu brossé multi-branches */}
            <path
              d="M 557 942 L 671 942 C 681 942, 689 958, 685 992 C 681 1010, 665 1016, 614 1016 C 563 1016, 547 1010, 543 992 C 539 958, 547 942, 557 942 Z"
              fill={isCurrent('motor') ? '#334155' : 'url(#titaniumBell)'}
              stroke="#09090b"
              strokeWidth="2.5"
            />
            {/* Bobines de cuivre émaillé véritable visibles par les fenêtres */}
            <rect x="567" y="954" width="16" height="40" rx="4" fill="url(#copperCoil)" stroke="#7c2d12" strokeWidth="1.5" />
            <rect x="591" y="952" width="16" height="46" rx="4" fill="url(#copperCoil)" stroke="#7c2d12" strokeWidth="1.5" />
            <rect x="623" y="952" width="16" height="46" rx="4" fill="url(#copperCoil)" stroke="#7c2d12" strokeWidth="1.5" />
            <rect x="647" y="954" width="16" height="40" rx="4" fill="url(#copperCoil)" stroke="#7c2d12" strokeWidth="1.5" />

            {/* Base stator avec perçages 16x16 */}
            <rect x="563" y="1016" width="104" height="24" rx="4" fill="#09090b" stroke="#334155" strokeWidth="1.5" />
            <circle cx="614" cy="1028" r="5" fill="url(#goldPad)" />

            {isCurrent('motor') && (
              <g>
                <rect x="553" y="1048" width="122" height="22" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
                <text x="614" y="1063" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="900" fill="#000000">
                  MOTEUR 2207
                </text>
              </g>
            )}
          </g>

          {/* ====================================================================
              3. MICRO-CAMÉRA FPV (Cam, node-id=2004-2)
                 Taille : 93 × 77, Position : (804, 945) à (897, 1022)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('cam')}
            onMouseEnter={() => setHoveredId('cam')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'cam' ? 'url(#selectGlow)' : isCurrent('cam') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Boîtier caméra alu magnésium */}
            <rect
              x="804"
              y="965"
              width="93"
              height="57"
              rx="8"
              fill={isCurrent('cam') ? '#334155' : '#1e293b'}
              stroke="#09090b"
              strokeWidth="2.2"
            />
            {/* Bague de mise au point crénelée et objectif optique M12 */}
            <rect x="825" y="945" width="51" height="25" rx="5" fill="#09090b" stroke="#334155" strokeWidth="1.5" />
            <line x1="828" y1="952" x2="873" y2="952" stroke="#475569" strokeWidth="1.5" />
            <circle cx="850.5" cy="958" r="14" fill="url(#lensGlass)" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="847" cy="954" r="3.5" fill="#ffffff" opacity="0.8" />
            <circle cx="818" cy="993" r="5" fill="url(#aluminum)" stroke="#09090b" strokeWidth="1.2" />

            {isCurrent('cam') && (
              <g>
                <rect x="800" y="1030" width="102" height="22" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
                <text x="851" y="1045" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="900" fill="#000000">
                  CAMÉRA FPV
                </text>
              </g>
            )}
          </g>

          {/* ====================================================================
              4. CONTRÔLEUR DE VOL FC (FC, node-id=2004-4)
                 Taille : 146 × 148, Position : (467, 491) à (613, 639)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('fc')}
            onMouseEnter={() => setHoveredId('fc')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'fc' ? 'url(#selectGlow)' : isCurrent('fc') ? 'url(#realisticShadow)' : undefined}
          >
            {/* PCB noir mat haute densité */}
            <rect
              x="467"
              y="491"
              width="146"
              height="148"
              rx="16"
              fill={isCurrent('fc') ? '#1e293b' : '#0f172a'}
              stroke="#09090b"
              strokeWidth="2.5"
            />
            {/* 4 Silent-blocs silicone jaune M3 avec inserts dorés */}
            <circle cx="488" cy="512" r="10" fill="#facc15" stroke="#09090b" strokeWidth="2" />
            <circle cx="592" cy="512" r="10" fill="#facc15" stroke="#09090b" strokeWidth="2" />
            <circle cx="488" cy="618" r="10" fill="#facc15" stroke="#09090b" strokeWidth="2" />
            <circle cx="592" cy="618" r="10" fill="#facc15" stroke="#09090b" strokeWidth="2" />
            <circle cx="488" cy="512" r="4.5" fill="#09090b" />
            <circle cx="592" cy="512" r="4.5" fill="#09090b" />
            <circle cx="488" cy="618" r="4.5" fill="#09090b" />
            <circle cx="592" cy="618" r="4.5" fill="#09090b" />

            {/* Puce microcontrôleur STM32F722 centrale avec sérigraphie */}
            <rect x="510" y="535" width="60" height="60" rx="4" fill="#09090b" stroke="#334155" strokeWidth="1.5" />
            <circle cx="520" cy="545" r="2" fill="#ffffff" />
            <text x="540" y="567" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#ffffff">
              STM32
            </text>
            <text x="540" y="581" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#38bdf8">
              F722 RET6
            </text>

            {/* Port USB-C argenté au sommet */}
            <rect x="525" y="486" width="30" height="9" rx="2" fill="url(#aluminum)" stroke="#09090b" strokeWidth="1.2" />

            {/* Pads dorés ENIG tout autour */}
            <rect x="500" y="497" width="80" height="6" rx="1" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1" />
            <rect x="500" y="627" width="80" height="6" rx="1" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1" />
            <rect x="473" y="525" width="6" height="80" rx="1" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1" />
            <rect x="601" y="525" width="6" height="80" rx="1" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1" />

            {/* LEDs de statut gyro et alimentation */}
            <circle cx="576" cy="545" r="3.5" fill="#22c55e" style={{ filter: 'drop-shadow(0 0 3px #22c55e)' }} />
            <circle cx="576" cy="557" r="3.5" fill="#3b82f6" style={{ filter: 'drop-shadow(0 0 3px #3b82f6)' }} />

            {isCurrent('fc') && (
              <g>
                <rect x="490" y="648" width="100" height="22" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
                <text x="540" y="663" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="900" fill="#000000">
                  FC 30.5x30.5
                </text>
              </g>
            )}
          </g>

          {/* ====================================================================
              5. VARIATEUR ESC 4-EN-1 (ESC, node-id=2004-6)
                 Taille : 165 × 155, Position : (925, 510) à (1090, 665)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('esc')}
            onMouseEnter={() => setHoveredId('esc')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'esc' ? 'url(#selectGlow)' : isCurrent('esc') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="925"
              y="510"
              width="165"
              height="155"
              rx="16"
              fill={isCurrent('esc') ? '#27272a' : '#18181b'}
              stroke="#09090b"
              strokeWidth="2.5"
            />
            {/* 4 Oeillets anti-vibrations silicone */}
            <circle cx="943" cy="528" r="8" fill="#facc15" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="1072" cy="528" r="8" fill="#facc15" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="943" cy="647" r="8" fill="#facc15" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="1072" cy="647" r="8" fill="#facc15" stroke="#09090b" strokeWidth="1.5" />

            {/* 6 gros pads moteurs latéraux crénelés dorés ENIG (3 de chaque côté) */}
            <rect x="913" y="534" width="14" height="20" rx="3" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.2" />
            <rect x="913" y="577" width="14" height="20" rx="3" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.2" />
            <rect x="913" y="620" width="14" height="20" rx="3" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.2" />
            <rect x="1088" y="534" width="14" height="20" rx="3" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.2" />
            <rect x="1088" y="577" width="14" height="20" rx="3" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.2" />
            <rect x="1088" y="620" width="14" height="20" rx="3" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.2" />

            {/* Puces MOSFETs de puissance */}
            <rect x="948" y="535" width="30" height="28" rx="2" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />
            <rect x="990" y="535" width="30" height="28" rx="2" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />
            <rect x="948" y="578" width="30" height="28" rx="2" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />
            <rect x="990" y="578" width="30" height="28" rx="2" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />

            {/* Shunt de mesure de courant haute précision */}
            <rect x="980" y="567" width="16" height="8" fill="#ffffff" stroke="#09090b" strokeWidth="1" />

            {/* Bornes de batterie + et - */}
            <rect x="980" y="650" width="28" height="12" rx="3" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.2" />
            <text x="986" y="660" fontSize="10" fontWeight="900" fill="#09090b">+</text>
            <text x="1000" y="660" fontSize="10" fontWeight="900" fill="#09090b">-</text>

            {isCurrent('esc') && (
              <g>
                <rect x="955" y="674" width="105" height="22" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
                <text x="1007" y="689" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="900" fill="#000000">
                  ESC 4-EN-1 55A
                </text>
              </g>
            )}
          </g>

          {/* ====================================================================
              6. ÉMETTEUR VIDÉO VTX (VTX, node-id=2004-9)
                 Taille : 89 × 145, Position : (572, 218) à (661, 363)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('vtx')}
            onMouseEnter={() => setHoveredId('vtx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'vtx' ? 'url(#selectGlow)' : isCurrent('vtx') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="572"
              y="218"
              width="89"
              height="145"
              rx="10"
              fill={isCurrent('vtx') ? '#334155' : '#1e293b'}
              stroke="#09090b"
              strokeWidth="2.5"
            />
            {/* Connecteur MMCX laiton doré */}
            <rect x="635" y="198" width="18" height="22" rx="3" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="644" cy="208" r="4.5" fill="#09090b" />
            
            {/* Afficheur digital LED 7 segments rouge vif (Mach 3.1) */}
            <rect x="588" y="250" width="44" height="46" rx="5" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
            <text x="610" y="284" textAnchor="middle" fontSize="32" fontFamily="monospace" fontWeight="900" fill="#ef4444" style={{ filter: 'drop-shadow(0 0 4px #ef4444)' }}>
              8.
            </text>
            <rect x="633" y="296" width="18" height="18" rx="3" fill="#f8fafc" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="642" cy="305" r="4" fill="#ca8a04" />
            <rect x="582" y="336" width="70" height="10" rx="2" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.2" />

            {isCurrent('vtx') && (
              <g>
                <rect x="566" y="372" width="100" height="22" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
                <text x="616" y="387" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="900" fill="#000000">
                  VTX MACH 3.1
                </text>
              </g>
            )}
          </g>

          {/* ====================================================================
              7. MODULE GPS (image (7), node-id=2004-16)
                 Taille : 77 × 83, Position : (735, 186) à (812, 269)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('gps')}
            onMouseEnter={() => setHoveredId('gps')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'gps' ? 'url(#selectGlow)' : isCurrent('gps') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="735"
              y="186"
              width="77"
              height="83"
              rx="10"
              fill={isCurrent('gps') ? '#27272a' : '#18181b'}
              stroke="#09090b"
              strokeWidth="2.5"
            />
            {/* Antenne patch céramique avec pastille centrale */}
            <rect x="747" y="198" width="53" height="53" rx="5" fill="url(#gpsCeramic)" stroke="#78716c" strokeWidth="1.5" />
            <circle cx="773.5" cy="224.5" r="5.5" fill="url(#aluminum)" stroke="#44403c" strokeWidth="1.2" />
            <circle cx="756" cy="255" r="3" fill="#22c55e" style={{ filter: 'drop-shadow(0 0 2px #22c55e)' }} />
            <circle cx="791" cy="255" r="3" fill="#3b82f6" style={{ filter: 'drop-shadow(0 0 2px #3b82f6)' }} />

            {isCurrent('gps') && (
              <g>
                <rect x="731" y="278" width="85" height="20" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
                <text x="773.5" y="292" textAnchor="middle" fontSize="10.5" fontFamily="sans-serif" fontWeight="900" fill="#000000">
                  GPS M10
                </text>
              </g>
            )}
          </g>

          {/* ====================================================================
              8. RÉCEPTEUR RX ELRS (RX, node-id=2004-8)
                 Taille : 64 × 114, Position : (856, 232) à (920, 346)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('rx')}
            onMouseEnter={() => setHoveredId('rx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'rx' ? 'url(#selectGlow)' : isCurrent('rx') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="856"
              y="232"
              width="64"
              height="114"
              rx="8"
              fill={isCurrent('rx') ? '#27272a' : '#18181b'}
              stroke="#09090b"
              strokeWidth="2.5"
            />
            {/* Connecteur d'antenne IPEX U.FL doré */}
            <circle cx="874" cy="250" r="9" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="874" cy="250" r="3.5" fill="#09090b" />
            
            {/* Puce RF SX1280 */}
            <rect x="866" y="266" width="44" height="44" rx="3" fill="#09090b" stroke="#27272a" strokeWidth="1.2" />
            <text x="888" y="290" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="900" fill="#ffffff">
              SX1280
            </text>
            <text x="888" y="302" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#38bdf8">
              ELRS 2.4G
            </text>
            <rect x="862" y="326" width="10" height="8" rx="1.5" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1" />
            <rect x="876" y="326" width="10" height="8" rx="1.5" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1" />
            <rect x="890" y="326" width="10" height="8" rx="1.5" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1" />
            <rect x="904" y="326" width="10" height="8" rx="1.5" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1" />

            {isCurrent('rx') && (
              <g>
                <rect x="850" y="354" width="76" height="20" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
                <text x="888" y="368" textAnchor="middle" fontSize="10.5" fontFamily="sans-serif" fontWeight="900" fill="#000000">
                  ELRS RX
                </text>
              </g>
            )}
          </g>

          {/* ====================================================================
              9. ANTENNE IMMORTAL-T (image (4), node-id=2004-15)
                 Taille : 639 × 359, Position : (945, 200) à (1584, 559)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('antenna-rx')}
            onMouseEnter={() => setHoveredId('antenna-rx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'antenna-rx' ? 'url(#selectGlow)' : isCurrent('antenna-rx') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Brin dipôle horizontal avec embouts de protection rouges */}
            <line x1="945" y1="210" x2="1584" y2="210" stroke="#09090b" strokeWidth={isCurrent('antenna-rx') ? '8' : '6'} strokeLinecap="round" />
            <rect x="945" y="201" width="28" height="18" rx="5" fill="#dc2626" stroke="#09090b" strokeWidth="2" />
            <rect x="1556" y="201" width="28" height="18" rx="5" fill="#dc2626" stroke="#09090b" strokeWidth="2" />
            
            {/* Jonction centrale moulée T */}
            <path d="M 1249 194 L 1279 194 L 1273 230 L 1255 230 Z" fill="#09090b" stroke="#27272a" strokeWidth="2" />
            <line x1="1264" y1="230" x2="1264" y2="520" stroke="#334155" strokeWidth="4" strokeDasharray="5 5" />
            <circle cx="1264" cy="524" r="6" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.5" />

            {isCurrent('antenna-rx') && (
              <g>
                <rect x="1179" y="176" width="170" height="24" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                <text x="1264" y="192" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="900" fill="#000000">
                  ANTENNE IMMORTAL-T
                </text>
              </g>
            )}
          </g>

          {/* ====================================================================
              10. ANTENNE VTX LOLLIPOP (Antenne VTX, node-id=2004-3)
                  Taille : 56 × 427, Position : (1315, 262) à (1371, 689)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('antenna-vtx')}
            onMouseEnter={() => setHoveredId('antenna-vtx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'antenna-vtx' ? 'url(#selectGlow)' : isCurrent('antenna-vtx') ? 'url(#realisticShadow)' : undefined}
          >
            <rect x="1315" y="262" width="56" height="52" rx="18" fill={isCurrent('antenna-vtx') ? '#334155' : '#18181b'} stroke="#09090b" strokeWidth="2.5" />
            <circle cx="1343" cy="288" r="12" fill="#f8fafc" stroke="#09090b" strokeWidth="2" />
            <circle cx="1343" cy="288" r="5" fill="url(#goldPad)" />
            <line x1="1343" y1="314" x2="1343" y2="675" stroke="#09090b" strokeWidth="6" />
            <circle cx="1343" cy="678" r="9" fill="url(#goldPad)" stroke="#09090b" strokeWidth="2" />

            {isCurrent('antenna-vtx') && (
              <g>
                <rect x="1278" y="696" width="130" height="22" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
                <text x="1343" y="711" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="900" fill="#000000">
                  ANTENNE VTX
                </text>
              </g>
            )}
          </g>

          {/* ====================================================================
              11. CONDENSATEUR LOW ESR (Condo, node-id=2004-13)
                  Taille : 32 × 54, Position : (394, 541) à (426, 595)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('condo')}
            onMouseEnter={() => setHoveredId('condo')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'condo' ? 'url(#selectGlow)' : isCurrent('condo') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="394"
              y="541"
              width="32"
              height="54"
              rx="6"
              fill={isCurrent('condo') ? '#1e3a8a' : '#1e40af'}
              stroke="#09090b"
              strokeWidth="2.2"
            />
            <rect x="394" y="541" width="10" height="54" rx="1.5" fill="url(#goldPad)" />
            <text x="399" y="560" fontSize="11" fill="#09090b" fontWeight="900">-</text>
            <text x="399" y="575" fontSize="11" fill="#09090b" fontWeight="900">-</text>
            <line x1="426" y1="558" x2="467" y2="558" stroke="url(#aluminum)" strokeWidth="3" />
            <line x1="426" y1="578" x2="467" y2="578" stroke="url(#aluminum)" strokeWidth="3" />

            {isCurrent('condo') && (
              <g>
                <rect x="382" y="604" width="56" height="20" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
                <text x="410" y="618" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="900" fill="#000000">
                  CONDO
                </text>
              </g>
            )}
          </g>

          {/* ====================================================================
              12. BUZZER AUTONOME VIFLY (Vifly, node-id=2004-17)
                  Taille : 52 × 92, Position : (878, 754) à (930, 846)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('vifly')}
            onMouseEnter={() => setHoveredId('vifly')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'vifly' ? 'url(#selectGlow)' : isCurrent('vifly') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="878"
              y="754"
              width="52"
              height="92"
              rx="8"
              fill={isCurrent('vifly') ? '#fde047' : '#eab308'}
              stroke="#09090b"
              strokeWidth="2.5"
            />
            <circle cx="904" cy="780" r="18" fill="#09090b" stroke="#27272a" strokeWidth="2" />
            <circle cx="904" cy="780" r="7" fill="#f8fafc" />
            <rect x="888" y="806" width="32" height="16" rx="3" fill="url(#aluminum)" stroke="#09090b" strokeWidth="1.2" />
            <circle cx="904" cy="814" r="3.5" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 3px #ffffff)' }} />

            {isCurrent('vifly') && (
              <g>
                <rect x="866" y="855" width="76" height="20" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
                <text x="904" y="869" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="900" fill="#000000">
                  BUZZER
                </text>
              </g>
            )}
          </g>

          {/* ====================================================================
              13. CONFIGURATEUR & FIRMWARE (Générique / Multi-Firmwares)
                  Position exacte : (1627, 196) à (1799, 364)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('betaflight')}
            onMouseEnter={() => {
              setHoveredId('betaflight');
              setShowConfigMenu(true);
            }}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'betaflight' ? 'url(#selectGlow)' : isCurrent('betaflight') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Forme du badge de firmware sélectionné */}
            {selectedConfigBrand === 'betaflight' && (
              <g>
                {/* Guêpe Betaflight vectorielle détaillée */}
                <path
                  d="M 1647 216 Q 1727 186 1773 246 Q 1743 290 1703 296 Q 1663 282 1647 216 Z"
                  fill="#eab308"
                  stroke="#09090b"
                  strokeWidth="3.5"
                />
                <path d="M 1677 222 Q 1737 206 1761 236" fill="none" stroke="#09090b" strokeWidth="4.5" />
                <path d="M 1687 250 Q 1747 230 1755 266" fill="none" stroke="#09090b" strokeWidth="4.5" />
                <line x1="1773" y1="246" x2="1791" y2="254" stroke="#09090b" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            )}

            {selectedConfigBrand === 'inav' && (
              <g>
                <circle cx="1713" cy="280" r="50" fill="#0284c7" stroke="#09090b" strokeWidth="3.5" />
                <circle cx="1713" cy="280" r="38" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="6 4" />
                <polygon points="1713,245 1723,280 1713,272 1703,280" fill="#ef4444" stroke="#09090b" strokeWidth="1.5" />
                <polygon points="1713,315 1723,280 1713,272 1703,280" fill="#ffffff" stroke="#09090b" strokeWidth="1.5" />
              </g>
            )}

            {selectedConfigBrand === 'kiss' && (
              <g>
                <rect x="1663" y="235" width="100" height="90" rx="18" fill="#06b6d4" stroke="#09090b" strokeWidth="3.5" />
                <path d="M 1683 280 Q 1713 250 1743 280" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                <text x="1713" y="306" textAnchor="middle" fontSize="14" fontWeight="900" fill="#ffffff">KISS</text>
              </g>
            )}

            {selectedConfigBrand === 'emuflight' && (
              <g>
                <circle cx="1713" cy="280" r="50" fill="#8b5cf6" stroke="#09090b" strokeWidth="3.5" />
                <path d="M 1683 290 Q 1713 240 1743 290" fill="none" stroke="#ffffff" strokeWidth="5" />
                <text x="1713" y="306" textAnchor="middle" fontSize="13" fontWeight="900" fill="#ffffff">EMU</text>
              </g>
            )}

            {selectedConfigBrand === 'ardupilot' && (
              <g>
                <polygon points="1713,230 1760,257 1760,303 1713,330 1666,303 1666,257" fill="#f97316" stroke="#09090b" strokeWidth="3.5" />
                <text x="1713" y="286" textAnchor="middle" fontSize="13" fontWeight="900" fill="#ffffff">ARDU</text>
              </g>
            )}

            {/* Badge Titre dynamique */}
            <rect x="1635" y="316" width="156" height="24" rx="6" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <text x="1713" y="332" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="900" fill="#000000">
              {currentConfig.badge}
            </text>
          </g>

          {/* ====================================================================
              14. RADIOCOMMANDE (Générique / Multi-Marques)
                  Position : (1432, 386) à (1836, 740)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('tango')}
            onMouseEnter={() => {
              setHoveredId('tango');
              setShowRadioMenu(true);
            }}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'tango' ? 'url(#selectGlow)' : isCurrent('tango') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Boîtier manette ergonomique soft-touch noir graphite */}
            <path
              d="M 1482 430 C 1582 405, 1722 405, 1812 440 C 1852 500, 1832 660, 1772 690 C 1722 660, 1672 700, 1634 660 C 1594 700, 1544 660, 1494 690 C 1434 660, 1414 500, 1454 440 C 1474 420, 1466 430, 1482 430 Z"
              fill={isCurrent('tango') ? '#27272a' : '#18181b'}
              stroke="#09090b"
              strokeWidth="3.5"
            />
            {/* Grips latéraux texturés */}
            <path d="M 1430 490 C 1424 550, 1444 610, 1474 650" fill="none" stroke="#3f3f46" strokeWidth="4" strokeDasharray="4 6" />
            <path d="M 1838 490 C 1844 550, 1824 610, 1794 650" fill="none" stroke="#3f3f46" strokeWidth="4" strokeDasharray="4 6" />

            {/* Antenne T repliable au sommet */}
            <line x1="1512" y1="368" x2="1756" y2="368" stroke="#09090b" strokeWidth="8" strokeLinecap="round" />
            <line x1="1634" y1="368" x2="1634" y2="412" stroke="#09090b" strokeWidth="6" />

            {/* Écran OLED rétro-éclairé */}
            <rect x="1598" y="460" width="72" height="46" rx="5" fill="#020617" stroke="#334155" strokeWidth="2" />
            <text x="1634" y="488" textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="bold" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 3px #38bdf8)' }}>
              {selectedRadioBrand === 'tbs' ? 'TBS T2' : selectedRadioBrand === 'radiomaster' ? 'RM BOXER' : selectedRadioBrand === 'jumper' ? 'JUMPER' : 'FRSKY'}
            </text>
            <text x="1634" y="500" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#94a3b8">
              1000Hz • ELRS
            </text>

            {/* Gimbals Hall avec sticks anodisés rouge */}
            <circle cx="1554" cy="540" r="34" fill="#09090b" stroke="#334155" strokeWidth="3" />
            <circle cx="1554" cy="540" r="11" fill="#dc2626" stroke="#09090b" strokeWidth="2" />
            <circle cx="1554" cy="540" r="3" fill="#ffffff" />

            <circle cx="1714" cy="540" r="34" fill="#09090b" stroke="#334155" strokeWidth="3" />
            <circle cx="1714" cy="540" r="11" fill="#dc2626" stroke="#09090b" strokeWidth="2" />
            <circle cx="1714" cy="540" r="3" fill="#ffffff" />

            {/* Boutons de navigation */}
            <circle cx="1498" cy="600" r="6" fill="url(#aluminum)" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="1498" cy="624" r="6" fill="url(#aluminum)" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="1498" cy="648" r="6" fill="url(#aluminum)" stroke="#09090b" strokeWidth="1.5" />

            {/* Badge Titre dynamique */}
            <rect x="1544" y="705" width="180" height="24" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <text x="1634" y="721" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="900" fill="#000000">
              {currentRadio.badge}
            </text>
          </g>

          {/* ====================================================================
              15. BATTERIE LIPO 6S (Lipo, node-id=2004-10)
                  Position : (1141, 588) à (1333, 1025)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('lipo')}
            onMouseEnter={() => setHoveredId('lipo')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'lipo' ? 'url(#selectGlow)' : isCurrent('lipo') ? 'url(#realisticShadow)' : undefined}
          >
            <rect
              x="1185"
              y="680"
              width="110"
              height="250"
              rx="16"
              fill={isCurrent('lipo') ? '#334155' : 'url(#lipoWrap)'}
              stroke="#09090b"
              strokeWidth="3.5"
            />
            {/* Étiquette Tattu R-Line 6S 1300mAh */}
            <rect x="1197" y="700" width="86" height="52" rx="4" fill="#09090b" stroke="#eab308" strokeWidth="2" />
            <text x="1240" y="722" textAnchor="middle" fontSize="15" fontFamily="sans-serif" fontWeight="900" fill="#ffffff">
              6S 1300
            </text>
            <text x="1240" y="740" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="900" fill="#facc15">
              120C 22.2V
            </text>

            <line x1="1185" y1="765" x2="1295" y2="765" stroke="#475569" strokeWidth="2" strokeDasharray="5 5" />
            <line x1="1185" y1="805" x2="1295" y2="805" stroke="#475569" strokeWidth="2" strokeDasharray="5 5" />
            <line x1="1185" y1="845" x2="1295" y2="845" stroke="#475569" strokeWidth="2" strokeDasharray="5 5" />
            <line x1="1185" y1="885" x2="1295" y2="885" stroke="#475569" strokeWidth="2" strokeDasharray="5 5" />

            {/* Prise d'équilibrage JST-XH 7 broches */}
            <rect x="1285" y="690" width="20" height="32" rx="3" fill="#f8fafc" stroke="#09090b" strokeWidth="1.5" />
            <line x1="1287" y1="696" x2="1303" y2="696" stroke="#ef4444" strokeWidth="1.2" />
            <line x1="1287" y1="702" x2="1303" y2="702" stroke="#3b82f6" strokeWidth="1.2" />
            <line x1="1287" y1="708" x2="1303" y2="708" stroke="#eab308" strokeWidth="1.2" />

            {/* Câbles haute intensité 12AWG vers prise XT60 */}
            <path d="M 1220 680 C 1186 610, 1236 560, 1246 540" fill="none" stroke="#dc2626" strokeWidth="8" />
            <path d="M 1260 680 C 1240 620, 1266 570, 1260 540" fill="none" stroke="#09090b" strokeWidth="8" strokeDasharray="6 6" />

            {/* Prise Amass XT60 jaune authentique */}
            <path d="M 1226 540 L 1280 540 L 1272 504 L 1234 504 Z" fill="url(#xt60Yellow)" stroke="#09090b" strokeWidth="2.5" />
            <circle cx="1244" cy="522" r="4.8" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.5" />
            <circle cx="1262" cy="522" r="4.8" fill="url(#goldPad)" stroke="#09090b" strokeWidth="1.5" />

            {isCurrent('lipo') && (
              <g>
                <rect x="1165" y="945" width="150" height="24" rx="5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                <text x="1240" y="961" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="900" fill="#000000">
                  LIPO 6S XT60
                </text>
              </g>
            )}
          </g>

          {/* ====================================================================
              16. LUNETTES FPV (Générique / Multi-Marques)
                  Position : (1401, 766) à (1904, 990)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('fatshark')}
            onMouseEnter={() => {
              setHoveredId('fatshark');
              setShowGoggleMenu(true);
            }}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
            filter={selectedCompId === 'fatshark' ? 'url(#selectGlow)' : isCurrent('fatshark') ? 'url(#realisticShadow)' : undefined}
          >
            {/* Oculaires sous les lobes */}
            <path d="M 1485 910 C 1500 945, 1560 945, 1580 915 Z" fill="#18181b" stroke="#09090b" strokeWidth="2" />
            <path d="M 1725 915 C 1745 945, 1805 945, 1820 910 Z" fill="#18181b" stroke="#09090b" strokeWidth="2" />

            {/* Capot supérieur ventilé */}
            <path
              d="M 1450 784 C 1520 770, 1780 770, 1855 784 L 1860 810 L 1445 810 Z"
              fill={selectedGoggleBrand === 'dji' ? '#0f172a' : '#1e293b'}
              stroke="#09090b"
              strokeWidth="2.5"
            />
            {/* Grille de ventilateur à 7 lamelles */}
            <rect x="1604" y="756" width="80" height="36" rx="7" fill="#0f172a" stroke="#09090b" strokeWidth="2.5" />
            <rect x="1612" y="762" width="64" height="24" rx="3" fill="#18181b" />
            {[1620, 1628, 1636, 1644, 1652, 1660, 1668].map((lx) => (
              <line key={lx} x1={lx} y1="766" x2={lx} y2="782" stroke="#cbd5e1" strokeWidth="2.5" />
            ))}

            {/* COQUE DE MASQUE VISIÈRE (Couleur adaptée à la marque sélectionnée) */}
            <path
              d="M 1446 800 
                 C 1500 796, 1800 796, 1854 800 
                 C 1886 804, 1886 890, 1850 904
                 C 1826 912, 1770 928, 1722 928
                 C 1706 928, 1702 884, 1680 884
                 C 1658 884, 1654 928, 1638 928
                 C 1590 928, 1534 912, 1510 904
                 C 1474 890, 1474 804, 1446 800 Z"
              fill={
                selectedGoggleBrand === 'fatshark'
                  ? '#ffffff'
                  : selectedGoggleBrand === 'dji'
                  ? '#1e293b'
                  : selectedGoggleBrand === 'walksnail'
                  ? '#09090b'
                  : selectedGoggleBrand === 'hdzero'
                  ? '#334155'
                  : '#18181b'
              }
              stroke="#09090b"
              strokeWidth="3.5"
            />

            {/* Seam line horizontale traversante */}
            <path d="M 1462 860 C 1540 860, 1760 860, 1838 860" fill="none" stroke="#94a3b8" strokeWidth="2" />

            {/* Logo officiel de la marque sélectionnée en façade */}
            <text
              x="1652"
              y="848"
              textAnchor="middle"
              fontSize="24"
              fontFamily="sans-serif"
              fontWeight="900"
              letterSpacing="0.1em"
              fill={selectedGoggleBrand === 'fatshark' ? '#18181b' : '#ffffff'}
            >
              {currentGoggle.badge}
            </text>

            {/* Curseurs de réglage d'écartement interpupillaire IPD */}
            <rect x="1564" y="926" width="20" height="6" rx="2" fill="#09090b" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="1716" y="926" width="20" height="6" rx="2" fill="#09090b" stroke="#cbd5e1" strokeWidth="1" />

            {/* Badge Titre dynamique */}
            <rect x="1542" y="955" width="220" height="28" rx="7" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <text x="1652" y="974" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fontWeight="900" fill="#000000">
              {currentGoggle.badge}
            </text>
          </g>

        </svg>

        {/* ====================================================================
            BARRES DE SÉLECTION FLOTTANTES MULTI-MARQUES
           ==================================================================== */}

        {/* Sélecteur de Marque : LUNETTES FPV (En bas à droite sur les lunettes) */}
        <div
          onMouseEnter={() => setShowGoggleMenu(true)}
          onMouseLeave={() => setShowGoggleMenu(false)}
          className={`absolute bottom-6 right-8 bg-white/95 backdrop-blur-md border-[1.5px] border-black rounded-2xl p-2.5 shadow-xl transition-all duration-200 z-40 ${
            showGoggleMenu ? 'opacity-100 translate-y-0' : 'opacity-85 hover:opacity-100'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-1.5 px-1">
            <Glasses className="w-3 h-3 text-black" />
            <span>Changer de Système Vidéo :</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 max-w-[360px]">
            {GOGGLE_BRANDS.map((gb) => (
              <button
                key={gb.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedGoggleBrand(gb.id);
                  onSelectComponent(getComp('fatshark'));
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                  selectedGoggleBrand === gb.id
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-300'
                }`}
              >
                {gb.brand}
              </button>
            ))}
          </div>
        </div>

        {/* Sélecteur de Marque : RADIOCOMMANDE (Au-dessus de la Tango II) */}
        <div
          onMouseEnter={() => setShowRadioMenu(true)}
          onMouseLeave={() => setShowRadioMenu(false)}
          className={`absolute top-84 right-8 bg-white/95 backdrop-blur-md border-[1.5px] border-black rounded-2xl p-2.5 shadow-xl transition-all duration-200 z-40 ${
            showRadioMenu ? 'opacity-100 translate-y-0' : 'opacity-85 hover:opacity-100'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-1.5 px-1">
            <Radio className="w-3 h-3 text-black" />
            <span>Sélectionner votre Radio :</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 max-w-[360px]">
            {RADIO_BRANDS.map((rb) => (
              <button
                key={rb.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRadioBrand(rb.id);
                  onSelectComponent(getComp('tango'));
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                  selectedRadioBrand === rb.id
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-300'
                }`}
              >
                {rb.brand}
              </button>
            ))}
          </div>
        </div>

        {/* Sélecteur de Firmware : CONFIGURATEUR (En haut à droite) */}
        <div
          onMouseEnter={() => setShowConfigMenu(true)}
          onMouseLeave={() => setShowConfigMenu(false)}
          className={`absolute top-6 right-8 bg-white/95 backdrop-blur-md border-[1.5px] border-black rounded-2xl p-2.5 shadow-xl transition-all duration-200 z-40 ${
            showConfigMenu ? 'opacity-100 translate-y-0' : 'opacity-85 hover:opacity-100'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-1.5 px-1">
            <Cpu className="w-3 h-3 text-black" />
            <span>Choisir le Firmware :</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 max-w-[360px]">
            {CONFIGURATOR_BRANDS.map((cb) => (
              <button
                key={cb.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedConfigBrand(cb.id);
                  onSelectComponent(getComp('betaflight'));
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                  selectedConfigBrand === cb.id
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-300'
                }`}
              >
                {cb.brand}
              </button>
            ))}
          </div>
        </div>

        {/* Infobulle technique dynamique au survol */}
        {hoveredId && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border-[1.5px] border-dashed border-black rounded-2xl p-4 shadow-2xl pointer-events-none animate-in fade-in duration-150 max-w-sm z-30">
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
          <span>Schéma 100% Vectoriel Pur • Matériaux réalistes • Sélecteur multi-marques actif</span>
        </div>

      </div>

      {/* Barre d'état sous le schéma */}
      <div className="w-full max-w-[1562px] mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 border-t-[1.5px] border-dashed border-black/30 pt-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-black uppercase tracking-wider text-[11px]">
            Composants Génériques & Écosystèmes :
          </span>
          <span className="italic text-[11px]">
            Lunettes : <b className="text-black">{currentGoggle.name}</b> • Radio : <b className="text-black">{currentRadio.name}</b> • Firmware : <b className="text-black">{currentConfig.name}</b>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-black font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Vectorisation géométrique fidèle • Filtres pannes synchronisés</span>
        </div>
      </div>

    </section>
  );
}
