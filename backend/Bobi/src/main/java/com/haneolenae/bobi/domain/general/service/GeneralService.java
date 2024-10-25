package com.haneolenae.bobi.domain.general.service;

import com.haneolenae.bobi.domain.general.dto.response.CategoryResponse;
import com.haneolenae.bobi.domain.general.dto.response.GeneralTemplateResponse;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;

public interface GeneralService {

    List<CategoryResponse> getCategories();

    List<GeneralTemplateResponse> getTemplatesByCategoryId(long categoryId, Pageable pageable);

    GeneralTemplateResponse getTemplate(long templateId);
}
