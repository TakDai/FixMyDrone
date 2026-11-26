'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
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
  Heart,
  Send,
  Tag,
  Eye,
  Clock,
  AlertTriangle,
  Wrench,
  Reply,
  Bookmark,
  Share2,
  Check,
  Award,
  Users,
  Sparkles,
  ChevronDown,
  X,
} from 'lucide-react';

interface PostComment {
  id: string;
  author: string;
  badge?: string;
  text: string;
  rating?: number;
  createdAt: string;
  likes: number;
  replyTo?: string;
  isAcceptedSolution?: boolean;
}

const COMMENTS_KEY_PREFIX = 'fixmydrone_post_comments_v2_';
const META_KEY_PREFIX = 'fixmydrone_post_meta_v2_';

const AVATAR_COLORS = [
  'bg-emerald-600 text-white',
  'bg-sky-600 text-white',
  'bg-amber-600 text-white',
  'bg-violet-600 text-white',
  'bg-rose-600 text-white',
  'bg-zinc-900 text-white',
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
  const clean = name.replace(/^@/, '').trim();
  if (!clean) return 'FP';
  const parts = clean.split(/[\s_-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

function ForumPostDetailContent() {
  const searchParams = useSearchParams();
  const rawId = searchParams.get('id') || '';
  const motorParam = searchParams.get('motor') || '';
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const solutionRef = useRef<HTMLDivElement | null>(null);
  const composerSectionRef = useRef<HTMLDivElement | null>(null);

  const postData = useMemo(() => {
    const cleanForumId = rawId.startsWith('forum-') ? rawId.slice(6) : rawId;
    const fromForum = FORUM_POSTS.find((p) => p.id === cleanForumId || p.id === rawId);
    if (fromForum) {
      return {
        id: fromForum.id,
        title: fromForum.title,
        categoryId: fromForum.category,
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
        categoryId: stored.componentId,
        categoryName: stored.componentId === 'motors' ? 'Moteurs Brushless' : stored.componentId,
        brand: stored.brand || 'Communauté',
        model: stored.model || motorParam,
        authorName: stored.author,
        authorBadge: 'Pilote Atelier',
        createdAt: new Date(stored.createdAt).toLocaleDateString('fr-FR'),
        views: 24,
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
          categoryId: def.id,
          categoryName: def.frenchTitle,
          brand: motorParam ? 'Moteur sélectionné' : 'Diagnostic Technique',
          model: motorParam,
          authorName: 'Atelier_FixMyDrone',
          authorBadge: sym.rarityLabel || 'Fiche Diagnostique',
          createdAt: 'Mis à jour récemment',
          views: 342,
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

  const relatedTopics = useMemo(() => {
    if (!postData) return [];
    return FORUM_POSTS.filter((p) => p.id !== postData.id)
      .sort((a, b) => {
        const aMatch = a.category === postData.categoryId ? 1 : 0;
        const bMatch = b.category === postData.categoryId ? 1 : 0;
        return bMatch - aMatch;
      })
      .slice(0, 4);
  }, [postData]);

  const [comments, setComments] = useState<PostComment[]>([]);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [userRating, setUserRating] = useState<number>(5);
  const [replyTarget, setReplyTarget] = useState<string | null>(null);
  const [opLikes, setOpLikes] = useState<number>(14);
  const [hasLikedOp, setHasLikedOp] = useState(false);
  const [likedCommentIds, setLikedCommentIds] = useState<string[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

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
            author: 'KwadTech_FR',
            badge: 'Technicien ESC/BLHeli',
            text:
              postData.recommendedFix.length > 0
                ? `Je confirme cette piste : ${postData.recommendedFix[0]} Pensez aussi à vérifier les soudures au multimètre avant de remonter l'hélice.`
                : 'Solution testée et validée sur banc, pensez à vérifier le serrage des vis cloche/châssis après le premier vol de test.',
            rating: 5,
            createdAt: 'il y a 2 jours',
            likes: 9,
            isAcceptedSolution: true,
          },
          {
            id: 'seed-2',
            author: 'Bandit_FPV',
            badge: 'Pilote Freestyle',
            text: 'Merci pour la fiche détaillée ! Ça m’a évité de remplacer un ESC pour rien, c’était bien une vis trop longue qui touchait le bobinage.',
            rating: 5,
            createdAt: 'il y a 14h',
            likes: 4,
            replyTo: 'KwadTech_FR',
          },
        ]);
      }

      const savedMeta = window.localStorage.getItem(META_KEY_PREFIX + postData.id);
      if (savedMeta) {
        const parsed = JSON.parse(savedMeta);
        setOpLikes(typeof parsed.opLikes === 'number' ? parsed.opLikes : 14);
        setHasLikedOp(Boolean(parsed.hasLikedOp));
        setLikedCommentIds(Array.isArray(parsed.likedCommentIds) ? parsed.likedCommentIds : []);
        setIsBookmarked(Boolean(parsed.isBookmarked));
      } else {
        setOpLikes(14);
        setHasLikedOp(false);
        setLikedCommentIds([]);
        setIsBookmarked(false);
      }
    } catch {
      // ignore storage errors
    }
  }, [postData?.id, postData?.recommendedFix]);

  const persistMeta = (next: {
    opLikes: number;
    hasLikedOp: boolean;
    likedCommentIds: string[];
    isBookmarked: boolean;
  }) => {
    if (!postData?.id || typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(META_KEY_PREFIX + postData.id, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const toggleOpLike = () => {
    const nextLiked = !hasLikedOp;
    const nextLikes = nextLiked ? opLikes + 1 : Math.max(0, opLikes - 1);
    setHasLikedOp(nextLiked);
    setOpLikes(nextLikes);
    persistMeta({
      opLikes: nextLikes,
      hasLikedOp: nextLiked,
      likedCommentIds,
      isBookmarked,
    });
  };

  const toggleCommentLike = (commentId: string) => {
    const already = likedCommentIds.includes(commentId);
    const nextLikedIds = already
      ? likedCommentIds.filter((id) => id !== commentId)
      : [...likedCommentIds, commentId];
    const updatedComments = comments.map((c) => {
      if (c.id !== commentId) return c;
      return {
        ...c,
        likes: already ? Math.max(0, c.likes - 1) : c.likes + 1,
      };
    });
    setLikedCommentIds(nextLikedIds);
    setComments(updatedComments);
    persistMeta({
      opLikes,
      hasLikedOp,
      likedCommentIds: nextLikedIds,
      isBookmarked,
    });
    if (postData?.id) {
      try {
        window.localStorage.setItem(
          COMMENTS_KEY_PREFIX + postData.id,
          JSON.stringify(updatedComments)
        );
      } catch {
        // ignore
      }
    }
  };

  const toggleBookmark = () => {
    const next = !isBookmarked;
    setIsBookmarked(next);
    persistMeta({
      opLikes,
      hasLikedOp,
      likedCommentIds,
      isBookmarked: next,
    });
  };

  const toggleAcceptedSolution = (commentId: string) => {
    if (!postData?.id) return;
    const updated = comments.map((c) => ({
      ...c,
      isAcceptedSolution: c.id === commentId ? !c.isAcceptedSolution : false,
    }));
    setComments(updated);
    try {
      window.localStorage.setItem(COMMENTS_KEY_PREFIX + postData.id, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleReplyTo = (author: string) => {
    setReplyTarget(author);
    composerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => composerRef.current?.focus(), 300);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postData?.id || !commentText.trim()) return;

    const nextComment: PostComment = {
      id: `c-${Date.now()}`,
      author: commentAuthor.trim() || 'Pilote_FPV',
      badge: 'Membre Communauté',
      text: commentText.trim(),
      rating: userRating,
      createdAt: 'À l’instant',
      likes: 0,
      replyTo: replyTarget || undefined,
    };

    const updated = [...comments, nextComment];
    setComments(updated);
    setCommentText('');
    setReplyTarget(null);
    try {
      window.localStorage.setItem(COMMENTS_KEY_PREFIX + postData.id, JSON.stringify(updated));
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

  const participants = useMemo(() => {
    if (!postData) return [];
    const names = [postData.authorName, ...comments.map((c) => c.author)];
    return Array.from(new Set(names));
  }, [postData, comments]);

  const totalLikes = useMemo(() => {
    return opLikes + comments.reduce((acc, c) => acc + (c.likes || 0), 0);
  }, [opLikes, comments]);

  const acceptedComment = comments.find((c) => c.isAcceptedSolution);

  if (!postData) {
    return (
      <div className="max-w-3xl mx-auto p-6 sm:p-10 text-center space-y-4">
        <h1 className="text-xl font-bold text-black">Discussion introuvable</h1>
        <p className="text-sm text-zinc-600">
          Ce sujet n’existe pas ou a été déplacé.
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
            Schéma du drone
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* FIL D'ARIANE FORUM */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <Link
            href="/forum"
            className="inline-flex items-center gap-1.5 font-bold text-black hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Forum FixMyDrone</span>
          </Link>
          <span>/</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-black">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block" />
            <span>{postData.categoryName}</span>
          </span>
        </div>

        <Link
          href="/"
          className="text-xs font-mono text-zinc-600 hover:text-black underline"
        >
          ← Retour au schéma interactif du drone
        </Link>
      </div>

      {/* EN-TÊTE DU TOPIC (STYLE DISCOURSE) */}
      <header className="pb-5 border-b-2 border-zinc-200 mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {postData.isResolved && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-600 text-white text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Résolu</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-zinc-200/80 text-black text-[11px] font-mono font-bold">
            <span className="w-2 h-2 rounded-xs bg-black" />
            {postData.categoryName}
          </span>
          {postData.brand && (
            <span className="px-2.5 py-0.5 rounded-md bg-white border border-zinc-300 text-[11px] font-mono font-semibold text-zinc-800">
              {postData.brand}
              {postData.model ? ` · ${postData.model}` : ''}
            </span>
          )}
          {postData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-[11px] font-mono"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight leading-snug">
          {postData.title}
        </h1>
      </header>

      {/* CORPS DU FORUM : FIL DE DISCUSSION (GAUCHE) + TIMELINE DISCOURSE (DROITE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* COLONNE PRINCIPALE : STREAM DE POSTS */}
        <div className="lg:col-span-9 divide-y divide-zinc-200 bg-white border border-zinc-200 rounded-2xl shadow-xs">
          {/* POST #1 : SUJET ORIGINAL (OP) */}
          <article id="post-1" className="p-5 sm:p-7">
            <div className="flex items-start gap-4">
              {/* Avatar gauche */}
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0 ${getAvatarColor(
                  postData.authorName
                )}`}
              >
                {getInitials(postData.authorName)}
              </div>

              <div className="min-w-0 flex-1 space-y-4">
                {/* Méta auteur + numéro de post */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-black">@{postData.authorName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-700 font-semibold">
                      {postData.authorBadge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-500 font-mono">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {postData.createdAt}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 font-bold">
                      #1
                    </span>
                  </div>
                </div>

                {/* Contenu principal du post */}
                <div className="text-[15px] text-zinc-800 leading-relaxed whitespace-pre-line">
                  {postData.content}
                </div>

                {/* Détails techniques du diagnostic (si fiche diagnostic) */}
                {(postData.probableCauses.length > 0 ||
                  postData.diagnosticSteps.length > 0 ||
                  postData.recommendedFix.length > 0) && (
                  <div className="space-y-3 pt-1">
                    {postData.probableCauses.length > 0 && (
                      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1.5">
                        <div className="text-xs font-mono uppercase font-bold text-amber-900 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>Causes probables identifiées</span>
                        </div>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-800">
                          {postData.probableCauses.map((cause, idx) => (
                            <li key={idx}>{cause}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {postData.diagnosticSteps.length > 0 && (
                      <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                        <div className="text-xs font-mono uppercase font-bold text-black flex items-center gap-1.5">
                          <Wrench className="w-4 h-4" />
                          <span>Protocole de contrôle atelier</span>
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
                      <div className="p-4 rounded-xl bg-[#cbf3d2]/25 border border-emerald-700/30 space-y-1.5">
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
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-mono uppercase text-zinc-500">
                          Outils requis :
                        </span>
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

                {/* Encart résumé solution si une réponse est marquée comme solution */}
                {acceptedComment && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between gap-3">
                    <div className="text-xs text-emerald-950 flex items-center gap-2 min-w-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="truncate">
                        Résolu par <strong>@{acceptedComment.author}</strong> :{' '}
                        {acceptedComment.text}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        solutionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }
                      className="text-[11px] font-bold text-emerald-900 underline shrink-0 cursor-pointer"
                    >
                      Voir la solution ↓
                    </button>
                  </div>
                )}

                {/* Barre d'actions Discourse du Post #1 */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={toggleOpLike}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        hasLikedOp
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : 'text-zinc-600 hover:bg-zinc-100 hover:text-black'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${hasLikedOp ? 'fill-rose-500' : ''}`} />
                      <span>{opLikes}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 hover:bg-zinc-100 hover:text-black transition-colors cursor-pointer"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Lien copié</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Partager</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={toggleBookmark}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'text-zinc-600 hover:bg-zinc-100 hover:text-black'
                      }`}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`}
                      />
                      <span>{isBookmarked ? 'Enregistré' : 'Enregistrer'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleReplyTo(postData.authorName)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-black hover:text-white text-xs font-bold text-black transition-colors cursor-pointer"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Répondre</span>
                  </button>
                </div>

                {/* DISCOURSE TOPIC MAP (STATISTIQUES DU SUJET) */}
                <div className="mt-4 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-5">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-zinc-500">Créé</div>
                      <div className="font-bold text-black">{postData.createdAt}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-zinc-500">Réponses</div>
                      <div className="font-bold text-black">{comments.length}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-zinc-500">Vues</div>
                      <div className="font-bold text-black">{postData.views}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-zinc-500">J’aime</div>
                      <div className="font-bold text-black">{totalLikes}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-zinc-500">Note</div>
                      <div className="font-bold text-black inline-flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{averageRating}/5</span>
                      </div>
                    </div>
                  </div>

                  {/* Avatars des participants */}
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-zinc-400" />
                    <div className="flex -space-x-2">
                      {participants.slice(0, 5).map((pName) => (
                        <div
                          key={pName}
                          title={`@${pName}`}
                          className={`w-7 h-7 rounded-full ring-2 ring-white flex items-center justify-center font-mono text-[10px] font-bold ${getAvatarColor(
                            pName
                          )}`}
                        >
                          {getInitials(pName)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* RÉPONSES DU THREAD (#2, #3, ...) */}
          {comments.map((c, idx) => (
            <article
              key={c.id}
              id={`post-${idx + 2}`}
              ref={c.isAcceptedSolution ? solutionRef : undefined}
              className={`p-5 sm:p-7 transition-colors ${
                c.isAcceptedSolution ? 'bg-emerald-50/35' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 ${getAvatarColor(
                    c.author
                  )}`}
                >
                  {getInitials(c.author)}
                </div>

                <div className="min-w-0 flex-1 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-black">@{c.author}</span>
                      {c.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-700">
                          {c.badge}
                        </span>
                      )}
                      {c.isAcceptedSolution && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-600 text-white font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Solution acceptée</span>
                        </span>
                      )}
                      {typeof c.rating === 'number' && (
                        <span className="inline-flex items-center gap-0.5 text-[11px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                          {c.rating}/5
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                      <span>{c.createdAt}</span>
                      <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 font-bold">
                        #{idx + 2}
                      </span>
                    </div>
                  </div>

                  {c.replyTo && (
                    <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                      <Reply className="w-3 h-3" />
                      <span>En réponse à @{c.replyTo}</span>
                    </div>
                  )}

                  <p className="text-[14px] text-zinc-800 leading-relaxed whitespace-pre-line">
                    {c.text}
                  </p>

                  {/* Actions sur chaque réponse */}
                  <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggleCommentLike(c.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          likedCommentIds.includes(c.id)
                            ? 'bg-rose-50 text-rose-600 border border-rose-200'
                            : 'text-zinc-600 hover:bg-zinc-100 hover:text-black'
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            likedCommentIds.includes(c.id) ? 'fill-rose-500' : ''
                          }`}
                        />
                        <span>{c.likes}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleAcceptedSolution(c.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          c.isAcceptedSolution
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'text-zinc-500 hover:bg-zinc-100 hover:text-black'
                        }`}
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>{c.isAcceptedSolution ? 'Solution validée' : 'Marquer solution'}</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleReplyTo(c.author)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-zinc-600 hover:bg-zinc-100 hover:text-black transition-colors cursor-pointer"
                    >
                      <Reply className="w-3.5 h-3.5" />
                      <span>Répondre</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* COMPOSER DE RÉPONSE (STYLE DISCOURSE) */}
          <section ref={composerSectionRef} className="p-5 sm:p-7 bg-zinc-50/70 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-black flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Répondre à la discussion</span>
              </h2>
              {replyTarget && (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-white border border-zinc-300 px-2.5 py-1 rounded-full">
                  <Reply className="w-3 h-3" />
                  <span>En réponse à @{replyTarget}</span>
                  <button
                    type="button"
                    onClick={() => setReplyTarget(null)}
                    className="text-zinc-400 hover:text-black cursor-pointer"
                    aria-label="Annuler la citation"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <form onSubmit={handleAddComment} className="space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <input
                  type="text"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="Votre pseudo pilote (ex: Mavic_FPV)..."
                  className="px-3.5 py-2 border border-zinc-300 rounded-xl bg-white text-black focus:outline-none focus:border-black min-w-[220px]"
                />
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-zinc-200">
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

              <textarea
                ref={composerRef}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                required
                placeholder="Partagez votre retour d'atelier, vos mesures au multimètre ou une alternative..."
                className="w-full px-3.5 py-2.5 border border-zinc-300 rounded-xl bg-white text-black text-sm focus:outline-none focus:border-black"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publier la réponse</span>
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* COLONNE DROITE : TIMELINE DISCOURSE + SUJETS LIÉS */}
        <aside className="lg:col-span-3 space-y-5 lg:sticky lg:top-24">
          {/* Timeline verticale style Discourse */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-500 uppercase">
              <span>Fil du sujet</span>
              <span className="text-black">{comments.length + 1} messages</span>
            </div>

            <div className="border-l-2 border-zinc-200 pl-3 space-y-2.5 text-xs">
              <a
                href="#post-1"
                className="block font-bold text-black hover:underline"
              >
                #1 · Sujet original
              </a>
              {acceptedComment && (
                <button
                  type="button"
                  onClick={() =>
                    solutionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }
                  className="block text-left font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  ✓ Solution acceptée
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  composerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
                className="inline-flex items-center gap-1 text-zinc-600 hover:text-black cursor-pointer"
              >
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Bas de la discussion</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleReplyTo(postData.authorName)}
              className="w-full py-2.5 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Reply className="w-3.5 h-3.5" />
              <span>Répondre au sujet</span>
            </button>
          </div>

          {/* Note communautaire */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 space-y-2 shadow-xs">
            <div className="text-[11px] font-mono uppercase font-bold text-zinc-500">
              Fiabilité communauté
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= Math.round(Number(averageRating))
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-zinc-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-black">{averageRating} / 5</span>
            </div>
            <p className="text-[11px] text-zinc-500">
              Basé sur {comments.length} avis et {totalLikes} votes utiles.
            </p>
          </div>

          {/* Sujets similaires (navigation forum) */}
          {relatedTopics.length > 0 && (
            <div className="bg-white border border-zinc-200 rounded-2xl p-4 space-y-3 shadow-xs">
              <div className="text-[11px] font-mono uppercase font-bold text-zinc-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Sujets similaires</span>
              </div>
              <div className="space-y-2.5">
                {relatedTopics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/forum/post/?id=${encodeURIComponent(topic.id)}`}
                    className="block p-2.5 rounded-xl border border-zinc-100 hover:border-black bg-zinc-50/60 hover:bg-white transition-all space-y-1"
                  >
                    <div className="text-xs font-bold text-black line-clamp-2 leading-snug">
                      {topic.title}
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span>{topic.categoryName}</span>
                      <span className="inline-flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {topic.views}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

export default function ForumPostDetailPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-black flex flex-col font-sans">
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b-2 border-black z-30">
        <EcosystemTopNav activeTab="news" />
      </header>
      <Suspense
        fallback={
          <div className="max-w-5xl mx-auto p-8 text-sm font-mono text-zinc-500">
            Chargement de la discussion...
          </div>
        }
      >
        <ForumPostDetailContent />
      </Suspense>
    </div>
  );
}
