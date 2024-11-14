package com.haneolenae.bobi.domain.aitemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haneolenae.bobi.domain.aitemplate.dto.request.UserRequest;
import com.haneolenae.bobi.domain.aitemplate.service.AiTemplateService;
import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.global.dto.ApiResponse;

@RestController
@RequestMapping("/ai")
public class AiTemplateController {

	private final AiTemplateService aiTemplateService;
	private final JwtTokenProvider jwtTokenProvider;

	public AiTemplateController(AiTemplateService aiTemplateService, JwtTokenProvider jwtTokenProvider) {
		this.aiTemplateService = aiTemplateService;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@PostMapping("/ask")
	public ResponseEntity<ApiResponse<String>> askAi(@RequestHeader("Authorization") String token,
		@RequestBody UserRequest request) {
		long memberId = jwtTokenProvider.getIdFromToken(token);
		return ResponseEntity.ok(new ApiResponse<>(aiTemplateService.askAi(memberId, request)));
	}
}
