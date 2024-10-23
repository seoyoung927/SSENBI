package com.haneolenae.bobi.global.exception;

import lombok.Getter;

/**
 * Structure
 * enumName(httpStatus, customCode, customMsg)
 *
 * 예외를 만드는 법
 * 1. ApiCode에서 커스텀코드와 커스텀 메시지를 포함하는 enum을 생성한다.
 * 2. ApiType에 HttpStatus와 ApiCode를 포함하는 enum을 생성한다.
 * 3-1. 원하는 위치에서 throw new ApiException(ApiType.SAMPLE_ERROR); 를 실행한다.
 * 3-2. throw new ApiException(ApiType.SAMPLE_ERROR, new errorObj); 가능.
 * 		단, errorObj에 @Getter 가 붙어있어야 함.
 */
@Getter
public class ApiException extends RuntimeException {

	private final ApiType apiType;
	private final Object result;

	public ApiException(ApiType apiType) {
		this(apiType, "");
	}

	public ApiException(ApiType apiType, Object result) {
		this.apiType = apiType;
		this.result = result;
	}
}
