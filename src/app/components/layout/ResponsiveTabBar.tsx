"use client";

import "./ResponsiveTabBar.css";
import FileIcon from "@/app/assets/svg/File.svg";
import StarIcon from "@/app/assets/svg/Star.svg";
import UsersIcon from "@/app/assets/svg/Users.svg";
import SmileIcon from "@/app/assets/svg/Smile.svg";
import MessageIcon from "@/app/assets/svg/Message.svg";

import { useRouter, usePathname } from "next/navigation";

export default function ResponsiveTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const getClass = (path: string) =>
    pathname.includes(path) ? "svg-icon_selected" : "svg-icon_unselected";

  return (
    <div className="menu-bar">
      <div
        className={`menu-bar__menu ${getClass("template")}`}
        onClick={() => router.push("/template")}
      >
        <FileIcon />
        <p className="menu-bar_menu-text">템플릿</p>
      </div>

      <div
        className={`menu-bar__menu ${getClass("customized")}`}
        onClick={() => router.push("/customized")}
      >
        <StarIcon />
        <p className="menu-bar_menu-text">커스텀</p>
      </div>

      <div
        className={`menu-bar__menu ${getClass("customer")}`}
        onClick={() => router.push("/customer")}
      >
        <UsersIcon />
        <p className="menu-bar_menu-text">고객</p>
      </div>

      <div
        className={`menu-bar__menu ${getClass("message")}`}
        onClick={() => router.push("/message")}
      >
        <MessageIcon />
        <p className="menu-bar_menu-text">메시지</p>
      </div>

      <div
        className={`menu-bar__menu ${getClass("auth")}`}
        onClick={() => router.push("/auth/mypage")}
      >
        <SmileIcon />
        <p className="menu-bar_menu-text">마이페이지</p>
      </div>
    </div>
  );
}
