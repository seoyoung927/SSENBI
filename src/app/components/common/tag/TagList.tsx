"use client";

import "./TagList.css";
import BorderTag from "./BorderTag";
import { useEffect, useRef, useState } from "react";
import XIcon from "@/app/assets/svg/X.svg";
import MoreIcon from "@/app/assets/svg/More.svg";
import getRandomTagColor from "@/utils/getRandomTagColor";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Popover from "@radix-ui/react-popover";
import { TagType } from "@/types/tag/tagTypes";
import {
  deleteTagAPI,
  getTagsAPI,
  postTagAPI,
  putTagAPI,
} from "@/app/api/tag/tagAPI";

interface TagListProps {
  tags: TagType[];
  setTags: (tags: TagType[]) => void;
  maxTagCount?: number;
}

export default function TagList({
  tags = [],
  setTags,
  maxTagCount = Infinity,
}: TagListProps) {
  const [allTags, setAllTags] = useState<TagType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLUListElement>(null);
  const isEmpty = tags.length === 0;
  const [editedTag, setEditedTag] = useState<string>("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { result } = await getTagsAPI();

        setAllTags(result.tags);
      } catch (error) {
        console.error("태그 데이터 가져오는 중에 오류 발생: ", error);
      }
    };

    fetchTags();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isValidInput(event.currentTarget.value)) {
      const trimmedName = event.currentTarget.value.trim();
      const isDuplicate = allTags.some(
        (tag) => tag.tagName.toLowerCase() === trimmedName.toLowerCase(),
      );

      if (isDuplicate) {
        return;
      }
      createNewTag(trimmedName);
      event.currentTarget.value = "";
    }
  };
  const isValidInput = (name: string): boolean => {
    const trimmedName = name.trim();
    if (!trimmedName) return false;

    return tags.every(
      (tag) => tag.tagName.toLowerCase() !== trimmedName.toLowerCase(),
    );
  };
  const handleChangeEditingTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTag(e.target.value);
  };
  const handleAddTag = (tagId: number) => () => {
    const tag = allTags.find((item) => item.tagId === tagId);

    if (!tag) return;
    const isDuplicated = tags.some(
      (item) =>
        item.tagName.toLowerCase() === tag.tagName.toLowerCase() &&
        item.tagColor === tag.tagColor,
    );
    if (isDuplicated) {
      return;
    }

    setTags([...tags, tag]);
  };
  const createNewTag = async (name: string) => {
    const newTagInfo: Omit<TagType, "tagId"> = {
      tagName: name.trim(),
      tagColor: getRandomTagColor(),
    };

    try {
      const { result: newTag } = await postTagAPI(newTagInfo);

      setAllTags?.((prev) => [...prev, newTag]);
      setTags([...tags, newTag]);
    } catch {
      console.error("태그 생성 중 오류 발생");
    }
  };
  const handleEditTag = (tag: TagType, name: string) => async () => {
    try {
      const { result: newTag } = await putTagAPI({
        tagId: tag.tagId,
        tagName: name,
        tagColor: tag.tagColor,
      });

      setTags(
        tags.map((item) => (item.tagId === newTag.tagId ? newTag : item)),
      );
      setAllTags(
        allTags.map((item) => (item.tagId === newTag.tagId ? newTag : item)),
      );
    } catch (error) {
      console.error("태그 수정 중 오류 발생: ", error);
    }
  };
  const handleEditTagOnEnter =
    (tag: TagType, name: string) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleEditTag(tag, name)();
      }
    };
  const handleDeleteTagFromList = (id: number) => () => {
    setTags(tags.filter((item) => item.tagId !== id));
  };
  const handleDeleteTag = (tagId: number) => async () => {
    try {
      const { result } = await deleteTagAPI({ tagId });

      setTags(tags.filter((item) => item.tagId !== tagId));
      setAllTags(allTags.filter((item) => item.tagId !== tagId));
    } catch (error) {
      console.error("태그 삭제 중 오류 발생: ", error);
    }
  };

  return (
    <div className="tag-list-wrapper">
      <Popover.Root>
        <Popover.Trigger asChild>
          <ul ref={triggerRef} className="tag-list pointer">
            {isEmpty && <li className="body-small empty-tags"> 태그 추가</li>}
            {tags.slice(0, maxTagCount).map((tag) => (
              <li key={tag.tagName}>
                <BorderTag color={tag.tagColor} tagName={tag.tagName} />
              </li>
            ))}
            {tags.length > maxTagCount && (
              <li key="remained" className="tag-list-remained">{`+${
                tags.length - maxTagCount
              }개 더보기`}</li>
            )}
          </ul>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="tag-list-popup"
            sideOffset={-30}
            hideWhenDetached
            avoidCollisions={false}
          >
            <div className="tag-list-header">
              <ul className="tag-list">
                {tags.map((item) => (
                  <div
                    key={item.tagName}
                    className={`tag-list-item tag-list-tag-${item.tagColor}`}
                  >
                    <span>{`#${item.tagName}`}</span>
                    <button
                      className="tag-list-delete"
                      onClick={handleDeleteTagFromList(item.tagId)}
                    >
                      <XIcon viewBox="0 0 20 20" />
                    </button>
                  </div>
                ))}
              </ul>
              <div className="tag-list-input-wrapper body-small">
                <input
                  type="text"
                  ref={inputRef}
                  placeholder="태그 추가"
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <ul className="tag-list tag-list-column">
              {allTags.map((item) => (
                <li
                  key={item.tagName}
                  className={`tag-list-item tag-list-tag-${item.tagColor}`}
                  onClick={handleAddTag(item.tagId)}
                >
                  <span>{`#${item.tagName}`}</span>
                  <DropdownMenu.Root
                    onOpenChange={(open) => {
                      if (open) {
                        setEditedTag(item.tagName);
                      }
                    }}
                  >
                    <DropdownMenu.Trigger asChild>
                      <button className="tag-list-more">
                        <MoreIcon viewBox="0 0 16 16" />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content className="tag-list-dropdown body-small">
                        <input
                          type="text"
                          className="tag-edit-input body-small"
                          value={editedTag}
                          onClick={(e) => e.stopPropagation()}
                          onChange={handleChangeEditingTag}
                          onBlur={handleEditTag(item, editedTag)}
                          onKeyDown={handleEditTagOnEnter(item, editedTag)}
                          autoFocus
                        />
                        <DropdownMenu.Item
                          className="tag-list-dropdown-item"
                          onSelect={handleDeleteTag(item.tagId)}
                        >
                          제거
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </li>
              ))}
            </ul>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
