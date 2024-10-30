"use client";

import { Tag } from "@/types/tag/Tag";
import "./TagList.css";
import BorderTag from "./BorderTag";
import { useRef, useState } from "react";
import XIcon from "@/app/assets/svg/X.svg";

interface TagListProps {
  tags: Tag[];
  maxTagCount?: number;
}

export default function TagList({
  tags,
  maxTagCount = tags.length,
}: TagListProps) {
  const [activeTags, setActiveTags] = useState<Tag[]>(tags);
  const [isOpened, setIsOpened] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const newTagName = event.currentTarget.value.trim();
      if (newTagName) {
        const isDuplicate = activeTags.some(
          (tag) => tag.tagName.toLowerCase() === newTagName.toLowerCase(),
        );
        if (!isDuplicate) {
          const colors = [
            "GREEN",
            "LIME",
            "SKYBLUE",
            "BLUE",
            "PURPLE",
            "PINK",
            "SALMON",
            "BEIGE",
            "GRAY",
          ];
          const color = colors[Math.floor(Math.random() * colors.length)];
          setActiveTags((prev) => [
            ...prev,
            { tagName: newTagName, tagColor: color } as Tag,
          ]);
          event.currentTarget.value = ""; // 입력 필드를 초기화합니다.
        }
      }
    }
  }

  return (
    <div className="tag-list-wrapper">
      <ul
        className="tag-list pointer"
        onClick={() => setIsOpened((prev) => !prev)}
      >
        {activeTags.slice(0, maxTagCount).map((tag) => (
          <li key={tag.tagName}>
            <BorderTag color={tag.tagColor} tagName={tag.tagName} />
          </li>
        ))}
        {activeTags.length > maxTagCount && (
          <li className="tag-list-remained">{`+${activeTags.length - maxTagCount}`}</li>
        )}
      </ul>
      {isOpened && (
        <>
          <div className="tag-list-popup">
            <ul className="tag-list">
              {activeTags.map((tag, index) => (
                <li
                  key={tag.tagName}
                  className={`tag-list-item tag-list-tag-${tag.tagColor}`}
                >
                  <span>#{tag.tagName}</span>
                  <button
                    className="tag-list-delete"
                    onClick={() => {
                      console.log("Delete tag");
                      setActiveTags((prev) => prev.toSpliced(index, 1));
                    }}
                  >
                    <XIcon viewBox="0 0 20 20" />
                  </button>
                </li>
              ))}
              <li className="tag-list-input-wrapper body-small">
                <input
                  type="text"
                  ref={inputRef}
                  autoFocus
                  placeholder="태그 추가"
                  onKeyDown={handleKeyDown} // 이 부분을 추가합니다.
                />
              </li>
            </ul>
          </div>
          <div
            className="tag-list-overlay"
            onClick={() => setIsOpened(false)}
          />
        </>
      )}
    </div>
  );
}
