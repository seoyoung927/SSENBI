import React, { useEffect, useState } from "react";
import "./CustomizedModifyForm.css";

import InputField from "../common/input/InputField";
import TagList from "../common/tag/TagList";
import { CustomerType, TagType } from "@/types/tag/tagTypes";
import { getCustomTemplateAPI } from "@/app/api/customized/customizedAPI";
import Cookies from "js-cookie";

// Custom Template 타입 정의
interface CustomTemplate {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  templateUsageCount: number;
  templateCreatedAt: string;
  templateTags: TagType[];
  templateCustomers: CustomerType[];
}

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

export default function CustomizedModifyForm({
  templateId,
  onClose,
  onSave,
}: CustomizedModifyFormProps) {
  const [title, setTitle] = useState<string>("");
  const [content, setContet] = useState<string>("");
  const [tags, setTags] = useState<TagType[]>([
    {
      tagName: "VIP",
      tagColor: "RED",
      tagId: 31,
    },
    {
      tagName: "Frequent Buyer",
      tagColor: "ORANGE",
      tagId: 32,
    },
  ]);
  const [customers, setCustomers] = useState<TagType[]>([]);

  useEffect(() => {
    const fetchCustomTemplate = async (templateId: string) => {
      const token = Cookies.get("accessToken");
      if (!token) return;

      const respose = await getCustomTemplateAPI({ token, templateId });

      console.log(respose);
    };

    fetchCustomTemplate(templateId);
  }, []);

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
        maxLength={20}
      />

      <div className="customized-modify_form-group">
        <label className="customized-modify_form-group__label">
          태그 및 고객
        </label>
        <TagList tags={tags} setTags={setTags} maxTagCount={2} />
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
}
