"use client";

import React, { useState } from "react";
import "./page.css";
import BorderTag from "@/app/components/common/tag/BorderTag";
import Header from "@/app/components/layout/Header";
import { TagColorTypes } from "@/types/tag/tagTypes";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { deleteMessageAPI, getMessageAPI } from "@/app/api/message/messageAPI";
import { useRouter } from "next/navigation";

interface Tag {
  tagId: number;
  tagName: string;
  tagColor: TagColorTypes;
}

interface Customer {
  customerId: number;
  customerName: string;
  customerPhoneNumber: string;
  customerColor: TagColorTypes;
}

interface ApiResponse {
  messageId: number;
  title: string;
  messageContent: string;
  sendedAt: string;
  tags: Tag[];
  customers: Customer[];
}

interface MessageIdPageProps {
  params: {
    id: string;
  };
}

const dummyData: ApiResponse = {
  messageId: 1,
  title: "제목",
  messageContent: "속닥속닥",
  sendedAt: "2024년 10월 25일 1시 48분",
  tags: [
    { tagId: 1, tagName: "직장인", tagColor: "RED" },
    { tagId: 2, tagName: "학생", tagColor: "BLUE" },
  ],
  customers: [
    {
      customerId: 1,
      customerName: "홍길동",
      customerPhoneNumber: "010-1234-5678",
      customerColor: "GREEN",
    },
    {
      customerId: 2,
      customerName: "임꺽정",
      customerPhoneNumber: "010-9876-5432",
      customerColor: "YELLOW",
    },
  ],
};

const MessageId = ({ params }: MessageIdPageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const { id } = params;
  const [messageData] = useState<ApiResponse | null>(dummyData);
  // const [messageData, setMessageData] = useState<ApiResponse | null>(null);

  // useEffect(() => {
  //   const fetchMessage = async () => {
  //     try {
  //       const token = "your-auth-token";
  //       const data = await getMessageAPI({ token, messageId: id });
  //       setMessageData(data);
  //     } catch (error) {
  //       console.error("Error fetching message:", error);
  //     }
  //   };

  //   fetchMessage();
  // // }, [id]);

  const handleDelete = async () => {
    const token = "your-auth-token";
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

export default MessageId;
