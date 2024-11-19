import axiosInstance from "../axiosInstance";

export const postAIChatAPI = async ({
  token,
  content,
  requirements,
  tagIds,
  customerIds,
}: {
  token: string;
  content?: string;
  requirements?: string;
  tagIds?: number[];
  customerIds?: number[];
}) => {
  const response = await axiosInstance.post(
    `/ai/ask`,
    {
      content,
      requirements,
      ...(tagIds ? { tagIds } : {}),
      ...(customerIds ? { customerIds } : {}),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
