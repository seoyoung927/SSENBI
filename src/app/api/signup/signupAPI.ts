import { SignupFormData } from "@/types/member/memberTypes";
import axiosInstance from "../axiosInstance";

// Post Signup API
export const postSignupAPI = async (formData: SignupFormData) => {
  const response = await axiosInstance.post("/member", formData);
  return response.data;
};
