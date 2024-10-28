"use client";

import { postLoginAPI } from "@/app/api/login/loginAPI";
import InputField from "@/app/components/common/InputField";
import useAuthStore from "@/stores/authStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
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
      if (error instanceof Error) {
        console.error("로그인 실패: ", error.message);
      } else {
        console.error("로그인 실패: 알 수 없는 오류 발생");
      }
    }
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="page-container">
      <InputField
        label="아이디"
        type="text"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
      />

      <InputField
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} className="login-button">
        로그인
      </button>
      <button onClick={handleSignup} className="cancel-button">
        회원가입
      </button>
    </div>
  );
}
