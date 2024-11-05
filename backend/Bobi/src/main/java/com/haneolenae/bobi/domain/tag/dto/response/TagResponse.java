package com.haneolenae.bobi.domain.tag.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TagResponse {
	private Long id;
	private String name;
	private String color;
}
