import { birthdayItems } from "./birthday_smiski";
import { sundayItems } from "./sunday_smiski";
import { hippersItems } from "./hippers_smiski";
import { movingItems } from "./moving_smiski";
import { exercisingItems } from "./exercising_smiski";
import { dressingItems } from "./dressing_smiski";
import { workItems } from "./work_smiski";
import { museumItems } from "./museum_smiski";
import { cheerItems } from "./cheer_smiski";
import { bathItems } from "./bath_smiski";
import { livingItems } from "./living_smiski";
import { yogaItems } from "./yoga_smiski";
import { bedItems } from "./bed_smiski";
import { toiletItems } from "./toilet_smiski";
import { series1Items } from "./series1_smiski";
import { series2Items } from "./series2_smiski";
import { series3Items } from "./series3_smiski";
import { series4Items } from "./series4_smiski";
import { strapSeries1Items } from "./series1_strap";
import { strapSeries2Items } from "./series2_strap";
import { strapSeries3Items } from "./series3_strap";

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
  ...bathItems,
  ...livingItems,
  ...yogaItems,
  ...bedItems,
  ...toiletItems,
  ...series1Items,
  ...series2Items,
  ...series3Items,
  ...series4Items,
  ...strapSeries1Items,
  ...strapSeries2Items,
  ...strapSeries3Items,
];

export function getSmiskiById(id: string): SmiskiItem | undefined {
  return SMISKI_ITEMS.find((item) => item.id === id);
}

export function getSmiskiSeries(): string[] {
  return [...new Set(SMISKI_ITEMS.map((item) => item.series))].sort();
}
