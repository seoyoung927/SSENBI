import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_END_POINT;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export default axiosInstance;
