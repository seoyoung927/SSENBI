import { TagColorType, TagType } from "../tag/tagTypes";

export type GenderType = "MALE" | "FEMALE";

export type CustomerType = {
  customerId: number;
  customerAge: number;
  customerName: string;
  customerGender: GenderType;
  customerPhoneNumber: string;
  customerTags: TagType[];
  customerMemo: string;
  customerColor: TagColorType;
};

export type CustomerStatisticsType = {
  tagName: string;
  tagCount: number;
  tagColor: string;
};

export type CustomerCreationType = Omit<
  CustomerType,
  "customerId" | "customerTags"
> & {
  customerTags: number[];
};
