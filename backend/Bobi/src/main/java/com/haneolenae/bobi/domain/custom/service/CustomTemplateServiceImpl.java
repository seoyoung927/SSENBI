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
import com.haneolenae.bobi.domain.custom.dto.request.ReplicateCustomTemplateRequest;
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
import com.haneolenae.bobi.domain.member.repository.MemberRepository;
import com.haneolenae.bobi.domain.tag.entity.Tag;
import com.haneolenae.bobi.domain.tag.repository.TagRepository;
import com.haneolenae.bobi.global.dto.ApiType;
import com.haneolenae.bobi.global.exception.ApiException;

@Service
public class CustomTemplateServiceImpl implements CustomTemplateService {

	private final CustomTemplateMapper customTemplateMapper;
	private final CustomTemplateRepository customTemplateRepository;
	private final TemplateTagRepository templateTagRepository;
	private final TemplateCustomerRepository templateCustomerRepository;
	private final TagRepository tagRepository;
	private final CustomerRepository customerRepository;
	private final MemberRepository memberRepository;

	public CustomTemplateServiceImpl(CustomTemplateMapper customTemplateMapper,
		CustomTemplateRepository customTemplateRepository,
		TemplateTagRepository templateTagRepository, TemplateCustomerRepository templateCustomerRepository,
		TagRepository tagRepository, CustomerRepository customerRepository,
		MemberRepository memberRepository) {
		this.customTemplateMapper = customTemplateMapper;
		this.customTemplateRepository = customTemplateRepository;
		this.templateTagRepository = templateTagRepository;
		this.templateCustomerRepository = templateCustomerRepository;
		this.tagRepository = tagRepository;
		this.customerRepository = customerRepository;
		this.memberRepository = memberRepository;
	}

	@Override
	public List<CustomTemplateResponse> getCustomTemplates(long memberId, Pageable pageable, List<Integer> templateTags,
		List<Integer> templateCustomer, String templateSearch) {
		List<CustomTemplate> customTemplates = customTemplateRepository.findTemplates(pageable, templateTags,
			templateCustomer, templateSearch, memberId).getContent();

		return customTemplates.stream().map(customTemplateMapper::toCustomTemplateResponse)
			.toList();
	}

	@Override
	public CustomTemplateResponse getCustomTemplate(long memberId, long templateId) {
		CustomTemplate customTemplate = customTemplateRepository.findByIdAndMemberId(templateId, memberId)
			.orElseThrow(() -> new ApiException(ApiType.CUSTOM_TEMPLATE_NOT_EXIST));

		return customTemplateMapper.toCustomTemplateResponse(customTemplate);
	}

	@Transactional
	public void addCustomTemplate(long memberId, AddCustomTemplateRequest request) {
		CustomTemplate customTemplate = customTemplateMapper.toCustomTemplate(request,
			memberRepository.getReferenceById(memberId)
		);

		//이제 id 사용 가능
		customTemplateRepository.save(customTemplate);

		//연관관계 맵핑
		addTags(memberId, request.getTemplateTagIds(), customTemplate);

		//연관관계 맵핑
		addCustomers(memberId, request.getTemplateCustomerIds(), customTemplate);
	}

	public void addTags(long memberId, List<Long> tagIds, CustomTemplate customTemplate) {
		if (!tagIds.isEmpty()) {
			List<Tag> tags = tagRepository.findByMemberIdAndIdIn(memberId, tagIds);

			System.out.println(tags.size());
			System.out.println(tagIds.size());
			if (tags.size() != tagIds.size())
				throw new ApiException(ApiType.TAG_NOT_FOUND);

			tags.forEach(tag -> templateTagRepository.save(
				new TemplateTag(customTemplate, tag)
			));
		}
	}

	public void addCustomers(long memberId, List<Long> customerIds, CustomTemplate customTemplate) {
		if (!customerIds.isEmpty()) {
			List<Customer> customers = customerRepository.findByMemberIdAndIdIn(memberId, customerIds);

			if (customers.size() != customerIds.size())
				throw new ApiException(ApiType.CUSTOMER_NOT_FOUND);

			customers.forEach(customer -> templateCustomerRepository.save(
				new TemplateCustomer(customTemplate, customer)
			));
		}
	}

