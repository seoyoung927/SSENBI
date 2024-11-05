"use client";

import SearchBar from "@/app/components/common/input/SearchBar";
import MessageCard from "@/app/components/common/card/MessageCard";
import { useState } from "react";
import "./page.css";
import FloatingMenuButton from "@/app/components/common/button/FloatingMenuButton";
import Link from "next/link";
import Header from "@/app/components/layout/Header";

export default function MessagePage() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    if (searchValue != value) console.log("debounce Value", value);
  };
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

      {/* todo : tag List */}

      <div className="message-list">
        <Link href="/message/1">
          <MessageCard
            title="TEST"
            content="asdfghjkl"
            tags={[]}
            customers={[]}
            created_at="8월 12일 8시 23분"
          />
        </Link>

        <Link href="/message/2">
          <MessageCard
            title="TEST"
            content="asdfghjkl"
            tags={[
              { tagId: 2, tagName: "test", tagColor: "RED" },
              { tagId: 3, tagName: "test", tagColor: "RED" },
            ]}
            customers={[]}
            created_at="8월 12일 8시 23분"
          />
        </Link>

        <Link href="/message/3">
          <MessageCard
            title="TEST"
            content="asdfghjkl"
            tags={[]}
            customers={[]}
            created_at="8월 12일 8시 23분"
          />
        </Link>

        <FloatingMenuButton>
          <div>
            <ul>
              <Link href="/message/create">
                <li>메세지 작성하기</li>
              </Link>
              <Link href="/message/create/ai">
                <li>AI 도움 받아 작성하기</li>
              </Link>
            </ul>
          </div>
        </FloatingMenuButton>
      </div>
    </div>
  );
}
