"use client";
import "./TagList.css";
import BorderTag from "./BorderTag";
import { useRef, useState } from "react";
import XIcon from "@/app/assets/svg/X.svg";
import getRandomTagColor from "@/utils/getRandomTagColor";
import * as Popover from "@radix-ui/react-popover";
import { TagType } from "@/types/tag/tagTypes";
import FilledTag from "./FilledTag";
import TabBar from "./TabBar";

interface TagListProps {
  tags?: TagType[];
  setTags?: (tags: TagType[]) => void;
  customers?: TagType[];
  setCustomers?: (tags: TagType[]) => void;
  maxTagCount?: number;
  canAddCustomer?: boolean;
}

type TAG_TYPE = "태그" | "고객";
const TAG_TABS: TAG_TYPE[] = ["태그", "고객"];
const TAG_PREFIX = {
  [TAG_TABS[0]]: "#",
  [TAG_TABS[1]]: "@",
};

export default function TagList({
  tags = [],
  setTags,
  customers = [],
  setCustomers,
  maxTagCount = Infinity,
  canAddCustomer = false,
}: TagListProps) {
  const [tab, setTab] = useState<string>(TAG_TABS[0]);
  const tagData = {
    [TAG_TABS[0]]: tags,
    [TAG_TABS[1]]: customers,
  };
  const updateFunctions = {
    [TAG_TABS[0]]: setTags,
    [TAG_TABS[1]]: setCustomers,
  };
  const [editingItem, setEditingItem] = useState<{
    type: string;
    index: number;
    text: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLUListElement>(null);
  const isEmpty = tags.length === 0 && customers.length === 0;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isValidInput(event.currentTarget.value)) {
      addItem(event.currentTarget.value);
      event.currentTarget.value = "";
    }
  };
  const isValidInput = (name: string): boolean => {
    const trimmedName = name.trim();
    if (!trimmedName) return false;

    const list = tagData[tab];

    return !list.some(
      (item) => item.tagName.toLowerCase() === trimmedName.toLowerCase(),
    );
  };
  const addItem = (name: string) => {
    const newItemName = name.trim();
    const newItem: TagType = {
      tagName: newItemName,
      tagColor: getRandomTagColor(),
      tagId: 61,
    };
    updateFunctions[tab]?.([...tagData[tab], newItem]);
  };
  const saveEditedItem = () => {
    if (!editingItem) return;

    const trimmedName = editingItem.text.trim();

    if (!trimmedName) {
      setEditingItem(null);
      return;
    }

    if (
      tagData[editingItem.type].some(
        (item, idx) =>
          item.tagName.toLowerCase() === trimmedName.toLowerCase() &&
          idx !== editingItem.index,
      )
    ) {
      setEditingItem(null);
      return;
    }
    updateFunctions[editingItem.type]?.(
      tagData[editingItem.type].map((item, idx) =>
        idx === editingItem.index ? { ...item, tagName: trimmedName } : item,
      ),
    );

    setEditingItem(null);
  };
  const saveEditedItemOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveEditedItem();
    }
  };
  const handleSetEditingItem = (text: string, index: number) => () =>
    setEditingItem({
      type: tab,
      index,
      text,
    });
  const handleDeleteTag = (index: number) => () => {
    updateFunctions[tab]?.(tagData[tab].filter((_, i) => i !== index));
  };

  return (
    <div className="tag-list-wrapper">
      <Popover.Root>
        <Popover.Trigger asChild>
          <ul ref={triggerRef} className="tag-list pointer">
            {isEmpty && <li className="body-small empty-tags"> 태그 추가</li>}
            {Object.keys(tagData).map((tab) => [
              tagData[tab]
                .slice(0, maxTagCount)
                .map((tag) => (
                  <li key={`${tab}-${tag.tagName}-${tag.tagColor}`}>
                    {tab === "태그" ? (
                      <BorderTag color={tag.tagColor} tagName={tag.tagName} />
                    ) : (
                      <FilledTag color={tag.tagColor} tagName={tag.tagName} />
                    )}
                  </li>
                )),
              tagData[tab].length > maxTagCount && (
                <li key={`${tab}-remained`} className="tag-list-remained">{`+${
                  tagData[tab].length - maxTagCount
                }개 더보기`}</li>
              ),
            ])}
          </ul>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="tag-list-popup" sideOffset={5}>
            <div className="tag-list-header">
              {canAddCustomer && (
                <TabBar tabs={TAG_TABS} activeTab={tab} setActiveTab={setTab} />
              )}
              <div className="tag-list-input-wrapper body-small">
                <input
                  type="text"
                  ref={inputRef}
                  autoFocus
                  placeholder={`${tab} 추가`}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <ul className="tag-list tag-list-column">
              {tagData[tab].map((item, index) => (
                <li
                  key={item.tagName}
                  className={`tag-list-item tag-list-tag-${item.tagColor}`}
                >
                  {editingItem &&
                  editingItem.type === tab &&
                  editingItem.index === index ? (
                    <input
                      type="text"
                      value={editingItem.text}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          text: e.target.value,
                        })
                      }
                      onBlur={saveEditedItem}
                      onKeyDown={saveEditedItemOnEnter}
                      autoFocus
                    />
                  ) : (
                    <span onClick={handleSetEditingItem(item.tagName, index)}>
                      {`${TAG_PREFIX[tab as keyof typeof TAG_PREFIX]}${item.tagName}`}
                    </span>
                  )}
                  <button
                    className="tag-list-delete"
                    onClick={handleDeleteTag(index)}
                  >
                    <XIcon viewBox="0 0 20 20" />
                  </button>
                </li>
              ))}
            </ul>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
