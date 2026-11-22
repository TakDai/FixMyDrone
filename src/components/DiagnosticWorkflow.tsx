'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  ThumbsUp,
  Clock,
  Layers,
  SlidersHorizontal,
  ChevronDown,
  Info
} from 'lucide-react';
import { getDiagnosticDefinition } from '@/data/diagnosticKnowledgeBase';
import { getSisterSiteForComponent } from '@/data/ecosystem';
import { MULTI_MOTORS_FPV_BRANDS } from '@/data/multiMotorsFpvBrands';
import { FORUM_POSTS } from '@/data/forumPosts';
import { CommunityPost } from '@/types';

interface DiagnosticWorkflowProps {
  componentId: string;
}

export function DiagnosticWorkflow({ componentId }: DiagnosticWorkflowProps) {
  const def = useMemo(() => getDiagnosticDefinition(componentId), [componentId]);
  const sisterSite = useMemo(() => getSisterSiteForComponent(componentId), [componentId]);
  const isMotor = componentId === 'motors' || componentId === 'motor';

  // État de la POP-UP GUIDE (ouverte par défaut au premier chargement, fermable/passable à tout moment)
  const [guideModalOpen, setGuideModalOpen] = useState(true);
  const [guideStep, setGuideStep] = useState<1 | 2 | 3 | 4>(1);

  // Filtres actifs sélectionnés dans le guide ou sur la page
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [customModel, setCustomModel] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [selectedKV, setSelectedKV] = useState<string>('');
  const [selectedCircumstance, setSelectedCircumstance] = useState<string>('');
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>('');
  const [checkedObservations, setCheckedObservations] = useState<Record<string, boolean>>({});
  const [userNotes, setUserNotes] = useState<string>('');
  const [brandSearch, setBrandSearch] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Filtres forum sur la page sous-jacente
  const [forumSearchQuery, setForumSearchQuery] = useState('');
  const [rarityFilter, setRarityFilter] = useState<'all' | 'rare' | 'moderate' | 'frequent'>('all');
  const [forumTab, setForumTab] = useState<'all' | 'ai-resolved' | 'unresolved'>('all');

  // Modale de nouveau sujet forum
  const [newTopicModalOpen, setNewTopicModalOpen] = useState(false);
  const [newTopicPublished, setNewTopicPublished] = useState(false);

  // Données de la marque moteur issue du catalogue Multi-Motors
  const motorBrandData = isMotor && selectedBrand ? MULTI_MOTORS_FPV_BRANDS[selectedBrand] : null;

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

  // Symptôme actif
  const currentSymptom = useMemo(() => {
    return def.symptoms.find((s) => s.id === selectedSymptomId) || def.symptoms[0];
  }, [def.symptoms, selectedSymptomId]);

  // Calcul dynamique de l'indice de rareté (1 à 10)
  // 1 = Panne très très rare / exotique
  // 10 = Panne très courante / classique
  const currentRarityIndex = currentSymptom?.rarityIndex || 8;
  const currentRarityLabel = currentSymptom?.rarityLabel || `${currentRarityIndex}/10`;

  // Posts forum filtrés selon les critères inscrits
  const filteredForumPosts = useMemo(() => {
    return FORUM_POSTS.filter((post) => {
      // Filtre catégorie de composant
      const matchCat =
        post.category === componentId ||
        (isMotor && (post.category === 'motors' || post.category === 'esc-stack'));

      // Filtre marque
      const matchBrand =
        !selectedBrand ||
        (post.brand && post.brand.toLowerCase() === selectedBrand.toLowerCase()) ||
        post.title.toLowerCase().includes(selectedBrand.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase() === selectedBrand.toLowerCase());

      // Filtre modèle
      const activeModel = selectedModel || customModel;
      const matchModel =
        !activeModel ||
        (post.model && post.model.toLowerCase().includes(activeModel.toLowerCase())) ||
        post.title.toLowerCase().includes(activeModel.toLowerCase());

      // Filtre recherche textuelle
      const matchSearch =
        !forumSearchQuery ||
        post.title.toLowerCase().includes(forumSearchQuery.toLowerCase()) ||
        post.solutionSummary?.toLowerCase().includes(forumSearchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(forumSearchQuery.toLowerCase()));

      // Filtre onglet résolution
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
  }, [componentId, isMotor, selectedBrand, selectedModel, customModel, forumSearchQuery, forumTab, rarityFilter]);

  // Déclenchement de l'analyse IA
  const handleTriggerAI = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setGuideStep(4);
    }, 600);
  };

  // Passer le guide et accéder directement au forum filtré
  const handleSkipGuide = () => {
    setGuideModalOpen(false);
  };

  // Réinitialiser le guide
  const handleResetGuide = () => {
    setGuideStep(1);
    setSelectedBrand('');
    setSelectedModel('');
    setCustomModel('');
    setSerialNumber('');
    setSelectedKV('');
    setSelectedCircumstance('');
    setSelectedSymptomId('');
    setCheckedObservations({});
    setUserNotes('');
  };

  // Rendu de la jauge de rareté (1 à 10)
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
            {/* Bouton pour réouvrir la pop-up guide */}
            <button
              onClick={() => {
                setGuideModalOpen(true);
              }}
              className="flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full border-2 border-black bg-black text-white hover:bg-neutral-800 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Ouvrir le Guide de Diagnostic</span>
            </button>

            {/* Badge Partenaire */}
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

      {/* 2. BANNIÈRE PRINCIPALE DU HUB FORUM & DÉPANNAGE */}
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
                  {isMotor && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-amber-500/10 text-amber-900 border border-amber-500/30">
                      CATALOGUE MULTI-MOTORS (13 824 RÉF)
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-purple-500/10 text-purple-900 border border-purple-500/30">
                    INDICE DE RARETÉ 1 À 10
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900">
                  Dépannage & Solutions : {def.frenchTitle}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                  Explorez les pannes résolues par la communauté et l IA, ou lancez le questionnaire pop-up guidé pour diagnostiquer votre pièce pas-à-pas.
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

          {/* BARRE DE FILTRES ACTIFS (SI LE GUIDE A ÉTÉ PASSÉ OU REMPLI) */}
          <div className="mt-5 pt-4 border-t border-neutral-200/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-500 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5 text-neutral-400" />
              <span>Filtres appliqués :</span>
            </span>

            {/* Pill Composant */}
            <span className="px-2.5 py-1 rounded-lg bg-black text-white font-bold text-[11px] flex items-center gap-1">
              <span>{def.componentName}</span>
            </span>

            {/* Pill Marque si sélectionnée */}
            {selectedBrand ? (
              <span className="px-2.5 py-1 rounded-lg bg-white border border-black text-black font-bold text-[11px] flex items-center gap-1.5 shadow-2xs">
                <span>Marque : {selectedBrand}</span>
                <button
                  onClick={() => {
                    setSelectedBrand('');
                    setSelectedModel('');
                  }}
                  className="hover:text-red-600 font-black ml-0.5"
                >
                  ✕
                </button>
              </span>
            ) : (
              <button
                onClick={() => {
                  setGuideStep(1);
                  setGuideModalOpen(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-white border border-dashed border-neutral-300 text-neutral-600 hover:border-black hover:text-black font-medium text-[11px]"
              >
                + Filtrer par marque
              </button>
            )}

            {/* Pill Modèle si sélectionné */}
            {(selectedModel || customModel) && (
              <span className="px-2.5 py-1 rounded-lg bg-white border border-black text-black font-bold text-[11px] flex items-center gap-1.5 shadow-2xs">
                <span>Modèle : {selectedModel || customModel}</span>
                <button
                  onClick={() => {
                    setSelectedModel('');
                    setCustomModel('');
                  }}
                  className="hover:text-red-600 font-black ml-0.5"
                >
                  ✕
                </button>
              </span>
            )}

            {/* Pill Numéro de Série si renseigné */}
            {serialNumber && (
              <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 font-mono text-[11px] flex items-center gap-1.5">
                <Hash className="w-3 h-3 text-amber-700" />
                <span>S/N : {serialNumber}</span>
                <button
                  onClick={() => setSerialNumber('')}
                  className="hover:text-red-600 font-black ml-0.5"
                >
                  ✕
                </button>
              </span>
            )}

            {/* Bouton pour tout effacer */}
            {(selectedBrand || selectedModel || customModel || serialNumber) && (
              <button
                onClick={handleResetGuide}
                className="text-neutral-500 hover:text-black underline text-[11px] ml-2"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. PAGE PRINCIPALE DU FORUM AVEC LES FILTRES INSCRITS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-6">
        {/* BANDEAU RECOMMANDATION IA SI FILTRES ACTIFS */}
        {(selectedBrand || selectedModel) && currentSymptom && (
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-black bg-neutral-50/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-black uppercase tracking-wider">
                  PRÉ-DIAGNOSTIC IA FIXMYDRONE
                </span>
                {renderRarityBadge(currentRarityIndex, currentRarityLabel)}
                <span className="text-xs font-bold text-neutral-800">
                  {selectedBrand} {selectedModel || customModel}
                </span>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed max-w-3xl">
                <span className="font-bold text-black">Cause identifiée :</span> {currentSymptom.aiDiagnostic.rootCause} ({currentSymptom.aiDiagnostic.probability}% certitude).
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
              <span>Voir le protocole complet</span>
            </button>
          </div>
        )}

        {/* BARRE D'OUTILS ET ONGLETS FORUM */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
          {/* Onglets */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'Toutes les discussions' },
              { id: 'ai-resolved', label: 'Résolus avec IA (1 à 10)' },
              { id: 'unresolved', label: 'En attente de solution' },
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

          {/* Filtre de rareté (1 à 10) et recherche */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            {/* Sélecteur de rareté */}
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

            {/* Champ de recherche */}
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher un sujet..."
                value={forumSearchQuery}
                onChange={(e) => setForumSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-black bg-white"
              />
            </div>
          </div>
        </div>

        {/* LISTE DES SUJETS DU FORUM AVEC INDICE DE RÉSOLUTION / RARETÉ (1 À 10) */}
        <div className="space-y-3">
          {filteredForumPosts.length > 0 ? (
            filteredForumPosts.map((post) => {
              const rIndex = post.rarityIndex || 8;
              const rLabel = post.rarityLabel || `${rIndex}/10`;

              return (
                <article
                  key={post.id}
                  className="p-4 sm:p-5 rounded-2xl border border-neutral-200 bg-white hover:border-black transition-all duration-150 space-y-3 group shadow-2xs hover:shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Badge Résolution IA */}
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

                      {/* INDICE DE RÉSOLUTION / RARETÉ DE LA PANNE (1 À 10) */}
                      {renderRarityBadge(rIndex, rLabel)}

                      {/* Produit / Modèle ciblé */}
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

                  {/* Titre du sujet */}
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-black leading-snug">
                    {post.title}
                  </h3>

                  {/* Extrait de la solution IA ou communautaire */}
                  {post.solutionSummary && (
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-800 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-black text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Solution vérifiée :</span>
                      </div>
                      <p className="leading-relaxed pl-5 text-neutral-700">
                        {post.solutionSummary}
                      </p>
                    </div>
                  )}

                  {/* Tags & Auteur */}
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
                Aucun sujet ne correspond exactement à ces filtres
              </h4>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                Vous pouvez élargir vos filtres de rareté, ou lancer le guide pas-à-pas pour obtenir immédiatement une analyse IA.
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
                  Lancer le diagnostic IA
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =========================================================================
          4. POP-UP DE DIAGNOSTIC GUIDÉ (MODALE INTERACTIVE AVEC OPTION DE PASSER)
          ========================================================================= */}
      {guideModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-black max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
            {/* EN-TÊTE DE LA POP-UP */}
            <div className="p-4 sm:p-5 border-b border-neutral-200 bg-neutral-50/90 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black text-xs">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-black">
                      Assistant de Diagnostic Guidé
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-neutral-200 text-neutral-800">
                      Étape {guideStep} sur 4
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    {def.componentName} • Répond aux questions pour identifier la panne via le forum ou l IA
                  </p>
                </div>
              </div>

              {/* BOUTON CRITIQUE : PASSER LE GUIDE POUR ACCÉDER DIRECTEMENT AU FORUM FILTRÉ */}
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

            {/* CORPS DE LA POP-UP : LES 4 ÉTAPES GUIDÉES */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
              {/* ÉTAPE 1 : MARQUE */}
              {guideStep === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-black text-neutral-900">
                        1. Choisissez la marque de votre {def.componentName}
                      </h3>
                      <p className="text-xs text-neutral-500">
                        {isMotor
                          ? 'Alimenté par les 13 824 références du catalogue Multi-Motors.fr'
                          : 'Sélectionnez le fabricant d origine de la pièce'}
                      </p>
                    </div>

                    <div className="relative w-full sm:w-56">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Filtrer une marque..."
                        value={brandSearch}
                        onChange={(e) => setBrandSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Grille des marques */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-72 overflow-y-auto pr-1">
                    {filteredBrands.map((b: any) => {
                      const isSelected = selectedBrand === b.name;
                      return (
                        <button
                          key={b.name}
                          onClick={() => {
                            setSelectedBrand(b.name);
                            setSelectedModel('');
                            setGuideStep(2);
                          }}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'border-black bg-black text-white shadow-xs'
                              : 'border-neutral-200 bg-white hover:border-black hover:bg-neutral-50 text-neutral-900'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold truncate">{b.name}</span>
                            {b.totalMotorsInCatalog && (
                              <span className={`text-[9px] font-mono px-1 rounded ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                              }`}>
                                {b.totalMotorsInCatalog}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ÉTAPE 2 : MODÈLE, CLASSE/KV & NUMÉRO DE SÉRIE */}
              {guideStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black text-neutral-900">
                        2. Modèle & Référence de lot ({selectedBrand})
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Choisissez le modèle exact ou renseignez le numéro de série / lot
                      </p>
                    </div>
                    <button
                      onClick={() => setGuideStep(1)}
                      className="text-xs font-bold text-neutral-500 hover:text-black underline"
                    >
                      Changer de marque
                    </button>
                  </div>

                  {/* Modèles catalogue Multi-Motors */}
                  {isMotor && motorBrandData && motorBrandData.models.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                        Modèles fréquents répertoriés sur Multi-Motors :
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                        {motorBrandData.models.slice(0, 18).map((m: any) => {
                          const isSelected = selectedModel === m.name;
                          return (
                            <button
                              key={m.name}
                              onClick={() => {
                                setSelectedModel(m.name);
                                setCustomModel('');
                                if (m.kvs && m.kvs.length > 0) setSelectedKV(m.kvs[0]);
                              }}
                              className={`p-2.5 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? 'border-black bg-black text-white shadow-xs'
                                  : 'border-neutral-200 bg-white hover:border-black text-neutral-900'
                              }`}
                            >
                              <p className="text-xs font-bold truncate">{m.name}</p>
                              {m.classes && m.classes.length > 0 && (
                                <p className={`text-[10px] ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                                  {m.classes.join(', ')}
                                </p>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Saisie libre modèle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-neutral-700">Autre modèle / Gamme :</label>
                      <input
                        type="text"
                        placeholder="Ex: F60 PRO V, Reaper 65A..."
                        value={customModel}
                        onChange={(e) => {
                          setCustomModel(e.target.value);
                          if (e.target.value) setSelectedModel('');
                        }}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-black bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-neutral-700">
                        Numéro de Série (S/N) ou Lot de fabrication :
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: S/N 2024-LOT-4412"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-black bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ÉTAPE 3 : CIRCONSTANCES & SYMPTÔMES */}
              {guideStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-black text-neutral-900">
                      3. Que se passe-t-il sur votre {selectedBrand} {selectedModel || customModel} ?
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Sélectionnez la circonstance et le comportement anormal observé
                    </p>
                  </div>

                  {/* Circonstances */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                      Circonstance d apparition :
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
                      Symptôme constaté (cliquez pour choisir) :
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

              {/* ÉTAPE 4 : RÉSULTAT DU GUIDE DANS LA POP-UP (IA & FORUM) */}
              {guideStep === 4 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                        DIAGNOSTIC GUIDÉ ÉTABLI
                      </span>
                      <h3 className="text-base font-black text-neutral-900">
                        Résolution : {selectedBrand} {selectedModel || customModel}
                      </h3>
                    </div>

                    {/* BADGE INDICE DE RARETÉ DE LA PANNE 1 À 10 */}
                    {renderRarityBadge(currentRarityIndex, currentRarityLabel)}
                  </div>

                  {/* CARTE DE CAUSE RACINE IA */}
                  <div className="p-4 rounded-2xl border-2 border-black bg-neutral-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Diagnostic IA FixMyDrone</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-black">
                        {currentSymptom?.aiDiagnostic.probability}% CERTITUDE
                      </span>
                    </div>

                    <p className="text-xs font-bold text-neutral-900">
                      {currentSymptom?.aiDiagnostic.rootCause}
                    </p>
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      {currentSymptom?.aiDiagnostic.explanation}
                    </p>

                    {/* Procédure pas à pas */}
                    <div className="pt-2 border-t border-neutral-200 space-y-1.5">
                      <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                        Action Corrective Recommandée :
                      </span>
                      <ul className="text-xs text-neutral-800 space-y-1 list-disc pl-4">
                        {currentSymptom?.aiDiagnostic.recommendedFix.map((fix, idx) => (
                          <li key={idx} className="leading-snug">{fix}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* LIEN AVEC LE FORUM COMMUNAUTAIRE */}
                  <div className="p-4 rounded-2xl bg-neutral-900 text-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                        <span>Ce que dit la communauté FixMyDrone</span>
                      </span>
                      <span className="text-[10px] font-bold text-neutral-300">
                        Alimente cette IA
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Plusieurs pilotes ont déjà rencontré ce comportement sur cette série. En fermant le guide, le forum s affichera avec vos filtres exacts ({selectedBrand} {selectedModel || customModel}).
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* PIED DE PAGE DE LA POP-UP : NAVIGATION & BOUTON PASSER */}
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
                {/* BOUTON PASSER / ACCÉDER DIRECTEMENT AU FORUM FILTRÉ */}
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
                    className="px-5 py-2.5 text-xs font-black uppercase tracking-wider bg-black text-white rounded-xl hover:bg-neutral-800 disabled:opacity-40 transition-all flex items-center gap-1.5"
                  >
                    <span>Continuer vers le modèle</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {guideStep === 2 && (
                  <button
                    onClick={() => setGuideStep(3)}
                    disabled={!selectedModel && !customModel}
                    className="px-5 py-2.5 text-xs font-black uppercase tracking-wider bg-black text-white rounded-xl hover:bg-neutral-800 disabled:opacity-40 transition-all flex items-center gap-1.5"
                  >
                    <span>Continuer vers le symptôme</span>
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
                        <span>Calcul IA & Rareté...</span>
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
                    Voir les discussions forum avec ces filtres
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL POUR CRÉER UN NOUVEAU SUJET FORUM PRÉ-REMPLI */}
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
                  La communauté a été notifiée de votre référence ({selectedBrand || 'Moteur'} {selectedModel || customModel}) et de votre indice de rareté ({currentRarityIndex}/10).
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
                <p className="text-xs text-neutral-600">
                  Votre question sera pré-remplie avec le modèle exact et les résultats de l analyse IA :
                </p>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-700">Titre du sujet :</label>
                  <input
                    type="text"
                    defaultValue={`[Aide] ${selectedBrand || 'Moteur'} ${selectedModel || customModel || ''} - ${currentSymptom?.title || 'Anomalie de fonctionnement'}`}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-700">Détails & Indice de rareté :</label>
                  <textarea
                    rows={6}
                    defaultValue={`Bonjour à tous,\n\nComposant : ${selectedBrand || 'Moteur'} ${selectedModel || customModel || ''} ${selectedKV ? `(${selectedKV})` : ''} ${serialNumber ? `(S/N: ${serialNumber})` : ''}\n\nSymptôme : ${currentSymptom?.title || 'Anomalie constatée'}\nIndice de rareté estimé par l'IA : ${currentRarityIndex}/10 (${currentRarityLabel})\n\nPré-diagnostic IA : ${currentSymptom?.aiDiagnostic.rootCause || ''}\n\nAvez-vous déjà rencontré ce comportement sur ce modèle ? Merci pour votre aide !`}
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
