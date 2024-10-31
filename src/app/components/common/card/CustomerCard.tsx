import React from "react";
import "./CustomerCard.css";
import BorderTag from "../tag/BorderTag";
import FilledTag from "../tag/FilledTag";
import { TagType } from "@/types/tag/Tag";

interface CustomerCardProps {
  name: string;
  phoneNumber: string;
  tags: TagType[];
  customerTags: TagType[];
}

export default function CustomerCard({
  name,
  phoneNumber,
  tags,
  customerTags,
}: CustomerCardProps) {
  return (
    <div className="customer-card">
      <h2 className="customer-card__name">{name}</h2>
      <p className="customer-card_phone-number">{phoneNumber}</p>
      <div className="customer-card__card-tags">
        {tags?.map((tag, index) => (
          <BorderTag key={index} tagName={tag.tagName} color={tag.tagColor} />
        ))}
        {customerTags?.map((tag, index) => (
          <FilledTag key={index} tagName={tag.tagName} color={tag.tagColor} />
        ))}
      </div>
    </div>
  );
}
