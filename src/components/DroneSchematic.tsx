'use client';

import React, { useState } from 'react';
import { DroneComponentInfo, ComponentCategory } from '@/types';
import { 
  Gauge, 
  Cpu, 
  Video, 
  Radio, 
  Shield, 
  Fan, 
  BatteryCharging, 
  Compass, 
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Wrench,
  Sparkles
} from 'lucide-react';

interface DroneSchematicProps {
  components: DroneComponentInfo[];
  selectedCategory: ComponentCategory | null;
  onSelectCategory: (category: ComponentCategory | null) => void;
}

export function DroneSchematic({
  components,
  selectedCategory,
  onSelectCategory,
}: DroneSchematicProps) {
  const [hoveredComponent, setHoveredComponent] = useState<DroneComponentInfo | null>(null);

  // Obtenir le composant actif ou hovered
  const activeComponent = hoveredComponent || components.find((c) => c.id === selectedCategory) || components[0];

  const getIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Gauge': return <Gauge className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Microchip': return <Cpu className={className} />;
      case 'Video': return <Video className={className} />;
      case 'Radio': return <Radio className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Fan': return <Fan className={className} />;
      case 'BatteryCharging': return <BatteryCharging className={className} />;
      case 'Compass': return <Compass className={className} />;
      default: return <Wrench className={className} />;
    }
  };

  return (
    <section id="drone-schema" className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* En-tête de section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Architecture Interactive d un Quad FPV</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explorez l anatomie complète de votre drone
        </h2>
        <p className="mt-3 text-base text-zinc-400">
          Chaque composant physique correspond à une catégorie de dépannage. Cliquez ou survolez une pièce pour révéler les pannes courantes, les tensions critiques et les tutoriels de fix validés.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900/60 rounded-3xl border border-zinc-800/80 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        
        {/* Lueur de fond FPV Neon */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Partie Gauche : Vue Schématique / Éclatée du drone FPV */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[460px] sm:min-h-[520px] bg-zinc-950/80 rounded-2xl border border-zinc-800 p-4 sm:p-6 overflow-hidden">
          
          {/* Grille technique de fond (Grid FPV) */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #f97316 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* SVG Frame & Bras Drone FPV stylisé en True-X */}
          <svg
            viewBox="0 0 500 500"
            className="w-full max-w-[420px] h-auto drop-shadow-2xl select-none"
          >
            {/* Lignes de visée / réticule FPV */}
            <circle cx="250" cy="250" r="210" fill="none" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="250" cy="250" r="140" fill="none" stroke="#27272a" strokeWidth="1" strokeDasharray="2 4" />
            <line x1="250" y1="20" x2="250" y2="480" stroke="#27272a" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="20" y1="250" x2="480" y2="250" stroke="#27272a" strokeWidth="1" strokeDasharray="2 2" />

            {/* Bras Carbone 1 : Avant Gauche (Moteur 4) */}
            <path
              d="M 230 230 L 100 100 L 80 120 L 220 240 Z"
              fill="#18181b"
              stroke="#3f3f46"
              strokeWidth="2"
            />
            {/* Bras Carbone 2 : Avant Droit (Moteur 2) */}
            <path
              d="M 270 230 L 400 100 L 420 120 L 280 240 Z"
              fill="#18181b"
              stroke="#3f3f46"
              strokeWidth="2"
            />
            {/* Bras Carbone 3 : Arrière Gauche (Moteur 3) */}
            <path
              d="M 230 270 L 100 400 L 80 380 L 220 260 Z"
              fill="#18181b"
              stroke="#3f3f46"
              strokeWidth="2"
            />
            {/* Bras Carbone 4 : Arrière Droit (Moteur 1) */}
            <path
              d="M 270 270 L 400 400 L 420 380 L 280 260 Z"
              fill="#18181b"
              stroke="#3f3f46"
              strokeWidth="2"
            />

            {/* Cercles de rotation des 4 hélices (Prop Circles) */}
            <circle cx="90" cy="110" r="68" fill="rgba(249, 115, 22, 0.05)" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1.5" strokeDasharray="6 4" />
            <circle cx="410" cy="110" r="68" fill="rgba(249, 115, 22, 0.05)" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1.5" strokeDasharray="6 4" />
            <circle cx="90" cy="390" r="68" fill="rgba(249, 115, 22, 0.05)" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1.5" strokeDasharray="6 4" />
            <circle cx="410" cy="390" r="68" fill="rgba(249, 115, 22, 0.05)" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1.5" strokeDasharray="6 4" />

            {/* Moteurs aux 4 extrémités */}
            <circle cx="90" cy="110" r="22" fill="#27272a" stroke="#f97316" strokeWidth="2.5" />
            <circle cx="90" cy="110" r="6" fill="#f97316" />

            <circle cx="410" cy="110" r="22" fill="#27272a" stroke="#f97316" strokeWidth="2.5" />
            <circle cx="410" cy="110" r="6" fill="#f97316" />

            <circle cx="90" cy="390" r="22" fill="#27272a" stroke="#f97316" strokeWidth="2.5" />
            <circle cx="90" cy="390" r="6" fill="#f97316" />

            <circle cx="410" cy="390" r="22" fill="#27272a" stroke="#f97316" strokeWidth="2.5" />
            <circle cx="410" cy="390" r="6" fill="#f97316" />

            {/* Corps central en carbone (Bottom / Top Plate) */}
            <rect x="215" y="160" width="70" height="180" rx="14" fill="#18181b" stroke="#71717a" strokeWidth="2" />
            
            {/* Cage caméra FPV à l avant */}
            <rect x="225" y="125" width="50" height="40" rx="6" fill="#09090b" stroke="#a855f7" strokeWidth="2" />
            <circle cx="250" cy="142" r="10" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
            <circle cx="250" cy="142" r="4" fill="#a855f7" />

            {/* Stack centrale (FC & ESC 30x30) */}
            <rect x="225" y="225" width="50" height="50" rx="5" fill="#09090b" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="232" cy="232" r="2.5" fill="#3b82f6" />
            <circle cx="268" cy="232" r="2.5" fill="#3b82f6" />
            <circle cx="232" cy="268" r="2.5" fill="#3b82f6" />
            <circle cx="268" cy="268" r="2.5" fill="#3b82f6" />
            <rect x="238" y="238" width="24" height="24" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />

            {/* Batterie LiPo en dessous / Strap */}
            <rect x="222" y="295" width="56" height="45" rx="4" fill="#1c1917" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Prise XT60 Jaune */}
            <rect x="240" y="340" width="20" height="12" rx="2" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />

            {/* Antenne T ELRS arrière */}
            <line x1="210" y1="375" x2="290" y2="375" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
            <line x1="250" y1="345" x2="250" y2="375" stroke="#10b981" strokeWidth="2" />

            {/* Mât GPS Arrière */}
            <rect x="238" y="390" width="24" height="18" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
            <circle cx="250" cy="399" r="3" fill="#a7f3d0" />
          </svg>

          {/* Hotspots interactifs sur la vue éclatée */}
          {/* Hotspot 1: Moteurs */}
          <button
            onClick={() => onSelectCategory('motors')}
            onMouseEnter={() => setHoveredComponent(components.find((c) => c.id === 'motors') || null)}
            className={`absolute top-6 left-6 sm:top-10 sm:left-10 px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg ${
              selectedCategory === 'motors'
                ? 'bg-amber-500 text-black border-amber-400 scale-110 shadow-amber-500/50'
                : 'bg-zinc-900/90 text-amber-400 border-amber-500/40 hover:bg-amber-500/20'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>1. Moteurs Brushless</span>
          </button>

          {/* Hotspot 2: Hélices */}
          <button
            onClick={() => onSelectCategory('propellers')}
            onMouseEnter={() => setHoveredComponent(components.find((c) => c.id === 'propellers') || null)}
            className={`absolute top-6 right-6 sm:top-10 sm:right-10 px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg ${
              selectedCategory === 'propellers'
                ? 'bg-sky-500 text-black border-sky-400 scale-110 shadow-sky-500/50'
                : 'bg-zinc-900/90 text-sky-400 border-sky-500/40 hover:bg-sky-500/20'
            }`}
          >
            <Fan className="w-3.5 h-3.5" />
            <span>2. Hélices (Props)</span>
          </button>

          {/* Hotspot 3: Caméra & VTX */}
          <button
            onClick={() => onSelectCategory('vtx-camera')}
            onMouseEnter={() => setHoveredComponent(components.find((c) => c.id === 'vtx-camera') || null)}
            className={`absolute top-24 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg ${
              selectedCategory === 'vtx-camera'
                ? 'bg-purple-500 text-white border-purple-400 scale-110 shadow-purple-500/50'
                : 'bg-zinc-900/90 text-purple-400 border-purple-500/40 hover:bg-purple-500/20'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>3. Caméra & VTX HD</span>
          </button>

          {/* Hotspot 4: Contrôleur de Vol (FC) & ESC */}
          <button
            onClick={() => onSelectCategory('flight-controller')}
            onMouseEnter={() => setHoveredComponent(components.find((c) => c.id === 'flight-controller') || null)}
            className={`absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg ${
              selectedCategory === 'flight-controller'
                ? 'bg-blue-500 text-white border-blue-400 scale-110 shadow-blue-500/50'
                : 'bg-zinc-900/90 text-blue-400 border-blue-500/40 hover:bg-blue-500/20'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>4. FC & Stack 30x30</span>
          </button>

          {/* Hotspot 5: ESC 4-en-1 */}
          <button
            onClick={() => onSelectCategory('esc-stack')}
            onMouseEnter={() => setHoveredComponent(components.find((c) => c.id === 'esc-stack') || null)}
            className={`absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg ${
              selectedCategory === 'esc-stack'
                ? 'bg-red-500 text-white border-red-400 scale-110 shadow-red-500/50'
                : 'bg-zinc-900/90 text-red-400 border-red-500/40 hover:bg-red-500/20'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>5. ESC 4-en-1</span>
          </button>

          {/* Hotspot 6: Radio RX */}
          <button
            onClick={() => onSelectCategory('receiver-rx')}
            onMouseEnter={() => setHoveredComponent(components.find((c) => c.id === 'receiver-rx') || null)}
            className={`absolute bottom-16 left-6 sm:left-14 px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg ${
              selectedCategory === 'receiver-rx'
                ? 'bg-emerald-500 text-black border-emerald-400 scale-110 shadow-emerald-500/50'
                : 'bg-zinc-900/90 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>6. RX ExpressLRS</span>
          </button>

          {/* Hotspot 7: GPS & Sécurité */}
          <button
            onClick={() => onSelectCategory('gps-rescue')}
            onMouseEnter={() => setHoveredComponent(components.find((c) => c.id === 'gps-rescue') || null)}
            className={`absolute bottom-6 right-6 sm:bottom-10 sm:right-14 px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg ${
              selectedCategory === 'gps-rescue'
                ? 'bg-green-500 text-black border-green-400 scale-110 shadow-green-500/50'
                : 'bg-zinc-900/90 text-green-400 border-green-500/40 hover:bg-green-500/20'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>7. GPS Rescue</span>
          </button>
        </div>

        {/* Partie Droite : Fiche Technique & Pannes du composant ciblé */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header composant */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${activeComponent.accentBg}`}>
                  {activeComponent.badge}
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  {activeComponent.totalIssues} pannes répertoriées
                </span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{activeComponent.totalFixes} fixes vérifiés</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${activeComponent.color} text-white shadow-lg`}>
                {getIcon(activeComponent.iconName, "w-6 h-6")}
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">
                  {activeComponent.name}
                </h3>
                <p className="text-xs text-orange-400 font-medium">
                  {activeComponent.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {activeComponent.description}
            </p>

            {/* Marques populaires */}
            <div className="pt-2">
              <span className="text-xs text-zinc-500 block mb-1.5 uppercase font-semibold">
                Marques & Références courantes :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeComponent.popularBrands.map((brand) => (
                  <span
                    key={brand}
                    className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* Exemple de panne et solution en temps réel */}
            {activeComponent.keyIssues.length > 0 && (
              <div className="mt-4 p-4 rounded-xl bg-zinc-950/80 border border-orange-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-orange-400 font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Panne n°1 la plus fréquente
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">
                    Taux succès: {activeComponent.keyIssues[0].successRate}%
                  </span>
                </div>
                <h4 className="text-sm font-bold text-zinc-100">
                  {activeComponent.keyIssues[0].title}
                </h4>
                <p className="text-xs text-zinc-400">
                  <strong className="text-zinc-300">Solution express : </strong>
                  {activeComponent.keyIssues[0].solution}
                </p>
              </div>
            )}
          </div>

          {/* Boutons d'interaction */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row gap-3">
            <a
              href={`#cat-${activeComponent.id}`}
              onClick={() => onSelectCategory(activeComponent.id)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all text-center"
            >
              <span>Voir les pannes & fixes {activeComponent.name}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="#catalogue"
              className="py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
            >
              <span>Pièces compatibles</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
