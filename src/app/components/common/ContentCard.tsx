import React from "react";
import "./ContentCard.css";

export default function ContentCard() {
  return (
    <div className="content-card">
      <img
        src="https://via.placeholder.com/150"
        alt="content"
        className="content-card__image"
      />
      <div className="content-card__details">
        <h2 className="content-card__title">Card Title</h2>
        <p className="content-card__description">
          This is a short description of the content. It should be concise and
          informative.
        </p>
      </div>
    </div>
  );
}
