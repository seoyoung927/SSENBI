package com.haneolenae.bobi.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberUpdateRequest {
	private String business;
	private String personalPhoneNumber;
	private String businessPhoneNumber;
}
