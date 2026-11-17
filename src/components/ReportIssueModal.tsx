'use client';

import React, { useState } from 'react';
import { X, Wrench, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';
import { ComponentCategory } from '@/types';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedComponent?: string;
  onSubmitSuccess?: (issueTitle: string) => void;
}

export function ReportIssueModal({
  isOpen,
  onClose,
  preselectedComponent = '',
  onSubmitSuccess,
}: ReportIssueModalProps) {
  const [component, setComponent] = useState(preselectedComponent || 'Moteurs Brushless');
  const [title, setTitle] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [cause, setCause] = useState('');
  const [solution, setSolution] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      if (onSubmitSuccess) onSubmitSuccess(title);
      setSubmitted(false);
      setTitle('');
      setSymptoms('');
      setCause('');
      setSolution('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Signaler une Panne ou un Fix
            </h3>
            <p className="text-xs text-zinc-400">
              Aidez la communauté FPV en répertoriant votre panne et sa solution.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-white">Merci Pilote !</h4>
            <p className="text-xs text-zinc-400">
              Votre signalement a été indexé sur FixMyDrone et sera rattaché à la fiche matériel.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-zinc-300 mb-1">
                Composant ou Pièce concernée
              </label>
              <input
                type="text"
                value={component}
                onChange={(e) => setComponent(e.target.value)}
                placeholder="ex: Moteur T-Motor F60, Stack SpeedyBee, DJI O3..."
                className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-300 mb-1">
                Intitulé de la panne *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ex: Desync en sortie de dive à 80% de gaz"
                className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-300 mb-1">
                Symptômes observés
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Bruit bizarre, chauffe, coupure vidéo, alerte Betaflight..."
                rows={2}
                className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-300 mb-1">
                Solution / Fix trouvé (si résolu)
              </label>
              <textarea
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="Ressoudage pad, flash firmware, condo 1000uF, réglage filtre PID..."
                rows={2}
                className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Publier sur FixMyDrone</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
