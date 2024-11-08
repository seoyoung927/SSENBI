package com.haneolenae.bobi.domain.customer.dto.response;

import java.util.List;

import com.haneolenae.bobi.domain.customer.entity.Gender;
import com.haneolenae.bobi.domain.tag.dto.response.TagResponse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerResponse {
	private long customerId;
	private String customerName;
	private int customerAge;
	private Gender customerGender;
	private String customerPhoneNumber;
	private String customerColor;
	private List<TagResponse> customerTags;
	private String customerMemo;
}
