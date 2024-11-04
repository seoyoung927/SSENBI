import React, { useEffect } from "react";
import "./Header.css";
import BackIcon from "@/app/assets/svg/ChevronLeft.svg";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";

interface HeaderProps {
  title: string;
  showBackIcon?: boolean;
}

export default function Header({ title, showBackIcon = false }: HeaderProps) {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const Logout = useAuthStore((state) => state.setLogout);

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleLogout = () => {
    Logout();
    router.push("/");
  };

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
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
      {isLoggedIn === true && (
        <button
          type="button"
          className="header_button-auth"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      )}
      {isLoggedIn === false && (
        <button
          type="button"
          className="header_button-auth"
          onClick={handleLogin}
        >
          로그인
        </button>
      )}
    </div>
  );
}
