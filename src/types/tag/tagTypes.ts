export type TagType = {
  tagId: number;
  tagName: string;
  tagColor: TagColorType;
};

export type CustomerType = {
  customerId: number;
  customerName: string;
  customerPhoneNumber?: string;
  customerColor: TagColorType;
  customerTags: TagType[];
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
