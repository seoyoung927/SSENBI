"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./ContentCard.css";

interface ContentCardProps {
  templateId: number;
  imgSrc: string;
  title: string;
  content: string;
}

export default function ContentCard({
  templateId,
  imgSrc,
  title,
  content,
}: ContentCardProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  const handleCopy = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    navigator.clipboard.writeText(content);
    setIsTooltipVisible(true);
    setTimeout(() => {
      setIsTooltipVisible(false);
    }, 1500);
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
          <div className="content-card__title-wrapper">
            <h2 className="content-card__title subheading">{title}</h2>
            <button
              type="button"
              className="content-card__button-copy"
              onClick={handleCopy}
            >
              복사하기
              <div className={`tooltip ${isTooltipVisible ? "visible" : ""}`}>
                복사되었습니다!
              </div>
            </button>
          </div>
          <p className="content-card__description body">{content}</p>
        </div>
      </div>
    </Link>
  );
}
