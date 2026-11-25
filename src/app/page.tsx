'use client';

import React, { useState } from 'react';
import { MonochromeDetailedCanvas } from '@/components/MonochromeDetailedCanvas';
import { EcosystemTopNav } from '@/components/EcosystemTopNav';
import { ComponentDetailModal } from '@/components/ComponentDetailModal';
import { FigmaComponentData } from '@/data/figmaComponents';

export default function Home() {
  const [selectedComp, setSelectedComp] = useState<FigmaComponentData | null>(null);

  return (
    <div className="h-screen w-screen bg-white text-black flex flex-col items-center justify-between overflow-hidden font-sans selection:bg-[#000000] selection:text-white">
      {/* Barre de navigation supérieure style Multi-Motors (Logo, News/Forum, Connexion/Compte) */}
      <header className="w-full shrink-0 z-30">
        <EcosystemTopNav activeTab="home" />
      </header>

      {/* Table principale du drone : élément central unique et plein écran */}
      <main className="w-full flex-1 flex flex-col items-center justify-center overflow-hidden">
        <MonochromeDetailedCanvas
          onSelectComponent={(comp) => setSelectedComp(comp)}
          selectedCompId={selectedComp?.id}
        />
      </main>

      {/* Pop-up de fiche composant au clic (sans redirection immédiate vers le forum/diagnostic) */}
      <ComponentDetailModal
        key={selectedComp?.id}
        component={selectedComp}
        onClose={() => setSelectedComp(null)}
      />
    </div>
  );
}
