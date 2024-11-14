import React from "react";
import BorderTag from "../tag/BorderTag";
import { MessageCardPropsType } from "@/types/message/messageTypes";
import { TagType } from "@/types/tag/tagTypes";
import { CustomerType } from "@/types/customer/customerType";
import "./MessageCard.css";
import FilledTag from "../tag/FilledTag";
import formatDateTime from "@/utils/formatDateTime";
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
          {messageTags.map((tag, index) => (
            <BorderTag key={index} color={tag.tagColor} tagName={tag.tagName} />
          ))}
          {messageCustomers.map((customer) => (
            <FilledTag
              key={customer.customerId}
              color={customer.customerColor}
              tagName={customer.customerName}
            />
          ))}
        </div>
        <p className="message-card__description body-small">
          {formatDateTime(messageSendAt)}
        </p>
      </div>
    </div>
  );
}
