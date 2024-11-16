package com.haneolenae.bobi.domain.customer.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerExcelResponse {
	private List<CustomerResponse> customers;
}
