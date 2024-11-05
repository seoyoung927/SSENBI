package com.haneolenae.bobi.domain.member.dto.request;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberUpdateRequest {
	private String business;
	@Pattern(
		regexp = "^[0-9]{11}$",
		message = "개인 전화번호는 숫자로만 이루어진 11자리여야 합니다."
	)
	private String personalPhoneNumber;
	@Pattern(
		regexp = "^[0-9]{12}$",
		message = "회사 전화번호는 숫자로만 이루어진 12자리여야 합니다."
	)
	private String businessPhoneNumber;
}
