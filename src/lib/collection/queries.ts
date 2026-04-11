import { createClient } from "@/src/lib/supabase/server";
import type { UserSmiskiRow } from "./types";

/** Loads collection rows for the signed-in user (RLS must match `userId`). */
export async function fetchOwnedRowsForUser(
  userId: string,
): Promise<UserSmiskiRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_smiski")
    .select("smiski_id, quantity")
    .eq("user_id", userId);

  if (error || !data) return [];
  return data as UserSmiskiRow[];
}

export function rowsToQuantityMap(rows: UserSmiskiRow[]): Record<string, number> {
  const map: Record<string, number> = {};
  for (const row of rows) {
    if (row.quantity > 0) map[row.smiski_id] = row.quantity;
  }
  return map;
}

export async function fetchQuantityForSmiski(
  userId: string,
  smiskiId: string,
): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("user_smiski")
    .select("quantity")
    .eq("user_id", userId)
    .eq("smiski_id", smiskiId)
    .maybeSingle();
  return data?.quantity ?? 0;
}
