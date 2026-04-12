"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type UseOwnedSmiskisOptions = {
  /** SSR snapshot of quantities for the signed-in user. */
  initialQuantityBySmiskiId: Record<string, number>;
  serverAuthenticated: boolean;
};

export type UseOwnedSmiskisResult = {
  ownedIds: string[];
  quantityBySmiskiId: Record<string, number>;
  loading: boolean;
  isLoggedIn: boolean;
};

function quantitiesToOwnedIds(q: Record<string, number>): string[] {
  return Object.entries(q)
    .filter(([, qty]) => qty > 0)
    .map(([id]) => id);
}

export function useOwnedSmiskis({
  initialQuantityBySmiskiId,
  serverAuthenticated,
}: UseOwnedSmiskisOptions): UseOwnedSmiskisResult {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(serverAuthenticated);
  const [quantityBySmiskiId, setQuantityBySmiskiId] = useState(
    initialQuantityBySmiskiId,
  );
  const [ownedIds, setOwnedIds] = useState<string[]>(() =>
    quantitiesToOwnedIds(initialQuantityBySmiskiId),
  );

  const skipNextServerSync = useRef(false);
  const didInitServerRef = useRef(false);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsLoggedIn(false);
      setQuantityBySmiskiId({});
      setOwnedIds([]);
      setLoading(false);
      return;
    }

    setIsLoggedIn(true);
    const { data, error } = await supabase
      .from("user_smiski")
      .select("smiski_id, quantity")
      .eq("user_id", user.id);

    if (error || !data) {
      setQuantityBySmiskiId({});
      setOwnedIds([]);
      setLoading(false);
      return;
    }

    const nextQty: Record<string, number> = {};
    const nextIds: string[] = [];
    for (const row of data) {
      if (row.quantity > 0) {
        nextQty[row.smiski_id] = row.quantity;
        nextIds.push(row.smiski_id);
      }
    }
    skipNextServerSync.current = true;
    setQuantityBySmiskiId(nextQty);
    setOwnedIds(nextIds);
    setLoading(false);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Supabase auth/session sync
    void load();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void load();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [load]);

  useEffect(() => {
    if (!didInitServerRef.current) {
      didInitServerRef.current = true;
      return;
    }
    if (skipNextServerSync.current) {
      skipNextServerSync.current = false;
      return;
    }
    if (!isLoggedIn) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- apply RSC `router.refresh()` snapshot
    setQuantityBySmiskiId({ ...initialQuantityBySmiskiId });
    setOwnedIds(quantitiesToOwnedIds(initialQuantityBySmiskiId));
  }, [initialQuantityBySmiskiId, isLoggedIn]);

  return {
    ownedIds,
    quantityBySmiskiId,
    loading,
    isLoggedIn,
  };
}
