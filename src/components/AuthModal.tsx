'use client';

import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  KeyRound, 
  Sparkles, 
  Radio, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { PilotUser } from '@/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: PilotUser) => void;
}

export function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  
  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Register fields
  const [callsign, setCallsign] = useState('');
  const [droneType, setDroneType] = useState('5" Freestyle 6S');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez renseigner votre email et mot de passe.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }

    setLoading(true);

    // Simulation authentification sécurisée
    setTimeout(() => {
      setLoading(false);
      const user: PilotUser = {
        id: 'user-auth-123',
        callsign: email.split('@')[0].toUpperCase() + '_FPV',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
        role: 'Constructeur Vérifié',
        badge: 'Expert Betaflight',
        dronesCount: 3,
        reputation: 240,
        fixesShared: 7,
      };
      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!callsign || !email || !password) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (password.length < 8) {
      setError('Pour votre sécurité, choisissez un mot de passe d au moins 8 caractères.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const user: PilotUser = {
        id: 'user-' + Date.now(),
        callsign: callsign,
        email: email,
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80',
        role: 'Pilote',
        badge: 'Pilote Rookie',
        dronesCount: 1,
        reputation: 50,
        fixesShared: 1,
      };
      onLoginSuccess(user);
      onClose();
    }, 700);
  };

  const handleQuickDemoLogin = () => {
    const demoUser: PilotUser = {
      id: 'demo-pilot',
      callsign: 'ApexRider_FPV',
      email: 'pilote@fixmydrone.fr',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'Constructeur Vérifié',
      badge: 'Maestro du Fer à Souder',
      dronesCount: 4,
      reputation: 520,
      fixesShared: 19,
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl p-6 sm:p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Glow de fond */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Bouton fermeture */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Modal */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-500/30 mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-white">
            Espace Pilote Sécurisé
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Connectez-vous pour poser vos questions, voter les fixes et enregistrer votre hangar de drones.
          </p>
        </div>

        {/* Onglets Connexion / Inscription */}
        <div className="flex rounded-xl bg-zinc-900 p-1 mb-6 border border-zinc-800">
          <button
            onClick={() => { setTab('login'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'login' ? 'bg-orange-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'register' ? 'bg-orange-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Créer un compte
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulaire Connexion */}
        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                Email Pilote
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pilote@domaine.fr"
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-zinc-300">
                  Mot de passe
                </label>
                <a href="#" className="text-[11px] text-orange-400 hover:underline">
                  Oublié ?
                </a>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Vérification sécurisée...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Se connecter à FixMyDrone</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Formulaire Inscription */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Callsign / Pseudo de vol *
              </label>
              <div className="relative">
                <Radio className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value)}
                  placeholder="ex: GhostPilot_FPV"
                  className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@fpv.fr"
                  className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Mot de passe (8+ caractères) *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Quad principal piloté
              </label>
              <select
                value={droneType}
                onChange={(e) => setDroneType(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-orange-500"
              >
                <option value="5 Freestyle 6S">5" Freestyle 6S (Apex / Nazgul / JeNo)</option>
                <option value="5 Racing 6S">5" Racing Course FPV</option>
                <option value="3.5 Cinewhoop">3.5" Cinewhoop / Cinematic</option>
                <option value="7 Long Range">7" Long Range Mountain</option>
                <option value="Tiny Whoop 1S/2S">Tiny Whoop 65/75mm Indoor</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Création de votre hangar...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Rejoindre la communauté</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Bouton Démo Rapide */}
        <div className="mt-5 pt-4 border-t border-zinc-800 text-center">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="text-xs text-zinc-400 hover:text-orange-400 transition-colors flex items-center justify-center gap-1.5 mx-auto"
          >
            <User className="w-3.5 h-3.5" />
            <span>Tester en 1-clic avec un compte Pilote Démo</span>
          </button>
        </div>

        {/* Note sécurité */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-zinc-500">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>Protection SSL 256-bit • Sessions chiffrées fixmydrone.fr</span>
        </div>
      </div>
    </div>
  );
}
