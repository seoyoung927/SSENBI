package com.haneolenae.bobi.global.filter;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.haneolenae.bobi.global.exception.ApiException;
import com.haneolenae.bobi.global.dto.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse<String>> handleException(Exception ex) {
		ex.printStackTrace();

		log.error("Exception: {}", ex);
		return ResponseEntity
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.body(ApiResponse.serverError());
	}

	@ExceptionHandler(ApiException.class)
	public ResponseEntity<ApiResponse<Object>> handleCommonApiException(ApiException ex) {
		ex.printStackTrace();
		log.error("ApiException: {}", ex);

		return ResponseEntity
			.status(ex.getApiType().getStatus())
			.body(new ApiResponse<Object>(ex.getApiType(), ex.getResult()));
	}

}
