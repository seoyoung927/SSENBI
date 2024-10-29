package com.haneolenae.bobi.domain.general.mapper;

import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.haneolenae.bobi.domain.general.dto.response.CategoryResponse;
import com.haneolenae.bobi.domain.general.dto.response.CategoryTemplatesResponse;
import com.haneolenae.bobi.domain.general.dto.response.GeneralTemplateResponse;
import com.haneolenae.bobi.domain.general.entity.Category;
import com.haneolenae.bobi.domain.general.entity.GeneralTemplate;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface GeneralMapper {

	@Mapping(source = "category.id", target = "categoryId")
	@Mapping(source = "category.name", target = "categoryName")
	CategoryResponse toCategoryResponse(Category category);

	@Mapping(source = "generalTemplate.id", target = "templateId")
	@Mapping(source = "generalTemplate.title", target = "templateTitle")
	@Mapping(source = "generalTemplate.content", target = "templateContent")
	@Mapping(source = "generalTemplate.count", target = "count")
	@Mapping(source = "generalTemplate.createdAt", target = "createdAt")
	GeneralTemplateResponse toGeneralTemplateResponse(GeneralTemplate generalTemplate);

	default CategoryTemplatesResponse toCategoryTemplates(Category category) {
		if (category == null) {
			throw new IllegalArgumentException("category cannot be null");
		}
		return new CategoryTemplatesResponse(category.getName(),
			category.getGeneralTemplates().stream()
				.map(this::toGeneralTemplateResponse)
				.collect(Collectors.toList())
		);
	}
}
