"use client";

import Banner from "@/app/components/common/Banner";
import NavigationBar from "@/app/components/common/NavigationBar";
import { useState } from "react";

export default function Template() {
  const [currentTab, setCurrentTab] = useState<number>(0);

  /* 상수자나
    무조건 상수는 대문자! 내가 수정할게
    
    그리고 이부분은 좀 더 명확하게 용어 정리를 해줘야해<div className="
    "></div>
  */

  /*
      이 탭 배열은 여기서만 쓰이자나 그러므로 TEMPLATE_TABS 이런식! 
    */
  const TEMPLATE_TABS = [
    "공통", // All
    "🎉 명절", // Celebration
    "🛒 쇼핑몰", // Shopping
    "🛡️ 보험", // Insurance
    "🏫 학원", // Academy
    "💊 건강", // Health
    "☕ 카페", // Café
    "🚗 중고차", // Used Cars
  ];

  const handleTabChange = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <div className="page-container">
      <Banner />
      <NavigationBar tabs={TEMPLATE_TABS} onTabChange={handleTabChange} />
      {currentTab === 0 && <div>탭 1의 내용입니다.</div>}
      {currentTab === 1 && <div>탭 2의 내용입니다.</div>}
      {currentTab === 2 && <div>탭 3의 내용입니다.</div>}
    </div>
  );
}
