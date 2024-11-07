import React from "react";
import BorderTag from "../tag/BorderTag";
import { MessageCardPropsType } from "@/types/message/messageTypes";
import { CustomerType, TagType } from "@/types/tag/tagTypes";
import "./MessageCard.css";
interface ApiResponse {
  code: string;
  message: string;
  result: Message[];
}

interface Message {
  messageContent: string;
  messageCustomers: CustomerType[];
  messageSendAt: string;
  messageTags: TagType[];
}

export default function MessageCard({
  messageContent,
  messageCustomers,
  messageSendAt,
  messageTags,
}: MessageCardPropsType) {
  return (
    <div className="message-card">
      <p className="message-card__content body">{messageContent}</p>

      <div className="message-card__details">
        {/* todo : tagList */}
        <div className="message-tag-container">
          {/* created_at width 제외하고 100% overflow hidden */}
          {messageTags.map((tag, index) => (
            <BorderTag key={index} color={tag.tagColor} tagName={tag.tagName} />
          ))}
          {/*
          {messageCustomers.map((customer) => (
            <Fileld>{customer.customerName}</Fileld>
            ))} */}
        </div>
        <p className="message-card__description body-small">{messageSendAt}</p>
      </div>
    </div>
  );
}
