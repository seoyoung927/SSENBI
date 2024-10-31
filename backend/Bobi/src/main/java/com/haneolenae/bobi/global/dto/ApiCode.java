package com.haneolenae.bobi.global.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ApiCode {

	// Success
	S10000("SUCCESS"),
	S10001("CREATED"),

	// Member
	M40401("Member not found"),

	// Customer
	C40401("Customer not found"),

	// Tag
	T40401("Tag not found"),

	// Error
	E10001("This Error is sample error"),

	// Server
	X10000("SERVER_ERROR");

	private final String msg;
}
