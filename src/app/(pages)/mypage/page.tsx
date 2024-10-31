"use client";

import UserInfoCard from "@/app/components/common/card/UserInfoCard";
import Header from "@/app/components/layout/Header";
import { useEffect } from "react";
import "./page.css";

export default function Mypage() {
  useEffect(() => {
    // 로그인 유무 확인해서 안되어 있으면 login 페이지로 보내기!
  }, []);

  return (
    <div className="page-container">
      <Header title="마이페이지" />
      <div className="mypage-container">
        <UserInfoCard name="김싸피" customerCount={0} sentMessageCount={0} />
      </div>
    </div>
  );
}
