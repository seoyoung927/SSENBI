"use client";

import BorderTag from "@/app/components/common/tag/BorderTag";
import "../layout.css";
import "./CustomerDetail.css";
import {
  deleteCustomerAPI,
  getCustomerAPI,
} from "@/app/api/customer/customerAPI";
import { CustomerType } from "@/types/customer/customerType";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EMPTY_CUSTOMER: CustomerType = {
  customerId: 0,
  customerName: "",
  customerAge: 0,
  customerColor: "GRAY",
  customerGender: "MALE",
  customerPhoneNumber: "",
  customerMemo: "",
  customerTags: [],
};

export default function CustomerDetail({ id }: { id: number }) {
  const router = useRouter();
  const [customer, setCustomer] = useState<CustomerType>(EMPTY_CUSTOMER);

  useEffect(() => {
    const fetchCustomer = async () => {
      const { result } = await getCustomerAPI(id);

      setCustomer(result);
    };

    fetchCustomer();
  }, [id]);

  const handleDeleteCustomer = () => {
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }

    const deleteCustomer = async () => {
      try {
        await deleteCustomerAPI(id);
        alert("삭제되었습니다.");
        router.push("/customer");
      } catch {
        alert("삭제에 실패했습니다.");
      }
    };

    deleteCustomer();
  };

  return (
    <>
      <div className="customer-detail-field-wrapper">
        <div className="body customer-detail-label">이름</div>
        <div className="body-medium customer-detail-field">
          {customer.customerName}
        </div>
      </div>
      <div className="customer-detail-field-wrapper">
        <div className="body customer-detail-label">성별</div>
        <div className="body-medium customer-detail-field">
          {customer.customerGender}
        </div>
      </div>
      <div className="customer-detail-field-wrapper">
        <div className="body customer-detail-label">나이</div>
        <div className="body-medium customer-detail-field">
          {customer.customerAge}
        </div>
      </div>
      <div className="customer-detail-field-wrapper">
        <div className="body customer-detail-label">전화번호</div>
        <div className="body-medium customer-detail-field">
          {customer.customerPhoneNumber}
        </div>
      </div>
      <div className="customer-detail-field-wrapper">
        <div className="body customer-detail-label">태그</div>
        <div className="customer-detail-tags">
          {customer.customerTags.map((tag) => (
            <BorderTag
              key={tag.tagName}
              color={tag.tagColor}
              tagName={tag.tagName}
            />
          ))}
        </div>
      </div>
      <div className="customer-detail-field-wrapper">
        <div className="body customer-detail-label">메모</div>
        <div className="body-medium customer-detail-field">
          {customer.customerMemo}
        </div>
      </div>
      <div className="button-group">
        <button
          onClick={handleDeleteCustomer}
          className="button delete body-strong"
        >
          삭제
        </button>
        <Link
          href={`/customer/${id}/edit`}
          className="button primary body-strong"
        >
          수정
        </Link>
      </div>
    </>
  );
}
