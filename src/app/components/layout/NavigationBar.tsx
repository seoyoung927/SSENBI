"use client";

import React, { useState } from "react";
import "./NavigationBar.css";

interface NavigationBarProps {
  tabs: string[];
  onTabChange: (index: number) => void;
}

export default function NavigationBar({
  tabs,
  onTabChange,
}: NavigationBarProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabChange(index);
  };

  return (
    <div className="navigation-bar">
      <nav className="tab-menu horizontal-scroll">
        <ul className="tab-list ">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={`tab-item ${activeTab === index ? "active" : ""}`}
              onClick={() => handleTabClick(index)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
