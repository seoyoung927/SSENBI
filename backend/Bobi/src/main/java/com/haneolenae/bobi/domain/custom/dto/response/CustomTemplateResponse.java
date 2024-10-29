package com.haneolenae.bobi.domain.custom.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public class CustomTemplateResponse {
	private long templateId;
	private String templateTitle;
	private String templateContent;
	private long templateUsageCount;
	private LocalDateTime templateCreatedAt;
	private List<CustomTagResponse> templateTags;
	private List<CustomCustomerResponse> templateCustomers;
}
