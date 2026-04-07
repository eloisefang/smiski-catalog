import type { SmiskiItem } from "./smiski";

export const bedItems: SmiskiItem[] = [
  {
    id: "bed01",
    name: "SMISKI Before Rest",
    series: "Bed Series",
    type: "blind_box",
    isSecret: false,
    image: "/bed_series/img_bed01.png",
    tags: ["sleep", "bedtime", "calm"],
    description:
      "SMISKI is getting ready for bed. He looks a little sleepy already.",
  },
  {
    id: "bed02",
    name: "SMISKI Sleepy",
    series: "Bed Series",
    type: "blind_box",
    isSecret: false,
    image: "/bed_series/img_bed02.png",
    tags: ["sleepy", "tired", "yawn"],
    description:
      "SMISKI is feeling very sleepy. He might fall asleep any second.",
  },
  {
    id: "bed03",
    name: "SMISKI Co-Sleeping",
    series: "Bed Series",
    type: "blind_box",
    isSecret: false,
    image: "/bed_series/img_bed03.png",
    tags: ["sleep", "cute", "companionship"],
    description:
      "SMISKI is sleeping with a little friend. They look very cozy together.",
  },
  {
    id: "bed04",
    name: "SMISKI Reading",
    series: "Bed Series",
    type: "blind_box",
    isSecret: false,
    image: "/bed_series/img_bed04.png",
    tags: ["reading", "night", "calm"],
    description:
      "SMISKI is reading before bed. He’s trying to finish just one more page.",
  },
  {
    id: "bed05",
    name: "SMISKI At Sleep",
    series: "Bed Series",
    type: "blind_box",
    isSecret: false,
    image: "/bed_series/img_bed05.png",
    tags: ["sleep", "rest", "peaceful"],
    description:
      "SMISKI is fast asleep. Nothing can wake him now.",
  },
  {
    id: "bed06",
    name: "SMISKI Fussing",
    series: "Bed Series",
    type: "blind_box",
    isSecret: false,
    image: "/bed_series/img_bed06.png",
    tags: ["restless", "sleep", "struggle"],
    description:
      "SMISKI can’t seem to get comfortable. He keeps tossing and turning.",
  },
  {
    id: "bed07",
    name: "SecretSMISKI",
    series: "Bed Series",
    type: "blind_box",
    isSecret: true,
    image: "/bed_series/img_bed07.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return bedItems.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(bedItems.map((item) => item.series))].sort();
}
