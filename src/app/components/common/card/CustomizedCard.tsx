import React from "react";
import "./CustomizedCard.css";
import BorderTag from "../tag/BorderTag";
import { TagType } from "@/types/tag/tagTypes";
import FilledTag from "../tag/FilledTag";
import { CustomerType } from "@/types/customer/customerType";

interface MessageCardProps {
  title: string;
  content: string;
  tags: TagType[];
  customers: CustomerType[];
}

export default function CustomizedCard({
  title = "",
  content,
  tags,
  customers,
}: MessageCardProps) {
  return (
    <div className="customized-card">
      <p className="customized-card__content subheading">{title}</p>
      <p className="customized-card__content body">{content}</p>

      <div className="customized-card__details">
        {/* todo : tagList */}
        <div className="customized-tag-container">
          {/* created_at width 제외하고 100% overflow hidden */}
          {tags.map((tag) => (
            <BorderTag
              key={tag.tagId}
              color={tag.tagColor}
              tagName={tag.tagName}
            />
          ))}

          {customers.map((customer) => (
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
