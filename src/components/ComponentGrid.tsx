'use client';

import React, { useState } from 'react';
import { DroneComponentInfo, ComponentCategory } from '@/types';
import { 
  Gauge, 
  Cpu, 
  Video, 
  Radio, 
  Shield, 
  Fan, 
  BatteryCharging, 
  Compass, 
  AlertCircle, 
  ChevronRight, 
  CheckCircle,
  Wrench,
  Search,
  Filter,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ComponentGridProps {
  components: DroneComponentInfo[];
  selectedCategory: ComponentCategory | null;
  onSelectCategory: (category: ComponentCategory | null) => void;
  onOpenReportModal: (componentName: string) => void;
  searchFilter?: string;
}

export function ComponentGrid({
  components,
  selectedCategory,
  onSelectCategory,
  onOpenReportModal,
  searchFilter = '',
}: ComponentGridProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Filtrer les composants si recherche
  const filteredComponents = components.filter((comp) => {
    const matchesSearch = 
      comp.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      comp.popularBrands.some((b) => b.toLowerCase().includes(searchFilter.toLowerCase())) ||
      comp.keyIssues.some((issue) => 
        issue.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        issue.solution.toLowerCase().includes(searchFilter.toLowerCase())
      );
    
    if (selectedCategory) {
      return comp.id === selectedCategory && (searchFilter ? matchesSearch : true);
    }
    return matchesSearch;
  });

  const getIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Gauge': return <Gauge className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Microchip': return <Cpu className={className} />;
      case 'Video': return <Video className={className} />;
      case 'Radio': return <Radio className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Fan': return <Fan className={className} />;
      case 'BatteryCharging': return <BatteryCharging className={className} />;
      case 'Compass': return <Compass className={className} />;
      default: return <Wrench className={className} />;
    }
  };

  return (
    <section id="composants" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header & Filtres */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-zinc-800 pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
            <Wrench className="w-4 h-4" />
            <span>Tous les organes d un quad FPV</span>
          </div>
          <h2 className="text-3xl font-black text-white">
            Composants & Catégories de Dépannage
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-2xl">
            Retrouvez chaque partie vitale de votre drone, explorez les pannes spécifiques à chaque pièce et appliquez les correctifs certifiés par nos pilotes constructeurs.
          </p>
        </div>

        {/* Filtres par boutons de catégories */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === null
                ? 'bg-orange-500 text-black shadow-md shadow-orange-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            Tous ({components.length})
          </button>
          {components.map((comp) => (
            <button
              key={comp.id}
              onClick={() => onSelectCategory(comp.id === selectedCategory ? null : comp.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                selectedCategory === comp.id
                  ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/20'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {getIcon(comp.iconName, "w-3.5 h-3.5")}
              <span>{comp.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grille des Composants étalés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((comp) => {
          const isExpanded = expandedCard === comp.id;

          return (
            <div
              key={comp.id}
              id={`cat-${comp.id}`}
              className="group rounded-2xl bg-zinc-900/70 border border-zinc-800/90 hover:border-orange-500/50 hover:bg-zinc-900 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-orange-500/10"
            >
              {/* Carte Top Header */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${comp.color} text-white shadow-md`}>
                    {getIcon(comp.iconName, "w-6 h-6")}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {comp.badge}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {comp.totalFixes} fixes
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                  {comp.name}
                </h3>
                <p className="text-xs text-orange-400/90 font-medium mt-0.5 mb-3">
                  {comp.tagline}
                </p>

                <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed mb-4">
                  {comp.description}
                </p>

                {/* Marques populaires */}
                <div className="mb-4">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mb-1">
                    Équipements courants
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {comp.popularBrands.slice(0, 4).map((brand) => (
                      <span
                        key={brand}
                        className="text-[11px] px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800 font-mono"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pannes typiques résolues */}
                <div className="space-y-2 border-t border-zinc-800/80 pt-4">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-orange-400" />
                    Pannes fréquentes diagnostiquées :
                  </span>

                  {comp.keyIssues.slice(0, isExpanded ? comp.keyIssues.length : 1).map((issue) => (
                    <div
                      key={issue.id}
                      className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-zinc-100">{issue.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                          {issue.difficulty}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug">
                        <strong className="text-emerald-400">Fix : </strong>
                        {issue.solution}
                      </p>
                    </div>
                  ))}

                  {comp.keyIssues.length > 1 && (
                    <button
                      onClick={() => setExpandedCard(isExpanded ? null : comp.id)}
                      className="text-[11px] text-orange-400 hover:text-orange-300 font-medium pt-1 flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'Réduire' : `Voir les ${comp.keyIssues.length} pannes types`}</span>
                      <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  )}
                </div>
              </div>

              {/* Carte Footer Actions */}
              <div className="px-6 py-3 bg-zinc-950/50 border-t border-zinc-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => onOpenReportModal(comp.name)}
                  className="text-zinc-400 hover:text-orange-400 flex items-center gap-1 transition-colors font-medium"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Signaler un fix</span>
                </button>
                <a
                  href="#catalogue"
                  className="font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
                >
                  <span>Catalogue ({comp.sampleProducts.length}+)</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
