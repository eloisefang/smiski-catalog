"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  communityGhostButtonClass,
  communityHeroClass,
  communityPageShell,
  communityPrimaryButtonClass,
  communityTabButtonClass,
} from "@/src/lib/community-ui";
import { emptyStateClass, filterSectionClass } from "@/src/lib/catalog-ui";
import type { CommunityComment, CommunityPost, TradePost } from "@/src/types/community";
import { createClient as createSupabaseClient } from "@/src/lib/supabase/client";
import { CreatePostModal, type CreatePayload } from "@/src/components/community/CreatePostModal";
import { PostCard } from "@/src/components/community/PostCard";
import { ReportPostModal, type ReportReason } from "@/src/components/community/ReportPostModal";
import { TradeCard } from "@/src/components/community/TradeCard";
import { extractCommunityImageStoragePath } from "@/src/lib/community/storage";

type Tab = "trade" | "showcase";

type Props = {
  seriesOptions: string[];
};

type CreateResult = { ok: true } | { ok: false; error: string };

const COMMUNITY_IMAGE_BUCKET = "community-images";

type MaybeIsoRow = {
  created_at?: string | null;
  createdAt?: string | null;
};

function coerceCreatedAt(row: MaybeIsoRow): string {
  return row.created_at ?? row.createdAt ?? new Date().toISOString();
}

