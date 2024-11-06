package com.haneolenae.bobi.domain.customer.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.haneolenae.bobi.domain.customer.dto.request.AddCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.request.DeleteCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.request.UpdateCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.response.CustomerResponse;

public interface CustomerService {
	void addCustomer(long memberId, AddCustomerRequest request);

	CustomerResponse getCustomerDetail(long memberId, long customerId);

	CustomerResponse updateCustomer(long memberId, UpdateCustomerRequest request);

	void delete(long memberId, DeleteCustomerRequest request);

	List<CustomerResponse> getCustomerList(long memberId, Pageable pageable, List<Long> customerTags, String keyword);
}
