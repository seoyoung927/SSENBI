package com.haneolenae.bobi.domain.member.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

	@PostMapping
	public ResponseEntity<ApiResponse<String>> regist(@RequestBody MemberRegistRequest memberRegistRequest) {
		log.info("input");
		memberService.regist(memberRegistRequest);
		return ResponseEntity.ok(ApiResponse.ok());
	}

	@PutMapping
	public ResponseEntity<ApiResponse<String>> update(@RequestHeader("Authorization") String accessToken,
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
