import { CatalogClient } from "@/src/components/CatalogClient";
import {
  SMISKI_ITEMS,
  getSmiskiSeries,
} from "@/src/data/smiski";
import { fetchOwnedRowsForUser, rowsToQuantityMap } from "@/src/lib/collection/queries";
import { computeCollectionSummary } from "@/src/lib/collection/summary";
import { createClient } from "@/src/lib/supabase/server";

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
