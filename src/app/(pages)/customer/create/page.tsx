"use client";

import { postCustomerAPI } from "@/app/api/customer/customerAPI";
import "../layout.css";
import "./page.css";
import TagList from "@/app/components/common/tag/TagList";
import Header from "@/app/components/layout/Header";
import { TagType } from "@/types/tag/tagTypes";
import { useRef, useState } from "react";
import { CustomerCreationType } from "@/types/customer/CustomerType";
import getRandomTagColor from "@/utils/getRandomTagColor";

export default function CustomerCreatePage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const [isMale, setIsMale] = useState<boolean>(true);
  const [tags, setTags] = useState<TagType[]>([]);

  const handleCreateCustomer = async () => {
    const customerName = nameRef.current?.value?.trim() || "";
    const customerAge = Number(ageRef.current?.value) || 0;
    const customerGender = isMale ? "MALE" : "FEMALE";
    const customerPhoneNumber = phoneNumberRef.current?.value?.trim() || "";
    const customerTags = tags.map((tag) => tag.tagId);
    const customerMemo = memoRef.current?.value?.trim() || "";
    const customerColor = getRandomTagColor();
    const customer: CustomerCreationType = {
      customerName,
      customerAge,
      customerGender,
      customerPhoneNumber,
      customerTags,
      customerMemo,
      customerColor,
    };

    const { result } = await postCustomerAPI(customer);
    console.log(result);
  };

  return (
    <div className="page-container customer-create-page">
      <Header title="새 고객 추가" showBackIcon />
      <div className="field-wrapper">
        <span className="body label">이름</span>
        <input
          className="form-input-field"
          ref={nameRef}
          type="text"
          maxLength={20}
        />
      </div>
      <div className="field-wrapper">
        <span className="body label">나이</span>
        <input className="form-input-field" ref={ageRef} type="number" />
      </div>
      <div className="field-wrapper">
        <span className="body label">성별</span>
        <div className="toggle-wrapper">
          <button
            className={`gender-selector body-medium ${isMale ? "selected" : ""}`}
            onClick={() => setIsMale(true)}
          >
            남자
          </button>
          <button
            className={`gender-selector body-medium ${!isMale ? "selected" : ""}`}
            onClick={() => setIsMale(false)}
          >
            여자
          </button>
        </div>
      </div>
      <div className="field-wrapper">
        <span className="body label">전화번호</span>
        <input
          className="form-input-field"
          ref={phoneNumberRef}
          type="number"
          maxLength={13}
        />
      </div>
      <div className="field-wrapper">
        <label className="label">태그</label>
        <TagList tags={tags} setTags={setTags} />
      </div>
      <div className="field-wrapper">
        {/* TODO: 메모 추가 */}
        <label className="label">메모</label>
        <textarea ref={memoRef} className="body memo form-input-field" />
      </div>
      <div className="button-group">
        <button
          onClick={handleCreateCustomer}
          className="primary-button body-strong"
        >
          추가
        </button>
      </div>
    </div>
  );
}
