"use client";

import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthMenu } from "@/src/components/auth/AuthMenu";
import { navFocusRingClass, navHeaderClass } from "@/src/lib/catalog-ui";

type Props = {
  initialUser: User | null;
};

export function SiteNav({ initialUser }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCommunity = pathname === "/community";

  return (
    <header className={navHeaderClass}>
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-6">
          <Link
            href="/"
            className={`group flex min-w-0 items-center gap-3 rounded-xl transition ${navFocusRingClass}`}
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-smiski-light/40 text-lg text-smiski-dark shadow-sm shadow-stone-300/30 ring-1 ring-smiski-light transition group-hover:bg-smiski-light/70 group-hover:shadow-md group-hover:ring-smiski-primary/35"
              aria-hidden
            >
              ☺
            </span>
            <div className="min-w-0 flex flex-col leading-tight">
              <span className="truncate text-sm font-semibold tracking-tight text-smiski-dark">
                Smiski Dex
              </span>
              <span className="hidden text-[11px] font-medium tracking-wide text-stone-500 sm:block">
                Collectible catalog
              </span>
            </div>
          </Link>

          <nav className="flex shrink-0 items-center gap-1" aria-label="Main">
            <Link
              href="/"
              className={`rounded-full px-3 py-2 text-sm font-medium transition sm:px-4 ${navFocusRingClass} ${
                isHome
                  ? "bg-smiski-light/50 text-smiski-dark shadow-sm shadow-stone-300/25 ring-1 ring-smiski-primary/25"
                  : "text-stone-600 hover:bg-smiski-light/40 hover:text-smiski-dark"
              }`}
            >
              Catalog
            </Link>
            <Link
              href="/community"
              className={`rounded-full px-3 py-2 text-sm font-medium transition sm:px-4 ${navFocusRingClass} ${
                isCommunity
                  ? "bg-smiski-light/50 text-smiski-dark shadow-sm shadow-stone-300/25 ring-1 ring-smiski-primary/25"
                  : "text-stone-600 hover:bg-smiski-light/40 hover:text-smiski-dark"
              }`}
            >
              Community
            </Link>
          </nav>
        </div>

        <AuthMenu initialUser={initialUser} />
      </div>
    </header>
  );
}
