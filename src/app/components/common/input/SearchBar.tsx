"use client";

import React, { useMemo, useEffect } from "react";
import debounce from "lodash/debounce";
import "./SearchBar.css";
import ReadingGlassesIcon from "@/app/assets/svg/ReadingGlasses.svg";

interface SearchBarProps {
  type?: "text" | "number";
  value?: string | number;
  placeholder?: string;
  onChange: (value: string | number) => void;
}

export default function SearchBar({
  type = "text",
  value,
  placeholder,
  onChange,
}: SearchBarProps) {
  const debouncedOnChange = useMemo(() => debounce(onChange, 300), [onChange]);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedOnChange(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="search-input"
      />
      <ReadingGlassesIcon className="search-icon" viewBox="0 0 24 24" />
    </div>
  );
}
