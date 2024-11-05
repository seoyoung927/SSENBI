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

	// Member
	MEMBER_REQUEST_INVALID(HttpStatus.BAD_REQUEST, ApiCode.M40001, ApiCode.M40001.getMsg()),
	MEMBER_PASSWORD_INVALID(HttpStatus.UNAUTHORIZED, ApiCode.M40101, ApiCode.M40101.getMsg()),
	MEMBER_NOT_EXIST(HttpStatus.NOT_FOUND, ApiCode.M40401, ApiCode.M40401.getMsg()),
	MEMBER_ALREADY_REGIST(HttpStatus.CONFLICT, ApiCode.M40901, ApiCode.M40901.getMsg()),

	// Auth
	LOGIN_FAILED(HttpStatus.BAD_REQUEST, ApiCode.A40001, ApiCode.A40001.getMsg()),
	REFRESH_TOKEN_NOT_EXIST(HttpStatus.BAD_REQUEST, ApiCode.A40002, ApiCode.A40002.getMsg()),
	REFRESH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, ApiCode.A40101, ApiCode.A40101.getMsg()),
	ACCESS_TOKEN_INVALID(HttpStatus.UNAUTHORIZED, ApiCode.A40102, ApiCode.A40102.getMsg()),
	REFRESH_TOKEN_NOT_SAME(HttpStatus.FORBIDDEN, ApiCode.A40301, ApiCode.A40301.getMsg()),

	// Customer
	CUSTOMER_NOT_FOUND(HttpStatus.NOT_FOUND, ApiCode.C40401, ApiCode.C40401.getMsg()),

	// Tag
	TAG_COLOR_INVALID(HttpStatus.BAD_REQUEST, ApiCode.T40001, ApiCode.T40001.getMsg()),
	TAG_MEMBER_INVALID(HttpStatus.FORBIDDEN, ApiCode.T40301, ApiCode.T40301.getMsg()),
	TAG_NOT_FOUND(HttpStatus.NOT_FOUND, ApiCode.T40401, ApiCode.T40401.getMsg()),
	TAG_NAME_EXIST(HttpStatus.CONFLICT, ApiCode.T40901, ApiCode.T40901.getMsg()),

	// Message
	EXTERNAL_MESSAGE_SERVICE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, ApiCode.MS50001, ApiCode.MS50001.getMsg()),
	MESSAGE_NOT_FOUND(HttpStatus.NOT_FOUND, ApiCode.MS40401, ApiCode.MS40401.getMsg()),

	CUSTOM_TEMPLATE_NOT_EXIST(HttpStatus.NOT_FOUND, ApiCode.C40401, ApiCode.C40401.getMsg()),

	GENERAL_TEMPLATE_NOT_EXIST(HttpStatus.NOT_FOUND, ApiCode.G40401, ApiCode.G40401.getMsg()),

	// 400
	REQUEST_DATA_ERROR(HttpStatus.BAD_REQUEST, ApiCode.R40001, ApiCode.R40001.getMsg()),
	// 500
	SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, ApiCode.X10000, ApiCode.X10000.getMsg());

	private final HttpStatus status;
	private final ApiCode code;
	private final String message;
}
