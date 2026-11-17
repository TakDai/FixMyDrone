'use client';

import React, { useState } from 'react';
import { FigmaComponentData } from '@/data/figmaComponents';
import { X, Wrench, CheckCircle2, AlertTriangle, Send, Plus, Sparkles, MessageSquare } from 'lucide-react';

interface ComponentDetailModalProps {
  component: FigmaComponentData | null;
  onClose: () => void;
}

export function ComponentDetailModal({ component, onClose }: ComponentDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'issues' | 'specs' | 'addFix'>('issues');
  const [customFixes, setCustomFixes] = useState<{ [compId: string]: { issue: string; fix: string; author: string }[] }>({});
  
  // Champs pour ajouter un nouveau fix
  const [newIssue, setNewIssue] = useState('');
  const [newFix, setNewFix] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  if (!component) return null;

  const currentCustomFixes = customFixes[component.id] || [];

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

    setNewIssue('');
    setNewFix('');
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setActiveTab('issues');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-2xl bg-white border-[1.5px] border-dashed border-black rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        
        {/* Bouton fermeture */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-black hover:bg-zinc-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header du composant */}
        <div className="border-b-[1.5px] border-dashed border-black pb-4 mb-6">
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

        {/* Onglets style Seeworld */}
        <div className="flex border-b border-black mb-6">
          <button
            onClick={() => setActiveTab('issues')}
            className={`py-2 px-4 text-xs font-medium uppercase tracking-wider transition-colors ${
              activeTab === 'issues'
                ? 'border-b-2 border-black font-bold text-black'
                : 'text-zinc-500 hover:text-black'
            }`}
          >
            Pannes Répertoriées ({component.commonIssues.length + currentCustomFixes.length})
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-2 px-4 text-xs font-medium uppercase tracking-wider transition-colors ${
              activeTab === 'specs'
                ? 'border-b-2 border-black font-bold text-black'
                : 'text-zinc-500 hover:text-black'
            }`}
          >
            Spécifications
          </button>
          <button
            onClick={() => setActiveTab('addFix')}
            className={`py-2 px-4 text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              activeTab === 'addFix'
                ? 'border-b-2 border-black font-bold text-black bg-[#cbf3d2]/40'
                : 'text-zinc-500 hover:text-black'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajouter un Fix</span>
          </button>
        </div>

        {/* Contenu de l'onglet Pannes */}
        {activeTab === 'issues' && (
          <div className="space-y-4">
            {/* Fixes ajoutés par l'utilisateur */}
            {currentCustomFixes.map((cf, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#cbf3d2]/20 border border-emerald-600/40 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-black flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {cf.issue}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Fix Pilote Récent
                  </span>
                </div>
                <p className="text-zinc-700 leading-relaxed">
                  <strong>Solution d atelier : </strong>
                  {cf.fix}
                </p>
                <div className="text-[10px] text-zinc-500 pt-1">
                  Par <span className="font-semibold text-black">@{cf.author}</span> • Vérifié par la communauté FixMyDrone
                </div>
              </div>
            ))}

            {/* Pannes de référence */}
            {component.commonIssues.map((issue, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border-[1.5px] border-dashed border-black/60 bg-zinc-50/70 space-y-2.5 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-sm text-black flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{issue.title}</span>
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black text-white shrink-0">
                    {issue.successRate}% succès
                  </span>
                </div>

                <div className="space-y-1 text-zinc-600 text-[11px]">
                  <p>
                    <strong className="text-black">Symptôme : </strong>
                    {issue.symptoms}
                  </p>
                  <p>
                    <strong className="text-black">Cause : </strong>
                    {issue.cause}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-black/20 text-zinc-800 text-xs">
                  <p className="leading-relaxed">
                    <strong className="text-black">Fix recommandé : </strong>
                    {issue.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contenu de l'onglet Spécifications */}
        {activeTab === 'specs' && (
          <div className="space-y-3">
            <p className="text-xs text-zinc-600 mb-4">{component.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(component.specifications).map(([key, val]) => (
                <div key={key} className="p-3 rounded-xl border border-zinc-200 bg-zinc-50 flex justify-between">
                  <span className="text-zinc-500">{key} :</span>
                  <span className="font-bold text-black font-mono">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contenu de l'onglet Ajouter un Fix */}
        {activeTab === 'addFix' && (
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

      </div>
    </div>
  );
}
