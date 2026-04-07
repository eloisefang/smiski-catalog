import type { SmiskiItem } from "./smiski";

export const birthdayItems: SmiskiItem[] = [
  {
    id: "birthday01",
    name: "SMISKI Giving a Bouquet",
    series: "Birthday Series",
    type: "blind_box",
    isSecret: false,
    image:
      "/birthday_series/img_birthday01.png",
    tags: ["birthday", "flower", "romantic"],
    description:
      "SMISKI is giving a flower bouquet. They are a bit of a cheesy romantic.",
  },
  {
    id: "birthday02",
    name: "SMISKI Wrapped Up",
    series: "Birthday Series",
    type: "blind_box",
    isSecret: false,
    image:
      "/birthday_series/img_birthday02.png",
    tags: ["birthday", "gift", "romantic"],
    description:
      "SMISKI pretends to be a present. Does anyone want a gift?",
  },
  {
    id: "birthday03",
    name: "SMISKI Popping Confetti",
    series: "Birthday Series",
    type: "blind_box",
    isSecret: false,
    image:
      "/birthday_series/img_birthday03.png",
    tags: ["birthday", "party", "suprise"],
    description:
      "SMISKI is popping a confetti cannon. SMISKI is playful and loves to party.",
  },
  {
    id: "birthday04",
    name: "SMISKI Birthday Message",
    series: "Birthday Series",
    type: "blind_box",
    isSecret: false,
    image:
      "/birthday_series/img_birthday04.png",
    tags: ["birthday", "confession", "heart"],
    description:
      "SMISKI carries a birthday message conversation heart. They are shy and need a little help communicating!",
  },
  {
    id: "birthday05",
    name: "Little SMISKI Decorating",
    series: "Birthday Series",
    type: "blind_box",
    isSecret: false,
    image:
      "/birthday_series/img_birthday05.png",
    tags: ["birthday", "party", "suprise"],
    description:
      "Little SMISKI work together to decorate a birthday party. Where should they hang the banner?",
  },
  {
    id: "birthday06",
    name: "SMISKI Tasting",
    series: "Birthday Series",
    type: "blind_box",
    isSecret: false,
    image:
      "/birthday_series/img_birthday06.png",
    tags: ["birthday", "cake", "eat"],
    description:
      "SMISKI is tasting a birthday cake. Oh no … they are getting full and can’t eat any more.",
  },
  {
    id: "birthday07",
    name: "Secret SMISKI",
    series: "Birthday Series",
    type: "blind_box",
    isSecret: true,
    image: "/birthday_series/img_birthday07.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return birthdayItems.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(birthdayItems.map((item) => item.series))].sort();
}
