'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Cpu,
  ShieldAlert,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Barcode,
  HelpCircle,
  Hash,
  Send,
  RotateCcw
} from 'lucide-react';
import { getDiagnosticDefinition } from '@/data/diagnosticKnowledgeBase';
import { getSisterSiteForComponent } from '@/data/ecosystem';
import { MULTI_MOTORS_FPV_BRANDS } from '@/data/multiMotorsFpvBrands';
import { FORUM_POSTS } from '@/data/forumPosts';

interface DiagnosticWorkflowProps {
  componentId: string;
}

export function DiagnosticWorkflow({ componentId }: DiagnosticWorkflowProps) {
  const def = useMemo(() => getDiagnosticDefinition(componentId), [componentId]);
  const sisterSite = useMemo(() => getSisterSiteForComponent(componentId), [componentId]);

  // États du formulaire guidé pas-à-pas
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [brandSearch, setBrandSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [customModel, setCustomModel] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [selectedKV, setSelectedKV] = useState<string>('');
  const [selectedCircumstance, setSelectedCircumstance] = useState<string>('');
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>('');
  const [checkedObservations, setCheckedObservations] = useState<Record<string, boolean>>({});
  const [userNotes, setUserNotes] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [forumModalOpen, setForumModalOpen] = useState(false);
  const [forumPostSuccess, setForumPostSuccess] = useState(false);

  // Pour les moteurs, on utilise la base enrichie issue du catalogue Multi-Motors
  const isMotor = componentId === 'motors' || componentId === 'motor';
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

  // Symptôme sélectionné
  const currentSymptom = useMemo(() => {
    return def.symptoms.find((s) => s.id === selectedSymptomId) || def.symptoms[0];
  }, [def.symptoms, selectedSymptomId]);

  // Recherche des posts forum pertinents qui alimentent l'IA
  const matchingForumPosts = useMemo(() => {
    const qList = currentSymptom?.matchingForumQuery || [componentId];
    return FORUM_POSTS.filter((post) => {
      const text = `${post.title} ${post.solutionSummary} ${post.tags.join(' ')} ${post.productName}`.toLowerCase();
      return (
        post.category === componentId ||
        qList.some((q) => text.includes(q.toLowerCase())) ||
        (selectedBrand && text.includes(selectedBrand.toLowerCase()))
      );
    });
  }, [componentId, currentSymptom, selectedBrand]);

  // Validation d'une étape
  const canGoToStep2 = Boolean(selectedBrand);
  const canGoToStep3 = Boolean(selectedModel || customModel);
  const canGoToStep4 = Boolean(selectedSymptomId);

  const handleLaunchAI = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 650);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedBrand('');
    setSelectedModel('');
    setCustomModel('');
    setSerialNumber('');
    setSelectedKV('');
    setSelectedCircumstance('');
    setSelectedSymptomId('');
    setCheckedObservations({});
    setUserNotes('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col">
      {/* 1. HEADER CAD & BREADCRUMB */}
      <header className="w-full border-b border-black/10 bg-white sticky top-0 z-50 backdrop-blur-md bg-white/95">
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
              <span className="text-neutral-700">Diagnostic Intelligent</span>
            </div>
          </div>

          {/* BADGE ÉCOSYSTÈME PARTENAIRE */}
          {sisterSite && (
            <a
              href={sisterSite.domain}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border border-black/20 bg-neutral-50 hover:border-black hover:bg-neutral-100 transition-all text-neutral-800"
              title={`Données et catalogues gérés par ${sisterSite.name}`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden md:inline font-mono text-[11px] text-neutral-500">BASE :</span>
              <span>{sisterSite.name}</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
          )}
        </div>
      </header>

      {/* 2. BANNIÈRE TITRE DU COMPOSANT & PRÉSENTATION CAD */}
      <div className="w-full border-b border-neutral-200 bg-neutral-50/70 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-black/15 rounded-2xl p-2.5 flex items-center justify-center shadow-xs shrink-0">
              {/* Image vectorielle du composant */}
              <img
                src={def.defaultImage}
                alt={def.componentName}
                className="max-h-full max-w-full object-contain filter drop-shadow-xs"
              />
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-black text-white">
                  RÉSOLUTION IA & FORUM
                </span>
                {isMotor && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-amber-500/10 text-amber-800 border border-amber-500/30">
                    CATALOGUE MULTI-MOTORS (13 824 RÉF)
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-black">
                Diagnostic & Réparation : {def.frenchTitle}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
                Suivez les 4 étapes pour identifier la panne exacte. Le moteur IA analyse vos symptômes et extrait directement les solutions validées sur le forum FixMyDrone.
              </p>
            </div>
          </div>

          {/* Stepper horizontal compact */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white border border-neutral-200 rounded-xl p-1.5 shadow-2xs">
            {[
              { num: 1, label: 'Marque' },
              { num: 2, label: 'Modèle & S/N' },
              { num: 3, label: 'Problème' },
              { num: 4, label: 'Résolution IA' },
            ].map((st) => (
              <button
                key={st.num}
                onClick={() => {
                  if (st.num === 1) setCurrentStep(1);
                  if (st.num === 2 && canGoToStep2) setCurrentStep(2);
                  if (st.num === 3 && canGoToStep3) setCurrentStep(3);
                  if (st.num === 4 && canGoToStep4) setCurrentStep(4);
                }}
                disabled={
                  (st.num === 2 && !canGoToStep2) ||
                  (st.num === 3 && !canGoToStep3) ||
                  (st.num === 4 && !canGoToStep4)
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentStep === st.num
                    ? 'bg-black text-white shadow-xs'
                    : currentStep > st.num
                    ? 'text-neutral-800 hover:bg-neutral-100'
                    : 'text-neutral-400 cursor-not-allowed'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                  {st.num}
                </span>
                <span className="hidden sm:inline">{st.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CONTENU PRINCIPAL DES ÉTAPES */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* =========================================================================
            ÉTAPE 1 : CHOIX DE LA MARQUE
            ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Étape 1 sur 4</span>
                <h2 className="text-xl font-black tracking-tight text-neutral-900 mt-0.5">
                  Sélectionnez la marque de votre {def.componentName}
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {isMotor
                    ? 'Toutes les marques répertoriées sur Multi-Motors.fr pour un suivi exact par fabricant.'
                    : 'Sélectionnez le fabricant d origine de votre composant.'}
                </p>
              </div>

              {/* Champ de recherche instantané */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Rechercher une marque..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-200 rounded-xl focus:border-black focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Grille des marques */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredBrands.map((b: any) => {
                const isSelected = selectedBrand === b.name;
                return (
                  <button
                    key={b.name}
                    onClick={() => {
                      setSelectedBrand(b.name);
                      setSelectedModel('');
                      setCurrentStep(2);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between group ${
                      isSelected
                        ? 'border-black bg-black text-white shadow-md'
                        : 'border-neutral-200 bg-white hover:border-black hover:bg-neutral-50/80 text-black'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-black tracking-tight ${isSelected ? 'text-white' : 'text-neutral-900'}`}>
                          {b.name}
                        </span>
                        {b.totalMotorsInCatalog && (
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {b.totalMotorsInCatalog} réf.
                          </span>
                        )}
                      </div>

                      {b.models && b.models.length > 0 && (
                        <p className={`text-[11px] mt-2 line-clamp-2 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {b.models.slice(0, 3).map((m: any) => m.name).join(', ')}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-2 border-t border-dashed border-neutral-200/50 flex items-center justify-between text-[11px] font-bold">
                      <span className={isSelected ? 'text-white' : 'text-neutral-600 group-hover:text-black'}>
                        Choisir cette marque
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Option marque personnalisée */}
            <div className="mt-6 p-4 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-neutral-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-neutral-900">Votre marque n est pas dans la liste ?</p>
                  <p className="text-[11px] text-neutral-500">Vous pouvez saisir le fabricant manuellement pour continuer le diagnostic.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Nom de la marque..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-neutral-300 rounded-lg w-full sm:w-48 bg-white focus:outline-none focus:border-black"
                />
                <button
                  onClick={() => {
                    if (brandSearch) {
                      setSelectedBrand(brandSearch);
                      setCurrentStep(2);
                    }
                  }}
                  disabled={!brandSearch}
                  className="px-4 py-1.5 text-xs font-bold bg-black text-white rounded-lg hover:bg-neutral-800 disabled:opacity-40 transition-all shrink-0"
                >
                  Continuer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            ÉTAPE 2 : CHOIX DU MODÈLE, CLASSE/KV & TRACABILITÉ S/N
            ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Étape 2 sur 4</span>
                <h2 className="text-xl font-black tracking-tight text-neutral-900 mt-0.5">
                  Précisez le modèle et la référence : <span className="underline decoration-black">{selectedBrand}</span>
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Sélectionnez la gamme de votre pièce ou renseignez son numéro de série / référence de lot.
                </p>
              </div>

              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-neutral-600 hover:text-black flex items-center gap-1 border border-neutral-200 px-3 py-1.5 rounded-lg hover:border-black"
              >
                Changer de marque
              </button>
            </div>

            {/* Modèles issus du catalogue Multi-Motors */}
            {isMotor && motorBrandData && motorBrandData.models.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-neutral-700">
                  Modèles répertoriés ({motorBrandData.models.length} modèles trouvés sur Multi-Motors) :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {motorBrandData.models.map((m: any) => {
                    const isSelected = selectedModel === m.name;
                    return (
                      <button
                        key={m.name}
                        onClick={() => {
                          setSelectedModel(m.name);
                          setCustomModel('');
                          if (m.kvs && m.kvs.length > 0) setSelectedKV(m.kvs[0]);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-black bg-black text-white shadow-xs'
                            : 'border-neutral-200 bg-white hover:border-black text-neutral-900'
                        }`}
                      >
                        <p className="text-xs font-bold truncate">{m.name}</p>
                        {m.classes && m.classes.length > 0 && (
                          <p className={`text-[10px] mt-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                            Stator : {m.classes.join(', ')}
                          </p>
                        )}
                        {m.kvs && m.kvs.length > 0 && (
                          <p className={`text-[10px] mt-0.5 font-mono ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                            KV : {m.kvs.slice(0, 4).join(', ')}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Saisie personnalisée si modèle hors catalogue */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-neutral-800">
                  {isMotor ? 'Ou saisir un autre modèle :' : 'Modèle exact / Gamme :'}
                </label>
                <input
                  type="text"
                  placeholder="Ex: F60 PRO V 1950KV, SpeedyBee F405 V4, etc."
                  value={customModel}
                  onChange={(e) => {
                    setCustomModel(e.target.value);
                    if (e.target.value) setSelectedModel('');
                  }}
                  className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-black bg-white"
                />
              </div>

              {/* Sélection KV / Taille pour les moteurs */}
              {isMotor && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-800">KV ou Tension LiPo :</label>
                  <input
                    type="text"
                    placeholder="Ex: 1950KV (6S) ou 2550KV (4S)"
                    value={selectedKV}
                    onChange={(e) => setSelectedKV(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-black bg-white"
                  />
                </div>
              )}
            </div>

            {/* CARTE DE TRAÇABILITÉ NUMÉRO DE SÉRIE / LOT (VISION ÉCOSYSTÈME) */}
            <div className="p-4 sm:p-5 rounded-2xl border border-neutral-300 bg-neutral-50/80 space-y-3">
              <div className="flex items-center gap-2">
                <Barcode className="w-4 h-4 text-neutral-700" />
                <span className="text-xs font-black uppercase tracking-wider text-neutral-900">
                  Suivi par Référence & Numéro de Série (S/N)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">
                  Optionnel mais recommandé
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Renseigner le numéro de série ou le numéro de lot gravé sur le composant permet à FixMyDrone et ses partenaires (Multi-Motors, MakeMyQuad, BindMyQuad) de corréler les pannes à des séries de fabrication spécifiques (rappels constructeurs, lots de roulements ou MOSFETs défectueux).
              </p>
              <div className="relative max-w-md">
                <Hash className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Ex: S/N 2024-F60-LOT8842 ou réf. gravée"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-black bg-white font-mono"
                />
              </div>
            </div>

            {/* Bouton pour passer à l'étape 3 */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-neutral-600 hover:text-black"
              >
                ← Retour
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                disabled={!selectedModel && !customModel}
                className="px-6 py-2.5 text-xs font-black uppercase tracking-wider bg-black text-white rounded-xl hover:bg-neutral-800 disabled:opacity-40 transition-all flex items-center gap-2 shadow-xs"
              >
                <span>Étape suivante : Diagnostic du problème</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            ÉTAPE 3 : QUESTIONS COURTES SUR LES CIRCONSTANCES & SYMPTÔMES
            ========================================================================= */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Étape 3 sur 4</span>
                <h2 className="text-xl font-black tracking-tight text-neutral-900 mt-0.5">
                  Questions courtes : Que se passe-t-il exactement ?
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Composant ciblé : <span className="font-bold text-black">{selectedBrand} {selectedModel || customModel}</span> {serialNumber ? `(S/N: ${serialNumber})` : ''}
                </p>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="text-xs font-bold text-neutral-600 hover:text-black flex items-center gap-1 border border-neutral-200 px-3 py-1.5 rounded-lg hover:border-black"
              >
                Modifier le modèle
              </button>
            </div>

            {/* Question A : Circonstance */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-800 flex items-center gap-2">
                <span>1. Quand le problème est-il survenu ?</span>
                <span className="text-neutral-400 font-normal text-[11px]">(Circonstance d apparition)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {def.circumstances.map((circ) => {
                  const isSelected = selectedCircumstance === circ.id;
                  return (
                    <button
                      key={circ.id}
                      onClick={() => setSelectedCircumstance(circ.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-black bg-black text-white shadow-xs'
                          : 'border-neutral-200 bg-white hover:border-black text-neutral-900'
                      }`}
                    >
                      <p className="text-xs font-bold">{circ.label}</p>
                      {circ.description && (
                        <p className={`text-[11px] mt-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {circ.description}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question B : Symptôme précis */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-800 flex items-center gap-2">
                <span>2. Quel est le symptôme principal observé ?</span>
                <span className="text-neutral-400 font-normal text-[11px]">(Sélectionnez le cas le plus proche)</span>
              </label>
              <div className="space-y-2.5">
                {def.symptoms.map((symp) => {
                  const isSelected = selectedSymptomId === symp.id;
                  return (
                    <div
                      key={symp.id}
                      onClick={() => setSelectedSymptomId(symp.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-black bg-neutral-50 ring-2 ring-black shadow-xs'
                          : 'border-neutral-200 bg-white hover:border-neutral-400'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="symptom"
                            checked={isSelected}
                            onChange={() => setSelectedSymptomId(symp.id)}
                            className="mt-1 accent-black"
                          />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-black text-neutral-900">{symp.title}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                symp.severity === 'critique'
                                  ? 'bg-rose-100 text-rose-700'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {symp.severity}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                              {symp.description}
                            </p>
                            <p className="text-[11px] text-neutral-500 font-medium mt-1">
                              Cause probable identifiée : <span className="text-neutral-800 font-bold">{symp.likelyCause}</span>
                            </p>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="px-2.5 py-1 rounded bg-black text-white text-[10px] font-black tracking-wider uppercase shrink-0">
                            Sélectionné
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Question C : Observations rapides (Checkboxes) */}
            {def.quickObservations && def.quickObservations.length > 0 && (
              <div className="space-y-3 p-4 rounded-2xl border border-neutral-200 bg-neutral-50/60">
                <label className="text-xs font-black uppercase tracking-wider text-neutral-800">
                  3. Observations complémentaires au banc d essai :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {def.quickObservations.map((obs) => {
                    const isChecked = Boolean(checkedObservations[obs.id]);
                    return (
                      <label
                        key={obs.id}
                        className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer text-xs transition-all ${
                          isChecked
                            ? 'bg-white border-black text-black font-semibold'
                            : 'bg-white/80 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            setCheckedObservations((prev) => ({
                              ...prev,
                              [obs.id]: e.target.checked,
                            }));
                          }}
                          className="accent-black w-4 h-4 rounded"
                        />
                        <span>{obs.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question D : Champ libre */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">
                Précisions ou circonstances particulières (facultatif) :
              </label>
              <textarea
                rows={3}
                placeholder="Ex: Le quad est tombé dans l herbe haute, puis au décollage suivant le moteur vibrait fortement..."
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-black bg-white"
              />
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
              <button
                onClick={() => setCurrentStep(2)}
                className="text-xs font-bold text-neutral-600 hover:text-black"
              >
                ← Retour au modèle
              </button>
              <button
                onClick={handleLaunchAI}
                disabled={!selectedSymptomId || isAnalyzing}
                className="px-6 py-3 text-xs font-black uppercase tracking-wider bg-black text-white rounded-xl hover:bg-neutral-800 disabled:opacity-40 transition-all flex items-center gap-2.5 shadow-md"
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyse IA & Forum en cours...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Lancer le Diagnostic IA FixMyDrone</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            ÉTAPE 4 : RÉSOLUTION IA & FORUM ALIMENTÉ PAR LA COMMUNAUTÉ
            ========================================================================= */}
        {currentStep === 4 && (
          <div className="space-y-8">
            {/* EN-TÊTE DU RÉSULTAT */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-white">
                    DIAGNOSTIC FINALISÉ
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    ID-{selectedBrand.toUpperCase()}-{componentId.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900">
                  Résolution pour {selectedBrand} {selectedModel || customModel}
                </h2>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Symptôme ciblé : <span className="font-bold text-black">{currentSymptom?.title}</span>
                  {serialNumber ? ` • S/N : ${serialNumber}` : ''}
                </p>
              </div>

              <button
                onClick={handleReset}
                className="text-xs font-bold text-neutral-600 hover:text-black flex items-center gap-1.5 border border-neutral-200 px-3.5 py-2 rounded-xl hover:border-black self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Nouveau diagnostic</span>
              </button>
            </div>

            {/* GRILLE 2 COLONNES : IA À GAUCHE, FORUM COMMUNAUTAIRE À DROITE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* ================= COLONNE GAUCHE (7/12) : DIAGNOSTIC IA ================= */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Carte de cause racine */}
                <div className="p-5 sm:p-6 rounded-2xl border-2 border-black bg-white shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-900">
                      <Cpu className="w-4 h-4" />
                      <span>Cause Racine Détectée par l IA</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-black text-white text-xs font-black tracking-wider">
                      {currentSymptom?.aiDiagnostic.probability}% DE CERTITUDE
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-black text-neutral-900">
                      {currentSymptom?.aiDiagnostic.rootCause}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-700 mt-2 leading-relaxed">
                      {currentSymptom?.aiDiagnostic.explanation}
                    </p>
                  </div>

                  {/* Avertissement sécurité */}
                  {currentSymptom?.aiDiagnostic.safetyWarning && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <p className="text-xs font-bold text-amber-900 leading-snug">
                        {currentSymptom.aiDiagnostic.safetyWarning}
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. Protocole de test de sécurité */}
                <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 bg-neutral-50/80 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Protocole de Test Étape par Étape</span>
                  </div>
                  <ol className="space-y-2.5 text-xs text-neutral-800 list-decimal pl-5">
                    {currentSymptom?.aiDiagnostic.testSteps.map((step, idx) => (
                      <li key={idx} className="leading-relaxed pl-1 font-medium">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* 3. Procédure de réparation recommandée */}
                <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 bg-white space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-900">
                    <Wrench className="w-4 h-4" />
                    <span>Procédure de Réparation & Correctif</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-neutral-800">
                    {currentSymptom?.aiDiagnostic.recommendedFix.map((fix, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                        <span>{fix}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Outils & pièces */}
                  <div className="pt-3 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                        Outils Recommandés :
                      </span>
                      <p className="font-medium text-neutral-800">
                        {currentSymptom?.aiDiagnostic.toolsNeeded.join(', ')}
                      </p>
                    </div>
                    {currentSymptom?.aiDiagnostic.partsToReplace && (
                      <div>
                        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                          Pièces à Prévoir :
                        </span>
                        <p className="font-medium text-neutral-800">
                          {currentSymptom.aiDiagnostic.partsToReplace.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ================= COLONNE DROITE (5/12) : FORUM QUI ALIMENTE L'IA ================= */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-5 rounded-2xl border-2 border-neutral-900 bg-neutral-900 text-white space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-black uppercase tracking-wider text-white">
                        Discussions Forum FixMyDrone
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 text-white uppercase">
                      Alimente l IA
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Cette recommandation IA est continuellement affinée par les retours d expérience des pilotes sur le forum. Voici les discussions réelles qui ont résolu ce cas :
                  </p>

                  {/* Liste des posts correspondants */}
                  <div className="space-y-3 pt-1">
                    {matchingForumPosts.length > 0 ? (
                      matchingForumPosts.slice(0, 3).map((post) => (
                        <div
                          key={post.id}
                          className="p-3.5 rounded-xl bg-white/10 border border-white/10 hover:border-white/30 transition-all text-left space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-white line-clamp-1">
                              {post.title}
                            </span>
                            {post.isResolved && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase shrink-0">
                                Résolu ✓
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed">
                            💡 <span className="font-bold text-white">Solution pilote :</span> {post.solutionSummary}
                          </p>

                          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1">
                            <span>Par {post.author.callsign} ({post.author.badge})</span>
                            <span>{post.replies} réponses</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center text-xs text-neutral-400">
                        Aucun post forum exact sur cette référence rare. Vous pouvez être le premier à poser la question ci-dessous !
                      </div>
                    )}
                  </div>

                  {/* Bouton pour ouvrir un nouveau sujet avec le pré-diagnostic */}
                  <button
                    onClick={() => setForumModalOpen(true)}
                    className="w-full py-3 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Créer un sujet sur le forum avec ce diagnostic</span>
                  </button>
                </div>

                {/* BANDEAU CATALOGUE PARTENAIRE (Multi-Motors, BindMyQuad, etc.) */}
                {sisterSite && (
                  <div className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-widest text-neutral-500">
                        Écosystème Partenaire
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-800">
                        {sisterSite.catalogCount}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-neutral-900">{sisterSite.name}</h4>
                      <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                        {sisterSite.role}
                      </p>
                    </div>

                    <a
                      href={sisterSite.domain}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-black hover:underline pt-1"
                    >
                      <span>Consulter la fiche technique et les bancs d essai sur {sisterSite.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL DE CRÉATION DE POST FORUM PRÉ-REMPLI */}
      {forumModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-black max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-black" />
                <h3 className="text-base font-black text-neutral-900">
                  Poser une question sur le forum FixMyDrone
                </h3>
              </div>
              <button
                onClick={() => setForumModalOpen(false)}
                className="text-neutral-400 hover:text-black font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {forumPostSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-black text-neutral-900">Votre sujet a été publié sur le forum !</h4>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                  La communauté et les pilotes experts ont été notifiés de votre référence ({selectedBrand} {selectedModel || customModel}) et de votre pré-diagnostic.
                </p>
                <button
                  onClick={() => {
                    setForumModalOpen(false);
                    setForumPostSuccess(false);
                  }}
                  className="px-6 py-2 text-xs font-bold bg-black text-white rounded-xl"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-neutral-600">
                  Votre question sera pré-remplie avec le modèle exact et les résultats de l analyse IA pour obtenir une réponse rapide :
                </p>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-700">Titre du sujet :</label>
                  <input
                    type="text"
                    defaultValue={`[Aide] ${selectedBrand} ${selectedModel || customModel} - ${currentSymptom?.title}`}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-700">Description & Pré-diagnostic IA :</label>
                  <textarea
                    rows={6}
                    defaultValue={`Bonjour à la communauté,\n\nJ'ai un problème sur mon ${selectedBrand} ${selectedModel || customModel} ${selectedKV ? `(${selectedKV})` : ''} ${serialNumber ? `(S/N: ${serialNumber})` : ''}.\n\nCirconstances : ${selectedCircumstance}\nSymptôme constaté : ${currentSymptom?.title}\n\nL'IA de pré-diagnostic suggère : "${currentSymptom?.aiDiagnostic.rootCause}" (${currentSymptom?.aiDiagnostic.probability}% certitude).\n${userNotes ? `Précisions : ${userNotes}\n` : ''}\nQu'en pensez-vous ? Quelqu'un a déjà rencontré ce cas sur ce lot ?`}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-black font-mono text-[11px]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200">
                  <button
                    onClick={() => setForumModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-neutral-600 hover:text-black"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => setForumPostSuccess(true)}
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
