"use client";

import "./TagList.css";
import BorderTag from "./BorderTag";
import { useEffect, useRef, useState } from "react";
import XIcon from "@/app/assets/svg/X.svg";
import MoreIcon from "@/app/assets/svg/More.svg";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Popover from "@radix-ui/react-popover";
import { CustomerType } from "@/types/customer/customerType";
import {
  getCustomersAPI,
  putCustomerAPI,
  deleteCustomerAPI,
} from "@/app/api/customer/customerAPI";

interface CustomerTagListProps {
  customers: CustomerType[];
  setCustomers: (customers: CustomerType[]) => void;
  maxCustomerCount?: number;
}

export default function CustomerTagList({
  customers = [],
  setCustomers,
  maxCustomerCount = Infinity,
}: CustomerTagListProps) {
  const [allCustomers, setAllCustomers] = useState<CustomerType[]>([]);
  const [search, setSearch] = useState<string>("");
  const triggerRef = useRef<HTMLUListElement>(null);
  const isEmpty = customers.length === 0;
  const [editedCustomer, setEditedCustomer] = useState<string>("");
  const filteredCustomers = allCustomers.filter((item) =>
    item.customerName.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { result } = await getCustomersAPI();

        setAllCustomers(result);
      } catch (error) {
        console.error("고객 데이터를 가져오는 중 오류가 발생했습니다: ", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleChangeEditingCustomer = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditedCustomer(e.target.value);
  };

  const handleAddCustomer = (customerId: number) => () => {
    const customer = allCustomers.find(
      (item) => item.customerId === customerId,
    );
    if (!customer) return;
    const isDuplicated = customers.some(
      (item) => item.customerId === customer.customerId,
    );
    if (isDuplicated) {
      return;
    }
    setCustomers([...customers, customer]);
  };

  const handleEditCustomer =
    (customer: CustomerType, name: string) => async () => {
      try {
        const updatedCustomer = { ...customer, customerName: name };
        const { result: newCustomer } = await putCustomerAPI(
          customer.customerId,
          updatedCustomer,
        );
        setCustomers(
          customers.map((item) =>
            item.customerId === newCustomer.customerId ? newCustomer : item,
          ),
        );
        setAllCustomers(
          allCustomers.map((item) =>
            item.customerId === newCustomer.customerId ? newCustomer : item,
          ),
        );
      } catch (error) {
        console.error("고객 수정 중 오류가 발생했습니다: ", error);
      }
    };

  const handleEditCustomerOnEnter =
    (customer: CustomerType, name: string) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleEditCustomer(customer, name)();
      }
    };

  const handleDeleteCustomerFromList = (id: number) => () => {
    setCustomers(customers.filter((item) => item.customerId !== id));
  };

  const handleDeleteCustomer = (customerId: number) => async () => {
    try {
      await deleteCustomerAPI(customerId);
      setCustomers(customers.filter((item) => item.customerId !== customerId));
      setAllCustomers(
        allCustomers.filter((item) => item.customerId !== customerId),
      );
    } catch (error) {
      console.error("고객 삭제 중 오류가 발생했습니다: ", error);
    }
  };

  return (
    <div className="tag-list-wrapper">
      <Popover.Root>
        <Popover.Trigger asChild>
          <ul ref={triggerRef} className="tag-list pointer">
            {isEmpty && <li className="body-small empty-tags">고객 추가</li>}
            {customers.slice(0, maxCustomerCount).map((customer) => (
              <li key={customer.customerId}>
                <BorderTag
                  color={customer.customerColor}
                  tagName={customer.customerName}
                />
              </li>
            ))}
            {customers.length > maxCustomerCount && (
              <li
                key="remained"
                className="tag-list-remained"
              >{`+${customers.length - maxCustomerCount}명 더보기`}</li>
            )}
          </ul>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="tag-list-popup"
            sideOffset={-30}
            hideWhenDetached
            avoidCollisions={false}
          >
            <div className="tag-list-header">
              <ul className="tag-list">
                {customers.map((item) => (
                  <div
                    key={item.customerId}
                    className={`tag-list-item tag-list-tag-${item.customerColor}`}
                  >
                    <span>{item.customerName}</span>
                    <button
                      className="tag-list-delete"
                      onClick={handleDeleteCustomerFromList(item.customerId)}
                    >
                      <XIcon viewBox="0 0 20 20" />
                    </button>
                  </div>
                ))}
              </ul>
              <div className="tag-list-input-wrapper body-small">
                <input
                  type="text"
                  placeholder="고객 검색"
                  value={search}
                  onChange={handleSearch}
                  maxLength={25}
                />
              </div>
            </div>
            <ul className="tag-list tag-list-column">
              {filteredCustomers.map((item) => (
                <li
                  key={item.customerId}
                  className={`tag-list-item tag-list-tag-${item.customerColor}`}
                  onClick={handleAddCustomer(item.customerId)}
                >
                  <span>{`@${item.customerName}`}</span>
                  <DropdownMenu.Root
                    onOpenChange={(open) => {
                      if (open) {
                        setEditedCustomer(item.customerName);
                      }
                    }}
                  >
                    <DropdownMenu.Trigger asChild>
                      <button className="tag-list-more">
                        <MoreIcon viewBox="0 0 16 16" />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content className="tag-list-dropdown body-small">
                        <input
                          type="text"
                          className="tag-edit-input body-small"
                          value={editedCustomer}
                          onClick={(e) => e.stopPropagation()}
                          onChange={handleChangeEditingCustomer}
                          onBlur={handleEditCustomer(item, editedCustomer)}
                          onKeyDown={handleEditCustomerOnEnter(
                            item,
                            editedCustomer,
                          )}
                          maxLength={25}
                          autoFocus
                        />
                        <DropdownMenu.Item
                          className="tag-list-dropdown-item"
                          onSelect={handleDeleteCustomer(item.customerId)}
                        >
                          제거
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </li>
              ))}
              {filteredCustomers.length === 0 && (
                <li className="body-small">검색 결과가 없습니다.</li>
              )}
            </ul>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
