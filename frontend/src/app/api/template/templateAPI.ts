import { PostDuplicateTemplateParamsType } from "@/types/template/templateTypes";
import axiosInstance from "../axiosInstance";

// Get Template API
export const getTemplateAPI = async () => {
  const response = await axiosInstance.get("/general/template");
  return response.data;
};

// Get Single Template API
export const getSingleTemplateAPI = async ({
  templateId,
}: {
  templateId: number;
}) => {
  const response = await axiosInstance.get(
    `/general/category/template/${templateId}`,
  );
  return response.data;
};

// Post Duplicate Template API
export const postDuplicateTemplateAPI = async ({
  token,
  templateId,
}: PostDuplicateTemplateParamsType) => {
  const response = await axiosInstance.post(
    "/general/template/duplicate",
    {
      templateId: templateId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
