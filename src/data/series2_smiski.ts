import type { SmiskiItem } from "./smiski";

export const series2Items: SmiskiItem[] = [
  {
    id: "series201",
    name: "SMISKI Kneeling",
    series: "Series 2",
    type: "blind_box",
    isSecret: false,
    image: "/series_2/img_series201.png",
    tags: ["kneeling", "quiet", "polite"],
    description:
      "Often sits with knees folded. Has a kind heart but is a little awkward showing it in front of other people.",
  },
  {
    id: "series202",
    name: "SMISKI Climbing",
    series: "Series 2",
    type: "blind_box",
    isSecret: false,
    image: "/series_2/img_series202.png",
    tags: ["climbing", "slow", "effort"],
    description:
      "This SMISKI’s action is too slow. Often spotted trying to climb over things but never quite making it.",
  },
  {
    id: "series203",
    name: "SMISKI Daydreaming",
    series: "Series 2",
    type: "blind_box",
    isSecret: false,
    image: "/series_2/img_series203.png",
    tags: ["dreaming", "calm", "lost"],
    description:
      "Likes to daydream all day long. Most of the time, this SMISKI is lost in its own world.",
  },
  {
    id: "series204",
    name: "SMISKI Pushing",
    series: "Series 2",
    type: "blind_box",
    isSecret: false,
    image: "/series_2/img_series204.png",
    tags: ["pushing", "effort", "funny"],
    description:
      "Always pushing things together to create the perfect hiding spot.",
  },
  {
    id: "series205",
    name: "SMISKI Peeking",
    series: "Series 2",
    type: "blind_box",
    isSecret: false,
    image: "/series_2/img_series205.png",
    tags: ["peeking", "playful", "curious"],
    description:
      "A playful SMISKI who likes to look out at the world from an upside-down point of view.",
  },
  {
    id: "series206",
    name: "SMISKI Listening",
    series: "Series 2",
    type: "blind_box",
    isSecret: false,
    image: "/series_2/img_series206.png",
    tags: ["listening", "curious", "quiet"],
    description:
      "Curious about the sounds coming in from next door, this SMISKI is always listening in.",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return series2Items.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(series2Items.map((item) => item.series))].sort();
}
