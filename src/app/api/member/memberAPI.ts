import { SignupFormData, PutMemberFormData } from "@/types/member/memberTypes";
import axiosInstance from "../axiosInstance";

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
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
