import {
  GetEveryMessagesType,
  MessagePostPropsType,
} from "@/types/message/messageTypes";
import axiosInstance from "../axiosInstance";

// Get Every Messages
export const getEveryMessagesAPI = async ({
  keyword,
  sort,
}: GetEveryMessagesType) => {
  console.log(keyword, sort);
  const response = await axiosInstance.get(`/message`, {
    params: {
      keyword,
      sort,
    },
  });
  return response.data;
};

// Get Single Message
export const getMessageAPI = async (messageId: string) => {
  const response = await axiosInstance.get(`/message/${messageId}`);
  return response.data;
};

// Delete Single Message
export const deleteMessageAPI = async (messageId: string) => {
  const response = await axiosInstance.delete(`/message/${messageId}`);
  return response.data;
};

// Post Send Message
export const postSendMessageAPI = async (
  messagePostprops: MessagePostPropsType,
) => {
  const response = await axiosInstance.post(`message`, messagePostprops);
  return response.data;
};
