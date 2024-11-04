package com.haneolenae.bobi.domain.customer.service;

import org.springframework.stereotype.Service;

import com.haneolenae.bobi.domain.customer.dto.request.AddCustomerRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

	@Override
	public void addCustomer(long memberId, AddCustomerRequest request) {
		// TODO: memberId 유효성 검사

		// TODO: request 유효성 검사
			// TODO: tags 유효성 검사

		// TODO: 고객 추가
	}
}
