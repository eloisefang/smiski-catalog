import type { SmiskiItem } from "./smiski";

export const sundayItems: SmiskiItem[] = [
  {
    id: "sunday01",
    name: "SMISKI Blowing Bubbles",
    series: "Sunday Series",
    type: "blind_box",
    isSecret: false,
    image: "/sunday_series/img_sunday01.png",
    tags: ["bubbles", "soap", "playful"],
    description:
      "SMISKI is playing with soap and wants to fill the corner with bubbles!",
  },
  {
    id: "sunday02",
    name: "SMISKI Paper Airplane",
    series: "Sunday Series",
    type: "blind_box",
    isSecret: false,
    image: "/sunday_series/img_sunday02.png",
    tags: ["paper airplane", "dreamy", "travel"],
    description:
      "SMISKI flies paper airplanes and dreams of travelling far away someday.",
  },
  {
    id: "sunday03",
    name: "SMISKI Sunbathing",
    series: "Sunday Series",
    type: "blind_box",
    isSecret: false,
    image: "/sunday_series/img_sunday03.png",
    tags: ["sunbathing", "nap", "cat"],
    description:
      "SMISKI is taking a warm nap in the sun with Cat SMISKI sleeping on their tummy.",
  },
  {
    id: "sunday04",
    name: "SMISKI Sing-Along",
    series: "Sunday Series",
    type: "blind_box",
    isSecret: false,
    image: "/sunday_series/img_sunday04.png",
    tags: ["guitar", "music", "singing"],
    description:
      "SMISKI sings while playing the guitar! SMISKI is spellbound by SMISKI’s own song in the corner.",
  },
  {
    id: "sunday05",
    name: "SMISKI Skateboarding",
    series: "Sunday Series",
    type: "blind_box",
    isSecret: false,
    image: "/sunday_series/img_sunday05.png",
    tags: ["skateboard", "cool", "active"],
    description:
      "SMISKI is so cool riding a skateboard! Where should SMISKI go play today?",
  },
  {
    id: "sunday06",
    name: "SMISKI Gardening",
    series: "Sunday Series",
    type: "blind_box",
    isSecret: false,
    image: "/sunday_series/img_sunday06.png",
    tags: ["gardening", "flowers", "sprout"],
    description:
      "SMISKI loves flowers!! Did a sprout grow from SMISKI’s head because they watered the plants too much?",
  },  
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return sundayItems.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(sundayItems.map((item) => item.series))].sort();
}
