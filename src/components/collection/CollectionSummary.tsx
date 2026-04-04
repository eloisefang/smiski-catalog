import type { CollectionSummaryStats } from "@/src/lib/collection/types";

type Props = {
  stats: CollectionSummaryStats;
  isAuthenticated: boolean;
};

export function CollectionSummary({ stats, isAuthenticated }: Props) {
  if (!isAuthenticated) {
    return (
      <section
        className="rounded-[2rem] border border-dashed border-smiski-light bg-smiski-light/25 px-6 py-5 text-sm text-stone-600 sm:px-8"
        aria-label="Collection progress"
      >
        <p className="font-medium text-smiski-dark/90">
          Sign in with Google to track which Smiskis you own and see your
          collection progress here.
        </p>
      </section>
    );
  }

  const { uniqueOwned, totalFigures, catalogTotal } = stats;
  const pct =
    catalogTotal > 0
      ? Math.round((uniqueOwned / catalogTotal) * 1000) / 10
      : 0;

  return (
    <section
      className="rounded-[2rem] border border-smiski-light/90 bg-white px-6 py-5 shadow-md shadow-stone-300/20 sm:px-8"
      aria-label="Collection progress"
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-smiski-dark">
        My collection
      </h2>
      <dl className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-smiski-light/50 px-4 py-3">
          <dt className="text-xs font-medium text-stone-600">Unique owned</dt>
          <dd className="text-2xl font-semibold tabular-nums text-smiski-dark">
            {uniqueOwned}
            <span className="text-sm font-normal text-stone-500">
              {" "}
              / {catalogTotal}
            </span>
          </dd>
        </div>
        <div className="rounded-xl bg-smiski-light/50 px-4 py-3">
          <dt className="text-xs font-medium text-stone-600">Total figures</dt>
          <dd className="text-2xl font-semibold tabular-nums text-smiski-dark">
            {totalFigures}
          </dd>
        </div>
        <div className="rounded-xl bg-smiski-light/50 px-4 py-3">
          <dt className="text-xs font-medium text-stone-600">Catalog filled</dt>
          <dd className="text-2xl font-semibold tabular-nums text-smiski-dark">
            {pct}%
          </dd>
        </div>
      </dl>
    </section>
  );
}
