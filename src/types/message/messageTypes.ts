import { TagType } from "../tag/tagTypes";
import { CustomerType } from "../customer/customerType";

export type GetEveryMessagesType = {
  keyword?: string;
  sort?: SortOptionValues;
};

export type MessageCardPropsType = {
  messageId: number;
  messageContent: string;
  messageCustomers: CustomerType[];
  messageSendAt: string;
  messageTags: TagType[];
};

export type MessagePostPropsType = {
  messageCustomerIds?: number[];
  messageTagIds?: number[];
  messageContent: string;
};

export const SORTOPTIONS = {
  최신순: "createdAt",
  오래된순: "createdAt,DESC",
  내용순: "content",
};

export type SortOptionKeys = keyof typeof SORTOPTIONS;
export type SortOptionValues = (typeof SORTOPTIONS)[SortOptionKeys];
