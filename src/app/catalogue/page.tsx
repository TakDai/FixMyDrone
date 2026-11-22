'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Star,
  ExternalLink,
  PlusCircle,
  MessageSquare,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Filter,
  Tag,
  Radio,
  Eye,
} from 'lucide-react';
import { EcosystemTopNav } from '@/components/EcosystemTopNav';
import { EcosystemAuthModal } from '@/components/EcosystemAuthModal';
import { DetailedFixReportModal } from '@/components/DetailedFixReportModal';
import { CATALOG_PRODUCTS } from '@/data/catalog';
import { ProductCatalogItem } from '@/types';
import {
  PilotProfile,
  loadPilotProfile,
  savePilotProfile,
  DetailedFixReport,
  getLevelFromXp,
} from '@/data/pilotGamification';

export default function CataloguePage() {
  const router = useRouter();
  const [pilot, setPilot] = useState<PilotProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [prefilledProductForReport, setPrefilledProductForReport] = useState<ProductCatalogItem | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Synchronisation du profil pilote
  const refreshPilot = () => {
    const p = loadPilotProfile();
    setPilot(p);
  };

  useEffect(() => {
    refreshPilot();
    const handleSync = () => refreshPilot();
    window.addEventListener('storage', handleSync);
    window.addEventListener('fpv_ecosystem_account_updated', handleSync);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('fpv_ecosystem_account_updated', handleSync);
    };
  }, []);

  // Catégories du catalogue
  const categoriesList = [
    { id: 'all', label: 'Tous composants', count: CATALOG_PRODUCTS.length },
    { id: 'motors', label: 'Moteurs Brushless', slug: 'motors' },
    { id: 'esc-stack', label: 'Stacks & ESCs', slug: 'esc' },
    { id: 'vtx-camera', label: 'Systèmes Vidéo VTX', slug: 'vtx' },
    { id: 'goggle', label: 'Lunettes & Masques', slug: 'goggle' },
    { id: 'radio', label: 'Radios & Émetteurs', slug: 'radio' },
    { id: 'receiver-rx', label: 'Récepteurs RX', slug: 'rx' },
    { id: 'cam', label: 'Caméras FPV', slug: 'cam' },
    { id: 'gps-rescue', label: 'GPS & Buzzers', slug: 'gps' },
    { id: 'battery-lipo', label: 'Batteries LiPo', slug: 'lipo' },
    { id: 'frame', label: 'Châssis & Hélices', slug: 'frame' },
  ];

  // Liste unique des marques répertoriées
  const allBrands = useMemo(() => {
    const set = new Set<string>();
    CATALOG_PRODUCTS.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set).sort();
  }, []);

  // Filtrage intelligent des produits
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((prod) => {
      // 1. Recherche texte
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchBrand = prod.brand.toLowerCase().includes(q);
        const matchPopular = prod.popularFor.toLowerCase().includes(q);
        const matchSpecs = Object.entries(prod.specs).some(([k, v]) =>
          `${k} ${v}`.toLowerCase().includes(q)
        );
        const matchBugs = prod.commonBugs.some((b) => b.toLowerCase().includes(q));
        if (!matchName && !matchBrand && !matchPopular && !matchSpecs && !matchBugs) {
          return false;
        }
      }

      // 2. Filtre Catégorie
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'motors' && !['motors', 'motor'].includes(prod.category)) return false;
        if (selectedCategory === 'esc-stack' && !['esc-stack', 'esc', 'flight-controller'].includes(prod.category)) return false;
        if (selectedCategory === 'vtx-camera' && !['vtx-camera', 'vtx'].includes(prod.category)) return false;
        if (selectedCategory === 'goggle' && prod.category !== 'goggle') return false;
        if (selectedCategory === 'radio' && prod.category !== 'radio') return false;
        if (selectedCategory === 'receiver-rx' && !['receiver-rx', 'rx'].includes(prod.category)) return false;
        if (selectedCategory === 'cam' && prod.category !== 'cam') return false;
        if (selectedCategory === 'gps-rescue' && !['gps-rescue', 'gps'].includes(prod.category)) return false;
        if (selectedCategory === 'battery-lipo' && !['battery-lipo', 'lipo'].includes(prod.category)) return false;
        if (selectedCategory === 'frame' && !['frame', 'propellers'].includes(prod.category)) return false;
      }

      // 3. Filtre Marque
      if (selectedBrand !== 'all' && prod.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // 4. Filtre Statut de fiabilité
      if (selectedStatus !== 'all' && prod.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedBrand, selectedStatus]);

  // Handler de soumission d'un rapport de panne depuis le catalogue
  const handleOpenReport = (product: ProductCatalogItem) => {
    setPrefilledProductForReport(product);
    setReportModalOpen(true);
  };

  const handleNewReport = (reportData: Omit<DetailedFixReport, 'id' | 'createdAt' | 'xpEarned'>) => {
    if (!pilot) return;
    const earnedXp = 150;
    const newReport: DetailedFixReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('fr-FR'),
      xpEarned: earnedXp,
    };

    const newTotalXp = pilot.xp + earnedXp;
    const lvl = getLevelFromXp(newTotalXp);

    const updated: PilotProfile = {
      ...pilot,
      xp: newTotalXp,
      level: lvl.level,
      levelTitle: lvl.title,
      detailedReportsCount: (pilot.detailedReportsCount || 0) + 1,
      fixesResolvedCount: (pilot.fixesResolvedCount || 0) + 1,
      historyReports: [newReport, ...(pilot.historyReports || [])],
    };

    savePilotProfile(updated);
    setPilot(updated);
    setReportModalOpen(false);
  };

  // Mapper le produit vers le bon composant de diagnostic
  const getDiagnosticSlug = (category: string) => {
    if (['motors', 'motor'].includes(category)) return 'motors';
    if (['esc-stack', 'esc'].includes(category)) return 'esc';
    if (['flight-controller', 'fc'].includes(category)) return 'fc';
    if (['vtx-camera', 'vtx'].includes(category)) return 'vtx';
    if (['cam'].includes(category)) return 'cam';
    if (['goggle'].includes(category)) return 'goggle';
    if (['radio'].includes(category)) return 'radio';
    if (['receiver-rx', 'rx'].includes(category)) return 'rx';
    if (['gps-rescue', 'gps'].includes(category)) return 'gps';
    if (['battery-lipo', 'lipo'].includes(category)) return 'lipo';
    if (['frame', 'propellers'].includes(category)) return 'frame';
    return 'motors';
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-black flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Header Sticky Navigation */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b-2 border-black z-30">
        <EcosystemTopNav activeTab="catalogue" />
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        
        {/* En-tête Catalogue Blueprint */}
        <div className="border-b-2 border-zinc-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-[6px] bg-amber-400 text-black font-mono text-[10px] font-black uppercase tracking-wider">
                Catalogue Matériel
              </span>
              <span className="text-xs font-mono text-zinc-500 font-semibold uppercase">
                {CATALOG_PRODUCTS.length} Références Indexées • Multi-Boutiques
              </span>
              <span className="px-2 py-0.5 rounded-[6px] bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                Interconnecté au Forum & Diagnostic IA
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-mono font-black uppercase tracking-tight text-black">
              Matériel FPV, Pannes Répertoriées & Fiches Techniques
            </h1>
            <p className="text-sm text-zinc-600 mt-1 max-w-3xl font-normal">
              Explorez les composants officiels de l écosystème FPV. Chaque matériel dispose de ses spécifications fines, de ses taux de panne constatés et de ses solutions de réparation vérifiées par la communauté.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setPrefilledProductForReport(null);
                setReportModalOpen(true);
              }}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-black text-white hover:bg-zinc-800 font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>Signaler un retour (+150 XP)</span>
            </button>
          </div>
        </div>

        {/* Barre de Recherche & Filtres rapides */}
        <div className="bg-white rounded-2xl border-2 border-black p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une référence, marque, processeur, symptôme (ex: O3, F60, SpeedyBee, EdgeTX)..."
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border-2 border-zinc-200 rounded-xl font-mono text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Sélecteur de Marque */}
            <div className="sm:w-56">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2.5 bg-zinc-50 border-2 border-zinc-200 rounded-xl font-mono text-xs text-black focus:outline-none focus:border-black transition-colors cursor-pointer"
              >
                <option value="all">Toutes les marques ({allBrands.length})</option>
                {allBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Sélecteur de Statut */}
            <div className="sm:w-52">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2.5 bg-zinc-50 border-2 border-zinc-200 rounded-xl font-mono text-xs text-black focus:outline-none focus:border-black transition-colors cursor-pointer"
              >
                <option value="all">Tous statuts fiabilité</option>
                <option value="Recommandé">Recommandé</option>
                <option value="Fiable">Fiable</option>
                <option value="Attention Firmware">Attention Firmware</option>
              </select>
            </div>
          </div>

          {/* Pilules de Catégories */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-[10px] font-mono text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white shadow-xs'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black border border-zinc-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Compteur de résultats */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>{filteredProducts.length} référence(s) trouvée(s)</span>
          {(searchQuery || selectedCategory !== 'all' || selectedBrand !== 'all' || selectedStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSelectedStatus('all');
              }}
              className="text-red-600 hover:underline font-bold"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* Grille des Cartes Produits du Catalogue */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((prod) => {
            const diagSlug = getDiagnosticSlug(prod.category);
            const successRate = prod.reportedIssuesCount > 0
              ? Math.round((prod.verifiedFixesCount / prod.reportedIssuesCount) * 100)
              : 100;

            return (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border-2 border-black p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
              >
                {/* Header Carte */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-300 font-mono text-[9px] font-black uppercase text-zinc-800">
                          {prod.categoryName}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded font-mono text-[9px] font-black uppercase ${
                            prod.status === 'Recommandé'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : prod.status === 'Fiable'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {prod.status}
                        </span>
                      </div>
                      <h3 className="font-mono text-sm font-black uppercase text-black tracking-tight leading-snug group-hover:text-red-600 transition-colors">
                        {prod.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                        <span className="font-bold text-black">{prod.brand}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-600 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                          {prod.rating} ({prod.reviewCount} avis)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 font-normal italic">
                    « {prod.popularFor} »
                  </p>

                  {/* Tableau des Spécifications Clés */}
                  <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-200 space-y-1 text-[11px] font-mono">
                    {Object.entries(prod.specs).slice(0, 4).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between gap-2">
                        <span className="text-zinc-500">{key} :</span>
                        <span className="font-bold text-zinc-800 truncate max-w-[65%] text-right">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bloc Fiabilité & Retours Atelier */}
                  <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/60 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-zinc-600 font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Pannes identifiées :
                      </span>
                      <span className="font-black text-black">
                        {prod.reportedIssuesCount} signalées • {prod.verifiedFixesCount} résolues ({successRate}%)
                      </span>
                    </div>

                    {/* Dernier Fix Communautaire */}
                    {prod.latestFix && (
                      <div className="pt-2 border-t border-zinc-200 text-[10.5px] font-mono text-zinc-700">
                        <div className="text-zinc-500 font-bold mb-0.5">Dernière astuce vérifiée :</div>
                        <div className="text-zinc-900 font-medium line-clamp-2">
                          « {prod.latestFix.fix} »
                        </div>
                        <div className="text-[9.5px] text-zinc-400 mt-1">
                          Par {prod.latestFix.author} • {prod.latestFix.date}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Cartes */}
                <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/diagnostic/${diagSlug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black text-white hover:bg-zinc-800 font-mono text-[10.5px] font-bold uppercase tracking-wider transition-colors"
                  >
                    <Wrench className="w-3 h-3 text-amber-400" />
                    <span>Diagnostiquer</span>
                  </Link>

                  <Link
                    href={`/forum`}
                    className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl border border-zinc-300 hover:border-black text-zinc-700 hover:text-black font-mono text-[10.5px] font-bold uppercase transition-colors"
                    title="Voir les discussions du forum sur cette référence"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Forum</span>
                  </Link>

                  <button
                    onClick={() => handleOpenReport(prod)}
                    className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl border border-zinc-300 hover:border-black text-zinc-700 hover:text-black font-mono text-[10.5px] font-bold uppercase transition-colors cursor-pointer"
                    title="Soumettre un rapport d atelier sur cette pièce pour gagner +150 XP"
                  >
                    <span>+150 XP</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bannière d'interconnexion Écosystème */}
        <div className="p-6 sm:p-8 rounded-2xl border-2 border-black bg-zinc-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-600 text-white font-mono text-[10px] font-black uppercase tracking-wider">
              Réseau FPV Interconnecté
            </div>
            <h3 className="text-xl font-mono font-black uppercase tracking-tight text-white">
              Une pièce n est pas répertoriée dans le catalogue ?
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl">
              Soumettez votre référence ou votre rapport d atelier pour la faire indexer par l IA, enrichir la base commune et débloquer des points d expérience (XP) immédiats.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setPrefilledProductForReport(null);
                setReportModalOpen(true);
              }}
              className="px-5 py-3 rounded-xl bg-white text-black hover:bg-zinc-100 font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-red-600" />
              <span>Soumettre une nouvelle pièce</span>
            </button>
          </div>
        </div>
      </main>

      {/* Modale d'authentification */}
      <EcosystemAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(profile) => {
          setPilot(profile);
          setAuthModalOpen(false);
        }}
      />

      {/* Modale de rapport d'atelier */}
      <DetailedFixReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        componentName={prefilledProductForReport ? prefilledProductForReport.name : 'Composant FPV'}
        componentCategory={prefilledProductForReport ? prefilledProductForReport.category : 'general'}
        modelExact={prefilledProductForReport ? prefilledProductForReport.name : undefined}
        onReportSubmitted={handleNewReport}
      />
    </div>
  );
}
