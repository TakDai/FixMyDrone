'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { FigmaComponentData } from '@/data/figmaComponents';
import { getComponentReliabilityStats } from '@/data/componentReliabilityStats';
import { getGeneralGuidesForComponent } from '@/data/componentGenericsGuides';
import { saveDynamicResolution } from '@/data/dynamicResolutions';
import { TroubleshootWizard } from './TroubleshootWizard';
import {
  X,
  Wrench,
  Cpu,
  Star,
  BookOpen,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Send,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

type ModalIntent = 'issues' | 'specs' | 'reviews' | 'guides' | 'addFix';

interface ComponentDetailModalProps {
  component: FigmaComponentData | null;
  onClose: () => void;
}

export function ComponentDetailModal({ component, onClose }: ComponentDetailModalProps) {
  const [selectedIntent, setSelectedIntent] = useState<ModalIntent | null>(null);
  const [customFixes, setCustomFixes] = useState<{
    [compId: string]: { issue: string; fix: string; author: string }[];
  }>({});

  // Champs pour ajouter un nouveau fix
  const [newIssue, setNewIssue] = useState('');
  const [newFix, setNewFix] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const targetId = useMemo(() => {
    if (!component) return '';
    switch (component.id) {
      case 'motor':
        return 'motors';
      case 'fatshark':
        return 'goggle';
      case 'tango':
        return 'radio';
      case 'betaflight':
        return 'configurator';
      default:
        return component.id;
    }
  }, [component]);

  const reliabilityStats = useMemo(() => {
    if (!component) return null;
    return getComponentReliabilityStats(targetId, component.model, component.name);
  }, [component, targetId]);

  const generalGuides = useMemo(() => {
    if (!component) return [];
    return getGeneralGuidesForComponent(targetId);
  }, [component, targetId]);

  if (!component) return null;

  const currentCustomFixes = customFixes[component.id] || [];
  const totalIssuesCount = component.commonIssues.length + currentCustomFixes.length;

  const handleAddFixSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIssue || !newFix) return;

    const item = {
      issue: newIssue,
      fix: newFix,
      author: authorName.trim() || 'Pilote_Atelier',
    };

    setCustomFixes((prev) => ({
      ...prev,
      [component.id]: [item, ...(prev[component.id] || [])],
    }));

    saveDynamicResolution({
      componentId: targetId,
      brand: component.model,
      issue: item.issue,
      fix: item.fix,
      author: item.author,
    });

    setNewIssue('');
    setNewFix('');
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setSelectedIntent('issues');
    }, 1000);
  };

  const categories: {
    id: ModalIntent;
    title: string;
    subtitle: string;
    badge?: string;
    icon: React.ReactNode;
    accentClass?: string;
  }[] = [
    {
      id: 'issues',
      title: 'Diagnostic Guidé — Résoudre une Panne',
      subtitle: 'Identification (Marque, Gamme, Référence), questions enchaînées ou prompt et solutions d’atelier.',
      badge: `${totalIssuesCount} fiches`,
      icon: <Wrench className="w-5 h-5" />,
    },
    {
      id: 'specs',
      title: 'Trouver des Specs Techniques',
      subtitle: 'Tensions, formats de montage, protocoles, poids et compatibilités matérielles.',
      badge: `${Object.keys(component.specifications).length} specs`,
      icon: <Cpu className="w-5 h-5" />,
    },
    {
      id: 'reviews',
      title: 'Avoir un Avis sur ce composant',
      subtitle: 'Fiabilité terrain, retours de la communauté FPV, points forts et points d’attention.',
      badge: reliabilityStats ? `${reliabilityStats.overallReliabilityScore}/10` : 'Communauté',
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: 'guides',
      title: 'Installer, Câbler & Configurer',
      subtitle: 'Guides de montage, procédures de bind, commandes CLI Betaflight et bonnes pratiques.',
      badge: generalGuides.length > 0 ? `${generalGuides.length} guide${generalGuides.length > 1 ? 's' : ''}` : 'Bonnes pratiques',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: 'addFix',
      title: 'Partager un Fix ou un Retour',
      subtitle: 'Vous avez résolu un souci sur cette pièce ? Ajoutez votre solution pour aider les pilotes.',
      icon: <Plus className="w-5 h-5" />,
      accentClass: 'bg-[#cbf3d2]/30 hover:bg-[#cbf3d2]/55',
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${
          selectedIntent === 'issues' ? 'max-w-4xl' : 'max-w-2xl'
        } bg-white border-[1.5px] border-dashed border-black rounded-3xl p-5 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto transition-all`}
      >
        {/* Bouton fermeture */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-black hover:bg-zinc-100 transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header du composant */}
        <div className="border-b-[1.5px] border-dashed border-black pb-4 mb-5 pr-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
            <span>{component.category}</span>
            <span>•</span>
            <span className="font-bold text-black">{component.model}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-black">
            {component.name}
          </h2>
          <p className="text-xs text-zinc-600 mt-1 italic">
            {component.role}
          </p>
        </div>

        {/* ÉTAPE 1 : Choix de la catégorie / intention utilisateur */}
        {selectedIntent === null && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-black">
                Que recherchez-vous pour ce composant ?
              </p>
              <span className="text-[10px] font-mono text-zinc-500">
                Étape 1 / 2
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedIntent(cat.id)}
                  className={`group w-full text-left p-4 rounded-2xl border-[1.5px] border-dashed border-black/70 hover:border-solid hover:border-black transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    cat.accentClass || 'bg-zinc-50/70 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl border border-black bg-white flex items-center justify-center shrink-0 text-black group-hover:bg-black group-hover:text-white transition-colors">
                      {cat.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-black">
                          {cat.title}
                        </h3>
                        {cat.badge && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black text-white">
                            {cat.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ÉTAPE 2 : Barre de retour + navigation rapide entre catégories */}
        {selectedIntent !== null && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-zinc-200">
              <button
                onClick={() => setSelectedIntent(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Toutes les catégories</span>
              </button>

              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    { id: 'issues', label: 'Pannes' },
                    { id: 'specs', label: 'Specs' },
                    { id: 'reviews', label: 'Avis' },
                    { id: 'guides', label: 'Guides' },
                    { id: 'addFix', label: '+ Fix' },
                  ] as { id: ModalIntent; label: string }[]
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedIntent(tab.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedIntent === tab.id
                        ? 'bg-black text-white font-bold'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CATÉGORIE 1 : Résoudre une Panne (Cheminement Marque -> Gamme -> Référence -> Contexte -> Diagnostic) */}
            {selectedIntent === 'issues' && (
              <div className="space-y-4">
                <TroubleshootWizard component={component} targetId={targetId} />

                {currentCustomFixes.length > 0 && (
                  <div className="pt-3 border-t border-zinc-200 space-y-2">
                    <div className="text-[11px] font-mono uppercase font-bold text-zinc-500">
                      Fixes ajoutés dans cette session
                    </div>
                    {currentCustomFixes.map((cf, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-[#cbf3d2]/20 border border-emerald-600/40 space-y-1 text-xs"
                      >
                        <div className="font-bold text-black flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{cf.issue}</span>
                        </div>
                        <p className="text-zinc-700">{cf.fix}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CATÉGORIE 2 : Trouver des Specs Techniques */}
            {selectedIntent === 'specs' && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {component.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {Object.entries(component.specifications).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-3 rounded-xl border border-zinc-200 bg-zinc-50 flex justify-between gap-2"
                    >
                      <span className="text-zinc-500">{key} :</span>
                      <span className="font-bold text-black font-mono text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CATÉGORIE 3 : Avoir un Avis sur ce composant */}
            {selectedIntent === 'reviews' && reliabilityStats && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl border border-black/20 bg-zinc-50 text-center">
                    <div className="text-[10px] font-mono uppercase text-zinc-500">Fiabilité</div>
                    <div className="text-xl font-black text-black mt-0.5">
                      {reliabilityStats.overallReliabilityScore}/10
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-black/20 bg-zinc-50 text-center">
                    <div className="text-[10px] font-mono uppercase text-zinc-500">Taux de résolution</div>
                    <div className="text-xl font-black text-emerald-700 mt-0.5">
                      {reliabilityStats.resolutionSuccessRate}%
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-black/20 bg-zinc-50 text-center">
                    <div className="text-[10px] font-mono uppercase text-zinc-500">Retours terrain</div>
                    <div className="text-xl font-black text-black mt-0.5">
                      {reliabilityStats.totalReportedIncidents}
                    </div>
                  </div>
                </div>

                {reliabilityStats.knownBatchBulletins.length > 0 && (
                  <div className="p-4 rounded-2xl border-[1.5px] border-dashed border-black/60 bg-amber-50/40 space-y-2">
                    <div className="font-bold text-black flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Points d’attention & retours pilotes</span>
                    </div>
                    <ul className="space-y-1.5 text-zinc-700 list-disc pl-4">
                      {reliabilityStats.knownBatchBulletins.map((note, idx) => (
                        <li key={idx} className="leading-relaxed">{note}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {reliabilityStats.topFailureCauses.length > 0 && (
                  <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/70 space-y-2.5">
                    <div className="font-bold text-black flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" />
                      <span>Ce qui revient le plus souvent dans les avis</span>
                    </div>
                    <div className="space-y-2">
                      {reliabilityStats.topFailureCauses.slice(0, 3).map((cause, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3 text-[11px]">
                          <span className="text-zinc-700">{cause.cause}</span>
                          <span className="font-mono font-bold text-black shrink-0">
                            {cause.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CATÉGORIE 4 : Installer, Câbler & Configurer */}
            {selectedIntent === 'guides' && (
              <div className="space-y-4 text-xs">
                {generalGuides.length > 0 ? (
                  generalGuides.map((guide) => (
                    <div
                      key={guide.id}
                      className="p-4 rounded-2xl border-[1.5px] border-dashed border-black/60 bg-zinc-50/70 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-sm text-black">{guide.title}</h4>
                          <p className="text-[11px] text-zinc-500 mt-0.5">{guide.tagline}</p>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black text-white shrink-0">
                          {guide.globalIndexLabel}
                        </span>
                      </div>
                      <p className="text-zinc-700 leading-relaxed">{guide.description}</p>
                      {guide.keyRules.length > 0 && (
                        <div className="p-3 rounded-xl bg-white border border-black/15 space-y-1">
                          <div className="font-bold text-black text-[11px]">Règles clés à vérifier :</div>
                          <ul className="list-disc pl-4 space-y-1 text-[11px] text-zinc-700">
                            {guide.keyRules.map((rule, rIdx) => (
                              <li key={rIdx}>{rule}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-5 rounded-2xl border-[1.5px] border-dashed border-black/50 bg-zinc-50 space-y-2">
                    <h4 className="font-bold text-sm text-black">
                      Installation & configuration : {component.name}
                    </h4>
                    <p className="text-zinc-600 leading-relaxed">
                      {component.description}
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      Astuce : consultez l’onglet <strong>Specs</strong> pour vérifier les tensions et compatibilités avant câblage, ou lancez le diagnostic guidé ci-dessous pour obtenir une procédure pas-à-pas.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* CATÉGORIE 5 : Partager un Fix */}
            {selectedIntent === 'addFix' && (
              <form onSubmit={handleAddFixSubmit} className="space-y-4 text-xs">
                {justAdded ? (
                  <div className="py-8 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-black text-sm">Votre fix a été ajouté avec succès !</h4>
                    <p className="text-zinc-500 text-xs">Il est maintenant interconnecté à la fiche du composant.</p>
                  </div>
                ) : (
                  <>
                    <p className="text-zinc-600 text-xs">
                      Vous avez résolu une panne sur votre <strong className="text-black">{component.name}</strong> ? Partagez la solution pour les autres pilotes.
                    </p>

                    <div>
                      <label className="block font-bold text-black mb-1">
                        Problème ou symptôme rencontré *
                      </label>
                      <input
                        type="text"
                        value={newIssue}
                        onChange={(e) => setNewIssue(e.target.value)}
                        placeholder="ex: Cloche qui frotte après impact, écran noir en 6S..."
                        className="w-full p-2.5 border-[1.5px] border-dashed border-black rounded-xl text-black focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-black mb-1">
                        Solution / Réparation appliquée *
                      </label>
                      <textarea
                        value={newFix}
                        onChange={(e) => setNewFix(e.target.value)}
                        rows={3}
                        placeholder="ex: Remplacement du roulement 684ZZ, ou réglage PWM dans Bluejay..."
                        className="w-full p-2.5 border-[1.5px] border-dashed border-black rounded-xl text-black focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-black mb-1">
                        Votre pseudo pilote
                      </label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Dousile"
                        className="w-full p-2.5 border border-zinc-300 rounded-xl text-black focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#cbf3d2] hover:bg-[#b8ebbff0] text-black font-bold border border-black uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Publier sur FixMyDrone</span>
                    </button>
                  </>
                )}
              </form>
            )}
          </>
        )}

        {/* Pied de pop-up : accès optionnel au forum et fermeture */}
        <div className="mt-6 pt-4 border-t-[1.5px] border-dashed border-black/30 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-black/25 hover:border-black text-xs font-medium text-zinc-700 hover:text-black transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Voir le forum</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-black/25 hover:border-black text-xs font-bold text-black transition-colors cursor-pointer"
          >
            <span>Fermer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
