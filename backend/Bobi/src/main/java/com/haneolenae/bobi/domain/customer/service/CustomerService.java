package com.haneolenae.bobi.domain.customer.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.haneolenae.bobi.domain.customer.dto.request.AddCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.request.UpdateCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.response.CustomerResponse;
import com.haneolenae.bobi.domain.tag.dto.response.TagStatisticsResponse;

public interface CustomerService {
	CustomerResponse addCustomer(Long memberId, AddCustomerRequest request);

	CustomerResponse getCustomerDetail(Long memberId, Long customerId);

	CustomerResponse updateCustomer(Long memberId, Long customerId, UpdateCustomerRequest request);

	void delete(Long memberId, Long customerId);

	List<CustomerResponse> getCustomerList(Long memberId, Pageable pageable, List<Long> customerTags, String keyword);

	List<TagStatisticsResponse> getCustomerTagStatistics(Long memberId);
}
