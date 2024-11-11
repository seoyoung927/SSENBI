import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./ContentCard.css";
import CopyIcon from "@/app/assets/svg/Copy.svg";

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
  const handleCopy = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    navigator.clipboard.writeText(content);
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
            <button className="content-card__button-copy" onClick={handleCopy}>
              <CopyIcon className="copy-icon" />
            </button>
          </div>
          <p className="content-card__description body">{content}</p>
        </div>
      </div>
    </Link>
  );
}
