"use client";

import { postLoginAPI } from "@/app/api/login/loginAPI";
import InputField from "@/app/components/common/input/InputField";
import useAuthStore from "@/stores/authStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/layout/Header";
import Image from "next/image";
import "./page.css";

export default function LoginPage() {
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setLogin = useAuthStore((state) => state.setLogin);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const isSuccess = await postLoginAPI({ loginId, password });

      if (isSuccess) {
        setLogin();
        router.push("/"); // 로그인 성공 후 홈으로 리다이렉션
      }
    } catch (error) {
      alert("로그인 과정 중 문제가 발생했습니다. 관리자에게 문의해주세요");
      if (error instanceof Error) {
        console.error("로그인 실패: ", error.message);
      } else {
        console.error("로그인 실패: 알 수 없는 오류 발생");
      }
    }
  };

  const handleSignup = () => {
    router.push("/mypage/signup");
  };

  const handleLoginIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="page-container">
      <Header title="로그인" showBackIcon={true} />
      <div className="mypage-login-image-container">
        <Image src="/assets/images/ssenbi_logo.png" alt="ssenbi 로고" fill />
      </div>

      <InputField
        label="아이디"
        type="text"
        value={loginId}
        onChange={handleLoginIdChange}
        maxLength={20}
      />

      <InputField
        label="비밀번호"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        maxLength={25}
      />

      <div className="mypage-login_button-group">
        <button onClick={handleLogin} className="blue_button">
          로그인
        </button>
        <button onClick={handleSignup} className="white_button">
          회원가입
        </button>
      </div>
    </div>
  );
}
