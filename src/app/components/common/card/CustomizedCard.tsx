import React from "react";
import "./CustomizedCard.css";
import BorderTag from "../tag/BorderTag";
import FilledTag from "../tag/FilledTag";
import { CustomMessagesType } from "@/types/customized/customizedTypes";

interface MessageCardProps {
  customMessage: CustomMessagesType;
}

export default function CustomizedCard({ customMessage }: MessageCardProps) {
  const {
    templateId,
    templateTitle,
    templateContent,
    templateUsageCount,
    templateCreatedAt,
    templateTags,
    templateCustomers,
  } = customMessage;

  return (
    <div className="customized-card">
      <p className="customized-card__content subheading">{templateTitle}</p>
      <p className="customized-card__content body">{templateContent}</p>

      <div className="customized-card__details">
        {/* todo : tagList */}
        <div className="customized-tag-container">
          {/* created_at width 제외하고 100% overflow hidden */}
          {templateTags.map((tag) => (
            <BorderTag
              key={tag.tagId}
              color={tag.tagColor}
              tagName={tag.tagName}
            />
          ))}

          {templateCustomers.map((customer) => (
            <FilledTag
              key={customer.customerId}
              color={customer.customerColor}
              tagName={customer.customerName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
