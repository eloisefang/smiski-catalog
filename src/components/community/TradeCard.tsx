"use client";

import Image from "next/image";
import type { TradePost } from "@/src/types/community";
import { communityCardClass } from "@/src/lib/community-ui";

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
  trade: TradePost;
};

export function TradeCard({ trade }: Props) {
  return (
    <article
      className={`${communityCardClass} flex flex-col overflow-hidden sm:flex-row`}
    >
      {trade.image && (
        <div className="relative aspect-[16/10] w-full shrink-0 bg-gradient-to-br from-stone-100 to-smiski-light/35 sm:aspect-auto sm:h-auto sm:w-52 md:w-60">
          <Image
            src={trade.image}
            alt=""
            fill
            unoptimized={trade.image.startsWith("blob:")}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 240px"
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Trade · {formatPosted(trade.createdAt)}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-smiski-light/90 bg-smiski-light/35 p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wide text-smiski-dark">
              Looking for
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-stone-800">
              {trade.lookingFor}
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
              Offering
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-stone-800">
              {trade.offering}
            </p>
          </div>
        </div>

        {trade.description && (
          <p className="text-sm leading-relaxed text-stone-600">{trade.description}</p>
        )}

        <div className="mt-auto flex flex-wrap gap-2 border-t border-stone-100 pt-4">
          <span className="rounded-full border border-smiski-primary/25 bg-smiski-light/60 px-3 py-1 text-xs font-semibold text-smiski-dark">
            Message to coordinate
          </span>
          <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-500">
            Mock — no messaging yet
          </span>
        </div>
      </div>
    </article>
  );
}
