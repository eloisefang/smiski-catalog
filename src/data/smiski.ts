import { birthdayItems } from "./birthday_smiski";
import { sundayItems } from "./sunday_smiski";
import { hippersItems } from "./hippers_smiski";
import { movingItems } from "./moving_smiski";
import { exercisingItems } from "./exercising_smiski";
import { dressingItems } from "./dressing_smiski";
import { workItems } from "./work_smiski";
import { museumItems } from "./museum_smiski";
import { cheerItems } from "./cheer_smiski";

export type SmiskiItem = {
  id: string;
  name: string;
  series: string;
  type: "blind_box" | "keychain" | "hipper";
  isSecret: boolean;
  image: string;
  tags: string[];
  description: string;
};

/** Single catalog list — order follows series modules above. */
export const SMISKI_ITEMS: SmiskiItem[] = [
  ...birthdayItems,
  ...sundayItems,
  ...hippersItems,
  ...movingItems,
  ...exercisingItems,
  ...dressingItems,
  ...workItems,
  ...museumItems,
  ...cheerItems,
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return SMISKI_ITEMS.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(SMISKI_ITEMS.map((item) => item.series))].sort();
}
