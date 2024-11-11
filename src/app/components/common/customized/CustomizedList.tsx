"use client";

import Link from "next/link";
import CustomizedCard from "@/app/components/common/card/CustomizedCard";
import Image from "next/image";
import "./CustomizedList.css";
import SortSelect from "@/app/components/common/select/SortSelect";
import {
  CustomMessagesType,
  GetCustomTemplatesParamsType,
  SortOptionKeys,
  SORTOPTIONS,
} from "@/types/customized/customizedTypes";
import { useEffect, useState } from "react";
import {
  getCustomTemplatesAPI,
  postCustomTemplateDuplicationAPI,
} from "@/app/api/customized/customizedAPI";
import { HashLoader } from "react-spinners";
import Cookies from "js-cookie";
import TagList from "../tag/TagList";
import CustomerTagList from "../tag/CustomerTagList";
import { CustomerType } from "@/types/customer/customerType";
import { TagType } from "@/types/tag/tagTypes";

// ApiResponse 타입 정의
type ApiResponse = CustomMessagesType[];

const fetchCustomTemplates = async ({
  page,
  size = 50,
  sort,
}: GetCustomTemplatesParamsType) => {
  return await getCustomTemplatesAPI({
    page,
    size,
    sort,
  });
};

export default function CustomizedList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [curSortOption, setCurSortOption] = useState<SortOptionKeys>("생성순");
  const [templates, setTemplates] = useState<ApiResponse>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<ApiResponse>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<CustomerType[]>(
    [],
  );
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

  useEffect(() => {
    fetchCustomTemplates();
  }, [curSortOption]);

  useEffect(() => {
    const filtered = templates.filter((template) => {
      const customerIncluded = selectedCustomers.some((customer) =>
        template.templateCustomers.some(
          (templateCustomer) =>
            templateCustomer.customerId === customer.customerId,
        ),
      );
      const tagIncluded = selectedTags.some((tag) =>
        template.templateTags.some(
          (templateTag) => templateTag.tagId === tag.tagId,
        ),
      );

      return (
        (selectedCustomers.length === 0 && selectedTags.length === 0) ||
        customerIncluded ||
        tagIncluded
      );
    });

    setFilteredTemplates(filtered);
  }, [selectedCustomers, selectedTags, templates]);

  const fetchCustomTemplates = async () => {
    try {
      const data = await getCustomTemplatesAPI({
        sort: SORTOPTIONS[curSortOption],
      });
      console.log("customized data", data);
      setTemplates(data.result);
    } catch (error) {
      console.error("Error fetching message:", error);
      alert("커스텀 메세지 요청에서 오류가 발생하였습니다.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSortChange = (key: keyof typeof SORTOPTIONS) => {
    setCurSortOption(key);
  };

  const duplicateCustomized = async (
    templateId: number,
    event: React.MouseEvent,
  ) => {
    event.preventDefault();
    try {
      const respose = await postCustomTemplateDuplicationAPI({
        templateId,
        isReplicateTagAndCustomer: true,
      });

      console.log("dupicate", respose);

      fetchCustomTemplates();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="loading_container">
        <HashLoader color="#008fff" size={150} />
      </div>
    );
  }

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

      {filteredTemplates.length > 0 ? (
        filteredTemplates.map((message) => (
          <Link
            key={message.templateId}
            href={`/customized/${message.templateId}`}
          >
            <CustomizedCard
              customMessage={message}
              duplicateCustomized={duplicateCustomized}
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
