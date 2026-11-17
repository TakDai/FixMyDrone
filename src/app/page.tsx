'use client';

import React, { useState } from 'react';
import { FigmaHeader } from '@/components/FigmaHeader';
import { BugFixNewsSidebar } from '@/components/BugFixNewsSidebar';
import { MonochromeDroneCanvas } from '@/components/MonochromeDroneCanvas';
import { ComponentDetailModal } from '@/components/ComponentDetailModal';
import { 
  FPVIntroModal, 
  GuidesModal, 
  ForumModal, 
  RegisterModal 
} from '@/components/FigmaModals';

import { FIGMA_COMPONENTS, FigmaComponentData } from '@/data/figmaComponents';
import { PilotUser } from '@/types';
import { Globe, Wrench, ShieldCheck, Check } from 'lucide-react';

export default function Home() {
  // Sélection d'un composant pour ouvrir sa fiche détaillée
  const [selectedComp, setSelectedComp] = useState<FigmaComponentData | null>(null);

  // État des modaux
  const [isFPVModalOpen, setIsFPVModalOpen] = useState(false);
  const [isGuidesModalOpen, setIsGuidesModalOpen] = useState(false);
  const [isForumModalOpen, setIsForumModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Utilisateur connecté (Dousile par défaut pour correspondre à la maquette Figma ou null)
  const [currentUser, setCurrentUser] = useState<PilotUser | null>(null);

  const handleSelectNewsCategory = (category: string) => {
    const comp = FIGMA_COMPONENTS.find((c) => c.id === category || c.category.toLowerCase().includes(category));
    if (comp) {
      setSelectedComp(comp);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-[#cbf3d2] selection:text-black">
      
      {/* 1. Header fidèle à la maquette Figma & charte SEEWORLD */}
      <FigmaHeader
        onOpenFPVIntro={() => setIsFPVModalOpen(true)}
        onOpenGuides={() => setIsGuidesModalOpen(true)}
        onOpenForum={() => setIsForumModalOpen(true)}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        currentUser={currentUser}
        onLogin={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
      />

      {/* 2. Corps principal de la page : 2 colonnes séparées par une ligne pointillée verticale */}
      <main className="flex-1 max-w-[1850px] w-full mx-auto px-4 sm:px-8 flex flex-col lg:flex-row">
        
        {/* Colonne Gauche : Sidebar BugFixe News */}
        <BugFixNewsSidebar onSelectNews={handleSelectNewsCategory} />

        {/* Colonne Droite & Centre : Les composants du drone redessinés en monochrome parfait */}
        <MonochromeDroneCanvas
          onSelectComponent={(comp) => setSelectedComp(comp)}
          selectedCompId={selectedComp?.id}
        />

      </main>

      {/* Pied de page épuré style Seeworld */}
      <footer className="w-full border-t-[1.5px] border-dashed border-black/40 py-4 px-6 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1850px] mx-auto select-none">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-black">FixMyQuad / FixMyDrone</span>
          <span>•</span>
          <span className="font-mono text-zinc-600">fixmydrone.fr</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-zinc-600">
          <span>Charte SEEWORLD • Minimaliste & Filaire</span>
          <span>•</span>
          <span>Base catalogue Multi-Motors interconnectée</span>
        </div>
      </footer>

      {/* Modals de l'application */}
      <ComponentDetailModal
        component={selectedComp}
        onClose={() => setSelectedComp(null)}
      />

      <FPVIntroModal
        isOpen={isFPVModalOpen}
        onClose={() => setIsFPVModalOpen(false)}
      />

      <GuidesModal
        isOpen={isGuidesModalOpen}
        onClose={() => setIsGuidesModalOpen(false)}
        onSelectComponent={handleSelectNewsCategory}
      />

      <ForumModal
        isOpen={isForumModalOpen}
        onClose={() => setIsForumModalOpen(false)}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegisterSuccess={(user) => setCurrentUser(user)}
      />

    </div>
  );
}
