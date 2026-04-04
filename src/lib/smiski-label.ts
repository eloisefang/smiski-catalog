import type { SmiskiItem } from "@/src/data/smiski";

export function formatSmiskiType(type: SmiskiItem["type"]): string {
  switch (type) {
    case "blind_box":
      return "Blind box";
    case "keychain":
      return "Keychain";
    case "hipper":
      return "Hipper";
    default:
      return type;
  }
}
