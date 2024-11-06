package com.haneolenae.bobi.domain.customer.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.domain.customer.dto.request.AddCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.request.DeleteCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.request.UpdateCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.response.CustomerResponse;
import com.haneolenae.bobi.domain.customer.service.CustomerService;
import com.haneolenae.bobi.global.dto.ApiResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/customer")
public class CustomerController {

	private final JwtTokenProvider jwtTokenProvider;
	private final CustomerService customerService;

	@GetMapping
	public ResponseEntity<ApiResponse<List<CustomerResponse>>> searchCustomer(
		@RequestHeader("Authorization") String token,
		Pageable pageable,
		@RequestParam(required = false) List<Long> customerTags,
		@RequestParam(required = false) String keyword
	) {
		log.info("Search customer");

		long memberId = jwtTokenProvider.getIdFromToken(token);

		return ResponseEntity.ok(new ApiResponse<>(
			customerService.getCustomerList(memberId, pageable, customerTags, keyword)
		));
	}

	@GetMapping("/{customerId}")
	public ResponseEntity<ApiResponse<CustomerResponse>> getCustomerDetail(
		@RequestHeader("Authorization") String token,
		@PathVariable("customerId") long customerId
	) {
		long memberId = jwtTokenProvider.getIdFromToken(token);
		return ResponseEntity.ok(new ApiResponse<>(customerService.getCustomerDetail(memberId, customerId)));
	}

	@PostMapping
	public ResponseEntity<ApiResponse<String>> addCustomer(
		@RequestHeader("Authorization") String token,
		@RequestBody AddCustomerRequest request
	) {
		long memberId = jwtTokenProvider.getIdFromToken(token);

		customerService.addCustomer(memberId, request);
		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@PutMapping
	public ResponseEntity<ApiResponse<CustomerResponse>> updateCustomer(
		@RequestHeader("Authorization") String token,
		@RequestBody UpdateCustomerRequest request
	) {
		long memberId = jwtTokenProvider.getIdFromToken(token);
		return ResponseEntity.ok(new ApiResponse<>(customerService.updateCustomer(memberId, request)));
	}

	@DeleteMapping
	public ResponseEntity<ApiResponse<String>> deleteCustomer(
		@RequestHeader("Authorization") String token,
		@RequestBody DeleteCustomerRequest request
	) {
		long memberId = jwtTokenProvider.getIdFromToken(token);

		customerService.delete(memberId, request);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

}
