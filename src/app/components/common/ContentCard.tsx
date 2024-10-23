import React from "react";
import Image from "next/image";
import "./ContentCard.css";

interface ContentCardProps {
  imgSrc: string;
  title: string;
  description: string;
}

export default function ContentCard({
  imgSrc,
  title,
  description,
}: ContentCardProps) {
  return (
    <div className="content-card">
      <div className="content-card__image-container">
        <Image
          src={imgSrc}
          alt={title}
          className="content-card__image"
          width={150}
          height={150}
        />
      </div>
      <div className="content-card__details">
        <h2 className="content-card__title">{title}</h2>
        <p className="content-card__description">{description}</p>
      </div>
    </div>
  );
}
