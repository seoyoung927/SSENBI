package com.haneolenae.bobi.domain.custom.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class AddCustomTemplateRequest {
	@Size(min = 1, max = 30, message = "템플릿의 제목은 30자 이내여야 합니다.")
	private String templateTitle;
	@Size(min = 1, max = 300, message = "템플릿의 내용은 300자 이내여야 합니다.")
	private String templateContent;
	@NotNull(message = "템플릿 태그 배열이 null입니다.")
	private List<Long> templateTagIds;
	@NotNull(message = "템플릿 고객 배열이 null입니다.")
	private List<Long> templateCustomerIds;
}
