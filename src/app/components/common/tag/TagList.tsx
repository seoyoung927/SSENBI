"use client";
import "./TagList.css";
import BorderTag from "./BorderTag";
import { useRef, useState, useEffect } from "react";
import XIcon from "@/app/assets/svg/X.svg";
import getRandomTagColor from "@/utils/getRandomTagColor";
import * as Popover from "@radix-ui/react-popover";
import { TagType } from "@/types/tag/tagTypes";
import FilledTag from "./FilledTag";

interface TagListProps {
  tags?: TagType[];
  customers?: TagType[];
  maxTagCount?: number;
}

export default function TagList({
  tags = [],
  customers = [],
  maxTagCount = Infinity,
}: TagListProps) {
  const [activeTags, setActiveTags] = useState<TagType[]>(tags);
  const [activeCustomers, setActiveCustomers] = useState<TagType[]>(customers);
  const inputRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<"tag" | "customer">("tag");

  const [editingItem, setEditingItem] = useState<{
    type: "tag" | "customer";
    index: number;
    text: string;
  } | null>(null);

  const triggerRef = useRef<HTMLUListElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [activeTags, activeCustomers]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && isValidInput(event.currentTarget.value)) {
      addItem(event.currentTarget.value);
      event.currentTarget.value = "";
    }
  }

  function isValidInput(name: string): boolean {
    const trimmedName = name.trim();
    if (!trimmedName) return false;

    const list = tab === "tag" ? activeTags : activeCustomers;

    return !list.some(
      (item) => item.tagName.toLowerCase() === trimmedName.toLowerCase(),
    );
  }

  function addItem(name: string) {
    const newItemName = name.trim();
    const newItem: TagType = {
      tagName: newItemName,
      tagColor: getRandomTagColor(),
    };

    if (tab === "tag") {
      setActiveTags((prev) => [...prev, newItem]);
    } else {
      setActiveCustomers((prev) => [...prev, newItem]);
    }
  }

  function saveEditedItem() {
    if (!editingItem) return;
    const trimmedName = editingItem.text.trim();
    if (!trimmedName) {
      setEditingItem(null);
      return;
    }

    if (editingItem.type === "tag") {
      if (
        activeTags.some(
          (item, idx) =>
            item.tagName.toLowerCase() === trimmedName.toLowerCase() &&
            idx !== editingItem.index,
        )
      ) {
        setEditingItem(null);
        return;
      }
      setActiveTags((prev) =>
        prev.map((item, idx) =>
          idx === editingItem.index ? { ...item, tagName: trimmedName } : item,
        ),
      );
    } else {
      if (
        activeCustomers.some(
          (item, idx) =>
            item.tagName.toLowerCase() === trimmedName.toLowerCase() &&
            idx !== editingItem.index,
        )
      ) {
        setEditingItem(null);
        return;
      }
      setActiveCustomers((prev) =>
        prev.map((item, idx) =>
          idx === editingItem.index ? { ...item, tagName: trimmedName } : item,
        ),
      );
    }
    setEditingItem(null);
  }

  return (
    <div className="tag-list-wrapper">
      <Popover.Root>
        <Popover.Trigger asChild>
          <ul ref={triggerRef} className="tag-list pointer">
            {activeTags.slice(0, maxTagCount).map((tag) => (
              <li key={`tag-${tag.tagName}-${tag.tagColor}`}>
                <BorderTag color={tag.tagColor} tagName={tag.tagName} />
              </li>
            ))}
            {activeCustomers.slice(0, maxTagCount).map((customer) => (
              <li key={`customer-${customer.tagName}-${customer.tagColor}`}>
                <FilledTag
                  color={customer.tagColor}
                  tagName={customer.tagName}
                />
              </li>
            ))}
            {activeTags.length + activeCustomers.length > maxTagCount && (
              <li className="tag-list-remained">{`+${
                activeTags.length + activeCustomers.length - maxTagCount
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
              <div className="tab-ui">
                <button
                  className={`tab-button ${tab === "tag" ? "active" : ""}`}
                  onClick={() => setTab("tag")}
                >
                  태그
                </button>
                <button
                  className={`tab-button ${tab === "customer" ? "active" : ""}`}
                  onClick={() => setTab("customer")}
                >
                  고객
                </button>
              </div>
              <div className="tag-list-input-wrapper body-small">
                <input
                  type="text"
                  ref={inputRef}
                  autoFocus
                  placeholder={tab === "tag" ? "태그 추가" : "고객 추가"}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <ul className="tag-list tag-list-column">
              {(tab === "tag" ? activeTags : activeCustomers).map(
                (item, index) => (
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
                        onBlur={() => saveEditedItem()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveEditedItem();
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <span
                        onClick={() =>
                          setEditingItem({
                            type: tab,
                            index,
                            text: item.tagName,
                          })
                        }
                      >
                        {tab === "tag" ? "#" : "@"}
                        {item.tagName}
                      </span>
                    )}
                    <button
                      className="tag-list-delete"
                      onClick={() => {
                        if (tab === "tag") {
                          setActiveTags((prev) =>
                            prev.filter((_, i) => i !== index),
                          );
                        } else {
                          setActiveCustomers((prev) =>
                            prev.filter((_, i) => i !== index),
                          );
                        }
                      }}
                    >
                      <XIcon viewBox="0 0 20 20" />
                    </button>
                  </li>
                ),
              )}
            </ul>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
