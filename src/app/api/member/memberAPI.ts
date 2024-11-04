import { SignupFormData, PutMemberFormData } from "@/types/member/memberTypes";
import axiosInstance from "../axiosInstance";

// Get Member API
export const getMemberAPI = async ({ token }: { token: string }) => {
  const response = await axiosInstance.get("/member", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Post Signup API
export const postSignupAPI = async (formData: SignupFormData) => {
  const response = await axiosInstance.post("/member", formData);
  return response.data;
};

// Put Member API
export const putMemberAPI = async ({
  token,
  formData,
}: {
  token: string;
  formData: PutMemberFormData;
}) => {
  const response = await axiosInstance.put("/member", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
