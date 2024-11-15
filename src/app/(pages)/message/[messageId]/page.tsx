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
import formatDateTime from "@/utils/formatDateTime";

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
        const data = await getMessageAPI(messageId);
        console.log(data);

        // setMessageData(data.result);
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
    <div className="page-container flex-column">
      <Header title={`보낸 메시지`} showBackIcon={true} />

      <div className="message-body">
        <p className="message-info-detail body-medium">
          {messageData?.messageContent}
        </p>
      </div>
      <div className="message-info-wrapper">
        <div className="message-info">
          <div className="message-info-label">
            <span className="message-info-title body-medium">태그</span>
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
        </div>
        <div className="message-info">
          <div className="message-info-label">
            <span className="message-info-title body-medium">보낸 시간</span>
            <span>{formatDateTime(messageData?.messageSendAt)}</span>
          </div>
        </div>
        <div className="message-info">
          <div className="message-info-label">
            <span className="message-info-title body-medium">받는 사람</span>
            <span>
              {messageData?.messageCustomers
                .map((customer) => customer.customerName)
                .join(", ")}
            </span>
          </div>
        </div>
      </div>

      <div className="button-group">
        <button
          type="button"
          className="button delete body-strong"
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
