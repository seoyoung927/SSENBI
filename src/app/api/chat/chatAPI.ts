import axiosInstance from "../axiosInstance";

export const postAIChatAPI = async ({
  token,
  comments,
  requirements,
}: {
  token: string;
  comments?: string;
  requirements?: string;
}) => {
  const response = await axiosInstance.post(
    `/ai/ask`,
    {
      comments,
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
