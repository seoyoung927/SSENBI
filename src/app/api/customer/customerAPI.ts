import {
  CustomerCreationType,
  CustomerType,
} from "@/types/customer/CustomerType";
import axiosInstance from "../axiosInstance";

export const getCustomersAPI = async () => {
  const response = await axiosInstance.get("/customer");
  return response.data;
};

export const getCustomerAPI = async ({
  customerId,
}: {
  customerId: number;
}) => {
  const response = await axiosInstance.get(`/customer/${customerId}`);
  return response.data;
};

export const postCustomerAPI = async (customer: CustomerCreationType) => {
  const response = await axiosInstance.post("/customer", customer);
  return response.data;
};

export const putCustomerAPI = async ({
  customerId,
  customer,
}: {
  customerId: number;
  customer: CustomerType;
}) => {
  const response = await axiosInstance.put(`/customer/${customerId}`, {
    ...customer,
    customerId,
  });
  return response.data;
};

export const deleteCustomerAPI = async ({
  customerId,
}: {
  customerId: number;
}) => {
  const response = await axiosInstance.delete(`/customer/${customerId}`);
  return response.data;
};
