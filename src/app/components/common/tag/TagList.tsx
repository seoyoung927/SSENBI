"use client";

import { Tag } from "@/types/tag/Tag";
import "./TagList.css";
import BorderTag from "./BorderTag";
import { useState } from "react";

interface TagListProps {
  tags: Tag[];
  maxTagCount?: number;
}

export default function TagList({
  tags,
  maxTagCount = tags.length,
}: TagListProps) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="tag-list-wrapper">
      <ul className="tag-list" onClick={() => setIsOpened((prev) => !prev)}>
        {tags.slice(0, maxTagCount).map((tag) => (
          <li key={tag.tagName}>
            <BorderTag color={tag.tagColor} tagName={tag.tagName} />
          </li>
        ))}
        {tags.length > maxTagCount && (
          <li className="tag-list-remained">{`+${tags.length - maxTagCount}`}</li>
        )}
      </ul>
      {isOpened && (
        <>
          <div className="tag-list-popup">
            <ul className="tag-list">
              {tags.map((tag) => (
                <li key={tag.tagName}>
                  <BorderTag color={tag.tagColor} tagName={tag.tagName} />
                </li>
              ))}
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
