export type TagColorTypes =
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
  color: TagColorTypes;
  tagName: string;
};
