export type UserSmiskiRow = {
  smiski_id: string;
  quantity: number;
};

export type CollectionSummaryStats = {
  /** Distinct Smiski with quantity > 0 */
  uniqueOwned: number;
  /** Sum of all quantities */
  totalFigures: number;
  /** Total entries in the static catalog */
  catalogTotal: number;
};
