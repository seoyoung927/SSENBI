"use client";

import "./TabBar.css";

interface TabBarProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabBar({ tabs, activeTab, setActiveTab }: TabBarProps) {
  const handleClick = (tab: string) => () => setActiveTab(tab);

  return (
    <div className="tab-ui">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-button ${activeTab === tab ? "active" : ""}`}
          onClick={handleClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
