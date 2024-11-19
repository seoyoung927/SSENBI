import axios from "axios";
import Cookies from "js-cookie";
import { postRefreshTokenAPI } from "./login/loginAPI";
import useAuthStore from "@/stores/authStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_END_POINT;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.headers.Authorization) return config;

  const token = Cookies.get("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터에서 401 오류 시 refresh 요청을 한 번만 시도
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { setLogout } = useAuthStore.getState();

    if (
      error.response !== undefined &&
      error.response?.data?.code === "A40101"
    ) {
      setLogout();
      return;
    }

    if (error.response !== undefined && error.response?.status !== 401) {
      throw error;
    }

    if (!originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const isRefresh = await postRefreshTokenAPI();

        if (isRefresh) {
          const token = Cookies.get("accessToken");
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }

        setLogout();
      } catch (error) {
        setLogout();
        return error;
      }
    }

    return error;
  },
);

export default axiosInstance;
