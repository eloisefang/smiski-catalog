"use client";

import Image from "next/image";
import { useState } from "react";
import type { CommunityComment, CommunityPost } from "@/src/types/community";
import {
  communityCardClass,
  communityInputClass,
  communityMutedLabelClass,
  communityPrimaryButtonClass,
} from "@/src/lib/community-ui";

function formatPosted(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

type Props = {
  post: CommunityPost;
  variant: "grid" | "masonry";
  likeCount: number;
  liked: boolean;
  onToggleLike: () => void;
  comments: CommunityComment[];
  onAddComment: (text: string) => void;
};

export function PostCard({
  post,
  variant,
  likeCount,
  liked,
  onToggleLike,
  comments,
  onAddComment,
}: Props) {
  const [openComments, setOpenComments] = useState(false);
  const [draft, setDraft] = useState("");

  const cover = post.images[0];
  const isMasonry = variant === "masonry";

  function submitComment(e: React.FormEvent) {
    e.preventDefault();
    const t = draft.trim();
    if (!t) return;
    onAddComment(t);
    setDraft("");
  }

  return (
    <article
      className={`${communityCardClass} flex flex-col ${
        isMasonry ? "break-inside-avoid" : "h-full"
      }`}
    >
      {cover && (
        <div
          className={`relative w-full overflow-hidden bg-gradient-to-br from-stone-100 to-smiski-light/35 ${
            isMasonry ? "max-h-[min(70vh,520px)] min-h-[200px]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={cover}
            alt=""
            fill
            unoptimized={cover.startsWith("blob:")}
            className={`object-cover transition duration-500 ease-out ${
              isMasonry ? "object-center" : ""
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/25 via-transparent to-white/20"
            aria-hidden
          />
          {post.series && (
            <span className="absolute left-3 top-3 rounded-full border border-white/80 bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-smiski-dark shadow-sm">
              {post.series}
            </span>
          )}
        </div>
      )}

      <div className={`flex flex-1 flex-col gap-3 ${isMasonry ? "p-4" : "p-4 sm:p-5"}`}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3
              className={`font-semibold tracking-tight text-stone-800 ${
                isMasonry ? "text-base leading-snug" : "text-lg leading-snug sm:text-[1.05rem]"
              }`}
            >
              {post.title}
            </h3>
            <p className="mt-1 text-xs font-medium text-stone-500">
              {formatPosted(post.createdAt)}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={onToggleLike}
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-smiski-primary/35 focus-visible:ring-offset-2 ${
                liked
                  ? "border-rose-200 bg-rose-50 text-rose-600"
                  : "border-smiski-light bg-smiski-light/50 text-smiski-dark hover:bg-smiski-light/80"
              }`}
              aria-pressed={liked}
            >
              <span aria-hidden>{liked ? "❤️" : "🤍"}</span>
              <span>{likeCount}</span>
            </button>
          </div>
        </div>

        <p
          className={`text-sm leading-relaxed text-stone-600 ${
            isMasonry ? "line-clamp-4" : "line-clamp-3 sm:line-clamp-4"
          }`}
        >
          {post.description}
        </p>

        {post.images.length > 1 && (
          <ul className="flex gap-2 overflow-x-auto pb-1 pt-1 [scrollbar-width:thin]">
            {post.images.slice(1).map((src, i) => (
              <li
                key={src}
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-smiski-light/80 bg-smiski-light/25 shadow-sm"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  unoptimized={src.startsWith("blob:")}
                  className="object-cover"
                  sizes="64px"
                />
                <span className="sr-only">Extra image {i + 2}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto border-t border-stone-100 pt-3">
          <button
            type="button"
            onClick={() => setOpenComments((v) => !v)}
            className="text-xs font-semibold text-smiski-dark underline-offset-4 hover:underline"
          >
            {openComments ? "Hide comments" : `Comments (${comments.length})`}
          </button>

          {openComments && (
            <div className="mt-3 flex flex-col gap-3">
              <ul className="flex max-h-48 flex-col gap-2 overflow-y-auto pr-1 text-sm">
                {comments.length === 0 ? (
                  <li className="text-stone-500">No comments yet — say hi!</li>
                ) : (
                  comments.map((c) => (
                    <li
                      key={c.id}
                      className="rounded-xl border border-smiski-light/80 bg-smiski-light/25 px-3 py-2"
                    >
                      <p className="text-xs font-semibold text-smiski-dark">
                        {c.author}{" "}
                        <span className="font-normal text-stone-400">
                          · {formatPosted(c.createdAt)}
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-stone-700">{c.text}</p>
                    </li>
                  ))
                )}
              </ul>
              <form onSubmit={submitComment} className="flex flex-col gap-2">
                <label className="flex flex-col gap-1.5">
                  <span className={communityMutedLabelClass}>Add a comment</span>
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className={communityInputClass}
                    placeholder="Nice setup!"
                    maxLength={500}
                  />
                </label>
                <button type="submit" className={communityPrimaryButtonClass}>
                  Post
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
