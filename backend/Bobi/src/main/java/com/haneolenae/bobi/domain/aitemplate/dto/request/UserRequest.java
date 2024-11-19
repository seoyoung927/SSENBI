package com.haneolenae.bobi.domain.aitemplate.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequest {
	private String content;
	private String requirements;
	private List<Long> tagIds;
	private List<Long> customerIds;
}
