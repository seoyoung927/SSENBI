import { TagType, CustomerType } from "../tag/tagTypes";

export type MessageCardPropsType = {
  messageId: number;
  messageContent: string;
  messageCustomers: CustomerType[];
  messageSendAt: string;
  messageTags: TagType[];
};
