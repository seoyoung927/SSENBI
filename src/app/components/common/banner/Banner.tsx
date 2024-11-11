import React from "react";
import "./Banner.css";
import Image from "next/image";

export default function NavigationBar() {
  return (
    <div className="banner_container">
      <Image
        src="/assets/images/ssenbi_banner.gif"
        alt="banner"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
