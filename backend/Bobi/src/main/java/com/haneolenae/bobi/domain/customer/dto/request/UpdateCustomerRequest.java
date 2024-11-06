package com.haneolenae.bobi.domain.customer.dto.request;

import java.util.List;

import com.haneolenae.bobi.domain.customer.entity.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCustomerRequest {
	private long id;
	private String name;
	private int age;
	private Gender gender;
	private String phoneNumber;
	private List<Integer> prevTags;
	private List<Integer> curTags;
	private String memo;
}
