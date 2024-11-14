"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import "./ContentCard.css";
import { postDuplicateTemplateAPI } from "@/app/api/template/templateAPI";
import { useRouter } from "next/navigation";

interface ContentCardProps {
  templateId: number;
  imgSrc: string;
  title: string;
  content: string;
  usageCount: number;
}

export default function ContentCard({
  templateId,
  imgSrc,
  title,
  content,
  usageCount,
}: ContentCardProps) {
  const router = useRouter();

  const handleMyCustom = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const token = Cookies.get("accessToken");
    if (!token) return;
    try {
      const response = await postDuplicateTemplateAPI({
        token,
        templateId: Number(templateId),
      });

      if (response?.code === "S10000") router.push("/customized");
    } catch (error) {
      console.error("post duplicate API 실패", error);
    }
  };

  return (
    <Link href={`/template/${templateId}`}>
      <div className="content-card">
        <div className="content-card__image-container">
          <Image
            src={imgSrc}
            alt={title}
            loading="lazy"
            className="content-card__image"
            width={150}
            height={150}
            quality={50}
            sizes="(max-width: 768px) 50vw, 150px"
          />
        </div>
        <div className="content-card__details">
          <div className="content-card__title-container">
            <h2 className="content-card__title subheading">{title}</h2>
            <button
              type="button"
              className="content-card__button-copy"
              onClick={handleMyCustom}
            >
              커스텀으로 만들기
            </button>
          </div>
          <div className="content-card__desccription-container">
            <p className="content-card__description body">{content}</p>
            <p className="content-card__count">사용 횟수: {usageCount}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
