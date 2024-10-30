package com.haneolenae.bobi.domain.custom.service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haneolenae.bobi.domain.custom.dto.request.AddCustomTemplateRequest;
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

		return List.of();
	}

	@Override
	public CustomTemplateResponse getCustomTemplate(long memberId, long templateId) {
		//CustomTemplate customTemplate = customTemplateRepository.findByIdAndMemberId(templateId);
		CustomTemplate customTemplate = null;
		return null;
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
	public void deleteCustomTemplate(long memberId, long templateId) {
		//예외 던저야함
		CustomTemplate customTemplate = customTemplateRepository.findById(templateId).orElseThrow();

		//연관관계 해제
		templateTagRepository.deleteByCustomTemplateId(templateId);

		//연관관계 해제
		templateCustomerRepository.deleteByCustomTemplateId(customTemplate.getId());

		customTemplateRepository.delete(customTemplate);
	}
}
