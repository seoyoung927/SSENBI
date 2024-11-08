"use client";

import { useState, useEffect } from "react";
import Header from "@/app/components/layout/Header";
import Link from "next/link";
import FloatingActionButton from "@/app/components/common/button/FloatingActionButton";
import CustomizedCard from "@/app/components/common/card/CustomizedCard";
import { useRouter } from "next/navigation";
import { TagType } from "@/types/tag/tagTypes";
import { getCustomTemplatesAPI } from "@/app/api/customized/customizedAPI";
import Cookies from "js-cookie";
import Image from "next/image";
import "./page.css";
import HashLoading from "@/app/components/common/loading/HashLoading";
import { CustomerType } from "@/types/customer/customerType";

// Custom Template 타입 정의
interface CustomTemplate {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  templateUsageCount: number;
  templateCreatedAt: string;
  templateTags: TagType[];
  templateCustomers: CustomerType[];
}

// ApiResponse 타입 정의
type ApiResponse = CustomTemplate[];

export default function CustomizedPage() {
  const [filteredCustomMessageTemplates, setFilteredMessageTemplates] =
    useState<ApiResponse>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const fetchCustomTemplates = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) return;

        const data = await getCustomTemplatesAPI({ token });
        console.log("customized data", data);
        setFilteredMessageTemplates(data.result);
      } catch (error) {
        console.error("Error fetching message:", error);
        alert("커스텀 메세지 요청에서 오류가 발생하였습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomTemplates();
  }, []);

  const handleNewTemplate = () => {
    router.push("/customized/create");
  };

  if (isLoading) {
    return <HashLoading />;
  }

  return (
    <div className="page-container">
      <Header title="커스텀" />

      {filteredCustomMessageTemplates &&
      filteredCustomMessageTemplates.length > 0 ? (
        filteredCustomMessageTemplates.map((message) => (
          <Link
            key={message.templateId}
            href={`/customized/${message.templateId}`}
          >
            <CustomizedCard
              title={message?.templateTitle}
              content={message?.templateContent}
              tags={message?.templateTags}
              customers={message?.templateCustomers}
            />
          </Link>
        ))
      ) : (
        <div className="flex-container">
          <div className="empty-message">
            <p className="body-medium">새로운 메세지를 추가해주세요</p>
            <Image
              src="/assets/images/messageIcon.png"
              fill
              loading="lazy"
              alt="메세지 icon"
            />
          </div>
        </div>
      )}

      <FloatingActionButton onClick={handleNewTemplate} text={"커스텀 추가"} />
    </div>
  );
}
