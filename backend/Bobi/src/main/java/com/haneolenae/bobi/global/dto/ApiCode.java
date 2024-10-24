package com.haneolenae.bobi.global.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ApiCode {

	// Success
	S10000("SUCCESS"),
	S10001("CREATED"),

	E10001("This Error is sample error"),

	X10000("SERVER_ERROR");

	private final String msg;
}
