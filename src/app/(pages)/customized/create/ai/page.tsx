"use client";

import { useState } from "react";
import "./page.css";
import Header from "@/app/components/layout/Header";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/common/input/InputField";
import TagList from "@/app/components/common/tag/TagList";
import { postCustomTemplateAPI } from "@/app/api/customized/customizedAPI";
import Cookies from "js-cookie";

export default function CustomizedNewAIPage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContet] = useState<string>("");
  // TODO: 수정 필요 - 추가 로직 및 API와 연결
  const [selectedCustomers] = useState<number[]>([1, 2, 3]);
  const [selectedTags] = useState<number[]>([1, 2, 3]);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContet(event.target.value);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) return;

      const response = await postCustomTemplateAPI({
        token,
        title,
        content,
        customers: selectedCustomers,
        tags: selectedTags,
      });
      if (response.code === "S10000") {
        router.push("/customized");
      }
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
    }
  };

  return (
    <div className="page-container">
      <Header title="새 AI 커스텀" showBackIcon={true} />

      <InputField
        label="제목"
        type="text"
        value={title}
        onChange={handleTitle}
        maxLength={20}
      />

      <div className="customized-new_form-group">
        <label className="customized-new_form-group__label">고객</label>
        <TagList
          tags={[
            {
              tagName: "VIP",
              tagColor: "RED",
              tagId: 1,
            },
            {
              tagName: "Frequent Buyer",
              tagColor: "ORANGE",
              tagId: 2,
            },
            {
              tagName: "New Customer",
              tagColor: "GREEN",
              tagId: 3,
            },
            {
              tagName: "very very long long tag name",
              tagColor: "PURPLE",
              tagId: 4,
            },
          ]}
          maxTagCount={2}
        />
      </div>

      <div className="customized-new_form-group">
        <label className="customized-new_form-group__label">태그</label>
        <TagList
          tags={[
            {
              tagName: "VIP",
              tagColor: "RED",
              tagId: 5,
            },
            {
              tagName: "Frequent Buyer",
              tagColor: "ORANGE",
              tagId: 6,
            },
            {
              tagName: "New Customer",
              tagColor: "GREEN",
              tagId: 7,
            },
            {
              tagName: "very very long long tag name",
              tagColor: "PURPLE",
              tagId: 8,
            },
          ]}
          maxTagCount={2}
        />
      </div>

      <div className="customized-new_form-group">
        <label className="customized-new_form-group_label">내용</label>
        <textarea
          className="customized-new_form-group_textarea body-medium"
          value={content}
          onChange={handleContent}
        />
      </div>

      <div className="customized-new_button-group">
        <button
          onClick={handleCancel}
          type="button"
          className="customized-new_button white_button"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          type="button"
          className="customized-new_button blue_button"
        >
          작성
        </button>
      </div>
    </div>
  );
}
