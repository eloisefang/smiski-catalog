import type { SmiskiItem } from "./smiski";

export const exercisingItems: SmiskiItem[] = [
  {
    id: "exercising01",
    name: "SMISKI Doing Crunches",
    series: "Exercising Series",
    type: "blind_box",
    isSecret: false,
    image: "/exercising_series/img_exercising01.png",
    tags: ["crunches", "abs", "fitness"],
    description:
      "SMISKI is working his abs. Do you think his muffin top is cute?",
  },
  {
    id: "exercising02",
    name: "SMISKI Aerobics",
    series: "Exercising Series",
    type: "blind_box",
    isSecret: false,
    image: "/exercising_series/img_exercising02.png",
    tags: ["aerobics", "workout", "cardio"],
    description:
      "SMISKI is doing aerobics. Let’s work out! One two, One two...",
  },
  {
    id: "exercising03",
    name: "Little SMISKI Balance",
    series: "Exercising Series",
    type: "blind_box",
    isSecret: false,
    image: "/exercising_series/img_exercising03.png",
    tags: ["balance", "core", "ball"],
    description:
      "Little SMISKI is on a balance ball. Do you want to train your core?",
  },
  {
    id: "exercising04",
    name: "SMISKI Dumbbell",
    series: "Exercising Series",
    type: "blind_box",
    isSecret: false,
    image: "/exercising_series/img_exercising04.png",
    tags: ["dumbbell", "weights", "strength"],
    description:
      "SMISKI is doing weight training. It is too heavy to lift!",
  },
  {
    id: "exercising05",
    name: "SMISKI Hoop",
    series: "Exercising Series",
    type: "blind_box",
    isSecret: false,
    image: "/exercising_series/img_exercising05.png",
    tags: ["hoop", "fun", "exercise"],
    description:
      "SMISKI hooping. SMISKI is having fun and breaking a sweat.",
  },
  {
    id: "exercising06",
    name: "SMISKI Stretch",
    series: "Exercising Series",
    type: "blind_box",
    isSecret: false,
    image: "/exercising_series/img_exercising06.png",
    tags: ["stretch", "warmup", "flexibility"],
    description:
      "SMISKI is doing stretches. Stretching is very important before exercise!",
  },  
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return exercisingItems.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(exercisingItems.map((item) => item.series))].sort();
}
