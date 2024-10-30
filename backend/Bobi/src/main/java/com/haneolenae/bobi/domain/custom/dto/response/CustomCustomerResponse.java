package com.haneolenae.bobi.domain.custom.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomCustomerResponse {
	private long customerId;
	private String customerName;
	private String customerColor;
}
