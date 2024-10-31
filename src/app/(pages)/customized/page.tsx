"use client";

import { useState } from "react";
import "./page.css";
import Header from "@/app/components/layout/Header";
import ContentCard from "@/app/components/common/card/ContentCard";
import { TagColorTypes } from "@/types/tag/tagTypes";
import FloatingMenuButton from "@/app/components/common/button/FloatingMenuButton";
import Link from "next/link";

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
  image: string;
}

// ApiResponse 타입 정의
type ApiResponse = CustomTemplate[];

// dummyData 선언
const dummyData: ApiResponse = [
  {
    templateId: 1,
    templateTitle: "직장인 템플릿",
    templateContent: "이 템플릿의 목적",
    templateUsageCount: 10,
    templateCreatedAt: "2024-10-25T01:22:27",
    templateTags: [{ tagId: 1, tagName: "직장인", tagColor: "GREEN" }],
    templateCustomers: [
      { customerId: 12, customerName: "홍길동", customerColor: "GREEN" },
    ],
    image: "https://ssenbi-bucket.s3.ap-northeast-2.amazonaws.com/guy.png",
  },
  {
    templateId: 2,
    templateTitle: "학생 템플릿",
    templateContent: "이 템플릿의 목적",
    templateUsageCount: 5,
    templateCreatedAt: "2024-10-26T01:22:27",
    templateTags: [{ tagId: 2, tagName: "학생", tagColor: "PINK" }],
    templateCustomers: [
      { customerId: 13, customerName: "김철수", customerColor: "PINK" },
    ],
    image: "https://ssenbi-bucket.s3.ap-northeast-2.amazonaws.com/guy.png",
  },
  {
    templateId: 3,
    templateTitle: "자동차 템플릿",
    templateContent: "이 템플릿의 목적",
    templateUsageCount: 3,
    templateCreatedAt: "2024-10-27T01:22:27",
    templateTags: [{ tagId: 3, tagName: "자동차", tagColor: "SALMON" }],
    templateCustomers: [
      { customerId: 14, customerName: "이영희", customerColor: "SALMON" },
    ],
    image: "https://ssenbi-bucket.s3.ap-northeast-2.amazonaws.com/guy.png",
  },
  {
    templateId: 4,
    templateTitle: "단골 고객 템플릿",
    templateContent: "이 템플릿의 목적",
    templateUsageCount: 8,
    templateCreatedAt: "2024-10-28T01:22:27",
    templateTags: [{ tagId: 4, tagName: "단골 고객", tagColor: "RED" }],
    templateCustomers: [
      { customerId: 15, customerName: "박수진", customerColor: "RED" },
    ],
    image: "https://ssenbi-bucket.s3.ap-northeast-2.amazonaws.com/guy.png",
  },
];

export default function CustomizedPage() {
  const [filteredCustomMessageTemplates] = useState<ApiResponse | null>(
    dummyData,
  );

  // useEffect(() => {
  //   const fetchCustomMessage = async () => {
  //     try {
  //       const token = "ACCESS_TOKEN";
  //       const data = await getCustomTemplatesAPI({ token });
  //       setFilteredMessageTemplates(data.result[0]?.generalTemplates);
  //     } catch (error) {
  //       console.error("Error fetching message:", error);
  //     }
  //   };

  //   fetchCustomMessage();
  // }, []);

  return (
    <div className="page-container">
      <Header title="커스텀" />

      {filteredCustomMessageTemplates?.map((message) => (
        <Link
          key={message?.templateId}
          href={`/customized/${message?.templateId}`}
        >
          <ContentCard
            imgSrc={message?.image}
            title={message?.templateTitle}
            content={message?.templateContent}
          />
        </Link>
      ))}

      {/* TODO: 이거 바꿔야함 */}
      <FloatingMenuButton>
        <div>
          <ul>
            <Link href="/message/new">
              <li>커스텀 추가하기</li>
            </Link>
          </ul>
        </div>
      </FloatingMenuButton>
    </div>
  );
}
