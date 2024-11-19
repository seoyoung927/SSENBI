"use client";

import { useEffect, useState } from "react";
import { getSingleTemplateAPI } from "@/app/api/template/templateAPI";
import Header from "@/app/components/layout/Header";
import TemplateClientButtons from "@/app/components/common/template/TemplateClientButtons";
import "./page.css";
import HashLoading from "@/app/components/common/loading/HashLoading";

interface MessageTemplateType {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  image: string;
  usageCount: number;
  createdAt: string;
}

const DEFAULT_TEMPLATE_DATA: MessageTemplateType = {
  templateId: 0,
  templateTitle: "",
  templateContent: "",
  image: "",
  usageCount: 0,
  createdAt: "",
};

export default function TemplateIdPage({ params }: { params: { id: number } }) {
  const [templateData, setTemplateData] = useState<MessageTemplateType>(
    DEFAULT_TEMPLATE_DATA,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await getSingleTemplateAPI({ templateId: params.id });
        setTemplateData(response.result);
      } catch (error) {
        if (error instanceof Error) {
          setTemplateData(DEFAULT_TEMPLATE_DATA);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplateData();
  }, [params.id]);

  if (isLoading) return <HashLoading />;

  return (
    <div className="page-container">
      <Header title={templateData.templateTitle} showBackIcon={true} />
      <div className="template-id-container">
        <TemplateClientButtons id={params.id} templateData={templateData} />
        <p className="template-id_count body-small">
          커스텀 사용횟수: {templateData.usageCount}
        </p>
        <div className="template-id_content body">
          {templateData.templateContent}
        </div>
      </div>
    </div>
  );
}
