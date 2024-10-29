"use client";
/*
필수!!
  모든 페이지는 첫 줄에
 <div className="page-container"> 필수
 bottom 바 스타일 조정때문!! 
*/

import UserInfoCard from "@/app/components/common/card/UserInfoCard";
import Header from "@/app/components/layout/Header";

export default function Mypage() {
  return (
    <div className="page-container">
      <Header title="마이페이지" />

      <UserInfoCard name="김싸피" customerCount={0} sentMessageCount={0} />
    </div>
  );
}
