import type { SmiskiItem } from "./smiski";

export const yogaItems: SmiskiItem[] = [
  {
    id: "yoga01",
    name: "SMISKI Lotus Pose",
    series: "Yoga Series",
    type: "blind_box",
    isSecret: false,
    image: "/yoga_series/img_yoga01.png",
    tags: ["yoga", "calm", "meditation"],
    description:
      "SMISKI is sitting peacefully in lotus pose. He looks completely relaxed and at ease.",
  },
  {
    id: "yoga02",
    name: "SMISKI Twist Pose",
    series: "Yoga Series",
    type: "blind_box",
    isSecret: false,
    image: "/yoga_series/img_yoga02.png",
    tags: ["yoga", "stretch", "balance"],
    description:
      "SMISKI is stretching into a twist pose. He’s trying his best to stay balanced!",
  },
  {
    id: "yoga03",
    name: "SMISKI Shoulderstand Pose",
    series: "Yoga Series",
    type: "blind_box",
    isSecret: false,
    image: "/yoga_series/img_yoga03.png",
    tags: ["yoga", "balance", "core"],
    description:
      "SMISKI is attempting a shoulderstand. It’s harder than it looks!",
  },
  {
    id: "yoga04",
    name: "SMISKI Triangle Pose",
    series: "Yoga Series",
    type: "blind_box",
    isSecret: false,
    image: "/yoga_series/img_yoga04.png",
    tags: ["yoga", "stretch", "focus"],
    description:
      "SMISKI is reaching into triangle pose. He’s focusing very hard on his form.",
  },
  {
    id: "yoga05",
    name: "SMISKI Tree Pose",
    series: "Yoga Series",
    type: "blind_box",
    isSecret: false,
    image: "/yoga_series/img_yoga05.png",
    tags: ["yoga", "balance", "calm"],
    description:
      "SMISKI stands like a tree. He wobbles a little but tries to stay calm.",
  },
  {
    id: "yoga06",
    name: "SMISKI Ship Pose",
    series: "Yoga Series",
    type: "blind_box",
    isSecret: false,
    image: "/yoga_series/img_yoga06.png",
    tags: ["yoga", "core", "effort"],
    description:
      "SMISKI is holding a ship pose. His core is definitely feeling the burn!",
  },
  {
    id: "yoga07",
    name: "SecretSMISKI",
    series: "Yoga Series",
    type: "blind_box",
    isSecret: true,
    image: "/yoga_series/img_yoga07.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return yogaItems.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(yogaItems.map((item) => item.series))].sort();
}
