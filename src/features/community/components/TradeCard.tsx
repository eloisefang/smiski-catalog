"use client";

import Image from "next/image";
import Link from "next/link";
import type { TradePost } from "@/types/community";
import { tradeCardClass } from "@/features/community/utils/community-ui";

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

function creatorLabel(userId: string, currentUserId: string | null) {
  if (currentUserId && userId === currentUserId) return "You";
  return `User-${userId.slice(0, 6)}`;
}

type Props = {
  trade: TradePost;
  currentUserId: string | null;
  onDeletePost?: (communityPostId: string) => void;
  onReportPost?: (communityPostId: string, title: string) => void;
  isDeleting?: boolean;
};

export function TradeCard({
  trade,
  currentUserId,
  onDeletePost,
  onReportPost,
  isDeleting,
}: Props) {
  const isOwner = currentUserId !== null && trade.userId === currentUserId;
  const canReport =
    currentUserId !== null && !isOwner && onReportPost !== undefined;
  const reportTitle = `${trade.lookingFor} ↔ ${trade.offering}`;
  const detailHref = `/community/${trade.communityPostId}`;

  return (
    <article className={`${tradeCardClass} flex h-full flex-col overflow-hidden`}>
      {trade.image && (
        <Link
          href={detailHref}
          aria-label={`View trade: ${reportTitle}`}
          className="relative h-52 w-full shrink-0 bg-gradient-to-br from-stone-100 to-smiski-light/35 sm:h-56"
        >
          <Image
            src={trade.image}
            alt=""
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 flex-col">
            <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Trade · {formatPosted(trade.createdAt)}
            </p>
            <p className="mt-1 text-xs font-medium text-stone-500">
              Posted by{" "}
              <span className="font-semibold text-stone-700">
                {creatorLabel(trade.userId, currentUserId)}
              </span>
              {trade.series ? (
                <span className="ml-2 rounded-full border border-smiski-primary/25 bg-smiski-light/60 px-2 py-0.5 text-[10px] font-semibold text-smiski-dark">
                  {trade.series}
                </span>
              ) : null}
              {trade.location ? (
                <span className="ml-2 rounded-full border border-stone-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                  {trade.location}
                </span>
              ) : null}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {isOwner && onDeletePost && (
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => onDeletePost(trade.communityPostId)}
                className="rounded-full border border-rose-200 bg-white px-2.5 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 disabled:opacity-50"
              >
                {isDeleting ? "Deleting…" : "Delete"}
              </button>
            )}
            {canReport && (
              <button
                type="button"
                onClick={() => onReportPost(trade.communityPostId, reportTitle)}
                className="rounded-full border border-stone-200 bg-white px-2.5 py-1 text-xs font-semibold text-stone-600 transition hover:bg-stone-50"
              >
                Report
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-smiski-light/90 bg-smiski-light/35 p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wide text-smiski-dark">
              Looking for
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-stone-800">
              {trade.lookingFor}
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
              Offering
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-stone-800">
              {trade.offering}
            </p>
          </div>
        </div>

        {/* Description intentionally hidden on card; visible in detail view only. */}

        <Link
          href={detailHref}
          className="text-xs font-semibold text-smiski-dark underline-offset-4 hover:underline"
        >
          View details →
        </Link>
      </div>
    </article>
  );
}
