'use client';

import React, { useState } from 'react';
import { MonochromeDetailedCanvas } from '@/components/MonochromeDetailedCanvas';
import { ComponentDetailModal } from '@/components/ComponentDetailModal';
import { FigmaComponentData } from '@/data/figmaComponents';

export default function Home() {
  const [selectedComp, setSelectedComp] = useState<FigmaComponentData | null>(null);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-2 py-3 sm:px-6 sm:py-6 font-sans selection:bg-[#000000] selection:text-white">
      {/* Table principale du drone : élément central unique et pleine page */}
      <main className="w-full max-w-[1780px] flex-1 flex flex-col items-center justify-center">
        <MonochromeDetailedCanvas
          onSelectComponent={(comp) => setSelectedComp(comp)}
          selectedCompId={selectedComp?.id}
        />
      </main>

      {/* Modal de diagnostic technique au clic sur un composant */}
      <ComponentDetailModal
        component={selectedComp}
        onClose={() => setSelectedComp(null)}
      />
    </div>
  );
}
