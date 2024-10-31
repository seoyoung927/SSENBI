import React from "react";
import "./CustomizedCard.css";
import BorderTag from "../tag/BorderTag";
import { TagColorTypes } from "@/types/tag/tagTypes";

interface Tag {
  tagId: number;
  tagName: string;
  tagColor: TagColorTypes;
}

interface Customer {
  customerId: number;
  customerName: string;
  customerColor: string;
}

interface MessageCardProps {
  title: string;
  content: string;
  tags: Tag[];
  customers: Customer[];
}

export default function CustomizedCard({
  title = "",
  content,
  tags,
}: MessageCardProps) {
  return (
    <div className="customized-card">
      <p className="customized-card__content body">{content}</p>

      <div className="customized-card__details">
        {/* todo : tagList */}
        <div className="customized-tag-container">
          {/* created_at width 제외하고 100% overflow hidden */}
          {tags.map((tag, index) => (
            <BorderTag key={index} color={tag.tagColor} tagName={tag.tagName} />
          ))}
          {/*
          {customers.map((customer) => (
            <Fileld>{customer.customerName}</Fileld>
            ))} */}
        </div>
      </div>
    </div>
  );
}
