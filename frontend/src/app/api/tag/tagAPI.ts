import { TagColorType, TagType } from "@/types/tag/tagTypes";
import axiosInstance from "../axiosInstance";

export const getTagsAPI = async (token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await axiosInstance.get("/tag", {
    headers,
  });

  return response.data;
};

export const postTagAPI = async ({
  tagName,
  tagColor,
}: Omit<TagType, "tagId">) => {
  const response = await axiosInstance.post("/tag", {
    name: tagName,
    color: tagColor,
  });
  return response.data;
};

export const putTagAPI = async ({
  tagId,
  tagName,
  tagColor,
}: {
  tagId: number;
  tagName: string;
  tagColor: TagColorType;
}) => {
  const response = await axiosInstance.put(`/tag/${tagId}`, {
    name: tagName,
    color: tagColor,
  });
  return response.data;
};

export const deleteTagAPI = async ({ tagId }: { tagId: number }) => {
  const response = await axiosInstance.delete(`/tag/${tagId}`);
  return response.data;
};
