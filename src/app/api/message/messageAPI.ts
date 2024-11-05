import axiosInstance from "../axiosInstance";

// Get Single Message
export const getMessageAPI = async ({
  token,
  messageId,
}: {
  token: string;
  messageId: string;
}) => {
  const response = await axiosInstance.get(`/message/${messageId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete Single Message
export const deleteMessageAPI = async ({
  token,
  messageId,
}: {
  token: string;
  messageId: string;
}) => {
  const response = await axiosInstance.delete(`/message/${messageId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
