'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  X,
  RefreshCw,
} from 'lucide-react';

interface TroubleshootWizardProps {
  component: FigmaComponentData;
  targetId: string;
}

type WizardStep = 1 | 2 | 3 | 4 | 5;

function parseMultiMotorsCsv(text: string): MultiMotorsItem[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\r') {
      // ignore
    } else if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim().toUpperCase());
  const idx = (name: string) => headers.indexOf(name);
  const iId = idx('ID');
  const iRef = idx('REF');
  const iBrand = idx('MARQUE');
  const iModel = idx('NOM');
  const iVersion = idx('VERSION');
  const iClasse = idx('CLASSE');
  const iKv = idx('KV');
  const iPoids = idx('POIDS');
  const iLipo = idx('LIPO');
  const iShaft = idx('D SHAFT');
  const iImg = idx('IMG');

  const items: MultiMotorsItem[] = [];
  for (let r = 1; r < rows.length; r++) {
    const cols = rows[r];
    if (!cols || cols.length < 4) continue;
    const brand = (cols[iBrand] || '').trim();
    const model = (cols[iModel] || '').trim();
    if (!brand || !model) continue;

    const id = (cols[iId] || String(r)).trim();
    const ref = (cols[iRef] || '').trim();
    const version = (cols[iVersion] || '').trim();
    const classe = (cols[iClasse] || '').trim();
    const kv = (cols[iKv] || '').trim();
    const poidsRaw = (cols[iPoids] || '').trim();
    const poids = poidsRaw ? (poidsRaw.endsWith('g') ? poidsRaw : `${poidsRaw}g`) : '';
    const lipo = (cols[iLipo] || '').trim();
    const shaftRaw = (cols[iShaft] || '').trim();
    const shaft = shaftRaw ? (shaftRaw.includes('mm') ? shaftRaw : `Ø${shaftRaw}mm`) : '';
    const img = (cols[iImg] || '').trim();
    const gamme = version || classe || 'Standard';
    const fullName = `${brand} ${model}${kv ? ` ${kv}KV` : ''}${classe ? ` (${classe})` : ''}`;

    items.push({ id, ref, brand, gamme, model, fullName, classe, kv, poids, lipo, shaft, img });
  }
  return items;
}

