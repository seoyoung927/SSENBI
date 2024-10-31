package com.haneolenae.bobi.domain.custom.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.haneolenae.bobi.domain.custom.dto.request.AddCustomTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.response.CustomCustomerResponse;
import com.haneolenae.bobi.domain.custom.dto.response.CustomTagResponse;
import com.haneolenae.bobi.domain.custom.dto.response.CustomTemplateResponse;
import com.haneolenae.bobi.domain.custom.entity.CustomTemplate;
import com.haneolenae.bobi.domain.custom.entity.TemplateCustomer;
import com.haneolenae.bobi.domain.custom.entity.TemplateTag;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CustomTemplateMapper {

	@Mapping(source = "id", target = "templateId")
	@Mapping(source = "title", target = "templateTitle")
	@Mapping(source = "content", target = "templateContent")
	@Mapping(source = "count", target = "templateUsageCount")
	@Mapping(source = "createdAt", target = "templateCreatedAt")
	@Mapping(target = "templateTags", expression = "java(mapTemplateTags(customTemplate.getTemplateTags()))")
	@Mapping(target = "templateCustomers", expression = "java(mapTemplateCustomers(customTemplate.getTemplateCustomers()))")
	CustomTemplateResponse toCustomTemplateResponse(CustomTemplate customTemplate);

	default CustomTemplate toCustomTemplate(AddCustomTemplateRequest request) {
		return new CustomTemplate(request.getTemplateTitle(), request.getTemplateContent(), 0);
	}

	default List<CustomTagResponse> mapTemplateTags(List<TemplateTag> templateTags) {
		return templateTags.stream()
			.map(tag -> new CustomTagResponse(tag.getTag().getId(), tag.getTag().getName(), tag.getTag().getColor()))
			.toList();
	}

	default List<CustomCustomerResponse> mapTemplateCustomers(List<TemplateCustomer> templateCustomers) {
		return templateCustomers.stream()
			.map(
				customer -> new CustomCustomerResponse(customer.getCustomer().getId(), customer.getCustomer().getName(),
					customer.getCustomer().getColor()))
			.toList();
	}
}
