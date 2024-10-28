import "./FloatingActionButton.css";
import PlusIcon from "@/app/assets/svg/Plus.svg";

interface FloatingActionButtonProps {
  onClick?: () => void;
  showIcon?: boolean;
  text?: string;
}

export default function FloatingActionButton({
  onClick,
  showIcon = true,
  text = "",
}: FloatingActionButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick} className={"fab body-medium"}>
      {showIcon && <PlusIcon />}
      {text && <span>{text}</span>}
    </button>
  );
}
