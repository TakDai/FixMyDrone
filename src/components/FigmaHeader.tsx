'use client';

import React, { useState } from 'react';
import { PilotUser } from '@/types';

interface FigmaHeaderProps {
  onOpenFPVIntro: () => void;
  onOpenGuides: () => void;
  onOpenForum: () => void;
  onOpenRegisterModal: () => void;
  currentUser: PilotUser | null;
  onLogin: (user: PilotUser) => void;
  onLogout: () => void;
}

export function FigmaHeader({
  onOpenFPVIntro,
  onOpenGuides,
  onOpenForum,
  onOpenRegisterModal,
  currentUser,
  onLogin,
  onLogout,
}: FigmaHeaderProps) {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user: PilotUser = {
      id: 'dousile-user',
      callsign: usernameInput.trim() || 'Dousile',
      email: (usernameInput.trim().toLowerCase() || 'dousile') + '@fixmydrone.fr',
      avatar: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'Pilote',
      badge: 'Expert Betaflight',
      dronesCount: 3,
      reputation: 340,
      fixesShared: 8,
    };
    onLogin(user);
  };

  return (
    <header className="w-full bg-white border-b-[1.5px] border-dashed border-black px-4 sm:px-8 py-3 select-none">
      <div className="max-w-[1850px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Partie Gauche : Bouton "C'est quoi le FPV ?" */}
        <div className="flex items-center">
          <button
            onClick={onOpenFPVIntro}
            className="px-6 py-2.5 rounded-xl border-[1.5px] border-dashed border-black text-black text-lg sm:text-xl font-light italic tracking-tight hover:bg-zinc-50 transition-colors cursor-pointer shadow-sm"
          >
            C&apos;est quoi le FPV ?
          </button>
        </div>

        {/* Partie Centrale : Logo FixMyQuad / FixMyDrone */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-black font-sans">
            FixMy<span className="font-light">Quad</span>
          </h1>
          <div className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 -mt-1 font-mono">
            fixmydrone.fr • Community & Fixes
          </div>
        </div>

        {/* Partie Droite : Navigation + Bloc Connexion exact de la maquette Figma */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-4">
          
          {/* Bouton Guides */}
          <button
            onClick={onOpenGuides}
            className="px-5 py-2 rounded-xl border-[1.5px] border-dashed border-black text-black text-sm sm:text-base font-normal hover:bg-zinc-50 transition-colors cursor-pointer"
          >
            Guides
          </button>

          {/* Bouton Forum */}
          <button
            onClick={onOpenForum}
            className="px-5 py-2 rounded-xl border-[1.5px] border-dashed border-black text-black text-sm sm:text-base font-normal hover:bg-zinc-50 transition-colors cursor-pointer"
          >
            Forum
          </button>

          {/* Module d'authentification */}
          {currentUser ? (
            /* État Connecté (comme dans la frame Connexion du Figma : Dousile + Avatar renard + Déconnexion) */
            <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-dashed border-zinc-300">
              <div className="w-10 h-10 rounded-full bg-[#cbf3d2] border border-black flex items-center justify-center overflow-hidden">
                <span className="text-lg">🦊</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-black leading-tight">
                  {currentUser.callsign}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">Pilote connecté</span>
              </div>
              <button
                onClick={onLogout}
                className="px-3 py-1.5 rounded-lg bg-[#fdd8d8] hover:bg-[#fbc0c0] text-black border border-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                DÉCONNEXION
              </button>
            </div>
          ) : (
            /* État Non-Connecté (Header Figma : Utilisateur / mot de passe + CONNEXION + S'INSCRIRE) */
            <form onSubmit={handleQuickLogin} className="flex items-center gap-2 pl-2">
              <div className="flex flex-col space-y-1">
                {/* Champ Utilisateur */}
                <div className="flex items-center gap-1.5">
                  <label className="text-[11px] font-bold text-black w-20 text-right">
                    Utilisateur
                  </label>
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Dousile"
                    className="w-28 sm:w-32 px-2 py-0.5 text-xs border-[1.5px] border-dashed border-black rounded bg-white text-black focus:outline-none"
                  />
                </div>

                {/* Champ mot de passe */}
                <div className="flex items-center gap-1.5">
                  <label className="text-[11px] font-bold text-black w-20 text-right">
                    mot de passe
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••"
                    className="w-28 sm:w-32 px-2 py-0.5 text-xs border-[1.5px] border-dashed border-black rounded bg-white text-black focus:outline-none"
                  />
                </div>

                {/* Mot de passe oublié */}
                <div className="text-right">
                  <a
                    href="#forgot"
                    onClick={(e) => { e.preventDefault(); alert("Un lien de réinitialisation vous sera envoyé."); }}
                    className="text-[9px] text-zinc-500 italic hover:underline"
                  >
                    mot de passe oublié ?
                  </a>
                </div>
              </div>

              {/* Boutons Connexion / S'inscrire */}
              <div className="flex flex-col space-y-1 ml-1">
                <button
                  type="submit"
                  className="px-3 py-1 rounded-lg bg-[#cbf3d2] hover:bg-[#b5eabf] text-black border border-black text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  CONNEXION
                </button>
                <button
                  type="button"
                  onClick={onOpenRegisterModal}
                  className="px-3 py-1 rounded-lg bg-[#f7eed7] hover:bg-[#faedd8] text-black border border-black text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  S&apos;INSCRIRE
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </header>
  );
}
