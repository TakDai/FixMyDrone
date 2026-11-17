'use client';

import React, { useState } from 'react';
import { Globe, Check, Copy, Terminal, Shield, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export function DomainBanner() {
  const [copied, setCopied] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const hostsEntry = "127.0.0.1 fixmydrone.fr";

  const handleCopy = () => {
    navigator.clipboard.writeText(hostsEntry);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      <div className="rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 border border-emerald-500/30 p-4 sm:p-5 shadow-xl relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">
                  Domaine configuré : <span className="text-emerald-400 font-mono">fixmydrone.fr</span>
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Prêt & Connecté
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                L application est configurée pour le domaine officiel <strong className="text-zinc-200">fixmydrone.fr</strong> (SEO, Metadata, OpenGraph & CORS).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>{detailsOpen ? 'Masquer détails' : 'Guide DNS & Local'}</span>
              {detailsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <a
              href="http://fixmydrone.fr:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-500/20"
            >
              <span>Tester fixmydrone.fr</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Détails dépliables pour la configuration du domaine */}
        {detailsOpen && (
          <div className="mt-4 pt-4 border-t border-zinc-800 text-xs space-y-3 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Option 1: Test Local immédiat */}
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-orange-400" />
                  1. Pour tester immédiatement en local sur votre PC :
                </span>
                <p className="text-[11px] text-zinc-400">
                  Ajoutez cette ligne dans <code className="text-zinc-200">C:\Windows\System32\drivers\etc\hosts</code> :
                </p>
                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-700 font-mono text-[11px] text-emerald-400">
                  <span>{hostsEntry}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1 hover:text-white transition-colors"
                    title="Copier"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[10px] text-zinc-500">
                  Vous pourrez ainsi taper <code className="text-emerald-400">http://fixmydrone.fr:3000</code> dans Chrome/Edge et arriver sur ce site en local.
                </p>
              </div>

              {/* Option 2: Déploiement Production (OVH / Cloudflare / Vercel) */}
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  2. Pour la mise en ligne publique sur Internet :
                </span>
                <p className="text-[11px] text-zinc-400">
                  Chez votre registrar (OVH, Gandi, Namecheap), renseignez les DNS :
                </p>
                <ul className="text-[11px] font-mono text-zinc-300 space-y-1">
                  <li>• <strong className="text-orange-400">Type A</strong> : @ ➔ <span className="text-emerald-400">76.76.21.21</span> (Vercel IP)</li>
                  <li>• <strong className="text-orange-400">Type CNAME</strong> : www ➔ <span className="text-emerald-400">cname.vercel-dns.com</span></li>
                </ul>
                <p className="text-[10px] text-zinc-500">
                  Le certificat SSL Let s Encrypt HTTPS sera automatiquement généré.
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
