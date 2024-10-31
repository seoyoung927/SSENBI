"use client";

import UserInfoCard from "@/app/components/common/card/UserInfoCard";
import Header from "@/app/components/layout/Header";
import { useEffect, useState } from "react";
import "./page.css";
import TagList from "@/app/components/common/tag/TagList";

export default function MypagePage() {
  // todo : useState로 tags, customer 관리하기

  useEffect(() => {
    // 로그인 유무 확인해서 안되어 있으면 login 페이지로 보내기!
  }, []);

  return (
    <div className="page-container">
      <Header title="마이페이지" />
      <div className="mypage-user-container">
        <UserInfoCard name="김싸피" customerCount={0} sentMessageCount={0} />
        <div className="mypage-content-container">
          <p className="body-strong">태그 0</p>
          {/* 태그 리스트 */}
          <TagList
            tags={[
              {
                tagName: "test",
                tagColor: "BLUE",
                tagId: 0,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
