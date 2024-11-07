export type TagType = {
  tagId: number;
  tagName: string;
  tagColor: TagColorType;
};

export type TagColorType =
  | "RED"
  | "PINK"
  | "SALMON"
  | "ORANGE"
  | "YELLOW"
  | "GREEN"
  | "LIME"
  | "SKYBLUE"
  | "BLUE"
  | "PURPLE"
  | "BEIGE"
  | "GRAY";

export type TagProps = {
  color: TagColorType;
  tagName: string;
  prefix?: string;
};
