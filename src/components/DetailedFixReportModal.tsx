'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Award,
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  Zap,
  Tag,
  HelpCircle,
  FileText
} from 'lucide-react';
import { DetailedFixReport } from '@/data/pilotGamification';

interface DetailedFixReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  componentName: string;
  componentCategory: string;
  modelExact?: string;
  serialNumber?: string;
  onReportSubmitted: (report: Omit<DetailedFixReport, 'id' | 'createdAt' | 'xpEarned'>) => void;
}

const COMMON_FPV_TOOLS = [
  'Fer à souder (350°C-400°C)',
  'Multimètre (Test de continuité)',
  'Smoke Stopper / Fusible LiPo',
  'Betaflight Configurator (CLI)',
  'Pince brucelle de précision',
  'Loupe d atelier / Microscope',
  'Frein filet bleu (Loctite 243)',
  'Gaine thermorétractable',
  'Testeur de moteur servo',
  'Roulements de rechange',
];

export function DetailedFixReportModal({
  isOpen,
  onClose,
  componentName,
  componentCategory,
  modelExact,
  serialNumber,
  onReportSubmitted,
}: DetailedFixReportModalProps) {
  const [exactRootCause, setExactRootCause] = useState('');
  const [perceivedDifficulty, setPerceivedDifficulty] = useState<number>(5);
  const [timeSpentMinutes, setTimeSpentMinutes] = useState<number>(30);
  const [selectedTools, setSelectedTools] = useState<string[]>([
    'Fer à souder (350°C-400°C)',
    'Multimètre (Test de continuité)',
  ]);
  const [keyAdvice, setKeyAdvice] = useState('');
  const [replacedPart, setReplacedPart] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exactRootCause.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onReportSubmitted({
        componentCategory,
        componentName,
        modelExact,
        serialNumber,
        exactRootCause: exactRootCause.trim(),
        perceivedDifficulty,
        timeSpentMinutes,
        toolsUsed: selectedTools,
        keyAdvice: keyAdvice.trim() || 'Aucun commentaire additionnel.',
        replacedPart: replacedPart.trim() || undefined,
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl border-2 border-black max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* EN-TÊTE DE LA MODALE */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 bg-neutral-50/90 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black text-xs shrink-0">
              <FileText className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black text-white">
                  RAPPORT D ATELIER PILOTE
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-800 border border-emerald-500/30">
                  +150 XP & BADGE À LA CLÉ
                </span>
              </div>
              <h3 className="text-base font-black text-neutral-900 mt-0.5">
                Renseigner la Résolution pour la Communauté
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-neutral-200 hover:border-black flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* CORPS DU FORMULAIRE */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Rappel du matériel dépanné */}
          <div className="p-3.5 rounded-2xl bg-neutral-900 text-white flex items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                Composant Dépanné :
              </span>
              <span className="font-black text-sm text-white">
                {modelExact || componentName}
              </span>
              {serialNumber && (
                <span className="text-[10px] font-mono text-amber-300 block">
                  Lot / S/N : {serialNumber}
                </span>
              )}
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-right">
              <span className="text-[10px] text-neutral-300 block">Récompense Pilote</span>
              <span className="text-xs font-black text-emerald-400">+150 XP</span>
            </div>
          </div>

          {/* 1. Cause exacte de la panne */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-neutral-800 flex items-center justify-between">
              <span>1. Cause exacte constatée lors du dépannage * :</span>
              <span className="text-[10px] text-neutral-400 font-normal">Chirurgical et précis</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Ex: Soudure froide sur le pad de la phase 3 de l'ESC 4-en-1 causant un micro-arc électrique et du stuttering à 1400KV. Refait avec étain Sn60Pb40 à 380°C."
              value={exactRootCause}
              onChange={(e) => setExactRootCause(e.target.value)}
              className="w-full p-3 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-black bg-white leading-relaxed"
            />
          </div>

          {/* 2. Difficulté ressentie (1 à 10) & Temps passé */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-800 flex items-center justify-between">
                <span>2. Difficulté éprouvée (1 à 10) :</span>
                <span className="font-mono font-bold text-black">{perceivedDifficulty}/10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={perceivedDifficulty}
                onChange={(e) => setPerceivedDifficulty(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-semibold">
                <span>1/10 (Très facile)</span>
                <span>5/10 (Moyen)</span>
                <span>10/10 (Expert)</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-800 flex items-center justify-between">
                <span>3. Temps passé pour réparer :</span>
                <span className="font-mono font-bold text-black">{timeSpentMinutes} min</span>
              </label>
              <select
                value={timeSpentMinutes}
                onChange={(e) => setTimeSpentMinutes(Number(e.target.value))}
                className="w-full p-2.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-none focus:border-black font-semibold"
              >
                <option value={10}>Moins de 15 minutes (Rapide)</option>
                <option value={30}>30 minutes (Moyen)</option>
                <option value={60}>1 heure (Recherche approfondie)</option>
                <option value={120}>2 heures ou plus (Diagnostic complexe)</option>
              </select>
            </div>
          </div>

          {/* 4. Outils et matériel utilisés */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-neutral-800 block">
              4. Outils & matériel ayant servi à la résolution :
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {COMMON_FPV_TOOLS.map((tool) => {
                const isChecked = selectedTools.includes(tool);
                return (
                  <button
                    type="button"
                    key={tool}
                    onClick={() => toggleTool(tool)}
                    className={`p-2 rounded-xl text-[11px] font-bold border text-left transition-all flex items-center gap-2 ${
                      isChecked
                        ? 'border-black bg-neutral-50 text-black shadow-2xs'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-400 bg-white'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-black border-black text-white' : 'border-neutral-300 bg-white'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </span>
                    <span className="truncate">{tool}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Astuce / Conseil clé pour la communauté */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-neutral-800 block">
              5. Astuce clé pour sauver un autre pilote ayant cette même panne :
            </label>
            <input
              type="text"
              placeholder="Ex: Toujours couper les vis à 6mm sur les bras carbone de 4mm pour éviter de percer le bobinage !"
              value={keyAdvice}
              onChange={(e) => setKeyAdvice(e.target.value)}
              className="w-full p-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-black bg-white"
            />
          </div>

          {/* 6. Pièce de remplacement (facultatif) */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-neutral-800 flex items-center justify-between">
              <span>6. Pièce de remplacement exacte (facultatif) :</span>
              <span className="text-[10px] text-neutral-400">Pour le suivi des pièces</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Roulement EZO 684zz inox ou Vis titane M3x7mm"
              value={replacedPart}
              onChange={(e) => setReplacedPart(e.target.value)}
              className="w-full p-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-black bg-white"
            />
          </div>

          {/* PIED DE MODALE ET BOUTON DE SOUMISSION */}
          <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Votre rapport sera rattaché au composant et valorisé sur le forum.</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold border border-neutral-300 rounded-xl hover:border-black"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !exactRootCause.trim()}
                className="flex-1 sm:flex-initial px-5 py-2.5 text-xs font-black uppercase tracking-wider bg-black text-white rounded-xl hover:bg-neutral-800 disabled:opacity-40 transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enregistrement...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-amber-300" />
                    <span>Valider & Réclamer +150 XP</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
