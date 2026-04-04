"use server";

import { revalidatePath } from "next/cache";
import { getSmiskiById } from "@/src/data/smiski";
import { createClient } from "@/src/lib/supabase/server";

export type AdjustQuantityResult =
  | { ok: true; quantity: number }
  | { ok: false; error: string };

export async function adjustOwnedQuantity(
  smiskiId: string,
  delta: 1 | -1,
): Promise<AdjustQuantityResult> {
  if (delta !== 1 && delta !== -1) {
    return { ok: false, error: "Invalid change" };
  }

  const item = getSmiskiById(smiskiId);
  if (!item) return { ok: false, error: "Unknown Smiski" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Sign in to save your collection" };

  const { data: existing, error: fetchError } = await supabase
    .from("user_smiski")
    .select("quantity")
    .eq("user_id", user.id)
    .eq("smiski_id", smiskiId)
    .maybeSingle();

  if (fetchError) {
    return { ok: false, error: fetchError.message };
  }

  const current = existing?.quantity ?? 0;
  const nextQty = current + delta;

  if (nextQty < 0) {
    return { ok: false, error: "Quantity cannot be negative" };
  }

  if (nextQty === 0) {
    const { error: delError } = await supabase
      .from("user_smiski")
      .delete()
      .eq("user_id", user.id)
      .eq("smiski_id", smiskiId);

    if (delError) return { ok: false, error: delError.message };
    revalidatePath("/");
    revalidatePath(`/item/${smiskiId}`);
    return { ok: true, quantity: 0 };
  }

  if (current === 0 && delta === 1) {
    const { error: insError } = await supabase.from("user_smiski").insert({
      user_id: user.id,
      smiski_id: smiskiId,
      quantity: 1,
    });
    if (insError) return { ok: false, error: insError.message };
  } else {
    const { error: updError } = await supabase
      .from("user_smiski")
      .update({ quantity: nextQty })
      .eq("user_id", user.id)
      .eq("smiski_id", smiskiId);
    if (updError) return { ok: false, error: updError.message };
  }

  revalidatePath("/");
  revalidatePath(`/item/${smiskiId}`);
  return { ok: true, quantity: nextQty };
}
