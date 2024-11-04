import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { postLogoutAPI, postRefreshTokenAPI } from "@/app/api/login/loginAPI";
import Cookies from "js-cookie";
interface AuthState {
  isLoggedIn: boolean | undefined;
  setLogin: () => void;
  setLogout: () => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: undefined,

      setLogin: () => set({ isLoggedIn: true }),

      setLogout: async () => {
        try {
          const token = Cookies.get("accessToken");
          if (!token) return;

          await postLogoutAPI({ token });
          set({ isLoggedIn: false });
        } catch (error) {
          console.error("로그아웃 실패:", error);
        }
      },

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
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Optional: if you want to serialize/deserialize your state
      // serialize: (state) => JSON.stringify(state),
      // deserialize: (str) => JSON.parse(str),
    },
  ),
);

export default useAuthStore;
