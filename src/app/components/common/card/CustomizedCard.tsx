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

  // Format date to YYYY-MM-DD
  const formattedDate = new Date(templateCreatedAt).toISOString().split("T")[0];

  return (
    <div className="customized-card" key={templateId}>
      <p className="customized-card__title subheading">{templateTitle}</p>
      <p className="customized-card__content body">{templateContent}</p>

      <div className="customized-card__stats">
        <p className="customized-card__usage">
          사용 횟수: {templateUsageCount}
        </p>
        <p className="customized-card__date"> {formattedDate}</p>
      </div>

      <div className="customized-card__details">
        <div className="customized-tag-container">
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
