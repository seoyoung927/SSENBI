"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMemberAPI, putMemberAPI } from "@/app/api/member/memberAPI";
import { validatePassword } from "@/utils/validatePassword";
import InputField from "@/app/components/common/input/InputField";
import Header from "@/app/components/layout/Header";
import Image from "next/image";
import Cookies from "js-cookie";
import "./page.css";

// 회원정보 수정 데이터 타입
interface UpdateMemberFormData {
  business: string;
  personalPhoneNumber: string;
  businessPhoneNumber: string;
}

const PASSWORD_MISMATCH_ERROR = "비밀번호가 일치하지 않습니다.";
const PHONE_NUMBER_LENGTH_ERROR =
  "전화번호는 7자 이상 15자 이하로 입력해주세요.";

export default function ModifyPage() {
  const [memberId, setMemberId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [business, setBusiness] = useState<string>("");
  const [personalPhoneNumber, setPersonalPhoneNumber] = useState<string>("");
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState<string>("");
  const [isSaveMessageVisible, setIsSaveMessageVisible] =
    useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getMember = async () => {
      const token = Cookies.get("accessToken");
      if (!token) return;
      try {
        const response = await getMemberAPI({ token });
        setMemberId(response?.result?.memberId);
        setName(response?.result?.name);
        setBusiness(response?.result?.business);
        setPersonalPhoneNumber(response?.result?.personalPhoneNumber);
        setBusinessPhoneNumber(response?.result?.businessPhoneNumber);
      } catch (error) {
        console.error("get Member API 실패", error);
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

  useEffect(() => {
    const isPersonalPhoneValid =
      personalPhoneNumber.length >= 7 && personalPhoneNumber.length <= 15;
    const isBusinessPhoneValid =
      businessPhoneNumber.length >= 7 && businessPhoneNumber.length <= 15;

    if (personalPhoneNumber || businessPhoneNumber) {
      setPhoneNumberError(
        isPersonalPhoneValid && isBusinessPhoneValid
          ? ""
          : PHONE_NUMBER_LENGTH_ERROR,
      );
    } else {
      setPhoneNumberError("");
    }
  }, [personalPhoneNumber, businessPhoneNumber]);

  const validateForm = () => {
    const isPasswordValid = !passwordError && !passwordValidationMessage;
    const isPhoneNumberValid = !phoneNumberError;

    return isPasswordValid && isPhoneNumberValid;
  };

  const handleModify = async () => {
    if (!validateForm()) {
      alert("입력값에 오류가 있습니다. 모든 필드를 채워주세요");
      return;
    }

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
        setIsSaveMessageVisible(true);
        setTimeout(() => {
          setIsSaveMessageVisible(false);
        }, 2500);

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
      const { type, value } = e.target;

      if (type === "number") {
        const numericValue = value.replace(/\D/g, "");
        if (numericValue.length <= 15) {
          setter(numericValue);
        }
      } else {
        setter(value);
      }
    };
  };

  return (
    <div className="page-container">
      <Header title="회원정보 수정" showBackIcon={true} />
      {isSaveMessageVisible && (
        <div className="save-message">글이 수정되었습니다!</div>
      )}
      <div className="mypage-modify-image-container">
        <Image
          src="/assets/images/ssenbi_logo.png"
          fill
          loading="lazy"
          alt="ssenbi 로고"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
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
        type="number"
        value={personalPhoneNumber}
        onChange={handleInputChange(setPersonalPhoneNumber)}
        maxLength={15}
      />

      <InputField
        label="사업체 전화번호"
        type="number"
        value={businessPhoneNumber}
        onChange={handleInputChange(setBusinessPhoneNumber)}
        maxLength={15}
      />

      {phoneNumberError && (
        <div className="error-message">{phoneNumberError}</div>
      )}

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
