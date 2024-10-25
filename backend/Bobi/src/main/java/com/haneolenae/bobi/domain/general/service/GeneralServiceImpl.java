package com.haneolenae.bobi.domain.general.service;


import com.haneolenae.bobi.domain.general.dto.response.CategoryResponse;
import com.haneolenae.bobi.domain.general.dto.response.CategoryTemplatesResponse;
import com.haneolenae.bobi.domain.general.dto.response.GeneralTemplateResponse;
import com.haneolenae.bobi.domain.general.entity.Category;
import com.haneolenae.bobi.domain.general.entity.GeneralTemplate;
import com.haneolenae.bobi.domain.general.mapper.GeneralMapper;
import com.haneolenae.bobi.domain.general.repository.CategoryRepository;
import com.haneolenae.bobi.domain.general.repository.GeneralTemplateRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class GeneralServiceImpl implements GeneralService {

    private final CategoryRepository categoryRepository;
    private final GeneralTemplateRepository generalTemplateRepository;
    private final GeneralMapper generalMapper;

    public GeneralServiceImpl(CategoryRepository categoryRepository,
        GeneralTemplateRepository generalTemplateRepository, GeneralMapper generalMapper) {
        this.categoryRepository = categoryRepository;
        this.generalTemplateRepository = generalTemplateRepository;
        this.generalMapper = generalMapper;
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

}
