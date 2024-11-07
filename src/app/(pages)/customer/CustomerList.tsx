"use client";

import FloatingActionButton from "@/app/components/common/button/FloatingActionButton";
import CustomerCard from "@/app/components/common/card/CustomerCard";
import SearchBar from "@/app/components/common/input/SearchBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./CustomerList.css";
import { CustomerType } from "@/types/customer/customerType";
import { getCustomersAPI } from "@/app/api/customer/customerAPI";

export default function CustomerList() {
  const router = useRouter();
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  useEffect(() => {
    getCustomersAPI()
      .then(({ result }) => {
        setCustomers(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // TODO: 검색구현
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
        <div>TODO: 태그 필터</div>
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
