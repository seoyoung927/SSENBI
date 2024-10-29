"use client";

import Banner from "@/app/components/common/banner/Banner";
import ContentCard from "@/app/components/common/card/ContentCard";
import NavigationBar from "@/app/components/layout/NavigationBar";
import { getTemplateAPI } from "@/app/api/template/templateAPI";
import { useEffect, useState } from "react";

interface MessageTemplateType {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  templateUsageCount: number;
  templateImageSrc: string;
}

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

export default function Template() {
  const [, setCurrentTab] = useState<number>(0);
  const [, setCategoryList] = useState<string[]>([]);
  const [allMessageTemplates, setAllMessageTemplates] = useState<
    MessageTemplateType[]
  >([]);
  const [filteredMessageTemplates, setFilteredMessageTemplates] = useState<
    MessageTemplateType[]
  >([]);

  useEffect(() => {
    const fetchMessageApi = async () => {
      const messageApi = await fetchTemplates();
      if (Array.isArray(messageApi)) {
        const { categories, templates } = processTemplates(messageApi);
        setCategoryList(categories);
        setAllMessageTemplates(templates);
        setFilteredMessageTemplates(templates);
      }
    };

    fetchMessageApi();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await getTemplateAPI();
      console.log("API Response:", response);
      return response.result || [];
    } catch (error) {
      console.error("Error fetching message API:", error);
      return [];
    }
  };

  const processTemplates = (messageApi: any[]) => {
    const categories: string[] = [];
    const templates: MessageTemplateType[] = [];

    messageApi.forEach((category: any) => {
      if (category.categoryName && Array.isArray(category.generalTemplates)) {
        categories.push(category.categoryName);
        category.generalTemplates.forEach((template: MessageTemplateType) => {
          templates.push({
            templateId: template.templateId,
            templateTitle: template.templateTitle,
            templateUsageCount: template.templateUsageCount,
            templateContent: template.templateContent,
            templateImageSrc: template.templateImageSrc,
          });
        });
      } else {
        console.error("Unexpected category structure:", category);
      }
    });

    return { categories, templates };
  };

  const handleTabChange = (index: number) => {
    setCurrentTab(index);
    const filtered =
      index === 0
        ? allMessageTemplates
        : allMessageTemplates.filter((template) => template);
    setFilteredMessageTemplates(filtered);
  };

  return (
    <div className="page-container">
      <Banner />
      <div>
        <NavigationBar tabs={TEMPLATE_TABS} onTabChange={handleTabChange} />
      </div>
      {filteredMessageTemplates.map((message, index) => (
        <ContentCard
          key={index}
          imgSrc={message.templateImageSrc}
          title={message.templateTitle}
          content={message.templateContent}
        />
      ))}
    </div>
  );
}
