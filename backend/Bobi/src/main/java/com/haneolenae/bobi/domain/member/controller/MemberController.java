package com.haneolenae.bobi.domain.member.controller;

import java.util.UUID;

import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.domain.member.dto.response.MemberOverviewResponse;
import com.haneolenae.bobi.domain.member.dto.response.MemberResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.haneolenae.bobi.domain.member.dto.request.MemberRegistRequest;
import com.haneolenae.bobi.domain.member.dto.request.MemberUpdatePasswordRequest;
import com.haneolenae.bobi.domain.member.dto.request.MemberUpdateRequest;
import com.haneolenae.bobi.domain.member.service.MemberService;
import com.haneolenae.bobi.global.dto.ApiResponse;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/member")
public class MemberController {
	private final MemberService memberService;
	private final JwtTokenProvider jwtTokenProvider;

	public MemberController(MemberService memberService, JwtTokenProvider jwtTokenProvider) {
		this.memberService = memberService;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@GetMapping
	public ResponseEntity<ApiResponse<MemberResponse>> getMember(@RequestHeader("Authorization") String accessToken) {
		Long id = jwtTokenProvider.getIdFromToken(accessToken);
		return ResponseEntity.ok(new ApiResponse<>(memberService.get(id)));
	}

	@GetMapping("/overview")
	public ResponseEntity<ApiResponse<MemberOverviewResponse>> getMemberOverview(
		@RequestHeader("Authorization") String accessToken) {
		Long id = jwtTokenProvider.getIdFromToken(accessToken);

		return ResponseEntity.ok(new ApiResponse<>(memberService.getOverview(id)));
	}

	@PostMapping
	public ResponseEntity<ApiResponse<String>> registMember(
		@RequestBody @Valid MemberRegistRequest memberRegistRequest) {
		memberService.regist(memberRegistRequest);
		return ResponseEntity.ok(ApiResponse.ok());
	}

	@PutMapping
	public ResponseEntity<ApiResponse<String>> updateMember(@RequestHeader("Authorization") String accessToken,
		@RequestBody @Valid MemberUpdateRequest request) {
		Long id = jwtTokenProvider.getIdFromToken(accessToken);

		memberService.update(id, request);
		return ResponseEntity.ok(ApiResponse.ok());
	}

	@PatchMapping("/password")
	public ResponseEntity<ApiResponse<String>> updatePassword(@RequestHeader("Authorization") String accessToken,
		@RequestBody @Valid MemberUpdatePasswordRequest request) {
		Long id = jwtTokenProvider.getIdFromToken(accessToken);

		memberService.updatePassword(id, request);
		return ResponseEntity.ok(ApiResponse.ok());
	}

}
