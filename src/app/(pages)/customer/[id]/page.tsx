"use client";

import "./page.css";
import axiosInstance from "@/app/api/axiosInstance";
import InputField from "@/app/components/common/input/InputField";
import TagList from "@/app/components/common/tag/TagList";
import Header from "@/app/components/layout/Header";
import { CustomerType } from "@/types/tag/tagTypes";
import { ChangeEvent } from "react";

const DUMMY_DATA: CustomerType = {
  customerId: 1,
  customerName: "홍길동",
  customerPhoneNumber: "010-1234-5678",
  customerColor: "SALMON",
  customerTags: [
    {
      tagId: 1,
      tagColor: "RED",
      tagName: "VIP",
    },
  ],
};

export default function CustomerDetailPage() {
  // TODO: fetch customer from server
  const customer = DUMMY_DATA;
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <div className="page-container">
      <Header title={`${customer.customerName}`} showBackIcon />
      <InputField
        type="text"
        onChange={handleNameChange}
        label="이름"
        value={customer.customerName}
        maxLength={20}
      />
      <InputField
        type="text"
        onChange={handlePhoneNumberChange}
        label="전화번호"
        value={customer.customerPhoneNumber || ""}
        maxLength={13}
      />
      <div className="customer-detail-tags">
        <label className="label">태그</label>
        <TagList tags={customer.customerTags} />
      </div>
    </div>
  );
}
