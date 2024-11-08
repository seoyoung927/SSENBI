import {
  DeleteCustomTemplateCustomerParamsType,
  DeleteCustomTemplateParamsType,
  DeleteCustomTemplateTagParamsType,
  GetCustomTemplateParamsType,
  GetCustomTemplatesParamsType,
  PostCustomTemplateCustomerParamsType,
  PostCustomTemplateParamsType,
  PostCustomTemplateTagParamsType,
  PutCustomTemplateParamsType,
} from "@/types/customized/customizedTypes";
import axiosInstance from "../axiosInstance";

// Get Custom Templates API
export const getCustomTemplatesAPI = async ({
  token,
  page,
  size,
  sort,
  // templateTags,
  // templateCustomers,
  // templateSearch,
}: GetCustomTemplatesParamsType) => {
  const response = await axiosInstance.get("/customTemplate", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      size,
      sort,
      // templateTags,
      // templateCustomers,
      // templateSearch,
    },
  });
  return response.data;
};

// Get Single Custom Template API
export const getCustomTemplateAPI = async ({
  token,
  templateId,
}: GetCustomTemplateParamsType) => {
  const response = await axiosInstance.get(`/customTemplate/${templateId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Put Custom Template API
export const putCustomTemplateAPI = async ({
  // token,
  templateId,
  title,
  content,
  beforeTags = [],
  afterTags = [],
  beforeCustomerIds = [],
  afterCustomerIds = [],
}: PutCustomTemplateParamsType) => {
  const response = await axiosInstance.put(`/customTemplate/${templateId}`, {
    templateTitle: title,
    templateContent: content,
    templateBeforeTagIds: beforeTags,
    templateAfterTagIds: afterTags,
    templateBeforeCustomerIds: beforeCustomerIds,
    templateAfterCustomerIds: afterCustomerIds,
  });
  return response.data;
};

// Post Custom Template API
export const postCustomTemplateAPI = async ({
  title,
  content,
  tagIds,
  customers,
}: PostCustomTemplateParamsType) => {
  const response = await axiosInstance.post("/customTemplate", {
    templateTitle: title,
    templateContent: content,
    templateTagIds: tagIds,
    templateCustomerIds: customers,
  });
  return response.data;
};

// Delete Custom Template API
export const deleteCustomTemplateAPI = async ({
  token,
  templateId,
}: DeleteCustomTemplateParamsType) => {
  const response = await axiosInstance.delete(`/customTemplate/${templateId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Post Custom Template Tag API
export const postCustomTemplateTagAPI = async ({
  token,
  templateId,
  tagName,
  tagColor,
}: PostCustomTemplateTagParamsType) => {
  const response = await axiosInstance.post(
    `/customTemplate/${templateId}/tag`,
    {
      tagName,
      tagColor,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// Delete Custom Template Tag API
export const deleteCustomTemplateTagAPI = async ({
  token,
  templateId,
}: DeleteCustomTemplateTagParamsType) => {
  const response = await axiosInstance.delete(
    `/customTemplate/${templateId}/tag`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// Post Custom Template Customer API
export const postCustomTemplateCustomerAPI = async ({
  token,
  templateId,
  customerId,
  customerColor,
}: PostCustomTemplateCustomerParamsType) => {
  const response = await axiosInstance.post(
    `/customTemplate/${templateId}/customer`,
    {
      customerId,
      customerColor,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// Delete Custom Template Customer API
export const deleteCustomTemplateCustomerAPI = async ({
  token,
  templateId,
  customerId,
}: DeleteCustomTemplateCustomerParamsType) => {
  const response = await axiosInstance.delete(
    `/customTemplate/${templateId}/customer/${customerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
