import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailCommentsSection } from "@/components/community/DetailCommentsSection";
import { createClient } from "@/lib/supabase/server";
import { communityPageShell, communityHeroClass, communityCardClass } from "@/lib/community-ui";

function creatorLabel(userId: string, viewerId: string | null) {
  if (viewerId && userId === viewerId) return "You";
  return `User-${userId.slice(0, 6)}`;
}

function formatPosted(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function CommunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user: viewer },
  } = await supabase.auth.getUser();

  const { data: post, error: postError } = await supabase
    .from("community_posts")
    .select("id, user_id, type, title, description, series, created_at")
    .eq("id", id)
    .maybeSingle();

  if (postError) {
    console.error("community_posts detail fetch failed", postError);
  }
  if (!post) notFound();

  // Frontend currently supports showcase + trade details.
  if (post.type !== "showcase" && post.type !== "trade") {
    notFound();
  }

  const { data: images } = await supabase
    .from("post_images")
    .select("image_url, sort_order")
    .eq("post_id", post.id)
    .order("sort_order", { ascending: true });

  const imageUrls = (images ?? []).map((r) => r.image_url);

  const { data: trade } =
    post.type === "trade"
      ? await supabase
          .from("trade_posts")
          .select("looking_for, offering, status, location")
          .eq("post_id", post.id)
          .maybeSingle()
      : { data: null };

  const { data: comments } = await supabase
    .from("comments")
    .select("id, user_id, content, created_at")
    .eq("post_id", post.id)
    .order("created_at", { ascending: true });

  return (
    <div className={communityPageShell}>
      <section className={communityHeroClass} aria-label="Post detail">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              {post.type === "trade" ? "Trade" : "Showcase"} · {formatPosted(post.created_at)}
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-800 sm:text-3xl">
              {post.title}
            </h1>
            <p className="text-sm text-stone-600">
              Posted by{" "}
              <span className="font-semibold text-stone-800">
                {creatorLabel(post.user_id, viewer?.id ?? null)}
              </span>
              {post.series ? (
                <span className="ml-2 rounded-full border border-smiski-primary/25 bg-smiski-light/70 px-2 py-0.5 text-[11px] font-semibold text-smiski-dark">
                  {post.series}
                </span>
              ) : null}
            </p>
          </div>
          <Link
            href="/community"
            className="rounded-full border border-smiski-light bg-white px-4 py-2 text-sm font-semibold text-smiski-dark shadow-sm transition hover:bg-smiski-light/50"
          >
            ← Back
          </Link>
        </div>
      </section>

      {post.type === "trade" && (
        <section className={`${communityCardClass} p-5 sm:p-6`} aria-label="Trade details">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-smiski-light/90 bg-smiski-light/35 p-4 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-wide text-smiski-dark">
                Looking for
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug text-stone-800">
                {trade?.looking_for ?? "—"}
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
                Offering
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug text-stone-800">
                {trade?.offering ?? "—"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-stone-200 bg-white px-3 py-1 font-semibold text-stone-600">
              Status: {trade?.status ?? "open"}
            </span>
            {trade?.location ? (
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1 font-semibold text-stone-600">
                Location: {trade.location}
              </span>
            ) : null}
          </div>

          {post.description ? (
            <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
                Description
              </p>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-stone-700">
                {post.description}
              </p>
            </div>
          ) : null}

          <div className="mt-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-stone-500">
                Images
              </p>
              {imageUrls.length === 0 ? (
                <p className="text-sm text-stone-500">No images.</p>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {imageUrls.map((src) => (
                    <a
                      key={src}
                      href={src}
                      target="_blank"
                      rel="noreferrer"
                      className="block transition hover:opacity-95"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        className="w-full rounded-2xl border border-smiski-light/80 object-cover shadow-sm"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {post.type !== "trade" && (
        <section className={`${communityCardClass} p-5 sm:p-6`} aria-label="Showcase details">
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
              Images
            </p>
            {imageUrls.length === 0 ? (
              <p className="mt-1 text-sm text-stone-500">No images.</p>
            ) : (
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {imageUrls.map((src) => (
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className="block transition hover:opacity-95"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="w-full rounded-2xl border border-smiski-light/80 object-cover shadow-sm"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          {post.description ? (
            <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
                Description
              </p>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-stone-700">
                {post.description}
              </p>
            </div>
          ) : null}
        </section>
      )}

      <DetailCommentsSection
        postId={post.id}
        postOwnerId={post.user_id}
        viewerId={viewer?.id ?? null}
        initialComments={comments ?? []}
      />
    </div>
  );
}

