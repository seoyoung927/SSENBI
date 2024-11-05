package com.haneolenae.bobi.domain.customer.service;

import com.haneolenae.bobi.domain.customer.dto.request.AddCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.request.UpdateCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.response.CustomerResponse;

public interface CustomerService {
	void addCustomer(long memberId, AddCustomerRequest request);

	CustomerResponse getCustomerDetail(long memberId, long customerId);

	CustomerResponse updateCustomer(long memberId, UpdateCustomerRequest request);
}
