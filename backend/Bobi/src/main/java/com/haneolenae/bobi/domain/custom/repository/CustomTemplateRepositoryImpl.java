package com.haneolenae.bobi.domain.custom.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

public class CustomTemplateRepositoryImpl implements CustomTemplateRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	public CustomTemplateRepositoryImpl(JPAQueryFactory queryFactory) {
		this.queryFactory = queryFactory;
	}

}
