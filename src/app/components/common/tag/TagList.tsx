"use client";

import { Tag } from "@/types/tag/Tag";
import "./TagList.css";
import BorderTag from "./BorderTag";

interface TagListProps {
  tags: Tag[];
  maxTagCount?: number;
}

export default function TagList({
  tags,
  maxTagCount = tags.length,
}: TagListProps) {
  return (
    <ul className="tag-list">
      {tags.slice(0, maxTagCount).map((tag) => (
        <li key={tag.tagName}>
          <BorderTag color={tag.tagColor} tagName={tag.tagName} />
        </li>
      ))}
      {tags.length > maxTagCount && (
        <li className="tag-list-remained">{`+${tags.length - maxTagCount}`}</li>
      )}
    </ul>
  );
}
