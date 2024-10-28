package com.haneolenae.bobi.domain.auth.service;

import com.haneolenae.bobi.domain.auth.dto.request.LoginRequest;
import com.haneolenae.bobi.domain.auth.dto.response.RefreshResponse;
import com.haneolenae.bobi.domain.auth.dto.response.TokenResponse;
import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.member.repository.MemberRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;

	public AuthServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder,
		JwtTokenProvider jwtTokenProvider) {
		this.memberRepository = memberRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@Override
	public TokenResponse login(LoginRequest loginRequest, String sessionId) {
		Member member = memberRepository.findByMemberId(loginRequest.getLoginId())
			.orElseThrow(() -> new RuntimeException("A40001"));

		if (!isSamePassword(loginRequest.getPassword(), member.getPassword())) {
			throw new RuntimeException("A40001");
		}

		//토큰 발급
		String accessToken = jwtTokenProvider.createAccessToken(member.getId());
		String refreshToken = jwtTokenProvider.createRefreshToken(member.getId());

		//TODO:refreshToken redis 입력 (key: userId_sessionId/value: refreshToken)

		return new TokenResponse(accessToken, refreshToken);
	}

	@Override
	public void logout(String accessHeader, String refreshToken, String sessionId) {
		String accessToken = extractAccessToken(accessHeader);
		Long id = jwtTokenProvider.getIdFromToken(accessToken);

		//TODO:redis에서 id랑 session조합해서 refreshToken 제거

		//TODO:accsessToken을 blackList에 추가

	}

	@Override
	public RefreshResponse refresh(String refreshToken, String sessionId) {
		Long id = jwtTokenProvider.getIdFromToken(refreshToken);
		//TODO:redis에서 id와 sessionId를 조합해 refreshToken 가져오기

		//TODO:없으면 만료가 되었기에 재 로그인하라고 예외처리

		//TODO:가지고 있는 refreshToken과 redis의 refreshToken이 다르다면, 잘못된 접근이라 예외 처리

		return new RefreshResponse(jwtTokenProvider.createAccessToken(id));
	}

	private boolean isSamePassword(String inputPassword, String encodePassword) {
		return passwordEncoder.matches(inputPassword, encodePassword);
	}

	private String extractAccessToken(String token) {
		return token.split(" ")[1];
	}

}
