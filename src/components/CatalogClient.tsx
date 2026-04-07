"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CollectionSummary } from "@/src/components/collection/CollectionSummary";
import { OwnedQuantityControls } from "@/src/components/collection/OwnedQuantityControls";
import type { SmiskiItem } from "@/src/data/smiski";
import type { CollectionSummaryStats } from "@/src/lib/collection/types";
import {
  catalogCardLinkClass,
  catalogPageShell,
  emptyStateClass,
  filterSectionClass,
  heroSectionClass,
  secretBadgeClass,
} from "@/src/lib/catalog-ui";
import { formatSmiskiType } from "@/src/lib/smiski-label";

type Props = {
  items: SmiskiItem[];
  seriesOptions: string[];
  ownedBySmiskiId: Record<string, number>;
  isAuthenticated: boolean;
  collectionStats: CollectionSummaryStats;
};

/** Group catalog items by their `series` string. */
function groupItemsBySeries(items: SmiskiItem[]): Record<string, SmiskiItem[]> {
  return items.reduce<Record<string, SmiskiItem[]>>((acc, item) => {
    const key = item.series;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

/** Order section keys to match filter dropdown order, then alphabetically for any extras. */
function sortSeriesKeys(
  grouped: Record<string, SmiskiItem[]>,
  preferredOrder: string[],
): string[] {
  const keys = Object.keys(grouped);
  const rank = new Map(preferredOrder.map((name, i) => [name, i]));
  return keys.sort((a, b) => {
    const ra = rank.has(a) ? rank.get(a)! : Number.MAX_SAFE_INTEGER;
    const rb = rank.has(b) ? rank.get(b)! : Number.MAX_SAFE_INTEGER;
    if (ra !== rb) return ra - rb;
    return a.localeCompare(b, undefined, { sensitivity: "base" });
  });
}

/* Stable white field: typed text stays dark; placeholder lighter; focus = border + ring only */
const inputClass =
  "w-full rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-sm font-medium text-stone-700 shadow-sm shadow-stone-200/50 outline-none transition placeholder:font-normal placeholder:text-stone-400 caret-smiski-primary focus:border-smiski-primary focus:ring-2 focus:ring-smiski-primary/20 focus:ring-offset-0";

const selectChevron =
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%237BB049'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")] bg-[length:1rem] bg-[position:right_0.75rem_center] bg-no-repeat";

const selectClass = `w-full cursor-pointer appearance-none rounded-2xl border border-stone-200 bg-white py-3.5 pl-4 pr-10 text-sm font-medium text-stone-700 shadow-sm shadow-stone-200/50 outline-none transition focus:border-smiski-primary focus:ring-2 focus:ring-smiski-primary/20 focus:ring-offset-0 [&>option]:bg-white [&>option]:text-stone-700 ${selectChevron}`;

const catalogGridClass =
  "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-4";

function matchesQuery(item: SmiskiItem, q: string): boolean {
  if (!q.trim()) return true;
  const needle = q.trim().toLowerCase();
  const haystack = [
    item.name,
    item.series,
    item.description,
    ...item.tags,
    item.type,
    formatSmiskiType(item.type).toLowerCase(),
    item.isSecret ? "secret" : "",
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-stone-500">
      {children}
    </span>
  );
}

export function CatalogClient({
  items,
  seriesOptions,
  ownedBySmiskiId,
  isAuthenticated,
  collectionStats,
}: Props) {
  const [query, setQuery] = useState("");
  const [series, setSeries] = useState<string>("all");
  const [type, setType] = useState<"all" | SmiskiItem["type"]>("all");
  const [secrets, setSecrets] = useState<"all" | "secret" | "regular">("all");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (!matchesQuery(item, query)) return false;
      if (series !== "all" && item.series !== series) return false;
      if (type !== "all" && item.type !== type) return false;
      if (secrets === "secret" && !item.isSecret) return false;
      if (secrets === "regular" && item.isSecret) return false;
      return true;
    });
  }, [items, query, series, type, secrets]);

  const groupedBySeries = useMemo(
    () => groupItemsBySeries(filtered),
    [filtered],
  );

  const seriesSectionOrder = useMemo(
    () => sortSeriesKeys(groupedBySeries, seriesOptions),
    [groupedBySeries, seriesOptions],
  );

  return (
    <div className={catalogPageShell}>
      {/* Hero */}
      <section
        className={heroSectionClass}
        aria-labelledby="catalog-heading"
      >
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-smiski-light/70 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 left-1/4 h-48 w-48 rounded-full bg-smiski-light/50 blur-3xl"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-smiski-light/35 to-transparent" />
        <div className="relative flex max-w-2xl flex-col gap-5">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-smiski-primary/25 bg-smiski-light/90 px-3 py-1.5 text-xs font-medium text-smiski-dark">
            <span className="text-smiski-primary" aria-hidden>
              ✦
            </span>
            公式風カタログ · Unofficial Catalog
          </p>
          <h1
            id="catalog-heading"
            className="text-3xl font-semibold tracking-tight text-stone-800 sm:text-4xl md:text-[2.65rem] md:leading-[1.12]"
          >
            Your Cute Little
            <span className="mt-1 block text-smiski-dark">
              Smiski Collection
            </span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-stone-500/90">
            Browse every series, track what you own, and find the ones you’re missing.
            <br />
            <span className="text-stone-400 text-sm">
              Smiskiのコレクションを全部見て、所有しているものを管理し、不足しているものを探しましょう。
            </span>
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="rounded-full border border-smiski-light bg-smiski-light/60 px-3 py-1 text-xs font-medium text-smiski-dark">
              {items.length} entries
            </span>
            <span className="rounded-full border border-smiski-light bg-smiski-light/60 px-3 py-1 text-xs font-medium text-smiski-dark">
              {seriesOptions.length} series
            </span>
          </div>
        </div>
      </section>

      {/* Search & filters */}
      <section
        className={filterSectionClass}
        aria-label="Search and filters"
      >
        <div className="flex flex-col gap-7">
          <label className="flex flex-col gap-2.5">
            <FieldLabel>Search</FieldLabel>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “bathroom”, “keychain”, or “secret”…"
              className={inputClass}
              autoComplete="off"
            />
          </label>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <label className="flex flex-col gap-2.5">
              <FieldLabel>Series</FieldLabel>
              <div className="relative">
                <select
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                  className={selectClass}
                >
                  <option value="all">All series</option>
                  {seriesOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label className="flex flex-col gap-2.5">
              <FieldLabel>Type</FieldLabel>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as "all" | SmiskiItem["type"])
                  }
                  className={selectClass}
                >
                  <option value="all">All types</option>
                  <option value="blind_box">Blind box</option>
                  <option value="keychain">Keychain</option>
                  <option value="hipper">Hipper</option>
                </select>
              </div>
            </label>

            <label className="flex flex-col gap-2.5 sm:col-span-2 lg:col-span-1">
              <FieldLabel>Secrets</FieldLabel>
              <div className="relative">
                <select
                  value={secrets}
                  onChange={(e) =>
                    setSecrets(e.target.value as "all" | "secret" | "regular")
                  }
                  className={selectClass}
                >
                  <option value="all">All items</option>
                  <option value="secret">Secrets only</option>
                  <option value="regular">Non-secret</option>
                </select>
              </div>
            </label>
          </div>

          <p className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-smiski-primary/80" />
            Showing{" "}
            <span className="font-semibold text-stone-700">
              {filtered.length}
            </span>{" "}
            of {items.length} items
          </p>
        </div>
      </section>

      <CollectionSummary
        stats={collectionStats}
        isAuthenticated={isAuthenticated}
      />

      {/* Catalog by series */}
      {filtered.length === 0 ? (
        <p className={emptyStateClass} role="status">
          No matches yet. Try a gentler keyword or widen your filters—your Smiski
          might just be peeking from behind something.
        </p>
      ) : (
        <div className="flex flex-col">
          {seriesSectionOrder.map((seriesName, sectionIndex) => {
            const seriesItems = groupedBySeries[seriesName];
            const headingId = `catalog-series-${sectionIndex}`;

            return (
              <section
                key={seriesName}
                className="mb-12 border-b border-smiski-light/40 pb-12 last:mb-0 last:border-b-0 last:pb-0"
                aria-labelledby={headingId}
              >
                <div className="mb-4 flex flex-col gap-1 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
                  <h2
                    id={headingId}
                    className="text-xl font-semibold tracking-tight text-smiski-dark sm:text-2xl"
                  >
                    {seriesName}
                  </h2>
                  <p className="text-sm font-medium text-stone-500">
                    {seriesItems.length}{" "}
                    {seriesItems.length === 1 ? "figure" : "figures"}
                  </p>
                </div>

                <ul className={catalogGridClass}>
                  {seriesItems.map((item) => (
                    <li key={item.id} className="flex min-w-0">
                      <div
                        className={`${catalogCardLinkClass} flex min-w-0 flex-1 flex-col`}
                      >
                        <Link
                          href={`/item/${item.id}`}
                          className="relative block aspect-[4/3] w-full shrink-0 overflow-hidden bg-gradient-to-br from-stone-100 to-smiski-light/35"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                          />
                          <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/[0.06] via-transparent to-white/30 opacity-90 transition duration-300 group-hover:from-stone-900/[0.08]"
                            aria-hidden
                          />
                          {item.isSecret && (
                            <span
                              className={`absolute right-2 top-2 ${secretBadgeClass}`}
                            >
                              Secret
                            </span>
                          )}
                          <span className="absolute bottom-2 left-2 rounded-full border border-white/80 bg-white/95 px-2 py-0.5 text-[10px] font-medium text-stone-600 opacity-0 shadow-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:translate-y-1">
                            View detail →
                          </span>
                        </Link>
                        <div className="flex min-h-0 flex-1 flex-col gap-2 p-3 sm:p-4">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/item/${item.id}`}
                              className="min-w-0 flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-smiski-primary/35 focus-visible:ring-offset-1"
                            >
                              <h3 className="text-sm font-semibold leading-snug tracking-tight text-stone-800 transition hover:text-smiski-dark sm:text-[0.9375rem]">
                                {item.name}
                              </h3>
                            </Link>
                            <span className="shrink-0 rounded-full border border-smiski-primary/20 bg-smiski-light/80 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-smiski-dark sm:px-2 sm:text-[11px]">
                              {formatSmiskiType(item.type)}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-stone-500 sm:text-sm">
                            {item.series}
                          </p>
                          <div className="flex flex-wrap gap-1.5 border-t border-stone-100 pt-2.5">
                            {item.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-smiski-primary/20 bg-smiski-light/90 px-2 py-0.5 text-[11px] font-medium text-smiski-dark sm:text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <OwnedQuantityControls
                            smiskiId={item.id}
                            initialQuantity={ownedBySmiskiId[item.id] ?? 0}
                            isAuthenticated={isAuthenticated}
                            compact
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
