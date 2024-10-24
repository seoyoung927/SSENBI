package com.haneolenae.bobi.global.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.Getter;

@Getter
@JsonPropertyOrder({"status", "code", "message", "result"})
public class ApiResponse<T> {

	private final String code;
	private final String message;
	private final T result;

	public ApiResponse(ApiType apiType, T result) {
		this.code = apiType.getCode().toString();
		this.message = apiType.getMessage();
		this.result = result;
	}

	public ApiResponse(T result) {
		this.code = ApiType.SUCCESS.getCode().toString();
		this.message = ApiType.SUCCESS.getMessage();
		this.result = result;
	}

	public static ApiResponse<String> ok() {
		return new ApiResponse<>(ApiType.SUCCESS, "");
	}

	public static ApiResponse<String> created() {
		return new ApiResponse<>(ApiType.CREATED, "");
	}

	public static ApiResponse<String> serverError() {
		return new ApiResponse<>(ApiType.SERVER_ERROR, "");
	}
}
