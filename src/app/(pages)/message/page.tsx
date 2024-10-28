"use client";

import SearchBar from "@/app/components/common/input/SearchBar";

export default function MessagePage() {
  const handleChange = (value: string | number) => {
    // todo : api에서 정보 받기
  };

  return (
    <div className="page-container">
      <SearchBar
        type="text"
        value={""}
        onChange={handleChange}
        placeholder="검색어 (이름, 제목, 태그)"
      />
    </div>
  );
}
