'use client';

import React, { useState } from 'react';
import { X, BookOpen, MessageSquare, Radio, Sparkles, CheckCircle2 } from 'lucide-react';
import { PilotUser } from '@/types';

// Modal 1 : C'est quoi le FPV ?
export function FPVIntroModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-xl bg-white border-[1.5px] border-dashed border-black rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-150">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-black hover:bg-zinc-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-3xl font-light italic tracking-tight text-black mb-4">
          C&apos;est quoi le FPV ?
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-zinc-700 leading-relaxed">
          <p>
            Le <strong className="text-black">FPV (First Person View)</strong>, ou vol en immersion, permet de piloter un drone en temps réel comme si vous étiez assis dans le cockpit, grâce à une micro-caméra embarquée et des lunettes ou un masque vidéo.
          </p>
          <p>
            Contrairement aux drones stabilisés avec GPS automatique (type drones de prise de vue classiques), les quads FPV se pilotent en <strong className="text-black">mode Acro (manuel pur)</strong> : sans assistance d horizon automatique, permettant des figures de voltige aérienne, du freestyle, de la course (racing) ou des vols cinématiques rasants.
          </p>
          <p>
            Parce que les pilotes FPV poussent leurs machines à la limite et réparent eux-mêmes chaque composant, <strong className="text-black">FixMyDrone (FixMyQuad)</strong> a été créé pour mutualiser tous les diagnostics de pannes et solutions de l atelier.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-dashed border-black/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#cbf3d2] border border-black text-black font-bold text-xs uppercase tracking-wider hover:bg-[#bbf0c4] transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal 2 : Guides de Dépannage
export function GuidesModal({ isOpen, onClose, onSelectComponent }: { isOpen: boolean; onClose: () => void; onSelectComponent: (cat: string) => void }) {
  if (!isOpen) return null;

  const guides = [
    { title: 'Diagnostiquer un Death Roll / Desync ESC', category: 'esc', desc: 'Comment identifier si un moteur ou un variateur coupe en vol.' },
    { title: 'Éliminer le Jello et les oscillations Gyro', category: 'fc', desc: 'Réglages des filtres Betaflight 4.5, RPM filter et visserie.' },
    { title: 'Configuration et Binding ExpressLRS 2.4G', category: 'rx', desc: 'Mettre à jour le firmware par Wi-Fi et configurer la binding phrase.' },
    { title: 'Optimisation de la portée vidéo analogique & HD', category: 'vtx', desc: 'Choix des antennes RHCP, PitMode et évitement de surchauffe.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-2xl bg-white border-[1.5px] border-dashed border-black rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-150 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-black hover:bg-zinc-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-3xl font-light tracking-tight text-black mb-2">
          Guides d Atelier FPV
        </h2>
        <p className="text-xs text-zinc-500 mb-6 italic">
          Tutoriels pas à pas pour réparer et fiabiliser votre drone.
        </p>

        <div className="space-y-3">
          {guides.map((g, idx) => (
            <div
              key={idx}
              onClick={() => { onSelectComponent(g.category); onClose(); }}
              className="p-4 rounded-2xl border-[1.5px] border-dashed border-black/50 hover:bg-zinc-50 transition-colors cursor-pointer flex items-center justify-between"
            >
              <div>
                <h4 className="font-semibold text-black text-sm">{g.title}</h4>
                <p className="text-xs text-zinc-600 mt-0.5">{g.desc}</p>
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-[#f7eed7] border border-black shrink-0">
                Consulter
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Modal 3 : Forum Communautaire
export function ForumModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-2xl bg-white border-[1.5px] border-dashed border-black rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-150 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-black hover:bg-zinc-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-3xl font-light tracking-tight text-black mb-2">
          Forum Communautaire
        </h2>
        <p className="text-xs text-zinc-500 mb-6 italic">
          Échangez avec les pilotes et postez vos logs Blackbox pour analyse.
        </p>

        <div className="p-4 rounded-2xl bg-[#cbf3d2]/20 border border-emerald-600/40 mb-4 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-black">[RÉSOLU] Desync Nazgul5 après changement de moteur</span>
            <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded font-mono">14 réponses</span>
          </div>
          <p className="text-zinc-700">
            « Le problème venait du timing Bluejay réglé à 16° au lieu de 24° pour les 2207. Merci à la commu ! »
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-black">Perte de signal vidéo DJI O3 à 50m</span>
            <span className="text-[10px] bg-zinc-200 text-zinc-800 px-2 py-0.5 rounded font-mono">6 réponses</span>
          </div>
          <p className="text-zinc-600">
            « Vérifie que ton antenne double n est pas pliée sous la top plate. »
          </p>
        </div>
      </div>
    </div>
  );
}

// Modal 4 : Inscription / Création de compte (comme la frame Connexion Figma avec bouton bleu ciel CREER)
export function RegisterModal({
  isOpen,
  onClose,
  onRegisterSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (user: PilotUser) => void;
}) {
  const [callsign, setCallsign] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: PilotUser = {
      id: 'pilot-' + Date.now(),
      callsign: callsign.trim() || 'Dousile',
      email: email.trim() || 'dousile@fixmydrone.fr',
      avatar: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'Pilote',
      badge: 'Constructeur Vérifié',
      dronesCount: 2,
      reputation: 150,
      fixesShared: 3,
    };
    onRegisterSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-md bg-white border-[1.5px] border-dashed border-black rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-150">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-black hover:bg-zinc-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-light tracking-tight text-black mb-1">
          Créer un compte Pilote
        </h3>
        <p className="text-xs text-zinc-500 mb-6 italic">
          Enregistrez votre profil pour voter et publier des fixes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-black mb-1">
              Nom d utilisateur / Callsign *
            </label>
            <input
              type="text"
              value={callsign}
              onChange={(e) => setCallsign(e.target.value)}
              placeholder="Dousile"
              className="w-full p-2.5 border-[1.5px] border-dashed border-black rounded-xl text-black focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-black mb-1">
              Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pilote@fixmydrone.fr"
              className="w-full p-2.5 border-[1.5px] border-dashed border-black rounded-xl text-black focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-black mb-1">
              Mot de passe *
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 border-[1.5px] border-dashed border-black rounded-xl text-black focus:outline-none"
              required
            />
          </div>

          {/* Bouton CREER en bleu ciel pastel exact de la maquette Figma */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#d8ecf8] hover:bg-[#c2e2f5] text-black font-bold border border-black uppercase tracking-wider transition-colors cursor-pointer shadow-xs mt-2"
          >
            CRÉER
          </button>
        </form>
      </div>
    </div>
  );
}
