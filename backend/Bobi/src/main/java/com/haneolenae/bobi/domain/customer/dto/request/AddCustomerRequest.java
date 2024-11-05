package com.haneolenae.bobi.domain.customer.dto.request;

import java.util.List;

import com.haneolenae.bobi.domain.customer.entity.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AddCustomerRequest {

	private String name;
	private int age;
	private Gender gender;
	private String phoneNumber;
	private List<Long> tags;
	private String color;
	private String memo;

}
