import type { SmiskiItem } from "./smiski";

export const Items: SmiskiItem[] = [
  
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return Items.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(Items.map((item) => item.series))].sort();
}
