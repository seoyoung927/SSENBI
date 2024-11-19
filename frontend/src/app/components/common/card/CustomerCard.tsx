import React from "react";
import "./CustomerCard.css";
import BorderTag from "../tag/BorderTag";
import { TagType } from "@/types/tag/tagTypes";

interface CustomerCardProps {
  name: string;
  phoneNumber: string;
  tags: TagType[];
}

export default function CustomerCard({
  name,
  phoneNumber,
  tags,
}: CustomerCardProps) {
  return (
    <div className="customer-card">
      <h2 className="customer-card__name">{name}</h2>
      <p className="customer-card_phone-number">{phoneNumber}</p>
      <div className="customer-card__card-tags">
        {tags?.map((tag) => (
          <BorderTag
            key={tag.tagId}
            tagName={tag.tagName}
            color={tag.tagColor}
          />
        ))}
      </div>
    </div>
  );
}
