import { useCallback, useState } from "react";
import styles from "./FloatingActionButton.module.css";
import PlusIcon from "@/app/assets/svg/Plus.svg";

type FloatingActionButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  showIcon?: boolean;
  text?: string;
};

export default function FloatingActionButton({
  children,
  onClick,
  showIcon = true,
  text = "",
}: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedClassName = children === undefined ? "" : styles.expanded;
  const handleClick = useCallback(() => {
    setIsExpanded((prev) => !prev);
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <div className={styles.wrapper}>
      {isExpanded && children && (
        <div className={styles.content}>{children}</div>
      )}
      <button
        onClick={handleClick}
        className={`${styles.fab} ${isExpanded ? expandedClassName : ""}`}
      >
        {showIcon && <PlusIcon />}
        {text && <span>{text}</span>}
      </button>
    </div>
  );
}
