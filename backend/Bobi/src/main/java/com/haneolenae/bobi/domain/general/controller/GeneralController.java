package com.haneolenae.bobi.domain.general.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.domain.general.dto.request.DuplicateGeneralTemplateRequest;
import com.haneolenae.bobi.domain.general.dto.response.CategoryResponse;
import com.haneolenae.bobi.domain.general.dto.response.CategoryTemplatesResponse;
import com.haneolenae.bobi.domain.general.dto.response.GeneralTemplateResponse;
import com.haneolenae.bobi.domain.general.service.GeneralService;
import com.haneolenae.bobi.global.dto.ApiResponse;

@RestController
@RequestMapping("/general")
public class GeneralController {

	private final JwtTokenProvider jwtTokenProvider;
	private final GeneralService generalService;

	public GeneralController(JwtTokenProvider jwtTokenProvider, GeneralService generalService) {
		this.jwtTokenProvider = jwtTokenProvider;
		this.generalService = generalService;
	}

	@GetMapping("/category")
	public ResponseEntity<ApiResponse<List<CategoryResponse>>> searchCategories() {
		return ResponseEntity.ok(new ApiResponse<>(generalService.getCategories()));
	}

	@GetMapping("/category/{categoryId}/template")
	public ResponseEntity<ApiResponse<List<GeneralTemplateResponse>>> searchGeneralTemplates(
		@PathVariable long categoryId, @PageableDefault(sort = "id", direction = Direction.ASC) Pageable pageable) {
		return ResponseEntity.ok(new ApiResponse<>(generalService.getTemplatesByCategoryId(categoryId, pageable)));
	}

	@GetMapping("/category/template/{templateId}")
	public ResponseEntity<ApiResponse<GeneralTemplateResponse>> searchGeneralTemplate(@PathVariable long templateId) {
		return ResponseEntity.ok(new ApiResponse<>(generalService.getTemplate(templateId)));
	}

	@GetMapping("/template")
	public ResponseEntity<ApiResponse<List<CategoryTemplatesResponse>>> searchGeneralTemplates() {
		return ResponseEntity.ok(new ApiResponse<>(generalService.getTemplatesGroupByCategory()));
	}

	@PostMapping("/template/duplicate")
	public ResponseEntity<ApiResponse<String>> duplicateGeneralTemplate(
		@RequestHeader("Authorization") String token,
		@RequestBody DuplicateGeneralTemplateRequest request) {
		long memberId = jwtTokenProvider.getIdFromToken(token);

		generalService.duplicateGeneralTemplate(memberId, request);
		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}
}
