'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Clock,
  ThumbsUp,
  MessageSquare,
  Eye,
  Filter,
  Layers,
  ChevronDown,
  ChevronUp,
  Tag,
  Wrench,
  Radio,
  ExternalLink,
  PlusCircle,
  HelpCircle,
  Award,
  Globe,
  ArrowRight,
} from 'lucide-react';
import { EcosystemTopNav } from '@/components/EcosystemTopNav';
import { EcosystemAuthModal } from '@/components/EcosystemAuthModal';
import { DetailedFixReportModal } from '@/components/DetailedFixReportModal';
import { FORUM_POSTS } from '@/data/forumPosts';
import {
  PilotProfile,
  loadPilotProfile,
  savePilotProfile,
  DetailedFixReport,
  getLevelFromXp,
} from '@/data/pilotGamification';
import { CommunityPost } from '@/types';

export default function ForumDashboardPage() {
  const router = useRouter();
  const [pilot, setPilot] = useState<PilotProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTab, setSelectedTab] = useState<'all' | 'new' | 'popular' | 'ai-resolved' | 'daily-watch'>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [expandedPostIds, setExpandedPostIds] = useState<Record<string, boolean>>({});
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Sync profil pilote
  const refreshPilot = () => {
    const p = loadPilotProfile();
    setPilot(p);
  };

  useEffect(() => {
    refreshPilot();
    const handleSync = () => refreshPilot();
    window.addEventListener('storage', handleSync);
    window.addEventListener('fpv_ecosystem_account_updated', handleSync);

    // Initialiser les votes depuis le stockage local
    try {
      const storedVotes = localStorage.getItem('fpv_forum_helpful_votes');
      if (storedVotes) setHelpfulVotes(JSON.parse(storedVotes));
      const storedUserVoted = localStorage.getItem('fpv_forum_user_voted');
      if (storedUserVoted) setUserVoted(JSON.parse(storedUserVoted));
    } catch (e) {}

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('fpv_ecosystem_account_updated', handleSync);
    };
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedPostIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleHelpfulClick = (postId: string) => {
    if (userVoted[postId]) return;

    const newVotes = {
      ...helpfulVotes,
      [postId]: (helpfulVotes[postId] || 0) + 1,
    };
    const newUserVoted = {
      ...userVoted,
      [postId]: true,
    };

    setHelpfulVotes(newVotes);
    setUserVoted(newUserVoted);
    try {
      localStorage.setItem('fpv_forum_helpful_votes', JSON.stringify(newVotes));
      localStorage.setItem('fpv_forum_user_voted', JSON.stringify(newUserVoted));
    } catch (e) {}

    // Récompense XP au pilote connecté (+10 XP)
    if (pilot) {
      const newXp = pilot.xp + 10;
      const lvl = getLevelFromXp(newXp);
      const updated: PilotProfile = {
        ...pilot,
        xp: newXp,
        level: lvl.level,
        levelTitle: lvl.title,
        communityHelpfulVotes: (pilot.communityHelpfulVotes || 0) + 1,
      };
      savePilotProfile(updated);
      setPilot(updated);
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

  // Filtrage intelligent des posts
  const filteredPosts = useMemo(() => {
    return FORUM_POSTS.filter((post) => {
      // 1. Recherche texte
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchSummary = post.solutionSummary?.toLowerCase().includes(q);
        const matchBrand = post.brand?.toLowerCase().includes(q);
        const matchModel = post.model?.toLowerCase().includes(q);
        const matchTags = post.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchSummary && !matchBrand && !matchModel && !matchTags) {
          return false;
        }
      }

      // 2. Filtre Catégorie
      if (selectedCategory !== 'all') {
        const cat = post.category?.toLowerCase() || '';
        if (selectedCategory === 'motors' && !['motors', 'motor'].includes(cat)) return false;
        if (selectedCategory === 'fc' && cat !== 'fc') return false;
        if (selectedCategory === 'esc' && cat !== 'esc') return false;
        if (selectedCategory === 'rx' && !['rx', 'antenna-rx'].includes(cat)) return false;
        if (selectedCategory === 'radio' && !['radio', 'tango', 'tx'].includes(cat)) return false;
        if (selectedCategory === 'goggle' && !['goggle', 'goggles', 'lunettes'].includes(cat)) return false;
        if (selectedCategory === 'configurator' && !['configurator', 'betaflight', 'config'].includes(cat)) return false;
        if (selectedCategory === 'vtx' && !['vtx', 'antenna-vtx'].includes(cat)) return false;
        if (selectedCategory === 'cam' && !['cam', 'camera'].includes(cat)) return false;
        if (selectedCategory === 'lipo' && !['lipo', 'battery', 'power'].includes(cat)) return false;
        if (selectedCategory === 'frame' && !['frame', 'chassis', 'props'].includes(cat)) return false;
        if (selectedCategory === 'gps' && !['gps', 'vifly', 'compass'].includes(cat)) return false;
      }

      // 3. Filtre Indice de rareté
      if (selectedRarity !== 'all') {
        const r = post.rarityIndex || 5;
        if (selectedRarity === 'rare' && (r < 1 || r > 3)) return false;
        if (selectedRarity === 'medium' && (r < 4 || r > 6)) return false;
        if (selectedRarity === 'common' && (r < 7 || r > 10)) return false;
      }

      // 4. Filtre Onglet Dashboard
      if (selectedTab === 'ai-resolved' && !post.resolvedWithAI) return false;
      if (selectedTab === 'daily-watch') {
        const isWatch = post.title.includes('[VEILLE') || 
          post.createdAt?.toLowerCase().includes('veille') ||
          post.tags?.some((t) => ['RCGroups', 'GitHub', 'IntoFPV', 'Veille', 'Reddit r/fpv', 'WEareFPV', 'Walksnail', 'EdgeTX', 'ExpressLRS'].includes(t));
        if (!isWatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedTab === 'popular') {
        const votesA = (helpfulVotes[a.id] || 0) + (a.replies || 0) * 2;
        const votesB = (helpfulVotes[b.id] || 0) + (b.replies || 0) * 2;
        return votesB - votesA;
      }
      if (selectedTab === 'new' || selectedTab === 'daily-watch') {
        return (b.id || '').localeCompare(a.id || '');
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedRarity, selectedTab, helpfulVotes]);

  const categoriesList = [
    { id: 'all', label: 'Tous composants' },
    { id: 'motors', label: 'Moteurs Brushless' },
    { id: 'fc', label: 'Contrôleur (FC)' },
    { id: 'esc', label: 'ESC & Stack' },
    { id: 'vtx', label: 'Émetteur (VTX)' },
    { id: 'cam', label: 'Caméra FPV' },
    { id: 'rx', label: 'Récepteur (RX)' },
    { id: 'radio', label: 'Radios & TX' },
    { id: 'goggle', label: 'Lunettes & Masques' },
    { id: 'configurator', label: 'Configurateurs (BF/EdgeTX)' },
    { id: 'gps', label: 'GPS & Compas' },
    { id: 'lipo', label: 'LiPo & Alimentation' },
    { id: 'frame', label: 'Châssis (Frame)' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-black flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Barre de navigation style Multi-Motors */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b-2 border-black z-30">
        <EcosystemTopNav activeTab="news" />
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* En-tête Dashboard & Veille */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-zinc-200">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded-[6px] bg-red-600 text-white font-mono text-[10px] font-black uppercase tracking-wider">
                  Base Communautaire
                </span>
                <span className="text-xs font-mono text-zinc-500 font-semibold uppercase">
                  Alimentée par l IA & la Veille Quotidienne
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-mono font-black uppercase tracking-tight text-black">
                Dashboard Forum & Résolutions FPV
              </h1>
              <p className="text-sm text-zinc-600 mt-1 max-w-2xl font-normal">
                Chaque panne est identifiée avec son indice de rareté (1 à 10) et sa solution validée. Posez votre question ou utilisez notre guide IA pour cibler directement la cause racine.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setReportModalOpen(true)}
                className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-black text-white hover:bg-zinc-800 font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-amber-400" />
                <span>Signaler une Panne (+150 XP)</span>
              </button>
            </div>
          </div>

          {/* 4 Compteurs Clés du Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="p-3.5 rounded-xl bg-white border-2 border-zinc-200 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                Résolutions IA Validées
              </span>
              <div className="text-xl font-mono font-black text-black mt-0.5 flex items-center gap-1.5">
                <span>{FORUM_POSTS.filter((p) => p.resolvedWithAI).length}</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-[9px] font-mono text-zinc-400">Évaluation communautaire active</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border-2 border-zinc-200 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                Veille Multi-Sources
              </span>
              <div className="text-xl font-mono font-black text-black mt-0.5 flex items-center gap-1.5">
                <span>Quotidienne</span>
                <Globe className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-[9px] font-mono text-zinc-400">GitHub, RCGroups, IntoFPV</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border-2 border-zinc-200 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                Indices de Rareté
              </span>
              <div className="text-xl font-mono font-black text-black mt-0.5">
                1 à 10
              </div>
              <span className="text-[9px] font-mono text-zinc-400">1 = Rarissime • 10 = Classique</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border-2 border-zinc-200 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                Écosystème Partenaire
              </span>
              <div className="text-xl font-mono font-black text-black mt-0.5">
                7 Sites
              </div>
              <span className="text-[9px] font-mono text-zinc-400">Comptes mutualisés (SSO)</span>
            </div>
          </div>
        </div>

        {/* Barre de Recherche et Filtres */}
        <div className="bg-white rounded-2xl border-2 border-black p-4 sm:p-5 mb-6 shadow-sm">
          {/* Barre de recherche */}
          <div className="relative w-full mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une panne, un composant, une marque (ex: EMAX ECO II, ELRS bind, DSHOT desync)..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border-2 border-zinc-200 focus:border-black focus:outline-none font-mono text-xs text-black placeholder:text-zinc-400 transition-colors"
            />
          </div>

          {/* Onglets Dashboard Style Multi-Motors */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-200">
            <button
              onClick={() => setSelectedTab('all')}
              className={`h-8 px-3 rounded-[10px] font-mono text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedTab === 'all'
                  ? 'bg-black text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Tous les sujets ({FORUM_POSTS.length})
            </button>
            <button
              onClick={() => setSelectedTab('new')}
              className={`h-8 px-3 rounded-[10px] font-mono text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedTab === 'new'
                  ? 'bg-black text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Nouveaux posts
            </button>
            <button
              onClick={() => setSelectedTab('popular')}
              className={`h-8 px-3 rounded-[10px] font-mono text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedTab === 'popular'
                  ? 'bg-black text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Populaires & Recommandés
            </button>
            <button
              onClick={() => setSelectedTab('ai-resolved')}
              className={`h-8 px-3 rounded-[10px] font-mono text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedTab === 'ai-resolved'
                  ? 'bg-black text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Résolus avec IA (1-10)
            </button>
            <button
              onClick={() => setSelectedTab('daily-watch')}
              className={`h-8 px-3 rounded-[10px] font-mono text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedTab === 'daily-watch'
                  ? 'bg-black text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Veille Quotidienne Web
            </button>
          </div>

          {/* Filtres par Composant & Rareté */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 pt-1">
            {/* Pilules Composants */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`h-7 px-2.5 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:text-black hover:bg-zinc-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sélecteur Rareté */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                Rareté :
              </span>
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="h-7 px-2 rounded-lg bg-zinc-100 border border-zinc-200 font-mono text-[10px] font-bold text-black focus:outline-none cursor-pointer"
              >
                <option value="all">Tous indices (1-10)</option>
                <option value="rare">1-3 (Panne très rare)</option>
                <option value="medium">4-6 (Panne intermédiaire)</option>
                <option value="common">7-10 (Panne classique)</option>
              </select>
            </div>
          </div>
        </div>

        {/* LISTE DES POSTS DU FORUM */}
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const isExpanded = expandedPostIds[post.id];
              const votes = (helpfulVotes[post.id] || 0) + (post.replies || 0);
              const hasVoted = userVoted[post.id];
              const rarity = post.rarityIndex || 5;

              // Style visuel selon la rareté
              const isVeryRare = rarity <= 3;
              const isClassic = rarity >= 7;

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border-2 border-black p-5 shadow-sm hover:shadow-md transition-all"
                >
                  {/* Bandeau d'en-tête du post */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-200">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Indice de Rareté */}
                      <span
                        className={`px-2 py-0.5 rounded-[6px] font-mono text-[10px] font-black uppercase tracking-wider ${
                          isVeryRare
                            ? 'bg-amber-500 text-black'
                            : isClassic
                            ? 'bg-zinc-800 text-white'
                            : 'bg-zinc-200 text-zinc-800'
                        }`}
                      >
                        Indice {rarity}/10 • {post.rarityLabel || (isVeryRare ? 'Panne Rare' : 'Panne Courante')}
                      </span>

                      {/* Tag Résolu avec IA */}
                      {post.resolvedWithAI && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[6px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono text-[10px] font-black uppercase">
                          <Sparkles className="w-3 h-3 text-emerald-600" /> Résolu avec IA
                        </span>
                      )}

                      {/* Tag Composant & Redirection Diagnostic */}
                      <Link
                        href={`/diagnostic/${post.category === 'motor' ? 'motors' : post.category}`}
                        className="px-2 py-0.5 rounded-[6px] bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-mono text-[10px] font-bold uppercase transition-colors"
                      >
                        {post.categoryName || post.category}
                      </Link>
                    </div>

                    {/* Date et Source */}
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <span>{post.createdAt}</span>
                    </div>
                  </div>

                  {/* Titre & Modèle Exact */}
                  <div className="mt-3">
                    <div className="flex items-baseline gap-2 mb-1">
                      {post.brand && post.model && (
                        <span className="text-xs font-mono font-black text-red-600 uppercase">
                          [{post.brand} {post.model}]
                        </span>
                      )}
                      <h2 className="text-base sm:text-lg font-mono font-black text-black leading-snug">
                        {post.title}
                      </h2>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {post.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 font-mono text-[9.5px]"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Solution Validée avec l'IA */}
                  {post.solutionSummary && (
                    <div className="mt-4 p-4 rounded-xl bg-zinc-50 border-2 border-dashed border-zinc-300">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-black uppercase text-black flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Diagnostic & Solution d Atelier Recommandée
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleExpand(post.id)}
                          className="text-[10px] font-mono text-zinc-500 hover:text-black font-bold uppercase flex items-center gap-1 cursor-pointer"
                        >
                          {isExpanded ? (
                            <>
                              Masquer <ChevronUp className="w-3 h-3" />
                            </>
                          ) : (
                            <>
                              Détails complets <ChevronDown className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      </div>

                      <p className={`text-xs font-mono text-zinc-800 leading-relaxed ${
                        isExpanded ? '' : 'line-clamp-2'
                      }`}>
                        {post.solutionSummary}
                      </p>

                      {/* Si déplié : actions d'atelier suggérées */}
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-2">
                          <div className="text-[10px] font-mono text-zinc-500">
                            Source : {post.tags?.find((t) => ['RCGroups', 'GitHub', 'IntoFPV'].includes(t)) || 'Atelier FixMyDrone'}
                          </div>
                          <Link
                            href={`/diagnostic/${post.category === 'motor' ? 'motors' : post.category}`}
                            className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-red-600 hover:underline"
                          >
                            Lancer le diagnostic guidé pour ce composant <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Pied de Carte : Auteur, Votes & Interaction */}
                  <div className="mt-4 pt-3 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
                    {/* Auteur */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-mono font-black text-[10px]">
                        {post.author?.callsign ? post.author.callsign.charAt(0) : 'P'}
                      </div>
                      <span className="font-mono text-xs font-bold text-black">
                        {post.author?.callsign || post.author?.name || 'Pilote FPV'}
                      </span>
                      {post.author?.badge && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-mono text-[9px] font-bold">
                          {post.author.badge}
                        </span>
                      )}
                    </div>

                    {/* Boutons d'interaction */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleHelpfulClick(post.id)}
                        disabled={hasVoted}
                        className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-lg font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                          hasVoted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black border border-zinc-300'
                        }`}
                        title="Voter pour cette solution (+10 XP pour vous)"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{votes}</span>
                        <span className="hidden sm:inline">
                          {hasVoted ? 'Solution validée !' : 'Utile (+10 XP)'}
                        </span>
                      </button>

                      <Link
                        href={`/diagnostic/${post.category === 'motor' ? 'motors' : post.category}`}
                        className="inline-flex items-center gap-1 h-8 px-3 rounded-lg bg-black text-white hover:bg-zinc-800 font-mono text-xs font-bold uppercase transition-colors"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Diagnostiquer</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-zinc-300">
              <Search className="w-10 h-10 text-zinc-400 mx-auto mb-2" />
              <h3 className="font-mono font-black text-base text-black uppercase">
                Aucun sujet ne correspond à vos filtres
              </h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto font-mono">
                Essayez d élargir vos critères de recherche ou réinitialisez les filtres par composant.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedRarity('all');
                  setSelectedTab('all');
                }}
                className="mt-4 inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-black text-white font-mono text-xs font-bold uppercase cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

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
