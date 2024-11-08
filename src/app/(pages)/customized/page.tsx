"use client";

import Header from "@/app/components/layout/Header";
import FloatingActionButton from "@/app/components/common/button/FloatingActionButton";
import { useRouter } from "next/navigation";
import "./page.css";
import CustomizedList from "./CustomizedList";

export default function CustomizedPage() {
  const router = useRouter();

  const handleNewTemplate = () => {
    router.push("/customized/create");
  };

  return (
    <div className="page-container">
      <Header title="커스텀" />
      <CustomizedList />
      <FloatingActionButton onClick={handleNewTemplate} text={"커스텀 추가"} />
    </div>
  );
}
