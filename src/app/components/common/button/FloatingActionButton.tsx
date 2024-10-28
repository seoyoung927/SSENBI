import { useCallback, useState } from "react";
import "./FloatingActionButton.css";
import PlusIcon from "@/app/assets/svg/Plus.svg";

interface FloatingActionButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  showIcon?: boolean;
  text?: string;
}

export default function FloatingActionButton({
  children,
  onClick,
  showIcon = true,
  text = "",
}: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedClassName = isExpanded && children ? "fab-expanded" : "";

  const handleClick = useCallback(() => {
    setIsExpanded((prev) => !prev);
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <div className="fab-wrapper">
      {isExpanded && children && <div className="fab-content">{children}</div>}
      <button onClick={handleClick} className={`fab ${expandedClassName}`}>
        {showIcon && <PlusIcon />}
        {text && <span>{text}</span>}
      </button>
    </div>
  );
}
