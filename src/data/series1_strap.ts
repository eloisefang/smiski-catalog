import type { SmiskiItem } from "./smiski";

export const strapSeries1Items: SmiskiItem[] = [
  {
    id: "strap101",
    name: "SMISKI Peeking",
    series: "Strap Series 1",
    type: "keychain",
    isSecret: false,
    image: "/strap_series1/img_strap101.png",
    tags: ["peeking", "shy", "timid"],
    description:
      "Always hunched over and peeking in from the corner. Needs to gather up courage before approaching anything.",
  },
  {
    id: "strap102",
    name: "SMISKI Hugging Knees",
    series: "Strap Series 1",
    type: "keychain",
    isSecret: false,
    image: "/strap_series1/img_strap102.png",
    tags: ["hugging", "thoughtful", "quiet"],
    description:
      "Always in the corner hugging onto the knees, staring out into the distance pensive in thought.",
  },
  {
    id: "strap103",
    name: "SMISKI Looking Back",
    series: "Strap Series 1",
    type: "keychain",
    isSecret: false,
    image: "/strap_series1/img_strap103.png",
    tags: ["surprised", "scared", "alert"],
    description:
      "A Smiski that scares easily. When found, it will turn back and stare at you in surprise.",
  },
  {
    id: "strap04",
    name: "SMISKI Sitting",
    series: "Strap Series 1",
    type: "keychain",
    isSecret: false,
    image: "/strap_series1/img_strap104.png",
    tags: ["sitting", "calm", "alone"],
    description:
      "Often found sitting silently and gazing down at something. Has a wary personality and prefers being alone.",
  },
  {
    id: "strap105",
    name: "SMISKI Hiding",
    series: "Strap Series 1",
    type: "keychain",
    isSecret: false,
    image: "/strap_series1/img_strap105.png",
    tags: ["hiding", "shy", "small"],
    description:
      "Hiding is his specialty. Finds all sorts of spots to hide in. Feels most at home in small, narrow places.",
  },
  {
    id: "strap106",
    name: "SMISKI Lounging",
    series: "Strap Series 1",
    type: "keychain",
    isSecret: false,
    image: "/strap_series1/img_strap106.png",
    tags: ["lazy", "relaxed", "resting"],
    description:
      "A lazy Smiski that likes to lie down and lounge about. Does not like anything that involves moving or exercise.",
  },
  {
    id: "strap107",
    name: "Secret SMISKI",
    series: "Strap Series 1",
    type: "keychain",
    isSecret: false,
    image: "/strap_series1/img_strap107.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return strapSeries1Items.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(strapSeries1Items.map((item) => item.series))].sort();
}
