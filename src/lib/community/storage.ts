/** Extract storage object path from Supabase public URL for `community-images` bucket. */
export function extractCommunityImageStoragePath(
  publicUrl: string,
  bucket: string,
): string | null {
  try {
    const marker = `/object/public/${bucket}/`;
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return null;
    return decodeURIComponent(publicUrl.slice(idx + marker.length));
  } catch {
    return null;
  }
}
