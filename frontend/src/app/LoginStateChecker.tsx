"use client";
import { useAuthRedirect } from "@/utils/useAuthRedirect";
import useAuthStore from "@/stores/authStore";

export default function LoginStateChecker() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useAuthRedirect(isLoggedIn);
  return <></>;
}
