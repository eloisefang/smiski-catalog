import type { SmiskiItem } from "./smiski";

export const series1Items: SmiskiItem[] = [
  {
    id: "series101",
    name: "SMISKI Hugging Knees",
    series: "Series 1",
    type: "blind_box",
    isSecret: false,
    image: "/series_1/img_series101.png",
    tags: ["knees", "quiet", "thoughtful"],
    description:
      "Always in the corner hugging onto the knees, staring out into the distance pensive in thought.",
  },
  {
    id: "series102",
    name: "SMISKI Sitting",
    series: "Series 1",
    type: "blind_box",
    isSecret: false,
    image: "/series_1/img_series102.png",
    tags: ["sitting", "calm", "alone"],
    description:
      "Often found sitting silently and gazing down at something. Has a wary personality and prefers being alone.",
  },
  {
    id: "series103",
    name: "SMISKI Looking Back",
    series: "Series 1",
    type: "blind_box",
    isSecret: false,
    image: "/series_1/img_series103.png",
    tags: ["shy", "surprise", "timid"],
    description:
      "A SMISKI that scares easily. When found, it will turn back and stare at you in surprise.",
  },
  {
    id: "series104",
    name: "SMISKI Lounging",
    series: "Series 1",
    type: "blind_box",
    isSecret: false,
    image: "/series_1/img_series104.png",
    tags: ["lounging", "lazy", "rest"],
    description:
      "A lazy SMISKI that likes to lie down and lounge about. Does not like anything that involves moving or exercise.",
  },
  {
    id: "series105",
    name: "SMISKI Hiding",
    series: "Series 1",
    type: "blind_box",
    isSecret: false,
    image: "/series_1/img_series105.png",
    tags: ["hiding", "small", "shy"],
    description:
      "Hiding is his specialty. Finds all sorts of spots to hide in. Feels most at home in small, narrow places.",
  },
  {
    id: "series106",
    name: "SMISKI Peeking",
    series: "Series 1",
    type: "blind_box",
    isSecret: false,
    image: "/series_1/img_series106.png",
    tags: ["peeking", "shy", "corner"],
    description:
      "Always hunched over and peeking in from the corner. Needs to gather up courage before approaching anything.",
  },
  {
    id: "series107",
    name: "SecretSMISKI",
    series: "Series 1",
    type: "blind_box",
    isSecret: true,
    image: "/series_1/img_series107.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return series1Items.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(series1Items.map((item) => item.series))].sort();
}
