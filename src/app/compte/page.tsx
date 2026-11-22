'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  ShieldCheck,
  Award,
  Sparkles,
  Gift,
  FileText,
  Globe,
  CheckCircle2,
  Lock,
  Copy,
  Check,
  ChevronRight,
  Wrench,
  Layers,
  ArrowRight,
  ExternalLink,
  PlusCircle,
  HelpCircle,
  Clock,
  Radio,
  Search,
  Zap,
} from 'lucide-react';
import { EcosystemTopNav } from '@/components/EcosystemTopNav';
import { EcosystemAuthModal } from '@/components/EcosystemAuthModal';
import { DetailedFixReportModal } from '@/components/DetailedFixReportModal';
import {
  PilotProfile,
  loadPilotProfile,
  savePilotProfile,
  PILOT_LEVELS,
  PRESTIGE_ORDERS,
  MajorPrestigeOrder,
  ALL_PILOT_BADGES,
  ECOSYSTEM_SITES,
  PARTNER_REWARDS,
  DetailedFixReport,
  getLevelFromXp,
  getEcosystemPartnerUrl,
} from '@/data/pilotGamification';

export default function PilotAccountPage() {
  const [pilot, setPilot] = useState<PilotProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'levels' | 'badges' | 'ecosystem' | 'rewards' | 'reports'>('profile');
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedOrderNum, setSelectedOrderNum] = useState<number>(1);
  const [levelSearchInput, setLevelSearchInput] = useState<string>('');

  const refreshPilot = () => {
    const p = loadPilotProfile();
    setPilot(p);
  };

  useEffect(() => {
    refreshPilot();
    const handleSync = () => refreshPilot();
    window.addEventListener('storage', handleSync);
    window.addEventListener('fpv_ecosystem_account_updated', handleSync);

    // Si une ancre est présente dans l'URL (#rewards, #reports, #badges, etc.)
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (['profile', 'levels', 'badges', 'ecosystem', 'rewards', 'reports'].includes(hash)) {
        setActiveTab(hash as any);
      }
    }

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('fpv_ecosystem_account_updated', handleSync);
    };
  }, []);

  const handleCopyCode = (id: string, code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), 2000);
    }
  };

  const handleNewReport = (reportData: Omit<DetailedFixReport, 'id' | 'createdAt' | 'xpEarned'>) => {
    if (!pilot) return;
    const earnedXp = 150;
    const newReport: DetailedFixReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('fr-FR'),
      xpEarned: earnedXp,
    };

    const newTotalXp = pilot.xp + earnedXp;
    const lvl = getLevelFromXp(newTotalXp);

    const updated: PilotProfile = {
      ...pilot,
      xp: newTotalXp,
      level: lvl.level,
      levelTitle: lvl.title,
      detailedReportsCount: (pilot.detailedReportsCount || 0) + 1,
      fixesResolvedCount: (pilot.fixesResolvedCount || 0) + 1,
      historyReports: [newReport, ...(pilot.historyReports || [])],
    };

    savePilotProfile(updated);
    setPilot(updated);
    setReportModalOpen(false);
  };

  const currentLevelInfo = PILOT_LEVELS.find((l) => l.level === (pilot?.level || 1)) || PILOT_LEVELS[0];
  const nextLevelInfo = PILOT_LEVELS.find((l) => l.level === (pilot?.level || 1) + 1);
  const xpInCurrentLevel = (pilot?.xp || 0) - currentLevelInfo.minXp;
  const xpNeededForNext = nextLevelInfo ? nextLevelInfo.minXp - (pilot?.xp || 0) : 0;
  const totalXpRange = Math.max(1, currentLevelInfo.maxXp - currentLevelInfo.minXp);
  const progressPercent = nextLevelInfo
    ? Math.min(100, Math.max(5, (xpInCurrentLevel / totalXpRange) * 100))
    : 100;

  return (
    <div className="min-h-screen bg-zinc-50 text-black flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Barre de navigation style Multi-Motors */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b-2 border-black z-30">
        <EcosystemTopNav activeTab="account" />
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* En-tête de la Page de Compte */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-zinc-200">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded-[6px] bg-red-600 text-white font-mono text-[10px] font-black uppercase tracking-wider">
                  SSO Écosystème
                </span>
                <span className="text-xs font-mono text-zinc-500 font-semibold uppercase">
                  7 Sites Connectés
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-mono font-black uppercase tracking-tight text-black">
                Compte Pilote & Paliers d Atelier
              </h1>
              <p className="text-sm text-zinc-600 mt-1 max-w-2xl font-normal">
                Identité unique mutualisée sur tout l écosystème FPV. Gagnez de l XP à chaque panne résolue, débloquez des badges et accédez aux codes promos partenaires exclusifs.
              </p>
            </div>

            {/* Actions rapides */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setReportModalOpen(true)}
                className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-black text-white hover:bg-zinc-800 font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-amber-400" />
                <span>Nouveau Rapport (+150 XP)</span>
              </button>
            </div>
          </div>

          {/* Navigation par Onglets Piliers Style Multi-Motors */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveTab('profile')}
              className={`h-9 px-4 rounded-[12px] font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white border-2 border-zinc-200 text-zinc-700 hover:border-black hover:text-black'
              }`}
            >
              Vue d ensemble
            </button>
            <button
              onClick={() => setActiveTab('levels')}
              className={`h-9 px-4 rounded-[12px] font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'levels'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white border-2 border-zinc-200 text-zinc-700 hover:border-black hover:text-black'
              }`}
            >
              1000 Niveaux & Prestige XP
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`h-9 px-4 rounded-[12px] font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'badges'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white border-2 border-zinc-200 text-zinc-700 hover:border-black hover:text-black'
              }`}
            >
              12 Badges & Trophées ({pilot?.unlockedBadges?.length || 1}/12)
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`h-9 px-4 rounded-[12px] font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'rewards'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white border-2 border-zinc-200 text-zinc-700 hover:border-black hover:text-black'
              }`}
            >
              Codes Réductions Partenaires
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`h-9 px-4 rounded-[12px] font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white border-2 border-zinc-200 text-zinc-700 hover:border-black hover:text-black'
              }`}
            >
              Historique des Rapports ({pilot?.historyReports?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('ecosystem')}
              className={`h-9 px-4 rounded-[12px] font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'ecosystem'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white border-2 border-zinc-200 text-zinc-700 hover:border-black hover:text-black'
              }`}
            >
              7 Sites Mutualisés (SSO)
            </button>
          </div>
        </div>

        {/* CONTENU SELON ONGLET */}
        
        {/* ================= 1. VUE D'ENSEMBLE DU PROFIL ================= */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Carte Pilote Principale */}
            <div className="bg-white rounded-2xl border-2 border-black p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-zinc-200">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black text-white border-2 border-black flex items-center justify-center font-mono font-black text-2xl sm:text-3xl shadow-sm">
                    {pilot?.callsign ? pilot.callsign.charAt(0).toUpperCase() : 'P'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-mono font-black uppercase text-black tracking-tight">
                        {pilot?.callsign || 'PILOTE_ANONYME'}
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[10px] font-black uppercase">
                        Niveau {pilot?.level || 1}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-500 font-mono mt-0.5">
                      {pilot?.email || 'Non connecté'} • {pilot?.role || 'Pilote FPV'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> SSO Actif
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        Membre depuis {pilot?.createdAt || 'Novembre 2026'}
                      </span>
                    </div>
                  </div>
                </div>

                {!pilot?.isLoggedIn && (
                  <button
                    type="button"
                    onClick={() => setAuthModalOpen(true)}
                    className="h-10 px-5 rounded-xl bg-red-600 text-white hover:bg-red-700 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Se connecter / Créer un compte
                  </button>
                )}
              </div>

              {/* Jauge d'XP et Progression */}
              <div className="py-6 border-b border-zinc-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase text-black">
                      Rang actuel : <span className="text-red-600">{pilot?.levelTitle}</span>
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-600">
                    {pilot?.xp || 0} / {currentLevelInfo.maxXp} XP
                  </span>
                </div>
                
                {/* Barre de progression XP */}
                <div className="w-full h-3 bg-zinc-100 border border-zinc-300 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2 text-[11px] font-mono text-zinc-500">
                  <span>{currentLevelInfo.minXp} XP</span>
                  {nextLevelInfo ? (
                    <span className="text-black font-semibold">
                      Encore {xpNeededForNext} XP pour atteindre le Niveau {nextLevelInfo.level} ({nextLevelInfo.title})
                    </span>
                  ) : (
                    <span className="text-amber-600 font-bold">Palier Maximum Atteint (Légende FPV)</span>
                  )}
                  <span>{currentLevelInfo.maxXp} XP</span>
                </div>
              </div>

              {/* 4 Métriques Clés */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6">
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">
                    XP Total
                  </div>
                  <div className="text-2xl font-mono font-black text-black mt-1">
                    {pilot?.xp || 0}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1 font-mono">
                    Points d atelier
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">
                    Pannes Résolues
                  </div>
                  <div className="text-2xl font-mono font-black text-black mt-1">
                    {pilot?.fixesResolvedCount || 0}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1 font-mono">
                    Interventions validées
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">
                    Rapports d Atelier
                  </div>
                  <div className="text-2xl font-mono font-black text-black mt-1">
                    {pilot?.detailedReportsCount || 0}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1 font-mono">
                    Guides rédigés (+150 XP)
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">
                    Votes Utiles Reçus
                  </div>
                  <div className="text-2xl font-mono font-black text-black mt-1">
                    {pilot?.communityHelpfulVotes || 0}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1 font-mono">
                    Pilotes aidés
                  </div>
                </div>
              </div>
            </div>

            {/* Badges débloqués */}
            <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-mono font-black uppercase text-black">
                    Badges & Distinctions ({pilot?.unlockedBadges?.length || 0}/12)
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">
                    Distinction publique sur le forum et l écosystème
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('badges')}
                  className="text-xs font-mono font-bold text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Voir les 12 trophées <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {pilot?.unlockedBadges && pilot.unlockedBadges.length > 0 ? (
                  pilot.unlockedBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="p-3 rounded-xl border border-zinc-200 bg-zinc-50 flex items-start gap-3 hover:border-black transition-colors"
                    >
                      <div className="text-2xl shrink-0">{badge.icon}</div>
                      <div>
                        <div className="font-mono text-xs font-bold text-black uppercase">
                          {badge.name}
                        </div>
                        <p className="text-[11px] text-zinc-600 mt-0.5">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-6 text-zinc-400 font-mono text-xs">
                    Aucun badge débloqué pour le moment. Rédigez un rapport d atelier pour débloquer votre premier badge !
                  </div>
                )}
              </div>
            </div>

            {/* Aperçu rapide des 7 sites mutualisés */}
            <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-mono font-black uppercase text-black">
                  Compte Mutualisé Écosystème Quad
                </h3>
                <button
                  onClick={() => setActiveTab('ecosystem')}
                  className="text-xs font-mono font-bold text-red-600 hover:underline flex items-center gap-1"
                >
                  Voir les 7 sites <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-zinc-600 mb-4 font-normal">
                Votre session est partagée automatiquement. Vous pouvez naviguer sur Multi-Motors, BindMyQuad, CamYQuad et les autres sites partenaires sans jamais vous reconnecter.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {ECOSYSTEM_SITES.map((site) => (
                  <div
                    key={site.id}
                    className="p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-center flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-mono font-bold text-black truncate">
                        {site.name}
                      </div>
                      <span className="text-[8px] font-mono text-zinc-500 block truncate">
                        {site.domain}
                      </span>
                    </div>
                    <span className="mt-2 text-[8px] font-mono font-bold text-emerald-700 bg-emerald-100 rounded py-0.5 px-1 inline-block">
                      Connecté (SSO)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. PALIERS & 1000 NIVEAUX D'EXPÉRIENCE ================= */}
        {activeTab === 'levels' && (() => {
          const currentOrder = PRESTIGE_ORDERS.find(
            (o) => (pilot?.level || 1) >= o.startLevel && (pilot?.level || 1) <= o.endLevel
          ) || PRESTIGE_ORDERS[0];

          // Filtrage des niveaux affichés
          const searchedLevelNum = parseInt(levelSearchInput.trim(), 10);
          const isSearchingValidLevel =
            !isNaN(searchedLevelNum) && searchedLevelNum >= 1 && searchedLevelNum <= 1000;

          const displayedLevels = isSearchingValidLevel
            ? PILOT_LEVELS.filter((l) => l.level === searchedLevelNum)
            : PILOT_LEVELS.filter(
                (l) => {
                  const ord = PRESTIGE_ORDERS.find((o) => o.orderNumber === selectedOrderNum) || PRESTIGE_ORDERS[0];
                  return l.level >= ord.startLevel && l.level <= ord.endLevel;
                }
              );

          const activeOrder = PRESTIGE_ORDERS.find((o) => o.orderNumber === selectedOrderNum) || PRESTIGE_ORDERS[0];

          return (
            <div className="space-y-6">
              {/* Carte Principale 1000 Niveaux */}
              <div className="bg-white rounded-2xl border-2 border-black p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-zinc-200">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-black text-white font-mono text-[10px] font-black uppercase tracking-wider">
                        1 000 Niveaux Déployés
                      </span>
                      <span className="text-xs font-mono text-zinc-500 font-bold uppercase">
                        12 Ordres Majeurs de Prestige
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-mono font-black uppercase text-black">
                      La Voie de l Atelier : Progression vers le Niveau 1000
                    </h2>
                    <p className="text-xs text-zinc-600 font-normal mt-1 max-w-2xl">
                      Chaque réparation et rapport d atelier vous fait grimper dans la hiérarchie mondiale. Débloquez de nouveaux titres honorifiques, des multiplicateurs d XP et des privilèges exclusifs auprès des constructeurs.
                    </p>
                  </div>

                  {/* Résumé du Pilote Actuel */}
                  <div className="p-4 rounded-xl bg-zinc-50 border-2 border-black flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-mono font-black text-lg">
                      {pilot?.level || 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-black uppercase text-black">
                          {pilot?.levelTitle || 'Rookie Pilote'}
                        </span>
                        <span className="text-[10px] font-mono text-red-600 font-bold">
                          / 1000
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500 block">
                        Ordre {currentOrder.romanNumeral} : {currentOrder.name.split('&')[0].trim()}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold">
                        Multiplicateur XP : x{(1 + ((pilot?.level || 1) - 1) * 0.005).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sélecteur des 12 Ordres de Prestige */}
                <div className="mt-6 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold uppercase text-black">
                      Les 12 Ordres Majeurs de l Écosystème :
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">
                      Cliquez sur un ordre pour explorer ses paliers
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {PRESTIGE_ORDERS.map((ord) => {
                      const isSelected = selectedOrderNum === ord.orderNumber && !isSearchingValidLevel;
                      const isCurrentOrder =
                        (pilot?.level || 1) >= ord.startLevel && (pilot?.level || 1) <= ord.endLevel;

                      return (
                        <button
                          key={ord.id}
                          type="button"
                          onClick={() => {
                            setSelectedOrderNum(ord.orderNumber);
                            setLevelSearchInput('');
                          }}
                          className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-black bg-black text-white shadow-sm'
                              : isCurrentOrder
                              ? 'border-red-600 bg-red-50/50 text-black'
                              : 'border-zinc-200 bg-white hover:border-black text-zinc-800'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-base">{ord.icon}</span>
                            <span
                              className={`font-mono text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                                isSelected ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-700'
                              }`}
                            >
                              Ordre {ord.romanNumeral}
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="font-mono text-xs font-bold leading-tight line-clamp-1">
                              {ord.name.split('&')[0].trim()}
                            </div>
                            <span
                              className={`text-[10px] font-mono block mt-0.5 ${
                                isSelected ? 'text-zinc-300' : 'text-zinc-500'
                              }`}
                            >
                              Niv. {ord.startLevel} - {ord.endLevel}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Barre de Recherche Rapide & Raccourcis Niveaux */}
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <Search className="w-4 h-4 text-zinc-500 shrink-0" />
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={levelSearchInput}
                      onChange={(e) => setLevelSearchInput(e.target.value)}
                      placeholder="Saisir un niveau exact (ex: 2, 50, 250, 500, 1000)..."
                      className="bg-transparent text-xs font-mono text-black placeholder:text-zinc-400 focus:outline-none w-full"
                    />
                    {levelSearchInput && (
                      <button
                        type="button"
                        onClick={() => setLevelSearchInput('')}
                        className="text-xs font-mono text-zinc-500 hover:text-black font-bold uppercase cursor-pointer"
                      >
                        Effacer
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setLevelSearchInput('');
                        setSelectedOrderNum(currentOrder.orderNumber);
                      }}
                      className="h-8 px-2.5 rounded-lg bg-white border border-zinc-300 hover:border-black font-mono text-[11px] font-bold text-black transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Mon Niveau ({pilot?.level || 1})
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLevelSearchInput('500');
                      }}
                      className="h-8 px-2.5 rounded-lg bg-white border border-zinc-300 hover:border-black font-mono text-[11px] font-bold text-black transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Niveau 500
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLevelSearchInput('1000');
                      }}
                      className="h-8 px-2.5 rounded-lg bg-red-600 hover:bg-red-700 font-mono text-[11px] font-bold text-white transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Niveau 1000 (Ultime)
                    </button>
                  </div>
                </div>

                {/* Bannière de l'Ordre Actif */}
                {!isSearchingValidLevel && (
                  <div className="mb-6 p-4 rounded-xl bg-zinc-100 border border-zinc-300 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{activeOrder.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black uppercase text-red-600">
                            Ordre {activeOrder.romanNumeral} :
                          </span>
                          <span className="font-mono text-sm font-black uppercase text-black">
                            {activeOrder.name}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 mt-0.5">
                          {activeOrder.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-left md:text-right shrink-0">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">
                        Grand Privilège :
                      </span>
                      <span className="text-xs font-mono font-bold text-black">
                        {activeOrder.grandPerk}
                      </span>
                    </div>
                  </div>
                )}

                {/* Liste des Niveaux Générés (Fluidité garantie) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pb-1 border-b border-zinc-200">
                    <span>
                      {isSearchingValidLevel
                        ? `Affichage du niveau recherché (${searchedLevelNum})`
                        : `Affichage des niveaux ${activeOrder.startLevel} à ${activeOrder.endLevel} (${displayedLevels.length} paliers)`}
                    </span>
                    <span>XP Requis & Titre Honorifique</span>
                  </div>

                  {displayedLevels.map((lvl) => {
                    const isCurrent = (pilot?.level || 1) === lvl.level;
                    const isUnlocked = (pilot?.level || 1) >= lvl.level;

                    return (
                      <div
                        key={lvl.level}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          isCurrent
                            ? 'border-black bg-zinc-50 shadow-md ring-2 ring-black/10'
                            : isUnlocked
                            ? 'border-zinc-300 bg-white'
                            : 'border-zinc-200 bg-zinc-50/50 opacity-75'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center font-mono font-black ${
                                isCurrent
                                  ? 'bg-red-600 text-white'
                                  : isUnlocked
                                  ? 'bg-black text-white'
                                  : 'bg-zinc-200 text-zinc-500'
                              }`}
                            >
                              <span className="text-xs font-black">{lvl.level}</span>
                              <span className="text-[8px] uppercase tracking-tighter opacity-80">Niv</span>
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-sm font-black uppercase text-black">
                                  {lvl.title}
                                </span>
                                {isCurrent && (
                                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-mono text-[9px] font-black uppercase tracking-wider">
                                    Votre Niveau Actuel
                                  </span>
                                )}
                                {isUnlocked && !isCurrent && (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[9px] font-bold">
                                    Atteint
                                  </span>
                                )}
                                {!isUnlocked && (
                                  <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 font-mono text-[9px] font-semibold flex items-center gap-1">
                                    <Lock className="w-2.5 h-2.5" /> Verrouillé
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-0.5 text-xs font-mono text-zinc-500">
                                <span>
                                  {lvl.minXp.toLocaleString('fr-FR')} à{' '}
                                  {lvl.maxXp >= 9999999 ? '∞' : lvl.maxXp.toLocaleString('fr-FR')} XP
                                </span>
                                <span>•</span>
                                <span className="text-zinc-600 font-bold">
                                  Ordre {lvl.orderRoman}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-left sm:text-right shrink-0">
                            <span className="text-[11px] font-mono text-zinc-600 font-bold">
                              Multiplicateur : x{(1 + (lvl.level - 1) * 0.005).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Liste des Avantages */}
                        <div className="mt-3 pt-2.5 border-t border-zinc-200 grid grid-cols-1 md:grid-cols-3 gap-2">
                          {lvl.perks.map((perk, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-[11px] font-mono text-zinc-700"
                            >
                              <CheckCircle2
                                className={`w-3.5 h-3.5 shrink-0 ${
                                  isUnlocked ? 'text-emerald-600' : 'text-zinc-400'
                                }`}
                              />
                              <span className="truncate">{perk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ================= 3. BADGES & TROPHÉES D'ATELIER (12 BADGES) ================= */}
        {activeTab === 'badges' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border-2 border-black p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div>
                  <h2 className="text-xl font-mono font-black uppercase text-black">
                    12 Trophées & Badges de Distinction
                  </h2>
                  <p className="text-xs text-zinc-600 font-normal mt-0.5">
                    Affichés publiquement à côté de votre pseudo sur le forum, le catalogue et vos fiches de dépannage pour certifier votre expertise.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-black text-white font-mono text-xs font-black uppercase tracking-wider">
                    {pilot?.unlockedBadges?.length || 1} / {ALL_PILOT_BADGES.length} Débloqués
                  </span>
                </div>
              </div>

              {/* Jauge de collection de badges */}
              <div className="mt-4 mb-6 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-zinc-600 font-bold uppercase">Progression Trophées Atelier</span>
                  <span className="text-black font-black">
                    {Math.round(((pilot?.unlockedBadges?.length || 1) / ALL_PILOT_BADGES.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(8, ((pilot?.unlockedBadges?.length || 1) / ALL_PILOT_BADGES.length) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Filtres de Badges */}
              <div className="flex items-center gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setBadgeFilter('all')}
                  className={`h-8 px-3 rounded-lg font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                    badgeFilter === 'all'
                      ? 'bg-black text-white'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                  }`}
                >
                  Tous ({ALL_PILOT_BADGES.length})
                </button>
                <button
                  type="button"
                  onClick={() => setBadgeFilter('unlocked')}
                  className={`h-8 px-3 rounded-lg font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                    badgeFilter === 'unlocked'
                      ? 'bg-black text-white'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                  }`}
                >
                  Débloqués ({pilot?.unlockedBadges?.length || 1})
                </button>
                <button
                  type="button"
                  onClick={() => setBadgeFilter('locked')}
                  className={`h-8 px-3 rounded-lg font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                    badgeFilter === 'locked'
                      ? 'bg-black text-white'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                  }`}
                >
                  À Débloquer ({ALL_PILOT_BADGES.length - (pilot?.unlockedBadges?.length || 1)})
                </button>
              </div>

              {/* Grille des 12 Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ALL_PILOT_BADGES.filter((badge) => {
                  const isUnlocked = pilot?.unlockedBadges?.some((b) => b.id === badge.id) || badge.id === 'first-fix';
                  if (badgeFilter === 'unlocked') return isUnlocked;
                  if (badgeFilter === 'locked') return !isUnlocked;
                  return true;
                }).map((badge) => {
                  const isUnlocked = pilot?.unlockedBadges?.some((b) => b.id === badge.id) || badge.id === 'first-fix';

                  return (
                    <div
                      key={badge.id}
                      className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        isUnlocked
                          ? 'border-black bg-white shadow-sm hover:shadow-md'
                          : 'border-zinc-200 bg-zinc-50/70 opacity-70'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border ${
                            isUnlocked ? 'bg-zinc-50 border-black' : 'bg-zinc-200/60 border-zinc-300'
                          }`}>
                            {badge.icon}
                          </div>
                          <div>
                            {isUnlocked ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Débloqué
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-600 font-mono text-[10px] font-bold">
                                <Lock className="w-3 h-3" /> Verrouillé
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                            {badge.category === 'resolution' && 'Résolution Atelier'}
                            {badge.category === 'expertise' && 'Expertise Technique'}
                            {badge.category === 'rare' && 'Rareté & Défi'}
                            {badge.category === 'community' && 'Communauté & Partage'}
                          </span>
                        </div>

                        <h3 className="font-mono font-black text-sm uppercase text-black mb-1.5">
                          {badge.name}
                        </h3>
                        <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                          {badge.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-200 text-[11px] font-mono">
                        {isUnlocked ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            ✓ Actif sur votre profil public
                          </span>
                        ) : (
                          <span className="text-zinc-500 flex items-center gap-1">
                            Obtention via atelier & diagnostic
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. CODES RÉDUCTIONS PARTENAIRES ================= */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border-2 border-black p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl font-mono font-black uppercase text-black">
                  Codes Promos & Récompenses Partenaires
                </h2>
                <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-mono text-[10px] font-bold">
                  Bons d achat réels
                </span>
              </div>
              <p className="text-xs text-zinc-600 font-normal mb-6">
                Chaque palier d atelier atteint débloque des pourcentages de réduction auprès des plus grands shops FPV partenaires (Drone-FPV-Racer, StudioSPORT, etc.).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PARTNER_REWARDS.map((rew) => {
                  const unlocked = (pilot?.level || 1) >= rew.minLevelRequired;
                  const isCopied = copiedCodeId === rew.id;

                  return (
                    <div
                      key={rew.id}
                      className={`p-5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                        unlocked
                          ? 'border-black bg-white shadow-sm'
                          : 'border-zinc-200 bg-zinc-50/70 opacity-60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-zinc-500 uppercase">
                            {rew.partnerName}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase ${
                              unlocked
                                ? 'bg-red-600 text-white'
                                : 'bg-zinc-200 text-zinc-600'
                            }`}
                          >
                            {rew.discountLabel}
                          </span>
                        </div>
                        <h3 className="font-mono font-black text-base text-black mb-1">
                          {rew.description}
                        </h3>
                        <p className="text-xs text-zinc-600">
                          Requis : Niveau {rew.minLevelRequired} (
                          {PILOT_LEVELS.find((l) => l.level === rew.minLevelRequired)?.title})
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-200">
                        {unlocked ? (
                          <div className="flex items-center justify-between gap-2">
                            <code className="px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-300 font-mono font-black text-sm text-black tracking-widest flex-1 text-center">
                              {rew.promoCode}
                            </code>
                            <button
                              type="button"
                              onClick={() => handleCopyCode(rew.id, rew.promoCode)}
                              className={`h-9 px-3 rounded-lg font-mono text-xs font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
                                isCopied
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-black text-white hover:bg-zinc-800'
                              }`}
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5" /> Copié
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" /> Copier
                                </>
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5 py-2 text-zinc-500 font-mono text-xs font-bold">
                            <Lock className="w-3.5 h-3.5" /> Verrouillé (Palier non atteint)
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. HISTORIQUE DES RAPPORTS D'ATELIER ================= */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border-2 border-black p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-mono font-black uppercase text-black">
                    Vos Rapports d Atelier & Pannes Résolues
                  </h2>
                  <p className="text-xs text-zinc-600 font-normal mt-0.5">
                    Chaque rapport enrichit la base de connaissances du forum et la mémoire du diagnostic IA.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setReportModalOpen(true)}
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-black text-white hover:bg-zinc-800 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-amber-400" />
                  <span>Rédiger un rapport (+150 XP)</span>
                </button>
              </div>

              {pilot?.historyReports && pilot.historyReports.length > 0 ? (
                <div className="space-y-4">
                  {pilot.historyReports.map((report) => (
                    <div
                      key={report.id}
                      className="p-5 rounded-xl border-2 border-zinc-200 hover:border-black bg-zinc-50 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-black text-white font-mono text-[10px] font-bold uppercase">
                            {report.componentName}
                          </span>
                          {report.modelExact && (
                            <span className="font-mono text-xs font-bold text-black">
                              {report.modelExact}
                            </span>
                          )}
                          {report.serialNumber && (
                            <span className="text-[10px] font-mono text-zinc-500 bg-white px-1.5 py-0.5 rounded border border-zinc-300">
                              S/N: {report.serialNumber}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                          <span>{report.createdAt}</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                            +{report.xpEarned} XP
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div>
                          <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase">
                            Cause exacte / Diagnostic :
                          </span>
                          <p className="text-xs text-zinc-800 mt-0.5 font-mono">
                            {report.exactRootCause}
                          </p>
                        </div>

                        {report.keyAdvice && (
                          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 font-mono">
                            <span className="font-bold">Astuce clé d atelier :</span> {report.keyAdvice}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-mono text-zinc-600">
                          <span>Difficulté : <strong className="text-black">{report.perceivedDifficulty}/10</strong></span>
                          <span>•</span>
                          <span>Temps : <strong className="text-black">{report.timeSpentMinutes} min</strong></span>
                          {report.replacedPart && (
                            <>
                              <span>•</span>
                              <span>Pièce : <strong className="text-black">{report.replacedPart}</strong></span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-zinc-200 rounded-xl">
                  <Wrench className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                  <h3 className="font-mono font-bold text-sm text-black uppercase">
                    Aucun rapport d atelier enregistré
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                    Vous avez réparé un moteur, débuggé un RX ou reflashé un ESC ? Partagez votre résolution pour gagner 150 XP et passer au niveau supérieur.
                  </p>
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(true)}
                    className="mt-4 inline-flex items-center gap-1.5 h-8 px-4 rounded-lg bg-black text-white hover:bg-zinc-800 font-mono text-xs font-bold uppercase cursor-pointer"
                  >
                    Rédiger mon premier rapport
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 5. SITES PARTENAIRES MUTUALISÉS ================= */}
        {activeTab === 'ecosystem' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border-2 border-black p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-black uppercase">
                  Single Sign-On (SSO)
                </span>
                <span className="text-xs font-mono text-zinc-500 font-bold uppercase">
                  Écosystème FPV France
                </span>
              </div>
              <h2 className="text-xl font-mono font-black uppercase text-black mb-2">
                Les 7 Sites Mutualisés du Réseau
              </h2>
              <p className="text-xs text-zinc-600 font-normal mb-6">
                Chaque site se spécialise dans une famille de composants pour offrir le catalogue le plus exhaustif au monde. Votre compte, vos niveaux, votre réputation et vos codes promos sont reconnus automatiquement sur l ensemble du réseau.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ECOSYSTEM_SITES.map((site) => (
                  <div
                    key={site.id}
                    className="p-5 rounded-xl border-2 border-zinc-200 hover:border-black bg-zinc-50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-base text-black">
                            {site.name}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            ({site.domain})
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                          {site.status}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-700 font-medium mb-3">
                        {site.role}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {site.components.map((comp, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-white border border-zinc-200 font-mono text-[10px] text-zinc-600"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">Mutualisation active (SSO)</span>
                      <a
                        href={getEcosystemPartnerUrl(site.domain, pilot)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-black font-bold flex items-center gap-1 transition-colors"
                        title={`Accéder à ${site.name} avec ma session SSO`}
                      >
                        <span>Accéder au site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Modale d'authentification */}
      <EcosystemAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(profile) => {
          setPilot(profile);
          setAuthModalOpen(false);
        }}
      />

      {/* Modale de rapport d'atelier */}
      <DetailedFixReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        componentName="Composant FPV"
        componentCategory="general"
        onReportSubmitted={handleNewReport}
      />
    </div>
  );
}
