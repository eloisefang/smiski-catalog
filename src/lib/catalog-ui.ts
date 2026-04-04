/**
 * Shared Tailwind class strings (static literals) for catalog UI consistency.
 * Green accents use the smiski.* palette from app/globals.css @theme.
 */

export const catalogPageShell =
  "mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10";

export const detailPageShell =
  "mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-20 pt-8 sm:gap-10 sm:px-6 sm:pb-24 sm:pt-10";

/** Sticky header shell */
export const navHeaderClass =
  "sticky top-0 z-50 border-b border-smiski-light bg-white/90 backdrop-blur-sm";

/** Logo / nav control focus ring — ring-offset matches page cream */
export const navFocusRingClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-smiski-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f3]";

/** Secret figure — grid + detail */
export const secretBadgeClass =
  "rounded-full border border-smiski-primary/40 bg-smiski-light px-3 py-1 text-xs font-semibold uppercase tracking-wide text-smiski-dark shadow-sm";

/** Product card link: single hover shadow (no duplicate utilities) */
export const catalogCardLinkClass =
  "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white shadow-md shadow-stone-300/20 transition duration-300 ease-out motion-safe:hover:-translate-y-1 hover:border-smiski-primary/45 hover:shadow-lg hover:shadow-stone-300/35";

export const heroSectionClass =
  "relative overflow-hidden rounded-[2rem] border border-smiski-light/80 bg-gradient-to-br from-white via-smiski-light/25 to-stone-50 p-8 shadow-lg shadow-stone-300/25 sm:p-10 md:p-12";

export const filterSectionClass =
  "rounded-[2rem] border border-smiski-light/90 bg-white p-6 shadow-md shadow-stone-300/25 sm:p-8";

export const emptyStateClass =
  "rounded-[2rem] border border-dashed border-smiski-light bg-smiski-light/30 px-8 py-20 text-center text-sm leading-relaxed text-stone-500";

export const detailArticleClass =
  "overflow-hidden rounded-[2rem] border border-smiski-light/90 bg-white shadow-lg shadow-stone-300/25";
