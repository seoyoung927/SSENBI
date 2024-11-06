package com.haneolenae.bobi.domain.tag.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.domain.tag.dto.request.TagRequest;
import com.haneolenae.bobi.domain.tag.dto.request.TagDeleteRequest;
import com.haneolenae.bobi.domain.tag.dto.request.TagUpdateRequest;
import com.haneolenae.bobi.domain.tag.dto.response.TagResponse;
import com.haneolenae.bobi.domain.tag.dto.response.TagsResponse;
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

	@GetMapping
	public ResponseEntity<ApiResponse<TagsResponse>> createTag(@RequestHeader("Authorization") String accessToken) {
		Long memberId = jwtTokenProvider.getIdFromToken(accessToken);

		return ResponseEntity.ok(new ApiResponse<>(tagService.getAll(memberId)));
	}

	@PostMapping
	public ResponseEntity<ApiResponse<TagResponse>> createTag(@RequestHeader("Authorization") String accessToken,
		@RequestBody @Valid
		TagRequest request) {
		Long memberId = jwtTokenProvider.getIdFromToken(accessToken);

		return ResponseEntity.ok(new ApiResponse<>(tagService.create(memberId, request)));
	}

	@PutMapping("/{tagId}")
	public ResponseEntity<ApiResponse<TagResponse>> updateTag(@RequestHeader("Authorization") String accessToken,
		@PathVariable("tagId") Long tagId,
		@RequestBody @Valid
		TagRequest request) {
		Long memberId = jwtTokenProvider.getIdFromToken(accessToken);

		return ResponseEntity.ok(new ApiResponse<>(tagService.update(memberId, tagId, request)));
	}

	@DeleteMapping("/{tagId}")
	public ResponseEntity<ApiResponse<String>> updateTag(@RequestHeader("Authorization") String accessToken,
		@PathVariable("tagId") Long tagId) {
		Long memberId = jwtTokenProvider.getIdFromToken(accessToken);

		tagService.delete(memberId, tagId);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}
}
