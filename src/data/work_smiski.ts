import type { SmiskiItem } from "./smiski";

export const workItems: SmiskiItem[] = [
  {
    id: "work01",
    name: "SMISKI Approving",
    series: "Work Series",
    type: "blind_box",
    isSecret: false,
    image: "/work_series/img_work01.png",
    tags: ["approval", "boss", "positive"],
    description:
      "SMISKI praises your work from the corner. He is good at complimenting everything.",
  },
  {
    id: "work02",
    name: "SMISKI Researching",
    series: "Work Series",
    type: "blind_box",
    isSecret: false,
    image: "/work_series/img_work02.png",
    tags: ["computer", "research", "typing"],
    description:
      "SMISKI is searching for something on his computer. He has trouble hitting the keys.",
  },
  {
    id: "work03",
    name: "SMISKI Presenting",
    series: "Work Series",
    type: "blind_box",
    isSecret: false,
    image: "/work_series/img_work03.png",
    tags: ["presentation", "nervous", "office"],
    description:
      "SMISKI is presenting. He likes to explain to the group but he's always nervous.",
  },
  {
    id: "work04",
    name: "SMISKI Good Idea",
    series: "Work Series",
    type: "blind_box",
    isSecret: false,
    image: "/work_series/img_work04.png",
    tags: ["idea", "lightbulb", "creative"],
    description:
      "SMISKI is inspired. The light bulb means he has a good idea.",
  },
  {
    id: "work05",
    name: "SMISKI On the Road",
    series: "Work Series",
    type: "blind_box",
    isSecret: false,
    image: "/work_series/img_work05.png",
    tags: ["late", "work", "rush"],
    description:
      "SMISKI hurries to work. He pretends to be an executive although he is often late.",
  },
  {
    id: "work06",
    name: "Little SMISKI Group Think",
    series: "Work Series",
    type: "blind_box",
    isSecret: false,
    image: "/work_series/img_work06.png",
    tags: ["teamwork", "meeting", "discussion"],
    description:
      "SMISKI are deliberating in the meeting. They think that three heads are better than one!",
  },  
  {
    id: "work07",
    name: "SecretSMISKI",
    series: "Work Series",
    type: "blind_box",
    isSecret: true,
    image: "/work_series/img_work07.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return workItems.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(workItems.map((item) => item.series))].sort();
}
