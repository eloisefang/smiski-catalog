"use client";

import { useEffect, useId, useState } from "react";
import {
  communityGhostButtonClass,
  communityInputClass,
  communityMutedLabelClass,
  communityPrimaryButtonClass,
} from "@/src/lib/community-ui";
import { ImageUpload } from "@/src/components/community/ImageUpload";

export type CreatePayload =
  | {
      kind: "showcase";
      title: string;
      description: string;
      series?: string;
      files: File[];
    }
  | {
      kind: "trade";
      lookingFor: string;
      offering: string;
      description: string;
      location: string;
      series?: string;
      file?: File;
    };

type Props = {
  onClose: () => void;
  mode: "trade" | "showcase";
  seriesOptions: string[];
  onSubmit: (payload: CreatePayload) => Promise<{ ok: true } | { ok: false; error: string }>;
};

export function CreatePostModal({ onClose, mode, seriesOptions, onSubmit }: Props) {
  const titleId = useId();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [offering, setOffering] = useState("");
  const [tradeDesc, setTradeDesc] = useState("");
  const [tradeLocation, setTradeLocation] = useState("");
  const [series, setSeries] = useState<string>("");

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [tradeFile, setTradeFile] = useState<File | null>(null);
  const [tradePreview, setTradePreview] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function addFiles(next: File[]) {
    if (mode === "showcase" && submitError) setSubmitError("");
    setFiles((prev) => {
      const merged = [...prev, ...next];
      setPreviews((old) => {
        old.forEach((u) => {
          if (u.startsWith("blob:")) URL.revokeObjectURL(u);
        });
        return merged.map((f) => URL.createObjectURL(f));
      });
      return merged;
    });
  }

  function removeAt(i: number) {
    setFiles((prev) => {
      const next = prev.filter((_, j) => j !== i);
      setPreviews((old) => {
        const url = old[i];
        if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
        return next.map((f) => URL.createObjectURL(f));
      });
      return next;
    });
  }

  function onTradeFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setTradeFile(f);
    setTradePreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return URL.createObjectURL(f);
    });
  }

  function clearTradeImage() {
    setTradeFile(null);
    setTradePreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError("");
    if (mode === "trade") {
      if (!lookingFor.trim() || !offering.trim()) return;
      setIsSubmitting(true);
      const result = await onSubmit({
        kind: "trade",
        lookingFor: lookingFor.trim(),
        offering: offering.trim(),
        description: tradeDesc.trim(),
        location: tradeLocation.trim(),
        series: series.trim() ? series : undefined,
        file: tradeFile ?? undefined,
      });
      setIsSubmitting(false);
      if (!result.ok) {
        setSubmitError(result.error);
        return;
      }
      onClose();
      return;
    }

    if (!title.trim() || !description.trim()) return;
    if (files.length === 0) {
      setSubmitError("Please upload at least one image for a showcase post.");
      return;
    }

    setIsSubmitting(true);
    const result = await onSubmit({
      kind: "showcase",
      title: title.trim(),
      description: description.trim(),
      series: series.trim() ? series : undefined,
      files: [...files],
    });
    setIsSubmitting(false);
    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }
    onClose();
  }

  const heading =
    mode === "trade"
      ? "New trade post"
      : "New showcase";

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
        className="max-h-[min(92vh,840px)] w-full max-w-lg overflow-y-auto rounded-t-[2rem] border border-smiski-light/90 bg-[#faf8f3] shadow-2xl shadow-stone-900/20 sm:rounded-[2rem]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-smiski-light/80 bg-white/95 px-5 py-4 backdrop-blur-sm sm:px-6">
          <h2 id={titleId} className="text-lg font-semibold text-smiski-dark">
            {heading}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-stone-500 transition hover:bg-smiski-light/50 hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-smiski-primary/35"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-5 py-5 sm:px-6 sm:py-6">
          {submitError && (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">
              {submitError}
            </p>
          )}
          {mode === "trade" ? (
            <>
              <label className="flex flex-col gap-1.5">
                <span className={communityMutedLabelClass}>Series (optional)</span>
                <select
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                  className={communityInputClass}
                >
                  <option value="">No series</option>
                  {seriesOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={communityMutedLabelClass}>Looking for</span>
                <input
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  className={communityInputClass}
                  placeholder="Smiski name or series"
                  required
                  maxLength={200}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={communityMutedLabelClass}>Offering</span>
                <input
                  value={offering}
                  onChange={(e) => setOffering(e.target.value)}
                  className={communityInputClass}
                  placeholder="What you’ll trade"
                  required
                  maxLength={200}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={communityMutedLabelClass}>Location (optional)</span>
                <input
                  value={tradeLocation}
                  onChange={(e) => setTradeLocation(e.target.value)}
                  className={communityInputClass}
                  placeholder="City, State / Country"
                  maxLength={120}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={communityMutedLabelClass}>Description (optional)</span>
                <textarea
                  value={tradeDesc}
                  onChange={(e) => setTradeDesc(e.target.value)}
                  className={`${communityInputClass} min-h-[96px] resize-y`}
                  placeholder="Shipping, meetups, condition…"
                  maxLength={800}
                />
              </label>
              <div className="flex flex-col gap-2">
                <span className={communityMutedLabelClass}>Photo (optional)</span>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    id="trade-photo"
                    onChange={onTradeFile}
                  />
                  <label htmlFor="trade-photo" className="inline-flex cursor-pointer">
                    <span className={communityGhostButtonClass}>Choose image</span>
                  </label>
                  {tradePreview && (
                    <button
                      type="button"
                      onClick={clearTradeImage}
                      className="text-xs font-semibold text-rose-600 underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {tradePreview && (
                  <div className="relative mt-2 aspect-video w-full max-w-sm overflow-hidden rounded-2xl border border-smiski-light shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tradePreview} alt="" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <label className="flex flex-col gap-1.5">
                <span className={communityMutedLabelClass}>Title</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={communityInputClass}
                  placeholder={mode === "showcase" ? "Cozy corner" : "My Bedroom Setup"}
                  required
                  maxLength={120}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={communityMutedLabelClass}>Series (optional)</span>
                <select
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                  className={communityInputClass}
                >
                  <option value="">No series</option>
                  {seriesOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={communityMutedLabelClass}>Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${communityInputClass} min-h-[110px] resize-y`}
                  placeholder="What makes this setup special?"
                  required
                  maxLength={2000}
                />
              </label>
              <div>
                <p className={`${communityMutedLabelClass} mb-2`}>Images</p>
                <ImageUpload
                  previews={previews}
                  onAddFiles={addFiles}
                  onRemoveAt={removeAt}
                  maxFiles={6}
                />
                <p className="mt-2 text-xs text-stone-500">
                  Add at least one image for showcase posts.
                </p>
              </div>
            </>
          )}

          <div className="flex flex-wrap justify-end gap-2 border-t border-smiski-light/70 pt-4">
            <button type="button" className={communityGhostButtonClass} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={communityPrimaryButtonClass} disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
