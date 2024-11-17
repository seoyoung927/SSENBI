package com.haneolenae.bobi.domain.customer.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddCustomerExcelRequest {
	@NotNull
	@Valid
	private List<AddCustomerRequest> customers;
}
