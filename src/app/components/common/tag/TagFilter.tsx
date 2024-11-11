"use client";

import { TagType } from "@/types/tag/tagTypes";
import "./TagFilter.css";
import { useEffect, useState } from "react";
import { getTagsAPI } from "@/app/api/tag/tagAPI";
import XIcon from "@/app/assets/svg/X.svg";

interface TagFilterProps {
  selectedTags: TagType[];
  setSelectedTags: (tags: TagType[]) => void;
}

export default function TagFilter({
  selectedTags,
  setSelectedTags,
}: TagFilterProps) {
  const [tags, setTags] = useState<TagType[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const { result } = await getTagsAPI();

      setTags(result.tags);
    };
    fetchTags();
  }, []);

  const handleAddTag = (tag: TagType) => () => {
    if (selectedTags.includes(tag)) {
      return;
    }
    setSelectedTags([...selectedTags, tag]);
  };
  const handleDeleteTag = (tag: TagType) => () => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };
  const unselectedTags = tags.filter((tag) => !selectedTags.includes(tag));

  return (
    <div className="tag-filter-wrapper">
      <div className="body-small tag-filter-name">태그로 필터</div>
      <div className="tag-filter">
        {selectedTags.map((tag, index) => (
          <div
            key={index}
            className={`tag-item-button tag-filter-tag-${tag.tagColor}`}
            onClick={handleAddTag(tag)}
          >
            <span>{`#${tag.tagName}`}</span>
            <button
              className="tag-filter-delete"
              onClick={handleDeleteTag(tag)}
            >
              <XIcon viewBox="0 0 20 20" />
            </button>
          </div>
        ))}
        {unselectedTags.map((tag, index) => (
          <button
            key={index}
            className={`tag-item-button tag-filter-tag-${tag.tagColor}`}
            onClick={handleAddTag(tag)}
          >
            {`#${tag.tagName}`}
          </button>
        ))}
      </div>
    </div>
  );
}
