import type { SmiskiItem } from "./smiski";

export const toiletItems: SmiskiItem[] = [
  {
    id: "toilet01",
    name: "SMISKI Peek-A-Boo",
    series: "Toilet Series",
    type: "blind_box",
    isSecret: false,
    image: "/toilet_series/img_toilet01.png",
    tags: ["peek", "funny", "toilet"],
    description:
      "SMISKI peeks out from inside a toilet paper roll. Surprise!",
  },
  {
    id: "toilet02",
    name: "SMISKI Little (Smelly)",
    series: "Toilet Series",
    type: "blind_box",
    isSecret: false,
    image: "/toilet_series/img_toilet02.png",
    tags: ["funny", "smell", "group"],
    description:
      "These little SMISKIs are holding their breath. It smells terrible!",
  },
  {
    id: "toilet03",
    name: "SMISKI Squatting",
    series: "Toilet Series",
    type: "blind_box",
    isSecret: false,
    image: "/toilet_series/img_toilet03.png",
    tags: ["squat", "funny", "toilet"],
    description:
      "SMISKI is squatting awkwardly. He’s not sure what he’s doing.",
  },
  {
    id: "toilet04",
    name: "SMISKI Helping Out",
    series: "Toilet Series",
    type: "blind_box",
    isSecret: false,
    image: "/toilet_series/img_toilet04.png",
    tags: ["help", "toilet", "paper"],
    description:
      "SMISKI is helping by bringing toilet paper. What a good helper!",
  },
  {
    id: "toilet05",
    name: "SMISKI Resting",
    series: "Toilet Series",
    type: "blind_box",
    isSecret: false,
    image: "/toilet_series/img_toilet05.png",
    tags: ["rest", "funny", "toilet"],
    description:
      "SMISKI is resting on top of the toilet tank. Just chilling.",
  },
  {
    id: "toilet06",
    name: "SMISKI Holding In",
    series: "Toilet Series",
    type: "blind_box",
    isSecret: false,
    image: "/toilet_series/img_toilet06.png",
    tags: ["funny", "toilet", "urgent"],
    description:
      "SMISKI is trying very hard to hold it in… not much longer!",
  },
  {
    id: "toilet07",
    name: "Secret SMISKI",
    series: "Toilet Series",
    type: "blind_box",
    isSecret: true,
    image: "/toilet_series/img_toilet07.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return toiletItems.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(toiletItems.map((item) => item.series))].sort();
}
