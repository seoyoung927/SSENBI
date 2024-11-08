import axiosInstance from "../axiosInstance";

// Get Every Messages
export const getEveryMessagesAPI = async (keyword?: string) => {
  const response = await axiosInstance.get(`/message`, {
    headers: {
      keyword: keyword || "",
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

// todo : fix it
// Post Send Message
export const postSendMessageAPI = async ({
  messageId,
}: {
  messageId: string;
}) => {
  const response = await axiosInstance.delete(`/message/${messageId}`);
  return response.data;
};
