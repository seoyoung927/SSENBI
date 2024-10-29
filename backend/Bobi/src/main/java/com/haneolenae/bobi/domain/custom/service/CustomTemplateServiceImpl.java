package com.haneolenae.bobi.domain.custom.service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.haneolenae.bobi.domain.custom.dto.response.CustomTemplateResponse;
import com.haneolenae.bobi.domain.custom.repository.CustomTemplateRepository;

@Service
public class CustomTemplateServiceImpl implements CustomTemplateService {

	private final CustomTemplateRepository customTemplateRepository;

	public CustomTemplateServiceImpl(CustomTemplateRepository customTemplateRepository) {
		this.customTemplateRepository = customTemplateRepository;
	}

	@Override
	public List<CustomTemplateResponse> getCustomTemplates(long memberId, Pageable pageable, List<Integer> templateTags,
		List<Integer> templateCustomer, String templateSearch) {
		
		return List.of();
	}
}
