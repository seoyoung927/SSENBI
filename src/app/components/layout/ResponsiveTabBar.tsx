"use client";

import "./ResponsiveTabBar.css";
import FileIcon from "@/app/assets/svg/File.svg";
import StarIcon from "@/app/assets/svg/Star.svg";
import UsersIcon from "@/app/assets/svg/Users.svg";
import SmileIcon from "@/app/assets/svg/Smile.svg";
import MessageIcon from "@/app/assets/svg/Message.svg";

import { useState } from "react";

export default function ResponsiveTabBar() {
  const [isSelected, setIsSelected] = useState<boolean>(true);

  return (
    <div className="menu-bar">
      <div className="menu-bar__menu svg-icon_selected">
        <FileIcon />
        <p className="menu-bar_menu-text">템플릿</p>
      </div>

      <div className="menu-bar__menu svg-icon_unselected">
        <StarIcon />
        <p className="menu-bar_menu-text">스크랩</p>
      </div>
      <div className="menu-bar__menu svg-icon_unselected">
        <UsersIcon />
        <p className="menu-bar_menu-text">고객</p>
      </div>
      <div className="menu-bar__menu svg-icon_unselected">
        <MessageIcon />
        <p className="menu-bar_menu-text">{"메세지"}</p>
      </div>
      <div className="menu-bar__menu svg-icon_unselected">
        <SmileIcon />
        <p className="menu-bar_menu-text">{"마이페이지"}</p>
      </div>
    </div>
  );
}
