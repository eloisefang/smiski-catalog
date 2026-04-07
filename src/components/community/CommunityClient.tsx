"use client";

import { useCallback, useMemo, useState } from "react";
import { MOCK_COMMUNITY_POSTS, MOCK_TRADE_POSTS } from "@/src/data/community-mock";
import {
  communityGhostButtonClass,
  communityHeroClass,
  communityPageShell,
  communityPrimaryButtonClass,
  communitySelectClass,
  communityTabButtonClass,
} from "@/src/lib/community-ui";
import { emptyStateClass, filterSectionClass } from "@/src/lib/catalog-ui";
import type { CommunityComment, CommunityPost, TradePost } from "@/src/types/community";
import { CreatePostModal, type CreatePayload } from "@/src/components/community/CreatePostModal";
import { PostCard } from "@/src/components/community/PostCard";
import { TradeCard } from "@/src/components/community/TradeCard";

type Tab = "collections" | "trade" | "showcase";

type Props = {
  /** All catalog series names — same source as the main Smiski filter */
  seriesOptions: string[];
};

function buildCommentsMap(posts: CommunityPost[]): Record<string, CommunityComment[]> {
  return Object.fromEntries(
    posts.map((p) => [p.id, [...(p.comments ?? [])]]),
  );
}

export function CommunityClient({ seriesOptions }: Props) {
  const [tab, setTab] = useState<Tab>("collections");
  const [posts, setPosts] = useState<CommunityPost[]>(() => [...MOCK_COMMUNITY_POSTS]);
  const [trades, setTrades] = useState<TradePost[]>(() => [...MOCK_TRADE_POSTS]);
  const [seriesFilter, setSeriesFilter] = useState<string>("all");
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());
  const [commentsByPost, setCommentsByPost] = useState<Record<string, CommunityComment[]>>(
    () => buildCommentsMap(MOCK_COMMUNITY_POSTS),
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [modalMode, setModalMode] = useState<"collection" | "trade" | "showcase">("collection");

  const openCreate = (mode: "collection" | "trade" | "showcase") => {
    setModalKey((k) => k + 1);
    setModalMode(mode);
    setModalOpen(true);
  };

  const collectionPosts = useMemo(
    () => posts.filter((p) => p.type === "collection"),
    [posts],
  );

  const showcasePosts = useMemo(
    () => posts.filter((p) => p.type === "showcase"),
    [posts],
  );

  const filteredCollections = useMemo(() => {
    if (seriesFilter === "all") return collectionPosts;
    return collectionPosts.filter((p) => p.series === seriesFilter);
  }, [collectionPosts, seriesFilter]);

  const filteredShowcase = useMemo(() => {
    if (seriesFilter === "all") return showcasePosts;
    return showcasePosts.filter((p) => p.series === seriesFilter);
  }, [showcasePosts, seriesFilter]);

  const toggleLike = useCallback((id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const likeCountFor = useCallback(
    (post: CommunityPost) => (post.likes ?? 0) + (likedIds.has(post.id) ? 1 : 0),
    [likedIds],
  );

  const addComment = useCallback((postId: string, text: string) => {
    const c: CommunityComment = {
      id: crypto.randomUUID(),
      author: "you",
      text,
      createdAt: new Date().toISOString(),
    };
    setCommentsByPost((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] ?? []), c],
    }));
  }, []);

  const handleCreate = useCallback(
    (payload: CreatePayload) => {
      if (payload.kind === "trade") {
        const image = payload.file
          ? URL.createObjectURL(payload.file)
          : undefined;
        const next: TradePost = {
          id: crypto.randomUUID(),
          lookingFor: payload.lookingFor,
          offering: payload.offering,
          description: payload.description || undefined,
          image,
          createdAt: new Date().toISOString(),
        };
        setTrades((t) => [next, ...t]);
        setTab("trade");
        return;
      }

      const images = payload.files.map((f) => URL.createObjectURL(f));
      const next: CommunityPost = {
        id: crypto.randomUUID(),
        type: payload.kind === "collection" ? "collection" : "showcase",
        title: payload.title,
        description: payload.description,
        images,
        createdAt: new Date().toISOString(),
        series: payload.series,
        likes: 0,
        comments: [],
      };
      setPosts((p) => [next, ...p]);
      setCommentsByPost((prev) => ({ ...prev, [next.id]: [] }));
      setTab(payload.kind === "collection" ? "collections" : "showcase");
    },
    [],
  );

  return (
    <div className={communityPageShell}>
      <section className={communityHeroClass} aria-labelledby="community-heading">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-smiski-light/70 blur-2xl"
          aria-hidden
        />
        <div className="relative flex max-w-2xl flex-col gap-4">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-smiski-primary/25 bg-smiski-light/90 px-3 py-1.5 text-xs font-medium text-smiski-dark">
            <span className="text-smiski-primary" aria-hidden>
              ✦
            </span>
            Community
          </p>
          <h1
            id="community-heading"
            className="text-3xl font-semibold tracking-tight text-stone-800 sm:text-4xl"
          >
            Share, trade, and get inspired
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-stone-500/95">
            Post your collection setups, find trades, and browse aesthetic displays. This area uses
            local mock data until you wire a backend.
          </p>
        </div>
      </section>

      <section className={filterSectionClass} aria-label="Community sections">
        <div className="flex flex-col gap-6 border-b border-smiski-light/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <h2 className="text-lg font-semibold tracking-tight text-smiski-dark">
              Explore
            </h2>
            <p className="text-sm text-stone-500">
              Pick a tab, filter by series, and create a post.
            </p>
          </div>
          <button
            type="button"
            className={communityPrimaryButtonClass}
            onClick={() =>
              openCreate(
                tab === "trade" ? "trade" : tab === "showcase" ? "showcase" : "collection",
              )
            }
          >
            + Create post
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Community views"
          >
            {(
              [
                ["collections", "Collections"],
                ["trade", "Trade"],
                ["showcase", "Showcase"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                className={communityTabButtonClass(tab === id)}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {tab !== "trade" && (
            <label className="flex w-full flex-col gap-1.5 sm:max-w-xs">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-stone-500">
                Filter by series
              </span>
              <select
                value={seriesFilter}
                onChange={(e) => setSeriesFilter(e.target.value)}
                className={communitySelectClass}
              >
                <option value="all">All series</option>
                {seriesOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </section>

      {tab === "collections" && (
        <section aria-label="Collection posts">
          {filteredCollections.length === 0 ? (
            <p className={emptyStateClass} role="status">
              No collection posts match this filter yet. Try “All series” or share your own setup.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCollections.map((post) => (
                <li key={post.id} className="min-w-0">
                  <PostCard
                    post={post}
                    variant="grid"
                    likeCount={likeCountFor(post)}
                    liked={likedIds.has(post.id)}
                    onToggleLike={() => toggleLike(post.id)}
                    comments={commentsByPost[post.id] ?? []}
                    onAddComment={(text) => addComment(post.id, text)}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {tab === "trade" && (
        <section aria-label="Trade posts">
          {trades.length === 0 ? (
            <p className={emptyStateClass} role="status">
              No trade posts yet. Be the first to list what you’re looking for.
            </p>
          ) : (
            <ul className="flex flex-col gap-5">
              {trades.map((trade) => (
                <li key={trade.id}>
                  <TradeCard trade={trade} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {tab === "showcase" && (
        <section aria-label="Showcase posts">
          {filteredShowcase.length === 0 ? (
            <p className={emptyStateClass} role="status">
              No showcases match this filter. Try another series or add a decor post.
            </p>
          ) : (
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
              {filteredShowcase.map((post) => (
                <div key={post.id} className="mb-5 break-inside-avoid">
                  <PostCard
                    post={post}
                    variant="masonry"
                    likeCount={likeCountFor(post)}
                    liked={likedIds.has(post.id)}
                    onToggleLike={() => toggleLike(post.id)}
                    comments={commentsByPost[post.id] ?? []}
                    onAddComment={(text) => addComment(post.id, text)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <section
        className="flex flex-col items-start justify-between gap-4 rounded-[2rem] border border-dashed border-smiski-primary/35 bg-smiski-light/25 px-6 py-6 sm:flex-row sm:items-center"
        aria-label="Tips"
      >
        <p className="max-w-2xl text-sm leading-relaxed text-stone-600">
          <span className="font-semibold text-smiski-dark">Heads up:</span> likes and comments live
          in your browser session for now. Connect Supabase (or another API) to persist posts and
          enable real trades.
        </p>
        <button
          type="button"
          className={communityGhostButtonClass}
          onClick={() => openCreate("collection")}
        >
          Share a setup
        </button>
      </section>

      {modalOpen && (
        <CreatePostModal
          key={modalKey}
          seriesOptions={seriesOptions}
          onClose={() => setModalOpen(false)}
          mode={modalMode}
          onSubmit={handleCreate}
        />
      )}
    </div>
  );
}
