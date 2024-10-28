"use client";

import { useState } from "react";
import InputField from "@/app/components/common/InputField";
import { useRouter } from "next/navigation";
import { postSignupAPI } from "@/app/api/signup/signupAPI";

export default function Signup() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    // 비밀번호 확인
    if (userPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const isSuccess = await postSignupAPI({
        userId,
        userPassword,
      });

      if (isSuccess) {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("회원가입 실패:", error.message);
      } else {
        console.error("회원가입 실패: 알 수 없는 오류 발생");
      }
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="page-container">
      <h1>회원가입</h1>

      <InputField
        label="아이디"
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <InputField
        label="비밀번호"
        type="password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
      />

      <InputField
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button onClick={handleSignup} className="signup-button">
        회원가입
      </button>
      <button onClick={handleCancel} className="cancel-button">
        취소
      </button>
    </div>
  );
}
