"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/common/input/InputField";
import { SignupFormData } from "@/types/member/memberTypes";
import { postSignupAPI } from "@/app/api/member/memberAPI";
import Header from "@/app/components/layout/Header";
import Image from "next/image";
import "./page.css";

export default function Signup() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [personalPhoneNumber, setPersonalPhoneNumber] = useState("");
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState<string>(""); // 비밀번호 유효성 검사 메시지 상태

  const router = useRouter();

  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  }, [confirmPassword, password]);

  // 비밀번호 유효성 검사 함수
  const validatePassword = (pwd: string) => {
    const hasKorean = /[가-힣]/.test(pwd);
    const isLengthValid = pwd.length >= 8 && pwd.length <= 20;
    const hasLowercase = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);

    if (hasKorean) {
      return "비밀번호에 한글 문자를 사용할 수 없습니다.";
    }
    if (!isLengthValid) {
      return "비밀번호는 8자리 이상 20자리 이하이어야 합니다.";
    }
    if (!hasLowercase) {
      return "비밀번호에 영어 소문자를 최소 1개 이상 포함해야 합니다.";
    }
    if (!hasNumber) {
      return "비밀번호에 숫자를 최소 1개 이상 포함해야 합니다.";
    }
    return "";
  };

  useEffect(() => {
    const validationMessage = validatePassword(password);
    setPasswordValidationMessage(validationMessage);
  }, [password]);

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

  const handleMemberIdChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMemberId(e.target.value);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setConfirmPassword(e.target.value);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBusiness(e.target.value);

  const handlePersonalPhoneNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setPersonalPhoneNumber(e.target.value);

  const handleBusinessPhoneNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setBusinessPhoneNumber(e.target.value);

  return (
    <div className="page-container">
      <Header title="회원가입" showBackIcon={true} />

      <div className="mypage-signup-image-container">
        <Image src="/assets/images/ssenbi_logo.png" fill alt="ssenbi_logo" />
      </div>

      <InputField
        label="아이디"
        type="text"
        value={memberId}
        onChange={handleMemberIdChange}
      />

      <InputField
        label="비밀번호"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />

      <div className="error-message">{passwordValidationMessage}</div>

      <InputField
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />

      <div className="error-message">{passwordError}</div>

      <InputField
        label="이름"
        type="text"
        value={name}
        onChange={handleNameChange}
      />

      <InputField
        label="상 호"
        type="text"
        value={business}
        onChange={handleBusinessChange}
      />

      <InputField
        label="개인 전화번호"
        type="text"
        value={personalPhoneNumber}
        onChange={handlePersonalPhoneNumberChange}
      />

      <InputField
        label="업체 전화번호"
        type="text"
        value={businessPhoneNumber}
        onChange={handleBusinessPhoneNumberChange}
      />

      <div className="mypage-signup_button-group">
        <button onClick={handleCancel} className="white_button">
          취소
        </button>
        <button onClick={handleSignup} className="blue_button">
          회원가입
        </button>
      </div>
    </div>
  );
}
