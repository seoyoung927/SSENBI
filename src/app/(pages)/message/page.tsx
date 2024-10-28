"use client";

import SearchBar from "@/app/components/common/input/SearchBar";
import { useState } from "react";
import "./page.css";

export default function MessagePage() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    if (searchValue != value) console.log("debounce Value", value);
  };
  return (
    <div className="page-container">
      <div className="search-bar-container">
        <SearchBar
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="검색어 (이름, 제목, 태그)"
        />
      </div>
    </div>
  );
}
