import axiosInstance from "../axiosInstance";

// Get Template API
export const getTemplateAPI = async () => {
  const response = await axiosInstance.get("/general/template");
  return response.data;
};
