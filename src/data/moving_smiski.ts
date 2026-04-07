import type { SmiskiItem } from "./smiski";

export const movingItems: SmiskiItem[] = [
  {
    id: "moving01",
    name: "SMISKI Carrying Ladder",
    series: "Moving Series",
    type: "blind_box",
    isSecret: false,
    image: "/moving_series/img_moving01.png",
    tags: ["ladder", "work", "carrying"],
    description:
      "SMISKI is carrying a ladder. It’s time to get to work.",
  },
  {
    id: "moving02",
    name: "SMISKI Balancing Boxes",
    series: "Moving Series",
    type: "blind_box",
    isSecret: false,
    image: "/moving_series/img_moving02.png",
    tags: ["boxes", "balancing", "moving"],
    description:
      "SMISKI is carefully balancing packages. It is difficult to see what’s in front of him.",
  },
  {
    id: "moving03",
    name: "SMISKI Decorating",
    series: "Moving Series",
    type: "blind_box",
    isSecret: false,
    image: "/moving_series/img_moving03.png",
    tags: ["lamp", "decorating", "home"],
    description:
      "SMISKI is holding his favorite lamp. How will he decorate his room?",
  },
  {
    id: "moving04",
    name: "Little SMISKI Teamwork",
    series: "Moving Series",
    type: "blind_box",
    isSecret: false,
    image: "/moving_series/img_moving04.png",
    tags: ["teamwork", "box", "lifting"],
    description:
      "Little SMISKI need to move a large box. Can they work together to get the job done?",
  },
  {
    id: "moving05",
    name: "Green Thumb SMISKI",
    series: "Moving Series",
    type: "blind_box",
    isSecret: false,
    image: "/moving_series/img_moving05.png",
    tags: ["plant", "cactus", "green"],
    description:
      "SMISKI is carrying a cactus. This plant will add life to his new corner!",
  },
  {
    id: "moving06",
    name: "SMISKI Falling Down",
    series: "Moving Series",
    type: "blind_box",
    isSecret: false,
    image: "/moving_series/img_moving06.png",
    tags: ["falling", "trip", "accident"],
    description:
      "SMISKI trips and falls with his package. Is the package damaged?",
  },
  {
    id: "moving07",
    name: "SecretSMISKI",
    series: "Moving Series",
    type: "blind_box",
    isSecret: true,
    image: "/moving_series/img_moving07.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return movingItems.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(movingItems.map((item) => item.series))].sort();
}
