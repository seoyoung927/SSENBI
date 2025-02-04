"use client";

import React, { Suspense } from "react";
import "./Header.css";
import BackIcon from "@/app/assets/svg/ChevronLeft.svg";
import { useRouter, usePathname } from "next/navigation";
import useAuthStore from "@/stores/authStore";
import Cookies from "js-cookie";
import { postLogoutAPI } from "@/app/api/login/loginAPI";
import HashLoading from "../common/loading/HashLoading";

interface HeaderProps {
  title: string;
  showBackIcon?: boolean;
}

export default function Header({ title, showBackIcon = false }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const Logout = useAuthStore((state) => state.setLogout);

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleLogout = async () => {
    try {
      const token = Cookies.get("accessToken");

      if (!token) return;

      await postLogoutAPI({ token });
      Logout();
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
    router.push("/");
  };

  return (
    <Suspense fallback={<HashLoading />}>
      <div className="header heading">
        <div className="header_title-container">
          {showBackIcon && (
            <button
              onClick={() => router.back()}
              className="header_button-back"
              aria-label="뒤로 가기"
            >
              <BackIcon />
            </button>
          )}
          {title}
        </div>
        {isLoggedIn && pathname.includes("/auth") && (
          <button
            type="button"
            className="header_button-auth"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        )}
        {!isLoggedIn && (
          <button
            type="button"
            className="header_button-auth"
            onClick={handleLogin}
          >
            로그인
          </button>
        )}
      </div>
    </Suspense>
  );
}
