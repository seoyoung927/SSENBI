"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { getMemberAPI, putMemberAPI } from "@/app/api/member/memberAPI";
import { validatePassword } from "@/utils/validatePassword";
import InputField from "@/app/components/common/input/InputField";
import Header from "@/app/components/layout/Header";
import Image from "next/image";
import Cookies from "js-cookie";
import "./page.css";
import { postRefreshTokenAPI } from "@/app/api/login/loginAPI";

// 회원정보 수정 데이터 타입
interface UpdateMemberFormData {
  business: string;
  personalPhoneNumber: string;
  businessPhoneNumber: string;
}

const PASSWORD_MISMATCH_ERROR = "비밀번호가 일치하지 않습니다.";

export default function ModifyPage() {
  const [memberId, setMemberId] = useState("exampleId"); // 읽기 전용 예시 값
  const [password, setPassword] = useState("password"); // 읽기 전용 예시 값
  const [confirmPassword, setConfirmPassword] = useState("password"); // 읽기 전용 예시 값
  const [name, setName] = useState(""); // 읽기 전용 예시 값
  const [business, setBusiness] = useState("");
  const [personalPhoneNumber, setPersonalPhoneNumber] = useState("");
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState("");
  const [passwordError, setPasswordError] = useState<string>(""); // 비밀번호 오류 메시지 상태
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState<string>(""); // 비밀번호 유효성 검사 메시지 상태

  const router = useRouter();

  useEffect(() => {
    const getMember = async () => {
      const token = Cookies.get("accessToken");
      if (!token) return;
      try {
        //const res1 = await postRefreshTokenAPI();
        const response = await getMemberAPI({ token });
        console.log(response);
      } catch (error) {
        handleError(error);
      }
    };

    getMember();
  }, []);

  // 비밀번호 확인이 변경될 때 비밀번호가 일치하는지 검사
  useEffect(() => {
    const errorMsg =
      confirmPassword && confirmPassword !== password
        ? PASSWORD_MISMATCH_ERROR
        : "";
    setPasswordError(errorMsg);
  }, [confirmPassword, password]);

  useEffect(() => {
    const validationMessage = validatePassword(password);
    setPasswordValidationMessage(validationMessage);
  }, [password]);

  const handleModify = async () => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    const formData: UpdateMemberFormData = {
      business,
      personalPhoneNumber,
      businessPhoneNumber,
    };

    try {
      const isSuccess = await putMemberAPI({ token, formData });

      if (isSuccess) {
        router.push("/auth/mypage");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancel = () => {
    router.push("/auth/mypage");
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      console.error("회원정보 수정 실패:", error.message);
    } else {
      console.error("회원정보 수정 실패: 알 수 없는 오류 발생");
    }
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };
  };

  return (
    <div className="page-container">
      <Header title="회원정보 수정" showBackIcon={true} />

      <div className="mypage-modify-image-container">
        <Image src="/assets/images/ssenbi_logo.png" fill alt="ssenbi 로고" />
      </div>

      <InputField
        label="아이디"
        type="text"
        value={memberId}
        onChange={handleInputChange(setMemberId)}
        maxLength={20}
        disabled
      />

      <InputField
        label="비밀번호"
        type="password"
        value={password}
        maxLength={25}
        onChange={handleInputChange(setPassword)}
      />

      <div className="error-message">{passwordValidationMessage}</div>

      <InputField
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        maxLength={25}
        onChange={handleInputChange(setConfirmPassword)}
      />

      <div className="error-message">{passwordError}</div>

      <InputField
        label="이름"
        type="text"
        value={name}
        onChange={handleInputChange(setName)}
        disabled
        maxLength={25}
      />

      <InputField
        label="사업체 명"
        type="text"
        value={business}
        onChange={handleInputChange(setBusiness)}
        maxLength={25}
      />

      <InputField
        label="개인 전화번호"
        type="text"
        value={personalPhoneNumber}
        onChange={handleInputChange(setPersonalPhoneNumber)}
        maxLength={25}
      />

      <InputField
        label="사업체 전화번호"
        type="text"
        value={businessPhoneNumber}
        onChange={handleInputChange(setBusinessPhoneNumber)}
        maxLength={25}
      />

      <div className="mypage-modify_button-group">
        <button onClick={handleCancel} className="mypage-modify_button-cancel">
          취소
        </button>
        <button onClick={handleModify} className="mypage-modify_button-modify">
          저장
        </button>
      </div>
    </div>
  );
}
