package com.haneolenae.bobi.domain.custom.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class EditCustomTemplateRequest {
	private String templateTitle;
	private String templateContent;
	private List<Long> templateAfterTagIds;
	private List<Long> templateAfterCustomerIds;
}
