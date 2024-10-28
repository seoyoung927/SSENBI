import "./SearchBar.css";
import ReadingGlassesIcon from "@/app/assets/svg/ReadingGlasses.svg";

interface SearchBarProps {
  type?: "text" | "number";
  value?: "" | 0;
  placeholder?: string;
  onChange: () => void;
}

export default function SearchBar({
  type = "text",
  value,
  placeholder,
  onChange,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        // onChange={onChange}
        className="search-input"
      />
      <ReadingGlassesIcon className="search-icon" viewBox="0 0 24 24" />
    </div>
  );
}
