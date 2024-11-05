package com.haneolenae.bobi.domain.member.dto.request;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberUpdatePasswordRequest {
	private String password;
	@Pattern(
		regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$",
		message = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8~20자리여야 합니다."
	)
	private String changePassword;
}
