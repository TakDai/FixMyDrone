'use client';

import React, { useState } from 'react';
import { ProductCatalogItem } from '@/types';
import { 
  ShoppingBag, 
  AlertTriangle, 
  CheckCircle, 
  MessageSquare, 
  Star, 
  Plus, 
  Search, 
  ExternalLink,
  SlidersHorizontal,
  Wrench,
  ThumbsUp,
  Tag
} from 'lucide-react';

interface ProductCatalogSectionProps {
  products: ProductCatalogItem[];
  onOpenReportModal: (productName: string) => void;
}

export function ProductCatalogSection({
  products,
  onOpenReportModal,
}: ProductCatalogSectionProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'motors' | 'esc-stack' | 'vtx-camera' | 'receiver-rx' | 'frame'>('all');
  
  // Gestion d'un commentaire/fix soumis localement pour démonstration d'interconnexion
  const [addedFixes, setAddedFixes] = useState<{ [productId: string]: { issue: string; fix: string; author: string; date: string }[] }>({});
  const [openAddFixFor, setOpenAddFixFor] = useState<string | null>(null);
  const [tempIssue, setTempIssue] = useState('');
  const [tempFix, setTempFix] = useState('');
  const [tempAuthor, setTempAuthor] = useState('');

  const brands = ['all', 'T-Motor', 'SpeedyBee', 'DJI', 'RadioMaster', 'ImpulseRC', 'Gemfan'];

  const filteredProducts = products.filter((prod) => {
    const matchesBrand = selectedBrand === 'all' || prod.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesCategory = activeTab === 'all' || prod.category === activeTab;
    const matchesSearch = 
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.popularFor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.entries(prod.specs).some(([k, v]) => v.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesBrand && matchesCategory && matchesSearch;
  });

  const handleAddCustomFix = (productId: string) => {
    if (!tempIssue || !tempFix) return;

    const newFix = {
      issue: tempIssue,
      fix: tempFix,
      author: tempAuthor.trim() || 'Pilote_Anonyme',
      date: 'À l instant',
    };

    setAddedFixes((prev) => ({
      ...prev,
      [productId]: [newFix, ...(prev[productId] || [])],
    }));

    setTempIssue('');
    setTempFix('');
    setTempAuthor('');
    setOpenAddFixFor(null);
  };

  return (
    <section id="catalogue" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
            <ShoppingBag className="w-4 h-4" />
            <span>Catalogue Interconnecté & Base Multi-Motors</span>
          </div>
          <h2 className="text-3xl font-black text-white">
            Matériel FPV, Pannes Répertoriées & Fixes par Modèle
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-3xl">
            Toutes les pièces de drone que vous achetez (moteurs, stacks, émetteurs vidéo...) sont ici reliées au forum. Chaque problème rencontré sur un produit est automatiquement indexé avec son guide de réparation.
          </p>
        </div>

        {/* Source d'interconnexion */}
        <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-3 rounded-2xl shrink-0">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <div className="text-xs">
            <span className="font-semibold text-zinc-200 block">Flux Multi-Motors Connecté</span>
            <span className="text-[11px] text-zinc-500">Synchronisation des retours atelier en direct</span>
          </div>
        </div>
      </div>

      {/* Barre de filtres & Recherche */}
      <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Barre de recherche dans le catalogue */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Chercher une référence de moteur, FC, VTX..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-zinc-950 text-zinc-100 placeholder-zinc-500 rounded-xl border border-zinc-800 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Filtres par marque */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <span className="text-xs text-zinc-500 font-semibold mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Marque:
          </span>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedBrand === brand
                  ? 'bg-orange-500 text-black'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {brand === 'all' ? 'Toutes les marques' : brand}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des produits du catalogue */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => {
          const productFixes = [
            ...(addedFixes[prod.id] || []),
            ...(prod.latestFix ? [prod.latestFix] : [])
          ];

          return (
            <div
              key={prod.id}
              className="rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between overflow-hidden shadow-lg"
            >
              <div className="p-6">
                {/* Header Produit */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">
                      {prod.brand} • {prod.categoryName}
                    </span>
                    <h3 className="text-lg font-black text-white mt-1 leading-snug">
                      {prod.name}
                    </h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap ${
                    prod.status === 'Recommandé' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                    prod.status === 'Fiable' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                    'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {prod.status}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 italic mb-4">
                  Idéal pour : {prod.popularFor}
                </p>

                {/* Spécifications techniques */}
                <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 mb-4 space-y-1 text-xs">
                  {Object.entries(prod.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-[11px]">
                      <span className="text-zinc-500">{key} :</span>
                      <span className="font-mono text-zinc-300 font-semibold">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Compteurs de santé & pannes */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                    <span className="block text-xs font-mono font-bold text-red-400">
                      {prod.reportedIssuesCount + (addedFixes[prod.id]?.length || 0)}
                    </span>
                    <span className="text-[10px] text-zinc-400">Pannes signalées</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <span className="block text-xs font-mono font-bold text-emerald-400">
                      {prod.verifiedFixesCount + (addedFixes[prod.id]?.length || 0)}
                    </span>
                    <span className="text-[10px] text-zinc-400">Fixes validés</span>
                  </div>
                </div>

                {/* Dernier Fix Communautaire Interconnecté */}
                <div className="border-t border-zinc-800 pt-3">
                  <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wide flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Fix communautaire vérifié :
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {productFixes.length} retours
                    </span>
                  </span>

                  {productFixes.length > 0 ? (
                    <div className="p-3 rounded-xl bg-zinc-950 border border-emerald-500/20 space-y-1.5 text-xs">
                      <p className="font-semibold text-zinc-200 text-[11px]">
                        ⚠️ {productFixes[0].issue}
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        <strong className="text-emerald-400">Solution : </strong>
                        {productFixes[0].fix}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                        <span>Par <span className="text-zinc-300 font-mono">@{productFixes[0].author}</span></span>
                        <span>{productFixes[0].date}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-500 italic">Aucun problème majeur signalé.</p>
                  )}
                </div>

                {/* Formulaire dépliable pour ajouter un fix/panne en direct */}
                {openAddFixFor === prod.id && (
                  <div className="mt-4 p-3 rounded-xl bg-zinc-950 border border-orange-500/40 space-y-2 text-xs">
                    <span className="font-bold text-orange-400 block text-xs">
                      Contribuer à FixMyDrone sur ce produit :
                    </span>
                    <input
                      type="text"
                      placeholder="Problème rencontré (ex: chauffe, connecteur dur...)"
                      value={tempIssue}
                      onChange={(e) => setTempIssue(e.target.value)}
                      className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                    />
                    <textarea
                      placeholder="Comment avez-vous réglé le souci ?"
                      value={tempFix}
                      onChange={(e) => setTempFix(e.target.value)}
                      rows={2}
                      className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Votre pseudo pilote"
                        value={tempAuthor}
                        onChange={(e) => setTempAuthor(e.target.value)}
                        className="flex-1 p-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                      />
                      <button
                        onClick={() => handleAddCustomFix(prod.id)}
                        className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-lg text-xs"
                      >
                        Publier
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="px-6 py-3.5 bg-zinc-950/70 border-t border-zinc-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => setOpenAddFixFor(openAddFixFor === prod.id ? null : prod.id)}
                  className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{openAddFixFor === prod.id ? 'Annuler' : 'Ajouter un fix/avis'}</span>
                </button>
                <button
                  onClick={() => onOpenReportModal(prod.name)}
                  className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Signaler panne</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
