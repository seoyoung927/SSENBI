"use client";

import Banner from "@/app/components/common/banner/Banner";
import ContentCard from "@/app/components/common/card/ContentCard";
import NavigationBar from "@/app/components/layout/NavigationBar";
import { getTemplateAPI } from "@/app/api/template/templateAPI";
import { useEffect, useState } from "react";
import HashLoading from "@/app/components/common/loading/HashLoading";
import Link from "next/link";

interface MessageTemplateType {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  templateUsageCount: number;
  image: string;
}

// const TEMPLATE_TABS = [
//   "공통", // All
//   "🎉 명절", // Celebration
//   "🛒 쇼핑몰", // Shopping
//   "🛡️ 보험", // Insurance
//   "🏫 학원", // Academy
//   "💊 건강", // Health
//   "☕ 카페", // Café
//   "🚗 중고차", // Used Cars
// ];

export default function Template() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [allMessageTemplates, setAllMessageTemplates] = useState<
    MessageTemplateType[][]
  >([]);
  const [filteredMessageTemplates, setFilteredMessageTemplates] = useState<
    MessageTemplateType[]
  >([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await getTemplateAPI();
        const fetchedCategories: string[] = [];
        const templatesByCategory: MessageTemplateType[][] = [];

        response.result.forEach((categoryData: any) => {
          const categoryName = categoryData.categoryName;
          fetchedCategories.push(categoryName);

          const categoryTemplates = categoryData.generalTemplates.map(
            (template: any) => ({
              templateId: template.templateId,
              templateTitle: template.templateTitle,
              templateContent: template.templateContent,
              usageCount: template.usageCount,
              image: template.image,
            }),
          );
          templatesByCategory.push(categoryTemplates);
        });

        setCategoryList(fetchedCategories);
        setAllMessageTemplates(templatesByCategory);
        setFilteredMessageTemplates(templatesByCategory[0] || []); // 초기에는 첫 카테고리의 템플릿을 표시
      } catch (error) {
        alert("template 페이지 로딩이 실패하였습니다. 관리자에게 문의해주세요");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleTabChange = (index: number) => {
    setFilteredMessageTemplates(allMessageTemplates[index] || []);
  };

  if (isLoading) return <HashLoading />;

  return (
    <div className="page-container">
      <Banner />

      <div>
        <NavigationBar tabs={categoryList} onTabChange={handleTabChange} />
      </div>

      {filteredMessageTemplates?.map((message, index) => (
        <Link key={index} href={`/template/${message.templateId}`}>
          <ContentCard
            imgSrc={message.image}
            title={message.templateTitle}
            content={message.templateContent}
          />
        </Link>
      ))}
    </div>
  );
}
