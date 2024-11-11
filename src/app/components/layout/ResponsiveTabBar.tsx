"use client";

import "./ResponsiveTabBar.css";
import FileIcon from "@/app/assets/svg/File.svg";
import StarIcon from "@/app/assets/svg/Star.svg";
import UsersIcon from "@/app/assets/svg/Users.svg";
import SmileIcon from "@/app/assets/svg/Smile.svg";
import MessageIcon from "@/app/assets/svg/Message.svg";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ResponsiveTabBar() {
  const pathname = usePathname();
  const getClass = (path: string) =>
    pathname.includes(path) ? "svg-icon_selected" : "svg-icon_unselected";

  return (
    <div className="menu-bar">
      <Link
        prefetch={true}
        href="/template"
        className={`menu-bar__menu ${getClass("template")}`}
      >
        <FileIcon />
        <p className="menu-bar_menu-text">템플릿</p>
      </Link>
      <Link
        prefetch={true}
        href="/customized"
        className={`menu-bar__menu ${getClass("customized")}`}
      >
        <StarIcon />
        <p className="menu-bar_menu-text">커스텀</p>
      </Link>
      <Link
        prefetch={true}
        href="/customer"
        className={`menu-bar__menu ${getClass("customer")}`}
      >
        <UsersIcon />
        <p className="menu-bar_menu-text">고객</p>
      </Link>
      <Link
        prefetch={true}
        href="/message"
        className={`menu-bar__menu ${getClass("message")}`}
      >
        <MessageIcon />
        <p className="menu-bar_menu-text">메시지</p>
      </Link>
      <Link
        prefetch={true}
        href="/auth/mypage"
        className={`menu-bar__menu ${getClass("auth")}`}
      >
        <SmileIcon />
        <p className="menu-bar_menu-text">마이페이지</p>
      </Link>
    </div>
  );
}
