import { TAG_COLORS } from "./../../utils/constants";

export type TagType = {
  tagName: string;
  tagColor: TagColor;
};

export type TagColor = (typeof TAG_COLORS)[number];

export type TagProps = {
  color: TagColor;
  tagName: string;
  prefix?: string;
};
