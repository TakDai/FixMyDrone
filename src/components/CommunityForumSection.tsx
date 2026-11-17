'use client';

import React, { useState } from 'react';
import { CommunityPost } from '@/types';
import { 
  MessageSquare, 
  CheckCircle2, 
  Eye, 
  Clock, 
  Filter, 
  PlusCircle, 
  ShieldAlert, 
  Flame,
  Award,
  Sparkles
} from 'lucide-react';

interface CommunityForumSectionProps {
  posts: CommunityPost[];
  onOpenNewThread: () => void;
}

export function CommunityForumSection({
  posts,
  onOpenNewThread,
}: CommunityForumSectionProps) {
  const [filter, setFilter] = useState<'all' | 'resolved' | 'unresolved'>('all');

  const filteredPosts = posts.filter((post) => {
    if (filter === 'resolved') return post.isResolved;
    if (filter === 'unresolved') return !post.isResolved;
    return true;
  });

  return (
    <section id="forum" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
            <Flame className="w-4 h-4" />
            <span>Forum Communautaire FPV</span>
          </div>
          <h2 className="text-3xl font-black text-white">
            Dépannages Récents & Cas d Atelier
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-2xl">
            Des centaines de pilotes partagent leurs logs Blackbox, photos de soudures et réglages Betaflight. Rejoignez la discussion ou soumettez votre problème.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-zinc-900 border border-zinc-800 p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                filter === 'all' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                filter === 'resolved' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Résolus</span>
            </button>
          </div>

          <button
            onClick={onOpenNewThread}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-orange-500 hover:bg-orange-600 text-black shadow-lg shadow-orange-500/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nouveau sujet</span>
          </button>
        </div>
      </div>

      {/* Liste des discussions */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4 flex-1">
              <img
                src={post.author.avatar}
                alt={post.author.callsign}
                className="w-10 h-10 rounded-xl object-cover border border-zinc-700 shrink-0"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  {post.isResolved ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      RÉSOLU
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      EN COURS
                    </span>
                  )}

                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {post.categoryName}
                  </span>

                  {post.productName && (
                    <span className="text-xs font-mono text-orange-400/90 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                      {post.productName}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white hover:text-orange-400 cursor-pointer transition-colors">
                  {post.title}
                </h3>

                {post.solutionSummary && (
                  <p className="text-xs text-zinc-300 bg-zinc-950/80 p-2.5 rounded-xl border border-emerald-500/20 leading-relaxed">
                    <strong className="text-emerald-400 font-semibold">Solution validée : </strong>
                    {post.solutionSummary}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 pt-1">
                  <span>Par <strong className="text-zinc-300">@{post.author.callsign}</strong> ({post.author.badge})</span>
                  <span>•</span>
                  <span>{post.createdAt}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-zinc-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-zinc-400 shrink-0 self-end md:self-center">
              <div className="flex items-center gap-1 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800">
                <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
                <span className="font-semibold text-zinc-200">{post.replies}</span>
                <span className="text-[10px] text-zinc-500">réponses</span>
              </div>
              <div className="flex items-center gap-1 text-zinc-500">
                <Eye className="w-3.5 h-3.5" />
                <span>{post.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
