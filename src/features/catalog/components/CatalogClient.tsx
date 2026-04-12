"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { FieldLabel } from "@/components/ui/field-label";
import type { SmiskiItem } from "@/data/smiski";
import { useCatalogFilters } from "@/features/catalog/hooks/useCatalogFilters";
import {
  catalogCardLinkClass,
  catalogPageShell,
  emptyStateClass,
  filterSectionClass,
  heroSectionClass,
  ownedBadgeClass,
  secretBadgeClass,
} from "@/features/catalog/utils/catalog-ui";
import {
  catalogGridClass,
  catalogSearchInputClass,
  catalogSelectClass,
} from "@/features/catalog/utils/catalog-form-classes";
import { formatSmiskiType } from "@/features/catalog/utils/smiski-label";
import { CollectionSummary } from "@/features/owned/components/CollectionSummary";
import { OwnedQuantityControls } from "@/features/owned/components/OwnedQuantityControls";
import { computeCollectionSummary } from "@/features/owned/summary";
import { useOwnedSmiskis } from "@/features/owned/hooks/useOwnedSmiskis";
import type { CollectionSummaryStats } from "@/types/collection";

type Props = {
  items: SmiskiItem[];
  seriesOptions: string[];
  ownedBySmiskiId: Record<string, number>;
  isAuthenticated: boolean;
  collectionStats: CollectionSummaryStats;
};

export function CatalogClient({
  items,
  seriesOptions,
  ownedBySmiskiId: initialOwnedBySmiskiId,
  isAuthenticated,
  collectionStats,
}: Props) {
  const { ownedIds, quantityBySmiskiId, loading: ownedLoading, isLoggedIn } =
    useOwnedSmiskis({
      initialQuantityBySmiskiId: initialOwnedBySmiskiId,
      serverAuthenticated: isAuthenticated,
    });

  const catalogAuth = ownedLoading ? isAuthenticated : isLoggedIn;

  const {
    query,
    setQuery,
    series,
    setSeries,
    type,
    setType,
    setOwned,
    filtered,
    ownedFilterActive,
    userHasNoOwned,
    groupedBySeries,
    seriesSectionOrder,
    catalogOwnedSelectValue,
  } = useCatalogFilters(items, seriesOptions, catalogAuth, ownedIds, ownedLoading);

  const ownedIdSet = useMemo(() => new Set(ownedIds), [ownedIds]);

  const displayStats = useMemo(() => {
    if (!catalogAuth) return collectionStats;
    const rows = Object.entries(quantityBySmiskiId).map(
      ([smiski_id, quantity]) => ({ smiski_id, quantity }),
    );
    return computeCollectionSummary(rows, items.length);
  }, [catalogAuth, quantityBySmiskiId, items.length, collectionStats]);

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
            Browse every series, track what you have, and find the ones you’re missing.
          </p>
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
              className={catalogSearchInputClass}
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
                  className={catalogSelectClass}
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
                  className={catalogSelectClass}
                >
                  <option value="all">All types</option>
                  <option value="blind_box">Blind box</option>
                  <option value="keychain">Keychain</option>
                  <option value="hipper">Hipper</option>
                </select>
              </div>
            </label>

            <label className="flex flex-col gap-2.5">
              <FieldLabel weight="bold">Owned</FieldLabel>
              <div className="relative">
                <select
                  value={catalogOwnedSelectValue}
                  onChange={(e) =>
                    setOwned(e.target.value as "all" | "owned")
                  }
                  className={catalogSelectClass}
                  aria-describedby={
                    !catalogAuth ? "catalog-owned-hint" : undefined
                  }
                >
                  <option value="all">All</option>
                  <option value="owned" disabled={!catalogAuth}>
                    Owned
                  </option>
                </select>
              </div>
              {!catalogAuth ? (
                <p
                  id="catalog-owned-hint"
                  className="text-xs font-normal leading-relaxed text-stone-500"
                >
                  Log in to view your owned Smiskis
                </p>
              ) : null}
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
        stats={displayStats}
        isAuthenticated={catalogAuth}
      />

      {/* Catalog by series */}
      {filtered.length === 0 ? (
        <p className={emptyStateClass} role="status">
          {ownedFilterActive && userHasNoOwned ? (
            <>
              You haven&apos;t added any owned Smiskis yet. Start collecting by
              marking items you own.
            </>
          ) : (
            <>
              No matches yet. Try a gentler keyword or widen your filters—your
              Smiski might just be peeking from behind something.
            </>
          )}
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
                          {catalogAuth && ownedIdSet.has(item.id) && (
                            <span
                              className={`absolute left-2 top-2 ${ownedBadgeClass}`}
                            >
                              Owned
                            </span>
                          )}
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
                            initialQuantity={
                              quantityBySmiskiId[item.id] ?? 0
                            }
                            isAuthenticated={catalogAuth}
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
