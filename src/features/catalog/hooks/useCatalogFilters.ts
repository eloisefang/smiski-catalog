"use client";

import { useMemo, useState } from "react";
import type { SmiskiItem } from "@/data/smiski";
import {
  groupItemsBySeries,
  matchesQuery,
  sortSeriesKeys,
} from "@/features/catalog/utils/filter-catalog";

export function useCatalogFilters(
  items: SmiskiItem[],
  seriesOptions: string[],
  catalogAuth: boolean,
  ownedIds: string[],
  ownedLoading: boolean,
) {
  const [query, setQuery] = useState("");
  const [series, setSeries] = useState<string>("all");
  const [type, setType] = useState<"all" | SmiskiItem["type"]>("all");
  const [owned, setOwned] = useState<"all" | "owned">("all");

  const ownedFilterActive = catalogAuth && owned === "owned";
  const ownedIdSet = useMemo(() => new Set(ownedIds), [ownedIds]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (!matchesQuery(item, query)) return false;
      if (series !== "all" && item.series !== series) return false;
      if (type !== "all" && item.type !== type) return false;
      if (ownedFilterActive && !ownedIdSet.has(item.id)) return false;
      return true;
    });
  }, [items, query, series, type, ownedFilterActive, ownedIdSet]);

  const userHasNoOwned =
    catalogAuth && ownedIds.length === 0 && !ownedLoading;

  const groupedBySeries = useMemo(
    () => groupItemsBySeries(filtered),
    [filtered],
  );

  const seriesSectionOrder = useMemo(
    () => sortSeriesKeys(groupedBySeries, seriesOptions),
    [groupedBySeries, seriesOptions],
  );

  return {
    query,
    setQuery,
    series,
    setSeries,
    type,
    setType,
    owned,
    setOwned,
    filtered,
    ownedFilterActive,
    userHasNoOwned,
    groupedBySeries,
    seriesSectionOrder,
    catalogOwnedSelectValue: catalogAuth ? owned : "all",
  };
}
