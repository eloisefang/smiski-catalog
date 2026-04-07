import type { Metadata } from "next";
import { CommunityClient } from "@/src/components/community/CommunityClient";
import { getSmiskiSeries } from "@/src/data/smiski";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Share your Smiski collection, discover decor ideas, and browse trade posts from other collectors.",
};

export default function CommunityPage() {
  const seriesOptions = getSmiskiSeries();
  return <CommunityClient seriesOptions={seriesOptions} />;
}
