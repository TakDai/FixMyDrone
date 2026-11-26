'use client';

import React, { useMemo, useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { EcosystemTopNav } from '@/components/EcosystemTopNav';
import { FIGMA_COMPONENTS } from '@/data/figmaComponents';
import { ECOSYSTEM_SITES } from '@/data/ecosystem';
import { MULTI_MOTORS_CATALOGUE, MultiMotorsItem } from '@/data/multiMotorsCatalogueList';
import {
  ArrowLeft,
  ExternalLink,
  Cpu,
  Zap,
  Scale,
  BatteryCharging,
  Ruler,
  Layers,
  Hash,
  Search,
  CheckCircle2,
  Wrench,
} from 'lucide-react';

function getManufacturerUrl(brand: string, query: string): { url: string; label: string } {
  const b = brand.trim().toUpperCase();
  const q = encodeURIComponent(query.trim());

  const map: Record<string, { url: string; label: string }> = {
    BETAFPV: { url: `https://betafpv.com/search?q=${q}`, label: 'BETAFPV Officiel' },
    'T-MOTOR': { url: `https://store.tmotor.com/search.php?keywords=${q}`, label: 'T-MOTOR Store' },
    TMOTOR: { url: `https://store.tmotor.com/search.php?keywords=${q}`, label: 'T-MOTOR Store' },
    IFLIGHT: { url: `https://shop.iflight.com/index.php?route=product/search&search=${q}`, label: 'iFlight Officiel' },
    EMAX: { url: `https://emaxmodel.com/search?q=${q}`, label: 'EMAX Officiel' },
    AXISFLYING: { url: `https://www.axisflying.com/?s=${q}`, label: 'AxisFlying Officiel' },
    FLYFISHRC: { url: `https://www.flyfish-rc.com/search?q=${q}`, label: 'FlyFishRC Officiel' },
    GEPRC: { url: `https://geprc.com/?s=${q}`, label: 'GEPRC Officiel' },
    HGLRC: { url: `https://www.hglrc.com/search?q=${q}`, label: 'HGLRC Officiel' },
    RCINPOWER: { url: `https://www.rcinpower.com/`, label: 'RCINPOWER Officiel' },
    BROTHERHOBBY: { url: `https://www.brotherhobbystore.com/search?q=${q}`, label: 'BrotherHobby Officiel' },
    DIATONE: { url: `https://www.diatone.us/search?q=${q}`, label: 'Diatone / Mamba' },
    MAMBA: { url: `https://www.diatone.us/search?q=${q}`, label: 'Diatone / Mamba' },
    SPEEDYBEE: { url: `https://www.speedybee.com/?s=${q}`, label: 'SpeedyBee Officiel' },
    CADDX: { url: `https://caddxfpv.com/search?q=${q}`, label: 'CaddxFPV Officiel' },
    WALKSNAIL: { url: `https://caddxfpv.com/search?q=${q}`, label: 'Walksnail / Caddx' },
    DJI: { url: `https://www.dji.com/search?q=${q}`, label: 'DJI Officiel' },
    TBS: { url: `https://www.team-blacksheep.com/search?q=${q}`, label: 'Team BlackSheep' },
    RADIOMASTER: { url: `https://www.radiomasterrc.com/search?q=${q}`, label: 'RadioMaster Officiel' },
    FOXEEER: { url: `https://www.foxeer.com/search?q=${q}`, label: 'Foxeer Officiel' },
    FOXEER: { url: `https://www.foxeer.com/search?q=${q}`, label: 'Foxeer Officiel' },
    RUNCAM: { url: `https://shop.runcam.com/search.php?search_query=${q}`, label: 'RunCam Officiel' },
    HDZERO: { url: `https://www.hd-zero.com/shop?q=${q}`, label: 'HDZero Officiel' },
    SKYSTARS: { url: `https://skystarsrc.com/?s=${q}`, label: 'Skystars Officiel' },
    XING: { url: `https://shop.iflight.com/index.php?route=product/search&search=${q}`, label: 'iFlight XING' },
    PYRODRONE: { url: `https://pyrodrone.com/search?q=${q}`, label: 'Pyrodrone' },
  };

  if (map[b]) return map[b];
  return {
    url: `https://www.google.com/search?q=${encodeURIComponent(`${brand} ${query} datasheet specs`)}`,
    label: `Rechercher fiche constructeur (${brand || 'Officiel'})`,
  };
}

function SpecsPageContent() {
  const searchParams = useSearchParams();
  const componentParam = searchParams.get('component') || 'motor';
  const refParam = searchParams.get('ref') || '';
  const brandParam = searchParams.get('brand') || '';
  const modelParam = searchParams.get('model') || '';

  const [catalogue, setCatalogue] = useState<MultiMotorsItem[]>(MULTI_MOTORS_CATALOGUE);
  const [quickQuery, setQuickQuery] = useState('');

  useEffect(() => {
    fetch('/data/multi-motors-catalogue.json', { cache: 'no-cache' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCatalogue(data);
        }
      })
      .catch(() => {});
  }, []);

  const component = useMemo(() => {
    return (
      FIGMA_COMPONENTS.find(
        (c) =>
          c.id === componentParam ||
          c.id === (componentParam === 'motors' ? 'motor' : componentParam)
      ) || FIGMA_COMPONENTS[0]
    );
  }, [componentParam]);

  const isMotorComponent = component.id === 'motor' || componentParam === 'motors';

  const matchedMotor = useMemo(() => {
    if (!isMotorComponent) return null;
    if (refParam) {
      const byRef = catalogue.find(
        (m) => m.ref.toLowerCase() === refParam.toLowerCase() || m.id === refParam
      );
      if (byRef) return byRef;
    }
    if (modelParam) {
      const q = `${brandParam} ${modelParam}`.trim().toLowerCase();
      return (
        catalogue.find(
          (m) =>
            m.fullName.toLowerCase().includes(q) ||
            m.model.toLowerCase().includes(modelParam.toLowerCase())
        ) || null
      );
    }
    return null;
  }, [isMotorComponent, refParam, brandParam, modelParam, catalogue]);

  const quickSuggestions = useMemo(() => {
    if (!isMotorComponent || !quickQuery.trim()) return [];
    const tokens = quickQuery.trim().toLowerCase().split(/\s+/);
    return catalogue
      .filter((m) => {
        const hay = `${m.brand} ${m.gamme} ${m.model} ${m.fullName} ${m.ref} ${m.kv} ${m.classe}`.toLowerCase();
        return tokens.every((t) => hay.includes(t));
      })
      .slice(0, 8);
  }, [isMotorComponent, quickQuery, catalogue]);

  const partnerSite = useMemo(() => {
    return (
      Object.values(ECOSYSTEM_SITES).find((s) =>
        s.components.includes(component.id) || s.components.includes(componentParam)
      ) || ECOSYSTEM_SITES['multi-motors']
    );
  }, [component.id, componentParam]);

  const activeBrand = matchedMotor?.brand || brandParam || 'Constructeur';
  const activeModel = matchedMotor?.fullName || modelParam || component.name;
  const manufacturerInfo = getManufacturerUrl(activeBrand, matchedMotor ? `${matchedMotor.brand} ${matchedMotor.model} ${matchedMotor.kv}KV` : `${brandParam} ${modelParam}`.trim() || component.name);

  const multiMotorsUrl = matchedMotor
    ? `https://multi-motors.fr/?search=${encodeURIComponent(matchedMotor.ref || matchedMotor.fullName)}`
    : `https://multi-motors.fr/?search=${encodeURIComponent(`${brandParam} ${modelParam}`.trim())}`;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      {/* Navigation haut */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au schéma interactif du drone</span>
        </Link>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-zinc-200/80 text-black font-bold">
          Fiche Technique & Specs
        </span>
      </div>

      {/* Barre de recherche rapide si moteur */}
      {isMotorComponent && (
        <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-xs space-y-2 relative">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              placeholder="Changer de moteur (ex: T-Motor Pacer 2207, Xing2, BetaFPV 1102...)"
              className="w-full text-xs sm:text-sm bg-transparent text-black placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
          {quickSuggestions.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-zinc-100">
              {quickSuggestions.map((m) => (
                <Link
                  key={m.id}
                  href={`/specs/?component=motor&ref=${encodeURIComponent(m.ref)}`}
                  onClick={() => setQuickQuery('')}
                  className="p-2.5 rounded-xl border border-zinc-200 hover:border-black bg-zinc-50 hover:bg-white flex items-center gap-2.5 transition-all"
                >
                  <img
                    src={m.img || '/images/components/motor.svg?v=6'}
                    alt={m.fullName}
                    onError={(e) => {
                      e.currentTarget.src = '/images/components/motor.svg?v=6';
                    }}
                    className="w-9 h-9 rounded-lg object-contain bg-white border border-zinc-200 p-0.5 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-black truncate">{m.fullName}</div>
                    <div className="text-[10px] font-mono text-zinc-500">
                      {m.classe} • {m.kv}KV • {m.lipo} • {m.poids}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FICHE RÉCAPITULATIVE PRINCIPALE */}
      <section className="bg-white border-[1.5px] border-dashed border-black rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-zinc-200">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center p-2 shrink-0 overflow-hidden">
            <img
              src={matchedMotor?.img || `/images/components/${component.id}.svg?v=6`}
              alt={activeModel}
              onError={(e) => {
                e.currentTarget.src = '/images/components/motor.svg?v=6';
              }}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-black text-white font-mono text-[10px] font-bold uppercase">
                {component.name}
              </span>
              {activeBrand && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#cbf3d2] border border-black/20 text-black font-mono text-[10px] font-bold uppercase">
                  {activeBrand}
                </span>
              )}
              {matchedMotor?.ref && (
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-700 font-mono text-[10px]">
                  REF : {matchedMotor.ref}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold text-black tracking-tight leading-snug">
              {activeModel}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {matchedMotor
                ? `Fiche technique récapitulative issue de la base Multi-Motors.fr (${matchedMotor.brand} · Gamme ${matchedMotor.gamme || 'Standard'}).`
                : component.description}
            </p>
          </div>
        </div>

        {/* GRILLE SPECS TECHNIQUES */}
        {matchedMotor ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
              <div className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>Vitesse (KV)</span>
              </div>
              <div className="text-lg font-black text-black font-mono">
                {matchedMotor.kv ? `${matchedMotor.kv} KV` : 'N/C'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
              <div className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-black" />
                <span>Format Stator</span>
              </div>
              <div className="text-lg font-black text-black font-mono">
                {matchedMotor.classe || 'N/C'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
              <div className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-700" />
                <span>Tension LiPo</span>
              </div>
              <div className="text-lg font-black text-black font-mono">
                {matchedMotor.lipo || 'N/C'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
              <div className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-sky-700" />
                <span>Poids</span>
              </div>
              <div className="text-lg font-black text-black font-mono">
                {matchedMotor.poids || 'N/C'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
              <div className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5 text-violet-700" />
                <span>Diamètre d’axe</span>
              </div>
              <div className="text-lg font-black text-black font-mono">
                {matchedMotor.shaft || 'N/C'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
              <div className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-zinc-700" />
                <span>Gamme</span>
              </div>
              <div className="text-lg font-black text-black font-mono truncate">
                {matchedMotor.gamme || 'Standard'}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {Object.entries(component.specifications).map(([key, val]) => (
              <div
                key={key}
                className="p-3.5 rounded-2xl border border-zinc-200 bg-zinc-50 flex justify-between gap-3"
              >
                <span className="text-zinc-500 font-medium">{key} :</span>
                <span className="font-bold text-black font-mono text-right">{val}</span>
              </div>
            ))}
          </div>
        )}

        {/* BOUTONS DE REDIRECTION DIRECTE (MULTI-MOTORS / PARTENAIRE & CONSTRUCTEUR) */}
        <div className="pt-4 border-t border-zinc-200 space-y-3">
          <div className="text-xs font-mono uppercase font-bold text-zinc-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Accès direct fiche complète & constructeur</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {isMotorComponent ? (
              <a
                href={multiMotorsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-black hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-between gap-2 transition-colors shadow-sm"
              >
                <span>Voir ce moteur sur Multi-Motors.fr</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            ) : (
              <a
                href={partnerSite.domain}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-black hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-between gap-2 transition-colors shadow-sm"
              >
                <span>Consulter sur {partnerSite.name}</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            )}

            <a
              href={manufacturerInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#cbf3d2] hover:bg-[#b5ebc0] border border-black text-black font-bold text-xs flex items-center justify-between gap-2 transition-colors"
            >
              <span>Site constructeur ({manufacturerInfo.label})</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
            <Link
              href="/forum"
              className="inline-flex items-center gap-1.5 font-bold text-zinc-700 hover:text-black underline"
            >
              <Hash className="w-3.5 h-3.5" />
              <span>Voir les retours pilotes sur le forum</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-bold text-black hover:underline"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Lancer un diagnostic sur ce composant →</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function SpecsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-black flex flex-col font-sans">
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b-2 border-black z-30">
        <EcosystemTopNav activeTab="catalogue" />
      </header>
      <Suspense
        fallback={
          <div className="max-w-5xl mx-auto p-8 text-sm font-mono text-zinc-500">
            Chargement de la fiche technique...
          </div>
        }
      >
        <SpecsPageContent />
      </Suspense>
    </div>
  );
}
