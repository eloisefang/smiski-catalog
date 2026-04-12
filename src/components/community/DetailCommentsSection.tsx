"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type DetailComment = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
};

type Props = {
  postId: string;
  postOwnerId: string;
  viewerId: string | null;
  initialComments: DetailComment[];
};

function creatorLabel(userId: string, viewerId: string | null) {
  if (viewerId && userId === viewerId) return "You";
  return `User-${userId.slice(0, 6)}`;
}

function formatPosted(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function DetailCommentsSection({
  postId,
  postOwnerId,
  viewerId,
  initialComments,
}: Props) {
  const supabase = useMemo(() => createClient(), []);
  const [comments, setComments] = useState<DetailComment[]>(initialComments);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDraft, setEditingDraft] = useState("");

  function canDelete(comment: DetailComment) {
    if (!viewerId) return false;
    return comment.user_id === viewerId || postOwnerId === viewerId;
  }

  function canEdit(comment: DetailComment) {
    if (!viewerId) return false;
    return comment.user_id === viewerId;
  }

  async function onAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!viewerId) {
      setError("Please sign in to comment.");
      return;
    }
    const text = draft.trim();
    if (!text) return;
    setError("");
    setSubmitting(true);
    const { data, error: insError } = await supabase
      .from("comments")
      .insert({
        post_id: postId,
        user_id: viewerId,
        content: text,
      })
      .select("id, user_id, content, created_at")
      .single();
    setSubmitting(false);
    if (insError || !data) {
      setError(insError?.message ?? "Failed to add comment.");
      return;
    }
    setDraft("");
    setComments((prev) => [...prev, data]);
  }

  async function onDeleteComment(commentId: string) {
    setError("");
    const { error: delError } = await supabase.from("comments").delete().eq("id", commentId);
    if (delError) {
      setError(delError.message);
      return;
    }
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  }

  async function onSaveEdit(commentId: string) {
    const text = editingDraft.trim();
    if (!text) return;
    setError("");
    const { data, error: updError } = await supabase
      .from("comments")
      .update({ content: text })
      .eq("id", commentId)
      .select("id, user_id, content, created_at")
      .single();
    if (updError || !data) {
      setError(updError?.message ?? "Failed to update comment.");
      return;
    }
    setComments((prev) => prev.map((c) => (c.id === commentId ? data : c)));
    setEditingId(null);
    setEditingDraft("");
  }

  return (
    <section
      className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-5 shadow-md shadow-stone-300/20 sm:p-6"
      aria-label="Comments"
    >
      <h2 className="mb-3 text-base font-semibold tracking-tight text-stone-800">Comments</h2>
      {error && (
        <p className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      {comments.length === 0 ? (
        <p className="text-sm text-stone-500">No comments yet.</p>
      ) : (
        <ul className="mb-4 flex flex-col gap-2">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-xl border border-smiski-light/80 bg-smiski-light/25 px-3 py-2"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-semibold text-smiski-dark">
                  {creatorLabel(comment.user_id, viewerId)}{" "}
                  <span className="font-normal text-stone-400">
                    · {formatPosted(comment.created_at)}
                  </span>
                </p>
                <div className="flex items-center gap-1">
                  {canEdit(comment) && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(comment.id);
                        setEditingDraft(comment.content);
                      }}
                      className="rounded-full border border-stone-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-stone-600 hover:bg-stone-50"
                    >
                      Edit
                    </button>
                  )}
                  {canDelete(comment) && (
                    <button
                      type="button"
                      onClick={() => onDeleteComment(comment.id)}
                      className="rounded-full border border-rose-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-rose-700 hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              {editingId === comment.id ? (
                <div className="mt-2 flex flex-col gap-2">
                  <textarea
                    value={editingDraft}
                    onChange={(e) => setEditingDraft(e.target.value)}
                    className="min-h-[70px] w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none focus:border-smiski-primary focus:ring-2 focus:ring-smiski-primary/20"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onSaveEdit(comment.id)}
                      className="rounded-full bg-smiski-primary px-3 py-1 text-xs font-semibold text-white hover:bg-smiski-dark"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setEditingDraft("");
                      }}
                      className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-1 text-sm text-stone-700">{comment.content}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={onAddComment} className="flex flex-col gap-2 border-t border-stone-100 pt-3">
        <label className="text-xs font-semibold uppercase tracking-[0.1em] text-stone-500">
          Add comment
        </label>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={viewerId ? "Write a comment…" : "Sign in to comment"}
          disabled={!viewerId || submitting}
          className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none focus:border-smiski-primary focus:ring-2 focus:ring-smiski-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!viewerId || submitting}
            className="w-fit rounded-full bg-smiski-primary px-4 py-1.5 text-xs font-semibold text-white hover:bg-smiski-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Posting…" : "Post"}
          </button>
        </div>
      </form>
    </section>
  );
}

