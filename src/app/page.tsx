'use client';

import React, { useState } from 'react';
import { MonochromeDetailedCanvas } from '@/components/MonochromeDetailedCanvas';
import { ComponentDetailModal } from '@/components/ComponentDetailModal';
import { FIGMA_COMPONENTS, FigmaComponentData } from '@/data/figmaComponents';

export default function Home() {
  // Sélection d'un composant pour ouvrir sa fiche détaillée
  const [selectedComp, setSelectedComp] = useState<FigmaComponentData | null>(null);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-[#000000] selection:text-white">
      
      {/* En-tête minimaliste style Multi-Motors CAD */}
      <header className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between border-b-[1.5px] border-dashed border-black/25 select-none">
        <div className="flex items-center gap-3">
          <h1 className="font-mono text-lg sm:text-xl font-black tracking-tight uppercase text-black">
            FixMyDrone<span className="text-zinc-400 text-xs font-normal ml-1">.fr</span>
          </h1>
          <span className="text-zinc-300 text-xs hidden sm:inline">•</span>
          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline uppercase tracking-widest">
            Schéma Technique CAO & Diagnostic FPV Interactif
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[10px] sm:text-[11px] font-mono font-bold text-black border-[1.5px] border-black px-3 py-1 rounded-full uppercase tracking-wider bg-zinc-50">
            Vue Éclatée CAD 2D
          </div>
        </div>
      </header>

      {/* Corps principal : la table avec les composants comme élément central absolu */}
      <main className="flex-1 w-full max-w-[1700px] mx-auto px-2 sm:px-6 py-2 flex flex-col items-center justify-center">
        <MonochromeDetailedCanvas
          onSelectComponent={(comp) => setSelectedComp(comp)}
          selectedCompId={selectedComp?.id}
        />
      </main>

      {/* Pied de page épuré style Seeworld / Multi-Motors */}
      <footer className="w-full border-t-[1.5px] border-dashed border-black/25 py-3 px-6 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1700px] mx-auto select-none">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="font-bold text-black uppercase tracking-wider">FixMyDrone</span>
          <span>•</span>
          <span className="font-mono text-zinc-600">fixmydrone.fr</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-zinc-600">
          <span>Charte SEEWORLD & Multi-Motors.fr</span>
          <span>•</span>
          <span>Vue Orthogonale CAO 100% Vectorielle</span>
        </div>
      </footer>

      {/* Modal de diagnostic détaillé au clic sur un composant */}
      <ComponentDetailModal
        component={selectedComp}
        onClose={() => setSelectedComp(null)}
      />

    </div>
  );
}
