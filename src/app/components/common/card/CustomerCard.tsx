import React from "react";
import "./CustomerCard.css";
import BorderTag from "../tag/BorderTag";
import FilledTag from "../tag/FilledTag";
import { CustomerType, TagType } from "@/types/tag/tagTypes";

interface CustomerCardProps {
  name: string;
  phoneNumber: string;
  tags: TagType[];
  customerTags: CustomerType[];
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
        {tags?.map((tag) => (
          <BorderTag
            key={tag.tagId}
            tagName={tag.tagName}
            color={tag.tagColor}
          />
        ))}
        {customerTags?.map((tag) => (
          <FilledTag
            key={tag.customerId}
            tagName={tag.customerName}
            color={tag.customerColor}
          />
        ))}
      </div>
    </div>
  );
}
