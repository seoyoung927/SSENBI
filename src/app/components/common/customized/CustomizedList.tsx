"use client";

import Link from "next/link";
import CustomizedCard from "@/app/components/common/card/CustomizedCard";
import Image from "next/image";
import "./CustomizedList.css";
import SortSelect from "@/app/components/common/select/SortSelect";
import {
  SortOptionKeys,
  SORTOPTIONS,
} from "@/types/customized/customizedTypes";
import { CustomerType } from "@/types/customer/customerType";
import { TagType } from "@/types/tag/tagTypes";
import { useEffect, useState } from "react";
import { getCustomTemplatesAPI } from "@/app/api/customized/customizedAPI";
import { HashLoader } from "react-spinners";
import Cookies from "js-cookie";
import TagList from "../tag/TagList";
import CustomerTagList from "../tag/CustomerTagList";

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

export default function CustomizedList() {
  const [curSortOption, setCurSortOption] = useState<SortOptionKeys>("생성순");
  const [templates, setTemplates] = useState<ApiResponse>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<ApiResponse>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCustomers, setSelectedCustomers] = useState<CustomerType[]>(
    [],
  );
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

  useEffect(() => {
    const fetchCustomTemplates = async () => {
      try {
        const { result } = await getCustomTemplatesAPI({
          sort: SORTOPTIONS[curSortOption],
        });
        console.log(result);
        setTemplates(result);
      } catch (error) {
        console.error("Error fetching message:", error);
        alert("커스텀 메세지 요청에서 오류가 발생하였습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomTemplates();
  }, [curSortOption]);

  useEffect(() => {
    const filteredByCustomers =
      selectedCustomers.length === 0
        ? templates
        : templates.filter((template) =>
            selectedCustomers.every((customer) =>
              template.templateCustomers.some(
                (templateCustomer) =>
                  templateCustomer.customerId === customer.customerId,
              ),
            ),
          );
    const filteredByTags =
      selectedTags.length === 0
        ? filteredByCustomers
        : filteredByCustomers.filter((template) =>
            selectedTags.every((tag) =>
              template.templateTags.some(
                (templateTag) => templateTag.tagId === tag.tagId,
              ),
            ),
          );

    setFilteredTemplates(filteredByTags);
  }, [selectedCustomers, selectedTags, templates]);

  if (isLoading) {
    return (
      <div className="loading_container">
        <HashLoader color="#008fff" size={150} />
      </div>
    );
  }

  const handleSortChange = (key: keyof typeof SORTOPTIONS) => {
    setCurSortOption(key);
  };

  return (
    <div className="customiedList-container">
      <div className="customized_sort-container">
        <div className="customized-filters">
          <TagList tags={selectedTags} setTags={setSelectedTags} />
          <CustomerTagList
            customers={selectedCustomers}
            setCustomers={setSelectedCustomers}
          />
        </div>
        <SortSelect
          curOption={curSortOption}
          options={Object.keys(SORTOPTIONS)}
          onChange={(selectedLabel) =>
            handleSortChange(selectedLabel as keyof typeof SORTOPTIONS)
          }
        />
      </div>

      {filteredTemplates && filteredTemplates.length > 0 ? (
        filteredTemplates.map((message) => (
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
    </div>
  );
}
