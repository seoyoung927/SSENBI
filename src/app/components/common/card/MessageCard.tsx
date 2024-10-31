import React from "react";
import "./MessageCard.css";
import BorderTag from "../tag/BorderTag";
import { CustomerType, TagType } from "@/types/tag/tagTypes";
interface ApiResponse {
  code: string;
  message: string;
  result: Message[];
}

interface Message {
  messageId: number;
  messageContent: string;
  sendedAt: string;
  tags: TagType[];
  customers: CustomerType[];
}

interface MessageCardProps {
  title?: string;
  content: string;
  created_at: string;
  tags: TagType[];
  customers: CustomerType[];
}

export default function MessageCard({
  title = "",
  content,
  tags,
  created_at,
}: MessageCardProps) {
  return (
    <div className="message-card">
      <p className="message-card__content body">{content}</p>

      <div className="message-card__details">
        {/* todo : tagList */}
        <div className="message-tag-container">
          {/* created_at width 제외하고 100% overflow hidden */}
          {tags.map((tag, index) => (
            <BorderTag key={index} color={tag.tagColor} tagName={tag.tagName} />
          ))}
          {/*
          {customers.map((customer) => (
            <Fileld>{customer.customerName}</Fileld>
            ))} */}
        </div>
        <p className="message-card__description body-small">{created_at}</p>
      </div>
    </div>
  );
}
