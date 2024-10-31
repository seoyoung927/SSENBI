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

  const handleSettingsClick = () => {
    router.push("/auth/modify");
  };

  const handleCustomerClick = () => {
    router.push("/customer");
  };

  const handleMessageClick = () => {
    router.push("/message");
  };

  return (
    <div className="user-info-card">
      <div className="user-info_name-container">
        <span className="heading user-info_name">{name}</span>
        <div className="user-info_icon" onClick={handleSettingsClick}>
          <SettingIcon />
        </div>
      </div>
      <div className="user-info_count-container">
        <span
          className="user-info_count body-medium"
          onClick={handleCustomerClick}
        >
          고객수 {customerCount}
        </span>
        <span
          className="user-info_count body-medium"
          onClick={handleMessageClick}
        >
          보낸 메시지 {sentMessageCount}
        </span>
      </div>
    </div>
  );
}
