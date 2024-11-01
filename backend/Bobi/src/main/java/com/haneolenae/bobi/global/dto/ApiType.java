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

	//400
	LOGIN_FAILED(HttpStatus.BAD_REQUEST, ApiCode.A40001, ApiCode.A40001.getMsg()),
	REFRESH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, ApiCode.A40101, ApiCode.A40101.getMsg()),
	REFRESH_TOKEN_NOT_SAME(HttpStatus.FORBIDDEN, ApiCode.A40301, ApiCode.A40301.getMsg()),

	MEMBER_REQUEST_INVALID(HttpStatus.BAD_REQUEST, ApiCode.M40001, ApiCode.M40001.getMsg()),
	MEMBER_PASSWORD_INVALID(HttpStatus.UNAUTHORIZED, ApiCode.M40101, ApiCode.M40101.getMsg()),
	MEMBER_NOT_EXIST(HttpStatus.NOT_FOUND, ApiCode.M40401, ApiCode.M40401.getMsg()),
	MEMBER_ALREADY_REGIST(HttpStatus.CONFLICT, ApiCode.M40901, ApiCode.M40901.getMsg()),

	// 500
	SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, ApiCode.X10000, ApiCode.X10000.getMsg());

	private final HttpStatus status;
	private final ApiCode code;
	private final String message;
}
