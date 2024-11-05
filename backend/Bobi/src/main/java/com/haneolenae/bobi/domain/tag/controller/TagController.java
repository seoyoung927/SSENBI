package com.haneolenae.bobi.domain.tag.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.domain.tag.dto.request.TagCreateRequest;
import com.haneolenae.bobi.domain.tag.service.TagService;
import com.haneolenae.bobi.global.dto.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/tag")
public class TagController {
	private final TagService tagService;
	private final JwtTokenProvider jwtTokenProvider;

	public TagController(TagService tagService, JwtTokenProvider jwtTokenProvider, JwtTokenProvider jwtTokenProvider1) {
		this.tagService = tagService;
		this.jwtTokenProvider = jwtTokenProvider1;
	}

	@PostMapping
	public ResponseEntity<ApiResponse<String>> createTag(@RequestHeader("Authorization") String accessToken,
		@RequestBody @Valid
		TagCreateRequest request) {
		Long memberId = jwtTokenProvider.getIdFromToken(accessToken);

		tagService.create(memberId, request);

		return null;
	}
}
