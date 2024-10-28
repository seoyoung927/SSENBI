import { LoginFormData } from "@/types/member/memberTypes";
import axiosInstance from "../axiosInstance";
import Cookies from "js-cookie";

// Post Login API
export const postLoginAPI = async (formData: LoginFormData) => {
  const response = await axiosInstance.post("/auth/login", formData);

  // 응답 코드가 SUCCESS인 경우
  if (response.data.code === "S10000") {
    //쿠키 생성 시점으로부터 1일 후에 만료
    Cookies.set("accessToken", response.data.accessToken, { expires: 1 });
    return true;
  }

  throw new Error(response.data.message);
};

// 토큰 재발급 API
export const postRefreshTokenAPI = async () => {
  const response = await axiosInstance.post(
    "/auth/refresh",
    {},
    {
      withCredentials: true,
    },
  );

  if (response.data.code === "S10000") {
    Cookies.set("accessToken", response.data.accessToken, { expires: 1 });
    return true;
  }

  throw new Error(response.data.message);
};
