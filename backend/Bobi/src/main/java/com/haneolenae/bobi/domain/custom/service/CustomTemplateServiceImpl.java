package com.haneolenae.bobi.domain.custom.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haneolenae.bobi.domain.custom.dto.request.AddCustomTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.request.AddCustomerToTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.request.AddTagToTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.request.EditCustomTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.response.CustomTemplateResponse;
import com.haneolenae.bobi.domain.custom.entity.CustomTemplate;
import com.haneolenae.bobi.domain.custom.entity.TemplateCustomer;
import com.haneolenae.bobi.domain.custom.entity.TemplateTag;
import com.haneolenae.bobi.domain.custom.mapper.CustomTemplateMapper;
import com.haneolenae.bobi.domain.custom.repository.CustomTemplateRepository;
import com.haneolenae.bobi.domain.custom.repository.TemplateCustomerRepository;
import com.haneolenae.bobi.domain.custom.repository.TemplateTagRepository;
import com.haneolenae.bobi.domain.customer.entity.Customer;
import com.haneolenae.bobi.domain.customer.repository.CustomerRepository;
import com.haneolenae.bobi.domain.tag.entity.Tag;
import com.haneolenae.bobi.domain.tag.repository.TagRepository;

@Service
public class CustomTemplateServiceImpl implements CustomTemplateService {

	private final CustomTemplateMapper customTemplateMapper;
	private final CustomTemplateRepository customTemplateRepository;
	private final TemplateTagRepository templateTagRepository;
	private final TemplateCustomerRepository templateCustomerRepository;
	private final TagRepository tagRepository;
	private final CustomerRepository customerRepository;

	public CustomTemplateServiceImpl(CustomTemplateMapper customTemplateMapper,
		CustomTemplateRepository customTemplateRepository,
		TemplateTagRepository templateTagRepository, TemplateCustomerRepository templateCustomerRepository,
		TagRepository tagRepository, CustomerRepository customerRepository) {
		this.customTemplateMapper = customTemplateMapper;
		this.customTemplateRepository = customTemplateRepository;
		this.templateTagRepository = templateTagRepository;
		this.templateCustomerRepository = templateCustomerRepository;
		this.tagRepository = tagRepository;
		this.customerRepository = customerRepository;
	}

	@Override
	public List<CustomTemplateResponse> getCustomTemplates(long memberId, Pageable pageable, List<Integer> templateTags,
		List<Integer> templateCustomer, String templateSearch) {
		List<CustomTemplate> customTemplates = customTemplateRepository.findTemplates(pageable, templateTags,
			templateCustomer, templateSearch).getContent();

		return customTemplates.stream().map(customTemplateMapper::toCustomTemplateResponse)
			.toList();
	}

	@Override
	public CustomTemplateResponse getCustomTemplate(long memberId, long templateId) {
		//CustomTemplate customTemplate = customTemplateRepository.findByIdAndMemberId(templateId);
		//예외 처리 필요
		CustomTemplate customTemplate = customTemplateRepository.findById(templateId)
			.orElseThrow();
		return customTemplateMapper.toCustomTemplateResponse(customTemplate);
	}

	@Transactional
	public void addCustomTemplate(AddCustomTemplateRequest request) {
		CustomTemplate customTemplate = customTemplateMapper.toCustomTemplate(request);

		//이제 id 사용 가능
		customTemplateRepository.save(customTemplate);

		//연관관계 맵핑
		if (!request.getTemplateTagIds().isEmpty()) {
			List<Tag> tags = tagRepository.findByIdIn(request.getTemplateTagIds());
			tags.forEach(tag -> {
				templateTagRepository.save(
					new TemplateTag(customTemplate, tag)
				);
			});
		}

		//연관관계 맵핑
		if (!request.getTemplateCustomerIds().isEmpty()) {
			List<Customer> customers = customerRepository.findByIdIn(
				request.getTemplateCustomerIds());
			customers.forEach(customer -> {
				templateCustomerRepository.save(
					new TemplateCustomer(customTemplate, customer)
				);
			});
		}
	}

