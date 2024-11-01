package com.haneolenae.bobi.global.util;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisUtil {
	private final RedisTemplate<String, Object> redisTemplate;
	private final RedisTemplate<String, Object> redisBlacklistTemplate;

	public void save(String key, Object value, long expireTime) {
		redisTemplate.opsForValue().set(
			key,
			value,
			expireTime,
			TimeUnit.MINUTES
		);
	}

	public void remove(String key) {
		redisTemplate.delete(key);
	}

	public Optional<Object> get(String key) {
		return Optional.ofNullable(redisTemplate.opsForValue().get(key));
	}

	public void addBlackList(String key, Object value, long expireTime) {
		redisBlacklistTemplate.opsForValue().set(
			key,
			value,
			expireTime,
			TimeUnit.MILLISECONDS
		);
	}
}
