"use client";

import { postDuplicateTemplateAPI } from "@/app/api/template/templateAPI";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "./TemplateClientButtons.css";

interface TemplateData {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  image: string;
  usageCount: number;
  createdAt: string;
}

interface TemplateClientButtonsProps {
  id: number;
  templateData: TemplateData;
}

export default function TemplateClientButtons({
  id,
  templateData,
}: TemplateClientButtonsProps) {
  const router = useRouter();
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(templateData.templateContent);
      setIsTooltipVisible(true);
      setTimeout(() => {
        setIsTooltipVisible(false);
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMyCustom = async () => {
    const token = Cookies.get("accessToken");
    if (!token) return;
    try {
      const response = await postDuplicateTemplateAPI({
        token,
        templateId: Number(id),
      });

      if (response?.code === "S10000") router.push("/customized");
    } catch (error) {
      console.error("post duplicate API 실패", error);
    }
  };

  return (
    <div className="template-id_button-group">
      <div className="copy-button">
        <button
          onClick={handleCopy}
          type="button"
          className="template-id_button blue_button"
        >
          복사하기
        </button>
        <div
          className={`template-id_tooltip ${isTooltipVisible ? "visible" : ""}`}
        >
          텍스트가 복사되었습니다!
        </div>
      </div>
      <button
        onClick={handleMyCustom}
        type="button"
        className="template-id_button blue_button"
      >
        내 커스텀으로 가져오기
      </button>
    </div>
  );
}
