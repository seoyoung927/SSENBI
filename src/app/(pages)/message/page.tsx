"use client";

import SearchBar from "@/app/components/common/input/SearchBar";
import MessageCard from "@/app/components/common/card/MessageCard";
import { useEffect, useState } from "react";
import "./page.css";
import FloatingMenuButton from "@/app/components/common/button/FloatingMenuButton";
import Link from "next/link";
import Header from "@/app/components/layout/Header";
import { getEveryMessagesAPI } from "@/app/api/message/messageAPI";
import { MessageCardPropsType } from "@/types/message/messageTypes";
import { debounce } from "lodash"; // Optional, if you have lodash

export default function MessagePage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [messageList, setMessageList] = useState<MessageCardPropsType[]>([]);

  useEffect(() => {
    fetchMessageList();
  }, []);

  const fetchMessageList = async (keyword?: string) => {
    try {
      const response = await getEveryMessagesAPI(keyword);
      console.log("Fetched Message List:", response);
      setMessageList(response.result);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSearchChange = debounce((value: string) => {
    setSearchValue(value);
    fetchMessageList(value);
  }, 300);

  return (
    <div className="page-container">
      <Header title="메시지" />

      <div className="search-bar-container">
        <SearchBar
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="검색어 (이름, 제목, 태그)"
        />
      </div>

      <div className="message-list">
        {messageList &&
          messageList.map((message) => (
            <Link
              href={`/message/${message.messageId}`}
              key={message.messageId}
            >
              <MessageCard
                messageId={message.messageId}
                messageContent={message.messageContent}
                messageTags={message.messageTags}
                messageCustomers={message.messageCustomers}
                messageSendAt={message.messageSendAt}
              />
            </Link>
          ))}

        <FloatingMenuButton>
          <div>
            <ul>
              <Link href="/message/create">
                <li>메세지 작성하기</li>
              </Link>
            </ul>
          </div>
        </FloatingMenuButton>
      </div>
    </div>
  );
}
