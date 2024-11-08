package com.haneolenae.bobi.domain.custom.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.domain.custom.dto.request.AddCustomTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.request.AddCustomerToTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.request.AddTagToTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.request.EditCustomTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.request.ReplicateCustomTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.response.CustomTemplateResponse;
import com.haneolenae.bobi.domain.custom.service.CustomTemplateService;
import com.haneolenae.bobi.global.dto.ApiResponse;

@RestController
@RequestMapping("/customTemplate")
public class CustomTemplateController {

	private final JwtTokenProvider jwtTokenProvider;
	private final CustomTemplateService customTemplateService;

	public CustomTemplateController(JwtTokenProvider jwtTokenProvider, CustomTemplateService customTemplateService) {
		this.jwtTokenProvider = jwtTokenProvider;
		this.customTemplateService = customTemplateService;
	}

	@GetMapping
	public ResponseEntity<ApiResponse<List<CustomTemplateResponse>>> searchCustomTemplates(
		@RequestHeader("Authorization") String token,
		Pageable pageable,
		@RequestParam(required = false) List<Long> templateTags,
		@RequestParam(required = false) List<Long> templateCustomers,
		@RequestParam(required = false) String keyword
	) {
		long memberId = jwtTokenProvider.getIdFromToken(token);

		return ResponseEntity.ok(new ApiResponse<>(
			customTemplateService.getCustomTemplates(memberId, pageable, templateTags, templateCustomers,
				keyword)));
	}

	@GetMapping("/{templateId}")
	public ResponseEntity<ApiResponse<CustomTemplateResponse>> getCustomTemplate(
		@RequestHeader("Authorization") String token,
		@PathVariable("templateId") long templateId) {
		long memberId = jwtTokenProvider.getIdFromToken(token);

		return ResponseEntity.ok(new ApiResponse<>(customTemplateService.getCustomTemplate(memberId, templateId)));
	}

	@PostMapping
	public ResponseEntity<ApiResponse<String>> addCustomTemplate(@RequestHeader("Authorization") String token,
		@RequestBody AddCustomTemplateRequest request) {
		long memberId = jwtTokenProvider.getIdFromToken(token);

		customTemplateService.addCustomTemplate(memberId, request);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@PutMapping("/{templateId}")
	public ResponseEntity<ApiResponse<String>> editCustomTemplate(
		@RequestHeader("Authorization") String token,
		@PathVariable("templateId") long templateId,
		@RequestBody EditCustomTemplateRequest request) {
		long memberId = jwtTokenProvider.getIdFromToken(token);
		customTemplateService.editCustomTemplate(memberId, templateId, request);
		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@DeleteMapping("/{templateId}")
	public ResponseEntity<ApiResponse<String>> deleteCustomTemplate(@RequestHeader("Authorization") String token,
		@PathVariable("templateId") long templateId) {
		long memberId = jwtTokenProvider.getIdFromToken(token);

		customTemplateService.deleteCustomTemplate(memberId, templateId);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@PostMapping("/{templateId}/tag")
	public ResponseEntity<ApiResponse<String>> addTagToCustomTemplate(@RequestHeader("Authorization") String token,
		@PathVariable("templateId") long templateId,
		@RequestBody AddTagToTemplateRequest request) {
		long memberId = jwtTokenProvider.getIdFromToken(token);
		customTemplateService.addTagToTemplate(memberId, templateId, request);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@DeleteMapping("/{templateId}/tag/{tagId}")
	public ResponseEntity<ApiResponse<String>> deleteTagFromCustomTemplate(@RequestHeader("Authorization") String token,
		@PathVariable("templateId") long templateId,
		@PathVariable("tagId") long tagId) {
		long memberId = jwtTokenProvider.getIdFromToken(token);

		customTemplateService.removeTagFromTemplate(memberId, templateId, tagId);
		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@PostMapping("/{templateId}/customer")
	public ResponseEntity<ApiResponse<String>> addCustomerToCustomTemplate(@RequestHeader("Authorization") String token,
		@PathVariable("templateId") long templateId,
		@RequestBody AddCustomerToTemplateRequest request) {
		long memberId = jwtTokenProvider.getIdFromToken(token);
		customTemplateService.addCustomerToTemplate(memberId, templateId, request);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@DeleteMapping("/{templateId}/customer/{customerId}")
	public ResponseEntity<ApiResponse<String>> deleteCustomerFromCustomTemplate(
		@RequestHeader("Authorization") String token,
		@PathVariable("templateId") long templateId,
		@PathVariable("customerId") long tagId) {
		long memberId = jwtTokenProvider.getIdFromToken(token);
		customTemplateService.removeCustomerFromTemplate(memberId, templateId, tagId);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@PostMapping("/{templateId}/replicate")
	public ResponseEntity<ApiResponse<String>> replicateCustomTemplate(
		@RequestHeader("Authorization") String token,
		@PathVariable long templateId,
		@RequestBody ReplicateCustomTemplateRequest request) {

		long memberId = jwtTokenProvider.getIdFromToken(token);
		customTemplateService.replicateCustomTemplate(memberId, templateId, request);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}
}
