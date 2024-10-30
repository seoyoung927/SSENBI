"use client";

import React, { useMemo, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import ReadingGlassesIcon from "@/app/assets/svg/ReadingGlasses.svg";
import XIcon from "@/app/assets/svg/X.svg";
import "./SearchBar.css";

interface SearchBarProps {
  type?: "text";
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  type = "text",
  value = "",
  placeholder,
  onChange,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);

  const debouncedOnChange = useMemo(() => debounce(onChange, 500), [onChange]);

  useEffect(() => {
    debouncedOnChange(inputValue);

    return () => {
      debouncedOnChange.cancel();
    };
  }, [inputValue, debouncedOnChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const removeValue = () => {
    setInputValue("");
    debouncedOnChange("");
  };

  return (
    <div className="search-bar">
      <ReadingGlassesIcon className="search-icon" viewBox="0 0 24 24" />

      <input
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className="search-input"
      />
      <span
        onClick={removeValue}
        className="search-icon search-icon--remove"
        style={{ cursor: "pointer" }}
      >
        <XIcon viewBox="0 0 20 20" />
      </span>
    </div>
  );
}
