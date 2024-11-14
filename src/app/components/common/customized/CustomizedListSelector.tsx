"use client";

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
import { HashLoader } from "react-spinners";
import { getCustomTemplatesAPI } from "@/app/api/customized/customizedAPI";
import Cookies from "js-cookie";

// ApiResponse 타입 정의
type ApiResponse = CustomMessagesType[];

interface CustomizedListSelectorProps {
  getCustomTemplate: (customId: number) => void;
}

export default function CustomizedListSelector({
  getCustomTemplate,
}: CustomizedListSelectorProps) {
  const [curSortOption, setCurSortOption] = useState<SortOptionKeys>("최근순");
  const [filteredMessages, setFilteredMessages] = useState<ApiResponse>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomTemplates = async () => {
      try {
        const token = Cookies.get("accessToken");

        const data = await getCustomTemplatesAPI({
          token,
          sort: SORTOPTIONS[curSortOption],
        });
        console.log("customized data", data);
        setFilteredMessages(data.result);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomTemplates();
  }, [curSortOption]);

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
        <SortSelect
          curOption={curSortOption}
          options={Object.keys(SORTOPTIONS)}
          onChange={(selectedLabel) =>
            handleSortChange(selectedLabel as keyof typeof SORTOPTIONS)
          }
        />
      </div>

      {filteredMessages && filteredMessages.length > 0 ? (
        filteredMessages.map((message) => (
          <div
            onClick={() => getCustomTemplate(message.templateId)}
            className="customized-container"
            key={message.templateId}
          >
            <CustomizedCard customMessage={message} />
          </div>
        ))
      ) : (
        <div className="empty-message">
          <p className="body-small">{"새로운 메세지를 \n추가해주세요"}</p>
          <Image
            src="/assets/images/messageIcon.png"
            fill
            loading="lazy"
            alt="메세지 icon"
          />
        </div>
      )}
    </div>
  );
}
