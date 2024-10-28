import React from "react";
import "./InputField.css";

interface InputFieldProps {
  label: string;
  type: "text" | "email" | "password" | "number" | "tel";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  type,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="input-field">
      <label className="input-field__label">{label}</label>
      <input
        className="input-field__field"
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
