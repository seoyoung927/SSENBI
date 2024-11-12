package com.haneolenae.bobi.domain.custom.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.haneolenae.bobi.domain.custom.entity.CustomTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomTemplateRepositoryImpl implements CustomTemplateRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	public Page<CustomTemplate> findTemplates(Pageable pageable, List<Long> templateTags, List<Long> templateCustomer,
		String templateSearch, long memberId) {

	}
}
