"use client";

import "./ResponsiveTabBar.css";
import FileIcon from "@/app/assets/svg/File.svg";
import StarIcon from "@/app/assets/svg/Star.svg";
import UsersIcon from "@/app/assets/svg/Users.svg";
import SmileIcon from "@/app/assets/svg/Smile.svg";

import { useState } from "react";

export default function ResponsiveTabBar() {
  const [isSelected, setIsSelected] = useState<boolean>(true);

  return (
    <div className="menu-bar">
      <div className="menu-bar__menu svg-icon_seleted">
        <FileIcon />
        <p className="menu-bar_menu-text">템플릿</p>
      </div>

      <div className="menu-bar__menu svg-icon_unseleted">
        <StarIcon />
        <p className="menu-bar_menu-text">스크랩</p>
      </div>
      <div className="menu-bar__menu svg-icon_unseleted">
        <UsersIcon />
        <p className="menu-bar_menu-text">고객</p>
      </div>
      <div className="menu-bar__menu svg-icon_unseleted">
        <SmileIcon />
        <p className="menu-bar_menu-text">{"마이페이지"}</p>
      </div>
    </div>
  );
}
