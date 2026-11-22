'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Cpu,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Barcode,
  HelpCircle,
  Hash,
  Send,
  RotateCcw,
  X,
  Filter,
  Flame,
  Zap,
  Tag,
  Clock,
  Layers,
  ChevronDown,
  Info,
  Check,
  ThumbsUp,
  BarChart3
} from 'lucide-react';
import { getDiagnosticDefinition } from '@/data/diagnosticKnowledgeBase';
import { getSisterSiteForComponent } from '@/data/ecosystem';
import { MULTI_MOTORS_FPV_BRANDS } from '@/data/multiMotorsFpvBrands';
import { MULTI_MOTORS_CATALOGUE, MOTOR_GAMMES_BY_BRAND, MultiMotorsItem } from '@/data/multiMotorsCatalogueList';
import { getGeneralGuidesForComponent, ComponentGeneralGuide, ModelGuideExample } from '@/data/componentGenericsGuides';
import { getComponentReliabilityStats, ComponentReliabilityData } from '@/data/componentReliabilityStats';
import { FORUM_POSTS } from '@/data/forumPosts';
import { CommunityPost } from '@/types';

interface DiagnosticWorkflowProps {
  componentId: string;
}

export function DiagnosticWorkflow({ componentId }: DiagnosticWorkflowProps) {
  const def = useMemo(() => getDiagnosticDefinition(componentId), [componentId]);
  const sisterSite = useMemo(() => getSisterSiteForComponent(componentId), [componentId]);
  const isMotor = componentId === 'motors' || componentId === 'motor';

  // État de la POP-UP GUIDE
  const [guideModalOpen, setGuideModalOpen] = useState(true);
  const [guideStep, setGuideStep] = useState<1 | 2 | 3 | 4>(1);

  // Étape 1 : Renseignement utilisateur (Marque, Gamme, Modèle recherché)
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedGamme, setSelectedGamme] = useState<string>('');
  const [inputModelQuery, setInputModelQuery] = useState<string>('');
  const [brandSearch, setBrandSearch] = useState('');

  // Étape 2 : Moteur exact sélectionné tiré de Multi-Motors
  const [selectedMotor, setSelectedMotor] = useState<MultiMotorsItem | null>(null);
  const [customModelFallback, setCustomModelFallback] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<string>('');

  // Étape 3 : Questions courtes sur le problème & circonstances
  const [selectedCircumstance, setSelectedCircumstance] = useState<string>('');
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>('');
  const [checkedObservations, setCheckedObservations] = useState<Record<string, boolean>>({});
  const [userNotes, setUserNotes] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Filtres du forum sous-jacent
  const [forumSearchQuery, setForumSearchQuery] = useState('');
  const [rarityFilter, setRarityFilter] = useState<'all' | 'rare' | 'moderate' | 'frequent'>('all');
  const [forumTab, setForumTab] = useState<'all' | 'ai-resolved' | 'unresolved' | 'guides'>('all');

  // Guides généraux et procédures spécifiques par modèle (ex: Binding RX avec indice 1 à 10)
  const generalGuides = useMemo(() => getGeneralGuidesForComponent(componentId), [componentId]);
  const [activeGuideModelId, setActiveGuideModelId] = useState<string>('');

  // Modale nouveau sujet forum
  const [newTopicModalOpen, setNewTopicModalOpen] = useState(false);
  const [newTopicPublished, setNewTopicPublished] = useState(false);

  // Évaluation de la résolution par l'utilisateur & suivi d'efficacité
  const [resolutionVote, setResolutionVote] = useState<'resolved' | 'partial' | 'unresolved' | null>(null);
  const [resolutionComment, setResolutionComment] = useState('');
  const [resolutionCommentSent, setResolutionCommentSent] = useState(false);
  const [postHelpfulVotes, setPostHelpfulVotes] = useState<Record<string, number>>({});
  const [userVotedPosts, setUserVotedPosts] = useState<Record<string, boolean>>({});

  // Statistiques de fiabilité et fréquence de panne par référence
  const reliabilityStats = useMemo(() => {
    return getComponentReliabilityStats(
      componentId,
      selectedMotor?.fullName || customModelFallback || selectedGamme,
      selectedBrand,
      serialNumber
    );
  }, [componentId, selectedMotor, customModelFallback, selectedGamme, selectedBrand, serialNumber]);

  const handleVoteResolution = (type: 'resolved' | 'partial' | 'unresolved') => {
    setResolutionVote(type);
    if (typeof window !== 'undefined') {
      try {
        const key = `fmd_eval_${componentId}_${selectedMotor?.id || 'gen'}`;
        localStorage.setItem(key, JSON.stringify({ type, timestamp: Date.now() }));
      } catch (e) {
        // ignore
      }
    }
  };

  const handleToggleHelpfulPost = (postId: string) => {
    setUserVotedPosts((prev) => {
      const isAlreadyVoted = prev[postId];
      const nextVoted = !isAlreadyVoted;
      setPostHelpfulVotes((vPrev) => ({
        ...vPrev,
        [postId]: (vPrev[postId] || 0) + (nextVoted ? 1 : -1),
      }));
      return { ...prev, [postId]: nextVoted };
    });
  };

  // Gammes disponibles pour la marque sélectionnée (issues de Multi-Motors)
  const availableGammes = useMemo(() => {
    if (!selectedBrand) return [];
    return MOTOR_GAMMES_BY_BRAND[selectedBrand] || ['Standard', 'Pro Series'];
  }, [selectedBrand]);

  // Filtrage des marques
  const filteredBrands = useMemo(() => {
    if (isMotor) {
      const all = Object.values(MULTI_MOTORS_FPV_BRANDS);
      if (!brandSearch) return all;
      return all.filter((b) =>
        b.name.toLowerCase().includes(brandSearch.toLowerCase())
      );
    }
    if (!brandSearch) return def.brands;
    return def.brands.filter((b) =>
      b.name.toLowerCase().includes(brandSearch.toLowerCase())
    );
  }, [isMotor, def.brands, brandSearch]);

  // Moteurs proposés tirés du catalogue Multi-Motors selon Marque, Gamme et Modèle
  const proposedMotorsFromMultiMotors = useMemo(() => {
    if (!isMotor || !selectedBrand) return [];

    let list = MULTI_MOTORS_CATALOGUE.filter(
      (m) => m.brand.toLowerCase() === selectedBrand.toLowerCase()
    );

    if (selectedGamme && selectedGamme !== 'Toutes') {
      list = list.filter(
        (m) => m.gamme.toLowerCase() === selectedGamme.toLowerCase()
      );
    }

    if (inputModelQuery) {
      const q = inputModelQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.model.toLowerCase().includes(q) ||
          m.fullName.toLowerCase().includes(q) ||
          m.classe.toLowerCase().includes(q) ||
          m.ref.toLowerCase().includes(q) ||
          m.kv.includes(q)
      );
    }

    return list.slice(0, 30); // Limite à 30 résultats ultra-pertinents
  }, [isMotor, selectedBrand, selectedGamme, inputModelQuery]);

  // Symptôme actif
  const currentSymptom = useMemo(() => {
    return def.symptoms.find((s) => s.id === selectedSymptomId) || def.symptoms[0];
  }, [def.symptoms, selectedSymptomId]);

  // Indice de rareté (1 à 10)
  const currentRarityIndex = currentSymptom?.rarityIndex || 8;
  const currentRarityLabel = currentSymptom?.rarityLabel || `${currentRarityIndex}/10`;

  // Recherche des posts forum existants sur ce moteur ou ce composant
  const filteredForumPosts = useMemo(() => {
    const motorName = selectedMotor ? selectedMotor.model : customModelFallback;
    return FORUM_POSTS.filter((post) => {
      // Filtre catégorie
      const matchCat =
        post.category === componentId ||
        (isMotor && (post.category === 'motors' || post.category === 'esc-stack'));

      // Filtre marque
      const matchBrand =
        !selectedBrand ||
        Boolean(post.brand && post.brand.toLowerCase() === selectedBrand.toLowerCase()) ||
        post.title.toLowerCase().includes(selectedBrand.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase() === selectedBrand.toLowerCase());

      // Filtre modèle / moteur exact
      let matchModel = true;
      if (motorName) {
        const mn = motorName.toLowerCase();
        matchModel = Boolean(
          (post.model && post.model.toLowerCase().includes(mn)) ||
          post.title.toLowerCase().includes(mn) ||
          (post.productName && post.productName.toLowerCase().includes(mn))
        );
      }

      // Filtre texte forum
      let matchSearch = true;
      if (forumSearchQuery) {
        const sq = forumSearchQuery.toLowerCase();
        matchSearch =
          post.title.toLowerCase().includes(sq) ||
          Boolean(post.solutionSummary && post.solutionSummary.toLowerCase().includes(sq)) ||
          post.tags.some((t) => t.toLowerCase().includes(sq));
      }

      // Filtre onglet
      let matchTab = true;
      if (forumTab === 'ai-resolved') matchTab = Boolean(post.resolvedWithAI);
      if (forumTab === 'unresolved') matchTab = !post.isResolved;

      // Filtre de rareté (1-10)
      let matchRarity = true;
      const rIndex = post.rarityIndex || 8;
      if (rarityFilter === 'rare') matchRarity = rIndex <= 3;
      if (rarityFilter === 'moderate') matchRarity = rIndex >= 4 && rIndex <= 7;
      if (rarityFilter === 'frequent') matchRarity = rIndex >= 8;

      return matchCat && matchBrand && matchModel && matchSearch && matchTab && matchRarity;
    });
  }, [componentId, isMotor, selectedBrand, selectedMotor, customModelFallback, forumSearchQuery, forumTab, rarityFilter]);

  // Posts forum existants spécifiquement sur le moteur sélectionné
  const exactMotorForumPosts = useMemo(() => {
    if (!selectedMotor && !customModelFallback) return [];
    const query = (selectedMotor?.model || customModelFallback).toLowerCase();
    return FORUM_POSTS.filter((p) => {
      const full = `${p.title} ${p.productName || ''} ${p.model || ''} ${p.tags.join(' ')}`.toLowerCase();
      return full.includes(query);
    });
  }, [selectedMotor, customModelFallback]);

  // Déclenchement de l'IA
  const handleTriggerAI = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setGuideStep(4);
    }, 600);
  };

  // Passer le guide
  const handleSkipGuide = () => {
    setGuideModalOpen(false);
  };

  // Réinitialiser le guide
  const handleResetGuide = () => {
    setGuideStep(1);
    setSelectedBrand('');
    setSelectedGamme('');
    setInputModelQuery('');
    setSelectedMotor(null);
    setCustomModelFallback('');
    setSerialNumber('');
    setSelectedCircumstance('');
    setSelectedSymptomId('');
    setCheckedObservations({});
    setUserNotes('');
  };

  // Rendu de la jauge de rareté
  const renderRarityBadge = (index: number, label?: string) => {
    const isUltraRare = index <= 2;
    const isRare = index >= 3 && index <= 4;
    const isModerate = index >= 5 && index <= 7;

    let colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    let dotColor = 'bg-emerald-500';

    if (isUltraRare) {
      colorClasses = 'bg-purple-50 text-purple-900 border-purple-300';
      dotColor = 'bg-purple-600';
    } else if (isRare) {
      colorClasses = 'bg-amber-50 text-amber-900 border-amber-300';
      dotColor = 'bg-amber-600';
    } else if (isModerate) {
      colorClasses = 'bg-blue-50 text-blue-900 border-blue-300';
      dotColor = 'bg-blue-600';
    }

    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${colorClasses}`}>
        <span className={`w-2 h-2 rounded-full ${dotColor}`} />
        <span>Indice {index}/10</span>
        {label && <span className="opacity-75 font-normal">({label})</span>}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col">
      {/* 1. HEADER CAD & BREADCRUMB */}
      <header className="w-full border-b border-black/10 bg-white sticky top-0 z-30 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-150"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Drone Interactif</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500 font-medium">
              <span>FixMyDrone.fr</span>
              <span>/</span>
              <span className="text-black font-bold uppercase tracking-wider">{def.componentName}</span>
              <span>/</span>
              <span className="text-neutral-700">Forum & Diagnostic</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setGuideModalOpen(true)}
              className="flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full border-2 border-black bg-black text-white hover:bg-neutral-800 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Ouvrir l Assistant Diagnostic</span>
            </button>

            {sisterSite && (
              <a
                href={sisterSite.domain}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border border-black/20 bg-neutral-50 hover:border-black text-neutral-800 transition-all"
                title={`Catalogue géré par ${sisterSite.name}`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-[11px] text-neutral-500">BASE :</span>
                <span>{sisterSite.name}</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* 2. BANNIÈRE DU HUB */}
      <div className="w-full border-b border-neutral-200 bg-neutral-50/80 py-6 sm:py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white border border-black/15 rounded-2xl p-2 flex items-center justify-center shadow-xs shrink-0">
                <img
                  src={def.defaultImage}
                  alt={def.componentName}
                  className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-black text-white">
                    FORUM COMMUNAUTAIRE & IA
                  </span>
                  {isMotor ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-amber-500/10 text-amber-900 border border-amber-500/30">
                      CATALOGUE MULTI-MOTORS (13 824 RÉF)
                    </span>
                  ) : sisterSite ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-blue-500/10 text-blue-900 border border-blue-500/30">
                      RÉFÉRENCES {sisterSite.name.toUpperCase()}
                    </span>
                  ) : null}
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-purple-500/10 text-purple-900 border border-purple-500/30">
                    INDICE DE RARETÉ 1 À 10
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900">
                  Dépannage & Solutions : {def.frenchTitle}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                  {isMotor
                    ? "Recherchez votre moteur par marque, gamme et modèle tirés de Multi-Motors, puis laissez l IA et la communauté identifier la panne avec indice de rareté de 1 à 10."
                    : `Consultez les procédures & guides techniques par modèle (ex: appairage BindMyQuad), ou laissez l IA et le forum diagnostiquer votre panne.`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-start md:self-auto">
              <button
                onClick={() => setGuideModalOpen(true)}
                className="px-4 py-2.5 rounded-xl border border-black bg-white hover:bg-neutral-50 text-black text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Guide pas-à-pas</span>
              </button>
              <button
                onClick={() => setNewTopicModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Nouveau sujet</span>
              </button>
            </div>
          </div>

          {/* BARRE DE FILTRES ACTIFS */}
          <div className="mt-5 pt-4 border-t border-neutral-200/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-500 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5 text-neutral-400" />
              <span>Filtres actifs :</span>
            </span>

            {/* Pill Composant */}
            <span className="px-2.5 py-1 rounded-lg bg-black text-white font-bold text-[11px]">
              {def.componentName}
            </span>

            {/* Pill Marque */}
            {selectedBrand && (
              <span className="px-2.5 py-1 rounded-lg bg-white border border-black text-black font-bold text-[11px] flex items-center gap-1.5 shadow-2xs">
                <span>Marque : {selectedBrand}</span>
                <button
                  onClick={() => {
                    setSelectedBrand('');
                    setSelectedGamme('');
                    setSelectedMotor(null);
                  }}
                  className="hover:text-red-600 font-black ml-0.5"
                >
                  ✕
                </button>
              </span>
            )}

            {/* Pill Gamme */}
            {selectedGamme && (
              <span className="px-2.5 py-1 rounded-lg bg-white border border-neutral-400 text-neutral-900 font-bold text-[11px] flex items-center gap-1.5 shadow-2xs">
                <span>Gamme : {selectedGamme}</span>
                <button
                  onClick={() => {
                    setSelectedGamme('');
                    setSelectedMotor(null);
                  }}
                  className="hover:text-red-600 font-black ml-0.5"
                >
                  ✕
                </button>
              </span>
            )}

            {/* Pill Moteur Multi-Motors exact */}
            {selectedMotor && (
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-950 font-bold text-[11px] flex items-center gap-1.5 shadow-2xs">
                <span>Moteur : {selectedMotor.model} ({selectedMotor.classe} {selectedMotor.kv ? `${selectedMotor.kv}KV` : ''})</span>
                <button
                  onClick={() => setSelectedMotor(null)}
                  className="hover:text-red-600 font-black ml-0.5"
                >
                  ✕
                </button>
              </span>
            )}

            {/* Bouton pour réinitialiser */}
            {(selectedBrand || selectedGamme || selectedMotor || serialNumber) && (
              <button
                onClick={handleResetGuide}
                className="text-neutral-500 hover:text-black underline text-[11px] ml-2"
              >
                Tout effacer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. FLUX DU FORUM SOUS-JACENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-6">
        {/* BANDEAU PRÉ-DIAGNOSTIC IA SI MOTEUR SÉLECTIONNÉ */}
        {selectedMotor && currentSymptom && (
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-black bg-neutral-50/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-black uppercase tracking-wider">
                  PRÉ-DIAGNOSTIC SUR CE MOTEUR
                </span>
                {renderRarityBadge(currentRarityIndex, currentRarityLabel)}
                <span className="text-xs font-bold text-neutral-900">
                  {selectedMotor.fullName} (Réf : {selectedMotor.ref})
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-800 text-[10px] font-bold border border-emerald-500/30">
                  {reliabilityStats.resolutionSuccessRate}% de succès ({reliabilityStats.verifiedResolutionsCount} résolus)
                </span>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed max-w-3xl">
                <span className="font-bold text-black">Cause identifiée :</span> {currentSymptom.aiDiagnostic.rootCause} ({currentSymptom.aiDiagnostic.probability}% de certitude).
              </p>
            </div>

            <button
              onClick={() => {
                setGuideStep(4);
                setGuideModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-all flex items-center gap-2 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Voir le protocole & évaluer</span>
            </button>
          </div>
        )}

        {/* BARRE D'OUTILS ET ONGLETS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'Toutes les discussions' },
              { id: 'ai-resolved', label: 'Résolus avec IA (1 à 10)' },
              { id: 'unresolved', label: 'En attente de solution' },
              ...(generalGuides.length > 0
                ? [
                    {
                      id: 'guides',
                      label:
                        componentId === 'rx'
                          ? '📖 Comment Binder son RX (Exemples par modèle)'
                          : '📖 Guides & Généralités Techniques',
                    },
                  ]
                : []),
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setForumTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  forumTab === tab.id
                    ? 'bg-black text-white shadow-2xs'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            {forumTab !== 'guides' && (
              <div className="flex items-center gap-1.5 text-xs bg-neutral-100 p-1 rounded-xl">
                <span className="text-neutral-500 font-bold px-2 text-[11px]">Rareté :</span>
                {[
                  { id: 'all', label: 'Toutes' },
                  { id: 'rare', label: 'Rares (1-3)' },
                  { id: 'moderate', label: 'Moyennes (4-7)' },
                  { id: 'frequent', label: 'Classiques (8-10)' },
                ].map((rf) => (
                  <button
                    key={rf.id}
                    onClick={() => setRarityFilter(rf.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      rarityFilter === rf.id
                        ? 'bg-white text-black shadow-xs'
                        : 'text-neutral-600 hover:text-black'
                    }`}
                  >
                    {rf.label}
                  </button>
                ))}
              </div>
            )}

            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder={forumTab === 'guides' ? 'Rechercher un modèle de guide...' : 'Rechercher un sujet...'}
                value={forumSearchQuery}
                onChange={(e) => setForumSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-black bg-white"
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION DÉDIÉE : GUIDES & GÉNÉRALITÉS (EX: BINDING PAR MODÈLE AVEC INDICE)
            ========================================================================= */}
        {forumTab === 'guides' ? (
          <div className="space-y-6">
            {generalGuides.map((guide) => (
              <div key={guide.id} className="space-y-6">
                {/* En-tête du guide général */}
                <div className="p-5 sm:p-6 rounded-3xl border-2 border-black bg-neutral-50/70 space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-black text-white">
                          GUIDE GÉNÉRAL & PROCÉDURES
                        </span>
                        {renderRarityBadge(guide.globalIndex, guide.globalIndexLabel)}
                      </div>
                      <h2 className="text-lg sm:text-xl font-black text-neutral-900">
                        {guide.title}
                      </h2>
                      <p className="text-xs text-neutral-600 font-medium">
                        {guide.tagline}
                      </p>
                    </div>

                    <button
                      onClick={() => setGuideModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-white border border-black text-black hover:bg-neutral-100 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-2xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                      <span>Assistant Guidé Pop-up</span>
                    </button>
                  </div>

                  <p className="text-xs text-neutral-700 leading-relaxed max-w-4xl">
                    {guide.description}
                  </p>

                  {/* Prérequis et règles d'or */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-neutral-200 text-xs">
                    <div className="space-y-1.5">
                      <span className="font-bold text-neutral-900 uppercase tracking-wider text-[11px] block">
                        Prérequis avant de commencer :
                      </span>
                      <ul className="space-y-1 text-neutral-700 list-disc pl-4">
                        {guide.prerequisites.map((pr, idx) => (
                          <li key={idx} className="leading-snug">{pr}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-bold text-neutral-900 uppercase tracking-wider text-[11px] block">
                        Règles clés & Sécurité :
                      </span>
                      <ul className="space-y-1 text-neutral-700 list-disc pl-4">
                        {guide.keyRules.map((kr, idx) => (
                          <li key={idx} className="leading-snug">{kr}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Exemples concrets pour chaque modèle référencé sur les sites */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black text-neutral-900">
                        Exemples d appairage pour chaque modèle référencé sur le site
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Sélectionnez votre modèle exact pour consulter sa méthode et son indice de difficulté :
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {guide.examplesByModel.map((ex) => {
                      return (
                        <div
                          key={ex.id}
                          className="p-5 rounded-2xl border border-neutral-200 bg-white hover:border-black transition-all duration-150 space-y-4 shadow-xs"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span className="text-sm font-black text-neutral-900">
                                {ex.modelName}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[10px] font-mono font-bold">
                                {ex.protocolBadge}
                              </span>
                              {renderRarityBadge(ex.difficultyIndex, ex.difficultyLabel)}
                            </div>

                            <div className="flex items-center gap-3 text-xs text-neutral-500">
                              <span className="font-bold text-neutral-700">{ex.methodName}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1 font-mono">
                                <Clock className="w-3 h-3" />
                                {ex.estimatedTime}
                              </span>
                            </div>
                          </div>

                          {/* Comportement des LEDs */}
                          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                            <div>
                              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                                En mode Bind :
                              </span>
                              <span className="font-semibold text-neutral-800 text-[11px]">
                                {ex.ledBehavior.binding}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                                Une fois lié (Succès) :
                              </span>
                              <span className="font-semibold text-emerald-700 text-[11px]">
                                {ex.ledBehavior.bound}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                                Mode WiFi / Perte :
                              </span>
                              <span className="font-semibold text-neutral-600 text-[11px]">
                                {ex.ledBehavior.wifiOrLost}
                              </span>
                            </div>
                          </div>

                          {/* Étapes détaillées */}
                          <div className="space-y-2">
                            <span className="text-xs font-black uppercase tracking-wider text-neutral-800 block">
                              Procédure étape par étape :
                            </span>
                            <ol className="space-y-2 text-xs text-neutral-800 list-decimal pl-5">
                              {ex.steps.map((st, sIdx) => (
                                <li key={sIdx} className="leading-relaxed pl-1 font-medium">
                                  {st}
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Astuce de pro */}
                          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 flex items-start gap-2">
                            <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <p className="leading-snug font-medium">
                              <strong className="font-bold">Astuce Pro :</strong> {ex.proTip}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* LISTE DES SUJETS DU FORUM */
          <div className="space-y-3">
          {filteredForumPosts.length > 0 ? (
            filteredForumPosts.map((post: CommunityPost) => {
              const rIndex = post.rarityIndex || 8;
              const rLabel = post.rarityLabel || `${rIndex}/10`;

              return (
                <article
                  key={post.id}
                  className="p-4 sm:p-5 rounded-2xl border border-neutral-200 bg-white hover:border-black transition-all duration-150 space-y-3 group shadow-2xs hover:shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      {post.resolvedWithAI ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black text-white flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>RÉSOLU AVEC IA</span>
                        </span>
                      ) : post.isResolved ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white">
                          RÉSOLU ✓
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-600">
                          OUVERT
                        </span>
                      )}

                      {/* INDICE DE RÉSOLUTION / RARETÉ 1 À 10 */}
                      {renderRarityBadge(rIndex, rLabel)}

                      {post.productName && (
                        <span className="text-[11px] font-mono font-bold text-neutral-500">
                          {post.productName}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.createdAt}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{post.replies} réponses</span>
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-black leading-snug">
                    {post.title}
                  </h3>

                  {post.solutionSummary && (
                    <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-800 space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 font-bold text-black text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Solution vérifiée & évaluée :</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleHelpfulPost(post.id);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all ${
                            userVotedPosts[post.id]
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-white border border-neutral-300 hover:border-black text-neutral-700'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>
                            {userVotedPosts[post.id] ? 'Confirmé par vous !' : 'Cette solution m a aidé'} (
                            {(post.views % 15) + 8 + (postHelpfulVotes[post.id] || 0)})
                          </span>
                        </button>
                      </div>
                      <p className="leading-relaxed pl-5 text-neutral-700">
                        {post.solutionSummary}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-neutral-100 text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 text-[10px] font-medium"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-neutral-600">
                      <span className="w-5 h-5 rounded-full bg-neutral-200 overflow-hidden flex items-center justify-center text-[10px] font-black">
                        {post.author.callsign[0]}
                      </span>
                      <span className="font-semibold text-black">{post.author.callsign}</span>
                      <span className="text-[10px] text-neutral-400">({post.author.badge})</span>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="py-12 px-6 rounded-2xl border border-dashed border-neutral-300 text-center space-y-3 bg-neutral-50/50">
              <Search className="w-8 h-8 text-neutral-400 mx-auto" />
              <h4 className="text-sm font-bold text-neutral-800">
                Aucune discussion ne correspond à cette recherche exacte
              </h4>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                Lancez l assistant pop-up pour obtenir immédiatement un diagnostic IA personnalisé avec estimation de rareté.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetGuide}
                  className="px-4 py-2 text-xs font-bold border border-neutral-300 rounded-xl hover:border-black"
                >
                  Effacer les filtres
                </button>
                <button
                  onClick={() => setGuideModalOpen(true)}
                  className="px-4 py-2 text-xs font-bold bg-black text-white rounded-xl hover:bg-neutral-800"
                >
                  Lancer l assistant guidé
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      </main>

      {/* =========================================================================
          4. POP-UP DE DIAGNOSTIC GUIDÉ (NOUVEAU FLUX MULTI-MOTORS EN 4 ÉTAPES)
          ========================================================================= */}
      {guideModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-black max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
            {/* EN-TÊTE DE LA POP-UP */}
            <div className="p-4 sm:p-5 border-b border-neutral-200 bg-neutral-50/90 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black text-xs shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black uppercase tracking-wider text-black">
                      Assistant Diagnostic Guidé
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-neutral-200 text-neutral-800">
                      Étape {guideStep} sur 4
                    </span>
                    {isMotor && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500/10 text-amber-900 border border-amber-500/30">
                        Multi-Motors Hub
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    {guideStep === 1 && 'Renseignez la marque, la gamme et le modèle recherché'}
                    {guideStep === 2 && 'Sélectionnez le moteur tiré de Multi-Motors'}
                    {guideStep === 3 && 'Précisez les circonstances et le symptôme de panne'}
                    {guideStep === 4 && 'Résolution par post existant ou intelligence artificielle (1 à 10)'}
                  </p>
                </div>
              </div>

              {/* BOUTON PASSER LE GUIDE */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSkipGuide}
                  className="px-3 py-1.5 text-xs font-bold text-neutral-600 hover:text-black border border-neutral-300 rounded-xl hover:border-black transition-all flex items-center gap-1.5 bg-white"
                  title="Accéder immédiatement à la liste des sujets du forum avec les filtres sélectionnés"
                >
                  <span>Passer le guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setGuideModalOpen(false)}
                  className="w-8 h-8 rounded-full border border-neutral-200 hover:border-black flex items-center justify-center text-neutral-500 hover:text-black text-sm font-bold"
                  title="Fermer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* CORPS DE LA POP-UP */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
              {/* =========================================================================
                  ÉTAPE 1 : RENSEIGNER LA MARQUE, LA GAMME ET LE MODÈLE
                  ========================================================================= */}
              {guideStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-base font-black text-neutral-900">
                      1. Renseignez la Marque, la Gamme et le Modèle du moteur
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Indiquez les caractéristiques de votre pièce pour extraire les moteurs répertoriés sur Multi-Motors.
                    </p>
                  </div>

                  {/* A. Choix de la Marque */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black uppercase tracking-wider text-neutral-700">
                        A. Marque du moteur :
                      </label>
                      <span className="text-[11px] text-neutral-500">
                        {selectedBrand ? `Sélectionnée : ${selectedBrand}` : 'Cliquez pour choisir'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-36 overflow-y-auto pr-1">
                      {filteredBrands.map((b: any) => {
                        const isSelected = selectedBrand === b.name;
                        return (
                          <button
                            key={b.name}
                            onClick={() => {
                              setSelectedBrand(b.name);
                              setSelectedGamme('');
                              setSelectedMotor(null);
                            }}
                            className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                              isSelected
                                ? 'border-black bg-black text-white font-bold shadow-xs'
                                : 'border-neutral-200 bg-white hover:border-black text-neutral-900'
                            }`}
                          >
                            <span className="truncate block">{b.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* B. Choix de la Gamme (Dès qu'une marque est sélectionnée) */}
                  {selectedBrand && (
                    <div className="space-y-2 pt-1 border-t border-neutral-100">
                      <label className="text-xs font-black uppercase tracking-wider text-neutral-700">
                        B. Gamme / Série ({selectedBrand}) :
                      </label>
                      <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                        <button
                          onClick={() => {
                            setSelectedGamme('');
                            setSelectedMotor(null);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            !selectedGamme
                              ? 'bg-black text-white border-black'
                              : 'bg-white border-neutral-200 text-neutral-700 hover:border-black'
                          }`}
                        >
                          Toutes les gammes
                        </button>
                        {availableGammes.map((g) => {
                          const isSelected = selectedGamme === g;
                          return (
                            <button
                              key={g}
                              onClick={() => {
                                setSelectedGamme(g);
                                setSelectedMotor(null);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                                isSelected
                                  ? 'bg-black text-white border-black'
                                  : 'bg-white border-neutral-200 text-neutral-700 hover:border-black'
                              }`}
                            >
                              {g}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* C. Recherche du Modèle / Stator */}
                  <div className="space-y-1.5 pt-1 border-t border-neutral-100">
                    <label className="text-xs font-black uppercase tracking-wider text-neutral-700">
                      C. Modèle ou Format Stator (facultatif ou précis) :
                    </label>
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Ex: F60 PRO V, 2207, 1950KV, ECO II 2004, GTS V3..."
                        value={inputModelQuery}
                        onChange={(e) => setInputModelQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-black bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  ÉTAPE 2 : MOTEURS TIRÉS DE MULTI-MOTORS
                  ========================================================================= */}
              {guideStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black text-neutral-900">
                        2. Moteurs correspondants tirés de Multi-Motors.fr
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Critères : <span className="font-bold text-black">{selectedBrand}</span> {selectedGamme ? `• Gamme ${selectedGamme}` : ''} {inputModelQuery ? `• « ${inputModelQuery} »` : ''}
                      </p>
                    </div>

                    <button
                      onClick={() => setGuideStep(1)}
                      className="text-xs font-bold text-neutral-500 hover:text-black underline"
                    >
                      Modifier la recherche
                    </button>
                  </div>

                  {/* Liste des moteurs tirés de Multi-Motors */}
                  {proposedMotorsFromMultiMotors.length > 0 ? (
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {proposedMotorsFromMultiMotors.map((m) => {
                        const isSelected = selectedMotor?.id === m.id;
                        return (
                          <div
                            key={m.id}
                            onClick={() => {
                              setSelectedMotor(m);
                              setCustomModelFallback('');
                            }}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'border-black bg-neutral-50 ring-2 ring-black shadow-xs'
                                : 'border-neutral-200 bg-white hover:border-black'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-black text-neutral-900">{m.fullName}</span>
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">
                                  Réf : {m.ref}
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-900 border border-amber-500/30">
                                  Multi-Motors
                                </span>
                              </div>

                              <div className="flex items-center gap-3 text-[11px] text-neutral-500 flex-wrap">
                                {m.classe && <span>Stator : <strong className="text-neutral-700">{m.classe}</strong></span>}
                                {m.kv && <span>KV : <strong className="text-neutral-700">{m.kv}</strong></span>}
                                {m.poids && <span>Poids : <strong className="text-neutral-700">{m.poids}</strong></span>}
                                {m.lipo && <span>LiPo : <strong className="text-neutral-700">{m.lipo}</strong></span>}
                                {m.shaft && <span>Arbre : <strong className="text-neutral-700">{m.shaft}</strong></span>}
                              </div>
                            </div>

                            <div className="shrink-0">
                              {isSelected ? (
                                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">
                                  <Check className="w-3.5 h-3.5" />
                                </span>
                              ) : (
                                <span className="text-xs font-bold text-neutral-400">Choisir</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-neutral-300 text-center space-y-2 bg-neutral-50">
                      <p className="text-xs font-bold text-neutral-700">
                        Aucun moteur ne correspond exactement à ce filtre dans Multi-Motors.
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        Vous pouvez saisir le modèle exact manuellement ci-dessous pour poursuivre le diagnostic :
                      </p>
                      <input
                        type="text"
                        placeholder="Ex: T-Motor F60 PRO V 1950KV"
                        value={customModelFallback}
                        onChange={(e) => {
                          setCustomModelFallback(e.target.value);
                          setSelectedMotor(null);
                        }}
                        className="px-3 py-2 text-xs border border-neutral-300 rounded-xl w-full max-w-sm mx-auto block bg-white focus:outline-none focus:border-black"
                      />
                    </div>
                  )}

                  {/* Numéro de série / lot de traçabilité */}
                  <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-neutral-800 flex items-center gap-1.5">
                        <Barcode className="w-3.5 h-3.5" />
                        <span>Numéro de série (S/N) ou Lot de fabrication :</span>
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        Optionnel : permet de corréler avec d éventuels défauts de série connus
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Ex: TM-2024-F60-8842"
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      className="px-3 py-1.5 text-xs border border-neutral-300 rounded-lg w-full sm:w-48 bg-white font-mono focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              )}

              {/* =========================================================================
                  ÉTAPE 3 : QUESTIONS COURTES SUR LE PROBLÈME
                  ========================================================================= */}
              {guideStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-black text-neutral-900">
                      3. Quel problème rencontrez-vous sur ce moteur ?
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Moteur : <span className="font-bold text-black">{selectedMotor?.fullName || customModelFallback || selectedBrand}</span>
                    </p>
                  </div>

                  {/* Circonstance */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                      Quand est apparu le problème ?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {def.circumstances.map((c) => {
                        const isSelected = selectedCircumstance === c.id;
                        return (
                          <button
                            key={c.id}
                            onClick={() => setSelectedCircumstance(c.id)}
                            className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                              isSelected
                                ? 'border-black bg-black text-white font-bold'
                                : 'border-neutral-200 bg-white hover:border-black text-neutral-800'
                            }`}
                          >
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Symptômes précis */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                      Symptôme constaté :
                    </label>
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {def.symptoms.map((s) => {
                        const isSelected = selectedSymptomId === s.id;
                        return (
                          <div
                            key={s.id}
                            onClick={() => setSelectedSymptomId(s.id)}
                            className={`p-3 rounded-xl border cursor-pointer transition-all ${
                              isSelected
                                ? 'border-black bg-neutral-50 ring-2 ring-black'
                                : 'border-neutral-200 bg-white hover:border-neutral-400'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-neutral-900">{s.title}</span>
                              {renderRarityBadge(s.rarityIndex, s.rarityLabel)}
                            </div>
                            <p className="text-[11px] text-neutral-600 mt-1 leading-snug">
                              {s.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  ÉTAPE 4 : IDENTIFICATION DU COMPOSANT, FRÉQUENCE DE PANNE & ÉVALUATION
                  ========================================================================= */}
              {guideStep === 4 && (
                <div className="space-y-5">
                  {/* EN-TÊTE : IDENTIFICATION ULTRA-FINE DU COMPOSANT & LOT */}
                  <div className="p-4 rounded-2xl bg-neutral-900 text-white space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-400 text-black">
                          COMPOSANT IDENTIFIÉ
                        </span>
                        {renderRarityBadge(currentRarityIndex, currentRarityLabel)}
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {selectedMotor?.ref ? `Réf Multi-Motors : ${selectedMotor.ref}` : 'Référence Standard'}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/10 pt-2 text-xs">
                      <div>
                        <h3 className="text-base font-black text-white">
                          {selectedMotor?.fullName || customModelFallback || (selectedBrand ? `${selectedBrand} ${selectedGamme}` : def.frenchTitle)}
                        </h3>
                        <p className="text-[11px] text-neutral-300">
                          {selectedBrand && `Marque : ${selectedBrand}`} {selectedGamme && `• Gamme : ${selectedGamme}`} {selectedMotor?.classe && `• Format : ${selectedMotor.classe} ${selectedMotor.kv ? `${selectedMotor.kv}KV` : ''}`}
                        </p>
                      </div>
                      {serialNumber && (
                        <div className="p-1 px-2.5 rounded-lg bg-white/10 border border-white/20 text-[11px] font-mono text-amber-300 shrink-0">
                          S/N ou Lot : {serialNumber}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SECTION 1 : FRÉQUENCE DE PANNE SUR CE COMPOSANT EXACT */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200 bg-neutral-50/80 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-black" />
                          <span className="text-xs font-black uppercase tracking-wider text-black">
                            Fréquence de Panne & Fiabilité Constatée
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500">
                          Statistiques consolidées sur {reliabilityStats.totalReportedIncidents} incidents analysés sur ce composant
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block">Indice Fiabilité</span>
                          <span className="text-sm font-black text-emerald-600">{reliabilityStats.overallReliabilityScore}/10</span>
                        </div>
                        <div className="h-7 w-px bg-neutral-200" />
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block">Taux de Résolution</span>
                          <span className="text-sm font-black text-black">{reliabilityStats.resolutionSuccessRate}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Barres de répartition des causes récurrentes */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-neutral-700 block">
                        Répartition des pannes fréquentes sur cette référence :
                      </span>
                      <div className="space-y-2">
                        {reliabilityStats.topFailureCauses.map((fc, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-white border border-neutral-200/80 space-y-1.5 shadow-2xs">
                            <div className="flex items-center justify-between text-xs gap-2">
                              <span className="font-bold text-neutral-900 leading-snug">{fc.cause}</span>
                              <span className="font-mono font-black text-black shrink-0">{fc.percentage}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                              <div
                                className="h-full bg-black rounded-full transition-all duration-500"
                                style={{ width: `${fc.percentage}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-0.5">
                              <span>Symptôme récurrent : {fc.typicalSymptom}</span>
                              {renderRarityBadge(fc.rarityIndex, fc.rarityLabel)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommandations constructeur pour ce composant */}
                    {reliabilityStats.knownBatchBulletins.length > 0 && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950 space-y-1">
                        <span className="font-bold block uppercase tracking-wider text-[10px] text-amber-900">
                          Recommandations & Bulletins pour ce matériel :
                        </span>
                        <ul className="space-y-1 text-[11px] list-disc pl-4 text-amber-900">
                          {reliabilityStats.knownBatchBulletins.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* SECTION 2 : POSTS FORUM EXISTANTS SUR CE MOTEUR / COMPOSANT */}
                  {exactMotorForumPosts.length > 0 && (
                    <div className="p-4 rounded-2xl bg-neutral-900 text-white space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                          <span>Discussion forum existante sur ce modèle exact</span>
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500 text-white">
                          Solution Validée
                        </span>
                      </div>

                      {exactMotorForumPosts.slice(0, 2).map((p) => (
                        <div key={p.id} className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1.5">
                          <p className="text-xs font-bold text-white">{p.title}</p>
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            💡 <span className="font-bold text-white">Solution pilote :</span> {p.solutionSummary}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1">
                            <span>Par {p.author.callsign} ({p.author.badge})</span>
                            <span className="text-emerald-400 font-bold">96% d efficacité vérifiée</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SECTION 3 : PROTOCOLE & RÉSOLUTION IA */}
                  <div className="p-4 sm:p-5 rounded-2xl border-2 border-black bg-white space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Protocole de Résolution IA</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-black">
                        {currentSymptom?.aiDiagnostic.probability}% CERTITUDE
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">Cause Diagnostiquée :</span>
                      <p className="text-xs font-bold text-neutral-900">
                        {currentSymptom?.aiDiagnostic.rootCause}
                      </p>
                    </div>

                    <p className="text-xs text-neutral-700 leading-relaxed">
                      {currentSymptom?.aiDiagnostic.explanation}
                    </p>

                    <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                      <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                        Actions Correctives Numérotées :
                      </span>
                      <ol className="text-xs text-neutral-800 space-y-1.5 list-decimal pl-5">
                        {currentSymptom?.aiDiagnostic.recommendedFix.map((fix, idx) => (
                          <li key={idx} className="leading-snug font-medium">{fix}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* SECTION 4 : ÉVALUATION DE LA RÉSOLUTION PAR LE PILOTE (BOUCLE DE FEEDBACK) */}
                  <div className="p-5 rounded-2xl border-2 border-black bg-neutral-50 space-y-4 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <h4 className="text-sm font-black text-neutral-900">
                            Évaluation de la Résolution par les Pilotes
                          </h4>
                        </div>
                        <p className="text-xs text-neutral-600">
                          Vos retours affinent en temps réel la base IA et la détection des pannes sur cette référence.
                        </p>
                      </div>

                      <div className="px-3 py-1.5 rounded-xl bg-white border border-neutral-300 text-xs font-bold text-neutral-800 shrink-0">
                        Succès vérifié : <span className="font-black text-emerald-600">{reliabilityStats.resolutionSuccessRate}%</span> ({reliabilityStats.verifiedResolutionsCount} confirmés)
                      </div>
                    </div>

                    {/* Question d'évaluation */}
                    <div className="space-y-2.5">
                      <span className="text-xs font-bold text-neutral-800 block">
                        Cette solution a-t-elle résolu votre panne ?
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <button
                          onClick={() => handleVoteResolution('resolved')}
                          className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            resolutionVote === 'resolved'
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                              : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                          }`}
                        >
                          <span>✅ Oui, 100% résolu</span>
                        </button>

                        <button
                          onClick={() => handleVoteResolution('partial')}
                          className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            resolutionVote === 'partial'
                              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                              : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                          }`}
                        >
                          <span>⚠️ Partiellement résolu</span>
                        </button>

                        <button
                          onClick={() => handleVoteResolution('unresolved')}
                          className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            resolutionVote === 'unresolved'
                              ? 'bg-red-600 text-white border-red-600 shadow-xs'
                              : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                          }`}
                        >
                          <span>❌ Non, toujours en panne</span>
                        </button>
                      </div>
                    </div>

                    {/* Message de confirmation & enrichissement */}
                    {resolutionVote && (
                      <div className="p-3.5 rounded-xl bg-white border border-black space-y-3 animate-in fade-in duration-200">
                        <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>
                            {resolutionVote === 'resolved'
                              ? 'Super ! Votre confirmation a été enregistrée pour ce modèle et valide ce protocole.'
                              : resolutionVote === 'partial'
                              ? 'Merci pour votre retour. Nos modérateurs et l IA affinent les étapes.'
                              : 'Merci. Nous vous conseillons de publier votre cas spécifique sur le forum avec vos logs.'}
                          </span>
                        </div>

                        {!resolutionCommentSent ? (
                          <div className="space-y-2 pt-1 border-t border-neutral-100">
                            <label className="text-[11px] font-bold text-neutral-600 block">
                              Ajouter une précision technique / conseil pour la communauté (facultatif) :
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Ex: Résolu en augmentant le demag compensation à High..."
                                value={resolutionComment}
                                onChange={(e) => setResolutionComment(e.target.value)}
                                className="flex-1 px-3 py-1.5 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                              />
                              <button
                                onClick={() => setResolutionCommentSent(true)}
                                disabled={!resolutionComment.trim()}
                                className="px-3 py-1.5 text-xs font-bold bg-black text-white rounded-lg hover:bg-neutral-800 disabled:opacity-40"
                              >
                                Envoyer
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[11px] text-emerald-700 font-semibold">
                            ✓ Votre conseil a été transmis et rattaché à cette référence !
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* PIED DE PAGE DE LA POP-UP */}
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                {guideStep > 1 && guideStep < 4 && (
                  <button
                    onClick={() => setGuideStep((prev) => (prev - 1) as any)}
                    className="px-3.5 py-2 text-xs font-bold text-neutral-600 hover:text-black border border-neutral-200 rounded-xl hover:border-black bg-white"
                  >
                    ← Précédent
                  </button>
                )}
                <button
                  onClick={handleSkipGuide}
                  className="px-3.5 py-2 text-xs font-bold text-neutral-500 hover:text-black hover:underline"
                >
                  Passer et voir le forum filtré →
                </button>
              </div>

              <div className="flex items-center gap-2">
                {guideStep === 1 && (
                  <button
                    onClick={() => setGuideStep(2)}
                    disabled={!selectedBrand}
                    className="px-5 py-2.5 text-xs font-black uppercase tracking-wider bg-black text-white rounded-xl hover:bg-neutral-800 disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Voir les moteurs Multi-Motors correspondants</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {guideStep === 2 && (
                  <button
                    onClick={() => setGuideStep(3)}
                    disabled={!selectedMotor && !customModelFallback}
                    className="px-5 py-2.5 text-xs font-black uppercase tracking-wider bg-black text-white rounded-xl hover:bg-neutral-800 disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Diagnostiquer ce moteur</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {guideStep === 3 && (
                  <button
                    onClick={handleTriggerAI}
                    disabled={!selectedSymptomId || isAnalyzing}
                    className="px-6 py-2.5 text-xs font-black uppercase tracking-wider bg-black text-white rounded-xl hover:bg-neutral-800 disabled:opacity-40 transition-all flex items-center gap-2 shadow-xs"
                  >
                    {isAnalyzing ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Recherche forum & IA...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Identifier la panne</span>
                      </>
                    )}
                  </button>
                )}

                {guideStep === 4 && (
                  <button
                    onClick={handleSkipGuide}
                    className="px-6 py-2.5 text-xs font-black uppercase tracking-wider bg-black text-white rounded-xl hover:bg-neutral-800 transition-all shadow-xs"
                  >
                    Voir les discussions du forum sur ce moteur
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL POUR CRÉER UN SUJET FORUM PRÉ-REMPLI */}
      {newTopicModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-black max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-black" />
                <h3 className="text-base font-black text-neutral-900">
                  Poser une question sur le forum FixMyDrone
                </h3>
              </div>
              <button
                onClick={() => setNewTopicModalOpen(false)}
                className="text-neutral-400 hover:text-black font-bold"
              >
                ✕
              </button>
            </div>

            {newTopicPublished ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-black text-neutral-900">Votre sujet est publié sur le forum !</h4>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                  La communauté a été notifiée de votre moteur ({selectedMotor?.fullName || customModelFallback || selectedBrand}) et de son indice de rareté ({currentRarityIndex}/10).
                </p>
                <button
                  onClick={() => {
                    setNewTopicModalOpen(false);
                    setNewTopicPublished(false);
                  }}
                  className="px-6 py-2 text-xs font-bold bg-black text-white rounded-xl"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-700">Titre du sujet :</label>
                  <input
                    type="text"
                    defaultValue={`[Aide] ${selectedMotor?.fullName || customModelFallback || selectedBrand || 'Moteur'} - ${currentSymptom?.title || 'Anomalie de fonctionnement'}`}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-700">Détails & Diagnostic IA :</label>
                  <textarea
                    rows={6}
                    defaultValue={`Bonjour à tous,\n\nMoteur Multi-Motors : ${selectedMotor?.fullName || customModelFallback || selectedBrand || ''} ${selectedMotor?.ref ? `(Réf : ${selectedMotor.ref})` : ''} ${serialNumber ? `(S/N : ${serialNumber})` : ''}\n\nSymptôme : ${currentSymptom?.title || 'Anomalie constatée'}\nIndice de rareté estimé par l'IA : ${currentRarityIndex}/10 (${currentRarityLabel})\n\nPré-diagnostic IA : ${currentSymptom?.aiDiagnostic.rootCause || ''}\n\nQuelqu'un a déjà rencontré ce cas sur ce moteur ? Merci d'avance pour vos conseils !`}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-black font-mono text-[11px]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200">
                  <button
                    onClick={() => setNewTopicModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-neutral-600 hover:text-black"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => setNewTopicPublished(true)}
                    className="px-6 py-2 text-xs font-black uppercase tracking-wider bg-black text-white rounded-xl hover:bg-neutral-800 flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publier sur le forum</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
