import { TAG_COLORS } from "./../../utils/constants";

export type TagType = {
  tagId: number;
  tagName: string;
  tagColor: TagColor;
};

export type CustomerType = {
  customerId: number;
  customerName: string;
  customerPhoneNumber?: string;
  customerColor: TagColor;
};

export type TagColor = (typeof TAG_COLORS)[number];

export type TagProps = {
  color: TagColor;
  tagName: string;
  prefix?: string;
};
