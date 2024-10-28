package com.haneolenae.bobi.domain.auth.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

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
	private long accessTokenValidTime = 30 * 60 * 1000L;//30분
	private long refreshTokenValidTime = 30 * 60 * 1000L;//30분

	private Key generateSecretKey(String secret) {
		byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
		return new SecretKeySpec(keyBytes, 0, keyBytes.length, "HmacSHA512");
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

	public boolean validateToken(String authorizationHeader) {
		final String token = extractToken(authorizationHeader);
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

	private String extractToken(String token) {
		return token.split(" ")[1];
	}

}
