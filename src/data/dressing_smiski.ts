import type { SmiskiItem } from "./smiski";

export const dressingItems: SmiskiItem[] = [
  {
    id: "dressing01",
    name: "SMISKI Underpants",
    series: "Dressing Series",
    type: "blind_box",
    isSecret: false,
    image: "/dressing_series/img_dressing01.png",
    tags: ["underwear", "embarrassed", "shy"],
    description:
      "SMISKI is putting on underpants. He is embarrassed, so he is sneaking around so he can’t be seen.",
  },
  {
    id: "dressing02",
    name: "SMISKI Struggling",
    series: "Dressing Series",
    type: "blind_box",
    isSecret: false,
    image: "/dressing_series/img_dressing02.png",
    tags: ["sweater", "stuck", "struggle"],
    description:
      "A sad SMISKI is trying on a sweater but can’t get his head through.",
  },
  {
    id: "dressing03",
    name: "SMISKI Loose Pants",
    series: "Dressing Series",
    type: "blind_box",
    isSecret: false,
    image: "/dressing_series/img_dressing03.png",
    tags: ["pants", "loose", "confused"],
    description:
      "SMISKI is at a loss because his pants are too big.",
  },
  {
    id: "dressing04",
    name: "SMISKI Putting On Socks",
    series: "Dressing Series",
    type: "blind_box",
    isSecret: false,
    image: "/dressing_series/img_dressing04.png",
    tags: ["socks", "balance", "wobble"],
    description:
      "SMISKI is putting on socks. He can’t wear them well because he is wobbling standing on one leg.",
  },
  {
    id: "dressing05",
    name: "SMISKI Sweater",
    series: "Dressing Series",
    type: "blind_box",
    isSecret: false,
    image: "/dressing_series/img_dressing05.png",
    tags: ["sweater", "cozy", "trying"],
    description:
      "SMISKI is trying on a sweater. Will it fit?",
  },
  {
    id: "dressing06",
    name: "SMISKI Tight Pants",
    series: "Dressing Series",
    type: "blind_box",
    isSecret: false,
    image: "/dressing_series/img_dressing06.png",
    tags: ["tight", "pants", "struggle"],
    description:
      "SMISKI is trying on tight pants. He’s desperately trying to get them on!",
  },  
  {
    id: "dressing07",
    name: "Secret SMISKI",
    series: "Dressing Series",
    type: "blind_box",
    isSecret: true,
    image: "/dressing_series/img_dressing07.png",
    tags: ["???"],
    description:
      "",
  },
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return dressingItems.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(dressingItems.map((item) => item.series))].sort();
}
