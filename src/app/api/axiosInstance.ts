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
  (response) => response,
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    const errorCode = error.response?.data?.code;
    const statusCode = error.response?.status || error.request?.status;
    console.log(error.response);
    // 401 에러 (A40101: 토큰 만료)
    if (errorCode === "A40101" && !originalRequest._retry) {
      originalRequest._retry = true; // 첫 재시도만 허용

      try {
        const isSuccess = await postRefreshTokenAPI();
        if (isSuccess) {
          const newToken = Cookies.get("accessToken");
          if (newToken) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return axiosInstance(originalRequest); // 실패했던 요청 재시도
          }
        }
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // 무한 루프 방지를 위해 반환
  },
);

export default axiosInstance;
