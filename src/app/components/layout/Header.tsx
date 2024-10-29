import React from "react";
import "./Header.css";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return <div className="header small-title">{title}</div>;
}
