"use client";

import { useState } from "react";
import "./page.css";
import Header from "@/app/components/layout/Header";
import { TagColorTypes } from "@/types/tag/tagTypes";
import BorderTag from "@/app/components/common/tag/BorderTag";
import FilledTag from "@/app/components/common/tag/FilledTag";
import router, { useRouter } from "next/navigation";
import { deleteCustomTemplateAPI } from "@/app/api/customized/customizedAPI";

// Tag 타입 정의
interface TemplateTag {
  tagId: number;
  tagName: string;
  tagColor: TagColorTypes;
}

// Customer 타입 정의
interface TemplateCustomer {
  customerId: number;
  customerName: string;
  customerColor: TagColorTypes;
}

// Custom Template 타입 정의
interface CustomTemplate {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  templateUsageCount: number;
  templateCreatedAt: string;
  templateTags: TemplateTag[];
  templateCustomers: TemplateCustomer[];
}

// ApiResponse 타입 정의
type ApiResponse = CustomTemplate;

// dummyData 선언
const dummyData: ApiResponse = {
  templateId: 1,
  templateTitle: "직장인 템플릿",
  templateContent: "이 템플릿의 목적",
  templateUsageCount: 10,
  templateCreatedAt: "2024-10-25T01:22:27",
  templateTags: [{ tagId: 1, tagName: "직장인", tagColor: "GREEN" }],
  templateCustomers: [
    { customerId: 12, customerName: "홍길동", customerColor: "GREEN" },
    { customerId: 13, customerName: "김철수", customerColor: "PINK" },
    { customerId: 14, customerName: "이영희", customerColor: "SALMON" },
    { customerId: 15, customerName: "박수진", customerColor: "RED" },
  ],
};

interface CustomizedIdPageProps {
  params: {
    id: string;
  };
}

export default function CustomizedIdPage({ params }: CustomizedIdPageProps) {
  const router = useRouter();
  const { id } = params;
  const [customMessageTemplate] = useState<ApiResponse | null>(dummyData);

  const handleDelete = async () => {
    const token = "your-auth-token";
    try {
      const response = await deleteCustomTemplateAPI({
        token,
        templateId: Number(id),
      });
      if (response.code === "S10000") {
        router.push("/customized");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleNew = () => {
    router.push("/customized/new");
  };

  return (
    <div className="page-container">
      <Header title="커스텀" showBackIcon={true} />

      <div className="customized-info-list">
        <div className="customized-info">
          <p className="subheading">제목</p>
          <p className="body">{customMessageTemplate?.templateTitle}</p>
        </div>
        <div className="customized-info">
          <p className="subheading">고객</p>
          <div className="customized-info_tag-list">
            {customMessageTemplate?.templateCustomers.map((tag) => (
              <FilledTag
                key={tag.customerId}
                color={tag.customerColor}
                tagName={tag.customerName}
              />
            ))}
          </div>
        </div>
        <div className="customized-info">
          <p className="subheading">태그</p>
          <div className="customized-info_tag-list">
            {customMessageTemplate?.templateTags.map((tag) => (
              <BorderTag
                key={tag.tagId}
                color={tag.tagColor}
                tagName={tag.tagName}
              />
            ))}
          </div>
        </div>
        <div className="customized-info">
          <div className="customized-info_message-body">
            {customMessageTemplate?.templateContent}
          </div>
        </div>
      </div>

      <div className="customized-detail_button-group">
        <button type="button" className="customized-detail_button">
          취소
        </button>
        <button type="button" className="customized-detail_button">
          AI로 작성
        </button>
        <button
          onClick={handleDelete}
          type="button"
          className="customized-detail_button"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
