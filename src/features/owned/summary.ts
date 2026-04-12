import type { CollectionSummaryStats, UserSmiskiRow } from "@/types/collection";

export function computeCollectionSummary(
  rows: UserSmiskiRow[],
  catalogTotal: number,
): CollectionSummaryStats {
  const positive = rows.filter((r) => r.quantity > 0);
  const uniqueOwned = positive.length;
  const totalFigures = positive.reduce((sum, r) => sum + r.quantity, 0);
  return { uniqueOwned, totalFigures, catalogTotal };
}
