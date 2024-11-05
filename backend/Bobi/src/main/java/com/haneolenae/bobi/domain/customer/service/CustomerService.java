package com.haneolenae.bobi.domain.customer.service;

import com.haneolenae.bobi.domain.customer.dto.request.AddCustomerRequest;

public interface CustomerService {
	void addCustomer(long memberId, AddCustomerRequest request);
}
