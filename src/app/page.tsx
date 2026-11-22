'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MonochromeDetailedCanvas } from '@/components/MonochromeDetailedCanvas';

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-white text-black flex flex-col items-center justify-center p-1 sm:p-2 overflow-hidden font-sans selection:bg-[#000000] selection:text-white">
      {/* Table principale du drone : élément central unique et pleine page */}
      <main className="w-full h-full flex-1 flex flex-col items-center justify-center overflow-hidden">
        <MonochromeDetailedCanvas
          onSelectComponent={(comp) => {
            // Redirection immédiate vers le cheminement de résolution de problème & diagnostic IA
            const targetId = comp.id === 'motor' ? 'motors' : comp.id;
            router.push(`/diagnostic/${targetId}`);
          }}
        />
      </main>
    </div>
  );
}
