'use client';

import React, { useState } from 'react';
import { FIGMA_COMPONENTS, FigmaComponentData } from '@/data/figmaComponents';
import { Wrench, CheckCircle2, AlertTriangle, Crosshair } from 'lucide-react';

interface MonochromeDroneCanvasProps {
  onSelectComponent: (comp: FigmaComponentData) => void;
  selectedCompId?: string;
}

export function MonochromeDroneCanvas({
  onSelectComponent,
  selectedCompId,
}: MonochromeDroneCanvasProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getComp = (id: string) => FIGMA_COMPONENTS.find((c) => c.id === id) || FIGMA_COMPONENTS[0];

  const handleComponentClick = (id: string) => {
    const comp = FIGMA_COMPONENTS.find((c) => c.id === id);
    if (comp) onSelectComponent(comp);
  };

  const isCurrent = (id: string) => selectedCompId === id || hoveredId === id;

  return (
    <section className="flex-1 w-full flex flex-col items-center justify-center p-2 sm:p-6 select-none bg-white">
      
      {/* Conteneur principal du Blueprint / Schéma Monochrome */}
      <div className="relative w-full max-w-[1240px] aspect-[16/10] bg-white border-[1.5px] border-dashed border-black/80 rounded-3xl p-4 sm:p-8 flex items-center justify-center overflow-hidden shadow-xs">
        
        {/* Grille technique de fond (Grille d'ingénierie Seeworld en pointillés très légers) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #000000 0.8px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Lignes d'axes repères (X, Y) */}
        <svg
          viewBox="0 0 1000 640"
          className="w-full h-full select-none"
        >
          <defs>
            {/* Pattern pour fibre de carbone filaire monochrome */}
            <pattern id="carbon-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M0 0 L8 8 M8 0 L0 8" stroke="#e4e4e7" strokeWidth="0.75" />
            </pattern>
          </defs>

          {/* Repères d'alignement d'atelier */}
          <line x1="500" y1="20" x2="500" y2="620" stroke="#d4d4d8" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="20" y1="330" x2="980" y2="330" stroke="#d4d4d8" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="500" cy="330" r="280" fill="none" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="6 6" />

          {/* ========================================================
              1. CHÂSSIS CARBONE TRUE-X (FRAME) - Centré
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('frame')}
            onMouseEnter={() => setHoveredId('frame')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Bras 1 : Avant Gauche */}
            <path
              d="M 460 290 L 260 110 L 230 140 L 440 310 Z"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            {/* Bras 2 : Avant Droit */}
            <path
              d="M 540 290 L 740 110 L 770 140 L 560 310 Z"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            {/* Bras 3 : Arrière Gauche */}
            <path
              d="M 440 350 L 230 520 L 260 550 L 460 370 Z"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />
            {/* Bras 4 : Arrière Droit */}
            <path
              d="M 560 350 L 770 520 L 740 550 L 540 370 Z"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '1.8'}
            />

            {/* Corps central du châssis (Fuselage / Top & Bottom plates) */}
            <rect
              x="455"
              y="200"
              width="90"
              height="260"
              rx="18"
              fill={isCurrent('frame') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth={isCurrent('frame') ? '2.5' : '2'}
            />
            {/* Ajourages intérieurs du châssis */}
            <rect x="475" y="225" width="50" height="24" rx="6" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
            <rect x="475" y="410" width="50" height="30" rx="6" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />

            {/* Label Frame */}
            <text x="500" y="475" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.1em" fill="#000000">
              FRAME TRUE-X 5&quot;
            </text>
          </g>

          {/* ========================================================
              2. LES 4 MOTEURS BRUSHLESS (Aux 4 extrémités de bras)
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('motor')}
            onMouseEnter={() => setHoveredId('motor')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Moteur 1 : Avant Gauche (x=245, y=125) */}
            <circle cx="245" cy="125" r="32" fill={isCurrent('motor') ? '#cbf3d2' : '#ffffff'} stroke="#000000" strokeWidth="2" />
            <circle cx="245" cy="125" r="18" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="245" cy="125" r="6" fill="#000000" />
            <line x1="245" y1="93" x2="245" y2="157" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="213" y1="125" x2="277" y2="125" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" />

            {/* Moteur 2 : Avant Droit (x=755, y=125) */}
            <circle cx="755" cy="125" r="32" fill={isCurrent('motor') ? '#cbf3d2' : '#ffffff'} stroke="#000000" strokeWidth="2" />
            <circle cx="755" cy="125" r="18" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="755" cy="125" r="6" fill="#000000" />
            <line x1="755" y1="93" x2="755" y2="157" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="723" y1="125" x2="787" y2="125" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" />

            {/* Moteur 3 : Arrière Gauche (x=245, y=535) */}
            <circle cx="245" cy="535" r="32" fill={isCurrent('motor') ? '#cbf3d2' : '#ffffff'} stroke="#000000" strokeWidth="2" />
            <circle cx="245" cy="535" r="18" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="245" cy="535" r="6" fill="#000000" />

            {/* Moteur 4 : Arrière Droit (x=755, y=535) */}
            <circle cx="755" cy="535" r="32" fill={isCurrent('motor') ? '#cbf3d2' : '#ffffff'} stroke="#000000" strokeWidth="2" />
            <circle cx="755" cy="535" r="18" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="755" cy="535" r="6" fill="#000000" />

            {/* Label Moteur en bas à gauche */}
            <text x="245" y="585" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              MOTEURS 2207.5
            </text>
          </g>

          {/* ========================================================
              3. VTX (Émetteur Vidéo Mach 3.1) - Haut Gauche du Châssis
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('vtx')}
            onMouseEnter={() => setHoveredId('vtx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            <rect
              x="410"
              y="60"
              width="50"
              height="65"
              rx="4"
              fill={isCurrent('vtx') ? '#d8ecf8' : '#ffffff'}
              stroke="#000000"
              strokeWidth="1.8"
            />
            {/* Afficheur 7 segments digital LED du Mach 3.1 */}
            <rect x="422" y="70" width="26" height="24" rx="2" fill="#000000" />
            <text x="435" y="87" textAnchor="middle" fontSize="14" fontFamily="monospace" fontWeight="900" fill="#ffffff">
              8.
            </text>
            {/* Connecteur MMCX doré / filaire */}
            <rect x="445" y="52" width="8" height="8" fill="#000000" />
            {/* Pins en bas */}
            <line x1="416" y1="125" x2="416" y2="132" stroke="#000000" strokeWidth="2" />
            <line x1="426" y1="125" x2="426" y2="132" stroke="#000000" strokeWidth="2" />
            <line x1="436" y1="125" x2="436" y2="132" stroke="#000000" strokeWidth="2" />
            <line x1="446" y1="125" x2="446" y2="132" stroke="#000000" strokeWidth="2" />

            <text x="435" y="146" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              VTX MACH 3.1
            </text>
          </g>

          {/* ========================================================
              4. MODULE GPS (BLITZ M10) - Haut Centre
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('gps')}
            onMouseEnter={() => setHoveredId('gps')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            <rect
              x="478"
              y="65"
              width="44"
              height="44"
              rx="5"
              fill={isCurrent('gps') ? '#d8ecf8' : '#ffffff'}
              stroke="#000000"
              strokeWidth="1.8"
            />
            {/* Patch céramique interne */}
            <rect x="485" y="72" width="30" height="30" rx="3" fill="#ffffff" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="500" cy="87" r="4" fill="#000000" />
            <text x="500" y="122" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              GPS M10
            </text>
          </g>

          {/* ========================================================
              5. RÉCEPTEUR RADIO RX (FOXEER ELRS) - Haut Droit
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('rx')}
            onMouseEnter={() => setHoveredId('rx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            <rect
              x="538"
              y="70"
              width="36"
              height="55"
              rx="3"
              fill={isCurrent('rx') ? '#d8ecf8' : '#ffffff'}
              stroke="#000000"
              strokeWidth="1.8"
            />
            <circle cx="546" cy="78" r="3" fill="#000000" />
            <rect x="544" y="86" width="24" height="24" fill="#000000" />
            <text x="556" y="102" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#ffffff">
              ELRS
            </text>
            <text x="556" y="138" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              RX 2.4G
            </text>
          </g>

          {/* ========================================================
              6. CONDENSATEUR LOW ESR - Flanc Gauche Extrême
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('condo')}
            onMouseEnter={() => setHoveredId('condo')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            <rect
              x="330"
              y="300"
              width="24"
              height="45"
              rx="4"
              fill={isCurrent('condo') ? '#f7eed7' : '#ffffff'}
              stroke="#000000"
              strokeWidth="1.8"
            />
            {/* Bande hachurée négative */}
            <rect x="330" y="300" width="8" height="45" fill="#000000" />
            <line x1="334" y1="315" x2="334" y2="335" stroke="#ffffff" strokeWidth="2" />
            {/* Pattes vers la stack */}
            <line x1="354" y1="315" x2="380" y2="315" stroke="#000000" strokeWidth="1.5" />
            <line x1="354" y1="330" x2="380" y2="330" stroke="#000000" strokeWidth="1.5" />
            <text x="342" y="360" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              CONDO
            </text>
          </g>

          {/* ========================================================
              7. CONTRÔLEUR DE VOL FC (Flight Controller 30x30) - Flanc Gauche
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('fc')}
            onMouseEnter={() => setHoveredId('fc')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            <rect
              x="375"
              y="285"
              width="70"
              height="70"
              rx="6"
              fill={isCurrent('fc') ? '#cbf3d2' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Trous de montage 30.5mm aux 4 coins */}
            <circle cx="383" cy="293" r="3.5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="437" cy="293" r="3.5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="383" cy="347" r="3.5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="437" cy="347" r="3.5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            {/* Processeur STM32 central */}
            <rect x="395" y="305" width="30" height="30" rx="2" fill="#000000" />
            <circle cx="410" cy="320" r="3" fill="#ffffff" />
            <text x="410" y="372" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              FC 30x30
            </text>
          </g>

          {/* ========================================================
              8. VARIATEUR ESC 4-en-1 - Flanc Droit
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('esc')}
            onMouseEnter={() => setHoveredId('esc')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            <rect
              x="555"
              y="285"
              width="70"
              height="70"
              rx="6"
              fill={isCurrent('esc') ? '#fdd8d8' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Pads moteurs latéraux crénelés */}
            <rect x="550" y="295" width="5" height="12" fill="#000000" />
            <rect x="550" y="315" width="5" height="12" fill="#000000" />
            <rect x="550" y="335" width="5" height="12" fill="#000000" />
            <rect x="625" y="295" width="5" height="12" fill="#000000" />
            <rect x="625" y="315" width="5" height="12" fill="#000000" />
            <rect x="625" y="335" width="5" height="12" fill="#000000" />
            {/* MOSFETs internes en grille 2x2 */}
            <rect x="568" y="298" width="18" height="18" fill="#000000" />
            <rect x="594" y="298" width="18" height="18" fill="#000000" />
            <rect x="568" y="324" width="18" height="18" fill="#000000" />
            <rect x="594" y="324" width="18" height="18" fill="#000000" />
            <text x="590" y="372" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              ESC 4-EN-1 55A
            </text>
          </g>

          {/* ========================================================
              9. CAMÉRA FPV MICRO - Bas Centre
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('cam')}
            onMouseEnter={() => setHoveredId('cam')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            <rect
              x="485"
              y="475"
              width="30"
              height="35"
              rx="4"
              fill={isCurrent('cam') ? '#d8ecf8' : '#ffffff'}
              stroke="#000000"
              strokeWidth="1.8"
            />
            {/* Lentille optique */}
            <circle cx="500" cy="492" r="10" fill="#000000" />
            <circle cx="500" cy="492" r="4" fill="#ffffff" />
            <text x="500" y="525" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              CAMÉRA FPV
            </text>
          </g>

          {/* ========================================================
              10. BUZZER AUTONOME VIFLY - Bas Droit du Châssis
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('vifly')}
            onMouseEnter={() => setHoveredId('vifly')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            <rect
              x="535"
              y="420"
              width="22"
              height="32"
              rx="3"
              fill={isCurrent('vifly') ? '#fdd8d8' : '#ffffff'}
              stroke="#000000"
              strokeWidth="1.5"
            />
            <circle cx="546" cy="432" r="7" fill="#000000" />
            <circle cx="546" cy="432" r="2" fill="#ffffff" />
            <text x="546" y="465" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              BUZZER
            </text>
          </g>

          {/* ========================================================
              11. ANTENNE IMMORTAL-T - Haut Droite Horizontale
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('antenna-rx')}
            onMouseEnter={() => setHoveredId('antenna-rx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            <line x1="590" y1="40" x2="880" y2="40" stroke="#000000" strokeWidth={isCurrent('antenna-rx') ? '4' : '3'} strokeLinecap="round" />
            <rect x="730" y="32" width="10" height="16" rx="2" fill="#000000" />
            <line x1="735" y1="48" x2="735" y2="180" stroke="#000000" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="735" cy="182" r="3" fill="#000000" />
            <text x="735" y="25" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              ANTENNE IMMORTAL-T
            </text>
          </g>

          {/* ========================================================
              12. ANTENNE VTX LOLLIPOP - Verticale Droite
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('antenna-vtx')}
            onMouseEnter={() => setHoveredId('antenna-vtx')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            <rect x="778" y="70" width="16" height="24" rx="6" fill="#000000" />
            <line x1="786" y1="94" x2="786" y2="240" stroke="#000000" strokeWidth="2" />
            <circle cx="786" cy="242" r="3" fill="#000000" />
            <text x="786" y="60" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              ANTENNE VTX
            </text>
          </g>

          {/* ========================================================
              13. LOGO BETAFLIGHT - Tout en Haut à Droite
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('betaflight')}
            onMouseEnter={() => setHoveredId('betaflight')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            <path
              d="M 910 40 Q 940 30 960 55 Q 945 75 925 80 Q 910 70 910 40 Z"
              fill={isCurrent('betaflight') ? '#f7eed7' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Rayures guêpe */}
            <path d="M 930 45 L 945 65" stroke="#000000" strokeWidth="3" />
            <path d="M 940 40 L 955 60" stroke="#000000" strokeWidth="3" />
            <text x="935" y="95" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              BETAFLIGHT
            </text>
          </g>

          {/* ========================================================
              14. RADIOCOMMANDE TBS TANGO II - Milieu Droite
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('tango')}
            onMouseEnter={() => setHoveredId('tango')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Coque manette */}
            <path
              d="M 830 180 Q 890 170 950 180 Q 980 230 960 300 Q 920 280 890 310 Q 860 280 820 300 Q 800 230 830 180 Z"
              fill={isCurrent('tango') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Antenne T repliable au sommet */}
            <line x1="840" y1="165" x2="940" y2="165" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
            <line x1="890" y1="165" x2="890" y2="175" stroke="#000000" strokeWidth="3" />
            {/* Écran OLED */}
            <rect x="875" y="195" width="30" height="20" rx="2" fill="#000000" />
            {/* Gimbals Gauche et Droit */}
            <circle cx="850" cy="225" r="14" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="850" cy="225" r="4" fill="#000000" />
            <circle cx="930" cy="225" r="14" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="930" cy="225" r="4" fill="#000000" />

            <text x="890" y="325" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              TBS TANGO II
            </text>
          </g>

          {/* ========================================================
              15. BATTERIE LIPO 6S AVEC PRISE XT60 - Bas Centre Droit
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('lipo')}
            onMouseEnter={() => setHoveredId('lipo')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Corps LiPo */}
            <rect
              x="660"
              y="370"
              width="50"
              height="95"
              rx="6"
              fill={isCurrent('lipo') ? '#f7eed7' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Séparateurs des 6 cellules */}
            <line x1="660" y1="390" x2="710" y2="390" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="660" y1="410" x2="710" y2="410" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="660" y1="430" x2="710" y2="430" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="660" y1="450" x2="710" y2="450" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" />
            {/* Câbles en boucle vers connecteur XT60 */}
            <path d="M 675 370 Q 660 340 680 325" fill="none" stroke="#000000" strokeWidth="3" />
            <path d="M 695 370 Q 685 345 690 325" fill="none" stroke="#000000" strokeWidth="3" strokeDasharray="2 2" />
            {/* Prise XT60 trapézoïdale */}
            <path d="M 675 325 L 700 325 L 695 310 L 680 310 Z" fill="#000000" />

            <text x="685" y="485" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              LIPO 6S XT60
            </text>
          </g>

          {/* ========================================================
              16. LUNETTES FPV FAT SHARK - Bas Droite
             ======================================================== */}
          <g
            onClick={() => handleComponentClick('fatshark')}
            onMouseEnter={() => setHoveredId('fatshark')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-200"
          >
            {/* Forme du masque */}
            <path
              d="M 810 390 Q 890 380 970 390 Q 980 440 960 480 Q 920 495 890 460 Q 860 495 820 480 Q 800 440 810 390 Z"
              fill={isCurrent('fatshark') ? '#f4f4f5' : '#ffffff'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Bandeau frontal */}
            <path d="M 815 410 Q 890 400 965 410" stroke="#000000" strokeWidth="1.5" />
            <text x="890" y="445" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.1em" fill="#000000">
              FAT SHARK
            </text>
            <text x="890" y="515" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#000000">
              LUNETTES OLED
            </text>
          </g>

        </svg>

        {/* Infobulle dynamique épurée en temps réel au survol */}
        {hoveredId && (
          <div className="absolute top-4 right-4 bg-white border-[1.5px] border-dashed border-black rounded-xl p-3 shadow-lg pointer-events-none animate-in fade-in duration-100 max-w-xs z-30">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 uppercase">
              <Crosshair className="w-3 h-3 text-black" />
              <span>{getComp(hoveredId).category}</span>
            </div>
            <h4 className="text-sm font-bold text-black mt-0.5">
              {getComp(hoveredId).name}
            </h4>
            <p className="text-[11px] text-zinc-600 italic mt-0.5 line-clamp-2">
              {getComp(hoveredId).role}
            </p>
            <div className="mt-2 pt-1.5 border-t border-zinc-200 flex items-center justify-between text-[10px] text-black font-semibold">
              <span>{getComp(hoveredId).commonIssues.length} pannes indexées</span>
              <span className="text-emerald-700 font-mono">Cliquer pour inspecter ➔</span>
            </div>
          </div>
        )}

        {/* Petit rappel de contrôle en bas à gauche */}
        <div className="absolute bottom-3 left-4 bg-white/90 px-3 py-1.5 rounded-lg border border-black/30 text-[11px] text-zinc-600 flex items-center gap-1.5 pointer-events-none">
          <Wrench className="w-3.5 h-3.5 text-black" />
          <span>Schéma vectoriel monochrome d&apos;atelier • Cliquez sur un organe pour ouvrir son fix</span>
        </div>

      </div>

      {/* Barre d'état d'alignement géométrique sous le canvas */}
      <div className="w-full max-w-[1240px] mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 border-t-[1.5px] border-dashed border-black/30 pt-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-black uppercase tracking-wider text-[11px]">
            Repères & Géométrie :
          </span>
          <span className="font-mono text-[11px]">True-X 225mm • Entraxe 30.5mm • Symétrie 100%</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-black font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            16 organes modélisés
          </span>
          <span className="flex items-center gap-1 text-black font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Interconnexion catalogue active
          </span>
        </div>
      </div>

    </section>
  );
}
