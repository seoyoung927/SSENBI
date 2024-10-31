// Get Custom Templates API Params
export interface GetCustomTemplatesParams {
  token: string;
  page?: number;
  size?: number;
  sort?: string;
  templateTags?: number[];
  templateCustomers?: number[];
  templateSearch?: string;
}

// Get Single Custom Template API Params
export interface GetCustomTemplateParams {
  token: string;
  templateId: number;
}

// Put Custom Template API Params
export interface PutCustomTemplateParams {
  token: string;
  templateId: number;
  title: string;
  content: string;
  beforeTags: number[];
  afterTags: number[];
  beforeCustomerIds: number[];
  afterCustomerIds: number[];
}

// Post Custom Template API Params
export interface PostCustomTemplateParams {
  token: string;
  title: string;
  content: string;
  tags: number[];
  customers: number[];
}

// Delete Custom Template API Params
export interface DeleteCustomTemplateParams {
  token: string;
  templateId: number;
}

// Post Custom Template Tag API Params
export interface PostCustomTemplateTagParams {
  token: string;
  templateId: number;
  tagName: string;
  tagColor: string;
}

// Delete Custom Template Tag API Params
export interface DeleteCustomTemplateTagParams {
  token: string;
  templateId: number;
}

// Post Custom Template Customer API Params
export interface PostCustomTemplateCustomerParams {
  token: string;
  templateId: number;
  customerId: number;
  customerColor: string;
}

// Delete Custom Template Customer API Params
export interface DeleteCustomTemplateCustomerParams {
  token: string;
  templateId: number;
  customerId: number;
}
