package com.haneolenae.bobi.domain.general.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.haneolenae.bobi.domain.general.dto.request.DuplicateGeneralTemplateRequest;
import com.haneolenae.bobi.domain.general.dto.response.CategoryResponse;
import com.haneolenae.bobi.domain.general.dto.response.CategoryTemplatesResponse;
import com.haneolenae.bobi.domain.general.dto.response.GeneralTemplateResponse;

public interface GeneralService {

	List<CategoryResponse> getCategories();

	List<GeneralTemplateResponse> getTemplatesByCategoryId(long categoryId, Pageable pageable);

	GeneralTemplateResponse getTemplate(long templateId);

	List<CategoryTemplatesResponse> getTemplatesGroupByCategory();

	void duplicateGeneralTemplate(long memberId, DuplicateGeneralTemplateRequest request);
}