export function CommunityClient({ seriesOptions }: Props) {
  const [tab, setTab] = useState<Tab>("trade");
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [trades, setTrades] = useState<TradePost[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [seriesFilter, setSeriesFilter] = useState<string>("all");
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());
  const [likesCountByPost, setLikesCountByPost] = useState<Record<string, number>>({});
  const [commentsByPost, setCommentsByPost] = useState<Record<string, CommunityComment[]>>({});
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [feedError, setFeedError] = useState<string>("");
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

  const [reportOpen, setReportOpen] = useState(false);
  const [reportCommunityPostId, setReportCommunityPostId] = useState<string | null>(null);
  const [reportPostTitle, setReportPostTitle] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [modalMode, setModalMode] = useState<"trade" | "showcase">("trade");

  const supabase = useMemo(() => createSupabaseClient(), []);

  const openCreate = (mode: "trade" | "showcase") => {
    setModalKey((k) => k + 1);
    setModalMode(mode);
    setModalOpen(true);
  };

  const showcasePosts = useMemo(
    () => posts.filter((p) => p.type === "showcase"),
    [posts],
  );

  const seriesChoices = useMemo(() => {
    const set = new Set<string>();
    for (const s of seriesOptions) set.add(s);
    for (const p of posts) if (p.series) set.add(p.series);
    for (const t of trades) if (t.series) set.add(t.series);
    return [...set].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  }, [posts, seriesOptions, trades]);

  const filteredShowcase = useMemo(() => {
    if (seriesFilter === "all") return showcasePosts;
    return showcasePosts.filter((p) => p.series === seriesFilter);
  }, [seriesFilter, showcasePosts]);

  const filteredTrades = useMemo(() => {
    if (seriesFilter === "all") return trades;
    return trades.filter((t) => t.series === seriesFilter);
  }, [seriesFilter, trades]);

  const loadCommunityData = useCallback(async () => {
    setLoadingFeed(true);
    setFeedError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUserId(user?.id ?? null);

      // STEP 1: isolate the community_posts query (per debugging request)
      // If this succeeds, we'll add the other tables one-by-one to find the first breaking query.
      const postsRes = await supabase
        .from("community_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (postsRes.error) {
        console.error("Failed to fetch community_posts", {
          error: postsRes.error,
          message: postsRes.error.message,
          details: postsRes.error.details,
          hint: postsRes.error.hint,
          code: postsRes.error.code,
        });
        throw new Error(
          `community_posts fetch failed: ${postsRes.error.message} (code=${postsRes.error.code ?? "n/a"})`,
        );
      }

      // STEP 2: fetch related tables one-by-one (so we can pinpoint the first failing query)
      const imagesQuery =
        'from(\"post_images\").select(\"post_id, image_url, sort_order\").order(\"sort_order\")';
      const imagesRes = await supabase
        .from("post_images")
        .select("post_id, image_url, sort_order")
        .order("sort_order", { ascending: true });
      if (imagesRes.error) {
        console.error("Failed to fetch post_images", {
          query: imagesQuery,
          error: imagesRes.error,
          message: imagesRes.error.message,
          details: imagesRes.error.details,
          hint: imagesRes.error.hint,
          code: imagesRes.error.code,
        });
        throw new Error(`post_images fetch failed: ${imagesRes.error.message}`);
      }

      const tradesQuery =
        'from(\"trade_posts\").select(\"id, post_id, looking_for, offering, location, status\")';
      const tradesRes = await supabase
        .from("trade_posts")
        .select("id, post_id, looking_for, offering, location, status");
      if (tradesRes.error) {
        console.error("Failed to fetch trade_posts", {
          query: tradesQuery,
          error: tradesRes.error,
          message: tradesRes.error.message,
          details: tradesRes.error.details,
          hint: tradesRes.error.hint,
          code: tradesRes.error.code,
        });
        throw new Error(`trade_posts fetch failed: ${tradesRes.error.message}`);
      }

      const commentsQuery =
        'from(\"comments\").select(\"id, post_id, user_id, content, created_at\").order(\"created_at\")';
      const commentsRes = await supabase
        .from("comments")
        .select("id, post_id, user_id, content, created_at")
        .order("created_at", { ascending: true });
      if (commentsRes.error) {
        console.error("Failed to fetch comments", {
          query: commentsQuery,
          error: commentsRes.error,
          message: commentsRes.error.message,
          details: commentsRes.error.details,
          hint: commentsRes.error.hint,
          code: commentsRes.error.code,
        });
        throw new Error(`comments fetch failed: ${commentsRes.error.message}`);
      }

      const likesQuery = 'from(\"likes\").select(\"post_id, user_id\")';
      const likesRes = await supabase.from("likes").select("post_id, user_id");
      if (likesRes.error) {
        console.error("Failed to fetch likes", {
          query: likesQuery,
          error: likesRes.error,
          message: likesRes.error.message,
          details: likesRes.error.details,
          hint: likesRes.error.hint,
          code: likesRes.error.code,
        });
        throw new Error(`likes fetch failed: ${likesRes.error.message}`);
      }

      const imagesByPost = new Map<string, string[]>();
      for (const row of imagesRes.data ?? []) {
        const arr = imagesByPost.get(row.post_id) ?? [];
        arr.push(row.image_url);
        imagesByPost.set(row.post_id, arr);
      }

      const postById = new Map<string, (typeof postsRes.data)[number]>();
      for (const row of postsRes.data ?? []) {
        postById.set(row.id, row);
      }

      const nextPosts: CommunityPost[] = (postsRes.data ?? [])
        .filter((row) => row.type === "showcase")
        .map((row) => ({
          id: row.id,
          userId: row.user_id,
          type: "showcase" as const,
          title: row.title,
          description: row.description ?? "",
          images: imagesByPost.get(row.id) ?? [],
          createdAt: coerceCreatedAt(row),
          series: row.series ?? undefined,
        }));

      const nextTrades: TradePost[] = [];
      for (const row of tradesRes.data ?? []) {
        const parent = postById.get(row.post_id);
        const createdAt = parent ? coerceCreatedAt(parent as MaybeIsoRow) : new Date().toISOString();
        const postImages = imagesByPost.get(row.post_id) ?? [];
        nextTrades.push({
          id: row.id,
          communityPostId: row.post_id,
          userId: parent?.user_id ?? "",
          lookingFor: row.looking_for,
          offering: row.offering,
          description: parent?.description ?? undefined,
          createdAt,
          series: parent?.series ?? undefined,
          location: row.location ?? undefined,
          image: postImages[0],
        });
      }

      const nextComments: Record<string, CommunityComment[]> = {};
      for (const row of commentsRes.data ?? []) {
        const postComments = nextComments[row.post_id] ?? [];
        postComments.push({
          id: row.id,
          userId: row.user_id,
          author: row.user_id === user?.id ? "you" : "collector",
          text: row.content,
          createdAt: coerceCreatedAt(row),
        });
        nextComments[row.post_id] = postComments;
      }

      const nextLikeCounts: Record<string, number> = {};
      const nextLiked = new Set<string>();
      for (const row of likesRes.data ?? []) {
        nextLikeCounts[row.post_id] = (nextLikeCounts[row.post_id] ?? 0) + 1;
        if (user?.id && row.user_id === user.id) {
          nextLiked.add(row.post_id);
        }
      }

      setPosts(nextPosts);
      setTrades(nextTrades);
      setCommentsByPost(nextComments);
      setLikesCountByPost(nextLikeCounts);
      setLikedIds(nextLiked);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error while loading community feed";
      // Common case: RLS blocks anonymous selects until you add policies.
      const extraHint =
        msg.toLowerCase().includes("permission denied") ||
        msg.toLowerCase().includes("row level security") ||
        msg.toLowerCase().includes("rls")
          ? " (This usually means Row Level Security policies are missing for anon/authenticated selects.)"
          : "";
      setFeedError(`${msg}${extraHint}`);
      console.error("Community feed load failed", error);
    } finally {
      setLoadingFeed(false);
    }
  }, [supabase]);

  useEffect(() => {
    void loadCommunityData();
  }, [loadCommunityData]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const toggleLike = useCallback(
    async (postId: string) => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Failed to read current user for like", authError);
        setFeedError(`Auth error while liking post: ${authError.message}`);
        return;
      }
      if (!user) {
        setFeedError("You need to sign in before liking posts.");
        return;
      }

      const alreadyLiked = likedIds.has(postId);
      if (alreadyLiked) {
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);

        if (error) {
          console.error("Failed to remove like", error);
          setFeedError(`Failed to unlike post: ${error.message}`);
          return;
        }

        setLikedIds((prev) => {
          const next = new Set(prev);
          next.delete(postId);
          return next;
        });
        setLikesCountByPost((prev) => ({
          ...prev,
          [postId]: Math.max(0, (prev[postId] ?? 0) - 1),
        }));
        return;
      }

      const { error } = await supabase.from("likes").insert({
        post_id: postId,
        user_id: user.id,
      });

      if (error) {
        console.error("Failed to insert like", error);
        setFeedError(`Failed to like post: ${error.message}`);
        return;
      }

      setLikedIds((prev) => {
        const next = new Set(prev);
        next.add(postId);
        return next;
      });
      setLikesCountByPost((prev) => ({
        ...prev,
        [postId]: (prev[postId] ?? 0) + 1,
      }));
    },
    [likedIds, supabase],
  );

  const likeCountFor = useCallback(
    (post: CommunityPost) => likesCountByPost[post.id] ?? 0,
    [likesCountByPost],
  );

  const removeImagesFromStorage = useCallback(
    async (imageUrls: string[]) => {
      const paths = imageUrls
        .map((u) => extractCommunityImageStoragePath(u, COMMUNITY_IMAGE_BUCKET))
        .filter((p): p is string => Boolean(p));
      if (paths.length === 0) return;
      const { error } = await supabase.storage.from(COMMUNITY_IMAGE_BUCKET).remove(paths);
      if (error) {
        console.error("Storage remove failed (post may still delete via DB cascade)", error);
      }
    },
    [supabase],
  );

  const deleteCommunityPost = useCallback(
    async (communityPostId: string) => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) {
        setFeedError("Sign in to delete posts.");
        return;
      }

      const ok = window.confirm(
        "Delete this post permanently? This cannot be undone.",
      );
      if (!ok) return;

      setDeletingPostId(communityPostId);
      setFeedError("");

      try {
        const { data: imgRows, error: imgFetchError } = await supabase
          .from("post_images")
          .select("image_url")
          .eq("post_id", communityPostId);

        if (imgFetchError) {
          console.error("Failed to load post_images before delete", imgFetchError);
        } else {
          const urls = (imgRows ?? []).map((r) => r.image_url);
          await removeImagesFromStorage(urls);
        }

        const { error: delError } = await supabase
          .from("community_posts")
          .delete()
          .eq("id", communityPostId)
          .eq("user_id", user.id);

        if (delError) {
          console.error("community_posts delete failed", delError);
          setFeedError(`Delete failed: ${delError.message}`);
          return;
        }

        setPosts((prev) => prev.filter((p) => p.id !== communityPostId));
        setTrades((prev) => prev.filter((t) => t.communityPostId !== communityPostId));
        setCommentsByPost((prev) => {
          const next = { ...prev };
          delete next[communityPostId];
          return next;
        });
        setLikesCountByPost((prev) => {
          const next = { ...prev };
          delete next[communityPostId];
          return next;
        });
        setLikedIds((prev) => {
          const next = new Set(prev);
          next.delete(communityPostId);
          return next;
        });
      } finally {
        setDeletingPostId(null);
      }
    },
    [removeImagesFromStorage, supabase],
  );

  const openReportModal = useCallback((communityPostId: string, title: string) => {
    setReportCommunityPostId(communityPostId);
    setReportPostTitle(title);
    setReportOpen(true);
  }, []);

  const submitReport = useCallback(
    async (
      reason: ReportReason,
      details: string,
    ): Promise<{ ok: true } | { ok: false; error: string }> => {
      if (!reportCommunityPostId) {
        return { ok: false, error: "No post selected." };
      }
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) {
        return { ok: false, error: "Sign in to report posts." };
      }

      const { error } = await supabase.from("reports").insert({
        post_id: reportCommunityPostId,
        reporter_user_id: user.id,
        reason,
        details: details || null,
      });

      if (error) {
        if (error.code === "23505") {
          return {
            ok: false,
            error: "You have already reported this post.",
          };
        }
        console.error("reports insert failed", error);
        return { ok: false, error: error.message };
      }
      return { ok: true };
    },
    [reportCommunityPostId, supabase],
  );

  const addComment = useCallback(
    async (postId: string, text: string) => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Failed to read current user for comment", authError);
        setFeedError(`Auth error while commenting: ${authError.message}`);
        return;
      }
      if (!user) {
        setFeedError("You need to sign in before commenting.");
        return;
      }

      const { data, error } = await supabase
        .from("comments")
        .insert({
          post_id: postId,
          user_id: user.id,
          content: text,
        })
        .select("id, post_id, user_id, content, created_at")
        .single();

      if (error) {
        console.error("Failed to insert comment", error);
        setFeedError(`Failed to post comment: ${error.message}`);
        return;
      }

      const comment: CommunityComment = {
        id: data.id,
        userId: data.user_id,
        author: "you",
        text: data.content,
        createdAt: data.created_at,
      };

      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] ?? []), comment],
      }));
    },
    [supabase],
  );

  const deleteComment = useCallback(
    async (postId: string, commentId: string) => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Failed to read current user for comment delete", authError);
        setFeedError(`Auth error while deleting comment: ${authError.message}`);
        return;
      }
      if (!user) {
        setFeedError("You need to sign in before deleting comments.");
        return;
      }

      const { error } = await supabase.from("comments").delete().eq("id", commentId);
      if (error) {
        console.error("comments delete failed", error);
        setFeedError(`Failed to delete comment: ${error.message}`);
        return;
      }

      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: (prev[postId] ?? []).filter((c) => c.id !== commentId),
      }));
    },
    [supabase],
  );

  const uploadCommunityImages = useCallback(
    async (postId: string, files: File[]): Promise<string[]> => {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `posts/${postId}/${crypto.randomUUID()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from(COMMUNITY_IMAGE_BUCKET)
          .upload(path, file, { upsert: false });

        if (uploadError) {
          console.error("Failed to upload image", uploadError);
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }

        const { data } = supabase.storage.from(COMMUNITY_IMAGE_BUCKET).getPublicUrl(path);
        uploadedUrls.push(data.publicUrl);
      }
      return uploadedUrls;
    },
    [supabase],
  );

  const handleCreate = useCallback(
    async (payload: CreatePayload): Promise<CreateResult> => {
      setFeedError("");

      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error("Failed to read current user for create", authError);
          return { ok: false, error: `Auth error: ${authError.message}` };
        }
        if (!user) {
          return { ok: false, error: "Please sign in to create community posts." };
        }

        if (payload.kind === "trade") {
          const { data: parent, error: parentError } = await supabase
            .from("community_posts")
            .insert({
              user_id: user.id,
              type: "trade",
              title: payload.lookingFor,
              description: payload.description,
              series: payload.series ?? null,
            })
            .select("id, created_at")
            .single();

          if (parentError || !parent) {
            console.error("Failed to insert parent community_posts row for trade", parentError);
            return {
              ok: false,
              error: `community_posts insert for trade failed: ${
                parentError?.message ?? "Unknown insert error"
              }`,
            };
          }

          // Payload is intentionally restricted to valid columns only:
          // - post_id, looking_for, offering, location, status
          const tradeInsertPayload = {
            post_id: parent.id,
            looking_for: payload.lookingFor,
            offering: payload.offering,
            location: payload.location ? payload.location : null,
            status: "open",
          } as const;

          const { error: tradeError } = await supabase
            .from("trade_posts")
            .insert(tradeInsertPayload);

          if (tradeError) {
            throw new Error(
              `trade_posts insert failed: ${tradeError.message} | code=${tradeError.code ?? "none"} | details=${tradeError.details ?? "none"} | hint=${tradeError.hint ?? "none"}`,
            );
          }

          if (payload.file) {
            const uploadedUrls = await uploadCommunityImages(parent.id, [payload.file]);
            if (uploadedUrls.length > 0) {
              const { error: imageRefError } = await supabase.from("post_images").insert({
                post_id: parent.id,
                image_url: uploadedUrls[0],
                sort_order: 0,
              });
              if (imageRefError) {
                throw new Error(
                  `post_images insert failed for trade: ${imageRefError.message} | code=${imageRefError.code ?? "none"}`,
                );
              }
            }
          }

          await loadCommunityData();
          setTab("trade");
          return { ok: true };
        }

        // Non-trade posts continue below; `user` is needed for insert.
        // We keep `user` in scope by falling through within this try block.
        const { data: inserted, error: postError } = await supabase
          .from("community_posts")
          .insert({
            user_id: user.id,
            type: payload.kind,
            title: payload.title,
            description: payload.description,
            series: payload.series ?? null,
          })
          .select("id")
          .single();

        if (postError || !inserted) {
          console.error("Failed to insert community_posts row", postError);
          return {
            ok: false,
            error: `community_posts insert failed: ${postError?.message ?? "Unknown insert error"}`,
          };
        }

        try {
          const uploadedUrls = await uploadCommunityImages(inserted.id, payload.files);
          if (uploadedUrls.length > 0) {
            const rows = uploadedUrls.map((url, i) => ({
              post_id: inserted.id,
              image_url: url,
              sort_order: i,
            }));

            const { error: imageRefError } = await supabase.from("post_images").insert(rows);
            if (imageRefError) {
              console.error("Failed to insert post_images rows", imageRefError);
              return { ok: false, error: `post_images insert failed: ${imageRefError.message}` };
            }
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "Image upload failed";
          console.error("Failed after community post creation", error);
          return { ok: false, error: message };
        }

        await loadCommunityData();
        setTab("showcase");
        return { ok: true };
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "trade_posts insert failed: Unknown error";
        console.error("Trade create failed", err);
        return { ok: false, error: msg };
      }
    },
    [loadCommunityData, supabase, uploadCommunityImages],
  );

  return (
    <div className={communityPageShell}>
      <section className={communityHeroClass} aria-labelledby="community-heading">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-smiski-light/70 blur-2xl"
          aria-hidden
        />
        <div className="relative flex max-w-2xl flex-col gap-5">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-smiski-primary/25 bg-smiski-light/90 px-3 py-1.5 text-xs font-medium text-smiski-dark">
            <span className="text-smiski-primary" aria-hidden>
              ✦
            </span>
            Community
          </p>
          <h1
            id="community-heading"
            className="text-3xl font-semibold tracking-tight text-stone-800 sm:text-4xl md:text-[2.65rem] md:leading-[1.12]"
          >
            Share, trade, and get inspired
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-stone-500/90">
            The world wanna see how you decorate your smiskis!
          </p>
        </div>
      </section>

      <section className={filterSectionClass} aria-label="Community sections">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Community views">
            {(
              [
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

          <label className="flex w-full flex-col gap-1.5 sm:max-w-xs">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-stone-500">
              Filter by series
            </span>
            <select
              value={seriesFilter}
              onChange={(e) => setSeriesFilter(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 shadow-sm shadow-stone-200/50 outline-none transition focus:border-smiski-primary focus:ring-2 focus:ring-smiski-primary/20"
            >
              <option value="all">All series</option>
              {seriesChoices.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        {feedError && (
          <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">
            Supabase error: {feedError}
          </p>
        )}
      </section>

      {loadingFeed && (
        <p className="rounded-2xl border border-smiski-light/80 bg-white px-5 py-4 text-sm text-stone-500 shadow-sm">
          Loading ...
        </p>
      )}

      {!loadingFeed && tab === "trade" && (
        <section aria-label="Trade posts">
          {filteredTrades.length === 0 ? (
            <p className={emptyStateClass} role="status">
              No trade posts yet. Be the first to list what you’re looking for.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTrades.map((trade) => (
                <li key={trade.id} className="min-w-0">
                  <TradeCard
                    trade={trade}
                    currentUserId={currentUserId}
                    onDeletePost={deleteCommunityPost}
                    onReportPost={openReportModal}
                    isDeleting={deletingPostId === trade.communityPostId}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {!loadingFeed && tab === "showcase" && (
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
                    onToggleLike={() => {
                      void toggleLike(post.id);
                    }}
                    comments={commentsByPost[post.id] ?? []}
                    onAddComment={(text) => {
                      void addComment(post.id, text);
                    }}
                    onDeleteComment={(commentId) => {
                      void deleteComment(post.id, commentId);
                    }}
                    currentUserId={currentUserId}
                    onDeletePost={deleteCommunityPost}
                    onReportPost={openReportModal}
                    isDeleting={deletingPostId === post.id}
                    showComments={false}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {modalOpen && (
        <CreatePostModal
          key={modalKey}
          onClose={() => setModalOpen(false)}
          mode={modalMode}
          seriesOptions={seriesOptions}
          onSubmit={handleCreate}
        />
      )}

      {reportOpen && reportCommunityPostId && (
        <ReportPostModal
          key={reportCommunityPostId}
          open
          postTitle={reportPostTitle}
          onClose={() => {
            setReportOpen(false);
            setReportCommunityPostId(null);
          }}
          onSubmit={submitReport}
        />
      )}

      <button
        type="button"
        className={`${communityPrimaryButtonClass} fixed bottom-5 right-5 z-40 shadow-xl shadow-smiski-primary/35 sm:bottom-6 sm:right-6`}
        onClick={() =>
          openCreate(tab === "trade" ? "trade" : "showcase")
        }
      >
        + Create post
      </button>
    </div>
  );
}
