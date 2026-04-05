import type { SmiskiItem } from "./smiski";

export const strapSeries2Items: SmiskiItem[] = [
  {
    id: "strap201",
    name: "SMISKI Kneeling",
    series: "Strap Series 2",
    type: "keychain",
    isSecret: false,
    image: "/strap_series2/img_strap201.png",
    tags: ["kneeling", "kind", "awkward"],
    description:
      "Often sits with knees folded. Has a kind heart but is a little awkward showing it in front of other people.",
  },
  {
    id: "strap202",
    name: "SMISKI Pushing",
    series: "Strap Series 2",
    type: "keychain",
    isSecret: false,
    image: "/strap_series2/img_strap202.png",
    tags: ["pushing", "active", "hiding"],
    description:
      "Always pushing things together to create the perfect hiding spot.",
  },
  {
    id: "strap203",
    name: "SMISKI Listening",
    series: "Strap Series 2",
    type: "keychain",
    isSecret: false,
    image: "/strap_series2/img_strap203.png",
    tags: ["listening", "curious", "quiet"],
    description:
      "Curious about the sounds coming in from next door, this Smiski is always listening in.",
  },
  {
    id: "strap204",
    name: "SMISKI Climbing",
    series: "Strap Series 2",
    type: "keychain",
    isSecret: false,
    image: "/strap_series2/img_strap204.png",
    tags: ["climbing", "slow", "determined"],
    description:
      "This Smiski’s action is too slow. Often spotted trying to climb over things but never quite making it.",
  },
  {
    id: "strap205",
    name: "SMISKI Peeking",
    series: "Strap Series 2",
    type: "keychain",
    isSecret: false,
    image: "/strap_series2/img_strap205.png",
    tags: ["peeking", "playful", "curious"],
    description:
      "A playful Smiski who likes to look out at the world from an upside down point of view.",
  },
  {
    id: "strap206",
    name: "SMISKI Daydreaming",
    series: "Strap Series 2",
    type: "keychain",
    isSecret: false,
    image: "/strap_series2/img_strap206.png",
    tags: ["daydreaming", "calm", "lost"],
    description:
      "Likes to daydream all day long. Most of the time, this Smiski is lost in its own world.",
  },
  {
    id: "strap207",
    name: "Secret SMISKI",
    series: "Strap Series 2",
    type: "keychain",
    isSecret: false,
    image: "/strap_series2/img_strap207.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return strapSeries2Items.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(strapSeries2Items.map((item) => item.series))].sort();
}
