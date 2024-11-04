package com.haneolenae.bobi.domain.custom.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.haneolenae.bobi.domain.custom.dto.request.AddCustomTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.request.AddCustomerToTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.request.AddTagToTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.request.EditCustomTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.request.ReplicateCustomTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.response.CustomTemplateResponse;

public interface CustomTemplateService {
	List<CustomTemplateResponse> getCustomTemplates(long memberId, Pageable pageable, List<Integer> templateTags,
		List<Integer> templateCustomer, String templateSearch);

	CustomTemplateResponse getCustomTemplate(long memberId, long templateId);

	void addCustomTemplate(AddCustomTemplateRequest request);

	void editCustomTemplate(long templateId, EditCustomTemplateRequest request);

	void deleteCustomTemplate(long memberId, long templateId);

	void addTagToTemplate(long memberId, long templateId, AddTagToTemplateRequest request);

	void addCustomerToTemplate(long memberId, long templateId, AddCustomerToTemplateRequest request);

	void removeCustomerFromTemplate(long memberId, long templateId, long customerId);

	void removeTagFromTemplate(long memberId, long templateId, long tagId);

	void replicateCustomTemplate(long memberId, long templateId, ReplicateCustomTemplateRequest request);
}
