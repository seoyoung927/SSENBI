"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { putMemberAPI } from "@/app/api/member/memberAPI";
import InputField from "@/app/components/common/input/InputField";
import "./page.css";
import Header from "@/app/components/layout/Header";
import Image from "next/image";

// 회원정보 수정 데이터 타입
interface UpdateMemberFormData {
  business: string;
  personalPhoneNumber: string;
  businessPhoneNumber: string;
}

export default function ModifyPage() {
  const [memberId, setMemberId] = useState("exampleId"); // 읽기 전용 예시 값
  const [password, setPassword] = useState("password"); // 읽기 전용 예시 값
  const [confirmPassword, setConfirmPassword] = useState("password"); // 읽기 전용 예시 값
  const [name, setName] = useState(""); // 읽기 전용 예시 값
  const [business, setBusiness] = useState("");
  const [personalPhoneNumber, setPersonalPhoneNumber] = useState("");
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState("");
  const [passwordError, setPasswordError] = useState<string>(""); // 비밀번호 오류 메시지 상태

  const router = useRouter();

  // 비밀번호 확인이 변경될 때 비밀번호가 일치하는지 검사
  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  }, [confirmPassword, password]);

  const handleModify = async () => {
    const token = "YOUR_AUTH_TOKEN"; // 실제 토큰으로 교체해야 합니다

    const formData: UpdateMemberFormData = {
      business,
      personalPhoneNumber,
      businessPhoneNumber,
    };

    try {
      const isSuccess = await putMemberAPI({ token, formData });

      if (isSuccess) {
        router.push("/mypage");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancel = () => {
    router.push("/mypage");
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
        disabled
      />

      <InputField
        label="비밀번호"
        type="password"
        value={password}
        onChange={handleInputChange(setPassword)}
      />

      <InputField
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={handleInputChange(setConfirmPassword)}
      />

      <div className="error-message">{passwordError}</div>

      <InputField
        label="이름"
        type="text"
        value={name}
        onChange={handleInputChange(setName)}
        disabled
      />

      <InputField
        label="사업체 명"
        type="text"
        value={business}
        onChange={handleInputChange(setBusiness)}
      />

      <InputField
        label="개인 전화번호"
        type="text"
        value={personalPhoneNumber}
        onChange={handleInputChange(setPersonalPhoneNumber)}
      />

      <InputField
        label="사업체 전화번호"
        type="text"
        value={businessPhoneNumber}
        onChange={handleInputChange(setBusinessPhoneNumber)}
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
