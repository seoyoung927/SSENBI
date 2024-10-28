import { create } from "zustand";
import { postRefreshTokenAPI } from "@/app/api/login/loginAPI";

interface AuthState {
  isLoggedIn: boolean;
  setLogin: () => void;
  setLogout: () => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,

  setLogin: () => set({ isLoggedIn: true }),

  setLogout: () => set({ isLoggedIn: false }),

  checkAuth: async () => {
    try {
      const response = await postRefreshTokenAPI();
      if (response) {
        set({ isLoggedIn: true });
      }
    } catch (error) {
      console.error("토큰 재발급 실패:", error);
      set({ isLoggedIn: false });
    }
  },
}));

export default useAuthStore;
