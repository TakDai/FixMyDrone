'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  ChevronDown,
  Sparkles,
  Award,
  Gift,
  FileText,
  Globe,
  LogOut,
  Radio,
  ExternalLink,
} from 'lucide-react';
import {
  PilotProfile,
  loadPilotProfile,
  logoutPilot,
  PILOT_LEVELS,
} from '@/data/pilotGamification';
import { EcosystemAuthModal } from '@/components/EcosystemAuthModal';

interface EcosystemTopNavProps {
  className?: string;
  activeTab?: 'home' | 'news' | 'account' | 'diagnostic';
}

export function EcosystemTopNav({ className = '', activeTab }: EcosystemTopNavProps) {
  const router = useRouter();
  const [pilot, setPilot] = useState<PilotProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Synchronisation du profil pilote avec localStorage et les événements système
  const refreshPilot = () => {
    const p = loadPilotProfile();
    setPilot(p);
  };

  useEffect(() => {
    refreshPilot();
    const handleSync = () => refreshPilot();
    window.addEventListener('storage', handleSync);
    window.addEventListener('fpv_ecosystem_account_updated', handleSync);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('fpv_ecosystem_account_updated', handleSync);
    };
  }, []);

  // Fermer le menu au clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutPilot();
    refreshPilot();
    setMenuOpen(false);
  };

  const currentLevelInfo = PILOT_LEVELS.find((l) => l.level === (pilot?.level || 1)) || PILOT_LEVELS[0];

  return (
    <>
      <nav
        aria-label="Navigation principale"
        className={`w-full flex items-center justify-between px-3 sm:px-6 py-2.5 z-30 transition-all ${className}`}
      >
        {/* Logo & Titre Multi-Motors Style */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform active:scale-95"
            title="FixMyDrone — Accueil"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 border-black bg-black text-white flex items-center justify-center font-mono font-black text-xs sm:text-sm tracking-tighter shadow-sm group-hover:bg-zinc-800 transition-colors">
              FD
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-black text-sm sm:text-base tracking-tight text-black group-hover:text-zinc-700 transition-colors">
                FixMyDrone<span className="text-red-600">.fr</span>
              </span>
              <span className="hidden sm:inline-block text-[9px] font-mono text-zinc-600 font-semibold uppercase tracking-wider -mt-0.5">
                Écosystème FPV France
              </span>
            </div>
          </Link>
        </div>

        {/* Pilules de Navigation Style Multi-Motors */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Onglet Actualités / News (Dashboard Forum) */}
          <Link
            href="/forum"
            className={`inline-flex items-center gap-2 h-9 px-4 sm:px-4.5 border-2 rounded-[13px] font-mono text-xs font-bold uppercase tracking-[0.14em] transition-all duration-150 ${
              activeTab === 'news'
                ? 'border-solid border-black bg-black text-white shadow-sm'
                : 'border-dashed border-black/35 hover:border-solid hover:border-black bg-white text-black/80 hover:text-black hover:shadow-xs'
            }`}
          >
            <span>Actualités</span>
            <span className={`px-1.5 py-0.5 rounded-[6px] text-[9.5px] font-mono font-black tracking-normal uppercase ${
              activeTab === 'news' ? 'bg-red-500 text-white' : 'bg-red-600 text-white'
            }`}>
              Forum
            </span>
          </Link>

          {/* Espace Compte / Profil Pilote */}
          <div className="relative" ref={menuRef}>
            {pilot && pilot.isLoggedIn ? (
              // Utilisateur connecté : pilule profil avec callsign, niveau et chevron
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center gap-2.5 h-9 px-3.5 sm:px-4 border-2 border-solid border-black rounded-[13px] bg-black text-white font-mono text-xs font-bold uppercase tracking-[0.12em] hover:bg-zinc-800 transition-all cursor-pointer shadow-sm"
              >
                <div className="w-4.5 h-4.5 rounded-full bg-amber-400 text-black flex items-center justify-center font-black text-[10px]">
                  {pilot.callsign ? pilot.callsign.charAt(0).toUpperCase() : 'P'}
                </div>
                <span className="max-w-[90px] sm:max-w-[140px] truncate">
                  {pilot.callsign || 'PILOTE'}
                </span>
                <span className="hidden xs:inline-block px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-amber-400 text-[9.5px] font-black">
                  Niv.{pilot.level}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    menuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            ) : (
              // Utilisateur non connecté : bouton Connexion Multi-Motors
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="inline-flex items-center gap-2 h-9 px-4 sm:px-4.5 border-2 border-dashed border-black/35 hover:border-solid hover:border-black rounded-[13px] bg-white text-black/80 hover:text-black font-mono text-xs font-bold uppercase tracking-[0.14em] transition-all cursor-pointer hover:shadow-xs"
              >
                <User className="w-3.5 h-3.5" />
                <span>Connexion</span>
              </button>
            )}

            {/* Menu Déroulant Compte (.acct-menu) */}
            {menuOpen && pilot && pilot.isLoggedIn && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-72 rounded-xl border-2 border-black bg-white p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 font-mono">
                {/* Résumé Profil */}
                <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-xs text-black truncate">
                      {pilot.callsign}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-black text-amber-300 text-[9px] font-bold">
                      Niveau {pilot.level}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-sans font-medium">
                    {pilot.levelTitle} • {pilot.xp} XP
                  </p>
                  {/* Mini barre de progression XP */}
                  <div className="mt-2 w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(
                            5,
                            ((pilot.xp - currentLevelInfo.minXp) /
                              (Math.max(1, currentLevelInfo.maxXp - currentLevelInfo.minXp))) *
                              100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Liens rapides du menu */}
                <div className="flex flex-col gap-1">
                  <Link
                    href="/compte"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-black hover:bg-zinc-100 transition-colors"
                  >
                    <User className="w-4 h-4 text-zinc-600" />
                    <span>Mon Compte & Niveaux</span>
                  </Link>

                  <Link
                    href="/compte#rewards"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-black hover:bg-zinc-100 transition-colors"
                  >
                    <Gift className="w-4 h-4 text-emerald-600" />
                    <span>Codes Récompenses</span>
                  </Link>

                  <Link
                    href="/compte#reports"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-black hover:bg-zinc-100 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Rapports d Atelier (+150 XP)</span>
                  </Link>

                  <Link
                    href="/compte#ecosystem"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-black hover:bg-zinc-100 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-purple-600" />
                    <span className="flex-1">7 Sites Partenaires</span>
                    <span className="text-[9px] px-1 bg-purple-100 text-purple-700 font-bold rounded">
                      SSO
                    </span>
                  </Link>

                  <hr className="my-1 border-zinc-200" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors text-left w-full cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Modale d'authentification mutualisée */}
      <EcosystemAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(profile) => {
          setPilot(profile);
          setAuthModalOpen(false);
        }}
      />
    </>
  );
}
