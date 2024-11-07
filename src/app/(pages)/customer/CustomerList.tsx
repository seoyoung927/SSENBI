"use client";

import FloatingActionButton from "@/app/components/common/button/FloatingActionButton";
import CustomerCard from "@/app/components/common/card/CustomerCard";
import SearchBar from "@/app/components/common/input/SearchBar";
import { CustomerType, TagType } from "@/types/tag/tagTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./CustomerList.css";

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

export default function CustomerList() {
  const [tags, setTags] = useState<TagType[]>([]);
  const router = useRouter();
  // TODO: fetch customers from server
  const customers = DUMMY_DATA;

  const handleSearch = (value: string) => {
    console.log(value);
  };
  const handleCreateCustomer = () => {
    router.push("/customer/create");
  };

  return (
    <>
      <div className="controller">
        {/* TODO: 태그 필터 */}
        <div>TODO 태그 필터</div>
        <SearchBar onChange={handleSearch} />
      </div>
      <ul className="customer-list">
        {customers.map((customer) => (
          <li key={customer.customerId} className="customer-item">
            <Link href={`/customer/${customer.customerId}`}>
              <CustomerCard
                name={customer.customerName}
                phoneNumber={customer.customerPhoneNumber || ""}
                tags={customer.customerTags}
              />
            </Link>
          </li>
        ))}
      </ul>

      <FloatingActionButton onClick={handleCreateCustomer} text={"고객 추가"} />
    </>
  );
}
