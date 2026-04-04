"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { adjustOwnedQuantity } from "@/src/lib/collection/actions";

type Props = {
  smiskiId: string;
  initialQuantity: number;
  isAuthenticated: boolean;
  /** Tighter layout for catalog cards */
  compact?: boolean;
};

export function OwnedQuantityControls({
  smiskiId,
  initialQuantity,
  isAuthenticated,
  compact = false,
}: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  function applyDelta(delta: 1 | -1) {
    if (!isAuthenticated) return;
    setError(null);
    startTransition(async () => {
      const result = await adjustOwnedQuantity(smiskiId, delta);
      if (result.ok) {
        setQuantity(result.quantity);
        router.refresh();
      } else {
        setError(result.error);
      }
    });
  }

  if (!isAuthenticated) {
    return (
      <div
        className={
          compact
            ? "rounded-xl border border-dashed border-stone-200 bg-stone-50/80 px-2 py-1.5 text-center text-[11px] text-stone-500"
            : "rounded-2xl border border-dashed border-stone-200 bg-stone-50/80 px-3 py-2 text-center text-sm text-stone-500"
        }
      >
        Sign in to track owned figures
      </div>
    );
  }

  const pad = compact ? "px-2 py-1.5" : "px-3 py-2";
  const btn = compact
    ? "flex h-8 min-w-8 items-center justify-center rounded-lg border border-smiski-primary/30 bg-white text-sm font-semibold text-smiski-dark shadow-sm transition hover:bg-smiski-light/70 disabled:opacity-50"
    : "flex h-10 min-w-10 items-center justify-center rounded-xl border border-smiski-primary/30 bg-white text-lg font-semibold text-smiski-dark shadow-sm transition hover:bg-smiski-light/70 disabled:opacity-50";

  return (
    <div className="space-y-1">
      <div
        className={`flex items-center justify-between gap-2 rounded-2xl border border-smiski-light bg-smiski-light/40 ${pad}`}
      >
        <span
          className={
            compact
              ? "text-[10px] font-semibold uppercase tracking-wide text-smiski-dark/80"
              : "text-xs font-semibold uppercase tracking-wide text-smiski-dark/80"
          }
        >
          Owned
        </span>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            className={btn}
            disabled={pending || quantity <= 0}
            onClick={() => applyDelta(-1)}
            aria-label="Decrease owned quantity"
          >
            −
          </button>
          <span
            className={
              compact
                ? "min-w-[1.5rem] text-center text-sm font-bold tabular-nums text-smiski-dark"
                : "min-w-[2rem] text-center text-base font-bold tabular-nums text-smiski-dark"
            }
          >
            {quantity}
          </span>
          <button
            type="button"
            className={btn}
            disabled={pending}
            onClick={() => applyDelta(1)}
            aria-label="Increase owned quantity"
          >
            +
          </button>
        </div>
      </div>
      {error ? (
        <p className="text-xs font-medium text-red-700/90">{error}</p>
      ) : null}
    </div>
  );
}
