'use client';

import React, { useState } from 'react';
import { MonochromeDetailedCanvas } from '@/components/MonochromeDetailedCanvas';
import { ComponentDetailModal } from '@/components/ComponentDetailModal';
import { FigmaComponentData } from '@/data/figmaComponents';

export default function Home() {
  const [selectedComp, setSelectedComp] = useState<FigmaComponentData | null>(null);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-1 sm:p-4 font-sans selection:bg-[#000000] selection:text-white">
      {/* Table principale du drone : élément central unique et pleine page */}
      <main className="w-full max-w-[1600px] flex-1 flex flex-col items-center justify-center">
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
