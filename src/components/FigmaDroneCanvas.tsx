'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FIGMA_COMPONENTS, FigmaComponentData } from '@/data/figmaComponents';
import { Wrench, CheckCircle, AlertTriangle } from 'lucide-react';

interface FigmaDroneCanvasProps {
  onSelectComponent: (comp: FigmaComponentData) => void;
  selectedCompId?: string;
}

export function FigmaDroneCanvas({
  onSelectComponent,
  selectedCompId,
}: FigmaDroneCanvasProps) {
  const [hoveredComp, setHoveredComp] = useState<FigmaComponentData | null>(null);

  return (
    <section className="flex-1 w-full flex flex-col items-center justify-center p-2 sm:p-6 select-none relative">
      
      {/* Conteneur principal avec ratio d'aspect fidèle à la maquette */}
      <div className="relative w-full max-w-[1280px] aspect-[546/320] bg-white rounded-2xl overflow-hidden shadow-xs">
        
        {/* Image haute fidélité découpée depuis la maquette Figma */}
        <Image
          src="/figma-exploded-drone.png"
          alt="Schéma éclaté des composants FPV - FixMyDrone"
          fill
          priority
          className="object-contain pointer-events-none"
        />

        {/* Zones interactives (Hotspots) cliquables superposées */}
        {FIGMA_COMPONENTS.map((comp) => {
          const isSelected = selectedCompId === comp.id;
          const isHovered = hoveredComp?.id === comp.id;

          return (
            <div
              key={comp.id}
              onClick={() => onSelectComponent(comp)}
              onMouseEnter={() => setHoveredComp(comp)}
              onMouseLeave={() => setHoveredComp(null)}
              style={{
                top: comp.hotspot.top,
                left: comp.hotspot.left,
                width: comp.hotspot.width,
                height: comp.hotspot.height,
              }}
              className={`absolute cursor-pointer transition-all duration-150 rounded-xl group ${
                isSelected
                  ? 'ring-2 ring-black bg-black/5'
                  : isHovered
                  ? 'ring-[1.5px] ring-dashed ring-black bg-black/[0.03]'
                  : 'hover:ring-1 hover:ring-dashed hover:ring-black/60'
              }`}
              title={`${comp.name} - Cliquer pour ouvrir la fiche de panne`}
            >
              {/* Badge flottant au survol */}
              {(isHovered || isSelected) && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black text-white text-[11px] font-sans font-medium whitespace-nowrap shadow-lg z-30 flex items-center gap-1.5 pointer-events-none animate-in fade-in duration-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{comp.name}</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Pastille discrète d'instruction en bas à gauche */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border-[1.5px] border-dashed border-black/40 text-[11px] text-zinc-600 flex items-center gap-2 pointer-events-none">
          <Wrench className="w-3.5 h-3.5 text-black" />
          <span>Survolez et cliquez sur un composant pour voir les pannes & fixes</span>
        </div>

      </div>

      {/* Barre récapitulative rapide sous le canvas */}
      <div className="w-full max-w-[1280px] mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 border-t-[1.5px] border-dashed border-zinc-300 pt-3">
        <div className="flex items-center gap-4">
          <span className="font-bold text-black uppercase tracking-wider text-[11px]">
            Organes référencés :
          </span>
          <span className="italic">{FIGMA_COMPONENTS.length} composants interconnectés</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-zinc-700">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            Base catalogue Multi-Motors synchronisée
          </span>
          <span className="flex items-center gap-1 text-zinc-700">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Signalement d atelier participatif
          </span>
        </div>
      </div>

    </section>
  );
}
