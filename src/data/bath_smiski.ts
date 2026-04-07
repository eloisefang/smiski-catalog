import type { SmiskiItem } from "./smiski";

export const bathItems: SmiskiItem[] = [
  {
    id: "bath01",
    name: "SMISKI Shampooing",
    series: "Bath Series",
    type: "blind_box",
    isSecret: false,
    image: "/bath_series/img_bath01.png",
    tags: ["bath", "clean", "foam"],
    description:
      "SMISKI is trying to shampoo himself while sitting in the corner.",
  },
  {
    id: "bath02",
    name: "SMISKI Not Looking",
    series: "Bath Series",
    type: "blind_box",
    isSecret: false,
    image: "/bath_series/img_bath02.png",
    tags: ["shy", "bath", "peek"],
    description:
      "SMISKI is too shy to look, but secretly peeks through his hands.",
  },
  {
    id: "bath03",
    name: "SMISKI Scrubbing",
    series: "Bath Series",
    type: "blind_box",
    isSecret: false,
    image: "/bath_series/img_bath03.png",
    tags: ["bath", "clean", "cute"],
    description:
      "SMISKI loves scrubbing and won’t stop until everything is clean.",
  },
  {
    id: "bath04",
    name: "SMISKI With Duck",
    series: "Bath Series",
    type: "blind_box",
    isSecret: false,
    image: "/bath_series/img_bath04.png",
    tags: ["duck", "bath", "cute"],
    description:
      "SMISKI is holding a little duck. They seem like best friends.",
  },
  {
    id: "bath05",
    name: "SMISKI Dazed",
    series: "Bath Series",
    type: "blind_box",
    isSecret: false,
    image: "/bath_series/img_bath05.png",
    tags: ["dazed", "bath", "relax"],
    description:
      "SMISKI looks completely dazed after a long bath.",
  },
  {
    id: "bath06",
    name: "SMISKI Looking",
    series: "Bath Series",
    type: "blind_box",
    isSecret: false,
    image: "/bath_series/img_bath06.png",
    tags: ["peek", "bath", "corner"],
    description:
      "SMISKI peeks carefully from the corner of the bathroom.",
  },
  {
    id: "bath07",
    name: "Secret SMISKI",
    series: "Bath Series",
    type: "blind_box",
    isSecret: true,
    image: "/bath_series/img_bath07.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return bathItems.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(bathItems.map((item) => item.series))].sort();
}
