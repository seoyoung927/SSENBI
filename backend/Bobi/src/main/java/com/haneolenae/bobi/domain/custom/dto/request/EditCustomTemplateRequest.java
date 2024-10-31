package com.haneolenae.bobi.domain.custom.dto.request;

import java.util.List;

public class EditCustomTemplateRequest {
	private String templateTitle;
	private String templateContent;
	private List<Integer> templateBeforeTagIds;
	private List<Integer> templateAfterTagIds;
	private List<Integer> templateBeforeCustomerIds;
	private List<Integer> templateAfterCustomerIds;
}
