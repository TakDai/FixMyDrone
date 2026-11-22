'use client';

import React, { useState } from 'react';
import {
  X,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Gift,
  Flame,
  FileText
} from 'lucide-react';
import {
  PilotProfile,
  PILOT_LEVELS,
  ALL_PILOT_BADGES,
  PARTNER_REWARDS,
  getLevelFromXp
} from '@/data/pilotGamification';

interface PilotProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PilotProfile;
  onUpdateCallsign?: (newCallsign: string) => void;
}

export function PilotProfileModal({
  isOpen,
  onClose,
  profile,
  onUpdateCallsign,
}: PilotProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'rewards' | 'badges' | 'history'>('profile');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentLevelInfo = getLevelFromXp(profile.xp);
  const nextLevel = PILOT_LEVELS.find((l) => l.level === currentLevelInfo.level + 1);

  const progressPercent = nextLevel
    ? Math.min(
        100,
        Math.max(
          0,
          Math.round(
            ((profile.xp - currentLevelInfo.minXp) /
              (nextLevel.minXp - currentLevelInfo.minXp)) *
              100
          )
        )
      )
    : 100;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl border-2 border-black max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* EN-TÊTE DU PROFIL PILOTE */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 bg-neutral-900 text-white flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center font-black text-xl shrink-0 shadow-xs border border-white/20">
              {profile.callsign.slice(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-400 text-black">
                  NIV. {currentLevelInfo.level} • {currentLevelInfo.title}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {profile.xp} XP au total
                </span>
              </div>
              <h3 className="text-lg font-black text-white leading-tight">
                {profile.callsign}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/20 hover:border-white flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BARRE DE PROGRESSION DU NIVEAU */}
        <div className="p-4 bg-neutral-50 border-b border-neutral-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-neutral-700">
              Progression Niveau {currentLevelInfo.level} ({currentLevelInfo.title})
            </span>
            <span className="font-mono font-bold text-black">
              {nextLevel
                ? `${profile.xp} / ${nextLevel.minXp} XP (${nextLevel.minXp - profile.xp} XP restants)`
                : 'Niveau Maximum Atteint 🏆'}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-neutral-200 overflow-hidden">
            <div
              className="h-full bg-black rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ONGLETS DU PROFIL */}
        <div className="flex items-center gap-1 border-b border-neutral-200 px-5 pt-3 overflow-x-auto shrink-0 bg-white">
          {[
            { id: 'profile', label: 'Vue d ensemble & Stats' },
            { id: 'rewards', label: `Codes Récompenses (${PARTNER_REWARDS.length})` },
            { id: 'badges', label: `Badges (${profile.unlockedBadges.length}/${ALL_PILOT_BADGES.length})` },
            { id: 'history', label: `Rapports Soumis (${profile.historyReports.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-black text-black'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENU SELON L'ONGLET */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* ONGLET 1 : STATS & VUE D'ENSEMBLE */}
          {activeTab === 'profile' && (
            <div className="space-y-5">
              {/* Cartes de métriques */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-1">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Pannes Résolues
                  </span>
                  <span className="text-xl font-black text-black">
                    {profile.fixesResolvedCount}
                  </span>
                  <span className="text-[10px] text-neutral-500 block">+50 XP par validation</span>
                </div>

                <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-1">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Rapports d Atelier
                  </span>
                  <span className="text-xl font-black text-emerald-600">
                    {profile.detailedReportsCount}
                  </span>
                  <span className="text-[10px] text-neutral-500 block">+150 XP par rapport</span>
                </div>

                <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-1">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Votes Utiles Reçus
                  </span>
                  <span className="text-xl font-black text-purple-600">
                    {profile.communityHelpfulVotes}
                  </span>
                  <span className="text-[10px] text-neutral-500 block">Pilotes dépannés grâce à vous</span>
                </div>
              </div>

              {/* Avantages du niveau actuel */}
              <div className="p-4 rounded-2xl border border-neutral-200 bg-white space-y-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-black">
                    Vos Avantages Débloqués au Niveau {currentLevelInfo.level} :
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-700 list-disc pl-5">
                  {currentLevelInfo.perks.map((perk, idx) => (
                    <li key={idx} className="leading-snug font-medium">{perk}</li>
                  ))}
                </ul>
              </div>

              {/* Prochain palier */}
              {nextLevel && (
                <div className="p-4 rounded-2xl bg-neutral-900 text-white flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                      Prochain Palier : Niveau {nextLevel.level} ({nextLevel.title})
                    </span>
                    <span className="text-neutral-300 font-medium">
                      Débloque : {nextLevel.perks[1] || nextLevel.perks[0]}
                    </span>
                  </div>
                  <span className="font-mono font-black text-amber-300 text-sm">
                    +{nextLevel.minXp - profile.xp} XP
                  </span>
                </div>
              )}
            </div>
          )}

          {/* ONGLET 2 : RÉCOMPENSES & CODES PROMOS PARTENAIRES */}
          {activeTab === 'rewards' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-black text-neutral-900">
                  Codes & Avantages Exclusifs pour les Pilotes Contributeurs
                </h4>
                <p className="text-xs text-neutral-500">
                  Chaque panne résolue et renseignée débloque des réductions concrètes sur le matériel FPV partenaire.
                </p>
              </div>

              <div className="space-y-3">
                {PARTNER_REWARDS.map((rew) => {
                  const isUnlocked = profile.level >= rew.minLevelRequired;
                  return (
                    <div
                      key={rew.id}
                      className={`p-4 rounded-2xl border transition-all space-y-3 ${
                        isUnlocked
                          ? 'border-black bg-white shadow-xs'
                          : 'border-neutral-200 bg-neutral-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-neutral-900">
                            {rew.partnerName}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-100 text-neutral-600">
                            {rew.partnerDomain}
                          </span>
                        </div>

                        {isUnlocked ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white">
                            DÉBLOQUÉ ✓
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-200 text-neutral-600">
                            REQUIS : NIV. {rew.minLevelRequired}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-neutral-100">
                        <div>
                          <p className="text-xs font-bold text-neutral-900">
                            {rew.discountLabel}
                          </p>
                          <p className="text-[11px] text-neutral-500">
                            {rew.description}
                          </p>
                        </div>

                        {isUnlocked ? (
                          <button
                            onClick={() => handleCopyCode(rew.promoCode)}
                            className="px-3.5 py-1.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-2xs"
                          >
                            {copiedCode === rew.promoCode ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Copié !</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-neutral-300" />
                                <span>Code : {rew.promoCode}</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-neutral-400">
                            Gagnez encore {PILOT_LEVELS.find((l) => l.level === rew.minLevelRequired)!.minXp - profile.xp} XP pour débloquer
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ONGLET 3 : BADGES DE DISTINCTION */}
          {activeTab === 'badges' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-black text-neutral-900">
                  Badges & Distinctions Communautaires
                </h4>
                <p className="text-xs text-neutral-500">
                  Débloquez des distinctions uniques affichées fièrement à côté de votre pseudo sur le forum.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ALL_PILOT_BADGES.map((b) => {
                  const isUnlocked = profile.unlockedBadges.some((ub) => ub.id === b.id);
                  return (
                    <div
                      key={b.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                        isUnlocked
                          ? 'border-black bg-white shadow-2xs'
                          : 'border-neutral-200 bg-neutral-50 opacity-40'
                      }`}
                    >
                      <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-neutral-100">
                        {b.icon}
                      </span>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-neutral-900">
                            {b.name}
                          </span>
                          {isUnlocked && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-600 leading-snug">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ONGLET 4 : HISTORIQUE DES RAPPORTS SOUMIS */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-black text-neutral-900">
                  Vos Rapports d Atelier Renseignés
                </h4>
                <p className="text-xs text-neutral-500">
                  Toutes vos fiches de dépannage qui aident quotidiennement les pilotes FPV.
                </p>
              </div>

              {profile.historyReports.length > 0 ? (
                <div className="space-y-3">
                  {profile.historyReports.map((hr) => (
                    <div
                      key={hr.id}
                      className="p-4 rounded-2xl border border-neutral-200 bg-white space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-neutral-900">
                          {hr.modelExact || hr.componentName}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-800">
                          +{hr.xpEarned} XP
                        </span>
                      </div>
                      <p className="text-xs text-neutral-700">
                        <strong className="text-black">Cause :</strong> {hr.exactRootCause}
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        💡 <strong className="text-neutral-700">Astuce :</strong> {hr.keyAdvice}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center border border-dashed border-neutral-200 rounded-2xl space-y-2 bg-neutral-50/50">
                  <FileText className="w-8 h-8 text-neutral-400 mx-auto" />
                  <p className="text-xs font-bold text-neutral-700">
                    Vous n avez pas encore soumis de Rapport d Atelier détaillé.
                  </p>
                  <p className="text-[11px] text-neutral-500 max-w-sm mx-auto">
                    Validez une panne résolue dans le guide pour remplir votre première fiche et empocher +150 XP !
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
