package com.haneolenae.bobi.domain.member.dto.request;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberRegistRequest {
	@Pattern(
		regexp = "^[a-zA-Z0-9]{5,20}$",
		message = "아이디는 영문, 숫자로 이루어진 5~20자리여야 합니다."
	)
	private String memberId;

	@Pattern(
		regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?`~]{8,20}$",
		message = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8~20자리여야 합니다."
	)
	private String password;

	@Pattern(
		regexp = "^[가-힣]{2,10}$",
		message = "사용자 이름은 한글로 이루어진 2~10자리여야 합니다."
	)
	private String name;
	private String business;

	@Pattern(
		regexp = "^[0-9]{11}$",
		message = "개인 전화번호는 숫자로만 이루어진 11자리여야 합니다."
	)
	private String personalPhoneNumber;

	@Pattern(
		regexp = "^[0-9]{11,12}$",
		message = "회사 전화번호는 숫자로만 이루어진 12자리여야 합니다."
	)
	private String businessPhoneNumber;
}
