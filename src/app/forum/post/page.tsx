'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { EcosystemTopNav } from '@/components/EcosystemTopNav';
import { FORUM_POSTS } from '@/data/forumPosts';
import { loadStoredCommunityFixes } from '@/data/dynamicResolutions';
import { DIAGNOSTIC_DEFINITIONS } from '@/data/diagnosticKnowledgeBase';
import {
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  Star,
  ThumbsUp,
  Send,
  Tag,
  User,
  Eye,
  Clock,
  AlertTriangle,
  Wrench,
} from 'lucide-react';

interface PostComment {
  id: string;
  author: string;
  text: string;
  rating?: number;
  createdAt: string;
}

const COMMENTS_KEY_PREFIX = 'fixmydrone_post_comments_v1_';
const RATINGS_KEY_PREFIX = 'fixmydrone_post_ratings_v1_';

function ForumPostDetailContent() {
  const searchParams = useSearchParams();
  const rawId = searchParams.get('id') || '';
  const motorParam = searchParams.get('motor') || '';

  const postData = useMemo(() => {
    const cleanForumId = rawId.startsWith('forum-') ? rawId.slice(6) : rawId;
    const fromForum = FORUM_POSTS.find((p) => p.id === cleanForumId || p.id === rawId);
    if (fromForum) {
      return {
        id: fromForum.id,
        title: fromForum.title,
        categoryName: fromForum.categoryName,
        brand: fromForum.brand,
        model: fromForum.model || motorParam,
        authorName: fromForum.author.callsign || fromForum.author.name,
        authorBadge: fromForum.author.badge,
        createdAt: fromForum.createdAt,
        views: fromForum.views,
        isResolved: fromForum.isResolved,
        rarityLabel: fromForum.rarityLabel,
        content: fromForum.solutionSummary || fromForum.title,
        tags: fromForum.tags,
        probableCauses: [] as string[],
        diagnosticSteps: [] as string[],
        recommendedFix: [] as string[],
        toolsNeeded: [] as string[],
      };
    }

    const stored = loadStoredCommunityFixes().find((r) => r.id === rawId);
    if (stored) {
      return {
        id: stored.id,
        title: stored.issue,
        categoryName: stored.componentId === 'motors' ? 'Moteurs Brushless' : stored.componentId,
        brand: stored.brand || 'Communauté',
        model: stored.model || motorParam,
        authorName: stored.author,
        authorBadge: 'Pilote Atelier',
        createdAt: new Date(stored.createdAt).toLocaleDateString('fr-FR'),
        views: 1,
        isResolved: true,
        rarityLabel: 'Retour pilote récent',
        content: stored.fix,
        tags: stored.keywords.slice(0, 6),
        probableCauses: [] as string[],
        diagnosticSteps: [] as string[],
        recommendedFix: [] as string[],
        toolsNeeded: [] as string[],
      };
    }

    for (const def of Object.values(DIAGNOSTIC_DEFINITIONS)) {
      const sym = def.symptoms.find((s) => s.id === rawId);
      if (sym) {
        return {
          id: sym.id,
          title: sym.title,
          categoryName: def.frenchTitle,
          brand: motorParam ? 'Moteur sélectionné' : 'Diagnostic Technique',
          model: motorParam,
          authorName: 'Base_FixMyDrone',
          authorBadge: sym.rarityLabel || 'Fiche Diagnostique',
          createdAt: 'Guide vérifié',
          views: 128,
          isResolved: true,
          rarityLabel: sym.rarityLabel,
          content: `${sym.description}\n\n${sym.aiDiagnostic.explanation}`,
          tags: sym.matchingForumQuery.slice(0, 6) as string[],
          probableCauses: Array.from(
            new Set([sym.aiDiagnostic.rootCause, sym.likelyCause].filter(Boolean))
          ) as string[],
          diagnosticSteps: sym.aiDiagnostic.testSteps as string[],
          recommendedFix: sym.aiDiagnostic.recommendedFix as string[],
          toolsNeeded: sym.aiDiagnostic.toolsNeeded as string[],
        };
      }
    }

    return null;
  }, [rawId, motorParam]);

  const [comments, setComments] = useState<PostComment[]>([]);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [userRating, setUserRating] = useState<number>(5);
  const [helpfulVotes, setHelpfulVotes] = useState<number>(0);
  const [hasVotedHelpful, setHasVotedHelpful] = useState(false);

  useEffect(() => {
    if (!postData?.id || typeof window === 'undefined') return;
    try {
      const savedComments = window.localStorage.getItem(COMMENTS_KEY_PREFIX + postData.id);
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      } else {
        setComments([
          {
            id: 'seed-1',
            author: 'Atelier_FPV',
            text: 'Solution testée et validée sur banc, pensez à vérifier le serrage après le premier vol.',
            rating: 5,
            createdAt: 'Vérifié communauté',
          },
        ]);
      }

      const savedRating = window.localStorage.getItem(RATINGS_KEY_PREFIX + postData.id);
      if (savedRating) {
        const parsed = JSON.parse(savedRating);
        setHelpfulVotes(parsed.helpfulVotes || 0);
        setHasVotedHelpful(Boolean(parsed.hasVotedHelpful));
      } else {
        setHelpfulVotes(12);
      }
    } catch {
      // ignore storage errors
    }
  }, [postData?.id]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postData?.id || !commentText.trim()) return;

    const nextComment: PostComment = {
      id: `c-${Date.now()}`,
      author: commentAuthor.trim() || 'Pilote_FPV',
      text: commentText.trim(),
      rating: userRating,
      createdAt: new Date().toLocaleDateString('fr-FR'),
    };

    const updated = [nextComment, ...comments];
    setComments(updated);
    setCommentText('');
    try {
      window.localStorage.setItem(COMMENTS_KEY_PREFIX + postData.id, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const toggleHelpfulVote = () => {
    if (!postData?.id) return;
    const nextVoted = !hasVotedHelpful;
    const nextCount = nextVoted ? helpfulVotes + 1 : Math.max(0, helpfulVotes - 1);
    setHasVotedHelpful(nextVoted);
    setHelpfulVotes(nextCount);
    try {
      window.localStorage.setItem(
        RATINGS_KEY_PREFIX + postData.id,
        JSON.stringify({ helpfulVotes: nextCount, hasVotedHelpful: nextVoted })
      );
    } catch {
      // ignore
    }
  };

  const averageRating = useMemo(() => {
    const rated = comments.filter((c) => typeof c.rating === 'number');
    if (rated.length === 0) return '5.0';
    const sum = rated.reduce((acc, c) => acc + (c.rating || 5), 0);
    return (sum / rated.length).toFixed(1);
  }, [comments]);

  if (!postData) {
    return (
      <div className="max-w-3xl mx-auto p-6 sm:p-10 text-center space-y-4">
        <h1 className="text-xl font-bold text-black">Discussion introuvable</h1>
        <p className="text-sm text-zinc-600">
          Ce post n’existe pas ou a été supprimé.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/forum"
            className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold"
          >
            Retour au Forum
          </Link>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl border border-black text-xs font-bold text-black"
          >
            Accueil Drone
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/forum"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-black"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au Forum</span>
        </Link>
        <Link
          href="/"
          className="text-xs font-mono text-zinc-500 hover:text-black underline"
        >
          Schéma interactif du drone →
        </Link>
      </div>

      {/* FICHE PRINCIPALE DU POST */}
      <article className="bg-white border-[1.5px] border-dashed border-black rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <span className="px-2.5 py-0.5 rounded-full bg-black text-white font-bold uppercase">
            {postData.categoryName}
          </span>
          {postData.brand && (
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-300 text-black font-bold">
              {postData.brand} {postData.model ? `· ${postData.model}` : ''}
            </span>
          )}
          {postData.isResolved && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#cbf3d2] border border-black/20 text-black font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Résolu</span>
            </span>
          )}
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-black leading-snug">
          {postData.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pb-4 border-b border-zinc-200">
          <span className="inline-flex items-center gap-1.5 font-semibold text-black">
            <User className="w-3.5 h-3.5" />
            <span>@{postData.authorName}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700">
              {postData.authorBadge}
            </span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{postData.createdAt}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{postData.views} vues</span>
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-black">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{averageRating} / 5 ({comments.length} avis)</span>
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#cbf3d2]/20 border border-emerald-700/30 space-y-2">
          <div className="text-xs font-mono uppercase font-bold text-emerald-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Solution & Diagnostic vérifié</span>
          </div>
          <p className="text-sm text-zinc-800 leading-relaxed whitespace-pre-line">
            {postData.content}
          </p>
        </div>

        {(postData.probableCauses.length > 0 ||
          postData.diagnosticSteps.length > 0 ||
          postData.recommendedFix.length > 0) && (
          <div className="space-y-4">
            {postData.probableCauses.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <div className="text-xs font-mono uppercase font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Causes probables</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-800">
                  {postData.probableCauses.map((cause, idx) => (
                    <li key={idx}>{cause}</li>
                  ))}
                </ul>
              </div>
            )}

            {postData.diagnosticSteps.length > 0 && (
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2.5">
                <div className="text-xs font-mono uppercase font-bold text-black flex items-center gap-1.5">
                  <Wrench className="w-4 h-4" />
                  <span>Étapes de contrôle & diagnostic</span>
                </div>
                <ol className="space-y-2 text-sm text-zinc-800">
                  {postData.diagnosticSteps.map((stepText, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-black text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{stepText}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {postData.recommendedFix.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#cbf3d2]/25 border border-emerald-700/30 space-y-2">
                <div className="text-xs font-mono uppercase font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Solutions recommandées</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-800">
                  {postData.recommendedFix.map((fixText, idx) => (
                    <li key={idx}>{fixText}</li>
                  ))}
                </ul>
              </div>
            )}

            {postData.toolsNeeded.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono uppercase text-zinc-500">Outils :</span>
                {postData.toolsNeeded.map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-800"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {postData.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-zinc-400" />
            {postData.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* BARRE DE NOTATION / UTILE */}
        <div className="pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={toggleHelpfulVote}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              hasVotedHelpful
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-black/30 hover:border-black'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Cette solution m’a aidé ({helpfulVotes})</span>
          </button>

          <span className="text-xs font-mono text-zinc-500">
            Note moyenne : <strong className="text-black">{averageRating}/5</strong>
          </span>
        </div>
      </article>

      {/* SECTION COMMENTAIRES & NOTATION */}
      <section className="bg-white border-[1.5px] border-dashed border-black rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <h2 className="text-base font-bold text-black flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span>Commentaires & Retours pilotes ({comments.length})</span>
        </h2>

        <form onSubmit={handleAddComment} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <input
              type="text"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              placeholder="Votre pseudo pilote..."
              className="px-3 py-2 border border-zinc-300 rounded-xl bg-white text-black focus:outline-none focus:border-black"
            />
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-zinc-600">Votre note :</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setUserRating(star)}
                  className="cursor-pointer p-0.5"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= userRating
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-zinc-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={2}
              placeholder="Ajoutez votre retour, précision ou commentaire..."
              className="flex-1 p-3 border border-zinc-300 rounded-xl bg-white text-black focus:outline-none focus:border-black"
              required
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publier</span>
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/60 space-y-1.5 text-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-black">@{c.author}</span>
                  {c.rating && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-mono text-amber-600">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      {c.rating}/5
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-zinc-400">{c.createdAt}</span>
              </div>
              <p className="text-zinc-700 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function ForumPostPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <header className="w-full sticky top-0 z-30 bg-white">
        <EcosystemTopNav activeTab="news" />
      </header>
      <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-zinc-500">Chargement de la discussion...</div>}>
        <ForumPostDetailContent />
      </Suspense>
    </div>
  );
}
