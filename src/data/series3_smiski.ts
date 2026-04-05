import type { SmiskiItem } from "./smiski";

export const series3Items: SmiskiItem[] = [
  {
    id: "series301",
    name: "SMISKI Bridge",
    series: "Series 3",
    type: "blind_box",
    isSecret: false,
    image: "/series_3/img_series301.png",
    tags: ["pose", "flexibility", "balance"],
    description:
      "Always deep in thought. To think flexibly, one must act flexibly! …which is the reason for this pose.",
  },
  {
    id: "series302",
    name: "SMISKI Peeking",
    series: "Series 3",
    type: "blind_box",
    isSecret: false,
    image: "/series_3/img_series302.png",
    tags: ["peeking", "curious", "shy"],
    description:
      "Finds comfort in high places and likes to look down at the scenery below.",
  },
  {
    id: "series303",
    name: "SMISKI Climbing",
    series: "Series 3",
    type: "blind_box",
    isSecret: false,
    image: "/series_3/img_series303.png",
    tags: ["climbing", "adventure", "curious"],
    description:
      "Curious about what is waiting at the top of the hanging string. Loves adventure.",
  },
  {
    id: "series304",
    name: "SMISKI Little",
    series: "Series 3",
    type: "blind_box",
    isSecret: false,
    image: "/series_3/img_series304.png",
    tags: ["little", "group", "cute"],
    description:
      "Little SMISKI have made their appearance! They like to line up against the wall.",
  },
  {
    id: "series305",
    name: "SMISKI Hiding",
    series: "Series 3",
    type: "blind_box",
    isSecret: false,
    image: "/series_3/img_series305.png",
    tags: ["hiding", "cozy", "shy"],
    description:
      "Likes to be in small, cozy places. Often found underneath towels and blankets.",
  },
  {
    id: "series306",
    name: "SMISKI Handstand",
    series: "Series 3",
    type: "blind_box",
    isSecret: false,
    image: "/series_3/img_series306.png",
    tags: ["handstand", "balance", "funny"],
    description:
      "Always found doing a handstand against the wall. A true balance master.",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return series3Items.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(series3Items.map((item) => item.series))].sort();
}
