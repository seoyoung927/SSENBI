"use client";

import {
  postCustomerAPI,
  putCustomerAPI,
} from "@/app/api/customer/customerAPI";
import TagList from "@/app/components/common/tag/TagList";
import {
  CustomerCreationType,
  CustomerType,
} from "@/types/customer/customerType";
import { TagType } from "@/types/tag/tagTypes";
import getRandomTagColor from "@/utils/getRandomTagColor";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./CustomerForm.css";

interface CustomerFormProps {
  customer?: CustomerType;
}

export default function CustomerForm({ customer }: CustomerFormProps) {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const [isMale, setIsMale] = useState<boolean>(true);
  const [tags, setTags] = useState<TagType[]>([]);

  useEffect(() => {
    if (
      !customer ||
      !nameRef.current ||
      !ageRef.current ||
      !phoneNumberRef.current ||
      !memoRef.current
    ) {
      return;
    }
    nameRef.current.value = customer.customerName;
    ageRef.current.value = customer.customerAge.toString();
    phoneNumberRef.current.value = customer.customerPhoneNumber;
    memoRef.current.value = customer.customerMemo;
    setIsMale(customer.customerGender === "MALE");
    setTags(customer.customerTags);
  }, [customer]);

  const handleCreateCustomer = async () => {
    const customerName = nameRef.current?.value?.trim() || "";
    const customerAge = Number(ageRef.current?.value) || 0;
    const customerGender = isMale ? "MALE" : "FEMALE";
    const customerPhoneNumber = phoneNumberRef.current?.value?.trim() || "";
    const customerTags = tags.map((tag) => tag.tagId);
    const customerMemo = memoRef.current?.value?.trim() || "";
    const customerColor = getRandomTagColor();
    const customerData: CustomerCreationType = {
      customerName,
      customerAge,
      customerGender,
      customerPhoneNumber,
      customerTags,
      customerMemo,
      customerColor,
    };

    try {
      const { result } = customer
        ? await putCustomerAPI(customer.customerId, customerData)
        : await postCustomerAPI(customerData);
      router.replace(
        result.customerId ? `/customer/${result.customerId}` : "customer",
      );
    } catch {
      alert("고객 추가에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="field-wrapper ">
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
        <label className="label">메모</label>
        <textarea
          ref={memoRef}
          className="body memo form-input-field"
          maxLength={300}
        />
      </div>
      <div className="button-group">
        <button onClick={router.back} className="button body-strong">
          취소
        </button>
        <button
          onClick={handleCreateCustomer}
          className="button primary body-strong"
        >
          {`${customer ? "수정" : "추가"}`}
        </button>
      </div>
    </>
  );
}
