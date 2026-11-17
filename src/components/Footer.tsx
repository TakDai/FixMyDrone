import React from 'react';
import { Wrench, Radio, Shield, Heart, ExternalLink, MessageSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950 text-zinc-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Colonne 1 : Brand & Mission */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-black font-black">
              <Wrench className="w-4 h-4" />
            </div>
            <span className="text-lg font-black text-white">
              FixMy<span className="text-orange-400">Drone</span>.fr
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            La première plateforme d entraide, de diagnostic et de documentation technique participative pour les pilotes de drones FPV en France.
          </p>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Domaine officiel : fixmydrone.fr</span>
          </div>
        </div>

        {/* Colonne 2 : Catégories Rapides */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-white uppercase tracking-wider mb-2">Composants FPV</h4>
          <ul className="space-y-1.5">
            <li><a href="#cat-motors" className="hover:text-orange-400 transition-colors">Moteurs Brushless & Cloches</a></li>
            <li><a href="#cat-esc-stack" className="hover:text-orange-400 transition-colors">ESC 4-en-1 & Stack 30x30</a></li>
            <li><a href="#cat-flight-controller" className="hover:text-orange-400 transition-colors">Contrôleur de Vol & Gyro</a></li>
            <li><a href="#cat-vtx-camera" className="hover:text-orange-400 transition-colors">Systèmes HD DJI O3 / Walksnail</a></li>
            <li><a href="#cat-receiver-rx" className="hover:text-orange-400 transition-colors">ExpressLRS & TBS Crossfire</a></li>
          </ul>
        </div>

        {/* Colonne 3 : Écosystème & Partenaires */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-white uppercase tracking-wider mb-2">Catalogue & Stores</h4>
          <ul className="space-y-1.5">
            <li><a href="#catalogue" className="hover:text-orange-400 transition-colors">Catalogue Multi-Motors Sync</a></li>
            <li><a href="#catalogue" className="hover:text-orange-400 transition-colors">Pannes par Référence Produit</a></li>
            <li><a href="#forum" className="hover:text-orange-400 transition-colors">Forum d Entraide & Blackbox</a></li>
            <li><a href="#forum" className="hover:text-orange-400 transition-colors">Guides Débutant Betaflight 4.5</a></li>
          </ul>
        </div>

        {/* Colonne 4 : Communauté & Sécurité */}
        <div className="space-y-3 text-xs">
          <h4 className="font-bold text-white uppercase tracking-wider">Communauté Pilotes</h4>
          <p className="text-zinc-500 text-[11px]">
            Un doute sur une soudure ou un comportement anormal en vol ? Partagez vos logs Blackbox pour un diagnostic express.
          </p>
          <div className="pt-1">
            <span className="inline-block px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
              Conforme réglementation DGAC / EASA
            </span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-zinc-850 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-4">
        <p>© 2026 FixMyDrone.fr — Plateforme communautaire indépendante dédiée au FPV.</p>
        <div className="flex items-center gap-1 text-zinc-500">
          <span>Développé pour la communauté FPV avec passion</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
        </div>
      </div>
    </footer>
  );
}
