import { TagColorType } from "@/types/tag/tagTypes";
import { TAG_COLORS } from "./constants";

export default function getRandomTagColor(): TagColorType {
  return TAG_COLORS[
    Math.floor(Math.random() * TAG_COLORS.length)
  ] as TagColorType;
}
