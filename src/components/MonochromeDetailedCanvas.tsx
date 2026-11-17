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
      
      {/* Canvas SVG vectoriel haute précision monochrome */}
      <div className="relative w-full max-w-[1320px] aspect-[16/10] bg-white border-[1.5px] border-dashed border-black rounded-3xl p-2 sm:p-6 flex items-center justify-center overflow-hidden shadow-xs">
        
        {/* Repères et grille millimétrée d'ingénierie Seeworld */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #000000 0.8px, transparent 0)',
            backgroundSize: '16px 16px',
          }}
        />

        <svg
          viewBox="0 0 1200 760"
          className="w-full h-full select-none"
        >
          {/* Lignes de cotes et d'alignement d'atelier */}
          <line x1="480" y1="20" x2="480" y2="740" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="20" y1="390" x2="1180" y2="390" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="480" cy="390" r="320" fill="none" stroke="#f4f4f5" strokeWidth="1.5" strokeDasharray="8 8" />

          {/* ====================================================================
              1. CHÂSSIS CARBONE TRUE-X (FRAME) - Reproduction exacte de la photo
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('frame')}
            onMouseEnter={() => setHoveredId('frame')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Bras 1 : Avant-Gauche (vers x=200, y=140) */}
            <path
              d="M 430 340 L 230 140 C 215 125, 175 145, 175 170 C 175 190, 205 200, 220 200 L 410 370 Z"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            {/* Support moteur Bras 1 avec trous de fixation */}
            <circle cx="195" cy="155" r="26" fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'} stroke="#000000" strokeWidth="1.8" />
            <circle cx="195" cy="155" r="9" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
            <circle cx="185" cy="155" r="2.5" fill="#000000" />
            <circle cx="205" cy="155" r="2.5" fill="#000000" />
            <circle cx="195" cy="145" r="2.5" fill="#000000" />
            <circle cx="195" cy="165" r="2.5" fill="#000000" />

            {/* Bras 2 : Avant-Droit (vers x=760, y=140) */}
            <path
              d="M 530 340 L 730 140 C 745 125, 785 145, 785 170 C 785 190, 755 200, 740 200 L 550 370 Z"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="765" cy="155" r="26" fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'} stroke="#000000" strokeWidth="1.8" />
            <circle cx="765" cy="155" r="9" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
            <circle cx="755" cy="155" r="2.5" fill="#000000" />
            <circle cx="775" cy="155" r="2.5" fill="#000000" />
            <circle cx="765" cy="145" r="2.5" fill="#000000" />
            <circle cx="765" cy="165" r="2.5" fill="#000000" />

            {/* Bras 3 : Arrière-Gauche (vers x=200, y=620) */}
            <path
              d="M 410 410 L 220 580 C 205 580, 175 590, 175 610 C 175 635, 215 655, 230 640 L 430 440 Z"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="195" cy="625" r="26" fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'} stroke="#000000" strokeWidth="1.8" />
            <circle cx="195" cy="625" r="9" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
            <circle cx="185" cy="625" r="2.5" fill="#000000" />
            <circle cx="205" cy="625" r="2.5" fill="#000000" />
            <circle cx="195" cy="615" r="2.5" fill="#000000" />
            <circle cx="195" cy="635" r="2.5" fill="#000000" />

            {/* Bras 4 : Arrière-Droit (vers x=760, y=620) */}
            <path
              d="M 550 410 L 740 580 C 755 580, 785 590, 785 610 C 785 635, 745 655, 730 640 L 530 440 Z"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            <circle cx="765" cy="625" r="26" fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'} stroke="#000000" strokeWidth="1.8" />
            <circle cx="765" cy="625" r="9" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
            <circle cx="755" cy="625" r="2.5" fill="#000000" />
            <circle cx="775" cy="625" r="2.5" fill="#000000" />
            <circle cx="765" cy="615" r="2.5" fill="#000000" />
            <circle cx="765" cy="635" r="2.5" fill="#000000" />

            {/* Fuselage central carbone (Cage avec découpes exactes) */}
            <rect
              x="425"
              y="220"
              width="110"
              height="340"
              rx="22"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '2'}
            />
            {/* Découpes allégées caractéristiques de la top plate */}
            <rect x="450" y="245" width="60" height="28" rx="8" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <path d="M 455 315 L 480 290 L 505 315 L 480 340 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="480" cy="390" r="16" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <path d="M 470 380 L 490 400 M 470 400 L 490 380" stroke="#000000" strokeWidth="2" />
            <path d="M 455 455 L 480 430 L 505 455 L 480 480 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <rect x="450" y="505" width="60" height="32" rx="8" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />

            {/* Visserie M3 visible */}
            <circle cx="440" cy="235" r="3.5" fill="#000000" />
            <circle cx="520" cy="235" r="3.5" fill="#000000" />
            <circle cx="440" cy="545" r="3.5" fill="#000000" />
            <circle cx="520" cy="545" r="3.5" fill="#000000" />

            <text x="480" y="580" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.08em" fill="#000000">
              CHÂSSIS CARBONE T700
            </text>
          </g>

          {/* ====================================================================
              2. VTX MACH 3.1 - Dessin vectoriel exact avec afficheur digital "8."
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('vtx')}
            onMouseEnter={() => setHoveredId('vtx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* PCB VTX rectangulaire */}
            <rect
              x="360"
              y="60"
              width="68"
              height="95"
              rx="4"
              fill={isCurrent('vtx') ? '#d8ecf8' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('vtx') ? '2.5' : '1.8'}
            />
            {/* Connecteur MMCX doré au sommet */}
            <rect x="410" y="48" width="12" height="12" fill="#000000" />
            <circle cx="416" cy="54" r="3" fill="#ffffff" />
            {/* Écran 7 segments digital LED affichant "8." */}
            <rect x="372" y="74" width="30" height="34" rx="3" fill="#000000" />
            <text x="387" y="99" textAnchor="middle" fontSize="22" fontFamily="monospace" fontWeight="900" fill="#ffffff">
              8.
            </text>
            {/* Inductance carrée 150 */}
            <rect x="408" y="105" width="14" height="14" rx="2" fill="#000000" />
            <text x="415" y="115" textAnchor="middle" fontSize="6" fontFamily="sans-serif" fill="#ffffff">
              150
            </text>
            {/* Rangée de pads de soudure en bas */}
            <rect x="368" y="145" width="52" height="6" fill="#000000" />
            <text x="394" y="172" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              VTX MACH 3.1
            </text>
          </g>

          {/* ====================================================================
              3. MODULE GPS BLITZ M10 - Boîtier carré avec marquages
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('gps')}
            onMouseEnter={() => setHoveredId('gps')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            <rect
              x="450"
              y="68"
              width="60"
              height="60"
              rx="6"
              fill={isCurrent('gps') ? '#d8ecf8' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('gps') ? '2.5' : '1.8'}
            />
            {/* Patch d'antenne céramique interne */}
            <rect x="460" y="78" width="40" height="40" rx="3" fill="#ffffff" stroke="#000000" strokeWidth="1.2" strokeDasharray="3 3" />
            <rect x="466" y="85" width="28" height="14" fill="#000000" />
            <text x="480" y="95" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fontWeight="900" fill="#ffffff">
              BLITZ M10
            </text>
            {/* Connecteur JST 4 pins en bas */}
            <rect x="470" y="123" width="20" height="5" fill="#000000" />
            <text x="480" y="148" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              GPS BLITZ M10
            </text>
          </g>

          {/* ====================================================================
              4. RÉCEPTEUR FOXEER ELRS 2.4G RX - Dessin exact
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('rx')}
            onMouseEnter={() => setHoveredId('rx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            <rect
              x="535"
              y="74"
              width="48"
              height="75"
              rx="4"
              fill={isCurrent('rx') ? '#d8ecf8' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('rx') ? '2.5' : '1.8'}
            />
            {/* Connecteur U.FL doré circulaire en haut */}
            <circle cx="548" cy="85" r="5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="548" cy="85" r="2" fill="#000000" />
            {/* Puce ESP / TCXO centrale */}
            <rect x="543" y="96" width="32" height="32" rx="2" fill="#000000" />
            <text x="559" y="114" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fontWeight="700" fill="#ffffff">
              ELRS
            </text>
            {/* 4 pads dorés : RX TX VCC GND */}
            <rect x="540" y="142" width="7" height="6" fill="#000000" />
            <rect x="549" y="142" width="7" height="6" fill="#000000" />
            <rect x="558" y="142" width="7" height="6" fill="#000000" />
            <rect x="567" y="142" width="7" height="6" fill="#000000" />
            <text x="559" y="168" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              FOXEER ELRS RX
            </text>
          </g>

          {/* ====================================================================
              5. CONDENSATEUR LOW ESR - Cylindre avec bande négative
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('condo')}
            onMouseEnter={() => setHoveredId('condo')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Corps du cylindre */}
            <rect
              x="230"
              y="345"
              width="34"
              height="65"
              rx="5"
              fill={isCurrent('condo') ? '#f7eed7' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('condo') ? '2.5' : '1.8'}
            />
            {/* Bande négative hachurée noire */}
            <rect x="230" y="345" width="11" height="65" fill="#000000" />
            <text x="235" y="375" fontSize="11" fill="#ffffff" fontWeight="bold">-</text>
            <text x="235" y="395" fontSize="11" fill="#ffffff" fontWeight="bold">-</text>
            {/* Pattes vers la droite */}
            <line x1="264" y1="365" x2="295" y2="365" stroke="#000000" strokeWidth="2" />
            <line x1="264" y1="385" x2="295" y2="385" stroke="#000000" strokeWidth="2" />
            <text x="247" y="430" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              CONDO 1000µF
            </text>
          </g>

          {/* ====================================================================
              6. CONTRÔLEUR DE VOL FC (Flight Controller 30.5x30.5mm)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('fc')}
            onMouseEnter={() => setHoveredId('fc')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* PCB carré avec ses 4 trous amortis */}
            <rect
              x="295"
              y="325"
              width="105"
              height="105"
              rx="8"
              fill={isCurrent('fc') ? '#cbf3d2' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('fc') ? '2.5' : '2'}
            />
            {/* Œillets d'amortissement aux 4 coins (Grommets silicone) */}
            <circle cx="308" cy="338" r="6" fill="#ffffff" stroke="#000000" strokeWidth="2" />
            <circle cx="387" cy="338" r="6" fill="#ffffff" stroke="#000000" strokeWidth="2" />
            <circle cx="308" cy="417" r="6" fill="#ffffff" stroke="#000000" strokeWidth="2" />
            <circle cx="387" cy="417" r="6" fill="#ffffff" stroke="#000000" strokeWidth="2" />

            {/* Microcontrôleur STM32 central carré avec broches */}
            <rect x="325" y="355" width="45" height="45" rx="3" fill="#000000" />
            <circle cx="332" cy="362" r="2.5" fill="#ffffff" />
            {/* Rangées de pads dorés sur les 4 côtés */}
            <rect x="320" y="328" width="55" height="4" fill="#000000" />
            <rect x="320" y="423" width="55" height="4" fill="#000000" />
            <rect x="298" y="350" width="4" height="55" fill="#000000" />
            <rect x="393" y="350" width="4" height="55" fill="#000000" />

            <text x="347" y="452" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              FC BETAFLIGHT 30x30
            </text>
          </g>

          {/* ====================================================================
              7. VARIATEUR ESC 4-EN-1 - Flanc Droit avec pads moteurs crénelés
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('esc')}
            onMouseEnter={() => setHoveredId('esc')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* PCB carré ESC */}
            <rect
              x="565"
              y="325"
              width="105"
              height="105"
              rx="8"
              fill={isCurrent('esc') ? '#fdd8d8' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('esc') ? '2.5' : '2'}
            />
            {/* 3 pads moteurs dorés gauche et 3 pads droits */}
            <rect x="557" y="340" width="8" height="15" rx="1" fill="#000000" />
            <rect x="557" y="370" width="8" height="15" rx="1" fill="#000000" />
            <rect x="557" y="400" width="8" height="15" rx="1" fill="#000000" />
            <rect x="670" y="340" width="8" height="15" rx="1" fill="#000000" />
            <rect x="670" y="370" width="8" height="15" rx="1" fill="#000000" />
            <rect x="670" y="400" width="8" height="15" rx="1" fill="#000000" />
            {/* MOSFETs de puissance en miroir */}
            <rect x="580" y="342" width="22" height="22" fill="#000000" />
            <rect x="612" y="342" width="22" height="22" fill="#000000" />
            <rect x="580" y="374" width="22" height="22" fill="#000000" />
            <rect x="612" y="374" width="22" height="22" fill="#000000" />
            {/* Pads XT60 en bas */}
            <rect x="600" y="425" width="16" height="7" fill="#000000" />

            <text x="617" y="452" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              ESC 4-EN-1 55A
            </text>
          </g>

          {/* ====================================================================
              8. MOTEUR BRUSHLESS 2207 (Vue de profil exacte de la photo)
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('motor')}
            onMouseEnter={() => setHoveredId('motor')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Arbre supérieur fileté en acier M5 */}
            <rect x="365" y="605" width="10" height="40" fill="#000000" />
            <line x1="365" y1="615" x2="375" y2="615" stroke="#ffffff" strokeWidth="1" />
            <line x1="365" y1="625" x2="375" y2="625" stroke="#ffffff" strokeWidth="1" />
            <line x1="365" y1="635" x2="375" y2="635" stroke="#ffffff" strokeWidth="1" />

            {/* Cloche moteur usinée alu avec rayons */}
            <path
              d="M 335 645 L 405 645 C 410 645, 415 655, 412 675 C 410 685, 400 688, 370 688 C 340 688, 330 685, 328 675 C 325 655, 330 645, 335 645 Z"
              fill={isCurrent('motor') ? '#cbf3d2' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Ailettes de ventilation de la cloche */}
            <line x1="345" y1="650" x2="345" y2="675" stroke="#000000" strokeWidth="2" />
            <line x1="360" y1="648" x2="360" y2="680" stroke="#000000" strokeWidth="2" />
            <line x1="380" y1="648" x2="380" y2="680" stroke="#000000" strokeWidth="2" />
            <line x1="395" y1="650" x2="395" y2="675" stroke="#000000" strokeWidth="2" />

            {/* Base du stator avec les 4 vis de montage */}
            <rect x="340" y="688" width="60" height="14" rx="2" fill="#000000" />
            <text x="370" y="722" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              MOTEUR BRUSHLESS 2207
            </text>
          </g>

          {/* ====================================================================
              9. MICRO-CAMÉRA FPV - Boîtier métallique et optique
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('cam')}
            onMouseEnter={() => setHoveredId('cam')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Boîtier caméra */}
            <rect
              x="460"
              y="645"
              width="40"
              height="35"
              rx="4"
              fill={isCurrent('cam') ? '#d8ecf8' : '#ffffff'}
              stroke="#000000"
              strokeWidth="1.8"
            />
            {/* Lentille optique frontale */}
            <rect x="468" y="630" width="24" height="15" rx="3" fill="#000000" />
            <circle cx="480" cy="637" r="7" fill="#ffffff" />
            <circle cx="480" cy="637" r="3" fill="#000000" />
            {/* Vis latérale de tilt */}
            <circle cx="464" cy="662" r="3" fill="#000000" />
            <text x="480" y="700" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              CAMÉRA FPV
            </text>
          </g>

          {/* ====================================================================
              10. BUZZER AUTONOME VIFLY FINDER - Cylindre et grille
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('vifly')}
            onMouseEnter={() => setHoveredId('vifly')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Mini PCB rouge/noir */}
            <rect
              x="535"
              y="565"
              width="28"
              height="40"
              rx="4"
              fill={isCurrent('vifly') ? '#fdd8d8' : '#ffffff'}
              stroke="#000000"
              strokeWidth="1.8"
            />
            {/* Cylindre buzzer piézo noir */}
            <circle cx="549" cy="580" r="10" fill="#000000" />
            <circle cx="549" cy="580" r="4" fill="#ffffff" />
            {/* LED stroboscopique */}
            <rect x="544" y="596" width="10" height="5" rx="1" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="549" y="620" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              BUZZER
            </text>
          </g>

          {/* ====================================================================
              11. ANTENNE IMMORTAL-T - Longue barre horizontale
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('antenna-rx')}
            onMouseEnter={() => setHoveredId('antenna-rx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Tube T horizontal */}
            <line x1="680" y1="45" x2="1080" y2="45" stroke="#000000" strokeWidth={isCurrent('antenna-rx') ? '5' : '3.5'} strokeLinecap="round" />
            {/* Embouts en caoutchouc */}
            <rect x="680" y="41" width="16" height="8" rx="2" fill="#000000" />
            <rect x="1064" y="41" width="16" height="8" rx="2" fill="#000000" />
            {/* Jonction centrale surmoulée en T */}
            <path d="M 870 36 L 890 36 L 885 55 L 875 55 Z" fill="#000000" />
            {/* Câble coaxial flexible descendant */}
            <line x1="880" y1="55" x2="880" y2="240" stroke="#000000" strokeWidth="1.8" strokeDasharray="3 3" />
            <circle cx="880" cy="242" r="4" fill="#000000" />
            <text x="880" y="28" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              ANTENNE IMMORTAL-T
            </text>
          </g>

          {/* ====================================================================
              12. ANTENNE VTX LOLLIPOP - Verticale
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('antenna-vtx')}
            onMouseEnter={() => setHoveredId('antenna-vtx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Tête champignon omnidirectionnelle */}
            <rect x="940" y="75" width="22" height="30" rx="8" fill="#000000" />
            <circle cx="951" cy="90" r="5" fill="#ffffff" />
            {/* Tige rigide coaxiale */}
            <line x1="951" y1="105" x2="951" y2="300" stroke="#000000" strokeWidth="2.5" />
            <circle cx="951" cy="302" r="4" fill="#000000" />
            <text x="951" y="65" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              ANTENNE VTX
            </text>
          </g>

          {/* ====================================================================
              13. LOGO BETAFLIGHT - Guêpe vectorielle
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('betaflight')}
            onMouseEnter={() => setHoveredId('betaflight')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Silhouette guêpe */}
            <path
              d="M 1110 45 Q 1150 30 1175 65 Q 1155 90 1130 95 Q 1110 85 1110 45 Z"
              fill={isCurrent('betaflight') ? '#f7eed7' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Ailes */}
            <path d="M 1125 50 Q 1155 40 1170 55" fill="none" stroke="#000000" strokeWidth="2.5" />
            <path d="M 1130 65 Q 1160 55 1165 75" fill="none" stroke="#000000" strokeWidth="2.5" />
            {/* Dard */}
            <line x1="1175" y1="65" x2="1185" y2="70" stroke="#000000" strokeWidth="3" />
            <text x="1145" y="112" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              BETAFLIGHT
            </text>
          </g>

          {/* ====================================================================
              14. RADIOCOMMANDE TBS TANGO II - Forme manette ultra-détaillée
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('tango')}
            onMouseEnter={() => setHoveredId('tango')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Coque ergonomique de la manette */}
            <path
              d="M 1010 220 C 1070 205, 1140 205, 1180 230 C 1205 270, 1195 360, 1160 380 C 1130 360, 1095 385, 1070 360 C 1045 385, 1010 360, 980 380 C 945 360, 935 270, 960 230 C 980 215, 995 220, 1010 220 Z"
              fill={isCurrent('tango') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Antenne T au sommet */}
            <line x1="1020" y1="190" x2="1120" y2="190" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
            <line x1="1070" y1="190" x2="1070" y2="210" stroke="#000000" strokeWidth="3" />
            {/* Écran OLED rectangulaire */}
            <rect x="1050" y="240" width="40" height="26" rx="3" fill="#000000" />
            <text x="1070" y="256" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#ffffff">
              TBS
            </text>
            {/* Gimbal Gauche & Droit avec sticks à effet Hall */}
            <circle cx="1025" cy="285" r="18" fill="#ffffff" stroke="#000000" strokeWidth="1.8" />
            <circle cx="1025" cy="285" r="5" fill="#000000" />
            <circle cx="1115" cy="285" r="18" fill="#ffffff" stroke="#000000" strokeWidth="1.8" />
            <circle cx="1115" cy="285" r="5" fill="#000000" />
            {/* Boutons Menu / Page */}
            <circle cx="995" cy="320" r="3.5" fill="#000000" />
            <circle cx="995" cy="335" r="3.5" fill="#000000" />
            <circle cx="995" cy="350" r="3.5" fill="#000000" />

            <text x="1070" y="405" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              TBS TANGO II
            </text>
          </g>

          {/* ====================================================================
              15. BATTERIE LIPO 6S AVEC PRISE XT60 - Pack vertical et câbles
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('lipo')}
            onMouseEnter={() => setHoveredId('lipo')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Corps de la LiPo */}
            <rect
              x="810"
              y="440"
              width="62"
              height="125"
              rx="7"
              fill={isCurrent('lipo') ? '#f7eed7' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Séparateurs des 6 cellules */}
            <line x1="810" y1="465" x2="872" y2="465" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="810" y1="490" x2="872" y2="490" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="810" y1="515" x2="872" y2="515" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="810" y1="540" x2="872" y2="540" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />

            {/* Câbles silicone 12AWG en boucle */}
            <path d="M 830 440 C 810 400, 840 375, 845 360" fill="none" stroke="#000000" strokeWidth="4" />
            <path d="M 852 440 C 840 405, 855 380, 852 360" fill="none" stroke="#000000" strokeWidth="4" strokeDasharray="3 3" />
            {/* Prise trapézoïdale XT60 Amass */}
            <path d="M 835 360 L 865 360 L 860 340 L 840 340 Z" fill="#000000" />
            <circle cx="846" cy="350" r="2.5" fill="#ffffff" />
            <circle cx="854" cy="350" r="2.5" fill="#ffffff" />

            <text x="841" y="585" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              LIPO 6S 1300MAH
            </text>
          </g>

          {/* ====================================================================
              16. LUNETTES FPV FAT SHARK - Vue de face exacte
             ==================================================================== */}
          <g
            onClick={() => handleComponentClick('fatshark')}
            onMouseEnter={() => setHoveredId('fatshark')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group"
          >
            {/* Coque blanche aérodynamique */}
            <path
              d="M 980 470 C 1050 455, 1140 455, 1200 470 C 1215 520, 1195 590, 1160 600 C 1120 575, 1085 615, 1050 575 C 1010 615, 970 575, 940 600 C 910 590, 890 520, 980 470 Z"
              fill={isCurrent('fatshark') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2.2"
            />
            {/* Grille du ventilateur supérieur */}
            <rect x="1055" y="460" width="30" height="12" rx="3" fill="#000000" />
            <line x1="1062" y1="460" x2="1062" y2="472" stroke="#ffffff" strokeWidth="1" />
            <line x1="1070" y1="460" x2="1070" y2="472" stroke="#ffffff" strokeWidth="1" />
            <line x1="1078" y1="460" x2="1078" y2="472" stroke="#ffffff" strokeWidth="1" />
            {/* Typographie FAT SHARK centrale exacte */}
            <text x="1070" y="525" textAnchor="middle" fontSize="16" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.12em" fill="#000000">
              FAT SHARK
            </text>
            {/* Double optique OLED vue intérieure / bague IPD */}
            <ellipse cx="1025" cy="560" rx="18" ry="12" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <ellipse cx="1115" cy="560" rx="18" ry="12" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />

            <text x="1070" y="630" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="700" fill="#000000">
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

        {/* Repère discret en bas */}
        <div className="absolute bottom-3 left-4 bg-white/95 px-3 py-1.5 rounded-lg border border-black/30 text-[11px] text-zinc-600 flex items-center gap-1.5 pointer-events-none">
          <Wrench className="w-3.5 h-3.5 text-black" />
          <span>Schéma technique vectoriel • Chaque pièce est modélisée fidèlement à la maquette</span>
        </div>

      </div>

      {/* Barre de conformité sous le schéma */}
      <div className="w-full max-w-[1320px] mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 border-t-[1.5px] border-dashed border-black/30 pt-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-black uppercase tracking-wider text-[11px]">
            16 Pièces Dessinées :
          </span>
          <span className="italic text-[11px]">Frame, Moteurs, VTX, GPS, RX, FC, ESC, Cam, Buzzer, Antennes, Tango II, LiPo, Fat Shark</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-black font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Alignement géométrique vérifié • Charte SEEWORLD</span>
        </div>
      </div>

    </section>
  );
}
