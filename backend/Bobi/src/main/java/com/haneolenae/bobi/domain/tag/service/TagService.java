package com.haneolenae.bobi.domain.tag.service;

import com.haneolenae.bobi.domain.tag.dto.request.TagCreateRequest;

public interface TagService {
	public void create(Long memberId, TagCreateRequest request);
}
