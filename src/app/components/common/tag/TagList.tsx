"use client";
import "./TagList.css";
import BorderTag from "./BorderTag";
import { useRef, useState, useEffect } from "react";
import XIcon from "@/app/assets/svg/X.svg";
import getRandomTagColor from "@/utils/getRandomTagColor";
import * as Popover from "@radix-ui/react-popover";
import { TagType } from "@/types/tag/tagTypes";
import FilledTag from "./FilledTag";
import TabBar from "./TabBar";

interface TagListProps {
  tags?: TagType[];
  customers?: TagType[];
  maxTagCount?: number;
}

const TAG_TABS = ["태그", "고객"];
const TAG_PREFIX = {
  태그: "#",
  고객: "@",
};

export default function TagList({
  tags = [],
  customers = [],
  maxTagCount = Infinity,
}: TagListProps) {
  const [validItems, setValidItems] = useState<{ [key: string]: TagType[] }>({
    [TAG_TABS[0]]: tags,
    [TAG_TABS[1]]: customers,
  });
  const [tab, setTab] = useState<string>(TAG_TABS[0]);
  const [editingItem, setEditingItem] = useState<{
    type: string;
    index: number;
    text: string;
  } | null>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isValidInput(event.currentTarget.value)) {
      addItem(event.currentTarget.value);
      event.currentTarget.value = "";
    }
  };
  const isValidInput = (name: string): boolean => {
    const trimmedName = name.trim();
    if (!trimmedName) return false;

    const list = validItems[tab];

    return !list.some(
      (item) => item.tagName.toLowerCase() === trimmedName.toLowerCase(),
    );
  };
  const addItem = (name: string) => {
    const newItemName = name.trim();
    const newItem: TagType = {
      tagName: newItemName,
      tagColor: getRandomTagColor(),
    };

    setValidItems((prev) => ({
      ...prev,
      [tab]: [...prev[tab], newItem],
    }));
  };
  const saveEditedItem = () => {
    if (!editingItem) return;

    const trimmedName = editingItem.text.trim();

    if (!trimmedName) {
      setEditingItem(null);
      return;
    }

    if (
      validItems[editingItem.type].some(
        (item, idx) =>
          item.tagName.toLowerCase() === trimmedName.toLowerCase() &&
          idx !== editingItem.index,
      )
    ) {
      setEditingItem(null);
      return;
    }
    setValidItems((prev) => ({
      ...prev,
      [editingItem.type]: prev[editingItem.type].map((item, idx) =>
        idx === editingItem.index ? { ...item, tagName: trimmedName } : item,
      ),
    }));

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
    setValidItems((prev) => ({
      ...prev,
      [tab]: prev[tab].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="tag-list-wrapper">
      <Popover.Root>
        <Popover.Trigger asChild>
          <ul ref={triggerRef} className="tag-list pointer">
            {Object.keys(validItems).map((tab) =>
              validItems[tab]
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
            )}
            {validItems[tab].length > maxTagCount && (
              <li className="tag-list-remained">{`+${
                validItems[tab].length - maxTagCount
              }개 더보기`}</li>
            )}
          </ul>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="tag-list-popup"
            sideOffset={5}
            style={{ width: `${triggerWidth}px` }}
          >
            <div className="tag-list-header">
              <TabBar tabs={TAG_TABS} activeTab={tab} setActiveTab={setTab} />
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
              {validItems[tab].map((item, index) => (
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
