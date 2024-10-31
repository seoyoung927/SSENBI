// Get Custom Templates API Params
export type GetCustomTemplatesParams = {
  token: string;
  page?: number;
  size?: number;
  sort?: string;
  templateTags?: number[];
  templateCustomers?: number[];
  templateSearch?: string;
};

// Get Single Custom Template API Params
export type GetCustomTemplateParams = {
  token: string;
  templateId: number;
};

// Put Custom Template API Params
export type PutCustomTemplateParams = {
  token: string;
  templateId: number;
  title: string;
  content: string;
  beforeTags: number[];
  afterTags: number[];
  beforeCustomerIds: number[];
  afterCustomerIds: number[];
};

// Post Custom Template API Params
export type PostCustomTemplateParams = {
  token: string;
  title: string;
  content: string;
  tags: number[];
  customers: number[];
};

// Delete Custom Template API Params
export type DeleteCustomTemplateParams = {
  token: string;
  templateId: number;
};

// Post Custom Template Tag API Params
export type PostCustomTemplateTagParams = {
  token: string;
  templateId: number;
  tagName: string;
  tagColor: string;
};

// Delete Custom Template Tag API Params
export type DeleteCustomTemplateTagParams = {
  token: string;
  templateId: number;
};

// Post Custom Template Customer API Params
export type PostCustomTemplateCustomerParams = {
  token: string;
  templateId: number;
  customerId: number;
  customerColor: string;
};

// Delete Custom Template Customer API Params
export type DeleteCustomTemplateCustomerParams = {
  token: string;
  templateId: number;
  customerId: number;
};
