package com.haneolenae.bobi.domain.custom.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.haneolenae.bobi.domain.custom.dto.response.CustomTemplateResponse;

public interface CustomTemplateService {
	List<CustomTemplateResponse> getCustomTemplates(long memberId, Pageable pageable, List<Integer> templateTags,
		List<Integer> templateCustomer, String templateSearch);
}
