import type { SmiskiItem } from "./smiski";

export const series4Items: SmiskiItem[] = [
  {
    id: "series401",
    name: "SMISKI Sneaking",
    series: "Series 4",
    type: "blind_box",
    isSecret: false,
    image: "/series_4/img_series401.png",
    tags: ["sneaking", "quiet", "shy"],
    description:
      "Always sneaking and secretly moving. The destination is unknown. Doesn’t like to be found.",
  },
  {
    id: "series402",
    name: "SMISKI Scared",
    series: "Series 4",
    type: "blind_box",
    isSecret: false,
    image: "/series_4/img_series402.png",
    tags: ["scared", "timid", "curious"],
    description:
      "SMISKI that wants to go down but is scared. Always looking down to see what is there.",
  },
  {
    id: "series403",
    name: "SMISKI Relaxing",
    series: "Series 4",
    type: "blind_box",
    isSecret: false,
    image: "/series_4/img_series403.png",
    tags: ["relax", "lazy", "calm"],
    description:
      "A SMISKI that is full and cannot move. Loves to stretch legs while leaning against the wall.",
  },
  {
    id: "series404",
    name: "SMISKI Lazy",
    series: "Series 4",
    type: "blind_box",
    isSecret: false,
    image: "/series_4/img_series404.png",
    tags: ["lazy", "sleep", "stack"],
    description:
      "A SMISKI that is always lazy. Too lazy to even notice Little Lazy SMISKI on the top.",
  },
  {
    id: "series405",
    name: "SMISKI Stuck",
    series: "Series 4",
    type: "blind_box",
    isSecret: false,
    image: "/series_4/img_series405.png",
    tags: ["stuck", "awkward", "funny"],
    description:
      "A SMISKI who got stuck on the way somewhere. It seems that it cannot grasp its body size.",
  },
  {
    id: "series406",
    name: "SMISKI Defeated",
    series: "Series 4",
    type: "blind_box",
    isSecret: false,
    image: "/series_4/img_series406.png",
    tags: ["defeated", "tired", "sad"],
    description:
      "A SMISKI that is defeated because it cannot find any favorite corner.",
  },
  {
    id: "series407",
    name: "SecretSMISKI",
    series: "Series 4",
    type: "blind_box",
    isSecret: true,
    image: "/series_4/img_series407.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return series4Items.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(series4Items.map((item) => item.series))].sort();
}
