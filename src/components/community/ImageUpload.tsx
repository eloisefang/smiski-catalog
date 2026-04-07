"use client";

import Image from "next/image";
import { useId } from "react";
import { communityGhostButtonClass } from "@/src/lib/community-ui";

type Props = {
  /** Preview URLs (`URL.createObjectURL` or remote). Parent revokes blob URLs on remove. */
  previews: string[];
  onAddFiles: (files: File[]) => void;
  onRemoveAt: (index: number) => void;
  maxFiles?: number;
  accept?: string;
  disabled?: boolean;
  compact?: boolean;
};

export function ImageUpload({
  previews,
  onAddFiles,
  onRemoveAt,
  maxFiles = 6,
  accept = "image/*",
  disabled,
  compact,
}: Props) {
  const inputId = useId();

  const remaining = Math.max(0, maxFiles - previews.length);

  function handlePick(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list?.length) return;
    const next: File[] = [];
    for (let i = 0; i < list.length && next.length < remaining; i++) {
      const f = list.item(i);
      if (f) next.push(f);
    }
    if (next.length) onAddFiles(next);
    e.target.value = "";
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          id={inputId}
          type="file"
          accept={accept}
          multiple
          className="sr-only"
          disabled={disabled || remaining === 0}
          onChange={handlePick}
        />
        <label htmlFor={inputId} className={compact ? "inline-flex" : "inline-flex w-full sm:w-auto"}>
          <span
            className={`${communityGhostButtonClass} ${disabled || remaining === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
          >
            Add images
          </span>
        </label>
        <span className="text-xs text-stone-500">
          {previews.length}/{maxFiles} · JPEG / PNG / WebP
        </span>
      </div>

      {previews.length > 0 && (
        <ul
          className={`grid gap-2 ${compact ? "grid-cols-3 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3"}`}
        >
          {previews.map((src, i) => (
            <li
              key={`${src}-${i}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-smiski-light/90 bg-smiski-light/30 shadow-sm"
            >
              {src.startsWith("blob:") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt="" className="h-full w-full object-cover" />
              ) : (
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 45vw, 200px"
                />
              )}
              <button
                type="button"
                className="absolute right-1.5 top-1.5 rounded-full bg-stone-900/70 px-2 py-0.5 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                onClick={() => onRemoveAt(i)}
                aria-label={`Remove image ${i + 1}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
