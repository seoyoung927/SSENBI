import React from "react";
import "./InputField.css";

interface InputFieldProps {
  label: string;
  type: "text" | "email" | "password" | "number" | "tel";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean; // 선택적 disabled 속성 추가
}

export default function InputField({
  label,
  type,
  value,
  onChange,
  disabled = false, // 기본값 false 설정
}: InputFieldProps) {
  return (
    <div className="input-field">
      <label className="input-field__label">{label}</label>
      <input
        className="input-field__field"
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled} // disabled 속성 추가
      />
    </div>
  );
}
