"use client";

import Banner from "@/app/components/common/Banner";
import ContentCard from "@/app/components/common/ContentCard";
import NavigationBar from "@/app/components/common/NavigationBar";
import { useEffect, useState } from "react";

interface MessageTemplatesType {
  title: string;
  content: string;
}
export default function Template() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [allMessageTemplates, setAllMessageTemplates] = useState<
    MessageTemplatesType[]
  >([]);
  const [filteredMessageTemplates, setFilteredMessageTemplates] = useState<
    MessageTemplatesType[]
  >([]);

  useEffect(() => {
    // todo : api 요청에서 정보 얻기
  }, []);

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
      <div>
        <NavigationBar tabs={TEMPLATE_TABS} onTabChange={handleTabChange} />
      </div>
      {filteredMessageTemplates.map((message) => (
        <ContentCard
          imgSrc=""
          title={message.title}
          content={message.content}
        />
      ))}
    </div>
  );
}
