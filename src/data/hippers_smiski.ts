import type { SmiskiItem } from "./smiski";

export const hippersItems: SmiskiItem[] = [
  {
    id: "hippers01",
    name: "SMISKI on His Smartphone",
    series: "Hippers Series",
    type: "hipper",
    isSecret: false,
    image: "/hippers_series/img_hippers01.png",
    tags: ["smartphone", "phone", "modern"],
    description:
      "SMISKI can’t let go of his phone at any time.",
  },
  {
    id: "hippers02",
    name: "SMISKI Trying to Climb",
    series: "Hippers Series",
    type: "hipper",
    isSecret: false,
    image: "/hippers_series/img_hippers02.png",
    tags: ["climbing", "struggling", "wall"],
    description:
      "SMISKI wants to climb the wall but can’t.",
  },
  {
    id: "hippers03",
    name: "SMISKI Looking Out",
    series: "Hippers Series",
    type: "hipper",
    isSecret: false,
    image: "/hippers_series/img_hippers03.png",
    tags: ["looking", "curious", "distance"],
    description:
      "SMISKI looks into the distance. What do you see...?",
  },
  {
    id: "hippers04",
    name: "SMISKI Sticking",
    series: "Hippers Series",
    type: "hipper",
    isSecret: false,
    image: "/hippers_series/img_hippers04.png",
    tags: ["stuck", "wall", "balance"],
    description:
      "SMISKI is stuck to the wall and trying hard not to slip down.",
  },
  {
    id: "hippers05",
    name: "SMISKI Dozing",
    series: "Hippers Series",
    type: "hipper",
    isSecret: false,
    image: "/hippers_series/img_hippers05.png",
    tags: ["sleepy", "dozing", "relaxed"],
    description:
      "SMISKI dozes off on anything.",
  },
  {
    id: "hippers06",
    name: "SMISKI Upside Down",
    series: "Hippers Series",
    type: "hipper",
    isSecret: false,
    image: "/hippers_series/img_hippers06.png",
    tags: ["upside-down", "playful", "thrill"],
    description:
      "SMISKI loves thrills. Be careful not to fall off.",
  },  
  {
    id: "hippers07",
    name: "SecretSMISKI",
    series: "Hippers Series",
    type: "hipper",
    isSecret: true,
    image: "/hippers_series/img_hippers07.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return hippersItems.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(hippersItems.map((item) => item.series))].sort();
}
