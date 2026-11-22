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
        className={`w-full flex items-center justify-between px-2.5 sm:px-6 py-2 z-30 transition-all ${className}`}
      >
        {/* Espace gauche : totalement épuré sur l'accueil, lien retour sur les pages secondaires */}
        {activeTab !== 'home' ? (
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black hover:text-red-600 transition-colors"
              title="Retour à l'accueil"
            >
              <span>← Accueil</span>
            </Link>
          </div>
        ) : (
          <div className="shrink-0" />
        )}

        {/* Pilules de Navigation Style Multi-Motors */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Onglet Actualités / News (Dashboard Forum) */}
          <Link
            href="/forum"
            className={`inline-flex items-center gap-1.5 sm:gap-2 h-8.5 sm:h-9 px-2.5 sm:px-4.5 border-2 rounded-[13px] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-[0.14em] transition-all duration-150 ${
              activeTab === 'news'
                ? 'border-solid border-black bg-black text-white shadow-sm'
                : 'border-dashed border-black/35 hover:border-solid hover:border-black bg-white text-black/80 hover:text-black hover:shadow-xs'
            }`}
          >
            <span className="hidden xs:inline">Actualités</span>
            <span className={`px-1.5 py-0.5 rounded-[6px] text-[9px] sm:text-[9.5px] font-mono font-black tracking-normal uppercase ${
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
                className="inline-flex items-center gap-1.5 sm:gap-2.5 h-8.5 sm:h-9 px-2.5 sm:px-4 border-2 border-solid border-black rounded-[13px] bg-black text-white font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-[0.12em] hover:bg-zinc-800 transition-all cursor-pointer shadow-sm"
              >
                <div className="w-4.5 h-4.5 rounded-full bg-amber-400 text-black flex items-center justify-center font-black text-[10px]">
                  {pilot.callsign ? pilot.callsign.charAt(0).toUpperCase() : 'P'}
                </div>
                <span className="max-w-[75px] sm:max-w-[140px] truncate">
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
                className="inline-flex items-center gap-1.5 sm:gap-2 h-8.5 sm:h-9 px-2.5 sm:px-4.5 border-2 border-dashed border-black/35 hover:border-solid hover:border-black rounded-[13px] bg-white text-black/80 hover:text-black font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-[0.14em] transition-all cursor-pointer hover:shadow-xs"
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
