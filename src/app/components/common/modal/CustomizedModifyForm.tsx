import React, { useState } from "react";
import "./CustomizedModifyForm.css";
import { TagColorTypes } from "@/types/tag/tagTypes";
import InputField from "../input/InputField";
import TagList from "../tag/TagList";

// Tag 타입 정의
interface TemplateTag {
  tagId: number;
  tagName: string;
  tagColor: TagColorTypes;
}

// Customer 타입 정의
interface TemplateCustomer {
  customerId: number;
  customerName: string;
  customerColor: TagColorTypes;
}

// Custom Template 타입 정의
interface CustomTemplate {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  templateUsageCount: number;
  templateCreatedAt: string;
  templateTags: TemplateTag[];
  templateCustomers: TemplateCustomer[];
}

// ApiResponse 타입 정의
type ApiResponse = CustomTemplate;

// dummyData 선언
const dummyData: ApiResponse = {
  templateId: 1,
  templateTitle: "직장인 템플릿",
  templateContent: "이 템플릿의 목적",
  templateUsageCount: 10,
  templateCreatedAt: "2024-10-25T01:22:27",
  templateTags: [{ tagId: 1, tagName: "직장인", tagColor: "GREEN" }],
  templateCustomers: [
    { customerId: 12, customerName: "홍길동", customerColor: "GREEN" },
    { customerId: 13, customerName: "김철수", customerColor: "PINK" },
    { customerId: 14, customerName: "이영희", customerColor: "SALMON" },
    { customerId: 15, customerName: "박수진", customerColor: "RED" },
  ],
};

interface CustomizedModifyFormProps {
  templateId: string;
  onClose: () => void;
  onSave: (
    title?: string,
    content?: string,
    beforeTags?: number[],
    afterTags?: number[],
    beforeCustomerIds?: number[],
    afterCustomerIds?: number[],
  ) => void;
}

export const CustomizedModifyForm = ({
  templateId,
  onClose,
  onSave,
}: CustomizedModifyFormProps) => {
  const [title, setTitle] = useState<string>(dummyData?.templateTitle);
  const [content, setContet] = useState<string>(dummyData?.templateContent);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContet(event.target.value);
  };

  const handleSave = () => {
    onSave();
  };

  return (
    <div className="customized-modify">
      <InputField
        label="제목"
        type="text"
        value={title}
        onChange={handleTitle}
      />

      <div className="customized-modify_form-group">
        <label className="customized-modify_form-group__label">고객</label>
        <TagList
          tags={[
            { tagName: "VIP", tagColor: "RED" },
            { tagName: "Frequent Buyer", tagColor: "ORANGE" },
            { tagName: "New Customer", tagColor: "GREEN" },
            { tagName: "very very long long tag name", tagColor: "PURPLE" },
          ]}
          maxTagCount={2}
        />
      </div>

      <div className="customized-modify_form-group">
        <label className="customized-modify_form-group__label">태그</label>
        <TagList
          tags={[
            { tagName: "VIP", tagColor: "RED" },
            { tagName: "Frequent Buyer", tagColor: "ORANGE" },
            { tagName: "New Customer", tagColor: "GREEN" },
            { tagName: "very very long long tag name", tagColor: "PURPLE" },
          ]}
          maxTagCount={2}
        />
      </div>

      <div className="customized-modify_form-group">
        <label className="customized-modify_form-group_label">내용</label>
        <textarea
          className="customized-modify_form-group_textarea body-medium"
          value={content}
          onChange={handleContent}
        />
      </div>

      <div className="modal-footer">
        <button className="modal-cancel" onClick={onClose}>
          취소
        </button>
        <button className="modal-confirm" onClick={handleSave}>
          확인
        </button>
      </div>
    </div>
  );
};
