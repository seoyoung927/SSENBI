"use client";

import React, { useState } from "react";
import "./page.css";
import BorderTag from "@/app/components/common/tag/BorderTag";
import Header from "@/app/components/layout/Header";
import { TagType, CustomerType } from "@/types/tag/tagTypes";
import { deleteMessageAPI } from "@/app/api/message/messageAPI";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface ApiResponse {
  messageId: number;
  title: string;
  messageContent: string;
  sendedAt: string;
  tags: TagType[];
  customers: CustomerType[];
}

interface MessageIdPageProps {
  params: {
    id: string;
  };
}

const MessageIdPage = ({ params }: MessageIdPageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const { id } = params;
  const [messageData] = useState<ApiResponse>();
  // const [messageData, setMessageData] = useState<ApiResponse | null>(null);

  // useEffect(() => {
  //   const fetchMessage = async () => {
  //     try {
  //       const token = Cookies.get("accessToken");
  //       if (!token) return;

  //       const data = await getMessageAPI({ token, messageId: id });
  //       setMessageData(data);
  //     } catch (error) {
  //       console.error("Error fetching message:", error);
  //     }
  //   };

  //   fetchMessage();
  // }, [id]);

  const handleDelete = async () => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    try {
      const response = await deleteMessageAPI({
        token,
        messageId: id,
      });
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
          <p className="subheading">보낸 시작</p>
          <p className="body">{messageData?.sendedAt}</p>
        </div>
        <div className="message-info">
          <p className="subheading">보낸사람</p>
          <p className="body">
            {messageData?.customers
              .map((customer) => customer.customerName)
              .join(", ")}
          </p>
        </div>
        <div className="message-info">
          <p className="subheading">태그</p>
          <div className="message-info_tag-list">
            {messageData?.tags.map((tag) => (
              <BorderTag
                key={tag.tagId}
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
};

export default MessageIdPage;
