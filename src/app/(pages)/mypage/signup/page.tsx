"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/common/input/InputField";
import { SignupFormData } from "@/types/member/memberTypes";
import { postSignupAPI } from "@/app/api/member/memberAPI";
import "./page.css";
import Header from "@/app/components/layout/Header";

export default function Signup() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [personalPhoneNumber, setPersonalPhoneNumber] = useState("");
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState("");

  const router = useRouter();

  const handleSignup = async () => {
    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const signupData: SignupFormData = {
        memberId,
        password,
        name,
        business,
        personalPhoneNumber,
        businessPhoneNumber,
      };

      const isSuccess = await postSignupAPI(signupData);

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
    router.back();
  };

  return (
    <div className="page-container">
      <Header title="회원가입" showBackIcon={true} />

      <InputField
        label="아이디"
        type="text"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
      />

      <InputField
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <InputField
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <InputField
        label="이름"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <InputField
        label="사업체 명"
        type="text"
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
      />

      <InputField
        label="개인 전화번호"
        type="text"
        value={personalPhoneNumber}
        onChange={(e) => setPersonalPhoneNumber(e.target.value)}
      />

      <InputField
        label="사업체 전화번호"
        type="text"
        value={businessPhoneNumber}
        onChange={(e) => setBusinessPhoneNumber(e.target.value)}
      />

      <div className="mypage-signup_button-group">
        <button
          onClick={handleCancel}
          className=".mypage-signup_button mypage-signup_button-candel"
        >
          취소
        </button>
        <button
          onClick={handleSignup}
          className=".mypage-signup_button mypage-signup_button-signup"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
