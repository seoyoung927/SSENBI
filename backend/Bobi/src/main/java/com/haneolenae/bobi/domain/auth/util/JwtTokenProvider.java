package com.haneolenae.bobi.domain.auth.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties.Jwt;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {
	private Key secretKey = generateSecretKey(
		"c14aedf77d1d17e7f3259f26a01c6fd9bd70b32b334a51509abc616386a3b67aa481573a9dda3bae5043cd44eecaeb79842cea930621baf23f198cceae9d8234");
	private long accessTokenValidTime = 1 * 60 * 1000L;//1분 (차후 축소 예정)
	private long refreshTokenValidTime = 720 * 60 * 1000L;//12시간 (분/초/밀리초)

	private Key generateSecretKey(String secret) {
		byte[] keyBytes = Decoders.BASE64.decode(secret);
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public String createAccessToken(Long id) {
		final Date now = new Date();
		final Date validity = new Date(now.getTime() + accessTokenValidTime);

		return Jwts.builder()
			.setSubject(id.toString())
			.setIssuedAt(now)
			.setExpiration(validity)
			.signWith(secretKey, SignatureAlgorithm.HS256)
			.compact();
	}

	public String createRefreshToken(Long id) {
		final Date now = new Date();
		final Date validity = new Date(now.getTime() + refreshTokenValidTime);

		return Jwts.builder()
			.setSubject(id.toString())
			.setIssuedAt(now)
			.setExpiration(validity)
			.signWith(secretKey, SignatureAlgorithm.HS256)
			.compact();
	}

	public String getTokenFromHeader(String accessHeader) {
		return accessHeader.split(" ")[1];
	}

	public boolean validateToken(String token) {
		try {
			final Jws<Claims> claims = getClaimsJws(token);
			return !claims
				.getBody()
				.getExpiration()
				.before(new Date());
		} catch (JwtException | IllegalArgumentException e) {
			return false;
		}
	}

	private Jws<Claims> getClaimsJws(final String token) {
		return Jwts.parserBuilder()
			.setSigningKey(secretKey)
			.build()
			.parseClaimsJws(token);
	}

	public Long getIdFromToken(String token) {
		Claims claims = Jwts.parserBuilder()
			.setSigningKey(secretKey) // 동일한 키 사용
			.build()
			.parseClaimsJws(token)
			.getBody();

		return Long.valueOf(claims.getSubject()); // id 클레임 가져오기
	}

	public Long getExpiration(String token) {
		Claims claims = Jwts.parserBuilder()
			.setSigningKey(secretKey)
			.build()
			.parseClaimsJws(token)
			.getBody();

		Date expiration = claims.getExpiration();
		Date now = new Date();

		return Math.max(0, expiration.getTime() - now.getTime());
	}
}
