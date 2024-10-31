import {
  DeleteCustomTemplateCustomerParams,
  DeleteCustomTemplateParams,
  DeleteCustomTemplateTagParams,
  GetCustomTemplateParams,
  GetCustomTemplatesParams,
  PostCustomTemplateCustomerParams,
  PostCustomTemplateParams,
  PostCustomTemplateTagParams,
  PutCustomTemplateParams,
} from "@/types/customized/customizedTypes";
import axiosInstance from "../axiosInstance";

// Get Custom Templates API
export const getCustomTemplatesAPI = async ({
  token,
  page,
  size,
  sort,
  templateTags,
  templateCustomers,
  templateSearch,
}: GetCustomTemplatesParams) => {
  const response = await axiosInstance.get("/customTemplate", {
    headers: {
      Authorization: token,
    },
    params: {
      page,
      size,
      sort,
      templateTags,
      templateCustomers,
      templateSearch,
    },
  });
  return response.data;
};

// Get Single Custom Template API
export const getCustomTemplateAPI = async ({
  token,
  templateId,
}: GetCustomTemplateParams) => {
  const response = await axiosInstance
    .get(`/customTemplate/${templateId}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.data);
  return response.data;
};

// Put Custom Template API
export const putCustomTemplateAPI = async ({
  token,
  templateId,
  title,
  content,
  beforeTags,
  afterTags,
  beforeCustomerIds,
  afterCustomerIds,
}: PutCustomTemplateParams) => {
  const response = await axiosInstance.put(
    `/customTemplate/${templateId}`,
    {
      templateTitle: title,
      templateContent: content,
      templateBeforeTagIds: beforeTags,
      templateAfterTagIds: afterTags,
      templateBeforeCustomerIds: beforeCustomerIds,
      templateAfterCustomerIds: afterCustomerIds,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return response.data;
};

// Post Custom Template API
export const postCustomTemplateAPI = async ({
  token,
  title,
  content,
  tags,
  customers,
}: PostCustomTemplateParams) => {
  const response = await axiosInstance.post(
    "/customTemplate",
    {
      templateTitle: title,
      templateContent: content,
      templateTagIds: tags,
      templateCustomerIds: customers,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return response.data;
};

// Delete Custom Template API
export const deleteCustomTemplateAPI = async ({
  token,
  templateId,
}: DeleteCustomTemplateParams) => {
  const response = await axiosInstance.delete(`/customTemplate/${templateId}`, {
    headers: {
      Authorization: token,
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
}: PostCustomTemplateTagParams) => {
  const response = await axiosInstance.post(
    `/customTemplate/${templateId}/tag`,
    {
      tagName,
      tagColor,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return response.data;
};

// Delete Custom Template Tag API
export const deleteCustomTemplateTagAPI = async ({
  token,
  templateId,
}: DeleteCustomTemplateTagParams) => {
  const response = await axiosInstance.delete(
    `/customTemplate/${templateId}/tag`,
    {
      headers: {
        Authorization: token,
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
}: PostCustomTemplateCustomerParams) => {
  const response = await axiosInstance.post(
    `/customTemplate/${templateId}/customer`,
    {
      customerId,
      customerColor,
    },
    {
      headers: {
        Authorization: token,
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
}: DeleteCustomTemplateCustomerParams) => {
  const response = await axiosInstance.delete(
    `/customTemplate/${templateId}/customer/${customerId}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return response.data;
};
