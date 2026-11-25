'use client';

import React, { useState, useMemo } from 'react';
import { FigmaComponentData } from '@/data/figmaComponents';
import { getDiagnosticDefinition, DiagnosticSymptomOption } from '@/data/diagnosticKnowledgeBase';
import { MULTI_MOTORS_CATALOGUE, MOTOR_GAMMES_BY_BRAND, MultiMotorsItem } from '@/data/multiMotorsCatalogueList';
import {
  Search,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Cpu,
  Clock,
  ShieldAlert,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

interface TroubleshootWizardProps {
  component: FigmaComponentData;
  targetId: string;
}

type WizardStep = 1 | 2 | 3 | 4 | 5;

export function TroubleshootWizard({ component, targetId }: TroubleshootWizardProps) {
  const isMotor = targetId === 'motors' || component.id === 'motor';
  const def = useMemo(() => getDiagnosticDefinition(targetId), [targetId]);

  const [step, setStep] = useState<WizardStep>(1);

  // Étape 1 : Marque
  const [brandQuery, setBrandQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [customBrand, setCustomBrand] = useState('');

  // Étape 2 : Gamme
  const [gammeQuery, setGammeQuery] = useState('');
  const [selectedGamme, setSelectedGamme] = useState('');
  const [customGamme, setCustomGamme] = useState('');

  // Étape 3 : Référence exacte
  const [refQuery, setRefQuery] = useState('');
  const [selectedMotor, setSelectedMotor] = useState<MultiMotorsItem | null>(null);
  const [customRef, setCustomRef] = useState('');

  // Étape 4 : Circonstance + Symptôme
  const [selectedCircumstance, setSelectedCircumstance] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState<DiagnosticSymptomOption | null>(null);

  // Liste des marques (Multi-Motors pour les moteurs, KnowledgeBase pour le reste)
  const motorBrands = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of MULTI_MOTORS_CATALOGUE) {
      counts.set(item.brand, (counts.get(item.brand) || 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const filteredBrands = useMemo(() => {
    const q = brandQuery.trim().toLowerCase();
    if (isMotor) {
      return motorBrands.filter((b) => !q || b.name.toLowerCase().includes(q));
    }
    return def.brands.filter((b) => !q || b.name.toLowerCase().includes(q));
  }, [isMotor, motorBrands, def.brands, brandQuery]);

  // Liste des gammes pour la marque sélectionnée
  const motorGammes = useMemo(() => {
    if (!isMotor || !selectedBrand) return [];
    const counts = new Map<string, number>();
    for (const item of MULTI_MOTORS_CATALOGUE) {
      if (item.brand === selectedBrand) {
        counts.set(item.gamme, (counts.get(item.gamme) || 0) + 1);
      }
    }
    if (counts.size === 0 && MOTOR_GAMMES_BY_BRAND[selectedBrand]) {
      return MOTOR_GAMMES_BY_BRAND[selectedBrand].map((g) => ({ name: g, count: 0 }));
    }
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [isMotor, selectedBrand]);

  const nonMotorGammes = useMemo(() => {
    if (isMotor) return [];
    const found = def.brands.find((b) => b.name === selectedBrand);
    return found?.popularModels || [];
  }, [isMotor, def.brands, selectedBrand]);

  const filteredGammes = useMemo(() => {
    const q = gammeQuery.trim().toLowerCase();
    if (isMotor) {
      return motorGammes.filter((g) => !q || g.name.toLowerCase().includes(q));
    }
    return nonMotorGammes.filter((g) => !q || g.toLowerCase().includes(q));
  }, [isMotor, motorGammes, nonMotorGammes, gammeQuery]);

  // Liste des références moteurs pour Marque + Gamme
  const filteredMotorRefs = useMemo(() => {
    if (!isMotor) return [];
    const q = refQuery.trim().toLowerCase();
    return MULTI_MOTORS_CATALOGUE.filter((item) => {
      if (selectedBrand && item.brand !== selectedBrand) return false;
      if (selectedGamme && selectedGamme !== 'Toutes les gammes' && item.gamme !== selectedGamme) {
        return false;
      }
      if (!q) return true;
      return (
        item.fullName.toLowerCase().includes(q) ||
        item.ref.toLowerCase().includes(q) ||
        item.kv.toLowerCase().includes(q) ||
        item.classe.toLowerCase().includes(q)
      );
    }).slice(0, 40);
  }, [isMotor, selectedBrand, selectedGamme, refQuery]);

  const resetWizard = () => {
    setStep(1);
    setBrandQuery('');
    setSelectedBrand('');
    setCustomBrand('');
    setGammeQuery('');
    setSelectedGamme('');
    setCustomGamme('');
    setRefQuery('');
    setSelectedMotor(null);
    setCustomRef('');
    setSelectedCircumstance('');
    setSelectedSymptom(null);
  };

  const stepLabels = ['Marque', 'Gamme', 'Référence', 'Contexte', 'Diagnostic'];

  const activeBrandLabel = selectedBrand || customBrand || 'Marque non précisée';
  const activeGammeLabel = selectedGamme || customGamme || 'Gamme standard';
  const activeRefLabel = selectedMotor?.fullName || customRef || activeGammeLabel;

  return (
    <div className="space-y-4 text-xs">
      {/* Barre de progression des 5 étapes */}
      <div className="flex items-center justify-between gap-1 pb-3 border-b border-zinc-200">
        {stepLabels.map((label, idx) => {
          const s = (idx + 1) as WizardStep;
          const isCurrent = step === s;
          const isDone = step > s;
          return (
            <button
              key={label}
              type="button"
              disabled={!isDone}
              onClick={() => isDone && setStep(s)}
              className={`flex-1 flex flex-col items-center gap-1 py-1 rounded-lg transition-colors ${
                isDone ? 'cursor-pointer hover:bg-zinc-100' : 'cursor-default'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border ${
                  isCurrent
                    ? 'bg-black text-white border-black'
                    : isDone
                    ? 'bg-[#cbf3d2] text-black border-black'
                    : 'bg-white text-zinc-400 border-zinc-300'
                }`}
              >
                {isDone ? '✓' : s}
              </span>
              <span
                className={`text-[9px] font-mono uppercase tracking-wider ${
                  isCurrent ? 'font-bold text-black' : isDone ? 'text-zinc-700' : 'text-zinc-400'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ÉTAPE 1 : QUELLE MARQUE ? */}
      {step === 1 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-black">
              1. Quelle est la marque de votre {component.name.toLowerCase()} ?
            </h3>
            {isMotor && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-700">
                Catalogue Multi-Motors ({MULTI_MOTORS_CATALOGUE.length} réf.)
              </span>
            )}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={brandQuery}
              onChange={(e) => setBrandQuery(e.target.value)}
              placeholder="Rechercher une marque (ex: T-Motor, SpeedyBee, DJI...)"
              className="w-full pl-9 pr-3 py-2.5 border-[1.5px] border-dashed border-black/60 rounded-xl text-black focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1">
            {isMotor
              ? (filteredBrands as { name: string; count: number }[]).map((b) => (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => {
                      setSelectedBrand(b.name);
                      setSelectedGamme('');
                      setSelectedMotor(null);
                      setStep(2);
                    }}
                    className="p-3 rounded-xl border border-black/25 hover:border-black bg-zinc-50/70 hover:bg-white text-left transition-all cursor-pointer flex items-center justify-between gap-2"
                  >
                    <span className="font-bold text-black truncate">{b.name}</span>
                    <span className="text-[10px] font-mono text-zinc-500 shrink-0">{b.count}</span>
                  </button>
                ))
              : (filteredBrands as { id: string; name: string; popularModels: string[] }[]).map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setSelectedBrand(b.name);
                      setSelectedGamme('');
                      setStep(2);
                    }}
                    className="p-3 rounded-xl border border-black/25 hover:border-black bg-zinc-50/70 hover:bg-white text-left transition-all cursor-pointer flex items-center justify-between gap-2"
                  >
                    <span className="font-bold text-black truncate">{b.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  </button>
                ))}
          </div>

          {/* Saisie libre si marque absente */}
          <div className="pt-2 border-t border-zinc-200 flex gap-2">
            <input
              type="text"
              value={customBrand}
              onChange={(e) => setCustomBrand(e.target.value)}
              placeholder="Autre marque ou générique..."
              className="flex-1 px-3 py-2 border border-zinc-300 rounded-xl text-black focus:outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={() => {
                setSelectedBrand('');
                setSelectedGamme('');
                setStep(2);
              }}
              className="px-4 py-2 rounded-xl bg-black text-white font-bold text-[11px] uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 2 : QUELLE GAMME ? */}
      {step === 2 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-600 hover:text-black cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Marque ({activeBrandLabel})</span>
            </button>
            <span className="text-[10px] font-mono text-zinc-500">Étape 2 / 5</span>
          </div>

          <h3 className="text-sm font-bold text-black">
            2. Quelle gamme chez <span className="underline">{activeBrandLabel}</span> ?
          </h3>

          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={gammeQuery}
              onChange={(e) => setGammeQuery(e.target.value)}
              placeholder="Filtrer une gamme / série..."
              className="w-full pl-9 pr-3 py-2.5 border-[1.5px] border-dashed border-black/60 rounded-xl text-black focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
            {isMotor && selectedBrand && (
              <button
                type="button"
                onClick={() => {
                  setSelectedGamme('Toutes les gammes');
                  setStep(3);
                }}
                className="p-3 rounded-xl border border-dashed border-black bg-zinc-100 hover:bg-zinc-200 text-left transition-all cursor-pointer font-bold text-black"
              >
                Toutes les gammes
              </button>
            )}

            {isMotor
              ? (filteredGammes as { name: string; count: number }[]).map((g) => (
                  <button
                    key={g.name}
                    type="button"
                    onClick={() => {
                      setSelectedGamme(g.name);
                      setStep(3);
                    }}
                    className="p-3 rounded-xl border border-black/25 hover:border-black bg-zinc-50/70 hover:bg-white text-left transition-all cursor-pointer flex items-center justify-between gap-2"
                  >
                    <span className="font-bold text-black truncate">{g.name}</span>
                    {g.count > 0 && (
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0">{g.count}</span>
                    )}
                  </button>
                ))
              : (filteredGammes as string[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setSelectedGamme(g);
                      setCustomRef(g);
                      setStep(3);
                    }}
                    className="p-3 rounded-xl border border-black/25 hover:border-black bg-zinc-50/70 hover:bg-white text-left transition-all cursor-pointer flex items-center justify-between gap-2"
                  >
                    <span className="font-bold text-black truncate">{g}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  </button>
                ))}
          </div>

          <div className="pt-2 border-t border-zinc-200 flex gap-2">
            <input
              type="text"
              value={customGamme}
              onChange={(e) => setCustomGamme(e.target.value)}
              placeholder="Autre gamme / modèle..."
              className="flex-1 px-3 py-2 border border-zinc-300 rounded-xl text-black focus:outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={() => {
                setSelectedGamme('');
                setStep(3);
              }}
              className="px-4 py-2 rounded-xl bg-black text-white font-bold text-[11px] uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 : QUELLE RÉFÉRENCE ? (AVEC MINIATURE MULTI-MOTORS POUR LES MOTEURS) */}
      {step === 3 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-600 hover:text-black cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{activeBrandLabel} • {activeGammeLabel}</span>
            </button>
            <span className="text-[10px] font-mono text-zinc-500">Étape 3 / 5</span>
          </div>

          <h3 className="text-sm font-bold text-black">
            3. Quelle référence exacte ?
          </h3>

          {isMotor ? (
            <>
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={refQuery}
                  onChange={(e) => setRefQuery(e.target.value)}
                  placeholder="Rechercher par KV, taille (2207, 1404...) ou référence..."
                  className="w-full pl-9 pr-3 py-2.5 border-[1.5px] border-dashed border-black/60 rounded-xl text-black focus:outline-none focus:border-black"
                />
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {filteredMotorRefs.length > 0 ? (
                  filteredMotorRefs.map((motor) => (
                    <button
                      key={motor.id}
                      type="button"
                      onClick={() => {
                        setSelectedMotor(motor);
                        setStep(4);
                      }}
                      className="w-full p-2.5 rounded-2xl border border-black/25 hover:border-black bg-zinc-50/70 hover:bg-white transition-all cursor-pointer flex items-center gap-3 text-left"
                    >
                      {/* Miniature du moteur issue de Multi-Motors */}
                      <div className="w-14 h-14 rounded-xl border border-zinc-200 bg-white overflow-hidden shrink-0 flex items-center justify-center">
                        <img
                          src={motor.img || '/images/components/motor.svg?v=6'}
                          alt={motor.fullName}
                          onError={(e) => {
                            e.currentTarget.src = '/images/components/motor.svg?v=6';
                          }}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-black text-xs truncate">
                          {motor.fullName}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black text-white">
                            {motor.kv} KV
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-800">
                            {motor.classe}
                          </span>
                          {motor.lipo && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-700">
                              {motor.lipo}
                            </span>
                          )}
                          {motor.poids && (
                            <span className="text-[10px] font-mono text-zinc-500">
                              {motor.poids}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                          Réf : {motor.ref}
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-zinc-500 py-4 text-center">
                    Aucune référence trouvée avec ce filtre. Saisissez votre référence manuellement ci-dessous.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="p-4 rounded-2xl border border-black/20 bg-zinc-50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-black">
                <Cpu className="w-4 h-4" />
                <span>Matériel sélectionné : {activeBrandLabel} — {activeGammeLabel}</span>
              </div>
              <p className="text-[11px] text-zinc-600">
                Précisez si besoin la révision, version hardware ou numéro de série (optionnel).
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-zinc-200 flex gap-2">
            <input
              type="text"
              value={customRef}
              onChange={(e) => setCustomRef(e.target.value)}
              placeholder={isMotor ? 'Ou saisir une référence manuelle (ex: 2207 1950KV)...' : 'Version / Référence exacte / S/N (optionnel)...'}
              className="flex-1 px-3 py-2 border border-zinc-300 rounded-xl text-black focus:outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={() => {
                setSelectedMotor(null);
                setStep(4);
              }}
              className="px-4 py-2 rounded-xl bg-black text-white font-bold text-[11px] uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Valider
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 4 : QUAND EST SURVENU LE PROBLÈME & SYMPTÔME */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-600 hover:text-black cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="truncate max-w-[260px]">{activeRefLabel}</span>
            </button>
            <span className="text-[10px] font-mono text-zinc-500">Étape 4 / 5</span>
          </div>

          {/* Quand est survenu le problème ? */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-black flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>4a. Quand est survenu le problème ?</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {def.circumstances.map((circ) => {
                const active = selectedCircumstance === circ.label;
                return (
                  <button
                    key={circ.id}
                    type="button"
                    onClick={() => setSelectedCircumstance(circ.label)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'border-black bg-black text-white'
                        : 'border-black/25 bg-zinc-50/70 hover:border-black text-black'
                    }`}
                  >
                    <div className="font-bold text-[11px]">{circ.label}</div>
                    {circ.description && (
                      <div className={`text-[10px] mt-0.5 ${active ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        {circ.description}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quel symptôme observez-vous ? */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-black flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>4b. Quel symptôme constatez-vous ?</span>
            </h3>
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {def.symptoms.map((sym) => {
                const active = selectedSymptom?.id === sym.id;
                return (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => {
                      setSelectedSymptom(sym);
                      setStep(5);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      active
                        ? 'border-black bg-zinc-100'
                        : 'border-black/25 hover:border-black bg-white'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-black text-xs">{sym.title}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-700">
                          {sym.rarityLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 mt-0.5 line-clamp-2">
                        {sym.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ÉTAPE 5 : RÉSULTAT DU DIAGNOSTIC D'ATELIER */}
      {step === 5 && selectedSymptom && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-600 hover:text-black cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Modifier le symptôme</span>
            </button>
            <button
              type="button"
              onClick={resetWizard}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 hover:text-black cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Recommencer</span>
            </button>
          </div>

          {/* Récapitulatif matériel identifié */}
          <div className="p-3.5 rounded-2xl border border-black/25 bg-zinc-50 flex items-center gap-3">
            {selectedMotor && (
              <div className="w-12 h-12 rounded-xl border border-zinc-200 bg-white overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src={selectedMotor.img || '/images/components/motor.svg?v=6'}
                  alt={selectedMotor.fullName}
                  onError={(e) => {
                    e.currentTarget.src = '/images/components/motor.svg?v=6';
                  }}
                  className="w-full h-full object-contain p-1"
                />
              </div>
            )}
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase text-zinc-500">
                Matériel identifié • {activeBrandLabel}
              </div>
              <div className="font-bold text-black truncate">{activeRefLabel}</div>
              {selectedCircumstance && (
                <div className="text-[11px] text-zinc-600 mt-0.5">
                  Contexte : {selectedCircumstance}
                </div>
              )}
            </div>
          </div>

          {/* Diagnostic & Fix */}
          <div className="p-4 rounded-2xl border-[1.5px] border-dashed border-black bg-white space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 font-bold text-sm text-black">
                <Sparkles className="w-4 h-4" />
                <span>{selectedSymptom.aiDiagnostic.rootCause}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#cbf3d2] border border-black text-black font-bold shrink-0">
                {selectedSymptom.aiDiagnostic.probability}% probable
              </span>
            </div>

            <p className="text-zinc-700 leading-relaxed">
              {selectedSymptom.aiDiagnostic.explanation}
            </p>

            {selectedSymptom.aiDiagnostic.safetyWarning && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-400 text-amber-900 flex items-start gap-2 text-[11px]">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{selectedSymptom.aiDiagnostic.safetyWarning}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <div className="font-bold text-black flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>Étapes de vérification :</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                {selectedSymptom.aiDiagnostic.testSteps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-[#cbf3d2]/25 border border-emerald-700/30 space-y-1.5">
              <div className="font-bold text-black flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Solutions recommandées :</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-zinc-800">
                {selectedSymptom.aiDiagnostic.recommendedFix.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            {selectedSymptom.aiDiagnostic.toolsNeeded.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Outils :</span>
                {selectedSymptom.aiDiagnostic.toolsNeeded.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-800"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
