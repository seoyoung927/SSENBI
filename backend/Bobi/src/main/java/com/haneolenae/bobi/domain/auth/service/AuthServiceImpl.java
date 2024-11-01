package com.haneolenae.bobi.domain.auth.service;

import java.util.Optional;

import com.haneolenae.bobi.domain.auth.dto.request.LoginRequest;
import com.haneolenae.bobi.domain.auth.dto.response.RefreshResponse;
import com.haneolenae.bobi.domain.auth.dto.response.TokenResponse;
import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.member.repository.MemberRepository;
import com.haneolenae.bobi.global.dto.ApiType;
import com.haneolenae.bobi.global.exception.ApiException;
import com.haneolenae.bobi.global.util.RedisUtil;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final RedisUtil redisUtil;
	private final int REFRESH_TOKEN_TIME = 720; //12시간 (나중에 같이 줄여야함)

	public AuthServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder,
		JwtTokenProvider jwtTokenProvider, RedisUtil redisUtil) {
		this.memberRepository = memberRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtTokenProvider = jwtTokenProvider;
		this.redisUtil = redisUtil;
	}

	@Override
	public TokenResponse login(LoginRequest loginRequest, String sessionId) {
		Member member = memberRepository.findByMemberId(loginRequest.getLoginId())
			.orElseThrow(() -> new ApiException(ApiType.LOGIN_FAILED));

		if (!isSamePassword(loginRequest.getPassword(), member.getPassword())) {
			throw new ApiException(ApiType.LOGIN_FAILED);
		}

		//토큰 발급
		String accessToken = jwtTokenProvider.createAccessToken(member.getId());
		String refreshToken = jwtTokenProvider.createRefreshToken(member.getId());

		//TODO:refreshToken redis 입력 (key: userId_sessionId/value: refreshToken)
		redisUtil.save(createRedisKey(member.getId(), sessionId), refreshToken, REFRESH_TOKEN_TIME);

		return new TokenResponse(accessToken, refreshToken);
	}

	@Override
	public void logout(String accessHeader, String refreshToken, String sessionId) {
		String accessToken = accessHeader;
		Long id = jwtTokenProvider.getIdFromToken(accessToken);

		//TODO:redis에서 id랑 session조합해서 refreshToken 제거
		redisUtil.remove(createRedisKey(id, sessionId));
		//TODO:accsessToken을 blackList에 추가
		redisUtil.addBlackList(accessToken, 1, jwtTokenProvider.getExpiration(accessToken));
	}

	@Override
	public RefreshResponse refresh(String refreshToken, String sessionId) {
		Long id = jwtTokenProvider.getIdFromToken(refreshToken);
		//TODO:redis에서 id와 sessionId를 조합해 refreshToken 가져오기
		String savedRefreshToken = getSavedRefreshToken(id, sessionId);

		//TODO:가지고 있는 refreshToken과 redis의 refreshToken이 다르다면, 잘못된 접근이라 예외 처리
		if (isNotSameRefreshToken(savedRefreshToken, refreshToken)) {
			throw new ApiException(ApiType.REFRESH_TOKEN_NOT_SAME);
		}

		return new RefreshResponse(jwtTokenProvider.createAccessToken(id));
	}

	private boolean isSamePassword(String inputPassword, String encodePassword) {
		return passwordEncoder.matches(inputPassword, encodePassword);
	}

	private String createRedisKey(Long id, String sessionId) {
		return id + "_" + sessionId;
	}

	private String getSavedRefreshToken(Long id, String sessionId) {
		Optional<Object> rawData = redisUtil.get(createRedisKey(id, sessionId));

		//TODO:없으면 만료가 되었기에 재 로그인하라고 예외처리
		if (rawData.isEmpty()) {
			throw new ApiException(ApiType.REFRESH_TOKEN_EXPIRED);
		}

		return (String)rawData.get();
	}

	private boolean isNotSameRefreshToken(String savedRefreshToken, String refreshToken) {
		return !savedRefreshToken.equals(refreshToken);
	}
}
