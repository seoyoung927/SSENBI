package com.haneolenae.bobi.domain.custom.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomTemplateResponse {
	private long templateId;
	private String templateTitle;
	private String templateContent;
	private long templateUsageCount;
	private LocalDateTime templateCreatedAt;
	private List<CustomTagResponse> templateTags;
	private List<CustomCustomerResponse> templateCustomers;
}
