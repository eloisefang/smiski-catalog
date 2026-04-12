import type { SmiskiItem } from "@/data/smiski";
import { formatSmiskiType } from "@/features/catalog/utils/smiski-label";

export function groupItemsBySeries(
  items: SmiskiItem[],
): Record<string, SmiskiItem[]> {
  return items.reduce<Record<string, SmiskiItem[]>>((acc, item) => {
    const key = item.series;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

export function sortSeriesKeys(
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

export function matchesQuery(item: SmiskiItem, q: string): boolean {
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
