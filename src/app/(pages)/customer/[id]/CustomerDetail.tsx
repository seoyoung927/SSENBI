"use client";

import "../layout.css";
import InputField from "@/app/components/common/input/InputField";
import TagList from "@/app/components/common/tag/TagList";
import { CustomerType, TagType } from "@/types/tag/tagTypes";
import { useState, ChangeEvent } from "react";

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

export default function CustomerDetail() {
  // TODO: fetch customer from server
  const [customer, setCustomer] = useState<CustomerType>(DUMMY_DATA);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      customerName: e.target.value,
    });
  };
  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      customerPhoneNumber: e.target.value,
    });
  };
  const handleTagChange = (tags: TagType[]) => {
    setCustomer({
      ...customer,
      customerTags: tags,
    });
  };

  return (
    <>
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
      <div className="field-wrapper">
        <label className="label">태그</label>
        <TagList tags={customer.customerTags} setTags={handleTagChange} />
      </div>
      <div className="field-wrapper">
        {/* TODO: 메모 추가 */}
        <label className="label">메모</label>
        <textarea className="body memo" />
      </div>
    </>
  );
}
