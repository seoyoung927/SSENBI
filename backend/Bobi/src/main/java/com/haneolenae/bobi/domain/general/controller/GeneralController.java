package com.haneolenae.bobi.domain.general.controller;

import com.haneolenae.bobi.domain.general.service.GeneralService;
import com.haneolenae.bobi.global.dto.ApiResponse;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/general")
public class GeneralController {

    private final GeneralService generalService;

    public GeneralController(GeneralService generalService) {
        this.generalService = generalService;
    }

    @GetMapping("/category")
    public ResponseEntity<?> searchCategories(){
        return ResponseEntity.ok(new ApiResponse<>(generalService.getCategories()));
    }


    @GetMapping("/category/{categoryId}/template")
    public ResponseEntity<?> searchGeneralTemplates(@PathVariable long categoryId, @PageableDefault(sort = "id", direction = Direction.ASC) Pageable pageable){
        return ResponseEntity.ok(new ApiResponse<>(generalService.getTemplatesByCategoryId(categoryId, pageable)));
    }

    @GetMapping("/category/template/{templateId}")
    public ResponseEntity<?> searchGeneralTemplate(@PathVariable long templateId){
        return ResponseEntity.ok(new ApiResponse<>(generalService.getTemplate(templateId)));
    }

    @GetMapping("/template")
    public ResponseEntity<?> searchGeneralTemplates(){
        return ResponseEntity.ok(new ApiResponse<>(generalService.getTemplatesGroupByCategory()));
    }
}
