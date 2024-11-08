import { TagType } from "../tag/tagTypes";
import { CustomerType } from "../customer/customerType";

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
