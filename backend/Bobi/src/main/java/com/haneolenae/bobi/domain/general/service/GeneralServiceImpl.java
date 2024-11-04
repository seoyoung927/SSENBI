package com.haneolenae.bobi.domain.general.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.haneolenae.bobi.domain.custom.mapper.CustomTemplateMapper;
import com.haneolenae.bobi.domain.custom.repository.CustomTemplateRepository;
import com.haneolenae.bobi.domain.general.dto.request.DuplicateGeneralTemplateRequest;
import com.haneolenae.bobi.domain.general.dto.response.CategoryResponse;
import com.haneolenae.bobi.domain.general.dto.response.CategoryTemplatesResponse;
import com.haneolenae.bobi.domain.general.dto.response.GeneralTemplateResponse;
import com.haneolenae.bobi.domain.general.entity.GeneralTemplate;
import com.haneolenae.bobi.domain.general.mapper.GeneralMapper;
import com.haneolenae.bobi.domain.general.repository.CategoryRepository;
import com.haneolenae.bobi.domain.general.repository.GeneralTemplateRepository;
import com.haneolenae.bobi.domain.member.repository.MemberRepository;

@Service
public class GeneralServiceImpl implements GeneralService {

	private final CategoryRepository categoryRepository;
	private final GeneralTemplateRepository generalTemplateRepository;
	private final CustomTemplateRepository customTemplateRepository;
	private final GeneralMapper generalMapper;
	private final CustomTemplateMapper customTemplateMapper;
	private final MemberRepository memberRepository;

	public GeneralServiceImpl(CategoryRepository categoryRepository,
		GeneralTemplateRepository generalTemplateRepository, CustomTemplateRepository customTemplateRepository,
		GeneralMapper generalMapper, CustomTemplateMapper customTemplateMapper, MemberRepository memberRepository) {
		this.categoryRepository = categoryRepository;
		this.generalTemplateRepository = generalTemplateRepository;
		this.customTemplateRepository = customTemplateRepository;
		this.generalMapper = generalMapper;
		this.customTemplateMapper = customTemplateMapper;
		this.memberRepository = memberRepository;
	}

	@Override
	public List<CategoryResponse> getCategories() {
		return categoryRepository.findAll().stream()
			.map(generalMapper::toCategoryResponse)
			.collect(Collectors.toList());
	}

	@Override
	public List<GeneralTemplateResponse> getTemplatesByCategoryId(long categoryId,
		Pageable pageable) {
		return generalTemplateRepository.findByCategoryId(categoryId, pageable)
			.getContent().stream()
			.map(generalMapper::toGeneralTemplateResponse)
			.collect(Collectors.toList());
	}

	@Override
	public GeneralTemplateResponse getTemplate(long templateId) {
		return generalMapper.toGeneralTemplateResponse(
			generalTemplateRepository.findById(templateId)
				.orElseThrow(() -> new RuntimeException("Template not found"))
		);
	}

	@Override
	public List<CategoryTemplatesResponse> getTemplatesGroupByCategory() {
		return categoryRepository.findAllWithTemplates()
			.stream()
			.map(generalMapper::toCategoryTemplates)
			.collect(Collectors.toList());
	}

	@Override
	public void duplicateGeneralTemplate(long memberId, DuplicateGeneralTemplateRequest request) {
		GeneralTemplate generalTemplate = generalTemplateRepository.findById(request.getTemplateId()).orElseThrow();

		generalTemplate.countUp();

		customTemplateRepository.save(
			customTemplateMapper.toCustomTemplate(generalTemplate, memberRepository.getReferenceById(memberId))
		);
	}

}
