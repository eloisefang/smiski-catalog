import { CatalogClient } from "@/features/catalog/components/CatalogClient";
import {
  SMISKI_ITEMS,
  getSmiskiSeries,
} from "@/data/smiski";
import { fetchOwnedRowsForUser, rowsToQuantityMap } from "@/features/owned/queries";
import { computeCollectionSummary } from "@/features/owned/summary";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const series = getSmiskiSeries();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ownedRows = user ? await fetchOwnedRowsForUser(user.id) : [];
  const ownedBySmiskiId = rowsToQuantityMap(ownedRows);
  const collectionStats = computeCollectionSummary(
    ownedRows,
    SMISKI_ITEMS.length,
  );

  return (
    <CatalogClient
      items={SMISKI_ITEMS}
      seriesOptions={series}
      ownedBySmiskiId={ownedBySmiskiId}
      isAuthenticated={!!user}
      collectionStats={collectionStats}
    />
  );
}
