"use client";

import "../layout.css";
import Header from "@/app/components/layout/Header";
import CustomerDetail from "./CustomerDetail";

export default function CustomerDetailPage() {
  return (
    <div className="page-container">
      <Header title="고객 정보" showBackIcon />
      <CustomerDetail />
    </div>
  );
}