	@Transactional
	public void editCustomTemplate(long memberId, long templateId, EditCustomTemplateRequest request) {
		CustomTemplate customTemplate = customTemplateRepository.findByIdAndMemberId(templateId, memberId)
			.orElseThrow(() -> new ApiException(ApiType.CUSTOM_TEMPLATE_NOT_EXIST));

		//제목과 내용 수정
		customTemplate.editTitleAndContent(request);

		//태그 수정
		editTags(memberId, request, templateId);

		//커스토머 수정
		editCustomer(memberId, request, templateId);
	}

	private void editTags(long memberId, EditCustomTemplateRequest request, long templateId) {
		Set<Long> beforeTagSet = templateTagRepository.getTagIdsByTemplateId(templateId);

		Set<Long> afterTagSet;

		if (request.getTemplateAfterTagIds() != null) {
			afterTagSet = tagRepository.findTagIdByMemberIdAndIdIn(memberId, request.getTemplateAfterTagIds());

			if (afterTagSet.size() != request.getTemplateAfterTagIds().size())
				throw new ApiException(ApiType.TAG_NOT_FOUND);
		} else
			afterTagSet = new HashSet<>();

		// 교집합
		Set<Long> gongtongTagIdSet = new HashSet<>(beforeTagSet);
		gongtongTagIdSet.retainAll(afterTagSet);

		//삭제
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

	private void editCustomer(long memberId, EditCustomTemplateRequest request, long templateId) {
		Set<Long> beforeCustomerSet = templateCustomerRepository.getCustomerIdsByTemplateId(templateId);
		Set<Long> afterCustomerSet;

		if (request.getTemplateAfterCustomerIds() != null) {
			afterCustomerSet = customerRepository.findCustomerIdByMemberIdAndIdIn(memberId,
				request.getTemplateAfterCustomerIds());
			if (afterCustomerSet.size() != request.getTemplateAfterCustomerIds().size())
				throw new ApiException(ApiType.CUSTOMER_NOT_FOUND);
		} else
			afterCustomerSet = new HashSet<>();

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
		CustomTemplate customTemplate = customTemplateRepository.findByIdAndMemberId(templateId, memberId)
			.orElseThrow(() -> new ApiException(ApiType.CUSTOM_TEMPLATE_NOT_EXIST));


		//연관관계 해제
		templateTagRepository.deleteByCustomTemplateId(templateId);

		//연관관계 해제
		templateCustomerRepository.deleteByCustomTemplateId(customTemplate.getId());

		customTemplateRepository.delete(customTemplate);
	}

	@Transactional
	public void addTagToTemplate(long memberId, long templateId, AddTagToTemplateRequest request) {
		templateTagRepository.save(
			new TemplateTag(
				customTemplateRepository.getReferenceById(templateId),
				tagRepository.getReferenceById(request.getTagId())
			)
		);
	}

	@Transactional
	public void addCustomerToTemplate(long memberId, long templateId, AddCustomerToTemplateRequest request) {
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

	@Override
	public void replicateCustomTemplate(long memberId, long templateId, ReplicateCustomTemplateRequest request) {
		CustomTemplate customTemplate = customTemplateRepository.findByIdAndMemberId(templateId, memberId)
			.orElseThrow(() -> new ApiException(ApiType.CUSTOM_TEMPLATE_NOT_EXIST));

		CustomTemplate replicatedCustomTemplate = customTemplate.replicateMe();
		customTemplateRepository.save(replicatedCustomTemplate);

		// 태그와 고객 복사
		if (request.getIsReplicateTagAndCustomer()) {
			customTemplate.getTemplateTags().forEach(templateTag ->
				templateTagRepository.save(
					new TemplateTag(
						replicatedCustomTemplate,
						templateTag.getTag()
					)
				)
			);

			customTemplate.getTemplateCustomers().forEach(templateCustomer ->
				templateCustomerRepository.save(
					new TemplateCustomer(
						replicatedCustomTemplate,
						templateCustomer.getCustomer()
					)
				)
			);
		}
	}
}
