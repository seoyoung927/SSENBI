import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { postRefreshTokenAPI } from "@/app/api/login/loginAPI";

interface AuthState {
  isLoggedIn: boolean;
  setLogin: () => void;
  setLogout: () => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
