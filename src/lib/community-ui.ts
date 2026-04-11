/** Shared Tailwind classes for Community UI — matches catalog green theme */

export const communityPageShell =
  "mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-20 pt-8 sm:gap-12 sm:px-6 sm:pb-24 sm:pt-10";

export const communityHeroClass =
  "relative overflow-hidden rounded-[2rem] border border-smiski-light/80 bg-gradient-to-br from-white via-smiski-light/30 to-stone-50 p-8 shadow-lg shadow-stone-300/25 sm:p-10";

export const communityCardClass =
  "overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-md shadow-stone-300/20 transition duration-300 ease-out motion-safe:hover:-translate-y-0.5 hover:border-smiski-primary/40 hover:shadow-lg hover:shadow-stone-300/35";

/** Trade tab list cards only — larger presence; do not use for showcase masonry. */
export const tradeCardClass =
  "overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white shadow-lg shadow-stone-300/25 transition duration-200 ease-out motion-safe:hover:scale-[1.02] hover:border-smiski-primary/45 hover:shadow-xl hover:shadow-stone-300/40";

export const communityMutedLabelClass =
  "text-xs font-semibold uppercase tracking-[0.1em] text-stone-500";

export const communityInputClass =
  "w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 shadow-sm shadow-stone-200/50 outline-none transition placeholder:font-normal placeholder:text-stone-400 caret-smiski-primary focus:border-smiski-primary focus:ring-2 focus:ring-smiski-primary/20 focus:ring-offset-0";

export const communitySelectChevron =
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%237BB049'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")] bg-[length:1rem] bg-[position:right_0.75rem_center] bg-no-repeat";

export const communitySelectClass = `w-full cursor-pointer appearance-none rounded-2xl border border-stone-200 bg-white py-3 pl-4 pr-10 text-sm font-medium text-stone-700 shadow-sm shadow-stone-200/50 outline-none transition focus:border-smiski-primary focus:ring-2 focus:ring-smiski-primary/20 focus:ring-offset-0 [&>option]:bg-white [&>option]:text-stone-700 ${communitySelectChevron}`;

export const communityTabButtonClass = (active: boolean) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-smiski-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f3] ${
    active
      ? "bg-smiski-light/70 text-smiski-dark shadow-sm shadow-stone-300/25 ring-1 ring-smiski-primary/25"
      : "text-stone-600 hover:bg-smiski-light/45 hover:text-smiski-dark"
  }`;

export const communityPrimaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-smiski-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-smiski-primary/25 transition hover:bg-smiski-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-smiski-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f3]";

export const communityGhostButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-smiski-light bg-white px-4 py-2 text-sm font-semibold text-smiski-dark shadow-sm shadow-stone-200/40 transition hover:bg-smiski-light/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-smiski-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f3]";
