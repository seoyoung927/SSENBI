import { CustomerType } from "../customer/customerType";
import { TagType } from "../tag/tagTypes";

type MessageCustomer = {
  customerName: string;
  customerColor: string;
};

export type MessageType = {
  messageId: number;
  messageContent: string;
  messageSendAt: string;
  messageTags: TagType[];
  customerMemo: string;
  customerColor: MessageCustomer[];
};

export type GetEveryMessagesType = {
  token?: string;
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
  customTemplateId?: string;
};

export type MessageStatisticsType = {
  tagName: string;
  tagCount: number;
  tagColor: string;
};

export const SORTOPTIONS = {
  최신순: "createdAt,DESC",
  "오래된 순": "createdAt",
  내용순: "content",
};

export type SortOptionKeys = keyof typeof SORTOPTIONS;
export type SortOptionValues = (typeof SORTOPTIONS)[SortOptionKeys];
