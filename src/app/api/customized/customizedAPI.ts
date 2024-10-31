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
  return axiosInstance
    .get("/customTemplate", {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      params: {
        page,
        size,
        sort,
        templateTags,
        templateCustomers,
        templateSearch,
      },
    })
    .then((response) => response.data);
};

// Get Single Custom Template API
export const getCustomTemplateAPI = async ({
  token,
  templateId,
}: GetCustomTemplateParams) => {
  return axiosInstance
    .get(`/customTemplate/${templateId}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
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
  return axiosInstance
    .put(
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
          "Content-Type": "application/json",
        },
      },
    )
    .then((response) => response.data);
};

// Post Custom Template API
export const postCustomTemplateAPI = async ({
  token,
  title,
  content,
  tags,
  customers,
}: PostCustomTemplateParams) => {
  return axiosInstance
    .post(
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
          "Content-Type": "application/json",
        },
      },
    )
    .then((response) => response.data);
};

// Delete Custom Template API
export const deleteCustomTemplateAPI = async ({
  token,
  templateId,
}: DeleteCustomTemplateParams) => {
  return axiosInstance
    .delete(`/customTemplate/${templateId}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};

// Post Custom Template Tag API
export const postCustomTemplateTagAPI = async ({
  token,
  templateId,
  tagName,
  tagColor,
}: PostCustomTemplateTagParams) => {
  return axiosInstance
    .post(
      `/customTemplate/${templateId}/tag`,
      {
        tagName,
        tagColor,
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    )
    .then((response) => response.data);
};

// Delete Custom Template Tag API
export const deleteCustomTemplateTagAPI = async ({
  token,
  templateId,
}: DeleteCustomTemplateTagParams) => {
  return axiosInstance
    .delete(`/customTemplate/${templateId}/tag`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};

// Post Custom Template Customer API
export const postCustomTemplateCustomerAPI = async ({
  token,
  templateId,
  customerId,
  customerColor,
}: PostCustomTemplateCustomerParams) => {
  return axiosInstance
    .post(
      `/customTemplate/${templateId}/customer`,
      {
        customerId,
        customerColor,
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    )
    .then((response) => response.data);
};

// Delete Custom Template Customer API
export const deleteCustomTemplateCustomerAPI = async ({
  token,
  templateId,
  customerId,
}: DeleteCustomTemplateCustomerParams) => {
  return axiosInstance
    .delete(`/customTemplate/${templateId}/customer/${customerId}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};
