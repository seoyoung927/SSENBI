import React from "react";
import "./InputField.css";

interface InputFielddProps {
  label: string;
  type: "text" | "email" | "password" | "number" | "tel";
}

export default function InputField({ label, type }: InputFielddProps) {
  return (
    <div className="input-field">
      <label className="input-field__label">{label}</label>
      <input className="input-field__field" type={type} />
    </div>
  );
}
