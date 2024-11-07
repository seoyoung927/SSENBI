package com.haneolenae.bobi.domain.customer.dto.request;

import java.util.List;

import com.haneolenae.bobi.domain.customer.entity.Gender;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCustomerRequest {
	@Pattern(
		regexp = "^[가-힣0-9!@#$%^&*()]{2,10}$",
		message = "고객 이름은 한글,숫자로 이루어진 2~10자리여야 합니다."
	)
	private String customerName;
	private int customerAge;
	private Gender customerGender;
	@Pattern(
		regexp = "^[0-9]{11}$",
		message = "전화번호는 숫자로만 이루어진 11자리여야 합니다."
	)
	private String customerPhoneNumber;
	@NotNull(message = "변경 하려는 태그가 null로 입력되었습니다.")
	private List<Long> customerTags;
	@Size(max = 300, message = "메모의 길이는 300자 이내여야 합니다.")
	private String customerMemo;
}
