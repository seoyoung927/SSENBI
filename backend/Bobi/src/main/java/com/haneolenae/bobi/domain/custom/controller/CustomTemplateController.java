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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.haneolenae.bobi.domain.custom.dto.request.AddCustomTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.request.AddCustomerToTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.request.AddTagToTemplateRequest;
import com.haneolenae.bobi.domain.custom.dto.request.EditCustomTemplateRequest;
import com.haneolenae.bobi.domain.custom.service.CustomTemplateService;
import com.haneolenae.bobi.global.dto.ApiResponse;

@RestController
@RequestMapping("/customTemplate")
public class CustomTemplateController {

	private final CustomTemplateService customTemplateService;

	public CustomTemplateController(CustomTemplateService customTemplateService) {
		this.customTemplateService = customTemplateService;
	}

	@GetMapping
	public ResponseEntity<?> searchCustomTemplates(//@RequestHeader("Authorization") String token,
		Pageable pageable,
		@RequestParam(required = false) List<Integer> templateTags,
		@RequestParam(required = false) List<Integer> templateCustomers,
		@RequestParam(required = false) String templateSearch
	) {
		//long memberId = tokenProvider.getId(accessToken);
		long memberId = 0L;

		return ResponseEntity.ok(
			customTemplateService.getCustomTemplates(memberId, pageable, templateTags, templateCustomers,
				templateSearch));

	}

	@GetMapping("/{templateId}")
	public ResponseEntity<?> getCustomTemplate(//@RequestHeader("Authorization") String token,
		@PathVariable("templateId") long templateId) {
		// 	long memberId = tokenProvider.getId(accessToken);
		long memberId = 0L;

		return ResponseEntity.ok(customTemplateService.getCustomTemplate(memberId, templateId));
	}

	@PostMapping
	public ResponseEntity<?> addCustomTemplate(@RequestBody AddCustomTemplateRequest request) {
		customTemplateService.addCustomTemplate(request);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@PutMapping("/{templateId}")
	public ResponseEntity<?> editCustomTemplate(@PathVariable("templateId") long templateId,
		@RequestBody EditCustomTemplateRequest request) {
		customTemplateService.editCustomTemplate(templateId, request);
		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@DeleteMapping("/{templateId}")
	public ResponseEntity<?> deleteCustomTemplate(//@RequestHeader("Authorization") String token,
		@PathVariable("templateId") long templateId) {
		// long memberId = tokenProvider.getId(accessToken);
		long memberId = 0L;

		customTemplateService.deleteCustomTemplate(memberId, templateId);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@PostMapping("/{templateId}/tag")
	public ResponseEntity<?> addTagToCustomTemplate(@PathVariable("templateId") long templateId, @RequestBody
	AddTagToTemplateRequest request) {
		long memberId = 0L;
		customTemplateService.addTagToTemplate(memberId, templateId, request);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@DeleteMapping("/{templateId}/tag/{tagId}")
	public ResponseEntity<?> deleteTagFromCustomTemplate(@PathVariable("templateId") long templateId,
		@PathVariable("tagId") long tagId) {
		long memberId = 0L;

		customTemplateService.removeTagFromTemplate(memberId, templateId, tagId);
		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@PostMapping("/{templateId}/customer")
	public ResponseEntity<?> addCustomerToCustomTemplate(@PathVariable("templateId") long templateId, @RequestBody
	AddCustomerToTemplateRequest request) {
		long memberId = 0L;
		customTemplateService.addCustomerToTemplate(memberId, templateId, request);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@DeleteMapping("/{templateId}/customer/{customerId}")
	public ResponseEntity<?> deleteCustomerFromCustomTemplate(@PathVariable("templateId") long templateId,
		@PathVariable("customerId") long tagId) {
		long memberId = 0L;
		customTemplateService.removeCustomerFromTemplate(memberId, templateId, tagId);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

}
