package com.haneolenae.bobi.domain.tag.dto.request;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagUpdateRequest {
	private Long id;
	@Pattern(
		regexp = "^.{1,10}$",
		message = "태그명은 10글자 이내여야 합니다."
	)
	private String name;

	private String color;
}
