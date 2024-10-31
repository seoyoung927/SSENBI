import React from "react";
import "./FilledTag.css";
import { TagColor } from "@/types/tag/tagTypes";

type TagProps = {
  color: TagColor;
  tagName: string;
};

export default function FilledTag({ color, tagName }: TagProps) {
  const getColorValues = (color: TagProps["color"]) => {
    switch (color) {
      case "RED":
        return {
          backgroundColor: "var(--red-500)",
        };
      case "ORANGE":
        return {
          backgroundColor: "var(--orange-500)",
        };
      case "YELLOW":
        return {
          backgroundColor: "var(--yellow-600)",
        };
      case "GREEN":
        return {
          backgroundColor: "var(--green-500)",
        };
      case "LIME":
        return {
          backgroundColor: "var(--lime-600)",
        };
      case "SKYBLUE":
        return {
          backgroundColor: "var(--sky-blue-500)",
        };
      case "BLUE":
        return {
          backgroundColor: "var(--blue-500)",
        };
      case "PURPLE":
        return {
          backgroundColor: "var(--purple-500)",
        };
      case "PINK":
        return {
          backgroundColor: "var(--pink-300)",
        };
      case "SALMON":
        return {
          backgroundColor: "var(--salmon-500)",
        };
      case "BEIGE":
        return {
          backgroundColor: "var(--beige-500)",
        };
      case "GRAY":
        return {
          backgroundColor: "var(--gray-500)",
        };
      default:
        return {
          backgroundColor: "var(--gray-500)",
        };
    }
  };

  const { backgroundColor } = getColorValues(color);

  return (
    <div
      className="filled-tag"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      @{tagName}
    </div>
  );
}
