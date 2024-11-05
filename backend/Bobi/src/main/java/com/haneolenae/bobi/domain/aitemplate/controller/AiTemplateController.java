package com.haneolenae.bobi.domain.aitemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haneolenae.bobi.domain.aitemplate.dto.request.UserRequest;
import com.haneolenae.bobi.domain.aitemplate.service.AiTemplateService;
import com.haneolenae.bobi.global.dto.ApiResponse;

@RestController
@RequestMapping("/ai")
public class AiTemplateController {

	private final AiTemplateService aiTemplateService;

	public AiTemplateController(AiTemplateService aiTemplateService) {
		this.aiTemplateService = aiTemplateService;
	}

	@GetMapping("/ask")
	public ResponseEntity<?> askAi(@RequestBody UserRequest request) {
		return ResponseEntity.ok(new ApiResponse<>(aiTemplateService.askAi(request)));
	}
}
