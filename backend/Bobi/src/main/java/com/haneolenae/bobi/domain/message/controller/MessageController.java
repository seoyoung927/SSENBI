package com.haneolenae.bobi.domain.message.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.domain.message.dto.request.SendMessageRequest;
import com.haneolenae.bobi.domain.message.dto.response.MessageDetailResponse;
import com.haneolenae.bobi.domain.message.dto.response.MessageResponse;
import com.haneolenae.bobi.domain.message.service.MessageService;
import com.haneolenae.bobi.global.dto.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/message")
public class MessageController {

	private final MessageService messageService;
	private final JwtTokenProvider jwtTokenProvider;

	@GetMapping
	public ResponseEntity<ApiResponse<List<MessageResponse>>> searchMessageList(
		@RequestHeader("Authorization") String token,
		@RequestParam(required = false) String keyword,
		Pageable pageable
	) {
		if (keyword != null && keyword.trim().isEmpty()) {
			keyword = null;
		}

		long memberId = jwtTokenProvider.getIdFromToken(token);

		return ResponseEntity.ok(new ApiResponse<>(messageService.getMessageList(memberId, keyword, pageable)));
	}

	@GetMapping("/{messageId}")
	public ResponseEntity<ApiResponse<MessageDetailResponse>> getMessageDetail(
		@RequestHeader("Authorization") String token,
		@PathVariable("messageId") long messageId) {

		long memberId = jwtTokenProvider.getIdFromToken(token);

		log.info("getMessageDetail messageId: {}", messageId);

		return ResponseEntity.ok(new ApiResponse<>(messageService.getMessageDetail(memberId, messageId)));
	}

	@PostMapping()
	public ResponseEntity<ApiResponse<String>> sendMessage(
		@RequestHeader("Authorization") String token,
		@RequestBody @Valid SendMessageRequest sendMessageRequest) {

		long memberId = jwtTokenProvider.getIdFromToken(token);

		messageService.sendMessage(memberId, sendMessageRequest);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@DeleteMapping("/{messageId}")
	public ResponseEntity<ApiResponse<String>> deleteMessage(
		@RequestHeader("Authorization") String token,
		@PathVariable("messageId") Long messageId
	) {
		long memberId = jwtTokenProvider.getIdFromToken(token);

		messageService.deleteMessage(memberId, messageId);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@GetMapping("/sendtest")
	public ResponseEntity<ApiResponse<String>> sendTestMessage(
		@RequestParam("receiverPhone") String receiverPhone,
		@RequestParam("msg") String msg
	) {
		messageService.sendCoolSms(receiverPhone, msg);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@GetMapping("/statistics")
	public ResponseEntity<?> getMessageTagStatistics(@RequestHeader("Authorization") String token) {
		long memberId = jwtTokenProvider.getIdFromToken(token);

		return ResponseEntity.ok(new ApiResponse<>(messageService.getMessageTagStatistics(memberId)));
	}
}
