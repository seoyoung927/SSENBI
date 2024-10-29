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

import com.haneolenae.bobi.domain.custom.service.CustomTemplateService;

@RestController
@RequestMapping("/customTemplate")
public class CustomTemplateController {

	private final CustomTemplateService customTemplateService;

	public CustomTemplateController(CustomTemplateService customTemplateService){
		this.customTemplateService = customTemplateService;
	}
	@GetMapping
	public ResponseEntity<?> searchCustomTemplates(@RequestHeader("Authorization") String token,
		Pageable pageable,
		@RequestParam List<Integer> templateTags,
		@RequestParam List<Integer> templateCustomers,
		@RequestParam String templateSearch
		) {
		//	long memberId = tokenProvider.getId(accessToken);
		long memberId = 0L;
		customTemplateService.getCustomTemplates(memberId,pageable, templateTags, templateCustomers, templateSearch);
		return new ResponseEntity<>(HttpStatus.OK);

	}

	@GetMapping("/{templateId}")
	public ResponseEntity<?> getCustomTemplate(@PathVariable("templateId") long templateId) {
	}

	@PutMapping("/{templateId}")
	public ResponseEntity<?> editCustomTemplate(@PathVariable("templateId") long templateId,
		@RequestBody EditCustomTemplateRequest editCustomTemplateRequest) {

	}

	@PostMapping
	public ResponseEntity<?> addCustomTemplate(@RequestBody AddCostomTemplateRequest){

	}

	@DeleteMapping("/{templateId}")
	public ResponseEntity<?> deleteCustomTemplate(@PathVariable("templateId") long templateId) {

	}

	@PostMapping("/{templateId}/tag")
	public ResponseEntity<?> addTagToCustomTemplate(@PathVariable("templateId") long templateId){

	}
	@DeleteMapping("/{templateId}/tag/{tagId}")
	public ResponseEntity<?> deleteTagFromCustomTemplate(@PathVariable("templateId") long templateId, @PathVariable("tagId") long tagId){

	}

	@PostMapping("/{templateId}/customer")
	public ResponseEntity<?> addCustomerToCustomTemplate(@PathVariable("templateId") long templateId){

	}
	@DeleteMapping("/{templateId}/customer/{customerId}")
	public ResponseEntity<?> deleteCustomerFromCustomTemplate(@PathVariable("templateId") long templateId, @PathVariable("customerId") long tagId){

	}



}
