package com.haneolenae.bobi.domain.message.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.haneolenae.bobi.domain.message.dto.request.SendMessageRequest;
import com.haneolenae.bobi.domain.message.dto.response.MessageResponse;
import com.haneolenae.bobi.domain.message.service.MessageService;
import com.haneolenae.bobi.global.dto.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/message")
public class MessageController {

	private final MessageService messageService;
	private static final Logger log = LoggerFactory.getLogger(MessageController.class);

	@GetMapping
	public ResponseEntity<ApiResponse<List<MessageResponse>>> searchMessageList(
		//@RequestHeader("Authorization") String token,
		@RequestParam(required = false) String keyword
	){
		long memberId = 1L;
		return ResponseEntity.ok(new ApiResponse<>(messageService.getMessageList(memberId, keyword)));
	}

	@GetMapping("/{messageId}")
	public ResponseEntity<?> getMessageDetail(@PathVariable("messageId") int messageId){
		log.info("getMessageDetail messageId: {}", messageId);
		return ResponseEntity.ok().build();
	}

	@PostMapping()
	public ResponseEntity<ApiResponse<String>> sendMessage(
		// @RequestHeader("Authorization") String token,
		@RequestBody SendMessageRequest sendMessageRequest){

		// token에서 memberId 추출
		long tempMemberId = 1;
		messageService.sendMessage(tempMemberId, sendMessageRequest);

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	public ResponseEntity<?> deleteMessage(){
		return ResponseEntity.ok().build();
	}


}
