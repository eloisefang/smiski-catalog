import type { SmiskiItem } from "./smiski";

export const livingItems: SmiskiItem[] = [
  {
    id: "living01",
    name: "SMISKI Daydreaming",
    series: "Living Series",
    type: "blind_box",
    isSecret: false,
    image: "/living_series/img_living01.png",
    tags: ["dreaming", "cat", "calm"],
    description:
      "SMISKI is lost in thought while a little cat rests on his head.",
  },
  {
    id: "living02",
    name: "SMISKI Playing",
    series: "Living Series",
    type: "blind_box",
    isSecret: false,
    image: "/living_series/img_living02.png",
    tags: ["play", "music", "fun"],
    description:
      "SMISKI is playing a flute. He seems very focused on his tune.",
  },
  {
    id: "living03",
    name: "SMISKI Hiding",
    series: "Living Series",
    type: "blind_box",
    isSecret: false,
    image: "/living_series/img_living03.png",
    tags: ["hiding", "shy", "peek"],
    description:
      "SMISKI is hiding behind a wall. He’s not ready to be seen yet.",
  },
  {
    id: "living04",
    name: "SMISKI Nap Time",
    series: "Living Series",
    type: "blind_box",
    isSecret: false,
    image: "/living_series/img_living04.png",
    tags: ["nap", "sleep", "relax"],
    description:
      "SMISKI is taking a quick nap. Just a little rest… hopefully.",
  },
  {
    id: "living05",
    name: "SMISKI Thinking",
    series: "Living Series",
    type: "blind_box",
    isSecret: false,
    image: "/living_series/img_living05.png",
    tags: ["thinking", "quiet", "focus"],
    description:
      "SMISKI is deep in thought. What could he be thinking about?",
  },
  {
    id: "living06",
    name: "SMISKI Lifting",
    series: "Living Series",
    type: "blind_box",
    isSecret: false,
    image: "/living_series/img_living06.png",
    tags: ["lifting", "effort", "work"],
    description:
      "SMISKI is lifting something heavy. He’s trying his best!",
  },
  {
    id: "living07",
    name: "Secret SMISKI",
    series: "Living Series",
    type: "blind_box",
    isSecret: true,
    image: "/living_series/img_living07.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return livingItems.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(livingItems.map((item) => item.series))].sort();
}
