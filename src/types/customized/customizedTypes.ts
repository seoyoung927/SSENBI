// Get Custom Templates API Params
export type GetCustomTemplatesParamsType = {
  token: string;
  page?: number;
  size?: number;
  sort?: string;
  templateTags?: number[];
  templateCustomers?: number[];
  templateSearch?: string;
};

// Get Single Custom Template API Params
export type GetCustomTemplateParamsType = {
  token: string;
  templateId: string;
};

// Put Custom Template API Params
export type PutCustomTemplateParamsType = {
  token?: string;
  templateId: number;
  title: string;
  content: string;
  beforeTags?: number[];
  afterTags?: number[];
  beforeCustomerIds?: number[];
  afterCustomerIds?: number[];
};

// Post Custom Template API Params
export type PostCustomTemplateParamsType = {
  title: string;
  content: string;
  tagIds: number[];
  customers: number[];
};

// Delete Custom Template API Params
export type DeleteCustomTemplateParamsType = {
  token: string;
  templateId: number;
};

// Post Custom Template Tag API Params
export type PostCustomTemplateTagParamsType = {
  token: string;
  templateId: number;
  tagName: string;
  tagColor: string;
};

// Delete Custom Template Tag API Params
export type DeleteCustomTemplateTagParamsType = {
  token: string;
  templateId: number;
};

// Post Custom Template Customer API Params
export type PostCustomTemplateCustomerParamsType = {
  token: string;
  templateId: number;
  customerId: number;
  customerColor: string;
};

// Delete Custom Template Customer API Params
export type DeleteCustomTemplateCustomerParamsType = {
  token: string;
  templateId: number;
  customerId: number;
};
