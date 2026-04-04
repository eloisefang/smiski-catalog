import type { SmiskiItem } from "./smiski";

export const cheerItems: SmiskiItem[] = [
  {
    id: "cheer01",
    name: "Smiski Marching",
    series: "Cheer Series",
    type: "blind_box",
    isSecret: false,
    image: "/cheer_series/img_cheer01.png",
    tags: ["marching", "music", "parade"],
    description:
      "SMISKI marches proudly, leading the tiny parade.",
  },
  {
    id: "cheer02",
    name: "Smiski on Drums",
    series: "Cheer Series",
    type: "blind_box",
    isSecret: false,
    image: "/cheer_series/img_cheer02.png",
    tags: ["drums", "music", "rhythm"],
    description:
      "SMISKI beats the drum with perfect rhythm… or at least tries to!",
  },
  {
    id: "cheer03",
    name: "Smiski on Your Side",
    series: "Cheer Series",
    type: "blind_box",
    isSecret: false,
    image: "/cheer_series/img_cheer03.png",
    tags: ["support", "cheer", "team"],
    description:
      "SMISKI is always cheering you on from your side!",
  },
  {
    id: "cheer04",
    name: "Smiski Dancing",
    series: "Cheer Series",
    type: "blind_box",
    isSecret: false,
    image: "/cheer_series/img_cheer04.png",
    tags: ["dance", "energy", "fun"],
    description:
      "SMISKI dances with full energy, bringing the vibes up!",
  },
  {
    id: "cheer05",
    name: "Little Smiski Cheerleading",
    series: "Cheer Series",
    type: "blind_box",
    isSecret: false,
    image: "/cheer_series/img_cheer05.png",
    tags: ["cheerleading", "team", "support"],
    description:
      "Little SMISKI cheer together to boost everyone's spirit!",
  },
  {
    id: "cheer06",
    name: "Smiski Cheering",
    series: "Cheer Series",
    type: "blind_box",
    isSecret: false,
    image: "/cheer_series/img_cheer06.png",
    tags: ["megaphone", "cheer", "loud"],
    description:
      "SMISKI cheers loudly through a megaphone—GO GO GO!",
  },  
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return cheerItems.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(cheerItems.map((item) => item.series))].sort();
}
