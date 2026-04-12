/** Search / filter controls on the catalog page (Tailwind literals). */

export const catalogSearchInputClass =
  "w-full rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-sm font-medium text-stone-700 shadow-sm shadow-stone-200/50 outline-none transition placeholder:font-normal placeholder:text-stone-400 caret-smiski-primary focus:border-smiski-primary focus:ring-2 focus:ring-smiski-primary/20 focus:ring-offset-0";

const catalogSelectChevron =
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%237BB049'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")] bg-[length:1rem] bg-[position:right_0.75rem_center] bg-no-repeat";

export const catalogSelectClass = `w-full cursor-pointer appearance-none rounded-2xl border border-stone-200 bg-white py-3.5 pl-4 pr-10 text-sm font-medium text-stone-700 shadow-sm shadow-stone-200/50 outline-none transition focus:border-smiski-primary focus:ring-2 focus:ring-smiski-primary/20 focus:ring-offset-0 [&>option]:bg-white [&>option]:text-stone-700 ${catalogSelectChevron}`;

export const catalogGridClass =
  "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-4";
