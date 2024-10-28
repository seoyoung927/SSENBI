package com.haneolenae.bobi.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberRegistRequest {
	private String memberId;
	private String password;
	private String name;
	private String business;
	private String personalPhoneNumber;
	private String businessPhoneNumber;
}
