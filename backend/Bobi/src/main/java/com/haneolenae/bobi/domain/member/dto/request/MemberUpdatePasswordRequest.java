package com.haneolenae.bobi.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberUpdatePasswordRequest {
	private String password;
	private String changePassword;
}
