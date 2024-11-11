"use client";

import React, { useState, useEffect } from "react";
import BorderTag from "@/app/components/common/tag/BorderTag";
import Header from "@/app/components/layout/Header";
import { TagType } from "@/types/tag/tagTypes";
import { deleteMessageAPI, getMessageAPI } from "@/app/api/message/messageAPI";
import { useRouter } from "next/navigation";
import { CustomerType } from "@/types/customer/customerType";
import Cookies from "js-cookie";
import "./page.css";

interface ApiResponse {
  messageContent: string;
  messageCustomers: CustomerType[];
  messageId: number;
  messageSendAt: string;
  messageTags: TagType[];
}

interface MessageIdPageProps {
  params: {
    messageId: string;
  };
}

export default function MessageIdPage({ params }: MessageIdPageProps) {
  const router = useRouter();
  const { messageId } = params;
  const [messageData, setMessageData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) return;

        const data = await getMessageAPI(messageId);
        console.log(data);

        setMessageData(data.result);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };

    fetchMessage();
  }, [messageId]);

  const handleDelete = async () => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    try {
      const response = await deleteMessageAPI(messageId);

      if (response.code === "S10000") {
        router.push("/message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="page-container">
      <Header title={`보낸 메시지`} showBackIcon={true} />

      <div className="message-info-list">
        <div className="message-info">
          <p className="subheading">보낸 시간</p>
          <p className="body">{messageData?.messageSendAt}</p>
        </div>
        <div className="message-info">
          <p className="subheading">보낸사람</p>
          <p className="body">
            {/* {messageData?.messageCustomers
              .map((customer) => customer.customerName)
              .join(", ")} */}
          </p>
        </div>
        <div className="message-info">
          <p className="subheading">태그</p>
          <div className="message-info_tag-list">
            {messageData?.messageTags.map((tag) => (
              <BorderTag
                key={tag.tagName}
                color={tag.tagColor}
                tagName={tag.tagName}
              />
            ))}
          </div>
        </div>
        <div className="message-info">
          <p className="subheading">내용</p>
          <p className="body">{messageData?.messageContent}</p>
        </div>

        <button
          type="button"
          className="message-info_delete-button"
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
