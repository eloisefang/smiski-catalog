"use client";

import { useEffect, useId, useState } from "react";
import {
  communityGhostButtonClass,
  communityInputClass,
  communityMutedLabelClass,
  communityPrimaryButtonClass,
} from "@/lib/community-ui";

export const REPORT_REASONS = [
  { value: "inappropriate_image", label: "Inappropriate image" },
  { value: "spam", label: "Spam" },
  { value: "harassment", label: "Harassment" },
  { value: "other", label: "Other" },
] as const;

export type ReportReason = (typeof REPORT_REASONS)[number]["value"];

type Props = {
  open: boolean;
  postTitle: string;
  onClose: () => void;
  onSubmit: (reason: ReportReason, details: string) => Promise<{ ok: true } | { ok: false; error: string }>;
};

export function ReportPostModal({ open, postTitle, onClose, onSubmit }: Props) {
  const titleId = useId();
  const [reason, setReason] = useState<ReportReason>("spam");
  const [details, setDetails] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError("");
    setIsSubmitting(true);
    const result = await onSubmit(reason, details.trim());
    setIsSubmitting(false);
    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-stone-900/40 p-0 sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[min(92vh,640px)] w-full max-w-lg overflow-y-auto rounded-t-[2rem] border border-smiski-light/90 bg-[#faf8f3] shadow-2xl shadow-stone-900/20 sm:rounded-[2rem]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-smiski-light/80 bg-white/95 px-5 py-4 backdrop-blur-sm sm:px-6">
          <h2 id={titleId} className="text-lg font-semibold text-smiski-dark">
            Report post
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-stone-500 transition hover:bg-smiski-light/50 hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-smiski-primary/35"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
          <p className="text-sm text-stone-600">
            Reporting: <span className="font-semibold text-stone-800">{postTitle}</span>
          </p>

          {submitError && (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">
              {submitError}
            </p>
          )}

          <label className="flex flex-col gap-1.5">
            <span className={communityMutedLabelClass}>Reason</span>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as ReportReason)}
              className={communityInputClass}
            >
              {REPORT_REASONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={communityMutedLabelClass}>Details (optional)</span>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className={`${communityInputClass} min-h-[88px] resize-y`}
              placeholder="Add context for moderators…"
              maxLength={2000}
            />
          </label>

          <div className="flex flex-wrap justify-end gap-2 border-t border-smiski-light/70 pt-4">
            <button type="button" className={communityGhostButtonClass} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={communityPrimaryButtonClass} disabled={isSubmitting}>
              {isSubmitting ? "Submitting…" : "Submit report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
