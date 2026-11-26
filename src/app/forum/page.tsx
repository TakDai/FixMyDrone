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
  const [scannedPosts, setScannedPosts] = useState<CommunityPost[]>([]);
  const [visibleCount, setVisibleCount] = useState(40);
  const [showOriginalLang, setShowOriginalLang] = useState(false);
  
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

    // Charger la base massive de posts scannés
    fetch('/data/scanned-forum-posts.json', { cache: 'no-cache' })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setScannedPosts(data);
        }
      })
      .catch(() => {});

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

  const allPosts = useMemo(
    () => [...FORUM_POSTS, ...scannedPosts],
    [scannedPosts]
  );

  // Filtrage intelligent des posts
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      // 1. Recherche texte
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle =
          post.title.toLowerCase().includes(q) ||
          Boolean(post.titleOriginal?.toLowerCase().includes(q));
        const matchSummary =
          post.solutionSummary?.toLowerCase().includes(q) ||
          Boolean(post.solutionSummaryOriginal?.toLowerCase().includes(q));
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
          post.title.includes('[Scan') ||
          post.createdAt?.toLowerCase().includes('veille') ||
          post.tags?.some((t) => ['RCGroups', 'GitHub', 'IntoFPV', 'Veille', 'Reddit r/fpv', 'WEareFPV', 'Walksnail', 'EdgeTX', 'ExpressLRS', 'Betaflight', 'ArduPilot', 'PX4'].includes(t));
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
  }, [allPosts, searchQuery, selectedCategory, selectedRarity, selectedTab, helpfulVotes]);

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
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 xl:px-8 py-6 sm:py-8">
        {/* En-tête épuré */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[10px] font-bold uppercase">
                Communauté &amp; Veille FPV
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {allPosts.length} discussions indexées
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
              Forum FixMyDrone &amp; Actualités Drone
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-2xl">
              Cliquez sur n’importe quel sujet pour ouvrir la discussion complète, la check-list atelier et les avis pilotes.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setReportModalOpen(true)}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-black text-white hover:bg-zinc-800 font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>Nouveau post (+150 XP)</span>
            </button>
          </div>
        </div>

        {/* GRILLE PRINCIPALE : LISTE DES POSTS (GAUCHE) + ACTUALITÉS DRONE (DROITE) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLONNE GAUCHE : RECHERCHE + FIL DE SUJETS (1 CLIC) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            {/* Barre de Recherche et Filtres */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 space-y-3 shadow-2xs">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une panne, un moteur, un ESC (ex: ECO II, ELRS bind, desync)..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-zinc-200 focus:border-black focus:outline-none text-xs sm:text-sm text-black placeholder:text-zinc-400 transition-colors"
                />
              </div>

              {/* Onglets */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: `Tous (${allPosts.length})` },
                  { id: 'new', label: 'Récents' },
                  { id: 'popular', label: 'Populaires' },
                  { id: 'ai-resolved', label: 'Résolus IA' },
                  { id: 'daily-watch', label: 'Veille Web' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
                    className={`h-7 px-3 rounded-lg font-mono text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                      selectedTab === tab.id
                        ? 'bg-black text-white'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Filtres par Composant & Rareté */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-zinc-100">
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`h-6 px-2.5 rounded-md font-mono text-[10px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-zinc-900 text-white'
                          : 'bg-zinc-50 text-zinc-500 hover:text-black hover:bg-zinc-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowOriginalLang((v) => !v)}
                    className={`h-7 px-2.5 rounded-lg border font-mono text-[10px] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer ${
                      showOriginalLang
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-black'
                    }`}
                    title="Basculer entre la traduction française et le texte original"
                  >
                    <Globe className="w-3 h-3" />
                    <span>{showOriginalLang ? 'EN · Original' : 'FR · Traduit'}</span>
                  </button>

                  <select
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    className="h-7 px-2 rounded-lg bg-zinc-50 border border-zinc-200 font-mono text-[10px] font-semibold text-zinc-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Tous indices (1-10)</option>
                    <option value="rare">1-3 (Rare)</option>
                    <option value="medium">4-6 (Moyen)</option>
                    <option value="common">7-10 (Classique)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* LISTE DES POSTS (STYLE DISCOURSE, OUVERTURE EN 1 CLIC) */}
            {filteredPosts.length > 0 ? (
              <>
              <div className="bg-white rounded-2xl border border-zinc-200 divide-y divide-zinc-100 shadow-2xs overflow-hidden">
                {filteredPosts.slice(0, visibleCount).map((post) => {
                  const votes = (helpfulVotes[post.id] || 0) + (post.replies || 0);
                  const hasVoted = userVoted[post.id];
                  const rarity = post.rarityIndex || 5;
                  const postUrl = `/forum/post/?id=${encodeURIComponent(post.id)}`;
                  const displayTitle =
                    showOriginalLang && post.titleOriginal ? post.titleOriginal : post.title;
                  const displaySummary =
                    showOriginalLang && post.solutionSummaryOriginal
                      ? post.solutionSummaryOriginal
                      : post.solutionSummary;

                  return (
                    <div
                      key={post.id}
                      className="group p-4 sm:p-5 hover:bg-zinc-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      {/* Zone cliquable principale (1 clic vers la page complète du post) */}
                      <Link href={postUrl} className="min-w-0 flex-1 space-y-1.5 block">
                        <div className="flex flex-wrap items-center gap-2 text-[11px]">
                          {post.isResolved && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-[10px]">
                              <CheckCircle2 className="w-3 h-3" />
                              Résolu
                            </span>
                          )}
                          <span className="font-mono text-[10px] font-semibold text-zinc-500">
                            {post.categoryName || post.category}
                          </span>
                          {post.brand && (
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 font-semibold">
                              {post.brand} {post.model ? `· ${post.model}` : ''}
                            </span>
                          )}
                          {post.titleOriginal && (
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 opacity-70 group-hover:opacity-100 transition-opacity">
                              {showOriginalLang ? 'EN' : 'Traduit FR'}
                            </span>
                          )}
                          <span className="font-mono text-[10px] text-zinc-400 opacity-60 group-hover:opacity-100 transition-opacity">
                            Indice {rarity}/10
                          </span>
                        </div>

                        <h2 className="text-base font-bold text-zinc-900 group-hover:text-black leading-snug">
                          {displayTitle}
                        </h2>

                        {displaySummary && (
                          <p className="text-xs text-zinc-500 line-clamp-1">
                            {displaySummary}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-3 pt-0.5 text-[11px] text-zinc-400">
                          <span className="font-semibold text-zinc-600">
                            @{post.author?.callsign || post.author?.name || 'Pilote_FPV'}
                          </span>
                          <span>•</span>
                          <span>{post.createdAt}</span>
                          {post.tags && post.tags.length > 0 && (
                            <span className="hidden md:inline font-mono text-[10px] text-zinc-400 opacity-70 group-hover:opacity-100 transition-opacity">
                              {post.tags.slice(0, 3).map((t) => `#${t}`).join('  ')}
                            </span>
                          )}
                        </div>
                      </Link>

                      {/* Stats & actions rapides à droite */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                          <span className="inline-flex items-center gap-1" title="Réponses">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {post.replies || 0}
                          </span>
                          <span className="inline-flex items-center gap-1" title="Vues">
                            <Eye className="w-3.5 h-3.5" />
                            {post.views}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleHelpfulClick(post.id)}
                          disabled={hasVoted}
                          className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-lg font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                            hasVoted
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'text-zinc-500 hover:bg-zinc-100 hover:text-black opacity-60 group-hover:opacity-100'
                          }`}
                          title="Marquer utile (+10 XP)"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{votes}</span>
                        </button>

                        <Link
                          href={postUrl}
                          className="inline-flex items-center gap-1 h-8 px-3 rounded-lg bg-zinc-900 text-white text-xs font-semibold opacity-80 group-hover:opacity-100 transition-opacity"
                        >
                          <span>Ouvrir</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
              {filteredPosts.length > visibleCount && (
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((c) => c + 40)}
                    className="px-5 py-2.5 rounded-xl bg-white border border-zinc-200 hover:border-black text-xs font-mono font-bold text-black transition-colors cursor-pointer"
                  >
                    Afficher plus ({filteredPosts.length - visibleCount} restants)
                  </button>
                </div>
              )}
              </>
            ) : (
              <div className="text-center py-14 bg-white rounded-2xl border border-dashed border-zinc-300">
                <Search className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                <h3 className="font-bold text-sm text-black">
                  Aucun sujet ne correspond à vos filtres
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedRarity('all');
                    setSelectedTab('all');
                  }}
                  className="mt-3 inline-flex items-center gap-1.5 h-8 px-4 rounded-xl bg-black text-white font-mono text-xs font-bold cursor-pointer"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>

          {/* COLONNE DROITE : ACTUALITÉ DRONE & FPV + INFOS ÉCOSYSTÈME */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-5 lg:sticky lg:top-24">
            {/* Actualités Drone & FPV */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 sm:p-5 space-y-3.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-zinc-900 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>Actualités Drone &amp; FPV</span>
                </h2>
                <span className="text-[10px] font-mono text-zinc-400">Veille</span>
              </div>

              <div className="divide-y divide-zinc-100">
                {[
                  {
                    tag: 'Firmware',
                    title: 'Betaflight 4.5 / 4.6 : réglage EZ Tune & filtres RPM pour éviter la chauffe moteur',
                    desc: 'Pensez à activer le DShot bidirectionnel et limiter le D-Term si vos moteurs dépassent 65°C.',
                    href: '/forum/post/?id=mot-overheating',
                  },
                  {
                    tag: 'ESC',
                    title: 'Bluejay 0.21 (BLHeli_S) : 48kHz vs 24kHz et Demag Compensation',
                    desc: 'Sur les 5 pouces freestyle 2207/2306, passer le Demag sur High réduit fortement les desyncs.',
                    href: '/forum/post/?id=mot-desync',
                  },
                  {
                    tag: 'Radio / RX',
                    title: 'ExpressLRS 3.5 : bonnes pratiques de bind phrase & télémétrie',
                    desc: 'Vérifiez la correspondance de version majeure TX/RX avant toute mise à jour terrain.',
                    href: '/diagnostic/rx',
                  },
                  {
                    tag: 'Matériel',
                    title: 'Multi-Motors.fr : plus de 4 000 moteurs brushless FPV comparés',
                    desc: 'Consultez les fiches KV, poids, shaft et dimensions depuis l’onglet Specs ou le catalogue.',
                    href: '/specs/',
                  },
                  {
                    tag: 'Sécurité',
                    title: 'Réglementation AlphaTango & sécurité LiPo à l’atelier',
                    desc: 'Utilisez toujours un Smoke Stopper après soudure et retirez les hélices pour tout test Betaflight.',
                    href: '/catalogue',
                  },
                ].map((news, idx) => (
                  <Link
                    key={idx}
                    href={news.href}
                    className="group block py-3 first:pt-1 last:pb-1 space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 group-hover:bg-black group-hover:text-white transition-colors">
                        {news.tag}
                      </span>
                      <ArrowRight className="w-3 h-3 text-zinc-300 group-hover:text-black transition-colors" />
                    </div>
                    <div className="text-xs font-bold text-zinc-900 group-hover:text-black leading-snug">
                      {news.title}
                    </div>
                    <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                      {news.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Raccourcis rapides */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 space-y-2.5 shadow-2xs">
              <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-zinc-400">
                Repères communauté
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-50">
                  <div className="text-[10px] font-mono text-zinc-400">Résolus IA</div>
                  <div className="text-base font-black text-black">
                    {FORUM_POSTS.filter((p) => p.resolvedWithAI).length}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-50">
                  <div className="text-[10px] font-mono text-zinc-400">Écosystème</div>
                  <div className="text-base font-black text-black">7 sites</div>
                </div>
              </div>
              <Link
                href="/"
                className="w-full py-2.5 px-3 rounded-xl border border-zinc-200 hover:border-black text-xs font-bold text-black flex items-center justify-between transition-colors"
              >
                <span>Lancer un diagnostic interactif</span>
                <Wrench className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
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
