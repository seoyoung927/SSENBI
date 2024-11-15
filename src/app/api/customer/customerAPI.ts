import {
  CustomerCreationType,
  CustomerType,
} from "@/types/customer/customerType";
import axiosInstance from "../axiosInstance";

export const getCustomersAPI = async (token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await axiosInstance.get("/customer", {
    headers,
  });

  return response.data;
};

export const getCustomerAPI = async (customerId: number) => {
  const response = await axiosInstance.get(`/customer/${customerId}`);
  return response.data;
};

export const postCustomerAPI = async (customer: CustomerCreationType) => {
  const response = await axiosInstance.post("/customer", customer);
  return response.data;
};

export const putCustomerAPI = async (
  customerId: number,
  customer: CustomerType | CustomerCreationType,
) => {
  const response = await axiosInstance.put(`/customer/${customerId}`, {
    ...customer,
    customerId,
  });
  return response.data;
};

export const deleteCustomerAPI = async (customerId: number) => {
  const response = await axiosInstance.delete(`/customer/${customerId}`);
  return response.data;
};

export const getCustomerStatisticsAPI = async (token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await axiosInstance.get("/customer/statistics", {
    headers,
  });

  return response.data;
};
