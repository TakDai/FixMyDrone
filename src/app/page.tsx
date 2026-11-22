'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MonochromeDetailedCanvas } from '@/components/MonochromeDetailedCanvas';
import { EcosystemTopNav } from '@/components/EcosystemTopNav';

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-white text-black flex flex-col items-center justify-between overflow-hidden font-sans selection:bg-[#000000] selection:text-white">
      {/* Barre de navigation supérieure style Multi-Motors (Logo, News/Forum, Connexion/Compte) */}
      <header className="w-full shrink-0 z-30">
        <EcosystemTopNav activeTab="home" />
      </header>

      {/* Table principale du drone : élément central unique et plein écran */}
      <main className="w-full flex-1 flex flex-col items-center justify-center overflow-hidden">
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
