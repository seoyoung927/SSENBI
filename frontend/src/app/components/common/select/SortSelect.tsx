import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./SortSelect.css";
import { BsChevronCompactDown } from "react-icons/bs";

interface SortSelectProps {
  curOption: string;
  options: string[];
  onChange: (option: string) => void;
}

export default function SortSelect({
  curOption,
  options,
  onChange,
}: SortSelectProps) {
  const handleSortChange = (option: string) => {
    onChange(option);
  };

  return (
    <div className="sort-dropdown">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="sort-dropdown-trigger">
          {curOption} <BsChevronCompactDown className="body-small" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="sort-dropdown-content">
          {options.map((option, index) => (
            <DropdownMenu.Item
              key={index}
              className="body-small sort-dropdown-item"
              onClick={() => handleSortChange(option)}
            >
              {option}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
