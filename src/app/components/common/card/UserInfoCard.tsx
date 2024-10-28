"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "./UserInfoCard.css";
import SettingIcon from "@/app/assets/svg/Setting.svg";

interface UserInfoCardProps {
  name: string;
  customerCount: number;
  sentMessageCount: number;
}

export default function UserInfoCard({
  name,
  customerCount,
  sentMessageCount,
}: UserInfoCardProps) {
  const router = useRouter();

  return (
    <div className="user-info-card">
      <div className="user-info_name-container">
        <span className="heading user-info_name">{name}</span>
        <div
          className="user-info_icon"
          onClick={() => router.push("/mypage/modify")}
        >
          <SettingIcon />
        </div>
      </div>
      <div className="user-info_count-container">
        <span
          className="user-info_count body-medium"
          onClick={() => router.push("/customized")}
        >
          고객수 {customerCount}
        </span>
        <span
          className="user-info_count body-medium"
          onClick={() => router.push("/message")}
        >
          보낸 메시지 {sentMessageCount}
        </span>
      </div>
    </div>
  );
}
