"use client";

import NavigationBar from "@/app/components/common/NavigationBar";
import { useState } from "react";

/*
필수!!
  모든 페이지는 첫 줄에
 <div className="page-container"> 필수
 bottom 바 스타일 조정때문!! 
*/

export default function Template() {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const tabs = [
    "탭1제목",
    "탭2제목",
    "탭3제목",
    "탭4제목",
    "탭5제목",
    "탭6제목",
  ];

  const handleTabChange = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <div className="page-container">
      <div>배너</div>
      <NavigationBar tabs={tabs} onTabChange={handleTabChange} />
      {currentTab === 0 && <div>탭 1의 내용입니다.</div>}
      {currentTab === 1 && <div>탭 2의 내용입니다.</div>}
      {currentTab === 2 && <div>탭 3의 내용입니다.</div>}
    </div>
  );
}
