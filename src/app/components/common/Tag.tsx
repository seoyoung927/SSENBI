import React from "react";
import "./Tag.css";

type TagProps = {
  color:
    | "RED"
    | "PINK"
    | "SALMON"
    | "ORANGE"
    | "YELLOW"
    | "GREEN"
    | "LIME"
    | "SKYBLUE"
    | "BLUE"
    | "PURPLE"
    | "BEIGE"
    | "GRAY";
  tagName: string;
};

export default function InputField({ color, tagName }: TagProps) {
  const getColorValues = (color: TagProps["color"]) => {
    switch (color) {
      case "RED":
        return {
          backgroundColor: "var(--red-100)",
          borderColor: "var(--red-600)",
        };
      case "ORANGE":
        return {
          backgroundColor: "var(--orange-100)",
          borderColor: "var(--orange-600)",
        };
      case "YELLOW":
        return {
          backgroundColor: "var(--yellow-100)",
          borderColor: "var(--yellow-700)",
        };
      case "GREEN":
        return {
          backgroundColor: "var(--green-100)",
          borderColor: "var(--green-700)",
        };
      case "LIME":
        return {
          backgroundColor: "var(--lime-100)",
          borderColor: "var(--lime-700)",
        };
      case "SKYBLUE":
        return {
          backgroundColor: "var(--sky-blue-100)",
          borderColor: "var(--sky-blue-700)",
        };
      case "BLUE":
        return {
          backgroundColor: "var(--blue-100)",
          borderColor: "var(--blue-700)",
        };
      case "PURPLE":
        return {
          backgroundColor: "var(--purple-100)",
          borderColor: "var(--purple-700)",
        };
      case "PINK":
        return {
          backgroundColor: "var(--pink-100)",
          borderColor: "var(--pink-700)",
        };
      case "SALMON":
        return {
          backgroundColor: "var(--salmon-100)",
          borderColor: "var(--salmon-700)",
        };
      case "BEIGE":
        return {
          backgroundColor: "var(--beige-100)",
          borderColor: "var(--beige-500)",
        };
      case "GRAY":
        return {
          backgroundColor: "var(--gray-100)",
          borderColor: "var(--gray-400)",
        };
      default:
        return {
          backgroundColor: "var(--gray-100)",
          borderColor: "var(--gray-500)",
        };
    }
  };

  const { backgroundColor, borderColor } = getColorValues(color);

  return (
    <div
      className="tag"
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        color: borderColor,
      }}
    >
      {tagName}
    </div>
  );
}
