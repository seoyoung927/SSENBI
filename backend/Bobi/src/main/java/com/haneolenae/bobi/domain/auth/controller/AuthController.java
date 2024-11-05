package com.haneolenae.bobi.domain.auth.controller;

import com.haneolenae.bobi.domain.auth.dto.request.LoginRequest;
import com.haneolenae.bobi.domain.auth.dto.response.TokenResponse;
import com.haneolenae.bobi.domain.auth.service.AuthService;
import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.global.dto.ApiResponse;
import com.haneolenae.bobi.global.dto.ApiType;
import com.haneolenae.bobi.global.exception.ApiException;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
	private final AuthService authService;
	private final JwtTokenProvider jwtTokenProvider;

	public AuthController(AuthService authService, JwtTokenProvider jwtTokenProvider) {
		this.authService = authService;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@PostMapping("/login")
	public ResponseEntity<ApiResponse<String>> login(@RequestBody LoginRequest loginRequest,
		HttpServletRequest request,
		HttpServletResponse response) {
		String sessionId = request.getSession().getId();
		TokenResponse tokens = authService.login(loginRequest, sessionId);

		Cookie refreshTokenCookie = generateRefreshTokenCookie(tokens.getRefreshToken());
		response.addCookie(refreshTokenCookie);
		response.addHeader("Authorization", tokens.getAccessToken());

		return ResponseEntity.ok(ApiResponse.ok());
	}

	@PostMapping("/logout")
	public ResponseEntity<ApiResponse<String>> logout(@RequestHeader("Authorization") String accessHeader,
		@CookieValue(value = "refreshToken", defaultValue = "") String refreshToken, HttpServletRequest request) {
		if (refreshToken.isEmpty()) {
			throw new ApiException(ApiType.REFRESH_TOKEN_NOT_EXIST);
		}

		String sessionId = request.getSession().getId();
		String accessToken = jwtTokenProvider.getTokenFromHeader(accessHeader);
		Long id = jwtTokenProvider.getIdFromToken(accessHeader);

		authService.logout(id, accessToken, sessionId);
		return ResponseEntity.ok(ApiResponse.ok());
	}

	@PostMapping("/refresh")
	public ResponseEntity<ApiResponse<String>> refresh(
		@CookieValue(value = "refreshToken", defaultValue = "") String refreshToken, HttpServletRequest request) {
		if (refreshToken.isEmpty()) {
			throw new ApiException(ApiType.REFRESH_TOKEN_NOT_EXIST);
		}

		String sessionId = request.getSession().getId();

		authService.refresh(refreshToken, sessionId);
		return ResponseEntity.ok(ApiResponse.ok());
	}

	private Cookie generateRefreshTokenCookie(String refreshToken) {
		Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
		refreshTokenCookie.setHttpOnly(false); // JavaScript에서 쿠키 접근을 막음 (혀용함)
		refreshTokenCookie.setSecure(false);   // HTTPS를 통해서만 전송되도록 설정 (안함)
		refreshTokenCookie.setPath("/");      // 쿠키가 전체 도메인에서 사용될 수 있도록 설정
		refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 쿠키의 유효 기간을 7일로 설정 (필요에 따라 조정)

		return refreshTokenCookie;
	}

}
