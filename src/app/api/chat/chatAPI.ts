import axiosInstance from "../axiosInstance";

export const postAIChatAPI = async ({
  token,
  content,
  requirements,
}: {
  token: string;
  content?: string;
  requirements?: string;
}) => {
  const response = await axiosInstance.post(
    `/ai/ask`,
    {
      content,
      requirements,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
