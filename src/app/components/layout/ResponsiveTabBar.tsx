import "./ResponsiveTabBar.css";
import Image from "next/image";

export default function ResponsiveTabBar() {
  return (
    <div className="menu-bar">
      <div className="menu-bar__menu">
        <Image
          src="/assets/svg/File.svg"
          width={20}
          height={20}
          alt="템플릿_icon"
        />
        <p className="menu-bar_menu-text">템플릿</p>
      </div>
      <div className="menu-bar__menu">
        <Image
          src="/assets/svg/File.svg"
          width={20}
          height={20}
          alt="템플릿_icon"
        />
        <p className="menu-bar_menu-text">템플릿</p>
      </div>
      <div className="menu-bar__menu">
        <Image
          src="/assets/svg/File.svg"
          width={20}
          height={20}
          alt="템플릿_icon"
        />
        <p className="menu-bar_menu-text">템플릿</p>
      </div>
      <div className="menu-bar__menu">
        <Image
          src="/assets/svg/File.svg"
          width={20}
          height={20}
          alt="템플릿_icon"
        />
        <p className="menu-bar_menu-text">템플릿</p>
      </div>
    </div>
  );
}
