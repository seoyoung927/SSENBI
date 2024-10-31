package com.haneolenae.bobi.domain.custom.dto.request;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class AddCustomTemplateRequest {
	private String templateTitle;
	private String templateContent;
	private List<Long> templateTagIds;
	private List<Long> templateCustomerIds;
}