export function TroubleshootWizard({ component, targetId }: TroubleshootWizardProps) {
  const isMotor = targetId === 'motors' || component.id === 'motor';
  const def = useMemo(() => getDiagnosticDefinition(targetId), [targetId]);

  const [step, setStep] = useState<WizardStep>(1);

  // Base de données Multi-Motors dynamique (live CSV si CORS autorisé, sinon JSON synchronisé depuis multi-motors.fr)
  const [motorCatalogue, setMotorCatalogue] = useState<MultiMotorsItem[]>(MULTI_MOTORS_CATALOGUE);
  const [isSyncingMotors, setIsSyncingMotors] = useState(false);

  useEffect(() => {
    if (!isMotor) return;
    let cancelled = false;

    async function loadDynamicMultiMotors() {
      setIsSyncingMotors(true);
      try {
        // 1. Tentative en direct depuis multi-motors.fr
        const liveRes = await fetch('https://multi-motors.fr/data/moteurs.csv', { cache: 'no-store' });
        if (liveRes.ok) {
          const text = await liveRes.text();
          const parsed = parseMultiMotorsCsv(text);
          if (!cancelled && parsed.length > 0) {
            setMotorCatalogue(parsed);
            setIsSyncingMotors(false);
            return;
          }
        }
      } catch {
        // CORS ou réseau : repli sur le JSON synchronisé depuis multi-motors.fr
      }

      try {
        const localRes = await fetch('/data/multi-motors-catalogue.json', { cache: 'no-cache' });
        if (localRes.ok) {
          const data: MultiMotorsItem[] = await localRes.json();
          if (!cancelled && Array.isArray(data) && data.length > 0) {
            setMotorCatalogue(data);
          }
        }
      } catch {
        // Garde le fallback statique MULTI_MOTORS_CATALOGUE
      } finally {
        if (!cancelled) setIsSyncingMotors(false);
      }
    }

    loadDynamicMultiMotors();
    return () => {
      cancelled = true;
    };
  }, [isMotor]);

  // Étape 1 : Marque
  const [brandQuery, setBrandQuery] = useState('');
  const [brandLetterFilter, setBrandLetterFilter] = useState<string>('ALL');
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

  // Liste dynamique des marques Multi-Motors
  const motorBrands = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of motorCatalogue) {
      counts.set(item.brand, (counts.get(item.brand) || 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));
  }, [motorCatalogue]);

  // Top 6 des marques les plus fournies pour accès rapide
  const topMotorBrands = useMemo(() => {
    return [...motorBrands].sort((a, b) => b.count - a.count).slice(0, 6);
  }, [motorBrands]);

  const filteredBrands = useMemo(() => {
    const q = brandQuery.trim().toLowerCase();
    if (isMotor) {
      return motorBrands.filter((b) => {
        if (q && !b.name.toLowerCase().includes(q)) return false;
        if (!q && brandLetterFilter !== 'ALL') {
          const first = b.name.charAt(0).toUpperCase();
          if (brandLetterFilter === '0-9') return /^[0-9]/.test(first);
          if (brandLetterFilter === 'A-D') return first >= 'A' && first <= 'D';
          if (brandLetterFilter === 'E-L') return first >= 'E' && first <= 'L';
          if (brandLetterFilter === 'M-R') return first >= 'M' && first <= 'R';
          if (brandLetterFilter === 'S-Z') return first >= 'S' && first <= 'Z';
        }
        return true;
      });
    }
    return def.brands.filter((b) => !q || b.name.toLowerCase().includes(q));
  }, [isMotor, motorBrands, def.brands, brandQuery, brandLetterFilter]);

  // Liste des gammes pour la marque sélectionnée
  const motorGammes = useMemo(() => {
    if (!isMotor || !selectedBrand) return [];
    const counts = new Map<string, number>();
    for (const item of motorCatalogue) {
      if (item.brand === selectedBrand) {
        counts.set(item.gamme, (counts.get(item.gamme) || 0) + 1);
      }
    }
    if (counts.size === 0 && MOTOR_GAMMES_BY_BRAND[selectedBrand]) {
      return MOTOR_GAMMES_BY_BRAND[selectedBrand].map((g) => ({ name: g, count: 0 }));
    }
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [isMotor, selectedBrand, motorCatalogue]);

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
    return motorCatalogue
      .filter((item) => {
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
      })
      .slice(0, 50);
  }, [isMotor, motorCatalogue, selectedBrand, selectedGamme, refQuery]);

  const resetWizard = () => {
    setStep(1);
    setBrandQuery('');
    setBrandLetterFilter('ALL');
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

  const selectBrandAndNext = (brandName: string) => {
    setSelectedBrand(brandName);
    setSelectedGamme('');
    setSelectedMotor(null);
    setStep(2);
  };

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
        <div className="space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-black">
              1. Quelle est la marque de votre {component.name.toLowerCase()} ?
            </h3>
            {isMotor && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-700">
                {isSyncingMotors && <RefreshCw className="w-3 h-3 animate-spin" />}
                <span>
                  Multi-Motors · {motorBrands.length} marques · {motorCatalogue.length.toLocaleString('fr-FR')} réf.
                </span>
              </span>
            )}
          </div>

          {/* Barre de recherche */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={brandQuery}
              onChange={(e) => setBrandQuery(e.target.value)}
              placeholder="Rechercher une marque (ex: T-Motor, BetaFPV, EMAX, iFlight...)"
              className="w-full pl-9 pr-9 py-2.5 border-[1.5px] border-dashed border-black/60 rounded-xl text-black focus:outline-none focus:border-black bg-white"
            />
            {brandQuery && (
              <button
                type="button"
                onClick={() => setBrandQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-zinc-400 hover:text-black cursor-pointer"
                aria-label="Effacer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Marques populaires (affichées quand pas de recherche active) */}
          {isMotor && !brandQuery.trim() && brandLetterFilter === 'ALL' && topMotorBrands.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-zinc-500">
                Marques populaires FPV
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {topMotorBrands.map((b) => (
                  <button
                    key={`top-${b.name}`}
                    type="button"
                    onClick={() => selectBrandAndNext(b.name)}
                    className="group p-2.5 rounded-2xl border-[1.5px] border-black/80 bg-white hover:bg-black hover:text-white transition-all cursor-pointer flex items-center gap-2.5 text-left shadow-2xs"
                  >
                    <span className="w-8 h-8 rounded-xl bg-zinc-100 group-hover:bg-white/15 border border-black/15 group-hover:border-white/25 flex items-center justify-center font-mono font-black text-xs text-black group-hover:text-white shrink-0">
                      {b.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs truncate">{b.name}</div>
                      <div className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                        {b.count} modèles
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filtre alphabétique rapide */}
          {isMotor && !brandQuery.trim() && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 mr-1">Index :</span>
              {['ALL', 'A-D', 'E-L', 'M-R', 'S-Z', '0-9'].map((bucket) => (
                <button
                  key={bucket}
                  type="button"
                  onClick={() => setBrandLetterFilter(bucket)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                    brandLetterFilter === bucket
                      ? 'bg-black text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black'
                  }`}
                >
                  {bucket === 'ALL' ? 'Toutes' : bucket}
                </button>
              ))}
            </div>
          )}

          {/* Liste complète des marques */}
          <div className="space-y-1.5">
            {isMotor && (
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                <span>
                  {brandQuery.trim()
                    ? `Résultats (${filteredBrands.length})`
                    : `Toutes les marques (${filteredBrands.length})`}
                </span>
                <span>Ordre A → Z</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {isMotor ? (
                (filteredBrands as { name: string; count: number }[]).length > 0 ? (
                  (filteredBrands as { name: string; count: number }[]).map((b) => (
                    <button
                      key={b.name}
                      type="button"
                      onClick={() => selectBrandAndNext(b.name)}
                      className="group p-2.5 rounded-xl border border-black/20 hover:border-black bg-zinc-50/70 hover:bg-white text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 hover:shadow-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-white border border-black/15 group-hover:bg-black group-hover:text-white flex items-center justify-center font-mono font-bold text-[11px] text-black shrink-0 transition-colors">
                          {b.name.charAt(0).toUpperCase()}
                        </span>
                        <span className="font-bold text-black truncate">{b.name}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-zinc-200 text-zinc-600 group-hover:border-black/30 shrink-0">
                        {b.count} réf.
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="col-span-2 text-center text-zinc-500 py-4">
                    Aucune marque trouvée pour « {brandQuery} ». Saisissez-la ci-dessous.
                  </p>
                )
              ) : (
                (filteredBrands as { id: string; name: string; popularModels: string[] }[]).map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => selectBrandAndNext(b.name)}
                    className="p-3 rounded-xl border border-black/25 hover:border-black bg-zinc-50/70 hover:bg-white text-left transition-all cursor-pointer flex items-center justify-between gap-2"
                  >
                    <span className="font-bold text-black truncate">{b.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Saisie libre si marque absente */}
          <div className="pt-2.5 border-t border-zinc-200 flex gap-2">
            <input
              type="text"
              value={customBrand}
              onChange={(e) => setCustomBrand(e.target.value)}
              placeholder="Autre marque ou moteur générique..."
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
                          {motor.kv && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black text-white">
                              {motor.kv} KV
                            </span>
                          )}
                          {motor.classe && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-800">
                              {motor.classe}
                            </span>
                          )}
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
                        {motor.ref && (
                          <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                            Réf : {motor.ref}
                          </div>
                        )}
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
