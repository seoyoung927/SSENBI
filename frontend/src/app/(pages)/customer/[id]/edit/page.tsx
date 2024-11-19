"use client";

import Header from "@/app/components/layout/Header";
import "../../layout.css";
import CustomerForm from "@/app/components/common/customer/CustomerForm";
import { getCustomerAPI } from "@/app/api/customer/customerAPI";
import { CustomerType } from "@/types/customer/customerType";
import { useEffect, useState } from "react";

export default function CustomerEdit({ params }: { params: { id: string } }) {
  const [customer, setCustomer] = useState<CustomerType>();

  useEffect(() => {
    const fetchCustomer = async () => {
      const { result } = await getCustomerAPI(Number(params.id));
      setCustomer(result);
    };

    fetchCustomer();
  }, [params.id]);

  return (
    <div className="page-container flex-column">
      <Header title="고객 정보 수정" showBackIcon />
      <CustomerForm customer={customer} />
    </div>
  );
}
