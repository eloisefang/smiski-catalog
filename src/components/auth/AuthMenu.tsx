"use client";

import type { User } from "@supabase/supabase-js";
import { useState } from "react";
import { signOutAction } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/client";

type Props = {
  initialUser: User | null;
};

export function AuthMenu({ initialUser }: Props) {
  const user = initialUser;
  const [busy, setBusy] = useState(false);

  async function signInWithGoogle() {
    setBusy(true);
    const supabase = createClient();
    const origin = window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    setBusy(false);
    if (error) console.error(error.message);
  }

  const avatar =
    user?.user_metadata?.avatar_url ??
    user?.user_metadata?.picture ??
    null;
  const label =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email ??
    "Account";

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => void signInWithGoogle()}
        disabled={busy}
        className="rounded-full border border-smiski-primary/35 bg-white px-3 py-1.5 text-xs font-semibold text-smiski-dark shadow-sm transition hover:bg-smiski-light/60 disabled:opacity-60 sm:px-4 sm:text-sm"
      >
        {busy ? "Connecting…" : "Sign in with Google"}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span className="hidden max-w-[140px] truncate text-xs text-stone-600 sm:inline">
        {label}
      </span>
      {avatar ? (
        // eslint-disable-next-line @next/next/no-img-element -- OAuth avatar URL from Google
        <img
          src={avatar}
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 rounded-full ring-2 ring-smiski-light"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-smiski-light text-sm font-semibold text-smiski-dark ring-2 ring-smiski-primary/20">
          {label.slice(0, 1).toUpperCase()}
        </span>
      )}
      <form action={signOutAction}>
        <button
          type="submit"
          className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm hover:border-smiski-primary/30 hover:text-smiski-dark sm:text-sm"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
