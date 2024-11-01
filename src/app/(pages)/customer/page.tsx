"use client";

import CustomerCard from "@/app/components/common/card/CustomerCard";
import "./page.css";
import SearchBar from "@/app/components/common/input/SearchBar";
import Header from "@/app/components/layout/Header";
import { CustomerType } from "@/types/tag/tagTypes";

const DUMMY_DATA: CustomerType[] = [
  {
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
  },
  {
    customerId: 2,
    customerName: "김철수",
    customerPhoneNumber: "010-5353-5353",
    customerColor: "YELLOW",
    customerTags: [
      {
        tagId: 1,
        tagColor: "RED",
        tagName: "VIP",
      },
    ],
  },
  {
    customerId: 3,
    customerName: "이영희",
    customerPhoneNumber: "010-1212-3434",
    customerColor: "GREEN",
    customerTags: [
      {
        tagId: 1,
        tagColor: "RED",
        tagName: "VIP",
      },
    ],
  },
];

export default function Customer() {
  // TODO: fetch customers from server
  const customers = DUMMY_DATA;

  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div className="page-container">
      <Header title="고객" />
      <div className="controller">
        {/* TODO: 태그 필터 */}
        <div>TODO 태그 필터</div>
        <SearchBar onChange={handleSearch} />
      </div>
      <ul className="customer-list">
        {customers.map((customer) => (
          <li key={customer.customerId} className="customer-item">
            {/* TODO: routing 적용 */}
            <CustomerCard
              name={customer.customerName}
              phoneNumber={customer.customerPhoneNumber || ""}
              tags={[]}
              // TODO: 태그 데이터 수정 - 고객 이름 대신 고객이 속한 태그를 보여줘야 함
              customerTags={[customer]}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
