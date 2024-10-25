import React from "react";
import Image from "next/image";
import "./CustomerCard.css";
import BorderTag from "./BorderTag";
import FilledTag from "./FilledTag";

interface Tag {
  tagName: string;
  tagColor:
    | "RED"
    | "PINK"
    | "SALMON"
    | "ORANGE"
    | "YELLOW"
    | "GREEN"
    | "LIME"
    | "SKYBLUE"
    | "BLUE"
    | "PURPLE"
    | "BEIGE"
    | "GRAY";
}

interface CustomerCardProps {
  name: string;
  phoneNumber: string;
  tags: Tag[];
  customerTags: Tag[];
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
