import type { SmiskiItem } from "./smiski";

export const strapSeries3Items: SmiskiItem[] = [
  {
    id: "strap301",
    name: "SMISKI Bridge",
    series: "Strap Series 3",
    type: "keychain",
    isSecret: false,
    image: "/strap_series3/img_strap301.png",
    tags: ["bridge", "flexible", "thoughtful"],
    description:
      "Always deep in thought. To think flexibly, one must act flexibly! ..which is the reason for this pose.",
  },
  {
    id: "strap302",
    name: "SMISKI Peeking",
    series: "Strap Series 3",
    type: "keychain",
    isSecret: false,
    image: "/strap_series3/img_strap302.png",
    tags: ["peeking", "careful", "observant"],
    description:
      "Finds comfort in high places and likes to look down at the scenery below. Is quite weary of things and when it notices something it makes sure to check it out first from a safe distance.",
  },
  {
    id: "strap303",
    name: "SMISKI Handstand",
    series: "Strap Series 3",
    type: "keychain",
    isSecret: false,
    image: "/strap_series3/img_strap303.png",
    tags: ["handstand", "playful", "copying"],
    description:
      "Always found doing a handstand against the wall. If you look closely, the peeking Smiski from Series 2 is actually always trying to copy this Smiski.",
  },
  {
    id: "strap304",
    name: "SMISKI Climbing",
    series: "Strap Series 3",
    type: "keychain",
    isSecret: false,
    image: "/strap_series3/img_strap304.png",
    tags: ["climbing", "adventurous", "curious"],
    description:
      "Curious of what is waiting at the top of the hanging string, this Smiski will climb up without hesitation. However it always has some trouble getting back down. Loves adventure.",
  },
  {
    id: "strap305",
    name: "SMISKI Little",
    series: "Strap Series 3",
    type: "keychain",
    isSecret: false,
    image: "/strap_series3/img_strap305.png",
    tags: ["little", "group", "cute"],
    description:
      "Little Smiski have made their appearance! For some reason these little ones like to line up against the wall in this pose.",
  },
  {
    id: "strap306",
    name: "SMISKI Hiding",
    series: "Strap Series 3",
    type: "keychain",
    isSecret: false,
    image: "/strap_series3/img_strap306.png",
    tags: ["hiding", "timid", "cozy"],
    description:
      "Likes to be in small, cosy places. Often found underneath towels and blankets, looking around its surroundings while hiding. Is a little timid in personality.",
  },

  {
    id: "strap307",
    name: "Secret SMISKI",
    series: "Strap Series 3",
    type: "keychain",
    isSecret: true,
    image: "/strap_series3/img_strap307.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return strapSeries3Items.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(strapSeries3Items.map((item) => item.series))].sort();
}
