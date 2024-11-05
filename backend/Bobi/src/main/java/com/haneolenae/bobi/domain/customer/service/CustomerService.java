package com.haneolenae.bobi.domain.customer.service;

import com.haneolenae.bobi.domain.customer.dto.request.AddCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.response.CustomerDetailResponse;

public interface CustomerService {
	void addCustomer(long memberId, AddCustomerRequest request);

	CustomerDetailResponse getCustomerDetail(long memberId, long customerId);
}
