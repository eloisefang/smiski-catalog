import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OwnedQuantityControls } from "@/src/components/collection/OwnedQuantityControls";
import {
  SMISKI_ITEMS,
  getSmiskiById,
} from "@/src/data/smiski";
import {
  detailArticleClass,
  detailPageShell,
  secretBadgeClass,
} from "@/src/lib/catalog-ui";
import { fetchQuantityForSmiski } from "@/src/lib/collection/queries";
import { formatSmiskiType } from "@/src/lib/smiski-label";
import { createClient } from "@/src/lib/supabase/server";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return SMISKI_ITEMS.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getSmiskiById(id);
  if (!item) return { title: "Not found" };
  return {
    title: `${item.name} · Smiski Catalog`,
    description: item.description,
  };
}

export default async function ItemPage({ params }: PageProps) {
  const { id } = await params;
  const item = getSmiskiById(id);
  if (!item) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const ownedQty = user
    ? await fetchQuantityForSmiski(user.id, item.id)
    : 0;

  return (
    <div className={detailPageShell}>
      <Link
        href="/"
        className="group inline-flex w-fit items-center gap-2 rounded-full border border-smiski-light bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm shadow-stone-200/50 transition hover:border-smiski-primary/40 hover:text-smiski-dark hover:shadow-md"
      >
        <span className="transition group-hover:-translate-x-0.5" aria-hidden>
          ←
        </span>
        Back to catalog
      </Link>

      <article className={detailArticleClass}>
        <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
          <div className="bg-smiski-light/35 p-4 sm:p-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/80 bg-white shadow-inner shadow-stone-200/60">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {item.isSecret && (
                <span className={`absolute right-4 top-4 ${secretBadgeClass}`}>
                  Secret
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-7 p-6 sm:gap-8 sm:p-8 lg:p-10 lg:pl-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-smiski-light bg-smiski-light/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-stone-600">
                {item.series}
              </span>
              <span className="rounded-full border border-smiski-primary/25 bg-smiski-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-smiski-dark">
                {formatSmiskiType(item.type)}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-smiski-dark sm:text-4xl">
                {item.name}
              </h1>
              <p className="max-w-prose text-base leading-relaxed text-stone-500">
                {item.description}
              </p>
            </div>

            <OwnedQuantityControls
              smiskiId={item.id}
              initialQuantity={ownedQty}
              isAuthenticated={!!user}
            />

            <div className="rounded-2xl border border-smiski-light/90 bg-smiski-light/40 p-5">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-smiski-dark/80">
                Tags
              </h2>
              <ul className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-smiski-primary/20 bg-white px-3 py-1 text-sm font-medium text-smiski-dark shadow-sm shadow-stone-200/30"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
