'use client';

import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Sparkles,
  Check,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import {
  loginPilot,
  registerPilot,
  PilotProfile,
  ECOSYSTEM_SITES
} from '@/data/pilotGamification';

interface EcosystemAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: PilotProfile) => void;
}

export function EcosystemAuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
}: EcosystemAuthModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [callsign, setCallsign] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez renseigner votre adresse email et mot de passe.');
      return;
    }

    if (tab === 'register' && !callsign.trim()) {
      setError('Veuillez choisir un Callsign / Pseudo FPV.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      let user: PilotProfile;
      if (tab === 'register') {
        user = registerPilot(callsign, email);
      } else {
        user = loginPilot(email);
      }
      onAuthSuccess(user);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl border-2 border-black max-w-md w-full overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* EN-TÊTE STYLE MULTI-MOTORS */}
        <div className="p-5 border-b border-neutral-200 bg-neutral-50/90 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-500 block">
              COMPTE ÉCOSYSTÈME QUAD FPV
            </span>
            <h2 className="text-lg font-black text-neutral-900 mt-0.5">
              {tab === 'register' ? 'Créer mon compte pilote' : 'Connexion à votre espace'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-neutral-200 hover:border-black flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BANNIÈRE MUTUALISATION DES COMPTES */}
        <div className="p-3 bg-neutral-900 text-white text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-300 text-[11px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Compte Unique & Mutualisé</span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-snug">
            Un seul compte pour <strong>FixMyDrone</strong>, <strong>Multi-Motors</strong>, <strong>BindMyQuad</strong>, <strong>CamYQuad</strong>, <strong>MakeMyFrame</strong>, <strong>MakeMyQuad</strong> et <strong>FindMyQuad</strong>.
          </p>
        </div>

        {/* ONGLETS CONNEXION / INSCRIPTION */}
        <div className="flex border-b border-neutral-200 bg-neutral-100">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-2.5 text-xs font-bold transition-all ${
              tab === 'login'
                ? 'bg-white text-black border-b-2 border-black'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            J ai déjà un compte
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`flex-1 py-2.5 text-xs font-bold transition-all ${
              tab === 'register'
                ? 'bg-white text-black border-b-2 border-black'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            Créer un compte (+150 XP)
          </button>
        </div>

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-900 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {tab === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-700 block">
                Callsign / Pseudo FPV * :
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  required
                  placeholder="Ex: GHOST_FPV, PILOTE_42..."
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-black font-semibold uppercase"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-wider text-neutral-700 block">
              Adresse Email * :
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                required
                placeholder="pilote@exemple.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-black font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-wider text-neutral-700 block">
              Mot de passe * :
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                required
                placeholder="Minimum 6 caractères"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-black font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-40"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Connexion en cours...</span>
              </>
            ) : (
              <span>{tab === 'register' ? 'Créer mon compte écosystème' : 'Se connecter'}</span>
            )}
          </button>

          <p className="text-[10px] text-neutral-400 text-center leading-relaxed">
            En continuant, vous acceptez les conditions de service mutualisées de l écosystème Quad FPV.
          </p>
        </form>
      </div>
    </div>
  );
}
