import React from "react";
import "./Header.css";
import BackIcon from "@/app/assets/svg/ChevronLeft.svg";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  showBackIcon?: boolean;
}

export default function Header({ title, showBackIcon = false }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="header small-title">
      {showBackIcon && (
        <button
          onClick={() => router.back()}
          className="header_button-back"
          aria-label="뒤로 가기"
        >
          <BackIcon />
        </button>
      )}
      {title}
    </div>
  );
}
