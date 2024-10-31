import { TagColor } from "@/types/tag/tagTypes";
import { TAG_COLORS } from "./constants";

export default function getRandomTagColor(): TagColor {
  return TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)] as TagColor;
}
