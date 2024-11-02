package com.haneolenae.bobi.domain.member.controller;

import java.util.UUID;

import com.haneolenae.bobi.domain.member.dto.response.MemberResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.haneolenae.bobi.domain.member.dto.request.MemberRegistRequest;
import com.haneolenae.bobi.domain.member.dto.request.MemberUpdatePasswordRequest;
import com.haneolenae.bobi.domain.member.dto.request.MemberUpdateRequest;
import com.haneolenae.bobi.domain.member.service.MemberService;
import com.haneolenae.bobi.global.dto.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/member")
public class MemberController {
	private final MemberService memberService;

	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}

	@GetMapping
	public ResponseEntity<ApiResponse<MemberResponse>> getMember(@RequestHeader("Authorization") String accessToken, @RequestBody MemberUpdateRequest request) {
		return ResponseEntity.ok(new ApiResponse<>(memberService.get(accessToken)));
	}

	@PostMapping
	public ResponseEntity<ApiResponse<String>> registMember(@RequestBody MemberRegistRequest memberRegistRequest) {
		log.info("input");
		memberService.regist(memberRegistRequest);
		return ResponseEntity.ok(ApiResponse.ok());
	}

	@PutMapping
	public ResponseEntity<ApiResponse<String>> updateMember(@RequestHeader("Authorization") String accessToken,
		@RequestBody MemberUpdateRequest request) {

		memberService.update(accessToken, request);
		return ResponseEntity.ok(ApiResponse.ok());
	}

	@PatchMapping("/password")
	public ResponseEntity<ApiResponse<String>> updatePassword(@RequestHeader("Authorization") String accessToken,
		@RequestBody MemberUpdatePasswordRequest request) {

		memberService.updatePassword(accessToken, request);
		return ResponseEntity.ok(ApiResponse.ok());
	}

}
