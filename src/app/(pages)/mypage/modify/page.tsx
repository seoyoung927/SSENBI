"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { putMemberAPI } from "@/app/api/member/memberAPI";
import InputField from "@/app/components/common/input/InputField";
import "./page.css";
import Header from "@/app/components/layout/Header";

// 회원정보 수정 데이터 타입
export interface UpdateMemberFormData {
  business: string;
  personalPhoneNumber: string;
  businessPhoneNumber: string;
}

export default function Modify() {
  const [memberId, setMemberId] = useState("exampleId"); // 읽기 전용 예시 값
  const [password, setPassword] = useState("password"); // 읽기 전용 예시 값
  const [confirmPassword, setConfirmPassword] = useState("password"); // 읽기 전용 예시 값
  const [name, setName] = useState("홍길동"); // 읽기 전용 예시 값
  const [business, setBusiness] = useState("");
  const [personalPhoneNumber, setPersonalPhoneNumber] = useState("");
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState("");

  const router = useRouter();

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
      if (error instanceof Error) {
        console.error("회원정보 수정 실패:", error.message);
      } else {
        console.error("회원정보 수정 실패: 알 수 없는 오류 발생");
      }
    }
  };

  const handleCancel = () => {
    router.push("/mypage");
  };

  return (
    <div className="page-container">
      <Header title="회원정보 수정" showBackIcon={true} />

      <InputField
        label="아이디"
        type="text"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
        disabled
      />

      <InputField
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled
      />

      <InputField
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled
      />

      <InputField
        label="이름"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled
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
