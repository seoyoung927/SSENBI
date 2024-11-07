package com.haneolenae.bobi.domain.customer.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.haneolenae.bobi.domain.customer.dto.request.AddCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.request.DeleteCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.request.UpdateCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.response.CustomerResponse;

public interface CustomerService {
	void addCustomer(Long memberId, AddCustomerRequest request);

	CustomerResponse getCustomerDetail(Long memberId, Long customerId);

	CustomerResponse updateCustomer(Long memberId, Long customerId, UpdateCustomerRequest request);

	void delete(Long memberId, Long customerId);

	List<CustomerResponse> getCustomerList(Long memberId, Pageable pageable, List<Long> customerTags, String keyword);
}
