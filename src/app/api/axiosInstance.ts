import axios from "axios";
import Cookies from "js-cookie";
import { postRefreshTokenAPI } from "./login/loginAPI";

const BASE_URL = process.env.NEXT_PUBLIC_API_END_POINT;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답일 경우 그대로 반환
  async (error) => {
    const originalRequest = error.config;
    const errorCode = error.response?.data?.code;

    // 401 에러 (A40101: 토큰 만료)
    if (errorCode === "A40101" && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const isSuccess = await postRefreshTokenAPI();
        if (isSuccess) {
          const newToken = Cookies.get("accessToken");
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest); // 실패했던 요청 재시도
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // 다른 에러는 그대로 반환
    return Promise.reject(error);
  },
);

export default axiosInstance;
