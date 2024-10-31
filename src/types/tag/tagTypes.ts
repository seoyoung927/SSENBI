import { TAG_COLORS } from "./../../utils/constants";

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
};

export type TagColorType = (typeof TAG_COLORS)[number];

export type TagProps = {
  color: TagColorType;
  tagName: string;
  prefix?: string;
};
