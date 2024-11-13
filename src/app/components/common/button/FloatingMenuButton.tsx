"use client";

import { useState } from "react";
import "./FloatingMenuButton.css";
import PlusIcon from "@/app/assets/svg/Plus.svg";

interface FloatingMenuButtonProps {
  children?: React.ReactNode;
  showIcon?: boolean;
  text?: string;
}

export default function FloatingMenuButton({
  children,
  showIcon = true,
  text = "",
}: FloatingMenuButtonProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const expandedClassName = isExpanded ? "fmb-expanded" : "";
  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="fmb-wrapper body-medium">
      {isExpanded && <div className="fmb-content">{children}</div>}
      <button
        onClick={handleClick}
        className={`fmb body-medium ${expandedClassName}`}
      >
        {showIcon && <PlusIcon />}
        {text && <span>{text}</span>}
      </button>
    </div>
  );
}
