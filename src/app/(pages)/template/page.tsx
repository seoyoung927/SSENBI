"use client";

import Banner from "@/app/components/common/Banner";
import ContentCard from "@/app/components/common/ContentCard";
import NavigationBar from "@/app/components/common/NavigationBar";
import { getTemplateAPI } from "@/app/api/template/templateAPI";
import { useEffect, useState } from "react";

interface MessageTemplateType {
  templateId: number;
  count: number;
  createdAt: string;
  categoryName: string;
  templateTitle: string;
  templateContent: string;
}

export default function Template() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [allMessageTemplates, setAllMessageTemplates] = useState<
    MessageTemplateType[]
  >([]);
  const [filteredMessageTemplates, setFilteredMessageTemplates] = useState<
    MessageTemplateType[]
  >([]);

  useEffect(() => {
    const fetchMessageApi = async () => {
      try {
        const response = await getTemplateAPI();
        console.log("API Response:", response);

        const messageApi = response.result;

        if (Array.isArray(messageApi)) {
          const categories: string[] = [];
          const templates: MessageTemplateType[] = [];

          messageApi.forEach((category: any) => {
            if (
              category.categoryName &&
              Array.isArray(category.generalTemplates)
            ) {
              categories.push(category.categoryName);

              category.generalTemplates.forEach((template: any) => {
                templates.push({
                  templateId: template.templateId,
                  count: template.count,
                  createdAt: template.createdAt,
                  categoryName: category.categoryName,
                  templateTitle: template.templateTitle,
                  templateContent: template.templateContent,
                });
              });
            } else {
              console.error("Unexpected category structure:", category);
            }
          });

          setCategoryList(categories);
          setAllMessageTemplates(templates);
          setFilteredMessageTemplates(templates);
        } else {
          console.error("Unexpected API response format. Expected an array.");
        }
      } catch (error) {
        console.error("Error fetching message API:", error);
      }
    };

    fetchMessageApi();
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

    if (index === 0) {
      setFilteredMessageTemplates(allMessageTemplates);
    } else {
      const selectedCategory = categoryList[index - 1];
      const filtered = allMessageTemplates.filter(
        (template) => template.categoryName === selectedCategory,
      );
      setFilteredMessageTemplates(filtered);
    }
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
          imgSrc=""
          title={message.templateTitle}
          content={message.templateContent}
        />
      ))}
    </div>
  );
}
