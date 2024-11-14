"use client";

import NavigationBar from "@/app/components/layout/NavigationBar";
import ContentCard from "@/app/components/common/card/ContentCard";
import { useEffect, useState } from "react";

interface MessageTemplateType {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  image: string;
  usageCount: number;
}

interface TemplateListProps {
  categoryList: string[];
  allMessageTemplates: MessageTemplateType[][];
}

export default function TemplateList({
  categoryList,
  allMessageTemplates,
}: TemplateListProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [filteredMessageTemplates, setFilteredMessageTemplates] = useState<
    MessageTemplateType[]
  >(allMessageTemplates[0] || []);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  useEffect(() => {
    setFilteredMessageTemplates(allMessageTemplates[activeTab] || []);
  }, [activeTab, allMessageTemplates]);

  return (
    <div>
      <NavigationBar tabs={categoryList} onTabChange={handleTabChange} />

      <div className="template-list">
        {filteredMessageTemplates?.map((message) => (
          <ContentCard
            key={message.templateId}
            templateId={message.templateId}
            imgSrc={message.image}
            title={message.templateTitle}
            content={message.templateContent}
            usageCount={message.usageCount}
          />
        ))}
      </div>
    </div>
  );
}
