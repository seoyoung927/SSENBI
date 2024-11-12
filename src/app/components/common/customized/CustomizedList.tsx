"use client";

import Link from "next/link";
import CustomizedCard from "@/app/components/common/card/CustomizedCard";
import Image from "next/image";
import "./CustomizedList.css";
import SortSelect from "@/app/components/common/select/SortSelect";
import {
  CustomMessagesType,
  SortOptionKeys,
  SORTOPTIONS,
} from "@/types/customized/customizedTypes";
import { useEffect, useState } from "react";
import {
  getCustomTemplatesAPI,
  postCustomTemplateDuplicationAPI,
} from "@/app/api/customized/customizedAPI";
import { HashLoader } from "react-spinners";
import TagList from "../tag/TagList";
import CustomerTagList from "../tag/CustomerTagList";
import { CustomerType } from "@/types/customer/customerType";
import { TagType } from "@/types/tag/tagTypes";
import FilterIcon from "@/app/assets/svg/Filter.svg";
import SearchBar from "../input/SearchBar";

// ApiResponse 타입 정의
type ApiResponse = CustomMessagesType[];

export default function CustomizedList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [curSortOption, setCurSortOption] = useState<SortOptionKeys>("생성순");
  const [searchValue, setSearchValue] = useState<string>("");
  const [templates, setTemplates] = useState<ApiResponse>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<ApiResponse>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<CustomerType[]>(
    [],
  );

  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

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

  useEffect(() => {
    fetchCustomTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curSortOption]);

  useEffect(() => {
    const filtered = templates.filter((template) => {
      const searchIncluded =
        template.templateTitle.includes(searchValue) ||
        template.templateContent.includes(searchValue);
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

      if (!searchIncluded) return false;

      return (
        (selectedCustomers.length === 0 && selectedTags.length === 0) ||
        customerIncluded ||
        tagIncluded
      );
    });

    setFilteredTemplates(filtered);
  }, [searchValue, selectedCustomers, selectedTags, templates]);

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
        <div className="customized-search-bar">
          <SearchBar onChange={setSearchValue} />
          <SortSelect
            curOption={curSortOption}
            options={Object.keys(SORTOPTIONS)}
            onChange={(selectedLabel) =>
              handleSortChange(selectedLabel as keyof typeof SORTOPTIONS)
            }
          />
        </div>
        <div className="customized-filters">
          <div>
            <FilterIcon
              className={
                selectedCustomers.length === 0 && selectedTags.length === 0
                  ? "filterIcon"
                  : "selected-filterIcon"
              }
            />
          </div>
          <div className="filter">
            <TagList tags={selectedTags} setTags={setSelectedTags} />
          </div>
          <div className="filter">
            <CustomerTagList
              customers={selectedCustomers}
              setCustomers={setSelectedCustomers}
            />
          </div>
        </div>
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
