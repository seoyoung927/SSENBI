package com.haneolenae.bobi.domain.sample;

import java.io.Serializable;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haneolenae.bobi.global.exception.ApiException;
import com.haneolenae.bobi.global.dto.ApiResponse;
import com.haneolenae.bobi.global.dto.ApiType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@RequestMapping("/sample")
@RestController
public class SampleController {

	@GetMapping("/ok")
	public ResponseEntity<ApiResponse<String>> test1() {

		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@GetMapping("/created")
	public ResponseEntity<ApiResponse<String>> test2() {
		return new ResponseEntity<>(ApiResponse.created(), HttpStatus.CREATED);
	}

	@GetMapping("/includeobject")
	public ResponseEntity<ApiResponse<SuccessObject>> test3() {

		SuccessObject obj = new SuccessObject("cup", 1000);

		return ResponseEntity.ok(new ApiResponse<>(obj));
	}

	@Getter
	@AllArgsConstructor
	class SuccessObject {
		String name;
		int price;
	}

	@GetMapping("/error")
	public ResponseEntity<ApiResponse<String>> test4() {

		if (true)
			throw new ApiException(ApiType.SAMPLE_ERROR);

		// this return state never called
		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@GetMapping("/errorwithobject")
	public ResponseEntity<ApiResponse<String>> test5() {

		// ErrorObject must have @GetterAnnotation attached
		if (true)
			throw new ApiException(ApiType.SAMPLE_ERROR, new SampleErrorObject("hi", 1));

		// this return state never called
		return new ResponseEntity<>(ApiResponse.ok(), HttpStatus.OK);
	}

	@Getter
	@AllArgsConstructor
	class SampleErrorObject implements Serializable {
		String name;
		int age;
	}
}
