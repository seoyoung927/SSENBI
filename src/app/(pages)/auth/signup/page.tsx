"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/common/input/InputField";
import { SignupFormData } from "@/types/member/memberTypes";
import { postSignupAPI } from "@/app/api/member/memberAPI";
import { validatePassword } from "@/utils/validatePassword";
import Header from "@/app/components/layout/Header";
import Image from "next/image";
import "./page.css";

const PASSWORD_MISMATCH_ERROR = "비밀번호가 일치하지 않습니다.";
const PHONE_NUMBER_LENGTH_ERROR =
  "전화번호는 7자 이상 15자 이하로 입력해주세요.";
const REQUIRED_FIELD_ERROR = "이 필드는 필수 입력 항목입니다.";

interface RequiredFieldErrorsType {
  memberId: string;
  password: string;
  confirmPassword: string;
  name: string;
  business: string;
  personalPhoneNumber: string;
  businessPhoneNumber: string;
}

export default function SignupPage() {
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
  const [personalPhoneNumberError, setPersonalPhoneNumberError] =
    useState<string>("");
  const [businessPhoneNumberError, setBusinessPhoneNumberError] =
    useState<string>("");
  const [requiredFieldErrors, setRequiredFieldErrors] =
    useState<RequiredFieldErrorsType>({
      memberId: "",
      password: "",
      confirmPassword: "",
      name: "",
      business: "",
      personalPhoneNumber: "",
      businessPhoneNumber: "",
    });

  const router = useRouter();

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
      personalPhoneNumber.length === 0 ||
      (personalPhoneNumber.length >= 7 && personalPhoneNumber.length <= 15);
    setPersonalPhoneNumberError(
      !isPersonalPhoneValid ? PHONE_NUMBER_LENGTH_ERROR : "",
    );
  }, [personalPhoneNumber]);

  useEffect(() => {
    const isBusinessPhoneValid =
      businessPhoneNumber.length === 0 ||
      (businessPhoneNumber.length >= 7 && businessPhoneNumber.length <= 15);

    setBusinessPhoneNumberError(
      !isBusinessPhoneValid ? PHONE_NUMBER_LENGTH_ERROR : "",
    );
  }, [businessPhoneNumber]);

  const handleSignup = async () => {
    const newRequiredFieldErrors = {
      memberId: !memberId ? REQUIRED_FIELD_ERROR : "",
      password: !password ? REQUIRED_FIELD_ERROR : "",
      confirmPassword: !confirmPassword ? REQUIRED_FIELD_ERROR : "",
      name: !name ? REQUIRED_FIELD_ERROR : "",
      business: !business ? REQUIRED_FIELD_ERROR : "",
      personalPhoneNumber: !personalPhoneNumber ? REQUIRED_FIELD_ERROR : "",
      businessPhoneNumber: !businessPhoneNumber ? REQUIRED_FIELD_ERROR : "",
    };

    setRequiredFieldErrors(newRequiredFieldErrors);

    if (Object.values(newRequiredFieldErrors).some((error) => error)) {
      console.warn("Required fields missing");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      console.log("Sending signup request with data:", {
        memberId,
        password,
        name,
        business,
        personalPhoneNumber,
        businessPhoneNumber,
      });

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
        console.log("Signup successful, redirecting...");
        router.push("/auth/login");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("회원가입 실패:", error.message);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      } else {
        console.error("회원가입 실패: 알 수 없는 오류 발생");
      }
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    field: keyof typeof requiredFieldErrors,
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { type, value } = e.target;
      if (type === "number") {
        const numericValue = value.replace(/\D/g, "");
        if (numericValue.length <= 15) {
          setter(numericValue);
          setRequiredFieldErrors((prevErrors) => ({
            ...prevErrors,
            [field]: "",
          }));
        }
      } else {
        setter(value);
        setRequiredFieldErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "",
        }));
      }
    };
  };

  const isSignupDisabled =
    !memberId ||
    !password ||
    !confirmPassword ||
    !name ||
    !business ||
    !personalPhoneNumber ||
    !businessPhoneNumber ||
    !!passwordError ||
    !!personalPhoneNumberError ||
    !!businessPhoneNumberError ||
    !!passwordValidationMessage;

  return (
    <div className="page-container">
      <Header title="회원가입" showBackIcon={true} />

      <div className="mypage-signup-image-container">
        <Image
          src="/assets/images/ssenbi_logo.png"
          fill
          priority
          alt="ssenbi 로고"
          sizes="300"
        />
      </div>

      <InputField
        label="아이디"
        type="text"
        value={memberId}
        maxLength={20}
        onChange={handleInputChange(setMemberId, "memberId")}
      />
      <div className="error-message">{requiredFieldErrors.memberId}</div>

      <InputField
        label="비밀번호"
        type="password"
        value={password}
        maxLength={25}
        onChange={handleInputChange(setPassword, "password")}
      />
      <div className="error-message">
        {passwordValidationMessage || requiredFieldErrors.password}
      </div>

      <InputField
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        maxLength={25}
        onChange={handleInputChange(setConfirmPassword, "confirmPassword")}
      />
      <div className="error-message">
        {passwordError || requiredFieldErrors.confirmPassword}
      </div>

      <InputField
        label="이름"
        type="text"
        value={name}
        maxLength={25}
        onChange={handleInputChange(setName, "name")}
      />
      <div className="error-message">{requiredFieldErrors.name}</div>

      <InputField
        label="상호"
        type="text"
        value={business}
        maxLength={25}
        onChange={handleInputChange(setBusiness, "business")}
      />
      <div className="error-message">{requiredFieldErrors.business}</div>

      <InputField
        label="개인 전화번호"
        type="number"
        value={personalPhoneNumber}
        onChange={handleInputChange(
          setPersonalPhoneNumber,
          "personalPhoneNumber",
        )}
        maxLength={15}
      />
      <div className="error-message">
        {personalPhoneNumberError || requiredFieldErrors.personalPhoneNumber}
      </div>

      <InputField
        label="업체 전화번호"
        type="number"
        value={businessPhoneNumber}
        onChange={handleInputChange(
          setBusinessPhoneNumber,
          "businessPhoneNumber",
        )}
        maxLength={15}
      />
      <div className="error-message">
        {businessPhoneNumberError || requiredFieldErrors.businessPhoneNumber}
      </div>

      <div className="mypage-signup_button-group">
        <button onClick={handleCancel} className="white_button">
          취소
        </button>
        <button
          onClick={handleSignup}
          className="blue_button"
          disabled={isSignupDisabled}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
