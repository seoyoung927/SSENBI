package com.haneolenae.bobi.global.filter;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.haneolenae.bobi.global.dto.ApiType;
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

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
		HttpHeaders headers, HttpStatusCode status, WebRequest request) {

		ObjectError error = ex.getBindingResult().getAllErrors().get(0);
		String defaultMessage = error.getDefaultMessage();

		log.info("Validation error: {}", defaultMessage);  // 로깅 개선

		String errorMessage = String.format("%s\\n[%s]",
			ApiType.REQUEST_DATA_ERROR.getMessage(),
			defaultMessage
		);

		ApiResponse<Object> response = new ApiResponse<>(
			ApiType.REQUEST_DATA_ERROR,
			errorMessage
		);

		return ResponseEntity
			.status(ApiType.REQUEST_DATA_ERROR.getStatus())
			.body(response);
	}
}
