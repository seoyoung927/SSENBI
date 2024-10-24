package com.haneolenae.bobi.global.dto;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ApiType {

	// 200
	SUCCESS(HttpStatus.OK, ApiCode.S10000, ApiCode.S10000.getMsg()),
	CREATED(HttpStatus.CREATED, ApiCode.S10001, ApiCode.S10001.getMsg()),

	SAMPLE_ERROR(HttpStatus.CONFLICT, ApiCode.E10001, ApiCode.E10001.getMsg()),

	// 500
	SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, ApiCode.X10000, ApiCode.X10000.getMsg());

	private final HttpStatus status;
	private final ApiCode code;
	private final String message;
}
