'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  Search, 
  User, 
  PlusCircle, 
  ShieldCheck, 
  Radio, 
  Menu, 
  X,
  ChevronDown,
  Sparkles,
  LogOut
} from 'lucide-react';
import { PilotUser } from '@/types';

interface HeaderProps {
  onOpenAuth: () => void;
  currentUser: PilotUser | null;
  onLogout: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function Header({
  onOpenAuth,
  currentUser,
  onLogout,
  onSearch,
  searchQuery,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      {/* Top Banner de domaine */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-emerald-950/80 border-b border-emerald-900/40 text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 text-zinc-300">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-emerald-400">fixmydrone.fr</span>
        <span className="hidden sm:inline text-zinc-500">•</span>
        <span className="hidden sm:inline">Plateforme & Forum communautaire d entraide FPV France</span>
        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-mono">
          v1.0 Ready
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo FixMyDrone */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <Wrench className="w-5 h-5 text-white" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-zinc-950 border border-emerald-500/60 flex items-center justify-center">
                <Radio className="w-2.5 h-2.5 text-emerald-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white">
                  FixMy<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Drone</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 font-mono">
                  .FR
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 -mt-0.5 font-medium tracking-wide">
                Dépannage & Catalogue FPV
              </span>
            </div>
          </Link>

          {/* Barre de Recherche rapide */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Chercher une panne (ex: desync, gyro, O3 écran noir, bind ELRS)..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-900/90 text-zinc-100 placeholder-zinc-500 rounded-full border border-zinc-700/60 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-200"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links Desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
            <a href="#drone-schema" className="hover:text-orange-400 transition-colors">
              Vue Éclatée
            </a>
            <a href="#composants" className="hover:text-orange-400 transition-colors">
              Composants
            </a>
            <a href="#catalogue" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
              <span>Catalogue</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-orange-300 border border-zinc-700">
                Multi-Motors
              </span>
            </a>
            <a href="#forum" className="hover:text-orange-400 transition-colors">
              Forum & Fixes
            </a>
          </nav>

          {/* Actions & Login */}
          <div className="flex items-center gap-3">
            <a
              href="#forum"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Signaler une panne</span>
            </a>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.callsign}
                    className="w-7 h-7 rounded-lg object-cover border border-orange-500/40"
                  />
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-zinc-200">
                      {currentUser.callsign}
                    </span>
                    <span className="text-[10px] text-orange-400">
                      {currentUser.badge}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-zinc-800">
                      <p className="text-xs text-zinc-400">Connecté en tant que</p>
                      <p className="text-sm font-bold text-white">{currentUser.callsign}</p>
                      <p className="text-[11px] text-zinc-500">{currentUser.email}</p>
                    </div>
                    <div className="px-4 py-2 text-xs text-zinc-300 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Fixes partagés:</span>
                        <span className="font-semibold text-emerald-400">{currentUser.fixesShared}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Réputation:</span>
                        <span className="font-semibold text-orange-400">{currentUser.reputation} pts</span>
                      </div>
                    </div>
                    <div className="border-t border-zinc-800 mt-2 pt-2">
                      <button
                        onClick={() => {
                          onLogout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-1.5 text-left text-xs text-red-400 hover:bg-zinc-800/60 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Se déconnecter</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black shadow-md shadow-orange-500/20 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Espace Pilote</span>
              </button>
            )}

            {/* Mobile Menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-zinc-950 px-4 pt-3 pb-6 space-y-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Rechercher une panne..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-900 text-zinc-100 rounded-lg border border-zinc-800"
            />
          </div>
          <div className="flex flex-col space-y-2 text-sm font-medium text-zinc-300">
            <a
              href="#drone-schema"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-zinc-900"
            >
              Vue Éclatée Interactive
            </a>
            <a
              href="#composants"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-zinc-900"
            >
              Tous les Composants du Quad
            </a>
            <a
              href="#catalogue"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-zinc-900"
            >
              Catalogue Matériel & Interconnexion
            </a>
            <a
              href="#forum"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-zinc-900"
            >
              Forum & Derniers Fixes
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