	@Transactional
	public void editCustomTemplate(long templateId, EditCustomTemplateRequest request) {
		CustomTemplate customTemplate = customTemplateRepository.findById(templateId).orElseThrow();

		//제목과 내용 수정
		customTemplate.editTitleAndContent(request);

		//태그 수정
		editTags(request, templateId);

		//커스토머 수정
		editCustomer(request, templateId);
	}

	private void editTags(EditCustomTemplateRequest request, long templateId) {
		Set<Long> beforeTagSet = new HashSet<>(request.getTemplateBeforeTagIds());
		Set<Long> afterTagSet = new HashSet<>(request.getTemplateAfterTagIds());

		// 교집합
		Set<Long> gongtongTagIdSet = new HashSet<>(beforeTagSet);
		gongtongTagIdSet.retainAll(afterTagSet);

		beforeTagSet.stream().filter(val -> !gongtongTagIdSet.contains(val))
			.forEach(templateTagRepository::deleteByTagId);

		//저장
		afterTagSet.stream().filter(val -> !gongtongTagIdSet.contains(val))
			.forEach((val) ->
				templateTagRepository.save(new TemplateTag(
					customTemplateRepository.getReferenceById(templateId), tagRepository.getReferenceById(val)
				))
			);

	}

	private void editCustomer(EditCustomTemplateRequest request, long templateId) {
		Set<Long> beforeCustomerSet = new HashSet<>(request.getTemplateBeforeCustomerIds());
		Set<Long> afterCustomerSet = new HashSet<>(request.getTemplateAfterCustomerIds());

		Set<Long> gongtongCustomerIdSet = new HashSet<>(beforeCustomerSet);
		gongtongCustomerIdSet.retainAll(afterCustomerSet);

		beforeCustomerSet.stream().filter(val -> !gongtongCustomerIdSet.contains(val))
			.forEach(templateCustomerRepository::deleteByCustomerId
			);

		afterCustomerSet.stream().filter(val -> !gongtongCustomerIdSet.contains(val))
			.forEach((val) ->
				templateCustomerRepository.save(new TemplateCustomer(
					customTemplateRepository.getReferenceById(templateId),
					customerRepository.getReferenceById(val)
				))
			);
	}

	@Transactional
	public void deleteCustomTemplate(long memberId, long templateId) {
		//예외 던저야함
		CustomTemplate customTemplate = customTemplateRepository.findById(templateId).orElseThrow();

		//연관관계 해제
		templateTagRepository.deleteByCustomTemplateId(templateId);

		//연관관계 해제
		templateCustomerRepository.deleteByCustomTemplateId(customTemplate.getId());

		customTemplateRepository.delete(customTemplate);
	}

	@Transactional
	public void addTagToTemplate(long memberId, long templateId, AddTagToTemplateRequest request) {
		//member로 체크하자

		templateTagRepository.save(
			new TemplateTag(
				customTemplateRepository.getReferenceById(templateId),
				tagRepository.getReferenceById(request.getTagId())
			)
		);
	}

	@Transactional
	public void addCustomerToTemplate(long memberId, long templateId, AddCustomerToTemplateRequest request) {
		//member로 체크하자

		templateCustomerRepository.save(
			new TemplateCustomer(
				customTemplateRepository.getReferenceById(templateId),
				customerRepository.getReferenceById(request.getCustomerId())
			)
		);
	}

	@Transactional
	public void removeCustomerFromTemplate(long memberId, long templateId, long customerId) {
		templateCustomerRepository.deleteByCustomerIdAndCustomTemplateId(customerId, templateId);
	}

	@Transactional
	public void removeTagFromTemplate(long memberId, long templateId, long tagId) {
		templateTagRepository.deleteByTagIdAndCustomTemplateId(tagId, templateId);
	}
}
